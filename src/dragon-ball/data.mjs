export const DRAGON_BALL_SAVE_KEY = 'dragon-ball-deck-builder-save-v1';
export const DRAGON_BALL_VERSION = 1;
export const STAT_KEYS = ['health', 'power', 'defense', 'speed', 'ki', 'spirit'];
export const CARD_TYPES = ['move', 'form', 'heal', 'support', 'counter', 'injury'];
export const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

const card = (id, name, type, cost, text, effect = {}, extra = {}) => ({
  id, name, type, cost, text, effect, rarity: 'common', minAge: 6, origins: [], ...extra,
});

const starterCards = [
  card('quick-jab', 'Quick Jab', 'move', 0, 'Deal 6 damage.', { damage: 6 }),
  card('driving-kick', 'Driving Kick', 'move', 1, 'Deal 11 damage.', { damage: 11 }),
  card('ki-bolt', 'Ki Bolt', 'move', 1, 'Deal 9 damage. Gain 1 Focus.', { damage: 9, focus: 1 }),
  card('guard-stance', 'Guard Stance', 'support', 1, 'Gain 10 Block.', { block: 10 }),
  card('battle-breath', 'Battle Breath', 'heal', 1, 'Heal 7 and clear Weak.', { heal: 7, clear: 'weak' }),
  card('afterimage-step', 'Afterimage Step', 'counter', 1, 'Gain 7 Block. Draw 1.', { block: 7, draw: 1 }),
  card('heavy-palm', 'Heavy Palm', 'move', 1, 'Deal 8 damage and apply Weak.', { damage: 8, weak: 1 }),
  card('center-yourself', 'Center Yourself', 'support', 0, 'Gain 1 Ki and 2 Spirit.', { ki: 1, spirit: 2 }),
  card('rising-uppercut', 'Rising Uppercut', 'move', 2, 'Deal 17 damage.', { damage: 17 }),
  card('deflecting-guard', 'Deflecting Guard', 'counter', 1, 'Gain 12 Block.', { block: 12 }),
  card('tail-sweep', 'Tail Sweep', 'move', 1, 'Deal 8 damage. Draw 1.', { damage: 8, draw: 1 }, { origins: ['saiyan'] }),
  card('turtle-discipline', 'Turtle Discipline', 'support', 1, 'Gain 6 Block and 1 Focus.', { block: 6, focus: 1 }, { origins: ['earthling'] }),
  card('stretching-strike', 'Stretching Strike', 'move', 1, 'Deal 10 damage and apply Weak.', { damage: 10, weak: 1 }, { origins: ['namekian'] }),
  card('energy-scan', 'Energy Scan', 'support', 0, 'Draw 2. Gain 1 Focus.', { draw: 2, focus: 1 }, { origins: ['android'] }),
];

const moveNames = [
  'Meteor Rush', 'Wolf Fang Volley', 'Crane Beak Strike', 'Comet Hammer', 'Mountain Breaker',
  'Cyclone Knee', 'Solar Flare Kick', 'Dragon Tail Smash', 'Sky Piercing Fist', 'Thunderclap Palm',
  'Burst Step Barrage', 'Rising Dragon Combo', 'Phantom Elbow', 'Gravity Drop', 'Meteoric Headbutt',
  'Demon Flash', 'Rapid Fire Fists', 'Spirit Crusher', 'Nova Knee', 'Heaven Splitter',
  'Ki Cannon', 'Twin Ki Sphere', 'Piercing Beam', 'Explosive Wave', 'Scatter Shot',
  'Burning Ray', 'Masenko Echo', 'Galick Burst', 'Kame Wave', 'Final Impact',
  'Destructo Arc', 'Tri-Beam Pulse', 'Special Beam Spiral', 'Big Bang Sphere', 'Spirit Bomb Seed',
  'Dragon Fist', 'Stardust Breaker', 'Soul Punisher', 'God Flash', 'Ultra Barrage',
  'Savage Sunday', 'Crusher Ball', 'Death Beam', 'Revenge Cannon', 'Omega Blaster',
  'Hellzone Volley', 'Light Grenade', 'Rocket Punch', 'Infinity Bullet', 'Photon Crash',
];

