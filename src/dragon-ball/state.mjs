import {
  CARDS, COMBAT_CARD_IDS, DRAGON_BALL_VERSION, INJURY_CARDS, LEGENDARY_SAIYAN_LINEAGE,
  ORIGINS, STAT_KEYS,
} from './data.mjs';
import { createRewardDraft, encountersForAge, legendarySaiyanEncountersForAge } from './campaign.mjs';
import { createRng, hashSeed } from './random.mjs';
import { createTowerState, normalizeTowerState } from './tower.mjs';
import { fail, ok } from './action-result.mjs';

const clone = (value) => structuredClone(value);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const LEGENDARY_STARTING_BONUS = {
  health: 35,
  power: 8,
  defense: 2,
  ki: 2,
};
const LEGENDARY_V3_HEALTH_INCREASE = 17;
const LEGENDARY_V3_POWER_INCREASE = 4;

export const RECOVERY_SERVICES = {
  'capsule-patch': {
    name: 'Capsule Patch',
    description: 'Restore 35% of maximum Health.',
  },
  'full-restore': {
    name: 'Full Recovery',
    description: 'Restore all Health before the next encounter.',
  },
  'injury-treatment': {
    name: 'Injury Treatment',
    description: 'Remove one Injury card and restore 20% Health.',
  },
};

export function recoveryServiceCost(state, serviceId) {
  const ageStep = Math.max(0, state.age - 6);
  if (serviceId === 'capsule-patch') return 30 + ageStep * 4;
  if (serviceId === 'full-restore') return 75 + ageStep * 8;
  if (serviceId === 'injury-treatment') return 95 + ageStep * 7;
  return Infinity;
}

export function buyRecoveryService(state, serviceId) {
  const service = RECOVERY_SERVICES[serviceId];
  const cost = recoveryServiceCost(state, serviceId);
  if (!service || state.activeCombat || state.tower?.active || state.zeni < cost) return state;
  if (serviceId !== 'injury-treatment' && state.currentHealth >= state.stats.health) return state;
  if (serviceId === 'injury-treatment' && !state.injuries.length) return state;

  const next = clone(state);
  next.zeni -= cost;
  if (serviceId === 'capsule-patch') {
    next.currentHealth = Math.min(next.stats.health, next.currentHealth + Math.ceil(next.stats.health * 0.35));
  } else if (serviceId === 'full-restore') {
    next.currentHealth = next.stats.health;
  } else {
    const removed = next.injuries.shift();
    next.currentHealth = Math.min(next.stats.health, next.currentHealth + Math.ceil(next.stats.health * 0.2));
    next.history.unshift({ type: 'recovery', text: `${service.name} removed ${CARDS[removed].name} for ${cost} Zeni.` });
    return next;
  }
  next.history.unshift({ type: 'recovery', text: `${service.name} restored Health for ${cost} Zeni.` });
  return next;
}

export function recoveryDisabledReason(state, serviceId) {
  const service = RECOVERY_SERVICES[serviceId];
  if (!service) return 'That recovery service is currently unavailable.';
  if (state.activeCombat) return 'Finish the current combat first.';
  if (state.tower?.active) return 'Climb In Progress';
  const cost = recoveryServiceCost(state, serviceId);
  if (state.zeni < cost) return `Need ${cost - state.zeni} more Zeni`;
  if (serviceId === 'injury-treatment' && !state.injuries.length) return 'No Injuries';
  if (serviceId !== 'injury-treatment' && state.currentHealth >= state.stats.health) return 'Health Full';
  return '';
}

export function tryBuyRecoveryService(state, serviceId) {
  const reason = recoveryDisabledReason(state, serviceId);
  if (reason) return fail(state, reason);
  const next = buyRecoveryService(state, serviceId);
  return ok(next, `${RECOVERY_SERVICES[serviceId].name} complete.`);
}

export function combatRewardFor(state, encounter) {
  const base = 24 + state.age * 3 + Math.max(1, encounter.difficulty ?? 1) * 7;
  return Math.round(base * (encounter.type === 'specialFight' ? 2 : 1));
}

