import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  CARDS, COMBAT_CARD_IDS, DRAGON_BALL_SAVE_KEY, ENCOUNTERS_BY_AGE, ORIGINS,
} from '../src/dragon-ball/data.mjs';
import { createRewardDraft, encountersForAge } from '../src/dragon-ball/campaign.mjs';
import {
  advanceAfterAgeDraft, beginAgeReward, beginEncounter, canAgeUp, claimDraftCard,
  createDragonBallRun, normalizeDragonBallState, setDeck, validateDeck,
} from '../src/dragon-ball/state.mjs';
import {
  endCombatTurn, playCombatCard, startDragonBallCombat,
} from '../src/dragon-ball/combat.mjs';
import {
  clearDragonBallGame, loadDragonBallGame, saveDragonBallGame,
} from '../src/dragon-ball/persistence.mjs';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem(key) { return Object.hasOwn(data, key) ? data[key] : null; },
    setItem(key, value) { data[key] = String(value); },
    removeItem(key) { delete data[key]; },
    snapshot() { return { ...data }; },
  };
}

test('Dragon Ball catalog provides large authored campaign content', () => {
  assert.ok(Object.keys(CARDS).length >= 120);
  assert.equal(Object.keys(ENCOUNTERS_BY_AGE).length, 15);
  assert.ok(Object.values(ENCOUNTERS_BY_AGE).flat().length >= 50);
  for (let age = 6; age <= 20; age += 1) {
    assert.ok([3, 4].includes(ENCOUNTERS_BY_AGE[age].length));
  }
});

test('each origin starts at age 6 with a valid distinct ten-card deck', () => {
  const signatures = new Set();
  for (const origin of Object.keys(ORIGINS)) {
    const state = createDragonBallRun({ origin, seed: 10 });
    assert.equal(state.origin, origin);
    assert.equal(state.age, 6);
    assert.equal(state.deck.length, 10);
    assert.equal(validateDeck(state).valid, true);
    assert.equal(state.encounters.length, encountersForAge(6).length);
    signatures.add(state.deck.join('|'));
  }
  assert.equal(signatures.size, 4);
});

test('encounter and reward generation is deterministic for a seed', () => {
  const one = createDragonBallRun({ origin: 'earthling', seed: 99 });
  const two = createDragonBallRun({ origin: 'earthling', seed: 99 });
  assert.deepEqual(one.encounters, two.encounters);
  assert.deepEqual(createRewardDraft(one, 'special', 'same'), createRewardDraft(two, 'special', 'same'));
});

test('mentor stat rewards apply permanently and never enter collection or deck', () => {
  let state = createDragonBallRun({ seed: 22 });
  const mentor = state.encounters.find((item) => item.type === 'mentor');
  state = beginEncounter(state, mentor.id);
  const statCard = CARDS[state.pendingDraft.options[0]];
  assert.equal(statCard.type, 'stat');
  const before = state.stats[statCard.stat];
  state = claimDraftCard(state, statCard.id);
  assert.equal(state.stats[statCard.stat], before + statCard.amount);
  assert.equal(state.collection[statCard.id], undefined);
  assert.equal(state.deck.includes(statCard.id), false);
  assert.ok(state.clearedEncounterIds.includes(mentor.id));
});

test('special mentor rewards add owned combat cards', () => {
  let state = createDragonBallRun({ origin: 'namekian', seed: 31 });
  const mentor = state.encounters.find((item) => item.type === 'specialMentor');
  state = beginEncounter(state, mentor.id);
  const rewardId = state.pendingDraft.options[0];
  assert.notEqual(CARDS[rewardId].type, 'stat');
  state = claimDraftCard(state, rewardId);
  assert.equal(state.collection[rewardId], 1);
});

