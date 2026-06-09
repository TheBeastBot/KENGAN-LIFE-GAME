import { AGE_REWARD_NAMES, CARDS, ORIGINS, STAT_KEYS } from './data.mjs';
import { beginAgeReward, beginEncounter, canAgeUp, claimDraftCard, createDragonBallRun, advanceAfterAgeDraft, setDeck, validateDeck } from './state.mjs';
import { endCombatTurn, playCombatCard, startDragonBallCombat } from './combat.mjs';
import { clearDragonBallGame, loadDragonBallGame, saveDragonBallGame } from './persistence.mjs';

const app = document.querySelector('#dragon-ball-app');
let state = loadDragonBallGame();
let activeTab = 'journey';
let collectionFilter = 'all';
let selectedCardId = null;
let setupOrigin = 'saiyan';
let setupName = '';
let toast = '';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const label = (value) => String(value).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (char) => char.toUpperCase());
const GENERATED_ASSET_ROOT = './assets/dragon-ball/generated';
const KI_MOVE_WORDS = [
  'beam', 'wave', 'blast', 'cannon', 'sphere', 'ray', 'flash', 'bomb', 'grenade',
  'shot', 'bullet', 'photon', 'galick', 'masenko', 'kame', 'spirit', 'big bang', 'destructo',
];

function originArt(originId = state?.origin ?? setupOrigin) {
  return `${GENERATED_ASSET_ROOT}/origin-${originId}.jpg`;
}

