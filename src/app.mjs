import {
  CLANS,
  CLAN_RARITIES,
  FIGHT_TACTICS,
  FIGHT_MOVES,
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
  endLife,
  getAvailableFights,
  getAdaptedOpponent,
  getLockedFights,
  getExperienceBoost,
  getOpponentArchetype,
  getPlayerArchetype,
  getAutoRecoveryStatus,
  getAutoTrainingStatus,
  getCoachedFightOptions,
  getSpecialTrainingStatus,
  getSpecialFights,
  getStatCap,
  TECHNIQUE_TRACKS,
  getUnlockedFightMoves,
  joinTournament,
  recover,
  redeemClanPassword,
  rerollClan,
  resolveEventChoice,
  spendLifeChoice,
  spendMoneyAction,
  startFight,
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
  scheduleCoachedFight,
  toggleAutoRecovery,
  toggleAutoTraining,
  useSocialAction,
} from './sim.mjs';

const STORAGE_KEY = 'underground-life-sim-save-v1';
const LOG_LIMIT = 8;
const AUTO_ROUTINE_INTERVAL_MS = 1000;
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

let state = loadGame();
let selectedGender = 'Male';
let activeTab = 'life';
let currentClanExpanded = false;
let selectedFightCategory = null;
let uiFeedback = { changed: {}, toast: null, latestExchangeKey: null };
let moveIconBurst = null;
let pendingCoachScrollY = null;
let feedbackTimer = null;
let autoRoutineTimer = null;
let moveIconBurstTimer = null;
const MOVE_ICON_BURST_DURATION_MS = 5000;

const app = document.querySelector('#app');

function saveGame() {
  if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function preloadMoveIcons() {
  for (const src of Object.values(MOVE_ICON_ASSETS)) {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    moveIconPreloadCache.push(image);
  }
}

function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? normalizeSave(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function normalizeSave(save) {
  const migratedClan = migrateClan(save.clan);
  return {
    ...save,
    identity: {
      ...save.identity,
      month: save.identity?.month ?? 0,
    },
    clan: migratedClan,
    pendingEvent: save.pendingEvent ?? null,
    trainingPopup: save.trainingPopup ?? null,
    trainingSessionCount: save.trainingSessionCount ?? 0,
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
    'Harbor Worker Blood': 'Sekiba Family',
    'Kaizumi Family': 'Sekiba Family',
    'Open Road Kin': 'Cosmoe Line',
    'Mizuhara Line': 'Cosmoe Line',
    'Iron Vein Clan': 'Doppoe House',
    'Tetsugawa Clan': 'Doppoe House',
    'Serpent School Clan': 'Ryukoo Clan',
    'Jakurai Clan': 'Ryukoo Clan',
    'Mirror Fist Lineage': 'Nikoo Style Line',
    'Kanemori Line': 'Nikoo Style Line',
    'Red Lantern Family': 'Kuri Clan',
    'Kurebayashi Family': 'Kuri Clan',
    'Ghost Step Clan': 'Reihitoo Clan',
    'Shiranami Clan': 'Reihitoo Clan',
    'Oniwake Bloodline': 'Hanmo Bloodline',
    'Hanegami Bloodline': 'Hanmo Bloodline',
    'Empty Bone Sect': 'Shibukawae House',
    'Amahisa House': 'Shibukawae House',
    'Apex Vessel Line': 'Agitoo Dynasty',
    'Tokunaga Dynasty': 'Agitoo Dynasty',
    'Dragon Maw Clan': 'Bakiya Clan',
    'Ryuzaki Clan': 'Bakiya Clan',
    'First Monster Descendant': 'Orochiya Bloodline',
    'Orogami Bloodline': 'Orochiya Bloodline',
  };
  const nextName = renamed[clan?.name];
  if (!nextName) return clan;
  return CLANS.find((item) => item.name === nextName) ?? clan;
}

function setState(next, options = {}) {
  const previous = state;
  state = next;
  uiFeedback = buildUiFeedback(previous, next);
  saveGame();
  render();
  applyPendingCoachScroll();
  scheduleFeedbackClear();
  if (!options.skipAutoRoutine) scheduleAutoRoutine();
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
    render();
  }, 1200);
}

function triggerMoveIconBurst(moveId) {
  const src = MOVE_ICON_ASSETS[moveId];
  if (!src) return;
  const label = FIGHT_MOVES[moveId]?.label ?? moveId;
  moveIconBurst = { id: moveId, label, key: Date.now() };
  if (moveIconBurstTimer) window.clearTimeout(moveIconBurstTimer);
  moveIconBurstTimer = window.setTimeout(() => {
    moveIconBurst = null;
    render();
  }, MOVE_ICON_BURST_DURATION_MS);
}

