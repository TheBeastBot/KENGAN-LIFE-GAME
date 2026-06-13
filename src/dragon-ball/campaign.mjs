import {
  AGE_REWARD_NAMES, CARDS, ENCOUNTERS_BY_AGE, LEGENDARY_SAIYAN_LINEAGE, STAT_CARD_IDS,
} from './data.mjs';
import { hashSeed, sample } from './random.mjs';

const LATE_SAGA_TIERS = ['Ascended', 'Legacy', 'Master', 'Divine', 'Eternal', 'Infinite'];

export function sagaNameForAge(age, cycle = 0) {
  const safeAge = Math.max(6, Math.min(100, Math.floor(Number(age) || 6)));
  if (safeAge <= 20) return AGE_REWARD_NAMES[safeAge - 6];
  if (safeAge === 100) return `Eternal Saga ${cycle + 1}`;
  const templateIndex = (safeAge - 6) % AGE_REWARD_NAMES.length;
  const tierIndex = Math.min(LATE_SAGA_TIERS.length - 1, Math.floor((safeAge - 21) / AGE_REWARD_NAMES.length));
  return `${LATE_SAGA_TIERS[tierIndex]} ${AGE_REWARD_NAMES[templateIndex]}`;
}

export function encountersForAge(age, cycle = 0) {
  const safeAge = Math.max(6, Math.min(100, Math.floor(Number(age) || 6)));
  if (safeAge <= 20) return (ENCOUNTERS_BY_AGE[safeAge] ?? []).map((encounter) => ({ ...encounter }));

  const safeCycle = safeAge === 100 ? Math.max(0, Math.floor(Number(cycle) || 0)) : 0;
  const templateAge = 6 + ((safeAge - 6) % 15);
  const template = ENCOUNTERS_BY_AGE[templateAge] ?? ENCOUNTERS_BY_AGE[20];
  const era = Math.floor((safeAge - 6) / 15);
  const cycleSuffix = safeAge === 100 ? `-cycle-${safeCycle}` : '';
  const title = safeAge === 100 ? `Eternal ${safeCycle + 1}` : LATE_SAGA_TIERS[Math.min(LATE_SAGA_TIERS.length - 1, era - 1)];
  const lateAge = safeAge - 20;
  const eternalPower = safeCycle
    ? safeCycle * 400 + Math.pow(safeCycle + 1, 1.35) * 80
    : 0;
  const agePower = 280 + lateAge * 18 + Math.pow(lateAge, 1.55) * 4 + eternalPower;

  return template.map((encounter, index) => {
    const special = encounter.type === 'specialFight';
    const training = encounter.type === 'mentor' || encounter.type === 'specialMentor';
    return {
      ...encounter,
      id: `age-${safeAge}${cycleSuffix}-${encounter.type}-${index}`,
      age: safeAge,
      name: training
        ? `${encounter.name} · ${title} Teaching`
        : `${encounter.name} · ${title} Challenger`,
      difficulty: training ? 0 : 3 + Math.ceil(lateAge / 5) + (special ? 2 : 0) + safeCycle * 2,
      enemyPower: training ? 0 : Math.round(agePower * (special ? 1.5 : 1)),
      reward: special ? 'legendary' : encounter.reward,
    };
  });
}

const LEGENDARY_MILESTONES = {
  8: { name: 'The Great Ape Within', type: 'specialMentor' },
  11: { name: 'Awakening of the Green Legend', type: 'specialFight' },
  14: { name: 'Berserker Control Trial', type: 'specialMentor' },
  17: { name: 'The Unbreakable Legendary Rival', type: 'specialFight' },
  20: { name: 'Gods Tremble Before the Legend', type: 'specialFight' },
};

export function legendarySaiyanEncountersForAge(age, cycle = 0) {
  const encounters = encountersForAge(age, cycle);
  const templateAge = age <= 20 ? age : 6 + ((age - 6) % 15);
  const milestone = LEGENDARY_MILESTONES[templateAge];
  if (!milestone) return encounters;
  const replaceIndex = encounters.findIndex((item) => item.type === milestone.type);
  if (replaceIndex < 0) return encounters;
  const source = encounters[replaceIndex];
  encounters[replaceIndex] = {
    ...source,
    id: `${source.id}-legendary-lineage`,
    name: age > 20 ? `${milestone.name} · Ascended Echo` : milestone.name,
    type: milestone.type,
    reward: 'legendarySaiyan',
    legendarySaiyanMilestone: true,
    difficulty: milestone.type === 'specialFight' ? Math.max(3, source.difficulty + 1) : 0,
    enemyPower: milestone.type === 'specialFight' ? Math.round(source.enemyPower * 1.3) : 0,
  };
  return encounters;
}

export function cardIsEligible(card, state, { includeStats = false, legendary = false } = {}) {
  if (!card) return false;
  if (card.towerOnly) return false;
  if (!includeStats && card.type === 'stat') return false;
  if (card.type === 'injury') return false;
  if ((card.minAge ?? 6) > state.age) return false;
  if (card.origins?.length && !card.origins.includes(state.origin)) return false;
  if (card.lineages?.length && !card.lineages.includes(state.saiyanLineage)) return false;
  if (legendary && card.rarity !== 'legendary') return false;
  return true;
}

export function createRewardDraft(state, kind, sourceId = 'reward') {
  let pool;
  if (kind === 'stat') {
    pool = STAT_CARD_IDS.map((id) => CARDS[id]).filter((item) => (item.minAge ?? 6) <= state.age + 3);
  } else if (kind === 'legendarySaiyan') {
    pool = Object.values(CARDS).filter((item) =>
      item.lineages?.includes(LEGENDARY_SAIYAN_LINEAGE) && cardIsEligible(item, state));
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
  if (kind === 'special' || kind === 'legendary' || kind === 'legendarySaiyan') {
    const forms = pool.filter((item) => item.type === 'form');
    if (forms.length) {
      const unownedForms = forms.filter((item) => !owned.has(item.id));
      const formPool = unownedForms.length ? unownedForms : forms;
      const chosenForm = sample(formPool, 1, hashSeed(state.seed, state.age, sourceId, 'form'))[0];
      const otherCards = pool.filter((item) => item.id !== chosenForm.id && item.type !== 'form');
      return [
        chosenForm.id,
        ...sample(otherCards, 2, hashSeed(state.seed, state.age, sourceId, state.history.length, 'others')).map((item) => item.id),
      ];
    }
  }
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
