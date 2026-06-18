import { CARDS, INJURY_CARDS, STAT_CARD_IDS, TOWER_CARD_IDS, TOWER_ENEMY_NAMES } from './data.mjs';
import { hashSeed, sample } from './random.mjs';
import { fail, ok } from './action-result.mjs';

const clone = (value) => structuredClone(value);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const SPECIAL_TOWER_ENEMIES = [
  {
    id: 'solar-crown-tyrant',
    name: 'Solar Crown Tyrant',
    image: 'enemy-tower-special-solar-crown-tyrant.jpg',
    color: '#f6b73c',
  },
  {
    id: 'void-lotus-assassin',
    name: 'Void Lotus Assassin',
    image: 'enemy-tower-special-void-lotus-assassin.jpg',
    color: '#c45cff',
  },
  {
    id: 'crimson-comet-brute',
    name: 'Crimson Comet Brute',
    image: 'enemy-tower-special-crimson-comet-brute.jpg',
    color: '#ff4f5e',
  },
  {
    id: 'chrono-mirror-sage',
    name: 'Chrono Mirror Sage',
    image: 'enemy-tower-special-chrono-mirror-sage.jpg',
    color: '#62d7ff',
  },
  {
    id: 'emerald-oni-champion',
    name: 'Emerald Oni Champion',
    image: 'enemy-tower-special-emerald-oni-champion.jpg',
    color: '#42f584',
  },
  {
    id: 'storm-halo-android',
    name: 'Storm Halo Android',
    image: 'enemy-tower-special-storm-halo-android.jpg',
    color: '#4f8cff',
  },
  {
    id: 'obsidian-dragon-herald',
    name: 'Obsidian Dragon Herald',
    image: 'enemy-tower-special-obsidian-dragon-herald.jpg',
    color: '#f06adf',
  },
  {
    id: 'celestial-gravity-king',
    name: 'Celestial Gravity King',
    image: 'enemy-tower-special-celestial-gravity-king.jpg',
    color: '#ffd85e',
  },
];

export function specialTowerEnemyForFloor(floor) {
  const safeFloor = Math.max(1, Math.floor(Number(floor) || 1));
  if (safeFloor < 7 || (safeFloor % 7 !== 0 && safeFloor % 25 !== 0)) return null;
  const offset = safeFloor % 25 === 0 ? 3 : 0;
  return SPECIAL_TOWER_ENEMIES[(Math.floor(safeFloor / 7) + offset) % SPECIAL_TOWER_ENEMIES.length];
}

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
  const specialEnemy = specialTowerEnemyForFloor(safeFloor);
  const cycle = Math.floor((safeFloor - 1) / TOWER_ENEMY_NAMES.length);
  const baseName = specialEnemy?.name ?? TOWER_ENEMY_NAMES[(safeFloor - 1) % TOWER_ENEMY_NAMES.length];
  const suffix = cycle ? ` Ascended ${cycle + 1}` : '';
  const deepFloorPower = Math.pow(Math.max(0, safeFloor - 10), 1.6) * 4;
  const baseEnemyPower = 36 + safeFloor * 15 + Math.pow(safeFloor, 1.22) * 3 + deepFloorPower;
  const specialEnemyPower = specialEnemy ? 12 : 0;
  return {
    id: `tower-floor-${safeFloor}`,
    source: 'tower',
    towerFloor: safeFloor,
    age: state.age,
    type: boss ? 'specialFight' : 'fighter',
    name: `${baseName}${suffix}`,
    difficulty: Math.max(1, Math.ceil(safeFloor / 3)) + (specialEnemy ? 2 : 0),
    enemyPower: Math.round(baseEnemyPower + specialEnemyPower),
    reward: 'tower',
    specialTowerEnemy: Boolean(specialEnemy),
    specialTowerEnemyId: specialEnemy?.id ?? null,
    specialTowerEnemyName: specialEnemy?.name ?? '',
    specialTowerEnemyImage: specialEnemy?.image ?? '',
    specialTowerEnemyColor: specialEnemy?.color ?? '',
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

export function tryStartTowerRun(state) {
  if (state.age < 8) return fail(state, 'The Infinite Tower opens at age 8.');
  if (state.pendingDraft) return fail(state, 'Choose your pending reward first.');
  if (state.activeCombat) return fail(state, 'Finish the current combat first.');
  if (state.tower?.active) return fail(state, 'The Infinite Tower run is already active.');
  return ok(startTowerRun(state), 'Infinite Tower run started.');
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

export function trySetTowerLoadout(state, loadout) {
  const validation = validateTowerLoadout(state, loadout);
  if (!validation.valid) return fail(state, validation.reason);
  return ok(setTowerLoadout(state, loadout), 'Tower loadout updated.');
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

export function tryClaimTowerReward(state, cardId) {
  if (!state.pendingDraft) return fail(state, 'Choose your pending reward first.');
  if (!['towerStat', 'towerCard'].includes(state.pendingDraft.kind) || !state.pendingDraft.options?.includes(cardId)) {
    return fail(state, 'That reward is unavailable.');
  }
  return ok(claimTowerReward(state, cardId), `Tower reward: ${CARDS[cardId]?.name}.`);
}

export function retireTowerRun(state) {
  if (!state.tower?.active) return state;
  const floor = Math.max(1, Math.floor(Number(state.tower.currentFloor) || 1));
  return {
    ...state,
    tower: {
      ...state.tower,
      active: false,
      currentFloor: 1,
      highestFloor: state.tower.highestFloor,
      cards: { ...state.tower.cards },
      loadout: [...state.tower.loadout],
    },
    history: [{ type: 'tower', text: `Retired from the Infinite Tower on floor ${floor}.` }, ...state.history].slice(0, 100),
  };
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
