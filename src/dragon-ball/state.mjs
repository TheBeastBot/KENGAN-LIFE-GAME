import {
  CARDS, COMBAT_CARD_IDS, DRAGON_BALL_VERSION, INJURY_CARDS, ORIGINS, STAT_KEYS,
} from './data.mjs';
import { createRewardDraft, encountersForAge } from './campaign.mjs';

const clone = (value) => structuredClone(value);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createDragonBallRun({ name = 'Hero', origin = 'saiyan', seed = Date.now() } = {}) {
  const selected = ORIGINS[origin] ?? ORIGINS.saiyan;
  return {
    version: DRAGON_BALL_VERSION,
    seed: Number(seed) || Date.now(),
    name: String(name).trim().slice(0, 24) || 'Hero',
    origin: selected.id,
    age: 6,
    stats: { ...selected.stats },
    currentHealth: selected.stats.health,
    collection: Object.fromEntries([...new Set(selected.deck)].map((id) => [id, selected.deck.filter((cardId) => cardId === id).length])),
    deck: [...selected.deck],
    injuries: [],
    cooldowns: {},
    encounters: encountersForAge(6),
    clearedEncounterIds: [],
    pendingDraft: null,
    activeCombat: null,
    history: [{ type: 'origin', text: `${selected.name} journey begun at age 6.` }],
    completed: false,
    ending: null,
  };
}

export function normalizeDragonBallState(input) {
  if (!input || typeof input !== 'object') return null;
  const origin = ORIGINS[input.origin] ? input.origin : 'saiyan';
  const fallback = createDragonBallRun({ name: input.name, origin, seed: input.seed });
  const age = clamp(Math.floor(input.age ?? 6), 6, 20);
  const stats = Object.fromEntries(STAT_KEYS.map((key) => [key, Math.max(1, Math.floor(input.stats?.[key] ?? fallback.stats[key]))]));
  const collection = {};
  for (const [id, count] of Object.entries(input.collection ?? {})) {
    if (CARDS[id] && CARDS[id].type !== 'stat' && CARDS[id].type !== 'injury') collection[id] = clamp(Math.floor(count), 1, 9);
  }
  for (const id of fallback.deck) collection[id] = Math.max(collection[id] ?? 0, fallback.deck.filter((cardId) => cardId === id).length);
  const deck = Array.isArray(input.deck) ? input.deck.filter((id) => CARDS[id] && collection[id]) : fallback.deck;
  const validation = validateDeck({ ...fallback, origin, age, collection, cooldowns: input.cooldowns ?? {} }, deck);
  return {
    ...fallback,
    ...input,
    version: DRAGON_BALL_VERSION,
    origin,
    age,
    stats,
    currentHealth: clamp(Math.floor(input.currentHealth ?? stats.health), 0, stats.health),
    collection,
    deck: validation.valid ? [...deck] : [...fallback.deck],
    injuries: Array.isArray(input.injuries) ? input.injuries.filter((id) => INJURY_CARDS.some((item) => item.id === id)).slice(0, 5) : [],
    cooldowns: Object.fromEntries(Object.entries(input.cooldowns ?? {}).filter(([id, value]) => CARDS[id] && Number(value) > 0).map(([id, value]) => [id, Math.floor(value)])),
    encounters: Array.isArray(input.encounters) && input.encounters.length ? input.encounters : encountersForAge(age),
    clearedEncounterIds: Array.isArray(input.clearedEncounterIds) ? input.clearedEncounterIds : [],
    pendingDraft: input.pendingDraft?.options?.length === 3 ? input.pendingDraft : null,
    activeCombat: input.activeCombat ?? null,
    history: Array.isArray(input.history) ? input.history.slice(0, 100) : fallback.history,
    completed: Boolean(input.completed),
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

export function beginEncounter(state, encounterId) {
  if (state.pendingDraft || state.activeCombat) return state;
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

export function finishAgeAdvance(state) {
  if (!state.pendingDraft?.ageAdvance) return state;
  return state;
}

export function advanceAfterAgeDraft(state, cardId) {
  if (!state.pendingDraft?.ageAdvance || !state.pendingDraft.options.includes(cardId)) return state;
  const claimed = claimDraftCard(state, cardId);
  if (state.age >= 20) {
    return { ...claimed, completed: true, ending: `${claimed.name} became champion of the Final Sky.` };
  }
  const nextAge = state.age + 1;
  const cooldowns = Object.fromEntries(Object.entries(claimed.cooldowns).map(([id, value]) => [id, value - 1]).filter(([, value]) => value > 0));
  return {
    ...claimed,
    age: nextAge,
    currentHealth: claimed.stats.health,
    injuries: [],
    cooldowns,
    encounters: encountersForAge(nextAge),
    clearedEncounterIds: [],
    history: [{ type: 'age', text: `Reached age ${nextAge}. A new chapter begins.` }, ...claimed.history].slice(0, 100),
  };
}

export function recordCombatVictory(state, encounter, cooldowns = {}) {
  return {
    ...state,
    activeCombat: null,
    cooldowns: { ...state.cooldowns, ...cooldowns },
    currentHealth: Math.max(1, state.currentHealth),
    pendingDraft: {
      sourceId: encounter.id,
      encounterId: encounter.id,
      kind: encounter.reward,
      options: createRewardDraft(state, encounter.reward, `${encounter.id}-victory`),
    },
    history: [{ type: 'victory', text: `Defeated ${encounter.name}.` }, ...state.history].slice(0, 100),
  };
}

export function recordCombatDefeat(state, encounter) {
  const injury = INJURY_CARDS[(state.history.length + state.age) % INJURY_CARDS.length].id;
  return {
    ...state,
    activeCombat: null,
    currentHealth: Math.max(1, Math.round(state.stats.health * 0.5)),
    injuries: [...state.injuries, injury].slice(-5),
    history: [{ type: 'defeat', text: `Lost to ${encounter.name}. ${CARDS[injury].name} added until Age Up.` }, ...state.history].slice(0, 100),
  };
}
