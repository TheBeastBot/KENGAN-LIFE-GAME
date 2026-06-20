import {
  AGE_REWARD_NAMES, CARDS, ENCOUNTERS_BY_AGE, LEGENDARY_SAIYAN_LINEAGE, STAT_CARD_IDS,
} from './data.mjs';
import { hashSeed, sample } from './random.mjs';

const LATE_SAGA_TIERS = ['Ascended', 'Legacy', 'Master', 'Divine', 'Eternal', 'Infinite'];
const CAMPAIGN_TRANSFORMATIONS = [
  '', 'Weighted Aura', 'Kaioken Overdrive', 'Ascended Form', 'Savage Awakening',
  'God Ki Surge', 'Blue Flame State', 'Destroyer Aura', 'Ultra Instinct Echo', 'Eternal Limit Break',
];
const TOWER_TRANSFORMATIONS = [
  '', 'Iron Aura', 'Storm Kaioken', 'Shadow Ascension', 'Gravity Break Form',
  'Void Emperor State', 'God-Tower Awakening', 'Time-Fracture Form', 'Infinite Limit Break',
];
const CAMPAIGN_TRAITS = [
  { id: 'armor-breaker', name: 'Armor Breaker' },
  { id: 'ki-pressure', name: 'Ki Pressure' },
  { id: 'regeneration', name: 'Regeneration' },
  { id: 'combo-tempo', name: 'Combo Tempo' },
  { id: 'burning-aura', name: 'Burning Aura' },
];
const TOWER_TRAITS = [
  { id: 'tower-guard', name: 'Tower Guard' },
  { id: 'pressure-field', name: 'Pressure Field' },
  { id: 'endless-recovery', name: 'Endless Recovery' },
  { id: 'floor-rage', name: 'Floor Rage' },
];

export function campaignEnemyTier(age) {
  const safeAge = Math.max(6, Math.floor(Number(age) || 6));
  return safeAge < 10 ? 0 : Math.floor(safeAge / 10);
}

export function towerEnemyTier(floor) {
  const safeFloor = Math.max(1, Math.floor(Number(floor) || 1));
  return Math.floor(safeFloor / 5);
}

function campaignTransformationName(tier) {
  if (tier <= 0) return '';
  if (tier < CAMPAIGN_TRANSFORMATIONS.length) return CAMPAIGN_TRANSFORMATIONS[tier];
  return `Eternal Limit Break Ascended ${tier - CAMPAIGN_TRANSFORMATIONS.length + 2}`;
}

function towerTransformationName(tier) {
  if (tier <= 0) return '';
  const baseIndex = ((tier - 1) % (TOWER_TRANSFORMATIONS.length - 1)) + 1;
  const ascension = Math.floor((tier - 1) / (TOWER_TRANSFORMATIONS.length - 1));
  return `${TOWER_TRANSFORMATIONS[baseIndex]}${ascension ? ` Ascended ${ascension + 1}` : ''}`;
}

function traitsForEncounter(encounter, tier) {
  if (!tier || !['fighter', 'specialFight'].includes(encounter.type)) return [];
  if (encounter.source === 'tower') {
    const traits = TOWER_TRAITS.slice(0, Math.min(TOWER_TRAITS.length, tier));
    return encounter.type === 'specialFight'
      ? [...traits, { id: 'boss-ultimate-plus', name: 'Boss Ultimate+' }]
      : traits;
  }
  return CAMPAIGN_TRAITS.slice(0, Math.min(CAMPAIGN_TRAITS.length, tier));
}

function enemyEscalationFor(state, encounter) {
  const tier = encounter.source === 'tower' ? towerEnemyTier(encounter.towerFloor) : campaignEnemyTier(state.age);
  const tower = encounter.source === 'tower';
  const transformationName = tower ? towerTransformationName(tier) : campaignTransformationName(tier);
  const traits = traitsForEncounter(encounter, tier);
  const healthMultiplier = tower
    ? 1 + tier * 0.38 + Math.pow(tier, 1.18) * 0.09
    : 1 + tier * 0.42 + Math.pow(tier, 1.2) * 0.1;
  const powerMultiplier = tower
    ? 1 + tier * 0.26 + Math.pow(tier, 1.14) * 0.06
    : 1 + tier * 0.28 + Math.pow(tier, 1.12) * 0.06;
  const defenseMultiplier = 1 + tier * (tower ? 0.16 : 0.14);
  const speedMultiplier = 1 + tier * (tower ? 0.13 : 0.12);
  return {
    transformationTier: tier,
    transformationName,
    traits,
    healthMultiplier,
    powerMultiplier,
    defenseMultiplier,
    speedMultiplier,
  };
}

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
  const escalation = enemyEscalationFor(state, encounter);
  const traitIds = new Set(escalation.traits.map((trait) => trait.id));
  const maxHealth = Math.round((58 + encounter.enemyPower * 0.72) * scale * (special ? 1.38 : 1) * escalation.healthMultiplier);
  const power = Math.round((10 + encounter.enemyPower * 0.13) * (special ? 1.22 : 1) * escalation.powerMultiplier);
  const displayName = escalation.transformationName ? `${encounter.name} [${escalation.transformationName}]` : encounter.name;
  return {
    id: encounter.id,
    name: displayName,
    baseName: encounter.name,
    maxHealth,
    health: maxHealth,
    power,
    defense: Math.round((3 + encounter.enemyPower * 0.043) * (special ? 1.2 : 1) * escalation.defenseMultiplier),
    speed: Math.round((6 + encounter.enemyPower * 0.05) * (special ? 1.12 : 1) * escalation.speedMultiplier),
    special,
    phase: 0,
    specialTowerEnemy: Boolean(encounter.specialTowerEnemy),
    specialTowerEnemyId: encounter.specialTowerEnemyId ?? null,
    specialTowerEnemyImage: encounter.specialTowerEnemyImage ?? '',
    specialTowerEnemyColor: encounter.specialTowerEnemyColor ?? '',
    transformationName: escalation.transformationName,
    transformationTier: escalation.transformationTier,
    traits: escalation.traits,
    blockPierceBonus: (traitIds.has('armor-breaker') ? 0.28 : 0) + (traitIds.has('pressure-field') ? 0.22 : 0),
    regenPerTurn: traitIds.has('regeneration') ? Math.max(4, Math.round(maxHealth * 0.035)) : 0,
    guardRegen: traitIds.has('endless-recovery') ? Math.max(5, Math.round(maxHealth * 0.025)) : 0,
    powerRamp: traitIds.has('floor-rage') ? Math.max(2, Math.round(power * 0.09)) : 0,
    comboTempo: traitIds.has('combo-tempo') ? 0.35 : 0,
    burningAura: traitIds.has('burning-aura'),
    kiPressure: traitIds.has('ki-pressure') ? 1 : 0,
    startingBlock: traitIds.has('tower-guard') ? Math.max(12, Math.round((3 + encounter.enemyPower * 0.043) * 1.4)) : 0,
    ultimatePlus: traitIds.has('boss-ultimate-plus'),
  };
}
