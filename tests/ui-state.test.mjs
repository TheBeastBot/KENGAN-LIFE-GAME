import test from 'node:test';
import assert from 'node:assert/strict';

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