function dismissMoveIconBurst() {
  if (!moveIconBurst) return;
  moveIconBurst = null;
  if (moveIconBurstTimer) {
    window.clearTimeout(moveIconBurstTimer);
    moveIconBurstTimer = null;
  }
  render();
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

function renderStart() {
  app.innerHTML = `
    <main class="shell start-shell">
      <section class="hero-panel">
        <p class="eyebrow">Underground Life Sim</p>
        <h1>Born normal. Built into a legend.</h1>
        <p class="subcopy">Choose gender, roll your life, chase a stronger clan, and survive the fight world behind ordinary society.</p>
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
    renderStart();
    return;
  }

  if (state.ended) {
    renderEndedLife();
    return;
  }

  app.innerHTML = `
    <main class="shell game-shell dossier-shell">
      ${renderHeader()}
      ${renderTabs()}
      <section class="content-panel dossier-panel">${renderActiveTab()}</section>
    </main>
    ${renderToast()}
    ${renderMoveIconBurst()}
    ${state.trainingPopup ? renderTrainingPopup() : ''}
    ${state.social?.lastPost ? renderSocialPostPopup() : ''}
    ${state.pendingEvent ? renderPendingEvent() : ''}
  `;
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
        <p class="eyebrow">Legacy Summary</p>
        <h1>${state.legacySummary?.title ?? state.identity.name}</h1>
        <div class="legacy-lines">
          ${(state.legacySummary?.lines ?? []).map((line) => `<p>${line}</p>`).join('')}
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
        <h1>${state.identity.name}</h1>
        <p class="muted">Age ${ageLabel(state.identity)} / ${state.identity.gender} / ${state.background.neighborhood}</p>
      </div>
      <div class="header-actions">
        <span class="badge ${rarity.color}">${state.clan.rarity}</span>
        <button class="danger small-btn" data-action="reset">Reset Life</button>
      </div>
      <div class="status-grid resource-chips">
        ${metric('Health', state.resources.health)}
        ${metric('Energy', state.resources.energy)}
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
  const tabs = [
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
    ['world', 'World'],
  ];
  return `
    <nav class="tabs bottom-nav" aria-label="Main game sections">
      ${tabs.map(([id, label]) => `<button class="tab-btn ${activeTab === id ? 'active' : ''}" data-tab="${id}"><span>${label}</span></button>`).join('')}
    </nav>
  `;
}

function renderActiveTab() {
  if (activeTab === 'train') return renderTrain();
  if (activeTab === 'recover') return renderRecover();
  if (activeTab === 'money') return renderMoney();
  if (activeTab === 'fight') return renderFight();
  if (activeTab === 'tournament') return renderTournament();
  if (activeTab === 'rival') return renderRival();
  if (activeTab === 'coach') return renderCoach();
  if (activeTab === 'body') return renderBody();
  if (activeTab === 'social') return renderSocial();
  if (activeTab === 'world') return renderWorld();
  return renderLife();
}

function renderLife() {
  return `
    <section class="stack">
      <button class="clan-card clan-card-button ${currentClanExpanded ? 'expanded' : ''}" data-action="toggle-current-clan" aria-expanded="${currentClanExpanded}">
        <div>
          <p class="eyebrow">Current Clan</p>
          <h2>${state.clan.name}</h2>
          <p>${state.clan.description}</p>
        </div>
        <div class="reroll-box">
          <strong>${state.resources.clanRerolls}</strong>
          <span>Clan Rerolls</span>
        </div>
        <span class="clan-card-toggle">${currentClanExpanded ? 'Hide Benefits' : 'Show Benefits'}</span>
      </button>
      ${currentClanExpanded ? renderCurrentClanDetails() : ''}
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
      ${renderMentorSummary()}
      ${renderLog()}
      <button class="danger" data-action="end-life">End Life</button>
      <button class="danger" data-action="reset">Reset Life</button>
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
        <p><strong>Traits</strong><span>${clan.traits.join(', ')}</span></p>
        <p><strong>Options</strong><span>${clan.options.join(', ')}</span></p>
        <p><strong>Drawbacks</strong><span>${clan.drawbacks.join(', ')}</span></p>
      </div>
    </article>
  `;
}

function renderTrain() {
  return `
    <section class="stack">
      <div class="section-heading">
        <h2>Training</h2>
        <p>Build power, technique, and risk. Auto runs every ${AUTO_ROUTINE_INTERVAL_MS / 1000} seconds when your mentor can supervise it.</p>
      </div>
      <section class="card-list">
        ${Object.entries(TRAINING_ACTIONS).map(([id, action]) => renderTrainingCard(id, action)).join('')}
      </section>
      <div class="section-heading">
        <h2>Special Trainings</h2>
        <p>Monthly ceiling work. These do not raise stats directly; they raise the cap those stats can reach.</p>
      </div>
      <section class="card-list">
        ${Object.entries(SPECIAL_TRAINING_ACTIONS).map(([id, action]) => renderSpecialTrainingCard(id, action)).join('')}
      </section>
    </section>
  `;
}

function renderTrainingCard(id, action) {
  const autoStatus = getAutoTrainingStatus(state, id);
  const autoEnabled = Boolean(state.autoTraining?.[id]) && !autoStatus.locked;
  return `
    <article class="option-card train-card" data-train-card="${id}">
      ${renderTrainingImage(id, action)}
      <div>
        <h2>${action.name}</h2>
        <p>${action.text}</p>
        <p class="muted">Cost ${action.cost} energy / Risk ${action.risk}</p>
        <p class="muted">Auto: ${autoStatus.reason}</p>
      </div>
      <div class="mini-actions two-actions">
        <button data-action="train-${id}">Train</button>
        <button class="small-btn ${autoEnabled ? 'primary' : ''}" data-action="auto-train-${id}">
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
      <div class="section-heading">
        <h2>Recovery</h2>
        <p>Recover health, energy, mood, and injuries before your body turns progress into debt. Auto checks every ${AUTO_ROUTINE_INTERVAL_MS / 1000} seconds.</p>
      </div>
      <section class="card-list">
        ${Object.entries(RECOVERY_ACTIONS).map(([id, action]) => renderRecoveryCard(id, action)).join('')}
      </section>
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
          ${autoStatus.locked ? 'Auto Locked' : autoEnabled ? 'Auto On' : 'Auto Off'}
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
        <section class="fight-tier">
          <div class="section-heading">
            <h2>${group}</h2>
            <p>${moneyGroupDescription(group)}</p>
          </div>
          <div class="card-list">
            ${Object.entries(MONEY_ACTIONS)
              .filter(([, action]) => action.group === group)
              .map(([id, action]) => renderMoneyAction(id, action))
              .join('')}
          </div>
        </section>
      `).join('')}
      ${renderLog('money')}
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
  const otherSpecialFights = specialFights.filter(({ id }) => !KENGAN_FIGHTER_IDS.has(id) && !BAKI_FIGHTER_IDS.has(id));

  return `
    <section class="stack">
      <div class="record-card">
        <strong>${state.record.wins}-${state.record.losses}</strong>
        <span>${state.record.kos} finishes / ${getAvailableFights(state).length} normal fights / ${(state.unlockedSkills ?? []).length} skills</span>
      </div>
      ${renderFightRosterGroup({
        title: 'Normal Fighters',
        subtitle: 'Local names, underground grinders, corporate contracts, and locked targets you can build toward.',
        count: Object.values(available).reduce((sum, fights) => sum + fights.length, 0),
        open: true,
        body: renderNormalFightRoster(available, locked),
      })}
      ${renderFightRosterGroup({
        title: 'Kengan Fighters',
        subtitle: 'Association-style monsters with huge rewards, skills, adaptation, and rematch growth.',
        count: kenganFights.length,
        body: renderSpecialFightRoster(kenganFights),
      })}
      ${renderFightRosterGroup({
        title: 'Baki Fighters',
        subtitle: 'Arena nightmare bosses built around freak bodies, old-school killers, and monster pride.',
        count: bakiFights.length,
        body: renderSpecialFightRoster(bakiFights),
      })}
      ${otherSpecialFights.length ? renderFightRosterGroup({
        title: 'Other Special Fighters',
        subtitle: 'Special bosses that do not belong to the main two files yet.',
        count: otherSpecialFights.length,
        body: renderSpecialFightRoster(otherSpecialFights),
      }) : ''}
    </section>
  `;
}

function renderFightRosterGroup({ title, subtitle, count, body, open = false }) {
  return `
    <details class="fight-roster-group" ${open ? 'open' : ''}>
      <summary class="fight-roster-summary">
        <span>
          <strong>${title}</strong>
          <em>${subtitle}</em>
        </span>
        <b>${count}</b>
      </summary>
      <div class="fight-roster-body">
        ${body}
      </div>
    </details>
  `;
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

  const lockedMarkup = locked.length ? `
    <section class="fight-tier">
      <div class="section-heading compact-heading">
        <h2>Locked Normal Fights</h2>
        <p>Future smoke. These show what to chase next.</p>
      </div>
      <div class="locked-grid">
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
      </div>
    </section>
  ` : '';

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
  const championName = tournament.champion ? state.identity.name : 'Champion';
  const playerSlot = (label = 'You') => `<div class="bracket-slot player ${tournament.eliminated ? 'lost' : 'won'}"><span>${state.identity.name}</span><em>${label}</em></div>`;
  const slot = (index) => {
    const opponent = OPPONENTS[tournament.entrants[index]];
    const status = tournament.complete && tournament.champion ? 'cleared' : index < current ? 'won' : index === current && active ? 'next' : 'waiting';
    return `<div class="bracket-slot ${status}"><span>${opponent?.name ?? 'TBD'}</span></div>`;
  };
  const winner = (indexes, label) => {
    const cleared = Math.min(...indexes) < current;
    const name = cleared ? state.identity.name : label;
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
    ${active ? `<p class="muted bracket-next">Current bracket match: ${state.identity.name} vs ${OPPONENTS[tournament.entrants[current]]?.name ?? 'TBD'}</p>` : ''}
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
          <h2>${state.identity.name} vs ${opponent.name}</h2>
          <p class="muted">${opponent.style} / ${opponent.threat} threat</p>
        </div>
        <span class="badge ${fight.finished && fight.result.won ? 'green' : 'red'}">${fight.finished ? (fight.result.won ? 'Win' : 'Loss') : 'Live'}</span>
      </article>
      ${renderCombatMeters(fight)}
      ${fight.exchanges.length === 0 ? renderBreakdown(fight) : ''}
      ${fight.finished ? renderFightReport(fight) : renderTactics()}
      ${renderExchanges(fight)}
    </section>
  `;
}

function activeFightOpponent(fight) {
  if (fight.opponentId !== 'rival') return getAdaptedOpponent(state, fight.opponentId) ?? OPPONENTS[fight.opponentId];
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
      ${combatMeter('Stamina', fight.meters.playerStamina, 'You')}
      ${combatMeter('Enemy Gas', fight.meters.opponentStamina, 'Opponent')}
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
  return `
    <article class="breakdown dossier-report">
      <h2>Pre-Fight Read</h2>
      ${fight.breakdown.map((line) => `<p class="${line.startsWith('Specific weak move:') ? 'weak-move-read' : ''}">${line}</p>`).join('')}
    </article>
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
      <button class="primary wide" data-action="close-fight">Back to Fight List</button>
    </article>
  `;
}

function renderBody() {
  const totalFights = state.record.wins + state.record.losses;
  const experienceBoost = getExperienceBoost(state);
  return `
    <section class="stack">
      <article class="option-card">
        <div>
          <h2>Experience Boost</h2>
          <p>+${experienceBoost} max cap to every stat from ${totalFights}/100 fight mileage.</p>
          <p class="muted">Wins build the boost faster. Losses still teach your body, but not as much.</p>
        </div>
      </article>
      ${renderTechniques()}
      <div class="stats-grid">
        ${Object.entries(state.stats).map(([stat, value]) => `
          <div class="stat-row ${feedbackClass(`stat-${stat}`)}">
            <span>${labelize(stat)}</span>
            <div class="bar"><i style="width:${Math.min(100, (value / currentStatCap(stat)) * 100)}%"></i></div>
            <strong>${value}/${currentStatCap(stat)}</strong>
          </div>
        `).join('')}
      </div>
      <article class="option-card injury-card">
        <div>
          <h2>Injury List</h2>
          <p>${state.injuries.length ? state.injuries.map(formatInjury).join(', ') : 'No lasting injuries yet.'}</p>
          <p class="muted">Training injuries can now trigger popup choices. Recovery and doctors can remove them.</p>
        </div>
      </article>
      <article class="option-card">
        <div>
          <h2>${state.clan.name}</h2>
          <p>Bonuses: ${formatClanBonuses(state.clan)}</p>
          <p>Passive: ${formatClanPassive(state.clan)}</p>
          <p>Special: ${formatClanSpecial(state.clan)}</p>
          <p class="muted">Traits: ${state.clan.traits.join(' / ')}</p>
          <p>Options: ${state.clan.options.join(', ')}</p>
          <p>Drawbacks: ${state.clan.drawbacks.join(', ')}</p>
        </div>
      </article>
      <section class="clan-reference">
        <div class="section-heading">
          <h2>Clan Benefits</h2>
          <p>Use this before spending rerolls. Higher rarity clans are stronger.</p>
        </div>
        ${CLANS.map((clan) => renderClanReference(clan)).join('')}
      </section>
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
        <p><strong>Traits</strong><span>${clan.traits.join(', ')}</span></p>
        <p><strong>Options</strong><span>${clan.options.join(', ')}</span></p>
        <p><strong>Drawbacks</strong><span>${clan.drawbacks.join(', ')}</span></p>
      </div>
      <span class="badge ${rarity.color}">${clan.rarity}</span>
    </article>
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
      <section class="log rival-feed">
        <h2>Rival Feed</h2>
        ${(rival.feed ?? []).slice(0, 12).map((item) => `<p><span>${item.type}</span>${item.text}</p>`).join('')}
      </section>
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
      <article class="option-card full coach-hero-card">
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
      </section>
      <section class="log rival-feed">
        <h2>Stable Feed</h2>
        ${(coach.feed ?? []).slice(0, 12).map((item) => `<p><span>${item.type}</span>${item.text}</p>`).join('') || '<p class="muted">No stable news yet.</p>'}
      </section>
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
      <section class="money-group">
        <h2>Social Media</h2>
        <div class="money-grid">
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
        </div>
      </section>
      <section class="money-group">
        <h2>Trash Talk Targets</h2>
        <div class="money-grid">
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
        </div>
      </section>
      ${renderMentorSummary(true)}
      <article class="option-card full">
        <div>
          <h2>Social Pressure</h2>
          <p>Family keeps you human. Mentors boost focused training. Rivals sharpen you. Sponsors open doors and attach strings. Followers turn your fights into money, hype, heat, and consequences.</p>
        </div>
      </article>
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
      <article class="option-card">
        <div>
          <h2>Rumors</h2>
          <ul class="rumors">
            ${state.world.rumors.map((rumor) => `<li>${rumor}</li>`).join('')}
          </ul>
        </div>
      </article>
      ${renderLog('world')}
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
        <p class="eyebrow">Triggered Event</p>
        <h2>${event.title}</h2>
        <p>${event.body}</p>
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
  return parts.slice(0, 4).join(' / ') || 'Story choice';
}

function labelize(value) {
  return value.replace(/[A-Z]/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase());
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
    setState(createNewLife({ gender: selectedGender }));
    activeTab = 'life';
    selectedFightCategory = null;
    return;
  }
  if (!state) return;
  if (action === 'toggle-current-clan') {
    currentClanExpanded = !currentClanExpanded;
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
  if (action === 'choice-school') setState(spendLifeChoice(state, 'school'));
  if (action === 'choice-street') setState(spendLifeChoice(state, 'street'));
  if (action === 'choice-job') setState(spendLifeChoice(state, 'job'));
  if (action === 'choice-mentor') setState(spendLifeChoice(state, 'mentor'));
  if (action === 'reset') {
    localStorage.removeItem(STORAGE_KEY);
    state = null;
    activeTab = 'life';
    render();
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
    setState(startFight(state, action.replace('start-fight-', '')));
  }
  if (action === 'start-rival-fight') {
    selectedFightCategory = null;
    setState(startRivalFight(state));
  }
  if (action === 'join-tournament') {
    activeTab = 'tournament';
    setState(joinTournament(state));
  }
  if (action === 'start-tournament-fight') {
    selectedFightCategory = null;
    activeTab = 'tournament';
    setState(startTournamentFight(state));
  }
  if (action.startsWith('open-tactic-')) {
    selectedFightCategory = action.replace('open-tactic-', '');
    render();
  }
  if (action === 'close-tactic-menu') {
    selectedFightCategory = null;
    render();
  }
  if (action.startsWith('fight-turn-')) {
    const moveId = action.replace('fight-turn-', '');
    selectedFightCategory = null;
    triggerMoveIconBurst(moveId);
    setState(takeFightTurn(state, moveId));
  }
  if (action === 'close-fight') {
    selectedFightCategory = null;
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
  const gender = event.target.closest('[data-gender]');
  if (gender) {
    selectedGender = gender.dataset.gender;
    render();
    return;
  }

  const tab = event.target.closest('[data-tab]');
  if (tab) {
    activeTab = tab.dataset.tab;
    render();
    return;
  }

  const action = event.target.closest('[data-action]');
  if (action) handleAction(action.dataset.action, action);
});

document.addEventListener('pointerdown', (event) => {
  if (!moveIconBurst) return;
  dismissMoveIconBurst();
  event.stopPropagation();
  if (event.cancelable) event.preventDefault();
}, { capture: true });

document.addEventListener('change', (event) => {
  const coachFightSelect = event.target.closest('[data-coach-fight-select]');
  if (coachFightSelect) updateCoachBookingPreview(coachFightSelect);
});

preloadMoveIcons();
render();
scheduleAutoRoutine();
