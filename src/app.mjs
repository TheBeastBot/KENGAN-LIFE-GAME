import {
  CLANS,
  CLAN_RARITIES,
  FIGHT_TACTICS,
  FIGHT_MOVES,
  HUNTER_MONSTER_MOVES,
  HUNTER_MOVES,
  SORCERER_INNATE_TECHNIQUES,
  SORCERER_MOVES,
  ZOMBIE_ACTIVITIES,
  ZOMBIE_ITEM_CATALOG,
  HUNTER_LEVEL_REWARD_OPTIONS,
  HUNTER_ITEM_CATALOG,
  SYSTEM_SHOP_ITEMS,
  MENTORS,
  MONEY_ACTIONS,
  SOCIAL_ACTIONS,
  SOCIAL_TRASH_TALK_STYLES,
  SPECIAL_TRAINING_ACTIONS,
  STAT_CAP,
  RECOVERY_ACTIONS,
  TRAINING_ACTIONS,
  OPPONENTS,
  acceptClan,
  ageUp,
  createNewLife,
  advanceMonarchTrace,
  battleShadowDomain,
  buySystemItem,
  chooseSystemEnding,
  craftHunterItem,
  useHunterItem,
  equipHunterItem,
  endLife,
  getAvailableFights,
  getAdaptedOpponent,
  getCombatOpponent,
  getHunterEffectiveStats,
  getSorcererEffectiveStats,
  getSorcererPower,
  getSorcererRankReview,
  getAllSorcererMovesForTechnique,
  getHunterAssociationReview,
  getHunterCraftingRecipes,
  getLockedFights,
  getHunterMilestones,
  getExperienceBoost,
  maxLifeEnergy,
  maxLifeHealth,
  getOpponentArchetype,
  getPlayerArchetype,
  getShadowArmySummary,
  getShadowDomainMap,
  getAutoGateReadiness,
  getAutoRecoveryStatus,
  getAutoTrainingStatus,
  getTrainingAllowance,
  getCoachedFightOptions,
  getSpecialTrainingStatus,
  getSpecialFights,
  getStatCap,
  TECHNIQUE_TRACKS,
  getUnlockedFightMoves,
  getUnlockedHunterMoves,
  getUnlockedSorcererMoves,
  normalizeSorcererWorld,
  normalizeZombieWorld,
  joinTournament,
  recover,
  redeemClanPassword,
  redeemHunterPassword,
  redeemMentorPassword,
  redeemMonarchBodyPassword,
  redeemZombieMonarchPassword,
  redeemWorldResetPassword,
  resetWorld,
  rerollClan,
  resolveEventChoice,
  advanceHunterDailyQuest,
  claimHunterDailyQuest,
  claimHunterLevelReward,
  dismissRetreatedHunterQuest,
  dismissHunterDungeonResult,
  generateHunterGateOffers,
  spendLifeChoice,
  spendMoneyAction,
  startFight,
  startHunterQuestFight,
  retreatHunterQuestFight,
  startRivalFight,
  startTournamentFight,
  specialTrain,
  trashTalkOpponent,
  takeFightTurn,
  train,
  runAutoRoutine,
  coachFighter,
  recoverCoachedFighter,
  recruitCoachedFighter,
  releaseCoachedFighter,
  runHunterDailyQuest,
  generateSorcererMissions,
  selectSorcererMission,
  startSorcererMissionFight,
  dismissSorcererMission,
  scheduleCoachedFight,
  toggleAutoRecovery,
  equipBestAutoGateShadows,
  toggleAutoGateShadow,
  toggleAutoTraining,
  toggleFavoriteTraining,
  useSocialAction,
  spendHunterStatPoint,
  spendHunterStatPoints,
  spendZombieStatPoint,
  runZombieActivity,
  equipZombieItem,
  useZombieItem,
  startZombieEncounter,
  switchZombieCombatant,
  fightMonarchBoss,
  clearGateWithAutoShadows,
  selectHunterGate,
  startHunterDungeonEncounter,
  advanceHunterDungeon,
  retreatHunterDungeon,
  visitHunterAssociation,
  visitSorcererBureau,
  spendSorcererStatPoint,
  spendSorcererStatPoints,
} from './sim.mjs';
import { captureElementScroll, createDropdownStateController, restoreElementScroll } from './ui-state.mjs';

const STORAGE_KEY = 'underground-life-sim-save-v1';
const DROPDOWN_STORAGE_KEY = 'underground-life-sim-dropdowns-v1';
const NAV_FAVORITES_STORAGE_KEY = 'underground-life-sim-nav-favorites-v1';
const LOG_LIMIT = 8;
const AUTO_ROUTINE_INTERVAL_MS = 1000;
const DEVIL_GENE_CLAN_NAME = 'Mishime';
const DEFAULT_CLAN_AWAKENING = {
  stage: 0,
  control: 50,
  corruption: 0,
  lastAwakeningMonth: null,
};
const DEFAULT_HUNTER_WORLD = {
  unlocked: false,
  playerAwakened: false,
  rank: 'E',
  xp: 0,
  level: 1,
  statPoints: 0,
  stats: {
    strength: 0,
    agility: 0,
    vitality: 0,
    sense: 0,
    intelligence: 0,
  },
  gatesCleared: 0,
  dailyQuestsCompleted: 0,
  systemFatigue: 0,
  shadowArmy: [],
  autoGateLoadout: [],
  inventory: [],
  equippedWeapon: null,
  equippedArmor: null,
  gateOffers: [],
  activeDungeon: null,
  redGatePending: false,
  lastGateMonth: null,
  dailyQuest: null,
  pendingLevelRewards: [],
  unlockedSystemPerks: [],
  milestones: {
    promotions: [],
    shadowsExtracted: 0,
    monarchSteps: 0,
    craftedItems: 0,
  },
  itemUpgrades: {},
  shadowSigilPower: 0,
  domainMap: {
    conquered: [],
    lastBattle: null,
    completed: false,
  },
  monarchTrace: {
    unlocked: false,
    stage: 0,
    influence: 0,
    completed: false,
  },
  shadowMonarch: {
    unlocked: false,
    transformedMonth: null,
    evolvedSkills: false,
  },
  monarchWar: {
    unlocked: false,
    defeated: [],
    finalChoiceUnlocked: false,
    lastBattle: null,
  },
  systemEnding: null,
  worldResets: 0,
  secretSystemSkills: [],
  secretSkillCooldowns: {},
};
const DEFAULT_SORCERER_WORLD = {
  unlocked: false,
  awakened: false,
  rank: 'Grade 4',
  xp: 0,
  level: 1,
  statPoints: 0,
  stats: {
    cursedEnergy: 0,
    output: 0,
    control: 0,
    perception: 0,
    technique: 0,
    body: 0,
  },
  innateTechnique: null,
  techniqueMastery: 0,
  missionsCleared: 0,
  curseWins: 0,
  domainWins: 0,
  blackSparks: 0,
  vowStrain: 0,
  missionOffers: [],
  activeMission: null,
  lastMissionMonth: null,
  rejectedUntilMonth: null,
};
const MOVE_ICON_ASSETS = {
  jab: 'assets/icons/jab.png',
  bodyShot: 'assets/icons/body-shot.png',
  lowKickChop: 'assets/icons/low-kick-chop.png',
  blitzStep: 'assets/icons/blitz-step.png',
  demonPressure: 'assets/icons/demon-pressure.png',
  releaseRush: 'assets/icons/release-rush.png',
  grapple: 'assets/icons/clinch-takedown.png',
  collarTie: 'assets/icons/collar-tie.png',
  singleLegEntry: 'assets/icons/single-leg-entry.png',
  bodyLockTrip: 'assets/icons/body-lock-trip.png',
  wristRide: 'assets/icons/wrist-ride-entry.png',
  boneBind: 'assets/icons/bone-bind.png',
  armTriangle: 'assets/icons/arm-triangle.png',
  rearNakedChoke: 'assets/icons/rear-naked-choke.png',
  kneebarThread: 'assets/icons/kneebar-thread.png',
  posturedHammerfists: 'assets/icons/postured-hammerfists.png',
  crossfaceElbows: 'assets/icons/crossface-elbows.png',
  matReturnPunches: 'assets/icons/mat-return-punches.png',
  closedGuardShell: 'assets/icons/closed-guard-shell.png',
  butterflyFrames: 'assets/icons/butterfly-frames.png',
  lockdownStall: 'assets/icons/lockdown-stall.png',
};
const ZOMBIE_COMBAT_ASSETS = {
  unarmed: 'assets/zombie/combat/unarmed.png',
  melee: 'assets/zombie/combat/melee.png',
  range: 'assets/zombie/combat/range.png',
};
const ZOMBIE_ITEM_ASSETS = {
  bandage: 'assets/zombie/items/bandage.png',
  kitchenKnife: 'assets/zombie/items/kitchen-knife.png',
  pipe: 'assets/zombie/items/steel-pipe.png',
  crowbar: 'assets/zombie/items/crowbar.png',
  oldPistol: 'assets/zombie/items/old-pistol.png',
  huntingRifle: 'assets/zombie/items/hunting-rifle.png',
  shotgun: 'assets/zombie/items/shotgun.png',
  bowAndArrow: 'assets/zombie/items/bow-and-arrow.png',
};
const moveIconPreloadCache = [];
const TRAINING_IMAGES = {
  sparTrainingPartner: 'assets/training/spar-training-partner.png',
  heavyBag: 'assets/training/heavy-bag.png',
  roadwork: 'assets/training/roadwork.png',
  ironBody: 'assets/training/iron-body.png',
  studyTape: 'assets/training/study-tape.png',
  sparring: 'assets/training/hard-sparring.png',
  mobilityFlow: 'assets/training/mobility-flow.png',
  killerInstinct: 'assets/training/killer-instinct.png',
  breathAndGuard: 'assets/training/breath-and-guard.png',
  reactionWall: 'assets/training/reaction-wall.png',
};
const SOCIAL_IMAGES = {
  trainingClip: 'assets/social/training-clip.png',
  fightHighlight: 'assets/social/fight-highlight.png',
  injuryUpdate: 'assets/social/injury-update.png',
  clanMystery: 'assets/social/clan-mystery.png',
  livestreamSparring: 'assets/social/livestream-sparring.png',
  sponsorPost: 'assets/social/sponsor-post.png',
};
const COACH_IMAGES = {
  stable: 'assets/coach/stable.png',
  recruit: 'assets/coach/recruit.png',
  coaching: 'assets/coach/coaching.png',
  booking: 'assets/coach/booking.png',
};
const SPECIAL_FIGHTER_PORTRAITS = {
  yujiriHanmae: 'assets/special-fighters/yujiri-hanmae.png',
  ohmoTokitoo: 'assets/special-fighters/ohmo-tokitoo.png',
  raianKuriya: 'assets/special-fighters/raian-kuriya.png',
  bakiyaMaw: 'assets/special-fighters/bakiya-maw.png',
  gokiShibukawae: 'assets/special-fighters/goki-shibukawae.png',
  doppoOrochino: 'assets/special-fighters/doppo-orochino.png',
  kurokiGensae: 'assets/special-fighters/kuroki-gensae.png',
  agitooKanoh: 'assets/special-fighters/agitoo-kanoh.png',
  wakatsukiTakeshee: 'assets/special-fighters/wakatsuki-takeshee.png',
  rolonDonairee: 'assets/special-fighters/rolon-donairee.png',
  jakkuHanmoe: 'assets/special-fighters/jakku-hanmoe.png',
  katsumiOrochino: 'assets/special-fighters/katsumi-orochino.png',
};

const KENGAN_FIGHTER_IDS = new Set([
  'ohmoTokitoo',
  'raianKuriya',
  'kurokiGensae',
  'agitooKanoh',
  'wakatsukiTakeshee',
  'rolonDonairee',
]);

const BAKI_FIGHTER_IDS = new Set([
  'yujiriHanmae',
  'bakiyaMaw',
  'gokiShibukawae',
  'doppoOrochino',
  'jakkuHanmoe',
  'katsumiOrochino',
]);

const TEKKEN_FIGHTER_IDS = new Set([
  'jinnKazame',
  'kazuroMishime',
  'heihaMishime',
  'kinggJaguar',
  'paulPheonixx',
  'yoshiMitsuo',
]);

let state = loadGame();
let selectedGender = 'Male';
let selectedFirstName = '';
let selectedWorld = 'zombie';
let activeTab = 'life';
let selectedFightCategory = null;
let selectedShadowDomainId = null;
let selectedShadowArmyId = null;
let hunterStatSpendAmount = 1;
let hunterQuestPopupOpen = false;
let hunterDungeonPopupOpen = false;
let systemShopPopupOpen = false;
let hunterItemsPopupOpen = false;
let navMenuOpen = false;
let uiFeedback = { changed: {}, toast: null, latestExchangeKey: null };
let moveIconBurst = null;
let pendingCoachScrollY = null;
let pendingMobileScroll = null;
let pendingPopupScroll = null;
let fightInfoOpen = false;
let feedbackTimer = null;
let autoRoutineTimer = null;
let moveIconBurstTimer = null;
let modalScrollLockY = null;
const MOVE_ICON_BURST_DURATION_MS = 500;

const app = document.querySelector('#app');
const dropdownState = createDropdownStateController({
  storage: localStorage,
  storageKey: DROPDOWN_STORAGE_KEY,
  defaults: {
    'train-favorites': true,
    'train-core': true,
    'recover-core': true,
    'money-fight-prep': true,
    'fight-normal': true,
    'body-experience': true,
    'body-techniques': true,
    'coach-core': true,
    'social-posts': true,
    'hunter-core': true,
    'hunter-actions': true,
    'hunter-milestones': true,
    'hunter-skills': true,
    'hunter-association-panel': true,
    'hunter-shadows': true,
    'hunter-crafting': true,
    'hunter-monarch-trace': true,
    'hunter-stats': true,
    'hunter-log': false,
    'hunter-basic-moves': true,
    'hunter-special-moves': false,
    'sorcerer-core': true,
    'sorcerer-technique': true,
    'sorcerer-missions': true,
    'sorcerer-rank': true,
    'sorcerer-stats': true,
    'sorcerer-log': false,
    'sorcerer-basic-moves': true,
    'sorcerer-special-moves': true,
    'zombie-status': true,
    'zombie-team': true,
    'zombie-supplies': true,
    'zombie-activities': true,
    'zombie-encounters': true,
    'zombie-injuries': true,
    'zombie-stats': true,
    'zombie-log': false,
    'zombie-items-consumables': true,
    'zombie-items-medicine': true,
    'zombie-items-melee': true,
    'zombie-items-range': true,
    'world-rumors': true,
  },
});

const NAV_SECTIONS = [
  ['life', 'Life'],
  ['train', 'Train'],
  ['recover', 'Recover'],
  ['body', 'Body'],
  ['money', 'Money'],
  ['fight', 'Fight'],
  ['tournament', 'Tournaments'],
  ['rival', 'Rival'],
  ['coach', 'Coach'],
  ['social', 'Social'],
  ['hunter', 'Hunter'],
  ['sorcerer', 'Sorcerer'],
  ['zombie', 'Zombie'],
  ['zombie-activities', 'Zombie Activities'],
  ['zombie-items', 'Zombie Items'],
  ['world', 'World'],
];
const FIGHTER_NAV_SECTION_IDS = new Set([
  'life',
  'train',
  'recover',
  'body',
  'money',
  'fight',
  'tournament',
  'rival',
  'coach',
  'social',
  'world',
]);
const ZOMBIE_NAV_SECTION_IDS = new Set(['life', 'zombie', 'zombie-activities', 'zombie-items']);

function saveGame() {
  if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearStoredGameData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(DROPDOWN_STORAGE_KEY);
  localStorage.removeItem(NAV_FAVORITES_STORAGE_KEY);
}

function preloadMoveIcons() {
  for (const src of [...Object.values(MOVE_ICON_ASSETS), ...Object.values(ZOMBIE_COMBAT_ASSETS), ...Object.values(ZOMBIE_ITEM_ASSETS)]) {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    moveIconPreloadCache.push(image);
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const normalized = normalizeSave(JSON.parse(saved));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    return null;
  }
}

function normalizeSave(save) {
  const migratedClan = migrateClan(save.clan);
  const identity = normalizeIdentity(save.identity, migratedClan);
  const activeWorld = ['fighter', 'hunter', 'sorcerer', 'zombie'].includes(save.activeWorld)
    ? save.activeWorld
    : save.zombieWorld?.unlocked
      ? 'zombie'
      : save.sorcererWorld?.unlocked
        ? 'sorcerer'
        : save.hunterWorld?.unlocked
          ? 'hunter'
          : null;
  return {
    ...save,
    identity: {
      ...identity,
      gender: save.identity?.gender ?? 'Male',
      age: save.identity?.age ?? 12,
      month: save.identity?.month ?? 0,
    },
    activeWorld,
    clan: migratedClan,
    clanAwakening: normalizeClanAwakening(save.clanAwakening, migratedClan),
    hunterWorld: normalizeHunterWorld(save.hunterWorld),
    sorcererWorld: normalizeSorcererWorld(save.sorcererWorld),
    zombieWorld: normalizeZombieWorld(save.zombieWorld),
    pendingEvent: save.pendingEvent ?? null,
    trainingPopup: save.trainingPopup ?? null,
    trainingSessionCount: save.trainingSessionCount ?? 0,
    trainingSessionsUsed: Math.max(0, Math.floor(save.trainingSessionsUsed ?? 0)),
    favoriteTrainingIds: Array.isArray(save.favoriteTrainingIds)
      ? save.favoriteTrainingIds.filter((id) => Boolean(TRAINING_ACTIONS[id]))
      : [],
    eventFlags: save.eventFlags ?? {},
    activeFight: normalizeFight(save.activeFight),
    injuries: save.injuries ?? [],
    medicalSuspensionUntil: save.medicalSuspensionUntil ?? 0,
    techniques: normalizeTechniques(save.techniques),
    mentor: normalizeMentor(save.mentor) ?? normalizeMentor({ id: 'tiredCoach' }),
    rival: save.rival ?? null,
    coach: {
      fighters: Array.isArray(save.coach?.fighters) ? save.coach.fighters : [],
      feed: Array.isArray(save.coach?.feed) ? save.coach.feed : [],
    },
    association: save.association ?? null,
    social: {
      platform: save.social?.platform ?? 'Underground Feed',
      followers: save.social?.followers ?? 0,
      calledOutTarget: save.social?.calledOutTarget ?? null,
      lastPostMonth: save.social?.lastPostMonth ?? null,
      lastPost: save.social?.lastPost ?? null,
      postCount: save.social?.postCount ?? 0,
    },
    ownedAssets: save.ownedAssets ?? [],
    nextFightPrep: save.nextFightPrep ?? {},
    autoTraining: save.autoTraining ?? {},
    autoRecovery: save.autoRecovery ?? {},
    unlockedSkills: save.unlockedSkills ?? [],
    defeatedSpecialFights: save.defeatedSpecialFights ?? [],
    specialFightAdaptations: save.specialFightAdaptations ?? {},
    specialTrainingCaps: save.specialTrainingCaps ?? {},
    specialTrainingLastMonth: save.specialTrainingLastMonth ?? null,
    fightCooldowns: save.fightCooldowns ?? {},
    tournament: save.tournament ?? null,
    clanPasswordProgress: save.clanPasswordProgress ?? 0,
    clanPasswordHint: save.clanPasswordHint ?? passwordHint(save.clanPasswordProgress ?? 0),
    clanRerollPity: save.clanRerollPity ?? 0,
    monarchBody: {
      unlocked: Boolean(save.monarchBody?.unlocked),
      source: save.monarchBody?.source ?? null,
      unlockedMonth: save.monarchBody?.unlockedMonth ?? null,
    },
  };
}

function normalizeClanAwakening(awakening, clan) {
  if (clan?.name !== DEVIL_GENE_CLAN_NAME) return null;
  return {
    stage: Math.max(0, Math.min(3, awakening?.stage ?? DEFAULT_CLAN_AWAKENING.stage)),
    control: Math.max(0, Math.min(100, awakening?.control ?? DEFAULT_CLAN_AWAKENING.control)),
    corruption: Math.max(0, Math.min(100, awakening?.corruption ?? DEFAULT_CLAN_AWAKENING.corruption)),
    lastAwakeningMonth: awakening?.lastAwakeningMonth ?? DEFAULT_CLAN_AWAKENING.lastAwakeningMonth,
  };
}

function normalizeHunterInventory(inventory = []) {
  if (!Array.isArray(inventory)) return [];
  const stacks = new Map();
  for (const entry of inventory) {
    const id = typeof entry === 'string' ? entry : entry?.id;
    if (!HUNTER_ITEM_CATALOG[id]) continue;
    const quantity = typeof entry === 'string' ? 1 : Math.max(1, Math.floor(entry.quantity ?? 1));
    stacks.set(id, (stacks.get(id) ?? 0) + quantity);
  }
  return [...stacks.entries()].map(([id, quantity]) => ({ id, quantity }));
}

function hunterItemQuantity(hunter, itemId) {
  return normalizeHunterInventory(hunter?.inventory).find((item) => item.id === itemId)?.quantity ?? 0;
}

function normalizeSystemPerks(perks = []) {
  if (!Array.isArray(perks)) return [];
  const stacks = new Map();
  for (const entry of perks) {
    const id = typeof entry === 'string' ? entry : entry?.id ?? entry?.perk;
    if (!id) continue;
    const count = typeof entry === 'string' ? 1 : Math.max(1, Math.floor(entry.count ?? 1));
    stacks.set(id, (stacks.get(id) ?? 0) + count);
  }
  return [...stacks.entries()].map(([id, count]) => ({ id, count }));
}

function normalizeSecretSystemSkills(skills = []) {
  const allowed = new Set(['ultimateBody', 'shadowSacrifice', 'massCleansing', 'ultimateErasure']);
  return Array.isArray(skills) ? [...new Set(skills.filter((id) => allowed.has(id)))] : [];
}

function normalizeHunterMilestones(milestones = {}) {
  return {
    promotions: Array.isArray(milestones?.promotions) ? milestones.promotions : [],
    shadowsExtracted: Math.max(0, Math.floor(milestones?.shadowsExtracted ?? 0)),
    monarchSteps: Math.max(0, Math.floor(milestones?.monarchSteps ?? 0)),
    craftedItems: Math.max(0, Math.floor(milestones?.craftedItems ?? 0)),
  };
}

function normalizeHunterItemUpgrades(upgrades = {}) {
  return Object.fromEntries(
    Object.entries(upgrades ?? {})
      .filter(([itemId]) => Boolean(HUNTER_ITEM_CATALOG[itemId]))
      .map(([itemId, level]) => [itemId, Math.max(0, Math.min(5, Math.floor(level ?? 0)))])
  );
}

function normalizeMonarchTrace(trace = {}) {
  return {
    unlocked: Boolean(trace?.unlocked),
    stage: Math.max(0, Math.min(4, Math.floor(trace?.stage ?? 0))),
    influence: Math.max(0, Math.min(100, Math.floor(trace?.influence ?? 0))),
    completed: Boolean(trace?.completed),
  };
}

function normalizeDomainMap(map = {}) {
  return {
    conquered: Array.isArray(map?.conquered) ? map.conquered : [],
    lastBattle: map?.lastBattle ?? null,
    completed: Boolean(map?.completed),
  };
}

function normalizeShadowMonarch(shadowMonarch = {}) {
  return {
    unlocked: Boolean(shadowMonarch?.unlocked),
    transformedMonth: shadowMonarch?.transformedMonth ?? null,
    evolvedSkills: Boolean(shadowMonarch?.evolvedSkills),
    powersLost: Boolean(shadowMonarch?.powersLost),
  };
}

function normalizeMonarchWar(war = {}) {
  return {
    unlocked: Boolean(war?.unlocked),
    defeated: Array.isArray(war?.defeated) ? war.defeated : [],
    finalChoiceUnlocked: Boolean(war?.finalChoiceUnlocked),
    lastBattle: war?.lastBattle ?? null,
  };
}

function systemPerkCount(hunter, perkId) {
  return normalizeSystemPerks(hunter?.unlockedSystemPerks).find((item) => item.id === perkId)?.count ?? 0;
}

function shadowStrength(shadow = {}) {
  if (Number.isFinite(shadow.strength)) return Math.max(1, Math.floor(shadow.strength));
  if (Number.isFinite(shadow.power)) return Math.max(1, Math.round(shadow.power / 18));
  return 1;
}

function shadowArmyStrength(hunterWorld) {
  return (hunterWorld?.shadowArmy ?? []).reduce((sum, shadow) => sum + shadowStrength(shadow), 0);
}

function normalizeHunterWorld(hunterWorld = {}) {
  const shadowArmy = Array.isArray(hunterWorld?.shadowArmy)
    ? hunterWorld.shadowArmy.map((shadow, index) => ({
      ...shadow,
      id: typeof shadow?.id === 'string' ? shadow.id : `shadow-${index + 1}`,
      name: typeof shadow?.name === 'string' ? shadow.name : 'Extracted Shadow',
      strength: shadowStrength(shadow),
      role: shadow?.role ?? 'vanguard',
      armyPower: Math.max(1, Math.floor(shadow?.armyPower ?? shadowStrength(shadow) * 10)),
    }))
    : [];
  const shadowIds = new Set(shadowArmy.map((shadow) => shadow.id));
  return {
    ...DEFAULT_HUNTER_WORLD,
    ...hunterWorld,
    unlocked: Boolean(hunterWorld?.unlocked),
    playerAwakened: Boolean(hunterWorld?.playerAwakened),
    rank: hunterWorld?.rank ?? DEFAULT_HUNTER_WORLD.rank,
    xp: Math.max(0, Math.floor(hunterWorld?.xp ?? 0)),
    level: Math.max(1, Math.floor(hunterWorld?.level ?? 1)),
    statPoints: Math.max(0, Math.floor(hunterWorld?.statPoints ?? 0)),
    stats: Object.fromEntries(
      Object.keys(DEFAULT_HUNTER_WORLD.stats).map((stat) => [stat, Math.max(0, Math.floor(hunterWorld?.stats?.[stat] ?? 0))])
    ),
    gatesCleared: Math.max(0, Math.floor(hunterWorld?.gatesCleared ?? 0)),
    dailyQuestsCompleted: Math.max(0, Math.floor(hunterWorld?.dailyQuestsCompleted ?? 0)),
    systemFatigue: Math.max(0, Math.min(100, Math.round(hunterWorld?.systemFatigue ?? 0))),
    shadowArmy,
    autoGateLoadout: Array.isArray(hunterWorld?.autoGateLoadout)
      ? [...new Set(hunterWorld.autoGateLoadout.filter((id) => typeof id === 'string' && shadowIds.has(id)))].slice(0, 10)
      : [],
    inventory: normalizeHunterInventory(hunterWorld?.inventory),
    equippedWeapon: typeof hunterWorld?.equippedWeapon === 'string' ? hunterWorld.equippedWeapon : null,
    equippedArmor: HUNTER_ITEM_CATALOG[hunterWorld?.equippedArmor]?.type === 'armor' ? hunterWorld.equippedArmor : null,
    gateOffers: Array.isArray(hunterWorld?.gateOffers) ? hunterWorld.gateOffers.slice(0, 3) : [],
    activeDungeon: hunterWorld?.activeDungeon ?? null,
    redGatePending: Boolean(hunterWorld?.redGatePending),
    lastGateMonth: hunterWorld?.lastGateMonth ?? null,
    rejectedUntilMonth: hunterWorld?.rejectedUntilMonth ?? null,
    lastBossCleared: hunterWorld?.lastBossCleared ?? null,
    dailyQuest: hunterWorld?.dailyQuest ?? null,
    pendingLevelRewards: Array.isArray(hunterWorld?.pendingLevelRewards) ? hunterWorld.pendingLevelRewards : [],
    unlockedSystemPerks: normalizeSystemPerks(hunterWorld?.unlockedSystemPerks),
    milestones: normalizeHunterMilestones(hunterWorld?.milestones),
    itemUpgrades: normalizeHunterItemUpgrades(hunterWorld?.itemUpgrades),
    shadowSigilPower: Math.max(0, Math.floor(hunterWorld?.shadowSigilPower ?? 0)),
    domainMap: normalizeDomainMap(hunterWorld?.domainMap),
    monarchTrace: normalizeMonarchTrace(hunterWorld?.monarchTrace),
    shadowMonarch: normalizeShadowMonarch(hunterWorld?.shadowMonarch),
    monarchWar: normalizeMonarchWar(hunterWorld?.monarchWar),
    systemEnding: hunterWorld?.systemEnding ?? null,
    worldResets: Math.max(0, Math.floor(hunterWorld?.worldResets ?? 0)),
    secretSystemSkills: normalizeSecretSystemSkills(hunterWorld?.secretSystemSkills),
    secretSkillCooldowns: {
      massCleansingUsed: Boolean(hunterWorld?.secretSkillCooldowns?.massCleansingUsed),
      ultimateErasureUsed: Boolean(hunterWorld?.secretSkillCooldowns?.ultimateErasureUsed),
    },
  };
}

function normalizeIdentity(identity = {}, clan = {}) {
  const firstName = String(identity.firstName ?? identity.name?.split(' ')[0] ?? 'Ren').replace(/\s+/g, ' ').trim() || 'Ren';
  const lastName = clan?.name ?? identity.lastName ?? '';
  return {
    ...identity,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
  };
}

function normalizeTechniques(techniques = {}) {
  return Object.fromEntries(
    Object.keys(TECHNIQUE_TRACKS).map((track) => [track, Math.max(0, Math.floor(techniques?.[track] ?? 0))])
  );
}

function normalizeMentor(mentor) {
  if (!mentor) return null;
  const catalog = MENTORS.find((item) => item.id === mentor.id);
  return catalog ? { ...catalog, ...mentor } : mentor;
}

function passwordHint(progress = 0) {
  const password = 'BUCKY21';
  const revealed = Math.max(0, Math.min(password.length, Math.floor(progress)));
  return password
    .split('')
    .map((character, index) => (index < revealed ? character : '_'))
    .join(' ');
}

function normalizeFight(fight) {
  if (!fight) return null;
  const meters = fight.meters ?? {};
  return {
    ...fight,
    maxRounds: fight.maxRounds ?? 25,
    exchangesPerRound: fight.exchangesPerRound ?? 5,
    moveCooldowns: fight.moveCooldowns ?? {},
    specialCharges: fight.specialCharges ?? 1,
    optimalMove: fight.optimalMove ?? null,
    grappling: normalizeGrapplingUi(fight.grappling),
    meters: {
      ...meters,
      maxPlayerHealth: meters.maxPlayerHealth ?? 100,
      maxOpponentHealth: meters.maxOpponentHealth ?? 100,
      maxPlayerStamina: meters.maxPlayerStamina ?? 100,
      maxOpponentStamina: meters.maxOpponentStamina ?? 100,
    },
  };
}

function normalizeGrapplingUi(grappling = {}) {
  if (grappling?.phase === 'ground') {
    return {
      phase: 'ground',
      top: grappling.top === 'opponent' ? 'opponent' : 'player',
      position: grappling.position ?? 'halfGuard',
      lastTransition: grappling.lastTransition ?? '',
    };
  }
  return {
    phase: 'standing',
    top: null,
    position: null,
    lastTransition: grappling?.lastTransition ?? '',
  };
}

function migrateClan(clan) {
  const renamed = {
    'Harbor Worker Blood': 'Sekiba',
    'Kaizumi Family': 'Sekiba',
    'Sekiba Family': 'Sekiba',
    'Open Road Kin': 'Cosmoe',
    'Mizuhara Line': 'Cosmoe',
    'Cosmoe Line': 'Cosmoe',
    'Iron Vein Clan': 'Doppoe',
    'Tetsugawa Clan': 'Doppoe',
    'Doppoe House': 'Doppoe',
    'Serpent School Clan': 'Ryukoo',
    'Jakurai Clan': 'Ryukoo',
    'Ryukoo Clan': 'Ryukoo',
    'Mirror Fist Lineage': 'Nikoo',
    'Kanemori Line': 'Nikoo',
    'Nikoo Style Line': 'Nikoo',
    'Red Lantern Family': 'Kuri',
    'Kurebayashi Family': 'Kuri',
    'Kuri Clan': 'Kuri',
    'Ghost Step Clan': 'Reihitoo',
    'Shiranami Clan': 'Reihitoo',
    'Reihitoo Clan': 'Reihitoo',
    'Oniwake Bloodline': 'Hanmo',
    'Hanegami Bloodline': 'Hanmo',
    'Hanmo Bloodline': 'Hanmo',
    'Empty Bone Sect': 'Shibukawae',
    'Amahisa House': 'Shibukawae',
    'Shibukawae House': 'Shibukawae',
    'Apex Vessel Line': 'Agitoo',
    'Tokunaga Dynasty': 'Agitoo',
    'Agitoo Dynasty': 'Agitoo',
    'Dragon Maw Clan': 'Bakiya',
    'Ryuzaki Clan': 'Bakiya',
    'Bakiya Clan': 'Bakiya',
    'First Monster Descendant': 'Orochiya',
    'Orogami Bloodline': 'Orochiya',
    'Orochiya Bloodline': 'Orochiya',
    'THE ASHURA': 'Ashura',
    'Mishime Devil Bloodline': 'Mishime',
  };
  const nextName = renamed[clan?.name];
  if (!nextName) return clan;
  return CLANS.find((item) => item.name === nextName) ?? clan;
}

