import {
  CARDS, LEGENDARY_SAIYAN_LINEAGE, ORIGINS, STAT_KEYS, TOWER_CARD_IDS,
} from './data.mjs';
import {
  RECOVERY_SERVICES, advanceAfterAgeDraft, beginAgeReward, beginEncounter,
  buyRecoveryService, canAgeUp, claimDraftCard, combatRewardFor, createDragonBallRun,
  recoveryDisabledReason as recoveryDisabledReasonForState, recoveryServiceCost, setDeck,
  tryAdvanceAfterAgeDraft, tryBeginAgeReward, tryBuyRecoveryService, tryClaimDraftCard,
  trySetDeck, validateDeck,
} from './state.mjs';
import { enemyForEncounter, sagaNameForAge } from './campaign.mjs';
import {
  endCombatTurn, playCombatCard, startDragonBallCombat, tryActivateCombatAbility, tryEndCombatTurn,
  tryPlayCombatCard, tryStartDragonBallCombat,
} from './combat.mjs';
import { clearDragonBallGame, loadDragonBallGame, saveDragonBallGame } from './persistence.mjs';
import {
  claimTowerReward, generateTowerEncounter, retireTowerRun, setTowerLoadout, startTowerRun,
  towerCardAtRank, tryClaimTowerReward, trySetTowerLoadout, tryStartTowerRun,
} from './tower.mjs';
import {
  createCombatAudio, createSequenceController, loadCombatPreferences, saveCombatPreferences,
} from './combat-presentation.mjs';
import { previewCardPlay, previewEnemyTurn, statusSummary } from './combat-preview.mjs';
import { analyzeDeck, suggestedDeck } from './deck-analysis.mjs';
import { calculatePowerLevel, cardPowerRating } from './power-level.mjs';
import {
  ABILITY_CATALOG, ABILITY_LIST, ABILITY_RARITIES, abilityRankText, tryPullAbility,
  trySetAbilityLoadout,
} from './abilities.mjs';

const app = document.querySelector('#dragon-ball-app');
let state = loadDragonBallGame();
let activeTab = 'journey';
let collectionFilter = 'all';
let selectedCardId = null;
let setupOrigin = 'saiyan';
let setupName = '';
let toast = '';
let combatStage = null;
let combatStageIndex = 0;
let combatStageCount = 0;
let sequenceViewState = null;
let combatAbilitiesOpen = false;
const prefersReducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
let combatPreferences = loadCombatPreferences(globalThis.localStorage, prefersReducedMotion);
const combatAudio = createCombatAudio();

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const label = (value) => String(value).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (char) => char.toUpperCase());
const GENERATED_ASSET_ROOT = './assets/dragon-ball/generated';
const VFX_ASSETS = {
  impactBurst: './assets/dragon-ball/vfx/impact-burst.png',
  impactSpark: './assets/dragon-ball/vfx/impact-spark.png',
  kiFlare: './assets/dragon-ball/vfx/ki-flare.png',
  kiCore: './assets/dragon-ball/vfx/ki-core.png',
  auraFlame: './assets/dragon-ball/vfx/aura-flame.png',
  healSparkle: './assets/dragon-ball/vfx/heal-sparkle.png',
  smokePuff: './assets/dragon-ball/vfx/smoke-puff.png',
  speedTrace: './assets/dragon-ball/vfx/speed-trace.png',
  slashArc: './assets/dragon-ball/vfx/slash-arc.png',
};
const KI_MOVE_WORDS = [
  'beam', 'wave', 'blast', 'cannon', 'sphere', 'ray', 'flash', 'bomb', 'grenade',
  'shot', 'bullet', 'photon', 'galick', 'masenko', 'kame', 'spirit', 'big bang', 'destructo',
];
const SAIYAN_FORM_ART = {
  'form-saiyan-2': 'form-saiyan-kaioken.jpg',
  'form-saiyan-3': 'form-saiyan-ssj1.jpg',
  'form-saiyan-4': 'form-saiyan-ascended.jpg',
  'form-saiyan-5': 'form-saiyan-ssj2.jpg',
  'form-saiyan-6': 'form-saiyan-ssj3.jpg',
  'form-saiyan-7': 'form-saiyan-god.jpg',
  'form-saiyan-8': 'form-saiyan-blue.jpg',
  'form-saiyan-9': 'form-saiyan-ui-sign.jpg',
};
const LEGENDARY_SAIYAN_FORM_ART = {
  'form-legendary-ikari': 'form-legendary-ikari.jpg',
  'form-legendary-ssj': 'form-legendary-ssj.jpg',
  'form-legendary-controlled': 'form-legendary-controlled.jpg',
  'form-legendary-full-power': 'form-legendary-full-power.jpg',
  'form-legendary-god': 'form-legendary-god.jpg',
};
const LEGENDARY_SAIYAN_CARD_ART = {
  'legendary-primal-roar': 'card-legendary-primal-roar.jpg',
  'legendary-green-erasure': 'card-legendary-green-erasure.jpg',
  'legendary-berserker-rush': 'card-legendary-berserker-rush.jpg',
  'legendary-gigantic-breaker': 'card-legendary-gigantic-breaker.jpg',
  'legendary-omega-blaster': 'card-legendary-omega-blaster.jpg',
  'legendary-unbreakable-aura': 'card-legendary-unbreakable-aura.jpg',
  'legendary-berserker-regeneration': 'card-legendary-berserker-regeneration.jpg',
  'legendary-limitless-fury': 'card-legendary-limitless-fury.jpg',
  'legendary-eruption-counter': 'card-legendary-eruption-counter.jpg',
  'legendary-cataclysm': 'card-legendary-cataclysm.jpg',
  'legendary-emerald-typhoon': 'card-legendary-emerald-typhoon.jpg',
  'legendary-crushing-grasp': 'card-legendary-crushing-grasp.jpg',
  'legendary-roaring-uppercut': 'card-legendary-roaring-uppercut.jpg',
  'legendary-savage-comet': 'card-legendary-savage-comet.jpg',
  'legendary-emerald-aftershock': 'card-legendary-emerald-aftershock.jpg',
  'legendary-zenkai-avalanche': 'card-legendary-zenkai-avalanche.jpg',
  'legendary-primal-execution': 'card-legendary-primal-execution.jpg',
  'legendary-giant-breakstorm': 'card-legendary-giant-breakstorm.jpg',
};
const TOWER_CARD_ART = {
  'tower-card-1': 'card-tower-infinite-breaker.jpg',
  'tower-card-2': 'card-tower-hundred-floor-rush.jpg',
  'tower-card-3': 'card-tower-abyss-reversal.jpg',
  'tower-card-4': 'card-tower-immortal-senzu.jpg',
  'tower-card-5': 'card-tower-limitless-reactor.jpg',
  'tower-card-6': 'card-tower-phantom-floor.jpg',
  'tower-card-7': 'card-tower-desperation-nova.jpg',
  'tower-card-8': 'card-tower-spirit-fountain.jpg',
  'tower-card-9': 'card-tower-ascension-pulse.jpg',
  'tower-card-10': 'card-tower-sky-splitting-beam.jpg',
  'tower-card-11': 'card-tower-pressure-collapse.jpg',
  'tower-card-12': 'card-tower-perfect-recovery.jpg',
  'tower-card-13': 'card-tower-dragon-staircase.jpg',
  'tower-card-14': 'card-tower-unbroken-guard.jpg',
  'tower-card-15': 'card-tower-form-resonance.jpg',
  'tower-card-16': 'card-tower-zero-mortal-flash.jpg',
  'tower-card-17': 'card-tower-temporal-reset.jpg',
  'tower-card-18': 'card-tower-tower-zenkai.jpg',
  'tower-card-19': 'card-tower-absolute-counter.jpg',
  'tower-card-20': 'card-tower-endless-horizon.jpg',
};