test('deck validation enforces size copies forms legendary cards ownership and cooldowns', () => {
  const state = createDragonBallRun({ origin: 'saiyan', seed: 2 });
  assert.equal(validateDeck(state, state.deck.slice(0, 9)).valid, false);
  assert.equal(validateDeck(state, [...state.deck, ...state.deck, state.deck[0]]).valid, false);
  assert.equal(validateDeck(state, [...state.deck, 'form-saiyan-1']).valid, false);

  const withForm = {
    ...state,
    age: 12,
    collection: { ...state.collection, 'form-saiyan-1': 1 },
  };
  const validWithForm = [...withForm.deck, 'form-saiyan-1'];
  assert.equal(validateDeck(withForm, validWithForm).valid, true);
  assert.equal(validateDeck(withForm, [...validWithForm, 'form-saiyan-1']).valid, false);
  assert.equal(validateDeck({ ...withForm, cooldowns: { 'form-saiyan-1': 1 } }, validWithForm).valid, false);
});

test('combat starts with five cards, visible intent, and seeded draw order', () => {
  const base = createDragonBallRun({ seed: 44 });
  const encounter = base.encounters.find((item) => item.type === 'fighter');
  const one = startDragonBallCombat(base, encounter.id);
  const two = startDragonBallCombat(base, encounter.id);
  assert.equal(one.activeCombat.hand.length, 5);
  assert.ok(one.activeCombat.intent.label);
  assert.deepEqual(one.activeCombat.hand, two.activeCombat.hand);
});

test('playing cards spends Ki and applies damage block healing and forms', () => {
  let state = createDragonBallRun({ origin: 'saiyan', seed: 55 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.hand = ['driving-kick', 'guard-stance', 'battle-breath', 'form-saiyan-1'];
  state.activeCombat.player.health -= 20;
  state.age = 12;

  const enemyBefore = state.activeCombat.enemy.health;
  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.enemy.health < enemyBefore);
  assert.equal(state.activeCombat.player.ki, 2);

  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.player.block > 0);
  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.player.health > state.stats.health - 20);
  state.activeCombat.player.ki = 3;
  state = playCombatCard(state, 0);
  assert.equal(state.activeCombat.player.activeForm, 'form-saiyan-1');
});

