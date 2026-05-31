export const CLAN_RARITIES = [
  { name: 'Common', color: 'gray', powerMultiplier: 1, weight: 469 },
  { name: 'Uncommon', color: 'green', powerMultiplier: 1.12, weight: 280 },
  { name: 'Rare', color: 'blue', powerMultiplier: 1.28, weight: 150 },
  { name: 'Epic', color: 'purple', powerMultiplier: 1.5, weight: 70 },
  { name: 'Legendary', color: 'gold', powerMultiplier: 1.85, weight: 24 },
  { name: 'Mythic', color: 'red', powerMultiplier: 2.25, weight: 6 },
  { name: 'Secret', color: 'secret', powerMultiplier: 3.5, weight: 1 },
];

export const STAT_CAP = 500;
export const SECRET_CLAN_PASSWORD = 'BUCKY21';
export const HUNTER_EVENT_PASSWORD = 'SOLO21';
export const MONARCH_BODY_PASSWORD = 'MONARCH21';

export const TECHNIQUE_TRACKS = {
  striking: {
    label: 'Striking',
    archetype: 'Striker',
    description: 'Built by pressure and counter exchanges. Helps define fighters who solve problems with hands, kicks, pace, and timing.',
  },
  grappling: {
    label: 'Grappling',
    archetype: 'Grappler',
    description: 'Built by grapple exchanges. Helps define fighters who win through clinches, trips, locks, rides, and mat control.',
  },
  defense: {
    label: 'Defense',
    archetype: 'Defensive Specialist',
    description: 'Built by defend and conserve exchanges. Helps define fighters who survive, read, reset, and make opponents waste offense.',
  },
};

const DEFAULT_TECHNIQUES = { striking: 0, grappling: 0, defense: 0 };
const DEVIL_GENE_CLAN_NAME = 'Mishime';
const DEVIL_GENE_PITY_REROLLS = 1500;
const DEFAULT_CLAN_AWAKENING = {
  stage: 0,
  control: 50,
  corruption: 0,
  lastAwakeningMonth: null,
};
const DEFAULT_HUNTER_STATS = {
  strength: 0,
  agility: 0,
  vitality: 0,
  sense: 0,
  intelligence: 0,
};
const DEFAULT_HUNTER_WORLD = {
  unlocked: false,
  playerAwakened: false,
  rank: 'E',
  xp: 0,
  level: 1,
  statPoints: 0,
  stats: DEFAULT_HUNTER_STATS,
  gatesCleared: 0,
  dailyQuestsCompleted: 0,
  systemFatigue: 0,
  shadowArmy: [],
  inventory: [],
  equippedWeapon: null,
  gateOffers: [],
  activeDungeon: null,
  redGatePending: false,
  lastGateMonth: null,
  arisePrompt: null,
  pendingArisePrompt: null,
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
};
const HUNTER_RANKS = ['E', 'D', 'C', 'B', 'A', 'S'];
const HUNTER_SPECIAL_COOLDOWN = 5;
const SECRET_MENTOR_PASSWORD = 'MENTOR21';
const SYSTEM_PERK_VALUES = {
  executeCooldownMinus1: 1,
  specialStaminaMinus2: 2,
  basicDamagePlus5: 0.05,
  conservePlus6: 6,
  manaGuardPlus3: 3,
  dashStrikePlus4: 4,
  analysisCritPlus3: 0.03,
  shadowDamagePlus8: 0.08,
  weaponSkillPlus10: 0.1,
  monarchExecution: 1,
  absoluteGuard: 1,
  rulersAuthority: 1,
  systemOverclock: 1,
  abyssalLeech: 1,
  perfectFootwork: 0.18,
  manaThreading: 10,
  predatorRhythm: 0.08,
  vitalPulse: 0.05,
  fractureMark: 0.22,
  afterimageChain: 1,
  bloodScent: 0.18,
  coreSight: 0.2,
  blackFlash: 0.08,
  limitBreakProtocol: 1,
  executionWindow: 0.2,
  monarchsInstinct: 0.24,
};
export const TRAINING_SESSION_LIMIT = 20;
const HUNTER_RANK_REQUIREMENTS = {
  D: { level: 5, gatesCleared: 3, power: 135 },
  C: { level: 10, gatesCleared: 8, power: 205 },
  B: { level: 18, gatesCleared: 16, power: 310 },
  A: { level: 28, gatesCleared: 30, power: 455 },
  S: { level: 42, gatesCleared: 50, power: 650 },
};
const HUNTER_DUNGEON_TIERS = {
  E: { fights: 2, room: { xp: 35, money: 250, reputation: 2 }, boss: { xp: 90, money: 1000, reputation: 6, stats: 1 } },
  D: { fights: 3, room: { xp: 65, money: 650, reputation: 4 }, boss: { xp: 170, money: 3000, reputation: 12, stats: 1 } },
  C: { fights: 3, room: { xp: 110, money: 1500, reputation: 7 }, boss: { xp: 300, money: 8000, reputation: 20, stats: 2 } },
  B: { fights: 4, room: { xp: 180, money: 3500, reputation: 12 }, boss: { xp: 500, money: 20000, reputation: 34, stats: 2 } },
  A: { fights: 4, room: { xp: 290, money: 8000, reputation: 20 }, boss: { xp: 800, money: 50000, reputation: 55, stats: 3 } },
  S: { fights: 5, room: { xp: 450, money: 18000, reputation: 32 }, boss: { xp: 1250, money: 120000, reputation: 90, stats: 4 } },
};
const HUNTER_DUNGEON_TEMPLATES = {
  E: [
    { id: 'subway-vermin-den', name: 'Subway Vermin Den', theme: 'Abandoned station', normals: ['gateCrawler', 'manaMite'], boss: 'goblinCaptain' },
    { id: 'warehouse-crack', name: 'Warehouse Mana Crack', theme: 'Collapsed storage floor', normals: ['manaMite', 'gateCrawler'], boss: 'razorJawAlpha' },
    { id: 'drainage-nest', name: 'Drainage Nest', theme: 'Stormwater tunnels', normals: ['gateCrawler', 'manaMite'], boss: 'goblinCaptain' },
  ],
  D: [
    { id: 'stonefang-burrow', name: 'Stonefang Burrow', theme: 'Quarry tunnels', normals: ['stoneFang', 'ironImp'], boss: 'ironKnightBoss' },
    { id: 'sunken-platform', name: 'Sunken Platform', theme: 'Flooded terminal', normals: ['ironImp', 'stoneFang'], boss: 'drownedSentinel' },
  ],
  C: [
    { id: 'bloodwood-hollow', name: 'Bloodwood Hollow', theme: 'Twisted forest', normals: ['bloodApe', 'venomStalker'], boss: 'bloodOgreBoss' },
    { id: 'cathedral-leak', name: 'Cathedral Leak', theme: 'Ruined sanctuary', normals: ['venomStalker', 'bloodApe'], boss: 'cryptMinotaur' },
  ],
  B: [
    { id: 'frozen-maw', name: 'Frozen Maw', theme: 'Ice cavern', normals: ['frostStalker', 'iceRevenant'], boss: 'frostWardenBoss' },
    { id: 'ashen-citadel', name: 'Ashen Citadel', theme: 'Burned fortress', normals: ['iceRevenant', 'frostStalker'], boss: 'ashGolemBoss' },
  ],
  A: [
    { id: 'abyssal-barracks', name: 'Abyssal Barracks', theme: 'Knight tomb', normals: ['abyssKnight', 'voidCaster'], boss: 'demonKnightBoss' },
    { id: 'black-mana-vault', name: 'Black Mana Vault', theme: 'Sealed treasury', normals: ['voidCaster', 'abyssKnight'], boss: 'archLichBoss' },
  ],
  S: [
    { id: 'dragon-grave', name: 'Dragon Grave', theme: 'Ancient caldera', normals: ['dragonSpawn', 'chaosKnight'], boss: 'dragonMonarchBoss' },
    { id: 'monarch-rift', name: 'Monarch Rift', theme: 'Shattered throne', normals: ['chaosKnight', 'dragonSpawn'], boss: 'monarchAvatarBoss' },
  ],
};

const HUNTER_GATE_MODIFIERS = [
  { id: 'stable', label: 'Stable Mana', danger: 'Low', loot: 'Standard loot table', scan: 'Clean readings and predictable monster signatures.' },
  { id: 'dense-mana', label: 'Dense Mana', danger: 'Medium', loot: '+loot pressure', scan: 'Thicker mana raises monster output and improves material traces.' },
  { id: 'shadow-rich', label: 'Shadow-Rich', danger: 'Medium', loot: '+shadow echo quality', scan: 'Boss echoes hold together longer after defeat.' },
  { id: 'fractured-space', label: 'Fractured Space', danger: 'High', loot: '+rare item chance', scan: 'Rooms bend distance and can spike burst damage.' },
];

const HUNTER_CRAFTING_RECIPES = [
  {
    id: 'refine-dagger',
    label: 'Refine Knight Dagger',
    description: 'Sharpen the starter System weapon with monster cores and Gate fragments.',
    costs: { monsterCore: 2, gateShard: 1 },
    requiresItem: 'knightDagger',
    upgradeItem: 'knightDagger',
  },
  {
    id: 'forge-mana-ampoule',
    label: 'Brew Mana Ampoule',
    description: 'Compress monster cores into a clean stamina recovery item.',
    costs: { monsterCore: 2 },
    grants: { manaAmpoule: 1 },
  },
  {
    id: 'stabilize-red-shard',
    label: 'Stabilize Red Gate Shard',
    description: 'Convert a volatile Red Gate fragment into a Monarch Vial.',
    costs: { redGateShard: 1, bossEssence: 2 },
    grants: { monarchVial: 1 },
  },
  {
    id: 'forge-shadow-sigil',
    label: 'Forge Shadow Sigil',
    description: 'Bind boss essence and Gate shards into a command seal for Domain conquest.',
    costs: { bossEssence: 2, gateShard: 3 },
    grants: { shadowSigil: 1 },
  },
  {
    id: 'monarch-war-cache',
    label: 'Monarch War Cache',
    description: 'Prepare late-game recovery items from Monarch materials before boss war.',
    costs: { monarchVial: 1, redGateShard: 1, monsterCore: 4 },
    grants: { dungeonElixir: 2, manaAmpoule: 2 },
  },
];

export const SHADOW_DOMAIN_TEMPLATES = [
  { id: 'ashen-outskirts', name: 'Ashen Outskirts', enemy: 'Ash Legion Remnants', enemyPower: 420, x: 12, y: 82, rewards: { statPoints: 8, items: { monsterCore: 3, gateShard: 2 }, influence: 8 } },
  { id: 'hollow-market', name: 'Hollow Market', enemy: 'Crawler Battalion', enemyPower: 760, requires: ['ashen-outskirts'], x: 24, y: 70, rewards: { statPoints: 10, items: { monsterCore: 4, gateShard: 2 }, influence: 8 } },
  { id: 'rust-fort', name: 'Rust Fort', enemy: 'Iron Imp Line', enemyPower: 1250, requires: ['ashen-outskirts'], x: 24, y: 90, rewards: { statPoints: 12, items: { monsterCore: 4, bossEssence: 1 }, influence: 9 } },
  { id: 'goblin-redoubt', name: 'Goblin Redoubt', enemy: 'Red-Eyed Captains', enemyPower: 1800, requires: ['hollow-market'], x: 36, y: 60, rewards: { statPoints: 14, items: { gateShard: 3, bossEssence: 1 }, influence: 10 } },
  { id: 'drowned-causeway', name: 'Drowned Causeway', enemy: 'Sentinel Phalanx', enemyPower: 2600, requires: ['hollow-market', 'rust-fort'], x: 38, y: 78, rewards: { statPoints: 16, items: { gateShard: 3, bossEssence: 2 }, influence: 10 } },
  { id: 'razor-hive', name: 'Razor Hive', enemy: 'Razor-Jaw Packs', enemyPower: 3400, requires: ['rust-fort'], x: 38, y: 92, rewards: { statPoints: 16, items: { monsterCore: 5, bossEssence: 2 }, influence: 10 } },
  { id: 'bloodwood-front', name: 'Bloodwood Front', enemy: 'Ogre Warband', enemyPower: 5200, requires: ['goblin-redoubt'], x: 50, y: 52, rewards: { statPoints: 20, items: { bossEssence: 2, redGateShard: 1 }, influence: 12 } },
  { id: 'cathedral-hex', name: 'Cathedral Hex', enemy: 'Crypt Minotaur Guard', enemyPower: 7400, requires: ['goblin-redoubt', 'drowned-causeway'], x: 52, y: 68, rewards: { statPoints: 22, items: { bossEssence: 3, gateShard: 3 }, influence: 12 } },
  { id: 'venom-marsh', name: 'Venom Marsh', enemy: 'Stalker Ambush Wing', enemyPower: 9200, requires: ['drowned-causeway', 'razor-hive'], x: 52, y: 84, rewards: { statPoints: 24, items: { monsterCore: 6, redGateShard: 1 }, influence: 12 } },
  { id: 'iron-bastion', name: 'Iron Bastion', enemy: 'Knight Domain', enemyPower: 12000, requires: ['bloodwood-front'], x: 64, y: 40, rewards: { statPoints: 28, items: { bossEssence: 3, redGateShard: 1 }, influence: 14 } },
  { id: 'frost-citadel', name: 'Frost Citadel', enemy: 'Warden Host', enemyPower: 16500, requires: ['bloodwood-front', 'cathedral-hex'], x: 66, y: 56, rewards: { statPoints: 30, items: { bossEssence: 4, redGateShard: 1 }, influence: 14 } },
  { id: 'ashen-citadel', name: 'Ashen Citadel', enemy: 'Golem Siege Line', enemyPower: 21000, requires: ['cathedral-hex', 'venom-marsh'], x: 66, y: 72, rewards: { statPoints: 32, items: { bossEssence: 4, redGateShard: 2 }, influence: 14 } },
  { id: 'void-caster-ring', name: 'Void Caster Ring', enemy: 'Void Spell Array', enemyPower: 28000, requires: ['iron-bastion', 'frost-citadel'], x: 76, y: 34, rewards: { statPoints: 36, items: { bossEssence: 5, monarchVial: 1 }, influence: 16 } },
  { id: 'demon-knight-yard', name: 'Demon Knight Yard', enemy: 'Black Flame Knights', enemyPower: 36000, requires: ['frost-citadel'], x: 78, y: 50, rewards: { statPoints: 38, items: { redGateShard: 2, monarchVial: 1 }, influence: 16 } },
  { id: 'lich-observatory', name: 'Lich Observatory', enemy: 'Death Array Legion', enemyPower: 45000, requires: ['frost-citadel', 'ashen-citadel'], x: 78, y: 66, rewards: { statPoints: 40, items: { bossEssence: 5, awakeningRune: 1 }, influence: 16 } },
  { id: 'dragon-grave-line', name: 'Dragon Grave Line', enemy: 'Dragon Spawn Swarm', enemyPower: 58000, requires: ['void-caster-ring'], x: 86, y: 26, rewards: { statPoints: 48, items: { redGateShard: 3, monarchVial: 1 }, influence: 18 } },
  { id: 'chaos-knight-span', name: 'Chaos Knight Span', enemy: 'Space Sever Battalion', enemyPower: 72000, requires: ['void-caster-ring', 'demon-knight-yard'], x: 88, y: 42, rewards: { statPoints: 52, items: { bossEssence: 6, monarchVial: 1 }, influence: 18 } },
  { id: 'red-dragon-rampart', name: 'Red Dragon Rampart', enemy: 'Crimson Dragon Host', enemyPower: 88000, requires: ['demon-knight-yard', 'lich-observatory'], x: 88, y: 58, rewards: { statPoints: 56, items: { redGateShard: 3, awakeningRune: 1 }, influence: 18 } },
  { id: 'monarch-rift-wall', name: 'Monarch Rift Wall', enemy: 'Avatar Guard', enemyPower: 105000, requires: ['lich-observatory'], x: 88, y: 74, rewards: { statPoints: 60, items: { monarchVial: 2, awakeningRune: 1 }, influence: 20 } },
  { id: 'sovereign-gate', name: 'Sovereign Gate', enemy: 'Ruler-Class Vanguard', enemyPower: 118000, core: true, requires: ['dragon-grave-line', 'chaos-knight-span'], x: 74, y: 18, rewards: { statPoints: 70, items: { monarchVial: 2, awakeningRune: 1 }, influence: 20 } },
  { id: 'eclipse-throne', name: 'Eclipse Throne', enemy: 'Eclipse Monarch Guard', enemyPower: 128000, core: true, requires: ['chaos-knight-span', 'red-dragon-rampart'], x: 84, y: 18, rewards: { statPoints: 78, items: { monarchVial: 2, awakeningRune: 2 }, influence: 22 } },
  { id: 'abyssal-throne', name: 'Abyssal Throne', enemy: 'Monarch Core Guard', enemyPower: 136000, core: true, requires: ['red-dragon-rampart', 'monarch-rift-wall'], x: 94, y: 34, rewards: { statPoints: 86, items: { monarchVial: 3, awakeningRune: 2 }, influence: 22 } },
  { id: 'crownless-army', name: 'Crownless Army', enemy: 'Nameless Monarch Host', enemyPower: 142000, core: true, requires: ['sovereign-gate', 'eclipse-throne'], x: 94, y: 50, rewards: { statPoints: 92, items: { redGateShard: 4, monarchVial: 3 }, influence: 24 } },
  { id: 'final-shadow-core', name: 'Final Shadow Core', enemy: 'Planetary Portal Legion', enemyPower: 150000, core: true, requires: ['eclipse-throne', 'abyssal-throne', 'crownless-army'], x: 94, y: 66, rewards: { statPoints: 110, items: { monarchVial: 4, awakeningRune: 3 }, influence: 25 } },
  { id: 'void-crown', name: 'Void Crown', enemy: 'Last Domain Throne', enemyPower: 155000, core: true, requires: ['final-shadow-core'], x: 82, y: 84, rewards: { statPoints: 130, items: { monarchVial: 5, awakeningRune: 3 }, influence: 25 } },
];

export const MONARCH_BOSSES = [
  { id: 'monarch-fangs', name: 'Monarch of Fangs', power: 780, reward: { statPoints: 60, items: { redGateShard: 1, bossEssence: 2 } } },
  { id: 'monarch-frost', name: 'Monarch of Frost', power: 900, reward: { statPoints: 75, items: { monarchVial: 1 } } },
  { id: 'monarch-flames', name: 'Monarch of Flames', power: 1040, reward: { statPoints: 90, items: { awakeningRune: 1 } } },
  { id: 'monarch-destruction', name: 'Monarch of Destruction', power: 1220, reward: { statPoints: 140, items: { monarchVial: 2, awakeningRune: 1 } } },
];

export const HUNTER_MONSTERS = {
  systemGoblinScout: {
    name: 'Gate Scout',
    style: 'Claw Rush',
    threat: 'System Monster',
    tier: 'Hunter Quest',
    power: 72,
    temperament: 'reckless pressure',
    strengths: ['claw swarms', 'low lunges', 'pain ignorance'],
    weakness: 'overextends after the first rush',
    reward: 0,
    rep: 0,
    risk: 6,
    requirements: {},
  },
  subwayRipper: {
    name: 'Subway Ripper',
    style: 'Tunnel Ambush',
    threat: 'System Monster',
    tier: 'Hunter Quest',
    power: 116,
    temperament: 'patient counter-striker',
    strengths: ['dark angles', 'sudden counters', 'hit-and-run entries'],
    weakness: 'struggles when pinned and forced to trade',
    reward: 0,
    rep: 0,
    risk: 10,
    requirements: {},
  },
  manaHoundAlpha: {
    name: 'Mana Hound Alpha',
    style: 'Pack Predator',
    threat: 'System Monster',
    tier: 'Hunter Quest',
    power: 142,
    temperament: 'reckless pressure',
    strengths: ['chain lunges', 'bite feints', 'relentless pursuit'],
    weakness: 'loses rhythm when its charge is countered',
    reward: 0,
    rep: 0,
    risk: 13,
    requirements: {},
  },
  gateCrawler: { name: 'Gate Crawler', style: 'Skitter Lunge', threat: 'E-Rank Monster', tier: 'E', power: 62, temperament: 'reckless pressure', strengths: ['claws'], weakness: 'fragile shell', reward: 0, rep: 0, risk: 5, requirements: {} },
  manaMite: { name: 'Mana Mite Swarm', style: 'Swarm Bite', threat: 'E-Rank Monster', tier: 'E', power: 68, temperament: 'reckless pressure', strengths: ['numbers'], weakness: 'wide strikes', reward: 0, rep: 0, risk: 5, requirements: {} },
  goblinCaptain: { name: 'Goblin Captain', style: 'Rust Blade', threat: 'E-Rank Boss', tier: 'E', power: 90, temperament: 'patient counter-striker', strengths: ['dirty feints'], weakness: 'short reach', reward: 0, rep: 0, risk: 8, requirements: {} },
  razorJawAlpha: { name: 'Razor-Jaw Alpha', style: 'Pack Charge', threat: 'E-Rank Boss', tier: 'E', power: 94, temperament: 'reckless pressure', strengths: ['bite rush'], weakness: 'overcommits', reward: 0, rep: 0, risk: 8, requirements: {} },
  stoneFang: { name: 'Stone Fang', style: 'Crushing Bite', threat: 'D-Rank Monster', tier: 'D', power: 108, temperament: 'reckless pressure', strengths: ['armored hide'], weakness: 'slow turns', reward: 0, rep: 0, risk: 10, requirements: {} },
  ironImp: { name: 'Iron Imp', style: 'Hooked Talons', threat: 'D-Rank Monster', tier: 'D', power: 114, temperament: 'patient counter-striker', strengths: ['metal claws'], weakness: 'thin core', reward: 0, rep: 0, risk: 10, requirements: {} },
  ironKnightBoss: { name: 'Iron Knight', style: 'Execution Blade', threat: 'D-Rank Boss', tier: 'D', power: 145, temperament: 'patient counter-striker', strengths: ['tower guard'], weakness: 'mana joint', reward: 0, rep: 0, risk: 14, requirements: {} },
  drownedSentinel: { name: 'Drowned Sentinel', style: 'Anchor Cleave', threat: 'D-Rank Boss', tier: 'D', power: 150, temperament: 'patient counter-striker', strengths: ['heavy reach'], weakness: 'dry footing', reward: 0, rep: 0, risk: 14, requirements: {} },
  bloodApe: { name: 'Blood Ape', style: 'Rending Smash', threat: 'C-Rank Monster', tier: 'C', power: 168, temperament: 'reckless pressure', strengths: ['raw force'], weakness: 'rage openings', reward: 0, rep: 0, risk: 16, requirements: {} },
  venomStalker: { name: 'Venom Stalker', style: 'Needle Ambush', threat: 'C-Rank Monster', tier: 'C', power: 174, temperament: 'patient counter-striker', strengths: ['poison angle'], weakness: 'weak guard', reward: 0, rep: 0, risk: 16, requirements: {} },
  bloodOgreBoss: { name: 'Blood Ogre', style: 'Bone Maul', threat: 'C-Rank Boss', tier: 'C', power: 212, temperament: 'reckless pressure', strengths: ['stopping power'], weakness: 'exposed flank', reward: 0, rep: 0, risk: 21, requirements: {} },
  cryptMinotaur: { name: 'Crypt Minotaur', style: 'Labyrinth Charge', threat: 'C-Rank Boss', tier: 'C', power: 218, temperament: 'reckless pressure', strengths: ['horn rush'], weakness: 'wall impacts', reward: 0, rep: 0, risk: 21, requirements: {} },
  frostStalker: { name: 'Frost Stalker', style: 'Ice Fang', threat: 'B-Rank Monster', tier: 'B', power: 244, temperament: 'patient counter-striker', strengths: ['cold mist'], weakness: 'heated core', reward: 0, rep: 0, risk: 25, requirements: {} },
  iceRevenant: { name: 'Ice Revenant', style: 'Frozen Spear', threat: 'B-Rank Monster', tier: 'B', power: 252, temperament: 'patient counter-striker', strengths: ['range'], weakness: 'shattered footing', reward: 0, rep: 0, risk: 25, requirements: {} },
  frostWardenBoss: { name: 'Frost Warden', style: 'Glacial Sentence', threat: 'B-Rank Boss', tier: 'B', power: 304, temperament: 'patient counter-striker', strengths: ['ice armor'], weakness: 'core pulse', reward: 0, rep: 0, risk: 31, requirements: {} },
  ashGolemBoss: { name: 'Ash Golem', style: 'Cinder Hammer', threat: 'B-Rank Boss', tier: 'B', power: 312, temperament: 'reckless pressure', strengths: ['stone body'], weakness: 'mana seams', reward: 0, rep: 0, risk: 31, requirements: {} },
  abyssKnight: { name: 'Abyss Knight', style: 'Void Sword', threat: 'A-Rank Monster', tier: 'A', power: 350, temperament: 'patient counter-striker', strengths: ['blink slash'], weakness: 'summon lag', reward: 0, rep: 0, risk: 36, requirements: {} },
  voidCaster: { name: 'Void Caster', style: 'Mana Lance', threat: 'A-Rank Monster', tier: 'A', power: 360, temperament: 'patient counter-striker', strengths: ['spell burst'], weakness: 'close range', reward: 0, rep: 0, risk: 36, requirements: {} },
  demonKnightBoss: { name: 'Demon Knight', style: 'Black Flame Blade', threat: 'A-Rank Boss', tier: 'A', power: 425, temperament: 'reckless pressure', strengths: ['hellfire'], weakness: 'broken crest', reward: 0, rep: 0, risk: 44, requirements: {} },
  archLichBoss: { name: 'Arch Lich', style: 'Death Array', threat: 'A-Rank Boss', tier: 'A', power: 438, temperament: 'patient counter-striker', strengths: ['mana traps'], weakness: 'phylactery', reward: 0, rep: 0, risk: 44, requirements: {} },
  dragonSpawn: { name: 'Dragon Spawn', style: 'Inferno Claw', threat: 'S-Rank Monster', tier: 'S', power: 500, temperament: 'reckless pressure', strengths: ['flame breath'], weakness: 'wing joint', reward: 0, rep: 0, risk: 50, requirements: {} },
  chaosKnight: { name: 'Chaos Knight', style: 'Space Sever', threat: 'S-Rank Monster', tier: 'S', power: 515, temperament: 'patient counter-striker', strengths: ['rift cuts'], weakness: 'anchor rune', reward: 0, rep: 0, risk: 50, requirements: {} },
  dragonMonarchBoss: { name: 'Dragon Monarch Echo', style: 'Calamity Breath', threat: 'S-Rank Boss', tier: 'S', power: 620, temperament: 'reckless pressure', strengths: ['catastrophe'], weakness: 'heart scale', reward: 0, rep: 0, risk: 62, requirements: {} },
  monarchAvatarBoss: { name: 'Monarch Avatar', style: 'Ruin Decree', threat: 'S-Rank Boss', tier: 'S', power: 640, temperament: 'patient counter-striker', strengths: ['domain pressure'], weakness: 'shadow breach', reward: 0, rep: 0, risk: 62, requirements: {} },
};
const RED_GATE_BOSS_IDS = {
  E: 'redGoblinCaptain',
  D: 'redIronKnight',
  C: 'redBloodOgre',
  B: 'redFrostWarden',
  A: 'redDemonKnight',
  S: 'redDragonMonarch',
};
for (const [rank, bossId, baseBossId] of [
  ['E', 'redGoblinCaptain', 'goblinCaptain'],
  ['D', 'redIronKnight', 'ironKnightBoss'],
  ['C', 'redBloodOgre', 'bloodOgreBoss'],
  ['B', 'redFrostWarden', 'frostWardenBoss'],
  ['A', 'redDemonKnight', 'demonKnightBoss'],
  ['S', 'redDragonMonarch', 'dragonMonarchBoss'],
]) {
  const boss = HUNTER_MONSTERS[baseBossId];
  HUNTER_MONSTERS[bossId] = {
    ...boss,
    name: `Elite Red ${boss.name}`,
    threat: `Red Gate ${rank}-Rank Boss`,
    power: Math.round(boss.power * 1.35),
    risk: Math.round(boss.risk * 1.25),
  };
}

const HUNTER_MONSTER_ATTACK_LABELS = {
  systemGoblinScout: ['Raking Lunge', 'Ankle Bite', 'Shriek Pounce'],
  subwayRipper: ['Tunnel Skewer', 'Ceiling Drop', 'Darkline Ambush'],
  manaHoundAlpha: ['Mana Fang', 'Pack Rush', 'Alpha Howl'],
  gateCrawler: ['Skitter Claw', 'Wall Pounce'],
  manaMite: ['Swarm Bite', 'Mana Siphon'],
  goblinCaptain: ['Rust Blade Flurry', 'Dirty Bomb', 'Commanding Shriek'],
  razorJawAlpha: ['Razor Bite', 'Mauling Charge', 'Pack Frenzy'],
  stoneFang: ['Granite Bite', 'Tail Sweep'],
  ironImp: ['Hooked Talons', 'Scrap Dive'],
  ironKnightBoss: ['Execution Cleave', 'Shield Crush', 'Mana-Joint Thrust'],
  drownedSentinel: ['Anchor Cleave', 'Undertow Grasp', 'Flooded Judgment'],
  bloodApe: ['Rending Smash', 'Bloodrage Slam'],
  venomStalker: ['Needle Pounce', 'Venom Spray'],
  bloodOgreBoss: ['Bone Maul', 'Meat Hook', 'Bloodquake'],
  cryptMinotaur: ['Labyrinth Charge', 'Horn Toss', 'Gravewall Crash'],
  frostStalker: ['Ice Fang', 'Whiteout Ambush'],
  iceRevenant: ['Frozen Spear', 'Soul Chill'],
  frostWardenBoss: ['Glacial Sentence', 'Ice Prison', 'Absolute Zero'],
  ashGolemBoss: ['Cinder Hammer', 'Ash Burst', 'Molten Core'],
  abyssKnight: ['Void Sword', 'Blink Sever'],
  voidCaster: ['Mana Lance', 'Gravity Hex'],
  demonKnightBoss: ['Black Flame Blade', 'Hellfire Rend', 'Demonic Execution'],
  archLichBoss: ['Death Array', 'Soul Spear', 'Phylactery Curse'],
  dragonSpawn: ['Inferno Claw', 'Wing Buffet'],
  chaosKnight: ['Space Sever', 'Rift Impale'],
  dragonMonarchBoss: ['Calamity Breath', 'Wingstorm Cataclysm', 'Dragon Fear'],
  monarchAvatarBoss: ['Ruin Decree', 'Shadow Dominion', 'Existence Break'],
  redGoblinCaptain: ['Crimson Blade Flurry', 'Red Gate Bomb', 'Blood Command'],
  redIronKnight: ['Crimson Execution', 'Red Shield Rupture', 'Blood-Joint Thrust'],
  redBloodOgre: ['Crimson Bone Maul', 'Blood Chain Hook', 'Red Gate Quake'],
  redFrostWarden: ['Crimson Ice Sentence', 'Bloodfrost Prison', 'Red Absolute Zero'],
  redDemonKnight: ['Crimson Flame Blade', 'Red Hellfire Rend', 'Blood Execution'],
  redDragonMonarch: ['Crimson Calamity Breath', 'Red Wingstorm', 'Blood Dragon Fear'],
};

function monsterMove(id, label, index, isBoss) {
  const signature = index === 2;
  const category = signature ? 'special' : index === 1 ? 'counter' : 'pressure';
  return {
    id,
    label,
    category,
    text: `${label} tears through the Gate with inhuman force.`,
    scoreBonus: signature ? (isBoss ? 24 : 17) : index === 1 ? 11 : 8,
    damageMultiplier: signature ? (isBoss ? 1.95 : 1.55) : index === 1 ? 1.34 : 1.22,
    staminaCost: signature ? 12 : 7,
    injury: {
      name: 'body trauma',
      text: `${label} leaves System damage burning through your body.`,
    },
  };
}

export const HUNTER_MONSTER_MOVES = {};
for (const [monsterId, labels] of Object.entries(HUNTER_MONSTER_ATTACK_LABELS)) {
  const monster = HUNTER_MONSTERS[monsterId];
  if (!monster) continue;
  const isBoss = monster.threat.includes('Boss');
  monster.systemMonster = true;
  monster.moveIds = labels.map((label, index) => {
    const moveId = `${monsterId}Move${index + 1}`;
    HUNTER_MONSTER_MOVES[moveId] = monsterMove(moveId, label, index, isBoss);
    return moveId;
  });
}

export const HUNTER_MOVES = {
  slash: {
    label: 'Slash',
    moveType: 'basic',
    category: 'attack',
    hint: 'A direct System blade line. Scales with Hunter Strength and Sense.',
    staminaCost: 14,
    damageBias: 1.15,
    guardBias: -2,
    text: 'System Slash cuts a bright line through the monster entry.',
  },
  dashStrike: {
    label: 'Dash Strike',
    moveType: 'basic',
    category: 'attack',
    hint: 'Burst through the monster angle. Scales with Agility and Strength.',
    staminaCost: 18,
    damageBias: 1.28,
    guardBias: -4,
    text: 'Dash Strike turns footwork into a blue afterimage and impact.',
  },
  manaGuard: {
    label: 'Mana Guard',
    moveType: 'basic',
    category: 'defense',
    hint: 'Raise a System guard to reduce incoming damage and recover control.',
    staminaCost: 8,
    damageBias: 0.45,
    guardBias: 12,
    text: 'Mana Guard blooms over your forearms before the monster lands clean.',
  },
  conserve: {
    label: 'Conserve',
    moveType: 'basic',
    category: 'defense',
    hint: 'Hold position and recover 18 mana while reducing the next monster hit.',
    staminaCost: 0,
    damageBias: 0,
    guardBias: 14,
    text: 'You draw mana inward and brace behind a compressed System guard.',
  },
  analyzeWeakness: {
    label: 'Analyze Weakness',
    moveType: 'basic',
    category: 'support',
    hint: 'Read the monster pattern. Lower damage now, stronger next exchange.',
    staminaCost: 7,
    damageBias: 0.55,
    guardBias: 4,
    text: 'Analyze Weakness turns the monster movement into readable System marks.',
  },
  execute: {
    label: 'Execute',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN,
    category: 'finisher',
    hint: 'High-cost finisher that grows stronger when the monster is hurt.',
    staminaCost: 28,
    damageBias: 1.85,
    guardBias: -7,
    text: 'Execute marks the target and drives the final line toward the core.',
  },
  abyssalLeech: {
    label: 'Abyssal Leech',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN + 1,
    category: 'ultimate',
    hint: 'ULTIMATE System move. Deals heavy damage and restores health from the wound.',
    staminaCost: 34,
    damageBias: 1.72,
    guardBias: -6,
    requiresPerk: 'abyssalLeech',
    text: 'Abyssal Leech opens a black System brand and pulls stolen vitality back into your body.',
  },
  shadowPierce: {
    label: 'Shadow Pierce',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN,
    category: 'weapon',
    hint: 'Dagger weapon skill. Cheap precise thrust that scales with Sense and Agility.',
    staminaCost: 12,
    damageBias: 1.42,
    guardBias: -3,
    requiresWeapon: 'knightDagger',
    text: 'Shadow Pierce drives the dagger through the monster opening marked by the System.',
  },
  manaRend: {
    label: 'Mana Rend',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN,
    category: 'weapon',
    hint: 'Longsword weapon skill. Heavy mana cut that scales with Strength and Intelligence.',
    staminaCost: 22,
    damageBias: 1.68,
    guardBias: -5,
    requiresWeapon: 'manaLongsword',
    text: 'Mana Rend releases a violet sword arc that bites into the monster core.',
  },
  reapingArc: {
    label: 'Reaping Arc',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN,
    category: 'weapon',
    hint: 'Scythe weapon skill. Wide execution sweep that grows nastier against wounded monsters.',
    staminaCost: 30,
    damageBias: 1.95,
    guardBias: -8,
    requiresWeapon: 'reaperScythe',
    text: 'Reaping Arc carves a crescent of System light across the monster field.',
  },
  monarchCommand: {
    label: 'Monarch Command',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN,
    category: 'ultimate',
    hint: 'Shadow Monarch System skill. Crushes monster rhythm with royal pressure.',
    staminaCost: 26,
    damageBias: 1.7,
    guardBias: 4,
    requiresShadowMonarch: true,
    text: 'Monarch Command turns the battlefield black and forces the target to kneel.',
  },
  abyssalDomain: {
    label: 'Abyssal Domain',
    moveType: 'special',
    cooldown: HUNTER_SPECIAL_COOLDOWN + 2,
    category: 'ultimate',
    hint: 'Shadow Monarch System skill. Heavy damage and heavy protection in one decree.',
    staminaCost: 36,
    damageBias: 2.1,
    guardBias: 8,
    requiresShadowMonarch: true,
    text: 'Abyssal Domain spreads under your feet as black-violet System light answers.',
  },
};

const SHADOW_MONARCH_SKILL_EVOLUTIONS = {
  slash: { label: 'Monarch Slash', hint: 'Evolved Slash. Black-violet blade pressure scales with shadow sovereignty.' },
  dashStrike: { label: 'Abyss Dash', hint: 'Evolved Dash Strike. Vanish through the enemy line and strike from the dark.' },
  manaGuard: { label: 'Monarch Guard', hint: 'Evolved Mana Guard. Purple-black armor absorbs pressure and restores command.' },
  conserve: { label: 'Shadow Recovery', hint: 'Evolved Conserve. Pull mana from the Domain without giving up control.' },
  analyzeWeakness: { label: 'Sovereign Analysis', hint: 'Evolved Analyze Weakness. The System marks command breaks and fatal openings.' },
};

export const HUNTER_ITEM_CATALOG = {
  recoveryPotion: {
    id: 'recoveryPotion',
    label: 'Recovery Potion',
    type: 'consumable',
    rarity: 'common',
    cost: 400,
    description: 'Restores health and stamina for wounded Hunters.',
    effects: { health: 32, energy: 18 },
  },
  fatigueCleanse: {
    id: 'fatigueCleanse',
    label: 'Fatigue Cleanse',
    type: 'consumable',
    rarity: 'common',
    cost: 650,
    description: 'Reduces System fatigue and steadies mood.',
    effects: { systemFatigue: -34, mood: 6 },
  },
  highPotion: {
    id: 'highPotion',
    label: 'High Potion',
    type: 'consumable',
    rarity: 'rare',
    cost: 1200,
    description: 'A stronger emergency vial for deep dungeon damage.',
    effects: { health: 70, energy: 38, systemFatigue: -12 },
  },
  dungeonElixir: {
    id: 'dungeonElixir',
    label: 'Dungeon Elixir',
    type: 'consumable',
    rarity: 'rare',
    description: 'A Gate-brewed vial that patches deep dungeon damage.',
    effects: { health: 95, energy: 52, systemFatigue: -20 },
  },
  manaAmpoule: {
    id: 'manaAmpoule',
    label: 'Mana Ampoule',
    type: 'consumable',
    rarity: 'uncommon',
    description: 'Condensed mana that restores stamina before the next monster push.',
    effects: { energy: 64, mood: 4 },
  },
  knightDagger: {
    id: 'knightDagger',
    label: 'Knight Dagger',
    type: 'weapon',
    rarity: 'uncommon',
    cost: 2500,
    description: 'Unlocks Shadow Pierce, a precise low-cost weapon skill.',
    moveId: 'shadowPierce',
  },
  manaLongsword: {
    id: 'manaLongsword',
    label: 'Mana Longsword',
    type: 'weapon',
    rarity: 'rare',
    cost: 5200,
    description: 'Unlocks Mana Rend, a heavier sword arc for armored monsters.',
    moveId: 'manaRend',
  },
  reaperScythe: {
    id: 'reaperScythe',
    label: 'Reaper Scythe',
    type: 'weapon',
    rarity: 'epic',
    cost: 9000,
    description: 'Unlocks Reaping Arc, a brutal late-fight execution sweep.',
    moveId: 'reapingArc',
  },
  monsterCore: {
    id: 'monsterCore',
    label: 'Monster Core',
    type: 'material',
    rarity: 'common',
    description: 'A basic monster core used for weapons, recovery items, and shadow command crafting.',
  },
  gateShard: {
    id: 'gateShard',
    label: 'Gate Shard',
    type: 'material',
    rarity: 'uncommon',
    description: 'A cracked Gate fragment used to refine System weapons and stabilize shadow sigils.',
  },
  bossEssence: {
    id: 'bossEssence',
    label: 'Boss Essence',
    type: 'material',
    rarity: 'rare',
    description: 'A boss echo condensed into material form for shadow strengthening and higher recipes.',
  },
  redGateShard: {
    id: 'redGateShard',
    label: 'Red Gate Shard',
    type: 'material',
    rarity: 'epic',
    description: 'A volatile Red Gate fragment used for Monarch Vials and late-game war preparation.',
  },
  shadowSigil: {
    id: 'shadowSigil',
    label: 'Shadow Sigil',
    type: 'special',
    rarity: 'rare',
    description: 'A command seal that permanently raises shadow army pressure for Domain conquest.',
    effects: { shadowArmyPower: 16, systemFatigue: -8 },
  },
  monarchVial: {
    id: 'monarchVial',
    label: 'Monarch Vial',
    type: 'special',
    rarity: 'epic',
    description: 'A one-use System item that grants a Hunter stat point and cuts fatigue.',
    effects: { hunterStatPoints: 1, systemFatigue: -25 },
  },
  awakeningRune: {
    id: 'awakeningRune',
    label: 'Awakening Rune',
    type: 'special',
    rarity: 'legendary',
    description: 'A rare boss rune that permanently raises every Hunter stat by 1.',
    effects: { allHunterStats: 1 },
  },
};

export const SYSTEM_SHOP_ITEMS = Object.fromEntries(
  Object.entries(HUNTER_ITEM_CATALOG).filter(([, item]) => Number.isFinite(item.cost))
);

export const HUNTER_LEVEL_REWARD_OPTIONS = {
  strengthBoost: { id: 'strengthBoost', type: 'hunterStat', stat: 'strength', amount: 2, label: '+2 Hunter Strength' },
  vitalityBoost: { id: 'vitalityBoost', type: 'hunterStat', stat: 'vitality', amount: 2, label: '+2 Hunter Vitality' },
  senseBoost: { id: 'senseBoost', type: 'hunterStat', stat: 'sense', amount: 2, label: '+2 Hunter Sense' },
  allStatsBoost: { id: 'allStatsBoost', type: 'allHunterStats', amount: 1, label: '+1 all Hunter stats' },
  fatigueCleanse: { id: 'fatigueCleanse', type: 'fatigue', amount: -15, label: '-15 System Fatigue' },
  fieldRecovery: { id: 'fieldRecovery', type: 'recovery', health: 30, energy: 20, label: 'Restore 30 health and 20 stamina' },
  moneyCache: { id: 'moneyCache', type: 'money', amount: 1000, label: '+$1,000 money' },
  reputationPing: { id: 'reputationPing', type: 'reputation', amount: 8, label: '+8 reputation' },
  basicDamage: { id: 'basicDamage', type: 'perk', perk: 'basicDamagePlus5', tier: 'basic', maxStacks: 10, label: 'Basic Damage: +5% basic attack damage per stack', description: 'Hunter basic attacks except Conserve deal +5% damage per stack. The Hunter fight log shows the damage boost when it applies.' },
  specialEfficiency: { id: 'specialEfficiency', type: 'perk', perk: 'specialStaminaMinus2', tier: 'basic', maxStacks: 10, label: 'Special Efficiency: -2 stamina cost per stack', description: 'Every Special Move costs 2 less stamina per stack. The fight log shows the discount when you use a Special Move.' },
  conserveMastery: { id: 'conserveMastery', type: 'perk', perk: 'conservePlus6', tier: 'basic', maxStacks: 10, label: 'Conserve Mastery: +6 stamina recovery per stack', description: 'Conserve restores 6 extra stamina per stack. The log shows the total Conserve recovery each time.' },
  manaGuardMastery: { id: 'manaGuardMastery', type: 'perk', perk: 'manaGuardPlus3', tier: 'basic', maxStacks: 10, label: 'Mana Guard Mastery: +3 damage reduction per stack', description: 'Mana Guard reduces incoming monster damage by 3 more per stack. The fight log shows the extra guard reduction.' },
  dashStrikeMastery: { id: 'dashStrikeMastery', type: 'perk', perk: 'dashStrikePlus4', tier: 'basic', maxStacks: 10, label: 'Dash Strike Mastery: +4 damage per stack', description: 'Dash Strike gains 4 flat damage per stack. The fight log calls out the bonus when Dash Strike is used.' },
  perfectFootwork: { id: 'perfectFootwork', type: 'perk', perk: 'perfectFootwork', tier: 'basic', maxStacks: 1, label: 'Perfect Footwork: Dash Strike primes a miss window', description: 'After you use Dash Strike, the next monster attack has reduced accuracy. The log triggers when the miss window is consumed.' },
  manaThreading: { id: 'manaThreading', type: 'perk', perk: 'manaThreading', tier: 'basic', maxStacks: 1, label: 'Mana Threading: Mana Guard refunds stamina', description: 'When Mana Guard blocks meaningful damage, it refunds stamina based on the block. The log shows the stamina refunded.' },
  predatorRhythm: { id: 'predatorRhythm', type: 'perk', perk: 'predatorRhythm', tier: 'basic', maxStacks: 3, label: 'Predator Rhythm: alternating basics stack damage', description: 'Using a different Basic Move than your previous Hunter exchange builds a stacking damage bonus, up to the perk stack count.' },
  vitalPulse: { id: 'vitalPulse', type: 'perk', perk: 'vitalPulse', tier: 'basic', maxStacks: 1, label: 'Vital Pulse: Conserve heals at low health', description: 'When Hunter health is at or below half, Conserve also restores health. The fight log shows the heal amount.' },
  executeCooldown: { id: 'executeCooldown', type: 'perk', perk: 'executeCooldownMinus1', tier: 'rare', maxStacks: 5, label: 'Execute Cooldown: -1 cooldown exchange per stack', description: 'Execute sets a shorter cooldown after use, reduced by 1 exchange per stack to a minimum of 1. The log shows the reduced cooldown.' },
  analysisCrit: { id: 'analysisCrit', type: 'perk', perk: 'analysisCritPlus3', tier: 'rare', maxStacks: 5, label: 'Analysis Crit: +3% crit/read chance per stack', description: 'After Analyze Weakness, the next attacking move gains +3% crit/read chance per stack. The log shows when analysis crit pressure is active.' },
  shadowDamage: { id: 'shadowDamage', type: 'perk', perk: 'shadowDamagePlus8', tier: 'rare', maxStacks: 5, label: 'Shadow Pressure: +8% shadow skill damage per stack', description: 'In Hunter fights, shadow-linked System skills gain +8% damage per stack when you have shadows. This does not change Domain War power.' },
  weaponSkillDamage: { id: 'weaponSkillDamage', type: 'perk', perk: 'weaponSkillPlus10', tier: 'rare', maxStacks: 5, label: 'Weapon Skill Damage: +10% weapon skill damage per stack', description: 'Hunter moves tagged as weapon skills deal +10% damage per stack. The log shows when weapon skill damage applies.' },
  fractureMark: { id: 'fractureMark', type: 'perk', perk: 'fractureMark', tier: 'rare', maxStacks: 1, label: 'Fracture Mark: Analyze Weakness marks for Execute', description: 'Analyze Weakness places a mark. Execute consumes that mark for bonus damage and logs the detonation.' },
  afterimageChain: { id: 'afterimageChain', type: 'perk', perk: 'afterimageChain', tier: 'rare', maxStacks: 1, label: 'Afterimage Chain: Dash Strike can cut cooldowns', description: 'Dash Strike has a chance to reduce all active Special Move cooldowns by 1. The log shows when it triggers.' },
  bloodScent: { id: 'bloodScent', type: 'perk', perk: 'bloodScent', tier: 'rare', maxStacks: 1, label: 'Blood Scent: bonus damage to wounded monsters', description: 'Attacking a monster below 35% health deals bonus damage. The fight log shows when Blood Scent amplifies the hit.' },
  coreSight: { id: 'coreSight', type: 'perk', perk: 'coreSight', tier: 'rare', maxStacks: 1, label: 'Core Sight: analysis follow-ups hit bosses harder', description: 'Against boss or Monarch threats, attacks after Analyze Weakness deal extra damage. The log shows when a boss core is exposed.' },
  monarchExecution: { id: 'monarchExecution', type: 'perk', perk: 'monarchExecution', tier: 'special', maxStacks: 1, label: 'Monarch Execution: Execute crushes wounded monsters', description: 'Execute gains a large bonus when the monster has lost at least 65% health. The log shows when the finisher bonus activates.' },
  absoluteGuard: { id: 'absoluteGuard', type: 'perk', perk: 'absoluteGuard', tier: 'special', maxStacks: 1, label: 'Absolute Guard: Mana Guard restores stamina', description: 'Mana Guard restores extra stamina after guarding. The fight log shows the recovery amount.' },
  rulersAuthority: { id: 'rulersAuthority', type: 'perk', perk: 'rulersAuthority', tier: 'special', maxStacks: 1, label: "Ruler's Authority: shadow command pressure in fights", description: 'When you have shadows, shadow-linked Hunter skills gain command pressure and extra damage in Hunter fights. This does not change Domain War power.' },
  systemOverclock: { id: 'systemOverclock', type: 'perk', perk: 'systemOverclock', tier: 'special', maxStacks: 1, label: 'System Overclock: +12 flat basic damage', description: 'All damaging Basic Moves gain +12 flat damage. The fight log shows Overclock when the bonus is applied.' },
  blackFlash: { id: 'blackFlash', type: 'perk', perk: 'blackFlash', tier: 'special', maxStacks: 1, label: 'Black Flash: basic moves can spike critical damage', description: 'Damaging Basic Moves have a low chance to become a black System strike for much higher damage and unique log text.' },
  limitBreakProtocol: { id: 'limitBreakProtocol', type: 'perk', perk: 'limitBreakProtocol', tier: 'special', maxStacks: 1, label: 'Limit Break Protocol: one low-health emergency boost', description: 'Once per Hunter fight, dropping to 25% health or lower grants emergency stamina, score, and damage. The log shows when it fires.' },
  executionWindow: { id: 'executionWindow', type: 'perk', perk: 'executionWindow', tier: 'special', maxStacks: 1, label: 'Execution Window: Execute spikes after an outread', description: 'Execute deals extra damage right after the monster misses or you heavily outread it. The log shows when the window opens.' },
  abyssalLeech: { id: 'abyssalLeech', type: 'perk', perk: 'abyssalLeech', tier: 'ultimate', maxStacks: 1, label: 'Abyssal Leech: unlock lifesteal System move', description: 'Unlocks Abyssal Leech, a Special Move that damages the monster and restores Hunter health based on damage dealt.' },
  monarchsInstinct: { id: 'monarchsInstinct', type: 'perk', perk: 'monarchsInstinct', tier: 'ultimate', maxStacks: 1, label: "Monarch's Instinct: evolved skills gain black-violet pressure", description: 'After Shadow Monarch transformation, evolved skills gain bonus damage, reduction, cooldown pressure, and black-violet fight log text.' },
};

function clanPasswordHint(progress = 0) {
  const revealed = clamp(Math.floor(progress), 0, SECRET_CLAN_PASSWORD.length);
  return SECRET_CLAN_PASSWORD
    .split('')
    .map((character, index) => (index < revealed ? character : '_'))
    .join(' ');
}

function isMishimeClan(clan) {
  return clan?.name === DEVIL_GENE_CLAN_NAME;
}

function normalizeClanAwakening(life) {
  if (!isMishimeClan(life?.clan)) return null;
  const awakening = life.clanAwakening ?? {};
  return {
    stage: clamp(awakening.stage ?? DEFAULT_CLAN_AWAKENING.stage, 0, 3),
    control: clamp(awakening.control ?? DEFAULT_CLAN_AWAKENING.control),
    corruption: clamp(awakening.corruption ?? DEFAULT_CLAN_AWAKENING.corruption),
    lastAwakeningMonth: awakening.lastAwakeningMonth ?? null,
  };
}

function withNormalizedClanAwakening(life) {
  return {
    ...life,
    clanAwakening: normalizeClanAwakening(life),
  };
}

function defaultHunterWorld() {
  return clone(DEFAULT_HUNTER_WORLD);
}

function normalizeHunterStats(stats = {}) {
  return Object.fromEntries(
    Object.keys(DEFAULT_HUNTER_STATS).map((stat) => [stat, Math.max(0, Math.floor(stats?.[stat] ?? DEFAULT_HUNTER_STATS[stat]))])
  );
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

function normalizeSystemPerks(perks = []) {
  if (!Array.isArray(perks)) return [];
  const stacks = new Map();
  const validPerks = new Set(Object.values(HUNTER_LEVEL_REWARD_OPTIONS).filter((option) => option.type === 'perk').map((option) => option.perk));
  for (const entry of perks) {
    const id = typeof entry === 'string' ? entry : entry?.id ?? entry?.perk;
    if (!id || !validPerks.has(id)) continue;
    const quantity = typeof entry === 'string' ? 1 : Math.max(1, Math.floor(entry.count ?? entry.quantity ?? 1));
    stacks.set(id, (stacks.get(id) ?? 0) + quantity);
  }
  return [...stacks.entries()].map(([id, count]) => {
    const option = systemPerkOption(id);
    return { id, count: Math.min(count, option?.maxStacks ?? 1) };
  });
}

function systemPerkOption(perkId) {
  return Object.values(HUNTER_LEVEL_REWARD_OPTIONS).find((option) => option.type === 'perk' && option.perk === perkId) ?? null;
}

function hunterItemQuantity(hunterWorld, itemId) {
  return normalizeHunterInventory(hunterWorld?.inventory).find((item) => item.id === itemId)?.quantity ?? 0;
}

function hunterHasItem(hunterWorld, itemId) {
  return hunterItemQuantity(hunterWorld, itemId) > 0;
}

function addHunterItem(hunterWorld, itemId, quantity = 1) {
  if (!HUNTER_ITEM_CATALOG[itemId]) return false;
  const inventory = normalizeHunterInventory(hunterWorld.inventory);
  const existing = inventory.find((item) => item.id === itemId);
  if (existing) existing.quantity += Math.max(1, Math.floor(quantity));
  else inventory.push({ id: itemId, quantity: Math.max(1, Math.floor(quantity)) });
  hunterWorld.inventory = inventory;
  return true;
}

function consumeHunterItem(hunterWorld, itemId) {
  return consumeHunterItemQuantity(hunterWorld, itemId, 1);
}

function consumeHunterItemQuantity(hunterWorld, itemId, quantity = 1) {
  const inventory = normalizeHunterInventory(hunterWorld.inventory);
  const existing = inventory.find((item) => item.id === itemId);
  if (!existing) return false;
  const amount = Math.max(1, Math.floor(quantity));
  if (existing.quantity < amount) return false;
  existing.quantity -= amount;
  hunterWorld.inventory = inventory.filter((item) => item.quantity > 0);
  if (hunterWorld.equippedWeapon === itemId && !hunterHasItem(hunterWorld, itemId)) hunterWorld.equippedWeapon = null;
  return true;
}

function normalizeHunterMilestones(milestones = {}) {
  return {
    promotions: Array.isArray(milestones.promotions) ? [...new Set(milestones.promotions.filter((rank) => HUNTER_RANKS.includes(rank)))] : [],
    shadowsExtracted: Math.max(0, Math.floor(milestones.shadowsExtracted ?? 0)),
    monarchSteps: Math.max(0, Math.floor(milestones.monarchSteps ?? 0)),
    craftedItems: Math.max(0, Math.floor(milestones.craftedItems ?? 0)),
  };
}

function normalizeHunterItemUpgrades(upgrades = {}) {
  return Object.fromEntries(
    Object.entries(upgrades ?? {})
      .filter(([itemId]) => Boolean(HUNTER_ITEM_CATALOG[itemId]))
      .map(([itemId, level]) => [itemId, clamp(level ?? 0, 0, 5)])
  );
}

function normalizeMonarchTrace(trace = {}) {
  return {
    unlocked: Boolean(trace.unlocked),
    stage: clamp(trace.stage ?? 0, 0, 4),
    influence: clamp(trace.influence ?? 0, 0, 100),
    completed: Boolean(trace.completed),
  };
}

function normalizeDomainMap(map = {}) {
  const conquered = Array.isArray(map.conquered)
    ? [...new Set(map.conquered.filter((id) => SHADOW_DOMAIN_TEMPLATES.some((domain) => domain.id === id)))]
    : [];
  return {
    conquered,
    lastBattle: map.lastBattle ?? null,
    completed: Boolean(map.completed) || conquered.length >= SHADOW_DOMAIN_TEMPLATES.length,
  };
}

function normalizeShadowMonarch(shadowMonarch = {}) {
  return {
    unlocked: Boolean(shadowMonarch.unlocked),
    transformedMonth: shadowMonarch.transformedMonth ?? null,
    evolvedSkills: Boolean(shadowMonarch.evolvedSkills),
    powersLost: Boolean(shadowMonarch.powersLost),
  };
}

function normalizeMonarchWar(war = {}) {
  return {
    unlocked: Boolean(war.unlocked),
    defeated: Array.isArray(war.defeated)
      ? [...new Set(war.defeated.filter((id) => MONARCH_BOSSES.some((boss) => boss.id === id)))]
      : [],
    finalChoiceUnlocked: Boolean(war.finalChoiceUnlocked),
    lastBattle: war.lastBattle ?? null,
  };
}

function normalizeSystemEnding(ending) {
  if (!ending || !['closePortals', 'defendPlanet'].includes(ending.choice)) return null;
  return {
    choice: ending.choice,
    chosenMonth: ending.chosenMonth ?? null,
  };
}

function normalizeHunterDailyQuest(quest) {
  if (!quest) return null;
  const stages = Array.isArray(quest.stages) ? quest.stages : [];
  const outcome = ['won', 'lost', 'retreated', 'fatal'].includes(quest.outcome)
    ? quest.outcome
    : quest.completed
      ? (quest.failed ? 'lost' : 'won')
      : null;
  return {
    ...quest,
    stageIndex: Math.max(0, Math.floor(quest.stageIndex ?? 0)),
    stages,
    startedMonth: quest.startedMonth ?? null,
    completed: Boolean(quest.completed),
    failed: Boolean(quest.failed),
    outcome,
    monsterFightId: quest.monsterFightId ?? null,
    rewardsPreview: Array.isArray(quest.rewardsPreview) ? quest.rewardsPreview : [],
    stageResults: Array.isArray(quest.stageResults) ? quest.stageResults : [],
  };
}

function normalizeHunterGateOffer(offer) {
  if (!offer || !HUNTER_DUNGEON_TIERS[offer.rank]) return null;
  return {
    ...offer,
    isRedGate: Boolean(offer.isRedGate),
    danger: Boolean(offer.danger),
    encounters: Array.isArray(offer.encounters) ? offer.encounters : [],
    rewardsPreview: offer.rewardsPreview ?? {},
  };
}

function normalizeActiveHunterDungeon(dungeon) {
  if (!dungeon || !HUNTER_DUNGEON_TIERS[dungeon.rank]) return null;
  return {
    ...dungeon,
    isRedGate: Boolean(dungeon.isRedGate),
    encounters: Array.isArray(dungeon.encounters) ? dungeon.encounters : [],
    encounterIndex: Math.max(0, Math.floor(dungeon.encounterIndex ?? 0)),
    carriedHealth: dungeon.carriedHealth ?? null,
    carriedStamina: dungeon.carriedStamina ?? null,
    rewardsEarned: Array.isArray(dungeon.rewardsEarned) ? dungeon.rewardsEarned : [],
    completed: Boolean(dungeon.completed),
    retreated: Boolean(dungeon.retreated),
    failed: Boolean(dungeon.failed),
    bossDefeated: Boolean(dungeon.bossDefeated),
    outcome: dungeon.outcome ?? null,
    redGateTriggered: Boolean(dungeon.redGateTriggered),
  };
}

function hunterRankPower(rank) {
  const index = HUNTER_RANKS.indexOf(rank);
  return index >= 0 ? index + 1 : 1;
}

function shadowStrength(shadow = {}) {
  const monster = HUNTER_MONSTERS[shadow.monsterId] ?? HUNTER_MONSTERS[shadow.sourceMonsterId] ?? null;
  const storedPower = Number.isFinite(shadow.power) ? Math.max(1, Math.round(shadow.power / 18)) : 0;
  const storedStrength = Number.isFinite(shadow.strength) ? Math.max(1, Math.floor(shadow.strength)) : 0;
  const rankPower = hunterRankPower(shadow.rank ?? monster?.tier);
  const monsterPower = monster?.power ? Math.max(1, Math.round(monster.power / 90)) : 0;
  return Math.max(1, storedStrength, storedPower, rankPower + monsterPower);
}

function shadowRole(monster = {}, rank = 'E') {
  const style = `${monster.style ?? ''} ${monster.temperament ?? ''}`.toLowerCase();
  if (style.includes('caster') || style.includes('lance') || style.includes('array')) return 'mage';
  if (style.includes('guard') || style.includes('sentinel') || style.includes('warden') || style.includes('golem')) return 'tank';
  if (style.includes('ambush') || style.includes('stalker') || style.includes('fang')) return 'assassin';
  return HUNTER_RANKS.indexOf(rank) >= HUNTER_RANKS.indexOf('A') ? 'elite' : 'vanguard';
}

function shadowArmyPower(hunterWorld) {
  const hunter = normalizeHunterWorld(hunterWorld);
  const base = hunter.shadowArmy.reduce((sum, shadow) => sum + (shadow.armyPower ?? shadowStrength(shadow) * 10), 0);
  const sigilBonus = hunter.shadowSigilPower ?? 0;
  return Math.max(0, Math.floor(base + sigilBonus));
}

function normalizeShadowArmy(shadowArmy = []) {
  if (!Array.isArray(shadowArmy)) return [];
  return shadowArmy
    .filter(Boolean)
    .map((shadow, index) => {
      const monster = HUNTER_MONSTERS[shadow.monsterId] ?? HUNTER_MONSTERS[shadow.sourceMonsterId] ?? null;
      const rank = shadow.rank ?? monster?.tier ?? DEFAULT_HUNTER_WORLD.rank;
      return {
        ...shadow,
        id: typeof shadow.id === 'string' ? shadow.id : `shadow-${index + 1}`,
        name: typeof shadow.name === 'string' ? shadow.name : 'Extracted Shadow',
        monsterId: shadow.monsterId ?? shadow.sourceMonsterId ?? null,
        rank,
        strength: shadowStrength({ ...shadow, rank }),
        role: shadow.role ?? shadowRole(monster, rank),
        armyPower: Math.max(1, Math.floor(shadow.armyPower ?? shadowStrength({ ...shadow, rank }) * 10)),
      };
    });
}

function shadowArmyStrength(hunterWorld) {
  return (hunterWorld?.shadowArmy ?? []).reduce((sum, shadow) => sum + shadowStrength(shadow), 0);
}

function isAriseEligibleBoss(monsterId) {
  const monster = HUNTER_MONSTERS[monsterId] ?? null;
  if (!monster) return false;
  const threat = `${monster.threat ?? ''}`.toLowerCase();
  return threat.includes('boss') || threat.includes('monarch') || monsterId?.startsWith('red');
}

function normalizeArisePrompt(prompt) {
  if (!prompt?.monsterId || !HUNTER_MONSTERS[prompt.monsterId]) return null;
  const monster = HUNTER_MONSTERS[prompt.monsterId];
  const attemptsUsed = clamp(Math.floor(prompt.attemptsUsed ?? 0), 0, 3);
  const attemptsLeft = clamp(Math.floor(prompt.attemptsLeft ?? (3 - attemptsUsed)), 0, 3);
  const status = ['active', 'success', 'failed'].includes(prompt.status) ? prompt.status : (attemptsLeft > 0 ? 'active' : 'failed');
  return {
    monsterId: prompt.monsterId,
    source: typeof prompt.source === 'string' ? prompt.source : 'boss',
    sourceBoss: typeof prompt.sourceBoss === 'string' ? prompt.sourceBoss : monster.name,
    rank: HUNTER_RANKS.includes(prompt.rank) ? prompt.rank : monster.tier,
    attemptsLeft,
    attemptsUsed,
    status,
    resultText: typeof prompt.resultText === 'string' ? prompt.resultText : '',
    shadowName: typeof prompt.shadowName === 'string' ? prompt.shadowName : null,
    createdMonth: prompt.createdMonth ?? null,
  };
}

function createArisePrompt(life, monsterId, source = 'boss') {
  if (!isAriseEligibleBoss(monsterId)) return null;
  const monster = HUNTER_MONSTERS[monsterId];
  return {
    monsterId,
    source,
    sourceBoss: monster.name,
    rank: monster.tier,
    attemptsLeft: 3,
    attemptsUsed: 0,
    status: 'active',
    resultText: '',
    shadowName: null,
    createdMonth: lifeMonth(life),
  };
}

function queueArisePrompt(life, monsterId, source = 'boss') {
  const prompt = createArisePrompt(life, monsterId, source);
  if (!prompt) return false;
  if (life.hunterWorld.pendingLevelRewards?.length) life.hunterWorld.pendingArisePrompt = prompt;
  else life.hunterWorld.arisePrompt = prompt;
  life.hunterWorld.lastBossCleared = null;
  return true;
}

function activatePendingArisePrompt(hunterWorld) {
  if (hunterWorld.pendingLevelRewards?.length || hunterWorld.arisePrompt || !hunterWorld.pendingArisePrompt) return;
  hunterWorld.arisePrompt = hunterWorld.pendingArisePrompt;
  hunterWorld.pendingArisePrompt = null;
}

function ariseSuccessChance(hunter, prompt) {
  const monster = HUNTER_MONSTERS[prompt.monsterId] ?? null;
  const rankIndex = Math.max(0, HUNTER_RANKS.indexOf(monster?.tier ?? prompt.rank ?? hunter.rank));
  const hunterRankIndex = Math.max(0, HUNTER_RANKS.indexOf(hunter.rank));
  const monarchBonus = `${monster?.threat ?? ''}`.includes('Monarch') ? 0.06 : 0;
  return clampFloat(
    0.18 + hunter.level * 0.006 + hunter.stats.sense * 0.006 + hunter.stats.intelligence * 0.005 + hunterRankIndex * 0.025 + rankIndex * 0.02 + monarchBonus,
    0.1,
    0.82
  );
}

function createShadowFromBoss(life, monsterId, source = 'ARISE') {
  const monster = HUNTER_MONSTERS[monsterId] ?? null;
  const rank = monster?.tier ?? life.hunterWorld.rank;
  const power = 35 + life.hunterWorld.level * 4 + (monster?.power ?? 0) / 3;
  const strength = shadowStrength({ monsterId, rank, power });
  const role = shadowRole(monster, rank);
  return {
    id: `${monsterId}-${life.hunterWorld.shadowArmy.length + 1}`,
    monsterId,
    name: `${monster?.name ?? labelFromId(monsterId)} Shadow`,
    sourceBoss: monster?.name ?? labelFromId(monsterId),
    source,
    extractedMonth: lifeMonth(life),
    rank,
    role,
    strength,
    armyPower: strength * 14 + Math.floor((monster?.power ?? 0) / 8),
    power,
  };
}

function normalizeHunterWorld(hunterWorld = {}) {
  const rank = HUNTER_RANKS.includes(hunterWorld.rank) ? hunterWorld.rank : DEFAULT_HUNTER_WORLD.rank;
  return {
    ...defaultHunterWorld(),
    ...hunterWorld,
    unlocked: Boolean(hunterWorld.unlocked),
    playerAwakened: Boolean(hunterWorld.playerAwakened),
    rank,
    xp: Math.max(0, Math.floor(hunterWorld.xp ?? 0)),
    level: Math.max(1, Math.floor(hunterWorld.level ?? 1)),
    statPoints: Math.max(0, Math.floor(hunterWorld.statPoints ?? 0)),
    stats: normalizeHunterStats(hunterWorld.stats),
    gatesCleared: Math.max(0, Math.floor(hunterWorld.gatesCleared ?? 0)),
    dailyQuestsCompleted: Math.max(0, Math.floor(hunterWorld.dailyQuestsCompleted ?? 0)),
    systemFatigue: clamp(hunterWorld.systemFatigue ?? 0),
    shadowArmy: normalizeShadowArmy(hunterWorld.shadowArmy),
    inventory: normalizeHunterInventory(hunterWorld.inventory),
    equippedWeapon: typeof hunterWorld.equippedWeapon === 'string' ? hunterWorld.equippedWeapon : null,
    gateOffers: Array.isArray(hunterWorld.gateOffers)
      ? hunterWorld.gateOffers.map(normalizeHunterGateOffer).filter(Boolean).slice(0, 3)
      : [],
    activeDungeon: normalizeActiveHunterDungeon(hunterWorld.activeDungeon),
    redGatePending: Boolean(hunterWorld.redGatePending),
    lastGateMonth: hunterWorld.lastGateMonth ?? null,
    rejectedUntilMonth: hunterWorld.rejectedUntilMonth ?? null,
    lastBossCleared: hunterWorld.lastBossCleared ?? null,
    arisePrompt: normalizeArisePrompt(hunterWorld.arisePrompt),
    pendingArisePrompt: normalizeArisePrompt(hunterWorld.pendingArisePrompt),
    dailyQuest: normalizeHunterDailyQuest(hunterWorld.dailyQuest),
    pendingLevelRewards: Array.isArray(hunterWorld.pendingLevelRewards) ? hunterWorld.pendingLevelRewards : [],
    unlockedSystemPerks: normalizeSystemPerks(hunterWorld.unlockedSystemPerks),
    milestones: normalizeHunterMilestones(hunterWorld.milestones),
    itemUpgrades: normalizeHunterItemUpgrades(hunterWorld.itemUpgrades),
    shadowSigilPower: Math.max(0, Math.floor(hunterWorld.shadowSigilPower ?? 0)),
    domainMap: normalizeDomainMap(hunterWorld.domainMap),
    monarchTrace: normalizeMonarchTrace(hunterWorld.monarchTrace),
    shadowMonarch: normalizeShadowMonarch(hunterWorld.shadowMonarch),
    monarchWar: normalizeMonarchWar(hunterWorld.monarchWar),
    systemEnding: normalizeSystemEnding(hunterWorld.systemEnding),
  };
}

export const CLANS = [
  {
    name: 'Sekiba',
    rarity: 'Common',
    bonuses: { durability: 6, willpower: 4, strength: 2 },
    traits: ['Labor-built frame', 'Steady grit'],
    passive: { name: 'Shift-Hardened', effect: 'Takes slightly less incoming damage when health is already low.' },
    special: { name: 'Overtime Crush', effect: 'Heavy pressure special that gains durability-based damage when health is low.' },
    drawbacks: ['No hidden-world protection'],
    options: ['Work overtime', 'Heavy-carry conditioning'],
    description: 'A grounded working-family line built around grip strength, pain tolerance, and long shifts.',
  },
  {
    name: 'Cosmoe',
    rarity: 'Uncommon',
    bonuses: { speed: 5, control: 4, flexibility: 2 },
    traits: ['Adaptable footwork', 'No inherited leash'],
    passive: { name: 'Self-Made Angles', effect: 'Counter and Conserve gain extra score when stamina is high.' },
    special: { name: 'Open Road Feint', effect: 'Mobile special that uses speed and control to steal the angle.' },
    drawbacks: ['Few early mentors'],
    options: ['Move towns', 'Learn from strangers'],
    description: 'A wandering surname line with no famous school, but excellent mobility and self-made growth.',
  },
  {
    name: 'Doppoe',
    rarity: 'Epic',
    bonuses: { durability: 12, willpower: 7, strength: 5 },
    traits: ['Iron body drills', 'Pain tolerance'],
    passive: { name: 'Iron Body', effect: 'Reduces incoming strike damage and injury risk from hard exchanges.' },
    special: { name: 'Iron Bell Rush', effect: 'Body-hardening special that absorbs impact and returns blunt force.' },
    drawbacks: ['Slower flexibility growth'],
    options: ['Body-hardening ritual', 'Endurance challenge'],
    description: 'A conditioning clan inspired by tank-like arena fighters who win by refusing to break.',
  },
  {
    name: 'Ryukoo',
    rarity: 'Rare',
    bonuses: { speed: 10, technique: 6, aggression: 5, reflexes: 3 },
    traits: ['Dirty angles', 'Evasion instinct'],
    passive: { name: 'Dirty Angles', effect: 'Pressure and Counter deal bonus damage when the opponent guard is low.' },
    special: { name: 'Serpent Angle', effect: 'Sneaky special that punishes low guard with speed and aggression.' },
    drawbacks: ['Public trust falls faster'],
    options: ['Ambush sparring', 'Nerve-point practice'],
    description: 'A snake-like surname clan that favors feints, cheap angles, and ugly wins.',
  },
  {
    name: 'Nikoo',
    rarity: 'Mythic',
    bonuses: { technique: 16, fightIq: 14, reflexes: 8, control: 4 },
    traits: ['Formless transitions', 'Redirection instinct'],
    passive: { name: 'Redirection Engine', effect: 'Counter and Defend reduce incoming damage and boost Special setup.' },
    special: { name: 'Redirection Burst', effect: 'Technique-heavy special that turns the opponent entry into your damage.' },
    drawbacks: ['Lower starting brute strength'],
    options: ['Redirection kata', 'Advance breathing drill'],
    description: 'A close-variant style line inspired by secret technique systems, redirection, and adaptive martial forms.',
  },
  {
    name: 'Kuri',
    rarity: 'Legendary',
    bonuses: { strength: 14, speed: 10, aggression: 10, reflexes: 8, reputation: 8 },
    traits: ['Removal-like burst', 'Assassin family instincts'],
    passive: { name: 'Release Burst', effect: 'Pressure and Special hit harder while stamina is high, but burn more stamina.' },
    special: { name: 'Release Limiter', effect: 'Explosive assassin special that hits harder at high stamina and costs extra gas.' },
    drawbacks: ['Clan obligations and arranged fights'],
    options: ['Release limiter', 'Assassin footwork'],
    description: 'A close-variant assassin clan inspired by inherited killer instincts and explosive body release.',
  },
  {
    name: 'Reihitoo',
    rarity: 'Epic',
    bonuses: { speed: 13, reflexes: 12, technique: 6, control: 3 },
    traits: ['Silent entries', 'Range deception'],
    passive: { name: 'Silent Entry', effect: 'First exchange Counter or Pressure gains bonus score and damage.' },
    special: { name: 'Blind-Side Entry', effect: 'Footwork special that uses speed and reflexes to strike from a lost angle.' },
    drawbacks: ['Fragile when cornered'],
    options: ['Shadow footwork', 'Blind-side entry'],
    description: 'A footwork clan inspired by vanishing-step specialists and evasive counter fighters.',
  },
  {
    name: 'Hanmo',
    rarity: 'Mythic',
    bonuses: { strength: 28, aggression: 22, durability: 16, willpower: 10, reflexes: 6 },
    traits: ['Demon-frame pressure', 'Predator aura'],
    passive: { name: 'Predator Frame', effect: 'Pressure deals extra damage and drains more opponent stamina when momentum is positive.' },
    special: { name: 'Demon Frame', effect: 'Predator special that adds huge pressure damage when momentum is positive.' },
    drawbacks: ['Legal trouble and rival obsession rise'],
    options: ['Demon-frame awakening', 'Crush a rival mentally'],
    description: 'A close-variant monster bloodline inspired by demon-back myths, predator instinct, and violent genetics.',
  },
  {
    name: 'Shibukawae',
    rarity: 'Epic',
    bonuses: { technique: 20, flexibility: 16, fightIq: 10, control: 6 },
    traits: ['Joint control', 'Soft-style counters'],
    passive: { name: 'Soft Counter Chain', effect: 'Counter and Grapple gain score, and pressure attacks hurt you less.' },
    special: { name: 'Joint Ghost Chain', effect: 'Soft-style special that uses technique and flexibility to punish force.' },
    drawbacks: ['Body conditioning is risky'],
    options: ['Joint fasting ritual', 'Counter-chain practice'],
    description: 'A soft-style house built around joint locks, counters, and leverage over raw mass.',
  },
  {
    name: 'Agitoo',
    rarity: 'Legendary',
    bonuses: { strength: 22, speed: 22, durability: 22, technique: 18, fightIq: 18, reflexes: 10 },
    traits: ['Evolution instinct', 'Elite growth ceiling'],
    passive: { name: 'Evolution Read', effect: 'Gains more score each round as the fight goes longer.' },
    special: { name: 'Adaptive Apex', effect: 'Evolution special that grows stronger in later rounds.' },
    drawbacks: ['Corporate factions notice you early'],
    options: ['Evolve mid-fight', 'Refuse a handler'],
    description: 'A close-variant champion dynasty inspired by evolving all-rounders and corporate arena kings.',
  },
  {
    name: 'Bakiya',
    rarity: 'Mythic',
    bonuses: { strength: 26, willpower: 16, aggression: 14, control: 8, durability: 8 },
    traits: ['Finisher instinct', 'Crushing pressure'],
    passive: { name: 'Crushing Finish', effect: 'Deals bonus damage when the opponent is already below half health.' },
    special: { name: 'Demon Back', effect: 'Temporarily pushes Strength, Aggression, and Willpower past the 500 limit for one special exchange.' },
    drawbacks: ['Rivals escalate faster'],
    options: ['Maw breaker', 'Dominance challenge'],
    description: 'A dragon-name clan built around finishing instincts, pressure, and terrifying one-shot openings.',
  },
  {
    name: 'Orochiya',
    rarity: 'Mythic',
    bonuses: { strength: 38, speed: 32, durability: 36, reflexes: 24, willpower: 20, aggression: 20 },
    traits: ['Ancient monster state', 'Mythic growth'],
    passive: { name: 'Ancient Monster State', effect: 'All attacks hit harder and incoming damage is slightly reduced.' },
    special: { name: 'Ancient Monster State', effect: 'Mythic special that adds damage and resistance like a final-boss form.' },
    drawbacks: ['Assassins, handlers, and legends hunt you'],
    options: ['Awaken monster state', 'Reject the blood'],
    description: 'A close-variant mythic bloodline inspired by impossible monster families, cursed talent, and final-boss genetics.',
  },
  {
    name: 'Ashura',
    rarity: 'Secret',
    bonuses: {
      strength: 58,
      speed: 54,
      durability: 50,
      technique: 60,
      fightIq: 58,
      willpower: 48,
      reflexes: 52,
      flexibility: 28,
      aggression: 44,
      control: 38,
      reputation: 40,
    },
    traits: ['Ashura state', 'War-god adaptation'],
    passive: { name: 'Ashura Read', effect: 'Every tactic gets a cleaner read, and pressure grows sharper once momentum is stable.' },
    special: { name: 'Ashura State', effect: 'Secret form that drives core combat stats far beyond the normal ceiling for one exchange.' },
    drawbacks: ['Hidden-world factions stop treating you like a rumor'],
    options: ['Enter Ashura state', 'Break the bracket'],
    description: 'A secret clan spoken about like a bad omen: complete combat adaptation, violent composure, and a ceiling that should not exist.',
  },
  {
    name: 'Mishime',
    rarity: 'Secret',
    bonuses: {
      strength: 62,
      speed: 48,
      durability: 54,
      technique: 44,
      fightIq: 42,
      willpower: 64,
      reflexes: 50,
      flexibility: 24,
      aggression: 60,
      control: 30,
      reputation: 45,
    },
    traits: ['Devil gene', 'Cursed rage inheritance'],
    passive: { name: 'Devil Gene Pressure', effect: 'Pressure and Special exchanges gain damage when health or stamina is already low.' },
    special: { name: 'Devil Gene Awakening', effect: 'A cursed burst that pushes Strength, Willpower, Aggression, and Reflexes far past normal limits for one exchange.' },
    drawbacks: ['Family wars and hidden labs hunt the bloodline'],
    options: ['Awaken devil gene', 'Resist the blood feud'],
    description: 'A secret cursed bloodline inspired by inherited devil power, family betrayal, and rage that turns survival into violence.',
  },
];

export const TRAINING_ACTIONS = {
  sparTrainingPartner: {
    name: 'Spar Training Partner',
    cost: 30,
    gains: {
      strength: 1,
      speed: 1,
      durability: 1,
      technique: 1,
      fightIq: 1,
      willpower: 1,
      reflexes: 1,
      flexibility: 1,
      aggression: 1,
      control: 1,
    },
    risk: 6,
    text: 'You bring in a live partner and let the round teach every part of your game at once.',
    popup: true,
  },
  heavyBag: {
    name: 'Heavy Bag',
    cost: 15,
    gains: { strength: 3, technique: 1 },
    risk: 2,
    text: 'You hammer the heavy bag until your shoulders burn.',
  },
  roadwork: {
    name: 'Roadwork',
    cost: 12,
    gains: { speed: 2, willpower: 2 },
    risk: 1,
    text: 'You run before sunrise and return with steadier lungs.',
  },
  ironBody: {
    name: 'Iron Body Conditioning',
    cost: 25,
    gains: { durability: 5, willpower: 2 },
    risk: 9,
    text: 'You condition your body with drills that make normal people quit.',
  },
  studyTape: {
    name: 'Study Fight Tape',
    cost: 10,
    gains: { fightIq: 4, technique: 1 },
    risk: 0,
    text: 'You study old bouts and start noticing habits before they happen.',
  },
  sparring: {
    name: 'Hard Sparring',
    cost: 20,
    gains: { technique: 3, reflexes: 2, control: 1 },
    risk: 5,
    text: 'Your sparring round turns into a small war.',
  },
  mobilityFlow: {
    name: 'Mobility Flow',
    cost: 12,
    gains: { flexibility: 4, reflexes: 1, control: 1 },
    risk: 1,
    text: 'You drill hip mobility, shoulder looseness, and weird escape angles until your body stops fighting itself.',
  },
  killerInstinct: {
    name: 'Killer Instinct Rounds',
    cost: 18,
    gains: { aggression: 4, speed: 1, willpower: 1 },
    risk: 6,
    text: 'You start rounds already behind on points and learn to take space before fear can vote.',
  },
  breathAndGuard: {
    name: 'Breath and Guard',
    cost: 10,
    gains: { control: 4, fightIq: 1, willpower: 1 },
    risk: 0,
    text: 'You hold guard under pressure, count breaths, and learn not to panic when the pocket gets loud.',
  },
  reactionWall: {
    name: 'Reaction Wall',
    cost: 14,
    gains: { reflexes: 3, speed: 1, fightIq: 1 },
    risk: 2,
    text: 'You chase tennis balls, shoulder feints, and slap counters until your hands move before your thoughts finish.',
  },
};

export const SPECIAL_TRAINING_ACTIONS = {
  undergroundLimitDrills: {
    name: 'Underground Limit Drills',
    cost: { energy: 45, money: 900 },
    capGains: { strength: 35, durability: 35, willpower: 25 },
    unlockText: 'Unlock: enter the hidden world and reach 10 total wins.',
    text: 'A private room tests how much strain your frame can legally survive. It raises the ceiling, not the stat.',
  },
  monsterFilmStudy: {
    name: 'Monster Film Study',
    cost: { energy: 35, money: 1400 },
    capGains: { technique: 40, fightIq: 45, reflexes: 35, control: 25 },
    unlockText: 'Unlock: defeat any special fighter.',
    text: 'You rebuild your game around footage of impossible fighters and learn where your current ceiling is fake.',
  },
  demonFrameAwakening: {
    name: 'Demon Frame Awakening',
    cost: { energy: 55, money: 2600 },
    capGains: { strength: 55, speed: 45, durability: 45, aggression: 35 },
    unlockText: 'Unlock: defeat Yujiri Hanmae or win at least three special fights.',
    text: 'A brutal body adaptation cycle teaches your nervous system to tolerate a higher output range.',
  },
  bracketEvolution: {
    name: 'Bracket Evolution Camp',
    cost: { energy: 60, money: 5000 },
    capGains: {
      strength: 30,
      speed: 30,
      durability: 30,
      technique: 30,
      fightIq: 30,
      willpower: 30,
      reflexes: 30,
      flexibility: 30,
      aggression: 30,
      control: 30,
    },
    unlockText: 'Unlock: become an Annihilation bracket champion.',
    text: 'A champion-only camp built around fixing every ceiling the bracket exposed.',
  },
};

export const RECOVERY_ACTIONS = {
  restDay: {
    name: 'Rest Day',
    cost: 0,
    health: 8,
    energy: 38,
    mood: 6,
    injuryHeal: 0,
    text: 'You sleep, eat, stretch, and let your body stop screaming for one day.',
  },
  clinic: {
    name: 'Sports Clinic',
    cost: 220,
    health: 22,
    energy: 12,
    mood: 3,
    injuryHeal: 1,
    text: 'The clinic patches what pride tried to ignore.',
  },
  meditation: {
    name: 'Breath Control',
    cost: 30,
    health: 6,
    energy: 18,
    mood: 16,
    injuryHeal: 0,
    stat: ['control', 2],
    text: 'You train your breathing until pain becomes information instead of panic.',
  },
  physiotherapy: {
    name: 'Physiotherapy',
    cost: 420,
    health: 30,
    energy: 8,
    mood: 4,
    injuryHeal: 2,
    text: 'Boring, expensive, and exactly what keeps a fighter alive long enough to peak.',
  },
};

export const MONEY_ACTIONS = {
  trainingCamp: {
    group: 'Fight Prep',
    name: 'Training Camp',
    cost: 1200,
    prepKey: 'trainingCamp',
    effect: '+10 next-fight stamina, +5 momentum, -3 injury risk.',
    text: 'You rent a harsh little camp where every round starts tired and ends sharper.',
  },
  scoutTape: {
    group: 'Fight Prep',
    name: 'Scout Tape Package',
    cost: 850,
    prepKey: 'scoutTape',
    requires: { reputation: 15 },
    effect: '+8 next-fight momentum, +3 Fight IQ, and an extra matchup read.',
    text: 'A tape cutter sends you patterns, tells, and the ugly habits opponents hope nobody notices.',
  },
  cornerman: {
    group: 'Fight Prep',
    name: 'Hire Cornerman',
    cost: 1500,
    prepKey: 'cornerman',
    requires: { wins: 2 },
    effect: '+12 next-fight guard and less health loss after the fight.',
    text: 'You hire a corner voice who knows when to shout, when to lie, and when to throw ice on your neck.',
  },
  privateSparring: {
    group: 'Fight Prep',
    name: 'Private Sparring Partner',
    cost: 1000,
    effect: '+3 Technique, +2 Reflexes, -10 energy.',
    text: 'A paid sparring partner gives you honest rounds and charges extra for the bruises.',
  },
  cleanMealPlan: {
    group: 'Lifestyle',
    name: 'Clean Meal Plan',
    cost: 600,
    effect: '+10 health, +12 energy, +4 mood.',
    text: 'You stop eating like survival is enough and start feeding the body you are trying to build.',
  },
  familySupport: {
    group: 'Lifestyle',
    name: 'Family Support Money',
    cost: 450,
    effect: '+10 family, +5 mood, -3 heat.',
    text: 'You cover bills at home. The house breathes easier, and fewer people ask where the money came from.',
  },
  sponsorImage: {
    group: 'Lifestyle',
    name: 'Sponsor Image Work',
    cost: 900,
    requires: { reputation: 30 },
    effect: '+10 sponsor, +6 reputation, +4 mood.',
    text: 'You buy a clean shirt, show up on time, and let sponsors imagine you can be controlled.',
  },
  homeGym: {
    group: 'Lifestyle',
    name: 'Home Gym',
    cost: 2500,
    assetKey: 'homeGym',
    effect: 'One-time asset. Future training adds +1 to one trained stat.',
    text: 'You build a private training corner where excuses have nowhere to stand.',
  },
  backAlleyDoctor: {
    group: 'Black Market',
    name: 'Back-Alley Doctor',
    cost: 1200,
    requires: { hiddenWorldOrInjury: true },
    effect: 'Removes one injury, +18 health, +8 heat, -3 mood.',
    text: 'The doctor does not ask for ID, only cash, silence, and a pain tolerance.',
  },
  illegalBoutTip: {
    group: 'Black Market',
    name: 'Illegal Bout Tip',
    cost: 1500,
    requires: { reputation: 25 },
    effect: 'Unlocks hidden world if needed, +8 reputation, +12 heat.',
    text: 'You pay for a name, a door, and a time nobody writes down.',
  },
  experimentalConditioning: {
    group: 'Black Market',
    name: 'Experimental Conditioning',
    cost: 1800,
    effect: '+5 Strength, +5 Durability, +4 Willpower, -14 health, +6 heat, injury risk.',
    text: 'The method sounds illegal because the human body was not consulted.',
  },
  clanIntel: {
    group: 'Black Market',
    name: 'Clan Intel Broker',
    cost: 2200,
    requires: { hiddenWorld: true },
    effect: '+2 clan rerolls, +5 heat.',
    text: 'A broker sells rumors about bloodlines, marriages, discarded names, and who is hiding what.',
  },
};

export const SOCIAL_ACTIONS = {
  trainingClip: {
    group: 'Content',
    name: 'Post Training Clip',
    effect: '+followers, +reputation. Scales with visible stats.',
    text: 'You post clean rounds, heavy bag work, and the parts of training that look easier than they feel.',
    followers: 450,
    reputation: 3,
    mood: 1,
  },
  fightHighlight: {
    group: 'Content',
    name: 'Post Fight Highlight',
    requires: { fights: 1 },
    effect: 'Bigger follower gain after wins and dangerous fights. Underground clips add heat.',
    text: 'You cut together the cleanest moments from your last fight and let the feed argue about how real it was.',
    followers: 900,
    reputation: 5,
    heat: 3,
  },
  injuryUpdate: {
    group: 'Content',
    name: 'Reveal Injury Update',
    requires: { injury: true },
    effect: '+mood and sympathy followers, but a little less intimidation.',
    text: 'You show enough of the damage to make fans understand the cost without giving opponents the full report.',
    followers: 650,
    mood: 5,
    reputation: 1,
  },
  clanMystery: {
    group: 'Content',
    name: 'Mysterious Clan Post',
    effect: 'Rare bloodlines gain more followers, reputation, and heat.',
    text: 'You post a shadowed clip of the clan style and let people guess what bloodline they are looking at.',
    followers: 700,
    reputation: 4,
    heat: 4,
  },
  livestreamSparring: {
    group: 'Risk',
    name: 'Livestream Sparring',
    effect: '+money and followers, -energy, chance of heat from leaked hard rounds.',
    text: 'You turn sparring into a live room. The viewers pay attention when the rounds stop looking friendly.',
    followers: 800,
    reputation: 3,
    money: 180,
    energy: -8,
    heat: 2,
  },
  sponsorPost: {
    group: 'Sponsor',
    name: 'Sponsor-Friendly Post',
    requires: { followers: 5000 },
    effect: '+money, +sponsor, small heat reduction. Scales with followers.',
    text: 'You give sponsors the clean version: discipline, recovery, a decent shirt, and no blood on camera.',
    followers: 300,
    money: 450,
    sponsor: 6,
    heat: -2,
    mood: 1,
  },
};

export const SOCIAL_TRASH_TALK_STYLES = {
  respectful: {
    name: 'Respectful Callout',
    followersMultiplier: 0.9,
    reputation: 4,
    heat: 3,
    mood: 1,
    rewardMultiplier: 1.15,
    opponentMomentum: 5,
    backlashMultiplier: 0.65,
    text: 'You call for the fight without acting like the opponent is a joke. Fans like the confidence, sponsors can survive it.',
  },
  disrespectful: {
    name: 'Disrespectful Trash Talk',
    followersMultiplier: 1.45,
    reputation: 8,
    heat: 10,
    mood: 2,
    rewardMultiplier: 1.35,
    opponentMomentum: 14,
    backlashMultiplier: 1.25,
    text: 'You make it personal. The clip travels fast, and so does the price of being wrong.',
  },
  exposeWeakness: {
    name: 'Expose Weakness',
    followersMultiplier: 1.15,
    reputation: 6,
    heat: 6,
    mood: 1,
    rewardMultiplier: 1.25,
    opponentMomentum: 8,
    backlashMultiplier: 0.9,
    fightIqRequired: 120,
    text: 'You break down the opponent on camera and point at the exact habits you think will lose them the fight.',
  },
  clanFlex: {
    name: 'Clan Flex',
    followersMultiplier: 1.25,
    reputation: 7,
    heat: 9,
    mood: 2,
    rewardMultiplier: 1.28,
    opponentMomentum: 10,
    backlashMultiplier: 1,
    text: 'You put the bloodline in the caption and let the comments turn ancestry into pressure.',
  },
};

export const FIGHT_TACTICS = {
  pressure: {
    label: 'Pressure',
    hint: 'Cut off space, make them defend first, and trade stamina for initiative and damage.',
  },
  counter: {
    label: 'Counter',
    hint: 'Let them show the entry, move second, and punish the exposed recovery.',
  },
  grapple: {
    label: 'Takedowns',
    hint: 'Enter on the hips or legs, force the fight to the ground, and start the submission game.',
  },
  defend: {
    label: 'Defend',
    hint: 'Improve guard, reduce incoming damage, and collect reads without forcing offense.',
  },
  conserve: {
    label: 'Conserve',
    hint: 'Reset range, recover stamina, and lower the pace at the cost of immediate damage.',
  },
  special: {
    label: 'Special',
    hint: 'Use your clan or style burst for a high-cost swing with bigger upside and risk.',
  },
};

export const FIGHT_MOVES = {
  pressure: {
    category: 'pressure',
    label: 'Pressure',
    hint: 'Basic forward pressure. Best when your strength, aggression, and stamina are ahead.',
    unlockedByDefault: true,
  },
  jab: {
    category: 'pressure',
    label: 'Jab',
    hint: 'Low-risk lead hand. Scores on range, interrupts entries, and costs little stamina.',
    unlockType: 'basic',
    statBonuses: { speed: 0.18, technique: 0.14 },
    damageBonus: 0.08,
    staminaDelta: -4,
    text: [
      'Jab: you occupy the lead lane and make them reset before they can load power.',
      'Jab: the straight touch lands first, forcing their guard to react before their feet are set.',
      'Jab: you use the lead hand to mark distance and keep their entry from building cleanly.',
    ],
    finish: [
      'Jab finish: repeated straight touches have taken their stance away, and the last one drops them.',
      'Jab finish: they wait for the power shot, but the lead hand lands clean on the open line.',
    ],
  },
  bodyShot: {
    category: 'pressure',
    label: 'Body Shot',
    hint: 'Targets stamina and posture. Stronger late when the opponent is already slowing.',
    unlockType: 'basic',
    statBonuses: { strength: 0.18, aggression: 0.12 },
    damageBonus: 0.14,
    staminaDelta: 1,
    text: [
      'Body Shot: you change levels under the guard and attack the ribs before they can brace.',
      'Body Shot: the shot lands under the elbow and immediately taxes their breathing.',
      'Body Shot: you give up head-hunting to bank stamina damage for later exchanges.',
    ],
    finish: [
      'Body Shot finish: the earlier body damage stacks up, and they fold before they can answer.',
      'Body Shot finish: their high guard stays intact, but their breathing fails underneath it.',
    ],
  },
  lowKickChop: {
    category: 'pressure',
    label: 'Low Kick Chop',
    hint: 'Attacks the lead leg. Reduces mobility and makes later exits slower.',
    unlockType: 'basic',
    statBonuses: { speed: 0.1, strength: 0.12, fightIq: 0.08 },
    damageBonus: 0.1,
    staminaDelta: 2,
    text: [
      'Low Kick Chop: you hit the lead leg and make their next exit less reliable.',
      'Low Kick Chop: the kick lands at the base, forcing them to check their stance before attacking.',
      'Low Kick Chop: you ignore the head and tax the footwork that keeps it safe.',
    ],
    finish: [
      'Low Kick Chop finish: the damaged base gives out, and the follow-up lands as they square up.',
      'Low Kick Chop finish: their stance collapses just long enough for the final shot to arrive.',
    ],
  },
  blitzStep: {
    category: 'pressure',
    label: 'Blitz Step',
    hint: 'Fast range entry. High reward if your speed is ahead, punishable if read early.',
    unlockType: 'basic',
    statBonuses: { speed: 0.2, aggression: 0.12, reflexes: 0.08 },
    damageBonus: 0.12,
    guardBonus: -1,
    staminaDelta: 5,
    text: [
      'Blitz Step: you close distance before their guard finishes adjusting to the range change.',
      'Blitz Step: the first step wins space, and the second step forces them to defend in motion.',
      'Blitz Step: you attack during their range read, before their feet can support a counter.',
    ],
    finish: [
      'Blitz Step finish: they identify the entry late, and the finishing shot lands before they reset.',
      'Blitz Step finish: the distance closes too quickly for their base to survive the impact.',
    ],
  },
  demonPressure: {
    category: 'pressure',
    label: 'Demon Pressure',
    hint: 'A heavy rush skill that converts aggression into damage and momentum at high stamina cost.',
  },
  releaseRush: {
    category: 'pressure',
    label: 'Release Rush',
    hint: 'A high-speed entry chain that rewards speed and aggression but burns gas quickly.',
  },
  counter: {
    category: 'counter',
    label: 'Counter',
    hint: 'Punishes committed entries. Best with reflexes, Fight IQ, and technique.',
    unlockedByDefault: true,
  },
  slipCross: {
    category: 'counter',
    label: 'Slip Cross',
    hint: 'Head movement plus straight return. Strong against linear pressure.',
    unlockType: 'basic',
    statBonuses: { reflexes: 0.18, fightIq: 0.1 },
    damageBonus: 0.12,
    guardBonus: 1,
    staminaDelta: -2,
    text: [
      'Slip Cross: you take your head off the centerline and send the cross down the vacated lane.',
      'Slip Cross: their entry misses by a small margin, which is all the counter needs.',
      'Slip Cross: you draw the shot forward, rotate through the opening, and answer straight.',
    ],
    finish: [
      'Slip Cross finish: they overextend, and the return shot lands before their stance recovers.',
      'Slip Cross finish: the missed entry leaves the chin exposed long enough to end it.',
    ],
  },
  checkHook: {
    category: 'counter',
    label: 'Check Hook',
    hint: 'Pivot counter for forward rushes. Uses their momentum against the entry.',
    unlockType: 'basic',
    statBonuses: { reflexes: 0.14, technique: 0.12, speed: 0.08 },
    damageBonus: 0.1,
    guardBonus: 2,
    text: [
      'Check Hook: you pivot outside the rush and land as their feet continue forward.',
      'Check Hook: the angle change pulls their guard across the wrong line.',
      'Check Hook: you let the entry pass your lead side and punish the exposed turn.',
    ],
    finish: [
      'Check Hook finish: their own forward drive adds weight to the final counter.',
      'Check Hook finish: you turn the corner and catch them before they regain alignment.',
    ],
  },
  pullCounter: {
    category: 'counter',
    label: 'Pull Counter',
    hint: 'Baits a miss at the edge of range, then returns while they are extended.',
    unlockType: 'basic',
    statBonuses: { fightIq: 0.16, reflexes: 0.14, control: 0.06 },
    damageBonus: 0.13,
    guardBonus: 1,
    staminaDelta: -1,
    text: [
      'Pull Counter: you pull just outside range and fire back before they can retract.',
      'Pull Counter: their shot falls short, leaving the return lane open.',
      'Pull Counter: you use distance as the trap, then punish the recovery.',
    ],
    finish: [
      'Pull Counter finish: the whiff exposes their balance, and the counter lands on schedule.',
      'Pull Counter finish: they chase the missing target and run into the return shot.',
    ],
  },
  interceptKnee: {
    category: 'counter',
    label: 'Intercept Knee',
    hint: 'Intercepts entries before clinch or pressure can settle. High damage, higher risk.',
    unlockType: 'basic',
    statBonuses: { technique: 0.12, fightIq: 0.12, strength: 0.08 },
    damageBonus: 0.16,
    guardBonus: -1,
    staminaDelta: 3,
    text: [
      'Intercept Knee: you meet the level change early and stop the entry at the midline.',
      'Intercept Knee: they step in before their guard is layered, and the knee claims the space.',
      'Intercept Knee: you punish the forward step before it becomes clinch pressure.',
    ],
    finish: [
      'Intercept Knee finish: the entry runs into the strike and loses structure immediately.',
      'Intercept Knee finish: the knee lands before their pressure can form, ending the exchange clean.',
    ],
  },
  redirectionCounter: {
    category: 'counter',
    label: 'Redirection Counter',
    hint: 'Redirects force off-line and returns it through technique-heavy counter timing.',
  },
  voidStep: {
    category: 'counter',
    label: 'Void Step',
    hint: 'Sharp angle exit that makes linear attacks miss before the counter arrives.',
  },
  grapple: {
    category: 'grapple',
    label: 'Clinch Takedown',
    hint: 'Basic body contact into a mat return. Stronger when grappling skill and control are ahead.',
    unlockedByDefault: true,
    groundRole: 'takedown',
  },
  collarTie: {
    category: 'grapple',
    label: 'Collar Tie',
    hint: 'Head control into a snap-down style takedown, dragging posture toward the mat.',
    unlockType: 'basic',
    groundRole: 'takedown',
    statBonuses: { strength: 0.1, control: 0.16, durability: 0.08 },
    damageBonus: 0.08,
    guardBonus: 1,
    staminaDelta: -1,
    text: [
      'Collar Tie: you secure head position and force them to fight from compromised posture.',
      'Collar Tie: the head control pulls their spine out of alignment and slows the exit.',
      'Collar Tie: you steer the exchange from the neck, making their counters arrive late.',
    ],
    finish: [
      'Collar Tie finish: posture breaks first, then the finishing shot lands on the exposed line.',
      'Collar Tie finish: the head control keeps them in place long enough for the end sequence.',
    ],
  },
  singleLegEntry: {
    category: 'grapple',
    label: 'Single-Leg Entry',
    hint: 'Attacks the lead leg under the hands, disrupting balance before power settles.',
    unlockType: 'basic',
    groundRole: 'takedown',
    statBonuses: { technique: 0.16, speed: 0.1, flexibility: 0.08 },
    damageBonus: 0.1,
    guardBonus: 1,
    staminaDelta: 2,
    text: [
      'Single-Leg Entry: you change levels under the hands and force them to defend on one leg.',
      'Single-Leg Entry: the corner cut removes their base before they can square up.',
      'Single-Leg Entry: their power drops once balance becomes the main problem.',
    ],
    finish: [
      'Single-Leg Entry finish: the lift and turn remove their base, setting up the final impact.',
      'Single-Leg Entry finish: one leg is isolated, and the follow-through ends the fight.',
    ],
  },
  bodyLockTrip: {
    category: 'grapple',
    label: 'Body Lock Trip',
    hint: 'Body lock control into trip. Strong when durability and control are ahead.',
    unlockType: 'basic',
    groundRole: 'takedown',
    statBonuses: { strength: 0.14, durability: 0.12, control: 0.1 },
    damageBonus: 0.12,
    guardBonus: 2,
    staminaDelta: 2,
    text: [
      'Body Lock Trip: you connect at the hips and walk them onto a trapped step.',
      'Body Lock Trip: chest pressure and short steps force their base into the trip.',
      'Body Lock Trip: you close the space until their balance has only one direction left.',
    ],
    finish: [
      'Body Lock Trip finish: the trapped step turns into a hard landing and the fight stops there.',
      'Body Lock Trip finish: their base folds under pressure, leaving no stable recovery.',
    ],
  },
  wristRide: {
    category: 'grapple',
    label: 'Wrist Ride Entry',
    hint: 'Controls the posting hand during the shot, limiting the first escape as the fight hits the floor.',
    unlockType: 'basic',
    groundRole: 'takedown',
    statBonuses: { technique: 0.14, control: 0.14, flexibility: 0.06 },
    damageBonus: 0.07,
    guardBonus: 3,
    staminaDelta: -1,
    text: [
      'Wrist Ride: you control the posting hand and make their base harder to rebuild.',
      'Wrist Ride: the trapped wrist slows their turn and makes every escape cost stamina.',
      'Wrist Ride: you chain wrist control into elbow control, then steer the next exchange.',
    ],
    finish: [
      'Wrist Ride finish: without the posting hand, they cannot stop the final angle.',
      'Wrist Ride finish: the trapped wrist delays the defense just long enough to finish.',
    ],
  },
  boneBind: {
    category: 'grapple',
    label: 'Bone Bind',
    hint: 'Joint-control chain that drains stamina and punishes opponents who force escapes.',
    groundRole: 'submission',
  },
  armTriangle: {
    category: 'grapple',
    label: 'Arm Triangle',
    hint: 'Top-pressure choke that compresses the shoulder line. Strong from mount or side control.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'submission',
    statBonuses: { technique: 0.16, control: 0.18, strength: 0.08 },
    damageBonus: 0.14,
    staminaDelta: 5,
    text: [
      'Arm Triangle: you walk the shoulder across the neck and make their breathing narrow fast.',
      'Arm Triangle: your top pressure pins the head-and-arm line before they can turn out.',
      'Arm Triangle: you settle weight through the chest and force them to defend the choke before posture.',
    ],
    finish: [
      'Arm Triangle finish: the shoulder pressure seals the escape and they have to give up the fight.',
      'Arm Triangle finish: the choke tightens from top control until the referee has seen enough.',
    ],
  },
  rearNakedChoke: {
    category: 'grapple',
    label: 'Rear Naked Choke',
    hint: 'Back-control choke with the highest finish threat when hooks and control are settled.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'submission',
    statBonuses: { technique: 0.2, control: 0.18, flexibility: 0.1 },
    damageBonus: 0.18,
    staminaDelta: 4,
    text: [
      'Rear Naked Choke: you keep the back and slide the choking arm under the defensive hand fight.',
      'Rear Naked Choke: the hooks hold their hips while the choke closes around the neck.',
      'Rear Naked Choke: you win the hand battle first, then take the air away.',
    ],
    finish: [
      'Rear Naked Choke finish: back control is too deep, and the choke forces the stoppage.',
      'Rear Naked Choke finish: they peel one hand but the second layer is already locked.',
    ],
  },
  kneebarThread: {
    category: 'grapple',
    label: 'Kneebar Thread',
    hint: 'Leg attack that punishes frantic scrambles, especially from half guard transitions.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'submission',
    statBonuses: { flexibility: 0.18, technique: 0.16, fightIq: 0.08 },
    damageBonus: 0.12,
    staminaDelta: 3,
    text: [
      'Kneebar Thread: you isolate the leg during the scramble and force them to protect the knee line.',
      'Kneebar Thread: their hips turn late, letting you extend the leg before they can hide it.',
      'Kneebar Thread: you trade chest pressure for a clean bite on the leg.',
    ],
    finish: [
      'Kneebar Thread finish: the leg line is trapped and the pressure ends the fight.',
      'Kneebar Thread finish: they cannot clear the knee before the extension becomes decisive.',
    ],
  },
  posturedHammerfists: {
    category: 'grapple',
    label: 'Postured Hammerfists',
    hint: 'Ground-and-pound from top position. Posture up, make them shell, and tax health without chasing a submission.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'groundPound',
    statBonuses: { strength: 0.16, aggression: 0.14, control: 0.1 },
    damageBonus: 0.2,
    staminaDelta: 5,
    text: [
      'Postured Hammerfists: you build posture over the hips and drop short shots before they can close guard.',
      'Postured Hammerfists: the top position gives you gravity, and every shell they build costs them vision.',
      'Postured Hammerfists: you pin the hips long enough to make defense come before escape.',
    ],
    finish: [
      'Postured Hammerfists finish: the guard breaks under repeated short shots, and the referee has seen enough.',
      'Postured Hammerfists finish: they turn away from the strikes and the fight ends from top control.',
    ],
  },
  crossfaceElbows: {
    category: 'grapple',
    label: 'Crossface Elbows',
    hint: 'Heavy top pressure with cutting elbows. Strong from side control, mount, and back control.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'groundPound',
    statBonuses: { control: 0.18, technique: 0.12, durability: 0.08 },
    damageBonus: 0.18,
    guardBonus: 2,
    staminaDelta: 4,
    text: [
      'Crossface Elbows: you flatten the head line and make each elbow land before their hips can escape.',
      'Crossface Elbows: the crossface pins their sightline while the short strikes punish every turn.',
      'Crossface Elbows: you use pressure first, damage second, and force them to defend both.',
    ],
    finish: [
      'Crossface Elbows finish: the frame collapses under top pressure and the final elbow ends the argument.',
      'Crossface Elbows finish: they cannot turn into you, cannot turn away, and cannot survive the next elbow.',
    ],
  },
  matReturnPunches: {
    category: 'grapple',
    label: 'Mat Return Punches',
    hint: 'Punches chained to ride control. Best when they try to scramble or build back to their knees.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'groundPound',
    statBonuses: { fightIq: 0.12, reflexes: 0.1, control: 0.14 },
    damageBonus: 0.14,
    guardBonus: 3,
    staminaDelta: 2,
    text: [
      'Mat Return Punches: every time they build a knee, you return them to the floor and score on the way down.',
      'Mat Return Punches: you ride the scramble instead of chasing it, landing when their hands are busy posting.',
      'Mat Return Punches: their escape attempts become the timing for your short punches.',
    ],
    finish: [
      'Mat Return Punches finish: the last scramble gives you the last opening, and the follow-up shuts it down.',
      'Mat Return Punches finish: they try to stand, get returned, and the punches finish before they can recover.',
    ],
  },
  hipSwitch: {
    category: 'grapple',
    label: 'Hip Switch',
    hint: 'Bottom reversal that frames, turns the hips, and comes up into top control.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'reversal',
    statBonuses: { flexibility: 0.18, technique: 0.14, control: 0.1 },
    damageBonus: 0.04,
    staminaDelta: 2,
    text: [
      'Hip Switch: you build a frame, turn the hips, and come up before their weight settles.',
      'Hip Switch: your knees cut the angle and their top pressure slides past the base.',
      'Hip Switch: you refuse the flat position and rotate into the scramble.',
    ],
    finish: [
      'Hip Switch finish: the reversal creates the last opening and the top-side follow-up ends it.',
      'Hip Switch finish: you come up through the scramble and finish before they can post.',
    ],
  },
  granbyRoll: {
    category: 'grapple',
    label: 'Granby Roll',
    hint: 'Flexible reversal that rolls through pressure and can steal top position on a big success.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'reversal',
    statBonuses: { flexibility: 0.22, speed: 0.1, technique: 0.1 },
    damageBonus: 0.03,
    staminaDelta: 4,
    text: [
      'Granby Roll: you roll under the pressure and force their hands to chase your hips.',
      'Granby Roll: the shoulder turn creates a scramble before their chest can pin you flat.',
      'Granby Roll: you invert just enough to make top control lose its anchor.',
    ],
    finish: [
      'Granby Roll finish: the scramble flips the position and the final follow-up lands before they recover.',
      'Granby Roll finish: they chase the roll too late, giving you the last angle.',
    ],
  },
  technicalStandUp: {
    category: 'grapple',
    label: 'Technical Stand-Up',
    hint: 'Bottom escape that posts, clears the grip, and returns the fight to standing.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'getUp',
    statBonuses: { speed: 0.16, control: 0.14, fightIq: 0.1 },
    staminaDelta: -1,
    text: [
      'Technical Stand-Up: you post the hand, shield the head, and bring the fight back to range.',
      'Technical Stand-Up: your frame creates enough distance to stand without giving the neck.',
      'Technical Stand-Up: you clear the grip and build back to your feet before they can follow.',
    ],
    finish: [
      'Technical Stand-Up finish: the clean escape exposes their chase, and your standing answer ends it.',
      'Technical Stand-Up finish: you return to range first and catch them reaching.',
    ],
  },
  wallWalk: {
    category: 'grapple',
    label: 'Wall Walk',
    hint: 'Escape that uses frames and pressure to climb back up, safer when control is high.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'getUp',
    statBonuses: { strength: 0.12, control: 0.16, willpower: 0.1 },
    staminaDelta: 1,
    text: [
      'Wall Walk: you build your base in layers and deny the mat return on the way up.',
      'Wall Walk: your frame keeps their hips away long enough to climb back to standing.',
      'Wall Walk: you accept the grind, win the underhook, and stand through the pressure.',
    ],
    finish: [
      'Wall Walk finish: the escape forces them to reach, and the final shot lands during the climb.',
      'Wall Walk finish: you stand through the pressure and punish the failed mat return.',
    ],
  },
  defend: {
    category: 'defend',
    label: 'Defend',
    hint: 'Raises guard and lowers damage taken while you gather reads.',
    unlockedByDefault: true,
  },
  parryFrame: {
    category: 'defend',
    label: 'Parry Frame',
    hint: 'Early hand defense that redirects the first shot and opens a safer return.',
    unlockType: 'basic',
    statBonuses: { control: 0.18, fightIq: 0.1 },
    damageBonus: 0.05,
    guardBonus: 5,
    staminaDelta: -1,
    text: [
      'Parry Frame: you meet the strike before full extension and redirect the line.',
      'Parry Frame: your hands interrupt the attack shape before it becomes clean damage.',
      'Parry Frame: the frame changes their rhythm and gives you a safer return window.',
    ],
    finish: [
      'Parry Frame finish: the redirected rush exposes a short lane for the final answer.',
      'Parry Frame finish: their last attack slides off structure and your return lands clean.',
    ],
  },
  shoulderRoll: {
    category: 'defend',
    label: 'Shoulder Roll',
    hint: 'Deflects straight shots off the shoulder while keeping a counter ready.',
    unlockType: 'basic',
    statBonuses: { reflexes: 0.12, flexibility: 0.12, control: 0.08 },
    damageBonus: 0.08,
    guardBonus: 4,
    text: [
      'Shoulder Roll: you turn the shoulder across the line and keep the counter hand available.',
      'Shoulder Roll: the shot glances off the frame instead of landing through the target.',
      'Shoulder Roll: you absorb the line on structure and return before they reset.',
    ],
    finish: [
      'Shoulder Roll finish: their last punch rolls off target, and the counter lands immediately.',
      'Shoulder Roll finish: they hit the frame instead of the chin and cannot cover the return.',
    ],
  },
  highGuardCrash: {
    category: 'defend',
    label: 'High Guard Crash',
    hint: 'Tight shell plus forward step. Best for smothering volume and reducing damage.',
    unlockType: 'basic',
    statBonuses: { durability: 0.16, willpower: 0.12, control: 0.08 },
    damageBonus: 0.06,
    guardBonus: 7,
    staminaDelta: 2,
    text: [
      'High Guard Crash: you absorb on the forearms and step in before their combination resets.',
      'High Guard Crash: their volume hits the shell while your feet keep taking space.',
      'High Guard Crash: you close distance behind guard and smother the end of the flurry.',
    ],
    finish: [
      'High Guard Crash finish: their flurry dies on the shell and your short return ends it.',
      'High Guard Crash finish: you step through the guard line and finish from close range.',
    ],
  },
  elbowCover: {
    category: 'defend',
    label: 'Elbow Cover',
    hint: 'Compact elbow frame that protects chin and body before a short counter.',
    unlockType: 'basic',
    statBonuses: { durability: 0.1, control: 0.14, fightIq: 0.06 },
    damageBonus: 0.05,
    guardBonus: 6,
    staminaDelta: -1,
    text: [
      'Elbow Cover: you close the ribs and chin behind compact frames.',
      'Elbow Cover: the elbow frame absorbs the body line before it can open the guard.',
      'Elbow Cover: you deny the inside lane and prepare a short return from the shell.',
    ],
    finish: [
      'Elbow Cover finish: the blocked body shot leaves their head exposed for the return.',
      'Elbow Cover finish: they dig into the shell and your inside counter lands first.',
    ],
  },
  adamantGuard: {
    category: 'defend',
    label: 'Adamant Guard',
    hint: 'Hard-body guard that lowers incoming damage and injury risk.',
  },
  conserve: {
    category: 'conserve',
    label: 'Conserve',
    hint: 'Range reset that recovers stamina and delays the exchange.',
    unlockedByDefault: true,
  },
  footworkReset: {
    category: 'conserve',
    label: 'Footwork Reset',
    hint: 'Angle exit that recovers stamina and forces the opponent to rebuild pursuit.',
    unlockType: 'basic',
    statBonuses: { speed: 0.12, control: 0.12, fightIq: 0.08 },
    guardBonus: 2,
    staminaDelta: -5,
    text: [
      'Footwork Reset: you exit on an angle and force them to restart the chase.',
      'Footwork Reset: your feet change the line before their hands can follow.',
      'Footwork Reset: you leave the centerline and make their pressure arrive late.',
    ],
    finish: [
      'Footwork Reset finish: they overchase the reset and expose the final counter.',
      'Footwork Reset finish: the pursuit runs past the angle and your return lands clean.',
    ],
  },
  measuredBreathing: {
    category: 'conserve',
    label: 'Measured Breathing',
    hint: 'Breathing reset that recovers stamina without fully conceding the exchange.',
    unlockType: 'basic',
    statBonuses: { willpower: 0.14, control: 0.12 },
    guardBonus: 2,
    staminaDelta: -7,
    text: [
      'Measured Breathing: you slow the breath cycle and keep your guard organized under pressure.',
      'Measured Breathing: you lower the tempo just enough to recover without giving up position.',
      'Measured Breathing: you stabilize your breathing and stop the exchange from accelerating.',
    ],
    finish: [
      'Measured Breathing finish: they overcommit to the reset, and the calm return lands clean.',
      'Measured Breathing finish: their rush fades first, leaving the final opening visible.',
    ],
  },
  clinchBreak: {
    category: 'conserve',
    label: 'Clinch Break',
    hint: 'Frames out of clinch range, recovers stamina, and denies prolonged control.',
    unlockType: 'basic',
    statBonuses: { control: 0.12, strength: 0.08, fightIq: 0.08 },
    damageBonus: 0.04,
    guardBonus: 3,
    staminaDelta: -4,
    text: [
      'Clinch Break: you frame at the collarbone and exit before the grip battle settles.',
      'Clinch Break: the tie-up starts forming, so you create space with structure and timing.',
      'Clinch Break: you deny the clinch and recover a breath on the break.',
    ],
    finish: [
      'Clinch Break finish: they reach to keep the clinch and the exit shot catches them exposed.',
      'Clinch Break finish: the frame creates the pocket, and the final answer lands through it.',
    ],
  },
  tempoFeint: {
    category: 'conserve',
    label: 'Tempo Feint',
    hint: 'Rhythm change that forces hesitation and recovers stamina without going passive.',
    unlockType: 'basic',
    statBonuses: { fightIq: 0.14, control: 0.1, reflexes: 0.06 },
    damageBonus: 0.05,
    guardBonus: 2,
    staminaDelta: -5,
    text: [
      'Tempo Feint: you break rhythm and make them spend a reaction on a false entry.',
      'Tempo Feint: the feint freezes their feet long enough for you to reset breathing.',
      'Tempo Feint: you show the attack, pull it back, and use their hesitation to recover.',
    ],
    finish: [
      'Tempo Feint finish: they bite on the fake and the real shot lands on the open beat.',
      'Tempo Feint finish: the rhythm change draws the wrong guard response and ends the fight.',
    ],
  },
  closedGuardShell: {
    category: 'conserve',
    label: 'Closed Guard Shell',
    hint: 'Bottom survival. Close the guard, slow their posture, recover gas, and reduce ground-and-pound damage.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'bottomConserve',
    statBonuses: { control: 0.16, flexibility: 0.12, willpower: 0.1 },
    guardBonus: 4,
    staminaDelta: -8,
    text: [
      'Closed Guard Shell: you lock the hips down, hide the chin, and make top pressure work for every inch.',
      'Closed Guard Shell: the guard closes before they can posture, turning damage into grip fighting.',
      'Closed Guard Shell: you slow the mat exchange and recover breath under pressure.',
    ],
    finish: [
      'Closed Guard Shell finish: they overcommit to break the guard, and your counter shot catches them leaning.',
      'Closed Guard Shell finish: the slowed exchange makes their top attack reach too far, giving you the last answer.',
    ],
  },
  butterflyFrames: {
    category: 'conserve',
    label: 'Butterfly Frames',
    hint: 'Bottom survival with active hooks. Creates space, lowers damage, and can downgrade their dominant position.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'bottomConserve',
    statBonuses: { flexibility: 0.16, technique: 0.12, reflexes: 0.08 },
    guardBonus: 3,
    staminaDelta: -6,
    text: [
      'Butterfly Frames: you build hooks inside the hips and make their weight float instead of settle.',
      'Butterfly Frames: the frames keep their chest from pinning yours, buying the breath you need.',
      'Butterfly Frames: you do not win top position yet, but you make their control less expensive for you.',
    ],
    finish: [
      'Butterfly Frames finish: the hook lifts their base just enough for the final counter to land.',
      'Butterfly Frames finish: they chase through the frames and run into the shot they thought was gone.',
    ],
  },
  lockdownStall: {
    category: 'conserve',
    label: 'Lockdown Stall',
    hint: 'Bottom half-guard stall. Tangles a leg, drains their pace, and protects health while you recover.',
    unlockType: 'basic',
    unlockedByDefault: true,
    groundRole: 'bottomConserve',
    statBonuses: { durability: 0.12, control: 0.16, strength: 0.08 },
    guardBonus: 4,
    staminaDelta: -7,
    text: [
      'Lockdown Stall: you trap the leg and turn their top pressure into a slow, frustrated grind.',
      'Lockdown Stall: the half-guard hook keeps their hips from advancing while your breathing steadies.',
      'Lockdown Stall: you accept bottom position, but you stop it from becoming free damage.',
    ],
    finish: [
      'Lockdown Stall finish: they force the pass too hard and leave the counter lane open.',
      'Lockdown Stall finish: the stalled pressure makes them reach, and the last shot catches the mistake.',
    ],
  },
  apexBreathing: {
    category: 'conserve',
    label: 'Apex Breathing',
    hint: 'Advanced breathing reset that restores more stamina while protecting momentum.',
  },
  special: {
    category: 'special',
    label: 'Clan Special',
    hint: 'Clan or style burst. High cost, high upside, limited uses.',
    unlockedByDefault: true,
    useClanSpecialLabel: true,
  },
  demonBackBurst: {
    category: 'special',
    label: 'Demon Back Burst',
    hint: 'Boss-learned burst that briefly pushes the exchange beyond normal stat limits.',
  },
};

export const BASIC_FIGHT_MOVE_IDS = Object.entries(FIGHT_MOVES)
  .filter(([, move]) => move.unlockType === 'basic')
  .map(([id]) => id);

export const ENEMY_FIGHT_MOVES = {
  wildOverhand: {
    category: 'pressure',
    label: 'Wild Overhand',
    text: 'the shoulder loads early, but the arc carries real weight if you stay on the centerline.',
    scoreBonus: 5,
    damageMultiplier: 1.12,
    staminaCost: 8,
    injury: {
      name: 'rattled skull',
      text: 'the overhand clips the head and makes the next read feel delayed.',
    },
  },
  bodyRush: {
    category: 'pressure',
    label: 'Body Rush',
    text: 'they crowd your hips and punch through the ribs before your guard fully drops.',
    scoreBonus: 3,
    damageMultiplier: 1.08,
    staminaCost: 7,
    injury: {
      name: 'cracked ribs',
      text: 'the rush folds into your body before you can brace.',
    },
  },
  lowLineKick: {
    category: 'pressure',
    label: 'Low-Line Kick',
    text: 'the kick is aimed at your lead leg, not your guard, forcing your stance to pay for the exchange.',
    scoreBonus: 2,
    damageMultiplier: 0.96,
    staminaCost: 5,
    injury: {
      name: 'twisted knee',
      text: 'the low kick catches the leg as your weight is shifting.',
    },
  },
  pullCounterShot: {
    category: 'counter',
    label: 'Pull Counter',
    text: 'they lean just outside the first beat and return while your weight is still moving forward.',
    scoreBonus: 6,
    damageMultiplier: 1.1,
    staminaCost: 5,
    injury: {
      name: 'rattled skull',
      text: 'the counter snaps your head off the line and clouds the follow-up read.',
    },
  },
  checkHookTurn: {
    category: 'counter',
    label: 'Check Hook Turn',
    text: 'they pivot off the entry and hit while your feet are still committed.',
    scoreBonus: 4,
    damageMultiplier: 1.04,
    staminaCost: 5,
    injury: {
      name: 'sprained wrist',
      text: 'your posting hand jams awkwardly as you try to catch balance after the turn.',
    },
  },
  interceptingKnee: {
    category: 'counter',
    label: 'Intercepting Knee',
    text: 'the knee meets your entry before the pressure becomes layered.',
    scoreBonus: 5,
    damageMultiplier: 1.14,
    staminaCost: 8,
    injury: {
      name: 'cracked ribs',
      text: 'the intercept lands through the midline and makes breathing sharp.',
    },
  },
  collarDrag: {
    category: 'grapple',
    label: 'Collar Drag',
    text: 'they pull your head past your base and make the exchange about posture instead of hands.',
    groundRole: 'takedown',
    scoreBonus: 4,
    damageMultiplier: 0.98,
    staminaCost: 6,
    injury: {
      name: 'twisted knee',
      text: 'your leg twists under you as the collar drag turns your stance.',
    },
  },
  kneePick: {
    category: 'grapple',
    label: 'Knee Pick',
    text: 'they attack below the hands and take away the leg you needed to reset.',
    groundRole: 'takedown',
    scoreBonus: 5,
    damageMultiplier: 1.02,
    staminaCost: 7,
    injury: {
      name: 'twisted knee',
      text: 'the knee line gets picked while your weight is still planted.',
    },
  },
  wristClamp: {
    category: 'grapple',
    label: 'Wrist Clamp',
    text: 'they trap the posting hand and turn your escape into a slow grip fight.',
    groundRole: 'takedown',
    scoreBonus: 3,
    damageMultiplier: 0.9,
    staminaCost: 4,
    injury: {
      name: 'sprained wrist',
      text: 'the clamp bends the wrist through the grip battle.',
    },
  },
  crossFaceChoke: {
    category: 'grapple',
    label: 'Cross-Face Choke',
    text: 'they flatten your shoulders, turn the face away, and start closing the choke from top pressure.',
    groundRole: 'submission',
    scoreBonus: 5,
    damageMultiplier: 1.08,
    staminaCost: 6,
    injury: {
      name: 'rattled skull',
      text: 'the cross-face grinds the head out of line while the choke threat builds.',
    },
  },
  backTakeChoke: {
    category: 'grapple',
    label: 'Back-Take Choke',
    text: 'they climb behind the shoulders and make every hand fight protect the neck first.',
    groundRole: 'submission',
    scoreBonus: 7,
    damageMultiplier: 1.14,
    staminaCost: 7,
    injury: {
      name: 'rattled skull',
      text: 'the choke battle forces your chin up before you can rebuild posture.',
    },
  },
  hipHeist: {
    category: 'grapple',
    label: 'Hip Heist',
    text: 'they frame at the hip, turn the knee through, and come up before top pressure settles.',
    groundRole: 'reversal',
    scoreBonus: 5,
    damageMultiplier: 0.72,
    staminaCost: 5,
    injury: {
      name: 'sprained wrist',
      text: 'the scramble jams the posting hand as control flips.',
    },
  },
  baseBuildStand: {
    category: 'grapple',
    label: 'Base-Build Stand',
    text: 'they post, protect the neck, and build back to the feet in layers.',
    groundRole: 'getUp',
    scoreBonus: 4,
    damageMultiplier: 0.55,
    staminaCost: 5,
    injury: {
      name: 'twisted knee',
      text: 'the stand-up taxes the knee line during the scramble.',
    },
  },
  shellAndShove: {
    category: 'defend',
    label: 'Shell And Shove',
    text: 'they catch the attack on a tight shell, then shove back into your stance.',
    scoreBonus: 3,
    damageMultiplier: 0.72,
    staminaCost: 3,
    injury: {
      name: 'sprained wrist',
      text: 'your hand lands badly on the shell and starts losing strength.',
    },
  },
  elbowFrame: {
    category: 'defend',
    label: 'Elbow Frame',
    text: 'the elbow frame blocks the inside lane and makes your return land on bone.',
    scoreBonus: 2,
    damageMultiplier: 0.66,
    staminaCost: 2,
    injury: {
      name: 'sprained wrist',
      text: 'the frame jams your hand before the strike can fully extend.',
    },
  },
  breathReset: {
    category: 'conserve',
    label: 'Breath Reset',
    text: 'they step off, recover air, and make you restart the chase from too far away.',
    scoreBonus: 2,
    damageMultiplier: 0.48,
    staminaCost: -6,
    injury: {
      name: 'twisted knee',
      text: 'you overchase the reset and step out of alignment.',
    },
  },
  angleExit: {
    category: 'conserve',
    label: 'Angle Exit',
    text: 'they leave on the diagonal, forcing your attack to turn before it lands.',
    scoreBonus: 3,
    damageMultiplier: 0.54,
    staminaCost: -4,
    injury: {
      name: 'twisted knee',
      text: 'the chase drags your lead leg across a bad angle.',
    },
  },
  monsterBurst: {
    category: 'special',
    label: 'Monster Burst',
    text: 'the exchange jumps in pace, and the first clean impact feels heavier than the setup promised.',
    scoreBonus: 9,
    damageMultiplier: 1.22,
    staminaCost: 12,
    injury: {
      name: 'rattled skull',
      text: 'the burst lands hard enough that your balance arrives late.',
    },
  },
  jointBreakerEntry: {
    category: 'special',
    label: 'Joint Breaker Entry',
    text: 'they enter through the limb instead of the guard, forcing you to defend structure first.',
    scoreBonus: 8,
    damageMultiplier: 1.12,
    staminaCost: 10,
    injury: {
      name: 'sprained wrist',
      text: 'the special entry attacks the joint before you can pull the hand free.',
    },
  },
};

const SPECIAL_SKILLS = {
  demonPressure: 'Sustained forward pressure that overwhelms guard, builds momentum, and burns stamina quickly.',
  releaseRush: 'High-speed entry pressure that converts speed and aggression into a fast first-step attack.',
  redirectionCounter: 'Redirects force off-line, reduces return damage, and punishes with cleaner timing.',
  voidStep: 'Exits the centerline early, making the attack miss before the counter arrives.',
  boneBind: 'Joint-control chain that drains stamina and punishes forceful escapes.',
  posturedHammerfists: 'Ground-and-pound from top control that trades submission threat for blunt damage and posture pressure.',
  crossfaceElbows: 'Top-pressure elbows that pin the head line and punish opponents trying to turn out.',
  matReturnPunches: 'Ride-control punches that score whenever the bottom fighter tries to build back up.',
  adamantGuard: 'Hardens the frame, raises guard, and lowers incoming damage and injury risk.',
  closedGuardShell: 'Bottom survival that closes the guard, recovers stamina, and lowers incoming ground damage.',
  butterflyFrames: 'Bottom frames and hooks that create space, reduce damage, and weaken top control.',
  lockdownStall: 'Half-guard stall that ties up the legs, recovers breath, and keeps bottom position survivable.',
  apexBreathing: 'Reset your lungs under pressure, recovering stamina without fully surrendering control of the round.',
  demonBackBurst: 'Trigger a boss-learned burst that pushes the exchange beyond normal stat limits for one violent swing.',
};

const CLAN_SPECIAL_FLAVOR = {
  'Overtime Crush': {
    text: [
      'Overtime Crush: you lower your base, walk through the first contact, and turn the exchange into a strength bill they have to pay immediately.',
      'Overtime Crush: the entry is not pretty; it is shoulder pressure, short steps, and a heavy finish once their guard stops moving.',
      'Overtime Crush: you force a laboring pocket where durability matters more than style, then punch through the frame.',
    ],
    finish: [
      'Overtime Crush finish: the pressure keeps adding weight until their stance finally buckles under it.',
      'Overtime Crush finish: they survive the first push, but the second shove pins the guard and leaves no exit.',
    ],
    form: 'Overtime Crush loads the exchange with blunt pressure instead of clean speed.',
  },
  'Open Road Feint': {
    text: [
      'Open Road Feint: you show the straight entry, cut off-line, and make their defense turn toward empty space.',
      'Open Road Feint: the footwork sells one lane while your hips arrive on another, forcing a late guard correction.',
      'Open Road Feint: you use movement as the strike setup, making the opponent defend the wrong angle first.',
    ],
    finish: [
      'Open Road Feint finish: the false lane draws their guard away, and the real shot lands before they square up.',
      'Open Road Feint finish: their feet chase the first read while the finishing angle arrives from the second.',
    ],
    form: 'Open Road Feint turns mobility into a read problem.',
  },
  'Iron Bell Rush': {
    text: [
      'Iron Bell Rush: you absorb the first answer on hardened structure and return while they are still measuring impact.',
      'Iron Bell Rush: the body-hardening lets you stay in range long enough to turn defense into a collision.',
      'Iron Bell Rush: you make contact unavoidable, then punish the moment they realize their shot did not move you.',
    ],
    finish: [
      'Iron Bell Rush finish: their last clean hit dies on the frame, and your return stops the fight.',
      'Iron Bell Rush finish: the collision favors the fighter who can stay standing, and that is you.',
    ],
    form: 'Iron Bell Rush makes the exchange a test of structure and pain tolerance.',
  },
  'Serpent Angle': {
    text: [
      'Serpent Angle: you slip outside the honest line and attack from a place their guard has not priced in.',
      'Serpent Angle: the entry bends around their lead side, turning a small defensive lapse into a clean lane.',
      'Serpent Angle: you hide the step until the last beat, then strike where their stance is weakest.',
    ],
    finish: [
      'Serpent Angle finish: the blind lane stays open one beat too long, and the final shot takes it.',
      'Serpent Angle finish: they defend the front door while the finish comes through the side wall.',
    ],
    form: 'Serpent Angle weaponizes deception and late footwork.',
  },
  'Redirection Burst': {
    text: [
      'Redirection Burst: you catch the force before it settles, turn it off-line, and return it through a cleaner path.',
      'Redirection Burst: the opponent gives you pressure, and you make that pressure become the counter mechanism.',
      'Redirection Burst: you do not meet strength directly; you change its address and send it back with interest.',
    ],
    finish: [
      'Redirection Burst finish: their own entry supplies the final opening once you turn the line.',
      'Redirection Burst finish: the force comes in committed and leaves as your finishing angle.',
    ],
    form: 'Redirection Burst changes the ownership of the opponent entry.',
  },
  'Release Limiter': {
    text: [
      'Release Limiter: the first step accelerates hard, and the exchange becomes a race their guard did not agree to run.',
      'Release Limiter: you flood the entry with speed and torque, forcing their defense to solve too many threats at once.',
      'Release Limiter: the burst spends gas fast, but the opening beat arrives with assassin-level acceleration.',
    ],
    finish: [
      'Release Limiter finish: the speed spike gets there before their defense can layer itself.',
      'Release Limiter finish: the guard sees the rush, but the body cannot react quickly enough.',
    ],
    form: 'Release Limiter turns stamina into immediate acceleration.',
  },
  'Blind-Side Entry': {
    text: [
      'Blind-Side Entry: you make their eyes follow the lead motion while your feet steal the outside shoulder.',
      'Blind-Side Entry: the angle disappears from their vision, then returns as contact before they can turn.',
      'Blind-Side Entry: you win the blind side first, which makes the strike feel late even when they read it.',
    ],
    finish: [
      'Blind-Side Entry finish: they turn toward the threat after the finishing shot has already landed.',
      'Blind-Side Entry finish: the lost angle becomes the whole fight for one decisive beat.',
    ],
    form: 'Blind-Side Entry makes positioning do the damage setup.',
  },
  'Demon Frame': {
    text: [
      'Demon Frame: you step in with predator pressure, making the exchange feel smaller and more violent by the second.',
      'Demon Frame: the posture shifts forward and the opponent has to defend every inch of space at once.',
      'Demon Frame: you stack intimidation onto pressure, forcing their guard to react before their tactics do.',
    ],
    finish: [
      'Demon Frame finish: the pressure breaks their decision-making first, then the final strike follows.',
      'Demon Frame finish: they lose the pocket, the stance, and then the fight in that order.',
    ],
    form: 'Demon Frame turns momentum into a physical threat.',
  },
  'Joint Ghost Chain': {
    text: [
      'Joint Ghost Chain: you accept the contact, isolate the limb, and make leverage replace power.',
      'Joint Ghost Chain: the grip looks soft until the joint line closes and the opponent has to fight their own structure.',
      'Joint Ghost Chain: you turn their pressure into a hinge problem, then punish the forced escape.',
    ],
    finish: [
      'Joint Ghost Chain finish: the joint line closes, their posture follows, and the finish is already waiting.',
      'Joint Ghost Chain finish: they try to muscle out and give you the last angle for free.',
    ],
    form: 'Joint Ghost Chain makes forceful resistance expensive.',
  },
  'Adaptive Apex': {
    text: [
      'Adaptive Apex: you change the answer mid-exchange, correcting the first read before the opponent can exploit it.',
      'Adaptive Apex: the stance evolves during contact, turning their best option into old information.',
      'Adaptive Apex: you use the earlier rounds as data and choose the response that fits this exact beat.',
    ],
    finish: [
      'Adaptive Apex finish: the final adjustment arrives before they can recognize the pattern changed.',
      'Adaptive Apex finish: the fight becomes a solved problem one exchange too late for them.',
    ],
    form: 'Adaptive Apex converts previous reads into immediate corrections.',
  },
  'Demon Back': {
    text: [
      'Demon Back: the frame opens, the pressure spikes, and the opponent has to survive a power lane that was not there a second ago.',
      'Demon Back: you commit to the finishing pocket, turning strength and willpower into a single violent entry.',
      'Demon Back: the stance becomes heavier, the shoulders load, and every defensive mistake now has knockout weight.',
    ],
    finish: [
      'Demon Back finish: the power lane opens just once, and the fight ends inside it.',
      'Demon Back finish: they brace for pressure, but the finishing weight comes through the guard anyway.',
    ],
    form: 'Demon Back raises the threat of every clean touch.',
  },
  'Ancient Monster State': {
    text: [
      'Ancient Monster State: you stop trading like a normal fighter and start forcing exchanges through raw physical certainty.',
      'Ancient Monster State: the opponent lands on structure that barely gives, then has to eat the return.',
      'Ancient Monster State: speed, durability, and pressure arrive together, leaving them no single problem to solve.',
    ],
    finish: [
      'Ancient Monster State finish: the exchange becomes too physical to negotiate, and their defense collapses.',
      'Ancient Monster State finish: they find no soft target, no safe exit, and no answer before the stop.',
    ],
    form: 'Ancient Monster State compresses the fight into overwhelming physicality.',
  },
  'Ashura State': {
    text: [
      'Ashura State: you read the exchange as it forms, then choose the line that makes every answer late.',
      'Ashura State: the rhythm changes around you; their offense starts, and your countermeasure is already waiting.',
      'Ashura State: technique, violence, and timing lock together until the opponent is fighting a completed read.',
    ],
    finish: [
      'Ashura State finish: the last exchange is decided before contact, and the contact only confirms it.',
      'Ashura State finish: they attempt one more adjustment, but the answer has already been selected.',
    ],
    form: 'Ashura State makes the exchange feel pre-read before it happens.',
  },
  'Devil Gene Awakening': {
    text: [
      'Devil Gene Awakening: the cursed bloodline surges and turns the exchange into a violent family omen.',
      'Devil Gene Awakening: your output spikes with ugly precision, as if rage and timing learned to share one body.',
    ],
    finish: [
      'Devil Gene Awakening finish: the last opening is torn wide before they can understand what changed.',
      'Devil Gene Awakening finish: the cursed burst peaks, and the fight ends under pressure that feels inherited.',
    ],
    form: 'Devil Gene Awakening makes the exchange heavier, faster, and crueler for one decisive beat.',
  },
};

function clanSpecialFlavor(name) {
  return CLAN_SPECIAL_FLAVOR[name] ?? {
    text: [`${name}: you commit to a rare style action that changes the exchange before the opponent can settle.`],
    finish: [`${name} finish: the special action creates the final opening before the opponent adjusts.`],
    form: `${name} alters the exchange profile for one decisive beat.`,
  };
}

export const SPECIAL_FIGHT_IDS = [
  'yujiriHanmae',
  'ohmoTokitoo',
  'raianKuriya',
  'bakiyaMaw',
  'gokiShibukawae',
  'doppoOrochino',
  'kurokiGensae',
  'agitooKanoh',
  'wakatsukiTakeshee',
  'rolonDonairee',
  'jakkuHanmoe',
  'katsumiOrochino',
  'jinnKazame',
  'kazuroMishime',
  'heihaMishime',
  'kinggJaguar',
  'paulPheonixx',
  'yoshiMitsuo',
];

const SPECIAL_FIGHT_REACTIONS = {
  'Yujiri Hanmae': [
    'Yujiri keeps predator pressure in front of him and tests whether your angle can hold up twice.',
    'Yujiri absorbs the first layer of offense, then uses predator timing to step back into range before you reset.',
    'Yujiri gives very little ground, forcing you to prove the read under predator pressure.',
    'Yujiri tracks the form change with predator patience and attacks before the boost fully settles.',
  ],
  'Ohmo Tokitoo': [
    'Ohmo relaxes the stance and starts redirecting pressure instead of meeting it square.',
    'Ohmo gives ground by inches, keeping your momentum available for the counter.',
    'Ohmo watches the angle rather than the strike, setting up the redirection early.',
    'Ohmo keeps his breathing stable and changes shape before the burst lands clean.',
  ],
  'Raian Kuriya': [
    'Raian increases pace immediately, trying to drown the read before it becomes useful.',
    'Raian throws through the defensive layer, relying on speed and aggression to cover errors.',
    'Raian overcommits by design, betting that your timing breaks before his output does.',
    'Raian responds to the special by raising intensity instead of giving space.',
  ],
  'Bakiya Maw': [
    'Bakiya makes the adjustment after the first beat and changes the second layer immediately.',
    'Bakiya reads the threat calmly, then tests the same line with a different timing.',
    'Bakiya treats the contact as information and adjusts before the exchange is over.',
    'Bakiya answers the form boost with a faster stance correction.',
  ],
  'Goki Shibukawae': [
    'Goki receives the force softly and shifts your balance before you can drive through.',
    'Goki gives the opening just long enough to turn it into a trap.',
    'Goki lets the grip form, then changes the leverage so the hold works against you.',
    'Goki meets the burst with timing that threatens the nearest joint first.',
  ],
  'Doppo Orochino': [
    'Doppo plants his stance and lets the impact test a body built for answers.',
    'Doppo exhales through the rush, old karate habits tightening around the opening.',
    'Doppo respects the danger enough to make his next step brutally simple.',
    'Doppo hardens under the special, every scar seeming to remember its job.',
  ],
  'Kuroki Gensae': [
    'Kuroki barely moves, but the guard line closes before the attack arrives.',
    'Kuroki measures the entry early and makes the counter path very small.',
    'Kuroki blocks with minimal motion and returns on the first clean beat.',
  ],
  'Agitoo Kanoh': [
    'Agitoo studies the exchange, then his stance changes like the room just updated its rules.',
    'Agitoo absorbs the read and begins evolving around it before you finish the motion.',
    'Agitoo shifts from calm to violence with corporate-arena precision.',
  ],
  'Wakatsuki Takeshee': [
    'Wakatsuki plants his feet and makes the impact feel like arguing with a wall.',
    'Wakatsuki takes the line away with raw mass and patient monster strength.',
    'Wakatsuki answers through the guard like physics picked his side.',
  ],
  'Rolon Donairee': [
    'Rolon keeps the stance compact, every inch of movement carrying veteran danger.',
    'Rolon reads the angle early and turns defense into a quiet trap.',
    'Rolon makes the pocket feel smaller without ever rushing.',
  ],
  'Jakku Hanmoe': [
    'Jakku smiles through the damage like pain is a family language.',
    'Jakku leans into the exchange, limbs too long and timing too mean.',
    'Jakku turns the fight into a brutal inheritance test.',
  ],
  'Katsumi Orochino': [
    'Katsumi snaps into the opening with karate speed that seems to arrive before the thought.',
    'Katsumi layers precision over courage and makes the exchange sting twice.',
    'Katsumi attacks the gap with young monster confidence.',
  ],
  'Jinn Kazame': [
    'Jinn keeps the stance compact, then lets cursed pressure leak into a clean karate line.',
    'Jinn answers the special with discipline first and bloodline violence second.',
    'Jinn shifts from Mishime-style power to sharper karate before the exchange settles.',
  ],
  'Kazuro Mishime': [
    'Kazuro smiles like the exchange already belongs to the family curse.',
    'Kazuro steps in with electric pressure, forcing the pocket to become dangerous immediately.',
    'Kazuro turns the read into a blood-feud argument and throws through it.',
  ],
  'Heiha Mishime': [
    'Heiha plants his feet and dares the exchange to prove it can move him.',
    'Heiha answers with old monster timing, every counter carrying family-war spite.',
    'Heiha tests the special with a grin and a fist that refuses to age politely.',
  ],
  'Kingg Jaguar': [
    'Kingg lowers his base and turns the exchange into a masked wrestling problem.',
    'Kingg eats the first beat to get hands connected, then starts hunting the throw.',
    'Kingg roars through the setup and makes every reset feel like a suplex threat.',
  ],
  'Paul Pheonixx': [
    'Paul loads the right hand like subtlety owes him money.',
    'Paul crashes forward with biker-pride timing and turns the exchange into one huge bet.',
    'Paul swings through the read, confident one clean hit can rewrite the round.',
  ],
  'Yoshi Mitsuo': [
    'Yoshi changes rhythm oddly, cutting the exchange into angles that feel half sword, half trick.',
    'Yoshi vanishes off the obvious line and returns where the guard is least organized.',
    'Yoshi makes the special read strange, forcing you to solve timing before damage.',
  ],
};

const MOVE_REACTION_FLAVOR = {
  pressure: ['{name} braces for plain pressure, trying to meet force with force before the pocket collapses.'],
  jab: [
    '{name} starts reacting to the lead hand, which slows their own entry.',
    '{name} raises the guard for the jab, but the straight touch keeps landing first.',
    '{name} reaches at the jab before their feet are ready to support the counter.',
  ],
  bodyShot: [
    '{name} drops the elbow late as the body shot gets under the guard.',
    '{name} exhales hard, showing the body shot is affecting stamina.',
    '{name} protects the head too long and gives up the ribs.',
  ],
  lowKickChop: [
    '{name} tries to step out, but the low kick makes the lead leg answer first.',
    '{name} checks late and the base starts looking less certain.',
    '{name} feels the kick in the stance, not just the shin.',
  ],
  blitzStep: [
    '{name} loses the range read as the blitz step closes distance too quickly.',
    '{name} reacts to the first step and is late to the second.',
    '{name} tries to set their feet, but the burst arrives before the stance stabilizes.',
  ],
  demonPressure: ['{name} shells under Demon Pressure, but the monster-rush keeps chewing through space.'],
  releaseRush: ['{name} tries to square up, but the assassin burst has already crossed the line.'],
  counter: ['{name} hesitates at the counter shape, trying not to feed you an obvious entry.'],
  slipCross: [
    '{name} watches your head leave the line and realizes the cross is already coming back.',
    '{name} overextends into the slip, then catches the return straight before recovering.',
    '{name} tries to correct the miss, but the counter line is already occupied.',
  ],
  checkHook: [
    '{name} rushes forward and the check hook turns the entry off-line.',
    '{name} loses the angle as the hook lands on the pivot.',
    '{name} chases the target, but the pivot changes the attack side.',
  ],
  pullCounter: [
    '{name} punches at a target that is no longer there, then sees the counter too late.',
    '{name} reaches into empty range and pays for believing the distance.',
    '{name} tries to follow the pull, but the return shot gets there first.',
  ],
  interceptKnee: [
    '{name} enters hard and meets the knee before the rush becomes useful.',
    '{name} folds slightly around the intercept, the forward step turning against them.',
    '{name} tries to crash in, but the rising knee claims the doorway.',
  ],
  redirectionCounter: ['{name} feels their own force bend off course and come back cleaner than it left.'],
  voidStep: ['{name} attacks the centerline and finds only air where your body used to be.'],
  grapple: ['{name} lowers their base as the exchange turns into grips, hips, and bad breathing.'],
  collarTie: [
    '{name} fights the collar tie with tense shoulders, but head position keeps steering them.',
    '{name} tries to posture up and gets pulled back into the control line.',
    '{name} spends stamina fighting the tie while their balance starts to tilt.',
  ],
  singleLegEntry: [
    '{name} sprawls late as the single-leg entry gets under the hands.',
    '{name} hops for balance, one leg suddenly carrying the whole argument.',
    '{name} reaches for an underhook, but the leg is already captured.',
  ],
  bodyLockTrip: [
    '{name} widens their stance as the body lock starts walking them backward.',
    '{name} feels the trip forming at the hip before the foot can save them.',
    '{name} fights the lock high while the base disappears low.',
  ],
  wristRide: [
    '{name} tries to post, but the wrist ride steals the hand they needed.',
    '{name} twists against the wrist control and loses another piece of balance.',
    '{name} starts defending the trapped hand instead of the next attack.',
  ],
  boneBind: ['{name} tries to muscle out, but Bone Bind turns strength into a liability.'],
  posturedHammerfists: [
    '{name} shells from bottom as the hammerfists start landing through posture instead of range.',
    '{name} reaches to break posture, but the short punches keep interrupting the grip fight.',
    '{name} turns the guard high and gives up vision while the top shots keep coming.',
  ],
  crossfaceElbows: [
    '{name} tries to turn in, but the crossface keeps the head pinned while elbows scrape through.',
    '{name} frames at the shoulder and still has to answer the elbow line.',
    '{name} loses the face line first, then starts absorbing short damage from top pressure.',
  ],
  matReturnPunches: [
    '{name} builds to a knee and gets punished during the return to the mat.',
    '{name} posts to stand, but the ride control turns the post into a target.',
    '{name} scrambles hard and gives up short punches every time the base changes.',
  ],
  defend: ['{name} tests the shell, looking for which part of the guard answers first.'],
  parryFrame: [
    '{name} has the strike caught early, which breaks the rhythm before full impact.',
    '{name} tries to double up, but the frame removes the clean follow-up.',
    '{name} sees the shot redirected and has to rebuild the attack.',
  ],
  shoulderRoll: [
    '{name} watches the shot slide off your shoulder and realizes the counter hand stayed loaded.',
    '{name} overcommits into the roll, power glancing away from the target.',
    '{name} tries to square up after the roll, but the return lane is already open.',
  ],
  highGuardCrash: [
    '{name} unloads into the high guard and feels the crash step crowd their arms.',
    '{name} throws volume at the shell, but the guard keeps walking them backward.',
    '{name} tries to widen the attack as the high guard closes the room.',
  ],
  elbowCover: [
    '{name} digs for the body, but the elbow cover shuts the ribs away.',
    '{name} changes levels and finds compact frames waiting at the door.',
    '{name} hits elbows instead of openings and has to reset the body attack.',
  ],
  adamantGuard: ['{name} hits the adamant guard and feels the impact come back dull and useless.'],
  conserve: ['{name} follows the reset, trying to make your recovered breath cost something.'],
  footworkReset: [
    '{name} chases the footwork reset and loses the angle before the next exchange starts.',
    '{name} follows the exit line, but your feet have already redrawn the fight.',
    '{name} tries to cut off the reset and arrives at the wrong address.',
  ],
  measuredBreathing: [
    '{name} sees the measured breathing calm the panic they were trying to build.',
    '{name} tries to rush the pause, but your lungs settle before they can exploit it.',
    '{name} watches the tempo slow and realizes the exchange stopped tilting their way.',
  ],
  clinchBreak: [
    '{name} reaches to keep the tie-up, but the clinch break frames them off cleanly.',
    '{name} tries to drag the fight close and loses the grip before it settles.',
    '{name} chases the exit and eats the space you just created.',
  ],
  tempoFeint: [
    '{name} bites on the tempo feint and spends a reaction on nothing.',
    '{name} freezes for a half-beat as the rhythm changes.',
    '{name} guesses at the fake and gives you room to recover.',
  ],
  closedGuardShell: [
    '{name} tries to posture up, but your closed guard makes every strike start late.',
    '{name} presses from top and finds the hips locked down before damage can build.',
    '{name} has control, but your shell turns it into slow grip work instead of clean impact.',
  ],
  butterflyFrames: [
    '{name} floats over the butterfly hooks and cannot settle chest pressure cleanly.',
    '{name} tries to smash through, but the frames keep creating enough space to breathe.',
    '{name} follows the hips, yet the hooks keep their weight from becoming fully heavy.',
  ],
  lockdownStall: [
    '{name} wants to climb position, but the trapped leg keeps the top game stuck in place.',
    '{name} grinds from above while the lockdown burns time and steals clean posture.',
    '{name} keeps top position, but the leg entanglement makes damage arrive in pieces.',
  ],
  apexBreathing: ['{name} sees Apex Breathing restore control and starts forcing the pace harder.'],
  special: ['{name} recognizes the special burst and braces for something outside the normal rhythm.'],
  demonBackBurst: ['{name} feels Demon Back Burst change the whole exchange, as if the ceiling just moved upward.'],
};

export const MENTORS = [
  {
    id: 'tiredCoach',
    name: 'Coach Mara Venn',
    title: 'Tired Fundamentals Coach',
    rarity: 'Common',
    focus: ['technique', 'control'],
    autoTrainingIds: ['heavyBag'],
    autoRecoveryIds: [],
    minReputation: 0,
    minWins: 0,
    fee: 10000,
    successBonus: 35,
    lesson: 'She fixes your stance, then makes you repeat it until boredom becomes skill. Auto: Heavy Bag only.',
  },
  {
    id: 'dockVeteran',
    name: 'Old Iban',
    title: 'Dockside Clinch Veteran',
    rarity: 'Uncommon',
    focus: ['durability', 'willpower'],
    autoTrainingIds: ['roadwork', 'ironBody'],
    autoRecoveryIds: ['restDay'],
    minReputation: 8,
    minWins: 1,
    fee: 14000,
    successBonus: 20,
    lesson: 'He teaches clinch pressure with a towel, a wall, and zero sympathy. Auto: Roadwork, Iron Body, Rest Day.',
  },
  {
    id: 'mirrorAnalyst',
    name: 'Sera Quell',
    title: 'Pattern Analyst',
    rarity: 'Rare',
    focus: ['fightIq', 'reflexes'],
    autoTrainingIds: ['studyTape', 'reactionWall', 'breathAndGuard'],
    autoRecoveryIds: ['restDay', 'meditation'],
    minReputation: 20,
    minWins: 2,
    fee: 18000,
    successBonus: 10,
    lesson: 'She makes you watch the same ten seconds of footage until the mistake becomes obvious. Auto: tape, reactions, guard, breath recovery.',
  },
  {
    id: 'basementMaster',
    name: 'Master Kurogane Vale',
    title: 'Basement Circuit Master',
    rarity: 'Legendary',
    focus: ['strength', 'technique', 'aggression'],
    autoTrainingIds: ['heavyBag', 'roadwork', 'ironBody', 'sparring', 'killerInstinct', 'breathAndGuard'],
    autoRecoveryIds: ['restDay', 'clinic', 'meditation'],
    minReputation: 55,
    minWins: 4,
    fee: 26000,
    successBonus: 0,
    requiresHiddenWorld: true,
    lesson: 'He only teaches people who can survive being corrected. Auto: most normal training and supervised recovery.',
  },
  {
    id: 'apexConditioner',
    name: 'Dr. Sen Akari',
    title: 'Apex Conditioning Doctor',
    rarity: 'Mythic',
    focus: ['strength', 'speed', 'durability', 'technique', 'reflexes', 'control'],
    autoTrainingIds: 'all',
    autoRecoveryIds: 'all',
    minReputation: 125,
    minWins: 9,
    fee: 50000,
    successBonus: -8,
    requiresHiddenWorld: true,
    lesson: 'She builds schedules like fight camps and tracks your body like expensive machinery. Auto: all training and recovery, with better energy handling.',
  },
  {
    id: 'ashuraArchivist',
    name: 'The Ashura Archivist',
    title: 'Secret Lineage Keeper',
    rarity: 'Secret',
    focus: ['strength', 'speed', 'durability', 'technique', 'fightIq', 'willpower', 'reflexes', 'flexibility', 'aggression', 'control'],
    autoTrainingIds: 'all',
    autoRecoveryIds: 'all',
    minReputation: 220,
    minWins: 14,
    fee: 100000,
    successBonus: -20,
    requiresHiddenWorld: true,
    lesson: 'They do not coach so much as expose what your style is still hiding. Auto: all training and recovery, with the sharpest efficiency.',
  },
  {
    id: 'systemSage',
    name: 'The System Sage',
    title: 'Secret S-Rank Mentor',
    rarity: 'Secret',
    focus: ['strength', 'speed', 'durability', 'technique', 'fightIq', 'willpower', 'reflexes', 'flexibility', 'aggression', 'control'],
    autoTrainingIds: 'all',
    autoRecoveryIds: 'all',
    minReputation: 0,
    minWins: 0,
    fee: 0,
    successBonus: 100,
    trainingMultiplier: 2,
    requiresHiddenWorld: true,
    lesson: 'The Sage turns every session into a System correction. All normal training gains are doubled.',
  },
];

function starterMentor() {
  return clone(MENTORS.find((mentor) => mentor.id === 'tiredCoach'));
}

export const OPPONENTS = {
  alleyScrapper: {
    name: 'Deni "Bottlecap" Cruz',
    style: 'Alley Brawling',
    threat: 'Starter',
    tier: 'Local',
    power: 68,
    temperament: 'reckless pressure',
    strengths: ['head-first rushes', 'cheap shots', 'wild courage'],
    weakness: 'falls apart when forced to reset',
    reward: 120,
    rep: 4,
    risk: 3,
    requirements: {},
  },
  schoolWrestler: {
    name: 'Tomas Reed',
    style: 'School Wrestling',
    threat: 'Starter',
    tier: 'Local',
    power: 78,
    temperament: 'defensive grinder',
    strengths: ['double legs', 'top pressure', 'stubborn pace'],
    weakness: 'struggles with clean counters on entry',
    reward: 180,
    rep: 5,
    risk: 4,
    requirements: {},
  },
  juniorKarateka: {
    name: 'Paz Lin',
    style: 'Junior Karate',
    threat: 'Starter',
    tier: 'Local',
    power: 84,
    temperament: 'patient counter-striker',
    strengths: ['snap kicks', 'straight punches', 'clean exits'],
    weakness: 'panics when clinched hard',
    reward: 210,
    rep: 6,
    risk: 4,
    requirements: {},
  },
  backyardGrappler: {
    name: 'Omar "Seatbelt" Ives',
    style: 'Backyard Grappling',
    threat: 'Starter',
    tier: 'Local',
    power: 88,
    temperament: 'defensive grinder',
    strengths: ['body locks', 'scrambles', 'heavy rides'],
    weakness: 'walks into jabs while reaching',
    reward: 240,
    rep: 6,
    risk: 5,
    requirements: {},
  },
  localBrawler: {
    name: 'Mako "The Curb" Vale',
    style: 'Street Boxing',
    threat: 'Local',
    tier: 'Local',
    power: 95,
    temperament: 'reckless pressure',
    strengths: ['wide hooks', 'dirty clinch entries', 'raw aggression'],
    weakness: 'overcommits after missing',
    reward: 350,
    rep: 8,
    risk: 5,
    requirements: {},
  },
  rookieKickboxer: {
    name: 'Nella Voss',
    style: 'Rookie Kickboxing',
    threat: 'Local',
    tier: 'Local',
    power: 108,
    temperament: 'patient counter-striker',
    strengths: ['low kicks', 'distance traps', 'straight counters'],
    weakness: 'gets uncomfortable in pocket boxing',
    reward: 460,
    rep: 10,
    risk: 6,
    requirements: { age: 15 },
  },
  warehouseChamp: {
    name: 'Garrick Shaw',
    style: 'Warehouse Boxing',
    threat: 'Local',
    tier: 'Local',
    power: 125,
    temperament: 'reckless pressure',
    strengths: ['body hooks', 'dirty breaks', 'heavy hands'],
    weakness: 'gas tank dips after hard grappling',
    reward: 650,
    rep: 12,
    risk: 7,
    requirements: { reputation: 8 },
  },
  dojoProspect: {
    name: 'Iris Tan',
    style: 'Karate Clinch',
    threat: 'Skilled',
    tier: 'Local',
    power: 145,
    temperament: 'patient counter-striker',
    strengths: ['body kicks', 'frame traps', 'clean counters'],
    weakness: 'can be smothered before setting range',
    reward: 900,
    rep: 16,
    risk: 9,
    requirements: { age: 16, reputation: 12 },
  },
  basementJudoka: {
    name: 'Noam Saito',
    style: 'Basement Judo',
    threat: 'Underground',
    tier: 'Underground',
    power: 165,
    temperament: 'defensive grinder',
    strengths: ['hip throws', 'sleeve control', 'mat returns'],
    weakness: 'eats damage before grips are set',
    reward: 1300,
    rep: 20,
    risk: 10,
    requirements: { hiddenWorld: true, wins: 1 },
  },
  pitMuay: {
    name: 'Soraya "Knee Tax" Damas',
    style: 'Pit Muay Thai',
    threat: 'Underground',
    tier: 'Underground',
    power: 188,
    temperament: 'reckless pressure',
    strengths: ['knees', 'elbows', 'clinch storms'],
    weakness: 'overpursues after hurting opponents',
    reward: 1700,
    rep: 24,
    risk: 12,
    requirements: { hiddenWorld: true, reputation: 25 },
  },
  ghostStepAcolyte: {
    name: 'Evan Quell',
    style: 'Ghost Step Footwork',
    threat: 'Underground',
    tier: 'Underground',
    power: 205,
    temperament: 'patient counter-striker',
    strengths: ['angle exits', 'blind-side jabs', 'trap steps'],
    weakness: 'hates being trapped near walls',
    reward: 2100,
    rep: 28,
    risk: 12,
    requirements: { hiddenWorld: true, wins: 3 },
  },
  corporateGuard: {
    name: 'Bastien Rook',
    style: 'Security Grappling',
    threat: 'High',
    tier: 'Corporate',
    power: 215,
    temperament: 'defensive grinder',
    strengths: ['wrist control', 'cage pressure', 'stamina drain'],
    weakness: 'slow to chase evasive opponents',
    reward: 2400,
    rep: 30,
    risk: 14,
    requirements: { hiddenWorld: true, reputation: 55, age: 18 },
  },
  sponsorChampion: {
    name: 'Malika Stern',
    style: 'Corporate Savate',
    threat: 'High',
    tier: 'Corporate',
    power: 250,
    temperament: 'patient counter-striker',
    strengths: ['long kicks', 'contract pressure', 'perfect pacing'],
    weakness: 'can be bullied if momentum swings early',
    reward: 4200,
    rep: 42,
    risk: 16,
    requirements: { hiddenWorld: true, reputation: 70, age: 19 },
  },
  ironVeinGatekeeper: {
    name: 'Bruno Karg',
    style: 'Iron Vein Conditioning',
    threat: 'High',
    tier: 'Corporate',
    power: 285,
    temperament: 'defensive grinder',
    strengths: ['body armor guard', 'pressure walks', 'late-round damage'],
    weakness: 'slow turns against lateral movement',
    reward: 5800,
    rep: 55,
    risk: 19,
    requirements: { hiddenWorld: true, reputation: 95, wins: 6 },
  },
  apexTrialist: {
    name: 'Yuri "Glass Crown" Mael',
    style: 'Apex Trial Hybrid',
    threat: 'Monster',
    tier: 'Monster',
    power: 340,
    temperament: 'patient counter-striker',
    strengths: ['adaptation', 'limit breaks', 'cruel counters'],
    weakness: 'ego invites risky exchanges',
    reward: 9000,
    rep: 80,
    risk: 24,
    requirements: { hiddenWorld: true, reputation: 140, wins: 9, age: 21 },
  },
  firstMonsterEcho: {
    name: 'The Nameless Echo',
    style: 'Monster State',
    threat: 'Legend',
    tier: 'Monster',
    power: 430,
    temperament: 'reckless pressure',
    strengths: ['inhuman pace', 'fear pressure', 'bone-deep damage'],
    weakness: 'control collapses if forced to miss repeatedly',
    reward: 16000,
    rep: 130,
    risk: 32,
    requirements: { hiddenWorld: true, reputation: 220, wins: 12, age: 23 },
  },
  fangOfObsidian: {
    name: 'Razan "Fang of Obsidian" Kael',
    style: 'Association Killing Karate',
    threat: 'True Monster',
    tier: 'Association Tournament',
    power: 540,
    temperament: 'patient counter-striker',
    strengths: ['perfect counters', 'bone-breaking low kicks', 'round stealing'],
    weakness: 'will duel instead of taking easy exits',
    reward: 24000,
    rep: 170,
    risk: 42,
    requirements: { association: true, reputation: 160, wins: 8, age: 21 },
  },
  titanLedger: {
    name: 'Marius "Titan Ledger" Vorn',
    style: 'Corporate Sumo Crusher',
    threat: 'True Monster',
    tier: 'Association Tournament',
    power: 610,
    temperament: 'defensive grinder',
    strengths: ['wall pressure', 'rib-crushing grips', 'impossible base'],
    weakness: 'needs the center to become inevitable',
    reward: 31000,
    rep: 210,
    risk: 48,
    requirements: { association: true, reputation: 175, wins: 9, age: 21 },
  },
  voidNeedle: {
    name: 'Akiro "Void Needle" Sen',
    style: 'Assassin Point Striking',
    threat: 'True Monster',
    tier: 'Association Tournament',
    power: 690,
    temperament: 'patient counter-striker',
    strengths: ['nerve shots', 'vanishing entries', 'silent feints'],
    weakness: 'fragile if forced into sustained clinch damage',
    reward: 42000,
    rep: 260,
    risk: 55,
    requirements: { association: true, reputation: 180, wins: 10, age: 22 },
  },
  calamityKing: {
    name: 'Daejin "Calamity King" Rook',
    style: 'Monster Hybrid',
    threat: 'Final Bracket',
    tier: 'Association Tournament',
    power: 820,
    temperament: 'reckless pressure',
    strengths: ['inhuman pace', 'adaptive brutality', 'fight-ending bursts'],
    weakness: 'burns hot enough to be baited by elite control',
    reward: 70000,
    rep: 420,
    risk: 70,
    requirements: { association: true, reputation: 260, wins: 14, age: 23 },
  },
  yujiriHanmae: {
    name: 'Yujiri Hanmae',
    style: 'Demon Apex Brawling',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1600,
    temperament: 'reckless pressure',
    strengths: ['demon pressure', 'inhuman grip', 'fear aura'],
    weakness: 'ego invites direct challenges',
    reward: 300000,
    rep: 500,
    risk: 90,
    skillReward: 'demonPressure',
    requirements: { hiddenWorld: true, reputation: 100, wins: 6, age: 18 },
  },
  ohmoTokitoo: {
    name: 'Ohmo Tokitoo',
    style: 'Redirection Phantom Style',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1180,
    temperament: 'patient counter-striker',
    strengths: ['redirection', 'phantom footwork', 'finishing forms'],
    weakness: 'body debt shows if forced into long attrition',
    reward: 180000,
    rep: 360,
    risk: 70,
    skillReward: 'redirectionCounter',
    requirements: { hiddenWorld: true, reputation: 75, wins: 5, age: 17 },
  },
  raianKuriya: {
    name: 'Raian Kuriya',
    style: 'Release Assassin Rush',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1350,
    temperament: 'reckless pressure',
    strengths: ['release rush', 'assassin angles', 'sadistic pace'],
    weakness: 'can be baited into wasting burst output',
    reward: 220000,
    rep: 420,
    risk: 82,
    skillReward: 'releaseRush',
    requirements: { hiddenWorld: true, reputation: 90, wins: 6, age: 18 },
  },
  bakiyaMaw: {
    name: 'Bakiya Maw',
    style: 'Arena Prodigy Hybrid',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1250,
    temperament: 'patient counter-striker',
    strengths: ['adaptation', 'demon back burst', 'body reading'],
    weakness: 'answers pride with pride',
    reward: 200000,
    rep: 380,
    risk: 76,
    skillReward: 'demonBackBurst',
    requirements: { hiddenWorld: true, reputation: 85, wins: 5, age: 18 },
  },
  gokiShibukawae: {
    name: 'Goki Shibukawae',
    style: 'Ancient Soft Lock',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 980,
    temperament: 'defensive grinder',
    strengths: ['joint ghosts', 'old-master timing', 'balance theft'],
    weakness: 'raw pace can force rushed grips',
    reward: 120000,
    rep: 300,
    risk: 58,
    skillReward: 'boneBind',
    requirements: { hiddenWorld: true, reputation: 60, wins: 4, age: 17 },
  },
  doppoOrochino: {
    name: 'Doppo Orochino',
    style: 'Killing Karate Iron Body',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1050,
    temperament: 'defensive grinder',
    strengths: ['adamant guard', 'karate counters', 'bone conditioning'],
    weakness: 'commits to proving durability',
    reward: 140000,
    rep: 320,
    risk: 62,
    skillReward: 'adamantGuard',
    requirements: { hiddenWorld: true, reputation: 65, wins: 4, age: 17 },
  },
  kurokiGensae: {
    name: 'Kuroki Gensae',
    style: 'Devil Lance Karate',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1450,
    temperament: 'defensive grinder',
    strengths: ['stone guard', 'devil lance counters', 'master timing'],
    weakness: 'can be forced to respect repeated tempo changes',
    reward: 260000,
    rep: 460,
    risk: 84,
    skillReward: 'parryFrame',
    requirements: { hiddenWorld: true, reputation: 95, wins: 7, age: 19 },
  },
  agitooKanoh: {
    name: 'Agitoo Kanoh',
    style: 'Evolution Fang Hybrid',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1400,
    temperament: 'patient counter-striker',
    strengths: ['adaptive shifts', 'formless entries', 'arena IQ'],
    weakness: 'early reads matter before adaptation settles',
    reward: 240000,
    rep: 440,
    risk: 80,
    skillReward: 'apexBreathing',
    requirements: { hiddenWorld: true, reputation: 90, wins: 7, age: 19 },
  },
  wakatsukiTakeshee: {
    name: 'Wakatsuki Takeshee',
    style: 'Superman Syndrome Crusher',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1320,
    temperament: 'reckless pressure',
    strengths: ['superhuman strength', 'body-breaking rushes', 'blast core threat'],
    weakness: 'lateral resets make the big shot turn late',
    reward: 210000,
    rep: 390,
    risk: 78,
    skillReward: 'bodyShot',
    requirements: { hiddenWorld: true, reputation: 80, wins: 6, age: 18 },
  },
  rolonDonairee: {
    name: 'Rolon Donairee',
    style: 'Invisible Elbow Combat',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1280,
    temperament: 'patient counter-striker',
    strengths: ['compact elbows', 'veteran reads', 'pressure traps'],
    weakness: 'sustained body work can make the compact shell open',
    reward: 205000,
    rep: 385,
    risk: 74,
    skillReward: 'slipCross',
    requirements: { hiddenWorld: true, reputation: 82, wins: 6, age: 18 },
  },
  jakkuHanmoe: {
    name: 'Jakku Hanmoe',
    style: 'Titan Bone Brawling',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1500,
    temperament: 'reckless pressure',
    strengths: ['long-frame pressure', 'bone-deep toughness', 'dirty angles'],
    weakness: 'ego and reach can be punished by tight counters',
    reward: 270000,
    rep: 470,
    risk: 88,
    skillReward: 'highGuardCrash',
    requirements: { hiddenWorld: true, reputation: 100, wins: 8, age: 19 },
  },
  katsumiOrochino: {
    name: 'Katsumi Orochino',
    style: 'Prodigy Karate Whip',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1120,
    temperament: 'patient counter-striker',
    strengths: ['mach-speed strikes', 'karate precision', 'young monster courage'],
    weakness: 'can be clinched before the whip motion fully loads',
    reward: 155000,
    rep: 335,
    risk: 66,
    skillReward: 'interceptKnee',
    requirements: { hiddenWorld: true, reputation: 70, wins: 5, age: 17 },
  },
  jinnKazame: {
    name: 'Jinn Kazame',
    style: 'Devil Blood Karate',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1380,
    temperament: 'patient counter-striker',
    strengths: ['cursed karate', 'Mishime pressure', 'rage control'],
    weakness: 'discipline cracks when the bloodline is baited',
    reward: 235000,
    rep: 430,
    risk: 82,
    skillReward: 'interceptKnee',
    requirements: { hiddenWorld: true, reputation: 90, wins: 7, age: 18 },
  },
  kazuroMishime: {
    name: 'Kazuro Mishime',
    style: 'Devil Gene Mishime Karate',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1580,
    temperament: 'reckless pressure',
    strengths: ['electric pressure', 'devil gene burst', 'family-war counters'],
    weakness: 'pride keeps him inside dangerous exchanges',
    reward: 295000,
    rep: 500,
    risk: 91,
    skillReward: 'demonPressure',
    requirements: { hiddenWorld: true, reputation: 110, wins: 9, age: 20 },
  },
  heihaMishime: {
    name: 'Heiha Mishime',
    style: 'Iron Mishime Karate',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1500,
    temperament: 'defensive grinder',
    strengths: ['old monster durability', 'electric counters', 'ruthless timing'],
    weakness: 'will over-test his toughness to prove dominance',
    reward: 275000,
    rep: 470,
    risk: 88,
    skillReward: 'highGuardCrash',
    requirements: { hiddenWorld: true, reputation: 100, wins: 8, age: 20 },
  },
  kinggJaguar: {
    name: 'Kingg Jaguar',
    style: 'Jaguar Mask Pro Wrestling',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1220,
    temperament: 'defensive grinder',
    strengths: ['chain throws', 'mask roar pressure', 'suplex traps'],
    weakness: 'must connect grips before the monster offense starts',
    reward: 195000,
    rep: 370,
    risk: 72,
    skillReward: 'bodyLockTrip',
    requirements: { hiddenWorld: true, reputation: 75, wins: 6, age: 18 },
  },
  paulPheonixx: {
    name: 'Paul Pheonixx',
    style: 'Biker Deathfist Karate',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1160,
    temperament: 'reckless pressure',
    strengths: ['one-shot right hand', 'stubborn rushes', 'wild comeback nerve'],
    weakness: 'big swings can be timed and redirected',
    reward: 175000,
    rep: 350,
    risk: 68,
    skillReward: 'bodyShot',
    requirements: { hiddenWorld: true, reputation: 70, wins: 5, age: 18 },
  },
  yoshiMitsuo: {
    name: 'Yoshi Mitsuo',
    style: 'Trick Blade Ninjutsu',
    threat: 'Special Boss',
    tier: 'Special Fight',
    power: 1260,
    temperament: 'patient counter-striker',
    strengths: ['odd rhythm', 'blade feints', 'vanishing angles'],
    weakness: 'unusual timing can be crowded before it unfolds',
    reward: 205000,
    rep: 390,
    risk: 75,
    skillReward: 'voidStep',
    requirements: { hiddenWorld: true, reputation: 82, wins: 6, age: 18 },
  },
};

const FIRST_NAMES = ['Ren', 'Mika', 'Arlo', 'Sena', 'Niko', 'Juno', 'Vale', 'Kira'];
const LAST_NAMES = ['Cross', 'Morrow', 'Stone', 'Reyes', 'Ashford', 'Kade', 'Santos', 'Noir'];
const WEALTH = ['poor', 'working class', 'stable', 'comfortable', 'wealthy'];
const TEMPERAMENTS = ['calm', 'reckless', 'focused', 'charming', 'stubborn', 'hungry'];
const RIVAL_FIRST_NAMES = ['Ryo', 'Mika', 'Talen', 'Juno', 'Sora', 'Viktor', 'Nari', 'Kade'];
const RIVAL_NICKNAMES = ['The Mirror', 'Second Bell', 'Noon Ghost', 'The Debt', 'Spite Engine', 'Black Tape'];
const COACH_FIRST_NAMES = ['Toma', 'Yui', 'Nero', 'Mina', 'Kaito', 'Sable', 'Iko', 'Dane'];
const COACH_NICKNAMES = ['Raw Prospect', 'Backroom Kid', 'Heavy Hands', 'Quiet Round', 'Iron Hope', 'Tape Student'];
const NEIGHBORHOODS = ['port district', 'old suburb', 'factory ward', 'market city', 'hill town'];

function createRng(seed = Date.now()) {
  let state = Math.abs(Math.floor(seed)) || 1;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function clone(value) {
  return structuredClone(value);
}

function pick(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

function cleanFirstName(firstName) {
  const cleaned = String(firstName ?? '').replace(/\s+/g, ' ').trim();
  return cleaned.slice(0, 24);
}

function labelFromId(value) {
  return String(value ?? '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .trim();
}

function identityFor(firstName, clan) {
  const chosenFirstName = cleanFirstName(firstName);
  const lastName = clan?.name ?? '';
  return {
    firstName: chosenFirstName,
    lastName,
    name: `${chosenFirstName} ${lastName}`.trim(),
  };
}

function renameForClan(life, clan) {
  return {
    ...life.identity,
    ...identityFor(life.identity?.firstName ?? life.identity?.name, clan),
  };
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function clampFloat(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function normalizeSocial(life) {
  return {
    platform: life.social?.platform ?? 'Underground Feed',
    followers: Math.max(0, Math.floor(life.social?.followers ?? 0)),
    calledOutTarget: life.social?.calledOutTarget ?? null,
    lastPostMonth: life.social?.lastPostMonth ?? null,
    lastPost: life.social?.lastPost ?? null,
    postCount: Math.max(0, Math.floor(life.social?.postCount ?? 0)),
  };
}

function addFollowers(life, amount) {
  life.social = normalizeSocial(life);
  life.social.followers = Math.max(0, Math.floor(life.social.followers + amount));
}

function applyFollowerAgeUpIncome(life) {
  life.social = normalizeSocial(life);
  const followerIncome = Math.max(0, Math.floor(life.social.followers));
  if (followerIncome > 0) life.resources.money += followerIncome;
  return followerIncome;
}

function hunterPower(life) {
  const stats = getHunterEffectiveStats(life);
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
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const shadowPower = shadowArmyStrength(hunter) * 18;
  return Math.round(statPower + hunter.level * 8 + shadowPower);
}

function grantSystemPerk(hunterWorld, perkId, count = 1) {
  const option = systemPerkOption(perkId);
  if (!option) return false;
  const perks = normalizeSystemPerks(hunterWorld.unlockedSystemPerks);
  const existing = perks.find((item) => item.id === perkId);
  const maxStacks = option.maxStacks ?? 1;
  if (existing) existing.count = Math.min(maxStacks, existing.count + Math.max(1, Math.floor(count)));
  else perks.push({ id: perkId, count: Math.min(maxStacks, Math.max(1, Math.floor(count))) });
  hunterWorld.unlockedSystemPerks = perks;
  return true;
}

export function getHunterAssociationReview(life) {
  const hunter = normalizeHunterWorld(life?.hunterWorld);
  const currentIndex = HUNTER_RANKS.indexOf(hunter.rank);
  const nextRank = HUNTER_RANKS[currentIndex + 1] ?? null;
  const requirement = nextRank ? HUNTER_RANK_REQUIREMENTS[nextRank] : null;
  const power = hunterPower({ ...life, hunterWorld: hunter });
  const requirements = requirement ? [
    { id: 'level', label: 'Level', current: hunter.level, required: requirement.level, met: hunter.level >= requirement.level },
    { id: 'gates', label: 'Gates Cleared', current: hunter.gatesCleared, required: requirement.gatesCleared, met: hunter.gatesCleared >= requirement.gatesCleared },
    { id: 'power', label: 'Hunter Power', current: power, required: requirement.power, met: power >= requirement.power },
  ] : [];
  return {
    currentRank: hunter.rank,
    nextRank,
    power,
    maxRank: !nextRank,
    eligible: Boolean(requirement) && requirements.every((item) => item.met),
    requirements,
    rewards: requirement
      ? [`+${10 + currentIndex * 4} reputation`, `+$${750 * (currentIndex + 1)}`, '+2 Hunter stat points', nextRank === 'S' ? 'S-rank System signal' : `${nextRank}-rank Gate access`]
      : ['Maximum Association rank reached'],
  };
}

export function getShadowArmySummary(life) {
  const hunter = normalizeHunterWorld(life?.hunterWorld);
  const totalStrength = shadowArmyStrength(hunter);
  const armyPower = shadowArmyPower(hunter);
  return {
    count: hunter.shadowArmy.length,
    totalStrength,
    armyPower,
    arisePrompt: hunter.arisePrompt,
    roster: hunter.shadowArmy.map((shadow) => ({
      ...shadow,
      sourceBoss: HUNTER_MONSTERS[shadow.monsterId]?.name ?? shadow.sourceBoss ?? labelFromId(shadow.monsterId),
      strength: shadowStrength(shadow),
      armyPower: shadow.armyPower ?? shadowStrength(shadow) * 10,
    })),
    bonuses: [
      `Domain army pressure: ${armyPower} conquest power`,
      `Territory control bonus: +${hunter.shadowArmy.length * 2 + totalStrength}`,
      hunter.shadowArmy.length >= 3 ? 'Monarch Trace readiness: online' : `Monarch Trace readiness: ${hunter.shadowArmy.length}/3 shadows`,
    ],
  };
}

export function getHunterMilestones(life) {
  const hunter = normalizeHunterWorld(life?.hunterWorld);
  const shadowSummary = getShadowArmySummary({ ...life, hunterWorld: hunter });
  const monarchReady = hunter.rank === 'S' && hunter.level >= 40 && hunter.gatesCleared >= 50 && hunter.shadowArmy.length >= 3;
  return [
    {
      id: 'daily-discipline',
      title: 'Daily Discipline',
      current: hunter.dailyQuestsCompleted,
      target: 10,
      complete: hunter.dailyQuestsCompleted >= 10,
      subtitle: `${hunter.dailyQuestsCompleted}/10 System Daily Quests completed`,
    },
    {
      id: 'gate-clearer',
      title: 'Gate Clearer',
      current: hunter.gatesCleared,
      target: 25,
      complete: hunter.gatesCleared >= 25,
      subtitle: `${hunter.gatesCleared}/25 Gates cleared`,
    },
    {
      id: 's-rank',
      title: 'S-Rank Hunter',
      current: HUNTER_RANKS.indexOf(hunter.rank),
      target: HUNTER_RANKS.indexOf('S'),
      complete: hunter.rank === 'S',
      subtitle: `${hunter.rank}-rank Association file`,
    },
    {
      id: 'shadow-army',
      title: 'Shadow Army',
      current: hunter.shadowArmy.length,
      target: 3,
      complete: hunter.shadowArmy.length >= 3,
      subtitle: `${hunter.shadowArmy.length}/3 shadows / ${shadowSummary.totalStrength} army strength`,
    },
    {
      id: 'monarch-trace',
      title: 'Monarch Trace',
      current: hunter.monarchTrace.stage,
      target: 4,
      ready: monarchReady && !hunter.monarchTrace.completed,
      complete: hunter.monarchTrace.completed,
      subtitle: hunter.monarchTrace.completed
        ? 'Monarch Trace completed'
        : monarchReady
          ? 'S-rank shadow vessel ready'
          : 'Requires S-rank, Level 40, 50 Gates, and 3 shadows',
    },
  ];
}

export function getHunterEffectiveStats(life) {
  const base = life.stats ?? {};
  const hunter = normalizeHunterWorld(life.hunterWorld);
  if (!hunter.unlocked || !hunter.playerAwakened) return { ...base };
  const stats = hunter.stats;
  return {
    ...base,
    strength: (base.strength ?? 0) + stats.strength * 10,
    speed: (base.speed ?? 0) + stats.agility * 4,
    reflexes: (base.reflexes ?? 0) + stats.agility * 3 + stats.sense * 2,
    flexibility: (base.flexibility ?? 0) + stats.agility * 3,
    durability: (base.durability ?? 0) + stats.vitality * 5,
    willpower: (base.willpower ?? 0) + stats.vitality * 5,
    fightIq: (base.fightIq ?? 0) + stats.sense * 3 + stats.intelligence * 4,
    technique: (base.technique ?? 0) + stats.sense * 3,
    control: (base.control ?? 0) + stats.sense * 2 + stats.intelligence * 6,
    aggression: base.aggression ?? 0,
  };
}

function usesHunterCombatOverlay(life) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  return hunter.unlocked && hunter.playerAwakened;
}

function withPlayerCombatStats(life) {
  return usesHunterCombatOverlay(life)
    ? { ...life, stats: getHunterEffectiveStats(life) }
    : life;
}

export function maxLifeHealth(life) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const usesHunterStats = usesHunterCombatOverlay(life);
  const stats = usesHunterStats ? getHunterEffectiveStats(life) : life.stats;
  return fightHealthFromStats(stats) + (usesHunterStats ? hunter.stats.vitality * 16 : 0);
}

function staminaFromStats(stats = {}) {
  const staminaGrowth =
    Math.max(0, (stats.willpower ?? 0) - 30) * 0.14 +
    Math.max(0, (stats.durability ?? 0) - 30) * 0.07 +
    Math.max(0, (stats.control ?? 0) - 30) * 0.07 +
    Math.max(0, (stats.speed ?? 0) - 30) * 0.04;
  return clamp(100 + staminaGrowth, 100, 450);
}

export function maxLifeEnergy(life) {
  const usesHunterStats = usesHunterCombatOverlay(life);
  const stats = usesHunterStats ? getHunterEffectiveStats(life) : life.stats;
  return staminaFromStats(stats);
}

function clampLifeResource(life, resource, value) {
  if (resource === 'health') return clamp(value, 0, maxLifeHealth(life));
  if (resource === 'energy') return clamp(value, 0, maxLifeEnergy(life));
  return clamp(value);
}

function applyVitalCapGrowth(before, next) {
  const healthGain = maxLifeHealth(next) - maxLifeHealth(before);
  const energyGain = maxLifeEnergy(next) - maxLifeEnergy(before);
  if (healthGain > 0) next.resources.health = clampLifeResource(next, 'health', next.resources.health + healthGain);
  else next.resources.health = clampLifeResource(next, 'health', next.resources.health);
  if (energyGain > 0) next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy + energyGain);
  else next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy);
}

function combatResourceValue(value, max, min = 0) {
  if (max > 100 && Math.round(value ?? 0) === 100) return max;
  return clamp(value ?? max, min, max);
}

function hunterXpForNextLevel(level) {
  return 100 + Math.max(1, level) * 35;
}

function hasSystemPerk(life, perk) {
  return systemPerkCount(life, perk) > 0;
}

function systemPerkCount(life, perk) {
  return normalizeHunterWorld(life.hunterWorld).unlockedSystemPerks.find((item) => item.id === perk)?.count ?? 0;
}

function systemPerkValue(life, perk, fallback = 0) {
  const count = systemPerkCount(life, perk);
  if (!count) return fallback;
  return (SYSTEM_PERK_VALUES[perk] ?? fallback) * count;
}

function createHunterLevelRewardChoice(life, level) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const availableOptions = Object.values(HUNTER_LEVEL_REWARD_OPTIONS)
    .filter((option) => option.type !== 'perk' || (hunter.unlockedSystemPerks.find((item) => item.id === option.perk)?.count ?? 0) < (option.maxStacks ?? 1));
  const optionIds = availableOptions
    .map((option) => ({
      id: option.id,
      roll: deterministicRoll(life.rngSeed, 'hunter-level-reward', level, lifeMonth(life), option.id),
    }))
    .sort((a, b) => a.roll - b.roll || a.id.localeCompare(b.id))
    .slice(0, 5)
    .map(({ id }) => clone(HUNTER_LEVEL_REWARD_OPTIONS[id]));
  return {
    id: `hunter-level-${level}-${lifeMonth(life)}-${optionIds.map((option) => option.id).join('-')}`,
    level,
    options: optionIds,
  };
}

function grantHunterXp(life, amount) {
  life.hunterWorld = normalizeHunterWorld(life.hunterWorld);
  life.hunterWorld.xp += Math.max(0, Math.floor(amount));
  while (life.hunterWorld.xp >= hunterXpForNextLevel(life.hunterWorld.level)) {
    life.hunterWorld.xp -= hunterXpForNextLevel(life.hunterWorld.level);
    life.hunterWorld.level += 1;
    life.hunterWorld.statPoints += 5;
    life.hunterWorld.pendingLevelRewards.push(createHunterLevelRewardChoice(life, life.hunterWorld.level));
  }
}

export function claimHunterLevelReward(life, rewardId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const pending = next.hunterWorld.pendingLevelRewards[0];
  const reward = pending?.options?.find((option) => option.id === rewardId);
  if (!pending || !reward) return addLog(life, 'No matching Hunter level reward is pending.', 'world');

  if (reward.type === 'hunterStat' && DEFAULT_HUNTER_STATS[reward.stat] !== undefined) {
    next.hunterWorld.stats[reward.stat] += Math.max(0, Math.floor(reward.amount ?? 0));
  } else if (reward.type === 'allHunterStats') {
    for (const stat of Object.keys(DEFAULT_HUNTER_STATS)) next.hunterWorld.stats[stat] += Math.max(0, Math.floor(reward.amount ?? 0));
  } else if (reward.type === 'fatigue') {
    next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + Math.round(reward.amount ?? 0));
  } else if (reward.type === 'recovery') {
    next.resources.health = clampLifeResource(next, 'health', next.resources.health + Math.round(reward.health ?? 0));
    next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy + Math.round(reward.energy ?? 0));
  } else if (reward.type === 'money') {
    next.resources.money += Math.max(0, Math.floor(reward.amount ?? 0));
  } else if (reward.type === 'reputation') {
    next.resources.reputation = clamp(next.resources.reputation + Math.round(reward.amount ?? 0));
  } else if (reward.type === 'perk' && reward.perk) {
    const perks = normalizeSystemPerks(next.hunterWorld.unlockedSystemPerks);
    const existing = perks.find((item) => item.id === reward.perk);
    const maxStacks = reward.maxStacks ?? systemPerkOption(reward.perk)?.maxStacks ?? 1;
    if (existing) existing.count = Math.min(maxStacks, existing.count + 1);
    else perks.push({ id: reward.perk, count: 1 });
    next.hunterWorld.unlockedSystemPerks = perks;
  }

  next.hunterWorld.pendingLevelRewards = next.hunterWorld.pendingLevelRewards.slice(1);
  activatePendingArisePrompt(next.hunterWorld);
  return addLog(next, `System Level Reward claimed: ${reward.label}.`, 'world');
}

function normalGateRanksForHunter(hunter) {
  return {
    E: ['E'],
    D: ['E', 'D'],
    C: ['D', 'C'],
    B: ['C', 'B'],
    A: ['B', 'A'],
    S: ['A', 'S'],
  }[hunter.rank] ?? ['E'];
}

function dangerGateRankForHunter(hunter) {
  const unlocks = {
    E: { level: 4, rank: 'D' },
    D: { level: 8, rank: 'C' },
    C: { level: 15, rank: 'B' },
    B: { level: 24, rank: 'A' },
    A: { level: 36, rank: 'S' },
  };
  const danger = unlocks[hunter.rank];
  return danger && hunter.level >= danger.level ? danger.rank : null;
}

function dungeonRewardAmount(amount, isRedGate) {
  return Math.round(amount * (isRedGate ? 1.75 : 1));
}

function dungeonLootDrops(life, dungeon, encounter, monster) {
  const roomKey = `${dungeon.id}-${dungeon.encounterIndex}-${monster?.id ?? monster?.name ?? 'monster'}`;
  const drops = [];
  const add = (id, quantity = 1) => drops.push({ id, quantity });
  if (encounter.isBoss) {
    add('bossEssence', dungeon.isRedGate ? 2 : 1);
    if (dungeon.isRedGate) add('redGateShard');
    const weaponRoll = deterministicRoll(life.rngSeed, roomKey, dungeon.rank, 'boss-weapon');
    if (weaponRoll < (dungeon.isRedGate ? 0.42 : 0.2)) {
      add(dungeon.rank === 'A' || dungeon.rank === 'S' ? 'reaperScythe' : dungeon.rank === 'C' || dungeon.rank === 'B' ? 'manaLongsword' : 'knightDagger');
    }
    const specialRoll = deterministicRoll(life.rngSeed, roomKey, dungeon.rank, 'boss-special');
    if (specialRoll < (dungeon.isRedGate ? 0.36 : 0.16)) add(specialRoll < 0.06 ? 'awakeningRune' : 'monarchVial');
    return drops;
  }
  add(dungeon.isRedGate ? 'gateShard' : 'monsterCore');
  const consumableRoll = deterministicRoll(life.rngSeed, roomKey, dungeon.rank, 'room-consumable');
  if (consumableRoll < (dungeon.isRedGate ? 0.55 : 0.28)) add(consumableRoll < 0.14 ? 'dungeonElixir' : 'manaAmpoule');
  return drops;
}

function awardDungeonLoot(life, dungeon, encounter, monster) {
  const drops = dungeonLootDrops(life, dungeon, encounter, monster);
  for (const drop of drops) addHunterItem(life.hunterWorld, drop.id, drop.quantity);
  return drops;
}

function itemDropText(drop) {
  const item = HUNTER_ITEM_CATALOG[drop.id];
  return `${item?.label ?? drop.id}${drop.quantity > 1 ? ` x${drop.quantity}` : ''}`;
}

function gateEncounterList(template, isRedGate) {
  const count = Math.min(5, HUNTER_DUNGEON_TIERS[template.rank].fights + (isRedGate ? 1 : 0));
  const encounters = [];
  for (let index = 0; index < count - 1; index += 1) {
    encounters.push({
      monsterId: template.normals[index % template.normals.length],
      room: index + 1,
      isBoss: false,
    });
  }
  encounters.push({
    monsterId: isRedGate ? RED_GATE_BOSS_IDS[template.rank] : template.boss,
    room: count,
    isBoss: true,
  });
  return encounters;
}

function selectDungeonTemplate(life, rank, slot, isRedGate = false, excludedTemplateIds = []) {
  const templates = HUNTER_DUNGEON_TEMPLATES[rank];
  const eligible = templates.filter((template) => !excludedTemplateIds.includes(template.id));
  const available = eligible.length ? eligible : templates;
  const roll = deterministicRoll(life.rngSeed, lifeMonth(life), rank, slot, life.hunterWorld?.gatesCleared ?? 0, isRedGate ? 'red-gate' : 'gate-board');
  return { ...available[Math.floor(roll * available.length) % available.length], rank };
}

function createGateOffer(life, rank, slot, { isRedGate = false, danger = false, excludedTemplateIds = [] } = {}) {
  const template = selectDungeonTemplate(life, rank, slot, isRedGate, excludedTemplateIds);
  const rewards = HUNTER_DUNGEON_TIERS[rank];
  const encounters = gateEncounterList(template, isRedGate);
  const modifierRoll = deterministicRoll(life.rngSeed, lifeMonth(life), rank, slot, template.id, isRedGate ? 'red-modifier' : 'modifier');
  const modifier = isRedGate
    ? { id: 'red-overflow', label: 'Red Overflow', danger: 'Extreme', loot: '+Red Gate loot', scan: 'The Gate has already started rewriting the room sequence.' }
    : HUNTER_GATE_MODIFIERS[Math.floor(modifierRoll * HUNTER_GATE_MODIFIERS.length) % HUNTER_GATE_MODIFIERS.length];
  return {
    id: `gate-${lifeMonth(life)}-${life.hunterWorld?.gatesCleared ?? 0}-${slot}-${template.id}${isRedGate ? '-red' : ''}`,
    templateId: template.id,
    name: isRedGate ? `RED GATE: ${template.name}` : template.name,
    theme: template.theme,
    rank,
    isRedGate,
    danger,
    modifier,
    encounters,
    bossName: HUNTER_MONSTERS[encounters.at(-1).monsterId].name,
    rewardsPreview: {
      roomXp: dungeonRewardAmount(rewards.room.xp, isRedGate),
      roomMoney: dungeonRewardAmount(rewards.room.money, isRedGate),
      bossXp: dungeonRewardAmount(rewards.boss.xp, isRedGate),
      bossMoney: dungeonRewardAmount(rewards.boss.money, isRedGate),
      statRewards: rewards.boss.stats + (isRedGate ? 1 : 0),
      danger: modifier.danger,
      loot: modifier.loot,
    },
  };
}

function createHunterGateBoard(life) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const ranks = normalGateRanksForHunter(hunter);
  const highestRank = ranks.at(-1);
  const offers = [];
  const templateIds = [];
  if (hunter.redGatePending) {
    offers.push(createGateOffer(life, highestRank, 0, { isRedGate: true, danger: true, excludedTemplateIds: templateIds }));
    templateIds.push(offers.at(-1).templateId);
  }
  const normalSlots = 3 - offers.length;
  const dangerRank = dangerGateRankForHunter(hunter);
  for (let index = 0; index < normalSlots; index += 1) {
    const slot = offers.length;
    const isDangerOffer = !hunter.redGatePending && Boolean(dangerRank) && index === normalSlots - 1;
    const rank = isDangerOffer ? dangerRank : ranks[index % ranks.length];
    offers.push(createGateOffer(life, rank, slot, { danger: isDangerOffer, excludedTemplateIds: templateIds }));
    templateIds.push(offers.at(-1).templateId);
  }
  return offers;
}

function redGateChance(life) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const chance = 10 + HUNTER_RANKS.indexOf(hunter.rank) * 2 + Math.floor(hunter.gatesCleared / 5);
  return Math.min(25, chance) / 100;
}

function randomHunterStatRewards(life, count, salt) {
  const statNames = Object.keys(DEFAULT_HUNTER_STATS);
  const gained = [];
  for (let index = 0; index < count; index += 1) {
    const roll = deterministicRoll(life.rngSeed, salt, lifeMonth(life), index, life.hunterWorld.gatesCleared);
    const stat = statNames[Math.floor(roll * statNames.length) % statNames.length];
    life.hunterWorld.stats[stat] += 1;
    gained.push(stat);
  }
  return gained;
}

const HUNTER_DAILY_QUEST_TEMPLATES = [
  {
    id: 'penalty-zone-drill',
    tier: 'early',
    title: 'Penalty Zone Drill',
    rewardsPreview: ['Hunter XP', '+vitality', '+sense', 'Fatigue +6'],
    completion: { xp: 68, fatigue: 6, hunterStats: { vitality: 2, sense: 1 }, resources: { mood: -1 } },
    partial: { xp: 28, fatigue: 4, hunterStats: { vitality: 1 }, resources: { mood: -3 } },
    stages: [
      {
        id: 'forced-warmup',
        type: 'choice',
        title: 'Mandatory Conditioning',
        body: 'The blue window opens over your vision: push-ups, sprints, breath holds. The floor looks normal until missing a rep makes it shake.',
        choices: [
          { id: 'perfect-form', label: 'Perfect Form', result: 'You slow the reps down and make every count clean.', effects: { hunterStats: { vitality: 1 }, resources: { energy: -10 } } },
          { id: 'speed-run', label: 'Speed Run', result: 'You race the timer and let the System judge the ugly reps later.', effects: { hunterStats: { agility: 1 }, resources: { energy: -14, mood: -1 } } },
          { id: 'refuse-slack', label: 'Refuse To Slack', result: 'You add extra reps before the warning can appear.', effects: { hunterStats: { strength: 1 }, resources: { energy: -18, health: -3 } } },
        ],
      },
      {
        id: 'monster-punishment',
        type: 'combat',
        title: 'Punishment Monster',
        body: 'The penalty space tears open. Something small, fast, and mean crawls out before the System can call it training.',
        monsterId: 'systemGoblinScout',
      },
      {
        id: 'cooldown',
        type: 'choice',
        title: 'System Cooldown',
        body: 'The monster dissolves into blue dust. Your muscles keep twitching like the quest is still counting.',
        choices: [
          { id: 'breathing-reset', label: 'Breathing Reset', result: 'You force your breathing back under control before the reward screen opens.', effects: { hunterStats: { vitality: 1 }, resources: { energy: 5, mood: 1 } } },
          { id: 'study-window', label: 'Study Window', result: 'You replay the fight log and mark where the monster punished your entries.', effects: { hunterStats: { sense: 1 }, resources: { mood: -1 } } },
        ],
      },
    ],
  },
  {
    id: 'subway-gate-trace',
    tier: 'early',
    title: 'Subway Gate Trace',
    rewardsPreview: ['Hunter XP', '$260', '+sense', 'Heat +4'],
    completion: { xp: 92, fatigue: 8, hunterStats: { sense: 2, intelligence: 1 }, resources: { money: 260, reputation: 3 }, world: { heat: 4 } },
    partial: { xp: 36, fatigue: 6, hunterStats: { sense: 1 }, resources: { reputation: 1 }, world: { heat: 3 } },
    stages: [
      {
        id: 'track-leak',
        type: 'choice',
        title: 'Mana Leak',
        body: 'A station platform flickers after midnight. The System marks three traces under the tracks and one moving thing past the tunnel lights.',
        choices: [
          { id: 'follow-trace', label: 'Follow Trace', result: 'You read the mana trail instead of rushing the noise.', effects: { hunterStats: { sense: 1 }, resources: { energy: -8 } } },
          { id: 'secure-platform', label: 'Secure Platform', result: 'You clear the civilians first and lose a little time.', effects: { resources: { reputation: 2, energy: -10 }, world: { heat: 1 } } },
          { id: 'rush-dark', label: 'Rush The Dark', result: 'You enter before the thing can set the ambush cleanly.', effects: { hunterStats: { agility: 1 }, resources: { health: -4, energy: -12 } } },
        ],
      },
      {
        id: 'tunnel-fight',
        type: 'combat',
        title: 'Tunnel Monster',
        body: 'The lights die in sequence. A long shape hits the wall, vanishes, then comes back from the wrong angle.',
        monsterId: 'subwayRipper',
      },
      {
        id: 'seal-trace',
        type: 'choice',
        title: 'Seal The Trace',
        body: 'The gate leak is still breathing through the concrete. The System lets you decide what to take from it.',
        choices: [
          { id: 'harvest-core', label: 'Harvest Core', result: 'You pull the core loose and sell the clean fragments.', effects: { resources: { money: 120 }, world: { heat: 2 } } },
          { id: 'study-residue', label: 'Study Residue', result: 'You study how the leak bent space around the fight.', effects: { hunterStats: { intelligence: 1 }, resources: { energy: -4 } } },
        ],
      },
    ],
  },
  {
    id: 'civilian-rescue',
    tier: 'early',
    title: 'Emergency Civilian Rescue',
    rewardsPreview: ['Hunter XP', '+reputation', '+vitality', 'Heat +6'],
    completion: { xp: 84, fatigue: 9, hunterStats: { vitality: 2, agility: 1 }, resources: { reputation: 7, mood: 2 }, world: { heat: 6 } },
    partial: { xp: 32, fatigue: 7, hunterStats: { vitality: 1 }, resources: { reputation: 2, mood: -2 }, world: { heat: 5 } },
    stages: [
      {
        id: 'first-response',
        type: 'choice',
        title: 'Street Gate Alarm',
        body: 'A small Gate opens beside stopped traffic. People are filming until the first hound steps out.',
        choices: [
          { id: 'draw-aggro', label: 'Draw Aggro', result: 'You make yourself the loudest target on the street.', effects: { hunterStats: { strength: 1 }, resources: { health: -3, energy: -10 } } },
          { id: 'evacuate-first', label: 'Evacuate First', result: 'You move people behind cover before taking the center line.', effects: { resources: { reputation: 3, energy: -12 }, hunterStats: { vitality: 1 } } },
          { id: 'call-hunters', label: 'Call Hunters', result: 'You send the location and buy time, but official attention follows.', effects: { world: { heat: 2 }, hunterStats: { intelligence: 1 }, resources: { mood: 1 } } },
        ],
      },
      {
        id: 'alpha-hound',
        type: 'combat',
        title: 'Alpha At The Crosswalk',
        body: 'The biggest hound lowers its head and the smaller ones stop moving. The System marks it as the condition for survival.',
        monsterId: 'manaHoundAlpha',
      },
      {
        id: 'after-action',
        type: 'choice',
        title: 'After-Action Window',
        body: 'Sirens arrive late. The System asks whether you want credit, silence, or one more scan for stragglers.',
        choices: [
          { id: 'take-credit', label: 'Take Credit', result: 'Witness clips make sure the Association knows your face.', effects: { resources: { reputation: 3 }, world: { heat: 2 } } },
          { id: 'stay-quiet', label: 'Stay Quiet', result: 'You leave before the interviews and keep the focus on survival.', effects: { resources: { mood: 2 }, world: { heat: -1 } } },
          { id: 'scan-again', label: 'Scan Again', result: 'You find one more trace and learn how the pack entered.', effects: { hunterStats: { sense: 1 }, resources: { energy: -5 } } },
        ],
      },
    ],
  },
  {
    id: 'association-raid-support',
    tier: 'mid',
    title: 'Association Raid Support',
    rewardsPreview: ['Hunter XP', '+intelligence', '+reputation', 'Fatigue +10'],
    completion: { xp: 155, fatigue: 10, hunterStats: { intelligence: 2, sense: 1 }, resources: { reputation: 8, money: 900 }, world: { heat: 5 } },
    partial: { xp: 64, fatigue: 7, hunterStats: { intelligence: 1 }, resources: { reputation: 3 }, world: { heat: 3 } },
    stages: [
      {
        id: 'briefing-window',
        type: 'choice',
        title: 'Raid Briefing',
        body: 'The Association borrows your System scan for a leaking C-rank building. Official hunters pretend not to stare at your blue window.',
        choices: [
          { id: 'map-weakness', label: 'Map Weakness', result: 'You mark the monster traffic before anyone enters.', effects: { hunterStats: { intelligence: 1 }, resources: { energy: -8 } } },
          { id: 'lead-vanguard', label: 'Lead Vanguard', result: 'You take the front slot and set the raid pace yourself.', effects: { hunterStats: { strength: 1 }, resources: { health: -4, reputation: 2 } } },
          { id: 'protect-healers', label: 'Protect Healers', result: 'You keep the recovery team untouched through the first breach.', effects: { hunterStats: { vitality: 1 }, resources: { reputation: 3, energy: -10 } } },
        ],
      },
      {
        id: 'raid-monster',
        type: 'combat',
        title: 'Raid Corridor Breaker',
        body: 'A heavy monster bursts through the marked wall before the raid captain can finish the count.',
        monsterId: 'bloodApe',
      },
      {
        id: 'credit-window',
        type: 'choice',
        title: 'Official Credit',
        body: 'The Association terminal opens a clean report field. You can claim credit, hide the System, or squeeze more data from the corpse.',
        choices: [
          { id: 'claim-credit', label: 'Claim Credit', result: 'Your file gets the raid assist stamp.', effects: { resources: { reputation: 4 }, world: { heat: 2 } } },
          { id: 'hide-system', label: 'Hide System', result: 'You let the captain take the headline while your window saves the combat data.', effects: { resources: { mood: 2 }, hunterStats: { sense: 1 } } },
          { id: 'harvest-data', label: 'Harvest Data', result: 'You pull one more pattern from the monster before cleanup arrives.', effects: { hunterStats: { intelligence: 1 }, resources: { energy: -5 } } },
        ],
      },
    ],
  },
  {
    id: 'red-signal-prep',
    tier: 'late',
    title: 'Red Signal Preparation',
    rewardsPreview: ['Large Hunter XP', '+shadow growth', '+stat point', 'Fatigue +14'],
    completion: { xp: 260, fatigue: 14, hunterStats: { strength: 2, sense: 2 }, resources: { reputation: 12, money: 2500 }, world: { heat: 8 } },
    partial: { xp: 105, fatigue: 10, hunterStats: { sense: 1 }, resources: { reputation: 4 }, world: { heat: 5 } },
    stages: [
      {
        id: 'red-signal-scan',
        type: 'choice',
        title: 'Red Signal Scan',
        body: 'A red Gate warning flashes without opening. The System asks whether to study it, bait it, or suppress it.',
        choices: [
          { id: 'study-red', label: 'Study Red Signal', result: 'You let the warning burn long enough to learn its shape.', effects: { hunterStats: { intelligence: 1, sense: 1 }, resources: { mood: -2 } } },
          { id: 'bait-red', label: 'Bait It', result: 'You leak mana and dare the signal to answer.', effects: { hunterStats: { strength: 1 }, resources: { health: -6 }, world: { heat: 3 } } },
          { id: 'suppress-red', label: 'Suppress It', result: 'You crush the signal before civilians can notice.', effects: { hunterStats: { vitality: 1 }, resources: { energy: -14, reputation: 2 } } },
        ],
      },
      {
        id: 'red-echo-fight',
        type: 'combat',
        title: 'Red Echo',
        body: 'The warning condenses into a boss echo wearing the shape of a Gate that has not opened yet.',
        monsterId: 'redBloodOgre',
      },
      {
        id: 'shadow-claim',
        type: 'choice',
        title: 'Shadow Claim',
        body: 'The red echo leaves a torn silhouette. Your shadow army stirs before the System confirms the reward.',
        choices: [
          { id: 'feed-shadow', label: 'Feed Shadow', result: 'You let your army devour the trace and grow heavier.', effects: { hunterStats: { intelligence: 1 }, resources: { mood: 1 } } },
          { id: 'compress-core', label: 'Compress Core', result: 'You compress the trace into something you can spend later.', effects: { resources: { money: 500 }, hunterStats: { sense: 1 } } },
        ],
      },
    ],
  },
];

function questTemplateById(id) {
  return HUNTER_DAILY_QUEST_TEMPLATES.find((quest) => quest.id === id) ?? HUNTER_DAILY_QUEST_TEMPLATES[0];
}

function applyDelta(life, effects = {}) {
  if (effects.hunterStats) {
    life.hunterWorld = normalizeHunterWorld(life.hunterWorld);
    life.hunterWorld.stats = { ...life.hunterWorld.stats };
    for (const [stat, amount] of Object.entries(effects.hunterStats)) {
      if (stat in DEFAULT_HUNTER_STATS) life.hunterWorld.stats[stat] = Math.max(0, Math.floor((life.hunterWorld.stats[stat] ?? 0) + amount));
    }
  }
  if (effects.resources) {
    for (const [resource, amount] of Object.entries(effects.resources)) {
      if (resource === 'health' || resource === 'energy') life.resources[resource] = clampLifeResource(life, resource, life.resources[resource] + amount);
      else if (resource in life.resources) life.resources[resource] = clamp(life.resources[resource] + amount, 0, resource === 'reputation' ? 999 : 1000000);
    }
  }
  if (effects.stats) {
    const beforeGrowth = clone(life);
    for (const [stat, amount] of Object.entries(effects.stats)) {
      if (stat in life.stats) life.stats[stat] = clampLifeStat(life, stat, life.stats[stat] + amount);
    }
    applyVitalCapGrowth(beforeGrowth, life);
  }
  if (effects.world) {
    life.world = life.world ?? {};
    if ('heat' in effects.world) life.world.heat = clamp((life.world.heat ?? 0) + effects.world.heat, 0, 100);
    for (const [key, value] of Object.entries(effects.world)) {
      if (key !== 'heat') life.world[key] = value;
    }
  }
}

function createHunterDailyQuest(life) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  let eligibleTiers = ['early'];
  if (HUNTER_RANKS.indexOf(hunter.rank) >= HUNTER_RANKS.indexOf('C') || hunter.level >= 12 || hunter.gatesCleared >= 8) eligibleTiers = ['early', 'mid'];
  if (HUNTER_RANKS.indexOf(hunter.rank) >= HUNTER_RANKS.indexOf('A') || hunter.level >= 28 || hunter.gatesCleared >= 25) eligibleTiers = ['mid', 'late'];
  const pool = HUNTER_DAILY_QUEST_TEMPLATES.filter((quest) => eligibleTiers.includes(quest.tier ?? 'early'));
  const index = Math.floor(deterministicRoll(life.rngSeed, lifeMonth(life), hunter.dailyQuestsCompleted ?? 0, hunter.rank, 'hunter-daily') * pool.length);
  const template = pool[index] ?? pool[0] ?? HUNTER_DAILY_QUEST_TEMPLATES[0];
  return {
    id: `${template.id}-${lifeMonth(life)}-${life.hunterWorld?.dailyQuestsCompleted ?? 0}`,
    templateId: template.id,
    tier: template.tier ?? 'early',
    title: template.title,
    stageIndex: 0,
    stages: clone(template.stages),
    startedMonth: lifeMonth(life),
    completed: false,
    failed: false,
    outcome: null,
    monsterFightId: null,
    rewardsPreview: [...template.rewardsPreview],
    stageResults: [],
  };
}

function currentHunterQuestStage(life) {
  const quest = normalizeHunterWorld(life.hunterWorld).dailyQuest;
  if (!quest || quest.completed) return null;
  return quest.stages[quest.stageIndex] ?? null;
}

function advanceHunterQuestStage(life, quest, result) {
  quest.stageResults = [...(quest.stageResults ?? []), result].slice(-8);
  quest.stageIndex += 1;
  if (quest.stageIndex >= quest.stages.length) {
    quest.completed = true;
    quest.outcome = 'won';
  }
  life.hunterWorld.dailyQuest = quest;
}

function applyHunterQuestFightResult(life, fight, won) {
  life.hunterWorld = normalizeHunterWorld(life.hunterWorld);
  const quest = life.hunterWorld.dailyQuest;
  if (!quest || quest.id !== fight.questId) return;
  const stage = quest.stages[quest.stageIndex];
  const monster = HUNTER_MONSTERS[stage?.monsterId] ?? HUNTER_MONSTERS.systemGoblinScout;
  if (won) {
    advanceHunterQuestStage(life, quest, {
      stageId: stage?.id,
      label: `${monster.name} defeated`,
      won: true,
    });
    life.hunterWorld.stats.sense = Math.max(0, (life.hunterWorld.stats.sense ?? 0) + 1);
    fight.result.rewards.push('Quest progress: monster objective cleared');
    fight.result.rewards.push('+1 Hunter Sense from live System combat');
    if (queueArisePrompt(life, stage?.monsterId, 'quest')) {
      fight.result.rewards.push('ARISE prompt unlocked: 3 chances to bind the defeated boss');
    }
  } else {
    quest.completed = true;
    quest.failed = true;
    quest.outcome = 'lost';
    quest.stageResults = [...(quest.stageResults ?? []), {
      stageId: stage?.id,
      label: `${monster.name} defeated you`,
      won: false,
    }].slice(-8);
    life.hunterWorld.dailyQuest = quest;
    fight.result.rewards.push('Quest progress: failed route unlocked partial System reward');
  }
}

function applyHunterDungeonFightResult(life, fight, won) {
  life.hunterWorld = normalizeHunterWorld(life.hunterWorld);
  const dungeon = life.hunterWorld.activeDungeon;
  if (!dungeon || dungeon.id !== fight.dungeonId) return;
  const encounter = dungeon.encounters[dungeon.encounterIndex];
  const tierRewards = HUNTER_DUNGEON_TIERS[dungeon.rank];
  const monster = HUNTER_MONSTERS[encounter?.monsterId] ?? getCombatOpponent(life, fight.opponentId);
  if (!won) {
    dungeon.completed = true;
    dungeon.failed = true;
    dungeon.outcome = 'failed';
    dungeon.resultText = `${monster.name} forced you out before the dungeon could be cleared.`;
    life.hunterWorld.systemFatigue = clamp(life.hunterWorld.systemFatigue + 16);
    life.resources.mood = clamp(life.resources.mood - 12);
    life.resources.reputation = clamp(life.resources.reputation - 6, 0, 999);
    fight.result.rewards.push('Dungeon failed: +16 fatigue / -12 mood / -6 reputation');
    life.hunterWorld.activeDungeon = dungeon;
    return;
  }

  dungeon.carriedHealth = fight.meters.playerHealth;
  dungeon.carriedStamina = clamp(fight.meters.playerStamina + (encounter.isBoss ? 0 : 5), 0, fight.meters.maxPlayerStamina ?? maxLifeEnergy(life));
  if (!encounter.isBoss) {
    const xp = dungeonRewardAmount(tierRewards.room.xp, dungeon.isRedGate);
    const money = dungeonRewardAmount(tierRewards.room.money, dungeon.isRedGate);
    const reputation = dungeonRewardAmount(tierRewards.room.reputation, dungeon.isRedGate);
    grantHunterXp(life, xp);
    life.resources.money += money;
    life.resources.reputation = clamp(life.resources.reputation + reputation, 0, 999);
    const itemDrops = awardDungeonLoot(life, dungeon, encounter, monster);
    dungeon.rewardsEarned.push({ type: 'room', monster: monster.name, xp, money, reputation, items: itemDrops });
    dungeon.awaitingAdvance = true;
    fight.result.rewards.push(`Room cleared: +${xp} Hunter XP, +$${money}, +${reputation} reputation`);
    if (itemDrops.length) fight.result.rewards.push(`Dungeon loot: ${itemDrops.map(itemDropText).join(', ')}`);
    fight.result.rewards.push('+5 mana recovered before the next room');
    life.hunterWorld.activeDungeon = dungeon;
    return;
  }

  const xp = dungeonRewardAmount(tierRewards.boss.xp, dungeon.isRedGate);
  const money = dungeonRewardAmount(tierRewards.boss.money, dungeon.isRedGate);
  const reputation = dungeonRewardAmount(tierRewards.boss.reputation, dungeon.isRedGate);
  const statCount = tierRewards.boss.stats + (dungeon.isRedGate ? 1 : 0);
  grantHunterXp(life, xp);
  life.resources.money += money;
  life.resources.reputation = clamp(life.resources.reputation + reputation, 0, 999);
  const gainedStats = randomHunterStatRewards(life, statCount, dungeon.id);
  const itemDrops = awardDungeonLoot(life, dungeon, encounter, monster);
  dungeon.rewardsEarned.push({ type: 'boss', monster: monster.name, xp, money, reputation, stats: gainedStats, items: itemDrops });
  dungeon.completed = true;
  dungeon.bossDefeated = true;
  dungeon.outcome = 'cleared';
  life.hunterWorld.gatesCleared += 1;
  queueArisePrompt(life, encounter.monsterId, dungeon.isRedGate ? 'red-gate' : 'gate');
  dungeon.redGateTriggered = deterministicRoll(life.rngSeed, dungeon.id, life.hunterWorld.gatesCleared, 'red-gate-trigger') < redGateChance(life);
  life.hunterWorld.redGatePending = dungeon.redGateTriggered;
  fight.result.rewards.push(`Boss clear jackpot: +${xp} Hunter XP, +$${money}, +${reputation} reputation`);
  fight.result.rewards.push(`Hunter stat growth: +${statCount} (${gainedStats.join(', ')})`);
  if (life.hunterWorld.arisePrompt?.monsterId === encounter.monsterId) fight.result.rewards.push('ARISE prompt unlocked: 3 chances to bind the boss shadow');
  if (itemDrops.length) fight.result.rewards.push(`Boss loot: ${itemDrops.map(itemDropText).join(', ')}`);
  if (dungeon.redGateTriggered) fight.result.rewards.push('Emergency alert: a Red Gate has appeared on the next Gate Board');
  life.hunterWorld.activeDungeon = dungeon;
}

function endFatalHunterFight(life, fight, opponent) {
  life.hunterWorld = normalizeHunterWorld(life.hunterWorld);
  const quest = fight.source === 'hunterQuest' ? life.hunterWorld.dailyQuest : null;
  const dungeon = fight.source === 'hunterDungeon' ? life.hunterWorld.activeDungeon : null;
  if (quest && quest.id === fight.questId) {
    const stage = quest.stages[quest.stageIndex];
    quest.completed = true;
    quest.failed = true;
    quest.outcome = 'fatal';
    quest.stageResults = [...(quest.stageResults ?? []), {
      stageId: stage?.id,
      label: `${opponent.name} killed you`,
      won: false,
    }].slice(-8);
    life.hunterWorld.dailyQuest = quest;
  }
  if (dungeon && dungeon.id === fight.dungeonId) {
    dungeon.completed = true;
    dungeon.failed = true;
    dungeon.outcome = 'fatal';
    dungeon.resultText = `${opponent.name} killed you in room ${dungeon.encounterIndex + 1}.`;
    life.hunterWorld.activeDungeon = dungeon;
  }
  life.resources.health = 0;
  return endLife(life, {
    eyebrow: 'System Fatality',
    title: 'Killed in a System Gate',
    lines: [
      `${life.identity.name} was killed by ${opponent.name}.`,
      quest ? `Daily Quest: ${quest.title}.` : `Gate: ${dungeon?.name ?? 'Unknown dungeon'}.`,
    ],
    logText: `Killed in a System encounter: ${opponent.name} ended your life during ${quest?.title ?? dungeon?.name ?? 'a Gate run'}.`,
  });
}

function unlockHunterWorld(life, { protectCivilians = false } = {}) {
  life.hunterWorld = {
    ...normalizeHunterWorld(life.hunterWorld),
    unlocked: true,
    playerAwakened: true,
    rank: 'E',
    level: Math.max(1, life.hunterWorld?.level ?? 1),
    lastGateMonth: lifeMonth(life),
  };
  life.hunterWorld.gateOffers = createHunterGateBoard(life);
  life.world.rumors = [
    protectCivilians
      ? 'Gates opened downtown, and witnesses say you pulled civilians out before the hunters arrived.'
      : 'Gates are opening across the city, and a blue System window has marked you as the Player.',
    ...(life.world.rumors ?? []),
  ].slice(0, 8);
}

function hunterAwakeningChance(life, context = {}) {
  if (life.identity.age < 18) return 0;
  if (normalizeHunterWorld(life.hunterWorld).unlocked) return 0;
  if (normalizeHunterWorld(life.hunterWorld).rejectedUntilMonth > lifeMonth(life)) return 0;
  if (isMishimeClan(life.clan) && (normalizeClanAwakening(life)?.stage ?? 0) < 3) return 0;
  let chance = 0.015;
  if (life.world?.hiddenWorld) chance += 0.18;
  if ((life.world?.heat ?? 0) >= 70) chance += 0.24;
  if ((life.resources?.health ?? 100) <= 25) chance += 0.2;
  if ((life.defeatedSpecialFights?.length ?? 0) > 0) chance += 0.2;
  if ((life.record?.wins ?? 0) >= 10) chance += 0.12;
  if (life.tournament?.wins >= 2) chance += 0.1;
  if (context.challengeRoll <= 0.02) chance += 0.2;
  return Math.min(0.95, chance);
}

function systemAwakeningEvent(life) {
  return {
    id: 'system-awakening',
    flag: `systemAwakening-${lifeMonth(life)}`,
    title: 'The Gate Opens',
    body: 'A tear in the street hangs like a black doorway. Civilians freeze, hunters panic, and a blue System window asks whether you will enter.',
    choices: [
      {
        id: 'enter-the-gate',
        label: 'Enter the Gate',
        result: 'The System recognizes you as the Player. E-rank gates, daily quests, and impossible growth are now part of your life.',
        effects: { hunterWorld: { unlock: true, firstGate: 'eGate' }, world: { heat: 8 }, resources: { reputation: 4 } },
      },
      {
        id: 'protect-civilians',
        label: 'Protect Civilians',
        result: 'You hold the line until the civilians escape. The System still chooses you, but the first Gate is nastier.',
        effects: { hunterWorld: { unlock: true, firstGate: 'dGate', protectCivilians: true }, world: { heat: 12 }, resources: { reputation: 8 }, relationships: { family: 6 } },
      },
      {
        id: 'run-from-it',
        label: 'Run From It',
        result: 'You escape before the blue window can finish loading. The Gates keep appearing in your dreams.',
        effects: { hunterWorld: { delayMonths: 6 }, resources: { mood: -4, reputation: -2 } },
      },
    ],
  };
}

function followerTierBonus(followers = 0) {
  if (followers >= 1000000) return 5;
  if (followers >= 100000) return 4;
  if (followers >= 10000) return 3;
  if (followers >= 1000) return 2;
  return 1;
}

function opponentHype(opponent) {
  const tier = {
    Local: 1,
    Underground: 2,
    Corporate: 3,
    Monster: 4,
    'Association Tournament': 5,
    'Special Fight': 7,
  }[opponent.tier] ?? 1;
  return tier + Math.max(0, Math.round(opponent.power / 420));
}

function socialActionStatus(life, action) {
  const totalFights = (life.record?.wins ?? 0) + (life.record?.losses ?? 0);
  if (action.requires?.fights && totalFights < action.requires.fights) return `Requires ${action.requires.fights} completed fight.`;
  if (action.requires?.injury && !(life.injuries ?? []).length) return 'Requires an active injury.';
  if (action.requires?.followers && normalizeSocial(life).followers < action.requires.followers) return `Requires ${action.requires.followers} followers.`;
  return '';
}

const INJURY_TIERS = {
  Mild: { rank: 1, months: 1, effectScale: 0.75 },
  Moderate: { rank: 2, months: 3, effectScale: 1.25 },
  Severe: { rank: 3, months: 6, effectScale: 2 },
};

function injuryName(injury) {
  return typeof injury === 'string' ? injury : injury?.name;
}

function injuryTier(injury) {
  return typeof injury === 'string' ? 'Moderate' : (injury?.tier ?? 'Moderate');
}

function injuryLabel(injury) {
  const name = injuryName(injury);
  const tier = injuryTier(injury);
  return name ? `${tier} ${name}` : '';
}

function injuryRecord(life, name) {
  return (life.injuries ?? []).find((injury) => injuryName(injury) === name);
}

function hasInjury(life, name) {
  return Boolean(injuryRecord(life, name));
}

function normalizeInjury(injury, fallbackTier = 'Moderate') {
  if (typeof injury === 'string') {
    return {
      name: injury,
      tier: fallbackTier,
      text: `${injury} is still affecting your body.`,
      monthsOut: INJURY_TIERS[fallbackTier]?.months ?? 3,
    };
  }
  const tier = injury?.tier ?? fallbackTier;
  return {
    ...injury,
    tier,
    monthsOut: injury?.monthsOut ?? INJURY_TIERS[tier]?.months ?? 3,
  };
}

function injurySeverityTier(enemyDamage, fight) {
  const healthRatio = (fight.meters.playerHealth ?? 0) / (fight.meters.maxPlayerHealth ?? 100);
  if (enemyDamage >= 18 || healthRatio <= 0.25 || fight.meters.injuryRisk >= 80) return 'Severe';
  if (enemyDamage >= 10 || healthRatio <= 0.45 || fight.meters.injuryRisk >= 45) return 'Moderate';
  return 'Mild';
}

function withInjuryTier(injury, tier) {
  return normalizeInjury({
    ...injury,
    tier,
    monthsOut: INJURY_TIERS[tier]?.months ?? 3,
  }, tier);
}

function addOrUpgradeInjury(life, injury) {
  const nextInjury = normalizeInjury(injury);
  life.injuries = life.injuries ?? [];
  const currentIndex = life.injuries.findIndex((item) => injuryName(item) === nextInjury.name);
  const current = currentIndex >= 0 ? normalizeInjury(life.injuries[currentIndex]) : null;
  if (!current || (INJURY_TIERS[nextInjury.tier]?.rank ?? 0) > (INJURY_TIERS[current.tier]?.rank ?? 0)) {
    if (currentIndex >= 0) life.injuries[currentIndex] = nextInjury;
    else life.injuries.push(nextInjury);
  }
  life.medicalSuspensionUntil = Math.max(
    life.medicalSuspensionUntil ?? 0,
    lifeMonth(life) + (nextInjury.monthsOut ?? INJURY_TIERS[nextInjury.tier]?.months ?? 1),
  );
}

function socialPostFlavor(actionId, action, life, followerGain) {
  const flavors = {
    trainingClip: {
      title: 'Training Clip Posted',
      bodies: [
        'The clip opens on sweat, bag noise, and the kind of footwork casual viewers replay twice. The comments start arguing about whether the speed is edited. It is not.',
        'You post a round where the strikes sound heavier than the camera mic can handle. The comments split between hype, fear, and people asking for the routine.',
        'The video starts with shadowboxing and ends with the bag swinging like it wants out of the room. Viewers notice the balance more than the power.',
        'You upload the boring part of greatness: repeats, resets, failed entries, and one clean finish that makes the whole session make sense.',
        'A short clip of roadwork turns viral when the last sprint looks less like cardio and more like someone chasing a fight date.',
        'You post pad work with no music, just breath, leather, and a coach calling mistakes in the background. Fight fans love that it feels unpolished.',
        'The clip catches a small technical adjustment mid-combo. Half the feed misses it; the dangerous half replays it until they understand.',
        'You post a recovery-to-burst drill. The comments start debating whether your stamina is finally catching up to your ambition.',
        'The footage shows you losing a round in sparring, then fixing the mistake before the clip ends. That honesty lands harder than a highlight reel.',
        'You upload grip work, neck work, and the ugly training nobody glamorizes. The feed respects how specific the grind looks.',
        'A slow-motion entry drill gets shared because the first step barely telegraphs. People start tagging fighters you should test it against.',
        'You post the final minute of a long session. The technique is not fresh anymore, but that is exactly why the comments believe it.',
      ],
    },
    fightHighlight: {
      title: 'Fight Highlight Posted',
      bodies: [
        'You upload the exchange that made the room react. Fans clip it, rivals slow it down, and a few matchmakers suddenly remember your name.',
        'The highlight starts one beat before the damage, so anyone who knows fighting can see the trap forming. That is why it travels.',
        'You post the cleanest angle from the fight. The comments argue about luck until someone overlays the setup from three exchanges earlier.',
        'The clip shows the opponent reacting late, then paying for it. It becomes the kind of short video people send with no caption.',
        'You cut the highlight around the sound of impact. The feed does the rest, turning one exchange into a reputation problem for everyone nearby.',
        'The video is not your hardest hit; it is your smartest sequence. Fighters notice, which matters more than casual applause.',
        'You post the moment the fight changed tempo. The comments can feel the opponent realize the round is slipping.',
        'The highlight catches your corner yelling before the finish lands. Viewers love that the call and the action line up perfectly.',
        'You upload the body work sequence instead of the final shot. The serious fans immediately understand why the finish was already written.',
        'The clip is rough, handheld, and too close to the action. That makes it feel like evidence instead of content.',
        'You post a defensive exchange where you barely get touched, then answer clean. The feed starts calling it a read, not a brawl.',
        'The highlight ends before the celebration. Just the exchange, the damage, and the silence after. That restraint makes people replay it.',
      ],
    },
    injuryUpdate: {
      title: 'Injury Update Posted',
      bodies: [
        'You show the damage without begging for sympathy. The feed gets quiet for once, then fills with people saying the comeback will hit harder.',
        'The post is just tape, swelling, and a short caption about tomorrow. Fans read stubbornness into every frame.',
        'You upload a careful rehab clip. It is not dramatic, which somehow makes the injury look more serious.',
        'The photo catches the bruising under bad lighting. The comments stop joking once they realize you trained through it.',
        'You explain what hurts, what still works, and what has to change. Fighters respect the honesty; opponents bookmark the weakness.',
        'The update shows ice, wraps, and your notebook open beside them. People notice you are studying while damaged.',
        'You post a quiet walking drill after the injury. The feed treats every clean step like a small comeback.',
        'The caption says less than the footage. You are not healed, but you are moving, and that is enough to stir the timeline.',
        'You show the brace for half a second and spend the rest of the clip drilling around it. Fans like the problem-solving.',
        'The update frames injury as information, not tragedy. That line gets repeated in the comments all day.',
        'You post a before-and-after from treatment to light work. It gives followers a story they can root for.',
        'The clip ends with one clean strike after rehab work. It is not full power, but the feed hears the promise in it.',
      ],
    },
    clanMystery: {
      title: 'Clan Rumor Posted',
      bodies: [
        'The post barely explains anything, which makes it worse. Frame-by-frame screenshots spread through private chats while people try to name the bloodline.',
        'You show one stance transition and cut the video before the impact. The missing second becomes the whole conversation.',
        'The caption is only a family name and a date. Somehow that is enough to make the comments turn into a theory board.',
        'You post a shadowed drill where the movement looks familiar but not quite public. Old gym heads start arguing in replies.',
        'The clip shows a clan habit in the footwork. People who know enough to notice suddenly sound nervous.',
        'You let the camera catch the ritual before training, then never explain it. The mystery does most of the marketing.',
        'The post uses no hashtags, which makes it feel leaked. That alone sends it through underground circles.',
        'You show a controlled burst and stop the clip before the recovery. Everyone argues over what the full form does.',
        'A clan elder appears in the background for less than a second. The comments identify them faster than you expected.',
        'The footage is ordinary until the last frame, where the posture changes. That frame becomes the screenshot everyone shares.',
        'You post an old family phrase over new training footage. The bloodline rumors get louder by the hour.',
        'The clip hides the technique but shows the effect on the sparring partner. That is enough to make people speculate wildly.',
      ],
    },
    livestreamSparring: {
      title: 'Sparring Stream Ended',
      bodies: [
        'The live chat starts joking, then stops when the rounds turn mean. By the final bell, everyone knows the session was not for content anymore.',
        'The stream lags right as a clean counter lands. The replay gets clipped anyway, which somehow makes it look more violent.',
        'You keep the camera wide enough to show footwork. The serious viewers thank you; the casual ones wait for damage and get it.',
        'A sparring partner tries to show off for the chat. Thirty seconds later, the chat is typing their name in lowercase.',
        'The round starts technical and turns personal when someone lands after the break. Viewers can feel the room temperature change.',
        'You answer questions between rounds until breathing becomes the only answer left. That honesty hooks the audience.',
        'The stream catches your coach shutting down the comments and telling you to work. Fans love that the room stays serious.',
        'A clean body shot folds the sound out of the stream for a second. The clip spreads before you even end the live.',
        'You spend most of the session losing small positions, then steal the last round with one adjustment. The chat notices growth in real time.',
        'The sparring is controlled, but the eyes are not. Viewers keep mentioning how quiet the room gets during exchanges.',
        'You run a shark-tank round live. Every fresh partner makes the chat louder and your breathing more expensive.',
        'The final minute is ugly, tired, and useful. That is exactly why followers believe the stream was real.',
      ],
    },
    sponsorPost: {
      title: 'Sponsor Post Published',
      bodies: [
        'Clean lighting, clean caption, controlled smile. The sponsors see discipline, while fight fans still catch the bruising under the sleeves.',
        'You make the product look like part of camp instead of an interruption. Sponsors like the polish; fans like that you still look tired.',
        'The post is clean enough for a brand deck, but the taped knuckles keep it from feeling fake.',
        'You film it after training, not before. The exhaustion sells the message better than any script could.',
        'The caption talks discipline. The comments talk about the bruise on your jaw. Both help the post move.',
        'You keep the sponsor happy without pretending the fight life is pretty. That balance gets noticed.',
        'The post uses a recovery angle, and suddenly the brand looks attached to longevity instead of clout.',
        'You answer fan questions under the sponsor post instead of disappearing. Engagement climbs because it feels less corporate.',
        'The lighting is clean, the voice is calm, and the message says you can be dangerous without being messy.',
        'You turn a sponsor obligation into a small training diary. Fans forgive the ad because it gives them something real.',
        'The post lands with both audiences: sponsors see control, fighters see the work hiding behind it.',
        'You keep the copy short and let the image carry the discipline. The brand account reposts it within minutes.',
      ],
    },
  };
  const flavorSet = flavors[actionId] ?? {
    title: `${action.name} Posted`,
    bodies: [action.text],
  };
  const roll = Math.abs(Math.floor(life.rngSeed ?? 0) + actionId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) + lifeMonth(life) + (life.social?.postCount ?? 0));
  const baseBody = flavorSet.bodies[roll % flavorSet.bodies.length];
  const body = `${baseBody} +${followerGain} followers.`;
  const effects = [`+${followerGain} followers`];
  if (action.reputation) effects.push(`+${action.reputation + Math.floor(followerTierBonus(normalizeSocial(life).followers) / 2)} reputation`);
  if (action.money) effects.push(`+$${action.money + Math.floor(normalizeSocial(life).followers / 1200) * 25}`);
  if (action.heat) effects.push(`${action.heat > 0 ? '+' : ''}${action.heat} heat`);
  if (action.mood) effects.push(`${action.mood > 0 ? '+' : ''}${action.mood} mood`);
  if (action.sponsor) effects.push(`+${action.sponsor} sponsor`);
  return { actionId, title: flavorSet.title, body, effects };
}

function sparTrainingPopup(life, riskScore) {
  const bodies = [
    'Your partner opens with jabs just fast enough to make your feet answer before your pride does. You lose the first exchange, then adjust the angle and start reading the entry.',
    'The round turns into collar ties, short knees, and ugly hand-fighting. Nothing looks clean, but every grip teaches your body where balance actually lives.',
    'You try to pressure early and get checked twice for rushing. By the final minute, your entries are smaller, tighter, and much harder to read.',
    'Your partner keeps circling away from your power side. You spend the round learning how to cut the exit instead of chasing it.',
    'A clean counter catches you in the middle of a lazy step. The rest of the session becomes a lesson in moving your head with your feet.',
    'The spar starts technical, then gets loud when both of you refuse to give ground. You leave tired, sharper, and a little more honest about your defense.',
    'Your partner shoots under a combination and makes you defend the mat return. The scramble teaches more than the takedown ever could.',
    'You spend three rounds trying to land the same setup. It fails until you change the rhythm, and that one adjustment makes the room nod.',
    'The session becomes a body-shot argument. Every breath after the second round reminds you that durability is trained, not assumed.',
    'Your partner keeps feinting the same shoulder twitch until you stop biting. The moment you wait, the counter lane finally appears.',
    'You get trapped on the wall and have to fight out without panicking. Control improves because panic finally gets punished in real time.',
    'The round is mostly defense: shell, frame, pivot, reset. It is not exciting content, but it is exactly the kind of work that keeps fighters alive.',
    'You land one clean low kick and spend the rest of the round learning how opponents change when their base is threatened.',
    'Your partner forces a clinch every time you overextend. By the end, your hands are tired, your neck is sore, and your posture is better.',
    'You start with speed and finish with timing. The difference is obvious when your partner stops reacting to the first move and starts fearing the second.',
    'A hard sparring exchange gets heated, but you bring it back under control. That restraint teaches almost as much as the damage.',
    'You practice conserving under live pressure. It feels wrong until your partner fades first and you realize patience can be offense.',
    'The session is full of small losses: missed counters, late sprawls, bad exits. Each one becomes a note your body remembers faster than your ego wants to.',
    'Your partner imitates a pressure fighter and walks you down for the whole round. You learn which retreats are exits and which are just delayed damage.',
    'You work from bad positions on purpose. Every escape costs energy, but the fear of being stuck gets a little quieter.',
    'The final round is all reads. No one is throwing hard, but every feint has weight because both of you know what would happen if it landed.',
    'Your partner changes stance mid-round and exposes a blind spot in your entries. You patch it with footwork instead of forcing power.',
    'You trade controlled shots to the body until both of you are breathing through clenched teeth. Willpower gets trained because quitting would be too visible.',
    'A late scramble ends with you on top, not because you were stronger, but because your hips finally arrived before your hands.',
  ];
  const count = life.trainingSessionCount ?? 0;
  const roll = Math.abs(Math.floor(life.rngSeed ?? 0) + count + lifeMonth(life));
  const effects = ['+1 all stats'];
  if (riskScore > 7) effects.push('Injury risk triggered');
  return {
    actionId: 'sparTrainingPartner',
    title: 'Spar Training Partner',
    body: bodies[roll % bodies.length],
    effects,
  };
}

function clampStat(value) {
  return clamp(value, 0, STAT_CAP);
}

function ageStatCap(life) {
  const age = life.identity?.age ?? 20;
  const month = life.identity?.month ?? 0;
  if (age < 20) {
    const teenCaps = {
      12: 140,
      13: 175,
      14: 220,
      15: 270,
      16: 330,
      17: 390,
      18: 445,
      19: 480,
    };
    return teenCaps[age] ?? 140;
  }
  return STAT_CAP + Math.min(250, (age - 20) * 35 + Math.floor(month / 4) * 10);
}

function clanCapBonus(life, stat) {
  const rarityBonus = {
    Common: 50,
    Uncommon: 140,
    Rare: 260,
    Epic: 430,
    Legendary: 700,
    Mythic: 900,
    Secret: 1300,
  }[life.clan?.rarity] ?? 0;
  const affinityBonus = Math.min(350, Math.round((life.clan?.bonuses?.[stat] ?? 0) * getRarity(life.clan?.rarity).powerMultiplier * 7));
  return rarityBonus + affinityBonus;
}

export function getExperienceBoost(life) {
  const wins = life.record?.wins ?? 0;
  const losses = life.record?.losses ?? 0;
  const effectiveFights = Math.min(100, wins + losses * 0.55);
  return Math.round((effectiveFights / 100) * 400);
}

export function getStatCap(life, stat = 'strength') {
  return ageStatCap(life) + clanCapBonus(life, stat) + getExperienceBoost(life) + Math.max(0, life.specialTrainingCaps?.[stat] ?? 0);
}

function clampLifeStat(life, stat, value) {
  return clamp(value, 0, getStatCap(life, stat));
}

function getRarity(name) {
  return CLAN_RARITIES.find((rarity) => rarity.name === name) ?? CLAN_RARITIES[0];
}

function weightedRarity(rng) {
  const total = CLAN_RARITIES.reduce((sum, rarity) => sum + rarity.weight, 0);
  let roll = rng() * total;
  for (const rarity of CLAN_RARITIES) {
    roll -= rarity.weight;
    if (roll <= 0) return rarity.name;
  }
  return 'Common';
}

function rollClan(rng) {
  const rarity = weightedRarity(rng);
  const pool = CLANS.filter((clan) => clan.rarity === rarity);
  if (rarity === 'Secret') {
    return clone(CLANS.find((clan) => clan.name === DEVIL_GENE_CLAN_NAME) ?? pick(pool, rng));
  }
  return clone(pick(pool, rng));
}

function devilGeneClan() {
  return clone(CLANS.find((clan) => clan.name === DEVIL_GENE_CLAN_NAME));
}

function rollClanByRarity(rng, rarity) {
  const pool = CLANS.filter((clan) => clan.rarity === rarity);
  return clone(pick(pool, rng));
}

function baseStats(rng) {
  return {
    strength: 22 + Math.floor(rng() * 16),
    speed: 22 + Math.floor(rng() * 16),
    durability: 22 + Math.floor(rng() * 16),
    technique: 12 + Math.floor(rng() * 12),
    fightIq: 12 + Math.floor(rng() * 12),
    willpower: 18 + Math.floor(rng() * 16),
    reflexes: 15 + Math.floor(rng() * 14),
    flexibility: 14 + Math.floor(rng() * 14),
    aggression: 12 + Math.floor(rng() * 16),
    control: 12 + Math.floor(rng() * 16),
  };
}

function applyClanBonuses(stats, clan) {
  const next = { ...stats };
  const rarity = getRarity(clan.rarity);
  for (const [stat, amount] of Object.entries(clan.bonuses)) {
    if (stat in next) {
      next[stat] = clampStat(next[stat] + amount * rarity.powerMultiplier);
    }
  }
  return next;
}

function removeClanBonuses(stats, clan) {
  const next = { ...stats };
  const rarity = getRarity(clan.rarity);
  for (const [stat, amount] of Object.entries(clan.bonuses)) {
    if (stat in next) {
      next[stat] = clampStat(next[stat] - amount * rarity.powerMultiplier);
    }
  }
  return next;
}

function createLog(text, type = 'life') {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    text,
  };
}

function addLog(life, text, type) {
  return {
    ...life,
    log: [createLog(text, type), ...life.log].slice(0, 60),
  };
}

function normalizeTechniques(techniques = {}) {
  return Object.fromEntries(
    Object.keys(TECHNIQUE_TRACKS).map((track) => [track, Math.max(0, Math.floor(techniques[track] ?? DEFAULT_TECHNIQUES[track] ?? 0))])
  );
}

function techniqueLeader(techniques = {}) {
  const normalized = normalizeTechniques(techniques);
  const entries = Object.entries(normalized).sort(([, a], [, b]) => b - a);
  const [leader, leaderValue] = entries[0] ?? ['striking', 0];
  const secondValue = entries[1]?.[1] ?? 0;
  if (leaderValue <= 0) return { track: null, value: 0, archetype: 'Unformed' };
  if (leaderValue === secondValue) return { track: null, value: leaderValue, archetype: 'Hybrid' };
  return { track: leader, value: leaderValue, archetype: TECHNIQUE_TRACKS[leader]?.archetype ?? 'Hybrid' };
}

export function getPlayerArchetype(life) {
  return techniqueLeader(life?.techniques).archetype;
}

export function getOpponentArchetype(opponent) {
  if (!opponent) return 'Hybrid';
  const style = `${opponent.style ?? ''} ${(opponent.strengths ?? []).join(' ')} ${opponent.temperament ?? ''}`.toLowerCase();
  if (/(ancient|soft lock|old-master|iron body|conditioning|security)/.test(style)) return 'Defensive Specialist';
  if (/(wrestling|grappling|judo|sumo|body lock|lock|ride|throw|crusher|grip)/.test(style)) return 'Grappler';
  if (/(boxing|karate|kickboxing|muay|brawling|striking|elbow|lance|rush|demon|assassin|savate)/.test(style)) return 'Striker';
  if (/defensive/.test(style)) return 'Defensive Specialist';

  const stats = getOpponentStats(opponent);
  const scores = {
    Striker: opponentTacticStat(stats, 'pressure') + opponentTacticStat(stats, 'counter'),
    Grappler: opponentTacticStat(stats, 'grapple') * 1.6,
    'Defensive Specialist': opponentTacticStat(stats, 'defend') + opponentTacticStat(stats, 'conserve'),
  };
  return Object.entries(scores).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'Hybrid';
}

export function getAdaptedOpponent(life, opponentId) {
  if (opponentId === 'rival') return rivalAsOpponent(life);
  const opponent = OPPONENTS[opponentId];
  if (!opponent) return null;
  const adaptationCount = opponent.tier === 'Special Fight'
    ? Math.max(0, Math.floor(life?.specialFightAdaptations?.[opponentId] ?? 0))
    : 0;
  if (!adaptationCount) return opponent;
  const powerBoost = Math.round(opponent.power * Math.min(1.35, adaptationCount * 0.16));
  const adapted = {
    ...opponent,
    power: opponent.power + powerBoost,
    risk: opponent.risk + Math.min(20, adaptationCount * 3),
    strengths: [...opponent.strengths, 'rematch adaptation'],
    adaptationCount,
  };
  const title = specialFighterGrowthTitle(adapted);
  return title ? { ...adapted, growthTitle: title, threat: `${title} ${adapted.threat ?? ''}`.trim() } : adapted;
}

function specialFighterGrowthTitle(opponent) {
  if (opponent?.tier !== 'Special Fight') return '';
  const stats = getOpponentStats(opponent);
  const peak = Math.max(...COMBAT_STATS.map((stat) => stats[stat] ?? 0));
  const average = Object.values(stats).reduce((sum, value) => sum + value, 0) / COMBAT_STATS.length;
  const score = Math.max(opponent.power ?? 0, average, peak * 0.82);
  if (score >= 2600) return 'Mythic Calamity';
  if (score >= 2100) return 'Apex Revenant';
  if (score >= 1650) return 'Demon Class';
  if (score >= 1250) return 'Awakened Monster';
  if (score >= 950) return 'Rematch Killer';
  return '';
}

function rivalAsOpponent(life) {
  const rival = life?.rival;
  if (!rival) return null;
  return {
    name: rival.name,
    style: rival.style,
    threat: rival.rank ?? 'Rival',
    tier: 'Rival',
    power: rival.power,
    temperament: rival.temperament ?? 'patient counter-striker',
    strengths: rival.strengths ?? ['studied habits', 'personal rivalry', 'steady improvement'],
    weakness: rival.weakness ?? 'knows you well, but gets emotional when behind',
    reward: Math.max(250, Math.round((rival.power ?? 80) * 4)),
    rep: Math.max(5, Math.round((rival.power ?? 80) / 18)),
    risk: Math.max(4, Math.round((rival.power ?? 80) / 55)),
    stats: rival.stats,
    requirements: {},
  };
}

export function getCombatOpponent(life, opponentId) {
  if (HUNTER_MONSTERS[opponentId]) return HUNTER_MONSTERS[opponentId];
  return getAdaptedOpponent(life, opponentId);
}

export function createNewLife({ gender = 'Male', firstName = '', seed = Date.now() } = {}) {
  const rng = createRng(seed);
  const clan = rollClan(rng);
  const rolledBaseStats = baseStats(rng);
  const stats = applyClanBonuses(rolledBaseStats, clan);
  const familyWealth = pick(WEALTH, rng);
  const moneyByWealth = {
    poor: 40,
    'working class': 120,
    stable: 400,
    comfortable: 1200,
    wealthy: 3200,
  };
  const fallbackFirstName = pick(FIRST_NAMES, rng);
  pick(LAST_NAMES, rng);
  const identity = identityFor(cleanFirstName(firstName) || fallbackFirstName, clan);

  const life = {
    version: 1,
    rngSeed: Math.floor(rng() * 999999999),
    identity: {
      ...identity,
      gender,
      age: 12,
      month: 0,
    },
    phase: 'Youth',
    background: {
      familyWealth,
      neighborhood: pick(NEIGHBORHOODS, rng),
      temperament: pick(TEMPERAMENTS, rng),
      childhoodHealth: 70 + Math.floor(rng() * 25),
    },
    clan,
    baseStats: rolledBaseStats,
    stats,
    resources: {
      money: moneyByWealth[familyWealth],
      health: 100,
      energy: 100,
      mood: 75,
      reputation: clan.bonuses.reputation ?? 0,
      clanRerolls: 10,
    },
    record: {
      wins: 0,
      losses: 0,
      kos: 0,
    },
    style: 'Unformed',
    rank: 'Local Nobody',
    techniques: { ...DEFAULT_TECHNIQUES },
    injuries: [],
    autoTraining: {},
    autoRecovery: {},
    relationships: {
      family: 55 + Math.floor(rng() * 35),
      mentor: 0,
      rival: 0,
      sponsor: 0,
    },
    rival: null,
    coach: {
      fighters: [],
      feed: [],
    },
    social: {
      platform: 'Underground Feed',
      followers: 0,
      calledOutTarget: null,
      lastPostMonth: null,
      postCount: 0,
    },
    mentor: starterMentor(),
    association: null,
    ownedAssets: [],
    nextFightPrep: {},
    unlockedSkills: [],
    defeatedSpecialFights: [],
    specialFightAdaptations: {},
    specialTrainingCaps: {},
    specialTrainingLastMonth: null,
    fightCooldowns: {},
    medicalSuspensionUntil: 0,
    tournament: null,
    clanPasswordProgress: 0,
    clanPasswordHint: clanPasswordHint(0),
    clanRerollPity: 0,
    monarchBody: {
      unlocked: false,
      source: null,
      unlockedMonth: null,
    },
    clanAwakening: isMishimeClan(clan) ? { ...DEFAULT_CLAN_AWAKENING } : null,
    hunterWorld: defaultHunterWorld(),
    world: {
      hiddenWorld: false,
      league: 'None',
      heat: getRarity(clan.rarity).powerMultiplier > 1.5 ? 10 : 0,
      rumors: ['The gyms in your district all whisper about private matches.'],
    },
    activeFight: null,
    pendingEvent: null,
    eventFlags: {},
    trainingPopup: null,
    trainingSessionCount: 0,
    trainingSessionsUsed: 0,
    favoriteTrainingIds: [],
    log: [
      createLog(`Born in the ${pick(NEIGHBORHOODS, rng)} with a ${familyWealth} family.`),
      createLog(`Clan result: ${clan.name} [${clan.rarity}].`, 'clan'),
    ],
  };
  life.resources.health = maxLifeHealth(life);
  life.resources.energy = maxLifeEnergy(life);
  return life;
}

export function rerollClan(life) {
  if (life.resources.clanRerolls <= 0) return addLog(life, 'No Clan Rerolls remain.', 'clan');
  const rng = createRng(life.rngSeed + life.resources.clanRerolls * 97);
  const nextPity = Math.max(0, Math.floor(life.clanRerollPity ?? 0)) + 1;
  const pityHit = nextPity >= DEVIL_GENE_PITY_REROLLS;
  const clan = pityHit ? devilGeneClan() : rollClan(rng);
  const base = clone(life);
  const trainedStats = removeClanBonuses(base.stats, base.clan);
  const next = {
    ...base,
    rngSeed: Math.floor(rng() * 999999999),
    identity: renameForClan(base, clan),
    clan,
    clanRerollPity: clan.name === DEVIL_GENE_CLAN_NAME ? 0 : nextPity,
    clanAwakening: isMishimeClan(clan) ? { ...DEFAULT_CLAN_AWAKENING } : null,
    baseStats: trainedStats,
    stats: applyClanBonuses(trainedStats, clan),
    injuries: base.injuries,
    activeFight: base.activeFight,
    resources: {
      ...base.resources,
      health: base.resources.health,
      energy: base.resources.energy,
      mood: base.resources.mood,
      clanRerolls: base.resources.clanRerolls - 1,
    },
  };
  return addLog(next, `Clan rerolled into ${clan.name} [${clan.rarity}].`, 'clan');
}

export function acceptClan(life) {
  return addLog(life, `You accept the burden of ${life.clan.name}.`, 'clan');
}

export function redeemClanPassword(life, password) {
  if ((password ?? '').trim().toUpperCase() !== SECRET_CLAN_PASSWORD) {
    return addLog(life, 'Clan password rejected.', 'clan');
  }
  const rng = createRng(life.rngSeed + 210021);
  const clan = clone(CLANS.find((item) => item.name === 'Ashura') ?? rollClanByRarity(rng, 'Secret'));
  const base = clone(life);
  const trainedStats = removeClanBonuses(base.stats, base.clan);
  const next = {
    ...base,
    rngSeed: Math.floor(rng() * 999999999),
    identity: renameForClan(base, clan),
    clan,
    clanAwakening: isMishimeClan(clan) ? { ...DEFAULT_CLAN_AWAKENING } : null,
    baseStats: trainedStats,
    stats: applyClanBonuses(trainedStats, clan),
    injuries: base.injuries,
    activeFight: base.activeFight,
    resources: {
      ...base.resources,
      health: base.resources.health,
      energy: base.resources.energy,
      mood: base.resources.mood,
      clanRerolls: base.resources.clanRerolls,
    },
  };
  return addLog(next, `Clan password accepted: ${clan.name} [${clan.rarity}] awakened.`, 'clan');
}

export function redeemHunterPassword(life, password) {
  if ((password ?? '').trim().toUpperCase() !== HUNTER_EVENT_PASSWORD) {
    return addLog(life, 'Hunter password rejected.', 'world');
  }
  if (life.identity.age < 18) {
    return addLog(life, 'Hunter password locked: you can only enter SOLO21 past age 18.', 'world');
  }
  const hunterWorld = normalizeHunterWorld(life.hunterWorld);
  if (hunterWorld.unlocked) {
    return addLog(life, 'Hunter Gates are already unlocked.', 'world');
  }
  if (life.pendingEvent) {
    return addLog(life, 'Finish the current event before using the Hunter password.', 'world');
  }
  const next = clone(life);
  const event = systemAwakeningEvent(next);
  next.pendingEvent = event;
  next.eventFlags = {
    ...next.eventFlags,
    [event.flag]: true,
  };
  return addLog(next, 'Hunter password accepted: the Gate event is opening.', 'world');
}

export function redeemMentorPassword(life, password) {
  if ((password ?? '').trim().toUpperCase() !== SECRET_MENTOR_PASSWORD) {
    return addLog(life, 'Mentor password rejected.', 'mentor');
  }
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const mentor = MENTORS.find((item) => item.id === 'systemSage');
  next.mentor = clone(mentor);
  next.relationships.mentor = 100;
  return addLog(next, 'Mentor password accepted: The System Sage is now your mentor. Normal training gains are doubled.', 'mentor');
}

export function redeemMonarchBodyPassword(life, password) {
  if ((password ?? '').trim().toUpperCase() !== MONARCH_BODY_PASSWORD) {
    return addLog(life, 'Monarch Body password rejected.', 'life');
  }
  if (life.activeFight && !life.activeFight.finished) {
    return addLog(life, 'Finish the active fight before awakening MONARCH BODY.', 'life');
  }
  const next = clone(life);
  const cappedStats = Object.fromEntries(
    Object.keys(next.stats ?? {}).map((stat) => [stat, getStatCap(next, stat)])
  );
  next.stats = cappedStats;
  next.baseStats = { ...cappedStats };
  next.monarchBody = {
    unlocked: true,
    source: 'password',
    unlockedMonth: lifeMonth(next),
  };
  return addLog(next, 'MONARCH BODY awakened: every current stat has been raised to its current maximum cap.', 'life');
}

export function useSocialAction(life, actionId) {
  const action = SOCIAL_ACTIONS[actionId];
  if (!action) return addLog(life, 'Unknown social media action.', 'social');
  const locked = socialActionStatus(life, action);
  if (locked) return addLog(life, `${action.name} unavailable: ${locked}`, 'social');

  const next = clone(life);
  next.social = normalizeSocial(next);
  const statShowcase = Math.round(((next.stats.strength ?? 0) + (next.stats.speed ?? 0) + (next.stats.technique ?? 0) + (next.stats.fightIq ?? 0)) / 65);
  const followerScale = followerTierBonus(next.social.followers);
  const clanScale = actionId === 'clanMystery' ? Math.round(getRarity(next.clan.rarity).powerMultiplier * 350) : 0;
  const fightScale = actionId === 'fightHighlight' ? (next.record.wins * 150 + next.record.kos * 120 + next.record.losses * 45) : 0;
  const followerGain = Math.max(25, Math.round((action.followers ?? 0) + statShowcase * 18 + clanScale + fightScale + followerScale * 40));
  addFollowers(next, followerGain);
  next.social.postCount = (next.social.postCount ?? 0) + 1;
  next.social.lastPostMonth = lifeMonth(next);
  next.social.lastPost = socialPostFlavor(actionId, action, next, followerGain);

  if (action.reputation) next.resources.reputation = clamp(next.resources.reputation + action.reputation + Math.floor(followerScale / 2), 0, 999);
  if (action.money) next.resources.money += action.money + Math.floor(next.social.followers / 1200) * 25;
  if (action.energy) next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy + action.energy);
  if (action.mood) next.resources.mood = clamp(next.resources.mood + action.mood);
  if (action.heat) next.world.heat = clamp(next.world.heat + action.heat, 0, 100);
  if (action.sponsor) next.relationships.sponsor = clamp(next.relationships.sponsor + action.sponsor + Math.floor(followerScale / 2));

  return addLog(next, `${action.name}: ${action.text} +${followerGain} followers.`, 'social');
}

export function trashTalkOpponent(life, opponentId, styleId = 'respectful') {
  const opponent = OPPONENTS[opponentId];
  if (!opponent) return addLog(life, 'That opponent is not on the board.', 'social');
  const style = SOCIAL_TRASH_TALK_STYLES[styleId] ?? SOCIAL_TRASH_TALK_STYLES.respectful;
  if (style.fightIqRequired && (life.stats.fightIq ?? 0) < style.fightIqRequired) {
    return addLog(life, `${style.name} failed: your Fight IQ is too low to make the breakdown convincing.`, 'social');
  }

  const next = clone(life);
  next.social = normalizeSocial(next);
  const hype = opponentHype(opponent);
  const baseGain = 500 + hype * 360 + Math.floor(next.social.followers * 0.035);
  const clanBonus = styleId === 'clanFlex' ? Math.round(getRarity(next.clan.rarity).powerMultiplier * 650) : 0;
  const followerGain = Math.max(100, Math.round(baseGain * style.followersMultiplier + clanBonus));
  addFollowers(next, followerGain);
  next.resources.reputation = clamp(next.resources.reputation + style.reputation + Math.floor(hype / 2), 0, 999);
  next.resources.mood = clamp(next.resources.mood + style.mood);
  next.world.heat = clamp(next.world.heat + style.heat + Math.floor(hype / 3), 0, 100);
  next.relationships.rival = clamp(next.relationships.rival + 5 + Math.floor(hype / 2));
  next.social.calledOutTarget = {
    opponentId,
    style: styleId,
    name: opponent.name,
    month: lifeMonth(next),
    followerStake: Math.max(250, Math.round(followerGain * style.backlashMultiplier)),
    rewardMultiplier: style.rewardMultiplier,
    opponentMomentum: style.opponentMomentum,
  };

  return addLog(next, `${style.name}: you called out ${opponent.name}. +${followerGain} followers.`, 'social');
}

export function endLife(life, ending = {}) {
  const next = clone(life);
  const totalPower = Object.values(next.stats).reduce((sum, value) => sum + value, 0);
  const careerTitle = next.association
    ? `${next.identity.name}, Association Fighter`
    : next.world.hiddenWorld
      ? `${next.identity.name}, Underground Name`
      : `${next.identity.name}, Local Fighter`;
  const title = ending.title ?? careerTitle;
  next.ended = true;
  next.activeFight = null;
  next.pendingEvent = null;
  next.legacySummary = {
    eyebrow: ending.eyebrow ?? 'Legacy Summary',
    title,
    lines: [
      ...(ending.lines ?? []),
      `Record: ${next.record.wins}-${next.record.losses}, ${next.record.kos} finishes.`,
      `Clan: ${next.clan.name} [${next.clan.rarity}].`,
      `Peak power total: ${totalPower}.`,
      `Reputation: ${next.resources.reputation}. Money banked: $${next.resources.money}.`,
      `League: ${next.world.league}. Association: ${next.association ?? 'None'}.`,
    ],
  };
  return addLog(next, ending.logText ?? `Life ended: ${title}.`, 'life');
}

export function train(life, actionId) {
  const action = TRAINING_ACTIONS[actionId];
  if (!action) return life;
  const allowance = getTrainingAllowance(life);
  if (allowance.exhausted) {
    return addLog(life, `Training limit reached: ${allowance.used}/${allowance.limit} sessions used. Age Up before training again.`, 'train');
  }
  if (life.resources.energy < action.cost) {
    return queueTriggeredEvents(addLog(life, `You are too exhausted for ${action.name}.`, 'train'), 'train', { actionId });
  }

  const rarity = getRarity(life.clan.rarity);
  const next = clone(life);
  const beforeGrowth = clone(next);
  next.trainingSessionsUsed = getTrainingAllowance(next).used + 1;
  next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy - action.cost);
  next.resources.mood = clamp(next.resources.mood + 1);

  for (const [stat, amount] of Object.entries(action.gains)) {
    const mentorBonus = next.mentor?.focus?.includes(stat) ? 1 : 0;
    const homeGymBonus = next.ownedAssets?.includes('homeGym') && stat === Object.keys(action.gains)[0] ? 1 : 0;
    next.stats[stat] = clampLifeStat(next, stat, next.stats[stat] + amount * rarity.powerMultiplier * mentorTrainingMultiplier(next.mentor) + mentorBonus + homeGymBonus);
  }
  applyVitalCapGrowth(beforeGrowth, next);

  const riskScore = action.risk + next.world.heat / 12 - next.stats.control / 45;
  if (riskScore > 7) {
    next.resources.health = clampLifeResource(next, 'health', next.resources.health - Math.ceil(riskScore / 2));
    addOrUpgradeInjury(next, withInjuryTier({ name: 'training bruises', text: 'the session leaves bruising that makes hard contact a bad idea for a short stretch.' }, riskScore > 10 ? 'Moderate' : 'Mild'));
  }

  if (next.style === 'Unformed' && next.stats.technique >= 28) {
    next.style = 'Hybrid Striker';
  }
  trainRivalBesidePlayer(next, action);

  if (action.popup && actionId === 'sparTrainingPartner') {
    next.trainingSessionCount = Math.max(0, Math.floor(next.trainingSessionCount ?? 0)) + 1;
    next.trainingPopup = sparTrainingPopup(next, riskScore);
  }

  return queueTriggeredEvents(addLog(next, `${action.name}: ${action.text}`, 'train'), 'train', { actionId, injuryOccurred: riskScore > 7, injuryName: 'training bruises' });
}

function applyTrainingNoPopup(life, actionId) {
  const action = TRAINING_ACTIONS[actionId];
  const autoStatus = getAutoTrainingStatus(life, actionId);
  if (!action || autoStatus.locked) return null;
  if (getTrainingAllowance(life).exhausted) return 'limit';
  const energyCost = Math.max(0, action.cost - mentorAutoEnergyDiscount(life.mentor));
  if (life.resources.energy < energyCost) return null;
  const rarity = getRarity(life.clan.rarity);
  const beforeGrowth = clone(life);
  life.trainingSessionsUsed = getTrainingAllowance(life).used + 1;
  life.resources.energy = clampLifeResource(life, 'energy', life.resources.energy - energyCost);
  life.resources.mood = clamp(life.resources.mood + 1);
  for (const [stat, amount] of Object.entries(action.gains)) {
    const mentorBonus = life.mentor?.focus?.includes(stat) ? 1 : 0;
    const homeGymBonus = life.ownedAssets?.includes('homeGym') && stat === Object.keys(action.gains)[0] ? 1 : 0;
    const autoBonus = mentorAutoStatBonus(life.mentor, stat);
    life.stats[stat] = clampLifeStat(life, stat, life.stats[stat] + amount * rarity.powerMultiplier * mentorTrainingMultiplier(life.mentor) + mentorBonus + homeGymBonus + autoBonus);
  }
  applyVitalCapGrowth(beforeGrowth, life);
  if (life.style === 'Unformed' && life.stats.technique >= 28) life.style = 'Hybrid Striker';
  trainRivalBesidePlayer(life, action, true);
  return action;
}

function applyRecoveryNoPopup(life, actionId) {
  const action = RECOVERY_ACTIONS[actionId];
  if (life.activeFight && !life.activeFight.finished) return null;
  if (!action || getAutoRecoveryStatus(life, actionId).locked || life.resources.money < action.cost) return null;
  const needsRecovery = life.resources.health < maxLifeHealth(life) || life.resources.energy < maxLifeEnergy(life) || (action.injuryHeal > 0 && life.injuries.length > 0);
  if (!needsRecovery) return null;
  life.resources.money -= action.cost;
  life.resources.health = clampLifeResource(life, 'health', life.resources.health + action.health);
  life.resources.energy = clampLifeResource(life, 'energy', life.resources.energy + action.energy);
  life.resources.mood = clamp(life.resources.mood + action.mood);
  if (action.stat) {
    const [stat, amount] = action.stat;
    life.stats[stat] = clampStat(life.stats[stat] + amount);
  }
  if (action.injuryHeal > 0 && life.injuries.length > 0) {
    life.injuries = life.injuries.slice(action.injuryHeal);
    if (life.injuries.length === 0) life.medicalSuspensionUntil = 0;
  }
  return action;
}

function normalizedMentor(mentor) {
  if (!mentor) return null;
  const catalog = MENTORS.find((item) => item.id === mentor.id);
  return catalog ? { ...catalog, ...mentor } : mentor;
}

function mentorTrainingMultiplier(mentor) {
  return Math.max(1, Number(normalizedMentor(mentor)?.trainingMultiplier ?? 1));
}

function mentorAllows(mentor, key, actionId) {
  const normalized = normalizedMentor(mentor);
  if (!normalized) return false;
  const allowed = normalized[key];
  return allowed === 'all' || allowed?.includes(actionId);
}

function mentorAutoEnergyDiscount(mentor) {
  const rarity = normalizedMentor(mentor)?.rarity;
  if (rarity === 'Secret') return 5;
  if (rarity === 'Mythic') return 3;
  if (rarity === 'Legendary') return 2;
  return 0;
}

function mentorAutoStatBonus(mentor, stat) {
  const normalized = normalizedMentor(mentor);
  if (normalized?.rarity === 'Secret') return 1;
  if (normalized?.rarity === 'Mythic' && normalized.focus?.includes(stat)) return 1;
  return 0;
}

export function getAutoTrainingStatus(life, actionId) {
  const action = TRAINING_ACTIONS[actionId];
  if (!action) return { locked: true, reason: 'Unknown training method.' };
  const mentor = normalizedMentor(life.mentor);
  if (!mentor) return { locked: true, reason: 'Requires a mentor to supervise Auto Training.' };
  if (!mentorAllows(mentor, 'autoTrainingIds', actionId)) {
    return { locked: true, reason: `${mentor.name} does not supervise ${action.name}.` };
  }
  return { locked: false, reason: `${mentor.name} can supervise ${action.name}.` };
}

export function getAutoRecoveryStatus(life, actionId) {
  const action = RECOVERY_ACTIONS[actionId];
  if (!action) return { locked: true, reason: 'Unknown recovery method.' };
  const mentor = normalizedMentor(life.mentor);
  if (!mentor) return { locked: true, reason: 'Requires a mentor to supervise Auto Recovery.' };
  if (!mentorAllows(mentor, 'autoRecoveryIds', actionId)) {
    return { locked: true, reason: `${mentor.name} does not supervise ${action.name}.` };
  }
  if (life.activeFight && !life.activeFight.finished) {
    return { locked: false, paused: true, reason: `${mentor.name} is paused while a fight is live.` };
  }
  return { locked: false, reason: `${mentor.name} can supervise ${action.name}.` };
}

export function getTrainingAllowance(life) {
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const vitalityBonus = hunter.unlocked && hunter.playerAwakened
    ? Math.max(0, Math.floor(hunter.stats?.vitality ?? 0))
    : 0;
  const limit = TRAINING_SESSION_LIMIT + vitalityBonus;
  const used = clamp(Math.floor(life.trainingSessionsUsed ?? 0), 0, limit);
  return {
    used,
    limit,
    remaining: limit - used,
    exhausted: used >= limit,
  };
}

function runAutoUpkeep(life) {
  const trained = [];
  let blockedByLimit = false;
  for (const [actionId, enabled] of Object.entries(life.autoTraining ?? {})) {
    if (!enabled) continue;
    if (getAutoTrainingStatus(life, actionId).locked) continue;
    const action = applyTrainingNoPopup(life, actionId);
    if (action === 'limit') blockedByLimit = true;
    else if (action) trained.push(action.name);
  }
  const recovered = [];
  for (const [actionId, enabled] of Object.entries(life.autoRecovery ?? {})) {
    if (!enabled) continue;
    if (getAutoRecoveryStatus(life, actionId).locked) continue;
    const action = applyRecoveryNoPopup(life, actionId);
    if (action) recovered.push(action.name);
  }
  if (trained.length) life.log = [createLog(`Auto training: ${trained.join(', ')} completed without popups.`, 'train'), ...life.log].slice(0, 60);
  if (blockedByLimit && !life.log?.[0]?.text?.includes('Auto training paused')) {
    const allowance = getTrainingAllowance(life);
    life.log = [createLog(`Auto training paused: ${allowance.used}/${allowance.limit} sessions used. Age Up before training again.`, 'train'), ...life.log].slice(0, 60);
  }
  if (recovered.length) life.log = [createLog(`Auto recovery: ${recovered.join(', ')} completed without popups.`, 'recovery'), ...life.log].slice(0, 60);
  return life;
}

export function runAutoRoutine(life) {
  if (!life || life.ended) return life;
  const next = clone(life);
  const previousLogId = next.log?.[0]?.id ?? null;
  runAutoUpkeep(next);
  return next.log?.[0]?.id !== previousLogId ? next : life;
}

export function toggleAutoTraining(life, actionId) {
  if (!TRAINING_ACTIONS[actionId]) return life;
  const status = getAutoTrainingStatus(life, actionId);
  if (status.locked) return addLog(life, `Auto training locked: ${status.reason}`, 'train');
  const next = clone(life);
  const enabled = !(next.autoTraining?.[actionId]);
  next.autoTraining = { ...(next.autoTraining ?? {}), [actionId]: enabled };
  let result = addLog(next, `Auto training ${enabled ? 'enabled' : 'disabled'}: ${TRAINING_ACTIONS[actionId].name}.`, 'train');
  if (!enabled) return result;
  const trained = applyTrainingNoPopup(result, actionId);
  if (trained === 'limit') {
    const allowance = getTrainingAllowance(result);
    return addLog(result, `Auto training paused: ${allowance.used}/${allowance.limit} sessions used. Age Up before training again.`, 'train');
  }
  if (!trained) return addLog(result, `Auto training queued: ${TRAINING_ACTIONS[actionId].name} will run when you have enough energy.`, 'train');
  return addLog(result, `Auto training: ${TRAINING_ACTIONS[actionId].name} ran immediately without popups.`, 'train');
}

export function toggleFavoriteTraining(life, actionId) {
  if (!TRAINING_ACTIONS[actionId]) return life;
  const next = clone(life);
  const favorites = new Set(
    Array.isArray(next.favoriteTrainingIds)
      ? next.favoriteTrainingIds.filter((id) => Boolean(TRAINING_ACTIONS[id]))
      : []
  );
  if (favorites.has(actionId)) favorites.delete(actionId);
  else favorites.add(actionId);
  next.favoriteTrainingIds = [...favorites];
  return next;
}

export function toggleAutoRecovery(life, actionId) {
  if (!RECOVERY_ACTIONS[actionId]) return life;
  const status = getAutoRecoveryStatus(life, actionId);
  if (status.locked) return addLog(life, `Auto recovery locked: ${status.reason}`, 'recovery');
  const next = clone(life);
  const enabled = !(next.autoRecovery?.[actionId]);
  next.autoRecovery = { ...(next.autoRecovery ?? {}), [actionId]: enabled };
  let result = addLog(next, `Auto recovery ${enabled ? 'enabled' : 'disabled'}: ${RECOVERY_ACTIONS[actionId].name}.`, 'recovery');
  if (!enabled) return result;
  if (result.activeFight && !result.activeFight.finished) {
    return addLog(result, `Auto recovery paused while a fight is live: ${RECOVERY_ACTIONS[actionId].name} will resume after combat.`, 'recovery');
  }
  const recovered = applyRecoveryNoPopup(result, actionId);
  if (!recovered) return addLog(result, `Auto recovery queued: ${RECOVERY_ACTIONS[actionId].name} will run when recovery is needed and affordable.`, 'recovery');
  return addLog(result, `Auto recovery: ${RECOVERY_ACTIONS[actionId].name} ran immediately without popups.`, 'recovery');
}

export function getSpecialTrainingStatus(life, actionId) {
  const action = SPECIAL_TRAINING_ACTIONS[actionId];
  if (!action) return { unlocked: false, lockReason: 'Unknown special training.' };
  const specialWins = Object.values(life.specialFightAdaptations ?? {}).reduce((sum, count) => sum + Math.max(0, count ?? 0), 0);
  const totalWins = life.record?.wins ?? 0;
  const totalFights = totalWins + (life.record?.losses ?? 0);
  const defeated = new Set(life.defeatedSpecialFights ?? []);
  const champion = life.tournament?.champion || life.rank === 'Annihilation Bracket Champion';
  let lockReason = '';

  if (actionId === 'undergroundLimitDrills' && (!(life.world?.hiddenWorld) || totalWins < 10)) {
    lockReason = 'Requires hidden world access and 10 wins.';
  }
  if (actionId === 'monsterFilmStudy' && specialWins < 1 && defeated.size < 1) {
    lockReason = 'Requires defeating any special fighter.';
  }
  if (actionId === 'demonFrameAwakening' && !defeated.has('yujiriHanmae') && specialWins < 3) {
    lockReason = 'Requires defeating Yujiri Hanmae or winning 3 special fights.';
  }
  if (actionId === 'bracketEvolution' && !champion) {
    lockReason = 'Requires winning a tournament championship.';
  }
  if (actionId === 'undergroundLimitDrills' && !lockReason && totalFights < 10) {
    lockReason = 'Requires at least 10 total fights.';
  }

  return { unlocked: !lockReason, lockReason };
}

export function specialTrain(life, actionId) {
  const action = SPECIAL_TRAINING_ACTIONS[actionId];
  if (!action) return addLog(life, 'That special training does not exist.', 'train');
  const status = getSpecialTrainingStatus(life, actionId);
  if (!status.unlocked) return addLog(life, `${action.name} locked: ${status.lockReason}`, 'train');
  if ((life.specialTrainingLastMonth ?? null) === lifeMonth(life)) {
    return addLog(life, 'Special training is limited to once per month. Age up before attempting another ceiling session.', 'train');
  }
  if ((life.resources.energy ?? 0) < action.cost.energy) {
    return addLog(life, `${action.name} failed: not enough energy.`, 'train');
  }
  if ((life.resources.money ?? 0) < action.cost.money) {
    return addLog(life, `${action.name} failed: not enough money.`, 'train');
  }

  const next = clone(life);
  next.specialTrainingCaps = { ...(next.specialTrainingCaps ?? {}) };
  next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy - action.cost.energy);
  next.resources.money = Math.max(0, next.resources.money - action.cost.money);
  next.specialTrainingLastMonth = lifeMonth(next);
  for (const [stat, gain] of Object.entries(action.capGains)) {
    next.specialTrainingCaps[stat] = Math.max(0, (next.specialTrainingCaps[stat] ?? 0) + gain);
  }
  const capText = Object.entries(action.capGains).map(([stat, gain]) => `+${gain} ${statLabel(stat)} cap`).join(', ');
  return addLog(next, `${action.name}: ${capText} cap increased. ${action.text}`, 'train');
}

export function spendMoneyAction(life, actionId) {
  const action = MONEY_ACTIONS[actionId];
  if (!action) return life;
  const lockReason = moneyActionLockReason(life, action);
  if (lockReason) return addLog(life, `${action.name} locked: ${lockReason}`, 'money');
  if ((life.resources.money ?? 0) < action.cost) return addLog(life, `You cannot afford ${action.name}. You need $${action.cost}.`, 'money');
  if (action.assetKey && (life.ownedAssets ?? []).includes(action.assetKey)) return addLog(life, `You already own ${action.name}.`, 'money');
  if (action.prepKey && life.nextFightPrep?.[action.prepKey]) return addLog(life, `${action.name} is already prepared for your next fight.`, 'money');

  const next = clone(life);
  next.ownedAssets = next.ownedAssets ?? [];
  next.nextFightPrep = next.nextFightPrep ?? {};
  next.resources.money = Math.max(0, next.resources.money - action.cost);

  if (action.prepKey) {
    next.nextFightPrep[action.prepKey] = true;
  }

  if (action.assetKey) {
    next.ownedAssets.push(action.assetKey);
  }

  applyMoneyActionEffects(next, actionId);
  return queueTriggeredEvents(addLog(next, `${action.name}: ${action.text}`, 'money'), 'money', { actionId, group: action.group });
}

function moneyActionLockReason(life, action) {
  const requires = action.requires ?? {};
  if (requires.reputation && life.resources.reputation < requires.reputation) return `need ${requires.reputation} reputation`;
  if (requires.wins && life.record.wins < requires.wins) return `need ${requires.wins} wins`;
  if (requires.hiddenWorld && !life.world.hiddenWorld) return 'need hidden world access';
  if (requires.hiddenWorldOrInjury && !life.world.hiddenWorld && life.injuries.length === 0) return 'need hidden world access or an injury';
  return '';
}

function applyMoneyActionEffects(life, actionId) {
  if (actionId === 'scoutTape') {
    life.stats.fightIq = clampLifeStat(life, 'fightIq', life.stats.fightIq + 3);
  }
  if (actionId === 'privateSparring') {
    life.stats.technique = clampLifeStat(life, 'technique', life.stats.technique + 3);
    life.stats.reflexes = clampLifeStat(life, 'reflexes', life.stats.reflexes + 2);
    life.resources.energy = clampLifeResource(life, 'energy', life.resources.energy - 10);
  }
  if (actionId === 'cleanMealPlan') {
    life.resources.health = clampLifeResource(life, 'health', life.resources.health + 10);
    life.resources.energy = clampLifeResource(life, 'energy', life.resources.energy + 12);
    life.resources.mood = clamp(life.resources.mood + 4);
  }
  if (actionId === 'familySupport') {
    life.relationships.family = clamp(life.relationships.family + 10);
    life.resources.mood = clamp(life.resources.mood + 5);
    life.world.heat = clamp(life.world.heat - 3);
  }
  if (actionId === 'sponsorImage') {
    life.relationships.sponsor = clamp(life.relationships.sponsor + 10);
    life.resources.reputation = clamp(life.resources.reputation + 6, 0, 999);
    life.resources.mood = clamp(life.resources.mood + 4);
  }
  if (actionId === 'backAlleyDoctor') {
    if (life.injuries.length > 0) life.injuries = life.injuries.slice(1);
    if (life.injuries.length === 0) life.medicalSuspensionUntil = 0;
    life.resources.health = clampLifeResource(life, 'health', life.resources.health + 18);
    life.resources.mood = clamp(life.resources.mood - 3);
    life.world.heat = clamp(life.world.heat + 8);
  }
  if (actionId === 'illegalBoutTip') {
    life.world.hiddenWorld = true;
    life.world.league = life.world.league === 'None' ? 'Basement Circuit' : life.world.league;
    life.resources.reputation = clamp(life.resources.reputation + 8, 0, 999);
    life.world.heat = clamp(life.world.heat + 12);
  }
  if (actionId === 'experimentalConditioning') {
    const beforeGrowth = clone(life);
    life.stats.strength = clampLifeStat(life, 'strength', life.stats.strength + 5);
    life.stats.durability = clampLifeStat(life, 'durability', life.stats.durability + 5);
    life.stats.willpower = clampLifeStat(life, 'willpower', life.stats.willpower + 4);
    applyVitalCapGrowth(beforeGrowth, life);
    life.resources.health = clampLifeResource(life, 'health', life.resources.health - 14);
    life.world.heat = clamp(life.world.heat + 6);
    const injuryRoll = deterministicRoll(life.rngSeed, life.resources.money, 'experimental-conditioning');
    if (injuryRoll < 0.45) addOrUpgradeInjury(life, withInjuryTier({ name: 'black-market strain', text: 'the shortcut leaves something in the body feeling wrong.' }, 'Moderate'));
  }
  if (actionId === 'clanIntel') {
    life.resources.clanRerolls += 2;
    life.world.heat = clamp(life.world.heat + 5);
  }
}

export function recover(life, actionId) {
  const action = RECOVERY_ACTIONS[actionId];
  if (!action) return life;
  if (life.resources.money < action.cost) {
    return addLog(life, `You cannot afford ${action.name}. Recovery has a price.`, 'recovery');
  }

  const next = clone(life);
  const hadInjury = next.injuries.length > 0;
  next.resources.money -= action.cost;
  next.resources.health = clampLifeResource(next, 'health', next.resources.health + action.health);
  next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy + action.energy);
  next.resources.mood = clamp(next.resources.mood + action.mood);

  if (action.stat) {
    const beforeGrowth = clone(next);
    const [stat, amount] = action.stat;
    next.stats[stat] = clampStat(next.stats[stat] + amount);
    applyVitalCapGrowth(beforeGrowth, next);
  }

  if (action.injuryHeal > 0 && next.injuries.length > 0) {
    next.injuries = next.injuries.slice(action.injuryHeal);
    if (next.injuries.length === 0) next.medicalSuspensionUntil = 0;
  }

  return queueTriggeredEvents(addLog(next, `${action.name}: ${action.text}`, 'recovery'), 'recovery', { actionId, hadInjury });
}

export function findMentor(life) {
  const next = clone(life);
  const eligible = MENTORS.filter((mentor) => {
    if (mentor.requiresHiddenWorld && !next.world.hiddenWorld) return false;
    if (next.resources.reputation < mentor.minReputation) return false;
    if (next.record.wins < mentor.minWins) return false;
    if (next.resources.money < mentor.fee) return false;
    return true;
  });

  const searchScore = next.resources.reputation +
    next.record.wins * 12 +
    next.resources.mood / 3 +
    Math.floor(next.resources.money / 250);
  const mentor = eligible
    .slice()
    .sort((a, b) => (b.minReputation + b.minWins * 8 + b.fee / 100) - (a.minReputation + a.minWins * 8 + a.fee / 100))[0];

  if (!mentor || searchScore + mentor.successBonus < 45) {
    next.resources.mood = clamp(next.resources.mood - 4);
    return addLog(next, 'Mentor search failed. Nobody serious bites yet; build reputation, win fights, or bring money.', 'mentor');
  }

  next.resources.money -= mentor.fee;
  next.mentor = clone(mentor);
  next.relationships.mentor = clamp(next.relationships.mentor + 15 + mentor.focus.length * 3);
  for (const stat of mentor.focus) {
    next.stats[stat] = clampStat(next.stats[stat] + 3);
  }
  return addLog(next, `Mentor found: ${mentor.name}, ${mentor.title}. ${mentor.lesson}`, 'mentor');
}

function fighterPower(life) {
  const rarity = getRarity(life.clan.rarity);
  return (
    life.stats.strength * 1.05 +
    life.stats.speed +
    life.stats.durability * 0.9 +
    life.stats.technique * 1.15 +
    life.stats.fightIq +
    life.stats.willpower * 0.75 +
    life.stats.reflexes * 0.75 +
    life.stats.flexibility * 0.7 +
    life.stats.aggression * 0.7 +
    life.stats.control * 0.85 +
    life.resources.health * 0.55 +
    life.resources.energy * 0.35 +
    life.resources.reputation * 0.2
  ) * rarity.powerMultiplier;
}

const COMBAT_STATS = ['strength', 'speed', 'durability', 'technique', 'fightIq', 'willpower', 'reflexes', 'flexibility', 'aggression', 'control'];

function scaledStatBlock(base, multipliers) {
  return Object.fromEntries(COMBAT_STATS.map((stat) => [stat, Math.max(1, Math.round(base * (multipliers[stat] ?? 1)))]));
}

export function getOpponentStats(opponent) {
  if (opponent?.stats) return { ...opponent.stats };
  const multipliers = {
    strength: 0.9,
    speed: 0.88,
    durability: 0.9,
    technique: 0.86,
    fightIq: 0.82,
    willpower: 0.86,
    reflexes: 0.82,
    flexibility: 0.76,
    aggression: 0.86,
    control: 0.8,
  };
  const style = `${opponent.style ?? ''} ${opponent.strengths?.join(' ') ?? ''}`.toLowerCase();
  const add = (changes) => {
    for (const [stat, value] of Object.entries(changes)) multipliers[stat] = (multipliers[stat] ?? 1) + value;
  };

  if (style.includes('boxing') || style.includes('brawling')) add({ strength: 0.18, speed: 0.08, aggression: 0.22, technique: 0.06 });
  if (style.includes('wrestling') || style.includes('grappling') || style.includes('judo') || style.includes('sumo')) add({ durability: 0.2, strength: 0.14, technique: 0.12, flexibility: 0.12, control: 0.16 });
  if (style.includes('karate') || style.includes('kickboxing') || style.includes('savate') || style.includes('muay')) add({ technique: 0.2, speed: 0.12, reflexes: 0.12, control: 0.06 });
  if (style.includes('ghost') || style.includes('phantom') || style.includes('assassin') || style.includes('needle')) add({ speed: 0.24, reflexes: 0.24, technique: 0.18, fightIq: 0.12 });
  if (style.includes('redirection') || style.includes('soft lock')) add({ technique: 0.42, fightIq: 0.36, control: 0.28, flexibility: 0.18, aggression: -0.16, strength: -0.08 });
  if (style.includes('demon') || style.includes('release') || style.includes('monster')) add({ strength: 0.28, durability: 0.22, aggression: 0.28, willpower: 0.18, speed: 0.12 });
  if (style.includes('conditioning') || style.includes('iron body')) add({ durability: 0.34, willpower: 0.2, control: 0.12, strength: 0.12 });
  if (style.includes('hybrid') || style.includes('apex')) add({ technique: 0.14, fightIq: 0.14, reflexes: 0.12, speed: 0.1, strength: 0.1 });

  if (opponent.temperament === 'reckless pressure') add({ aggression: 0.3, strength: 0.1, speed: 0.08, control: -0.14, fightIq: -0.04 });
  if (opponent.temperament === 'patient counter-striker') add({ fightIq: 0.28, reflexes: 0.24, technique: 0.16, control: 0.16, aggression: -0.1 });
  if (opponent.temperament === 'defensive grinder') add({ durability: 0.24, willpower: 0.2, control: 0.22, flexibility: 0.08, speed: -0.08 });

  return scaledStatBlock(resolvedOpponentPower(opponent), multipliers);
}

const SYSTEM_MONSTER_POWER_MULTIPLIERS = {
  'Hunter Quest': 1.85,
  E: 2.35,
  D: 2.55,
  C: 2.85,
  B: 3.2,
  A: 3.65,
  S: 4.15,
};

function resolvedOpponentPower(opponent) {
  if (!opponent?.systemMonster) return opponent.power;
  return Math.round(opponent.power * (SYSTEM_MONSTER_POWER_MULTIPLIERS[opponent.tier] ?? 1));
}

function systemMonsterHealthMultiplier(opponent) {
  if (!opponent?.systemMonster) return 1;
  const tierMultiplier = {
    'Hunter Quest': 1.45,
    E: 1.65,
    D: 1.8,
    C: 2.0,
    B: 2.25,
    A: 2.55,
    S: 2.9,
  }[opponent.tier] ?? 1.6;
  const bossMultiplier = opponent.threat?.includes('Boss') ? 1.35 : 1;
  const redMultiplier = opponent.threat?.includes('Red Gate') ? 1.2 : 1;
  return tierMultiplier * bossMultiplier * redMultiplier;
}

function opponentTacticStat(stats, intent) {
  const scores = {
    pressure: stats.strength + stats.aggression * 1.1 + stats.speed * 0.45 + stats.willpower * 0.2,
    counter: stats.reflexes * 1.1 + stats.fightIq * 1.05 + stats.technique * 0.68 + stats.flexibility * 0.2,
    grapple: stats.durability + stats.technique + stats.flexibility * 0.75 + stats.strength * 0.48 + stats.control * 0.28,
    defend: stats.control * 1.25 + stats.willpower * 1.05 + stats.fightIq * 0.55 + stats.durability * 0.25,
    conserve: stats.control * 1.1 + stats.fightIq * 0.48 + stats.flexibility * 0.32 + stats.durability * 0.24,
    special: stats.technique + stats.willpower * 0.65 + stats.aggression * 0.5 + stats.strength * 0.35 + stats.fightIq * 0.25,
  };
  return scores[intent] ?? scores.pressure;
}

function opponentStatPower(opponent) {
  const stats = getOpponentStats(opponent);
  return (
    stats.strength * 1.05 +
    stats.speed +
    stats.durability * 0.95 +
    stats.technique * 1.12 +
    stats.fightIq +
    stats.willpower * 0.8 +
    stats.reflexes * 0.8 +
    stats.flexibility * 0.72 +
    stats.aggression * 0.72 +
    stats.control * 0.88
  );
}

function tacticProfile(tactic, life) {
  const move = resolveFightMove(life, tactic);
  tactic = move.category;
  const special = life.clan.special ?? FIGHT_TACTICS.special;
  const specialFlavor = clanSpecialFlavor(special.name ?? FIGHT_TACTICS.special.label);
  const profiles = {
    pressure: {
      label: FIGHT_TACTICS.pressure.label,
      stat: life.stats.strength + life.stats.aggression * 1.2 + life.stats.speed * 0.55 + life.stats.willpower * 0.18,
      staminaCost: 19,
      damageBias: 1.25,
      guardBias: -4,
      text: [
        'You step in first and force them to defend before their offense develops.',
        'You take the centerline and make every retreat cost stance and stamina.',
        'You keep the tempo high enough that their counters have to start from defense.',
      ],
      finish: [
        'You trap them behind the guard and finish once their base stops supporting defense.',
        'You maintain pressure until the stance breaks and the final shot is uncontested.',
      ],
    },
    counter: {
      label: FIGHT_TACTICS.counter.label,
      stat: life.stats.reflexes * 1.15 + life.stats.fightIq * 1.05 + life.stats.technique * 0.65 + life.stats.flexibility * 0.25,
      staminaCost: 13,
      damageBias: 1,
      guardBias: 2,
      text: [
        'You give ground long enough to identify the entry and punish the recovery.',
        'You let the first beat pass, then answer as their balance shifts forward.',
        'You draw the attack out and meet the second beat with cleaner timing.',
      ],
      finish: [
        'They overstep, and your counter lands before they can rebuild stance.',
        'You read the entry, cut across it, and finish on the recovery window.',
      ],
    },
    grapple: {
      label: grapplingContextLabel(life.activeFight),
      stat: playerGrapplingSkill(life, move.groundRole ?? grapplingRoleContext(life.activeFight)) + life.stats.durability * 0.22,
      staminaCost: 17,
      damageBias: 0.85,
      guardBias: 1,
      text: [
        'You enter the clinch and make balance more important than clean striking.',
        'You tie up the arms and force the exchange into hips, grips, and breathing.',
        'You bring the fight close enough that every step costs posture.',
      ],
      finish: [
        'You fold them through the clinch, and the landing removes the final defense.',
        'You chain grip to trip to pressure until they have no post left.',
      ],
    },
    defend: {
      label: FIGHT_TACTICS.defend.label,
      stat: life.stats.control * 1.25 + life.stats.willpower * 1.05 + life.stats.fightIq * 0.55 + life.stats.durability * 0.2,
      staminaCost: 8,
      damageBias: 0.45,
      guardBias: 8,
      text: [
        'You shell up, breathe, and make them work for every clean inch.',
        'You tighten the guard and make their best shots land on shoulders and forearms.',
        'You stop chasing offense and start collecting defensive reads.',
      ],
      finish: [
        'They empty their combination on the guard, and your short answer finishes it.',
        'You block the last rush, step off, and land on the first clean opening.',
      ],
    },
    conserve: {
      label: FIGHT_TACTICS.conserve.label,
      stat: life.resources.energy + life.stats.control * 1.15 + life.stats.fightIq * 0.45 + life.stats.flexibility * 0.3,
      staminaCost: -10,
      damageBias: 0.3,
      guardBias: 3,
      text: [
        'You slow the exchange and recover a breath without fully giving up position.',
        'You circle out, reset your breathing, and force them to re-enter.',
        'You trade volume for control and buy stamina for later exchanges.',
      ],
      finish: [
        'They overchase the reset, and your short shot lands on the opening.',
        'You conserve long enough for their rushed entry to become predictable.',
      ],
    },
    special: {
      label: special.name ?? FIGHT_TACTICS.special.label,
      stat: getRarity(life.clan.rarity).powerMultiplier * 42 + life.stats.technique + life.stats.willpower * 0.55 + life.stats.aggression * 0.35 + life.stats.control * 0.25,
      staminaCost: 28,
      damageBias: 1.65,
      guardBias: -6,
      text: specialFlavor.text,
      finish: specialFlavor.finish,
      specialFormText: specialFlavor.form,
    },
  };
  const profile = profiles[tactic] ?? profiles.pressure;
  return applyMoveProfile(profile, move, life);
}

function resolveFightMove(life, moveId = 'pressure') {
  if (moveId === 'grapple') {
    const roleContext = grapplingRoleContext(life.activeFight);
    if (roleContext !== 'takedown') {
      const candidates = Object.entries(FIGHT_MOVES)
        .filter(([, move]) => move.category === 'grapple')
        .filter(([id, move]) => move.unlockedByDefault || (life.unlockedSkills ?? []).includes(id))
        .filter(([, move]) => {
          const role = move.groundRole ?? 'takedown';
          if (roleContext === 'escape') return ['reversal', 'getUp'].includes(role);
          if (roleContext === 'dominant') return ['submission', 'groundPound'].includes(role);
          return role === roleContext;
        })
        .sort(([idA, moveA], [idB, moveB]) => {
          const cooldownA = life.activeFight?.moveCooldowns?.[idA] ?? 0;
          const cooldownB = life.activeFight?.moveCooldowns?.[idB] ?? 0;
          return cooldownA - cooldownB || (moveA.groundRole ?? '').localeCompare(moveB.groundRole ?? '') || idA.localeCompare(idB);
        });
      const selected = candidates.find(([id]) => !(life.activeFight?.moveCooldowns?.[id] > 0)) ?? candidates[0];
      if (selected) return { id: selected[0], ...selected[1] };
    }
  }
  const move = FIGHT_MOVES[moveId] ?? FIGHT_MOVES.pressure;
  if (move.unlockedByDefault || (life.unlockedSkills ?? []).includes(moveId)) {
    return { id: moveId, ...move };
  }
  return { id: move.category, ...FIGHT_MOVES[move.category] };
}

export function getUnlockedFightMoves(life, category) {
  if (life.activeFight?.source === 'hunterQuest' || life.activeFight?.source === 'hunterDungeon') return [];
  const roleContext = category === 'grapple' ? grapplingRoleContext(life.activeFight) : null;
  const grappling = normalizeGrapplingState(life.activeFight);
  return Object.entries(FIGHT_MOVES)
    .filter(([, move]) => move.category === category)
    .filter(([, move]) => {
      if (category === 'conserve') {
        const role = move.groundRole ?? null;
        if (grappling.phase === 'ground') return grappling.top === 'opponent' && role === 'bottomConserve';
        return role !== 'bottomConserve';
      }
      if (category !== 'grapple') return true;
      const role = move.groundRole ?? 'takedown';
      if (roleContext === 'escape') return role === 'reversal' || role === 'getUp';
      if (roleContext === 'dominant') return role === 'submission' || role === 'groundPound';
      return role === roleContext;
    })
    .filter(([id, move]) => move.unlockedByDefault || (life.unlockedSkills ?? []).includes(id))
    .map(([id, move]) => ({
      id,
      ...move,
      label: move.useClanSpecialLabel ? (life.clan.special?.name ?? move.label) : move.label,
      hint: move.useClanSpecialLabel ? (life.clan.special?.effect ?? move.hint) : move.hint,
      skillEffect: SPECIAL_SKILLS[id] ?? (move.unlockType === 'basic' ? move.hint : null),
      cooldownRemaining: life.activeFight?.moveCooldowns?.[id] ?? 0,
      disabledReason: fightMoveDisabledReason(life, { id, ...move }),
    }));
}

export function getUnlockedHunterMoves(life) {
  if (life.activeFight?.source !== 'hunterQuest' && life.activeFight?.source !== 'hunterDungeon') return [];
  const hunter = normalizeHunterWorld(life.hunterWorld);
  return Object.entries(HUNTER_MOVES)
    .filter(([, move]) => !move.requiresPerk || hasSystemPerk({ hunterWorld: hunter }, move.requiresPerk))
    .filter(([, move]) => !move.requiresShadowMonarch || hunter.shadowMonarch.unlocked)
    .filter(([id, move]) => !move.requiresWeapon || hunter.equippedWeapon === move.requiresWeapon || hunterHasItem(hunter, move.requiresWeapon))
    .map(([id, move]) => ({
      id,
      ...move,
      ...(hunter.shadowMonarch.unlocked && SHADOW_MONARCH_SKILL_EVOLUTIONS[id]
        ? { ...SHADOW_MONARCH_SKILL_EVOLUTIONS[id], evolved: true, uiTone: 'shadow-monarch' }
        : {}),
      disabledReason: hunterMoveDisabledReason(life, { id, ...move }),
    }));
}

function hunterMoveDisabledReason(life, move) {
  const fight = life.activeFight;
  if (!fight || fight.finished || (fight.source !== 'hunterQuest' && fight.source !== 'hunterDungeon')) return '';
  const hunter = normalizeHunterWorld(life.hunterWorld);
  if (move.requiresPerk && !hasSystemPerk(life, move.requiresPerk)) return 'Requires the matching ultimate System perk.';
  if (move.requiresShadowMonarch && !hunter.shadowMonarch.unlocked) return 'Requires Shadow Monarch transformation.';
  if (move.requiresWeapon && hunter.equippedWeapon !== move.requiresWeapon && !hunterHasItem(hunter, move.requiresWeapon)) return 'Requires the matching System weapon.';
  const cooldown = Math.max(0, Math.floor(fight.moveCooldowns?.[move.id] ?? 0));
  if (move.moveType === 'special' && cooldown > 0) return `${move.label} cooldown: ${cooldown} exchange${cooldown === 1 ? '' : 's'} remaining.`;
  const staminaCost = hunterMoveStaminaCost(life, move);
  const staminaRequired = staminaCost === 0 ? 0 : Math.max(1, staminaCost - 4);
  if (move.id === 'slash' && move.moveType === 'basic') return '';
  if ((fight.meters.playerStamina ?? 0) < staminaRequired) return 'Not enough stamina for this System skill.';
  return '';
}

function hunterMoveStaminaCost(life, move) {
  const discount = move.moveType === 'special' ? systemPerkValue(life, 'specialStaminaMinus2') : 0;
  return Math.max(0, Math.floor((move.staminaCost ?? 0) - discount));
}

function hunterSpecialCooldown(life, move) {
  const reduction = move.id === 'execute' ? systemPerkValue(life, 'executeCooldownMinus1') : 0;
  return Math.max(1, Math.floor((move.cooldown ?? HUNTER_SPECIAL_COOLDOWN) - reduction));
}

function tickHunterMoveCooldowns(fight) {
  const cooldowns = fight.moveCooldowns ?? {};
  const nextCooldowns = {};
  for (const [moveId, value] of Object.entries(cooldowns)) {
    const remaining = Math.max(0, Math.floor(value) - 1);
    if (remaining > 0) nextCooldowns[moveId] = remaining;
  }
  fight.moveCooldowns = nextCooldowns;
}

function fightMoveDisabledReason(life, move) {
  const fight = life.activeFight;
  if (!fight || fight.finished) return '';
  const grappling = normalizeGrapplingState(fight);
  if (grappling.phase === 'ground' && move.category !== 'grapple') {
    if (move.category === 'conserve' && grappling.top === 'opponent' && move.groundRole === 'bottomConserve') {
      // allowed: bottom survival keeps the player alive without reversing or standing up.
    } else {
      return 'Grounded: only grappling options are available.';
    }
  }
  if (move.category === 'conserve' && move.groundRole === 'bottomConserve') {
    if (grappling.phase !== 'ground' || grappling.top !== 'opponent') return 'Bottom position only: use this after you are taken down.';
  } else if (grappling.phase === 'ground' && move.category === 'conserve') {
    return 'Grounded: only grappling options are available.';
  }
  if (move.category === 'grapple') {
    const role = move.groundRole ?? 'takedown';
    if (grappling.phase !== 'ground' && role !== 'takedown') return 'Standing: create a takedown before using ground skills.';
    if (grappling.phase === 'ground' && grappling.top === 'player' && !['submission', 'groundPound'].includes(role)) return 'Top position: choose a submission or ground-and-pound.';
    if (grappling.phase === 'ground' && grappling.top === 'opponent' && !['reversal', 'getUp'].includes(role)) return 'Bottom position: reverse or get up.';
  }
  if (move.category === 'special' && (fight.specialCharges ?? 1) <= 0) {
    return 'No special charges remain this fight.';
  }
  const cooldown = fight.moveCooldowns?.[move.id] ?? 0;
  if (cooldown > 0) {
    const label = move.useClanSpecialLabel ? (life.clan.special?.name ?? move.label) : move.label;
    return `${label} cooldown: cooling down for ${cooldown} exchange${cooldown === 1 ? '' : 's'}.`;
  }
  return '';
}

function applyMoveProfile(profile, move, life) {
  const next = {
    ...profile,
    label: move.useClanSpecialLabel ? (life.clan.special?.name ?? profile.label) : (move.label ?? profile.label),
    moveId: move.id,
    category: move.category,
    groundRole: move.groundRole ?? null,
  };
  if (move.statBonuses) {
    for (const [stat, multiplier] of Object.entries(move.statBonuses)) {
      next.stat += (life.stats[stat] ?? 0) * multiplier;
    }
  }
  if (move.damageBonus) next.damageBias += move.damageBonus;
  if (move.guardBonus) next.guardBias += move.guardBonus;
  if (move.staminaDelta) next.staminaCost += move.staminaDelta;
  if (move.text) next.text = move.text;
  if (move.finish) next.finish = move.finish;
  if (move.specialFormText) next.specialFormText = move.specialFormText;
  if (move.id === 'demonPressure') {
    next.stat += life.stats.strength * 0.35 + life.stats.aggression * 0.35;
    next.damageBias += 0.45;
    next.staminaCost += 9;
    next.text = ['Demon Pressure: with overwhelming and suffocating pressure, you keep moving forward and give your opponent less and less space.'];
    next.finish = ['Demon Pressure finish: you finish your opponent with an onslaught of heavy strikes until they can no longer continue.'];
  }
  if (move.id === 'releaseRush') {
    next.stat += life.stats.speed * 0.45 + life.stats.reflexes * 0.25;
    next.damageBias += 0.32;
    next.staminaCost += 6;
  }
  if (move.id === 'redirectionCounter') {
    next.stat += life.stats.technique * 0.4 + life.stats.fightIq * 0.3;
    next.damageBias += 0.25;
    next.guardBias += 3;
  }
  if (move.id === 'voidStep') {
    next.stat += life.stats.speed * 0.38 + life.stats.reflexes * 0.38;
    next.damageBias += 0.18;
    next.guardBias += 1;
  }
  if (move.id === 'boneBind') {
    next.stat += life.stats.flexibility * 0.45 + life.stats.technique * 0.28;
    next.damageBias += 0.2;
    next.guardBias += 2;
  }
  if (move.id === 'posturedHammerfists') {
    next.stat += life.stats.strength * 0.28 + life.stats.control * 0.22 + life.stats.aggression * 0.2;
    next.damageBias += 0.28;
    next.staminaCost += 3;
  }
  if (move.id === 'crossfaceElbows') {
    next.stat += life.stats.control * 0.34 + life.stats.technique * 0.2;
    next.damageBias += 0.24;
    next.guardBias += 2;
  }
  if (move.id === 'matReturnPunches') {
    next.stat += life.stats.fightIq * 0.22 + life.stats.reflexes * 0.18 + life.stats.control * 0.22;
    next.damageBias += 0.18;
    next.guardBias += 3;
  }
  if (move.id === 'adamantGuard') {
    next.stat += life.stats.durability * 0.45 + life.stats.willpower * 0.22;
    next.damageBias += 0.1;
    next.guardBias += 8;
    next.staminaCost += 2;
  }
  if (move.id === 'apexBreathing') {
    next.stat += life.stats.control * 0.35 + life.stats.willpower * 0.25;
    next.staminaCost -= 8;
    next.guardBias += 4;
  }
  if (move.id === 'closedGuardShell') {
    next.stat += life.stats.control * 0.3 + life.stats.flexibility * 0.18 + life.stats.willpower * 0.18;
    next.damageBias -= 0.1;
    next.staminaCost -= 4;
    next.guardBias += 5;
  }
  if (move.id === 'butterflyFrames') {
    next.stat += life.stats.flexibility * 0.3 + life.stats.technique * 0.2 + life.stats.reflexes * 0.14;
    next.damageBias -= 0.08;
    next.staminaCost -= 3;
    next.guardBias += 4;
  }
  if (move.id === 'lockdownStall') {
    next.stat += life.stats.durability * 0.2 + life.stats.control * 0.3 + life.stats.strength * 0.12;
    next.damageBias -= 0.12;
    next.staminaCost -= 5;
    next.guardBias += 5;
  }
  if (move.id === 'demonBackBurst') {
    next.stat += life.stats.strength * 0.28 + life.stats.willpower * 0.28 + life.stats.aggression * 0.28;
    next.damageBias += 0.55;
    next.staminaCost += 8;
  }
  return next;
}

function opponentIntent(opponent, round) {
  const patterns = {
    'reckless pressure': ['pressure', 'pressure', 'grapple', 'pressure', 'special'],
    'patient counter-striker': ['counter', 'defend', 'counter', 'pressure', 'special'],
    'defensive grinder': ['defend', 'grapple', 'grapple', 'conserve', 'pressure'],
  };
  const list = patterns[opponent.temperament] ?? patterns['reckless pressure'];
  return list[(round - 1) % list.length];
}

function enemyMovePool(opponent, category) {
  const base = {
    pressure: ['wildOverhand', 'bodyRush', 'lowLineKick'],
    counter: ['pullCounterShot', 'checkHookTurn', 'interceptingKnee'],
    grapple: ['collarDrag', 'kneePick', 'wristClamp', 'crossFaceChoke', 'backTakeChoke', 'hipHeist', 'baseBuildStand'],
    defend: ['shellAndShove', 'elbowFrame'],
    conserve: ['breathReset', 'angleExit'],
    special: ['monsterBurst', 'jointBreakerEntry'],
  };
  const pool = [...(base[category] ?? base.pressure)];
  const style = `${opponent.style} ${opponent.temperament}`.toLowerCase();
  if (category === 'pressure' && style.includes('rush')) pool.push('bodyRush');
  if (category === 'counter' && style.includes('counter')) pool.push('pullCounterShot');
  if (category === 'grapple' && (style.includes('grappl') || style.includes('lock') || style.includes('clinch'))) pool.push('kneePick', 'wristClamp');
  if (category === 'defend' && (style.includes('iron') || style.includes('conditioning'))) pool.push('shellAndShove');
  if (category === 'special' && (style.includes('joint') || style.includes('lock'))) pool.push('jointBreakerEntry');
  if (category === 'special' && (style.includes('demon') || style.includes('monster') || style.includes('release'))) pool.push('monsterBurst');
  return pool;
}

function chooseEnemyFightMove(opponent, category, fight) {
  const grappling = normalizeGrapplingState(fight);
  const roleContext = category === 'grapple' && grappling.phase === 'ground'
    ? (grappling.top === 'opponent' ? 'submission' : 'escape')
    : 'takedown';
  const pool = enemyMovePool(opponent, category).filter((id) => {
    const role = ENEMY_FIGHT_MOVES[id]?.groundRole ?? (category === 'grapple' ? 'takedown' : null);
    if (category !== 'grapple') return true;
    if (roleContext === 'escape') return role === 'reversal' || role === 'getUp';
    return role === roleContext;
  });
  const selectedPool = pool.length ? pool : enemyMovePool(opponent, category);
  const roll = deterministicRoll(fight.opponentId, fight.round, fight.exchanges.length, category, opponent.name, 'enemy-move');
  const id = selectedPool[Math.floor(roll * selectedPool.length) % selectedPool.length];
  return { id, ...ENEMY_FIGHT_MOVES[id] };
}

function chooseHunterMonsterMove(opponent, fight) {
  const pool = (opponent.moveIds ?? []).filter((id) => HUNTER_MONSTER_MOVES[id]);
  if (!pool.length) {
    return monsterMove('systemFallbackMove', opponent.style ?? 'Monster Strike', 0, false);
  }
  const roll = deterministicRoll(fight.opponentId, fight.round, fight.exchanges.length, opponent.name, 'system-monster-move');
  const id = pool[Math.floor(roll * pool.length) % pool.length];
  return HUNTER_MONSTER_MOVES[id];
}

function tacticLabel(tactic) {
  return FIGHT_TACTICS[tactic]?.label ?? tactic;
}

function exchangeVariant(list, fight, tactic, opponentTactic) {
  const seed = fight.round + tactic.length + opponentTactic.length + fight.exchanges.length;
  return list[seed % list.length];
}

function fillReactionTemplate(text, opponent) {
  return text.replaceAll('{name}', opponent.name);
}

function moveReactionLine(opponent, moveId, playerTactic, opponentTactic, fight) {
  const list = MOVE_REACTION_FLAVOR[moveId] ?? MOVE_REACTION_FLAVOR[playerTactic] ?? MOVE_REACTION_FLAVOR.pressure;
  return fillReactionTemplate(exchangeVariant(list, fight, moveId, opponentTactic), opponent);
}

function reactionStateLine({ opponent, profile, swing, weakMoveHit, finish }) {
  if (finish) {
    return `Finisher reaction: ${opponent.name} cannot rebuild the stance; ${profile.label} took the last answer away.`;
  }
  if (weakMoveHit) {
    return `Matchup read reaction: ${opponent.name} recognizes the pre-fight read too late.`;
  }
  if (swing >= 18) {
    return `${opponent.name}'s reaction comes a beat late.`;
  }
  if (swing < -12) {
    return `${opponent.name}'s answer lands first this time.`;
  }
  return '';
}

function damageQuality(playerDamage, fight, critical, opponentDodged) {
  if (opponentDodged) return 'missed';
  if (critical) return 'critical';
  const maxHealth = fight.meters?.maxOpponentHealth ?? 100;
  if (playerDamage <= Math.max(4, Math.round(maxHealth * 0.018))) return 'glancing';
  if (playerDamage >= Math.max(12, Math.round(maxHealth * 0.035))) return 'clean';
  return 'normal';
}

function incomingDamageQuality(enemyDamage, fight, enemyCritical, dodged) {
  if (dodged) return 'dodged';
  if (enemyCritical) return 'critical';
  const maxHealth = fight.meters?.maxPlayerHealth ?? 100;
  if (enemyDamage <= Math.max(4, Math.round(maxHealth * 0.018))) return 'glancing';
  if (enemyDamage >= Math.max(12, Math.round(maxHealth * 0.035))) return 'clean';
  return 'normal';
}

function moveGroundRole(move) {
  return move?.groundRole ?? '';
}

function resultReactionLine({ opponent, profile, quality, playerDamage }) {
  const groundRole = moveGroundRole(profile);
  if (quality === 'critical') {
    if (groundRole === 'submission') {
      return `Critical submission reaction: ${opponent.name} defends late as ${profile.label} bites into the finishing line.`;
    }
    if (groundRole === 'takedown') {
      return `Critical takedown reaction: ${opponent.name}'s base collapses under ${profile.label}, forcing them to fight from the floor.`;
    }
    if (groundRole === 'reversal') {
      return `Critical reversal reaction: ${opponent.name} loses the hip line as ${profile.label} turns the position against them.`;
    }
    if (groundRole === 'getUp') {
      return `Critical escape reaction: ${opponent.name} loses contact as ${profile.label} creates a clean reset lane.`;
    }
    if (groundRole === 'groundPound') {
      return `Critical ground-and-pound reaction: ${opponent.name} shells late as ${profile.label} breaks through top defense.`;
    }
    if (groundRole === 'bottomConserve') {
      return `Critical bottom survival reaction: ${opponent.name}'s top pressure stalls as ${profile.label} kills the clean damage.`;
    }
    return `Critical reaction: ${opponent.name} reacts like the move hit the exact break in their structure; ${profile.label} clearly hurt them more than a normal clean touch.`;
  }
  if (quality === 'clean') {
    if (groundRole === 'submission') {
      return `Clean submission reaction: ${opponent.name} has to hand fight immediately after ${profile.label} starts closing.`;
    }
    if (groundRole === 'takedown') {
      return `Clean takedown reaction: ${opponent.name} is forced to post and rebuild base after ${profile.label}.`;
    }
    if (groundRole === 'reversal') {
      return `Clean reversal reaction: ${opponent.name} has to square their hips before ${profile.label} turns into control.`;
    }
    if (groundRole === 'getUp') {
      return `Clean escape reaction: ${opponent.name} has to chase after ${profile.label} opens space.`;
    }
    if (groundRole === 'groundPound') {
      return `Clean ground-and-pound reaction: ${opponent.name} gives up position first, then damage as ${profile.label} lands from top.`;
    }
    if (groundRole === 'bottomConserve') {
      return `Clean bottom survival reaction: ${opponent.name} keeps top position, but ${profile.label} makes the damage arrive late.`;
    }
    return `Clean reaction: ${opponent.name} has to reset their feet after ${profile.label}, because the damage landed well enough to interrupt their next layer.`;
  }
  if (quality === 'glancing') {
    if (groundRole === 'submission') {
      return `Glancing submission reaction: ${opponent.name} keeps ${profile.label} from locking clean, giving up only ${playerDamage} before defending the grip.`;
    }
    if (groundRole === 'takedown') {
      return `Glancing takedown reaction: ${opponent.name} gives up a stumble to ${profile.label}, but their hips stay mostly underneath them.`;
    }
    if (groundRole === 'reversal') {
      return `Glancing reversal reaction: ${opponent.name} feels the scramble start, but ${profile.label} only shifts the angle a little.`;
    }
    if (groundRole === 'getUp') {
      return `Glancing escape reaction: ${opponent.name} follows enough contact that ${profile.label} only buys a small reset.`;
    }
    if (groundRole === 'groundPound') {
      return `Glancing ground-and-pound reaction: ${opponent.name} catches most of ${profile.label} on the shell, but still loses comfort from bottom.`;
    }
    if (groundRole === 'bottomConserve') {
      return `Glancing bottom survival reaction: ${opponent.name} keeps pressure, but ${profile.label} prevents it from becoming clean damage.`;
    }
    return `Glancing reaction: ${opponent.name} absorbs ${profile.label} without much visible damage, giving up only ${playerDamage} before their stance settles again.`;
  }
  if (quality === 'missed') {
    if (groundRole === 'submission') {
      return `Missed submission reaction: ${opponent.name} clears the grip before ${profile.label} can become a real threat.`;
    }
    if (groundRole === 'takedown') {
      return `Stuffed takedown reaction: ${opponent.name} denies the angle and makes ${profile.label} slide off their base.`;
    }
    if (groundRole === 'reversal') {
      return `Denied reversal reaction: ${opponent.name} follows the hips and stops ${profile.label} before it flips the position.`;
    }
    if (groundRole === 'getUp') {
      return `Denied escape reaction: ${opponent.name} keeps pressure attached and stops ${profile.label} from resetting the fight.`;
    }
    if (groundRole === 'groundPound') {
      return `Smothered ground-and-pound reaction: ${opponent.name} ties up ${profile.label} before the strikes can stack.`;
    }
    if (groundRole === 'bottomConserve') {
      return `Cracked bottom survival reaction: ${opponent.name} pressures through ${profile.label} and keeps damage available.`;
    }
    return `Miss reaction: ${opponent.name} makes ${profile.label} skim past the real target and leaves almost nothing to score.`;
  }
  return '';
}

function playerIncomingReactionLine({ opponent, opponentLabel, opponentTactic, enemyDamage, fight, enemyCritical, dodged, enemyMove = null }) {
  const groundRole = enemyMove?.groundRole ?? '';
  const quality = incomingDamageQuality(enemyDamage, fight, enemyCritical, dodged);
  if (quality === 'dodged') {
    if (groundRole === 'submission') return `Your reaction: you peel the choking line early and deny ${opponent.name}'s ${opponentLabel} before it closes.`;
    if (groundRole === 'reversal') return `Your reaction: you follow the hips and stop ${opponent.name}'s ${opponentLabel} from flipping the position.`;
    if (groundRole === 'getUp') return `Your reaction: you keep enough control to stop ${opponent.name}'s ${opponentLabel} from clearing the mat.`;
    return `Your reaction: you read ${opponent.name}'s ${opponentLabel} early and leave it cutting through air instead of your guard.`;
  }
  if (quality === 'critical') {
    if (groundRole === 'submission') return `Your reaction: ${opponent.name}'s ${opponentLabel} catches your neck or shoulder line clean, forcing an urgent defensive hand fight.`;
    return `Your reaction: ${opponent.name}'s ${opponentLabel} lands on a bad beat, forcing you to brace before the next exchange can even start.`;
  }
  if (quality === 'clean') {
    if (groundRole === 'submission') return `Your reaction: the ${opponentLabel} tightens enough that you have to defend the submission before thinking about offense.`;
    if (groundRole === 'reversal') return `Your reaction: the ${opponentLabel} shifts your base and makes top control unstable.`;
    if (groundRole === 'getUp') return `Your reaction: the ${opponentLabel} creates enough space that you have to chase the position.`;
    return `Your reaction: the ${opponentLabel} lands clean enough that you have to reset your stance and rebuild your guard.`;
  }
  if (quality === 'glancing') {
    if (groundRole === 'submission') return `Your reaction: you keep the ${opponentLabel} from fully locking, but it still forces a defensive pause.`;
    if (groundRole === 'reversal' || groundRole === 'getUp') return `Your reaction: you feel ${opponent.name}'s ${opponentLabel} start the scramble, but you keep enough contact to stay involved.`;
    return `Your reaction: you ride most of the ${opponentLabel} off line, taking ${enemyDamage} damage without letting it break your posture.`;
  }
  const tactical = {
    pressure: `Your reaction: you shell through the pressure and keep your feet under you.`,
    counter: `Your reaction: you catch the counter late but keep enough balance to answer back.`,
    grapple: `Your reaction: you fight the grips before they settle and refuse to give up posture for free.`,
    defend: `Your reaction: you recognize the shove and use the pause to rebuild your stance.`,
    conserve: `Your reaction: you track the reset without overreaching, keeping the exchange honest.`,
    special: `Your reaction: you feel the special entry change the rhythm and brace before it can snowball.`,
  };
  return tactical[opponentTactic] ?? `Your reaction: you absorb the shot and stay present in the pocket.`;
}

function enemyActionLine({ opponent, enemyMove, opponentLabel, dodged }) {
  const groundRole = enemyMove?.groundRole ?? '';
  const enemyMoveLine = enemyMove?.text ? ` ${enemyMove.text}` : '';
  if (groundRole === 'submission') {
    return `Enemy submission threat: ${opponent.name} attacks with ${opponentLabel}.${enemyMoveLine}`;
  }
  if (groundRole === 'reversal') {
    return `Enemy reversal: ${opponent.name} tries ${opponentLabel} to flip the position.${enemyMoveLine}`;
  }
  if (groundRole === 'getUp') {
    return `Enemy escape: ${opponent.name} uses ${opponentLabel} to get back to space.${enemyMoveLine}`;
  }
  if (groundRole === 'takedown') {
    return `Enemy takedown attempt: ${opponent.name} enters with ${opponentLabel}.${enemyMoveLine}`;
  }
  return dodged
    ? `Enemy attack: ${opponent.name} answers with ${opponentLabel}, but your footwork makes the attack cut through empty space.${enemyMoveLine}`
    : `Enemy attack: ${opponent.name} answers with ${opponentLabel}.${enemyMoveLine}`;
}

function dodgeNarration({ opponent, enemyMove, dodged, dodgeChance }) {
  if (!dodged) {
    return dodgeChance >= 0.2
      ? ` Dodge: you nearly slip out, but ${opponent.name} still catches a piece.`
      : '';
  }
  const groundRole = enemyMove?.groundRole ?? '';
  if (groundRole === 'submission') return ` Submission defense: you clear the lock before it becomes a finish.`;
  if (groundRole === 'reversal') return ` Position defense: you follow the scramble and deny the reversal.`;
  if (groundRole === 'getUp') return ` Mat return: you keep contact and stop the escape before range resets.`;
  if (groundRole === 'takedown') return ` Sprawl: you beat the entry and keep your base under you.`;
  if (groundRole === 'groundPound') return ` Ground defense: you tie up the posture before the shots can stack.`;
  return ` Dodge: your speed wins the exit angle, avoiding the return damage.`;
}

function opponentDodgeNarration({ opponent, profile, opponentDodged, opponentDodgeChance }) {
  const groundRole = moveGroundRole(profile);
  if (opponentDodged) {
    if (groundRole === 'submission') return ` Submission defense: ${opponent.name} clears the lock before ${profile.label} can settle.`;
    if (groundRole === 'takedown') return ` Takedown defense: ${opponent.name} sprawls, turns the hips, and denies ${profile.label}.`;
    if (groundRole === 'reversal') return ` Top control: ${opponent.name} follows the hip switch and denies ${profile.label}.`;
    if (groundRole === 'getUp') return ` Mat return: ${opponent.name} keeps contact and denies ${profile.label}.`;
    if (groundRole === 'groundPound') return ` Bottom defense: ${opponent.name} ties up posture and smothers ${profile.label}.`;
    if (groundRole === 'bottomConserve') return ` Top pressure: ${opponent.name} breaks through ${profile.label} before you can stall.`;
    return ` Enemy dodge: ${opponent.name} reads the line and makes your attack miss clean.`;
  }
  if (opponentDodgeChance < 0.25) return '';
  if (groundRole === 'submission') return ` Submission defense: ${opponent.name} nearly peels free, but ${profile.label} still forces damage.`;
  if (groundRole === 'takedown') return ` Takedown defense: ${opponent.name} nearly stuffs ${profile.label}, but you still force the scramble.`;
  if (groundRole === 'reversal') return ` Top control: ${opponent.name} almost kills ${profile.label}, but the position still moves.`;
  if (groundRole === 'getUp') return ` Mat return: ${opponent.name} nearly keeps you down, but ${profile.label} still opens space.`;
  if (groundRole === 'groundPound') return ` Bottom defense: ${opponent.name} almost smothers ${profile.label}, but damage still leaks through.`;
  if (groundRole === 'bottomConserve') return ` Top pressure: ${opponent.name} almost punches through ${profile.label}, but you still blunt the worst of it.`;
  return ` Enemy dodge: ${opponent.name} almost slips it, but you still touch them.`;
}

function playerCriticalNarration({ profile, critical }) {
  if (!critical) return '';
  const groundRole = moveGroundRole(profile);
  if (groundRole === 'submission') return ` Critical submission: ${profile.label} was extremely effective against the opponent.`;
  if (groundRole === 'takedown') return ` Critical takedown: ${profile.label} caught the base clean and made the ground transition worse for the opponent.`;
  if (groundRole === 'reversal') return ` Critical reversal: ${profile.label} won the hip line and flipped the exchange with authority.`;
  if (groundRole === 'getUp') return ` Critical escape: ${profile.label} cleared the control cleanly and reset the danger.`;
  if (groundRole === 'groundPound') return ` Critical ground-and-pound: ${profile.label} was extremely effective against the opponent.`;
  if (groundRole === 'bottomConserve') return ` Critical bottom survival: ${profile.label} killed the clean damage and gave you room to breathe.`;
  return ` Critical strike: the move was extremely effective against the opponent.`;
}

function enemyCriticalNarration({ opponent, enemyMove, opponentLabel, enemyCritical }) {
  if (!enemyCritical) return '';
  const groundRole = moveGroundRole(enemyMove);
  if (groundRole === 'submission') return ` Opponent submission critical: ${opponent.name}'s ${opponentLabel} catches the neck or joint line clean.`;
  if (groundRole === 'takedown') return ` Opponent takedown critical: ${opponent.name}'s ${opponentLabel} catches your base before you can square up.`;
  if (groundRole === 'reversal') return ` Opponent reversal critical: ${opponent.name}'s ${opponentLabel} wins the hip line and turns the position hard.`;
  if (groundRole === 'getUp') return ` Opponent escape critical: ${opponent.name}'s ${opponentLabel} clears your control before you can reattach.`;
  return ` Opponent critical: ${opponent.name} times your entry and lands on the exposed beat.`;
}

function opponentReaction(opponent, playerTactic, opponentTactic, swing, fight, profile, weakMoveHit, finish, playerDamage = 0, critical = false, opponentDodged = false) {
  const exactMoveLine = moveReactionLine(opponent, profile.moveId ?? playerTactic, playerTactic, opponentTactic, fight);
  const stateLine = reactionStateLine({ opponent, profile, swing, weakMoveHit, finish });
  const quality = damageQuality(playerDamage, fight, critical, opponentDodged);
  const resultLine = finish ? '' : resultReactionLine({ opponent, profile, quality, playerDamage });
  const specialReactions = SPECIAL_FIGHT_REACTIONS[opponent.name];
  if (specialReactions) {
    const specialBase = exchangeVariant(specialReactions, fight, playerTactic, opponentTactic);
    const swingLine = swing >= 18
      ? 'For once, the monster has to respect the exchange.'
      : swing < -12
        ? 'The special encounter answers first, and the room feels colder.'
        : '';
    return [exactMoveLine, specialBase, resultLine, stateLine || swingLine].filter(Boolean).join(' ');
  }

  const reactions = {
    'reckless pressure': {
      pressure: [
        `${opponent.name} grins into the collision and tries to turn it into a brawl.`,
        `${opponent.name} bites down, steps forward anyway, and throws back from bad balance.`,
      ],
      counter: [
        `${opponent.name} hates the empty space and rushes harder, giving you more to read.`,
        `${opponent.name} overcommits trying to punish your retreat, shoulders loading too early.`,
      ],
      grapple: [
        `${opponent.name} tries to rip free with raw panic strength instead of clean frames.`,
        `${opponent.name} headbutts for posture and burns gas fighting every grip.`,
      ],
      defend: [
        `${opponent.name} takes your shell as permission and starts swinging wider.`,
        `${opponent.name} pounds at your guard, too excited to notice the openings forming.`,
      ],
      conserve: [
        `${opponent.name} chases your reset, angry that the fight is slowing down.`,
        `${opponent.name} starts hunting the corner, trying to make your breath expensive.`,
      ],
      special: [
        `${opponent.name} flinches at the burst, then answers with stubborn violence.`,
        `${opponent.name} sees the danger late and tries to smother it with chaos.`,
      ],
    },
    'patient counter-striker': {
      pressure: [
        `${opponent.name} gives half a step, measuring your rush for the counter lane.`,
        `${opponent.name} stays calm under pressure and keeps looking for the shot between beats.`,
      ],
      counter: [
        `${opponent.name} recognizes the trap and turns the exchange into a quiet staring match.`,
        `${opponent.name} refuses the obvious entry, forcing both of you to win with timing.`,
      ],
      grapple: [
        `${opponent.name} frames at your collarbone and tries to peel away before the clinch settles.`,
        `${opponent.name} circles the trapped side, looking for one clean exit instead of wrestling pride.`,
      ],
      defend: [
        `${opponent.name} feints at the guard, testing which block arrives first.`,
        `${opponent.name} slows down, touching the guard to map your habits.`,
      ],
      conserve: [
        `${opponent.name} lets you breathe, but uses the pause to aim at your next step.`,
        `${opponent.name} mirrors the reset and steals information while nothing loud happens.`,
      ],
      special: [
        `${opponent.name} sees the shape of the burst and tries to counter the recovery.`,
        `${opponent.name} narrows their stance, waiting for the special to leave a bill behind.`,
      ],
    },
    'defensive grinder': {
      pressure: [
        `${opponent.name} absorbs the rush behind tight elbows and makes you pay in stamina.`,
        `${opponent.name} lets the impact land on thick guard, then starts leaning their weight into you.`,
      ],
      counter: [
        `${opponent.name} keeps the entry short, trying not to give your counter room to breathe.`,
        `${opponent.name} hides behind small movements and forces your timing to work for every inch.`,
      ],
      grapple: [
        `${opponent.name} accepts the clinch and immediately starts fighting for inside position.`,
        `${opponent.name} digs underhooks, turning your grip battle into a slow strength test.`,
      ],
      defend: [
        `${opponent.name} settles into the same patience, making the round feel heavy and crowded.`,
        `${opponent.name} keeps touching your guard, not to hurt you yet, but to wear it down.`,
      ],
      conserve: [
        `${opponent.name} walks you down slowly, cutting off easy exits without rushing.`,
        `${opponent.name} uses your reset to reclaim center and make the next escape harder.`,
      ],
      special: [
        `${opponent.name} braces for the burst, trying to smother the peak before it opens fully.`,
        `${opponent.name} shells up and trusts their base to survive the ugly part.`,
      ],
    },
  };
  const temperament = reactions[opponent.temperament] ?? reactions['reckless pressure'];
  const list = temperament[playerTactic] ?? temperament.pressure;
  const base = exchangeVariant(list, fight, playerTactic, opponentTactic);
  return [exactMoveLine, base, resultLine, stateLine].filter(Boolean).join(' ');
}

function opponentScore(opponent, intent, round) {
  const stats = getOpponentStats(opponent);
  const intentBonus = {
    pressure: 25,
    counter: 22,
    grapple: 24,
    defend: 16,
    conserve: 10,
    special: 34,
  }[intent] ?? 20;
  return opponentTacticStat(stats, intent) * 0.82 + intentBonus + round * 5;
}

function incomingDamage(life, opponent, opponentTactic, profile, fight, swing) {
  const stats = getOpponentStats(opponent);
  const intentDamage = {
    pressure: 1.2,
    counter: 0.95,
    grapple: 1.05,
    defend: 0.62,
    conserve: 0.45,
    special: 1.45,
  }[opponentTactic] ?? 1;
  const attackStat = opponentTacticStat(stats, opponentTactic);
  const rawThreat = (9 + attackStat / 55 + resolvedOpponentPower(opponent) / 80 + visibleFightRound(fight) * 1.1) * intentDamage;
  const bodyDefense =
    life.stats.durability * 0.024 +
    life.stats.willpower * 0.024 +
    life.stats.control * 0.035 +
    life.stats.flexibility * 0.012 +
    life.stats.reflexes * 0.01 +
    fight.meters.guard * 0.04 +
    fight.meters.playerStamina * 0.018;
  const cleanReadReduction = swing > 0 ? Math.min(5, swing / 85) : 0;
  const badReadPenalty = swing < 0 ? Math.min(22, Math.abs(swing) / 13) : 0;
  const activeGuardReduction = profile.guardBias > 0 ? 0.78 : 1;
  const damage = (rawThreat + badReadPenalty - bodyDefense - cleanReadReduction) * activeGuardReduction;
  return Math.max(1, Math.round(damage));
}

function activeInjuryEffects(life, tactic) {
  const effect = {
    scorePenalty: 0,
    damageMultiplier: 1,
    incomingMultiplier: 1,
    incomingFlat: 0,
    dodgePenalty: 0,
    injuryRiskBonus: 0,
    names: [],
  };
  const scaleFor = (name) => INJURY_TIERS[injuryTier(injuryRecord(life, name))]?.effectScale ?? 1;
  const scaledMultiplier = (base, scale) => clampFloat(1 - ((1 - base) * scale), 0.35, 1);

  if (hasInjury(life, 'twisted knee')) {
    const scale = scaleFor('twisted knee');
    effect.names.push('twisted knee');
    effect.scorePenalty += Math.round((['pressure', 'counter', 'conserve', 'grapple'].includes(tactic) ? 18 : 8) * scale);
    effect.damageMultiplier *= scaledMultiplier(['pressure', 'counter', 'grapple'].includes(tactic) ? 0.78 : 0.9, scale);
    effect.incomingMultiplier += 0.12 * scale;
    effect.incomingFlat += Math.round(2 * scale);
    effect.dodgePenalty += 0.08 * scale;
    effect.injuryRiskBonus += Math.round(5 * scale);
  }
  if (hasInjury(life, 'rattled skull')) {
    const scale = scaleFor('rattled skull');
    effect.names.push('rattled skull');
    effect.scorePenalty += Math.round((['counter', 'defend', 'special'].includes(tactic) ? 20 : 10) * scale);
    effect.damageMultiplier *= scaledMultiplier(['counter', 'special'].includes(tactic) ? 0.82 : 0.92, scale);
    effect.incomingMultiplier += 0.1 * scale;
    effect.incomingFlat += Math.round(2 * scale);
    effect.dodgePenalty += 0.04 * scale;
    effect.injuryRiskBonus += Math.round(4 * scale);
  }
  if (hasInjury(life, 'cracked ribs') || hasInjury(life, 'body trauma')) {
    const name = hasInjury(life, 'cracked ribs') ? 'cracked ribs' : 'body trauma';
    const scale = scaleFor(name);
    effect.names.push(name);
    effect.scorePenalty += Math.round((['pressure', 'grapple', 'special'].includes(tactic) ? 16 : 8) * scale);
    effect.damageMultiplier *= scaledMultiplier(['pressure', 'grapple', 'special'].includes(tactic) ? 0.84 : 0.94, scale);
    effect.incomingMultiplier += 0.16 * scale;
    effect.incomingFlat += Math.round(3 * scale);
    effect.injuryRiskBonus += Math.round(6 * scale);
  }
  if (hasInjury(life, 'sprained wrist')) {
    const scale = scaleFor('sprained wrist');
    effect.names.push('sprained wrist');
    effect.scorePenalty += Math.round((['pressure', 'counter', 'defend'].includes(tactic) ? 14 : 6) * scale);
    effect.damageMultiplier *= scaledMultiplier(['pressure', 'counter'].includes(tactic) ? 0.86 : 0.95, scale);
    effect.incomingMultiplier += 0.06 * scale;
    effect.incomingFlat += Math.round(1 * scale);
    effect.injuryRiskBonus += Math.round(3 * scale);
  }

  return effect;
}

function combatInjuryForExchange(life, opponentTactic, enemyDamage, fight, enemyMove = null) {
  if (enemyDamage <= 0 || fight.meters.injuryRisk < 15) return null;
  const heavyDamage = enemyDamage >= 14 || fight.meters.playerHealth <= (fight.meters.maxPlayerHealth ?? 100) * 0.45;
  const roll = deterministicRoll(life.rngSeed, fight.opponentId, fight.round, opponentTactic, enemyDamage, 'combat-injury');
  if (!heavyDamage && roll > fight.meters.injuryRisk / 120) return null;
  const tier = injurySeverityTier(enemyDamage, fight);
  if (enemyMove?.injury) return withInjuryTier(enemyMove.injury, tier);
  const byTactic = {
    pressure: {
      name: 'cracked ribs',
      text: 'the pressure lands heavy to the body, making every breath sharper.',
    },
    counter: {
      name: 'rattled skull',
      text: 'the counter snaps your head off line and leaves your reads cloudy.',
    },
    grapple: {
      name: 'twisted knee',
      text: 'the scramble catches your leg under the turn and your knee twists badly.',
    },
    defend: {
      name: 'sprained wrist',
      text: 'your hand jams against the guard battle and the wrist starts losing strength.',
    },
    conserve: {
      name: 'twisted knee',
      text: 'you retreat on a bad step and the leg does not come back clean.',
    },
    special: {
      name: 'rattled skull',
      text: 'the special exchange lands hard enough that your balance and vision lag behind.',
    },
  };
  return withInjuryTier(byTactic[opponentTactic] ?? byTactic.pressure, tier);
}

function deterministicRoll(...parts) {
  const text = parts.join('|');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 1000;
  }
  return hash / 1000;
}

function dodgeResult(life, opponent, tactic, opponentTactic, fight, swing, injuryEffects = null) {
  if (opponentTactic === 'defend' || opponentTactic === 'conserve') {
    return { dodged: false, chance: 0 };
  }
  const stats = getOpponentStats(opponent);
  const tacticBonus = {
    pressure: 0.02,
    counter: 0.08,
    grapple: -0.04,
    defend: 0.03,
    conserve: 0.02,
    special: -0.02,
  }[tactic] ?? 0;
  const enemyThreat = (stats.speed * 0.00048 + stats.reflexes * 0.00034 + stats.fightIq * 0.00014) + (opponentTactic === 'special' ? 0.08 : 0) + (opponentTactic === 'grapple' ? 0.03 : 0);
  const mobility =
    life.stats.speed * 0.0018 +
    life.stats.reflexes * 0.0011 +
    life.stats.flexibility * 0.0008 +
    fight.meters.playerStamina * 0.00035 +
    Math.max(0, swing) * 0.0002;
  const uncappedChance = mobility + tacticBonus - enemyThreat - (injuryEffects?.dodgePenalty ?? 0);
  const lowSpeedCap = life.stats.speed < 25 ? 0 : 0.72;
  const chance = clampFloat(uncappedChance, 0, lowSpeedCap);
  const roll = deterministicRoll(life.rngSeed, fight.opponentId, fight.round, tactic, opponentTactic, fight.exchanges.length);
  return { dodged: roll < chance, chance };
}

function opponentDodgeResult(life, opponent, tactic, opponentTactic, fight, swing) {
  if (tactic === 'defend' || tactic === 'conserve') {
    return { dodged: false, chance: 0 };
  }
  const stats = getOpponentStats(opponent);
  const tacticBonus = {
    pressure: 0.09,
    counter: -0.03,
    grapple: 0.02,
    defend: 0,
    conserve: 0,
    special: 0.04,
  }[tactic] ?? 0;
  const enemyMobility =
    stats.speed * 0.00062 +
    stats.reflexes * 0.00052 +
    stats.flexibility * 0.00025 +
    fight.meters.opponentStamina * 0.00025 +
    Math.max(0, -swing) * 0.00012;
  const playerTracking =
    life.stats.speed * 0.0008 +
    life.stats.reflexes * 0.00065 +
    life.stats.fightIq * 0.00045 +
    life.stats.technique * 0.0004 +
    Math.max(0, swing) * 0.00018;
  const chance = clampFloat(enemyMobility + tacticBonus - playerTracking, 0, 0.52);
  const roll = deterministicRoll(life.rngSeed, fight.opponentId, fight.round, tactic, opponentTactic, fight.exchanges.length, 'opponent-dodge');
  return { dodged: roll < chance, chance };
}

function clanSpecialBoosts(life, tactic) {
  if (tactic !== 'special') return null;
  const specialName = life.clan.special?.name;
  const awakening = normalizeClanAwakening(life);
  if (specialName === 'Devil Gene Awakening') {
    const stage = awakening?.stage ?? 0;
    if (stage >= 3) {
      return {
        label: 'Devil Form',
        strength: Math.max(life.stats.strength ?? 0, STAT_CAP + 230),
        willpower: Math.max(life.stats.willpower ?? 0, STAT_CAP + 205),
        aggression: Math.max(life.stats.aggression ?? 0, STAT_CAP + 210),
        reflexes: Math.max(life.stats.reflexes ?? 0, STAT_CAP + 170),
        speed: Math.max(life.stats.speed ?? 0, STAT_CAP + 135),
      };
    }
    if (stage >= 2) {
      return {
        label: 'Stage 2 Devil Gene',
        strength: Math.max(life.stats.strength ?? 0, STAT_CAP + 150),
        willpower: Math.max(life.stats.willpower ?? 0, STAT_CAP + 135),
        aggression: Math.max(life.stats.aggression ?? 0, STAT_CAP + 145),
        reflexes: Math.max(life.stats.reflexes ?? 0, STAT_CAP + 95),
      };
    }
    return {
      label: 'Devil Gene Awakening',
      strength: Math.max(life.stats.strength ?? 0, STAT_CAP + 95),
      willpower: Math.max(life.stats.willpower ?? 0, STAT_CAP + 85),
      aggression: Math.max(life.stats.aggression ?? 0, STAT_CAP + 85),
      reflexes: Math.max(life.stats.reflexes ?? 0, STAT_CAP + 55),
    };
  }
  const boosts = {
    'Overtime Crush': { label: 'Overtime Crush', durability: 80, strength: 35, willpower: 25 },
    'Open Road Feint': { label: 'Open Road Feint', speed: 65, control: 45, reflexes: 25 },
    'Iron Bell Rush': { label: 'Iron Bell Rush', durability: 120, strength: 35, willpower: 30 },
    'Serpent Angle': { label: 'Serpent Angle', speed: 75, aggression: 45, reflexes: 35 },
    'Redirection Burst': { label: 'Redirection Burst', technique: 95, fightIq: 70, control: 40 },
    'Release Limiter': { label: 'Release Limiter', strength: 110, speed: 95, aggression: 85, reflexes: 55 },
    'Blind-Side Entry': { label: 'Blind-Side Entry', speed: 90, reflexes: 75, technique: 35 },
    'Demon Frame': { label: 'Demon Frame', strength: 130, aggression: 110, durability: 70 },
    'Joint Ghost Chain': { label: 'Joint Ghost Chain', technique: 90, flexibility: 95, fightIq: 45 },
    'Adaptive Apex': { label: 'Adaptive Apex', strength: 55, speed: 55, technique: 55, fightIq: 55 },
    'Demon Back': { label: 'Demon Back', strength: 160, aggression: 95, willpower: 75 },
    'Ancient Monster State': { label: 'Ancient Monster State', strength: 150, speed: 120, durability: 150, reflexes: 80 },
    'Ashura State': { label: 'Ashura State', strength: 190, speed: 170, durability: 130, technique: 190, fightIq: 175, reflexes: 150, willpower: 110 },
  }[specialName];
  if (!boosts) return null;
  return Object.fromEntries(Object.entries(boosts).map(([stat, value]) => {
    if (stat === 'label') return [stat, value];
    return [stat, Math.max(life.stats[stat] ?? 0, STAT_CAP + value)];
  }));
}

function clanSpecialModifier(life, tactic, fight) {
  if (tactic !== 'special') return { scoreBonus: 0, damageBonus: 0, incomingReduction: 0, specialBoosts: null };
  const specialName = life.clan.special?.name;
  const modifier = { scoreBonus: 0, damageBonus: 0, incomingReduction: 0, specialBoosts: clanSpecialBoosts(life, tactic) };
  if (modifier.specialBoosts) {
    const boostedStats = Object.entries(modifier.specialBoosts)
      .filter(([stat]) => stat !== 'label')
      .map(([, value]) => value);
    modifier.scoreBonus += Math.min(46, Math.round(boostedStats.reduce((sum, value) => sum + value, 0) / 70));
    modifier.damageBonus += Math.min(16, Math.round(boostedStats.length * 2.5));
    modifier.incomingReduction += Math.min(8, Math.round(boostedStats.length * 1.2));
  }
  if (specialName === 'Demon Back') {
    modifier.scoreBonus = 34;
    modifier.damageBonus = fight.meters.opponentHealth <= 60 ? 18 : 10;
    modifier.incomingReduction = 3;
  }
  if (specialName === 'Release Limiter' && fight.meters.playerStamina >= 35) {
    modifier.scoreBonus += 18;
    modifier.damageBonus += 10;
  }
  if (specialName === 'Demon Frame' && fight.meters.momentum >= 0) {
    modifier.scoreBonus += 20;
    modifier.damageBonus += 12;
  }
  if (specialName === 'Redirection Burst') {
    modifier.scoreBonus += 18;
    modifier.incomingReduction += 5;
  }
  if (specialName === 'Ashura State') {
    modifier.scoreBonus += 28;
    modifier.damageBonus += 16;
    modifier.incomingReduction += 6;
  }
  if (specialName === 'Devil Gene Awakening') {
    const awakening = normalizeClanAwakening(life);
    const stage = awakening?.stage ?? 0;
    modifier.scoreBonus += 18 + stage * 7;
    modifier.damageBonus += 9 + stage * 5;
    modifier.incomingReduction += stage >= 2 ? 4 : 1;
  }
  return modifier;
}

function clanCombatModifier(life, tactic, opponentTactic, fight) {
  const passive = life.clan.passive?.name;
  const modifier = {
    scoreBonus: 0,
    damageBonus: 0,
    incomingReduction: 0,
    opponentStaminaDamage: 0,
    staminaCostDelta: 0,
    text: '',
  };

  if (passive === 'Shift-Hardened' && fight.meters.playerHealth <= 60) {
    modifier.incomingReduction = 2;
  }
  if (passive === 'Self-Made Angles' && ['counter', 'conserve'].includes(tactic) && fight.meters.playerStamina >= 55) {
    modifier.scoreBonus = 10;
  }
  if (passive === 'Iron Body') {
    modifier.incomingReduction = 3;
  }
  if (passive === 'Dirty Angles' && ['pressure', 'counter'].includes(tactic) && fight.meters.guard <= 45) {
    modifier.damageBonus = 4;
  }
  if (passive === 'Redirection Engine' && ['counter', 'defend'].includes(tactic)) {
    modifier.scoreBonus = 8;
    modifier.incomingReduction = 4;
  }
  if (passive === 'Redirection Engine' && tactic === 'special') {
    modifier.scoreBonus = 12;
  }
  if (passive === 'Release Burst' && ['pressure', 'special'].includes(tactic) && fight.meters.playerStamina >= 45) {
    modifier.damageBonus = 6;
    modifier.staminaCostDelta = 4;
  }
  if (passive === 'Silent Entry' && fight.round === 1 && ['counter', 'pressure'].includes(tactic)) {
    modifier.scoreBonus = 14;
    modifier.damageBonus = 5;
  }
  if (passive === 'Predator Frame' && tactic === 'pressure' && fight.meters.momentum >= 0) {
    modifier.damageBonus = 6;
    modifier.opponentStaminaDamage = 4;
  }
  if (passive === 'Soft Counter Chain' && ['counter', 'grapple'].includes(tactic)) {
    modifier.scoreBonus = 10;
  }
  if (passive === 'Soft Counter Chain' && opponentTactic === 'pressure') {
    modifier.incomingReduction = 4;
  }
  if (passive === 'Evolution Read') {
    modifier.scoreBonus = Math.min(18, visibleFightRound(fight) * 4);
  }
  if (passive === 'Crushing Finish' && fight.meters.opponentHealth <= 50) {
    modifier.damageBonus = 7;
  }
  if (passive === 'Ancient Monster State') {
    modifier.damageBonus = 5;
    modifier.incomingReduction = 2;
  }
  if (passive === 'Ashura Read') {
    modifier.scoreBonus = Math.max(modifier.scoreBonus, 8);
    modifier.damageBonus += fight.meters.momentum >= 0 ? 5 : 2;
    if (['counter', 'defend'].includes(tactic)) modifier.incomingReduction += 2;
  }
  if (passive === 'Devil Gene Pressure') {
    const awakening = normalizeClanAwakening(life);
    const stage = awakening?.stage ?? 0;
    const lifeHealth = life.resources?.health ?? 100;
    if (stage >= 1 && (fight.meters.playerHealth <= 60 || lifeHealth <= 60 || fight.meters.playerStamina <= 45)) {
      modifier.scoreBonus += 5 + stage * 3;
      modifier.damageBonus += 6 + stage * 4;
      modifier.staminaCostDelta += stage >= 2 ? 2 : 0;
      if (stage >= 3) modifier.incomingReduction += 3;
    }
  }

  if (modifier.scoreBonus || modifier.damageBonus || modifier.incomingReduction || modifier.opponentStaminaDamage || modifier.staminaCostDelta) {
    modifier.text = passive;
  }
  return modifier;
}

export function getAvailableFights(life) {
  return Object.entries(OPPONENTS)
    .map(([id, opponent]) => ({ id, opponent }))
    .filter(({ id }) => !SPECIAL_FIGHT_IDS.includes(id))
    .filter(({ id, opponent }) => unmetFightRequirements(life, opponent, id).length === 0);
}

export function getLockedFights(life) {
  return Object.entries(OPPONENTS)
    .map(([id, opponent]) => ({ id, opponent, reasons: unmetFightRequirements(life, opponent, id) }))
    .filter(({ id }) => !SPECIAL_FIGHT_IDS.includes(id))
    .filter((fight) => fight.reasons.length > 0);
}

export function getSpecialFights(life) {
  return SPECIAL_FIGHT_IDS
    .map((id) => ({ id, opponent: getAdaptedOpponent(life, id), reasons: unmetFightRequirements(life, OPPONENTS[id], id) }))
    .filter((fight) => fight.opponent);
}

function lifeMonth(life) {
  return (life.identity?.age ?? 0) * 12 + (life.identity?.month ?? 0);
}

function fightCooldownMonths(opponent) {
  const tierBase = {
    Local: 1,
    Underground: 2,
    Corporate: 2,
    Monster: 3,
    'Association Tournament': 4,
    'Special Fight': 4,
  }[opponent.tier] ?? 3;
  const statMonths = opponent.tier === 'Special Fight'
    ? Math.floor((opponent.power ?? 0) / 700)
    : Math.floor((opponent.power ?? 0) / 450);
  const riskMonths = opponent.tier === 'Special Fight'
    ? Math.floor((opponent.risk ?? 0) / 45)
    : Math.floor((opponent.risk ?? 0) / 35);
  const threatBonus = ['Legend', 'Final Bracket'].includes(opponent.threat) ? 1 : 0;
  const cap = opponent.tier === 'Special Fight' ? 8 : 10;
  return Math.max(1, Math.min(cap, tierBase + statMonths + riskMonths + threatBonus));
}

function fightCooldownRemaining(life, opponentId) {
  const untilMonth = life.fightCooldowns?.[opponentId] ?? 0;
  return Math.max(0, untilMonth - lifeMonth(life));
}

function fightCooldownRequirement(life, opponentId, opponent) {
  const remaining = fightCooldownRemaining(life, opponentId);
  if (!remaining) return null;
  return `${opponent.name} available in ${remaining} month${remaining === 1 ? '' : 's'}`;
}

function unmetFightRequirements(life, opponent, opponentId) {
  const requirements = opponent.requirements ?? {};
  const reasons = [];
  const medicalRemaining = Math.max(0, (life.medicalSuspensionUntil ?? 0) - lifeMonth(life));
  if (medicalRemaining > 0) reasons.push(`Medical suspension: ${medicalRemaining} month${medicalRemaining === 1 ? '' : 's'} until cleared`);
  if (requirements.age && life.identity.age < requirements.age) reasons.push(`Reach age ${requirements.age}`);
  if (requirements.reputation && life.resources.reputation < requirements.reputation) reasons.push(`Need ${requirements.reputation} reputation`);
  if (requirements.wins && life.record.wins < requirements.wins) reasons.push(`Win ${requirements.wins} fights`);
  if (requirements.hiddenWorld && !life.world.hiddenWorld) reasons.push('Enter the hidden fight world');
  if (requirements.association && !life.association) reasons.push('Join an underground association');
  if (opponentId) {
    const cooldown = fightCooldownRequirement(life, opponentId, opponent);
    if (cooldown) reasons.push(cooldown);
  }
  return reasons;
}

function matchupModifier(playerTactic, opponentTactic) {
  const strong = {
    counter: 'pressure',
    grapple: 'counter',
    pressure: 'conserve',
    defend: 'special',
    conserve: 'defend',
    special: 'grapple',
  };
  if (strong[playerTactic] === opponentTactic) return 16;
  if (strong[opponentTactic] === playerTactic) return -14;
  return 0;
}

function counterCategoryForIntent(opponentTactic) {
  return {
    pressure: 'counter',
    counter: 'grapple',
    grapple: 'special',
    defend: 'conserve',
    conserve: 'pressure',
    special: 'defend',
  }[opponentTactic] ?? 'pressure';
}

function optimalBoostForMove(read, move, life) {
  if ((life.stats?.fightIq ?? 0) < 1500 || !read?.id || read.id !== move.id) {
    return {
      active: false,
      scoreBonus: 0,
      damageBonus: 0,
      incomingReduction: 0,
      staminaCostDelta: 0,
      guardGain: 0,
      opponentStaminaDamage: 0,
      label: '',
    };
  }
  const byCategory = {
    pressure: { scoreBonus: 18, damageBonus: 8, label: 'cleaner pressure lane and extra damage' },
    counter: { scoreBonus: 20, damageBonus: 7, incomingReduction: 3, label: 'earlier read, sharper counter damage, and safer exit' },
    grapple: { scoreBonus: 18, damageBonus: 5, opponentStaminaDamage: 8, label: 'stronger control and extra stamina drain' },
    defend: { scoreBonus: 16, incomingReduction: 9, guardGain: 8, label: 'tighter guard and reduced return damage' },
    conserve: { scoreBonus: 14, incomingReduction: 4, staminaCostDelta: -10, guardGain: 3, label: 'better recovery and safer reset' },
    special: { scoreBonus: 22, damageBonus: 10, incomingReduction: 4, label: 'special lands on the best timing window' },
  };
  const selected = byCategory[move.category] ?? byCategory.pressure;
  return {
    active: true,
    scoreBonus: selected.scoreBonus ?? 0,
    damageBonus: selected.damageBonus ?? 0,
    incomingReduction: selected.incomingReduction ?? 0,
    staminaCostDelta: selected.staminaCostDelta ?? 0,
    guardGain: selected.guardGain ?? 0,
    opponentStaminaDamage: selected.opponentStaminaDamage ?? 0,
    label: selected.label,
  };
}

function chooseOptimalMove(life, opponent, fight) {
  if ((life.stats?.fightIq ?? 0) < 1500) return null;
  const nextRound = visibleFightRound({ ...fight, round: fight.round + 1 });
  const nextIntent = opponentIntent(opponent, nextRound);
  const desiredCategories = [];
  if (fight.meters.playerStamina <= 28) desiredCategories.push('conserve');
  if (fight.meters.playerHealth <= (fight.meters.maxPlayerHealth ?? 100) * 0.38 || fight.meters.guard <= 24) desiredCategories.push('defend');
  desiredCategories.push(counterCategoryForIntent(nextIntent));
  desiredCategories.push('pressure', 'counter', 'grapple', 'defend', 'conserve');

  for (const category of [...new Set(desiredCategories)]) {
    const moves = getUnlockedFightMoves(life, category)
      .filter((move) => !move.disabledReason)
      .sort((a, b) => {
        const aBasic = a.unlockType === 'basic' ? 1 : 0;
        const bBasic = b.unlockType === 'basic' ? 1 : 0;
        return bBasic - aBasic || a.id.localeCompare(b.id);
      });
    if (moves.length) {
      const move = moves[0];
      return {
        id: move.id,
        category: move.category,
        label: move.label,
        reason: optimalMoveReason(move.category, nextIntent, fight),
      };
    }
  }
  return null;
}

function optimalMoveReason(category, nextIntent, fight) {
  if (fight.meters.playerStamina <= 28 && category === 'conserve') return 'your stamina is low, so the best read is to recover before the pace breaks you';
  if ((fight.meters.playerHealth <= (fight.meters.maxPlayerHealth ?? 100) * 0.38 || fight.meters.guard <= 24) && category === 'defend') return 'your guard or health is slipping, so protection has the biggest payoff';
  return {
    pressure: `the opponent is likely to ${tacticLabel(nextIntent).toLowerCase()}, and pressure can take the initiative first`,
    counter: `the opponent is likely to ${tacticLabel(nextIntent).toLowerCase()}, giving you a counter window`,
    grapple: `the opponent is likely to ${tacticLabel(nextIntent).toLowerCase()}, so clinch control can smother the setup`,
    defend: `the opponent is likely to ${tacticLabel(nextIntent).toLowerCase()}, so defense should blunt the spike`,
    conserve: `the opponent is likely to ${tacticLabel(nextIntent).toLowerCase()}, making a reset the cleanest answer`,
    special: `the opponent is likely to ${tacticLabel(nextIntent).toLowerCase()}, and your special can punish that lane hardest`,
  }[category] ?? 'the next exchange is readable enough to force a better answer';
}

function weakMoveForOpponent(opponent) {
  const weakness = `${opponent.weakness ?? ''} ${opponent.style ?? ''} ${opponent.temperament ?? ''}`.toLowerCase();
  if (weakness.includes('body debt') || weakness.includes('attrition') || weakness.includes('durability') || weakness.includes('gas tank')) {
    return {
      id: 'bodyShot',
      reason: 'body damage makes their long-fight weakness show early',
    };
  }
  if (weakness.includes('jab') || weakness.includes('reaching') || weakness.includes('pocket boxing')) {
    return {
      id: 'jab',
      reason: 'straight touches punish the space they keep giving away',
    };
  }
  if (weakness.includes('overcommit') || weakness.includes('overpursues') || weakness.includes('miss') || weakness.includes('wasting') || weakness.includes('baited')) {
    return {
      id: 'checkHook',
      reason: 'their forward rush turns into your angle change',
    };
  }
  if (weakness.includes('clean counters') || weakness.includes('entry') || weakness.includes('predictable')) {
    return {
      id: 'slipCross',
      reason: 'their entry line is readable enough to punish clean',
    };
  }
  if (weakness.includes('reset') || weakness.includes('chase') || weakness.includes('lateral') || weakness.includes('center')) {
    return {
      id: 'footworkReset',
      reason: 'denying the center makes them spend extra steps',
    };
  }
  if (weakness.includes('clinch') || weakness.includes('smothered') || weakness.includes('grips') || weakness.includes('walls')) {
    return {
      id: 'collarTie',
      reason: 'head control smothers their setup before it becomes dangerous',
    };
  }
  if (weakness.includes('grappling') || weakness.includes('balance')) {
    return {
      id: 'singleLegEntry',
      reason: 'attacking balance keeps their power from settling',
    };
  }
  if (weakness.includes('pride') || weakness.includes('ego') || weakness.includes('direct')) {
    return {
      id: 'parryFrame',
      reason: 'a disciplined frame lets their pride run into structure',
    };
  }
  return {
    id: 'measuredBreathing',
    reason: 'calm pacing makes their best phase arrive late',
  };
}

function weakMoveLine(opponent) {
  const weakness = weakMoveForOpponent(opponent);
  const move = FIGHT_MOVES[weakness.id] ?? FIGHT_MOVES.pressure;
  return `Specific weak move: ${move.label} - ${weakness.reason}.`;
}

function statLabel(stat) {
  return {
    fightIq: 'Fight IQ',
  }[stat] ?? stat.charAt(0).toUpperCase() + stat.slice(1);
}

function opponentStatFocusLine(opponent) {
  const stats = getOpponentStats(opponent);
  const focus = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([stat, value]) => `${statLabel(stat)} ${value}`)
    .join(', ');
  return `Enemy stat focus: ${focus}.`;
}

function rivalFeedItem(life, text, type = 'rival') {
  return {
    id: `${lifeMonth(life)}-${type}-${Math.random().toString(16).slice(2)}`,
    month: lifeMonth(life),
    type,
    text,
  };
}

function rivalPower(rival) {
  const average = Object.values(rival.stats ?? {}).reduce((sum, value) => sum + value, 0) / COMBAT_STATS.length;
  const experience = (rival.record?.wins ?? 0) * 10 + (rival.record?.losses ?? 0) * 4;
  return Math.round(average + experience);
}

function createRival(life) {
  const rng = createRng((life.rngSeed ?? 1) + lifeMonth(life) * 31 + 77);
  const focus = pick(['striking', 'grappling', 'defense'], rng);
  const name = `${pick(RIVAL_FIRST_NAMES, rng)} "${pick(RIVAL_NICKNAMES, rng)}" ${pick(LAST_NAMES, rng)}`;
  const stats = Object.fromEntries(COMBAT_STATS.map((stat) => [stat, 28 + Math.floor(rng() * 24)]));
  if (focus === 'striking') {
    stats.strength += 18; stats.speed += 14; stats.aggression += 14; stats.technique += 10;
  } else if (focus === 'grappling') {
    stats.durability += 18; stats.strength += 13; stats.flexibility += 13; stats.control += 12;
  } else {
    stats.control += 18; stats.willpower += 14; stats.fightIq += 14; stats.reflexes += 10;
  }
  const rival = {
    name,
    style: focus === 'striking' ? 'Rival Kickboxing' : focus === 'grappling' ? 'Rival Grappling' : 'Rival Defensive Study',
    temperament: focus === 'striking' ? 'reckless pressure' : focus === 'grappling' ? 'defensive grinder' : 'patient counter-striker',
    strengths: focus === 'striking'
      ? ['fast entries', 'hard sparring notes', 'ego pressure']
      : focus === 'grappling'
        ? ['clinch persistence', 'body locks', 'stubborn top pressure']
        : ['tape study', 'guard discipline', 'late counters'],
    weakness: 'gets too invested when the fight becomes personal',
    focus,
    stats,
    power: 0,
    rank: 'New Rival',
    record: { wins: 0, losses: 0, kos: 0 },
    lastOpponentId: null,
    feed: [],
  };
  rival.power = rivalPower(rival);
  rival.feed.unshift(rivalFeedItem(life, `Rival met: ${rival.name} starts watching your path from the edge of the local circuit.`, 'meet'));
  return rival;
}

function rivalEligibleOpponents(rival, life) {
  const specialAllowed = rival.power >= 650 || (rival.record?.wins ?? 0) >= 10;
  const pool = Object.entries(OPPONENTS)
    .filter(([id]) => specialAllowed || !SPECIAL_FIGHT_IDS.includes(id))
    .filter(([, opponent]) => (opponent.power ?? 0) <= rival.power * 2.05 + 80)
    .filter(([, opponent]) => !(opponent.requirements?.association) || (life.association || rival.power >= 520));
  return pool.length ? pool : [['alleyScrapper', OPPONENTS.alleyScrapper]];
}

function progressRival(life) {
  const next = life;
  if (!next.rival) {
    next.rival = createRival(next);
    next.relationships.rival = clamp((next.relationships.rival ?? 0) + 8);
    return next;
  }

  const rival = next.rival;
  const rng = createRng((next.rngSeed ?? 1) + lifeMonth(next) * 101 + (rival.record?.wins ?? 0) * 19);
  const focusStats = {
    striking: ['strength', 'speed', 'technique', 'aggression'],
    grappling: ['strength', 'durability', 'flexibility', 'control'],
    defense: ['fightIq', 'willpower', 'reflexes', 'control'],
  }[rival.focus] ?? ['strength', 'technique', 'fightIq'];
  for (const stat of focusStats) {
    rival.stats[stat] = Math.max(1, (rival.stats[stat] ?? 1) + 6 + Math.floor(rng() * 7));
  }
  const offStat = pick(COMBAT_STATS, rng);
  rival.stats[offStat] = Math.max(1, (rival.stats[offStat] ?? 1) + 3 + Math.floor(rng() * 3));
  rival.power = rivalPower(rival);
  rival.feed.unshift(rivalFeedItem(next, `${rival.name} trained ${focusStats.slice(0, 2).map(statLabel).join(' and ')}. Power rises to ${rival.power}.`, 'train'));

  const opponents = rivalEligibleOpponents(rival, next);
  const [opponentId, opponent] = opponents[Math.floor(rng() * opponents.length) % opponents.length];
  const opponentStats = getOpponentStats(opponent);
  const opponentPower = Math.round(Object.values(opponentStats).reduce((sum, value) => sum + value, 0) / COMBAT_STATS.length);
  const winChance = clampFloat(0.42 + (rival.power - opponentPower) / 420, 0.08, 0.88);
  const won = rng() < winChance;
  rival.lastOpponentId = opponentId;
  if (won) {
    rival.record.wins += 1;
    if (rng() < 0.35) rival.record.kos += 1;
    const fightBoost = SPECIAL_FIGHT_IDS.includes(opponentId) ? 28 : 10;
    for (const stat of focusStats.slice(0, 2)) rival.stats[stat] = Math.max(1, (rival.stats[stat] ?? 1) + Math.ceil(fightBoost / 4));
    rival.power = rivalPower(rival);
    rival.feed.unshift(rivalFeedItem(next, `${rival.name} fought ${opponent.name} and won. Their camp starts asking for stronger names.`, 'fight'));
  } else {
    rival.record.losses += 1;
    const lessonStat = pick(focusStats, rng);
    rival.stats[lessonStat] = Math.max(1, (rival.stats[lessonStat] ?? 1) + 4);
    rival.power = rivalPower(rival);
    rival.feed.unshift(rivalFeedItem(next, `${rival.name} fought ${opponent.name} and lost, but came back with sharper notes.`, 'fight'));
  }
  rival.rank = rival.power >= 650 ? 'Special Fight Chaser' : rival.power >= 360 ? 'Underground Rival' : rival.power >= 160 ? 'Local Rival' : 'New Rival';
  rival.feed = rival.feed.slice(0, 40);
  next.relationships.rival = clamp((next.relationships.rival ?? 0) + 2);
  return next;
}

function trainRivalBesidePlayer(life, action, isAuto = false) {
  if (!life.rival || !action?.gains) return;
  const rival = life.rival;
  const rng = createRng((life.rngSeed ?? 1) + lifeMonth(life) * 149 + (life.log?.length ?? 0) + (isAuto ? 17 : 0));
  const trainedStats = Object.keys(action.gains);
  const focusStats = {
    striking: ['strength', 'speed', 'technique', 'aggression'],
    grappling: ['strength', 'durability', 'flexibility', 'control'],
    defense: ['fightIq', 'willpower', 'reflexes', 'control'],
  }[rival.focus] ?? trainedStats;
  const primary = trainedStats[0] ?? pick(COMBAT_STATS, rng);
  const secondary = focusStats.find((stat) => stat !== primary) ?? pick(COMBAT_STATS, rng);
  const gainScale = isAuto ? 4 : 6;
  rival.stats[primary] = Math.max(1, (rival.stats[primary] ?? 1) + gainScale + Math.floor(rng() * 3));
  rival.stats[secondary] = Math.max(1, (rival.stats[secondary] ?? 1) + Math.max(1, gainScale - 1));
  rival.power = rivalPower(rival);
  rival.feed.unshift(rivalFeedItem(
    life,
    `${rival.name} mirrored your ${action.name} work and trained ${statLabel(primary)} plus ${statLabel(secondary)}. Power rises to ${rival.power}.`,
    isAuto ? 'auto-train' : 'train',
  ));
  rival.feed = rival.feed.slice(0, 40);
}

function normalizeCoach(coach = {}) {
  return {
    fighters: Array.isArray(coach.fighters) ? coach.fighters : [],
    feed: Array.isArray(coach.feed) ? coach.feed : [],
  };
}

function coachFeedItem(life, text, type = 'coach') {
  return {
    id: `${lifeMonth(life)}-${type}-${Math.random().toString(16).slice(2)}`,
    month: lifeMonth(life),
    type,
    text,
  };
}

function coachSlots(life) {
  const reputation = life.resources?.reputation ?? 0;
  if (reputation >= 220) return 3;
  if (reputation >= 80) return 2;
  return 1;
}

function coachedFighterPower(fighter) {
  const average = Object.values(fighter.stats ?? {}).reduce((sum, value) => sum + value, 0) / COMBAT_STATS.length;
  const experience = (fighter.record?.wins ?? 0) * 8 + (fighter.record?.losses ?? 0) * 3;
  const condition = ((fighter.condition ?? 75) - 75) * 0.18;
  return Math.max(1, Math.round(average + experience + condition));
}

function coachedRank(power = 0) {
  if (power >= 520) return 'Stable Monster';
  if (power >= 310) return 'Underground Client';
  if (power >= 160) return 'Booked Prospect';
  return 'Raw Prospect';
}

function createCoachedFighter(life) {
  const coach = normalizeCoach(life.coach);
  const rng = createRng((life.rngSeed ?? 1) + lifeMonth(life) * 43 + coach.fighters.length * 97);
  const focus = pick(['striking', 'grappling', 'defense'], rng);
  const name = `${pick(COACH_FIRST_NAMES, rng)} "${pick(COACH_NICKNAMES, rng)}" ${pick(LAST_NAMES, rng)}`;
  const stats = Object.fromEntries(COMBAT_STATS.map((stat) => [stat, 34 + Math.floor(rng() * 28)]));
  if (focus === 'striking') {
    stats.strength += 15; stats.speed += 11; stats.technique += 8; stats.aggression += 10;
  } else if (focus === 'grappling') {
    stats.strength += 11; stats.durability += 15; stats.flexibility += 10; stats.control += 9;
  } else {
    stats.fightIq += 14; stats.reflexes += 10; stats.willpower += 10; stats.control += 13;
  }
  const fighter = {
    id: `coach-${lifeMonth(life)}-${coach.fighters.length}-${Math.floor(rng() * 99999)}`,
    name,
    focus,
    style: focus === 'striking' ? 'Prospect Kickboxing' : focus === 'grappling' ? 'Prospect Grappling' : 'Prospect Defensive Study',
    stats,
    condition: 82,
    mood: 68,
    record: { wins: 0, losses: 0, kos: 0 },
    injuries: [],
    feed: [],
    lastFightMonth: null,
  };
  fighter.power = coachedFighterPower(fighter);
  fighter.rank = coachedRank(fighter.power);
  return fighter;
}

function findCoachedFighter(life, fighterId) {
  return normalizeCoach(life.coach).fighters.find((fighter) => fighter.id === fighterId);
}

export function recruitCoachedFighter(life) {
  const next = clone(life);
  next.coach = normalizeCoach(next.coach);
  const cost = 2500 + next.coach.fighters.length * 1500;
  if (next.coach.fighters.length >= coachSlots(next)) return addLog(life, `Recruit fighter failed: your stable has no open slots. Build reputation to coach more fighters.`, 'coach');
  if ((next.resources.money ?? 0) < cost) return addLog(life, `Recruit fighter failed: you need $${cost}.`, 'coach');
  const fighter = createCoachedFighter(next);
  next.resources.money -= cost;
  fighter.feed.unshift(coachFeedItem(next, `${fighter.name} signs with your stable as a ${fighter.rank}.`, 'recruit'));
  next.coach.fighters.push(fighter);
  next.coach.feed.unshift(coachFeedItem(next, `Recruit signed: ${fighter.name}. Cost $${cost}.`, 'recruit'));
  next.coach.feed = next.coach.feed.slice(0, 50);
  return addLog(next, `Coach stable: ${fighter.name} joined your camp.`, 'coach');
}

export function coachFighter(life, fighterId, focus = 'striking') {
  const next = clone(life);
  next.coach = normalizeCoach(next.coach);
  const fighter = next.coach.fighters.find((item) => item.id === fighterId);
  if (!fighter) return addLog(life, 'Coach session failed: fighter not found.', 'coach');
  const moneyCost = focus === 'hardCamp' ? 900 : 350;
  if ((next.resources.money ?? 0) < moneyCost) return addLog(life, `Coach session failed: you need $${moneyCost}.`, 'coach');
  const rng = createRng((next.rngSeed ?? 1) + lifeMonth(next) * 61 + fighter.power + (next.log?.length ?? 0));
  const focusStats = {
    striking: ['strength', 'speed', 'technique', 'aggression'],
    grappling: ['strength', 'durability', 'flexibility', 'control'],
    defense: ['fightIq', 'reflexes', 'willpower', 'control'],
    hardCamp: COMBAT_STATS,
  }[focus] ?? ['technique', 'fightIq', 'control'];
  const gain = focus === 'hardCamp' ? 5 : 4;
  for (const stat of focusStats.slice(0, focus === 'hardCamp' ? 6 : 4)) {
    fighter.stats[stat] = Math.max(1, (fighter.stats[stat] ?? 1) + gain + Math.floor(rng() * 4));
  }
  if (focus === 'hardCamp' && rng() < 0.18) {
    fighter.injuries = [...(fighter.injuries ?? []), { name: 'camp strain', tier: 'Mild', monthsOut: 1 }];
    fighter.condition = Math.max(20, (fighter.condition ?? 80) - 18);
  } else {
    fighter.condition = Math.max(25, (fighter.condition ?? 80) - (focus === 'hardCamp' ? 12 : 7));
  }
  fighter.mood = clamp((fighter.mood ?? 65) + (focus === 'hardCamp' ? -3 : 2));
  fighter.power = coachedFighterPower(fighter);
  fighter.rank = coachedRank(fighter.power);
  next.resources.money -= moneyCost;
  const label = focus === 'hardCamp' ? 'hard camp' : `${focus} coaching`;
  fighter.feed.unshift(coachFeedItem(next, `${label}: ${focusStats.slice(0, 3).map(statLabel).join(', ')} improved. Power ${fighter.power}.`, 'train'));
  fighter.feed = fighter.feed.slice(0, 40);
  next.coach.feed.unshift(coachFeedItem(next, `${fighter.name} completed ${label}.`, 'train'));
  next.coach.feed = next.coach.feed.slice(0, 50);
  return addLog(next, `${fighter.name} coaching complete: power now ${fighter.power}.`, 'coach');
}

export function recoverCoachedFighter(life, fighterId) {
  const next = clone(life);
  next.coach = normalizeCoach(next.coach);
  const fighter = next.coach.fighters.find((item) => item.id === fighterId);
  if (!fighter) return addLog(life, 'Recovery failed: fighter not found.', 'coach');
  const cost = 450;
  if ((next.resources.money ?? 0) < cost) return addLog(life, `Recovery failed: you need $${cost}.`, 'coach');
  next.resources.money -= cost;
  fighter.condition = clamp((fighter.condition ?? 70) + 28);
  fighter.mood = clamp((fighter.mood ?? 65) + 6);
  if ((fighter.injuries ?? []).length && fighter.condition >= 75) fighter.injuries = fighter.injuries.slice(1);
  fighter.power = coachedFighterPower(fighter);
  fighter.feed.unshift(coachFeedItem(next, `Recovery block: condition rises to ${fighter.condition}.`, 'recover'));
  next.coach.feed.unshift(coachFeedItem(next, `${fighter.name} took a recovery block.`, 'recover'));
  return addLog(next, `${fighter.name} recovered.`, 'coach');
}

export function releaseCoachedFighter(life, fighterId) {
  const next = clone(life);
  next.coach = normalizeCoach(next.coach);
  const fighter = next.coach.fighters.find((item) => item.id === fighterId);
  if (!fighter) return addLog(life, 'Let go failed: fighter not found.', 'coach');
  next.coach.fighters = next.coach.fighters.filter((item) => item.id !== fighterId);
  next.coach.feed.unshift(coachFeedItem(next, `${fighter.name} was let go from your stable.`, 'release'));
  next.coach.feed = next.coach.feed.slice(0, 50);
  return addLog(next, `Coach stable: ${fighter.name} was let go.`, 'coach');
}

export function getCoachedFightOptions(life, fighterId) {
  const fighter = findCoachedFighter(life, fighterId);
  if (!fighter) return [];
  return Object.entries(OPPONENTS)
    .filter(([id]) => !SPECIAL_FIGHT_IDS.includes(id))
    .filter(([, opponent]) => (opponent.power ?? 0) <= fighter.power * 1.9 + 130)
    .sort(([, a], [, b]) => Math.abs((a.power ?? 0) - fighter.power) - Math.abs((b.power ?? 0) - fighter.power))
    .slice(0, 5)
    .map(([id, opponent]) => ({ id, opponent }));
}

export function scheduleCoachedFight(life, fighterId, opponentId) {
  const next = clone(life);
  next.coach = normalizeCoach(next.coach);
  const fighter = next.coach.fighters.find((item) => item.id === fighterId);
  if (!fighter) return addLog(life, 'Fight booking failed: fighter not found.', 'coach');
  if ((fighter.condition ?? 0) < 35) return addLog(life, `${fighter.name} cannot be booked: condition is too low.`, 'coach');
  if (fighter.lastFightMonth === lifeMonth(next)) return addLog(life, `${fighter.name} already fought this month. Age up before booking them again.`, 'coach');
  const options = getCoachedFightOptions(next, fighterId);
  const opponent = options.find((fight) => fight.id === opponentId)?.opponent ?? options[0]?.opponent;
  const resolvedId = options.find((fight) => fight.opponent === opponent)?.id ?? opponentId;
  if (!opponent) return addLog(life, `${fighter.name} has no suitable fights yet.`, 'coach');
  const opponentStats = getOpponentStats(opponent);
  const opponentPower = Math.round(Object.values(opponentStats).reduce((sum, value) => sum + value, 0) / COMBAT_STATS.length);
  const rng = createRng((next.rngSeed ?? 1) + lifeMonth(next) * 83 + fighter.power * 7 + opponentPower);
  const conditionBonus = ((fighter.condition ?? 70) - 70) / 120;
  const winChance = clampFloat(0.46 + (fighter.power - opponentPower) / 430 + conditionBonus, 0.07, 0.9);
  const won = rng() < winChance;
  const payoutBase = Math.max(180, Math.round((opponent.reward ?? opponent.power * 5) * 0.22));
  const payout = won ? payoutBase : Math.max(80, Math.round(payoutBase * 0.35));
  next.resources.money += payout;
  fighter.lastFightMonth = lifeMonth(next);
  fighter.condition = Math.max(10, Math.round((fighter.condition ?? 70) - 12 - (opponent.risk ?? 20) / 8));
  const focusStats = {
    striking: ['strength', 'speed', 'technique', 'aggression'],
    grappling: ['strength', 'durability', 'flexibility', 'control'],
    defense: ['fightIq', 'reflexes', 'willpower', 'control'],
  }[fighter.focus] ?? ['technique', 'fightIq', 'control'];
  if (won) {
    fighter.record.wins += 1;
    if (rng() < 0.32) fighter.record.kos += 1;
    for (const stat of focusStats) fighter.stats[stat] = Math.max(1, (fighter.stats[stat] ?? 1) + 6 + Math.floor(rng() * 4));
    fighter.mood = clamp((fighter.mood ?? 65) + 6);
  } else {
    fighter.record.losses += 1;
    for (const stat of focusStats.slice(0, 2)) fighter.stats[stat] = Math.max(1, (fighter.stats[stat] ?? 1) + 4);
    fighter.stats.fightIq = Math.max(1, (fighter.stats.fightIq ?? 1) + 5);
    fighter.mood = clamp((fighter.mood ?? 65) - 4);
  }
  if (rng() < ((opponent.risk ?? 20) / 240) + (fighter.condition < 45 ? 0.12 : 0)) {
    fighter.injuries = [...(fighter.injuries ?? []), { name: won ? 'paid bruising' : 'fight damage', tier: won ? 'Mild' : 'Moderate', monthsOut: won ? 1 : 2 }];
  }
  fighter.power = coachedFighterPower(fighter);
  fighter.rank = coachedRank(fighter.power);
  const resultText = `${fighter.name} ${won ? 'beat' : 'lost to'} ${opponent.name}. Stable payout: $${payout}.`;
  fighter.feed.unshift(coachFeedItem(next, `${resultText} Record ${fighter.record.wins}-${fighter.record.losses}.`, 'fight'));
  fighter.feed = fighter.feed.slice(0, 40);
  next.coach.feed.unshift(coachFeedItem(next, resultText, 'fight'));
  next.coach.feed = next.coach.feed.slice(0, 50);
  return addLog(next, `Coach booking: ${resultText}`, 'coach');
}

function bestAngle(life, opponent) {
  const candidates = [
    ['Pressure', life.stats.strength + life.stats.aggression, 'make their defense crack early'],
    ['Counter', life.stats.reflexes + life.stats.fightIq, 'punish predictable entries'],
    ['Grapple', life.stats.durability + life.stats.technique, 'drag them into ugly clinch work'],
    ['Defend', life.stats.control + life.stats.willpower, 'survive the first storm and read them'],
    ['Special', getRarity(life.clan.rarity).powerMultiplier * 50 + life.stats.technique, 'spend your bloodline advantage'],
  ].sort((a, b) => b[1] - a[1]);
  const [label, , reason] = candidates[0];
  return `Best angle: ${label} could ${reason}.`;
}

function fightBreakdown(life, opponent) {
  const estimate = Math.round((fighterPower(life) / (fighterPower(life) + opponentStatPower(opponent) * 0.34)) * 100);
  const danger = opponent.risk + Math.max(0, getRarity(life.clan.rarity).powerMultiplier - 1) * 4;
  return [
    `${opponent.name} fights as a ${opponent.temperament} ${opponent.style} specialist.`,
    ...(opponent.tier === 'Rival' ? [`Rival read: ${opponent.name} has been building specifically around your career.`] : []),
    `Win read: about ${Math.max(8, Math.min(92, estimate))}% before tactics.`,
    `Danger: ${danger >= 12 ? 'high' : danger >= 7 ? 'medium' : 'low'} injury risk if the fight drags.`,
    `Watch for ${opponent.strengths.join(', ')}.`,
    opponentStatFocusLine(opponent),
    `Opening: ${opponent.weakness}.`,
    weakMoveLine(opponent),
    bestAngle(life, opponent),
  ];
}

function fightHealthFromStats(stats) {
  return clamp(100 + (stats.durability ?? 0) * 0.24 + (stats.willpower ?? 0) * 0.12, 100, 1200);
}

function healthPercent(current, max) {
  return max > 0 ? (current / max) * 100 : 0;
}

function visibleFightRound(fight) {
  return Math.ceil(fight.round / (fight.exchangesPerRound ?? 5));
}

const GRAPPLING_POSITION_POWER = {
  closedGuard: 0.76,
  halfGuard: 0.88,
  sideControl: 1.05,
  mount: 1.28,
  backControl: 1.42,
};

const GRAPPLING_POSITION_LABELS = {
  closedGuard: 'Closed Guard',
  halfGuard: 'Half Guard',
  sideControl: 'Side Control',
  mount: 'Mount',
  backControl: 'Back Control',
};

function normalizeGrapplingState(fight = {}) {
  fight = fight ?? {};
  const grappling = fight.grappling ?? {};
  if (grappling.phase === 'ground') {
    return {
      phase: 'ground',
      top: grappling.top === 'opponent' ? 'opponent' : 'player',
      position: GRAPPLING_POSITION_POWER[grappling.position] ? grappling.position : 'halfGuard',
      lastTransition: grappling.lastTransition ?? '',
    };
  }
  return {
    phase: 'standing',
    top: null,
    position: null,
    lastTransition: grappling.lastTransition ?? '',
  };
}

function grapplingRoleContext(fight = {}) {
  const grappling = normalizeGrapplingState(fight);
  if (grappling.phase !== 'ground') return 'takedown';
  return grappling.top === 'player' ? 'dominant' : 'escape';
}

function grapplingContextLabel(fight = {}) {
  const grappling = normalizeGrapplingState(fight);
  if (grappling.phase !== 'ground') return 'Takedowns';
  return grappling.top === 'player' ? 'Top Control' : 'Ground Escape';
}

function grapplingPositionBonus(position) {
  return GRAPPLING_POSITION_POWER[position] ?? 1;
}

function playerGrapplingSkill(life, role = 'takedown') {
  const stats = life.stats ?? {};
  const techniqueTrack = life.techniques?.grappling ?? 0;
  const roleBias = {
    takedown: stats.strength * 0.34 + stats.speed * 0.24,
    submission: stats.control * 0.35 + stats.flexibility * 0.22,
    reversal: stats.flexibility * 0.32 + stats.reflexes * 0.2,
    getUp: stats.speed * 0.25 + stats.willpower * 0.18 + techniqueTrack * 0.28,
  }[role] ?? 0;
  return (
    stats.technique * 0.82 +
    stats.control * 0.54 +
    stats.flexibility * 0.42 +
    stats.fightIq * 0.28 +
    roleBias +
    techniqueTrack * 0.62
  );
}

function opponentGrapplingSkill(opponent, role = 'takedown') {
  const stats = getOpponentStats(opponent);
  const roleBias = {
    takedown: stats.strength * 0.3 + stats.speed * 0.2,
    submission: stats.control * 0.34 + stats.flexibility * 0.2,
    reversal: stats.flexibility * 0.34 + stats.reflexes * 0.26 + stats.control * 0.12,
    getUp: stats.speed * 0.3 + stats.willpower * 0.22 + stats.fightIq * 0.08,
  }[role] ?? 0;
  return (
    stats.technique * 0.84 +
    stats.control * 0.58 +
    stats.flexibility * 0.4 +
    stats.fightIq * 0.28 +
    roleBias +
    opponentTacticStat(stats, 'grapple') * 0.24
  );
}

function opponentGroundDefenseBonus(opponent, role = 'reversal') {
  const stats = getOpponentStats(opponent);
  const style = `${opponent.style} ${opponent.temperament} ${(opponent.strengths ?? []).join(' ')}`.toLowerCase();
  const styleBonus = /(grappl|wrestl|judo|lock|clinch|submission|joint|throw|ground)/.test(style) ? 34 : 0;
  const specialBonus = opponent.tier === 'Special Fight'
    ? clamp(48 + (opponent.power ?? 0) / 18 + opponentTacticStat(stats, 'grapple') * 0.18, 70, 190)
    : opponent.tier === 'Association Tournament'
      ? 28
      : 0;
  const roleBonus = role === 'getUp'
    ? stats.speed * 0.08 + stats.willpower * 0.05
    : stats.flexibility * 0.07 + stats.control * 0.06;
  return styleBonus + specialBonus + roleBonus;
}

function opponentSubmissionDefense(opponent, fight) {
  return (
    opponentGrapplingSkill(opponent, 'reversal') * 0.72 +
    opponentGrapplingSkill(opponent, 'getUp') * 0.34 +
    fight.meters.opponentStamina * 0.92 +
    opponentGroundDefenseBonus(opponent, 'reversal') * 0.85
  );
}

function opponentGroundEscapeRole(opponent, fight, enemyMove) {
  const enemyRole = enemyMove.groundRole ?? '';
  if (enemyRole === 'reversal' || enemyRole === 'getUp') return enemyRole;
  const style = `${opponent.style} ${opponent.temperament} ${(opponent.strengths ?? []).join(' ')}`.toLowerCase();
  const reversalBias = /(grappl|wrestl|judo|lock|clinch|submission|joint|throw|soft)/.test(style) ? 0.68 : 0.38;
  const roll = deterministicRoll(fight.opponentId, fight.round, fight.exchanges.length, opponent.name, 'ground-escape-role');
  return roll < reversalBias ? 'reversal' : 'getUp';
}

function opponentGroundEscapeScore({ opponent, fight, enemyMove, playerScore, enemyScore, margin, role }) {
  const moveIsEscape = ['reversal', 'getUp'].includes(enemyMove.groundRole ?? '');
  const roleScore = opponentGrapplingSkill(opponent, role);
  const baseScore = moveIsEscape ? enemyScore - playerScore : (enemyScore - playerScore) * 0.45;
  return baseScore + roleScore * 0.08 + fight.meters.opponentStamina * 0.18 + opponentGroundDefenseBonus(opponent, role) * 0.42 + Math.max(0, -margin) * 0.35;
}

function groundPositionFromMargin(margin, top = 'player') {
  if (margin >= 185) return top === 'player' ? 'backControl' : 'mount';
  if (margin >= 115) return 'mount';
  if (margin >= 52) return 'sideControl';
  return 'halfGuard';
}

function worseGroundPosition(position) {
  return {
    backControl: 'mount',
    mount: 'sideControl',
    sideControl: 'halfGuard',
    halfGuard: 'closedGuard',
    closedGuard: 'closedGuard',
  }[position] ?? 'halfGuard';
}

function betterGroundPosition(position) {
  return {
    closedGuard: 'halfGuard',
    halfGuard: 'sideControl',
    sideControl: 'mount',
    mount: 'backControl',
    backControl: 'backControl',
  }[position] ?? 'sideControl';
}

function setStandingGrappling(fight, text = 'Get up: the fight resets to standing range.') {
  fight.grappling = {
    phase: 'standing',
    top: null,
    position: null,
    lastTransition: text,
  };
}

function createActiveFight(life, opponentId, options = {}) {
  const opponent = getCombatOpponent(life, opponentId);
  if (!opponent) return null;
  const prep = life.nextFightPrep ?? {};
  const opponentStats = getOpponentStats(opponent);
  const isSystemFight = options.source === 'hunterQuest' || options.source === 'hunterDungeon';
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const usesHunterStats = isSystemFight || usesHunterCombatOverlay(life);
  const playerStats = usesHunterStats ? getHunterEffectiveStats(life) : life.stats;
  const maxPlayerHealth = maxLifeHealth(life);
  const maxOpponentHealth = Math.round(fightHealthFromStats(opponentStats) * systemMonsterHealthMultiplier(opponent));
  const maxPlayerStamina = clamp(maxLifeEnergy(life) + (prep.trainingCamp ? 10 : 0) + (isSystemFight ? hunter.stats.vitality * 3 + hunter.stats.agility * 2 : 0), 25, 520);
  const maxOpponentStamina = clamp(staminaFromStats(opponentStats), 45, 520);
  const breakdown = fightBreakdown(life, opponent);
  if (opponent.adaptationCount) {
    const titleLine = opponent.growthTitle ? ` They are now filed as ${opponent.growthTitle}.` : '';
    breakdown.push(`Adaptation: ${opponent.name} rebuilt their camp after ${opponent.adaptationCount} loss${opponent.adaptationCount === 1 ? '' : 'es'} to you. Their power has jumped hard for the rematch.${titleLine}`);
  }
  if (prep.trainingCamp) breakdown.push('Prep: Training camp adds lungs, timing, and lower injury risk to the opening plan.');
  if (prep.scoutTape) breakdown.push('Prep: Scout tape highlights tells, habits, and the first angle to steal.');
  if (prep.cornerman) breakdown.push('Prep: Your cornerman gives you guard calls before the damage starts talking.');
  const activeCallout = life.social?.calledOutTarget?.opponentId === opponentId ? clone(life.social.calledOutTarget) : null;
  if (activeCallout) breakdown.push(`Social media: you called out ${opponent.name}. Rewards are hotter, but they start the fight annoyed.`);
  return {
    opponentId,
    source: options.source ?? 'fight',
    questId: options.questId ?? null,
    dungeonId: options.dungeonId ?? null,
    encounterIndex: options.encounterIndex ?? null,
    isBoss: Boolean(options.isBoss),
    round: 1,
    maxRounds: 25,
    exchangesPerRound: 5,
    prep,
    breakdown,
    exchanges: [],
    moveCooldowns: {},
    specialCharges: 1,
    callout: activeCallout,
    grappling: {
      phase: 'standing',
      top: null,
      position: null,
      lastTransition: '',
    },
    meters: {
      playerHealth: options.carriedHealth == null ? combatResourceValue(life.resources.health, maxPlayerHealth, 1) : clamp(options.carriedHealth, 1, maxPlayerHealth),
      opponentHealth: maxOpponentHealth,
      maxPlayerHealth,
      maxOpponentHealth,
      maxPlayerStamina,
      maxOpponentStamina,
      playerStamina: options.carriedStamina == null
        ? clamp(combatResourceValue(life.resources.energy, maxLifeEnergy(life), 25) + (prep.trainingCamp ? 10 : 0) + (isSystemFight ? hunter.stats.vitality * 3 + hunter.stats.agility * 2 : 0), 25, maxPlayerStamina)
        : clamp(options.carriedStamina, 0, maxPlayerStamina),
      opponentStamina: maxOpponentStamina,
      momentum: (prep.trainingCamp ? 5 : 0) + (prep.scoutTape ? 8 : 0) - (activeCallout?.opponentMomentum ?? 0),
      guard: 50 + (prep.cornerman ? 12 : 0),
      injuryRisk: Math.max(0, opponent.risk - (prep.trainingCamp ? 3 : 0)),
    },
    finished: false,
    result: null,
  };
}

export function startFight(life, opponentId) {
  life = withNormalizedClanAwakening(life);
  const opponent = opponentId === 'rival' ? rivalAsOpponent(life) : OPPONENTS[opponentId];
  if (!opponent) return life;
  const lockReasons = unmetFightRequirements(life, opponent, opponentId);
  if (lockReasons.length) {
    return addLog(life, `${opponent.name} cannot be booked yet: ${lockReasons.join(' / ')}.`, 'fight');
  }
  const activeFight = createActiveFight(life, opponentId);
  if (!activeFight) return life;
  const next = clone(life);
  next.activeFight = activeFight;
  next.nextFightPrep = {};
  return addLog(next, `You square up with ${opponent.name}. Read the matchup before the first exchange.`, 'fight');
}

export function startRivalFight(life) {
  if (!life.rival) return addLog(life, 'You do not have a rival yet. Age up and let the circuit find someone who hates your pace.', 'rival');
  if (life.activeFight) return addLog(life, 'Finish the active fight before calling out your rival.', 'rival');
  return startFight(life, 'rival');
}

function tournamentEntrants(life) {
  return [...SPECIAL_FIGHT_IDS]
    .sort((a, b) => deterministicRoll(life.rngSeed, a, 'annihilation-bracket') - deterministicRoll(life.rngSeed, b, 'annihilation-bracket'))
    .slice(0, 8);
}

function tournamentActive(tournament) {
  return tournament && !tournament.complete && !tournament.eliminated;
}

export function joinTournament(life) {
  if (life.activeFight) return addLog(life, 'Finish the active fight before signing a tournament bracket.', 'fight');
  if (tournamentActive(life.tournament)) return addLog(life, 'You are already registered in a tournament bracket.', 'fight');
  const next = clone(life);
  next.tournament = {
    id: `annihilation-${lifeMonth(next)}-${next.record.wins}`,
    name: 'Annihilation-Style Underground Bracket',
    entrants: tournamentEntrants(next),
    roundIndex: 0,
    wins: 0,
    complete: false,
    eliminated: false,
  };
  return addLog(next, 'Tournament joined: an eight-fighter special bracket has been drawn.', 'fight');
}

export function startTournamentFight(life) {
  if (life.activeFight) return addLog(life, 'Finish the active fight before the next bracket match.', 'fight');
  if (!tournamentActive(life.tournament)) return addLog(life, 'Join a tournament before booking a bracket match.', 'fight');
  const opponentId = life.tournament.entrants[life.tournament.roundIndex];
  const opponent = OPPONENTS[opponentId];
  if (!opponent) return addLog(life, 'The tournament bracket has an invalid opponent slot.', 'fight');
  const activeFight = createActiveFight(life, opponentId);
  if (!activeFight) return life;
  activeFight.tournament = {
    id: life.tournament.id,
    roundIndex: life.tournament.roundIndex,
    bracketSize: life.tournament.entrants.length,
  };
  const next = clone(life);
  next.activeFight = activeFight;
  next.nextFightPrep = {};
  return addLog(next, `Tournament bracket match booked: Round ${life.tournament.roundIndex + 1} vs ${opponent.name}.`, 'fight');
}

function resolveGroundExchange({ life, opponent, fight, move, enemyMove, playerScore, enemyScore, swing, playerDamage, enemyDamage, opponentDodged }) {
  const grappling = normalizeGrapplingState(fight);
  const role = move.groundRole ?? 'takedown';
  const position = grappling.position ?? 'halfGuard';
  const positionBonus = grapplingPositionBonus(position);
  const rollSeed = [life.rngSeed, fight.opponentId, fight.round, fight.exchanges.length, move.id, position].join('-');
  const result = {
    playerDamage,
    enemyDamage,
    text: '',
    submissionFinishChance: 0,
    submissionFinished: false,
    forceHit: grappling.phase === 'ground',
  };

  if (role === 'takedown') {
    const playerGrapple = playerGrapplingSkill(life, 'takedown') + fight.meters.playerStamina * 1.4 + swing * 0.65;
    const enemyDefense = opponentGrapplingSkill(opponent, 'takedown') + fight.meters.opponentStamina * 0.95;
    const margin = playerGrapple - enemyDefense;
    if (!opponentDodged && margin > -18) {
      const landedPosition = groundPositionFromMargin(margin, 'player');
      fight.grappling = {
        phase: 'ground',
        top: 'player',
        position: landedPosition,
        lastTransition: `Takedown: ${move.label} lands and you settle on top in ${GRAPPLING_POSITION_LABELS[landedPosition]}.`,
      };
      result.playerDamage = Math.max(1, Math.round(playerDamage * 0.62 + Math.max(0, margin) / 42 + 2));
      result.enemyDamage = Math.max(0, Math.round(enemyDamage * 0.55));
      result.text = fight.grappling.lastTransition;
      result.forceHit = true;
    } else if ((enemyMove.groundRole ?? 'takedown') === 'takedown' && enemyScore > playerScore + 42) {
      const landedPosition = groundPositionFromMargin(enemyScore - playerScore, 'opponent');
      fight.grappling = {
        phase: 'ground',
        top: 'opponent',
        position: landedPosition,
        lastTransition: `Counter-takedown: ${opponent.name} stuffs the entry and lands on top in ${GRAPPLING_POSITION_LABELS[landedPosition]}.`,
      };
      result.playerDamage = Math.max(0, Math.round(playerDamage * 0.25));
      result.enemyDamage = Math.max(1, Math.round(enemyDamage * 1.12 + 2));
      result.text = fight.grappling.lastTransition;
    } else {
      fight.grappling = { ...grappling, lastTransition: `Takedown failed: ${move.label} cannot clear the base, and the fight stays standing.` };
      result.playerDamage = Math.max(0, Math.round(playerDamage * 0.25));
      result.text = fight.grappling.lastTransition;
    }
    return result;
  }

  if (role === 'submission') {
    const playerSubmission = playerGrapplingSkill(life, 'submission') * positionBonus + fight.meters.playerStamina * 1.18;
    const defense = opponentSubmissionDefense(opponent, fight);
    const margin = playerSubmission - defense;
    const healthPressure = 100 - healthPercent(fight.meters.opponentHealth, fight.meters.maxOpponentHealth ?? 100);
    const specialCap = opponent.tier === 'Special Fight'
      ? (margin >= 560 ? 0.68 : 0.55)
      : 0.9;
    const positionFinishCap = Math.min(specialCap, clampFloat(0.38 + positionBonus * 0.22, 0.4, 0.84));
    result.submissionFinishChance = clampFloat(0.035 + margin / 1050 + (positionBonus - 0.78) * 0.17 + healthPressure * 0.0048, 0.025, positionFinishCap);
    const finishRoll = deterministicRoll(rollSeed, 'submission-finish');
    result.playerDamage = Math.max(1, Math.round(playerDamage * (0.82 + positionBonus * 0.42) + Math.max(0, margin) / 55 + (positionBonus - 0.75) * 10));
    result.enemyDamage = Math.max(0, Math.round(enemyDamage * 0.55));
    const enemyEscapeRole = opponentGroundEscapeRole(opponent, fight, enemyMove);
    const enemyEscapeMargin = opponentGroundEscapeScore({ opponent, fight, enemyMove, playerScore, enemyScore, margin, role: enemyEscapeRole });
    if (finishRoll < result.submissionFinishChance) {
      result.playerDamage = Math.max(result.playerDamage, fight.meters.opponentHealth);
      result.submissionFinished = true;
      fight.grappling = {
        ...grappling,
        lastTransition: `Submission: ${move.label} tightens from ${GRAPPLING_POSITION_LABELS[position]} and forces the finish.`,
      };
    } else if (enemyEscapeMargin > 18 || margin < -40) {
      if (enemyEscapeRole === 'getUp') {
        setStandingGrappling(fight, `Enemy get up: ${opponent.name}'s ${enemyMove.label} clears your top control and resets the fight.`);
      } else {
        const enemyPosition = groundPositionFromMargin(enemyEscapeMargin + Math.abs(Math.min(0, margin)), 'opponent');
        fight.grappling = {
          phase: 'ground',
          top: 'opponent',
          position: enemyPosition,
          lastTransition: `Enemy reversal: ${opponent.name}'s ${enemyMove.label} flips the position to ${GRAPPLING_POSITION_LABELS[enemyPosition]}.`,
        };
      }
      result.playerDamage = Math.max(0, Math.round(result.playerDamage * 0.35));
      result.enemyDamage = Math.max(1, Math.round(enemyDamage * 1.08 + 2));
    } else if (margin < -55) {
      const worse = worseGroundPosition(position);
      fight.grappling = {
        phase: 'ground',
        top: 'player',
        position: worse,
        lastTransition: `Submission slip: ${move.label} threatens, but ${opponent.name} recovers to ${GRAPPLING_POSITION_LABELS[worse]}.`,
      };
    } else {
      fight.grappling = {
        ...grappling,
        lastTransition: `Submission: ${move.label} forces defense from ${GRAPPLING_POSITION_LABELS[position]}.`,
      };
    }
    result.text = fight.grappling.lastTransition;
    return result;
  }

  if (role === 'groundPound') {
    const topControl = playerGrapplingSkill(life, 'submission') * (0.76 + positionBonus * 0.34) + fight.meters.playerStamina * 1.02;
    const bottomDefense = opponentGrapplingSkill(opponent, 'reversal') * 0.72 +
      opponentGrapplingSkill(opponent, 'getUp') * 0.28 +
      fight.meters.opponentStamina * 0.84 +
      opponentGroundDefenseBonus(opponent, 'reversal') * 0.72;
    const margin = topControl - bottomDefense + swing * 0.34;
    const enemyEscapeRole = opponentGroundEscapeRole(opponent, fight, enemyMove);
    const enemyEscapeMargin = opponentGroundEscapeScore({ opponent, fight, enemyMove, playerScore, enemyScore, margin, role: enemyEscapeRole });
    result.playerDamage = Math.max(1, Math.round(playerDamage * (0.95 + positionBonus * 0.36) + Math.max(0, margin) / 65 + 3));
    result.enemyDamage = Math.max(0, Math.round(enemyDamage * 0.64));
    if (enemyEscapeMargin > 24 || margin < -48) {
      if (enemyEscapeRole === 'getUp') {
        setStandingGrappling(fight, `Enemy get up: ${opponent.name}'s ${enemyMove.label} survives the ground-and-pound and resets the fight.`);
      } else {
        const enemyPosition = groundPositionFromMargin(enemyEscapeMargin + Math.abs(Math.min(0, margin)), 'opponent');
        fight.grappling = {
          phase: 'ground',
          top: 'opponent',
          position: enemyPosition,
          lastTransition: `Enemy reversal: ${opponent.name}'s ${enemyMove.label} uses the striking gap to flip into ${GRAPPLING_POSITION_LABELS[enemyPosition]}.`,
        };
      }
      result.playerDamage = Math.max(0, Math.round(result.playerDamage * 0.42));
      result.enemyDamage = Math.max(1, Math.round(enemyDamage * 1.02 + 1));
    } else if (margin > 135 && position !== 'backControl') {
      const better = betterGroundPosition(position);
      fight.grappling = {
        phase: 'ground',
        top: 'player',
        position: better,
        lastTransition: `Ground-and-pound: ${move.label} forces ${opponent.name} to shell and lets you climb to ${GRAPPLING_POSITION_LABELS[better]}.`,
      };
    } else {
      fight.grappling = {
        ...grappling,
        lastTransition: `Ground-and-pound: ${move.label} scores from ${GRAPPLING_POSITION_LABELS[position]} while you keep top control.`,
      };
    }
    result.text = fight.grappling.lastTransition;
    return result;
  }

  if (role === 'reversal') {
    const margin = (playerGrapplingSkill(life, 'reversal') + fight.meters.playerStamina * 1.25 + swing * 0.5) - (opponentGrapplingSkill(opponent, 'submission') * positionBonus + fight.meters.opponentStamina * 0.7);
    if (margin > -22) {
      const landedPosition = groundPositionFromMargin(margin, 'player');
      fight.grappling = {
        phase: 'ground',
        top: 'player',
        position: landedPosition,
        lastTransition: `Reversal: ${move.label} turns the hips and brings you up on top in ${GRAPPLING_POSITION_LABELS[landedPosition]}.`,
      };
      result.playerDamage = Math.max(1, Math.round(playerDamage * 0.45 + Math.max(0, margin) / 80 + 1));
      result.enemyDamage = Math.max(0, Math.round(enemyDamage * 0.35));
    } else {
      const better = betterGroundPosition(position);
      fight.grappling = {
        phase: 'ground',
        top: 'opponent',
        position: better,
        lastTransition: `Reversal denied: ${opponent.name} follows the hips and improves to ${GRAPPLING_POSITION_LABELS[better]}.`,
      };
      result.playerDamage = Math.max(0, Math.round(playerDamage * 0.18));
      result.enemyDamage = Math.max(1, Math.round(enemyDamage * 1.08));
    }
    result.text = fight.grappling.lastTransition;
    return result;
  }

  if (role === 'getUp') {
    const margin = (playerGrapplingSkill(life, 'getUp') + fight.meters.playerStamina * 1.4 + swing * 0.45) - (opponentGrapplingSkill(opponent, 'takedown') * positionBonus + fight.meters.opponentStamina * 0.72);
    if (margin > -35) {
      setStandingGrappling(fight, `Get up: ${move.label} creates space and resets the fight to standing.`);
      result.playerDamage = Math.max(0, Math.round(playerDamage * 0.12));
      result.enemyDamage = Math.max(0, Math.round(enemyDamage * 0.25));
    } else {
      const better = betterGroundPosition(position);
      fight.grappling = {
        phase: 'ground',
        top: 'opponent',
        position: better,
        lastTransition: `Get up denied: ${opponent.name} mat-returns the stand-up and climbs to ${GRAPPLING_POSITION_LABELS[better]}.`,
      };
      result.playerDamage = Math.max(0, Math.round(playerDamage * 0.12));
      result.enemyDamage = Math.max(1, Math.round(enemyDamage * 1.05));
    }
    result.text = fight.grappling.lastTransition;
  }

  return result;
}

function resolveEnemyGroundExchange({ life, opponent, fight, enemyMove, playerScore, enemyScore, enemyDamage }) {
  const grappling = normalizeGrapplingState(fight);
  const role = enemyMove.groundRole ?? 'takedown';
  const result = { enemyDamage, text: '' };
  if (role !== 'takedown' || grappling.phase === 'ground' || enemyScore <= playerScore + 75) return result;
  const landedPosition = groundPositionFromMargin(enemyScore - playerScore, 'opponent');
  fight.grappling = {
    phase: 'ground',
    top: 'opponent',
    position: landedPosition,
    lastTransition: `Enemy takedown: ${opponent.name}'s ${enemyMove.label} puts you underneath in ${GRAPPLING_POSITION_LABELS[landedPosition]}.`,
  };
  result.enemyDamage = Math.max(1, Math.round(enemyDamage * 1.08 + 2));
  result.text = fight.grappling.lastTransition;
  return result;
}

function resolveBottomConserveExchange({ life, opponent, fight, move, playerScore, enemyScore, swing, playerDamage, enemyDamage }) {
  const grappling = normalizeGrapplingState(fight);
  const position = grappling.position ?? 'halfGuard';
  const positionBonus = grapplingPositionBonus(position);
  const survivalScore = playerGrapplingSkill(life, 'getUp') + fight.meters.playerStamina * 1.3 + Math.max(0, playerScore - enemyScore) * 0.35;
  const topPressure = opponentGrapplingSkill(opponent, 'submission') * positionBonus + fight.meters.opponentStamina * 0.74 + Math.max(0, -swing) * 0.28;
  const margin = survivalScore - topPressure;
  const damageReduction = clampFloat(0.38 + Math.max(0, margin) / 420, 0.35, 0.78);
  const staminaRecovery = move.id === 'lockdownStall' ? 12 : move.id === 'closedGuardShell' ? 10 : 8;
  fight.meters.playerStamina = clamp(fight.meters.playerStamina + staminaRecovery, 0, fight.meters.maxPlayerStamina ?? 100);

  const result = {
    playerDamage: Math.max(0, Math.round(playerDamage * 0.12)),
    enemyDamage: Math.max(0, Math.round(enemyDamage * (1 - damageReduction))),
    text: '',
    forceHit: true,
  };

  if (margin > 52 && position !== 'closedGuard') {
    const safer = worseGroundPosition(position);
    fight.grappling = {
      phase: 'ground',
      top: 'opponent',
      position: safer,
      lastTransition: `Bottom survival: ${move.label} blunts the top attack and recovers to ${GRAPPLING_POSITION_LABELS[safer]}.`,
    };
  } else if (margin < -75) {
    const worseForPlayer = betterGroundPosition(position);
    fight.grappling = {
      phase: 'ground',
      top: 'opponent',
      position: worseForPlayer,
      lastTransition: `Bottom survival cracked: ${opponent.name} pressures through ${move.label} and climbs to ${GRAPPLING_POSITION_LABELS[worseForPlayer]}.`,
    };
    result.enemyDamage = Math.max(result.enemyDamage, Math.round(enemyDamage * 0.82));
  } else {
    fight.grappling = {
      ...grappling,
      lastTransition: `Bottom survival: ${move.label} slows the ground damage and buys you ${staminaRecovery} stamina.`,
    };
  }

  result.text = fight.grappling.lastTransition;
  return result;
}

function hunterMoveProfile(move, life) {
  const stats = getHunterEffectiveStats(life);
  const hunter = normalizeHunterWorld(life.hunterWorld);
  const shadowCount = hunter.shadowArmy.length;
  const shadowStrengthTotal = shadowArmyStrength(hunter);
  const shadowPower = shadowStrengthTotal * (8 + hunter.stats.intelligence * 0.6);
  const weaponUpgrade = hunter.equippedWeapon ? (hunter.itemUpgrades?.[hunter.equippedWeapon] ?? 0) : 0;
  const weaponDamageBonus = move.requiresWeapon ? weaponUpgrade * 14 : weaponUpgrade * 3;
  const profiles = {
    slash: {
      stat: stats.strength * 1.05 + stats.technique * 0.45 + stats.fightIq * 0.25 + hunter.level * 4,
      damageBonus: hunter.stats.strength * 2 + hunter.stats.sense + weaponDamageBonus,
      incomingReduction: 0,
    },
    dashStrike: {
      stat: stats.speed * 1.1 + stats.reflexes * 0.85 + stats.strength * 0.35 + hunter.level * 4,
      damageBonus: hunter.stats.agility * 2 + hunter.stats.strength + systemPerkValue(life, 'dashStrikePlus4') + weaponDamageBonus,
      incomingReduction: 0,
    },
    manaGuard: {
      stat: stats.durability * 0.95 + stats.willpower * 0.9 + stats.control * 0.5 + hunter.level * 4,
      damageBonus: 0,
      incomingReduction: 10 + hunter.stats.vitality * 2 + hunter.stats.intelligence + systemPerkValue(life, 'manaGuardPlus3'),
    },
    conserve: {
      stat: stats.durability * 0.92 + stats.willpower * 0.9 + stats.control * 0.52 + hunter.level * 4,
      damageBonus: 0,
      incomingReduction: 12,
    },
    analyzeWeakness: {
      stat: stats.fightIq * 1.1 + stats.control * 0.8 + stats.technique * 0.45 + hunter.level * 4,
      damageBonus: hunter.stats.sense + hunter.stats.intelligence + weaponDamageBonus,
      incomingReduction: 4 + hunter.stats.sense,
    },
    execute: {
      stat: stats.strength * 0.9 + stats.speed * 0.55 + stats.fightIq * 0.55 + hunter.level * 5,
      damageBonus: hunter.stats.strength * 2 + hunter.stats.sense * 2 + weaponDamageBonus,
      incomingReduction: 0,
    },
    abyssalLeech: {
      stat: stats.control * 1.05 + stats.willpower * 0.85 + stats.fightIq * 0.55 + hunter.stats.intelligence * 5 + hunter.level * 5,
      damageBonus: hunter.stats.intelligence * 4 + hunter.stats.sense * 2 + shadowStrengthTotal * 6,
      incomingReduction: 2 + hunter.stats.vitality,
    },
    shadowPierce: {
      stat: stats.reflexes * 0.95 + stats.speed * 0.75 + stats.technique * 0.45 + hunter.level * 5,
      damageBonus: hunter.stats.sense * 3 + hunter.stats.agility * 2 + weaponDamageBonus,
      incomingReduction: 1 + hunter.stats.sense,
    },
    manaRend: {
      stat: stats.strength * 1.05 + stats.control * 0.7 + stats.fightIq * 0.35 + hunter.level * 6,
      damageBonus: hunter.stats.strength * 3 + hunter.stats.intelligence * 3 + weaponDamageBonus,
      incomingReduction: 0,
    },
    reapingArc: {
      stat: stats.strength * 0.85 + stats.speed * 0.5 + stats.fightIq * 0.7 + hunter.level * 7,
      damageBonus: hunter.stats.strength * 2 + hunter.stats.sense * 3 + hunter.stats.intelligence * 2 + weaponDamageBonus,
      incomingReduction: 0,
    },
    monarchCommand: {
      stat: stats.control * 1.15 + stats.fightIq * 0.8 + shadowPower + hunter.level * 7,
      damageBonus: shadowPower * 0.35 + hunter.stats.intelligence * 5 + hunter.stats.sense * 3,
      incomingReduction: 8 + shadowCount * 3,
    },
    abyssalDomain: {
      stat: stats.willpower * 1.05 + stats.control * 0.85 + shadowPower * 0.75 + hunter.level * 8,
      damageBonus: shadowPower * 0.55 + hunter.stats.strength * 3 + hunter.stats.intelligence * 4,
      incomingReduction: 14 + hunter.stats.vitality * 2 + shadowStrengthTotal,
    },
  };
  const profile = profiles[move.id] ?? profiles.slash;
  if (!hunter.shadowMonarch.unlocked || !SHADOW_MONARCH_SKILL_EVOLUTIONS[move.id]) return profile;
  const instinctMultiplier = hasSystemPerk(life, 'monarchsInstinct') ? 1 + systemPerkValue(life, 'monarchsInstinct') : 1;
  return {
    ...profile,
    stat: (profile.stat * 1.18 + shadowPower * 0.15) * instinctMultiplier,
    damageBonus: profile.damageBonus + 28 + shadowStrengthTotal * 2 + (instinctMultiplier > 1 ? 22 : 0),
    incomingReduction: profile.incomingReduction + 6 + (instinctMultiplier > 1 ? 4 : 0),
  };
}

function takeHunterQuestTurn(life, moveId = 'slash') {
  const move = HUNTER_MOVES[moveId] ? { id: moveId, ...HUNTER_MOVES[moveId] } : { id: 'slash', ...HUNTER_MOVES.slash };
  const disabledReason = hunterMoveDisabledReason(life, move);
  if (disabledReason) return addLog(life, disabledReason, 'world');

  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const fight = next.activeFight;
  const opponent = getCombatOpponent(next, fight.opponentId);
  const stats = getHunterEffectiveStats(next);
  const opponentStats = getOpponentStats(opponent);
  fight.hunterPerkState = fight.hunterPerkState ?? {};
  const perkState = fight.hunterPerkState;
  const previousHunterExchange = fight.exchanges?.[0] ?? null;
  const isBasicMove = move.moveType === 'basic';
  const isAttackMove = move.id !== 'conserve' && move.id !== 'manaGuard';
  const bossMonster = Boolean(opponent?.threat?.includes('Boss') || opponent?.threat?.includes('Monarch'));
  const shadowLinkedSkill = ['abyssalLeech', 'monarchCommand', 'abyssalDomain'].includes(move.id)
    || Boolean(SHADOW_MONARCH_SKILL_EVOLUTIONS[move.id])
    || Boolean(move.requiresShadowMonarch);
  const footworkActive = hasSystemPerk(next, 'perfectFootwork') && perkState.perfectFootworkWindow;
  if (footworkActive) perkState.perfectFootworkWindow = false;
  const limitBreakActive = hasSystemPerk(next, 'limitBreakProtocol')
    && !perkState.limitBreakUsed
    && healthPercent(fight.meters.playerHealth, fight.meters.maxPlayerHealth ?? 100) <= 25;
  if (limitBreakActive) perkState.limitBreakUsed = true;
  if (isBasicMove && hasSystemPerk(next, 'predatorRhythm')) {
    perkState.predatorRhythmStacks = previousHunterExchange?.moveId && previousHunterExchange.moveId !== move.id
      ? clamp((perkState.predatorRhythmStacks ?? 0) + 1, 0, systemPerkCount(next, 'predatorRhythm'))
      : 0;
  }
  const rhythmStacks = perkState.predatorRhythmStacks ?? 0;
  const fractureActive = move.id === 'execute' && hasSystemPerk(next, 'fractureMark') && perkState.fractureMark;
  const executionWindowActive = move.id === 'execute'
    && hasSystemPerk(next, 'executionWindow')
    && (previousHunterExchange?.dodged || (previousHunterExchange?.swing ?? 0) >= 38);
  if (fractureActive) perkState.fractureMark = false;
  const profile = hunterMoveProfile(move, next);
  const enemyMove = chooseHunterMonsterMove(opponent, fight);
  const staminaCost = hunterMoveStaminaCost(next, move);
  const staminaRequired = staminaCost === 0 ? 0 : Math.max(1, staminaCost - 4);
  const desperationSlash = move.id === 'slash' && move.moveType === 'basic' && (fight.meters.playerStamina ?? 0) < staminaRequired;
  const specialStaminaDiscount = move.moveType === 'special' ? systemPerkValue(next, 'specialStaminaMinus2') : 0;
  const executeCooldownReduction = move.id === 'execute' ? systemPerkValue(next, 'executeCooldownMinus1') : 0;
  const opponentTactic = enemyMove.category;
  const enemyScore = opponentScore(opponent, opponentTactic, visibleFightRound(fight)) + enemyMove.scoreBonus + fight.meters.opponentStamina * 0.22 - (footworkActive ? 18 : 0);
  const analyzeBonus = fight.systemAnalysis ? 18 + next.hunterWorld.stats.sense * 2 : 0;
  const playerScore = profile.stat + fight.meters.playerStamina * 0.28 + fight.meters.momentum * 0.5 + analyzeBonus + (limitBreakActive ? 35 : 0);
  const swing = playerScore - enemyScore;
  const hurtPercent = 100 - healthPercent(fight.meters.opponentHealth, fight.meters.maxOpponentHealth ?? 100);
  const monarchExecutionActive = move.id === 'execute' && hasSystemPerk(next, 'monarchExecution') && hurtPercent >= 65;
  const executeBonus = move.id === 'execute'
    ? Math.round(hurtPercent / 4)
      + (monarchExecutionActive ? Math.round((fight.meters.maxOpponentHealth ?? 100) * 0.18) : 0)
      + (fractureActive ? Math.round((fight.meters.maxOpponentHealth ?? 100) * systemPerkValue(next, 'fractureMark')) : 0)
      + (executionWindowActive ? Math.round((fight.meters.maxOpponentHealth ?? 100) * systemPerkValue(next, 'executionWindow')) : 0)
    : 0;
  const opponentDefense = opponentStats.durability * 0.02 + opponentStats.willpower * 0.014 + fight.meters.opponentStamina * 0.018;
  const basicDamageMultiplier = move.moveType === 'basic' ? 1 + systemPerkValue(next, 'basicDamagePlus5') : 1;
  const weaponDamageMultiplier = move.category === 'weapon' ? 1 + systemPerkValue(next, 'weaponSkillPlus10') : 1;
  const overclockBonus = move.moveType === 'basic' && hasSystemPerk(next, 'systemOverclock') ? 12 : 0;
  const dashStrikeBonus = move.id === 'dashStrike' ? systemPerkValue(next, 'dashStrikePlus4') : 0;
  const manaGuardBonus = move.id === 'manaGuard' ? systemPerkValue(next, 'manaGuardPlus3') : 0;
  const rhythmMultiplier = 1 + rhythmStacks * systemPerkValue(next, 'predatorRhythm');
  const bloodScentMultiplier = hasSystemPerk(next, 'bloodScent') && isAttackMove && hurtPercent >= 65 ? 1 + systemPerkValue(next, 'bloodScent') : 1;
  const coreSightMultiplier = hasSystemPerk(next, 'coreSight') && bossMonster && fight.systemAnalysis && move.id !== 'analyzeWeakness' ? 1 + systemPerkValue(next, 'coreSight') : 1;
  const limitBreakMultiplier = limitBreakActive ? 1.25 : 1;
  const shadowPressureActive = shadowLinkedSkill && next.hunterWorld.shadowArmy.length > 0 && hasSystemPerk(next, 'shadowDamagePlus8');
  const shadowPressureMultiplier = shadowPressureActive ? 1 + systemPerkValue(next, 'shadowDamagePlus8') : 1;
  const rulersAuthorityActive = shadowLinkedSkill && next.hunterWorld.shadowArmy.length > 0 && hasSystemPerk(next, 'rulersAuthority');
  const rulersAuthorityBonus = rulersAuthorityActive
    ? Math.max(8, Math.round(shadowArmyStrength(next.hunterWorld) * 0.35 + next.hunterWorld.stats.intelligence * 1.5))
    : 0;
  const monarchInstinctActive = hasSystemPerk(next, 'monarchsInstinct') && next.hunterWorld.shadowMonarch.unlocked && (SHADOW_MONARCH_SKILL_EVOLUTIONS[move.id] || move.requiresShadowMonarch);
  const monarchInstinctMultiplier = monarchInstinctActive ? 1 + systemPerkValue(next, 'monarchsInstinct') : 1;
  const desperationMultiplier = desperationSlash ? 0.42 : 1;
  const basePlayerDamage = Math.max(1, Math.round(desperationMultiplier * basicDamageMultiplier * weaponDamageMultiplier * rhythmMultiplier * bloodScentMultiplier * coreSightMultiplier * limitBreakMultiplier * shadowPressureMultiplier * monarchInstinctMultiplier * (move.damageBias * (8 + Math.max(0, swing) / 48) + profile.damageBonus + executeBonus + overclockBonus + rulersAuthorityBonus - opponentDefense)));
  const criticalChance = move.id === 'conserve'
    ? 0
    : clampFloat(0.05 + next.hunterWorld.stats.sense * 0.008 + next.hunterWorld.stats.intelligence * 0.004 + (fight.systemAnalysis ? systemPerkValue(next, 'analysisCritPlus3') : 0), 0.05, 0.57);
  const criticalRoll = deterministicRoll(next.rngSeed, fight.opponentId, fight.round, move.id, fight.exchanges.length, 'hunter-crit');
  const critical = criticalRoll < criticalChance;
  let playerDamage = move.id === 'conserve' ? 0 : critical ? Math.round(basePlayerDamage * 1.55 + 5) : basePlayerDamage;
  const monsterDamage = incomingDamage(next, opponent, opponentTactic, { damageBias: 1, guardBias: move.guardBias }, fight, -swing);
  const baseEnemyDamage = Math.max(1, Math.round(monsterDamage * (enemyMove.damageMultiplier ?? 1) + opponentStats.aggression / 70 - profile.incomingReduction));
  const dodgeChance = clampFloat(0.04 + stats.speed * 0.0008 + stats.reflexes * 0.00055 + (move.id === 'dashStrike' ? 0.08 : 0) + (footworkActive ? systemPerkValue(next, 'perfectFootwork') : 0), 0.03, footworkActive ? 0.62 : 0.38);
  const dodged = deterministicRoll(next.rngSeed, fight.opponentId, fight.round, move.id, 'hunter-dodge') < dodgeChance;
  let enemyDamage = dodged ? 0 : baseEnemyDamage;
  const blackFlash = hasSystemPerk(next, 'blackFlash') && isBasicMove && move.id !== 'conserve'
    && deterministicRoll(next.rngSeed, fight.opponentId, fight.round, move.id, fight.exchanges.length, 'black-flash') < systemPerkValue(next, 'blackFlash');
  if (blackFlash) playerDamage = Math.round(playerDamage * 1.85 + 12);

  tickHunterMoveCooldowns(fight);
  const appliedCooldown = move.moveType === 'special' ? hunterSpecialCooldown(next, move) : 0;
  if (move.moveType === 'special') fight.moveCooldowns[move.id] = appliedCooldown;
  if (monarchInstinctActive && move.moveType === 'special' && fight.moveCooldowns[move.id]) {
    fight.moveCooldowns[move.id] = Math.max(1, fight.moveCooldowns[move.id] - 1);
  }
  const afterimageChain = hasSystemPerk(next, 'afterimageChain') && move.id === 'dashStrike'
    && deterministicRoll(next.rngSeed, fight.opponentId, fight.round, move.id, fight.exchanges.length, 'afterimage-chain') < 0.38;
  if (afterimageChain) {
    for (const [id, cooldown] of Object.entries(fight.moveCooldowns ?? {})) {
      const remaining = Math.max(0, cooldown - systemPerkValue(next, 'afterimageChain'));
      if (remaining) fight.moveCooldowns[id] = remaining;
      else delete fight.moveCooldowns[id];
    }
  }
  const analysisFollowUpActive = Boolean(fight.systemAnalysis) && move.id !== 'analyzeWeakness';
  const analysisCritBonus = analysisFollowUpActive ? systemPerkValue(next, 'analysisCritPlus3') : 0;
  fight.systemAnalysis = move.id === 'analyzeWeakness';
  const conserveBonus = systemPerkValue(next, 'conservePlus6');
  const conserveGain = 18 + conserveBonus;
  const guardRecovery = move.id === 'manaGuard' && hasSystemPerk(next, 'absoluteGuard') ? 8 : 0;
  const manaThreadingRefund = move.id === 'manaGuard' && hasSystemPerk(next, 'manaThreading') && baseEnemyDamage > enemyDamage && baseEnemyDamage >= 8
    ? systemPerkValue(next, 'manaThreading')
    : 0;
  const limitBreakStamina = limitBreakActive ? 22 : 0;
  fight.meters.playerStamina = move.id === 'conserve'
    ? clamp(fight.meters.playerStamina + conserveGain + limitBreakStamina, 0, fight.meters.maxPlayerStamina ?? 100)
    : clamp(fight.meters.playerStamina - staminaCost + (move.id === 'manaGuard' ? 6 + guardRecovery + manaThreadingRefund : 0) + limitBreakStamina, 0, fight.meters.maxPlayerStamina ?? 100);
  fight.meters.opponentStamina = clamp(fight.meters.opponentStamina - Math.max(5, Math.round(playerDamage / 3)) - (move.id === 'analyzeWeakness' ? 8 : 0) - (monarchInstinctActive ? 12 : 0), 0, fight.meters.maxOpponentStamina ?? 100);
  fight.meters.playerHealth = clamp(fight.meters.playerHealth - enemyDamage, 0, fight.meters.maxPlayerHealth ?? 100);
  fight.meters.opponentHealth = clamp(fight.meters.opponentHealth - playerDamage, 0, fight.meters.maxOpponentHealth ?? 100);
  const lifeSteal = move.id === 'abyssalLeech' ? Math.max(1, Math.round(playerDamage * 0.32 + next.hunterWorld.stats.intelligence * 0.8)) : 0;
  if (lifeSteal) fight.meters.playerHealth = clamp(fight.meters.playerHealth + lifeSteal, 0, fight.meters.maxPlayerHealth ?? 100);
  const vitalPulseHeal = move.id === 'conserve' && hasSystemPerk(next, 'vitalPulse') && healthPercent(fight.meters.playerHealth, fight.meters.maxPlayerHealth ?? 100) <= 50
    ? Math.max(1, Math.round((fight.meters.maxPlayerHealth ?? 100) * systemPerkValue(next, 'vitalPulse')))
    : 0;
  if (vitalPulseHeal) fight.meters.playerHealth = clamp(fight.meters.playerHealth + vitalPulseHeal, 0, fight.meters.maxPlayerHealth ?? 100);
  if (hasSystemPerk(next, 'perfectFootwork') && move.id === 'dashStrike') perkState.perfectFootworkWindow = true;
  if (hasSystemPerk(next, 'fractureMark') && move.id === 'analyzeWeakness') perkState.fractureMark = true;
  fight.meters.guard = clamp(fight.meters.guard + move.guardBias, 0, 100);
  fight.meters.momentum = clamp(fight.meters.momentum + Math.round(swing / 8), -50, 50);
  const injuryDefense = stats.durability * 0.014 + stats.flexibility * 0.012 + stats.control * 0.01 + stats.willpower * 0.01;
  const playerDamagePercent = 100 - healthPercent(fight.meters.playerHealth, fight.meters.maxPlayerHealth ?? 100);
  fight.meters.injuryRisk = clamp(opponent.risk + playerDamagePercent / 8 - injuryDefense, 0, 100);
  const combatInjury = combatInjuryForExchange(next, opponentTactic, enemyDamage, fight, enemyMove);
  if (combatInjury) addOrUpgradeInjury(next, combatInjury);

  const monsterLine = dodged
    ? `${opponent.name}'s ${enemyMove.label} misses as the System-assisted movement pulls you off the line.`
    : `${opponent.name} answers with ${enemyMove.label} for ${enemyDamage} damage.`;
  const analysisLine = move.id === 'analyzeWeakness'
    ? ' Next exchange gains a System analysis bonus.'
    : analysisFollowUpActive
      ? ' The previous analysis turns one monster habit into a target.'
      : '';
  const perkLine = [
    move.id === 'conserve' ? ` Conserve recovery: +${conserveGain} mana.${conserveBonus ? ` Conserve Mastery added ${conserveBonus}.` : ''}` : '',
    isBasicMove && isAttackMove && basicDamageMultiplier > 1 ? ` Basic Damage active: +${Math.round((basicDamageMultiplier - 1) * 100)}%.` : '',
    move.moveType === 'special' && specialStaminaDiscount ? ` Special Efficiency reduced the stamina cost by ${specialStaminaDiscount}.` : '',
    executeCooldownReduction ? ` Execute Cooldown reduced the cooldown by ${executeCooldownReduction}.` : '',
    dashStrikeBonus ? ` Dash Strike Mastery added ${dashStrikeBonus} damage.` : '',
    manaGuardBonus ? ` Mana Guard Mastery added ${manaGuardBonus} damage reduction.` : '',
    analysisCritBonus ? ` Analysis Crit pressure: +${Math.round(analysisCritBonus * 100)}% crit/read chance.` : '',
    weaponDamageMultiplier > 1 ? ` Weapon Skill Damage active: +${Math.round((weaponDamageMultiplier - 1) * 100)}%.` : '',
    overclockBonus ? ` System Overclock added ${overclockBonus} damage.` : '',
    shadowPressureActive ? ` Shadow Pressure amplified the shadow skill by ${Math.round((shadowPressureMultiplier - 1) * 100)}%.` : '',
    rulersAuthorityActive ? ` Ruler's Authority added ${rulersAuthorityBonus} command damage.` : '',
    lifeSteal ? ` Abyssal Leech restored ${lifeSteal} health.` : '',
    guardRecovery ? ` Absolute Guard recovery: +${guardRecovery} mana.` : '',
    manaThreadingRefund ? ` Mana Threading refunded ${manaThreadingRefund} stamina.` : '',
    vitalPulseHeal ? ` Vital Pulse restored ${vitalPulseHeal} health.` : '',
    footworkActive ? ' Perfect Footwork blurred the monster timing.' : '',
    rhythmStacks ? ` Predator Rhythm x${rhythmStacks}.` : '',
    fractureActive ? ' Fracture Mark detonated through Execute.' : '',
    monarchExecutionActive ? ' Monarch Execution crushed the wounded monster.' : '',
    afterimageChain ? ' Afterimage Chain cut special cooldowns.' : '',
    bloodScentMultiplier > 1 ? ' Blood Scent amplified the wounded-target hit.' : '',
    coreSightMultiplier > 1 ? ' Core Sight exposed the boss core.' : '',
    blackFlash ? ' Black Flash: a black System spark erupts on impact.' : '',
    limitBreakActive ? ' Limit Break Protocol restored emergency stamina.' : '',
    executionWindowActive ? ' Execution Window opened after the monster was outread.' : '',
    monarchInstinctActive ? " Monarch's Instinct adds black-violet pressure." : '',
    desperationSlash ? ' Desperation Slash: low mana weakens the hit, but the System still lets you swing.' : '',
    appliedCooldown ? ` Cooldown set: ${appliedCooldown} exchange${appliedCooldown === 1 ? '' : 's'}.` : '',
  ].join('');
  fight.exchanges.unshift({
    round: fight.round,
    tactic: move.category,
    moveId: move.id,
    tacticLabel: move.label,
    opponentTactic,
    opponentTacticLabel: tacticLabel(opponentTactic),
    opponentMoveId: enemyMove.id,
    opponentMoveLabel: enemyMove.label,
    opponentMoveText: enemyMove.text,
    text: `Exchange ${fight.round} - ${move.label}: ${move.text} ${monsterLine} Damage: You dealt ${playerDamage}. You took ${enemyDamage}.${critical ? ' Critical System hit.' : ''}${analysisLine}${perkLine}`,
    playerDamage,
    basePlayerDamage,
    enemyDamage,
    baseEnemyDamage,
    swing,
    critical,
    criticalChance,
    enemyCritical: false,
    enemyCriticalChance: 0,
    opponentDodged: false,
    opponentDodgeChance: 0,
    dodged,
    dodgeChance,
    weakMoveHit: false,
    momentum: fight.meters.momentum,
  });

  if (fight.meters.playerHealth <= 0) {
    return endFatalHunterFight(next, fight, opponent);
  }
  const finished = fight.meters.playerHealth <= 0 || fight.meters.opponentHealth <= 0;
  if (finished) {
    finishActiveFight(next);
    return next;
  }
  fight.round += 1;
  return next;
}

export function takeFightTurn(life, tactic = 'pressure') {
  if (!life.activeFight || life.activeFight.finished) return life;
  if (life.activeFight.source === 'hunterQuest' || life.activeFight.source === 'hunterDungeon') return takeHunterQuestTurn(life, tactic);
  life = withNormalizedClanAwakening(life);
  const opponent = getCombatOpponent(life, life.activeFight.opponentId);
  if (!opponent) return life;
  const existingGrappling = normalizeGrapplingState(life.activeFight);
  const requestedMove = resolveFightMove(life, tactic);
  const disabledReason = fightMoveDisabledReason(life, requestedMove);
  if (disabledReason) return addLog(life, disabledReason, 'fight');

  const next = clone(life);
  const fight = next.activeFight;
  const move = resolveFightMove(next, tactic);
  const combatLife = withPlayerCombatStats(next);
  const combatStats = combatLife.stats;
  const previousOptimalMove = fight.optimalMove ? clone(fight.optimalMove) : null;
  const optimalBoost = optimalBoostForMove(previousOptimalMove, move, combatLife);
  tactic = move.category;
  const injuryEffects = activeInjuryEffects(next, tactic);
  const profile = tacticProfile(move.id, combatLife);
  const fightRound = visibleFightRound(fight);
  let opponentTactic = opponentIntent(opponent, fightRound);
  if (existingGrappling.phase === 'ground') opponentTactic = 'grapple';
  const enemyMove = chooseEnemyFightMove(opponent, opponentTactic, fight);
  const passive = clanCombatModifier(combatLife, tactic, opponentTactic, fight);
  const special = clanSpecialModifier(combatLife, tactic, fight);
  const matchup = matchupModifier(tactic, opponentTactic);
  const weakMove = weakMoveForOpponent(opponent);
  const weakMoveHit = move.id === weakMove.id;
  const weakMoveBonus = weakMoveHit ? 18 : 0;
  const opponentStats = getOpponentStats(opponent);
  const fightIqReadBonus = combatStats.fightIq * 0.08 + Math.max(0, combatStats.fightIq - opponentStats.fightIq) * 0.04;
  const enemyFightIqReadBonus = opponentStats.fightIq * 0.055 + Math.max(0, opponentStats.fightIq - combatStats.fightIq) * 0.035;
  const playerScore = profile.stat + fightIqReadBonus + fight.meters.playerStamina * 0.35 + fight.meters.momentum * 0.5 + matchup + weakMoveBonus + passive.scoreBonus + special.scoreBonus + optimalBoost.scoreBonus - injuryEffects.scorePenalty;
  const enemyScore = opponentScore(opponent, opponentTactic, fightRound) + enemyMove.scoreBonus + enemyFightIqReadBonus + fight.meters.opponentStamina * 0.25 - fight.meters.guard * 0.12;
  const swing = playerScore - enemyScore;
  const precisionDamage = tactic === 'counter'
    ? (combatStats.fightIq + combatStats.reflexes) / 90
    : tactic === 'grapple'
      ? (combatStats.flexibility + combatStats.technique) / 95
      : tactic === 'pressure'
        ? combatStats.aggression / 95
        : tactic === 'special'
          ? (combatStats.willpower + combatStats.aggression) / 110
          : 0;
  const opponentDefense =
    opponentStats.durability * 0.026 +
    opponentStats.willpower * 0.018 +
    opponentStats.control * 0.018 +
    fight.meters.opponentStamina * 0.025;
  const weakDefensePierce = weakMoveHit ? opponentDefense * (opponent.tier === 'Special Fight' ? 0.45 : 0.3) : 0;
  const weakVitalDamage = weakMoveHit ? Math.round((fight.meters.maxOpponentHealth ?? 100) * (opponent.tier === 'Special Fight' ? 0.035 : 0.02)) : 0;
  const effectiveOpponentDefense = Math.max(0, opponentDefense - weakDefensePierce);
  const calculatedPlayerDamage = Math.round((profile.damageBias * (8 + Math.max(0, swing) / 55)) + precisionDamage + weakVitalDamage + passive.damageBonus + special.damageBonus + optimalBoost.damageBonus - effectiveOpponentDefense);
  const weakDamageFloor = weakMoveHit
    ? clamp(Math.round((fight.meters.maxOpponentHealth ?? 100) * (opponent.tier === 'Special Fight' ? 0.045 : 0.025)), opponent.tier === 'Special Fight' ? 12 : 5, opponent.tier === 'Special Fight' ? 42 : 18)
    : 1;
  const basePlayerDamage = Math.max(1, weakDamageFloor, calculatedPlayerDamage);
  const criticalChance = clampFloat(0.04 + combatStats.technique * 0.00055 + combatStats.fightIq * 0.00012, 0.04, 0.42);
  const criticalRoll = deterministicRoll(next.rngSeed, fight.opponentId, fight.round, tactic, opponentTactic, fight.exchanges.length, 'player-crit');
  const critical = criticalRoll < criticalChance;
  const rawPlayerDamageBeforeInjury = critical ? Math.round(basePlayerDamage * 1.55 + 4) : basePlayerDamage;
  const rawPlayerDamage = Math.max(1, Math.round(rawPlayerDamageBeforeInjury * injuryEffects.damageMultiplier));
  const baseEnemyDamage = Math.max(1, incomingDamage(combatLife, opponent, opponentTactic, profile, fight, swing) + Math.round(enemyFightIqReadBonus / 18) - passive.incomingReduction - special.incomingReduction - optimalBoost.incomingReduction);
  const enemyCriticalChance = clampFloat(0.03 + opponentStats.technique * 0.00028 + opponentStats.fightIq * 0.00008, 0.03, opponent.tier === 'Special Fight' ? 0.34 : 0.28);
  const enemyCriticalRoll = deterministicRoll(next.rngSeed, fight.opponentId, fight.round, tactic, opponentTactic, fight.exchanges.length, 'enemy-crit');
  const enemyCritical = enemyCriticalRoll < enemyCriticalChance;
  const enemyMoveDamage = Math.max(1, Math.round(baseEnemyDamage * (enemyMove.damageMultiplier ?? 1)));
  const rawEnemyDamageBeforeInjury = enemyCritical ? Math.round(enemyMoveDamage * 1.35 + 3) : enemyMoveDamage;
  const rawEnemyDamage = Math.max(1, Math.round(rawEnemyDamageBeforeInjury * injuryEffects.incomingMultiplier) + injuryEffects.incomingFlat);
  let opponentDodge = opponentDodgeResult(combatLife, opponent, tactic, opponentTactic, fight, swing);
  let playerDamage = opponentDodge.dodged ? 0 : rawPlayerDamage;
  const dodge = dodgeResult(combatLife, opponent, tactic, opponentTactic, fight, swing, injuryEffects);
  let enemyDamage = dodge.dodged ? 0 : rawEnemyDamage;
  const staminaCost = profile.staminaCost + passive.staminaCostDelta + optimalBoost.staminaCostDelta + (tactic === 'special' && getRarity(next.clan.rarity).name === 'Common' ? 6 : 0);
  const guardGain = profile.guardBias + optimalBoost.guardGain + (profile.guardBias > 0 ? Math.floor((combatStats.control + combatStats.willpower) / 120) : 0);
  let groundTransition = '';
  let submissionFinishChance = 0;
  let submissionFinished = false;

  if (tactic === 'grapple') {
    const groundResult = resolveGroundExchange({
      life: combatLife,
      opponent,
      fight,
      move,
      enemyMove,
      playerScore,
      enemyScore,
      swing,
      playerDamage,
      enemyDamage,
      opponentDodged: opponentDodge.dodged,
    });
    playerDamage = groundResult.playerDamage;
    enemyDamage = groundResult.enemyDamage;
    groundTransition = groundResult.text;
    submissionFinishChance = groundResult.submissionFinishChance;
    submissionFinished = groundResult.submissionFinished;
    if (groundResult.forceHit) {
      opponentDodge = { ...opponentDodge, dodged: false };
    }
  } else if (tactic === 'conserve' && existingGrappling.phase === 'ground' && existingGrappling.top === 'opponent' && move.groundRole === 'bottomConserve') {
    const groundResult = resolveBottomConserveExchange({
      life: combatLife,
      opponent,
      fight,
      move,
      playerScore,
      enemyScore,
      swing,
      playerDamage,
      enemyDamage,
    });
    playerDamage = groundResult.playerDamage;
    enemyDamage = groundResult.enemyDamage;
    groundTransition = groundResult.text;
    opponentDodge = { ...opponentDodge, dodged: false };
  } else if (opponentTactic === 'grapple') {
    const groundResult = resolveEnemyGroundExchange({
      life: combatLife,
      opponent,
      fight,
      enemyMove,
      playerScore,
      enemyScore,
      enemyDamage,
    });
    enemyDamage = groundResult.enemyDamage;
    groundTransition = groundResult.text;
  }

  for (const [id, cooldown] of Object.entries(fight.moveCooldowns ?? {})) {
    const remaining = Math.max(0, cooldown - 1);
    if (remaining) fight.moveCooldowns[id] = remaining;
    else delete fight.moveCooldowns[id];
  }
  fight.moveCooldowns[move.id] = tactic === 'special' ? 2 : 1;
  if (tactic === 'special') fight.specialCharges = Math.max(0, (fight.specialCharges ?? 1) - 1);
  if (tactic === 'special' && isMishimeClan(next.clan) && (next.clanAwakening?.stage ?? 0) >= 3) {
    next.clanAwakening = {
      ...next.clanAwakening,
      corruption: clamp((next.clanAwakening.corruption ?? 0) + 8),
    };
    next.world = {
      ...next.world,
      heat: clamp((next.world?.heat ?? 0) + 6, 0, 100),
    };
  }

  fight.meters.playerStamina = clamp(fight.meters.playerStamina - staminaCost, 0, fight.meters.maxPlayerStamina ?? 100);
  fight.meters.opponentStamina = clamp(fight.meters.opponentStamina - (tactic === 'grapple' ? 16 : 9) - (weakMoveHit ? 5 : 0) - passive.opponentStaminaDamage - optimalBoost.opponentStaminaDamage - (enemyMove.staminaCost ?? 0), 0, fight.meters.maxOpponentStamina ?? 100);
  fight.meters.playerHealth = clamp(fight.meters.playerHealth - enemyDamage, 0, fight.meters.maxPlayerHealth ?? 100);
  fight.meters.opponentHealth = clamp(fight.meters.opponentHealth - playerDamage, 0, fight.meters.maxOpponentHealth ?? 100);
  if (submissionFinished) fight.meters.opponentHealth = 0;
  fight.meters.guard = clamp(fight.meters.guard + guardGain - (opponentTactic === 'pressure' ? 5 : 0), 0, 100);
  fight.meters.momentum = clamp(fight.meters.momentum + Math.round(swing / 7), -50, 50);
  const injuryDefense = combatStats.durability * 0.018 + combatStats.flexibility * 0.016 + combatStats.control * 0.012 + combatStats.willpower * 0.01;
  const playerDamagePercent = 100 - healthPercent(fight.meters.playerHealth, fight.meters.maxPlayerHealth ?? 100);
  fight.meters.injuryRisk = clamp(opponent.risk + playerDamagePercent / 7 + (tactic === 'special' ? 3 : 0) + injuryEffects.injuryRiskBonus - injuryDefense, 0, 100);
  const combatInjury = combatInjuryForExchange(next, opponentTactic, enemyDamage, fight, enemyMove);
  if (combatInjury) addOrUpgradeInjury(next, combatInjury);
  const nextOptimalMove = chooseOptimalMove(combatLife, opponent, fight);
  fight.optimalMove = nextOptimalMove;

  const exchangeText = narrateExchange({
    life: combatLife,
    opponent,
    profile,
    tactic,
    opponentTactic,
    enemyMove,
    swing,
    playerDamage,
    enemyDamage,
    opponentDodged: opponentDodge.dodged,
    opponentDodgeChance: opponentDodge.chance,
    dodged: dodge.dodged,
    dodgeChance: dodge.chance,
    critical: critical && !opponentDodge.dodged,
    enemyCritical: enemyCritical && !dodge.dodged,
    passiveText: passive.text,
    specialBoosts: special.specialBoosts,
    weakMoveHit,
    optimalBoost,
    nextOptimalMove,
    groundTransition,
    injuryEffects,
    combatInjury,
    fight,
  });

  fight.exchanges.unshift({
    round: fight.round,
    tactic,
    moveId: move.id,
    tacticLabel: profile.label,
    opponentTactic,
    opponentTacticLabel: tacticLabel(opponentTactic),
    opponentMoveId: enemyMove.id,
    opponentMoveLabel: enemyMove.label,
    opponentMoveText: enemyMove.text,
    text: exchangeText,
    playerDamage,
    basePlayerDamage,
    enemyDamage,
    baseEnemyDamage,
    swing,
    fightIqReadBonus,
    enemyFightIqReadBonus,
    critical: critical && !opponentDodge.dodged,
    reactionQuality: damageQuality(playerDamage, fight, critical && !opponentDodge.dodged, opponentDodge.dodged),
    criticalChance,
    enemyCritical: enemyCritical && !dodge.dodged,
    enemyCriticalChance,
    opponentDodged: opponentDodge.dodged,
    opponentDodgeChance: opponentDodge.chance,
    dodged: dodge.dodged,
    dodgeChance: dodge.chance,
    weakMoveHit,
    groundTransition,
    submissionFinishChance,
    submissionFinished,
    injuryEffects: injuryEffects.names,
    combatInjury,
    optimalMoveHit: optimalBoost.active,
    optimalBoost: optimalBoost.active ? optimalBoost.label : '',
    previousOptimalMove,
    nextOptimalMove,
    specialBoosts: special.specialBoosts,
    passiveText: passive.text,
    momentum: fight.meters.momentum,
  });

  const finished = fight.round >= fight.maxRounds || fight.meters.playerHealth <= 0 || fight.meters.opponentHealth <= 0;
  if (finished) {
    finishActiveFight(next);
    if (fight.source === 'hunterQuest') return next;
    return queueTriggeredEvents(next, 'fight', { opponentId: fight.opponentId, won: fight.result?.won });
  }

  fight.round += 1;
  return next;
}

function narrateExchange({ life, opponent, profile, tactic, opponentTactic, enemyMove, swing, playerDamage, enemyDamage, opponentDodged, opponentDodgeChance, dodged, dodgeChance, critical, enemyCritical, passiveText, specialBoosts, weakMoveHit, optimalBoost, nextOptimalMove, groundTransition, injuryEffects, combatInjury, fight }) {
  const finish = fight.meters.opponentHealth <= 0;
  const opening = finish
    ? exchangeVariant(profile.finish, fight, tactic, opponentTactic)
    : exchangeVariant(profile.text, fight, tactic, opponentTactic);
  const opponentLabel = enemyMove?.label ?? tacticLabel(opponentTactic);
  const enemyAttackLine = enemyActionLine({ opponent, enemyMove, opponentLabel, dodged });
  const reaction = opponentReaction(opponent, tactic, opponentTactic, swing, fight, profile, weakMoveHit, finish, playerDamage, critical, opponentDodged);
  const outcome = finish
    ? `Finish: ${opponent.name} takes ${playerDamage} damage and cannot continue.`
    : swing >= 18
    ? `Clean exchange: ${opponent.name} loses ${playerDamage} health after you win the timing and angle.`
    : swing >= 0
      ? `Close exchange: you deal ${playerDamage} damage but still take ${enemyDamage} on the return.`
      : `Late read: ${opponent.name}'s ${opponentLabel} wins the timing and deals ${enemyDamage} damage.`;
  const damageLine = ` Damage: You dealt ${playerDamage}. You took ${enemyDamage}.`;
  const groundLine = groundTransition
    ? ` Ground: ${groundTransition}`
    : '';
  const dodgeLine = dodgeNarration({ opponent, enemyMove, dodged, dodgeChance });
  const playerReactionLine = playerIncomingReactionLine({ opponent, opponentLabel, opponentTactic, enemyDamage, fight, enemyCritical, dodged, enemyMove });
  const opponentDodgeLine = opponentDodgeNarration({ opponent, profile, opponentDodged, opponentDodgeChance });
  const criticalLine = playerCriticalNarration({ profile, critical });
  const enemyCriticalLine = enemyCriticalNarration({ opponent, enemyMove, opponentLabel, enemyCritical });
  const clanLine = tactic === 'special'
    ? ` ${profile.specialFormText ?? `${profile.label} shifts the exchange for one decisive beat.`}`
    : '';
  const passiveLine = passiveText
    ? ` Passive: ${passiveText} changes the exchange.`
    : '';
  const specialBoostLine = specialBoosts
    ? ` ${specialBoosts.label ?? profile.label} form boost: ${Object.entries(specialBoosts)
      .filter(([stat]) => stat !== 'label')
      .map(([stat, value]) => `${stat} ${value}`)
      .join(', ')}.`
    : '';
  const weakMoveLine = weakMoveHit
    ? ` Matchup read: ${profile.label} hits the exact weakness from the pre-fight read.`
    : '';
  const optimalBoostLine = optimalBoost?.active
    ? ` Optimal boost: ${profile.label} followed the read, giving ${optimalBoost.label}.`
    : '';
  const nextOptimalLine = nextOptimalMove
    ? ` Optimal next move: ${nextOptimalMove.label} - ${nextOptimalMove.reason}.`
    : '';
  const injuryEffectLine = injuryEffects?.names?.length
    ? ` Injury effect: ${injuryEffects.names.join(', ')} makes your movement weaker and leaves you easier to hurt.`
    : '';
  const combatInjuryLine = combatInjury
    ? ` Injury: ${combatInjury.tier} ${combatInjury.name} - ${combatInjury.text}`
    : '';
  const riskLine = fight.meters.injuryRisk >= 15
    ? ' Your body is starting to send expensive warnings.'
    : '';
  return `Round ${visibleFightRound(fight)}, Exchange ${fight.round} - ${profile.label}: ${opening} ${enemyAttackLine}${dodgeLine} ${playerReactionLine} Reaction: ${reaction} ${outcome}${damageLine}${groundLine}${opponentDodgeLine}${criticalLine}${enemyCriticalLine}${clanLine}${passiveLine}${specialBoostLine}${weakMoveLine}${optimalBoostLine}${nextOptimalLine}${injuryEffectLine}${combatInjuryLine}${riskLine}`;
}

const FIGHT_OPTION_STAT_GAINS = {
  pressure: { strength: 1, aggression: 1, speed: 0.7, willpower: 0.45 },
  counter: { fightIq: 1, reflexes: 0.9, technique: 0.85, speed: 0.45 },
  grapple: { durability: 0.9, technique: 0.8, flexibility: 0.8, strength: 0.55, control: 0.65 },
  defend: { control: 1, willpower: 0.85, fightIq: 0.65, durability: 0.55 },
  conserve: { control: 0.9, fightIq: 0.8, flexibility: 0.6, willpower: 0.55 },
  special: { technique: 0.85, willpower: 0.85, aggression: 0.65, control: 0.45 },
};

const FIGHT_OPTION_TECHNIQUE_GAINS = {
  pressure: 'striking',
  counter: 'striking',
  grapple: 'grappling',
  defend: 'defense',
  conserve: 'defense',
};

function applyFightOptionGrowth(life, fight, won) {
  const exchanges = fight.exchanges ?? [];
  if (!exchanges.length) return [];
  const counts = exchanges.reduce((map, exchange) => {
    const tactic = exchange.tactic;
    if (FIGHT_OPTION_STAT_GAINS[tactic]) map[tactic] = (map[tactic] ?? 0) + 1;
    return map;
  }, {});
  const maxUse = Math.max(...Object.values(counts), 1);
  const exchangeCount = exchanges.length;
  const durationBonus = 1 + Math.floor(Math.max(0, exchangeCount - 1) / 5) * 0.45;
  const winBonus = won ? 1.15 : 1;
  const applied = {};

  for (const [tactic, count] of Object.entries(counts)) {
    const useShare = count / maxUse;
    const baseGain = Math.max(1, Math.round(Math.sqrt(count) * durationBonus * winBonus * useShare));
    for (const [stat, weight] of Object.entries(FIGHT_OPTION_STAT_GAINS[tactic])) {
      const gain = Math.max(1, Math.round(baseGain * weight));
      const before = life.stats[stat] ?? 0;
      life.stats[stat] = clampLifeStat(life, stat, before + gain);
      const actualGain = life.stats[stat] - before;
      if (actualGain > 0) applied[stat] = (applied[stat] ?? 0) + actualGain;
    }
  }

  return Object.entries(applied)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([stat, gain]) => `+${gain} ${statLabel(stat)}`);
}

function applyTechniqueGrowth(life, fight, won) {
  const exchanges = fight.exchanges ?? [];
  if (!exchanges.length) return [];
  life.techniques = normalizeTechniques(life.techniques);
  const counts = exchanges.reduce((map, exchange) => {
    const track = FIGHT_OPTION_TECHNIQUE_GAINS[exchange.tactic];
    if (track) map[track] = (map[track] ?? 0) + 1;
    return map;
  }, {});
  const durationBonus = 1 + Math.floor(Math.max(0, exchanges.length - 1) / 5);
  const winBonus = won ? 1 : 0;
  const applied = {};

  for (const [track, count] of Object.entries(counts)) {
    const gain = Math.max(1, Math.floor(count * 1.35 + durationBonus + winBonus));
    life.techniques[track] = Math.max(0, Math.floor((life.techniques[track] ?? 0) + gain));
    applied[track] = gain;
  }

  return Object.entries(applied)
    .sort(([, a], [, b]) => b - a)
    .map(([track, gain]) => `+${gain} ${TECHNIQUE_TRACKS[track]?.label ?? track}`);
}

function applyTournamentResult(life, fight, won) {
  if (!fight.tournament || !life.tournament || fight.tournament.id !== life.tournament.id) return;
  const roundNumber = (fight.tournament.roundIndex ?? life.tournament.roundIndex) + 1;
  if (!won) {
    life.tournament.eliminated = true;
    life.tournament.complete = true;
    fight.result.rewards.push(`Tournament run ended in Round ${roundNumber}.`);
    return;
  }

  const moneyBonus = 75000 * roundNumber;
  const reputationBonus = 75 * roundNumber;
  const rerollBonus = 6 * roundNumber;
  life.resources.money += moneyBonus;
  life.resources.reputation = clamp(life.resources.reputation + reputationBonus, 0, 999);
  life.resources.clanRerolls += rerollBonus;
  life.tournament.wins = (life.tournament.wins ?? 0) + 1;
  life.tournament.roundIndex = (life.tournament.roundIndex ?? 0) + 1;
  fight.result.rewards.push(`Tournament bonus: +$${moneyBonus}, +${reputationBonus} reputation, +${rerollBonus} Clan Rerolls`);

  if (life.tournament.roundIndex >= life.tournament.entrants.length) {
    life.tournament.complete = true;
    life.tournament.champion = true;
    life.resources.money += 500000;
    life.resources.reputation = clamp(life.resources.reputation + 400, 0, 999);
    life.resources.clanRerolls += 60;
    life.rank = 'Annihilation Bracket Champion';
    fight.result.rewards.push('Tournament champion prize: +$500000, +400 reputation, +60 Clan Rerolls');
    const currentProgress = clamp(Math.floor(life.clanPasswordProgress ?? 0), 0, SECRET_CLAN_PASSWORD.length);
    if (currentProgress < SECRET_CLAN_PASSWORD.length) {
      const nextProgress = currentProgress + 1;
      life.clanPasswordProgress = nextProgress;
      life.clanPasswordHint = clanPasswordHint(nextProgress);
      const clue = SECRET_CLAN_PASSWORD[nextProgress - 1];
      fight.result.rewards.push(`Secret password clue: ${clue} (${nextProgress}/${SECRET_CLAN_PASSWORD.length})`);
      if (nextProgress === SECRET_CLAN_PASSWORD.length) {
        fight.result.rewards.push(`Full clan password recovered: ${SECRET_CLAN_PASSWORD}`);
      }
    } else {
      life.clanPasswordProgress = SECRET_CLAN_PASSWORD.length;
      life.clanPasswordHint = clanPasswordHint(SECRET_CLAN_PASSWORD.length);
      life.resources.money += 100000;
      life.resources.clanRerolls += 12;
      fight.result.rewards.push('Secret password already recovered: +$100000, +12 Clan Rerolls');
    }
  }
}

function finishActiveFight(life) {
  const fight = life.activeFight;
  const systemFight = fight.source === 'hunterQuest' || fight.source === 'hunterDungeon';
  const opponent = getCombatOpponent(life, fight.opponentId);
  const playerHealthPercent = healthPercent(fight.meters.playerHealth, fight.meters.maxPlayerHealth ?? 100);
  const opponentHealthPercent = healthPercent(fight.meters.opponentHealth, fight.meters.maxOpponentHealth ?? 100);
  const won = fight.meters.opponentHealth <= 0 || (
    fight.meters.playerHealth > 0 &&
    opponentHealthPercent < playerHealthPercent
  );
  const stoppage = fight.meters.opponentHealth <= 0 || fight.meters.playerHealth <= 0;
  const summary = won
    ? `You won ${stoppage ? 'by stoppage' : 'on remaining health'} against ${opponent.name}.`
    : `${opponent.name} beat you ${stoppage ? 'by stoppage' : 'after the final exchange'}.`;
  const reasons = buildFightReasons(life, opponent, won);

  fight.finished = true;
  fight.result = {
    won,
    summary,
    reasons,
    rewards: systemFight
      ? [won ? 'System monster defeated' : 'System objective failed']
      : (won ? [`+$${opponent.reward}`, `+${opponent.rep} reputation`] : [`+${Math.floor(opponent.rep / 4)} reputation`, 'Painful lesson']),
    injuries: [],
  };

  life.resources.energy = clampLifeResource(life, 'energy', fight.meters.playerStamina);
  life.resources.health = clampLifeResource(life, 'health', fight.meters.playerHealth);
  life.world.heat = clamp(life.world.heat + (systemFight ? 1 : getRarity(life.clan.rarity).powerMultiplier * 2), 0, 100);

  if (fight.meters.injuryRisk >= 15) {
    const injury = healthPercent(fight.meters.playerHealth, fight.meters.maxPlayerHealth ?? 100) < 45
      ? withInjuryTier({ name: 'deep fight damage', text: 'the fight leaves damage that needs real time away from hard rounds.' }, 'Moderate')
      : withInjuryTier({ name: 'swollen joints', text: 'the joints are angry enough that another booking would be reckless.' }, 'Mild');
    addOrUpgradeInjury(life, injury);
    fight.result.injuries.push(injuryLabel(injury));
  }

  if (fight.source === 'hunterQuest') {
    applyHunterQuestFightResult(life, fight, won);
    const fightGrowth = applyFightOptionGrowth(life, fight, won);
    if (fightGrowth.length) fight.result.rewards.push(`Combat growth: ${fightGrowth.join(', ')}`);
    const techniqueGrowth = applyTechniqueGrowth(life, fight, won);
    if (techniqueGrowth.length) fight.result.rewards.push(`Technique growth: ${techniqueGrowth.join(', ')}. Archetype: ${getPlayerArchetype(life)}`);
    life.log = [createLog(summary, 'world'), ...life.log].slice(0, 60);
    return;
  }
  if (fight.source === 'hunterDungeon') {
    applyHunterDungeonFightResult(life, fight, won);
    life.log = [createLog(summary, 'world'), ...life.log].slice(0, 60);
    return;
  }

  const cooldownMonths = fightCooldownMonths(opponent);
  life.fightCooldowns = life.fightCooldowns ?? {};
  life.fightCooldowns[fight.opponentId] = lifeMonth(life) + cooldownMonths;
  fight.result.rewards.push(`Rematch opens in ${cooldownMonths} month${cooldownMonths === 1 ? '' : 's'}`);

  if (won) {
    life.record.wins += 1;
    if (stoppage) life.record.kos += 1;
    const rerollsEarned = clanRerollRewardForFight(opponent);
    const calloutMultiplier = fight.callout?.rewardMultiplier ?? 1;
    const moneyReward = Math.round(opponent.reward * calloutMultiplier);
    const reputationReward = Math.round(opponent.rep * calloutMultiplier);
    life.resources.money += moneyReward;
    life.resources.reputation = clamp(life.resources.reputation + reputationReward, 0, 999);
    life.resources.clanRerolls += rerollsEarned;
    fight.result.rewards.push(`+${rerollsEarned} Clan Reroll${rerollsEarned === 1 ? '' : 's'}`);
    if (fight.callout) {
      const followerGain = Math.max(500, Math.round((fight.callout.followerStake ?? 500) * 1.4 + opponentHype(opponent) * 900));
      addFollowers(life, followerGain);
      life.resources.mood = clamp(life.resources.mood + 4);
      fight.result.rewards.push(`Callout payoff: +${followerGain} followers, boosted purse and reputation`);
      life.social.calledOutTarget = null;
    }
    if (opponent.skillReward) {
      life.unlockedSkills = life.unlockedSkills ?? [];
      if (!life.unlockedSkills.includes(opponent.skillReward)) {
        life.unlockedSkills.push(opponent.skillReward);
        fight.result.rewards.push(`Skill unlocked: ${FIGHT_MOVES[opponent.skillReward]?.label ?? opponent.skillReward}`);
      }
      life.defeatedSpecialFights = life.defeatedSpecialFights ?? [];
      if (!life.defeatedSpecialFights.includes(fight.opponentId)) life.defeatedSpecialFights.push(fight.opponentId);
    }
    if (opponent.tier === 'Special Fight') {
      life.specialFightAdaptations = life.specialFightAdaptations ?? {};
      life.specialFightAdaptations[fight.opponentId] = (life.specialFightAdaptations[fight.opponentId] ?? 0) + 1;
      const adapted = getAdaptedOpponent(life, fight.opponentId);
      const titleText = adapted?.growthTitle ? ` (${adapted.growthTitle})` : '';
      fight.result.rewards.push(`${opponent.name} adapts${titleText}: rematch power jumps higher`);
    }
    const learnedMove = unlockBasicMoveFromFight(life, fight, opponent);
    if (learnedMove) {
      fight.result.rewards.push(`Basic move learned: ${learnedMove.label}`);
    }
    life.relationships.rival = clamp(life.relationships.rival + 4);
    if (life.record.wins >= 2) {
      life.world.hiddenWorld = true;
      life.world.league = 'Basement Circuit';
      life.rank = 'Underground Prospect';
    }
  } else {
    life.record.losses += 1;
    life.resources.reputation = clamp(life.resources.reputation + Math.floor(opponent.rep / 4), 0, 999);
    addOrUpgradeInjury(life, withInjuryTier({ name: 'fight damage', text: 'the loss leaves bruising that needs time before another camp.' }, 'Mild'));
    if (fight.callout) {
      const followerLoss = Math.max(200, Math.round(fight.callout.followerStake ?? 500));
      addFollowers(life, -followerLoss);
      life.resources.mood = clamp(life.resources.mood - 8);
      life.resources.reputation = clamp(life.resources.reputation - Math.ceil(opponent.rep / 5), 0, 999);
      fight.result.rewards.push(`Trash talk backlash: -${followerLoss} followers`);
      life.social.calledOutTarget = null;
    }
  }

  if (fight.opponentId === 'rival' && life.rival) {
    const focusStats = {
      striking: ['strength', 'speed', 'technique', 'aggression'],
      grappling: ['strength', 'durability', 'flexibility', 'control'],
      defense: ['fightIq', 'willpower', 'reflexes', 'control'],
    }[life.rival.focus] ?? ['strength', 'technique', 'fightIq', 'control'];
    if (won) {
      life.rival.record.losses += 1;
      for (const stat of focusStats) {
        life.rival.stats[stat] = Math.max(1, (life.rival.stats[stat] ?? 1) + 25);
      }
      const lessonStats = COMBAT_STATS
        .filter((stat) => !focusStats.includes(stat))
        .sort((a, b) => (life.stats[b] ?? 0) - (life.stats[a] ?? 0))
        .slice(0, 4);
      for (const stat of lessonStats) {
        life.rival.stats[stat] = Math.max(1, (life.rival.stats[stat] ?? 1) + 15);
      }
      life.rival.power = rivalPower(life.rival) + 30;
      life.rival.feed.unshift(rivalFeedItem(life, `${life.identity.name} beat ${life.rival.name} in a direct rivalry fight. Rival adaptation: their camp rebuilds around the loss and their stats jump hard.`, 'fight'));
    } else {
      life.rival.record.wins += 1;
      for (const stat of focusStats.slice(0, 2)) {
        life.rival.stats[stat] = Math.max(1, (life.rival.stats[stat] ?? 1) + 5);
      }
      life.rival.power = rivalPower(life.rival) + 8;
      life.rival.feed.unshift(rivalFeedItem(life, `${life.rival.name} beat you directly and used the win to sharpen their camp.`, 'fight'));
    }
    life.rival.feed = life.rival.feed.slice(0, 40);
    life.relationships.rival = clamp((life.relationships.rival ?? 0) + 8);
  }

  const fightGrowth = applyFightOptionGrowth(life, fight, won);
  if (fightGrowth.length) {
    fight.result.rewards.push(`Fight growth: ${fightGrowth.join(', ')}`);
  }
  const techniqueGrowth = applyTechniqueGrowth(life, fight, won);
  if (techniqueGrowth.length) {
    fight.result.rewards.push(`Technique growth: ${techniqueGrowth.join(', ')}. Archetype: ${getPlayerArchetype(life)}`);
  }
  applyTournamentResult(life, fight, won);

  life.log = [createLog(summary, 'fight'), ...life.log].slice(0, 60);
}

function unlockBasicMoveFromFight(life, fight, opponent) {
  life.unlockedSkills = life.unlockedSkills ?? [];
  const usedCategories = [...new Set((fight.exchanges ?? []).map((exchange) => exchange.tactic))];
  const preferredCategories = usedCategories.length ? usedCategories : Object.keys(FIGHT_TACTICS);
  const unlocked = new Set(life.unlockedSkills);
  const preferred = BASIC_FIGHT_MOVE_IDS.filter((id) => preferredCategories.includes(FIGHT_MOVES[id].category) && !unlocked.has(id));
  const fallback = BASIC_FIGHT_MOVE_IDS.filter((id) => !unlocked.has(id));
  const candidates = preferred.length ? preferred : fallback;
  if (!candidates.length) return null;

  const tierBonus = {
    Local: 0.05,
    Underground: 0.08,
    Corporate: 0.11,
    Monster: 0.14,
    'Association Tournament': 0.16,
    'Special Fight': 0.18,
  }[opponent.tier] ?? 0.04;
  const experienceBonus = Math.min(0.18, life.record.wins * 0.012 + life.resources.reputation * 0.00025);
  const unlockChance = life.record.wins >= 20
    ? 1
    : clampFloat(0.14 + tierBonus + experienceBonus, 0.12, 0.65);
  const roll = deterministicRoll(life.rngSeed, fight.opponentId, life.record.wins, fight.exchanges.length, candidates.join(','), 'basic-move-unlock');
  if (roll >= unlockChance) return null;

  const indexRoll = deterministicRoll(life.rngSeed, fight.opponentId, life.record.wins, preferredCategories.join(','), 'basic-move-pick');
  const moveId = candidates[Math.floor(indexRoll * candidates.length) % candidates.length];
  life.unlockedSkills.push(moveId);
  return FIGHT_MOVES[moveId];
}

function clanRerollRewardForFight(opponent) {
  const byTier = {
    Local: 1,
    Underground: 2,
    Corporate: 4,
    Monster: 6,
    'Association Tournament': 8,
    'Special Fight': 20,
  };
  const base = byTier[opponent.tier] ?? 1;
  const threatBonus = opponent.threat === 'Final Bracket' || opponent.threat === 'Legend' ? 4 : 0;
  return base + threatBonus;
}

function buildFightReasons(life, opponent, won) {
  const exchanges = life.activeFight.exchanges;
  const ordered = [...exchanges].reverse();
  const totals = ordered.reduce((sum, exchange) => ({
    dealt: sum.dealt + (exchange.playerDamage ?? 0),
    taken: sum.taken + (exchange.enemyDamage ?? 0),
    crits: sum.crits + (exchange.critical ? 1 : 0),
    enemyCrits: sum.enemyCrits + (exchange.enemyCritical ? 1 : 0),
    dodges: sum.dodges + (exchange.dodged ? 1 : 0),
    enemyDodges: sum.enemyDodges + (exchange.opponentDodged ? 1 : 0),
    weakHits: sum.weakHits + (exchange.weakMoveHit ? 1 : 0),
    optimalHits: sum.optimalHits + (exchange.optimalMoveHit ? 1 : 0),
  }), { dealt: 0, taken: 0, crits: 0, enemyCrits: 0, dodges: 0, enemyDodges: 0, weakHits: 0, optimalHits: 0 });
  const tacticCounts = ordered.reduce((counts, exchange) => {
    const label = exchange.tacticLabel ?? tacticLabel(exchange.tactic);
    counts[label] = (counts[label] ?? 0) + 1;
    return counts;
  }, {});
  const topTactic = Object.entries(tacticCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'your main tactics';
  const bestExchange = [...ordered].sort((a, b) => (b.playerDamage ?? 0) - (a.playerDamage ?? 0))[0];
  const worstExchange = [...ordered].sort((a, b) => (b.enemyDamage ?? 0) - (a.enemyDamage ?? 0))[0];
  const reasons = [];

  reasons.push(`Across ${ordered.length} exchanges, you dealt ${totals.dealt} total damage and took ${totals.taken}, with ${topTactic} showing up as your main pattern.`);
  if (won) {
    if (bestExchange) reasons.push(`${bestExchange.tacticLabel ?? tacticLabel(bestExchange.tactic)} created the biggest swing, landing ${bestExchange.playerDamage ?? 0} damage while you took ${bestExchange.enemyDamage ?? 0}.`);
    if (totals.weakHits || totals.optimalHits) reasons.push(`${totals.weakHits ? `${totals.weakHits} matchup read${totals.weakHits === 1 ? '' : 's'}` : ''}${totals.weakHits && totals.optimalHits ? ' and ' : ''}${totals.optimalHits ? `${totals.optimalHits} optimal follow-up${totals.optimalHits === 1 ? '' : 's'}` : ''} made the cleaner exchanges count.`);
    if (totals.crits || totals.dodges) reasons.push(`${totals.crits ? `${totals.crits} critical strike${totals.crits === 1 ? '' : 's'}` : ''}${totals.crits && totals.dodges ? ' plus ' : ''}${totals.dodges ? `${totals.dodges} clean dodge${totals.dodges === 1 ? '' : 's'}` : ''} kept the fight from becoming an even trade.`);
  } else {
    if (worstExchange) reasons.push(`${opponent.name}'s ${worstExchange.opponentMoveLabel ?? worstExchange.opponentTacticLabel ?? tacticLabel(worstExchange.opponentTactic)} hurt you most, costing ${worstExchange.enemyDamage ?? 0} damage during the roughest exchange.`);
    if (totals.enemyCrits || totals.enemyDodges) reasons.push(`${totals.enemyCrits ? `${opponent.name} found ${totals.enemyCrits} critical opening${totals.enemyCrits === 1 ? '' : 's'}` : ''}${totals.enemyCrits && totals.enemyDodges ? ', and ' : ''}${totals.enemyDodges ? `${totals.enemyDodges} of your attacks missed clean` : ''}.`);
    if (life.activeFight.meters.playerStamina <= 15) reasons.push(`By the end, low stamina left your late exchanges weaker even after ${topTactic} carried most of your offense.`);
  }
  if (reasons.length < 3) {
    reasons.push(won
      ? `The final health gap came from stacking more useful exchanges than ${opponent.name}, not from one vague momentum swing.`
      : `The final health gap came from losing too many exchanges, not from a single bad moment.`);
  }
  return reasons.slice(0, 4);
}

export function simulateFight(life, opponentId, tactic = 'pressure') {
  let next = startFight(life, opponentId);
  let safety = 0;
  while (next.activeFight && !next.activeFight.finished) {
    const moveId = nextAvailableFightMove(next, tactic);
    const beforeRound = next.activeFight.round;
    const beforeExchangeCount = next.activeFight.exchanges.length;
    next = takeFightTurn(next, moveId);
    if (next.activeFight && next.activeFight.round === beforeRound && next.activeFight.exchanges.length === beforeExchangeCount) break;
    safety += 1;
    if (safety > (next.activeFight?.maxRounds ?? 25) + 5) break;
  }
  return next;
}

function nextAvailableFightMove(life, preferredMoveId) {
  const preferredMove = resolveFightMove(life, preferredMoveId);
  if (!fightMoveDisabledReason(life, preferredMove)) return preferredMove.id;
  const preferredCategoryMoves = getUnlockedFightMoves(life, preferredMove.category);
  const categoryFallback = preferredCategoryMoves.find((move) => !move.disabledReason);
  if (categoryFallback) return categoryFallback.id;
  for (const category of Object.keys(FIGHT_TACTICS)) {
    const fallback = getUnlockedFightMoves(life, category).find((move) => !move.disabledReason);
    if (fallback) return fallback.id;
  }
  return preferredMove.id;
}

export function ageUp(life) {
  const next = clone(life);
  next.trainingSessionsUsed = 0;
  const ageStep = advanceLifeClock(next);
  next.resources.energy = maxLifeEnergy(next);
  next.resources.health = clampLifeResource(next, 'health', next.resources.health + (ageStep === 'month' ? 2 : 4));
  next.resources.mood = clamp(next.resources.mood + (ageStep === 'month' ? 1 : 2));
  next.resources.money += next.identity.age < 18 ? 20 : ageStep === 'month' ? 60 : 120;
  const followerIncome = applyFollowerAgeUpIncome(next);

  if (next.identity.age >= 18 && next.phase === 'Youth') {
    next.phase = 'Local Fighter';
    next.rank = next.record.wins > 0 ? 'Local Name' : 'Local Nobody';
    next.world.rumors.unshift('A promoter leaves a black card at your gym.');
  }
  if (next.identity.age >= 22 && next.world.hiddenWorld) {
    next.phase = 'Underground';
    next.world.league = 'Underground Circuit';
  }
  if (next.resources.reputation >= 60) {
    next.phase = 'Corporate Arena';
    next.world.league = 'Corporate Arena';
    next.relationships.sponsor = clamp(next.relationships.sponsor + 10);
  }
  progressRival(next);
  runAutoUpkeep(next);

  const event = yearlyEvent(next, ageStep);
  const logged = followerIncome > 0
    ? addLog(addLog(event.life, event.text, event.type), `Social income: ${followerIncome} followers paid $${followerIncome}.`, 'social')
    : addLog(event.life, event.text, event.type);
  return queueTriggeredEvents(logged, 'ageUp', {
    age: next.identity.age,
    month: next.identity.month ?? 0,
    ageStep,
    challengeRoll: deterministicRoll(next.rngSeed, next.identity.age, next.identity.month ?? 0, next.record.wins, next.resources.reputation, 'monthly-challenge'),
  });
}

function advanceLifeClock(life) {
  if (life.identity.age >= 20) {
    const nextMonth = (life.identity.month ?? 0) + 1;
    if (nextMonth >= 12) {
      life.identity.age += 1;
      life.identity.month = 0;
    } else {
      life.identity.month = nextMonth;
    }
    return 'month';
  }

  life.identity.age += 1;
  life.identity.month = 0;
  return 'year';
}

function challengeOpponentFor(life) {
  const reputation = life.resources.reputation ?? 0;
  const wins = life.record.wins ?? 0;

  if (reputation >= 220 && wins >= 12) return 'firstMonsterEcho';
  if (reputation >= 140 && wins >= 9) return 'apexTrialist';
  if (reputation >= 95 && wins >= 6) return 'ironVeinGatekeeper';
  if (reputation >= 55 && wins >= 4) return 'basementJudoka';
  return 'warehouseChamp';
}

function yearlyEvent(life, ageStep = 'year') {
  const next = clone(life);
  const age = next.identity.age;

  if (ageStep === 'year' && age === 14) {
    next.relationships.mentor = clamp(next.relationships.mentor + 8);
    return { life: next, text: 'A tired coach notices your stance and offers free morning drills.', type: 'life' };
  }
  if (ageStep === 'year' && age === 16) {
    next.resources.reputation = clamp(next.resources.reputation + 5);
    return { life: next, text: 'A schoolyard fight spreads your name farther than your grades ever did.', type: 'life' };
  }
  if (next.clan.rarity === 'Legendary' || next.clan.rarity === 'Mythic' || next.clan.rarity === 'Secret') {
    next.world.heat = clamp(next.world.heat + 5);
    return { life: next, text: ageStep === 'month' ? 'A familiar tailored suit appears again near your gym this month.' : 'Someone in a tailored suit watches your training from across the street.', type: 'world' };
  }
  if (next.world.hiddenWorld) {
    next.resources.clanRerolls += 1;
    return { life: next, text: ageStep === 'month' ? 'A monthly private match rumor carries a Clan Reroll token as bait.' : 'A private match invite includes a Clan Reroll token as bait.', type: 'world' };
  }
  return { life: next, text: ageStep === 'month' ? 'Another month passes. The fight calendar keeps moving.' : 'Another year passes. Your body remembers every choice.', type: 'life' };
}

export function spendLifeChoice(life, choice) {
  const next = clone(life);
  if (choice === 'school') {
    next.stats.fightIq = clampLifeStat(next, 'fightIq', next.stats.fightIq + 2);
    next.relationships.family = clamp(next.relationships.family + 3);
    return addLog(next, 'You focus on school and learn how to read people under pressure.', 'life');
  }
  if (choice === 'street') {
    next.stats.aggression = clampLifeStat(next, 'aggression', next.stats.aggression + 3);
    next.resources.reputation = clamp(next.resources.reputation + 4);
    next.resources.health = clampLifeResource(next, 'health', next.resources.health - 3);
    return addLog(next, 'You take a street fight. It is stupid, useful, and hard to forget.', 'life');
  }
  if (choice === 'job') {
    next.resources.money += 180;
    const beforeGrowth = clone(next);
    next.stats.durability = clampLifeStat(next, 'durability', next.stats.durability + 1);
    applyVitalCapGrowth(beforeGrowth, next);
    next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy - 12);
    return addLog(next, 'You work a rough shift and trade energy for money.', 'life');
  }
  if (choice === 'mentor') {
    return findMentor(next);
  }
  return next;
}

export function runHunterDailyQuest(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked) return addLog(next, 'No System daily quest is active yet.', 'world');
  if (next.hunterWorld.dailyQuest) return addLog(next, 'A System Daily Quest is already active. Finish or claim it before generating another.', 'world');
  next.hunterWorld.dailyQuest = createHunterDailyQuest(next);
  return addLog(next, `System Daily Quest generated: ${next.hunterWorld.dailyQuest.title}.`, 'world');
}

export function advanceHunterDailyQuest(life, choiceId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const quest = next.hunterWorld.dailyQuest;
  const stage = currentHunterQuestStage(next);
  if (!quest || !stage) return addLog(next, 'No active System quest stage is waiting.', 'world');
  if (stage.type === 'combat') return addLog(next, 'The current System quest objective is a monster encounter.', 'world');
  const choice = (stage.choices ?? []).find((item) => item.id === choiceId);
  if (!choice) return addLog(next, 'That System quest option is not available.', 'world');
  applyDelta(next, choice.effects);
  advanceHunterQuestStage(next, quest, {
    stageId: stage.id,
    choiceId,
    label: choice.label,
    result: choice.result,
  });
  return addLog(next, choice.result, 'world');
}

export function startHunterQuestFight(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (next.activeFight) return addLog(next, 'Finish the active fight before entering the System quest encounter.', 'world');
  const quest = next.hunterWorld.dailyQuest;
  const stage = currentHunterQuestStage(next);
  if (!quest || !stage) return addLog(next, 'No active System quest encounter is waiting.', 'world');
  if (stage.type !== 'combat') return addLog(next, 'The current System quest objective is not a monster fight.', 'world');
  const monsterId = stage.monsterId ?? 'systemGoblinScout';
  const activeFight = createActiveFight(next, monsterId, { source: 'hunterQuest', questId: quest.id });
  if (!activeFight) return addLog(next, 'The System could not materialize that monster.', 'world');
  activeFight.breakdown.unshift(`System Quest: ${quest.title}. Clear this monster objective to advance the Daily Quest.`);
  activeFight.maxRounds = Math.min(activeFight.maxRounds, 18);
  next.activeFight = activeFight;
  next.hunterWorld.dailyQuest.monsterFightId = monsterId;
  return addLog(next, `System monster encounter started: ${HUNTER_MONSTERS[monsterId]?.name ?? labelFromId(monsterId)}.`, 'world');
}

export function retreatHunterQuestFight(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const fight = next.activeFight;
  const quest = next.hunterWorld.dailyQuest;
  if (!fight || fight.source !== 'hunterQuest' || fight.finished || !quest || quest.id !== fight.questId) {
    return addLog(next, 'There is no live System monster encounter to retreat from.', 'world');
  }
  const stage = quest.stages[quest.stageIndex];
  const monster = getCombatOpponent(next, fight.opponentId) ?? HUNTER_MONSTERS[stage?.monsterId] ?? HUNTER_MONSTERS.systemGoblinScout;
  quest.completed = true;
  quest.failed = true;
  quest.outcome = 'retreated';
  quest.stageResults = [...(quest.stageResults ?? []), {
    stageId: stage?.id,
    label: `Retreated from ${monster.name}`,
    result: 'You escaped alive, but the System marks the objective as abandoned.',
    won: false,
  }].slice(-8);
  next.activeFight = null;
  next.hunterWorld.dailyQuest = quest;
  next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 10);
  next.resources.mood = clamp(next.resources.mood - 8);
  next.resources.reputation = clamp(next.resources.reputation - 3, 0, 999);
  return addLog(next, `You retreated from ${monster.name}. Survival cost: +10 fatigue, -8 mood, -3 reputation. No System reward.`, 'world');
}

export function dismissRetreatedHunterQuest(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const quest = next.hunterWorld.dailyQuest;
  if (!quest || quest.outcome !== 'retreated') {
    return addLog(next, 'There is no retreated System quest result to dismiss.', 'world');
  }
  next.hunterWorld.dailyQuest = null;
  return addLog(next, `System Daily Quest dismissed: ${quest.title} was abandoned to survive.`, 'world');
}

export function claimHunterDailyQuest(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const quest = next.hunterWorld.dailyQuest;
  if (!quest || !quest.completed) return addLog(next, 'No completed System Daily Quest can be claimed yet.', 'world');
  if (quest.outcome === 'retreated' || quest.outcome === 'fatal') {
    return addLog(next, 'No System reward is available for that terminal quest outcome.', 'world');
  }
  const template = questTemplateById(quest.templateId);
  const reward = quest.failed ? template.partial : template.completion;
  applyDelta(next, reward);
  next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + (reward.fatigue ?? 0));
  next.hunterWorld.dailyQuestsCompleted += 1;
  grantHunterXp(next, reward.xp + next.hunterWorld.level * (quest.failed ? 2 : 5));
  next.hunterWorld.dailyQuest = null;
  const result = quest.failed ? 'partial reward issued after failed objective' : 'complete reward issued';
  return addLog(next, `System Daily Quest claimed: ${template.title}, ${result}.`, 'world');
}

function applyDomainRewards(next, rewards = {}) {
  next.hunterWorld.statPoints += Math.max(0, Math.floor(rewards.statPoints ?? 0));
  next.hunterWorld.monarchTrace = normalizeMonarchTrace(next.hunterWorld.monarchTrace);
  next.hunterWorld.monarchTrace.influence = clamp(next.hunterWorld.monarchTrace.influence + (rewards.influence ?? 0));
  for (const [itemId, quantity] of Object.entries(rewards.items ?? {})) addHunterItem(next.hunterWorld, itemId, quantity);
}

function transformShadowMonarch(next) {
  next.hunterWorld.shadowMonarch = normalizeShadowMonarch(next.hunterWorld.shadowMonarch);
  if (next.hunterWorld.shadowMonarch.unlocked) return false;
  next.hunterWorld.shadowMonarch = {
    unlocked: true,
    transformedMonth: lifeMonth(next),
    evolvedSkills: true,
  };
  next.hunterWorld.statPoints += 500;
  next.hunterWorld.monarchWar = {
    ...normalizeMonarchWar(next.hunterWorld.monarchWar),
    unlocked: true,
  };
  next.hunterWorld.gateOffers = [];
  grantSystemPerk(next.hunterWorld, 'systemOverclock');
  grantSystemPerk(next.hunterWorld, 'abyssalLeech');
  return true;
}

export function getShadowDomainMap(life) {
  const hunter = normalizeHunterWorld(life?.hunterWorld);
  const map = normalizeDomainMap(hunter.domainMap);
  const conquered = new Set(map.conquered);
  const armyPower = shadowArmyPower(hunter);
  return {
    armyPower,
    completed: map.completed,
    transformed: hunter.shadowMonarch.unlocked,
    domains: SHADOW_DOMAIN_TEMPLATES.map((domain) => {
      const requirements = domain.requires ?? [];
      const missing = requirements.filter((id) => !conquered.has(id));
      const isConquered = conquered.has(domain.id);
      const unlocked = !missing.length;
      const canAttack = hunter.unlocked && !isConquered && unlocked && !hunter.shadowMonarch.unlocked;
      const state = isConquered ? 'conquered' : !unlocked ? 'locked' : domain.core ? 'core' : 'available';
      return {
        ...domain,
        state,
        canAttack,
        lockReason: isConquered ? 'Conquered' : missing.length ? `Conquer ${missing.map(labelFromId).join(', ')} first.` : '',
        playerPower: armyPower,
        winChance: canAttack ? clamp(Math.round((armyPower / Math.max(1, domain.enemyPower)) * 60), 5, 95) : 0,
      };
    }),
  };
}

export function battleShadowDomain(life, domainId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked) return addLog(next, 'Shadow Domains are locked until the System recognizes you as a Hunter.', 'world');
  const mapView = getShadowDomainMap(next);
  const domain = mapView.domains.find((item) => item.id === domainId);
  if (!domain) return addLog(next, 'That Shadow Domain does not exist on the map.', 'world');
  if (!domain.canAttack) return addLog(next, domain.lockReason || 'That Shadow Domain cannot be attacked right now.', 'world');
  const armyPower = mapView.armyPower;
  const resultPower = armyPower + next.hunterWorld.level;
  const won = resultPower >= domain.enemyPower;
  next.hunterWorld.domainMap = normalizeDomainMap(next.hunterWorld.domainMap);
  next.hunterWorld.domainMap.lastBattle = {
    domainId,
    won,
    armyPower,
    enemyPower: domain.enemyPower,
    month: lifeMonth(next),
  };
  if (!won) {
    next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 10);
    return addLog(next, `Domain assault failed: ${domain.name} held against your shadow army (${armyPower}/${domain.enemyPower}).`, 'world');
  }
  next.hunterWorld.domainMap.conquered = [...new Set([...next.hunterWorld.domainMap.conquered, domain.id])];
  next.hunterWorld.domainMap.completed = next.hunterWorld.domainMap.conquered.length >= SHADOW_DOMAIN_TEMPLATES.length;
  applyDomainRewards(next, domain.rewards);
  const transformed = next.hunterWorld.domainMap.completed && next.hunterWorld.monarchTrace.unlocked ? transformShadowMonarch(next) : false;
  const message = transformed
    ? `Domain conquered: ${domain.name}. The full map bows, and you awaken as the Shadow Monarch. +500 Hunter stat points.`
    : `Domain conquered: ${domain.name}. Rewards added to the System inventory.`;
  return addLog(next, message, 'world');
}

export function generateHunterGateOffers(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked) return addLog(next, 'The Gate Board is still locked.', 'world');
  if (next.hunterWorld.shadowMonarch.unlocked) {
    next.hunterWorld.gateOffers = [];
    next.hunterWorld.monarchWar = { ...normalizeMonarchWar(next.hunterWorld.monarchWar), unlocked: true };
    return addLog(next, 'Monarch War has replaced Gates. No normal Gate signals appear.', 'world');
  }
  if (next.hunterWorld.activeDungeon || next.hunterWorld.gateOffers.length) return next;
  next.hunterWorld.gateOffers = createHunterGateBoard(next);
  next.hunterWorld.redGatePending = false;
  next.hunterWorld.lastGateMonth = lifeMonth(next);
  return addLog(next, 'Gate Board updated: three dungeon signals are available.', 'world');
}

export function selectHunterGate(life, offerId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked) return addLog(next, 'The Gate Board is still locked.', 'world');
  if (next.hunterWorld.activeDungeon) return addLog(next, 'A dungeon run is already active.', 'world');
  const offer = next.hunterWorld.gateOffers.find((gate) => gate.id === offerId);
  if (!offer) return addLog(next, 'That Gate signal is no longer on the Board.', 'world');
  next.hunterWorld.activeDungeon = {
    ...offer,
    id: `dungeon-${offer.id}`,
    encounterIndex: 0,
    carriedHealth: null,
    carriedStamina: null,
    startedMonth: lifeMonth(next),
    rewardsEarned: [],
    completed: false,
    retreated: false,
    failed: false,
    bossDefeated: false,
    outcome: null,
    awaitingAdvance: false,
  };
  next.hunterWorld.gateOffers = [];
  return addLog(next, `Gate selected: ${offer.name}. ${offer.encounters.length} hostile rooms detected; the final signature is a boss.`, 'world');
}

export function startHunterDungeonEncounter(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const dungeon = next.hunterWorld.activeDungeon;
  if (next.activeFight) return addLog(next, 'Finish the active encounter before proceeding deeper.', 'world');
  if (!dungeon || dungeon.completed || dungeon.retreated || dungeon.failed) return addLog(next, 'No active dungeon room can be entered.', 'world');
  const encounter = dungeon.encounters[dungeon.encounterIndex];
  if (!encounter) return addLog(next, 'The dungeon route is already exhausted.', 'world');
  const fight = createActiveFight(next, encounter.monsterId, {
    source: 'hunterDungeon',
    dungeonId: dungeon.id,
    encounterIndex: dungeon.encounterIndex,
    isBoss: encounter.isBoss,
    carriedHealth: dungeon.carriedHealth,
    carriedStamina: dungeon.carriedStamina,
  });
  if (!fight) return addLog(next, 'The System could not resolve the dungeon monster signature.', 'world');
  fight.maxRounds = Math.min(fight.maxRounds, 18);
  fight.breakdown.unshift(`${dungeon.name}: Room ${dungeon.encounterIndex + 1}/${dungeon.encounters.length}${encounter.isBoss ? ' / Boss Chamber' : ''}.`);
  next.activeFight = fight;
  return addLog(next, `${encounter.isBoss ? 'Boss chamber entered' : 'Dungeon room entered'}: ${HUNTER_MONSTERS[encounter.monsterId].name}.`, 'world');
}

export function advanceHunterDungeon(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const dungeon = next.hunterWorld.activeDungeon;
  if (!dungeon || !dungeon.awaitingAdvance || !next.activeFight?.finished || !next.activeFight?.result?.won) {
    return addLog(next, 'No cleared dungeon room is waiting for a deeper advance.', 'world');
  }
  next.activeFight = null;
  dungeon.awaitingAdvance = false;
  dungeon.encounterIndex += 1;
  next.hunterWorld.activeDungeon = dungeon;
  return startHunterDungeonEncounter(next);
}

export function retreatHunterDungeon(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const dungeon = next.hunterWorld.activeDungeon;
  const fight = next.activeFight;
  if (!dungeon || !fight || fight.source !== 'hunterDungeon' || fight.finished || fight.dungeonId !== dungeon.id) {
    return addLog(next, 'There is no live dungeon encounter to retreat from.', 'world');
  }
  dungeon.completed = true;
  dungeon.retreated = true;
  dungeon.failed = true;
  dungeon.outcome = 'retreated';
  dungeon.resultText = 'You escaped before the monster could attack again. Previously cleared room rewards are yours; the boss jackpot is lost.';
  next.activeFight = null;
  next.hunterWorld.activeDungeon = dungeon;
  next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 12);
  next.resources.mood = clamp(next.resources.mood - 10);
  next.resources.reputation = clamp(next.resources.reputation - 4, 0, 999);
  return addLog(next, `Retreated from ${dungeon.name}. Survival cost: +12 fatigue, -10 mood, -4 reputation.`, 'world');
}

export function dismissHunterDungeonResult(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const dungeon = next.hunterWorld.activeDungeon;
  if (!dungeon || !dungeon.completed) return addLog(next, 'There is no resolved dungeon report to dismiss.', 'world');
  next.activeFight = null;
  next.hunterWorld.activeDungeon = null;
  if (next.hunterWorld.shadowMonarch.unlocked) {
    next.hunterWorld.gateOffers = [];
    next.hunterWorld.monarchWar = { ...normalizeMonarchWar(next.hunterWorld.monarchWar), unlocked: true };
    return addLog(next, `Gate report closed: ${dungeon.name}. Monarch War has replaced normal Gates.`, 'world');
  }
  next.hunterWorld.gateOffers = createHunterGateBoard(next);
  next.hunterWorld.redGatePending = false;
  return addLog(next, `Gate report closed: ${dungeon.name}. New Gate signals have appeared.`, 'world');
}

export function spendHunterStatPoint(life, stat) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked || next.hunterWorld.statPoints <= 0 || !(stat in DEFAULT_HUNTER_STATS)) {
    return addLog(next, 'No Hunter stat point can be spent there.', 'world');
  }
  next.hunterWorld.statPoints -= 1;
  next.hunterWorld.stats = { ...next.hunterWorld.stats, [stat]: (next.hunterWorld.stats[stat] ?? 0) + 1 };
  return addLog(next, `System stat point spent: Hunter ${stat} increased.`, 'world');
}

export function getHunterCraftingRecipes(life) {
  const hunter = normalizeHunterWorld(life?.hunterWorld);
  return HUNTER_CRAFTING_RECIPES.map((recipe) => {
    const missing = [];
    if (recipe.requiresItem && !hunterHasItem(hunter, recipe.requiresItem) && hunter.equippedWeapon !== recipe.requiresItem) {
      missing.push(HUNTER_ITEM_CATALOG[recipe.requiresItem]?.label ?? labelFromId(recipe.requiresItem));
    }
    for (const [itemId, quantity] of Object.entries(recipe.costs ?? {})) {
      const owned = hunterItemQuantity(hunter, itemId);
      if (owned < quantity) missing.push(`${HUNTER_ITEM_CATALOG[itemId]?.label ?? labelFromId(itemId)} ${owned}/${quantity}`);
    }
    return {
      ...recipe,
      available: missing.length === 0,
      missing,
      currentUpgrade: recipe.upgradeItem ? (hunter.itemUpgrades?.[recipe.upgradeItem] ?? 0) : 0,
    };
  });
}

export function craftHunterItem(life, recipeId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const recipe = getHunterCraftingRecipes(next).find((item) => item.id === recipeId);
  if (!next.hunterWorld.unlocked) return addLog(next, 'The System crafting menu is still locked.', 'world');
  if (!recipe) return addLog(next, 'That System crafting recipe is not available.', 'world');
  if (!recipe.available) return addLog(next, `Crafting blocked: ${recipe.missing.join(', ')}.`, 'world');

  for (const [itemId, quantity] of Object.entries(recipe.costs ?? {})) {
    consumeHunterItemQuantity(next.hunterWorld, itemId, quantity);
  }
  if (recipe.upgradeItem) {
    next.hunterWorld.itemUpgrades = normalizeHunterItemUpgrades(next.hunterWorld.itemUpgrades);
    next.hunterWorld.itemUpgrades[recipe.upgradeItem] = clamp((next.hunterWorld.itemUpgrades[recipe.upgradeItem] ?? 0) + 1, 0, 5);
  }
  for (const [itemId, quantity] of Object.entries(recipe.grants ?? {})) addHunterItem(next.hunterWorld, itemId, quantity);
  next.hunterWorld.milestones = normalizeHunterMilestones(next.hunterWorld.milestones);
  next.hunterWorld.milestones.craftedItems += 1;
  return addLog(next, `Crafting complete: ${recipe.label}.`, 'world');
}

export function visitHunterAssociation(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked) return addLog(next, 'The Hunter Association has not contacted you yet.', 'world');
  const review = getHunterAssociationReview(next);
  const currentIndex = HUNTER_RANKS.indexOf(next.hunterWorld.rank);
  const nextRank = review.nextRank;
  if (review.eligible) {
    next.hunterWorld.rank = nextRank;
    next.hunterWorld.statPoints += 2;
    next.hunterWorld.milestones = normalizeHunterMilestones(next.hunterWorld.milestones);
    next.hunterWorld.milestones.promotions = [...new Set([...next.hunterWorld.milestones.promotions, nextRank])];
    next.resources.reputation = clamp(next.resources.reputation + 10 + currentIndex * 4, 0, 999);
    next.resources.money += 750 * (currentIndex + 1);
    if (nextRank === 'S' && !next.eventFlags?.mentorPasswordRevealed) {
      next.pendingEvent = {
        id: 'mentor-password-reveal',
        flag: 'mentorPasswordRevealed',
        title: 'S-Rank Mentor Signal',
        body: 'The Association terminal flickers after your S-rank promotion. A private System note appears: Secret mentor password recovered: mentor21.',
        choices: [
          {
            id: 'memorize-mentor21',
            label: 'Memorize mentor21',
            result: 'You memorized the secret mentor password: mentor21.',
            effects: {},
          },
        ],
      };
      next.eventFlags = { ...next.eventFlags, mentorPasswordRevealed: true };
    }
    return addLog(next, `Hunter Association rank reassessment: promoted to ${nextRank}-rank.`, 'world');
  }
  next.resources.mood = clamp(next.resources.mood + 2);
  const missing = review.requirements.filter((item) => !item.met).map((item) => `${item.label} ${item.current}/${item.required}`).join(', ');
  return addLog(next, `Hunter Association review complete. Missing: ${missing || 'no further rank available'}.`, 'world');
}

export function buySystemItem(life, itemId = 'recoveryPotion') {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.unlocked) return addLog(next, 'The System Shop is still locked.', 'world');
  const item = SYSTEM_SHOP_ITEMS[itemId] ?? SYSTEM_SHOP_ITEMS.recoveryPotion;
  if (item.type === 'weapon' && hunterHasItem(next.hunterWorld, item.id)) {
    next.hunterWorld.equippedWeapon = item.id;
    return addLog(next, `System weapon equipped: ${item.label}.`, 'world');
  }
  if (next.resources.money < item.cost) return addLog(next, 'Not enough money for the System Shop.', 'world');
  next.resources.money -= item.cost;
  addHunterItem(next.hunterWorld, item.id);
  if (item.type === 'weapon') next.hunterWorld.equippedWeapon = item.id;
  return addLog(next, `System Shop purchase: ${item.label} added to Items.`, 'world');
}

function applyHunterItemEffects(next, item) {
  const effects = item.effects ?? {};
  next.resources.health = clampLifeResource(next, 'health', next.resources.health + (effects.health ?? 0));
  next.resources.energy = clampLifeResource(next, 'energy', next.resources.energy + (effects.energy ?? 0));
  next.resources.mood = clamp(next.resources.mood + (effects.mood ?? 0));
  next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + (effects.systemFatigue ?? 0));
  next.hunterWorld.statPoints += Math.max(0, Math.floor(effects.hunterStatPoints ?? 0));
  next.hunterWorld.shadowSigilPower = Math.max(0, Math.floor((next.hunterWorld.shadowSigilPower ?? 0) + (effects.shadowArmyPower ?? 0)));
  if (effects.allHunterStats) {
    for (const stat of Object.keys(DEFAULT_HUNTER_STATS)) next.hunterWorld.stats[stat] = Math.max(0, next.hunterWorld.stats[stat] + effects.allHunterStats);
  }
}

export function useHunterItem(life, itemId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const item = HUNTER_ITEM_CATALOG[itemId];
  if (!item || !hunterHasItem(next.hunterWorld, itemId)) return addLog(next, 'That Hunter item is not in your inventory.', 'world');
  if (!['consumable', 'special'].includes(item.type)) return addLog(next, `${item.label} cannot be used directly.`, 'world');
  applyHunterItemEffects(next, item);
  consumeHunterItem(next.hunterWorld, itemId);
  return addLog(next, `Hunter item used: ${item.label}.`, 'world');
}

export function equipHunterItem(life, itemId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const item = HUNTER_ITEM_CATALOG[itemId];
  if (!item || item.type !== 'weapon' || !hunterHasItem(next.hunterWorld, itemId)) return addLog(next, 'That System weapon is not in your inventory.', 'world');
  next.hunterWorld.equippedWeapon = item.id;
  return addLog(next, `System weapon equipped: ${item.label}.`, 'world');
}

export function attemptAriseShadow(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const prompt = next.hunterWorld.arisePrompt;
  if (!prompt) return addLog(next, 'No defeated boss shadow is answering ARISE.', 'world');
  if (next.hunterWorld.pendingLevelRewards.length) return addLog(next, 'Claim the pending System Level Reward before commanding ARISE.', 'world');
  if (prompt.status !== 'active' || prompt.attemptsLeft <= 0) return addLog(next, 'That ARISE echo has already resolved.', 'world');

  const chance = ariseSuccessChance(next.hunterWorld, prompt);
  const roll = deterministicRoll(next.rngSeed, prompt.monsterId, prompt.createdMonth, prompt.attemptsUsed, next.hunterWorld.shadowArmy.length, 'arise');
  prompt.attemptsUsed += 1;
  prompt.attemptsLeft = Math.max(0, 3 - prompt.attemptsUsed);
  if (roll < chance) {
    const shadow = createShadowFromBoss(next, prompt.monsterId, 'ARISE');
    next.hunterWorld.shadowArmy = [...next.hunterWorld.shadowArmy, shadow];
    next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 6);
    next.hunterWorld.milestones = normalizeHunterMilestones(next.hunterWorld.milestones);
    next.hunterWorld.milestones.shadowsExtracted += 1;
    next.stats.control = clampLifeStat(next, 'control', next.stats.control + 2);
    prompt.status = 'success';
    prompt.shadowName = shadow.name;
    prompt.resultText = `${shadow.name} rises and joins the Shadow Domain army.`;
    next.hunterWorld.arisePrompt = prompt;
    return addLog(next, `ARISE succeeded: ${shadow.name} joined your army.`, 'world');
  }

  next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 3);
  prompt.status = prompt.attemptsLeft > 0 ? 'active' : 'failed';
  prompt.resultText = prompt.status === 'failed'
    ? `${prompt.sourceBoss} resisted every command. The echo is gone.`
    : `${prompt.sourceBoss} resisted ARISE. ${prompt.attemptsLeft} attempt${prompt.attemptsLeft === 1 ? '' : 's'} remain.`;
  next.hunterWorld.arisePrompt = prompt;
  return addLog(next, `ARISE failed: ${prompt.resultText}`, 'world');
}

export function dismissArisePrompt(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const prompt = next.hunterWorld.arisePrompt;
  if (!prompt) return next;
  next.hunterWorld.arisePrompt = null;
  const text = prompt.status === 'success'
    ? `${prompt.shadowName ?? prompt.sourceBoss} is now marching with your Shadow Domain army.`
    : `${prompt.sourceBoss} echo fades.`;
  return addLog(next, text, 'world');
}

export function advanceMonarchTrace(life) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const milestones = getHunterMilestones(next);
  const monarchMilestone = milestones.find((milestone) => milestone.id === 'monarch-trace');
  if (!monarchMilestone?.ready && !next.hunterWorld.monarchTrace.unlocked) {
    return addLog(next, 'Monarch Trace is dormant. Reach S-rank, Level 40, 50 Gate clears, and 3 shadows.', 'world');
  }
  const trace = normalizeMonarchTrace(next.hunterWorld.monarchTrace);
  if (trace.completed) return addLog(next, 'Monarch Trace already completed.', 'world');

  if (!trace.unlocked) {
    trace.unlocked = true;
    trace.stage = 1;
    trace.influence = 25;
    grantSystemPerk(next.hunterWorld, 'rulersAuthority');
    next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 8);
    next.hunterWorld.milestones.monarchSteps += 1;
    next.hunterWorld.monarchTrace = trace;
    return addLog(next, "Monarch Trace awakened: Ruler's Authority has fused with your shadow army.", 'world');
  }

  trace.stage = clamp(trace.stage + 1, 0, 4);
  trace.influence = clamp(trace.influence + 25, 0, 100);
  trace.completed = trace.stage >= 4;
  next.hunterWorld.milestones.monarchSteps += 1;
  if (trace.stage >= 2) next.hunterWorld.domainMap = normalizeDomainMap(next.hunterWorld.domainMap);
  if (trace.stage >= 3) grantSystemPerk(next.hunterWorld, 'systemOverclock');
  if (trace.completed) grantSystemPerk(next.hunterWorld, 'abyssalLeech');
  next.hunterWorld.monarchTrace = trace;
  return addLog(next, trace.completed ? 'Monarch Trace completed: Abyssal Leech unlocked.' : `Monarch Trace advanced to stage ${trace.stage}.`, 'world');
}

export function fightMonarchBoss(life, bossId) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  if (!next.hunterWorld.shadowMonarch.unlocked) return addLog(next, 'Monarch War is locked until you become the Shadow Monarch.', 'world');
  const boss = MONARCH_BOSSES.find((item) => item.id === bossId);
  if (!boss) return addLog(next, 'That Monarch cannot be found.', 'world');
  const war = normalizeMonarchWar(next.hunterWorld.monarchWar);
  if (war.defeated.includes(boss.id)) return addLog(next, `${boss.name} has already fallen.`, 'world');
  const hunterScore = hunterPower(next) + shadowArmyPower(next.hunterWorld) + next.hunterWorld.level * 8 + next.hunterWorld.statPoints * 0.15;
  const won = hunterScore >= boss.power;
  war.lastBattle = {
    bossId: boss.id,
    won,
    hunterScore: Math.floor(hunterScore),
    bossPower: boss.power,
    month: lifeMonth(next),
  };
  if (!won) {
    next.hunterWorld.monarchWar = war;
    next.hunterWorld.systemFatigue = clamp(next.hunterWorld.systemFatigue + 18);
    return addLog(next, `${boss.name} repelled you. Monarch War pressure rises (${Math.floor(hunterScore)}/${boss.power}).`, 'world');
  }
  war.defeated = [...new Set([...war.defeated, boss.id])];
  war.finalChoiceUnlocked = war.defeated.length >= MONARCH_BOSSES.length;
  next.hunterWorld.monarchWar = war;
  next.hunterWorld.statPoints += Math.max(0, Math.floor(boss.reward?.statPoints ?? 0));
  for (const [itemId, quantity] of Object.entries(boss.reward?.items ?? {})) addHunterItem(next.hunterWorld, itemId, quantity);
  const suffix = war.finalChoiceUnlocked ? ' Final System choice unlocked.' : '';
  return addLog(next, `${boss.name} defeated. Monarch rewards claimed.${suffix}`, 'world');
}

export function chooseSystemEnding(life, choice) {
  const next = clone(life);
  next.hunterWorld = normalizeHunterWorld(next.hunterWorld);
  const war = normalizeMonarchWar(next.hunterWorld.monarchWar);
  if (!war.finalChoiceUnlocked) return addLog(next, 'The final System choice is locked until every Monarch falls.', 'world');
  if (!['closePortals', 'defendPlanet'].includes(choice)) return addLog(next, 'That System ending choice does not exist.', 'world');
  next.hunterWorld.systemEnding = { choice, chosenMonth: lifeMonth(next) };
  if (choice === 'closePortals') {
    next.hunterWorld.unlocked = false;
    next.hunterWorld.playerAwakened = false;
    next.hunterWorld.gateOffers = [];
    next.hunterWorld.activeDungeon = null;
    next.hunterWorld.statPoints = 0;
    next.hunterWorld.shadowMonarch = { ...next.hunterWorld.shadowMonarch, powersLost: true };
    return addLog(next, 'Final choice: all portals closed. The System ends, and your Hunter powers fade.', 'world');
  }
  next.resources.reputation = clamp(next.resources.reputation + 120, 0, 999);
  return addLog(next, 'Final choice: the System remains. You stand as the planet defender.', 'world');
}

function queueTriggeredEvents(life, trigger, context = {}) {
  if (life.pendingEvent) {
    if (trigger === 'train' && life.pendingEvent.id === 'training-injury') {
      const replacement = findTriggeredEvent(life, trigger, context);
      if (replacement?.id === 'overtraining-warning') {
        const next = clone(life);
        next.pendingEvent = replacement;
        next.eventFlags = {
          ...next.eventFlags,
          [replacement.flag]: true,
        };
        return addLog(next, `Event: ${replacement.title}`, 'event');
      }
    }
    return life;
  }
  const next = clone(life);
  const event = findTriggeredEvent(next, trigger, context);
  if (!event) return life;
  next.pendingEvent = event;
  next.eventFlags = {
    ...next.eventFlags,
    [event.flag]: true,
  };
  return addLog(next, `Event: ${event.title}`, 'event');
}

function findTriggeredEvent(life, trigger, context) {
  const flags = life.eventFlags ?? {};
  const systemAwakeningFlag = `systemAwakening-${lifeMonth(life)}`;
  const events = [
    {
      id: 'debt-collector-notice',
      flag: 'debtCollectorNotice',
      title: 'Debt Collector Notice',
      body: 'A polite stranger explains that black-market services are never only paid in cash. Someone wants a little extra respect before your next name gets passed around.',
      trigger: trigger === 'money' &&
        context.group === 'Black Market' &&
        !flags.debtCollectorNotice,
      choices: [
        {
          id: 'pay-them-off',
          label: 'Pay them off',
          result: 'You paid the collector and bought quiet for now.',
          effects: { resources: { money: -350, mood: -2 }, world: { heat: -2 } },
        },
        {
          id: 'refuse-debt',
          label: 'Refuse the debt',
          result: 'You refused the tax. The room gets louder about your name.',
          effects: { resources: { reputation: 4 }, stats: { willpower: 2 }, world: { heat: 8 } },
        },
      ],
    },
    {
      id: 'sponsor-suspicion',
      flag: 'sponsorSuspicion',
      title: 'Sponsor Suspicion',
      body: 'A sponsor hears your money has been moving through back doors. They do not ask directly, but the next conversation has too many pauses.',
      trigger: trigger === 'money' &&
        context.group === 'Black Market' &&
        life.resources.reputation >= 30 &&
        !flags.sponsorSuspicion,
      choices: [
        {
          id: 'calm-sponsors',
          label: 'Calm them down',
          result: 'You kept the answer boring and believable. Sometimes control is a weapon outside the ring too.',
          effects: { relationships: { sponsor: 8 }, stats: { control: 2, fightIq: 1 }, world: { heat: -4 } },
        },
        {
          id: 'embrace-notoriety',
          label: 'Embrace notoriety',
          result: 'You let the rumor breathe. Sponsors hate uncertainty, but crowds love danger.',
          effects: { resources: { reputation: 9, mood: 2 }, relationships: { sponsor: -5 }, world: { heat: 6 } },
        },
      ],
    },
    {
      id: 'stable-home-week',
      flag: `stableHomeWeek-${life.identity.age}-${life.identity.month ?? 0}`,
      title: 'Stable Home Week',
      body: 'The money you put into ordinary life buys a rare quiet week. No emergency calls, no tense meals, no explaining fresh bruises at the door.',
      trigger: trigger === 'money' &&
        context.group === 'Lifestyle' &&
        context.actionId === 'familySupport' &&
        life.world.heat <= 20 &&
        !flags[`stableHomeWeek-${life.identity.age}-${life.identity.month ?? 0}`],
      choices: [
        {
          id: 'enjoy-quiet',
          label: 'Enjoy the quiet',
          result: 'You let home be home for once. The stillness gives your body room to catch up.',
          effects: { relationships: { family: 6 }, resources: { health: 5, mood: 6 } },
        },
        {
          id: 'use-quiet',
          label: 'Use it to study',
          result: 'You spent the quiet on tape study and boring discipline.',
          effects: { stats: { fightIq: 2, control: 2 }, resources: { mood: 2 } },
        },
      ],
    },
    {
      id: 'sponsor-dinner',
      flag: 'sponsorDinner',
      title: 'Sponsor Dinner',
      body: 'A sponsor invites you somewhere with clean plates, private rooms, and people who treat violence like a quarterly report.',
      trigger: trigger === 'money' &&
        context.group === 'Lifestyle' &&
        context.actionId === 'sponsorImage' &&
        life.resources.reputation >= 45 &&
        !flags.sponsorDinner,
      choices: [
        {
          id: 'play-polished',
          label: 'Play polished',
          result: 'You acted like the kind of fighter money can stand beside.',
          effects: { relationships: { sponsor: 12 }, resources: { money: 400, reputation: 4 }, stats: { control: 1 } },
        },
        {
          id: 'stay-dangerous',
          label: 'Stay dangerous',
          result: 'You did not polish the edge off. Some sponsors flinch. The braver ones lean in.',
          effects: { resources: { reputation: 8 }, relationships: { sponsor: 4 }, world: { heat: 3 } },
        },
      ],
    },
    {
      id: 'coach-notice',
      flag: 'coachNotice',
      title: 'The Coach Notices',
      body: 'A tired coach watches you move after practice. He says your stance is rough, but your timing is not normal.',
      trigger: trigger === 'ageUp' && life.identity.age >= 14 && life.identity.age < 18 && !flags.coachNotice,
      choices: [
        {
          id: 'accept-drills',
          label: 'Accept morning drills',
          result: 'You accepted the coach and started learning before sunrise.',
          effects: { relationships: { mentor: 10 }, stats: { technique: 3, control: 2 }, resources: { energy: -8 } },
        },
        {
          id: 'keep-distance',
          label: 'Keep your distance',
          result: 'You stayed independent. No debt, no guidance.',
          effects: { stats: { willpower: 2 }, resources: { mood: 2 } },
        },
      ],
    },
    {
      ...systemAwakeningEvent(life),
      trigger: trigger === 'ageUp' &&
        life.identity.age >= 18 &&
        !flags[systemAwakeningFlag] &&
        deterministicRoll(life.rngSeed, life.identity.age, life.identity.month ?? 0, 'system-awakening') <= hunterAwakeningChance(life, context),
    },
    {
      id: 'overtraining-warning',
      flag: 'overtrainingWarning',
      title: 'Your Body Refuses',
      body: 'Your joints feel hot and your sleep gets shallow. You can force one more brutal session, or recover before the damage becomes permanent.',
      trigger: trigger === 'train' && life.resources.energy <= 40 && healthPercent(life.resources.health, maxLifeHealth(life)) <= 95 && !flags.overtrainingWarning,
      choices: [
        {
          id: 'recover-now',
          label: 'Back off and recover',
          result: 'You swallowed your pride and recovered before the injury settled in.',
          effects: { resources: { health: 12, energy: 18, mood: 4 }, stats: { control: 1 } },
        },
        {
          id: 'push-through',
          label: 'Push through',
          result: 'You forced the work. The gain is real, and so is the damage.',
          effects: { resources: { health: -14, energy: -12, mood: -4 }, stats: { durability: 5, willpower: 3 }, injury: 'overtraining inflammation' },
        },
      ],
    },
    {
      id: 'training-injury',
      flag: `trainingInjury-${life.identity.age}-${life.identity.month ?? 0}-${context.actionId}-${life.injuries.length}`,
      title: 'Training Injury',
      body: `The session goes wrong and ${context.injuryName ?? 'a training injury'} settles into your body. You can respect the warning, or turn the pain into another ugly lesson.`,
      trigger: trigger === 'train' &&
        context.injuryOccurred &&
        !flags[`trainingInjury-${life.identity.age}-${life.identity.month ?? 0}-${context.actionId}-${life.injuries.length}`],
      choices: [
        {
          id: 'treat-injury',
          label: 'Treat it seriously',
          result: 'You stopped before pride could make the injury permanent. The lesson is boring, which is why it works.',
          effects: { resources: { health: 8, energy: 8, mood: 2 }, stats: { control: 2 } },
        },
        {
          id: 'train-around-it',
          label: 'Train around it',
          result: 'You changed the movement and kept working. The pain stays, but so does the adaptation.',
          effects: { resources: { health: -4, mood: -1 }, stats: { durability: 3, willpower: 2 } },
        },
      ],
    },
    {
      id: 'basement-invite',
      flag: 'basementInvite',
      title: 'Black Card Invite',
      body: 'After your latest fight, a promoter slides you a matte black card. No address, just a time and a warning not to bring friends.',
      trigger: trigger === 'fight' && life.record.wins >= 1 && !flags.basementInvite,
      choices: [
        {
          id: 'take-card',
          label: 'Take the card',
          result: 'You accepted the invitation. The hidden circuit now knows your name.',
          effects: { world: { hiddenWorld: true, league: 'Basement Circuit', heat: 8 }, resources: { reputation: 10 } },
        },
        {
          id: 'burn-card',
          label: 'Burn it',
          result: 'You rejected the circuit for now. Rumors say that choice also gets remembered.',
          effects: { resources: { mood: 5 }, relationships: { family: 4 }, world: { heat: -4 } },
        },
      ],
    },
    {
      id: 'clinic-scout',
      flag: 'clinicScout',
      title: 'Scout at the Clinic',
      body: 'A sponsor sees you paying for recovery instead of limping into another fight. He likes fighters who last.',
      trigger: trigger === 'recovery' && context.actionId === 'clinic' && life.resources.reputation >= 12 && !flags.clinicScout,
      choices: [
        {
          id: 'hear-offer',
          label: 'Hear the offer',
          result: 'You listened. The offer is small, but the door is real.',
          effects: { relationships: { sponsor: 12 }, resources: { money: 300 }, world: { heat: 4 } },
        },
        {
          id: 'walk-away',
          label: 'Walk away',
          result: 'You kept your independence and left the sponsor guessing.',
          effects: { stats: { control: 2, willpower: 2 }, resources: { reputation: 3 } },
        },
      ],
    },
    {
      id: 'bloodline-spotter',
      flag: 'bloodlineSpotter',
      title: 'Someone Recognizes the Blood',
      body: `A quiet spectator watches your footwork for too long. After practice, they ask whether ${life.clan.name} is your real family line or just a name you hide behind.`,
      trigger: trigger === 'ageUp' &&
        !isMishimeClan(life.clan) &&
        ['Legendary', 'Mythic', 'Secret'].includes(life.clan.rarity) &&
        life.identity.age >= 16 &&
        !flags.bloodlineSpotter,
      choices: [
        {
          id: 'show-nothing',
          label: 'Hide your level',
          result: 'You gave them nothing. People still suspect, but nobody gets a clean read.',
          effects: { stats: { control: 3, fightIq: 2 }, resources: { mood: 2 }, world: { heat: -4 } },
        },
        {
          id: 'let-them-see',
          label: 'Let them see',
          result: 'You let one exchange slip. The room understands your bloodline is not normal.',
          effects: { resources: { reputation: 12, clanRerolls: 1 }, stats: { aggression: 2 }, world: { heat: 10 } },
        },
      ],
    },
    {
      id: 'mishime-first-surge',
      flag: 'mishimeFirstSurge',
      title: 'The Devil Gene Moves',
      body: 'The Mishime bloodline wakes during a hard week. Your pulse turns violent before your thoughts catch up, and for one second the room feels breakable.',
      trigger: isMishimeClan(life.clan) &&
        (normalizeClanAwakening(life)?.stage ?? 0) < 1 &&
        ((trigger === 'ageUp' && life.identity.age >= 14) || (trigger === 'fight' && life.world.hiddenWorld)) &&
        !flags.mishimeFirstSurge,
      choices: [
        {
          id: 'restrain-devil-gene',
          label: 'Restrain it',
          result: 'You forced the surge down and learned the shape of it. The power stays, but it has to ask permission.',
          effects: { clanAwakening: { stage: 1, control: 18, corruption: 2, markMonth: true }, stats: { control: 4, fightIq: 3 }, resources: { mood: 2 }, world: { heat: -4 } },
        },
        {
          id: 'use-devil-surge',
          label: 'Use it',
          result: 'You let the bloodline hit the room first. Everyone saw the violence before you named it.',
          effects: { clanAwakening: { stage: 1, control: -4, corruption: 14, markMonth: true }, stats: { strength: 5, aggression: 4 }, resources: { reputation: 8 }, world: { heat: 10 } },
        },
        {
          id: 'study-devil-surge',
          label: 'Master the feeling',
          result: 'You treated the surge like a technique instead of a mood. That made it slower to explode and harder to waste.',
          effects: { clanAwakening: { stage: 1, control: 10, corruption: 6, markMonth: true }, stats: { willpower: 3, technique: 3, control: 2 }, resources: { reputation: 3 }, world: { heat: 3 } },
        },
      ],
    },
    {
      id: 'mishime-pressure-deepens',
      flag: 'mishimePressureDeepens',
      title: 'Devil Pressure Deepens',
      body: 'The first surge was not the end. Mishime pressure starts arriving earlier in your rounds, turning fear, pride, and damage into one ugly rhythm.',
      trigger: isMishimeClan(life.clan) &&
        (normalizeClanAwakening(life)?.stage ?? 0) === 1 &&
        trigger === 'ageUp' &&
        (life.record.wins >= 5 || life.resources.health <= 55 || life.world.heat >= 35) &&
        !flags.mishimePressureDeepens,
      choices: [
        {
          id: 'discipline-devil-pressure',
          label: 'Discipline it',
          result: 'You built rules around the pressure. The devil gets stronger, but your hands stay yours.',
          effects: { clanAwakening: { stage: 2, control: 14, corruption: 6, markMonth: true }, stats: { control: 4, fightIq: 4, willpower: 2 }, world: { heat: -2 } },
        },
        {
          id: 'use-devil-pressure',
          label: 'Feed it',
          result: 'You fed the pressure and it answered beautifully. The room remembers the damage and the look in your eyes.',
          effects: { clanAwakening: { stage: 2, control: -8, corruption: 18, markMonth: true }, stats: { strength: 6, aggression: 6, reflexes: 3 }, resources: { reputation: 12 }, world: { heat: 8 } },
        },
        {
          id: 'master-devil-pressure',
          label: 'Master the pressure',
          result: 'You made the pressure serve the read instead of drowning it. That balance scares people who understand fighting.',
          effects: { clanAwakening: { stage: 2, control: 8, corruption: 10, markMonth: true }, stats: { technique: 4, willpower: 4, aggression: 2 }, resources: { reputation: 6 }, world: { heat: 4 } },
        },
      ],
    },
    {
      id: 'mishime-full-awakening',
      flag: 'mishimeFullAwakening',
      title: 'Devil Form Awakening',
      body: 'The Mishime bloodline stops feeling like a hidden tool. It stands at the edge of every exchange now, waiting to become the whole fight.',
      trigger: isMishimeClan(life.clan) &&
        (normalizeClanAwakening(life)?.stage ?? 0) === 2 &&
        trigger === 'ageUp' &&
        ((life.defeatedSpecialFights ?? []).length > 0 || life.tournament?.champion || life.world.heat >= 75) &&
        !flags.mishimeFullAwakening,
      choices: [
        {
          id: 'seal-devil-form',
          label: 'Seal the form',
          result: 'You kept the full form behind a locked door. It still exists, but now it has to break through your discipline first.',
          effects: { clanAwakening: { stage: 3, control: 18, corruption: 4, markMonth: true }, stats: { control: 6, fightIq: 5, willpower: 3 }, world: { heat: -5 } },
        },
        {
          id: 'unleash-devil-form',
          label: 'Unleash it',
          result: 'You let Devil Form arrive without apology. Power answers immediately; consequences start taking notes.',
          effects: { clanAwakening: { stage: 3, control: -10, corruption: 24, markMonth: true }, stats: { strength: 8, aggression: 8, reflexes: 5 }, resources: { reputation: 18 }, world: { heat: 14 } },
        },
        {
          id: 'master-devil-form',
          label: 'Master Devil Form',
          result: 'You turned the full form into a weapon instead of a possession. It is still dangerous. It is finally pointed.',
          effects: { clanAwakening: { stage: 3, control: 8, corruption: 8, markMonth: true }, stats: { strength: 4, technique: 4, willpower: 4, control: 3 }, resources: { reputation: 10 }, world: { heat: 6 } },
        },
      ],
    },
    {
      id: 'rival-callout',
      flag: 'rivalCallout',
      title: 'A Rival Says Your Name',
      body: 'A fighter with taped knuckles calls you out online and at the gym door. They do not want money. They want the right to say they were first to break you.',
      trigger: trigger === 'fight' &&
        context.won &&
        life.record.wins >= 3 &&
        life.resources.reputation >= 25 &&
        !flags.rivalCallout,
      choices: [
        {
          id: 'answer-callout',
          label: 'Answer publicly',
          result: 'You answered the callout. The rivalry starts feeding your name before the fight even exists.',
          effects: { resources: { reputation: 8, mood: 3 }, relationships: { rival: 18 }, stats: { aggression: 3 }, world: { heat: 4 } },
        },
        {
          id: 'ignore-rival',
          label: 'Ignore them',
          result: 'You ignored the bait and trained while they shouted. That restraint becomes its own kind of threat.',
          effects: { stats: { control: 3, fightIq: 2 }, resources: { mood: 2 }, relationships: { rival: 6 } },
        },
      ],
    },
    {
      id: 'injury-crossroads',
      flag: 'injuryCrossroads',
      title: 'The Injury Has a Voice',
      body: 'During recovery, the pain stops being background noise. Your body is telling you this can become a weakness, or become the reason your defense changes forever.',
      trigger: trigger === 'recovery' &&
        (life.injuries.length > 0 || context.hadInjury) &&
        life.resources.health <= 90 &&
        !flags.injuryCrossroads,
      choices: [
        {
          id: 'rebuild-carefully',
          label: 'Rebuild carefully',
          result: 'You rebuilt around the injury instead of pretending it never happened.',
          effects: { stats: { durability: 3, control: 3 }, resources: { health: 10, energy: 6, mood: 2 } },
        },
        {
          id: 'weaponize-pain',
          label: 'Weaponize pain',
          result: 'You treated pain as pressure testing. It made you tougher, but not cleaner.',
          effects: { stats: { willpower: 5, aggression: 3 }, resources: { health: -6, mood: -2 }, world: { heat: 2 } },
        },
      ],
    },
    {
      id: 'family-intervention',
      flag: 'familyIntervention',
      title: 'Family Intervention',
      body: 'Someone at home has seen the bruises, the money, and the way strangers look at you now. They ask if the underground is taking more than it gives.',
      trigger: trigger === 'ageUp' &&
        life.identity.age >= 16 &&
        (life.world.heat >= 30 || life.resources.health <= 55) &&
        life.relationships.family >= 45 &&
        !flags.familyIntervention,
      choices: [
        {
          id: 'promise-balance',
          label: 'Promise balance',
          result: 'You promised to keep one hand on ordinary life. It steadies you more than expected.',
          effects: { relationships: { family: 12 }, resources: { mood: 8, health: 6 }, stats: { control: 2 }, world: { heat: -5 } },
        },
        {
          id: 'choose-fight-life',
          label: 'Choose fight life',
          result: 'You chose the fight life without softening the answer. Home gets quieter after that.',
          effects: { relationships: { family: -12 }, resources: { reputation: 7, mood: -4 }, stats: { willpower: 4, aggression: 2 }, world: { heat: 6 } },
        },
      ],
    },
    {
      id: 'fighter-challenge',
      flag: `fighterChallenge-${life.identity.age}-${life.identity.month ?? 0}`,
      title: 'Someone Challenges You',
      body: 'A fighter catches you after training and says your name like an accusation. Word has been moving, and now someone wants to test whether the reputation is real.',
      trigger: false && trigger === 'ageUp' &&
        life.identity.age >= 20 &&
        life.record.wins >= 1 &&
        life.resources.reputation >= 15 &&
        context.challengeRoll < Math.min(0.85, 0.34 + life.record.wins * 0.035 + life.resources.reputation / 1000 + (life.world.heat ?? 0) / 450) &&
        !flags[`fighterChallenge-${life.identity.age}-${life.identity.month ?? 0}`],
      choices: [
        {
          id: 'accept-challenge',
          label: 'Accept the challenge',
          result: 'You accepted the challenge. The fight world likes people who answer their name.',
          effects: { startChallengeFight: true, resources: { reputation: 7, mood: 3 }, relationships: { rival: 10 }, stats: { aggression: 2, reflexes: 1 }, world: { heat: 4 } },
        },
        {
          id: 'make-them-wait',
          label: 'Make them wait',
          result: 'You refused to be pulled on someone else’s schedule. That discipline frustrates them more than fear would have.',
          effects: { stats: { control: 3, fightIq: 1 }, resources: { mood: 1 }, relationships: { rival: 5 }, world: { heat: 1 } },
        },
      ],
    },
    {
      id: 'association-pressure',
      flag: 'associationPressure',
      title: 'Association Pressure',
      body: 'Your handler sends footage of the next bracket. Every opponent looks like a bad decision with a medical team. The message underneath is simple: prepare properly, or become someone else’s highlight.',
      trigger: trigger === 'ageUp' &&
        life.association &&
        life.resources.reputation >= 180 &&
        !flags.associationPressure,
      choices: [
        {
          id: 'study-bracket',
          label: 'Study the bracket',
          result: 'You studied the bracket until the monsters became patterns instead of nightmares.',
          effects: { stats: { fightIq: 5, technique: 3, control: 2 }, resources: { energy: -8 } },
        },
        {
          id: 'train-for-war',
          label: 'Train for war',
          result: 'You trained like the bracket was already in the room. Your body paid up front.',
          effects: { stats: { strength: 4, durability: 4, willpower: 3 }, resources: { health: -8, energy: -10 }, world: { heat: 4 } },
        },
      ],
    },
    {
      id: 'association-invite',
      flag: 'associationInvite',
      title: 'Underground Association Invitation',
      body: 'A private representative offers you a fighter contract. The association runs corporate grudge tournaments where sponsors settle power with bodies. The opponents are not normal elites. They are true monsters.',
      trigger: ['ageUp', 'fight'].includes(trigger) &&
        life.world.hiddenWorld &&
        life.record.wins >= 5 &&
        life.resources.reputation >= 75 &&
        !life.association &&
        !flags.associationInvite,
      choices: [
        {
          id: 'sign-contract',
          label: 'Sign the contract',
          result: 'You signed with the Obsidian Ring Association. Tournament handlers now know your measurements, habits, and price.',
          effects: {
            association: 'Obsidian Ring Association',
            world: { hiddenWorld: true, league: 'Obsidian Ring Association', heat: 18 },
            resources: { reputation: 20, money: 5000 },
          },
        },
        {
          id: 'stay-independent',
          label: 'Stay independent',
          result: 'You refused the association contract. The offer expires, but your independence becomes part of your legend.',
          effects: { resources: { reputation: 8, mood: 6 }, stats: { willpower: 4 }, world: { heat: -6 } },
        },
      ],
    },
  ];

  return clone(events.find((event) => event.trigger) ?? null);
}

export function resolveEventChoice(life, choiceId) {
  if (!life.pendingEvent) return life;
  const choice = life.pendingEvent.choices.find((item) => item.id === choiceId);
  if (!choice) return life;

  const next = clone(life);
  applyEventEffects(next, choice.effects);
  if (choice.effects?.startChallengeFight) {
    next.activeFight = createActiveFight(next, challengeOpponentFor(next));
    next.nextFightPrep = {};
  }
  next.pendingEvent = null;
  return addLog(next, choice.result, 'event');
}

function applyEventEffects(life, effects = {}) {
  for (const [stat, amount] of Object.entries(effects.stats ?? {})) {
    life.stats[stat] = clampLifeStat(life, stat, (life.stats[stat] ?? 0) + amount);
  }
  for (const [resource, amount] of Object.entries(effects.resources ?? {})) {
    life.resources[resource] = resource === 'money'
      ? Math.max(0, (life.resources[resource] ?? 0) + amount)
      : clamp((life.resources[resource] ?? 0) + amount, 0, resource === 'reputation' ? 999 : 100);
  }
  for (const [relationship, amount] of Object.entries(effects.relationships ?? {})) {
    life.relationships[relationship] = clamp((life.relationships[relationship] ?? 0) + amount);
  }
  if (effects.world) {
    const currentHeat = life.world.heat ?? 0;
    life.world = { ...life.world, ...effects.world };
    if ('heat' in effects.world) {
      life.world.heat = clamp(currentHeat + effects.world.heat, 0, 100);
    }
  }
  if (effects.association) {
    life.association = effects.association;
  }
  if (effects.clanAwakening) {
    const current = normalizeClanAwakening(life) ?? { ...DEFAULT_CLAN_AWAKENING };
    life.clanAwakening = {
      stage: Math.max(current.stage, effects.clanAwakening.stage ?? current.stage),
      control: clamp(current.control + (effects.clanAwakening.control ?? 0)),
      corruption: clamp(current.corruption + (effects.clanAwakening.corruption ?? 0)),
      lastAwakeningMonth: effects.clanAwakening.markMonth ? lifeMonth(life) : current.lastAwakeningMonth,
    };
  }
  if (effects.hunterWorld) {
    life.hunterWorld = normalizeHunterWorld(life.hunterWorld);
    if (effects.hunterWorld.unlock) {
      unlockHunterWorld(life, effects.hunterWorld);
    }
    if (effects.hunterWorld.delayMonths) {
      life.hunterWorld.rejectedUntilMonth = lifeMonth(life) + effects.hunterWorld.delayMonths;
    }
  }
  if (effects.injury) {
    addOrUpgradeInjury(life, withInjuryTier({ name: effects.injury, text: `${effects.injury} needs recovery before harder fights.` }, 'Mild'));
  }
}