function hasLegendaryLineage(target = state) {
  return target?.saiyanLineage === LEGENDARY_SAIYAN_LINEAGE;
}

function originArt(originId = state?.origin ?? setupOrigin, lineage = state?.saiyanLineage) {
  if (originId === 'saiyan' && lineage === LEGENDARY_SAIYAN_LINEAGE) {
    return `${GENERATED_ASSET_ROOT}/origin-saiyan-legendary.jpg`;
  }
  return `${GENERATED_ASSET_ROOT}/origin-${originId}.jpg`;
}

function saiyanFormArt(formId) {
  const fileName = LEGENDARY_SAIYAN_FORM_ART[formId] ?? SAIYAN_FORM_ART[formId];
  return fileName ? `${GENERATED_ASSET_ROOT}/${fileName}` : null;
}

function characterArt(originId = state?.origin ?? setupOrigin, activeFormId = null) {
  if (originId === 'saiyan' && activeFormId) {
    return saiyanFormArt(activeFormId) ?? originArt(originId);
  }
  return originArt(originId);
}

function cardArt(item) {
  if (!item) return `${GENERATED_ASSET_ROOT}/card-support.jpg`;
  if (TOWER_CARD_ART[item.id]) return `${GENERATED_ASSET_ROOT}/${TOWER_CARD_ART[item.id]}`;
  if (LEGENDARY_SAIYAN_CARD_ART[item.id]) return `${GENERATED_ASSET_ROOT}/${LEGENDARY_SAIYAN_CARD_ART[item.id]}`;
  if (item.type === 'form' && saiyanFormArt(item.id)) return saiyanFormArt(item.id);
  if (item.type === 'form') return `${GENERATED_ASSET_ROOT}/card-form.jpg`;
  if (item.type === 'heal') return `${GENERATED_ASSET_ROOT}/card-heal.jpg`;
  if (item.type === 'support' || item.type === 'stat') return `${GENERATED_ASSET_ROOT}/card-support.jpg`;
  if (item.type === 'counter') return `${GENERATED_ASSET_ROOT}/card-counter.jpg`;
  if (item.type === 'injury') return `${GENERATED_ASSET_ROOT}/card-injury.jpg`;
  const searchable = `${item.name} ${item.text}`.toLowerCase();
  return /\bki\b/.test(searchable) || KI_MOVE_WORDS.some((word) => searchable.includes(word))
    ? `${GENERATED_ASSET_ROOT}/card-ki.jpg`
    : `${GENERATED_ASSET_ROOT}/card-strike.jpg`;
}

function towerEnemyArt(encounter) {
  return encounter?.specialTowerEnemyImage
    ? `${GENERATED_ASSET_ROOT}/${encounter.specialTowerEnemyImage}`
    : `${GENERATED_ASSET_ROOT}/card-strike.jpg`;
}

function enemyCombatArt(enemy) {
  return enemy?.specialTowerEnemyImage
    ? `${GENERATED_ASSET_ROOT}/${enemy.specialTowerEnemyImage}`
    : `${GENERATED_ASSET_ROOT}/card-strike.jpg`;
}

function update(next, message = '') {
  state = next;
  toast = message;
  saveDragonBallGame(state);
  render();
}

function updateResult(result) {
  update(result.state, result.message || result.reason);
}

function playUiSound(name = 'ui') {
  if (name === 'ui') {
    combatAudio.play('ui', combatPreferences.sound);
    return;
  }
  combatAudio.play(name, combatPreferences.sound);
}

const sequenceController = createSequenceController({
  getMotion: () => combatPreferences.motion,
  onStage(stage, index = 0, count = 0) {
    combatStage = stage;
    combatStageIndex = index;
    combatStageCount = count;
    render();
  },
  onSound(sound) {
    combatAudio.play(sound, combatPreferences.sound);
  },
  onCommit(next) {
    combatStage = null;
    combatStageIndex = 0;
    combatStageCount = 0;
    sequenceViewState = null;
    update(next);
    globalThis.setTimeout?.(() => document.querySelector('[data-action="end-turn"]')?.focus(), 0);
  },
});

function presentCombatAction(previous, next, action, { showResolvedCombat = false } = {}) {
  if (next === previous) return;
  sequenceViewState = showResolvedCombat ? next : previous;
  sequenceController.start({ previous, next, action });
}

function cardTone(item) {
  return `${item.type} ${item.rarity ?? 'common'} ${item.towerOnly ? 'tower-card' : ''} ${item.lineages?.includes(LEGENDARY_SAIYAN_LINEAGE) ? 'legendary-lineage' : ''}`;
}

function renderCard(item, { action = '', disabled = false, badge = '', compact = false } = {}) {
  if (!item) return '';
  const cardButton = `
    <button class="db-card ${cardTone(item)} ${compact ? 'compact' : ''}" ${action ? `data-action="${action}"` : `data-card-detail="${item.id}"`} ${disabled ? 'disabled' : ''}>
      <span class="db-card-top"><b>${escapeHtml(item.name)}</b><i>${item.cost ?? '-'}</i></span>
      <span class="db-card-art"><img src="${cardArt(item)}" alt="" loading="lazy"></span>
      <span class="db-card-type">${escapeHtml(item.type)} / ${escapeHtml(item.rarity ?? 'common')}</span>
      <span class="db-card-text">${escapeHtml(item.text)}</span>
      <span class="db-card-power">Power Rating +${cardPowerRating(item)}</span>
      ${badge ? `<strong class="db-card-badge">${escapeHtml(badge)}</strong>` : ''}
    </button>
  `;
  return action && disabled
    ? `<div class="card-action-wrap">${cardButton}<button class="card-detail-chip" data-card-detail="${item.id}">Details</button></div>`
    : cardButton;
}

function renderSetup() {
  const origin = ORIGINS[setupOrigin];
  app.innerHTML = `
    <main class="db-start">
      <section class="db-start-copy">
        <img class="db-mark" src="./assets/dragon-ball/dragon-mark.svg" alt="">
        <p class="eyebrow">A Separate Card-Battling Campaign</p>
        <h1>Dragon Ball<br><span>Deck Builder</span></h1>
        <p>Build a fighter from age 6 through the Eternal Saga. Draft techniques, master transformations, and climb forever.</p>
        <a class="text-link" href="./index.html">Return to Underground Life Sim</a>
      </section>
      <section class="db-setup-panel">
        <label><span>Fighter Name</span><input id="db-name" maxlength="24" value="${escapeHtml(setupName)}" placeholder="Enter a name"></label>
        <div class="origin-grid">
          ${Object.values(ORIGINS).map((item) => `
            <button class="origin-choice ${item.id === setupOrigin ? 'selected' : ''}" data-origin="${item.id}">
              <img src="${originArt(item.id)}" alt="">
              <strong>${item.name}</strong>
              <span>${item.passive}</span>
              <small>${item.passiveText}${item.id === 'saiyan' ? ' Each new Saiyan has a 50% chance to awaken the Legendary Super Saiyan lineage.' : ''}</small>
            </button>
          `).join('')}
        </div>
        <article class="origin-preview">
          <div><b>${origin.name}</b><span>${origin.passiveText}</span></div>
          <div class="mini-stats">${STAT_KEYS.map((key) => `<span>${label(key)} <b>${origin.stats[key]}</b></span>`).join('')}</div>
        </article>
        <button class="db-primary wide" data-action="start-run">Begin the Journey</button>
      </section>
    </main>
  `;
}