const moveCards = moveNames.map((name, index) => {
  const tier = Math.floor(index / 10);
  const legendary = index >= 35;
  const cost = legendary ? 3 : index >= 20 ? 2 : 1;
  const damage = 10 + tier * 5 + (index % 5) * 2;
  const cooldownAges = legendary ? (index >= 40 ? 3 : 2) : index >= 30 ? 1 : 0;
  const origins = index >= 45 ? ['android'] : index >= 40 ? ['saiyan'] : index >= 35 ? [] : index >= 30 ? ['namekian'] : [];
  return card(
    `move-${index + 1}`,
    name,
    'move',
    cost,
    `Deal ${damage} damage${cooldownAges ? `. Cooldown ${cooldownAges} Age Ups` : ''}.`,
    { damage, focus: index % 9 === 0 ? 1 : 0 },
    {
      rarity: legendary ? 'legendary' : tier >= 3 ? 'epic' : tier >= 2 ? 'rare' : tier >= 1 ? 'uncommon' : 'common',
      minAge: 6 + tier * 2,
      cooldownAges,
      origins,
    }
  );
});

const utilityNames = {
  counter: [
    'Slip Counter', 'Ki Deflection', 'Instant Guard', 'Vanish Counter', 'Cross-Arm Catch',
    'Pressure Reversal', 'Mirror Step', 'Perfect Read', 'Time-Skip Read', 'Autonomous Dodge',
    'Saiyan Reflex', 'Human Ingenuity', 'Namekian Foresight', 'Android Barrier',
  ],
  heal: [
    'Senzu Fragment', 'Healing Meditation', 'Namekian Renewal', 'Emergency Repair', 'Second Wind',
    'Spirit Recovery', 'Battlefield First Aid', 'Vitality Surge', 'Restoration Wave', 'Divine Recovery',
  ],
  support: [
    'Power Up', 'Ki Charge', 'Battle Cry', 'Weighted Training', 'Gravity Training',
    'Image Training', 'Potential Unleashed', 'Calm Mind', 'Fighting Genius', 'Rivalry Spark',
    'Zenkai Memory', 'Meditation Chamber', 'Combat Analysis', 'Spirit Control', 'God Ki Lesson',
    'Fusion Practice', 'Dragon Radar Intel', 'Capsule Support',
  ],
};

const utilityCards = Object.entries(utilityNames).flatMap(([type, names]) => names.map((name, index) => {
  const tier = Math.floor(index / 4);
  const effects = type === 'counter'
    ? { block: 8 + index * 2, draw: index % 3 === 0 ? 1 : 0 }
    : type === 'heal'
      ? { heal: 8 + index * 3, clear: index % 2 ? 'weak' : 'burn' }
      : { block: index % 3 === 0 ? 5 + tier * 2 : 0, focus: 1 + Math.floor(index / 7), draw: index % 4 === 1 ? 1 : 0, ki: index % 5 === 0 ? 1 : 0 };
  const origin = name.includes('Saiyan') || name.includes('Zenkai') ? ['saiyan']
    : name.includes('Human') ? ['earthling']
      : name.includes('Namekian') ? ['namekian']
        : name.includes('Android') || name.includes('Repair') ? ['android']
          : [];
  return card(
    `${type}-${index + 1}`,
    name,
    type,
    Math.min(2, index >= 8 ? 2 : 1),
    type === 'counter' ? `Gain ${effects.block} Block${effects.draw ? ' and draw 1' : ''}.`
      : type === 'heal' ? `Heal ${effects.heal} and clear ${effects.clear}.`
        : 'Build momentum with block, Focus, draw, or Ki.',
    effects,
    { rarity: tier >= 3 ? 'epic' : tier >= 2 ? 'rare' : tier >= 1 ? 'uncommon' : 'common', minAge: 6 + tier * 2, origins: origin }
  );
}));

