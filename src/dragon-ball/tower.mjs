import { CARDS, INJURY_CARDS, STAT_CARD_IDS, TOWER_CARD_IDS, TOWER_ENEMY_NAMES } from './data.mjs';
import { hashSeed, sample } from './random.mjs';

const clone = (value) => structuredClone(value);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createTowerState() {
  return {
    active: false,
    currentFloor: 1,
    highestFloor: 0,
    cards: {},
    loadout: [],
  };
}

export function normalizeTowerState(input) {
  const fallback = createTowerState();
  if (!input || typeof input !== 'object') return fallback;
  const cards = Object.fromEntries(
    Object.entries(input.cards ?? {})
      .filter(([id]) => TOWER_CARD_IDS.includes(id))
      .map(([id, rank]) => [id, clamp(Math.floor(Number(rank) || 1), 1, 5)])
  );
  const loadout = Array.isArray(input.loadout)
    ? [...new Set(input.loadout.filter((id) => cards[id]))].slice(0, 5)
    : [];
  return {
    active: Boolean(input.active),
    currentFloor: Math.max(1, Math.floor(Number(input.currentFloor) || 1)),
    highestFloor: Math.max(0, Math.floor(Number(input.highestFloor) || 0)),
    cards,
    loadout,
  };
}

export function generateTowerEncounter(state, floor = state.tower?.currentFloor ?? 1) {
  const safeFloor = Math.max(1, Math.floor(floor));
  const boss = safeFloor % 5 === 0;
  const cycle = Math.floor((safeFloor - 1) / TOWER_ENEMY_NAMES.length);
  const baseName = TOWER_ENEMY_NAMES[(safeFloor - 1) % TOWER_ENEMY_NAMES.length];
  const suffix = cycle ? ` Ascended ${cycle + 1}` : '';
  const deepFloorPower = Math.pow(Math.max(0, safeFloor - 10), 1.6) * 4;
  return {
    id: `tower-floor-${safeFloor}`,
    source: 'tower',
    towerFloor: safeFloor,
    age: state.age,
    type: boss ? 'specialFight' : 'fighter',
    name: `${baseName}${suffix}`,
    difficulty: Math.max(1, Math.ceil(safeFloor / 3)),
    enemyPower: Math.round(36 + safeFloor * 15 + Math.pow(safeFloor, 1.22) * 3 + deepFloorPower),
    reward: 'tower',
  };
}

export function startTowerRun(state) {
  if (state.age < 8 || state.activeCombat || state.pendingDraft || state.tower?.active) return state;
  return {
    ...state,
    tower: { ...normalizeTowerState(state.tower), active: true, currentFloor: 1 },
    history: [{ type: 'tower', text: 'Entered the Infinite Tower at floor 1.' }, ...state.history].slice(0, 100),
  };
}

export function validateTowerLoadout(state, loadout = state.tower?.loadout ?? []) {
  if (!Array.isArray(loadout)) return { valid: false, reason: 'Tower loadout data is invalid.' };
  if (loadout.length > 5) return { valid: false, reason: 'Only five Tower Cards may be equipped.' };
  if (new Set(loadout).size !== loadout.length) return { valid: false, reason: 'Tower Cards cannot be duplicated.' };
  for (const id of loadout) {
    if (!TOWER_CARD_IDS.includes(id) || !state.tower?.cards?.[id]) {
      return { valid: false, reason: `${CARDS[id]?.name ?? 'Tower Card'} is not owned.` };
    }
  }
  return { valid: true, reason: '' };
}

export function setTowerLoadout(state, loadout) {
  const validation = validateTowerLoadout(state, loadout);
  return validation.valid ? { ...state, tower: { ...state.tower, loadout: [...loadout] } } : state;
}

export function towerRewardDraft(state, floor, kind) {
  if (kind === 'stat') {
    const pool = STAT_CARD_IDS.map((id) => CARDS[id]).filter((item) => item.minAge <= Math.min(21, state.age + 4));
    return sample(pool, 3, hashSeed(state.seed, floor, kind, state.history.length)).map((item) => item.id);
  }
  const cards = normalizeTowerState(state.tower).cards;
  const highStats = STAT_CARD_IDS.filter((id) => CARDS[id].amount >= (CARDS[id].stat === 'health' ? 24 : 8));
  const unowned = TOWER_CARD_IDS.filter((id) => !cards[id]);
  if (unowned.length) {
    const chosenUnowned = sample(unowned, Math.min(3, unowned.length), hashSeed(state.seed, floor, 'tower-unowned'));
    const fillPool = TOWER_CARD_IDS.filter((id) => cards[id] < 5 && !chosenUnowned.includes(id));
    const chosenUpgrades = sample(fillPool, 3 - chosenUnowned.length, hashSeed(state.seed, floor, 'tower-fill'));
    return [
      ...chosenUnowned,
      ...chosenUpgrades,
      ...sample(highStats, 3 - chosenUnowned.length - chosenUpgrades.length, hashSeed(state.seed, floor, 'tower-stat-fill')),
    ];
  }
  const upgradeable = TOWER_CARD_IDS.filter((id) => cards[id] < 5);
  if (upgradeable.length) return sample(upgradeable, 3, hashSeed(state.seed, floor, 'tower-upgrade'));
  return sample(highStats, 3, hashSeed(state.seed, floor, 'tower-maxed'));
}