export function createDragonBallRun({
  name = 'Hero', origin = 'saiyan', seed = Date.now(), lineageOverride,
} = {}) {
  const selected = ORIGINS[origin] ?? ORIGINS.saiyan;
  const numericSeed = Number(seed);
  const runSeed = Number.isFinite(numericSeed) ? numericSeed : Date.now();
  const rolledLineage = selected.id === 'saiyan' &&
    createRng(hashSeed(runSeed, LEGENDARY_SAIYAN_LINEAGE))() < 0.5
    ? LEGENDARY_SAIYAN_LINEAGE
    : selected.id === 'saiyan' ? 'standard' : null;
  const saiyanLineage = selected.id === 'saiyan'
    ? (lineageOverride === LEGENDARY_SAIYAN_LINEAGE ? LEGENDARY_SAIYAN_LINEAGE
      : lineageOverride === 'standard' ? 'standard' : rolledLineage)
    : null;
  const legendary = saiyanLineage === LEGENDARY_SAIYAN_LINEAGE;
  const stats = {
    ...selected.stats,
    ...(legendary ? {
      health: selected.stats.health + LEGENDARY_STARTING_BONUS.health,
      power: selected.stats.power + LEGENDARY_STARTING_BONUS.power,
      defense: selected.stats.defense + LEGENDARY_STARTING_BONUS.defense,
      ki: selected.stats.ki + LEGENDARY_STARTING_BONUS.ki,
    } : {}),
  };
  const deck = selected.deck.map((id) => legendary && id === 'tail-sweep' ? 'legendary-primal-roar' : id);
  return {
    version: DRAGON_BALL_VERSION,
    seed: runSeed,
    name: String(name).trim().slice(0, 24) || 'Hero',
    origin: selected.id,
    saiyanLineage,
    lineageRevealPending: legendary,
    age: 6,
    ageCycle: 0,
    zeni: 80,
    stats,
    currentHealth: stats.health,
    collection: Object.fromEntries([...new Set(deck)].map((id) => [id, deck.filter((cardId) => cardId === id).length])),
    deck,
    injuries: [],
    cooldowns: {},
    tower: createTowerState(),
    encounters: legendary ? legendarySaiyanEncountersForAge(6) : encountersForAge(6),
    clearedEncounterIds: [],
    pendingDraft: null,
    activeCombat: null,
    history: [{
      type: legendary ? 'lineage' : 'origin',
      text: legendary
        ? `${selected.name} journey begun at age 6. The Legendary Super Saiyan lineage has awakened.`
        : `${selected.name} journey begun at age 6.`,
    }],
    completed: false,
    ending: null,
  };
}

export function normalizeDragonBallState(input) {
  if (!input || typeof input !== 'object') return null;
  const origin = ORIGINS[input.origin] ? input.origin : 'saiyan';
  const saiyanLineage = origin === 'saiyan' && input.saiyanLineage === LEGENDARY_SAIYAN_LINEAGE
    ? LEGENDARY_SAIYAN_LINEAGE
    : origin === 'saiyan' ? 'standard' : null;
  const fallback = createDragonBallRun({
    name: input.name, origin, seed: input.seed, lineageOverride: saiyanLineage,
  });
  const shouldUpgradeLegendaryStats = saiyanLineage === LEGENDARY_SAIYAN_LINEAGE &&
    Math.floor(Number(input.version) || 0) < 3;
  const age = clamp(Math.floor(input.age ?? 6), 6, 100);
  const ageCycle = age === 100 ? Math.max(0, Math.floor(Number(input.ageCycle) || 0)) : 0;
  const stats = Object.fromEntries(STAT_KEYS.map((key) => [key, Math.max(1, Math.floor(input.stats?.[key] ?? fallback.stats[key]))]));
  if (shouldUpgradeLegendaryStats) {
    stats.health += LEGENDARY_V3_HEALTH_INCREASE;
    stats.power += LEGENDARY_V3_POWER_INCREASE;
  }
  const currentHealth = clamp(
    Math.floor(input.currentHealth ?? stats.health) +
      (shouldUpgradeLegendaryStats ? LEGENDARY_V3_HEALTH_INCREASE : 0),
    0,
    stats.health
  );
  const activeCombat = input.activeCombat ? clone(input.activeCombat) : null;
  if (shouldUpgradeLegendaryStats && activeCombat?.player) {
    activeCombat.player.maxHealth = Math.max(1,
      Math.floor(activeCombat.player.maxHealth ?? stats.health - LEGENDARY_V3_HEALTH_INCREASE) +
        LEGENDARY_V3_HEALTH_INCREASE);
    activeCombat.player.health = clamp(
      Math.floor(activeCombat.player.health ?? currentHealth) + LEGENDARY_V3_HEALTH_INCREASE,
      0,
      activeCombat.player.maxHealth
    );
  }
  const collection = {};
  for (const [id, count] of Object.entries(input.collection ?? {})) {
    if (CARDS[id] && !CARDS[id].towerOnly && CARDS[id].type !== 'stat' && CARDS[id].type !== 'injury' &&
      (!CARDS[id].lineages?.length || CARDS[id].lineages.includes(saiyanLineage))) {
      collection[id] = clamp(Math.floor(count), 1, 9);
    }
  }
  for (const id of fallback.deck) collection[id] = Math.max(collection[id] ?? 0, fallback.deck.filter((cardId) => cardId === id).length);
  const deck = Array.isArray(input.deck) ? input.deck.filter((id) => CARDS[id] && collection[id]) : fallback.deck;
  const validation = validateDeck({
    ...fallback, origin, saiyanLineage, age, collection, cooldowns: input.cooldowns ?? {},
  }, deck);
  return {
    ...fallback,
    ...input,
    version: DRAGON_BALL_VERSION,
    origin,
    saiyanLineage,
    lineageRevealPending: saiyanLineage === LEGENDARY_SAIYAN_LINEAGE && Boolean(input.lineageRevealPending),
    age,
    ageCycle,
    zeni: input.zeni === undefined ? fallback.zeni : Math.max(0, Math.floor(Number(input.zeni) || 0)),
    stats,
    currentHealth,
    collection,
    deck: validation.valid ? [...deck] : [...fallback.deck],
    injuries: Array.isArray(input.injuries) ? input.injuries.filter((id) => INJURY_CARDS.some((item) => item.id === id)).slice(0, 5) : [],
    cooldowns: Object.fromEntries(Object.entries(input.cooldowns ?? {}).filter(([id, value]) => CARDS[id] && Number(value) > 0).map(([id, value]) => [id, Math.floor(value)])),
    tower: normalizeTowerState(input.tower),
    encounters: Array.isArray(input.encounters) && input.encounters.length
      ? input.encounters
      : saiyanLineage === LEGENDARY_SAIYAN_LINEAGE
        ? legendarySaiyanEncountersForAge(age, ageCycle)
        : encountersForAge(age, ageCycle),
    clearedEncounterIds: Array.isArray(input.clearedEncounterIds) ? input.clearedEncounterIds : [],
    pendingDraft: input.pendingDraft?.options?.length === 3 ? input.pendingDraft : null,
    activeCombat,
    history: Array.isArray(input.history) ? input.history.slice(0, 100) : fallback.history,
    completed: false,
    ending: null,
  };
}