function renderHeader(powerLevel = calculatePowerLevel(state)) {
  const origin = ORIGINS[state.origin];
  const legendary = hasLegendaryLineage();
  return `
    <header class="db-header ${legendary ? 'legendary-header' : ''} power-tier-${powerLevel.tier.id}">
      <div class="fighter-title">
        <img src="${originArt()}" alt="">
        <div><p>${legendary ? 'Legendary Super Saiyan' : origin.name} / Age ${state.age}</p><h1>${escapeHtml(state.name)}</h1><span>${legendary ? 'Unbound Growth · +1 Max Ki · +2 Focus when damaged' : origin.passive}</span></div>
      </div>
      <div class="header-meter">
        <span>HP ${state.currentHealth}/${state.stats.health}</span>
        <i><b style="width:${Math.max(0, state.currentHealth / state.stats.health * 100)}%"></b></i>
        <strong>${state.zeni} Zeni</strong>
      </div>
      <div class="power-meter" title="${escapeHtml(powerLevel.tier.description)}">
        <span>Power Level</span>
        <strong>${powerLevel.total.toLocaleString()}</strong>
        <small>${escapeHtml(powerLevel.tier.label)} / Cards ${powerLevel.normalCardTotal.toLocaleString()} / Tower ${powerLevel.towerCardTotal.toLocaleString()}</small>
      </div>
      <button class="icon-button" data-action="reset-run">New Run</button>
    </header>
  `;
}

function renderTimeline() {
  return `
    <div class="age-progress-heading">
      <div><p>Campaign Ages 6–100</p><strong>Age ${state.age} / 100</strong></div>
      <span>${state.age === 100 ? `Eternal Saga Cycle ${state.ageCycle + 1}` : `${100 - state.age} ages until the Eternal Saga`}</span>
    </div>
    <div class="age-timeline" aria-label="Campaign ages 6 through 100">${Array.from({ length: 95 }, (_, index) => index + 6).map((age) => `
      <span class="${age < state.age ? 'done' : age === state.age ? 'active' : ''}">${age}${age === 100 ? '∞' : ''}</span>
    `).join('')}</div>
  `;
}

function encounterIcon(type) {
  return { fighter: 'F', mentor: 'M', specialMentor: 'SM', specialFight: '!' }[type] ?? '?';
}

function enemyPreviewLine(enemy, fallback) {
  if (!enemy) return fallback;
  const traits = enemy.traits?.length ? ` / Traits: ${enemy.traits.map((trait) => trait.name).join(', ')}` : '';
  return `${enemy.transformationName ? `Transformation: ${enemy.transformationName} / ` : ''}${fallback}${traits}`;
}

function renderJourney() {
  const cleared = new Set(state.clearedEncounterIds);
  const sagaName = sagaNameForAge(state.age, state.ageCycle);
  return `
    <section class="journey-stack">
      <article class="saga-banner">
        <div><p>Age ${state.age} Saga${state.age === 100 ? ` / Cycle ${state.ageCycle + 1}` : ''}</p><h2>${sagaName}</h2><span>Clear every encounter to unlock the next age reward draft.</span></div>
        <img src="${originArt()}" alt="">
      </article>
      ${renderTimeline()}
      <div class="encounter-map">
        ${state.encounters.map((encounter, index) => {
          const done = cleared.has(encounter.id);
          const enemyPreview = ['fighter', 'specialFight'].includes(encounter.type)
            ? enemyForEncounter(state, encounter)
            : null;
          return `
            <article class="encounter-node ${encounter.type} ${encounter.legendarySaiyanMilestone ? 'legendary-milestone' : ''} ${done ? 'cleared' : ''}">
              <div class="encounter-line"></div>
              <span class="encounter-icon">${done ? 'OK' : encounterIcon(encounter.type)}</span>
              <div>
                <p>${label(encounter.type)} / ${encounter.difficulty ? `Threat ${encounter.difficulty}` : 'Training'}</p>
                <h3>${escapeHtml(encounter.name)}</h3>
                <span>${encounter.type === 'mentor' ? 'Draft a permanent stat increase.' : encounter.type === 'specialMentor' ? 'Draft a move or transformation.' : enemyPreviewLine(enemyPreview, `Power ${encounter.enemyPower}. Win a ${encounter.reward} draft and ${combatRewardFor(state, encounter)} Zeni.`)}</span>
              </div>
              <button data-action="encounter-${encounter.id}" ${done ? 'disabled' : ''}>${done ? 'Cleared' : encounter.type.includes('Mentor') || encounter.type === 'mentor' ? 'Train' : 'Fight'}</button>
            </article>
          `;
        }).join('')}
      </div>
      <article class="age-up-panel ${canAgeUp(state) ? 'ready' : ''}">
        <div><p>Chapter Progress</p><h3>${cleared.size}/${state.encounters.length} Encounters Cleared</h3><span>${canAgeUp(state) ? 'Your age reward is ready.' : 'Finish the remaining encounters.'}</span></div>
        <button class="db-primary" data-action="age-up" ${canAgeUp(state) ? '' : 'disabled'}>${state.age === 100 ? 'Next Eternal Saga' : 'Age Up'}</button>
      </article>
    </section>
  `;
}

function renderDeck() {
  const deckCounts = state.deck.reduce((map, id) => ({ ...map, [id]: (map[id] ?? 0) + 1 }), {});
  const diagnostics = analyzeDeck(state);
  const eligible = Object.keys(state.collection).filter((id) => {
    const item = CARDS[id];
    return item && !item.towerOnly && item.type !== 'stat' &&
      (!item.origins?.length || item.origins.includes(state.origin)) &&
      (!item.lineages?.length || item.lineages.includes(state.saiyanLineage));
  });
  const validation = validateDeck(state);
  const disabledReason = (item) => {
    const cooldown = state.cooldowns[item.id] ?? 0;
    const max = item.type === 'form' || item.rarity === 'legendary' ? 1 : Math.min(2, state.collection[item.id]);
    if (cooldown > 0) return `${item.name} is cooling down for ${cooldown} Age Ups.`;
    if ((item.minAge ?? 6) > state.age) return `${item.name} requires age ${item.minAge}.`;
    if ((deckCounts[item.id] ?? 0) >= max) return `${item.name} exceeds its copy limit.`;
    if (state.deck.length >= 20) return 'Deck cannot exceed 20 cards.';
    if (item.origins?.length && !item.origins.includes(state.origin)) return `${item.name} is incompatible with this origin.`;
    if (item.lineages?.length && !item.lineages.includes(state.saiyanLineage)) return `${item.name} requires the Legendary Super Saiyan lineage.`;
    return '';
  };
  return `
    <section class="deck-layout">
      <article class="deck-panel">
        <header><div><p>Active Combat Deck</p><h2>${state.deck.length}/20 Cards</h2></div><span class="${validation.valid ? 'valid' : 'invalid'}">${validation.valid ? 'Battle Ready' : validation.reason}</span></header>
        <div class="deck-diagnostics">
          <div><b>Average Cost</b><strong>${diagnostics.averageCost}</strong></div>
          <div><b>Attacks</b><strong>${diagnostics.attackCount}</strong></div>
          <div><b>Defense</b><strong>${diagnostics.defenseCount}</strong></div>
          <div><b>Healing</b><strong>${diagnostics.healingCount}</strong></div>
          <div class="deck-curve">${Object.entries(diagnostics.countsByCost).map(([cost, count]) => `<span><i>${cost}</i><b style="height:${Math.max(8, count * 10)}px"></b><small>${count}</small></span>`).join('')}</div>
          <div class="deck-actions"><button data-action="deck-auto-build">Auto Build</button><button data-action="deck-clear-minimum">Clear To Minimum</button></div>
          ${diagnostics.warnings.map((warning) => `<p class="deck-warning">${escapeHtml(warning)}</p>`).join('')}
        </div>
        <div class="deck-list">
          ${Object.entries(deckCounts).map(([id, count]) => {
            const item = CARDS[id];
            return `<div class="deck-row"><button data-card-detail="${id}"><b>${item.name}</b><span>${label(item.type)} / Cost ${item.cost}</span></button><strong>x${count}</strong><button data-action="deck-remove-${id}">-</button></div>`;
          }).join('')}
        </div>
      </article>
      <article class="collection-panel">
        <header><div><p>Owned Cards</p><h2>Add to Deck</h2></div><span>${eligible.length} unique</span></header>
        <div class="mini-card-grid">
          ${eligible.map((id) => {
            const item = CARDS[id];
            const max = item.type === 'form' || item.rarity === 'legendary' ? 1 : Math.min(2, state.collection[id]);
            const reason = disabledReason(item);
            const badge = reason ? reason : `${deckCounts[id] ?? 0}/${max}`;
            return `<div>${renderCard(item, { action: `deck-add-${id}`, disabled: Boolean(reason), badge, compact: true })}${reason ? `<p class="disabled-reason">${escapeHtml(reason)}</p>` : ''}</div>`;
          }).join('')}
        </div>
      </article>
    </section>
  `;
}

