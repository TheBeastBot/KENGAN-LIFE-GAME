import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  captureElementScroll,
  createDropdownStateController,
  restoreElementScroll,
} from '../src/ui-state.mjs';

function memoryStorage(initial = {}) {
  const values = { ...initial };
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : null;
    },
    setItem(key, value) {
      values[key] = String(value);
    },
  };
}

test('dropdown state uses defaults when storage is empty', () => {
  const controller = createDropdownStateController({
    storage: memoryStorage(),
    storageKey: 'test-dropdowns',
    defaults: { training: true, history: false },
  });

  assert.equal(controller.isOpen('training'), true);
  assert.equal(controller.isOpen('history'), false);
  assert.equal(controller.isOpen('unknown'), false);
});

test('dropdown toggles are persisted and override defaults', () => {
  const storage = memoryStorage();
  const controller = createDropdownStateController({
    storage,
    storageKey: 'test-dropdowns',
    defaults: { training: true, history: false },
  });

  assert.equal(controller.toggle('training'), false);
  assert.equal(controller.toggle('history'), true);

  const reloaded = createDropdownStateController({
    storage,
    storageKey: 'test-dropdowns',
    defaults: { training: true, history: false },
  });

  assert.equal(reloaded.isOpen('training'), false);
  assert.equal(reloaded.isOpen('history'), true);
});

test('dropdown state can be set explicitly without double-toggle drift', () => {
  const storage = memoryStorage();
  const controller = createDropdownStateController({
    storage,
    storageKey: 'test-dropdowns',
    defaults: { special: false },
  });

  assert.equal(controller.setOpen('special', true), true);
  assert.equal(controller.setOpen('special', true), true);
  assert.equal(controller.isOpen('special'), true);
  assert.equal(controller.setOpen('special', false), false);
  assert.equal(controller.isOpen('special'), false);
});

test('popup scroll snapshots restore the matching rerendered surface without smooth scrolling', () => {
  const previous = { scrollTop: 284, dataset: { scrollKey: 'hunter-dungeon' } };
  const next = { scrollTop: 0 };
  const root = {
    querySelector(selector) {
      assert.equal(selector, '[data-scroll-key="hunter-dungeon"]');
      return next;
    },
  };

  const snapshot = captureElementScroll(previous);
  const restored = restoreElementScroll(root, snapshot);

  assert.equal(restored, true);
  assert.equal(next.scrollTop, 284);
});

test('normal fight move popup clears in half a second', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /const MOVE_ICON_BURST_DURATION_MS = 500;/);
  assert.match(cssSource, /\.move-icon-burst\s*{[\s\S]*animation:\s*move-icon-burst 0\.5s ease both;/);
});

test('Hunter combat UI separates Basic and Special move dropdowns and level rewards', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /Basic Moves/);
  assert.match(appSource, /Special Moves/);
  assert.match(appSource, /Basic Move/);
  assert.match(appSource, /Special Move/);
  assert.match(appSource, /'hunter-basic-moves': true/);
  assert.match(appSource, /'hunter-special-moves': false/);
  assert.match(appSource, /data-dropdown-id="hunter-basic-moves"/);
  assert.match(appSource, /data-dropdown-id="hunter-special-moves"/);
  assert.match(appSource, /hunter-level-reward-/);
});