export function validateDeck(state, deck = state.deck) {
  if (!Array.isArray(deck)) return { valid: false, reason: 'Deck data is invalid.' };
  if (deck.length < 10) return { valid: false, reason: 'Deck needs at least 10 cards.' };
  if (deck.length > 20) return { valid: false, reason: 'Deck cannot exceed 20 cards.' };
  const counts = {};
  for (const id of deck) {
    const item = CARDS[id];
    if (!item || !COMBAT_CARD_IDS.includes(id)) return { valid: false, reason: 'Deck contains an unavailable card.' };
    if (!state.collection[id]) return { valid: false, reason: `${item.name} is not owned.` };
    if ((item.minAge ?? 6) > state.age) return { valid: false, reason: `${item.name} requires age ${item.minAge}.` };
    if (item.origins?.length && !item.origins.includes(state.origin)) return { valid: false, reason: `${item.name} is incompatible with this origin.` };
    if (item.lineages?.length && !item.lineages.includes(state.saiyanLineage)) return { valid: false, reason: `${item.name} requires the Legendary Super Saiyan lineage.` };
    if ((state.cooldowns[id] ?? 0) > 0) return { valid: false, reason: `${item.name} is cooling down for ${state.cooldowns[id]} Age Ups.` };
    counts[id] = (counts[id] ?? 0) + 1;
    const limit = item.type === 'form' || item.rarity === 'legendary' ? 1 : Math.min(2, state.collection[id]);
    if (counts[id] > limit) return { valid: false, reason: `${item.name} exceeds its copy limit.` };
  }
  return { valid: true, reason: '' };
}

export function setDeck(state, deck) {
  const validation = validateDeck(state, deck);
  return validation.valid ? { ...state, deck: [...deck] } : state;
}

export function trySetDeck(state, deck) {
  const validation = validateDeck(state, deck);
  if (!validation.valid) return fail(state, validation.reason);
  return ok(setDeck(state, deck), 'Deck updated.');
}

export function beginEncounter(state, encounterId) {
  if (state.pendingDraft || state.activeCombat || state.tower?.active) return state;
  const encounter = state.encounters.find((item) => item.id === encounterId);
  if (!encounter || state.clearedEncounterIds.includes(encounterId)) return state;
  if (encounter.type === 'mentor' || encounter.type === 'specialMentor') {
    return {
      ...state,
      pendingDraft: {
        sourceId: encounter.id,
        encounterId: encounter.id,
        kind: encounter.reward,
        options: createRewardDraft(state, encounter.reward, encounter.id),
      },
    };
  }
  return state;
}

export function claimDraftCard(state, cardId) {
  if (!state.pendingDraft?.options.includes(cardId)) return state;
  const item = CARDS[cardId];
  const next = clone(state);
  if (item.type === 'stat') {
    next.stats[item.stat] += item.amount;
    if (item.stat === 'health') next.currentHealth += item.amount;
  } else {
    next.collection[cardId] = (next.collection[cardId] ?? 0) + 1;
  }
  if (next.pendingDraft.encounterId) next.clearedEncounterIds.push(next.pendingDraft.encounterId);
  next.history.unshift({ type: 'reward', text: `Claimed ${item.name}: ${item.text}` });
  next.pendingDraft = null;
  return next;
}