export function claimTowerReward(state, cardId) {
  if (!state.pendingDraft?.options?.includes(cardId) || !['towerStat', 'towerCard'].includes(state.pendingDraft.kind)) return state;
  const next = clone(state);
  const item = CARDS[cardId];
  if (item.type === 'stat') {
    next.stats[item.stat] += item.amount;
    if (item.stat === 'health') next.currentHealth += item.amount;
  } else if (item.towerOnly) {
    next.tower.cards[cardId] = clamp((next.tower.cards[cardId] ?? 0) + 1, 1, 5);
  }
  next.history.unshift({ type: 'towerReward', text: `Tower reward: ${item.name}.` });
  if (next.pendingDraft.kind === 'towerStat' && next.pendingDraft.bossBonus) {
    next.pendingDraft = {
      kind: 'towerCard',
      towerFloor: next.pendingDraft.towerFloor,
      options: towerRewardDraft(next, next.pendingDraft.towerFloor, 'towerCard'),
    };
  } else {
    next.pendingDraft = null;
  }
  return next;
}

export function towerCardAtRank(cardId, rank = 1) {
  const base = CARDS[cardId];
  if (!base?.towerOnly) return base;
  const towerRank = clamp(Math.floor(Number(rank) || 1), 1, 5);
  const multiplier = 1 + (towerRank - 1) * 0.15;
  const scalable = new Set(['damage', 'block', 'heal', 'spirit', 'focus', 'ki', 'maxKi']);
  const effect = Object.fromEntries(Object.entries(base.effect).map(([key, value]) => [
    key,
    scalable.has(key) && typeof value === 'number' ? Math.round(value * multiplier) : value,
  ]));
  if (effect.healPercent) effect.healPercent = Math.min(1, effect.healPercent + (towerRank - 1) * 0.05);
  if (effect.formSupport) effect.formSupport += (towerRank - 1) * 0.03;
  return { ...base, effect, towerRank };
}

export function recordTowerVictory(state, encounter, cooldowns = {}) {
  const floor = encounter.towerFloor;
  const boss = floor % 5 === 0;
  const healedHealth = boss
    ? state.stats.health
    : Math.min(state.stats.health, state.currentHealth + Math.ceil(state.stats.health * 0.25));
  const zeni = 25 + floor * 8;
  return {
    ...state,
    activeCombat: null,
    zeni: state.zeni + zeni,
    cooldowns: { ...state.cooldowns, ...cooldowns },
    currentHealth: healedHealth,
    tower: {
      ...state.tower,
      active: true,
      currentFloor: floor + 1,
      highestFloor: Math.max(state.tower.highestFloor, floor),
    },
    pendingDraft: {
      kind: 'towerStat',
      towerFloor: floor,
      bossBonus: boss,
      options: towerRewardDraft(state, floor, 'stat'),
    },
    history: [{ type: 'towerVictory', text: `Cleared Infinite Tower floor ${floor} and earned ${zeni} Zeni.` }, ...state.history].slice(0, 100),
  };
}

export function recordTowerDefeat(state, encounter) {
  const injury = INJURY_CARDS[(state.history.length + encounter.towerFloor) % INJURY_CARDS.length].id;
  return {
    ...state,
    activeCombat: null,
    currentHealth: Math.max(1, Math.round(state.stats.health * 0.28)),
    injuries: [...state.injuries, injury].slice(-5),
    tower: {
      ...state.tower,
      active: false,
      currentFloor: 1,
      highestFloor: Math.max(state.tower.highestFloor, encounter.towerFloor - 1),
    },
    history: [{ type: 'towerDefeat', text: `The Infinite Tower ended the run on floor ${encounter.towerFloor}.` }, ...state.history].slice(0, 100),
  };
}