function setState(next, options = {}) {
  const previous = state;
  if (
    !pendingPopupScroll &&
    previous?.activeFight &&
    !previous.activeFight.finished &&
    next?.activeFight?.source === previous.activeFight.source
  ) {
    queueRenderedPopupScroll();
  }
  state = next;
  uiFeedback = buildUiFeedback(previous, next);
  saveGame();
  render();
  applyPendingCoachScroll();
  applyPendingMobileScroll();
  applyPendingPopupScroll();
  scheduleFeedbackClear();
  if (!options.skipAutoRoutine) scheduleAutoRoutine();
}

function isMobileViewport() {
  return window.matchMedia?.('(max-width: 560px)').matches ?? window.innerWidth <= 560;
}

function shouldPreserveMobileScroll(action) {
  if (!isMobileViewport()) return false;
  if (!state) return false;
  if (action === 'new-life' || action === 'reset') return false;
  if (action === 'close-fight' || action.startsWith('start-fight-') || action === 'start-rival-fight') return false;
  if (action === 'join-tournament' || action === 'start-tournament-fight') return false;
  if (action.startsWith('event-')) return false;
  return true;
}

function queueMobileScroll(action, source = null) {
  if (!shouldPreserveMobileScroll(action)) {
    pendingMobileScroll = null;
    return;
  }
  const rect = source?.getBoundingClientRect?.();
  pendingMobileScroll = {
    activeTab,
    scrollY: window.scrollY,
    docHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
    sourceTop: rect?.top ?? null,
  };
}

function applyPendingMobileScroll() {
  if (!pendingMobileScroll) return;
  const pending = pendingMobileScroll;
  pendingMobileScroll = null;
  if (!isMobileViewport() || pending.activeTab !== activeTab) return;
  window.requestAnimationFrame(() => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const heightDelta = document.documentElement.scrollHeight - pending.docHeight;
    const target = Math.min(maxScroll, Math.max(0, pending.scrollY + Math.min(0, heightDelta)));
    window.scrollTo({ top: target, behavior: 'auto' });

    if (pending.sourceTop === null) return;
    window.requestAnimationFrame(() => {
      const drift = Math.abs(window.scrollY - target);
      if (drift > 2) window.scrollTo({ top: Math.min(maxScroll, Math.max(0, target)), behavior: 'auto' });
    });
  });
}

function queuePopupScroll(action, source = null) {
  if (!action?.startsWith('fight-turn-')) return;
  pendingPopupScroll = captureElementScroll(source?.closest?.('[data-scroll-key]'));
}

function queueRenderedPopupScroll() {
  const popup = document.querySelector('[data-scroll-key]');
  pendingPopupScroll = captureElementScroll(popup);
}

function applyPendingPopupScroll() {
  if (!pendingPopupScroll) return;
  const pending = pendingPopupScroll;
  pendingPopupScroll = null;
  window.requestAnimationFrame(() => restoreElementScroll(document, pending));
}

function queueCoachScroll() {
  pendingCoachScrollY = window.scrollY;
}

function applyPendingCoachScroll() {
  if (pendingCoachScrollY === null) return;
  const scrollY = pendingCoachScrollY;
  pendingCoachScrollY = null;
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  });
}

function scheduleFeedbackClear() {
  if (feedbackTimer) window.clearTimeout(feedbackTimer);
  if (!uiFeedback.toast && !Object.keys(uiFeedback.changed ?? {}).length && !uiFeedback.latestExchangeKey) return;
  feedbackTimer = window.setTimeout(() => {
    uiFeedback = { changed: {}, toast: null, latestExchangeKey: null };
    queueMobileScroll('feedback-clear');
    queueRenderedPopupScroll();
    render();
    applyPendingMobileScroll();
    applyPendingPopupScroll();
  }, 1200);
}

function triggerMoveIconBurst(moveId, labelOverride = '') {
  const src = MOVE_ICON_ASSETS[moveId];
  if (!src) return;
  const label = labelOverride || FIGHT_MOVES[moveId]?.label || HUNTER_MOVES[moveId]?.label || moveId;
  moveIconBurst = { id: moveId, label, key: Date.now() };
  if (moveIconBurstTimer) window.clearTimeout(moveIconBurstTimer);
  moveIconBurstTimer = window.setTimeout(() => {
    moveIconBurst = null;
    queueMobileScroll('move-burst-clear');
    render();
    applyPendingMobileScroll();
  }, MOVE_ICON_BURST_DURATION_MS);
}

function clearMoveIconBurstState() {
  moveIconBurst = null;
  if (moveIconBurstTimer) {
    window.clearTimeout(moveIconBurstTimer);
    moveIconBurstTimer = null;
  }
}

function dismissMoveIconBurst() {
  if (!moveIconBurst) return;
  clearMoveIconBurstState();
  queueMobileScroll('move-burst-dismiss');
  render();
  applyPendingMobileScroll();
}

function scheduleAutoRoutine() {
  if (autoRoutineTimer) window.clearInterval(autoRoutineTimer);
  autoRoutineTimer = null;
  if (!state || state.ended) return;
  const hasAutoTraining = Object.values(state.autoTraining ?? {}).some(Boolean);
  const hasAutoRecovery = Object.values(state.autoRecovery ?? {}).some(Boolean);
  if (!hasAutoTraining && !hasAutoRecovery) return;
  autoRoutineTimer = window.setInterval(() => {
    if (!state || state.ended) {
      scheduleAutoRoutine();
      return;
    }
    const next = runAutoRoutine(state);
    if (next !== state) setState(next, { skipAutoRoutine: true });
  }, AUTO_ROUTINE_INTERVAL_MS);
}

function buildUiFeedback(previous, next) {
  const feedback = { changed: {}, toast: null, latestExchangeKey: null };
  if (!previous || !next) return feedback;
  const overlayAlreadyExplainsAction = hasPopupOverlay(previous) || hasPopupOverlay(next);

  const parts = [];
  const addChange = (key, before, after, label) => {
    if (before === after || before == null || after == null) return;
    const delta = after - before;
    feedback.changed[key] = delta > 0 ? 'gain' : 'loss';
    parts.push(`${delta > 0 ? '+' : ''}${delta} ${label}`);
  };
  const resources = [
    ['health', 'Health'],
    ['energy', 'Energy'],
    ['mood', 'Mood'],
    ['reputation', 'Rep'],
    ['money', 'Money'],
    ['clanRerolls', 'Rerolls'],
  ];
  for (const [key, label] of resources) {
    addChange(resourceFeedbackKey(key), previous.resources?.[key], next.resources?.[key], label);
  }

  const previousPower = Object.values(previous.stats ?? {}).reduce((sum, value) => sum + value, 0);
  const nextPower = Object.values(next.stats ?? {}).reduce((sum, value) => sum + value, 0);
  addChange('power', previousPower, nextPower, 'Power');

  for (const [stat, value] of Object.entries(next.stats ?? {})) {
    addChange(`stat-${stat}`, previous.stats?.[stat], value, labelize(stat));
    const beforeCap = getStatCap(previous, stat);
    const afterCap = getStatCap(next, stat);
    if (afterCap > beforeCap) {
      feedback.changed[`stat-${stat}`] = 'cap';
      parts.push(`+${afterCap - beforeCap} ${labelize(stat)} cap`);
    }
  }

  for (const [track, value] of Object.entries(next.techniques ?? {})) {
    addChange(`tech-${track}`, previous.techniques?.[track] ?? 0, value, labelize(track));
  }

  const previousExchangeCount = previous.activeFight?.exchanges?.length ?? 0;
  const latestExchange = next.activeFight?.exchanges?.[0] ?? null;
  if (latestExchange && (next.activeFight?.exchanges?.length ?? 0) > previousExchangeCount) {
    feedback.latestExchangeKey = exchangeKey(latestExchange);
    parts.unshift(`Exchange: dealt ${latestExchange.playerDamage}, took ${latestExchange.enemyDamage}`);
  }

  const newLog = previous.log?.[0]?.id !== next.log?.[0]?.id ? next.log?.[0] : null;
  if (newLog?.text?.startsWith('Auto ')) parts.unshift(newLog.text);
  if (!parts.length && newLog) parts.push(newLog.text);
  feedback.toast = !overlayAlreadyExplainsAction && parts.length ? parts.slice(0, 4).join(' / ') : null;
  return feedback;
}

function hasPopupOverlay(life) {
  return Boolean(life?.pendingEvent || life?.trainingPopup || life?.social?.lastPost);
}

function resourceFeedbackKey(key) {
  return {
    reputation: 'rep',
    clanRerolls: 'rerolls',
  }[key] ?? key;
}

function feedbackClass(key) {
  const tone = uiFeedback.changed?.[key];
  return tone ? `feedback-${tone}` : '';
}

function exchangeKey(exchange) {
  return `${exchange.round}-${exchange.moveId ?? exchange.tactic}-${exchange.opponentMoveId ?? exchange.opponentTactic}-${exchange.playerDamage}-${exchange.enemyDamage}`;
}

function rarityInfo(name) {
  return CLAN_RARITIES.find((rarity) => rarity.name === name) ?? CLAN_RARITIES[0];
}

function statTotal() {
  return Object.values(state.stats).reduce((sum, value) => sum + value, 0);
}

function currentStatCap(stat) {
  return getStatCap(state, stat);
}

function ageLabel(identity) {
  return identity.month > 0 ? `${identity.age}y ${identity.month}m` : `${identity.age}`;
}

function requiresClanRerollConfirmation(life) {
  return life.resources.clanRerolls > 0 && ['Legendary', 'Mythic', 'Secret'].includes(life.clan.rarity);
}

function button(label, action, className = '') {
  return `<button class="${className}" data-action="${action}">${label}</button>`;
}

function renderCollapsibleSection({ id, title, subtitle = '', count = '', body = '', className = '' }) {
  const open = dropdownState.isOpen(id);
  return `
    <details class="collapsible-section ${className}" data-dropdown-id="${id}" ${open ? 'open' : ''}>
      <summary class="collapsible-summary">
        <span>
          <strong>${title}</strong>
          ${subtitle ? `<em>${subtitle}</em>` : ''}
        </span>
        ${count !== '' ? `<b>${count}</b>` : ''}
      </summary>
      <div class="collapsible-body">
        ${body}
      </div>
    </details>
  `;
}

function renderStart() {
  const worlds = [
    ['zombie', 'Zombie', 'Rooted survival, scarce supplies, teammates, guns, and permanent wounds.'],
    ['hunter', 'Hunter', 'System gates, stat points, shadows, and Monarch world recreation.'],
    ['sorcerer', 'Sorcerer', 'Cursed energy, missions, innate techniques, and domain pressure.'],
    ['fighter', 'Fighter', 'Underground martial arts, tournaments, rivals, coaches, and clans.'],
  ];
  app.innerHTML = `
    <main class="shell start-shell">
      <section class="hero-panel">
        <p class="eyebrow">Underground Life Sim</p>
        <h1>Choose the world that breaks you first.</h1>
        <p class="subcopy">Each life now commits to one progression path. Hunter Monarchs can later recreate reality into another world with bonuses.</p>
        <label class="name-field" for="first-name-input">
          <span>First Name</span>
          <input id="first-name-input" type="text" autocomplete="given-name" maxlength="24" placeholder="Enter first name" value="${escapeHtml(selectedFirstName)}" />
        </label>
        <div class="world-choice-grid">
          ${worlds.map(([id, label, text]) => `
            <button class="world-choice ${selectedWorld === id ? 'selected' : ''}" data-world="${id}">
              <strong>${label}</strong>
              <span>${text}</span>
            </button>
          `).join('')}
        </div>
        <div class="gender-grid">
          ${['Male', 'Female', 'Nonbinary'].map((gender) => `
            <button class="gender-btn ${selectedGender === gender ? 'selected' : ''}" data-gender="${gender}">${gender}</button>
          `).join('')}
        </div>
        <button class="primary wide" data-action="new-life">Start New Life</button>
      </section>
      <section class="rarity-strip">
        ${CLAN_RARITIES.map((rarity) => `<span class="badge ${rarity.color}">${rarity.name}</span>`).join('')}
      </section>
    </main>
  `;
}

function render() {
  if (!state) {
    syncBodyScrollLock(false);
    renderStart();
    return;
  }

  if (state.ended) {
    syncBodyScrollLock(false);
    renderEndedLife();
    return;
  }

  const fullScreenView = renderFullScreenView();
  app.innerHTML = fullScreenView || `
    <main class="shell game-shell dossier-shell">
      ${renderHeader()}
      ${renderTabs()}
      <section class="content-panel dossier-panel">${renderActiveTab()}</section>
    </main>
  `;
  app.innerHTML += `
    ${renderToast()}
    ${renderMoveIconBurst()}
    ${state.trainingPopup ? renderTrainingPopup() : ''}
    ${state.social?.lastPost ? renderSocialPostPopup() : ''}
    ${state.pendingEvent ? renderPendingEvent() : ''}
  `;
  syncBodyScrollLock();
}

function renderFullScreenView() {
  return navMenuOpen
    ? renderNavMenu()
    : renderHunterFullScreenFlow()
      || renderHunterItemsPopup()
      || renderSystemShopPopup();
}

function hunterMandatoryPopupKind(hunter = state?.hunterWorld) {
  if (hunter?.pendingLevelRewards?.length) return 'levelReward';
  return '';
}

function hasMandatoryHunterPopup(hunter = state?.hunterWorld) {
  return Boolean(hunterMandatoryPopupKind(hunter));
}

function hasActiveHunterDungeonReport() {
  return Boolean(
    state.activeFight?.source === 'hunterDungeon' && state.hunterWorld?.activeDungeon ||
    state.hunterWorld?.activeDungeon?.completed
  );
}

function renderHunterFullScreenFlow() {
  if (state.activeFight?.source === 'hunterQuest') return renderHunterQuestPopup();
  if (state.activeFight?.source === 'hunterDungeon' && !state.activeFight.finished) return renderHunterDungeonPopup();
  if (hunterMandatoryPopupKind() === 'levelReward') return renderHunterLevelRewardPopup();
  if (hasActiveHunterDungeonReport()) return renderHunterDungeonPopup();
  if (hunterQuestPopupOpen) return renderHunterQuestPopup();
  if (hunterDungeonPopupOpen) return renderHunterDungeonPopup();
  return '';
}

function clearHunterPopupFlags() {
  hunterQuestPopupOpen = false;
  hunterDungeonPopupOpen = false;
  hunterItemsPopupOpen = false;
  systemShopPopupOpen = false;
}

function applyHunterPopupHandoff(nextState) {
  if (!hasMandatoryHunterPopup(nextState?.hunterWorld)) return;
  clearHunterPopupFlags();
  clearMoveIconBurstState();
}

function hasOpenModal() {
  if (!state) return false;
  return Boolean(
    state.trainingPopup ||
    state.social?.lastPost ||
    state.pendingEvent
  );
}

function syncBodyScrollLock(forceOpen = hasOpenModal()) {
  if (forceOpen && modalScrollLockY === null) {
    modalScrollLockY = window.scrollY;
    document.body.style.top = `-${modalScrollLockY}px`;
    document.body.classList.add('modal-open');
    return;
  }
  if (!forceOpen && modalScrollLockY !== null) {
    const restoreY = modalScrollLockY;
    modalScrollLockY = null;
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo({ top: restoreY, behavior: 'auto' });
  }
}

function renderToast() {
  if (!uiFeedback.toast) return '';
  return `<aside class="action-toast" aria-live="polite">${escapeHtml(uiFeedback.toast)}</aside>`;
}

function renderMoveIconBurst() {
  if (!moveIconBurst) return '';
  const src = MOVE_ICON_ASSETS[moveIconBurst.id];
  if (!src) return '';
  return `
    <aside class="move-icon-burst" aria-hidden="true" style="--burst-icon: url('${src}')">
      <span>${moveIconBurst.label}</span>
    </aside>
  `;
}

function renderEndedLife() {
  app.innerHTML = `
    <main class="shell start-shell">
      <section class="hero-panel legacy-panel">
        <p class="eyebrow">${escapeHtml(state.legacySummary?.eyebrow ?? 'Legacy Summary')}</p>
        <h1>${escapeHtml(state.legacySummary?.title ?? state.identity.name)}</h1>
        <div class="legacy-lines">
          ${(state.legacySummary?.lines ?? []).map((line) => `<p>${escapeHtml(line)}</p>`).join('')}
        </div>
        <div class="action-grid">
          <button class="primary" data-action="new-life">New Life</button>
          <button data-action="reset">Clear Save</button>
        </div>
      </section>
    </main>
  `;
}

function renderHeader() {
  const rarity = rarityInfo(state.clan.rarity);
  return `
    <header class="top-card fighter-passport">
      <div class="fighter-id">
        <p class="eyebrow">${state.phase} / ${state.rank}</p>
        <h1>${escapeHtml(state.identity.name)}</h1>
        <p class="muted">Age ${ageLabel(state.identity)} / ${state.identity.gender} / ${state.background.neighborhood}</p>
      </div>
      <div class="header-actions">
        <span class="badge ${rarity.color}">${state.clan.rarity}</span>
        <button class="small-btn menu-btn" data-action="nav-menu-open">Menu</button>
      </div>
      <div class="status-grid resource-chips">
        ${metric('Health', `${state.resources.health}/${maxLifeHealth(state)}`)}
        ${metric('Energy', `${state.resources.energy}/${maxLifeEnergy(state)}`)}
        ${metric('Mood', state.resources.mood)}
        ${metric('Rep', state.resources.reputation)}
        ${metric('Money', `$${state.resources.money}`)}
        ${metric('Power', statTotal())}
        ${metric('Archetype', getPlayerArchetype(state))}
      </div>
    </header>
  `;
}

