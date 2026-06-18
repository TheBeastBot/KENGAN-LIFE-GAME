import { CARDS, COMBAT_CARD_IDS, ORIGINS } from './data.mjs';
import { validateDeck } from './state.mjs';

const COST_KEYS = [0, 1, 2, 3, 'other'];
const TYPE_KEYS = ['move', 'form', 'heal', 'support', 'counter'];
const RARITY_SCORE = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 };

function emptyCounts(keys) {
  return Object.fromEntries(keys.map((key) => [key, 0]));
}

export function analyzeDeck(state, deck = state.deck) {
  const validation = validateDeck(state, deck);
  const countsByType = emptyCounts(TYPE_KEYS);
  const countsByCost = emptyCounts(COST_KEYS);
  let totalCost = 0;
  let attackCount = 0;
  let defenseCount = 0;
  let healingCount = 0;
  let drawCount = 0;
  let kiGainCount = 0;
  let formCount = 0;
  let injuryCount = 0;

  for (const id of Array.isArray(deck) ? deck : []) {
    const item = CARDS[id];
    if (!item) continue;
    if (countsByType[item.type] !== undefined) countsByType[item.type] += 1;
    const costKey = COST_KEYS.includes(item.cost) ? item.cost : 'other';
    countsByCost[costKey] += 1;
    totalCost += Number(item.cost) || 0;
    if (item.effect?.damage) attackCount += 1;
    if (item.effect?.block || item.type === 'counter' || item.effect?.retainBlock) defenseCount += 1;
    if (item.effect?.heal || item.effect?.healPercent || item.type === 'heal') healingCount += 1;
    if (item.effect?.draw) drawCount += 1;
    if (item.effect?.ki || item.effect?.maxKi) kiGainCount += 1;
    if (item.type === 'form') formCount += 1;
    if (item.type === 'injury') injuryCount += 1;
  }

  const size = Array.isArray(deck) ? deck.length : 0;
  const averageCost = size ? Number((totalCost / size).toFixed(2)) : 0;
  const warnings = [];
  if (!validation.valid) warnings.push(validation.reason);
  if (size < 10 && !warnings.includes('Deck needs at least 10 cards.')) warnings.push('Deck needs at least 10 cards.');
  if (size > 20 && !warnings.includes('Deck cannot exceed 20 cards.')) warnings.push('Deck cannot exceed 20 cards.');
  if (attackCount < 4) warnings.push('Add more attack cards.');
  if (defenseCount < 3) warnings.push('Add more Block or Counter cards.');
  if (averageCost > 1.8) warnings.push('Deck is Ki-heavy. Add lower-cost cards.');
  if (drawCount === 0 && size >= 15) warnings.push('Large decks need draw support.');
  if (formCount > 3) warnings.push('Too many forms can slow opening hands.');

  return {
    valid: validation.valid,
    reason: validation.reason,
    size,
    minSize: 10,
    maxSize: 20,
    countsByType,
    countsByCost,
    averageCost,
    attackCount,
    defenseCount,
    healingCount,
    drawCount,
    kiGainCount,
    formCount,
    injuryCount,
    warnings,
  };
}

function eligibleCards(state) {
  return COMBAT_CARD_IDS
    .map((id) => CARDS[id])
    .filter((item) => state.collection[item.id] &&
      (item.minAge ?? 6) <= state.age &&
      (!item.origins?.length || item.origins.includes(state.origin)) &&
      (!item.lineages?.length || item.lineages.includes(state.saiyanLineage)) &&
      (state.cooldowns?.[item.id] ?? 0) <= 0);
}

function copyLimit(state, item) {
  return item.type === 'form' || item.rarity === 'legendary'
    ? 1
    : Math.min(2, state.collection[item.id] ?? 0);
}

function addCard(state, deck, id) {
  const item = CARDS[id];
  const count = deck.filter((cardId) => cardId === id).length;
  if (!item || count >= copyLimit(state, item)) return false;
  const next = [...deck, id];
  if (next.length > 20) return false;
  const unavailable = !COMBAT_CARD_IDS.includes(id) ||
    !state.collection[id] ||
    (item.minAge ?? 6) > state.age ||
    (item.origins?.length && !item.origins.includes(state.origin)) ||
    (item.lineages?.length && !item.lineages.includes(state.saiyanLineage)) ||
    (state.cooldowns?.[id] ?? 0) > 0;
  if (unavailable) return false;
  deck.push(id);
  return true;
}

function score(item) {
  const lowCostBonus = 4 - Math.min(4, item.cost ?? 0);
  const rarity = RARITY_SCORE[item.rarity] ?? 1;
  return rarity * 10 + lowCostBonus + (item.effect.draw ? 4 : 0) + (item.effect.ki || item.effect.maxKi ? 3 : 0);
}

export function suggestedDeck(state) {
  const deck = [];
  for (const id of ORIGINS[state.origin]?.deck ?? []) {
    if (state.collection[id] && (state.cooldowns?.[id] ?? 0) <= 0) addCard(state, deck, id);
  }
  const candidates = eligibleCards(state).sort((a, b) => score(b) - score(a) || a.cost - b.cost || a.name.localeCompare(b.name));
  const by = (predicate) => candidates.filter(predicate);
  const groups = [
    by((item) => item.type === 'move').slice(0, 7),
    by((item) => item.type === 'counter' || item.effect.block || item.effect.retainBlock).slice(0, 5),
    by((item) => item.type === 'heal' || item.effect.heal || item.effect.healPercent).slice(0, 3),
    by((item) => item.type === 'form').sort((a, b) => (b.minAge ?? 6) - (a.minAge ?? 6) || score(b) - score(a)).slice(0, 2),
    by((item) => item.effect.draw || item.effect.ki || item.effect.maxKi || item.effect.focus),
    candidates,
  ];
  for (const group of groups) {
    for (const item of group) {
      if (deck.length >= 20) break;
      addCard(state, deck, item.id);
    }
    if (deck.length >= 10 && validateDeck(state, deck).valid) break;
  }
  for (const item of candidates) {
    if (deck.length >= 10 && validateDeck(state, deck).valid) break;
    addCard(state, deck, item.id);
  }
  return validateDeck(state, deck).valid ? deck : state.deck;
}