export function tryClaimDraftCard(state, cardId) {
  if (!state.pendingDraft) return fail(state, 'Choose your pending reward first.');
  if (!state.pendingDraft.options?.includes(cardId)) return fail(state, 'That reward is unavailable.');
  const next = claimDraftCard(state, cardId);
  return ok(next, `Claimed ${CARDS[cardId]?.name}.`);
}

export function canAgeUp(state) {
  return !state.pendingDraft && !state.activeCombat && state.encounters.length > 0 &&
    state.encounters.every((item) => state.clearedEncounterIds.includes(item.id));
}

export function beginAgeReward(state) {
  if (!canAgeUp(state)) return state;
  return {
    ...state,
    pendingDraft: {
      sourceId: `age-${state.age}-reward`,
      encounterId: null,
      kind: state.age >= 18 ? 'legendary' : 'special',
      ageAdvance: true,
      options: createRewardDraft(state, state.age >= 18 ? 'legendary' : 'special', `age-${state.age}`),
    },
  };
}

export function tryBeginAgeReward(state) {
  if (state.pendingDraft) return fail(state, 'Choose your pending reward first.');
  if (state.activeCombat) return fail(state, 'Finish the current combat first.');
  if (!canAgeUp(state)) return fail(state, 'Clear every encounter before Aging Up.');
  return ok(beginAgeReward(state), 'Choose your age reward.');
}

export function finishAgeAdvance(state) {
  if (!state.pendingDraft?.ageAdvance) return state;
  return state;
}

export function advanceAfterAgeDraft(state, cardId) {
  if (!state.pendingDraft?.ageAdvance || !state.pendingDraft.options.includes(cardId)) return state;
  const claimed = claimDraftCard(state, cardId);
  const nextAge = Math.min(100, state.age + 1);
  const nextCycle = state.age >= 100 ? (state.ageCycle ?? 0) + 1 : 0;
  const cooldowns = Object.fromEntries(Object.entries(claimed.cooldowns).map(([id, value]) => [id, value - 1]).filter(([, value]) => value > 0));
  return {
    ...claimed,
    age: nextAge,
    ageCycle: nextCycle,
    currentHealth: claimed.stats.health,
    injuries: [],
    cooldowns,
    encounters: claimed.saiyanLineage === LEGENDARY_SAIYAN_LINEAGE
      ? legendarySaiyanEncountersForAge(nextAge, nextCycle)
      : encountersForAge(nextAge, nextCycle),
    clearedEncounterIds: [],
    completed: false,
    ending: null,
    history: [{
      type: 'age',
      text: nextAge === 100
        ? `Entered Eternal Saga ${nextCycle + 1} at age 100.`
        : `Reached age ${nextAge}. A new chapter begins.`,
    }, ...claimed.history].slice(0, 100),
  };
}

export function tryAdvanceAfterAgeDraft(state, cardId) {
  if (!state.pendingDraft) return fail(state, 'Choose your pending reward first.');
  if (!state.pendingDraft.ageAdvance || !state.pendingDraft.options?.includes(cardId)) return fail(state, 'That reward is unavailable.');
  return ok(advanceAfterAgeDraft(state, cardId), `Claimed ${CARDS[cardId]?.name}.`);
}

export function recordCombatVictory(state, encounter, cooldowns = {}) {
  const purse = combatRewardFor(state, encounter);
  return {
    ...state,
    activeCombat: null,
    zeni: state.zeni + purse,
    cooldowns: { ...state.cooldowns, ...cooldowns },
    currentHealth: Math.max(1, state.currentHealth),
    pendingDraft: {
      sourceId: encounter.id,
      encounterId: encounter.id,
      kind: encounter.reward,
      options: createRewardDraft(state, encounter.reward, `${encounter.id}-victory`),
    },
    history: [{ type: 'victory', text: `Defeated ${encounter.name} and earned ${purse} Zeni.` }, ...state.history].slice(0, 100),
  };
}

export function recordCombatDefeat(state, encounter) {
  const injury = INJURY_CARDS[(state.history.length + state.age) % INJURY_CARDS.length].id;
  const recoveryHealth = Math.max(1, Math.round(state.stats.health * (encounter.type === 'specialFight' ? 0.28 : 0.38)));
  return {
    ...state,
    activeCombat: null,
    currentHealth: recoveryHealth,
    injuries: [...state.injuries, injury].slice(-5),
    history: [{ type: 'defeat', text: `Lost to ${encounter.name}. ${CARDS[injury].name} added until Age Up.` }, ...state.history].slice(0, 100),
  };
}