function renderCollection() {
  const all = Object.values(CARDS).filter((item) =>
    item.type !== 'injury' && !item.towerOnly &&
    (!item.lineages?.length || item.lineages.includes(state.saiyanLineage)));
  const filtered = all.filter((item) => collectionFilter === 'all' || item.type === collectionFilter ||
    (collectionFilter === 'legendaryLineage' && item.lineages?.includes(LEGENDARY_SAIYAN_LINEAGE)));
  const owned = filtered.filter((item) => item.type === 'stat' ? false : state.collection[item.id]);
  return `
    <section>
      <article class="collection-summary"><div><p>Technique Archive</p><h2>${Object.keys(state.collection).length}/${all.filter((item) => item.type !== 'stat').length} Combat Cards</h2></div><span>Stat cards are consumed immediately and never enter the deck.</span></article>
      <div class="filter-row">${['all', 'move', 'form', 'heal', 'support', 'counter', ...(hasLegendaryLineage() ? ['legendaryLineage'] : [])].map((type) => `<button class="${collectionFilter === type ? 'active' : ''}" data-filter="${type}">${type === 'legendaryLineage' ? 'Legendary Lineage' : label(type)}</button>`).join('')}</div>
      <div class="card-gallery">${owned.map((item) => renderCard(item, { badge: `Owned x${state.collection[item.id]}` })).join('') || '<p class="empty-copy">No owned cards match this filter yet.</p>'}</div>
    </section>
  `;
}

function renderHistory() {
  return `
    <section class="history-panel">
      <article class="stat-board">${STAT_KEYS.map((key) => `<div><span>${label(key)}</span><b>${state.stats[key]}</b></div>`).join('')}</article>
      <h2>Journey Log</h2>
      ${state.history.map((entry) => `<article class="history-entry"><span>${label(entry.type)}</span><p>${escapeHtml(entry.text)}</p></article>`).join('')}
    </section>
  `;
}

function recoveryDisabledReason(serviceId) {
  if (state.tower?.active) return 'Climb In Progress';
  const cost = recoveryServiceCost(state, serviceId);
  if (state.zeni < cost) return `Need ${cost - state.zeni} more Zeni`;
  if (serviceId === 'injury-treatment' && !state.injuries.length) return 'No Injuries';
  if (serviceId !== 'injury-treatment' && state.currentHealth >= state.stats.health) return 'Health Full';
  return '';
}

