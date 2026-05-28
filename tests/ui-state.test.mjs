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