function cardArt(item) {
  if (!item) return `${GENERATED_ASSET_ROOT}/card-support.jpg`;
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

function update(next, message = '') {
  state = next;
  toast = message;
  saveDragonBallGame(state);
  render();
}

function cardTone(item) {
  return `${item.type} ${item.rarity ?? 'common'}`;
}

function renderCard(item, { action = '', disabled = false, badge = '', compact = false } = {}) {
  if (!item) return '';
  return `
    <button class="db-card ${cardTone(item)} ${compact ? 'compact' : ''}" ${action ? `data-action="${action}"` : `data-card-detail="${item.id}"`} ${disabled ? 'disabled' : ''}>
      <span class="db-card-top"><b>${escapeHtml(item.name)}</b><i>${item.cost ?? '-'}</i></span>
      <span class="db-card-art"><img src="${cardArt(item)}" alt="" loading="lazy"></span>
      <span class="db-card-type">${escapeHtml(item.type)} / ${escapeHtml(item.rarity ?? 'common')}</span>
      <span class="db-card-text">${escapeHtml(item.text)}</span>
      ${badge ? `<strong class="db-card-badge">${escapeHtml(badge)}</strong>` : ''}
    </button>
  `;
}

function renderSetup() {
  const origin = ORIGINS[setupOrigin];
  app.innerHTML = `
    <main class="db-start">
      <section class="db-start-copy">
        <img class="db-mark" src="./assets/dragon-ball/dragon-mark.svg" alt="">
        <p class="eyebrow">A Separate Card-Battling Campaign</p>
        <h1>Dragon Ball<br><span>Deck Builder</span></h1>
        <p>Build a fighter from age 6 to 20. Draft techniques, master transformations, and survive the Final Sky Championship.</p>
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
              <small>${item.passiveText}</small>
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

function renderHeader() {
  const origin = ORIGINS[state.origin];
  return `
    <header class="db-header">
      <div class="fighter-title">
        <img src="${originArt()}" alt="">
        <div><p>${origin.name} / Age ${state.age}</p><h1>${escapeHtml(state.name)}</h1><span>${origin.passive}</span></div>
      </div>
      <div class="header-meter">
        <span>HP ${state.currentHealth}/${state.stats.health}</span>
        <i><b style="width:${Math.max(0, state.currentHealth / state.stats.health * 100)}%"></b></i>
      </div>
      <button class="icon-button" data-action="reset-run">New Run</button>
    </header>
  `;
}

function renderTimeline() {
  return `<div class="age-timeline">${Array.from({ length: 15 }, (_, index) => index + 6).map((age) => `
    <span class="${age < state.age ? 'done' : age === state.age ? 'active' : ''}">${age}</span>
  `).join('')}</div>`;
}

function encounterIcon(type) {
  return { fighter: 'F', mentor: 'M', specialMentor: 'SM', specialFight: '!' }[type] ?? '?';
}

function renderJourney() {
  const cleared = new Set(state.clearedEncounterIds);
  const ageIndex = state.age - 6;
  return `
    <section class="journey-stack">
      <article class="saga-banner">
        <div><p>Age ${state.age} Saga</p><h2>${AGE_REWARD_NAMES[ageIndex]}</h2><span>Clear every encounter to unlock the next age reward draft.</span></div>
        <img src="${originArt()}" alt="">
      </article>
      ${renderTimeline()}
      <div class="encounter-map">
        ${state.encounters.map((encounter, index) => {
          const done = cleared.has(encounter.id);
          return `
            <article class="encounter-node ${encounter.type} ${done ? 'cleared' : ''}">
              <div class="encounter-line"></div>
              <span class="encounter-icon">${done ? 'OK' : encounterIcon(encounter.type)}</span>
              <div>
                <p>${label(encounter.type)} / ${encounter.difficulty ? `Threat ${encounter.difficulty}` : 'Training'}</p>
                <h3>${escapeHtml(encounter.name)}</h3>
                <span>${encounter.type === 'mentor' ? 'Draft a permanent stat increase.' : encounter.type === 'specialMentor' ? 'Draft a move or transformation.' : `Power ${encounter.enemyPower}. Win a ${encounter.reward} draft.`}</span>
              </div>
              <button data-action="encounter-${encounter.id}" ${done ? 'disabled' : ''}>${done ? 'Cleared' : encounter.type.includes('Mentor') || encounter.type === 'mentor' ? 'Train' : 'Fight'}</button>
            </article>
          `;
        }).join('')}
      </div>
      <article class="age-up-panel ${canAgeUp(state) ? 'ready' : ''}">
        <div><p>Chapter Progress</p><h3>${cleared.size}/${state.encounters.length} Encounters Cleared</h3><span>${canAgeUp(state) ? 'Your age reward is ready.' : 'Finish the remaining encounters.'}</span></div>
        <button class="db-primary" data-action="age-up" ${canAgeUp(state) ? '' : 'disabled'}>${state.age === 20 ? 'Complete Campaign' : 'Age Up'}</button>
      </article>
    </section>
  `;
}

function renderDeck() {
  const deckCounts = state.deck.reduce((map, id) => ({ ...map, [id]: (map[id] ?? 0) + 1 }), {});
  const eligible = Object.keys(state.collection).filter((id) => {
    const item = CARDS[id];
    return item && item.type !== 'stat' && (!item.origins?.length || item.origins.includes(state.origin));
  });
  const validation = validateDeck(state);
  return `
    <section class="deck-layout">
      <article class="deck-panel">
        <header><div><p>Active Combat Deck</p><h2>${state.deck.length}/20 Cards</h2></div><span class="${validation.valid ? 'valid' : 'invalid'}">${validation.valid ? 'Battle Ready' : validation.reason}</span></header>
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
            const cooldown = state.cooldowns[id] ?? 0;
            const max = item.type === 'form' || item.rarity === 'legendary' ? 1 : Math.min(2, state.collection[id]);
            const disabled = cooldown > 0 || (deckCounts[id] ?? 0) >= max || state.deck.length >= 20 || (item.minAge ?? 6) > state.age;
            const badge = cooldown ? `${cooldown} ages` : `${deckCounts[id] ?? 0}/${max}`;
            return renderCard(item, { action: `deck-add-${id}`, disabled, badge, compact: true });
          }).join('')}
        </div>
      </article>
    </section>
  `;
}

function renderCollection() {
  const all = Object.values(CARDS).filter((item) => item.type !== 'injury');
  const filtered = all.filter((item) => collectionFilter === 'all' || item.type === collectionFilter);
  const owned = filtered.filter((item) => item.type === 'stat' ? false : state.collection[item.id]);
  return `
    <section>
      <article class="collection-summary"><div><p>Technique Archive</p><h2>${Object.keys(state.collection).length}/${all.filter((item) => item.type !== 'stat').length} Combat Cards</h2></div><span>Stat cards are consumed immediately and never enter the deck.</span></article>
      <div class="filter-row">${['all', 'move', 'form', 'heal', 'support', 'counter'].map((type) => `<button class="${collectionFilter === type ? 'active' : ''}" data-filter="${type}">${label(type)}</button>`).join('')}</div>
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