test('Hunter System Status overrides generic option-card desktop grid', async () => {
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(cssSource, /\.system-status-panel\.option-card\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
  assert.match(cssSource, /\.system-status-panel \.system-chip-row,[\s\S]*\.system-status-panel \.system-objective-line\s*{[\s\S]*grid-column:\s*1 \/ -1;/);
});

test('Hunter activity and quest cards override generic option-card grids', async () => {
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(cssSource, /\.hunter-activity\.option-card\s*{[\s\S]*grid-template-areas:\s*"icon body action";/);
  assert.match(cssSource, /\.hunter-quest-card\.option-card,[\s\S]*\.system-popup \.hunter-quest-card\.option-card\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
  assert.match(cssSource, /\.quest-choice-grid\s*{[\s\S]*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(160px,\s*1fr\)\);/);
});

test('Hunter System guidance exposes next actions and pending badges', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function hunterGuidanceCue/);
  assert.match(appSource, /system-guidance-strip/);
  assert.match(appSource, /Claim System Level Reward/);
  assert.match(appSource, /Resolve ARISE/);
  assert.match(appSource, /pendingArisePrompt/);
  assert.match(appSource, /hunterPendingBadges/);
  assert.match(appSource, /pending-state-badges/);
  assert.match(cssSource, /\.system-guidance-strip\s*{/);
  assert.match(cssSource, /\.pending-state-badges\s*{/);
});

test('global interaction polish covers core interactive UI and reduced motion', async () => {
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(cssSource, /--tap-scale:\s*0\.985/);
  assert.match(cssSource, /input\[type="password"\]/);
  assert.match(cssSource, /\.collapsible-summary/);
  assert.match(cssSource, /\.event-choice-grid button/);
  assert.match(cssSource, /\.gate-offer/);
  assert.match(cssSource, /\.domain-node/);
  assert.match(cssSource, /@keyframes system-scan-sheen/);
  assert.match(cssSource, /prefers-reduced-motion:\s*reduce/);
  assert.match(cssSource, /animation:\s*none !important/);
  assert.match(cssSource, /transition:\s*none !important/);
});

test('main navigation uses menu with four favorite section slots', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /NAV_FAVORITES_STORAGE_KEY/);
  assert.match(appSource, /favorites\.length >= 4/);
  assert.match(appSource, /<button class="small-btn menu-btn" data-action="nav-menu-open">Menu<\/button>/);
  assert.match(appSource, /<button class="danger wide" data-action="reset">Reset Life<\/button>/);
  assert.match(appSource, /<button class="tab-btn menu-tab-btn" data-action="nav-menu-open"><span>Menu<\/span><\/button>/);
  assert.match(cssSource, /\.nav-menu-row\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\) 48px;/);
});

test('render no longer catches broken saves with a recovery screen', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.doesNotMatch(appSource, /function renderRecoveryScreen/);
  assert.doesNotMatch(appSource, /renderRecoveryScreen\(error\)/);
  assert.doesNotMatch(appSource, /data-action="clear-broken-save"/);
  assert.doesNotMatch(appSource, /action === 'clear-broken-save'/);
});

test('large popup menus use replacement screens while small popups stay modal cards', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function syncBodyScrollLock/);
  assert.match(appSource, /document\.body\.classList\.add\('modal-open'\)/);
  assert.doesNotMatch(appSource, /function activeScrollableModalFromEvent/);
  assert.doesNotMatch(appSource, /function clampModalScroll/);
  assert.match(appSource, /function renderFullScreenView/);
  assert.match(appSource, /<main class="screen-view nav-menu-screen"/);
  assert.match(appSource, /<main class="screen-view hunter-screen"/);
  assert.match(appSource, /<main class="screen-view">/);
  assert.match(appSource, /<section class="event-backdrop" role="dialog" aria-modal="true">\s*<article class="event-modal training-modal">/);
  assert.match(cssSource, /body\.modal-open\s*{[\s\S]*overflow:\s*hidden;/);
  assert.match(cssSource, /@media\s*\(max-width:\s*560px\)\s*{[\s\S]*body\.modal-open\s*{[\s\S]*position:\s*fixed;/);
  assert.match(cssSource, /\.event-backdrop\s*{[\s\S]*overflow:\s*hidden;/);
  assert.doesNotMatch(cssSource, /\.screen-view\s*{[\s\S]*position:\s*fixed;/);
  assert.match(cssSource, /\.screen-panel\s*{[\s\S]*min-height:\s*100dvh;/);
});

test('Shadow Domain map renders as a scrollable tactical node board', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /class="shadow-domain-scroll"/);
  assert.match(appSource, /class="shadow-domain-map tactical-board"/);
  assert.match(appSource, /<circle class="domain-node-ring"/);
  assert.match(appSource, /class="domain-route/);
  assert.doesNotMatch(appSource, /<rect x="\$\{domain\.x\}" y="\$\{domain\.y\}" width="\$\{domain\.width\}"/);
  assert.match(cssSource, /\.shadow-domain-scroll\s*{[\s\S]*overflow:\s*auto;/);
  assert.match(cssSource, /\.shadow-domain-map\s*{[\s\S]*width:\s*1120px;/);
  assert.match(cssSource, /\.domain-map-legend\s*{/);
});