function metric(label, value) {
  const tone = label.toLowerCase().replace(/\s+/g, '-');
  return `<div class="metric resource-chip ${tone} ${feedbackClass(tone)}"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderTabs() {
  const available = availableNavSections();
  const favorites = favoriteNavTabs().map((id) => available.find(([tabId]) => tabId === id)).filter(Boolean);
  const tabs = [available.find(([id]) => id === 'life'), ...favorites].filter(Boolean);
  return `
    <nav class="tabs bottom-nav" aria-label="Main game sections">
      ${tabs.map(([id, label]) => `<button class="tab-btn ${activeTab === id ? 'active' : ''}" data-tab="${id}"><span>${label}</span></button>`).join('')}
      <button class="tab-btn menu-tab-btn" data-action="nav-menu-open"><span>Menu</span></button>
    </nav>
  `;
}

function availableNavSections() {
  return NAV_SECTIONS.filter(([id]) => {
    if (state.activeWorld === 'zombie') return ZOMBIE_NAV_SECTION_IDS.has(id) && (id !== 'zombie-activities' || state.zombieWorld?.unlocked);
    if (state.activeWorld === 'fighter' && !FIGHTER_NAV_SECTION_IDS.has(id)) return false;
    if (id === 'hunter') return state.hunterWorld?.unlocked;
    if (id === 'sorcerer') return state.sorcererWorld?.unlocked;
    if (id === 'zombie') return state.zombieWorld?.unlocked;
    if (id === 'zombie-activities') return state.zombieWorld?.unlocked;
    if (id === 'zombie-items') return state.zombieWorld?.unlocked;
    return true;
  });
}

function favoriteNavTabs() {
  try {
    const ids = JSON.parse(localStorage.getItem(NAV_FAVORITES_STORAGE_KEY) ?? '[]');
    const available = new Set(availableNavSections().map(([id]) => id));
    return Array.isArray(ids) ? ids.filter((id) => id !== 'life' && available.has(id)).slice(0, 4) : [];
  } catch {
    return [];
  }
}

function saveFavoriteNavTabs(ids) {
  localStorage.setItem(NAV_FAVORITES_STORAGE_KEY, JSON.stringify(ids.slice(0, 4)));
}

function toggleFavoriteNavTab(id) {
  if (id === 'life') return;
  const favorites = favoriteNavTabs();
  const next = favorites.includes(id)
    ? favorites.filter((tabId) => tabId !== id)
    : favorites.length >= 4
      ? favorites
      : [...favorites, id];
  saveFavoriteNavTabs(next);
}

function renderNavMenu() {
  const favorites = new Set(favoriteNavTabs());
  const favoriteCount = favorites.size;
  return `
    <main class="screen-view nav-menu-screen">
      <section class="screen-panel nav-menu-panel">
        <header class="nav-menu-header">
          <div>
            <p class="eyebrow">Navigation Menu</p>
            <h2>Game Sections</h2>
          </div>
          <button class="small-btn" data-action="nav-menu-close">Close</button>
        </header>
        <p class="muted">Favorite up to 4 sections. Favorites stay beside Life on the main screen.</p>
        <div class="nav-menu-list">
          ${availableNavSections().map(([id, label]) => {
            const favorite = favorites.has(id);
            const lockedFavorite = id === 'life' || (!favorite && favoriteCount >= 4);
            return `
              <article class="nav-menu-row ${activeTab === id ? 'active' : ''}">
                <button class="nav-menu-section" data-tab="${id}">
                  <strong>${label}</strong>
                  <span>${id === 'life' ? 'Always shown' : favorite ? 'Shown on main bar' : 'In menu'}</span>
                </button>
                <button class="favorite-nav-toggle ${favorite ? 'selected' : ''}" data-action="favorite-nav-${id}" ${lockedFavorite ? 'disabled' : ''} aria-label="${favorite ? 'Remove' : 'Add'} ${label} ${favorite ? 'from' : 'to'} favorites" title="${id === 'life' ? 'Life is always shown' : favorite ? 'Remove from favorites' : favoriteCount >= 4 ? 'Favorite limit reached' : 'Add to favorites'}">
                  ${favorite ? '★' : '☆'}
                </button>
              </article>
            `;
          }).join('')}
        </div>
        <button class="danger wide" data-action="reset">Reset Life</button>
      </section>
    </main>
  `;
}

function renderActiveTab() {
  const available = new Set(availableNavSections().map(([id]) => id));
  if (!available.has(activeTab)) activeTab = 'life';
  if (activeTab === 'train') return renderTrain();
  if (activeTab === 'recover') return renderRecover();
  if (activeTab === 'money') return renderMoney();
  if (activeTab === 'fight') return renderFight();
  if (activeTab === 'tournament') return renderTournament();
  if (activeTab === 'rival') return renderRival();
  if (activeTab === 'coach') return renderCoach();
  if (activeTab === 'body') return renderBody();
  if (activeTab === 'social') return renderSocial();
  if (activeTab === 'hunter') return renderHunter();
  if (activeTab === 'sorcerer') return renderSorcerer();
  if (activeTab === 'zombie') return renderZombie();
  if (activeTab === 'zombie-activities') return renderZombieActivitiesTab();
  if (activeTab === 'zombie-items') return renderZombieItems();
  if (activeTab === 'world') return renderWorld();
  return renderLife();
}

function renderLife() {
  const hunter = normalizeHunterWorld(state.hunterWorld);
  const canResetWorld = hunter.shadowMonarch?.unlocked && hunter.monarchWar?.finalChoiceUnlocked;
  return `
    <section class="stack">
      ${renderCollapsibleSection({
        id: 'life-current-clan',
        title: state.clan.name,
        subtitle: state.clan.description,
        count: `${state.resources.clanRerolls} Rerolls`,
        className: 'current-clan-dropdown',
        body: renderCurrentClanDetails(),
      })}
      <div class="action-grid">
        ${button('Age Up', 'age-up', 'primary')}
        ${button('Reroll Clan', 'reroll-clan')}
        ${button('Accept Clan', 'accept-clan')}
        ${button('Focus School', 'choice-school')}
        ${button('Street Fight', 'choice-street')}
        ${button('Work Shift', 'choice-job')}
        ${button('Find Mentor', 'choice-mentor')}
      </div>
      <article class="clan-password-card">
        <div>
          <p class="eyebrow">Clan Password</p>
          <h2>Bloodline Override</h2>
          <p class="muted">Enter a valid password to force the secret clan roll.</p>
          <p class="password-hint">${state.clanPasswordHint ?? passwordHint(state.clanPasswordProgress ?? 0)}</p>
          <p class="muted">Tournament titles reveal one character at a time.</p>
        </div>
        <div class="password-row">
          <input id="clan-password-input" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Enter password" />
          <button class="primary" data-action="redeem-clan-password">Redeem</button>
        </div>
      </article>
      <article class="clan-password-card hunter-password-card">
        <div>
          <p class="eyebrow">Hunter Password</p>
          <h2>Gate Override</h2>
          <p class="muted">Enter SOLO21 after age 18 to force the Hunter awakening event.</p>
        </div>
        <div class="password-row">
          <input id="hunter-password-input" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Enter password" />
          <button class="primary" data-action="redeem-hunter-password">Redeem</button>
        </div>
      </article>
      <article class="clan-password-card hunter-password-card">
        <div>
          <p class="eyebrow">Mentor Password</p>
          <h2>Secret Mentor</h2>
          <p class="muted">Reach S-rank Hunter to recover the password for a mentor with 2x normal training growth.</p>
        </div>
        <div class="password-row">
          <input id="mentor-password-input" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Enter password" />
          <button class="primary" data-action="redeem-mentor-password">Redeem</button>
        </div>
      </article>
      <article class="clan-password-card hunter-password-card">
        <div>
          <p class="eyebrow">Monarch Body Password</p>
          <h2>Body Override</h2>
          <p class="muted">Enter the hidden body override password to raise current stats to their current caps.</p>
        </div>
        <div class="password-row">
          <input id="monarch-body-password-input" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Enter password" />
          <button class="primary" data-action="redeem-monarch-body-password">Redeem</button>
        </div>
      </article>
      <article class="clan-password-card hunter-password-card">
        <div>
          <p class="eyebrow">World Reset Override</p>
          <h2>Debug Gate</h2>
          <p class="muted">Enter a valid hidden override to force a World Reset test file.</p>
        </div>
        <div class="password-row">
          <input id="world-reset-password-input" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Enter password" />
          <button class="primary" data-action="redeem-world-reset-password">Redeem</button>
        </div>
      </article>
      ${renderCollapsibleSection({
        id: 'life-mentor',
        title: 'Mentor',
        subtitle: state.mentor ? `${state.mentor.name} / ${state.mentor.title}` : 'No mentor known',
        body: renderMentorSummary(),
      })}
      ${renderCollapsibleSection({
        id: 'life-feed',
        title: 'Life Feed',
        subtitle: 'Recent life, event, fight, and world updates.',
        count: state.log.length,
        body: renderLog(),
      })}
      <button class="danger" data-action="end-life">End Life</button>
      <button class="danger" data-action="reset">Reset Life</button>
      ${canResetWorld ? `
        <article class="option-card system-window world-reset-card">
          <div>
            <p class="eyebrow">RESET THE WORLD</p>
            <h3>Choose the recreated world</h3>
            <p>Hunter Monarch authority can restart reality as Hunter, Zombie, Sorcerer, or Fighter.</p>
          </div>
          <div class="action-grid">
            <button class="primary" data-action="world-reset">Default Hunter Reset</button>
            ${button('Hunter', 'world-reset-hunter', 'primary')}
            ${button('Zombie', 'world-reset-zombie', 'danger')}
            ${button('Sorcerer', 'world-reset-sorcerer')}
            ${button('Fighter', 'world-reset-fighter')}
          </div>
        </article>
      ` : ''}
    </section>
  `;
}

function renderCurrentClanDetails() {
  const clan = state.clan;
  const rarity = rarityInfo(clan.rarity);
  return `
    <article class="current-clan-details">
      <span class="badge ${rarity.color}">${clan.rarity}</span>
      <div class="clan-ref-grid">
        <p><strong>Bonuses</strong><span>${formatClanBonuses(clan)}</span></p>
        <p><strong>Passive</strong><span>${formatClanPassive(clan)}</span></p>
        <p><strong>Special</strong><span>${formatClanSpecial(clan)}</span></p>
        ${renderCurrentClanAwakeningDetails()}
        <p><strong>Traits</strong><span>${clan.traits.join(', ')}</span></p>
        <p><strong>Options</strong><span>${clan.options.join(', ')}</span></p>
        <p><strong>Drawbacks</strong><span>${clan.drawbacks.join(', ')}</span></p>
      </div>
    </article>
  `;
}

function renderCurrentClanAwakeningDetails() {
  const awakening = normalizeClanAwakening(state.clanAwakening, state.clan);
  if (!awakening) return '';
  return `
    <p><strong>Awakening Stage</strong><span>${awakening.stage} / 3</span></p>
    <p><strong>Control</strong><span>${awakening.control} / 100</span></p>
    <p><strong>Corruption</strong><span>${awakening.corruption} / 100</span></p>
  `;
}

function renderTrain() {
  const allowance = getTrainingAllowance(state);
  const favorites = (state.favoriteTrainingIds ?? []).filter((id) => Boolean(TRAINING_ACTIONS[id]));
  return `
    <section class="stack">
      ${renderCollapsibleSection({
        id: 'train-favorites',
        title: 'Favorite Trainings',
        subtitle: favorites.length ? 'Your prioritized sessions, ready without hunting through the full list.' : 'Star a normal training to keep it here for quick access.',
        count: favorites.length,
        body: favorites.length
          ? `<section class="card-list">${favorites.map((id) => renderTrainingCard(id, TRAINING_ACTIONS[id])).join('')}</section>`
          : '<article class="option-card favorite-empty-state"><h2>No favorites yet</h2><p>Tap the star on a normal training to add it here.</p></article>',
      })}
      ${renderCollapsibleSection({
        id: 'train-core',
        title: 'Training',
        subtitle: `${allowance.used} / ${allowance.limit} sessions used - ${allowance.remaining} remaining until Age Up. Auto runs every ${AUTO_ROUTINE_INTERVAL_MS / 1000} seconds.`,
        count: Object.keys(TRAINING_ACTIONS).length,
        body: `<section class="card-list">${Object.entries(TRAINING_ACTIONS).map(([id, action]) => renderTrainingCard(id, action)).join('')}</section>`,
      })}
      ${renderCollapsibleSection({
        id: 'train-special',
        title: 'Special Trainings',
        subtitle: 'Monthly ceiling work that raises stat caps instead of direct stats.',
        count: Object.keys(SPECIAL_TRAINING_ACTIONS).length,
        body: `<section class="card-list">${Object.entries(SPECIAL_TRAINING_ACTIONS).map(([id, action]) => renderSpecialTrainingCard(id, action)).join('')}</section>`,
      })}
    </section>
  `;
}

function renderTrainingCard(id, action) {
  const allowance = getTrainingAllowance(state);
  const autoStatus = getAutoTrainingStatus(state, id);
  const autoEnabled = Boolean(state.autoTraining?.[id]) && !autoStatus.locked;
  const autoBlocked = allowance.exhausted && !autoEnabled;
  const favorite = state.favoriteTrainingIds?.includes(id);
  return `
    <article class="option-card train-card" data-train-card="${id}">
      <button class="favorite-training-toggle ${favorite ? 'selected' : ''}" data-action="favorite-train-${id}" aria-pressed="${favorite ? 'true' : 'false'}" aria-label="${favorite ? 'Remove' : 'Add'} ${escapeHtml(action.name)} ${favorite ? 'from' : 'to'} favorites" title="${favorite ? 'Remove from favorites' : 'Add to favorites'}">
        <span aria-hidden="true">${favorite ? '&#9733;' : '&#9734;'}</span>
      </button>
      ${renderTrainingImage(id, action)}
      <div>
        <h2>${action.name}</h2>
        <p>${action.text}</p>
        <p class="muted">Cost ${action.cost} energy / Risk ${action.risk}</p>
        <p class="muted">Auto: ${autoStatus.reason}</p>
        ${allowance.exhausted ? '<p class="training-limit-warning">Training limit reached. Age Up to train again.</p>' : ''}
      </div>
      <div class="mini-actions two-actions">
        <button data-action="train-${id}" ${allowance.exhausted ? 'disabled' : ''}>Train</button>
        <button class="small-btn ${autoEnabled ? 'primary' : ''}" data-action="auto-train-${id}" ${autoStatus.locked || autoBlocked ? 'disabled' : ''}>
          ${autoStatus.locked ? 'Auto Locked' : autoEnabled ? 'Auto On' : 'Auto Off'}
        </button>
      </div>
    </article>
  `;
}

function renderSpecialTrainingCard(id, action) {
  const status = getSpecialTrainingStatus(state, id);
  const capText = Object.entries(action.capGains).map(([stat, gain]) => `+${gain} ${labelize(stat)} cap`).join(', ');
  const locked = !status.unlocked;
  return `
    <article class="option-card train-card special-training-card" data-special-train-card="${id}">
      <div>
        <p class="eyebrow">Special Training / Monthly</p>
        <h2>${action.name}</h2>
        <p>${action.text}</p>
        <p>${capText}</p>
        <p class="muted">Cost ${action.cost.energy} energy / $${action.cost.money}</p>
        <p class="muted">${locked ? status.lockReason : action.unlockText}</p>
      </div>
      <button data-action="special-train-${id}" ${locked ? 'disabled' : ''}>Raise Cap</button>
    </article>
  `;
}

function renderRecover() {
  return `
    <section class="stack">
      ${renderCollapsibleSection({
        id: 'recover-core',
        title: 'Recovery',
        subtitle: `Recover health, energy, mood, and injuries. Auto checks every ${AUTO_ROUTINE_INTERVAL_MS / 1000} seconds.`,
        count: Object.keys(RECOVERY_ACTIONS).length,
        body: `<section class="card-list">${Object.entries(RECOVERY_ACTIONS).map(([id, action]) => renderRecoveryCard(id, action)).join('')}</section>`,
      })}
    </section>
  `;
}

function renderRecoveryCard(id, action) {
  const autoStatus = getAutoRecoveryStatus(state, id);
  const autoEnabled = Boolean(state.autoRecovery?.[id]) && !autoStatus.locked;
  return `
    <article class="option-card recovery-card">
      <div>
        <h2>${action.name}</h2>
        <p>${action.text}</p>
        <p class="muted">Cost $${action.cost} / +${action.health} health / +${action.energy} energy${action.injuryHeal ? ` / heals ${action.injuryHeal} injury` : ''}</p>
        <p class="muted">Auto: ${autoStatus.reason}</p>
      </div>
      <div class="mini-actions two-actions">
        <button data-action="recover-${id}">Recover</button>
        <button class="small-btn ${autoEnabled ? 'primary' : ''}" data-action="auto-recover-${id}">
          ${autoStatus.locked ? 'Auto Locked' : autoEnabled && autoStatus.paused ? 'Auto Paused' : autoEnabled ? 'Auto On' : 'Auto Off'}
        </button>
      </div>
    </article>
  `;
}

function renderMoney() {
  const groups = ['Fight Prep', 'Lifestyle', 'Black Market'];
  return `
    <section class="stack">
      <div class="record-card">
        <strong>$${state.resources.money}</strong>
        <span>${Object.keys(state.nextFightPrep ?? {}).length} fight prep / ${(state.ownedAssets ?? []).length} owned assets</span>
      </div>
      ${groups.map((group) => `
        ${renderCollapsibleSection({
          id: `money-${group.toLowerCase().replaceAll(' ', '-')}`,
          title: group,
          subtitle: moneyGroupDescription(group),
          count: Object.values(MONEY_ACTIONS).filter((action) => action.group === group).length,
          className: 'fight-tier',
          body: `<div class="card-list">
            ${Object.entries(MONEY_ACTIONS)
              .filter(([, action]) => action.group === group)
              .map(([id, action]) => renderMoneyAction(id, action))
              .join('')}
          </div>`,
        })}
      `).join('')}
      ${renderCollapsibleSection({
        id: 'money-log',
        title: 'Money Log',
        subtitle: 'Recent spending and money events.',
        body: renderLog('money'),
      })}
    </section>
  `;
}

function moneyGroupDescription(group) {
  return {
    'Fight Prep': 'Buy advantages for the next match. Prep is consumed when the fight starts.',
    Lifestyle: 'Spend money to keep your body, home, sponsors, and long-term training alive.',
    'Black Market': 'Risky shortcuts with heat, injuries, and underground attention attached.',
  }[group] ?? '';
}

function renderMoneyAction(id, action) {
  const status = moneyActionStatus(id, action);
  return `
    <article class="option-card money-card">
      <div>
        <p class="eyebrow">${action.group} / $${action.cost}</p>
        <h2>${action.name}</h2>
        <p>${action.text}</p>
        <p class="muted">${action.effect}</p>
        ${status ? `<p class="muted">${status}</p>` : ''}
      </div>
      <button class="${status ? '' : 'primary'}" data-action="money-${id}" ${status ? 'disabled' : ''}>${status ? 'Unavailable' : 'Spend'}</button>
    </article>
  `;
}

function moneyActionStatus(id, action) {
  if ((state.resources.money ?? 0) < action.cost) return `Need $${action.cost}.`;
  if (action.assetKey && (state.ownedAssets ?? []).includes(action.assetKey)) return 'Already owned.';
  if (action.prepKey && state.nextFightPrep?.[action.prepKey]) return 'Already prepared for the next fight.';
  const requires = action.requires ?? {};
  if (requires.reputation && state.resources.reputation < requires.reputation) return `Need ${requires.reputation} reputation.`;
  if (requires.wins && state.record.wins < requires.wins) return `Need ${requires.wins} wins.`;
  if (requires.hiddenWorld && !state.world.hiddenWorld) return 'Need hidden world access.';
  if (requires.hiddenWorldOrInjury && !state.world.hiddenWorld && state.injuries.length === 0) return 'Need hidden world access or an injury.';
  return '';
}

function renderFight() {
  if (state.activeFight) return renderActiveFight();
  const available = groupFightsByTier(getAvailableFights(state));
  const locked = getLockedFights(state);
  const specialFights = getSpecialFights(state);
  const kenganFights = specialFights.filter(({ id }) => KENGAN_FIGHTER_IDS.has(id));
  const bakiFights = specialFights.filter(({ id }) => BAKI_FIGHTER_IDS.has(id));
  const tekkenFights = specialFights.filter(({ id }) => TEKKEN_FIGHTER_IDS.has(id));
  const otherSpecialFights = specialFights.filter(({ id }) => !KENGAN_FIGHTER_IDS.has(id) && !BAKI_FIGHTER_IDS.has(id) && !TEKKEN_FIGHTER_IDS.has(id));

  return `
    <section class="stack">
      <div class="record-card">
        <strong>${state.record.wins}-${state.record.losses}</strong>
        <span>${state.record.kos} finishes / ${getAvailableFights(state).length} normal fights / ${(state.unlockedSkills ?? []).length} skills</span>
      </div>
      ${renderFightRosterGroup({
        id: 'fight-normal',
        title: 'Normal Fighters',
        subtitle: 'Local names, underground grinders, corporate contracts, and locked targets you can build toward.',
        count: Object.values(available).reduce((sum, fights) => sum + fights.length, 0),
        body: renderNormalFightRoster(available, locked),
      })}
      ${renderFightRosterGroup({
        id: 'fight-kengan',
        title: 'Kengan Fighters',
        subtitle: 'Association-style monsters with huge rewards, skills, adaptation, and rematch growth.',
        count: kenganFights.length,
        body: renderSpecialFightRoster(kenganFights),
      })}
      ${renderFightRosterGroup({
        id: 'fight-baki',
        title: 'Baki Fighters',
        subtitle: 'Arena nightmare bosses built around freak bodies, old-school killers, and monster pride.',
        count: bakiFights.length,
        body: renderSpecialFightRoster(bakiFights),
      })}
      ${renderFightRosterGroup({
        id: 'fight-tekken',
        title: 'Tekken Fighters',
        subtitle: 'Blood-feud arcade bosses with Mishime pressure, cursed bloodlines, throws, and strange weapons.',
        count: tekkenFights.length,
        body: renderSpecialFightRoster(tekkenFights),
      })}
      ${otherSpecialFights.length ? renderFightRosterGroup({
        id: 'fight-other-special',
        title: 'Other Special Fighters',
        subtitle: 'Special bosses that do not belong to the main two files yet.',
        count: otherSpecialFights.length,
        body: renderSpecialFightRoster(otherSpecialFights),
      }) : ''}
    </section>
  `;
}

function renderFightRosterGroup({ id, title, subtitle, count, body }) {
  return renderCollapsibleSection({
    id,
    title,
    subtitle,
    count,
    className: 'fight-roster-group',
    body,
  });
}

function renderNormalFightRoster(available, locked) {
  const availableMarkup = Object.entries(available).map(([tier, fights]) => `
    <section class="fight-tier">
      <div class="section-heading compact-heading">
        <h2>${tier} Fights</h2>
        <p>${tierDescription(tier)}</p>
      </div>
      <div class="card-list">
        ${fights.map(({ id, opponent }) => renderFightCard(id, opponent)).join('')}
      </div>
    </section>
  `).join('');

  const lockedMarkup = locked.length ? renderCollapsibleSection({
    id: 'fight-locked-normal',
    title: 'Locked Normal Fights',
    subtitle: 'Future smoke. These show what to chase next.',
    count: locked.length,
    className: 'fight-tier',
    body: `<div class="locked-grid">
        ${locked.slice(0, 8).map(({ opponent, reasons }) => `
          <article class="locked-card">
            <div>
              <p class="eyebrow">${opponent.tier} / ${opponent.threat}</p>
              <h2>${opponent.name}</h2>
              <p>${opponent.style}</p>
              <p class="muted">${reasons.join(' / ')}</p>
            </div>
          </article>
        `).join('')}
      </div>`,
  }) : '';

  return availableMarkup || lockedMarkup
    ? `${availableMarkup}${lockedMarkup}`
    : '<article class="option-card"><p>No normal fighters are available right now.</p></article>';
}

function renderSpecialFightRoster(fights) {
  return fights.length
    ? `<div class="card-list">${fights.map(({ id, opponent, reasons }) => renderFightCard(id, opponent, reasons)).join('')}</div>`
    : '<article class="option-card"><p>No fighters in this file yet.</p></article>';
}

function groupFightsByTier(fights) {
  return fights.reduce((groups, fight) => {
    const tier = fight.opponent.tier ?? 'Local';
    groups[tier] = groups[tier] ?? [];
    groups[tier].push(fight);
    return groups;
  }, {});
}

function tierDescription(tier) {
  return {
    Local: 'Street, gym, school, and neighborhood names.',
    Underground: 'Basement circuits, invite-only rooms, and people with aliases for a reason.',
    Corporate: 'Sponsored monsters with contracts, handlers, and medical teams.',
    Monster: 'Fights that should probably be classified as natural disasters.',
    'Association Tournament': 'Private corporate brackets where true monsters settle sponsor wars.',
  }[tier] ?? 'Available matches.';
}

function renderTournament() {
  if (state.activeFight) return renderActiveFight();
  const tournament = state.tournament;
  const active = tournament && !tournament.complete && !tournament.eliminated;
  const currentOpponent = active ? OPPONENTS[tournament.entrants[tournament.roundIndex]] : null;
  return `
    <section class="stack">
      <div class="section-heading">
        <h2>Tournaments</h2>
        <p>Eight-fighter underground brackets built from special fighters. Win rounds to stack bracket bonuses on top of normal fight rewards.</p>
      </div>
      <article class="record-card">
        <strong>${tournament ? `${tournament.wins}/${tournament.entrants.length}` : 'No Bracket'}</strong>
        <span>${tournamentStatusText(tournament)}</span>
      </article>
      <article class="record-card password-record">
        <strong>${state.clanPasswordHint ?? passwordHint(state.clanPasswordProgress ?? 0)}</strong>
        <span>Secret code progress: ${state.clanPasswordProgress ?? 0}/7 characters recovered from tournament championships.</span>
      </article>
      ${!active ? `
        <article class="option-card special-fight-card">
          <div>
            <p class="eyebrow">Annihilation-Style Bracket</p>
            <h2>Join Tournament</h2>
            <p>Draws eight special fighters into a bracket. Each win advances the bracket and pays money, reputation, and clan rerolls.</p>
            <p class="muted">Champion prize: $500000 / +400 reputation / +60 Clan Rerolls.</p>
          </div>
          <button class="primary" data-action="join-tournament">Join</button>
        </article>
      ` : `
        <article class="option-card special-fight-card">
          <div>
            <p class="eyebrow">Round ${tournament.roundIndex + 1} / ${tournament.entrants.length}</p>
            <h2>${currentOpponent.name}</h2>
            <p>${currentOpponent.style}</p>
            <p class="muted">${currentOpponent.temperament}. Watch for ${currentOpponent.strengths.join(', ')}.</p>
            <p class="muted">Bracket bonus this round: $${75000 * (tournament.roundIndex + 1)} / +${75 * (tournament.roundIndex + 1)} reputation / +${6 * (tournament.roundIndex + 1)} Clan Rerolls.</p>
          </div>
          <button class="primary" data-action="start-tournament-fight">Fight Bracket Match</button>
        </article>
      `}
      ${tournament ? `
        <section class="fight-tier">
          <div class="section-heading">
            <h2>Bracket</h2>
            <p>${tournament.name}</p>
          </div>
          ${renderTournamentBracket(tournament, active)}
        </section>
      ` : ''}
    </section>
  `;
}

function renderTournamentBracket(tournament, active) {
  const current = tournament.roundIndex ?? 0;
  const playerName = escapeHtml(state.identity.name);
  const championName = tournament.champion ? playerName : 'Champion';
  const playerSlot = (label = 'You') => `<div class="bracket-slot player ${tournament.eliminated ? 'lost' : 'won'}"><span>${playerName}</span><em>${label}</em></div>`;
  const slot = (index) => {
    const opponent = OPPONENTS[tournament.entrants[index]];
    const status = tournament.complete && tournament.champion ? 'cleared' : index < current ? 'won' : index === current && active ? 'next' : 'waiting';
    return `<div class="bracket-slot ${status}"><span>${opponent?.name ?? 'TBD'}</span></div>`;
  };
  const winner = (indexes, label) => {
    const cleared = Math.min(...indexes) < current;
    const name = cleared ? playerName : label;
    return `<div class="bracket-slot winner ${cleared ? 'won' : 'waiting'}"><span>${name}</span></div>`;
  };
  return `
    <div class="tournament-bracket" aria-label="Tournament bracket">
      <div class="bracket-side left">
        <div class="bracket-round entrants">
          ${[0, 1, 2, 3].map((index) => index === current && active ? playerSlot('Current') : slot(index)).join('')}
        </div>
        <div class="bracket-round quarters">
          ${winner([0, 1], 'Winner 1')}
          ${winner([2, 3], 'Winner 2')}
        </div>
        <div class="bracket-round semis">
          ${winner([0, 1, 2, 3], 'Finalist A')}
        </div>
      </div>
      <div class="bracket-final">
        <div class="bracket-slot champion ${tournament.champion ? 'won' : 'waiting'}"><span>${championName}</span></div>
      </div>
      <div class="bracket-side right">
        <div class="bracket-round semis">
          ${winner([4, 5, 6, 7], 'Finalist B')}
        </div>
        <div class="bracket-round quarters">
          ${winner([4, 5], 'Winner 3')}
          ${winner([6, 7], 'Winner 4')}
        </div>
        <div class="bracket-round entrants">
          ${[4, 5, 6, 7].map((index) => index === current && active ? playerSlot('Current') : slot(index)).join('')}
        </div>
      </div>
    </div>
    ${active ? `<p class="muted bracket-next">Current bracket match: ${playerName} vs ${escapeHtml(OPPONENTS[tournament.entrants[current]]?.name ?? 'TBD')}</p>` : ''}
  `;
}

function tournamentStatusText(tournament) {
  if (!tournament) return 'Join to draw a special-fighter bracket.';
  if (tournament.champion) return 'Champion run complete.';
  if (tournament.eliminated) return `Eliminated after ${tournament.wins} win${tournament.wins === 1 ? '' : 's'}.`;
  return `Active bracket. Next match is slot ${tournament.roundIndex + 1}.`;
}

function renderFightCard(id, opponent, lockReasons = []) {
  const defeated = (state.defeatedSpecialFights ?? []).includes(id);
  const locked = lockReasons.length > 0;
  const specialClass = opponent.tier === 'Special Fight' ? 'special-fight-card' : '';
  return `
    <article class="option-card fight-card ${specialClass}">
      ${renderSpecialPortrait(id, opponent)}
      <div>
        <p class="eyebrow">${opponent.tier} / ${opponent.threat} threat</p>
        <h2>${opponent.name}</h2>
        <p>${opponent.style}</p>
        <p><strong>Archetype</strong> ${getOpponentArchetype(opponent)}</p>
        <p class="muted">${opponent.temperament}. Watch for ${opponent.strengths.join(', ')}.</p>
        <p class="muted">Reward $${opponent.reward} / Rep ${opponent.rep} / Risk ${opponent.risk}${opponent.skillReward ? ` / Skill ${FIGHT_MOVES[opponent.skillReward]?.label ?? opponent.skillReward}` : ''}</p>
        ${locked ? `<p class="muted">${lockReasons.join(' / ')}</p>` : ''}
        ${defeated ? '<p class="muted">Defeated once. Skill already claimed.</p>' : ''}
      </div>
      <button class="${locked ? '' : 'primary'}" data-action="start-fight-${id}" ${locked ? 'disabled' : ''}>${locked ? 'Locked' : 'Read Matchup'}</button>
    </article>
  `;
}

function renderActiveFight() {
  const fight = state.activeFight;
  const opponent = activeFightOpponent(fight);
  if (!opponent) return `<section class="stack"><article class="option-card"><h2>Fight data missing</h2><p>Close this fight and start it again.</p></article></section>`;
  return `
    <section class="combat stack">
      <article class="fight-title">
        ${renderSpecialPortrait(fight.opponentId, opponent, true)}
        <div>
          <p class="eyebrow">${fight.finished ? 'Fight Report' : `Round ${Math.ceil(fight.round / (fight.exchangesPerRound ?? 5))} / ${Math.ceil(fight.maxRounds / (fight.exchangesPerRound ?? 5))} · Exchange ${fight.round} / ${fight.maxRounds}`}</p>
          <h2>${escapeHtml(state.identity.name)} vs ${escapeHtml(opponent.name)}</h2>
          <p class="muted">${opponent.style} / ${opponent.threat} threat</p>
        </div>
        <span class="badge ${fight.finished && fight.result.won ? 'green' : 'red'}">${fight.finished ? (fight.result.won ? 'Win' : 'Loss') : 'Live'}</span>
      </article>
      ${renderCombatMeters(fight)}
      ${renderBreakdown(fight)}
      ${fight.finished ? renderFightReport(fight) : renderTactics()}
      ${renderExchanges(fight)}
    </section>
  `;
}

function activeFightOpponent(fight) {
  if (fight.opponentId !== 'rival') return getCombatOpponent(state, fight.opponentId) ?? OPPONENTS[fight.opponentId];
  const rival = state.rival;
  if (!rival) return null;
  return {
    name: rival.name,
    style: rival.style,
    threat: rival.rank ?? 'Rival',
  };
}

function grapplingPositionLabel(position) {
  return {
    closedGuard: 'Closed Guard',
    halfGuard: 'Half Guard',
    sideControl: 'Side Control',
    mount: 'Mount',
    backControl: 'Back Control',
  }[position] ?? 'Half Guard';
}

function grapplingTacticDisplay(fight, tactic) {
  if (tactic !== 'grapple') return null;
  const grappling = normalizeGrapplingUi(fight?.grappling);
  if (grappling.phase !== 'ground') {
    return {
      label: 'Takedowns',
      hint: 'Shoot, trip, or clinch your way into top position. Success opens the submission game.',
    };
  }
  if (grappling.top === 'player') {
    return {
      label: 'Top Control',
      hint: `You are on top in ${grapplingPositionLabel(grappling.position)}. Choose a submission or ground-and-pound before they scramble out.`,
    };
  }
  return {
    label: 'Ground Escape',
    hint: `You are underneath in ${grapplingPositionLabel(grappling.position)}. Reverse, get back to your feet, or conserve from bottom.`,
  };
}

function groundedConserveDisplay(fight, tactic) {
  if (tactic !== 'conserve') return null;
  const grappling = normalizeGrapplingUi(fight?.grappling);
  if (grappling.phase === 'ground' && grappling.top === 'opponent') {
    return {
      label: 'Bottom Survival',
      hint: `You are underneath in ${grapplingPositionLabel(grappling.position)}. Shell, frame, or stall to recover stamina and reduce damage.`,
    };
  }
  return null;
}

function renderGroundState(fight) {
  const grappling = normalizeGrapplingUi(fight?.grappling);
  if (grappling.phase !== 'ground') {
    return `
      <article class="ground-state standing">
        <span>Grappling State</span>
        <strong>Standing</strong>
        <p>Takedowns are available. Ground attacks are locked until someone hits the mat.</p>
      </article>
    `;
  }
  const topLabel = grappling.top === 'player' ? 'Player top' : 'Opponent top';
  const stateLabel = grappling.top === 'player' ? 'Top attack window' : 'Escape or conserve';
  return `
    <article class="ground-state ${grappling.top === 'player' ? 'player-top' : 'opponent-top'}">
      <span>Ground: ${topLabel}</span>
      <strong>${grapplingPositionLabel(grappling.position)}</strong>
      <p>${stateLabel}${grappling.lastTransition ? ` / ${grappling.lastTransition}` : ''}</p>
    </article>
  `;
}

function renderCombatMeters(fight) {
  return `
    ${renderGroundState(fight)}
    <div class="combat-meters">
      ${combatMeter('You', fight.meters.playerHealth, `${fight.meters.playerHealth}/${fight.meters.maxPlayerHealth ?? 100}`, fight.meters.maxPlayerHealth ?? 100)}
      ${combatMeter('Opponent', fight.meters.opponentHealth, `${fight.meters.opponentHealth}/${fight.meters.maxOpponentHealth ?? 100}`, fight.meters.maxOpponentHealth ?? 100)}
      ${combatMeter('Stamina', fight.meters.playerStamina, `${fight.meters.playerStamina}/${fight.meters.maxPlayerStamina ?? 100}`, fight.meters.maxPlayerStamina ?? 100)}
      ${combatMeter('Enemy Gas', fight.meters.opponentStamina, `${fight.meters.opponentStamina}/${fight.meters.maxOpponentStamina ?? 100}`, fight.meters.maxOpponentStamina ?? 100)}
      ${combatMeter('Guard', fight.meters.guard, 'Control')}
      ${combatMeter('Momentum', fight.meters.momentum + 50, fight.meters.momentum)}
      ${combatMeter('Injury Risk', fight.meters.injuryRisk, 'Danger')}
    </div>
  `;
}

function combatMeter(label, value, sublabel, max = 100) {
  const tone = label.toLowerCase().replace(/\s+/g, '-');
  return `
    <div class="combat-meter meter-${tone}">
      <div><span>${label}</span><strong>${sublabel}</strong></div>
      <div class="bar"><i style="width:${Math.max(0, Math.min(100, (value / max) * 100))}%"></i></div>
    </div>
  `;
}

function renderBreakdown(fight) {
  return renderFightInfoDropdown('Fight Info', 'Pre-fight read and matchup weaknesses.', `
    <article class="breakdown dossier-report">
      <h2>Pre-Fight Read</h2>
      ${fight.breakdown.map((line) => `<p class="${line.startsWith('Specific weak move:') ? 'weak-move-read' : ''}">${line}</p>`).join('')}
    </article>
  `);
}

function renderFightInfoDropdown(title, subtitle, body) {
  return `
    <details class="collapsible-section fight-info-dropdown" data-fight-info ${fightInfoOpen ? 'open' : ''}>
      <summary class="collapsible-summary">
        <span>
          <strong>${escapeHtml(title)}</strong>
          <em>${escapeHtml(subtitle)}</em>
        </span>
      </summary>
      <div class="collapsible-body">${body}</div>
    </details>
  `;
}

function renderTactics() {
  if (selectedFightCategory) return renderMoveMenu(selectedFightCategory);
  const tactics = Object.entries(FIGHT_TACTICS);
  return `
    <section class="tactic-grid">
      ${tactics.map(([id, tactic]) => {
        const grapplingDisplay = grapplingTacticDisplay(state.activeFight, id) ?? groundedConserveDisplay(state.activeFight, id);
        const moves = getUnlockedFightMoves(state, id);
        const categoryLockedReason = moves.length && moves.every((move) => move.disabledReason) ? moves[0].disabledReason : '';
        const display = grapplingDisplay ?? (id === 'special' && state.clan?.special
          ? { label: state.clan.special.name, hint: state.clan.special.effect }
          : tactic);
        const hint = categoryLockedReason || display.hint;
        return `
        <button class="move-card category-card" data-action="open-tactic-${id}" ${categoryLockedReason ? 'disabled' : ''}>
          <strong>${display.label}</strong>
          <span>${hint}${categoryLockedReason ? '' : ' Tap to choose a move.'}</span>
        </button>
      `;
      }).join('')}
    </section>
  `;
}

function renderMoveMenu(category) {
  const moves = getUnlockedFightMoves(state, category);
  const tactic = FIGHT_TACTICS[category];
  const grapplingDisplay = grapplingTacticDisplay(state.activeFight, category) ?? groundedConserveDisplay(state.activeFight, category);
  const label = grapplingDisplay?.label ?? (category === 'special' ? (state.clan.special?.name ?? tactic.label) : tactic.label);
  const hint = grapplingDisplay?.hint ?? 'Pick one unlocked tactic for this exchange.';
  return `
    <section class="stack">
      <article class="breakdown">
        <h2>${label} Moves</h2>
        <p>${hint}</p>
      </article>
      <section class="tactic-grid">
        ${moves.map((move) => `
          <button class="move-card ${move.id === 'jab' ? 'jab-move-card' : ''} ${state.activeFight?.optimalMove?.id === move.id ? 'optimal-move-card' : ''}" data-action="fight-turn-${move.id}" ${move.disabledReason ? 'disabled' : ''}>
            <strong>${move.label}</strong>
            <span>${state.activeFight?.optimalMove?.id === move.id ? `Optimal read: ${state.activeFight.optimalMove.reason}` : (move.disabledReason || move.skillEffect || move.hint)}</span>
          </button>
        `).join('')}
        <button class="move-card" data-action="close-tactic-menu">
          <strong>Back</strong>
          <span>Return to the main fight options.</span>
        </button>
      </section>
    </section>
  `;
}

function renderExchanges(fight) {
  const canHighlightExchangeText = (state.stats?.fightIq ?? 0) >= 500;
  return `
    <section class="exchange-log">
      <h2>Exchange Log</h2>
      ${fight.exchanges.length ? fight.exchanges.map((exchange) => `
        <article class="${exchangeKey(exchange) === uiFeedback.latestExchangeKey ? 'new-exchange' : ''}">
          <p class="eyebrow">Exchange ${exchange.round} / ${exchange.tacticLabel ?? labelize(exchange.tactic)} vs ${exchange.opponentMoveLabel ?? exchange.opponentTacticLabel ?? labelize(exchange.opponentTactic)}</p>
          <p class="exchange-text">${canHighlightExchangeText ? highlightExchangeText(exchange.text) : escapeHtml(exchange.text)}</p>
        </article>
      `).join('') : '<p class="muted">Pick your first tactic. The fight will start showing what actually happens here.</p>'}
    </section>
  `;
}

function renderFightReport(fight) {
  return `
    <article class="fight-report">
      <h2>${fight.result.summary}</h2>
      <div class="report-grid">
        <div>
          <h3>Why it happened</h3>
          ${fight.result.reasons.map((reason) => `<p>${reason}</p>`).join('')}
        </div>
        <div>
          <h3>Consequences</h3>
          ${fight.result.rewards.map((reward) => `<p>${reward}</p>`).join('')}
          ${fight.result.injuries.map((injury) => `<p>${formatInjury(injury)}</p>`).join('')}
        </div>
      </div>
      <button class="primary wide" data-action="close-fight">${fight.source === 'hunterQuest' ? 'Back to System Quest' : 'Back to Fight List'}</button>
    </article>
  `;
}

function renderBody() {
  const totalFights = state.record.wins + state.record.losses;
  const experienceBoost = getExperienceBoost(state);
  const effectiveStats = getHunterEffectiveStats(state);
  return `
    <section class="stack">
      ${renderCollapsibleSection({
        id: 'body-experience',
        title: 'Experience Boost',
        subtitle: `${totalFights}/100 fight mileage / +${experienceBoost} max cap`,
        body: `<article class="option-card"><div><p>+${experienceBoost} max cap to every stat from ${totalFights}/100 fight mileage.</p><p class="muted">Wins build the boost faster. Losses still teach your body, but not as much.</p></div></article>`,
      })}
      ${renderCollapsibleSection({
        id: 'body-techniques',
        title: 'Techniques',
        subtitle: `Current archetype: ${getPlayerArchetype(state)}`,
        body: renderTechniques(),
      })}
      <div class="stats-grid">
        ${Object.entries(state.stats).map(([stat, value]) => {
          const cap = currentStatCap(stat);
          const hunterBonus = Math.max(0, (effectiveStats[stat] ?? value) - value);
          const total = value + hunterBonus;
          const scale = Math.max(cap, total);
          const baseWidth = Math.min(100, (value / scale) * 100);
          const bonusWidth = Math.min(100 - baseWidth, (hunterBonus / scale) * 100);
          return `
          <div class="stat-row fighter-stat-row ${feedbackClass(`stat-${stat}`)}">
            <span>${labelize(stat)}</span>
            <div class="bar stacked-stat-bar">
              <i class="fighter-stat-base" style="width:${baseWidth}%"></i>
              ${hunterBonus ? `<i class="hunter-stat-bonus" style="width:${bonusWidth}%"></i>` : ''}
            </div>
            <strong class="${hunterBonus ? 'effective-stat-total' : ''}">${hunterBonus ? `${value} + <b>${hunterBonus}</b> = ${total}` : value}<small> / ${cap} cap</small></strong>
          </div>
        `; }).join('')}
      </div>
      ${renderCollapsibleSection({
        id: 'body-injuries',
        title: 'Injury List',
        subtitle: state.injuries.length ? `${state.injuries.length} lasting injuries` : 'No lasting injuries yet.',
        body: `<article class="option-card injury-card"><div><p>${state.injuries.length ? state.injuries.map(formatInjury).join(', ') : 'No lasting injuries yet.'}</p><p class="muted">Training injuries can now trigger popup choices. Recovery and doctors can remove them.</p></div></article>`,
      })}
      ${renderCollapsibleSection({
        id: 'body-current-clan',
        title: `${state.clan.name} Details`,
        subtitle: `${state.clan.rarity} clan passives, special, traits, and drawbacks.`,
        body: `<article class="option-card"><div><p>Bonuses: ${formatClanBonuses(state.clan)}</p><p>Passive: ${formatClanPassive(state.clan)}</p><p>Special: ${formatClanSpecial(state.clan)}</p><p class="muted">Traits: ${state.clan.traits.join(' / ')}</p><p>Options: ${state.clan.options.join(', ')}</p><p>Drawbacks: ${state.clan.drawbacks.join(', ')}</p></div></article>`,
      })}
      ${renderCollapsibleSection({
        id: 'body-clan-benefits',
        title: 'Clan Benefits',
        subtitle: 'Use this before spending rerolls. Higher rarity clans are stronger.',
        count: CLANS.length,
        className: 'clan-reference',
        body: CLANS.map((clan) => renderClanReference(clan)).join(''),
      })}
    </section>
  `;
}

function renderTechniques() {
  const techniques = normalizeTechniques(state.techniques);
  const topValue = Math.max(1, ...Object.values(techniques));
  return `
    <article class="option-card technique-card">
      <div>
        <h2>Techniques</h2>
        <p>Current archetype: <strong>${getPlayerArchetype(state)}</strong></p>
        <p class="muted">Pressure and Counter build Striking. Grapple builds Grappling. Defend and Conserve build Defense.</p>
      </div>
      <div class="stats-grid technique-grid">
        ${Object.entries(TECHNIQUE_TRACKS).map(([track, info]) => {
          const value = techniques[track] ?? 0;
          const width = Math.min(100, (value / topValue) * 100);
          return `
            <div class="stat-row ${feedbackClass(`tech-${track}`)}">
              <span>${info.label}</span>
              <div class="bar"><i style="width:${width}%"></i></div>
              <strong>${value}</strong>
              <p class="muted">${info.description}</p>
            </div>
          `;
        }).join('')}
      </div>
    </article>
  `;
}

function renderClanReference(clan) {
  const rarity = rarityInfo(clan.rarity);
  return `
    <article class="clan-ref-card">
      <div>
        <p class="eyebrow">${clan.rarity}</p>
        <h2>${clan.name}</h2>
        <p>${clan.description}</p>
      </div>
      <div class="clan-ref-grid">
        <p><strong>Bonuses</strong><span>${formatClanBonuses(clan)}</span></p>
        <p><strong>Passive</strong><span>${formatClanPassive(clan)}</span></p>
        <p><strong>Special</strong><span>${formatClanSpecial(clan)}</span></p>
        ${renderClanAwakeningReference(clan)}
        <p><strong>Traits</strong><span>${clan.traits.join(', ')}</span></p>
        <p><strong>Options</strong><span>${clan.options.join(', ')}</span></p>
        <p><strong>Drawbacks</strong><span>${clan.drawbacks.join(', ')}</span></p>
      </div>
      <span class="badge ${rarity.color}">${clan.rarity}</span>
    </article>
  `;
}

function renderClanAwakeningReference(clan) {
  if (clan.name !== DEVIL_GENE_CLAN_NAME) return '';
  return `
    <p><strong>Awakening</strong><span>Choice-driven Devil Gene stages unlock low-health pressure, stronger Stage 2 special damage, and Devil Form at Stage 3.</span></p>
  `;
}

function formatClanBonuses(clan) {
  return Object.entries(clan.bonuses).map(([stat, value]) => `+${value} ${labelize(stat)}`).join(', ');
}

function formatClanPassive(clan) {
  return clan.passive ? `${clan.passive.name}: ${clan.passive.effect}` : 'No passive effect yet.';
}

function formatClanSpecial(clan) {
  return clan.special ? `${clan.special.name}: ${clan.special.effect}` : 'No special move yet.';
}

function renderRival() {
  if (state.activeFight?.opponentId === 'rival') return renderActiveFight();
  const rival = state.rival;
  if (!rival) {
    return `
      <section class="stack">
        <div class="section-heading">
          <h2>Rival</h2>
          <p>No rival has entered your life yet. Age up and the circuit may produce someone who keeps pace with you.</p>
        </div>
        <article class="option-card">
          <div>
            <h2>No Rival Known</h2>
            <p>Rivals start weak, train over time, fight from the same enemy list you can fight, and eventually chase special fighters.</p>
          </div>
        </article>
      </section>
    `;
  }
  return `
    <section class="stack">
      <div class="section-heading">
        <h2>Rival</h2>
        <p>They train, book fights, and grow through the same world while you live your life.</p>
      </div>
      <article class="option-card special-fight-card">
        <div>
          <p class="eyebrow">${rival.rank} / ${labelize(rival.focus ?? 'rival')}</p>
          <h2>${rival.name}</h2>
          <p>${rival.style}. ${rival.temperament}.</p>
          <p class="muted">Record ${rival.record.wins}-${rival.record.losses} / KOs ${rival.record.kos} / Power ${rival.power}</p>
          <p class="muted">Last opponent: ${rival.lastOpponentId ? (OPPONENTS[rival.lastOpponentId]?.name ?? rival.lastOpponentId) : 'No booked fight yet'}</p>
        </div>
        <button class="primary" data-action="start-rival-fight">Fight Rival</button>
      </article>
      <div class="stats-grid">
        ${Object.entries(rival.stats).map(([stat, value]) => `
          <div class="stat-row">
            <span>${labelize(stat)}</span>
            <div class="bar"><i style="width:${Math.min(100, value / Math.max(1, rival.power) * 85)}%"></i></div>
            <strong>${value}</strong>
          </div>
        `).join('')}
      </div>
      ${renderCollapsibleSection({
        id: 'rival-feed',
        title: 'Rival Feed',
        subtitle: 'Recent rival training, fights, and adaptations.',
        count: (rival.feed ?? []).length,
        body: `<section class="log rival-feed">${(rival.feed ?? []).slice(0, 12).map((item) => `<p><span>${item.type}</span>${item.text}</p>`).join('')}</section>`,
      })}
    </section>
  `;
}

function coachSlots(life) {
  const reputation = life.resources?.reputation ?? 0;
  if (reputation >= 220) return 3;
  if (reputation >= 80) return 2;
  return 1;
}

function renderCoachImage(kind, label) {
  const src = COACH_IMAGES[kind];
  if (!src) return '';
  return `
    <div class="coach-image" data-coach-image="${kind}" aria-label="${label}" style="--coach-image: url('${src}')">
      <div class="coach-image-overlay">
        <span>Coach File</span>
        <strong>${label}</strong>
      </div>
    </div>
  `;
}

function renderCoach() {
  const coach = state.coach ?? { fighters: [], feed: [] };
  const slots = coachSlots(state);
  const recruitCost = 2500 + (coach.fighters?.length ?? 0) * 1500;
  return `
    <section class="stack" data-coach-panel>
      ${renderCollapsibleSection({
        id: 'coach-core',
        title: 'Coach Stable',
        subtitle: `${coach.fighters.length}/${slots} fighters / next recruit $${recruitCost}`,
        body: `<article class="option-card full coach-hero-card">
        ${renderCoachImage('stable', 'Stable Office')}
        <div>
          <p class="eyebrow">Coach Stable</p>
          <h2>${coach.fighters.length}/${slots} Fighters</h2>
          <p>Build prospects, book fights, and earn stable money while your own career keeps moving.</p>
          <p class="muted">Next recruit cost $${recruitCost}. More slots unlock at 80 and 220 reputation.</p>
        </div>
        <button class="primary" data-action="coach-recruit">Recruit Fighter</button>
      </article>
      <section class="card-list">
        ${coach.fighters.length ? coach.fighters.map((fighter) => renderCoachedFighter(fighter)).join('') : `
          <article class="option-card full">
            ${renderCoachImage('recruit', 'Recruit Prospect')}
            <div>
              <h2>No Fighters Yet</h2>
              <p>Recruit a raw prospect, coach their stats, then book them into paid fights.</p>
            </div>
          </article>
        `}
      </section>`,
      })}
      ${renderCollapsibleSection({
        id: 'coach-feed',
        title: 'Stable Feed',
        subtitle: 'Recent stable sessions, fights, and recovery notes.',
        count: (coach.feed ?? []).length,
        body: `<section class="log rival-feed">${(coach.feed ?? []).slice(0, 12).map((item) => `<p><span>${item.type}</span>${item.text}</p>`).join('') || '<p class="muted">No stable news yet.</p>'}</section>`,
      })}
    </section>
  `;
}

function renderCoachedFighter(fighter) {
  const options = getCoachedFightOptions(state, fighter.id);
  return `
    <article class="option-card full coach-fighter-card" data-coach-fighter-id="${fighter.id}">
      <section class="coach-profile-grid">
        <header class="coach-fighter-top">
          ${renderCoachImage('coaching', fighter.name)}
          <div class="coach-fighter-summary">
            <p class="eyebrow">${fighter.rank ?? 'Prospect'} / ${labelize(fighter.focus ?? 'hybrid')}</p>
            <h2>${fighter.name}</h2>
            <p>${fighter.style}. Record ${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0} / KOs ${fighter.record?.kos ?? 0} / Power ${fighter.power}</p>
            <div class="coach-status-strip">
              <span><strong>${fighter.condition ?? 0}</strong> Condition</span>
              <span><strong>${fighter.mood ?? 0}</strong> Mood</span>
              <span><strong>${(fighter.injuries ?? []).length}</strong> Injuries</span>
            </div>
            ${(fighter.injuries ?? []).length ? `<p class="muted">Injuries ${(fighter.injuries ?? []).map(formatInjury).join(', ')}</p>` : ''}
          </div>
        </header>
        <section class="coach-stat-panel">
          <h2>Attributes</h2>
          <div class="stats-grid coach-stat-grid">
            ${Object.entries(fighter.stats ?? {}).map(([stat, value]) => `
              <div class="stat-row">
                <span>${labelize(stat)}</span>
                <div class="bar"><i style="width:${Math.min(100, value / Math.max(1, fighter.power) * 85)}%"></i></div>
                <strong>${value}</strong>
              </div>
            `).join('')}
          </div>
        </section>
      </section>
      <section class="coach-management-grid">
        <div class="coach-training-panel">
          <h2>Coach Plan</h2>
          <div class="coach-action-grid">
            <button data-action="coach-train-${fighter.id}-striking">Striking</button>
            <button data-action="coach-train-${fighter.id}-grappling">Grappling</button>
            <button data-action="coach-train-${fighter.id}-defense">Defense</button>
            <button data-action="coach-train-${fighter.id}-hardCamp">Hard Camp</button>
            <button data-action="coach-recover-${fighter.id}">Recover</button>
            <button class="danger-btn" data-action="coach-release-${fighter.id}">Let Go</button>
          </div>
        </div>
        ${renderCoachBookingPanel(fighter, options)}
      </section>
      <section class="log rival-feed coach-fighter-feed">
        <h2>Fighter Feed</h2>
        ${(fighter.feed ?? []).slice(0, 6).map((item) => `<p><span>${item.type}</span>${item.text}</p>`).join('') || '<p class="muted">No sessions yet.</p>'}
      </section>
    </article>
  `;
}

function coachFightPayout(opponent) {
  return Math.max(180, Math.round((opponent.reward ?? opponent.power * 5) * 0.22));
}

function coachFightOptionAttrs(id, opponent) {
  return [
    `value="${escapeHtml(id)}"`,
    `data-name="${escapeHtml(opponent.name)}"`,
    `data-tier="${escapeHtml(opponent.tier)}"`,
    `data-threat="${escapeHtml(opponent.threat)}"`,
    `data-style="${escapeHtml(opponent.style)}"`,
    `data-power="${escapeHtml(opponent.power)}"`,
    `data-payout="${escapeHtml(coachFightPayout(opponent))}"`,
  ].join(' ');
}

function renderCoachBookingPreview(opponent) {
  return `
    <article class="option-card coach-booking-card" data-coach-booking-preview>
      ${renderCoachImage('booking', opponent.name)}
      <div class="coach-booking-copy">
        <p class="eyebrow" data-booking-tier>${escapeHtml(opponent.tier)} / ${escapeHtml(opponent.threat)}</p>
        <h2 data-booking-name>${escapeHtml(opponent.name)}</h2>
        <p data-booking-style>${escapeHtml(opponent.style)}</p>
        <p class="muted" data-booking-meta>Power ${escapeHtml(opponent.power)} / Payout scales from $${escapeHtml(coachFightPayout(opponent))}</p>
      </div>
    </article>
  `;
}

function renderCoachBookingPanel(fighter, options) {
  if (!options.length) {
    return `
      <section class="coach-booking-panel">
        <h2>Book Fight</h2>
        <p class="muted">No suitable fights yet. Coach this fighter first.</p>
      </section>
    `;
  }
  const selected = options[0];
  return `
    <section class="coach-booking-panel" data-coach-booking="${fighter.id}">
      <h2>Book Fight</h2>
      <label class="coach-fight-select-label">
        <span>Fight Option</span>
        <select data-coach-fight-select="${fighter.id}">
          ${options.map(({ id, opponent }) => `
            <option ${coachFightOptionAttrs(id, opponent)}>${escapeHtml(opponent.name)} - ${escapeHtml(opponent.tier)} / Power ${escapeHtml(opponent.power)}</option>
          `).join('')}
        </select>
      </label>
      ${renderCoachBookingPreview(selected.opponent)}
      <button class="primary wide" data-action="coach-fight-selected-${fighter.id}">Book ${escapeHtml(selected.opponent.name)}</button>
    </section>
  `;
}

function renderSocial() {
  const social = state.social ?? { followers: 0, calledOutTarget: null, platform: 'Underground Feed' };
  const callout = social.calledOutTarget;
  const targets = socialTrashTalkTargets();
  return `
    <section class="stack">
      <section class="stats-grid social-grid">
        <div class="metric tall"><span>Followers</span><strong>${formatFollowers(social.followers)}</strong></div>
        <div class="metric tall"><span>Platform</span><strong>${social.platform}</strong></div>
        ${Object.entries(state.relationships).map(([name, value]) => `
          <div class="metric tall"><span>${labelize(name)}</span><strong>${value}</strong></div>
        `).join('')}
      </section>
      ${callout ? `
        <article class="option-card full special-fight-card">
          <div>
            <p class="eyebrow">Active Callout</p>
            <h2>${callout.name}</h2>
            <p>${labelize(callout.style)} is live. Fight them to cash the hype, or lose followers if the mouth wrote a check your body cannot clear.</p>
          </div>
        </article>
      ` : ''}
      ${renderCollapsibleSection({
        id: 'social-posts',
        title: 'Social Media',
        subtitle: 'Post for followers, money, reputation, heat, and sponsor pressure.',
        count: Object.keys(SOCIAL_ACTIONS).length,
        className: 'money-group',
        body: `<div class="money-grid">
          ${Object.entries(SOCIAL_ACTIONS).map(([id, action]) => `
            <article class="option-card social-post-card" data-social-card="${id}">
              ${renderSocialImage(id, action)}
              <div>
                <p class="eyebrow">${action.group}</p>
                <h2>${action.name}</h2>
                <p>${action.effect}</p>
                <p class="muted">${action.text}</p>
              </div>
              <button data-action="social-${id}">Post</button>
            </article>
          `).join('')}
        </div>`,
      })}
      ${renderCollapsibleSection({
        id: 'social-targets',
        title: 'Trash Talk Targets',
        subtitle: 'Call out fighters to turn hype into higher stakes.',
        count: targets.length,
        className: 'money-group',
        body: `<div class="money-grid">
          ${targets.map(({ id, opponent }) => `
            <article class="option-card fight-card ${opponent.tier === 'Special Fight' ? 'special-fight-card' : ''}">
              <div>
                <p class="eyebrow">${opponent.tier} / ${opponent.threat}</p>
                <h2>${opponent.name}</h2>
                <p>${opponent.style}</p>
                <p class="muted">Trash talk can boost followers and rewards, but heat and backlash climb with threat.</p>
              </div>
              <div class="mini-actions">
                ${Object.entries(SOCIAL_TRASH_TALK_STYLES).map(([styleId, style]) => `
                  <button data-action="trash-${id}-${styleId}">${style.name}</button>
                `).join('')}
              </div>
            </article>
          `).join('')}
        </div>`,
      })}
      ${renderCollapsibleSection({
        id: 'social-mentor',
        title: 'Mentor Search',
        subtitle: state.mentor ? `${state.mentor.name} / ${state.mentor.title}` : 'No mentor known',
        body: renderMentorSummary(true),
      })}
      ${renderCollapsibleSection({
        id: 'social-pressure',
        title: 'Social Pressure',
        subtitle: 'Relationships, followers, hype, and consequences.',
        body: '<article class="option-card full"><div><p>Family keeps you human. Mentors boost focused training. Rivals sharpen you. Sponsors open doors and attach strings. Followers turn your fights into money, hype, heat, and consequences.</p></div></article>',
      })}
    </section>
  `;
}

function formatFollowers(value = 0) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(value >= 10000000 ? 0 : 1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return `${value}`;
}

function formatInjury(injury) {
  if (typeof injury === 'string') return injury;
  return `${injury.tier ?? 'Moderate'} ${injury.name}${injury.monthsOut ? ` (${injury.monthsOut}m)` : ''}`;
}

function renderSpecialPortrait(id, opponent, compact = false) {
  if (opponent?.tier !== 'Special Fight') return '';
  const src = SPECIAL_FIGHTER_PORTRAITS[id];
  const title = opponent.growthTitle ? `${opponent.growthTitle} ${opponent.name}` : opponent.name;
  return `
    <div class="special-portrait ${compact ? 'compact' : ''}" data-fighter="${id}" aria-label="${title} portrait" ${src ? `style="--portrait-image: url('${src}')"` : ''}>
      <div class="special-portrait-overlay">
        <span>${opponent.growthTitle ?? 'Special Boss'}</span>
        <strong>${opponent.name}</strong>
      </div>
    </div>
  `;
}

function renderTrainingImage(id, action) {
  const src = TRAINING_IMAGES[id];
  if (!src) return '';
  return `
    <div class="training-image" data-training-image="${id}" aria-label="${action.name} training scene" style="--training-image: url('${src}')">
      <div class="training-image-overlay">
        <span>Training File</span>
        <strong>${action.name}</strong>
      </div>
    </div>
  `;
}

function renderSocialImage(id, action) {
  const src = SOCIAL_IMAGES[id];
  if (!src) return '';
  return `
    <div class="social-image" data-social-image="${id}" aria-label="${action.name} social scene" style="--social-image: url('${src}')">
      <div class="social-image-overlay">
        <span>${action.group}</span>
        <strong>${action.name}</strong>
      </div>
    </div>
  `;
}

function socialTrashTalkTargets() {
  const entries = [...getAvailableFights(state), ...getSpecialFights(state)]
    .filter(({ id }) => id !== state.social?.calledOutTarget?.opponentId);
  const seen = new Set();
  return entries
    .filter(({ id }) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .slice(0, 10)
    .map(({ id, opponent }) => ({ id, opponent }));
}

function renderMentorSummary(expanded = false) {
  if (!state.mentor) {
    return `
      <article class="option-card mentor-card">
        <div>
          <p class="eyebrow">Mentor</p>
          <h2>No Mentor</h2>
          <p>Use Find Mentor. It can fail if your reputation, record, mood, or money are too low.</p>
        </div>
        ${expanded ? '<button data-action="choice-mentor">Search</button>' : ''}
      </article>
    `;
  }

  return `
    <article class="option-card mentor-card">
      <div>
        <p class="eyebrow">Mentor</p>
        <h2>${state.mentor.name}</h2>
        <p>${state.mentor.title} / ${state.mentor.rarity ?? 'Common'}</p>
        <p class="muted">Focus: ${state.mentor.focus.map(labelize).join(', ')}. Focused training gets bonus growth.</p>
        ${state.mentor.trainingMultiplier ? `<p class="muted">Secret boost: ${state.mentor.trainingMultiplier}x normal training growth.</p>` : ''}
        <p class="muted">Auto Training: ${formatMentorAutoList(state.mentor.autoTrainingIds, TRAINING_ACTIONS)}</p>
        <p class="muted">Auto Recovery: ${formatMentorAutoList(state.mentor.autoRecoveryIds, RECOVERY_ACTIONS)}</p>
      </div>
      ${expanded ? '<button data-action="choice-mentor">Find Better</button>' : ''}
    </article>
  `;
}

function formatMentorAutoList(ids, catalog) {
  if (ids === 'all') return 'All';
  if (!ids?.length) return 'None';
  return ids.map((id) => catalog[id]?.name ?? labelize(id)).join(', ');
}

function hunterPowerUi() {
  const stats = getHunterEffectiveStats(state);
  const statPower = (
    (stats.strength ?? 0) +
    (stats.speed ?? 0) +
    (stats.durability ?? 0) +
    (stats.technique ?? 0) +
    (stats.fightIq ?? 0) +
    (stats.willpower ?? 0) +
    (stats.reflexes ?? 0) +
    (stats.control ?? 0)
  ) / 8;
  const shadows = state.hunterWorld?.shadowArmy?.length ?? 0;
  return Math.round(statPower + (state.hunterWorld?.level ?? 1) * 8 + shadows * 18);
}

function hunterStatLabel(stat) {
  return {
    strength: 'Strength',
    agility: 'Agility',
    vitality: 'Vitality',
    sense: 'Sense',
    intelligence: 'Intelligence',
  }[stat] ?? labelize(stat);
}

function hunterObjectiveSummary(hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD) {
  const quest = hunter.dailyQuest;
  const dungeon = hunter.activeDungeon;
  if (state.activeFight?.source === 'hunterDungeon') {
    return {
      label: 'Dungeon Combat',
      text: `${dungeon?.name ?? 'Gate run'} / Room ${(dungeon?.encounterIndex ?? 0) + 1} of ${dungeon?.encounters?.length ?? 1}`,
      tone: 'danger',
    };
  }
  if (state.activeFight?.source === 'hunterQuest') {
    return {
      label: 'Daily Quest Combat',
      text: quest?.title ?? 'Monster encounter active',
      tone: 'danger',
    };
  }
  if (dungeon) {
    if (dungeon.completed) {
      return {
        label: dungeon.outcome === 'cleared' ? 'Gate Cleared' : 'Gate Exit',
        text: dungeon.resultText ?? dungeon.name,
        tone: dungeon.outcome === 'cleared' ? 'clear' : 'danger',
      };
    }
    return {
      label: dungeon.isRedGate ? 'Red Gate Active' : 'Gate Run Active',
      text: `${dungeon.name} / Room ${dungeon.encounterIndex + 1} of ${dungeon.encounters.length}`,
      tone: dungeon.isRedGate ? 'danger' : 'active',
    };
  }
  if (quest) {
    if (quest.outcome === 'retreated') return { label: 'Quest Retreated', text: quest.title, tone: 'danger' };
    if (quest.completed) return { label: quest.failed ? 'Partial Reward' : 'Reward Ready', text: quest.title, tone: quest.failed ? 'danger' : 'clear' };
    const stage = currentHunterQuestStage(quest);
    return {
      label: 'Daily Quest Active',
      text: `${quest.title}${stage?.title ? ` / ${stage.title}` : ''}`,
      tone: 'active',
    };
  }
  return {
    label: 'Awaiting Command',
    text: `${hunter.gateOffers?.length ?? 0} Gate signals / Daily Quest available`,
    tone: 'idle',
  };
}

function hunterGuidanceCue(hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD) {
  const quest = hunter.dailyQuest;
  const dungeon = hunter.activeDungeon;
  if (hunter.pendingLevelRewards?.length) {
    return {
      label: 'Claim System Level Reward',
      text: 'Choose your level bonus before continuing the System loop.',
      tone: 'ready',
    };
  }
  if (state.activeFight?.source === 'hunterDungeon') {
    return {
      label: 'Finish Dungeon Fight',
      text: 'Resolve the active Gate encounter to update room rewards and route progress.',
      tone: 'danger',
    };
  }
  if (state.activeFight?.source === 'hunterQuest') {
    return {
      label: 'Finish Daily Quest Fight',
      text: 'Clear or survive the current monster objective to update the Daily Quest.',
      tone: 'danger',
    };
  }
  if (dungeon?.completed) {
    return {
      label: 'Review Gate Report',
      text: dungeon.outcome === 'cleared'
        ? 'Close the clear report to refresh the Gate Board.'
        : 'Close the exit report to return to Gate selection.',
      tone: dungeon.outcome === 'cleared' ? 'clear' : 'danger',
    };
  }
  if (dungeon?.awaitingAdvance) {
    return {
      label: 'Continue Dungeon',
      text: 'A cleared room is waiting. Proceed deeper or retreat before the next chamber.',
      tone: 'active',
    };
  }
  if (dungeon) {
    return {
      label: 'Enter Next Chamber',
      text: `Room ${dungeon.encounterIndex + 1} of ${dungeon.encounters.length} is ready. Health and mana carry forward.`,
      tone: dungeon.isRedGate ? 'danger' : 'active',
    };
  }
  if (quest?.outcome === 'retreated') {
    return {
      label: 'Clear Retreated Quest',
      text: 'Dismiss the abandoned Daily Quest result before generating another.',
      tone: 'danger',
    };
  }
  if (quest?.completed) {
    return {
      label: 'Claim Daily Quest Reward',
      text: 'The System reward window is ready. Claim it to free the Daily Quest slot.',
      tone: quest.failed ? 'danger' : 'clear',
    };
  }
  if (quest) {
    return {
      label: 'Continue Daily Quest',
      text: 'Advance the current Daily Quest stage or start the monster encounter.',
      tone: 'active',
    };
  }
  if (hunter.redGatePending) {
    return {
      label: 'Scan Red Gate',
      text: 'An emergency Red Gate can appear on the next Gate Board refresh.',
      tone: 'danger',
    };
  }
  if (hunter.gateOffers?.length) {
    return {
      label: 'Choose Gate',
      text: 'Pick a Gate signal to start a dungeon route with room rewards and a boss jackpot.',
      tone: 'active',
    };
  }
  if (hunter.statPoints) {
    return {
      label: 'Spend Hunter Stat Points',
      text: 'Unspent System stats are available in the Hunter stat panel.',
      tone: 'ready',
    };
  }
  return {
    label: 'Generate Gate Board',
    text: 'No urgent System task is pending. Generate or choose your next Hunter objective.',
    tone: 'idle',
  };
}

function renderHunterGuidanceStrip(hunter) {
  const guidance = hunterGuidanceCue(hunter);
  return `
    <div class="system-guidance-strip ${guidance.tone}">
      <span>Next</span>
      <strong>${escapeHtml(guidance.label)}</strong>
      <p>${escapeHtml(guidance.text)}</p>
    </div>
  `;
}

function renderPendingStateBadges(badges = []) {
  if (!badges.length) return '';
  return `
    <div class="pending-state-badges">
      ${badges.map((badge) => `<span class="pending-state-badge ${badge.tone ?? ''}">${escapeHtml(badge.label)}</span>`).join('')}
    </div>
  `;
}

function hunterPendingBadges(hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD, area = 'status') {
  const badges = [];
  const dungeon = hunter.activeDungeon;
  const quest = hunter.dailyQuest;
  const include = (...areas) => areas.includes(area) || area === 'status';

  if (include('level') && hunter.pendingLevelRewards?.length) badges.push({ label: 'Level reward pending', tone: 'ready' });
  if (include('gate') && dungeon && !dungeon.completed) {
    badges.push({ label: dungeon.isRedGate ? 'Red Gate room active' : 'Dungeon room active', tone: dungeon.isRedGate ? 'danger' : 'active' });
  }
  if (include('gate') && dungeon?.completed) badges.push({ label: 'Gate report pending', tone: dungeon.outcome === 'cleared' ? 'clear' : 'danger' });
  if (include('gate') && hunter.redGatePending) badges.push({ label: 'Red Gate signal', tone: 'danger' });
  if (include('quest') && quest?.completed) badges.push({ label: 'Daily Quest reward', tone: quest.failed ? 'danger' : 'clear' });
  if (include('quest') && quest && !quest.completed && quest.outcome !== 'retreated') badges.push({ label: 'Daily Quest active', tone: 'active' });
  if (include('stats') && hunter.statPoints) badges.push({ label: `${hunter.statPoints} stat point${hunter.statPoints === 1 ? '' : 's'}`, tone: 'ready' });

  return badges;
}

function systemChip(label, value, tone = '') {
  return `
    <span class="system-chip ${tone}">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(String(value))}</strong>
    </span>
  `;
}

function renderSystemScanRows(rows = []) {
  if (!rows.length) return '';
  return `
    <div class="system-scan-grid">
      ${rows.map((row) => `
        <div class="system-scan-row ${row.tone ?? ''}">
          <span>${escapeHtml(row.label)}</span>
          <strong>${escapeHtml(String(row.value))}</strong>
        </div>
      `).join('')}
    </div>
  `;
}

function renderHunterSystemStatus(hunter) {
  const objective = hunterObjectiveSummary(hunter);
  return `
    <article class="system-status-panel option-card ${objective.tone}">
      <div class="system-status-top">
        <div>
          <p class="eyebrow">SYSTEM STATUS</p>
          <h2>${escapeHtml(state.identity.name)}</h2>
          <p>${escapeHtml(objective.text)}</p>
        </div>
        <span class="system-rank-sigil">${escapeHtml(hunter.rank)}</span>
      </div>
      <div class="system-chip-row">
        ${systemChip('Rank', `${hunter.rank}-Rank`, 'rank')}
        ${systemChip('Level', hunter.level)}
        ${systemChip('XP', hunter.xp)}
        ${systemChip('Stat Pts', hunter.statPoints, hunter.statPoints ? 'ready' : '')}
        ${systemChip('Power', hunterPowerUi(), 'power')}
        ${systemChip('Fatigue', `${hunter.systemFatigue}%`, hunter.systemFatigue >= 70 ? 'danger' : '')}
        ${systemChip('Gates', hunter.gatesCleared)}
        ${systemChip('Shadows', hunter.shadowArmy?.length ?? 0)}
      </div>
      <div class="system-objective-line ${objective.tone}">
        <span>${escapeHtml(objective.label)}</span>
        <strong>${escapeHtml(objective.text)}</strong>
      </div>
      ${renderHunterGuidanceStrip(hunter)}
      ${renderPendingStateBadges(hunterPendingBadges(hunter, 'status'))}
    </article>
  `;
}

function hunterActivityToneState({ title, locked = false, tone = '', cta = '' }) {
  if (locked) return 'locked';
  if (tone === 'gate' && state.hunterWorld?.activeDungeon?.isRedGate) return 'danger';
  if (/Retreated|Failed|Ended|Red Gate/i.test(title)) return 'danger';
  if (/Claim|Cleared|Reward/i.test(title)) return 'ready';
  if (/Fight|Continue|Review|View/i.test(cta) || /Dungeon active|Stage \d/i.test(title)) return 'active';
  return '';
}

function renderHunterActivity({ icon, title, subtitle, meta, action, locked = false, tone = '', cta = 'Open', badges = [] }) {
  const stateTone = hunterActivityToneState({ title, locked, tone, cta });
  return `
    <article class="hunter-activity option-card system-module ${locked ? 'locked' : ''} ${tone} ${stateTone}">
      <div class="hunter-icon" aria-hidden="true">${icon}</div>
      <div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
        <span class="activity-meta system-chip compact"><small>Status</small><strong>${meta}</strong></span>
        ${renderPendingStateBadges(badges)}
      </div>
      ${locked ? '<span class="lock-pill">Locked</span>' : button(cta, action, 'activity-open')}
    </article>
  `;
}

function renderHunterStatButtons() {
  const hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD;
  if (!hunter.statPoints) return '<p class="muted">No System stat points available.</p>';
  const selectedAmount = Math.min(Math.max(1, Math.floor(hunterStatSpendAmount || 1)), hunter.statPoints);
  const amountOptions = [
    { label: '1', value: 1 },
    { label: '5', value: Math.min(5, hunter.statPoints) },
    { label: '10', value: Math.min(10, hunter.statPoints) },
    { label: 'All', value: hunter.statPoints },
  ].filter((option, index, options) => options.findIndex((item) => item.value === option.value) === index);
  return `
    <div class="compact-action-grid hunter-stat-amount-grid">
      ${amountOptions.map((option) => button(option.label, `hunter-stat-amount-${option.value}`, option.value === selectedAmount ? 'small-btn clear' : 'small-btn')).join('')}
    </div>
    <div class="compact-action-grid">
      ${Object.keys(DEFAULT_HUNTER_WORLD.stats).map((stat) => button(`${hunterStatLabel(stat)} +${selectedAmount}`, `hunter-stat-bulk-${stat}`)).join('')}
    </div>
  `;
}

function renderHunterStatSheet() {
  const hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD;
  return `
    <div class="world-grid hunter-stat-grid system-stat-grid">
      ${Object.entries(hunter.stats ?? DEFAULT_HUNTER_WORLD.stats).map(([stat, value]) => `
        <div class="system-stat-tile">
          <span>${hunterStatLabel(stat)}</span>
          <strong>${value}</strong>
          <small>+${value * 10} mapped power</small>
        </div>
      `).join('')}
    </div>
    <p class="muted">Each Hunter stat point adds 1 System stat. That counts as roughly +10 mapped fighter-stat power during Hunter/System checks.</p>
  `;
}

function hunterSkillRequirementText(move, hunter) {
  const requirements = [];
  if (move.requiresHunterRank) requirements.push(`${move.requiresHunterRank}-Rank`);
  if (move.requiresPerk) requirements.push(HUNTER_LEVEL_REWARD_OPTIONS[move.requiresPerk]?.label ?? labelize(move.requiresPerk));
  if (move.requiresWeapon) requirements.push(HUNTER_ITEM_CATALOG[move.requiresWeapon]?.label ?? labelize(move.requiresWeapon));
  if (move.requiresShadowMonarch) requirements.push('Shadow Monarch');
  if (move.requiresSecretSkill) requirements.push(`${labelize(move.requiresSecretSkill)} secret`);
  if (!requirements.length) return hunter.unlocked ? 'Starter System skill' : 'System awakening required';
  return requirements.join(' / ');
}

function renderHunterSkillsPanel() {
  const hunter = normalizeHunterWorld(state.hunterWorld);
  const unlockedIds = new Set(getUnlockedHunterMoves(state).map((move) => move.id));
  const moves = Object.entries(HUNTER_MOVES).map(([id, move]) => ({ id, ...move, unlocked: unlockedIds.has(id) }));
  const ownedPerks = normalizeSystemPerks(hunter.systemPerks)
    .filter((perk) => (perk.count ?? 0) > 0)
    .map((perk) => ({ ...perk, option: HUNTER_LEVEL_REWARD_OPTIONS[perk.id] }));
  const secretSkills = hunter.secretSystemSkills ?? [];
  const unlockedCount = moves.filter((move) => move.unlocked).length;
  const ownedSkillCount = unlockedCount + ownedPerks.length + secretSkills.length;
  const secretSkillLabels = secretSkills.length ? secretSkills.map(labelize).join(' / ') : 'None awakened';
  return `
    <div class="system-chip-row hunter-skill-summary">
      ${systemChip('Skills Owned', ownedSkillCount, ownedSkillCount ? 'ready' : '')}
      ${systemChip('Combat Moves', `${unlockedCount}/${moves.length}`, unlockedCount ? 'ready' : '')}
      ${systemChip('Passive Perks', ownedPerks.length)}
      ${systemChip('Secret Powers', secretSkills.length, secretSkills.length ? 'ready' : '')}
      ${systemChip('Secret List', secretSkillLabels)}
    </div>
    <section class="hunter-skill-section">
      <div class="hunter-item-section-header">
        <h3>Combat Skills</h3>
        <span class="system-chip compact"><small>Unlocked</small><strong>${unlockedCount}</strong></span>
      </div>
      <div class="world-grid hunter-skill-grid">
        ${moves.map((move) => `
          <article class="option-card system-window hunter-skill-card ${move.unlocked ? 'unlocked' : 'locked'} skill-${move.moveType ?? 'basic'}">
            <div>
              <p class="eyebrow">${escapeHtml(labelize(move.moveType ?? 'basic'))} / ${escapeHtml(labelize(move.category ?? 'system'))}</p>
              <h3>${escapeHtml(move.label)}</h3>
              <p>${escapeHtml(move.hint ?? move.text ?? 'System combat skill.')}</p>
              <p class="muted">Requirement: ${escapeHtml(hunterSkillRequirementText(move, hunter))}</p>
            </div>
            <span class="skill-status-badge ${move.unlocked ? 'ready' : 'locked'}">${move.unlocked ? 'Unlocked' : 'Locked'}</span>
          </article>
        `).join('')}
      </div>
    </section>
    <section class="hunter-skill-section">
      <div class="hunter-item-section-header">
        <h3>System Passives</h3>
        <span class="system-chip compact"><small>Owned</small><strong>${ownedPerks.length}</strong></span>
      </div>
      <div class="world-grid hunter-skill-grid">
        ${ownedPerks.length ? ownedPerks.map((perk) => `
          <article class="option-card system-window hunter-skill-card unlocked skill-passive">
            <div>
              <p class="eyebrow">Passive / ${escapeHtml(labelize(perk.option?.tier ?? 'system'))}</p>
              <h3>${escapeHtml(perk.option?.label ?? labelize(perk.id))}</h3>
              <p>${escapeHtml(perk.option?.description ?? 'System passive owned from level rewards.')}</p>
            </div>
            <span class="skill-status-badge ready">x${perk.count ?? 1}</span>
          </article>
        `).join('') : '<article class="option-card system-window hunter-skill-card locked"><div><h3>No passives owned yet</h3><p>Claim Hunter level rewards to unlock System passives.</p></div><span class="skill-status-badge locked">Empty</span></article>'}
      </div>
    </section>
  `;
}

function renderHunterMilestones() {
  const milestones = getHunterMilestones(state);
  return `
    <div class="world-grid hunter-milestone-grid">
      ${milestones.map((milestone) => `
        <article class="option-card system-window milestone-card ${milestone.complete ? 'complete' : milestone.ready ? 'ready' : ''}">
          <div>
            <p class="eyebrow">${milestone.complete ? 'Complete' : milestone.ready ? 'Ready' : 'In Progress'}</p>
            <h3>${escapeHtml(milestone.title)}</h3>
            <p>${escapeHtml(milestone.subtitle)}</p>
          </div>
          <span class="system-chip compact"><small>Goal</small><strong>${escapeHtml(`${Math.min(milestone.current ?? 0, milestone.target ?? 1)}/${milestone.target ?? 1}`)}</strong></span>
        </article>
      `).join('')}
    </div>
  `;
}

function renderHunterAssociationPanel() {
  const review = getHunterAssociationReview(state);
  return `
    <article class="option-card system-window association-review-card">
      <div>
        <p class="eyebrow">Hunter Association</p>
        <h2>${review.nextRank ? `${review.currentRank}-Rank Review -> ${review.nextRank}-Rank` : 'Maximum Rank File'}</h2>
        <p>${review.eligible ? 'Promotion requirements satisfied. Submit for reassessment to claim the rank reward.' : 'Build the missing requirements before the next promotion review.'}</p>
        ${renderSystemScanRows(review.requirements.map((item) => ({
          label: item.label,
          value: `${item.current}/${item.required}`,
          tone: item.met ? 'clear' : 'danger',
        })))}
        <p class="muted">Rewards: ${review.rewards.map(escapeHtml).join(' / ')}</p>
      </div>
      ${button(review.eligible ? 'Claim Promotion' : 'Request Review', 'hunter-association', review.eligible ? 'primary' : '')}
    </article>
  `;
}

function renderShadowArmyPanel() {
  const summary = getShadowArmySummary(state);
  const selectedShadow = summary.roster.find((shadow) => shadow.id === selectedShadowArmyId) ?? null;
  const hunter = normalizeHunterWorld(state.hunterWorld);
  const autoGateIds = new Set(hunter.autoGateLoadout ?? []);
  const autoGateShadows = summary.roster.filter((shadow) => autoGateIds.has(shadow.id));
  const autoGatePower = autoGateShadows.reduce((sum, shadow) => sum + Math.max(1, Math.floor(shadow.armyPower ?? shadow.strength ?? 1)), 0);
  return `
    <article class="option-card system-window shadow-army-panel">
      <div>
        <p class="eyebrow">Shadow Army</p>
        <h2>${summary.count} Shadows / Army Power ${summary.armyPower}</h2>
        <p>Ultimate ARISE is a passive System skill. Once unlocked, eligible defeated bosses rise into this army automatically for Domain conquest.</p>
        ${renderSystemScanRows(summary.bonuses.map((bonus, index) => ({ label: `Bonus ${index + 1}`, value: bonus, tone: index === 3 && summary.count >= 3 ? 'clear' : '' })))}
      </div>
      <span class="lock-pill">Ultimate passive</span>
    </article>
    <article class="option-card system-window auto-gate-loadout">
      <div>
        <p class="eyebrow">Auto Gate Loadout</p>
        <h2>${autoGateShadows.length}/10 Shadows / Power ${autoGatePower}</h2>
        <p>Select up to 10 shadows here. AUTO GATE uses only this loadout to instantly clear Gate offers when the shadows are strong enough.</p>
        ${renderSystemScanRows([
    { label: 'Selected', value: `${autoGateShadows.length}/10`, tone: autoGateShadows.length ? 'active' : 'danger' },
    { label: 'Loadout Power', value: autoGatePower, tone: autoGatePower ? 'clear' : 'danger' },
    { label: 'Boss ARISE', value: 'Requires Ultimate ARISE perk', tone: 'active' },
  ])}
      </div>
      ${button('Equip Best', 'auto-gate-equip-best', summary.roster.length ? 'primary' : 'disabled')}
    </article>
    ${selectedShadow ? renderSelectedShadowPassiveInfo(selectedShadow) : ''}
    <div class="world-grid shadow-roster-grid">
      ${summary.roster.length ? summary.roster.map((shadow) => {
    const passive = shadow.passive ?? {};
    const tone = classToken(shadow.passiveTone ?? passive.tone ?? 'echo');
    const rank = classToken(shadow.rank ?? 'E');
    const redGate = passive.redGate ? ' shadow-red-gate' : '';
    const selected = shadow.id === selectedShadowArmyId ? ' selected' : '';
    const autoSelected = autoGateIds.has(shadow.id);
    return `
        <article class="option-card system-window shadow-card shadow-passive-${tone} shadow-rank-${rank}${redGate}${selected}${autoSelected ? ' auto-gate-selected' : ''}" data-action="shadow-army-select-${encodeURIComponent(shadow.id)}" tabindex="0" role="button" aria-label="Inspect ${escapeHtml(shadow.name)} passive">
          <div>
            <p class="eyebrow">${escapeHtml(shadow.rank ?? 'E')}-Rank Shadow <span class="shadow-rank-badge">${escapeHtml(shadow.rank ?? 'E')}</span></p>
            <h3>${escapeHtml(shadow.name)}</h3>
            <p>${escapeHtml(shadow.sourceBoss ?? 'Extracted boss echo')} / ${escapeHtml(shadow.role ?? 'vanguard')} / Power ${escapeHtml(String(shadow.armyPower ?? shadow.strength))}</p>
            <p class="shadow-passive-name">${escapeHtml(shadow.passiveLabel ?? passive.label ?? 'Boss Echo Passive')}</p>
            <p class="shadow-passive-effect">${escapeHtml(shadow.passiveDescription ?? passive.description ?? 'This shadow lends a passive while bound to the army.')}</p>
          </div>
          ${button(autoSelected ? 'Remove Auto Gate' : 'Add Auto Gate', `auto-gate-shadow-${encodeURIComponent(shadow.id)}`, autoSelected ? 'small-btn clear' : 'small-btn')}
        </article>
      `;
  }).join('') : '<article class="option-card system-window"><div><h3>No shadows bound yet</h3><p>Unlock Ultimate ARISE to make eligible defeated bosses rise automatically.</p></div></article>'}
    </div>
  `;
}

function renderSelectedShadowPassiveInfo(shadow) {
  const passive = shadow.passive ?? {};
  const effects = passive.effectText || shadow.passiveDescription || 'Passive effect active while this shadow remains in the army.';
  const source = shadow.sourceBoss ?? 'Extracted boss echo';
  const redGateLabel = passive.redGate ? ' / Red Gate upgraded' : '';
  return `
    <article class="option-card system-window shadow-passive-detail shadow-passive-${classToken(shadow.passiveTone ?? passive.tone ?? 'echo')} shadow-rank-${classToken(shadow.rank ?? 'E')} ${passive.redGate ? 'shadow-red-gate' : ''}">
      <div>
        <p class="eyebrow">Selected Shadow Passive${redGateLabel}</p>
        <h3>${escapeHtml(shadow.name)} <span class="shadow-rank-badge">${escapeHtml(shadow.rank ?? 'E')}</span> - ${escapeHtml(shadow.passiveLabel ?? passive.label ?? 'Boss Echo Passive')}</h3>
        <p>${escapeHtml(shadow.passiveDescription ?? passive.description ?? 'This shadow lends a passive while bound to the army.')}</p>
        ${renderSystemScanRows([
    { label: 'Source Boss', value: source },
    { label: 'Rank / Scale', value: `${shadow.rank ?? 'E'}-Rank / x${passive.scale ?? 1}` },
    { label: 'Role / Power', value: `${shadow.role ?? 'vanguard'} / ${shadow.armyPower ?? shadow.strength}` },
    { label: 'Active Effect', value: effects, tone: 'clear' },
  ])}
      </div>
      <button class="small-btn" data-action="shadow-army-clear">Close</button>
    </article>
  `;
}

function renderShadowDomainsPanel() {
  const map = getShadowDomainMap(state);
  const selected = map.domains.find((domain) => domain.id === selectedShadowDomainId) ?? map.domains.find((domain) => domain.canAttack) ?? map.domains[0];
  selectedShadowDomainId = selected?.id ?? null;
  const stateLabel = {
    locked: 'Locked',
    available: 'Attack Ready',
    conquered: 'Conquered',
    core: 'Core Domain',
  };
  const domainById = Object.fromEntries(map.domains.map((domain) => [domain.id, domain]));
  const links = map.domains.flatMap((domain) => (domain.requires ?? []).map((sourceId) => ({ from: domainById[sourceId], to: domain })).filter((link) => link.from && link.to));
  const mapX = (domain) => Math.round(8 + Number(domain?.x ?? 0) * 1.45);
  const mapY = (domain) => Number(domain?.y ?? 0);
  return `
    <section class="shadow-domain-layout">
      <article class="system-window shadow-map-card">
        <div class="shadow-map-header">
          <div>
            <p class="eyebrow">Shadow Domains</p>
            <h2>Domain War Map</h2>
          </div>
          <span class="system-chip">Army ${formatArmyPower(map.armyPower)}</span>
        </div>
        <div class="shadow-domain-scroll" tabindex="0" aria-label="Scrollable Shadow Domain tactical map">
          <svg class="shadow-domain-map tactical-board" viewBox="0 0 152 100" role="img" aria-label="Interactive Shadow Domain tactical map">
            <rect class="domain-map-backdrop" x="4" y="6" width="144" height="88" rx="6"></rect>
            <g class="domain-grid-lines">
              ${[24, 42, 60, 78].map((line) => `<line x1="6" y1="${line}" x2="146" y2="${line}"></line>`).join('')}
              ${[28, 52, 76, 100, 124].map((line) => `<line x1="${line}" y1="8" x2="${line}" y2="92"></line>`).join('')}
            </g>
            <g class="domain-routes">
              ${links.map((link) => `<line class="domain-route ${link.to.state === 'conquered' ? 'conquered' : link.to.state === 'locked' ? 'locked' : 'active'}" x1="${mapX(link.from)}" y1="${mapY(link.from)}" x2="${mapX(link.to)}" y2="${mapY(link.to)}"></line>`).join('')}
            </g>
            ${map.domains.map((domain) => `
              <g class="domain-node state-${domain.state} ${selected?.id === domain.id ? 'selected' : ''}" data-action="shadow-domain-select-${domain.id}" tabindex="0" role="button" aria-label="${escapeHtml(domain.name)}">
                <circle class="domain-node-ring" cx="${mapX(domain)}" cy="${mapY(domain)}" r="${domain.core ? 5.8 : 4.6}"></circle>
                <circle class="domain-node-core" cx="${mapX(domain)}" cy="${mapY(domain)}" r="${domain.core ? 3.5 : 2.8}"></circle>
                <text class="domain-node-label" x="${mapX(domain)}" y="${mapY(domain) - 11}">${domain.core ? 'CORE' : domain.name.split(' ')[0].toUpperCase()}</text>
                <text class="domain-node-power" x="${mapX(domain)}" y="${mapY(domain) + 1}">${compactArmyPower(domain.enemyPower)}</text>
              </g>
            `).join('')}
          </svg>
        </div>
        <div class="domain-map-legend" aria-hidden="true">
          <span><i class="legend-dot locked"></i>Locked</span>
          <span><i class="legend-dot enemy"></i>Enemy</span>
          <span><i class="legend-dot ready"></i>Ready</span>
          <span><i class="legend-dot conquered"></i>Conquered</span>
          <span><i class="legend-dot core"></i>Core</span>
        </div>
      </article>
      <article class="option-card system-window domain-detail-card ${selected?.state ? `state-${selected.state}` : ''}">
        <div>
          <p class="eyebrow">${escapeHtml(stateLabel[selected?.state] ?? 'Domain')}</p>
          <h2>${escapeHtml(selected?.name ?? 'No Domain')}</h2>
          <p>${escapeHtml(selected?.enemy ?? 'Enemy territory')} controls this region.</p>
          ${renderSystemScanRows([
            { label: 'Enemy Army', value: formatArmyPower(selected?.enemyPower ?? 0), tone: 'danger' },
            { label: 'Your Army', value: formatArmyPower(map.armyPower), tone: map.armyPower >= (selected?.enemyPower ?? 1) ? 'clear' : 'danger' },
            { label: 'Reward', value: `+${selected?.rewards?.statPoints ?? 0} stat points`, tone: 'clear' },
            { label: 'Status', value: selected?.lockReason || stateLabel[selected?.state] || 'Ready', tone: selected?.canAttack ? 'active' : selected?.state === 'conquered' ? 'clear' : 'danger' },
          ])}
        </div>
        ${selected?.canAttack ? button('Battle Domain', `shadow-domain-battle-${selected.id}`, 'primary') : `<span class="lock-pill">${escapeHtml(selected?.lockReason || stateLabel[selected?.state] || 'Locked')}</span>`}
      </article>
    </section>
  `;
}

function renderMonarchWarPanel() {
  const hunter = normalizeHunterWorld(state.hunterWorld);
  const bosses = [
    { id: 'monarch-fangs', name: 'Monarch of Fangs', power: 780 },
    { id: 'monarch-frost', name: 'Monarch of Frost', power: 900 },
    { id: 'monarch-flames', name: 'Monarch of Flames', power: 1040 },
    { id: 'monarch-destruction', name: 'Monarch of Destruction', power: 1220 },
  ];
  const defeated = new Set(hunter.monarchWar?.defeated ?? []);
  const endingText = {
    closePortals: 'The System ended and your Hunter powers faded.',
    defendPlanet: 'The System remains while you defend the planet.',
    curseWorld: 'Portals were remade into curse reports. Hunter powers are sealed, and cursed energy rules the hidden world.',
  }[hunter.systemEnding?.choice] ?? 'The final choice has been recorded.';
  return `
    <div class="activity-list monarch-war-grid">
      ${bosses.map((boss) => `
        <article class="option-card system-window monarch-boss-card ${defeated.has(boss.id) ? 'complete' : ''}">
          <div>
            <p class="eyebrow">${defeated.has(boss.id) ? 'Defeated' : 'Monarch War'}</p>
            <h3>${escapeHtml(boss.name)}</h3>
            <p>Power ${boss.power}. Normal Gates no longer answer after Shadow Monarch transformation.</p>
          </div>
          ${defeated.has(boss.id) ? '<span class="lock-pill">Defeated</span>' : button('Fight Monarch', `monarch-battle-${boss.id}`, 'danger')}
        </article>
      `).join('')}
      ${hunter.monarchWar?.finalChoiceUnlocked ? `
        <article class="option-card system-window monarch-ending-card">
          <div>
            <p class="eyebrow">Final System Choice</p>
            <h3>${hunter.systemEnding ? 'Choice Recorded' : 'Portals Await Judgment'}</h3>
            <p>${hunter.systemEnding ? escapeHtml(endingText) : 'All Monarchs are defeated. Decide what happens to the System.'}</p>
          </div>
          ${hunter.systemEnding ? '<span class="lock-pill">Complete</span>' : `${button('Replace With Curses', 'system-ending-curseWorld', 'danger')}${button('Close Portals', 'system-ending-closePortals')}${button('Defend Planet', 'system-ending-defendPlanet', 'primary')}`}
        </article>
      ` : ''}
    </div>
  `;
}

function renderHunterCraftingPanel() {
  const recipes = getHunterCraftingRecipes(state);
  return `
    <div class="activity-list crafting-grid">
      ${recipes.map((recipe) => `
        <article class="option-card system-window crafting-card ${recipe.available ? 'ready' : 'locked'}">
          <div>
            <p class="eyebrow">System Crafting${recipe.upgradeItem ? ` / Upgrade +${recipe.currentUpgrade}` : ''}</p>
            <h3>${escapeHtml(recipe.label)}</h3>
            <p>${escapeHtml(recipe.description)}</p>
            <p class="muted">Cost: ${Object.entries(recipe.costs ?? {}).map(([id, quantity]) => `${escapeHtml(HUNTER_ITEM_CATALOG[id]?.label ?? labelize(id))} x${quantity}`).join(' / ')}</p>
            ${recipe.missing.length ? `<p class="danger-copy">Missing: ${recipe.missing.map(escapeHtml).join(', ')}</p>` : ''}
          </div>
          <button class="primary" data-action="hunter-craft-${recipe.id}" ${recipe.available ? '' : 'disabled'}>${recipe.upgradeItem ? 'Upgrade' : 'Craft'}</button>
        </article>
      `).join('')}
    </div>
  `;
}

function renderMonarchTracePanel() {
  const hunter = normalizeHunterWorld(state.hunterWorld);
  const milestone = getHunterMilestones(state).find((item) => item.id === 'monarch-trace');
  const trace = hunter.monarchTrace ?? DEFAULT_HUNTER_WORLD.monarchTrace;
  const locked = !trace.unlocked && !milestone?.ready;
  return `
    <article class="option-card system-window monarch-trace-card ${trace.unlocked ? 'active' : locked ? 'locked' : 'ready'}">
      <div>
        <p class="eyebrow">Monarch Trace</p>
        <h2>${trace.completed ? 'Shadow Monarch Candidate' : trace.unlocked ? `Trace Stage ${trace.stage}` : milestone?.ready ? 'Trace Ready' : 'Dormant'}</h2>
        <p>${trace.completed ? 'Abyssal Leech is unlocked. The System recognizes your shadow army as an endgame vessel.' : trace.unlocked ? 'The trace is responding to your shadow roster and S-rank Gate record.' : milestone?.subtitle ?? 'Requires S-rank, Level 40, 50 Gates, and 3 shadows.'}</p>
        ${renderSystemScanRows([
          { label: 'Stage', value: `${trace.stage}/4`, tone: trace.unlocked ? 'active' : '' },
          { label: 'Influence', value: `${trace.influence}%`, tone: trace.influence >= 75 ? 'danger' : '' },
          { label: 'Requirement', value: milestone?.ready || trace.unlocked ? 'Satisfied' : 'Locked', tone: milestone?.ready || trace.unlocked ? 'clear' : 'danger' },
        ])}
      </div>
      ${locked || trace.completed ? `<span class="lock-pill">${trace.completed ? 'Complete' : 'Locked'}</span>` : button(trace.unlocked ? 'Advance Trace' : 'Awaken Trace', 'hunter-monarch', 'primary')}
    </article>
  `;
}

function currentHunterQuestStage(quest) {
  if (!quest || quest.completed) return null;
  return quest.stages?.[quest.stageIndex ?? 0] ?? null;
}

function hunterQuestActivity(quest) {
  if (!quest) {
    return {
      title: 'Generate Daily Quest',
      subtitle: 'Open a System event chain with choices, monster combat, and a real reward screen.',
      meta: 'No active quest',
      action: 'hunter-daily',
      cta: 'Generate',
    };
  }
  if (quest.outcome === 'retreated') {
    return {
      title: 'Retreated From Daily Quest',
      subtitle: 'You escaped the monster encounter alive. Review the failed objective and clear it.',
      meta: 'No reward / Survival penalties applied',
      action: 'hunter-quest-open',
      cta: 'Review',
    };
  }
  if (quest.completed) {
    return {
      title: 'Claim System Reward',
      subtitle: quest.failed ? 'The objective failed, but the System still offers partial completion rewards.' : 'The daily objective is complete. Claim XP, growth, and System credit.',
      meta: quest.failed ? 'Partial reward ready' : 'Reward ready',
      action: 'hunter-quest-claim',
      cta: 'Claim',
    };
  }
  const stage = currentHunterQuestStage(quest);
  return {
    title: quest.title,
    subtitle: stage?.body ?? 'System objective active.',
    meta: `Stage ${(quest.stageIndex ?? 0) + 1}/${quest.stages?.length ?? 1}`,
    action: 'hunter-quest-open',
    cta: stage?.type === 'combat' ? 'Fight' : 'View',
  };
}

function renderHunterQuestPanel() {
  const quest = state.hunterWorld?.dailyQuest;
  if (!quest) {
    return `
      <article class="option-card hunter-quest-card system-window">
        <div>
          <p class="eyebrow">System Daily Quest</p>
          <h2>No Quest Active</h2>
          <p>The System is quiet. Use the Daily Quest activity to generate a random event chain with choices and monster combat.</p>
        </div>
      </article>
    `;
  }
  const stage = currentHunterQuestStage(quest);
  const progress = `${Math.min((quest.stageIndex ?? 0) + 1, quest.stages?.length ?? 1)} / ${quest.stages?.length ?? 1}`;
  if (quest.outcome === 'retreated') {
    return `
      <article class="option-card hunter-quest-card system-window failed">
        <div>
          <p class="eyebrow">System Daily Quest / Retreated</p>
          <h2>${escapeHtml(quest.title)}</h2>
          <p>You escaped the monster encounter alive, but abandoned the objective. No System reward is available.</p>
          <p class="muted">Consequences: +10 fatigue / -8 mood / -3 reputation</p>
          <p class="muted">Next: dismiss this quest result to generate a fresh Daily Quest.</p>
          ${renderSystemScanRows([
            { label: 'Outcome', value: 'Retreated', tone: 'danger' },
            { label: 'Reward', value: 'None', tone: 'danger' },
            { label: 'Objective', value: 'Failed', tone: 'danger' },
          ])}
          ${renderHunterQuestResults(quest)}
        </div>
        ${button('Dismiss Failed Quest', 'hunter-quest-dismiss', 'danger')}
      </article>
    `;
  }
  if (quest.completed) {
    return `
      <article class="option-card hunter-quest-card system-window ${quest.failed ? 'failed' : 'complete'}">
        <div>
          <p class="eyebrow">System Daily Quest</p>
          <h2>${escapeHtml(quest.title)}</h2>
          <p>${quest.failed ? 'Objective failed. The System converts survival data into a partial reward.' : 'All objectives complete. The blue reward window is waiting.'}</p>
          <p class="muted">Rewards: ${(quest.rewardsPreview ?? []).map(escapeHtml).join(' / ')}</p>
          <p class="muted">Next: claim the reward window to unlock a new Daily Quest roll.</p>
          ${renderSystemScanRows([
            { label: 'Outcome', value: quest.failed ? 'Partial clear' : 'Complete', tone: quest.failed ? 'danger' : 'clear' },
            { label: 'Reward Window', value: 'Ready', tone: 'clear' },
          ])}
          ${renderHunterQuestResults(quest)}
        </div>
        ${button('Claim Reward', 'hunter-quest-claim', 'primary')}
      </article>
    `;
  }
  const choices = stage?.type === 'choice'
    ? `<div class="compact-action-grid quest-choice-grid">${(stage.choices ?? []).map((choice) => button(choice.label, `hunter-quest-choice-${choice.id}`)).join('')}</div>`
    : button('Enter Monster Fight', 'hunter-quest-fight', 'primary wide');
  return `
    <article class="option-card hunter-quest-card system-window active">
      <div>
        <p class="eyebrow">System Daily Quest / Stage ${progress}</p>
        <h2>${escapeHtml(stage?.title ?? quest.title)}</h2>
        <p>${escapeHtml(stage?.body ?? 'The System is waiting for your next action.')}</p>
        <p class="muted">Quest: ${escapeHtml(quest.title)}. Rewards: ${(quest.rewardsPreview ?? []).map(escapeHtml).join(' / ')}</p>
        <p class="muted">Next: ${stage?.type === 'combat' ? 'enter the monster encounter; retreating fails the quest with no reward.' : 'pick one event response to advance the Daily Quest chain.'}</p>
        ${renderSystemScanRows([
          { label: 'Objective Progress', value: progress, tone: 'active' },
          { label: 'Current Stage', value: stage?.type === 'combat' ? 'Monster encounter' : 'Choice event', tone: stage?.type === 'combat' ? 'danger' : 'active' },
        ])}
        ${renderHunterQuestResults(quest)}
      </div>
      ${choices}
    </article>
  `;
}

function renderHunterQuestPopup() {
  if (!hunterQuestPopupOpen && state.activeFight?.source !== 'hunterQuest') return '';
  const quest = state.hunterWorld?.dailyQuest;
  if (!quest && state.activeFight?.source !== 'hunterQuest') return '';
  return `
    <main class="screen-view hunter-screen">
      <section class="screen-panel hunter-quest-popup system-popup" data-scroll-key="hunter-quest">
        <div class="hunter-popup-header">
          <div>
            <p class="eyebrow">System Daily Quest</p>
            <h2>${escapeHtml(state.activeFight?.source === 'hunterQuest' ? (quest?.title ?? 'Monster Encounter') : (quest?.title ?? 'Daily Quest'))}</h2>
          </div>
          <button class="small-btn" data-action="hunter-quest-close">Close</button>
        </div>
        ${state.activeFight?.source === 'hunterQuest' ? renderHunterMonsterFight() : renderHunterQuestPanel()}
      </section>
    </main>
  `;
}

function renderHunterMonsterFight(mode = 'quest') {
  const fight = state.activeFight;
  const opponent = activeFightOpponent(fight);
  if (!opponent) return '<article class="option-card"><h2>Monster data missing</h2><p>Close this encounter and restart the quest stage.</p></article>';
  return `
    <section class="combat stack hunter-combat-shell system-combat">
      <article class="fight-title system-fight-title ${fight.finished ? (fight.result.won ? 'complete' : 'failed') : 'active'}">
        <div>
          <p class="eyebrow">${fight.finished ? 'System Report' : `Fight Till Death · Exchange ${fight.round}`}</p>
          <h2>${escapeHtml(state.identity.name)} vs ${escapeHtml(opponent.name)}</h2>
          <p class="muted">${opponent.style} / ${opponent.threat}</p>
        </div>
        <span class="badge ${fight.finished && fight.result.won ? 'green' : 'red'}">${fight.finished ? (fight.result.won ? 'Cleared' : 'Failed') : 'Live'}</span>
      </article>
      ${renderHunterCombatMeters(fight)}
      ${renderHunterMonsterReadout(fight, opponent, mode)}
      ${fight.finished ? (mode === 'dungeon' ? renderHunterDungeonFightReport(fight) : renderFightReport(fight)) : renderHunterMoves(mode)}
      ${renderExchanges(fight)}
    </section>
  `;
}

function renderHunterCombatMeters(fight) {
  return `
    <div class="combat-meters">
      ${combatMeter('You', fight.meters.playerHealth, `${fight.meters.playerHealth}/${fight.meters.maxPlayerHealth ?? 100}`, fight.meters.maxPlayerHealth ?? 100)}
      ${combatMeter('Monster', fight.meters.opponentHealth, `${fight.meters.opponentHealth}/${fight.meters.maxOpponentHealth ?? 100}`, fight.meters.maxOpponentHealth ?? 100)}
      ${combatMeter('Mana', fight.meters.playerStamina, `${fight.meters.playerStamina}/${fight.meters.maxPlayerStamina ?? 100}`, fight.meters.maxPlayerStamina ?? 100)}
      ${combatMeter('Monster Gas', fight.meters.opponentStamina, `${fight.meters.opponentStamina}/${fight.meters.maxOpponentStamina ?? 100}`, fight.meters.maxOpponentStamina ?? 100)}
      ${combatMeter('Guard', fight.meters.guard, 'System')}
      ${combatMeter('Momentum', fight.meters.momentum + 50, fight.meters.momentum)}
      ${combatMeter('Injury Risk', fight.meters.injuryRisk, 'Danger')}
    </div>
  `;
}

function renderHunterMonsterReadout(fight, opponent, mode = 'quest') {
  const hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD;
  const quest = hunter.dailyQuest;
  const stage = currentHunterQuestStage(quest);
  const dungeon = hunter.activeDungeon;
  const objective = mode === 'dungeon'
    ? `Gate: ${escapeHtml(dungeon?.name ?? 'Dungeon Run')} / Room ${(dungeon?.encounterIndex ?? 0) + 1} of ${dungeon?.encounters?.length ?? 1}${fight.isBoss ? ' / Boss' : ''}.`
    : `Quest: ${escapeHtml(quest?.title ?? 'Daily Quest')}${stage?.title ? ` / ${escapeHtml(stage.title)}` : ''}.`;
  const monsterAttacks = (opponent.moveIds ?? [])
    .map((moveId) => HUNTER_MONSTER_MOVES[moveId]?.label)
    .filter(Boolean)
    .join(', ');
  return renderFightInfoDropdown('Fight Info', 'System scan: target, objective, observed monster attacks.', `
    <article class="breakdown dossier-report system-monster-readout">
      <h2>Target Scan</h2>
      ${renderSystemScanRows([
        { label: 'Objective', value: objective, tone: mode === 'dungeon' && fight.isBoss ? 'danger' : 'active' },
        { label: 'Target', value: opponent.name, tone: 'danger' },
        { label: 'Threat Pattern', value: `${opponent.style} / ${opponent.threat}`, tone: 'danger' },
        ...(monsterAttacks ? [{ label: 'Observed Attacks', value: monsterAttacks, tone: 'danger' }] : []),
      ])}
      <p>Use System skills to break the monster rhythm. Slash, Dash Strike, Mana Guard, Conserve, Analyze Weakness, and Execute replace normal fighter moves here.</p>
      <p>Effective Hunter power includes fighter stats, Hunter stats, Hunter level, and shadow army scaling.</p>
      ${fight.breakdown?.[0] ? `<p>${escapeHtml(fight.breakdown[0])}</p>` : ''}
    </article>
  `);
}

function renderHunterMoves(mode = 'quest') {
  const moves = getUnlockedHunterMoves(state);
  const hunter = normalizeHunterWorld(state.hunterWorld);
  const shadowCount = hunter.shadowArmy.length;
  const shadowStrengthTotal = shadowArmyStrength(hunter);
  const dungeon = mode === 'dungeon';
  const moveRoles = {
    slash: 'attack',
    dashStrike: 'attack',
    manaGuard: 'defense',
    conserve: 'recovery',
    analyzeWeakness: 'analysis',
    execute: 'finisher',
    abyssalLeech: 'finisher',
    shadowPierce: 'finisher',
    manaRend: 'finisher',
    reapingArc: 'finisher',
    voidStepExecution: 'finisher',
    rulerBreak: 'finisher',
    calamityCommand: 'shadow',
    worldEaterDomain: 'shadow',
  };
  const renderMoveCard = (move) => {
    const moveTypeLabel = move.moveType === 'special' ? 'Special Move' : 'Basic Move';
    const perkCount = (id) => systemPerkCount(state.hunterWorld, id);
    const perkHint = [
      move.id === 'execute' && perkCount('executeCooldownMinus1') ? `Execute cooldown -${perkCount('executeCooldownMinus1')} active (${perkCount('executeCooldownMinus1')}/5).` : '',
      move.id === 'conserve' && perkCount('conservePlus6') ? `Conserve restores +${6 * perkCount('conservePlus6')} mana (${perkCount('conservePlus6')}/10).` : '',
      move.id === 'manaGuard' && perkCount('manaGuardPlus3') ? `Mana Guard reduction +${3 * perkCount('manaGuardPlus3')} (${perkCount('manaGuardPlus3')}/10).` : '',
      move.id === 'dashStrike' && perkCount('dashStrikePlus4') ? `Dash Strike damage +${4 * perkCount('dashStrikePlus4')} (${perkCount('dashStrikePlus4')}/10).` : '',
      move.moveType === 'special' && perkCount('specialStaminaMinus2') ? `Special stamina cost -${2 * perkCount('specialStaminaMinus2')} (${perkCount('specialStaminaMinus2')}/10).` : '',
      move.moveType === 'basic' && move.id !== 'conserve' && perkCount('basicDamagePlus5') ? `Basic damage +${5 * perkCount('basicDamagePlus5')}% (${perkCount('basicDamagePlus5')}/10).` : '',
      move.category === 'weapon' && perkCount('weaponSkillPlus10') ? `Weapon skill damage +${10 * perkCount('weaponSkillPlus10')}% (${perkCount('weaponSkillPlus10')}/5).` : '',
      move.id === 'abyssalLeech' ? 'Ultimate lifesteal move: restores health from damage dealt.' : '',
      move.uiTone === 'shadow-monarch' ? `Shadow Monarch evolved skill. Army strength ${shadowStrengthTotal}.` : '',
      ['abyssalLeech', 'monarchCommand', 'abyssalDomain', 'calamityCommand', 'worldEaterDomain'].includes(move.id) && perkCount('shadowDamagePlus8') && shadowCount ? `Shadow Pressure damage +${8 * perkCount('shadowDamagePlus8')}% (${perkCount('shadowDamagePlus8')}/5).` : '',
      ['abyssalLeech', 'monarchCommand', 'abyssalDomain', 'calamityCommand', 'worldEaterDomain'].includes(move.id) && perkCount('rulersAuthority') && shadowCount ? "Ruler's Authority adds command damage in Hunter fights." : '',
      move.requiresHunterRank === 'SS' ? 'SS-rank System skill.' : '',
      move.uiTone === 'shadow-monarch' && perkCount('monarchsInstinct') ? "Monarch's Instinct adds black-violet pressure." : '',
    ].filter(Boolean).join(' ');
    return `
      <button class="move-card system-move-card role-${moveRoles[move.id] ?? 'attack'} hunter-${move.moveType ?? 'basic'}-move ${move.uiTone === 'shadow-monarch' ? 'shadow-monarch-skill' : ''}" data-action="fight-turn-${move.id}" ${move.disabledReason ? 'disabled' : ''}>
        <em>${escapeHtml(moveTypeLabel)}</em>
        <strong>${escapeHtml(move.label)}</strong>
        <span>${escapeHtml(move.disabledReason || perkHint || move.hint)}</span>
      </button>
    `;
  };
  const basicMoves = moves.filter((move) => move.moveType !== 'special');
  const specialMoves = moves.filter((move) => move.moveType === 'special');
  const basicOpen = dropdownState.isOpen('hunter-basic-moves');
  const specialOpen = dropdownState.isOpen('hunter-special-moves');
  return `
    <section class="hunter-move-groups">
      <details class="collapsible-section hunter-move-section" data-dropdown-id="hunter-basic-moves" ${basicOpen ? 'open' : ''}>
        <summary class="collapsible-summary">
          <span><strong>Basic Moves</strong><em>Repeatable System skills for steady exchanges.</em></span>
          <b>${basicMoves.length}</b>
        </summary>
        <div class="tactic-grid hunter-move-grid">${basicMoves.map(renderMoveCard).join('')}</div>
      </details>
      <details class="collapsible-section hunter-move-section" data-dropdown-id="hunter-special-moves" ${specialOpen ? 'open' : ''}>
        <summary class="collapsible-summary">
          <span><strong>Special Moves</strong><em>High-impact skills with individual cooldowns.</em></span>
          <b>${specialMoves.length}</b>
        </summary>
        <div class="tactic-grid hunter-move-grid">${specialMoves.map(renderMoveCard).join('')}</div>
      </details>
      <button class="move-card danger-btn hunter-retreat-card" data-action="${dungeon ? 'hunter-dungeon-retreat' : 'hunter-quest-retreat'}">
        <strong>Retreat</strong>
        <span>Escape alive now. ${dungeon ? 'The Gate run ends; cleared room rewards remain, but the jackpot is lost.' : 'The Daily Quest fails with no reward and survival penalties.'}</span>
      </button>
    </section>
  `;
}

function renderHunterLevelRewardPopup() {
  const hunter = normalizeHunterWorld(state?.hunterWorld);
  const pending = hunter.pendingLevelRewards[0];
  if (!pending) return '';
  return `
    <main class="screen-view">
      <article class="screen-panel system-popup hunter-level-reward-popup" data-scroll-key="hunter-level-reward">
        <header class="hunter-popup-header">
          <div>
            <span class="system-chip">System Level Up</span>
            <h2>Level ${pending.level} Reward</h2>
          </div>
        </header>
        <p>The +5 Hunter stat points are already yours. Choose one extra System reward.</p>
        <section class="event-choice-grid hunter-level-reward-grid">
          ${pending.options.map((option) => `
            <button class="${option.type === 'perk' ? `system-perk-reward perk-${option.tier ?? 'basic'}` : ''}" data-action="hunter-level-reward-${option.id}">
              ${option.type === 'perk' ? `<em>${escapeHtml(systemPerkRarityLabel(option))}</em>` : ''}
              <strong>${escapeHtml(option.label)}</strong>
              <span>${escapeHtml(option.description ?? hunterRewardTypeLabel(option))}</span>
            </button>
          `).join('')}
        </section>
      </article>
    </main>
  `;
}

function systemPerkRarityLabel(option) {
  return {
    basic: 'BASIC SYSTEM PERK',
    rare: 'RARE SYSTEM PERK',
    special: 'SPECIAL OP SYSTEM PERK',
    ultimate: 'ULTIMATE SYSTEM PERK',
  }[option.tier] ?? 'SYSTEM PERK';
}

function hunterRewardTypeLabel(option) {
  const labels = {
    hunterStat: 'Hunter stat boost',
    allHunterStats: 'Hunter stat boost',
    fatigue: 'Fatigue reduction',
    recovery: 'Resource recovery',
    money: 'Money bonus',
    reputation: 'Reputation bonus',
    perk: 'System combat perk',
  };
  return labels[option.type] ?? 'System reward';
}

function renderHunterQuestResults(quest) {
  const results = quest.stageResults ?? [];
  if (!results.length) return '';
  return `
    <ul class="quest-results">
      ${results.map((result) => `<li>${escapeHtml(result.result ?? result.label ?? 'Objective updated')}</li>`).join('')}
    </ul>
  `;
}

function gateMoney(value) {
  return `$${Number(value ?? 0).toLocaleString()}`;
}

function formatArmyPower(value = 0) {
  return Number(value ?? 0).toLocaleString();
}

function compactArmyPower(value = 0) {
  const power = Number(value ?? 0);
  if (power >= 1000000) return `${Math.round(power / 100000) / 10}M`;
  if (power >= 1000) return `${Math.round(power / 100) / 10}K`;
  return String(power);
}

function hunterGateActivity(hunter) {
  if (hunter.shadowMonarch?.unlocked) {
    return {
      title: 'Monarch War',
      subtitle: 'Normal Gates have vanished. Only Monarch boss encounters remain.',
      meta: `${hunter.monarchWar?.defeated?.length ?? 0}/4 Monarchs defeated`,
      cta: 'Open',
    };
  }
  const dungeon = hunter.activeDungeon;
  if (dungeon) {
    if (dungeon.completed) {
      return {
        title: dungeon.outcome === 'cleared' ? 'Dungeon Cleared' : 'Gate Run Ended',
        subtitle: dungeon.resultText ?? (dungeon.bossDefeated ? 'The boss is down. Review the System clear report.' : 'Review the exit report.'),
        meta: `${dungeon.rank}-rank / ${dungeon.isRedGate ? 'Red Gate' : dungeon.outcome}`,
        cta: 'Review',
      };
    }
    return {
      title: dungeon.name,
      subtitle: `Push through room ${dungeon.encounterIndex + 1} of ${dungeon.encounters.length}. Condition carries between fights.`,
      meta: `${dungeon.rank}-rank / ${dungeon.isRedGate ? 'Red Gate' : 'Dungeon active'}`,
      cta: state.activeFight?.source === 'hunterDungeon' ? 'Fight' : 'Continue',
    };
  }
  return {
    title: 'Gate Board',
    subtitle: 'Choose from three dungeon signals. Every route ends in a boss fight.',
    meta: `${hunter.gateOffers?.length ?? 0} offers / ${hunter.gatesCleared} cleared`,
    cta: 'Open',
  };
}

function renderHunterGateOffers() {
  if (normalizeHunterWorld(state.hunterWorld).shadowMonarch?.unlocked) return renderMonarchWarPanel();
  const offers = state.hunterWorld?.gateOffers ?? [];
  return `
    <div class="gate-offer-grid">
      ${offers.map((offer) => {
    const readiness = getAutoGateReadiness(state, offer);
    const readinessTone = readiness.canClear ? 'clear' : readiness.status === 'empty' ? 'danger' : 'danger';
    return `
        <article class="gate-offer option-card system-window auto-gate-${classToken(readiness.status)} ${offer.isRedGate ? 'red-gate-offer emergency' : ''} ${offer.danger ? 'danger-offer' : ''}">
          <div>
            <p class="eyebrow">${offer.isRedGate ? 'Emergency Red Gate' : `${escapeHtml(offer.rank)}-Rank Gate`}</p>
            <h2>${escapeHtml(offer.name)}</h2>
            <p>${escapeHtml(offer.theme)} / ${offer.encounters.length} encounters / Boss: ${escapeHtml(offer.bossName)}</p>
            ${offer.modifier ? `<p class="muted">Modifier: ${escapeHtml(offer.modifier.label)} - ${escapeHtml(offer.modifier.scan ?? offer.modifier.loot ?? '')}</p>` : ''}
            ${offer.danger ? '<p class="danger-copy">Danger signal: this Gate exceeds your recommended clearance.</p>' : ''}
            <p class="muted">Rooms: +${offer.rewardsPreview.roomXp} XP, ${gateMoney(offer.rewardsPreview.roomMoney)} each / Boss: +${offer.rewardsPreview.bossXp} XP, ${gateMoney(offer.rewardsPreview.bossMoney)}, +${offer.rewardsPreview.statRewards} Hunter stat</p>
            ${renderSystemScanRows([
              { label: 'Tier', value: `${offer.rank}-Rank${offer.isRedGate ? ' Red Gate' : ''}`, tone: offer.isRedGate || offer.danger ? 'danger' : 'active' },
              { label: 'Depth', value: `${offer.encounters.length} rooms`, tone: 'active' },
              { label: 'Modifier', value: offer.modifier?.label ?? 'Stable Mana', tone: offer.modifier?.danger === 'High' || offer.modifier?.danger === 'Extreme' || offer.modifier?.danger === 'Mythic' ? 'danger' : '' },
              { label: 'Loot Read', value: offer.rewardsPreview.loot ?? 'Standard', tone: 'clear' },
              { label: 'Boss Signature', value: offer.bossName, tone: offer.isRedGate || offer.danger ? 'danger' : '' },
              { label: 'Auto Gate', value: readiness.reason, tone: readinessTone },
              { label: 'Auto Power', value: `${readiness.loadoutPower}/${readiness.requiredPower}`, tone: readiness.canClear ? 'clear' : 'danger' },
            ])}
          </div>
          ${button('Enter Gate', `hunter-gate-select-${offer.id}`, offer.isRedGate ? 'danger' : 'primary')}
          ${button('AUTO GATE', `hunter-auto-gate-${offer.id}`, readiness.canClear ? 'primary auto-gate-btn' : 'auto-gate-btn disabled')}
        </article>
      `;
  }).join('')}
    </div>
  `;
}

function renderHunterDungeonFightReport(fight) {
  const dungeon = state.hunterWorld?.activeDungeon;
  const action = dungeon?.bossDefeated || dungeon?.failed ? 'hunter-dungeon-dismiss' : 'hunter-dungeon-advance';
  const label = dungeon?.bossDefeated ? hunterDungeonReportActionLabel(state.hunterWorld) : dungeon?.failed ? 'Leave Failed Gate' : 'Proceed Deeper';
  return `
    <article class="fight-report dungeon-report system-window ${dungeon?.bossDefeated ? 'complete' : dungeon?.failed ? 'failed' : 'active'}">
      <h2>${escapeHtml(fight.result.summary)}</h2>
      ${renderSystemScanRows([
        { label: 'Gate', value: `${dungeon?.name ?? 'Dungeon Run'} / ${dungeon?.rank ?? 'E'}-Rank${dungeon?.isRedGate ? ' Red Gate' : ''}`, tone: dungeon?.isRedGate ? 'danger' : 'active' },
        { label: 'Room', value: `${(dungeon?.encounterIndex ?? 0) + 1} of ${dungeon?.encounters?.length ?? 1}${fight.isBoss ? ' / Boss Chamber' : ''}`, tone: fight.isBoss ? 'danger' : 'active' },
        { label: 'Result', value: dungeon?.bossDefeated ? 'Boss defeated' : dungeon?.failed ? 'Run failed' : 'Room cleared', tone: dungeon?.failed ? 'danger' : 'clear' },
      ])}
      <div class="report-grid">
        <div>
          <h3>${dungeon?.bossDefeated ? 'Dungeon Clear' : 'Room Result'}</h3>
          <p>${escapeHtml(dungeon?.name ?? 'Dungeon Run')} / ${escapeHtml(dungeon?.rank ?? 'E')}-rank${dungeon?.isRedGate ? ' Red Gate' : ''}</p>
          <p>Room ${(dungeon?.encounterIndex ?? 0) + 1} of ${dungeon?.encounters?.length ?? 1}${fight.isBoss ? ' / Boss Chamber' : ''}</p>
        </div>
        <div>
          <h3>System Rewards</h3>
          ${fight.result.rewards.map((reward) => `<p>${escapeHtml(reward)}</p>`).join('')}
          ${fight.result.injuries.map((injury) => `<p>${formatInjury(injury)}</p>`).join('')}
        </div>
      </div>
      ${button(label, action, 'primary wide')}
    </article>
  `;
}

function hunterDungeonReportActionLabel(hunter = state.hunterWorld) {
  if (hunter?.pendingLevelRewards?.length) return 'Continue to Level Reward';
  return 'Return to Gate Board';
}

function renderHunterDungeonPanel() {
  const dungeon = state.hunterWorld?.activeDungeon;
  if (!dungeon) return renderHunterGateOffers();
  if (dungeon.completed && !state.activeFight) {
    return `
      <article class="option-card hunter-quest-card system-window ${dungeon.outcome === 'cleared' ? 'complete' : 'failed'}">
        <div>
          <p class="eyebrow">${dungeon.outcome === 'cleared' ? 'Dungeon Cleared' : 'Run Abandoned'}</p>
          <h2>${escapeHtml(dungeon.name)}</h2>
          <p>${escapeHtml(dungeon.resultText ?? (dungeon.outcome === 'retreated' ? 'You survived the retreat. Cleared-room rewards were kept.' : 'The Gate run has ended.'))}</p>
          ${dungeon.outcome === 'retreated' ? '<p class="muted">Penalties: +12 fatigue / -10 mood / -4 reputation</p>' : ''}
          ${dungeon.outcome === 'failed' ? '<p class="muted">Penalties: +16 fatigue / -12 mood / -6 reputation</p>' : ''}
          <p class="muted">Next: close this report to refresh the Gate Board.</p>
          ${renderSystemScanRows([
            { label: 'Outcome', value: dungeon.outcome ?? 'Ended', tone: dungeon.outcome === 'cleared' ? 'clear' : 'danger' },
            { label: 'Boss', value: dungeon.bossDefeated ? 'Defeated' : 'Not cleared', tone: dungeon.bossDefeated ? 'clear' : 'danger' },
          ])}
        </div>
        ${button('Return to Gate Board', 'hunter-dungeon-dismiss', 'primary')}
      </article>
    `;
  }
  return `
    <article class="option-card hunter-quest-card dungeon-ready system-window active">
      <div>
        <p class="eyebrow">${dungeon.isRedGate ? 'Red Gate Run' : 'Dungeon Run'} / Room ${dungeon.encounterIndex + 1} of ${dungeon.encounters.length}</p>
        <h2>${escapeHtml(dungeon.name)}</h2>
        <p>${dungeon.encounters[dungeon.encounterIndex]?.isBoss ? 'The boss chamber is ahead.' : 'A hostile signature blocks the next room.'} Health and mana do not refill between encounters.</p>
        <p class="muted">Cleared rooms: ${dungeon.rewardsEarned.filter((reward) => reward.type === 'room').length} / Final boss: ${escapeHtml(dungeon.bossName)}</p>
        <p class="muted">Next: ${dungeon.encounters[dungeon.encounterIndex]?.isBoss ? 'clear the boss for the jackpot. Ultimate ARISE auto-binds shadows if unlocked.' : 'clear this room to bank its reward and unlock the next chamber.'}</p>
        ${renderSystemScanRows([
          { label: 'Condition Carry', value: 'HP and mana persist', tone: 'danger' },
          { label: 'Next Chamber', value: dungeon.encounters[dungeon.encounterIndex]?.isBoss ? 'Boss signal' : 'Monster signal', tone: dungeon.encounters[dungeon.encounterIndex]?.isBoss ? 'danger' : 'active' },
          { label: 'Retreat', value: 'Always available before death', tone: 'danger' },
        ])}
      </div>
      ${button(dungeon.encounters[dungeon.encounterIndex]?.isBoss ? 'Enter Boss Chamber' : 'Enter Room', 'hunter-dungeon-start', 'primary')}
    </article>
  `;
}

function renderHunterDungeonPopup() {
  if (!hunterDungeonPopupOpen && state.activeFight?.source !== 'hunterDungeon' && !state.hunterWorld?.activeDungeon?.completed) return '';
  return `
    <main class="screen-view hunter-screen">
      <section class="screen-panel hunter-quest-popup dungeon-popup system-popup" data-scroll-key="hunter-dungeon">
        <div class="hunter-popup-header">
          <div>
            <p class="eyebrow">Gate Board</p>
            <h2>${escapeHtml(state.hunterWorld?.activeDungeon?.name ?? 'Available Dungeon Signals')}</h2>
          </div>
          <button class="small-btn" data-action="hunter-dungeon-close">Close</button>
        </div>
        ${state.activeFight?.source === 'hunterDungeon' ? renderHunterMonsterFight('dungeon') : renderHunterDungeonPanel()}
      </section>
    </main>
  `;
}

function renderSystemShopPopup() {
  if (!systemShopPopupOpen) return '';
  const hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD;
  const items = Object.values(SYSTEM_SHOP_ITEMS);
  const itemCard = (item) => {
    const owned = hunterItemQuantity(hunter, item.id) > 0;
    const equipped = hunter.equippedWeapon === item.id || hunter.equippedArmor === item.id;
    const canAfford = state.resources.money >= item.cost;
    const isEquipment = ['weapon', 'armor'].includes(item.type);
    const actionLabel = isEquipment && owned
      ? equipped ? 'Equipped' : 'Equip'
      : `Buy $${item.cost}`;
    const action = isEquipment && owned && equipped ? 'hunter-shop-open' : `hunter-shop-buy-${item.id}`;
    const disabled = !owned && !canAfford ? 'disabled' : '';
    const move = item.moveId ? HUNTER_MOVES[item.moveId] : null;
    return `
      <article class="option-card system-window shop-item ${item.type} ${equipped ? 'equipped' : ''}">
        <div>
          <p class="eyebrow">${item.type === 'weapon' ? 'System Weapon' : item.type === 'armor' ? 'System Armor' : 'System Potion'}</p>
          <h3>${escapeHtml(item.label)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <p class="muted">${isEquipment ? 'Equipment can be changed from Items after purchase.' : 'Consumables are stored and used from Items.'}</p>
          ${move ? `<p class="muted">Unlocks: ${escapeHtml(move.label)} - ${escapeHtml(move.hint)}</p>` : ''}
          ${owned ? `<span class="badge ${equipped ? 'green' : ''}">${equipped ? 'Equipped' : `Owned x${hunterItemQuantity(hunter, item.id)}`}</span>` : ''}
        </div>
        <button class="${isEquipment ? 'primary' : ''}" data-action="${action}" ${disabled}>${actionLabel}</button>
      </article>
    `;
  };
  return `
    <main class="screen-view hunter-screen">
      <section class="screen-panel hunter-quest-popup system-popup" data-scroll-key="system-shop">
        <div class="hunter-popup-header">
          <div>
            <p class="eyebrow">System Shop</p>
            <h2>Potions, Weapons & Armor</h2>
            <p class="muted">$${state.resources.money} available / Fatigue ${hunter.systemFatigue}%</p>
          </div>
          <button class="small-btn" data-action="hunter-shop-close">Close</button>
        </div>
        <div class="system-chip-row">
          ${systemChip('Health', `${state.resources.health}/${maxLifeHealth(state)}`)}
          ${systemChip('Stamina', `${state.resources.energy}/${maxLifeEnergy(state)}`)}
          ${systemChip('Weapon', hunter.equippedWeapon ? HUNTER_ITEM_CATALOG[hunter.equippedWeapon]?.label ?? labelize(hunter.equippedWeapon) : 'None', hunter.equippedWeapon ? 'ready' : '')}
          ${systemChip('Armor', hunter.equippedArmor ? HUNTER_ITEM_CATALOG[hunter.equippedArmor]?.label ?? labelize(hunter.equippedArmor) : 'None', hunter.equippedArmor ? 'ready' : '')}
          ${systemChip('Items', normalizeHunterInventory(hunter.inventory).reduce((sum, item) => sum + item.quantity, 0))}
        </div>
        <div class="activity-list shop-grid">
          ${items.map(itemCard).join('')}
        </div>
      </section>
    </main>
  `;
}

function itemTypeLabel(item) {
  return {
    consumable: 'Consumable',
    weapon: 'Weapon',
    armor: 'Armor',
    material: 'Material',
    special: 'Special Item',
  }[item.type] ?? labelize(item.type);
}

function rarityLabel(rarity = 'common') {
  return labelize(rarity);
}

function renderHunterItemsPopup() {
  if (!hunterItemsPopupOpen) return '';
  const hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD;
  const inventory = normalizeHunterInventory(hunter.inventory)
    .map((stack) => ({ ...stack, item: HUNTER_ITEM_CATALOG[stack.id] }))
    .filter((stack) => stack.item);
  const itemCard = ({ id, quantity, item }) => {
    const equipped = hunter.equippedWeapon === id || hunter.equippedArmor === id;
    const move = item.moveId ? HUNTER_MOVES[item.moveId] : null;
    const armor = item.armor;
    const action = ['weapon', 'armor'].includes(item.type)
      ? `<button class="primary" data-action="hunter-item-equip-${id}" ${equipped ? 'disabled' : ''}>${equipped ? 'Equipped' : 'Equip'}</button>`
      : ['consumable', 'special'].includes(item.type)
        ? `<button class="primary" data-action="hunter-item-use-${id}">Use</button>`
        : '<span class="badge">Crafting material</span>';
    return `
      <article class="option-card system-window hunter-item-card ${item.type} rarity-${item.rarity ?? 'common'}">
        <div>
          <p class="eyebrow">${escapeHtml(itemTypeLabel(item))} / <span class="item-rarity-badge">${escapeHtml(rarityLabel(item.rarity))}</span></p>
          <h3>${escapeHtml(item.label)} <span class="muted">x${quantity}</span></h3>
          <p>${escapeHtml(item.description)}</p>
          ${move ? `<p class="muted">Unlocks: ${escapeHtml(move.label)} - ${escapeHtml(move.hint)}</p>` : ''}
          ${armor ? `<p class="muted">Armor: +${armor.health ?? 0} health / +${armor.stamina ?? 0} stamina / -${Math.round((armor.damageReduction ?? 0) * 100)}% damage / +${Math.round((armor.damageBonus ?? 0) * 100)}% attack</p>` : ''}
          ${item.type === 'material' ? '<p class="muted">Used in System crafting, shadow sigils, and Monarch war prep.</p>' : ''}
        </div>
        ${action}
      </article>
    `;
  };
  const groups = [
    ['consumable', 'Consumables'],
    ['weapon', 'Weapons'],
    ['armor', 'Armor'],
    ['material', 'Materials'],
    ['special', 'Special'],
  ].map(([type, label]) => ({ type, label, items: inventory.filter((stack) => stack.item.type === type) }));
  return `
    <main class="screen-view hunter-screen">
      <section class="screen-panel hunter-quest-popup system-popup" data-scroll-key="hunter-items">
        <div class="hunter-popup-header">
          <div>
            <p class="eyebrow">Hunter Items</p>
            <h2>Inventory</h2>
            <p class="muted">Use consumables, equip System weapons, and store dungeon materials for future upgrades.</p>
          </div>
          <button class="small-btn" data-action="hunter-items-close">Close</button>
        </div>
        <div class="system-chip-row">
          ${systemChip('Stacks', inventory.length)}
          ${systemChip('Total Items', inventory.reduce((sum, stack) => sum + stack.quantity, 0))}
          ${systemChip('Weapon', hunter.equippedWeapon ? HUNTER_ITEM_CATALOG[hunter.equippedWeapon]?.label ?? labelize(hunter.equippedWeapon) : 'None', hunter.equippedWeapon ? 'ready' : '')}
          ${systemChip('Armor', hunter.equippedArmor ? HUNTER_ITEM_CATALOG[hunter.equippedArmor]?.label ?? labelize(hunter.equippedArmor) : 'None', hunter.equippedArmor ? 'ready' : '')}
        </div>
        ${inventory.length ? groups.map((group) => `
          <section class="hunter-item-section item-section-${group.type}">
            <div class="hunter-item-section-header">
              <h3>${escapeHtml(group.label)}</h3>
              <span class="system-chip compact"><small>Stacks</small><strong>${group.items.length}</strong></span>
            </div>
            <div class="activity-list hunter-item-grid">
              ${group.items.length ? group.items.map(itemCard).join('') : '<article class="option-card system-window empty-items"><div><h3>Empty</h3><p>No items in this category yet.</p></div></article>'}
            </div>
          </section>
        `).join('') : '<article class="option-card system-window empty-items"><div><h3>No Hunter items yet</h3><p>Buy supplies from the System Shop or clear Gates to find dungeon loot.</p></div></article>'}
      </section>
    </main>
  `;
}

function renderHunter() {
  const hunter = state.hunterWorld ?? DEFAULT_HUNTER_WORLD;
  if (!hunter.unlocked) {
    return `
      <section class="stack">
        <article class="option-card">
          <div>
            <p class="eyebrow">Hunter Gates</p>
            <h2>Locked</h2>
            <p>Gates have not opened in this life yet.</p>
          </div>
        </article>
      </section>
    `;
  }
  const activeDungeon = hunter.activeDungeon;
  const questActivity = hunterQuestActivity(hunter.dailyQuest);
  const gateActivity = hunterGateActivity(hunter);
  const inventoryStacks = normalizeHunterInventory(hunter.inventory);
  const inventoryTotal = inventoryStacks.reduce((sum, item) => sum + item.quantity, 0);
  const shadowSummary = getShadowArmySummary(state);
  const monarchMilestone = getHunterMilestones(state).find((item) => item.id === 'monarch-trace');
  return `
    <section class="stack hunter-panel">
      ${renderHunterSystemStatus(hunter)}
      ${renderCollapsibleSection({
        id: 'hunter-milestones',
        title: 'Hunter Progression',
        subtitle: 'Career spine: quests, Domains, rank, shadows, and Monarch Trace.',
        body: renderHunterMilestones(),
      })}
      ${renderCollapsibleSection({
        id: 'hunter-core',
        title: 'System Player',
        subtitle: activeDungeon ? `${activeDungeon.name} active` : `${hunter.gateOffers?.length ?? 0} Gate signals / ${shadowSummary.count} shadows`,
        body: `<div class="hunter-header option-card system-window">
        <div>
          <p class="eyebrow">System Player</p>
          <h2>${state.identity.name}</h2>
          <p>${activeDungeon ? `${activeDungeon.name} is active. Survive each room to reach the boss.` : 'Shadow growth, Domain conquest, crafting, Association rank, and Monarch Trace all advance this career path.'}</p>
        </div>
        <div class="system-chip-row">
          ${systemChip('Rank', `${hunter.rank}-Rank`, 'rank')}
          ${systemChip('Level', hunter.level)}
          ${systemChip('XP', hunter.xp)}
          ${systemChip('Stat Pts', hunter.statPoints, hunter.statPoints ? 'ready' : '')}
          ${systemChip('Hunter Power', hunterPowerUi(), 'power')}
          ${systemChip('Fatigue', `${hunter.systemFatigue}%`, hunter.systemFatigue >= 70 ? 'danger' : '')}
          ${systemChip('Army Strength', shadowSummary.totalStrength)}
          ${systemChip('Trace', hunter.monarchTrace?.unlocked ? `Stage ${hunter.monarchTrace.stage}` : monarchMilestone?.ready ? 'Ready' : 'Dormant', monarchMilestone?.ready ? 'ready' : '')}
        </div>
      </div>`,
      })}
      ${renderCollapsibleSection({
        id: 'hunter-skills',
        title: 'System Skills',
        subtitle: 'Unlocked moves, passives, secret skills, and locked requirements.',
        body: renderHunterSkillsPanel(),
      })}
      ${renderCollapsibleSection({
        id: 'hunter-actions',
        title: 'Hunter Activities',
        subtitle: 'Daily quests, Domains, items, association work, shop, and Monarch Trace.',
        count: 7,
        body: `<div class="activity-list">
        ${renderHunterActivity({
          icon: 'DQ',
          title: questActivity.title,
          subtitle: questActivity.subtitle,
          meta: `${questActivity.meta} / Completed ${hunter.dailyQuestsCompleted}`,
          action: questActivity.action,
          cta: questActivity.cta,
          tone: 'daily',
          badges: hunterPendingBadges(hunter, 'quest'),
        })}
        ${renderHunterActivity({
          icon: 'GT',
          title: gateActivity.title,
          subtitle: gateActivity.subtitle,
          meta: gateActivity.meta,
          action: 'hunter-gates-open',
          cta: gateActivity.cta,
          tone: 'gate',
          badges: hunterPendingBadges(hunter, 'gate'),
        })}
        ${renderHunterActivity({
          icon: 'IT',
          title: 'Items',
          subtitle: 'Use dungeon loot, consume potions, equip System weapons, and inspect materials.',
          meta: `${inventoryTotal} item${inventoryTotal === 1 ? '' : 's'} / ${inventoryStacks.length} stack${inventoryStacks.length === 1 ? '' : 's'}`,
          action: 'hunter-items-open',
          tone: 'items',
        })}
        ${renderHunterActivity({
          icon: 'HA',
          title: 'Hunter Association',
          subtitle: 'Review next-rank requirements, promotion rewards, and official hunter file status.',
          meta: `Current ${hunter.rank}-rank`,
          action: 'hunter-association',
          tone: 'association',
          badges: hunterPendingBadges(hunter, 'stats'),
        })}
        ${renderHunterActivity({
          icon: 'SP',
          title: 'System Shop',
          subtitle: 'Potions, fatigue cleanses, and System weapons with skill unlocks.',
          meta: hunter.equippedWeapon ? `Equipped: ${HUNTER_ITEM_CATALOG[hunter.equippedWeapon]?.label ?? labelize(hunter.equippedWeapon)}` : `${inventoryTotal} item${inventoryTotal === 1 ? '' : 's'} owned`,
          action: 'hunter-shop',
          tone: 'shop',
        })}
        ${renderHunterActivity({
          icon: 'DM',
          title: 'Shadow Domains',
          subtitle: 'Use your shadow army on the interactive Domain war map.',
          meta: `${hunter.domainMap?.conquered?.length ?? 0}/25 conquered`,
          action: 'hunter-domains-open',
          tone: 'shadow',
        })}
        ${renderHunterActivity({
          icon: 'MT',
          title: 'Monarch Trace',
          subtitle: 'Endgame System arc for S-rank shadow vessels.',
          meta: hunter.monarchTrace?.unlocked ? `Stage ${hunter.monarchTrace.stage}/4` : monarchMilestone?.ready ? 'Ready to awaken' : 'Requires S-rank, Level 40, 50 Gates, 3 shadows',
          action: 'hunter-monarch',
          locked: !hunter.monarchTrace?.unlocked && !monarchMilestone?.ready,
          tone: 'monarch',
          badges: hunterPendingBadges(hunter, 'level'),
        })}
      </div>`,
      })}
      ${renderCollapsibleSection({
        id: 'hunter-association-panel',
        title: 'Association Review',
        subtitle: 'Next-rank requirements and promotion payout.',
        body: renderHunterAssociationPanel(),
      })}
      ${renderCollapsibleSection({
        id: 'hunter-shadows',
        title: 'Shadow Army',
        subtitle: `${shadowSummary.count} shadows / ${shadowSummary.totalStrength} strength`,
        body: renderShadowArmyPanel(),
      })}
      ${renderCollapsibleSection({
        id: 'hunter-domains',
        title: 'Shadow Domains',
        subtitle: `${hunter.domainMap?.conquered?.length ?? 0}/25 territories conquered`,
        body: renderShadowDomainsPanel(),
      })}
      ${hunter.shadowMonarch?.unlocked ? renderCollapsibleSection({
        id: 'hunter-monarch-war',
        title: 'Monarch War',
        subtitle: `${hunter.monarchWar?.defeated?.length ?? 0}/4 Monarchs defeated`,
        body: renderMonarchWarPanel(),
      }) : ''}
      ${renderCollapsibleSection({
        id: 'hunter-crafting',
        title: 'System Crafting',
        subtitle: 'Spend dungeon materials on upgrades and useful items.',
        body: renderHunterCraftingPanel(),
      })}
      ${renderCollapsibleSection({
        id: 'hunter-monarch-trace',
        title: 'Monarch Trace',
        subtitle: hunter.monarchTrace?.unlocked ? `Stage ${hunter.monarchTrace.stage}/4` : monarchMilestone?.subtitle ?? 'Dormant',
        body: renderMonarchTracePanel(),
      })}
      ${renderCollapsibleSection({
        id: 'hunter-stats',
        title: 'System Stat Points',
        subtitle: `${hunter.statPoints} points available`,
        body: `<article class="option-card system-window"><div>${renderHunterStatSheet()}${renderHunterStatButtons()}</div></article>`,
      })}
      ${renderCollapsibleSection({
        id: 'hunter-log',
        title: 'Hunter Log',
        subtitle: 'World feed entries for Gates and System activity.',
        body: renderLog('world'),
      })}
    </section>
  `;
}

function sorcererStatLabel(stat) {
  return {
    cursedEnergy: 'Cursed Energy',
    output: 'Output',
    control: 'Control',
    perception: 'Perception',
    technique: 'Technique',
    body: 'Body',
  }[stat] ?? labelize(stat);
}

function renderSorcererStatus(sorcerer) {
  const technique = SORCERER_INNATE_TECHNIQUES[sorcerer.innateTechnique];
  return `
    <article class="option-card system-window system-status-panel sorcerer-status-panel">
      <div>
        <p class="eyebrow">Sorcerer File</p>
        <h2>${escapeHtml(sorcerer.rank)}</h2>
        <p>${escapeHtml(technique?.label ?? 'Unawakened Technique')} / ${escapeHtml(technique?.rarity ?? 'Unknown')} / Mastery ${sorcerer.techniqueMastery}</p>
      </div>
      <div class="system-chip-row">
        ${systemChip('Level', sorcerer.level)}
        ${systemChip('XP', sorcerer.xp)}
        ${systemChip('Stat Pts', sorcerer.statPoints, sorcerer.statPoints ? 'ready' : '')}
        ${systemChip('Power', getSorcererPower(state), 'power')}
        ${systemChip('Missions', sorcerer.missionsCleared)}
        ${systemChip('Domain Wins', sorcerer.domainWins, sorcerer.domainWins ? 'ready' : '')}
        ${systemChip('Black Sparks', sorcerer.blackSparks, sorcerer.blackSparks ? 'active' : '')}
        ${systemChip('Vow Strain', `${sorcerer.vowStrain}%`, sorcerer.vowStrain >= 60 ? 'danger' : '')}
      </div>
    </article>
  `;
}

function renderSorcererTechniquePanel() {
  const sorcerer = normalizeSorcererWorld(state.sorcererWorld);
  const technique = SORCERER_INNATE_TECHNIQUES[sorcerer.innateTechnique];
  const moves = getAllSorcererMovesForTechnique(state);
  const basic = moves.filter((move) => move.moveType !== 'special');
  const special = moves.filter((move) => move.moveType === 'special');
  const moveCard = (move) => `
    <article class="option-card system-window hunter-skill-card ${move.unlocked ? 'unlocked' : 'locked'}">
      <div>
        <p class="eyebrow">${move.moveType === 'special' ? 'Special Move' : 'Basic Move'}</p>
        <h3>${escapeHtml(move.label)}</h3>
        <p>${escapeHtml(move.hint ?? '')}</p>
      </div>
      <span class="skill-status-badge ${move.unlocked ? 'ready' : 'locked'}">${move.unlocked ? 'Unlocked' : `${move.requiresRank ?? 'Mastery'} ${move.requiresMastery ?? ''}`.trim()}</span>
    </article>
  `;
  return `
    <article class="option-card system-window sorcerer-technique-card">
      <div>
        <p class="eyebrow">Innate Technique</p>
        <h2>${escapeHtml(technique?.label ?? 'Unknown Technique')}</h2>
        <p>${escapeHtml(technique?.passive ?? 'No passive recorded.')}</p>
      </div>
      <div class="system-chip-row">
        ${systemChip('Rarity', technique?.rarity ?? 'Unknown', 'rank')}
        ${systemChip('Scaling', (technique?.scaling ?? []).map(sorcererStatLabel).join(' / ') || 'None')}
        ${systemChip('Domain', technique?.domain ?? 'Dormant', sorcerer.techniqueMastery >= 45 ? 'ready' : '')}
      </div>
    </article>
    <details class="collapsible-section hunter-move-section" data-dropdown-id="sorcerer-basic-moves" ${dropdownState.isOpen('sorcerer-basic-moves') ? 'open' : ''}>
      <summary class="collapsible-summary"><span><strong>Universal Basic Moves</strong><em>Shared by every sorcerer.</em></span><b>${basic.length}</b></summary>
      <div class="hunter-skill-grid">${basic.map(moveCard).join('')}</div>
    </details>
    <details class="collapsible-section hunter-move-section" data-dropdown-id="sorcerer-special-moves" ${dropdownState.isOpen('sorcerer-special-moves') ? 'open' : ''}>
      <summary class="collapsible-summary"><span><strong>Innate Special Moves</strong><em>Determined by technique, rank, and mastery.</em></span><b>${special.filter((move) => move.unlocked).length}/${special.length}</b></summary>
      <div class="hunter-skill-grid">${special.map(moveCard).join('')}</div>
    </details>
  `;
}

function renderSorcererMissions() {
  const sorcerer = normalizeSorcererWorld(state.sorcererWorld);
  const active = sorcerer.activeMission;
  if (active) {
    return `
      <article class="option-card system-window hunter-activity">
        <div class="activity-icon">CR</div>
        <div>
          <p class="eyebrow">Active Curse Report</p>
          <h3>${escapeHtml(active.title)}</h3>
          <p>Civilian risk ${active.civilianRisk}%. Clear the curse, then close the report.</p>
        </div>
        <div class="activity-actions">
          ${active.completed ? button('Close Report', 'sorcerer-mission-dismiss', 'primary') : button('Enter Site', 'sorcerer-mission-fight', 'primary')}
        </div>
      </article>
    `;
  }
  const offers = sorcerer.missionOffers ?? [];
  return `
    <div class="activity-list">
      <article class="option-card system-window hunter-activity">
        <div class="activity-icon">CB</div>
        <div>
          <p class="eyebrow">Curse Report Board</p>
          <h3>${offers.length ? 'Reports Available' : 'No reports loaded'}</h3>
          <p>Generate three missions scaled around your current Sorcerer grade.</p>
        </div>
        <div class="activity-actions">${button(offers.length ? 'Loaded' : 'Generate', 'sorcerer-missions-generate', offers.length ? '' : 'primary', offers.length)}</div>
      </article>
      ${offers.map((offer) => `
        <article class="option-card system-window hunter-activity">
          <div class="activity-icon">CS</div>
          <div>
            <p class="eyebrow">${escapeHtml(offer.rank)} / Risk ${offer.civilianRisk}%</p>
            <h3>${escapeHtml(offer.title)}</h3>
            <p>Rewards: +${offer.rewards.xp} XP, +$${offer.rewards.money}, +${offer.rewards.mastery} mastery, +${offer.rewards.statPoints} stat point.</p>
          </div>
          <div class="activity-actions">${button('Accept', `sorcerer-mission-select-${offer.id}`, 'primary')}</div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderSorcererRankPanel() {
  const review = getSorcererRankReview(state);
  return `
    <article class="option-card system-window">
      <div>
        <p class="eyebrow">Sorcerer Bureau</p>
        <h3>${review.maxRank ? 'Maximum Grade' : `${review.currentRank} -> ${review.nextRank}`}</h3>
        <p>${review.eligible ? 'Promotion requirements satisfied.' : 'Build the missing requirements before review.'}</p>
      </div>
      <div class="system-scan-grid">
        ${renderSystemScanRows(review.requirements.map((item) => ({ label: item.label, value: `${item.current}/${item.required}`, tone: item.met ? 'active' : 'danger' })))}
      </div>
      <div class="action-grid">${button('Request Review', 'sorcerer-bureau-review', 'primary', !review.eligible)}</div>
    </article>
  `;
}

function renderSorcererStatSheet() {
  const sorcerer = normalizeSorcererWorld(state.sorcererWorld);
  return `
    <div class="hunter-stat-sheet">
      ${Object.entries(sorcerer.stats).map(([stat, value]) => `
        <article class="stat-row">
          <span>${sorcererStatLabel(stat)}</span>
          <strong>${value}</strong>
          <button class="small-btn" data-action="sorcerer-stat-${stat}" ${sorcerer.statPoints <= 0 ? 'disabled' : ''}>+1</button>
        </article>
      `).join('')}
    </div>
  `;
}

function renderSorcererCurseFight() {
  const fight = state.activeFight;
  const opponent = activeFightOpponent(fight);
  if (!opponent) return '<article class="option-card"><h2>Curse data missing</h2><p>Close this encounter and restart the report.</p></article>';
  const moves = getUnlockedSorcererMoves(state);
  const renderMove = (move) => `
    <button class="move-card system-move-card role-${move.category ?? 'attack'} sorcerer-${move.moveType ?? 'basic'}-move" data-action="fight-turn-${move.id}">
      <em>${move.moveType === 'special' ? 'Special Move' : 'Basic Move'}</em>
      <strong>${escapeHtml(move.label)}</strong>
      <span>${escapeHtml(move.hint ?? '')}</span>
    </button>
  `;
  return `
    <section class="combat stack hunter-combat-shell system-combat sorcerer-combat-shell">
      <article class="fight-title system-fight-title ${fight.finished ? (fight.result.won ? 'complete' : 'failed') : 'active'}">
        <div>
          <p class="eyebrow">${fight.finished ? 'Curse Report' : `Exorcism · Exchange ${fight.round}`}</p>
          <h2>${escapeHtml(state.identity.name)} vs ${escapeHtml(opponent.name)}</h2>
          <p class="muted">${opponent.style} / ${opponent.threat}</p>
        </div>
        <span class="badge ${fight.finished && fight.result.won ? 'green' : 'red'}">${fight.finished ? (fight.result.won ? 'Exorcised' : 'Failed') : 'Live'}</span>
      </article>
      <div class="combat-meters">
        ${combatMeter('You', fight.meters.playerHealth, `${fight.meters.playerHealth}/${fight.meters.maxPlayerHealth ?? 100}`, fight.meters.maxPlayerHealth ?? 100)}
        ${combatMeter('Curse', fight.meters.opponentHealth, `${fight.meters.opponentHealth}/${fight.meters.maxOpponentHealth ?? 100}`, fight.meters.maxOpponentHealth ?? 100)}
        ${combatMeter('Cursed Energy', fight.meters.playerStamina, `${fight.meters.playerStamina}/${fight.meters.maxPlayerStamina ?? 100}`, fight.meters.maxPlayerStamina ?? 100)}
        ${combatMeter('Curse Pressure', fight.meters.opponentStamina, `${fight.meters.opponentStamina}/${fight.meters.maxOpponentStamina ?? 100}`, fight.meters.maxOpponentStamina ?? 100)}
        ${combatMeter('Guard', fight.meters.guard, 'Flow')}
        ${combatMeter('Momentum', fight.meters.momentum + 50, fight.meters.momentum)}
        ${combatMeter('Injury Risk', fight.meters.injuryRisk, 'Danger')}
      </div>
      ${fight.finished ? renderFightReport(fight) : `<div class="move-grid">${moves.map(renderMove).join('')}</div>`}
      ${renderExchanges(fight)}
    </section>
  `;
}

function renderSorcerer() {
  const sorcerer = normalizeSorcererWorld(state.sorcererWorld ?? DEFAULT_SORCERER_WORLD);
  if (!sorcerer.unlocked) {
    return `
      <section class="stack">
        <article class="option-card">
          <div>
            <p class="eyebrow">Sorcerer</p>
            <h2>Locked</h2>
            <p>Cursed energy has not awakened in this life yet.</p>
          </div>
        </article>
      </section>
    `;
  }
  if (state.activeFight?.source === 'sorcererMission') return renderSorcererCurseFight();
  return `
    <section class="stack hunter-panel sorcerer-panel">
      ${renderSorcererStatus(sorcerer)}
      ${renderCollapsibleSection({ id: 'sorcerer-core', title: 'Sorcerer Progression', subtitle: 'Grades, cursed energy, missions, and domain readiness.', body: renderSorcererRankPanel() })}
      ${renderCollapsibleSection({ id: 'sorcerer-technique', title: 'Innate Technique', subtitle: 'Universal basics plus technique-specific special moves.', body: renderSorcererTechniquePanel() })}
      ${renderCollapsibleSection({ id: 'sorcerer-missions', title: 'Curse Missions', subtitle: `${sorcerer.missionOffers?.length ?? 0} reports / ${sorcerer.missionsCleared} cleared`, body: renderSorcererMissions() })}
      ${renderCollapsibleSection({ id: 'sorcerer-stats', title: 'Sorcerer Stat Points', subtitle: `${sorcerer.statPoints} points available`, body: `<article class="option-card system-window"><div>${renderSorcererStatSheet()}</div></article>` })}
      ${renderCollapsibleSection({ id: 'sorcerer-log', title: 'Sorcerer Log', subtitle: 'World feed entries for cursed energy activity.', body: renderLog('world') })}
    </section>
  `;
}

function renderZombieStatus(zombie) {
  const supplies = zombie.resources;
  return `
    <article class="option-card zombie-window zombie-status-panel">
      <div>
        <p class="eyebrow">Zombie Survival File</p>
        <h2>${escapeHtml(state.identity.name)}</h2>
        <p>${escapeHtml(zombie.location)} / ${zombie.monarchOrigin ? 'Monarch-created world' : 'Rooted survivor'} / ${zombie.team.length} teammate${zombie.team.length === 1 ? '' : 's'}</p>
      </div>
      <div class="system-chip-row">
        ${systemChip('Level', zombie.level)}
        ${systemChip('XP', zombie.xp)}
        ${systemChip('Stat Pts', zombie.statPoints, zombie.statPoints ? 'ready' : '')}
        ${systemChip('Health', `${state.resources.health}/${maxLifeHealth(state)}`, state.resources.health < maxLifeHealth(state) * 0.35 ? 'danger' : '')}
        ${systemChip('Stamina', `${state.resources.energy}/${maxLifeEnergy(state)}`)}
        ${systemChip('Food', supplies.food, supplies.food <= 1 ? 'danger' : '')}
        ${systemChip('Water', supplies.water, supplies.water <= 1 ? 'danger' : '')}
        ${systemChip('Ammo', supplies.ammo, supplies.ammo <= 1 ? 'danger' : '')}
      </div>
    </article>
  `;
}

function renderZombieSupplies(zombie) {
  const supplies = zombie.resources;
  return `
    <div class="world-grid zombie-supply-grid">
      ${metric('Food', supplies.food)}
      ${metric('Water', supplies.water)}
      ${metric('Medicine', supplies.medicine)}
      ${metric('Ammo', supplies.ammo)}
      ${metric('Materials', supplies.materials)}
      ${metric('Shelter', `${supplies.shelter}%`)}
      ${metric('Morale', `${supplies.morale}%`)}
      ${metric('Reputation', zombie.survivorReputation)}
    </div>
  `;
}

function renderZombieTeam(zombie) {
  const members = zombie.team;
  const statLine = (stats = {}) => Object.entries(stats)
    .map(([stat, value]) => `${labelize(stat)} ${value}`)
    .join(' / ');
  return members.length
    ? `<div class="activity-list">${members.map((member) => `
      <article class="option-card zombie-window zombie-activity-card ${member.alive === false ? 'dead' : ''}">
        <div class="activity-icon zombie-activity-icon">TM</div>
        <div class="zombie-card-main">
          <p class="eyebrow">${escapeHtml(member.role)} / Trust ${member.trust} / ${member.alive === false ? 'Dead' : member.present === false ? 'Away' : 'Alive'}</p>
          <h3>${escapeHtml(member.name)}</h3>
          <p>Health ${member.health}/${member.maxHealth ?? '?'} / Stamina ${member.stamina}/${member.maxStamina ?? '?'} / Weapon ${escapeHtml(labelize(member.weapon))}</p>
          <p class="muted">Stats: ${escapeHtml(statLine(member.stats))}</p>
        </div>
        <span class="lock-pill zombie-card-action">${escapeHtml(member.relationship)}</span>
      </article>
    `).join('')}</div>`
    : '<article class="option-card zombie-window"><h3>No team yet</h3><p>Recruit survivors to build a party that can fight beside you.</p></article>';
}

function renderZombieActivities(zombie) {
  return `
    <div class="activity-list">
      ${Object.entries(ZOMBIE_ACTIVITIES).map(([id, activity]) => `
        <article class="option-card zombie-window zombie-activity-card">
          <div class="activity-icon zombie-activity-icon">${escapeHtml(id.slice(0, 2).toUpperCase())}</div>
          <div class="zombie-card-main">
            <p class="eyebrow">${activity.choiceEvent ? 'Choice Event / Variable Outcome' : activity.injuryRisk ? `Injury Risk ${activity.injuryRisk}% / +${activity.xp} XP` : `No Injury Risk / +${activity.xp} XP`}</p>
            <h3>${escapeHtml(activity.label)}</h3>
            <p>${activity.choiceEvent
              ? 'Opens a scavenging event. Your choice decides the loot, danger, injuries, and whether you return empty-handed.'
              : `Costs: ${Object.entries(activity.costs ?? {}).map(([key, value]) => `${value} ${labelize(key)}`).join(', ') || 'None'} / Gains: ${Object.entries(activity.gains ?? {}).map(([key, value]) => `${value} ${labelize(key)}`).join(', ') || 'XP only'}`}</p>
          </div>
          <div class="activity-actions zombie-card-action">${button('Do', `zombie-activity-${id}`, 'primary')}</div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderZombieEncounters() {
  const encounters = [
    ['streetHorde', 'Street Horde', '4 infected / low supplies, high wound risk'],
    ['pharmacyRush', 'Pharmacy Rush', '3 faster infected / better medicine payout'],
    ['barricadeRaid', 'Barricade Raid', '5 infected / brutal shelter pressure'],
  ];
  return `
    <div class="activity-list">
      ${encounters.map(([id, title, text]) => `
        <article class="option-card zombie-window zombie-activity-card">
          <div class="activity-icon zombie-activity-icon">ZE</div>
          <div class="zombie-card-main">
            <p class="eyebrow">Zombie Encounter</p>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(text)}. Guns consume ammo and must hit.</p>
          </div>
          <div class="activity-actions zombie-card-action">${button('Engage', `zombie-encounter-${id}`, 'danger')}</div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderZombieInjuries(zombie) {
  return zombie.bodyInjuries.length
    ? `<div class="activity-list">${zombie.bodyInjuries.map((injury) => `
      <article class="option-card zombie-window injury-card">
        <div>
          <p class="eyebrow">${escapeHtml(injury.part)} / ${escapeHtml(injury.severity)}</p>
          <h3>${escapeHtml(injury.label)}</h3>
          <p>${injury.permanent ? 'Permanent debuff. It can be managed, not erased.' : 'Treat wounds can reduce recent non-permanent injuries.'}</p>
        </div>
      </article>
    `).join('')}</div>`
    : '<article class="option-card zombie-window"><h3>No body injuries recorded</h3><p>That is rare. Keep it that way.</p></article>';
}

function renderZombieStats(zombie) {
  return `
    <div class="hunter-stat-sheet zombie-stat-sheet">
      ${Object.entries(zombie.stats).map(([stat, value]) => `
        <article class="stat-row">
          <span>${labelize(stat)}</span>
          <strong>${value}</strong>
          <button class="small-btn" data-action="zombie-stat-${stat}" ${zombie.statPoints <= 0 ? 'disabled' : ''}>+1</button>
        </article>
      `).join('')}
    </div>
  `;
}

function renderZombieItems() {
  const zombie = normalizeZombieWorld(state.zombieWorld);
  const inventory = new Map(zombie.inventory.map((entry) => [entry.id, entry]));
  const resourceItems = Object.values(ZOMBIE_ITEM_CATALOG).filter((item) => ['consumable', 'medicine'].includes(item.type));
  const weaponItems = Object.values(ZOMBIE_ITEM_CATALOG).filter((item) => ['melee', 'range'].includes(item.type) && inventory.has(item.id));
  const renderResourceItem = (item) => {
    const quantity = zombie.resources[item.resource] ?? 0;
    const image = ZOMBIE_ITEM_ASSETS[item.id];
    return `
      <article class="option-card zombie-window zombie-item-card">
        ${image ? `<img class="zombie-item-image" src="${image}" alt="" aria-hidden="true">` : ''}
        <div class="zombie-item-copy">
          <p class="eyebrow">${item.type === 'medicine' ? 'Medicine' : 'Consumable'}</p>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.effect)}</p>
        </div>
        <div class="zombie-item-actions">
          <span class="lock-pill">x${quantity}</span>
          ${button('Use', `zombie-item-use-${item.id}`, 'primary', quantity <= 0)}
        </div>
      </article>
    `;
  };
  const renderWeaponItem = (item) => {
    const entry = inventory.get(item.id);
    const equipped = item.type === 'melee' ? zombie.equippedMelee === item.id : zombie.equippedGun === item.id;
    const condition = item.type === 'melee'
      ? `Durability ${entry.durability}/${item.maxDurability}`
      : `Damage ${item.damage} / Uses ${item.ammoCost ?? 1} ammo`;
    return `
      <article class="option-card zombie-window zombie-item-card ${equipped ? 'equipped' : ''}">
        <img class="zombie-item-image" src="${ZOMBIE_ITEM_ASSETS[item.id]}" alt="" aria-hidden="true">
        <div class="zombie-item-copy">
          <p class="eyebrow">${item.type === 'melee' ? 'Melee Weapon' : 'Range Weapon'}</p>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${condition} / Quantity ${entry.quantity}</p>
        </div>
        <div class="zombie-item-actions">
          ${equipped ? '<span class="lock-pill">Equipped</span>' : button('Equip', `zombie-item-equip-${item.id}`, 'primary')}
        </div>
      </article>
    `;
  };
  return `
    <section class="stack zombie-panel zombie-items-panel">
      <article class="option-card zombie-window zombie-status-panel">
        <div>
          <p class="eyebrow">Shelter Inventory</p>
          <h2>Zombie Items</h2>
          <p>Consumables keep you moving. Medicines keep wounds manageable. Equipped weapons determine your combat actions.</p>
        </div>
        <div class="system-chip-row">
          ${systemChip('Melee', ZOMBIE_ITEM_CATALOG[zombie.equippedMelee]?.name ?? 'None')}
          ${systemChip('Range', ZOMBIE_ITEM_CATALOG[zombie.equippedGun]?.name ?? 'None')}
          ${systemChip('Ammo', zombie.resources.ammo, zombie.resources.ammo <= 1 ? 'danger' : '')}
        </div>
      </article>
      ${renderCollapsibleSection({ id: 'zombie-items-consumables', title: 'Consumables', subtitle: 'Food and water carried as survival stacks.', body: `<div class="activity-list">${resourceItems.filter((item) => item.type === 'consumable').map(renderResourceItem).join('')}</div>` })}
      ${renderCollapsibleSection({ id: 'zombie-items-medicine', title: 'Medicines', subtitle: 'Bandages and treatment supplies.', body: `<div class="activity-list">${resourceItems.filter((item) => item.type === 'medicine').map(renderResourceItem).join('')}</div>` })}
      ${renderCollapsibleSection({ id: 'zombie-items-melee', title: 'Melee Weapons', subtitle: 'Equipped melee weapons lose durability when used.', body: `<div class="activity-list">${weaponItems.filter((item) => item.type === 'melee').map(renderWeaponItem).join('')}</div>` })}
      ${renderCollapsibleSection({ id: 'zombie-items-range', title: 'Range Weapons', subtitle: 'Equipped range weapons consume ammo and roll to hit.', body: `<div class="activity-list">${weaponItems.filter((item) => item.type === 'range').map(renderWeaponItem).join('')}</div>` })}
    </section>
  `;
}

function renderZombieCombat() {
  const fight = state.activeFight;
  const zombie = normalizeZombieWorld(state.zombieWorld);
  const party = fight.party?.members ?? [];
  const activeMember = party.find((member) => member.id === fight.party?.activeId) ?? party[0];
  const allZombies = fight.zombies ?? [];
  const liveZombies = (fight.zombies ?? []).filter((item) => item.alive && item.health > 0);
  const meleeItem = ZOMBIE_ITEM_CATALOG[zombie.equippedMelee];
  const meleeEntry = zombie.inventory.find((entry) => entry.id === zombie.equippedMelee);
  const rangeItem = ZOMBIE_ITEM_CATALOG[zombie.equippedGun];
  const moves = [
    ['unarmed', 'Unarmed', 'Fists / Always available / Can injure your hand', false, ZOMBIE_COMBAT_ASSETS.unarmed],
    ['melee', 'Melee', `${meleeItem?.name ?? 'No weapon'} / Durability ${meleeEntry?.durability ?? 0}/${meleeItem?.maxDurability ?? 0}`, !meleeItem || !meleeEntry || meleeEntry.durability <= 0, ZOMBIE_ITEM_ASSETS[meleeItem?.id] ?? ZOMBIE_COMBAT_ASSETS.melee],
    ['range', 'Range', `${rangeItem?.name ?? 'No weapon'} / Ammo ${zombie.resources.ammo}`, !rangeItem || zombie.resources.ammo < (rangeItem.ammoCost ?? 1), ZOMBIE_ITEM_ASSETS[rangeItem?.id] ?? ZOMBIE_COMBAT_ASSETS.range],
  ];
  return `
    <section class="combat stack zombie-combat-shell system-combat">
      <article class="fight-title system-fight-title active">
        <div>
          <p class="eyebrow">${fight.finished ? 'Encounter Report' : `Zombie Encounter · Exchange ${fight.round}`}</p>
          <h2>${escapeHtml(fight.opponentId ? labelize(fight.opponentId) : 'Zombie Encounter')}</h2>
          <p class="muted">${party.length} survivor${party.length === 1 ? '' : 's'} present / ${liveZombies.length}/${allZombies.length} infected still moving / Ammo ${zombie.resources.ammo}</p>
        </div>
        <span class="badge red">${fight.finished ? (fight.result?.won ? 'Cleared' : 'Failed') : 'Live'}</span>
      </article>
      <div class="combat-meters">
        ${combatMeter(activeMember?.id === 'player' ? 'Main Player' : escapeHtml(activeMember?.name ?? 'Active Ally'), fight.meters.playerHealth, `${fight.meters.playerHealth}/${fight.meters.maxPlayerHealth ?? 100}`, fight.meters.maxPlayerHealth ?? 100)}
        ${combatMeter('Horde', fight.meters.opponentHealth, `${fight.meters.opponentHealth}/${fight.meters.maxOpponentHealth ?? 100}`, fight.meters.maxOpponentHealth ?? 100)}
        ${combatMeter('Stamina', fight.meters.playerStamina, `${fight.meters.playerStamina}/${fight.meters.maxPlayerStamina ?? 100}`, fight.meters.maxPlayerStamina ?? 100)}
        ${combatMeter('Guard', fight.meters.guard, 'Brace')}
        ${combatMeter('Momentum', fight.meters.momentum + 50, fight.meters.momentum)}
        ${combatMeter('Injury Risk', fight.meters.injuryRisk, 'Danger')}
      </div>
      <div class="zombie-combat-grid">
        <article class="option-card zombie-window zombie-roster-panel">
          <div>
            <p class="eyebrow">Survivor Party</p>
            <h3>${escapeHtml(activeMember?.name ?? 'Survivor')} on point</h3>
          </div>
          <div class="zombie-party-row">
            ${party.map((member) => `
              <button class="zombie-combatant-card ${fight.party?.activeId === member.id ? 'selected' : ''} ${member.alive === false ? 'dead' : ''} ${(member.health ?? 0) <= 0 || member.present === false ? 'down' : ''}" data-action="zombie-switch-${member.id}" ${(fight.finished || fight.party?.activeId === member.id || member.alive === false || (member.health ?? 0) <= 0 || member.present === false) ? 'disabled' : ''}>
                <small>${member.id === 'player' ? 'Main Player' : 'Ally'}</small>
                <strong>${escapeHtml(member.name)}</strong>
                <span>${escapeHtml(member.role ?? 'Survivor')}</span>
                <em>HP ${member.health ?? '?'} / STA ${member.stamina ?? '?'}</em>
                <span>${escapeHtml(Object.entries(member.stats ?? {}).map(([stat, value]) => `${labelize(stat)} ${value}`).join(' / '))}</span>
                <b>${fight.party?.activeId === member.id ? 'On Point' : member.alive === false ? 'Dead' : (member.health ?? 0) <= 0 || member.present === false ? 'Down' : 'Switch In'}</b>
              </button>
            `).join('')}
          </div>
        </article>
        <article class="option-card zombie-window zombie-roster-panel">
          <div>
            <p class="eyebrow">Infected Line</p>
            <h3>${liveZombies.length} active target${liveZombies.length === 1 ? '' : 's'}</h3>
          </div>
          <div class="zombie-horde-row">
            ${allZombies.map((enemy) => `
              <div class="zombie-enemy-card ${enemy.alive && enemy.health > 0 ? 'alive' : 'down'}">
                <strong>${escapeHtml(enemy.name)}</strong>
                <span>${enemy.alive && enemy.health > 0 ? `${enemy.health}/${enemy.maxHealth}` : 'Down'}</span>
              </div>
            `).join('')}
          </div>
        </article>
      </div>
      ${fight.finished ? renderFightReport(fight) : `<div class="move-grid zombie-weapon-move-grid">${moves.map(([id, label, hint, disabled, image]) => `
        <button class="move-card system-move-card zombie-move-card zombie-${id}-move" data-action="fight-turn-${id}" aria-label="${escapeHtml(`${label}: ${hint}`)}" ${disabled ? 'disabled' : ''}>
          <img src="${image}" alt="" aria-hidden="true">
        </button>
      `).join('')}</div>`}
      ${renderExchanges(fight)}
    </section>
  `;
}

function renderZombie() {
  const zombie = normalizeZombieWorld(state.zombieWorld);
  if (!zombie.unlocked) {
    return '<section class="stack"><article class="option-card"><h2>Zombie World Locked</h2><p>This life did not begin in the outbreak.</p></article></section>';
  }
  if (state.activeFight?.source === 'zombieEncounter') return renderZombieCombat();
  return `
    <section class="stack zombie-panel">
      ${renderZombieStatus(zombie)}
      ${renderCollapsibleSection({ id: 'zombie-supplies', title: 'Supplies', subtitle: 'Food, water, medicine, ammo, materials, shelter, and morale.', body: renderZombieSupplies(zombie) })}
      ${renderCollapsibleSection({ id: 'zombie-encounters', title: 'Encounters', subtitle: 'Multi-zombie fights with guns, ammo, teammates, and body injuries.', body: renderZombieEncounters() })}
      ${renderCollapsibleSection({ id: 'zombie-team', title: 'Team', subtitle: `${zombie.team.length} survivor${zombie.team.length === 1 ? '' : 's'} in your group`, body: renderZombieTeam(zombie) })}
      ${renderCollapsibleSection({ id: 'zombie-injuries', title: 'Body Injuries', subtitle: `${zombie.bodyInjuries.length} wound${zombie.bodyInjuries.length === 1 ? '' : 's'} recorded`, body: renderZombieInjuries(zombie) })}
      ${renderCollapsibleSection({ id: 'zombie-stats', title: 'Zombie Stat Points', subtitle: `${zombie.statPoints} points available`, body: `<article class="option-card zombie-window"><div>${renderZombieStats(zombie)}</div></article>` })}
      ${renderCollapsibleSection({ id: 'zombie-log', title: 'Zombie Log', subtitle: 'World feed entries for survival activity.', body: renderLog('world') })}
    </section>
  `;
}

function renderZombieActivitiesTab() {
  const zombie = normalizeZombieWorld(state.zombieWorld);
  if (!zombie.unlocked) {
    return '<section class="stack"><article class="option-card"><h2>Zombie Activities Locked</h2><p>This life did not begin in the outbreak.</p></article></section>';
  }
  return `
    <section class="stack zombie-panel zombie-activities-panel">
      <article class="option-card zombie-window zombie-status-panel">
        <div>
          <p class="eyebrow">Survival Actions</p>
          <h2>Zombie Activities</h2>
          <p>Scavenge, secure shelter, treat wounds, train drills, recruit survivors, guard, craft, and move through harder locations.</p>
        </div>
        <div class="system-chip-row">
          ${systemChip('Level', zombie.level)}
          ${systemChip('XP', zombie.xp)}
          ${systemChip('Stat Pts', zombie.statPoints, zombie.statPoints ? 'ready' : '')}
          ${systemChip('Food', zombie.resources.food, zombie.resources.food <= 1 ? 'danger' : '')}
          ${systemChip('Water', zombie.resources.water, zombie.resources.water <= 1 ? 'danger' : '')}
          ${systemChip('Medicine', zombie.resources.medicine, zombie.resources.medicine <= 0 ? 'danger' : '')}
          ${systemChip('Morale', zombie.resources.morale, zombie.resources.morale < 35 ? 'danger' : '')}
        </div>
      </article>
      ${renderCollapsibleSection({ id: 'zombie-activities', title: 'Activities', subtitle: 'Hard survival actions that pay XP and risk wounds.', body: renderZombieActivities(zombie) })}
    </section>
  `;
}

function renderWorld() {
  return `
    <section class="stack">
      <div class="world-grid">
        ${metric('Hidden World', state.world.hiddenWorld ? 'Open' : 'Locked')}
        ${metric('League', state.world.league)}
        ${metric('Association', state.association ?? 'None')}
        ${metric('Heat', state.world.heat)}
        ${metric('Style', state.style)}
      </div>
      <article class="option-card association-card">
        <div>
          <p class="eyebrow">Underground Associations</p>
          <h2>${state.association ?? 'No Contract'}</h2>
          <p>${state.association ? 'You are cleared for private tournament brackets. True monster fights can appear in the Fight tab.' : 'Win enough hidden-world fights and build reputation to receive a private tournament contract.'}</p>
        </div>
      </article>
      ${renderCollapsibleSection({
        id: 'world-rumors',
        title: 'Rumors',
        subtitle: 'What the hidden world is whispering about this life.',
        count: state.world.rumors.length,
        body: `<article class="option-card"><div><ul class="rumors">
            ${state.world.rumors.map((rumor) => `<li>${rumor}</li>`).join('')}
          </ul></div></article>`,
      })}
      ${renderCollapsibleSection({
        id: 'world-log',
        title: 'World Log',
        subtitle: 'Recent world and hidden-circuit events.',
        body: renderLog('world'),
      })}
    </section>
  `;
}

function renderLog(filter = null) {
  const items = filter ? state.log.filter((item) => item.type === filter) : state.log;
  return `
    <section class="log">
      <h2>Life Feed</h2>
      ${items.slice(0, LOG_LIMIT).map((item) => `<p><span>${item.type}</span>${item.text}</p>`).join('')}
    </section>
  `;
}

function renderPendingEvent() {
  const event = state.pendingEvent;
  return `
    <section class="event-backdrop" role="dialog" aria-modal="true">
      <article class="event-modal">
        <p class="eyebrow">${event.id.startsWith('zombie-scavenge-') ? 'Scavenging Event' : 'Triggered Event'}</p>
        <h2>${event.title}</h2>
        <p>${event.body}</p>
        ${event.password ? `
          <div class="password-row">
            <input id="zombie-monarch-password-input" type="password" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Answer the broadcast" />
            <button class="primary" data-action="redeem-zombie-monarch-password">Answer</button>
          </div>
        ` : ''}
        <div class="event-choice-grid">
          ${event.choices.map((choice) => `
            <button data-action="event-${choice.id}">
              <strong>${choice.label}</strong>
              <span>${previewEffects(choice.effects)}</span>
            </button>
          `).join('')}
        </div>
      </article>
    </section>
  `;
}

function renderSocialPostPopup() {
  const post = state.social.lastPost;
  return `
    <section class="event-backdrop" role="dialog" aria-modal="true">
      <article class="event-modal social-post-modal">
        <p class="eyebrow">Post Result</p>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <div class="post-effect-list">
          ${(post.effects ?? []).map((effect) => `<span>${effect}</span>`).join('')}
        </div>
        <button class="primary wide" data-action="close-social-post">Close</button>
      </article>
    </section>
  `;
}

function renderTrainingPopup() {
  const popup = state.trainingPopup;
  return `
    <section class="event-backdrop" role="dialog" aria-modal="true">
      <article class="event-modal training-modal">
        <p class="eyebrow">Training Round</p>
        <h2>${popup.title}</h2>
        <p>${popup.body}</p>
        <div class="post-effect-list">
          ${(popup.effects ?? []).map((effect) => `<span>${effect}</span>`).join('')}
        </div>
        <button class="primary wide" data-action="close-training-popup">Close</button>
      </article>
    </section>
  `;
}

function previewEffects(effects = {}) {
  const parts = [];
  for (const [name, value] of Object.entries(effects.resources ?? {})) parts.push(`${value > 0 ? '+' : ''}${value} ${labelize(name)}`);
  for (const [name, value] of Object.entries(effects.stats ?? {})) parts.push(`${value > 0 ? '+' : ''}${value} ${labelize(name)}`);
  for (const [name, value] of Object.entries(effects.relationships ?? {})) parts.push(`${value > 0 ? '+' : ''}${value} ${labelize(name)}`);
  if (effects.injury) parts.push(`Injury: ${effects.injury}`);
  if (effects.world?.hiddenWorld) parts.push('Unlock hidden world');
  if (effects.world?.league) parts.push(effects.world.league);
  if (effects.hunterWorld?.unlock) parts.push('Unlock Hunter Gates');
  if (effects.hunterWorld?.delayMonths) parts.push(`Delay ${effects.hunterWorld.delayMonths} months`);
  if (effects.zombieWorld?.monarchOrigin) parts.push('Monarch origin');
  if (effects.zombieWorld?.morale) parts.push(`${effects.zombieWorld.morale > 0 ? '+' : ''}${effects.zombieWorld.morale} morale`);
  for (const [name, value] of Object.entries(effects.zombieScavenge?.resources ?? {})) parts.push(`${value > 0 ? '+' : ''}${value} ${labelize(name)}`);
  if (effects.zombieScavenge?.itemId) parts.push(`Find ${ZOMBIE_ITEM_CATALOG[effects.zombieScavenge.itemId]?.name ?? labelize(effects.zombieScavenge.itemId)}`);
  if (effects.zombieScavenge?.injury) parts.push(`${labelize(effects.zombieScavenge.injury.severity)} ${labelize(effects.zombieScavenge.injury.part)} injury risk`);
  if (effects.zombieScavenge?.leaveEmpty) parts.push('No loot');
  if (effects.zombieScavenge?.xp) parts.push(`+${effects.zombieScavenge.xp} Zombie XP`);
  if (effects.startZombieEncounter) parts.push(`Starts ${labelize(effects.startZombieEncounter)}`);
  return parts.slice(0, 4).join(' / ') || 'Story choice';
}

function labelize(value) {
  return value.replace(/[A-Z]/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
}

function classToken(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'default';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function markExchange(html, pattern, tone) {
  return html.replace(pattern, (match) => `<span class="exchange-mark mark-${tone}">${match}</span>`);
}

function highlightExchangeText(text) {
  let html = escapeHtml(text);
  const marks = [
    [/\bRound \d+, Exchange \d+\b/g, 'round'],
    [/\bReaction:/g, 'reaction'],
    [/\bYour reaction:/g, 'dodge'],
    [/\bEnemy attack:/g, 'danger'],
    [/\bDamage:/g, 'damage'],
    [/\bYou dealt \d+\./g, 'dealt'],
    [/\bYou took \d+\./g, 'taken'],
    [/\bFinish:/g, 'finish'],
    [/\bFinisher reaction:/g, 'finish'],
    [/\bClean exchange:/g, 'clean'],
    [/\bClose exchange:/g, 'close'],
    [/\bLate read:/g, 'danger'],
    [/\bDodge:/g, 'dodge'],
    [/\bEnemy dodge:/g, 'danger'],
    [/\bCritical strike:/g, 'crit'],
    [/\bCritical reaction:/g, 'crit'],
    [/\bClean reaction:/g, 'clean'],
    [/\bGlancing reaction:/g, 'close'],
    [/\bMiss reaction:/g, 'dodge'],
    [/\bOpponent critical:/g, 'danger'],
    [/\bPassive:/g, 'passive'],
    [/\bMatchup read:/g, 'read'],
    [/\bOptimal next move:/g, 'optimal'],
    [/\bOptimal boost:/g, 'boost'],
    [/\bform boost:/g, 'boost'],
    [/\bInjury:/g, 'injury'],
    [/\bInjury effect:/g, 'injury'],
    [/\bYour body is starting to send expensive warnings\./g, 'injury'],
  ];
  for (const [pattern, tone] of marks) html = markExchange(html, pattern, tone);
  return html;
}

function flashTrainingCard(source, canTrain) {
  const card = source?.closest?.('[data-train-card]');
  if (!card) return;
  const className = canTrain ? 'train-flash-ready' : 'train-flash-drained';
  card.classList.remove('train-flash-ready', 'train-flash-drained');
  void card.offsetWidth;
  card.classList.add(className);
  window.setTimeout(() => card.classList.remove(className), 700);
}

function flashSocialPostCard(source) {
  const card = source?.closest?.('[data-social-card]');
  if (!card) return;
  card.classList.remove('social-post-flash');
  void card.offsetWidth;
  card.classList.add('social-post-flash');
  window.setTimeout(() => card.classList.remove('social-post-flash'), 760);
}

function handleAction(action, source = null) {
  source?.blur?.();
  if (action === 'new-life') {
    const firstNameInput = document.querySelector('#first-name-input');
    selectedFirstName = firstNameInput?.value ?? '';
    setState(createNewLife({ gender: selectedGender, firstName: selectedFirstName, world: selectedWorld }));
    activeTab = 'life';
    selectedFightCategory = null;
    hunterQuestPopupOpen = false;
    hunterDungeonPopupOpen = false;
    systemShopPopupOpen = false;
    hunterItemsPopupOpen = false;
    navMenuOpen = false;
    return;
  }
  if (!state) return;
  if (action === 'nav-menu-open') {
    navMenuOpen = true;
    render();
    return;
  }
  if (action === 'nav-menu-close') {
    navMenuOpen = false;
    render();
    return;
  }
  if (action.startsWith('favorite-nav-')) {
    toggleFavoriteNavTab(action.replace('favorite-nav-', ''));
    render();
    return;
  }
  if (action === 'age-up') setState(ageUp(state));
  if (action === 'reroll-clan') {
    if (requiresClanRerollConfirmation(state)) {
      const confirmed = window.confirm(`Reroll ${state.clan.name} [${state.clan.rarity}]? This will replace your current clan.`);
      if (!confirmed) return;
    }
    setState(rerollClan(state));
  }
  if (action === 'accept-clan') setState(acceptClan(state));
  if (action === 'redeem-clan-password') {
    const input = document.querySelector('#clan-password-input');
    setState(redeemClanPassword(state, input?.value ?? ''));
    return;
  }
  if (action === 'redeem-hunter-password') {
    const input = document.querySelector('#hunter-password-input');
    setState(redeemHunterPassword(state, input?.value ?? ''));
    return;
  }
  if (action === 'redeem-mentor-password') {
    const input = document.querySelector('#mentor-password-input');
    setState(redeemMentorPassword(state, input?.value ?? ''));
    return;
  }
  if (action === 'redeem-monarch-body-password') {
    const input = document.querySelector('#monarch-body-password-input');
    setState(redeemMonarchBodyPassword(state, input?.value ?? ''));
    return;
  }
  if (action === 'redeem-zombie-monarch-password') {
    const input = document.querySelector('#zombie-monarch-password-input');
    setState(redeemZombieMonarchPassword(state, input?.value ?? ''));
    activeTab = 'zombie';
    return;
  }
  if (action === 'redeem-world-reset-password') {
    const input = document.querySelector('#world-reset-password-input');
    setState(redeemWorldResetPassword(state, input?.value ?? ''));
    activeTab = 'life';
    return;
  }
  if (action === 'choice-school') setState(spendLifeChoice(state, 'school'));
  if (action === 'choice-street') setState(spendLifeChoice(state, 'street'));
  if (action === 'choice-job') setState(spendLifeChoice(state, 'job'));
  if (action === 'choice-mentor') setState(spendLifeChoice(state, 'mentor'));
  if (action === 'reset') {
    clearStoredGameData();
    state = null;
    activeTab = 'life';
    hunterQuestPopupOpen = false;
    hunterDungeonPopupOpen = false;
    systemShopPopupOpen = false;
    hunterItemsPopupOpen = false;
    navMenuOpen = false;
    render();
  }
  if (action === 'world-reset') {
    setState(resetWorld(state));
    activeTab = 'life';
    return;
  }
  if (action.startsWith('world-reset-')) {
    const destination = action.replace('world-reset-', '');
    setState(resetWorld(state, { destination }));
    activeTab = destination === 'zombie' ? 'zombie' : destination === 'sorcerer' ? 'sorcerer' : destination === 'hunter' ? 'hunter' : 'life';
    return;
  }
  if (action === 'end-life') setState(endLife(state));
  if (action.startsWith('auto-train-')) {
    setState(toggleAutoTraining(state, action.replace('auto-train-', '')));
    return;
  }
  if (action.startsWith('auto-recover-')) {
    setState(toggleAutoRecovery(state, action.replace('auto-recover-', '')));
    return;
  }
  if (action.startsWith('favorite-train-')) {
    setState(toggleFavoriteTraining(state, action.replace('favorite-train-', '')));
    return;
  }
  if (action.startsWith('train-')) {
    const trainingId = action.replace('train-', '');
    const trainingAction = TRAINING_ACTIONS[trainingId];
    const canTrain = Boolean(trainingAction && state.resources.energy >= trainingAction.cost);
    flashTrainingCard(source, canTrain);
    window.setTimeout(() => setState(train(state, trainingId)), canTrain ? 180 : 320);
    return;
  }
  if (action.startsWith('special-train-')) {
    const trainingId = action.replace('special-train-', '');
    const trainingAction = SPECIAL_TRAINING_ACTIONS[trainingId];
    const canTrain = Boolean(
      trainingAction &&
      getSpecialTrainingStatus(state, trainingId).unlocked &&
      state.resources.energy >= trainingAction.cost.energy &&
      state.resources.money >= trainingAction.cost.money
    );
    flashTrainingCard(source, canTrain);
    window.setTimeout(() => setState(specialTrain(state, trainingId)), canTrain ? 180 : 320);
    return;
  }
  if (action.startsWith('recover-')) setState(recover(state, action.replace('recover-', '')));
  if (action === 'close-training-popup') {
    setState({ ...state, trainingPopup: null });
    return;
  }
  if (action.startsWith('money-')) setState(spendMoneyAction(state, action.replace('money-', '')));
  if (action.startsWith('social-')) {
    flashSocialPostCard(source);
    window.setTimeout(() => setState(useSocialAction(state, action.replace('social-', ''))), 180);
    return;
  }
  if (action === 'close-social-post') {
    setState({ ...state, social: { ...state.social, lastPost: null } });
    return;
  }
  if (action.startsWith('hunter-level-reward-')) {
    const levelRewardState = claimHunterLevelReward(state, action.replace('hunter-level-reward-', ''));
    if (hasMandatoryHunterPopup(levelRewardState.hunterWorld)) applyHunterPopupHandoff(levelRewardState);
    setState(levelRewardState);
    return;
  }
  if (action === 'hunter-daily') {
    hunterQuestPopupOpen = true;
    setState(runHunterDailyQuest(state));
    return;
  }
  if (action === 'hunter-quest-open') {
    hunterQuestPopupOpen = true;
    render();
    return;
  }
  if (action === 'hunter-quest-close') {
    hunterQuestPopupOpen = false;
    render();
    return;
  }
  if (action.startsWith('hunter-quest-choice-')) {
    hunterQuestPopupOpen = true;
    setState(advanceHunterDailyQuest(state, action.replace('hunter-quest-choice-', '')));
    return;
  }
  if (action === 'hunter-quest-fight') {
    activeTab = 'hunter';
    hunterQuestPopupOpen = true;
    fightInfoOpen = false;
    setState(startHunterQuestFight(state));
    return;
  }
  if (action === 'hunter-quest-retreat') {
    hunterQuestPopupOpen = true;
    setState(retreatHunterQuestFight(state));
    return;
  }
  if (action === 'hunter-quest-dismiss') {
    hunterQuestPopupOpen = false;
    setState(dismissRetreatedHunterQuest(state));
    return;
  }
  if (action === 'hunter-quest-claim') {
    hunterQuestPopupOpen = false;
    setState(claimHunterDailyQuest(state));
    return;
  }
  if (action === 'hunter-gates-open') {
    activeTab = 'hunter';
    hunterDungeonPopupOpen = !normalizeHunterWorld(state.hunterWorld).shadowMonarch.unlocked;
    setState(generateHunterGateOffers(state));
    return;
  }
  if (action === 'hunter-domains-open') {
    activeTab = 'hunter';
    render();
    return;
  }
  if (action.startsWith('shadow-army-select-')) {
    selectedShadowArmyId = decodeURIComponent(action.replace('shadow-army-select-', ''));
    render();
    return;
  }
  if (action === 'shadow-army-clear') {
    selectedShadowArmyId = null;
    render();
    return;
  }
  if (action.startsWith('auto-gate-shadow-')) {
    setState(toggleAutoGateShadow(state, decodeURIComponent(action.replace('auto-gate-shadow-', ''))));
    return;
  }
  if (action === 'auto-gate-equip-best') {
    setState(equipBestAutoGateShadows(state));
    return;
  }
  if (action.startsWith('shadow-domain-select-')) {
    selectedShadowDomainId = action.replace('shadow-domain-select-', '');
    render();
    return;
  }
  if (action.startsWith('shadow-domain-battle-')) {
    selectedShadowDomainId = action.replace('shadow-domain-battle-', '');
    setState(battleShadowDomain(state, selectedShadowDomainId));
    return;
  }
  if (action.startsWith('monarch-battle-')) {
    setState(fightMonarchBoss(state, action.replace('monarch-battle-', '')));
    return;
  }
  if (action.startsWith('system-ending-')) {
    setState(chooseSystemEnding(state, action.replace('system-ending-', '')));
    return;
  }
  if (action === 'hunter-dungeon-close') {
    if (state.hunterWorld?.activeDungeon?.completed) {
      const dismissedDungeonState = dismissHunterDungeonResult(state);
      const hasPendingHunterPopupAfterDungeon = Boolean(
        dismissedDungeonState.hunterWorld?.pendingLevelRewards?.length
      );
      if (hasPendingHunterPopupAfterDungeon) clearHunterPopupFlags();
      hunterDungeonPopupOpen = !hasPendingHunterPopupAfterDungeon;
      setState(dismissedDungeonState);
      return;
    }
    hunterDungeonPopupOpen = false;
    render();
    return;
  }
  if (action.startsWith('hunter-gate-select-')) {
    hunterDungeonPopupOpen = true;
    setState(selectHunterGate(state, action.replace('hunter-gate-select-', '')));
    return;
  }
  if (action.startsWith('hunter-auto-gate-')) {
    hunterDungeonPopupOpen = true;
    setState(clearGateWithAutoShadows(state, action.replace('hunter-auto-gate-', '')));
    return;
  }
  if (action === 'hunter-dungeon-start') {
    hunterDungeonPopupOpen = true;
    fightInfoOpen = false;
    setState(startHunterDungeonEncounter(state));
    return;
  }
  if (action === 'hunter-dungeon-advance') {
    hunterDungeonPopupOpen = true;
    setState(advanceHunterDungeon(state));
    return;
  }
  if (action === 'hunter-dungeon-retreat') {
    hunterDungeonPopupOpen = true;
    setState(retreatHunterDungeon(state));
    return;
  }
  if (action === 'hunter-dungeon-dismiss') {
    const dismissedDungeonState = dismissHunterDungeonResult(state);
    const hasPendingHunterPopupAfterDungeon = Boolean(
      dismissedDungeonState.hunterWorld?.pendingLevelRewards?.length
    );
    if (hasPendingHunterPopupAfterDungeon) clearHunterPopupFlags();
    hunterDungeonPopupOpen = !hasPendingHunterPopupAfterDungeon;
    setState(dismissedDungeonState);
    return;
  }
  if (action.startsWith('hunter-stat-amount-')) {
    hunterStatSpendAmount = Math.max(1, Math.floor(Number(action.replace('hunter-stat-amount-', '')) || 1));
    render();
    return;
  }
  if (action.startsWith('hunter-stat-bulk-')) {
    setState(spendHunterStatPoints(state, action.replace('hunter-stat-bulk-', ''), hunterStatSpendAmount));
    return;
  }
  if (action.startsWith('hunter-stat-')) {
    setState(spendHunterStatPoint(state, action.replace('hunter-stat-', '')));
    return;
  }
  if (action === 'hunter-association') {
    setState(visitHunterAssociation(state));
    return;
  }
  if (action === 'hunter-monarch') {
    setState(advanceMonarchTrace(state));
    return;
  }
  if (action === 'hunter-items-open') {
    activeTab = 'hunter';
    hunterItemsPopupOpen = true;
    render();
    return;
  }
  if (action === 'hunter-items-close') {
    hunterItemsPopupOpen = false;
    render();
    return;
  }
  if (action.startsWith('hunter-item-use-')) {
    hunterItemsPopupOpen = true;
    setState(useHunterItem(state, action.replace('hunter-item-use-', '')));
    return;
  }
  if (action.startsWith('hunter-item-equip-')) {
    hunterItemsPopupOpen = true;
    setState(equipHunterItem(state, action.replace('hunter-item-equip-', '')));
    return;
  }
  if (action === 'hunter-shop') {
    activeTab = 'hunter';
    systemShopPopupOpen = true;
    render();
    return;
  }
  if (action === 'hunter-shop-open') {
    systemShopPopupOpen = true;
    render();
    return;
  }
  if (action === 'hunter-shop-close') {
    systemShopPopupOpen = false;
    render();
    return;
  }
  if (action.startsWith('hunter-shop-buy-')) {
    systemShopPopupOpen = true;
    setState(buySystemItem(state, action.replace('hunter-shop-buy-', '')));
    return;
  }
  if (action.startsWith('hunter-craft-')) {
    setState(craftHunterItem(state, action.replace('hunter-craft-', '')));
    return;
  }
  if (action === 'sorcerer-missions-generate') {
    activeTab = 'sorcerer';
    setState(generateSorcererMissions(state));
    return;
  }
  if (action.startsWith('sorcerer-mission-select-')) {
    activeTab = 'sorcerer';
    setState(selectSorcererMission(state, action.replace('sorcerer-mission-select-', '')));
    return;
  }
  if (action === 'sorcerer-mission-fight') {
    activeTab = 'sorcerer';
    fightInfoOpen = false;
    setState(startSorcererMissionFight(state));
    return;
  }
  if (action === 'sorcerer-mission-dismiss') {
    activeTab = 'sorcerer';
    setState(dismissSorcererMission(state));
    return;
  }
  if (action === 'sorcerer-bureau-review') {
    setState(visitSorcererBureau(state));
    return;
  }
  if (action.startsWith('sorcerer-stat-')) {
    setState(spendSorcererStatPoint(state, action.replace('sorcerer-stat-', '')));
    return;
  }
  if (action.startsWith('zombie-activity-')) {
    activeTab = 'zombie-activities';
    setState(runZombieActivity(state, action.replace('zombie-activity-', '')));
    return;
  }
  if (action.startsWith('zombie-item-use-')) {
    activeTab = 'zombie-items';
    setState(useZombieItem(state, action.replace('zombie-item-use-', '')));
    return;
  }
  if (action.startsWith('zombie-item-equip-')) {
    activeTab = 'zombie-items';
    setState(equipZombieItem(state, action.replace('zombie-item-equip-', '')));
    return;
  }
  if (action.startsWith('zombie-encounter-')) {
    activeTab = 'zombie';
    fightInfoOpen = false;
    setState(startZombieEncounter(state, action.replace('zombie-encounter-', '')));
    return;
  }
  if (action.startsWith('zombie-stat-')) {
    setState(spendZombieStatPoint(state, action.replace('zombie-stat-', '')));
    return;
  }
  if (action.startsWith('zombie-switch-')) {
    setState(switchZombieCombatant(state, action.replace('zombie-switch-', '')));
    return;
  }
  if (action.startsWith('trash-')) {
    const [, opponentId, styleId] = action.match(/^trash-(.+)-([^-]+)$/) ?? [];
    if (opponentId && styleId) setState(trashTalkOpponent(state, opponentId, styleId));
  }
  if (action === 'coach-recruit') {
    activeTab = 'coach';
    queueCoachScroll();
    setState(recruitCoachedFighter(state));
    return;
  }
  if (action.startsWith('coach-train-')) {
    const [, fighterId, focus] = action.match(/^coach-train-(.+)-(striking|grappling|defense|hardCamp)$/) ?? [];
    if (fighterId && focus) {
      queueCoachScroll(fighterId);
      setState(coachFighter(state, fighterId, focus));
    }
    return;
  }
  if (action.startsWith('coach-recover-')) {
    const fighterId = action.replace('coach-recover-', '');
    queueCoachScroll(fighterId);
    setState(recoverCoachedFighter(state, fighterId));
    return;
  }
  if (action.startsWith('coach-release-')) {
    const fighterId = action.replace('coach-release-', '');
    const fighter = state.coach?.fighters?.find((item) => item.id === fighterId);
    const confirmed = window.confirm(`Let go ${fighter?.name ?? 'this fighter'}? They will leave your stable.`);
    if (confirmed) {
      queueCoachScroll();
      setState(releaseCoachedFighter(state, fighterId));
    }
    return;
  }
  if (action.startsWith('coach-fight-selected-')) {
    const fighterId = action.replace('coach-fight-selected-', '');
    const panel = source?.closest('[data-coach-booking]');
    const select = panel?.querySelector('[data-coach-fight-select]');
    const opponentId = select?.value;
    if (fighterId && opponentId) {
      queueCoachScroll(fighterId);
      setState(scheduleCoachedFight(state, fighterId, opponentId));
    }
    return;
  }
  if (action.startsWith('coach-fight-')) {
    const [, fighterId, opponentId] = action.match(/^coach-fight-(.+)-([a-zA-Z0-9]+)$/) ?? [];
    if (fighterId && opponentId) {
      queueCoachScroll(fighterId);
      setState(scheduleCoachedFight(state, fighterId, opponentId));
    }
    return;
  }
  if (action.startsWith('start-fight-')) {
    selectedFightCategory = null;
    fightInfoOpen = false;
    setState(startFight(state, action.replace('start-fight-', '')));
  }
  if (action === 'start-rival-fight') {
    selectedFightCategory = null;
    fightInfoOpen = false;
    setState(startRivalFight(state));
  }
  if (action === 'join-tournament') {
    activeTab = 'tournament';
    setState(joinTournament(state));
  }
  if (action === 'start-tournament-fight') {
    selectedFightCategory = null;
    activeTab = 'tournament';
    fightInfoOpen = false;
    setState(startTournamentFight(state));
  }
  if (action.startsWith('open-tactic-')) {
    selectedFightCategory = action.replace('open-tactic-', '');
    render();
    applyPendingMobileScroll();
  }
  if (action === 'close-tactic-menu') {
    selectedFightCategory = null;
    render();
    applyPendingMobileScroll();
  }
  if (action.startsWith('fight-turn-')) {
    const moveId = action.replace('fight-turn-', '');
    selectedFightCategory = null;
    const previousExchangeCount = state.activeFight?.exchanges?.length ?? 0;
    const nextFightState = takeFightTurn(state, moveId);
    const nextExchangeCount = nextFightState.activeFight?.exchanges?.length ?? 0;
    const latestExchangeLabel = nextFightState.activeFight?.exchanges?.[0]?.tacticLabel;
    if (nextExchangeCount > previousExchangeCount) triggerMoveIconBurst(moveId, latestExchangeLabel);
    setState(nextFightState);
  }
  if (action === 'close-fight') {
    selectedFightCategory = null;
    fightInfoOpen = false;
    setState({ ...state, activeFight: null });
  }
  if (action.startsWith('event-')) {
    setState(resolveEventChoice(state, action.replace('event-', '')));
  }
}

function updateCoachBookingPreview(select) {
  const panel = select.closest('[data-coach-booking]');
  const option = select.selectedOptions?.[0];
  if (!panel || !option) return;

  const selectedName = option.dataset.name ?? option.textContent?.split(' - ')[0] ?? 'Selected Fight';
  const tier = option.dataset.tier ?? 'Local';
  const threat = option.dataset.threat ?? 'Local';
  const style = option.dataset.style ?? 'Prize fight';
  const power = option.dataset.power ?? '?';
  const payout = option.dataset.payout ?? '?';
  const preview = panel.querySelector('[data-coach-booking-preview]');

  if (preview) {
    const tierNode = preview.querySelector('[data-booking-tier]');
    const nameNode = preview.querySelector('[data-booking-name]');
    const styleNode = preview.querySelector('[data-booking-style]');
    const metaNode = preview.querySelector('[data-booking-meta]');
    const imageNode = preview.querySelector('.coach-image');
    const imageNameNode = preview.querySelector('.coach-image-overlay strong');

    if (tierNode) tierNode.textContent = `${tier} / ${threat}`;
    if (nameNode) nameNode.textContent = selectedName;
    if (styleNode) styleNode.textContent = style;
    if (metaNode) metaNode.textContent = `Power ${power} / Payout scales from $${payout}`;
    if (imageNode) imageNode.setAttribute('aria-label', selectedName);
    if (imageNameNode) imageNameNode.textContent = selectedName;
  }

  const bookButton = panel.querySelector('[data-action^="coach-fight-selected-"]');
  if (bookButton) bookButton.textContent = `Book ${selectedName}`;
}

document.addEventListener('click', (event) => {
  const world = event.target.closest('[data-world]');
  if (world) {
    selectedWorld = world.dataset.world;
    render();
    return;
  }

  const gender = event.target.closest('[data-gender]');
  if (gender) {
    selectedGender = gender.dataset.gender;
    render();
    return;
  }

  const tab = event.target.closest('[data-tab]');
  if (tab) {
    activeTab = tab.dataset.tab;
    navMenuOpen = false;
    render();
    return;
  }

  const action = event.target.closest('[data-action]');
  if (action) {
    queueMobileScroll(action.dataset.action, action);
    queuePopupScroll(action.dataset.action, action);
    handleAction(action.dataset.action, action);
  }
});

document.addEventListener('toggle', (event) => {
  const fightInfo = event.target?.closest?.('[data-fight-info]');
  if (fightInfo && event.target === fightInfo) {
    fightInfoOpen = fightInfo.open;
    return;
  }
  const dropdown = event.target?.closest?.('[data-dropdown-id]');
  if (!dropdown || event.target !== dropdown) return;
  const id = dropdown.dataset.dropdownId;
  if (dropdownState.isOpen(id) !== dropdown.open) dropdownState.setOpen(id, dropdown.open);
}, true);

document.addEventListener('pointerdown', (event) => {
  if (!moveIconBurst) return;
  const action = event.target?.closest?.('[data-action]');
  if (action) {
    clearMoveIconBurstState();
    return;
  }
  dismissMoveIconBurst();
  event.stopPropagation();
  if (event.cancelable) event.preventDefault();
}, { capture: true });

document.addEventListener('change', (event) => {
  if (event.target?.id === 'first-name-input') {
    selectedFirstName = event.target.value;
    return;
  }

  const coachFightSelect = event.target.closest('[data-coach-fight-select]');
  if (coachFightSelect) updateCoachBookingPreview(coachFightSelect);
});

document.addEventListener('input', (event) => {
  if (event.target?.id === 'first-name-input') selectedFirstName = event.target.value;
});

preloadMoveIcons();
render();
scheduleAutoRoutine();
