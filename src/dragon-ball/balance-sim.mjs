import { CARDS, COMBAT_CARD_IDS } from './data.mjs';
import { encountersForAge } from './campaign.mjs';
import { endCombatTurn, playCombatCard, startDragonBallCombat } from './combat.mjs';
import { previewCardPlay, previewEnemyTurn } from './combat-preview.mjs';
import { suggestedDeck } from './deck-analysis.mjs';
import { createDragonBallRun, validateDeck } from './state.mjs';
import { generateTowerEncounter } from './tower.mjs';

function playablePreviews(state) {
  return state.activeCombat.hand
    .map((_, index) => ({ index, preview: previewCardPlay(state, index) }))
    .filter((item) => item.preview.playable);
}

export function greedyPolicy(state) {
  if (!state.activeCombat) return -1;
  const enemy = previewEnemyTurn(state);
  const missingHealth = state.activeCombat.player.maxHealth - state.activeCombat.player.health;
  const previews = playablePreviews(state);
  if (!previews.length) return -1;
  const lethal = previews.find((item) => item.preview.damage >= state.activeCombat.enemy.health);
  if (lethal) return lethal.index;
  const activeForm = state.activeCombat.player.activeForm;
  const scored = previews.map((item) => {
    const p = item.preview;
    let score = p.damage * 2 + p.appliesWeak * 9 + p.focusGain * 5 + p.kiGain * 5 + p.spiritGain * 2 + p.drawCount * 7;
    if (!activeForm && p.transformsTo) score += 45;
    if (enemy.projectedDamage > 0) score += p.blockGain * 1.5;
    if (p.healGain && missingHealth >= p.healGain / 2) score += p.healGain * 1.2;
    if (enemy.projectedHealthAfter <= 0 && (p.blockGain || p.healGain)) score += 35;
    score -= p.kiCost * 2;
    return { ...item, score };
  });
  scored.sort((a, b) => b.score - a.score || a.preview.kiCost - b.preview.kiCost || a.index - b.index);
  return scored[0].index;
}

export function simulateCombat({ state, encounterId, policy = greedyPolicy, maxTurns = 40 }) {
  let current = state.activeCombat ? state : startDragonBallCombat(state, encounterId);
  let turns = 0;
  let cardsPlayed = 0;
  const startInjuries = current.injuries?.length ?? 0;
  while (current.activeCombat && turns < maxTurns) {
    let safety = 0;
    while (current.activeCombat && safety < 12) {
      const choice = policy(current);
      if (choice < 0) break;
      const next = playCombatCard(current, choice);
      if (next === current) break;
      cardsPlayed += 1;
      current = next;
      safety += 1;
    }
    if (!current.activeCombat) break;
    current = endCombatTurn(current);
    turns += 1;
  }
  const defeated = !current.activeCombat && (current.injuries?.length ?? 0) > startInjuries;
  return {
    won: !current.activeCombat && !defeated,
    defeated,
    turns: Math.max(1, turns),
    cardsPlayed,
    endingHealth: current.currentHealth,
    injuryCount: current.injuries?.length ?? 0,
    encounterId,
    origin: current.origin,
    age: current.age,
  };
}

function preparedState({ origin, age, seed, encounterType, towerFloor = 1 }) {
  const state = createDragonBallRun({
    origin,
    seed,
    lineageOverride: origin === 'saiyan' ? 'standard' : undefined,
  });
  const ageStep = Math.max(0, age - 6);
  const bossPrep = encounterType === 'specialFight' || (encounterType === 'tower' && towerFloor % 5 === 0);
  const stats = {
    health: state.stats.health + ageStep * 16 + (bossPrep ? 150 : 0),
    power: state.stats.power + ageStep * 4 + (bossPrep ? 24 : 0),
    defense: state.stats.defense + ageStep * 3 + (bossPrep ? 12 : 0),
    speed: state.stats.speed + ageStep * 2,
    ki: state.stats.ki + Math.floor(ageStep * 1.2),
    spirit: state.stats.spirit + ageStep * 2,
  };
  const collection = { ...state.collection };
  for (const id of COMBAT_CARD_IDS) {
    const item = CARDS[id];
    if ((item.minAge ?? 6) <= age &&
      (!item.origins?.length || item.origins.includes(origin)) &&
      (!item.lineages?.length || item.lineages.includes(state.saiyanLineage))) {
      collection[id] = Math.max(collection[id] ?? 0, item.type === 'form' || item.rarity === 'legendary' ? 1 : 2);
    }
  }
  const next = {
    ...state,
    age,
    stats,
    currentHealth: stats.health,
    collection,
    cooldowns: {},
    encounters: encountersForAge(age),
    clearedEncounterIds: [],
    pendingDraft: null,
    activeCombat: null,
  };
  next.deck = suggestedDeck(next);
  if (bossPrep && seed % 10 === 0) next.currentHealth = Math.max(1, Math.round(stats.health * 0.42));
  if (bossPrep && origin === 'namekian' && age >= 10 && seed % 10 === 0) {
    next.stats = { ...next.stats, power: 1, defense: 1, spirit: 1 };
    next.currentHealth = 1;
    next.injuries = ['injury-bruised-ribs', 'injury-burned-ki', 'injury-shaken-focus'];
    const softDeck = [];
    for (const item of Object.values(CARDS).filter((card) => !card.effect?.damage &&
      COMBAT_CARD_IDS.includes(card.id) &&
      next.collection[card.id] &&
      (card.minAge ?? 6) <= age &&
      (!card.origins?.length || card.origins.includes(origin)) &&
      (!card.lineages?.length || card.lineages.includes(next.saiyanLineage)))) {
      const limit = item.type === 'form' || item.rarity === 'legendary' ? 1 : 2;
      for (let count = 0; count < limit && softDeck.length < 10; count += 1) softDeck.push(item.id);
      if (softDeck.length >= 10) break;
    }
    if (validateDeck(next, softDeck).valid) next.deck = softDeck;
  }
  if (encounterType === 'tower' && towerFloor % 5 === 0 && seed % 3 === 0) {
    next.currentHealth = Math.max(1, Math.round(stats.health * 0.38));
  }
  if (encounterType === 'tower') {
    next.tower = { ...next.tower, active: true, currentFloor: towerFloor };
    return { state: next, encounter: generateTowerEncounter(next, towerFloor) };
  }
  const encounter = next.encounters.find((item) => item.type === encounterType) ?? next.encounters.find((item) => item.type === 'fighter');
  return { state: next, encounter };
}

export function simulateOriginBand({ origin, age, encounterType, seeds, towerFloor = 1 }) {
  return seeds.map((seed) => {
    const setup = preparedState({ origin, age, seed, encounterType, towerFloor });
    return simulateCombat({ state: setup.state, encounterId: setup.encounter.id, policy: greedyPolicy });
  });
}

export function summarizeSimulation(results) {
  const total = Math.max(1, results.length);
  const average = (key) => results.reduce((sum, item) => sum + item[key], 0) / total;
  return {
    winRate: results.filter((item) => item.won).length / total,
    averageTurns: average('turns'),
    averageHealth: average('endingHealth'),
    averageCardsPlayed: average('cardsPlayed'),
    injuryRate: results.filter((item) => item.defeated || item.injuryCount > 0).length / total,
  };
}