test('discard pile reshuffles when the draw pile is empty', () => {
  let state = createDragonBallRun({ seed: 65 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.drawPile = [];
  state.activeCombat.discardPile = ['quick-jab', 'guard-stance', 'ki-bolt', 'battle-breath', 'afterimage-step'];
  state.activeCombat.hand = [];
  state.activeCombat.intent = { type: 'guard', label: 'Wait', block: 0 };
  state = endCombatTurn(state);
  assert.equal(state.activeCombat.hand.length, 5);
  assert.equal(state.activeCombat.shuffleCount, 1);
});

test('defeat adds a temporary injury and leaves the encounter uncleared', () => {
  let state = createDragonBallRun({ seed: 71 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.player.health = 1;
  state.activeCombat.player.block = 0;
  state.activeCombat.intent = { type: 'attack', label: 'Finish', damage: 999 };
  state = endCombatTurn(state);
  assert.equal(state.activeCombat, null);
  assert.equal(state.injuries.length, 1);
  assert.equal(state.clearedEncounterIds.includes(encounter.id), false);
  assert.equal(CARDS[state.injuries[0]].type, 'injury');
});

test('victory creates a reward draft and stores special move age cooldowns', () => {
  let state = createDragonBallRun({ origin: 'saiyan', seed: 80 });
  const specialId = 'move-36';
  state.age = 20;
  state.collection[specialId] = 1;
  state.deck = setDeck(state, [...state.deck, specialId]).deck;
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.hand = [specialId];
  state.activeCombat.player.ki = 3;
  state.activeCombat.enemy.health = 1;
  state = playCombatCard(state, 0);
  assert.equal(state.activeCombat, null);
  assert.ok(state.pendingDraft);
  assert.equal(state.cooldowns[specialId], CARDS[specialId].cooldownAges);
});

test('Age Up is gated by all encounters and clears injuries while reducing cooldowns', () => {
  let state = createDragonBallRun({ seed: 91 });
  assert.equal(canAgeUp(state), false);
  state = {
    ...state,
    injuries: ['injury-bruised-ribs'],
    cooldowns: { 'move-36': 2 },
    clearedEncounterIds: state.encounters.map((item) => item.id),
  };
  assert.equal(canAgeUp(state), true);
  state = beginAgeReward(state);
  assert.equal(state.pendingDraft.ageAdvance, true);
  state = advanceAfterAgeDraft(state, state.pendingDraft.options[0]);
  assert.equal(state.age, 7);
  assert.deepEqual(state.injuries, []);
  assert.equal(state.cooldowns['move-36'], 1);
  assert.equal(state.currentHealth, state.stats.health);
});

test('age 20 reward completes the campaign instead of deleting the run', () => {
  let state = createDragonBallRun({ seed: 102 });
  state = {
    ...state,
    age: 20,
    encounters: encountersForAge(20),
  };
  state.clearedEncounterIds = state.encounters.map((item) => item.id);
  state = beginAgeReward(state);
  state = advanceAfterAgeDraft(state, state.pendingDraft.options[0]);
  assert.equal(state.completed, true);
  assert.match(state.ending, /Final Sky/);
});

test('normalization removes bad data and preserves a playable Dragon Ball run', () => {
  const state = normalizeDragonBallState({
    name: 'Broken',
    origin: 'invalid',
    age: 500,
    stats: { health: -10 },
    collection: { fake: 99 },
    deck: ['fake'],
    injuries: ['fake'],
    cooldowns: { fake: 5 },
  });
  assert.equal(state.origin, 'saiyan');
  assert.equal(state.age, 20);
  assert.equal(validateDeck(state).valid, true);
  assert.deepEqual(state.injuries, []);
  assert.deepEqual(state.cooldowns, {});
});

test('Dragon Ball persistence uses only its independent save key', () => {
  const storage = memoryStorage({ 'underground-life-sim-save-v1': '{"legacy":true}' });
  const state = createDragonBallRun({ seed: 4 });
  saveDragonBallGame(state, storage);
  assert.ok(storage.snapshot()[DRAGON_BALL_SAVE_KEY]);
  assert.equal(storage.snapshot()['underground-life-sim-save-v1'], '{"legacy":true}');
  assert.equal(loadDragonBallGame(storage).origin, state.origin);
  clearDragonBallGame(storage);
  assert.equal(storage.snapshot()[DRAGON_BALL_SAVE_KEY], undefined);
  assert.equal(storage.snapshot()['underground-life-sim-save-v1'], '{"legacy":true}');
});

test('Dragon Ball page and original game expose separate launcher links and themed UI', async () => {
  const [html, appSource, originalSource, css] = await Promise.all([
    readFile(new URL('../dragon-ball.html', import.meta.url), 'utf8'),
    readFile(new URL('../src/dragon-ball/app.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../src/app.mjs', import.meta.url), 'utf8'),
    readFile(new URL('../dragon-ball.css', import.meta.url), 'utf8'),
  ]);
  assert.match(html, /dragon-ball-app/);
  assert.match(appSource, /renderJourney/);
  assert.match(appSource, /renderCombat/);
  assert.match(appSource, /renderDeck/);
  assert.match(appSource, /renderCollection/);
  assert.match(originalSource, /href="\.\/dragon-ball\.html"/);
  assert.doesNotMatch(appSource, /sim\.mjs/);
  assert.match(appSource, /assets\/dragon-ball\/generated/);
  assert.match(appSource, /origin-\$\{originId\}\.jpg/);
  assert.match(appSource, /card-strike\.jpg/);
  assert.match(appSource, /card-ki\.jpg/);
  assert.match(css, /--orange:\s*#f47b20/);
  assert.match(css, /ui-hero\.jpg/);
  assert.match(css, /ui-arena\.jpg/);
  assert.match(css, /@media \(max-width:\s*520px\)/);
  assert.ok(COMBAT_CARD_IDS.length >= 100);
});