function renderRecovery() {
  return `
    <section class="recovery-center">
      <article class="recovery-hero">
        <div>
          <p>Capsule Recovery Network</p>
          <h2>Recovery Center</h2>
          <span>Spend combat winnings to prepare for the next encounter. Prices rise as the campaign becomes more dangerous.</span>
        </div>
        <strong>${state.zeni}<small>Zeni Available</small></strong>
      </article>
      <article class="recovery-status">
        <div><span>Current Health</span><b>${state.currentHealth}/${state.stats.health}</b></div>
        <i><b style="width:${Math.max(0, state.currentHealth / state.stats.health * 100)}%"></b></i>
        <div><span>Active Injuries</span><b>${state.injuries.length}</b></div>
        <p>${state.injuries.length ? state.injuries.map((id) => CARDS[id].name).join(' / ') : 'No injuries are weakening your deck.'}</p>
      </article>
      <div class="recovery-grid">
        ${Object.entries(RECOVERY_SERVICES).map(([id, service]) => {
          const cost = recoveryServiceCost(state, id);
          const reason = recoveryDisabledReason(id);
          return `
            <article class="recovery-service">
              <span>${id === 'capsule-patch' ? 'Quick Care' : id === 'full-restore' ? 'Complete Care' : 'Specialist Care'}</span>
              <h3>${service.name}</h3>
              <p>${service.description}</p>
              <div><strong>${cost} Zeni</strong><button data-action="recover-${id}" ${reason ? 'disabled' : ''}>${reason || 'Purchase'}</button></div>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function renderTower() {
  if (state.age < 8) {
    return `
      <section class="tower-locked">
        <div class="tower-sigil">8</div>
        <p>Endless Trial Sealed</p>
        <h2>Infinite Tower</h2>
        <span>The Tower opens at age 8. Grow stronger, then return for an endurance climb with permanent rewards.</span>
      </section>
    `;
  }

  const floor = state.tower.currentFloor;
  const encounter = generateTowerEncounter(state, floor);
  const enemyPreview = enemyForEncounter(state, encounter);
  const boss = floor % 5 === 0;
  const equipped = new Set(state.tower.loadout);
  const ownedIds = TOWER_CARD_IDS.filter((id) => state.tower.cards[id]);
  const nextBoss = boss ? floor : floor + (5 - floor % 5);
  const clearedCount = state.encounters.filter((item) => state.clearedEncounterIds.includes(item.id)).length;
  const ageReady = canAgeUp(state);
  return `
    <section class="tower-screen">
      <article class="tower-hero">
        <div>
          <p>Endless Endurance Activity</p>
          <h2>Infinite Tower</h2>
          <span>Damage carries between floors. Every victory restores 25% Health; boss floors fully restore you.</span>
        </div>
        <div class="tower-record">
          <span>Highest Floor</span>
          <strong>${state.tower.highestFloor}</strong>
          <small>${state.tower.active ? `Run active on floor ${floor}` : 'Next climb begins at floor 1'}</small>
        </div>
      </article>

      <div class="tower-dashboard">
        <article class="tower-floor-panel ${boss ? 'boss-floor' : ''} ${encounter.specialTowerEnemy ? 'special-tower-enemy' : ''}" style="${encounter.specialTowerEnemyColor ? `--tower-special:${encounter.specialTowerEnemyColor};` : ''}">
          <header>
            <div><span>${encounter.specialTowerEnemy ? 'Special Tower Enemy' : boss ? 'Boss Floor' : 'Next Challenger'}</span><h3>Floor ${floor}</h3></div>
            <strong>${encounter.enemyPower}<small>Enemy Power</small></strong>
          </header>
          <div class="tower-enemy-preview">
            <img src="${towerEnemyArt(encounter)}" alt="${escapeHtml(encounter.name)}">
            <div>
              <p>${encounter.specialTowerEnemy ? 'Special Tower Enemy' : boss ? 'Limit-Breaking Ultimate Ready' : `Threat ${encounter.difficulty}`}</p>
              <h3>${escapeHtml(encounter.name)}</h3>
              <span>${enemyPreviewLine(enemyPreview, boss ? 'Enhanced stats, escalating AI, and a block-piercing ultimate attack.' : 'Stats and aggression increase continuously with every floor.')}</span>
            </div>
          </div>
          <div class="tower-run-health">
            <div><span>Run Health</span><b>${state.currentHealth}/${state.stats.health}</b></div>
            <i><b style="width:${Math.max(0, state.currentHealth / state.stats.health * 100)}%"></b></i>
          </div>
          <div class="tower-rewards">
            <span><b>Every Floor</b> Permanent stat draft + Zeni</span>
            <span><b>Floor ${nextBoss}</b> ${boss ? 'Full heal + Tower Card draft' : 'Next Tower Card boss reward'}</span>
            <span><b>Run Status</b> ${state.tower.active ? `Active climb. Retiring resets the next climb to floor 1, keeps rewards already earned, and adds no Injury.` : 'No active climb. Begin at floor 1 when ready.'}</span>
          </div>
          ${state.tower.active
            ? `<div class="tower-action-row"><button class="db-primary wide" data-action="tower-fight">Challenge Floor ${floor}</button><button data-action="tower-retire">Retire Climb</button></div>`
            : `<button class="db-primary wide" data-action="tower-start">Begin Climb</button>`}
        </article>

        <article class="tower-loadout-panel">
          <header>
            <div><p>Bonus Combat Loadout</p><h3>${state.tower.loadout.length}/5 Tower Cards</h3></div>
            <span>Editable between every fight</span>
          </header>
          <div class="tower-loadout-slots">
            ${Array.from({ length: 5 }, (_, index) => {
              const id = state.tower.loadout[index];
              if (!id) return `<div class="tower-empty-slot"><b>${index + 1}</b><span>Empty</span></div>`;
              const rank = state.tower.cards[id];
              return `
                <div class="tower-equipped">
                  <button data-card-detail="${id}"><b>${escapeHtml(CARDS[id].name)}</b><span>Rank ${rank}</span></button>
                  <button data-action="tower-remove-${id}">Remove</button>
                </div>
              `;
            }).join('')}
          </div>
          <p class="tower-loadout-note">Equipped cards are shuffled into every combat alongside your normal deck and Injury cards. They never count toward the 20-card limit.</p>
        </article>
      </div>

      <article class="age-up-panel tower-age-up ${ageReady ? 'ready' : ''}">
        <div>
          <p>Campaign Progress During Tower Run</p>
          <h3>${clearedCount}/${state.encounters.length} Encounters Cleared</h3>
          <span>${ageReady ? 'Age Up Without Ending The Climb. Your floor and Tower progress will be preserved.' : 'Clear the remaining campaign encounters, then return here to Age Up without ending this climb.'}</span>
        </div>
        <button class="db-primary" data-action="age-up" ${ageReady ? '' : 'disabled'}>${state.age === 100 ? 'Next Eternal Saga' : 'Age Up'}</button>
      </article>

      <article class="tower-collection-panel">
        <header>
          <div><p>Tower-Exclusive Collection</p><h3>${ownedIds.length}/${TOWER_CARD_IDS.length} Cards Discovered</h3></div>
          <span>Boss duplicates upgrade cards to Rank 5.</span>
        </header>
        <div class="tower-card-grid">
          ${ownedIds.map((id) => {
            const rank = state.tower.cards[id];
            const item = towerCardAtRank(id, rank);
            const disabled = equipped.has(id) || state.tower.loadout.length >= 5;
            return renderCard(item, {
              action: `tower-add-${id}`,
              disabled,
              badge: equipped.has(id) ? `Equipped / R${rank}` : `Rank ${rank} / Equip`,
              compact: true,
            });
          }).join('') || '<p class="empty-copy">Clear floor 5 to discover your first Tower-exclusive card.</p>'}
        </div>
      </article>
    </section>
  `;
}

function renderAbilityCard(item, { equipped = false, used = false, action = '', disabled = false } = {}) {
  const rank = state.abilities?.owned?.[item.id] ?? 0;
  return `
    <article class="ability-card ${item.rarity} ${equipped ? 'equipped' : ''} ${used ? 'used' : ''}">
      <p>${label(item.rarity)} Ability</p>
      <h3>${escapeHtml(item.name)}</h3>
      <strong>Rank ${rank || '-'}</strong>
      <span>${escapeHtml(rank ? abilityRankText(item.id, rank) : item.description)}</span>
      ${action ? `<button data-action="${action}" ${disabled ? 'disabled' : ''}>${equipped ? 'Unequip' : 'Equip'}</button>` : ''}
    </article>
  `;
}

function renderAbilities() {
  const owned = state.abilities?.owned ?? {};
  const equipped = new Set(state.abilities?.equipped ?? []);
  const last = state.abilities?.lastPull?.id ? ABILITY_CATALOG[state.abilities.lastPull.id] : null;
  return `
    <section class="ability-screen">
      <article class="ability-hero">
        <div>
          <p>Overpowered Combat Buttons</p>
          <h2>Abilities</h2>
          <span>Spend Ability Rerolls from fight wins, tower clears, and Age Ups. Equip up to 3 abilities for manual once-per-combat use.</span>
        </div>
        <div class="ability-reroll-bank">
          <span>Ability Rerolls</span>
          <strong>${state.abilityRerolls ?? 0}</strong>
          <button class="db-primary" data-action="ability-pull" ${(state.abilityRerolls ?? 0) > 0 ? '' : 'disabled'}>Pull Ability</button>
        </div>
      </article>
      ${last ? `<article class="ability-reveal ${last.rarity}"><p>Last Pull</p><h3>${escapeHtml(last.name)}</h3><span>${state.abilities.lastPull.duplicate ? `Duplicate upgraded to Rank ${state.abilities.lastPull.rank}` : `Unlocked at Rank ${state.abilities.lastPull.rank}`}${state.abilities.lastPull.maxRankRefund ? ' / Max rank refund' : ''}</span></article>` : ''}
      <article class="ability-equipped-panel">
        <header><div><p>Equipped Abilities</p><h3>${equipped.size}/3 Active Buttons</h3></div><span>Manual use in combat. Each ability can fire once per fight.</span></header>
        <div class="ability-grid equipped-grid">
          ${Array.from({ length: 3 }, (_, index) => {
            const id = state.abilities?.equipped?.[index];
            return id ? renderAbilityCard(ABILITY_CATALOG[id], { equipped: true, action: `ability-unequip-${id}` }) : `<div class="ability-empty"><b>${index + 1}</b><span>Empty Ability Slot</span></div>`;
          }).join('')}
        </div>
      </article>
      ${ABILITY_RARITIES.map((rarity) => {
        const items = ABILITY_LIST.filter((item) => item.rarity === rarity && owned[item.id]);
        return `
          <article class="ability-rarity-section ${rarity}">
            <header><p>${label(rarity)}</p><h3>${items.length} Owned</h3></header>
            <div class="ability-grid">
              ${items.map((item) => renderAbilityCard(item, {
                equipped: equipped.has(item.id),
                action: equipped.has(item.id) ? `ability-unequip-${item.id}` : `ability-equip-${item.id}`,
                disabled: !equipped.has(item.id) && equipped.size >= 3,
              })).join('') || '<p class="empty-copy">No abilities owned in this rarity yet.</p>'}
            </div>
          </article>
        `;
      }).join('')}
    </section>
  `;
}

function renderStatusChips(items) {
  return `<div class="combat-status-row">${items.map((item) => `<span class="combat-status-chip" title="${escapeHtml(item.description)}"><b>${escapeHtml(item.label)}</b>${escapeHtml(item.value)}</span>`).join('')}</div>`;
}

function previewBadge(preview) {
  if (!preview.playable) return preview.reason;
  const parts = [];
  if (preview.damage) parts.push(`Deals ${preview.damage}`);
  if (preview.blockGain) parts.push(`+${preview.blockGain} Block`);
  if (preview.healGain) parts.push(`+${preview.healGain} HP`);
  if (preview.drawCount) parts.push(`Draw ${preview.drawCount}`);
  if (preview.transformsTo) parts.push('Transform');
  if (preview.kiGain) parts.push(`+${preview.kiGain} Ki`);
  return parts.join(' / ') || 'Utility';
}

function renderCombatAbilityPanel(combatState) {
  const equipped = combatState.abilities?.equipped ?? [];
  const used = new Set(combatState.activeCombat?.usedAbilityIds ?? []);
  return `
    <div class="combat-ability-wrap">
      <button class="combat-ability-toggle" data-action="toggle-combat-abilities">Abilities ${equipped.length}/3</button>
      ${combatAbilitiesOpen ? `
        <div class="combat-ability-panel">
          ${equipped.map((id) => {
            const item = ABILITY_CATALOG[id];
            const rank = combatState.abilities?.owned?.[id] ?? 1;
            return `
              <button class="combat-ability-button ${item.rarity}" data-action="ability-use-${id}" ${used.has(id) ? 'disabled' : ''}>
                <b>${escapeHtml(item.name)}</b>
                <span>Rank ${rank} / ${used.has(id) ? 'Used' : abilityRankText(id, rank)}</span>
              </button>
            `;
          }).join('') || '<p>No abilities equipped. Equip up to 3 from the Abilities tab.</p>'}
        </div>
      ` : ''}
    </div>
  `;
}

function renderCombat(combatState = state) {
  const combat = combatState.activeCombat;
  const powerLevel = calculatePowerLevel(combatState);
  const enemyPreview = previewEnemyTurn(combatState);
  const statuses = statusSummary(combat);
  const activeForm = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  const displayFormId = combatStage?.kind === 'transform' ? combatStage.formId : combat.player.activeForm;
  const displayForm = displayFormId ? CARDS[displayFormId] : activeForm;
  const playerPercent = combat.player.health / combat.player.maxHealth * 100;
  const enemyPercent = combat.enemy.health / combat.enemy.maxHealth * 100;
  const locked = sequenceController.locked;
  const stageClass = combatStage ? `combat-stage-${combatStage.kind}` : '';
  return `
    <main class="combat-screen motion-${combatPreferences.motion} power-effect-${powerLevel.tier.effectLevel} power-tier-${powerLevel.tier.id} ${stageClass} ${locked ? 'sequence-active' : ''} ${playerPercent <= 25 ? 'low-health' : ''}">
      <section class="combat-arena">
        <div class="combatant enemy ${combat.enemy.specialTowerEnemy ? 'special-tower-enemy' : ''}" data-combat-target="enemy" style="${combat.enemy.specialTowerEnemyColor ? `--tower-special:${combat.enemy.specialTowerEnemyColor};` : ''}">
          <div><p>Enemy Intent</p><h2>${escapeHtml(enemyPreview.intentLabel)}</h2><span>${enemyPreview.intentType === 'attack' ? `Projected ${enemyPreview.projectedDamage} damage${enemyPreview.rawIncomingDamage !== enemyPreview.projectedDamage ? ` / Raw ${enemyPreview.rawIncomingDamage}` : ''}${enemyPreview.blockPiercePercent ? ` / ${enemyPreview.blockPiercePercent}% Block pierce` : ''}` : `Gains ${enemyPreview.guardBlockGain} Block`}</span></div>
          <img src="${enemyCombatArt(combat.enemy)}" alt="${escapeHtml(combat.enemy.baseName ?? combat.enemy.name)}">
          <div class="combat-health"><span>${combat.enemy.name} / ${combat.enemy.health}</span><i><b style="width:${enemyPercent}%"></b></i></div>
          ${renderStatusChips(statuses.enemy)}
        </div>
        ${combatStage ? renderCombatEffect(combatStage) : ''}
        <div class="combatant player ${displayFormId ? 'transformed' : ''}" data-combat-target="player">
          <img src="${characterArt(combatState.origin, displayFormId)}" alt="${escapeHtml(displayForm?.name ?? ORIGINS[combatState.origin].name)}">
          <div><p>Turn ${combat.turn}</p><h2>${escapeHtml(combatState.name)}</h2><span>${displayForm?.name ?? ORIGINS[combatState.origin].name} / Block ${combat.player.block ?? 0} / Focus ${combat.player.focus}${displayForm?.effect.dodgeChance ? ` / Dodge ${Math.round(displayForm.effect.dodgeChance * 100)}%` : ''}</span></div>
          <div class="combat-health"><span>Health ${combat.player.health}/${combat.player.maxHealth}</span><i><b style="width:${playerPercent}%"></b></i></div>
          ${renderStatusChips(statuses.player)}
        </div>
      </section>
      <section class="combat-controls">
        <header>
          <div><span>KI</span>${Array.from({ length: combat.player.maxKi + 2 }, (_, index) => `<i class="${index < combat.player.ki ? 'full' : ''}"></i>`).join('')}</div>
          <div class="combat-settings" aria-label="Combat presentation settings">
            ${['full', 'reduced', 'off'].map((mode) => `<button class="${combatPreferences.motion === mode ? 'active' : ''}" data-action="motion-${mode}">${label(mode)}</button>`).join('')}
            <button class="${combatPreferences.sound ? 'active' : ''}" data-action="toggle-sound">Sound ${combatPreferences.sound ? 'On' : 'Off'}</button>
          </div>
          <button data-action="end-turn" ${locked ? 'disabled' : ''}>${enemyPreview.projectedDamage ? `End Turn: Take ${enemyPreview.projectedDamage}` : 'End Turn'}</button>
        </header>
        ${renderCombatAbilityPanel(combatState)}
        <div class="combat-pile-strip">
          <span>Draw <b>${combat.drawPile.length}</b></span>
          <span>Discard <b>${combat.discardPile.length}</b></span>
          <span>Exhaust <b>${combat.exhaustPile.length}</b></span>
          <span>Hand <b>${combat.hand.length}</b></span>
        </div>
        <div class="combat-hand">
          ${combat.hand.map((id, index) => {
            const item = CARDS[id]?.towerOnly ? towerCardAtRank(id, combatState.tower.cards[id]) : CARDS[id];
            const preview = previewCardPlay(combatState, index);
            return renderCard(item, {
              action: `play-${index}`,
              disabled: locked || !preview.playable,
              badge: item.towerOnly ? `Tower Rank ${combatState.tower.cards[id]} / ${previewBadge(preview)}` : previewBadge(preview),
            });
          }).join('')}
        </div>
        <div class="combat-log">${combat.log.slice(0, 4).map((line) => `<p>${escapeHtml(line)}</p>`).join('')}</div>
      </section>
    </main>
  `;
}

function renderCombatEffect(stage) {
  const number = stage.value > 0
    ? `<strong class="combat-float-number">${stage.kind === 'heal' || stage.kind === 'guard' || stage.kind === 'support' ? '+' : '-'}${stage.value}</strong>`
    : '';
  const card = stage.cardId ? CARDS[stage.cardId] : null;
  return `
    <div class="combat-effect-layer" aria-live="polite" aria-atomic="true">
      <div class="combat-speed-lines"></div>
      <div class="combat-aura"></div>
      <div class="combat-beam"><i></i></div>
      <img class="combat-vfx-sprite combat-vfx-speed" src="${VFX_ASSETS.speedTrace}" alt="">
      <img class="combat-vfx-sprite combat-vfx-aura" src="${VFX_ASSETS.auraFlame}" alt="">
      <img class="combat-vfx-sprite combat-vfx-heal" src="${VFX_ASSETS.healSparkle}" alt="">
      <img class="combat-vfx-sprite combat-vfx-smoke" src="${VFX_ASSETS.smokePuff}" alt="">
      <div class="combat-impact">
        <img src="${VFX_ASSETS.impactBurst}" alt="">
        <img src="${VFX_ASSETS.impactSpark}" alt="">
        <img src="${VFX_ASSETS.slashArc}" alt="">
      </div>
      <div class="combat-ki-sprite">
        <img src="${VFX_ASSETS.kiFlare}" alt="">
        <img src="${VFX_ASSETS.kiCore}" alt="">
      </div>
      <div class="combat-afterimage"></div>
      ${card ? `<div class="combat-card-callout"><img src="${cardArt(card)}" alt=""><b>${escapeHtml(card.name)}</b></div>` : ''}
      <div class="combat-effect-copy">
        <b>${escapeHtml(stage.label ?? '')}</b>
        ${number}
        ${stage.hits > 1 ? `<span>${stage.hits} HIT COMBO</span>` : ''}
      </div>
      <div class="combat-particles">${Array.from({ length: 12 }, (_, index) => `<i style="--particle:${index}"></i>`).join('')}</div>
      <button class="combat-skip" data-action="skip-sequence">Skip ${combatStageIndex + 1}/${combatStageCount}</button>
    </div>
  `;
}

function renderDraft() {
  const draft = state.pendingDraft;
  const towerDraft = ['towerStat', 'towerCard'].includes(draft.kind);
  const title = draft.kind === 'towerCard'
    ? (draft.options.every((id) => CARDS[id].type === 'stat') ? 'Choose a Master Stat' : 'Choose a Tower Card')
    : draft.kind === 'towerStat' ? 'Choose a Permanent Stat'
      : draft.kind === 'legendarySaiyan' ? 'Choose a Legendary Awakening'
        : 'Choose One Card';
  return `
    <section class="draft-overlay">
      <div class="draft-rays"></div>
      <article class="draft-panel">
        <p>${towerDraft ? `Infinite Tower Floor ${draft.towerFloor} Cleared` : draft.ageAdvance ? `Age ${state.age} Complete` : 'Encounter Reward'}</p>
        <h2>${title}</h2>
        <span>${draft.kind === 'towerCard' ? 'New cards unlock permanently. Owned cards gain a rank, up to Rank 5.' : draft.kind === 'legendarySaiyan' ? 'This reward belongs only to the Legendary Super Saiyan lineage.' : draft.ageAdvance ? 'This reward closes the chapter and advances time.' : 'The other two cards will disappear.'}</span>
        <div class="draft-grid">${draft.options.map((id) => {
          const rank = state.tower?.cards?.[id] ?? 0;
          const item = CARDS[id]?.towerOnly ? towerCardAtRank(id, Math.min(5, rank + 1)) : CARDS[id];
          return renderCard(item, { action: `draft-${id}`, badge: item.towerOnly ? (rank ? `Upgrade R${rank} to R${rank + 1}` : 'New Tower Card') : '' });
        }).join('')}</div>
      </article>
    </section>
  `;
}

function renderDetail() {
  const base = CARDS[selectedCardId];
  const item = base?.towerOnly ? towerCardAtRank(selectedCardId, state.tower.cards[selectedCardId]) : base;
  if (!item) return '';
  const rating = cardPowerRating(item);
  return `
    <section class="detail-overlay" data-action="close-detail">
      <article class="detail-panel">
        ${renderCard(item)}
        <div><p>${label(item.type)} / ${label(item.rarity)}</p><h2>${escapeHtml(item.name)}</h2><span>${escapeHtml(item.text)}</span><strong class="detail-power-rating">Power Rating +${rating}${item.towerRank ? ` / Tower Rank ${item.towerRank}` : ''}</strong><small>${item.towerOnly ? `Earned only in Infinite Tower / Rank ${item.towerRank} / Usable in every combat` : `Minimum age ${item.minAge ?? 6}${item.origins?.length ? ` / ${item.origins.map((id) => ORIGINS[id].name).join(', ')} only` : ''}${item.lineages?.includes(LEGENDARY_SAIYAN_LINEAGE) ? ' / Legendary Super Saiyan lineage only' : ''}`}</small><button data-action="close-detail">Close</button></div>
      </article>
    </section>
  `;
}

function renderLineageReveal() {
  return `
    <section class="lineage-reveal" role="dialog" aria-modal="true" aria-labelledby="lineage-reveal-title">
      <div class="lineage-energy"></div>
      <article>
        <p>One Warrior In Two</p>
        <img src="${GENERATED_ASSET_ROOT}/origin-saiyan-legendary.jpg" alt="Legendary Super Saiyan ${escapeHtml(state.name)}">
        <span class="lineage-badge">Rare Lineage Awakened</span>
        <h2 id="lineage-reveal-title">Legendary Super Saiyan</h2>
        <strong>UNBOUND GROWTH</strong>
        <p>Awaken with +35 Health and +8 Power. Start every battle with +1 maximum Ki and gain 2 Focus whenever unblocked damage reaches you.</p>
        <button class="db-primary" data-action="acknowledge-lineage">Unleash The Legend</button>
      </article>
    </section>
  `;
}

function render() {
  if (!state) return renderSetup();
  const visualState = sequenceViewState ?? state;
  if (visualState.activeCombat) {
    app.innerHTML = renderCombat(visualState);
    return;
  }
  const powerLevel = calculatePowerLevel(state);
  const content = activeTab === 'deck' ? renderDeck()
    : activeTab === 'collection' ? renderCollection()
      : activeTab === 'recovery' ? renderRecovery()
        : activeTab === 'history' ? renderHistory()
          : activeTab === 'tower' ? renderTower()
            : activeTab === 'abilities' ? renderAbilities()
              : renderJourney();
  app.innerHTML = `
    <main class="db-shell power-effect-${powerLevel.tier.effectLevel} power-tier-${powerLevel.tier.id}">
      ${renderHeader(powerLevel)}
      <nav class="db-nav">
        ${[['journey', 'Journey'], ['tower', 'Tower'], ['abilities', 'Abilities'], ['deck', 'Deck'], ['collection', 'Cards'], ['recovery', 'Recovery'], ['history', 'History']].map(([id, name]) => `<button class="${activeTab === id ? 'active' : ''}" data-tab="${id}">${name}</button>`).join('')}
        <a href="./index.html">Other Modes</a>
      </nav>
      <section class="db-content">${content}</section>
    </main>
    ${state.pendingDraft ? renderDraft() : ''}
    ${selectedCardId ? renderDetail() : ''}
    ${state.lineageRevealPending ? renderLineageReveal() : ''}
    ${toast ? `<div class="db-toast">${escapeHtml(toast)}</div>` : ''}
  `;
}

function handleAction(action) {
  if (action === 'start-run') {
    setupName = document.querySelector('#db-name')?.value ?? '';
    update(createDragonBallRun({ name: setupName, origin: setupOrigin }), 'Journey started.');
    return;
  }
  if (action === 'reset-run') {
    if (!window.confirm('Start a new Dragon Ball run? This only clears the Dragon Ball save.')) return;
    clearDragonBallGame();
    state = null;
    activeTab = 'journey';
    render();
    return;
  }
  if (!state) return;
  if (action === 'acknowledge-lineage') {
    update({ ...state, lineageRevealPending: false }, 'The Legendary Super Saiyan lineage is active.');
    return;
  }
  if (action === 'skip-sequence') {
    sequenceController.skip();
    return;
  }
  if (action.startsWith('motion-')) {
    if (sequenceController.locked) sequenceController.flush();
    combatPreferences = saveCombatPreferences({ ...combatPreferences, motion: action.replace('motion-', '') });
    playUiSound('toggle');
    render();
    return;
  }
  if (action === 'toggle-sound') {
    combatPreferences = saveCombatPreferences({ ...combatPreferences, sound: !combatPreferences.sound });
    if (combatPreferences.sound) combatAudio.play('toggle', true);
    render();
    return;
  }
  if (action === 'ability-pull') {
    updateResult(tryPullAbility(state));
    return;
  }
  if (action.startsWith('ability-equip-')) {
    const id = action.replace('ability-equip-', '');
    updateResult(trySetAbilityLoadout(state, [...state.abilities.equipped, id]));
    return;
  }
  if (action.startsWith('ability-unequip-')) {
    const id = action.replace('ability-unequip-', '');
    updateResult(trySetAbilityLoadout(state, state.abilities.equipped.filter((abilityId) => abilityId !== id)));
    return;
  }
  if (action === 'toggle-combat-abilities') {
    combatAbilitiesOpen = !combatAbilitiesOpen;
    render();
    return;
  }
  if (action.startsWith('ability-use-')) {
    if (sequenceController.locked) return;
    const id = action.replace('ability-use-', '');
    updateResult(tryActivateCombatAbility(state, id));
    combatAbilitiesOpen = true;
    return;
  }
  if (action === 'tower-start') {
    updateResult(tryStartTowerRun(state));
    return;
  }
  if (action === 'tower-retire') {
    if (!window.confirm('Retire this Tower climb? You keep rewards already earned.')) return;
    update(retireTowerRun(state), 'Retired from the Infinite Tower. Rewards already earned were kept.');
    return;
  }
  if (action === 'tower-fight') {
    const encounter = generateTowerEncounter(state);
    const result = tryStartDragonBallCombat(state, encounter.id);
    if (!result.ok) updateResult(result);
    else presentCombatAction(state, result.state, { type: 'battleStart' }, { showResolvedCombat: true });
    return;
  }
  if (action.startsWith('tower-add-')) {
    const id = action.replace('tower-add-', '');
    const result = trySetTowerLoadout(state, [...state.tower.loadout, id]);
    update(result.state, result.ok ? `${CARDS[id].name} equipped.` : result.reason);
    return;
  }
  if (action.startsWith('tower-remove-')) {
    const id = action.replace('tower-remove-', '');
    const result = trySetTowerLoadout(state, state.tower.loadout.filter((cardId) => cardId !== id));
    update(result.state, result.ok ? `${CARDS[id].name} removed.` : result.reason);
    return;
  }
  if (action.startsWith('encounter-')) {
    const id = action.replace('encounter-', '');
    const encounter = state.encounters.find((item) => item.id === id);
    if (['fighter', 'specialFight'].includes(encounter?.type)) {
      const result = tryStartDragonBallCombat(state, id);
      if (!result.ok) updateResult(result);
      else presentCombatAction(state, result.state, { type: 'battleStart' }, { showResolvedCombat: true });
    } else {
      update(beginEncounter(state, id));
    }
    return;
  }
  if (action === 'age-up') {
    updateResult(tryBeginAgeReward(state));
    return;
  }
  if (action.startsWith('draft-')) {
    const id = action.replace('draft-', '');
    const result = ['towerStat', 'towerCard'].includes(state.pendingDraft?.kind)
      ? tryClaimTowerReward(state, id)
      : state.pendingDraft?.ageAdvance ? tryAdvanceAfterAgeDraft(state, id) : tryClaimDraftCard(state, id);
    updateResult(result);
    return;
  }
  if (action.startsWith('play-')) {
    if (sequenceController.locked) return;
    const handIndex = Number(action.replace('play-', ''));
    const id = state.activeCombat?.hand?.[handIndex];
    const card = CARDS[id]?.towerOnly ? towerCardAtRank(id, state.tower.cards[id]) : CARDS[id];
    const result = tryPlayCombatCard(state, handIndex);
    if (!result.ok) updateResult(result);
    else presentCombatAction(state, result.state, { type: 'card', card });
    return;
  }
  if (action === 'end-turn') {
    if (sequenceController.locked) return;
    const result = tryEndCombatTurn(state);
    if (!result.ok) updateResult(result);
    else presentCombatAction(state, result.state, { type: 'enemyTurn' });
    return;
  }
  if (action.startsWith('recover-')) {
    const id = action.replace('recover-', '');
    updateResult(tryBuyRecoveryService(state, id));
    return;
  }
  if (action === 'deck-auto-build') {
    updateResult(trySetDeck(state, suggestedDeck(state)));
    return;
  }
  if (action === 'deck-clear-minimum') {
    const starter = new Set(ORIGINS[state.origin]?.deck ?? []);
    const nextDeck = [...state.deck];
    for (let index = nextDeck.length - 1; index >= 0 && nextDeck.length > 10; index -= 1) {
      const id = nextDeck[index];
      const item = CARDS[id];
      const duplicate = nextDeck.filter((cardId) => cardId === id).length > 1;
      if (!starter.has(id) && item?.type !== 'form' && duplicate) nextDeck.splice(index, 1);
    }
    updateResult(trySetDeck(state, nextDeck));
    return;
  }
  if (action.startsWith('deck-add-')) {
    const id = action.replace('deck-add-', '');
    const result = trySetDeck(state, [...state.deck, id]);
    update(result.state, result.ok ? `${CARDS[id].name} added.` : result.reason);
    return;
  }
  if (action.startsWith('deck-remove-')) {
    const id = action.replace('deck-remove-', '');
    const index = state.deck.lastIndexOf(id);
    const nextDeck = state.deck.filter((_, cardIndex) => cardIndex !== index);
    const result = trySetDeck(state, nextDeck);
    update(result.state, result.ok ? `${CARDS[id].name} removed.` : result.reason);
    return;
  }
  if (action === 'close-detail') {
    selectedCardId = null;
    render();
  }
}

document.addEventListener('click', (event) => {
  const origin = event.target.closest('[data-origin]');
  if (origin) {
    setupOrigin = origin.dataset.origin;
    setupName = document.querySelector('#db-name')?.value ?? setupName;
    render();
    return;
  }
  const tab = event.target.closest('[data-tab]');
  if (tab) {
    activeTab = tab.dataset.tab;
    toast = '';
    playUiSound('ui');
    render();
    return;
  }
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    collectionFilter = filter.dataset.filter;
    playUiSound('ui');
    render();
    return;
  }
  const detail = event.target.closest('[data-card-detail]');
  if (detail) {
    selectedCardId = detail.dataset.cardDetail;
    playUiSound('ui');
    render();
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action) handleAction(action.dataset.action);
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'db-name') setupName = event.target.value;
});

globalThis.addEventListener?.('beforeunload', () => sequenceController.flush());

render();