function renderCombat() {
  const combat = state.activeCombat;
  const playerPercent = combat.player.health / combat.player.maxHealth * 100;
  const enemyPercent = combat.enemy.health / combat.enemy.maxHealth * 100;
  return `
    <main class="combat-screen">
      <section class="combat-arena">
        <div class="combatant enemy">
          <div><p>Enemy Intent</p><h2>${escapeHtml(combat.intent.label)}</h2><span>${combat.intent.damage ? `${combat.intent.damage} incoming damage${combat.intent.pierce ? ` / ${Math.round(combat.intent.pierce * 100)}% Block pierce` : ''}` : `${combat.intent.block} Block`}</span></div>
          <img src="${GENERATED_ASSET_ROOT}/card-strike.jpg" alt="">
          <div class="combat-health"><span>${combat.enemy.name} / ${combat.enemy.health}</span><i><b style="width:${enemyPercent}%"></b></i></div>
        </div>
        <div class="impact-orb"><img src="./assets/dragon-ball/energy-orb.svg" alt=""></div>
        <div class="combatant player">
          <img src="${originArt()}" alt="">
          <div><p>Turn ${combat.turn}</p><h2>${escapeHtml(state.name)}</h2><span>${combat.player.activeForm ? CARDS[combat.player.activeForm].name : ORIGINS[state.origin].name} / Block ${combat.player.block} / Focus ${combat.player.focus}</span></div>
          <div class="combat-health"><span>Health ${combat.player.health}/${combat.player.maxHealth}</span><i><b style="width:${playerPercent}%"></b></i></div>
        </div>
      </section>
      <section class="combat-controls">
        <header>
          <div><span>KI</span>${Array.from({ length: combat.player.maxKi + 2 }, (_, index) => `<i class="${index < combat.player.ki ? 'full' : ''}"></i>`).join('')}</div>
          <button data-action="end-turn">End Turn</button>
        </header>
        <div class="combat-hand">
          ${combat.hand.map((id, index) => renderCard(CARDS[id], { action: `play-${index}`, disabled: CARDS[id].type === 'injury' || CARDS[id].cost > combat.player.ki })).join('')}
        </div>
        <div class="combat-log">${combat.log.slice(0, 4).map((line) => `<p>${escapeHtml(line)}</p>`).join('')}</div>
      </section>
    </main>
  `;
}

function renderDraft() {
  const draft = state.pendingDraft;
  return `
    <section class="draft-overlay">
      <div class="draft-rays"></div>
      <article class="draft-panel">
        <p>${draft.ageAdvance ? `Age ${state.age} Complete` : 'Encounter Reward'}</p>
        <h2>Choose One Card</h2>
        <span>${draft.ageAdvance ? 'This reward closes the chapter and advances time.' : 'The other two cards will disappear.'}</span>
        <div class="draft-grid">${draft.options.map((id) => renderCard(CARDS[id], { action: `draft-${id}` })).join('')}</div>
      </article>
    </section>
  `;
}

