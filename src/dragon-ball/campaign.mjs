import { CARDS, ENCOUNTERS_BY_AGE, STAT_CARD_IDS } from './data.mjs';
import { hashSeed, sample } from './random.mjs';

export function encountersForAge(age) {
  return (ENCOUNTERS_BY_AGE[age] ?? []).map((encounter) => ({ ...encounter }));
}

export function cardIsEligible(card, state, { includeStats = false, legendary = false } = {}) {
  if (!card) return false;
  if (!includeStats && card.type === 'stat') return false;
  if (card.type === 'injury') return false;
  if ((card.minAge ?? 6) > state.age) return false;
  if (card.origins?.length && !card.origins.includes(state.origin)) return false;
  if (legendary && card.rarity !== 'legendary') return false;
  return true;
}

export function createRewardDraft(state, kind, sourceId = 'reward') {
  let pool;
  if (kind === 'stat') {
    pool = STAT_CARD_IDS.map((id) => CARDS[id]).filter((item) => (item.minAge ?? 6) <= state.age + 3);
  } else {
    const legendary = kind === 'legendary';
    pool = Object.values(CARDS).filter((item) => cardIsEligible(item, state, { legendary }));
    if (kind === 'special' && !legendary) {
      pool = pool.filter((item) => ['move', 'form', 'heal', 'support', 'counter'].includes(item.type) && item.rarity !== 'common');
    }
    if (!pool.length) pool = Object.values(CARDS).filter((item) => cardIsEligible(item, state));
  }
  const owned = new Set(Object.keys(state.collection ?? {}));
  pool.sort((a, b) => Number(owned.has(a.id)) - Number(owned.has(b.id)));
  return sample(pool, 3, hashSeed(state.seed, state.age, sourceId, state.history.length)).map((item) => item.id);
}

export function enemyForEncounter(state, encounter) {
  const ageIndex = state.age - 6;
  const scale = 1.46 + ageIndex * 0.115;
  const special = encounter.type === 'specialFight';
  const maxHealth = Math.round((58 + encounter.enemyPower * 0.72) * scale * (special ? 1.38 : 1));
  const power = Math.round((10 + encounter.enemyPower * 0.13) * (special ? 1.22 : 1));
  return {
    id: encounter.id,
    name: encounter.name,
    maxHealth,
    health: maxHealth,
    power,
    defense: Math.round((3 + encounter.enemyPower * 0.043) * (special ? 1.2 : 1)),
    speed: Math.round((6 + encounter.enemyPower * 0.05) * (special ? 1.12 : 1)),
    special,
    phase: 0,
  };
}