const forms = [
  ['form-saiyan-1', 'Great Ape Control', ['saiyan'], 8, 1.35, 1.05, 1],
  ['form-saiyan-2', 'Kaioken', ['saiyan', 'earthling'], 9, 1.4, 1.15, 1],
  ['form-saiyan-3', 'Super Saiyan 1 (SSJ1)', ['saiyan'], 11, 1.65, 1.2, 1],
  ['form-saiyan-4', 'Ascended Super Saiyan (Grade 2)', ['saiyan'], 13, 1.85, 1.3, 1],
  ['form-saiyan-5', 'Super Saiyan 2 (SSJ2)', ['saiyan'], 14, 2.05, 1.45, 1],
  ['form-saiyan-6', 'Super Saiyan 3 (SSJ3)', ['saiyan'], 16, 2.35, 1.35, 2],
  ['form-saiyan-7', 'Super Saiyan God', ['saiyan'], 18, 2.55, 1.7, 1],
  ['form-saiyan-8', 'Super Saiyan Blue', ['saiyan'], 19, 2.8, 1.85, 1],
  ['form-saiyan-9', 'Ultra Instinct Sign', ['saiyan', 'earthling'], 20, 3.0, 2.1, 2],
  ['form-earth-1', 'Turtle School Mastery', ['earthling'], 8, 1.25, 1.3, 0],
  ['form-earth-2', 'Crane School Mastery', ['earthling'], 10, 1.35, 1.4, 0],
  ['form-earth-3', 'Four Witches Technique', ['earthling'], 12, 1.55, 1.25, 1],
  ['form-earth-4', 'Potential Unleashed', ['earthling', 'namekian'], 15, 2.05, 1.65, 0],
  ['form-earth-5', 'Ultra Human', ['earthling'], 19, 2.65, 2.15, 1],
  ['form-namek-1', 'Giant Namekian', ['namekian'], 9, 1.45, 1.25, 1],
  ['form-namek-2', 'Warrior Assimilation', ['namekian'], 12, 1.7, 1.45, 0],
  ['form-namek-3', 'Super Namekian', ['namekian'], 15, 2.15, 1.7, 0],
  ['form-namek-4', 'Orange Namekian', ['namekian'], 19, 2.75, 2.0, 1],
  ['form-android-1', 'Overclock Mode', ['android'], 8, 1.35, 1.35, 0],
  ['form-android-2', 'Infinite Reactor', ['android'], 12, 1.65, 1.65, 0],
  ['form-android-3', 'Super Android Frame', ['android'], 16, 2.2, 1.75, 0],
  ['form-android-4', 'Limitless Core', ['android'], 19, 2.7, 2.1, 0],
];

const formCards = forms.map(([id, name, origins, minAge, powerMultiplier, defenseMultiplier, drain]) =>
  card(id, name, 'form', 2, `Transform: x${powerMultiplier} Power, x${defenseMultiplier} Defense${drain ? `, drain ${drain} Ki each turn` : ''}.`,
    { powerMultiplier, defenseMultiplier, drain }, { origins, minAge, rarity: minAge >= 18 ? 'legendary' : minAge >= 14 ? 'epic' : 'rare' }));

const statCards = STAT_KEYS.flatMap((stat) => [1, 2, 3, 4, 5].map((tier) => ({
  id: `stat-${stat}-${tier}`,
  name: `${stat[0].toUpperCase()}${stat.slice(1)} Training ${tier}`,
  type: 'stat',
  stat,
  amount: tier * (stat === 'health' ? 6 : 2),
  rarity: RARITIES[tier - 1],
  minAge: 4 + tier * 3,
  text: `Permanently gain ${tier * (stat === 'health' ? 6 : 2)} ${stat}.`,
})));

export const INJURY_CARDS = [
  card('injury-bruised-ribs', 'Bruised Ribs', 'injury', 1, 'Dead draw. Removed on Age Up.', {}, { rarity: 'common' }),
  card('injury-burned-ki', 'Burned Ki Channels', 'injury', 1, 'Dead draw. Removed on Age Up.', {}, { rarity: 'common' }),
  card('injury-shaken-focus', 'Shaken Focus', 'injury', 1, 'Dead draw. Removed on Age Up.', {}, { rarity: 'common' }),
];

export const CARDS = Object.fromEntries(
  [...starterCards, ...moveCards, ...utilityCards, ...formCards, ...statCards, ...INJURY_CARDS].map((item) => [item.id, item])
);

export const COMBAT_CARD_IDS = Object.values(CARDS).filter((item) => CARD_TYPES.includes(item.type) && item.type !== 'injury').map((item) => item.id);
export const STAT_CARD_IDS = statCards.map((item) => item.id);