function renderDetail() {
  const item = CARDS[selectedCardId];
  if (!item) return '';
  return `
    <section class="detail-overlay" data-action="close-detail">
      <article class="detail-panel">
        ${renderCard(item)}
        <div><p>${label(item.type)} / ${label(item.rarity)}</p><h2>${escapeHtml(item.name)}</h2><span>${escapeHtml(item.text)}</span><small>Minimum age ${item.minAge ?? 6}${item.origins?.length ? ` / ${item.origins.map((id) => ORIGINS[id].name).join(', ')} only` : ''}</small><button data-action="close-detail">Close</button></div>
      </article>
    </section>
  `;
}

function renderCompleted() {
  return `
    <main class="ending-screen">
      <img src="./assets/dragon-ball/dragon-mark.svg" alt="">
      <p>Campaign Complete</p><h1>Champion of the Final Sky</h1><span>${escapeHtml(state.ending)}</span>
      <div><button class="db-primary" data-action="reset-run">Start Another Run</button><a href="./index.html">Return to Underground Life Sim</a></div>
    </main>
  `;
}

function render() {
  if (!state) return renderSetup();
  if (state.completed) {
    app.innerHTML = renderCompleted();
    return;
  }
  if (state.activeCombat) {
    app.innerHTML = renderCombat();
    return;
  }
  const content = activeTab === 'deck' ? renderDeck() : activeTab === 'collection' ? renderCollection() : activeTab === 'history' ? renderHistory() : renderJourney();
  app.innerHTML = `
    <main class="db-shell">
      ${renderHeader()}
      <nav class="db-nav">
        ${[['journey', 'Journey'], ['deck', 'Deck'], ['collection', 'Cards'], ['history', 'History']].map(([id, name]) => `<button class="${activeTab === id ? 'active' : ''}" data-tab="${id}">${name}</button>`).join('')}
        <a href="./index.html">Other Modes</a>
      </nav>
      <section class="db-content">${content}</section>
    </main>
    ${state.pendingDraft ? renderDraft() : ''}
    ${selectedCardId ? renderDetail() : ''}
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
  if (action.startsWith('encounter-')) {
    const id = action.replace('encounter-', '');
    const encounter = state.encounters.find((item) => item.id === id);
    update(['fighter', 'specialFight'].includes(encounter?.type) ? startDragonBallCombat(state, id) : beginEncounter(state, id));
    return;
  }
  if (action === 'age-up') {
    update(beginAgeReward(state));
    return;
  }
  if (action.startsWith('draft-')) {
    const id = action.replace('draft-', '');
    update(state.pendingDraft?.ageAdvance ? advanceAfterAgeDraft(state, id) : claimDraftCard(state, id), `Claimed ${CARDS[id]?.name}.`);
    return;
  }
  if (action.startsWith('play-')) {
    update(playCombatCard(state, Number(action.replace('play-', ''))));
    return;
  }
  if (action === 'end-turn') {
    update(endCombatTurn(state));
    return;
  }
  if (action.startsWith('deck-add-')) {
    const id = action.replace('deck-add-', '');
    const nextDeck = [...state.deck, id];
    const validation = validateDeck(state, nextDeck);
    update(validation.valid ? setDeck(state, nextDeck) : state, validation.valid ? `${CARDS[id].name} added.` : validation.reason);
    return;
  }
  if (action.startsWith('deck-remove-')) {
    const id = action.replace('deck-remove-', '');
    const index = state.deck.lastIndexOf(id);
    const nextDeck = state.deck.filter((_, cardIndex) => cardIndex !== index);
    const validation = validateDeck(state, nextDeck);
    update(validation.valid ? setDeck(state, nextDeck) : state, validation.valid ? `${CARDS[id].name} removed.` : validation.reason);
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
    render();
    return;
  }
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    collectionFilter = filter.dataset.filter;
    render();
    return;
  }
  const detail = event.target.closest('[data-card-detail]');
  if (detail) {
    selectedCardId = detail.dataset.cardDetail;
    render();
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action) handleAction(action.dataset.action);
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'db-name') setupName = event.target.value;
});

render();