export const ORIGINS = {
  saiyan: {
    id: 'saiyan', name: 'Saiyan', passive: 'Battle Instinct', passiveText: 'Gain 1 Focus after taking unblocked damage.',
    stats: { health: 92, power: 12, defense: 7, speed: 9, ki: 9, spirit: 7 },
    deck: ['quick-jab', 'quick-jab', 'driving-kick', 'ki-bolt', 'ki-bolt', 'guard-stance', 'battle-breath', 'afterimage-step', 'tail-sweep', 'center-yourself'],
  },
  earthling: {
    id: 'earthling', name: 'Earthling', passive: 'Adaptive Tactics', passiveText: 'Draw 1 extra card on the first turn.',
    stats: { health: 100, power: 8, defense: 9, speed: 10, ki: 8, spirit: 11 },
    deck: ['quick-jab', 'quick-jab', 'driving-kick', 'heavy-palm', 'guard-stance', 'guard-stance', 'battle-breath', 'afterimage-step', 'turtle-discipline', 'center-yourself'],
  },
  namekian: {
    id: 'namekian', name: 'Namekian', passive: 'Regeneration', passiveText: 'Heal 3 at the end of each turn.',
    stats: { health: 108, power: 9, defense: 11, speed: 7, ki: 10, spirit: 10 },
    deck: ['quick-jab', 'driving-kick', 'ki-bolt', 'heavy-palm', 'guard-stance', 'guard-stance', 'battle-breath', 'battle-breath', 'stretching-strike', 'center-yourself'],
  },
  android: {
    id: 'android', name: 'Android', passive: 'Infinite Energy', passiveText: 'Start each turn with 4 Ki instead of 3.',
    stats: { health: 104, power: 10, defense: 10, speed: 8, ki: 12, spirit: 6 },
    deck: ['quick-jab', 'driving-kick', 'ki-bolt', 'ki-bolt', 'guard-stance', 'guard-stance', 'afterimage-step', 'deflecting-guard', 'energy-scan', 'center-yourself'],
  },
};

const fighterNames = [
  'Kid Goku', 'Yamcha', 'Krillin', 'Tien Shinhan', 'Piccolo Jr.',
  'Vegeta', 'Captain Ginyu', 'Frieza', 'Android 18', 'Perfect Cell',
  'Majin Buu', 'Gotenks', 'Ultimate Gohan', 'Jiren', 'Ultra Instinct Goku',
];
const rivalNames = [
  'Riku the Spark', 'Riku, Rematch Ready', 'Riku of the Burning Aura', 'Riku, Galactic Challenger', 'Riku Beyond Limits',
];
const mentorNames = [
  'Master Roshi', 'Tien Shinhan', 'Korin', 'Grand Elder Guru', 'Bulma',
  'King Kai', 'Pybara of Yardrat', 'Supreme Kai', 'Beerus', 'Whis',
];
const specialNames = [
  'Great Ape Gohan', 'Demon King Piccolo', 'Raditz', 'Nappa', 'Android 17',
  'Cell Games Gohan', 'Kid Buu', 'Vegito', 'Beerus, God of Destruction', 'Tournament of Power Final',
];

export const ENCOUNTERS_BY_AGE = Object.fromEntries(Array.from({ length: 15 }, (_, index) => {
  const age = index + 6;
  const basePower = 28 + index * 17;
  const count = index % 3 === 0 ? 3 : 4;
  const entries = [
    { id: `age-${age}-fighter`, age, type: 'fighter', name: fighterNames[index], difficulty: 1, enemyPower: basePower, reward: 'stat' },
    { id: `age-${age}-mentor`, age, type: 'mentor', name: mentorNames[index % mentorNames.length], difficulty: 0, enemyPower: 0, reward: 'stat' },
    { id: `age-${age}-special-mentor`, age, type: 'specialMentor', name: `${mentorNames[(index + 3) % mentorNames.length]}: Secret Lesson`, difficulty: 0, enemyPower: 0, reward: 'special' },
    {
      id: `age-${age}-special-fight`, age, type: 'specialFight',
      name: index % 3 === 1 ? rivalNames[Math.min(rivalNames.length - 1, Math.floor(index / 3))] : specialNames[index % specialNames.length],
      difficulty: 2, enemyPower: Math.round(basePower * 1.45), reward: index >= 10 ? 'legendary' : 'special',
    },
  ];
  return [age, entries.slice(0, count)];
}));

export const AGE_REWARD_NAMES = [
  'First Spark', 'Martial Foundation', 'Ki Awakening', 'Rivalry', 'Tower Training',
  'World Tournament', 'Gravity Training', 'Galactic Journey', 'Transformation', 'Android Crisis',
  'Perfect Challenge', 'Majin Chaos', 'Divine Training', 'Universal Survival', 'Final Championship',
];
