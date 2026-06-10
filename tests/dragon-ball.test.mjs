import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  CARDS, COMBAT_CARD_IDS, DRAGON_BALL_SAVE_KEY, ENCOUNTERS_BY_AGE, ORIGINS,
} from '../src/dragon-ball/data.mjs';
import { createRewardDraft, encountersForAge, enemyForEncounter } from '../src/dragon-ball/campaign.mjs';
import {
  advanceAfterAgeDraft, beginAgeReward, beginEncounter, canAgeUp, claimDraftCard,
  createDragonBallRun, normalizeDragonBallState, setDeck, validateDeck,
} from '../src/dragon-ball/state.mjs';
import {
  endCombatTurn, enemyIntent, playCombatCard, startDragonBallCombat,
} from '../src/dragon-ball/combat.mjs';
import {
  clearDragonBallGame, loadDragonBallGame, saveDragonBallGame,
} from '../src/dragon-ball/persistence.mjs';
import {
  claimTowerReward, createTowerState, generateTowerEncounter, setTowerLoadout,
  startTowerRun, towerCardAtRank, towerRewardDraft, validateTowerLoadout,
} from '../src/dragon-ball/tower.mjs';

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

test('Infinite Tower provides thirty enemies and twenty exclusive cards', async () => {
  const { TOWER_CARD_IDS, TOWER_ENEMY_NAMES } = await import('../src/dragon-ball/data.mjs');
  assert.ok(TOWER_ENEMY_NAMES.length >= 30);
  assert.ok(TOWER_CARD_IDS.length >= 20);
  assert.ok(TOWER_CARD_IDS.every((id) => CARDS[id].towerOnly));
  assert.ok(TOWER_CARD_IDS.every((id) => !COMBAT_CARD_IDS.includes(id)));
});

test('tower unlocks at age 8 and generates deterministic endlessly scaling bosses', () => {
  const locked = createDragonBallRun({ seed: 201 });
  assert.strictEqual(startTowerRun(locked), locked);
  const state = { ...locked, age: 8 };
  const one = generateTowerEncounter(state, 5);
  const two = generateTowerEncounter(state, 5);
  const later = generateTowerEncounter(state, 35);
  assert.deepEqual(one, two);
  assert.equal(one.type, 'specialFight');
  assert.equal(one.towerFloor, 5);
  assert.equal(one.source, 'tower');
  assert.ok(later.enemyPower > one.enemyPower);
  assert.notEqual(later.name, one.name);
});

test('tower state starts, persists its records, and normalizes legacy saves', () => {
  const fresh = createDragonBallRun({ seed: 202 });
  assert.deepEqual(fresh.tower, createTowerState());
  const legacy = normalizeDragonBallState({ name: 'Legacy Tower', origin: 'saiyan', age: 10 });
  assert.deepEqual(legacy.tower, createTowerState());
  const normalized = normalizeDragonBallState({
    ...fresh,
    age: 12,
    tower: {
      active: true,
      currentFloor: -3,
      highestFloor: 17,
      cards: { 'tower-card-1': 9, fake: 3 },
      loadout: ['tower-card-1', 'tower-card-1', 'fake'],
    },
  });
  assert.equal(normalized.tower.currentFloor, 1);
  assert.equal(normalized.tower.highestFloor, 17);
  assert.equal(normalized.tower.cards['tower-card-1'], 5);
  assert.deepEqual(normalized.tower.loadout, ['tower-card-1']);
});

test('tower loadout allows five owned unique cards outside the normal deck', () => {
  const base = { ...createDragonBallRun({ seed: 203 }), age: 8 };
  const owned = Object.fromEntries(Array.from({ length: 6 }, (_, index) => [`tower-card-${index + 1}`, 1]));
  const state = { ...base, tower: { ...base.tower, cards: owned } };
  const five = Object.keys(owned).slice(0, 5);
  assert.equal(validateTowerLoadout(state, five).valid, true);
  assert.equal(validateTowerLoadout(state, Object.keys(owned)).valid, false);
  assert.equal(validateTowerLoadout(state, [five[0], five[0]]).valid, false);
  assert.equal(validateTowerLoadout(state, ['tower-card-20']).valid, false);
  const equipped = setTowerLoadout(state, five);
  assert.deepEqual(equipped.tower.loadout, five);
  assert.equal(equipped.deck.length, 10);
  assert.equal(validateDeck(equipped).valid, true);
});

test('tower loadout and Recovery Center are locked during an active climb', async () => {
  const { buyRecoveryService } = await import('../src/dragon-ball/state.mjs');
  const base = { ...createDragonBallRun({ seed: 2031 }), age: 8, zeni: 500, currentHealth: 10 };
  const cards = { 'tower-card-1': 1, 'tower-card-2': 1 };
  const climbing = {
    ...base,
    tower: { ...base.tower, active: true, cards, loadout: ['tower-card-1'] },
  };
  assert.strictEqual(setTowerLoadout(climbing, ['tower-card-2']), climbing);
  assert.strictEqual(buyRecoveryService(climbing, 'full-restore'), climbing);
  const campaignFight = climbing.encounters.find((item) => item.type === 'fighter');
  const mentor = climbing.encounters.find((item) => item.type === 'mentor');
  assert.strictEqual(startDragonBallCombat(climbing, campaignFight.id), climbing);
  if (mentor) assert.strictEqual(beginEncounter(climbing, mentor.id), climbing);
});

test('tower rewards always draft stats and every fifth floor drafts unowned cards then upgrades', () => {
  const base = { ...createDragonBallRun({ seed: 204 }), age: 10 };
  const statDraft = towerRewardDraft(base, 4, 'stat');
  assert.equal(statDraft.length, 3);
  assert.ok(statDraft.every((id) => CARDS[id].type === 'stat'));

  const cardDraft = towerRewardDraft(base, 5, 'towerCard');
  assert.equal(cardDraft.length, 3);
  assert.ok(cardDraft.every((id) => CARDS[id].towerOnly));

  const allOwned = Object.fromEntries(
    Object.values(CARDS).filter((item) => item.towerOnly).map((item) => [item.id, 1])
  );
  const upgradeDraft = towerRewardDraft({ ...base, tower: { ...base.tower, cards: allOwned } }, 10, 'towerCard');
  assert.equal(upgradeDraft.length, 3);
  assert.ok(upgradeDraft.every((id) => allOwned[id] < 5));

  const allMaxed = Object.fromEntries(Object.keys(allOwned).map((id) => [id, 5]));
  const fallback = towerRewardDraft({ ...base, tower: { ...base.tower, cards: allMaxed } }, 15, 'towerCard');
  assert.ok(fallback.every((id) => CARDS[id].type === 'stat'));
});

test('late tower boss rewards still provide three choices when fewer than three cards are unowned', () => {
  const base = { ...createDragonBallRun({ seed: 2041 }), age: 12 };
  const towerIds = Object.values(CARDS).filter((item) => item.towerOnly).map((item) => item.id);
  const almostComplete = Object.fromEntries(towerIds.slice(0, -1).map((id) => [id, 1]));
  const draft = towerRewardDraft({
    ...base,
    tower: { ...base.tower, cards: almostComplete },
  }, 25, 'towerCard');
  assert.equal(draft.length, 3);
  assert.ok(draft.includes(towerIds.at(-1)));
  assert.equal(new Set(draft).size, 3);
});

test('late tower boss rewards use high-tier stats to fill a draft when other cards are maxed', () => {
  const base = { ...createDragonBallRun({ seed: 20411 }), age: 20 };
  const towerIds = Object.values(CARDS).filter((item) => item.towerOnly).map((item) => item.id);
  const nearlyMaxed = Object.fromEntries(towerIds.slice(0, -1).map((id) => [id, 5]));
  const draft = towerRewardDraft({
    ...base,
    tower: { ...base.tower, cards: nearlyMaxed },
  }, 105, 'towerCard');
  assert.equal(draft.length, 3);
  assert.ok(draft.includes(towerIds.at(-1)));
  assert.equal(draft.filter((id) => CARDS[id].type === 'stat').length, 2);
});

test('tower cards never appear in normal campaign reward drafts', () => {
  const state = { ...createDragonBallRun({ seed: 2042 }), age: 20 };
  for (let index = 0; index < 25; index += 1) {
    const draft = createRewardDraft(state, index % 2 ? 'special' : 'legendary', `normal-${index}`);
    assert.ok(draft.every((id) => !CARDS[id].towerOnly));
  }
});

test('claiming tower card rewards unlocks cards then raises their rank to five', () => {
  let state = { ...createDragonBallRun({ seed: 205 }), age: 10 };
  state = {
    ...state,
    pendingDraft: { kind: 'towerCard', towerFloor: 5, options: ['tower-card-1', 'tower-card-2', 'tower-card-3'] },
  };
  state = claimTowerReward(state, 'tower-card-1');
  assert.equal(state.tower.cards['tower-card-1'], 1);
  state.pendingDraft = { kind: 'towerCard', towerFloor: 10, options: ['tower-card-1'] };
  state = claimTowerReward(state, 'tower-card-1');
  assert.equal(state.tower.cards['tower-card-1'], 2);
});

test('tower card ranks scale their numerical effects up to rank five', () => {
  const base = towerCardAtRank('tower-card-1', 1);
  const maxed = towerCardAtRank('tower-card-1', 5);
  assert.equal(base.effect.damage, CARDS['tower-card-1'].effect.damage);
  assert.ok(maxed.effect.damage > base.effect.damage);
  assert.equal(maxed.towerRank, 5);
});

test('Form Resonance strengthens an active transformation for the battle', () => {
  let state = { ...createDragonBallRun({ origin: 'saiyan', seed: 2051 }), age: 12 };
  state.tower = {
    ...state.tower,
    active: true,
    cards: { 'tower-card-15': 1 },
    loadout: ['tower-card-15'],
  };
  const encounter = generateTowerEncounter(state, 1);
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.hand = ['form-saiyan-3', 'tower-card-15', 'quick-jab'];
  state.activeCombat.player.ki = 10;
  state = playCombatCard(state, 0);
  state = playCombatCard(state, 0);
  assert.equal(state.activeCombat.player.formBoost, 0.12);
  const enemyHealth = state.activeCombat.enemy.health;
  state = playCombatCard(state, 0);
  assert.ok(enemyHealth - state.activeCombat.enemy.health > 0);
});

test('each origin starts at age 6 with a valid distinct ten-card deck', () => {
  const signatures = new Set();
  for (const origin of Object.keys(ORIGINS)) {
    const state = createDragonBallRun({ origin, seed: 10 });
    assert.equal(state.origin, origin);
    assert.equal(state.age, 6);
    assert.equal(state.deck.length, 10);
    assert.equal(state.zeni, 80);
    assert.equal(validateDeck(state).valid, true);
    assert.equal(state.encounters.length, encountersForAge(6).length);
    signatures.add(state.deck.join('|'));
  }
  assert.equal(signatures.size, 4);
});

test('combat victories award Zeni with a larger purse for special fights', async () => {
  const { combatRewardFor, recordCombatVictory } = await import('../src/dragon-ball/state.mjs');
  const base = createDragonBallRun({ seed: 12 });
  const fighter = base.encounters.find((item) => item.type === 'fighter');
  const special = { ...fighter, id: 'test-special', type: 'specialFight', difficulty: fighter.difficulty + 2 };
  const fighterWin = recordCombatVictory(base, fighter);
  const specialWin = recordCombatVictory(base, special);
  assert.equal(fighterWin.zeni, base.zeni + combatRewardFor(base, fighter));
  assert.equal(specialWin.zeni, base.zeni + combatRewardFor(base, special));
  assert.ok(specialWin.zeni > fighterWin.zeni);
  assert.match(fighterWin.history[0].text, /Zeni/);
});

test('Recovery Center spends Zeni to heal and treat injuries outside combat', async () => {
  const { buyRecoveryService, recoveryServiceCost } = await import('../src/dragon-ball/state.mjs');
  const base = createDragonBallRun({ seed: 13 });
  const hurt = {
    ...base,
    zeni: 500,
    currentHealth: 10,
    injuries: ['injury-bruised-ribs', 'injury-burned-ki'],
  };
  const patched = buyRecoveryService(hurt, 'capsule-patch');
  assert.ok(patched.currentHealth > hurt.currentHealth);
  assert.equal(patched.zeni, hurt.zeni - recoveryServiceCost(hurt, 'capsule-patch'));

  const restored = buyRecoveryService(patched, 'full-restore');
  assert.equal(restored.currentHealth, restored.stats.health);

  const treated = buyRecoveryService(restored, 'injury-treatment');
  assert.equal(treated.injuries.length, 1);
  assert.equal(treated.zeni, restored.zeni - recoveryServiceCost(restored, 'injury-treatment'));
});

test('Recovery Center rejects unaffordable, unnecessary, and in-combat purchases', async () => {
  const { buyRecoveryService } = await import('../src/dragon-ball/state.mjs');
  const base = createDragonBallRun({ seed: 14 });
  const broke = { ...base, zeni: 0, currentHealth: 1 };
  assert.strictEqual(buyRecoveryService(broke, 'full-restore'), broke);
  assert.strictEqual(buyRecoveryService(base, 'full-restore'), base);
  assert.strictEqual(buyRecoveryService(base, 'injury-treatment'), base);
  const inCombat = { ...broke, activeCombat: { turn: 1 } };
  assert.strictEqual(buyRecoveryService(inCombat, 'capsule-patch'), inCombat);
});

test('encounter and reward generation is deterministic for a seed', () => {
  const one = createDragonBallRun({ origin: 'earthling', seed: 99 });
  const two = createDragonBallRun({ origin: 'earthling', seed: 99 });
  assert.deepEqual(one.encounters, two.encounters);
  assert.deepEqual(createRewardDraft(one, 'special', 'same'), createRewardDraft(two, 'special', 'same'));
});

test('special drafts reserve a slot for an eligible compatible form', () => {
  for (const origin of Object.keys(ORIGINS)) {
    const state = { ...createDragonBallRun({ origin, seed: 100 }), age: 12 };
    const draft = createRewardDraft(state, 'special', `form-${origin}`);
    assert.equal(draft.length, 3);
    assert.ok(draft.some((id) => CARDS[id].type === 'form'));
    assert.ok(draft.every((id) => !CARDS[id].origins?.length || CARDS[id].origins.includes(origin)));
  }
});

test('special drafts prioritize unowned forms over duplicate transformations', () => {
  const state = {
    ...createDragonBallRun({ origin: 'saiyan', seed: 101 }),
    age: 14,
    collection: {
      ...createDragonBallRun({ origin: 'saiyan', seed: 101 }).collection,
      'form-saiyan-1': 1,
      'form-saiyan-2': 1,
      'form-saiyan-3': 1,
    },
  };
  const draft = createRewardDraft(state, 'special', 'unowned-form');
  assert.ok(draft.includes('form-saiyan-4') || draft.includes('form-saiyan-5'));
});

test('unique technique catalog includes cards with distinct combat mechanics', () => {
  const expected = [
    'unique-vanishing-assault', 'unique-guard-breaker', 'unique-last-stand',
    'unique-spirit-conversion', 'unique-perfect-barrier', 'unique-senzu-bean',
    'unique-galaxy-gambit', 'unique-limit-breaker',
  ];
  for (const id of expected) assert.ok(CARDS[id], `${id} should exist`);
  assert.ok(CARDS['unique-vanishing-assault'].effect.hits > 1);
  assert.equal(CARDS['unique-guard-breaker'].effect.ignoreBlock, true);
  assert.ok(CARDS['unique-last-stand'].effect.missingHealthDamage > 0);
  assert.ok(CARDS['unique-spirit-conversion'].effect.spirit > 0);
  assert.ok(CARDS['unique-perfect-barrier'].effect.retainBlock > 0);
  assert.ok(CARDS['unique-senzu-bean'].effect.healPercent > 0);
  assert.ok(CARDS['unique-galaxy-gambit'].effect.exhaust);
  assert.ok(CARDS['unique-limit-breaker'].effect.maxKi > 0);
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

test('tower combat includes equipped bonus cards without changing the normal deck', () => {
  let state = { ...createDragonBallRun({ seed: 210 }), age: 8 };
  state.tower.cards = { 'tower-card-1': 1, 'tower-card-2': 2 };
  state = setTowerLoadout(state, ['tower-card-1', 'tower-card-2']);
  state = startTowerRun(state);
  const encounter = generateTowerEncounter(state, 1);
  state = startDragonBallCombat(state, encounter.id);
  const combatCards = [...state.activeCombat.hand, ...state.activeCombat.drawPile];
  assert.ok(combatCards.includes('tower-card-1'));
  assert.ok(combatCards.includes('tower-card-2'));
  assert.equal(state.deck.length, 10);
  assert.equal(state.activeCombat.encounter.source, 'tower');
});

test('tower victories advance floors, heal partially, and queue permanent stat drafts', () => {
  let state = { ...createDragonBallRun({ seed: 211 }), age: 8, currentHealth: 40 };
  state = startTowerRun(state);
  const encounter = generateTowerEncounter(state, 1);
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.hand = ['quick-jab'];
  state.activeCombat.player.ki = 3;
  state.activeCombat.player.health = 40;
  state.activeCombat.enemy.health = 1;
  state = playCombatCard(state, 0);
  assert.equal(state.tower.active, true);
  assert.equal(state.tower.currentFloor, 2);
  assert.equal(state.tower.highestFloor, 1);
  assert.equal(state.pendingDraft.kind, 'towerStat');
  assert.ok(state.currentHealth > 40);
  assert.ok(state.currentHealth < state.stats.health);
  assert.ok(state.pendingDraft.options.every((id) => CARDS[id].type === 'stat'));
});

test('every fifth tower floor fully heals and chains stat then unique rewards', () => {
  let state = { ...createDragonBallRun({ seed: 212 }), age: 10, currentHealth: 20 };
  state.tower = { ...state.tower, active: true, currentFloor: 5 };
  const encounter = generateTowerEncounter(state, 5);
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.hand = ['quick-jab'];
  state.activeCombat.player.ki = 3;
  state.activeCombat.player.health = 20;
  state.activeCombat.enemy.health = 1;
  state = playCombatCard(state, 0);
  assert.equal(state.currentHealth, state.stats.health);
  assert.equal(state.pendingDraft.kind, 'towerStat');
  const statId = state.pendingDraft.options[0];
  state = claimTowerReward(state, statId);
  assert.equal(state.pendingDraft.kind, 'towerCard');
  assert.ok(state.pendingDraft.options.every((id) => CARDS[id].towerOnly));
  state = claimTowerReward(state, state.pendingDraft.options[0]);
  assert.equal(state.pendingDraft, null);
  assert.equal(state.tower.currentFloor, 6);
});

test('tower defeat adds an Injury, records the highest floor, and resets the run', () => {
  let state = { ...createDragonBallRun({ seed: 213 }), age: 10 };
  state.tower = { ...state.tower, active: true, currentFloor: 9, highestFloor: 8 };
  const encounter = generateTowerEncounter(state, 9);
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.player.health = 1;
  state.activeCombat.player.block = 0;
  state.activeCombat.intent = { type: 'attack', label: 'Tower Execution', damage: 999 };
  state = endCombatTurn(state);
  assert.equal(state.activeCombat, null);
  assert.equal(state.tower.active, false);
  assert.equal(state.tower.currentFloor, 1);
  assert.equal(state.tower.highestFloor, 8);
  assert.equal(state.injuries.length, 1);
});

test('harder enemy curve requires multiple turns and gives bosses a major advantage', () => {
  const early = createDragonBallRun({ seed: 45 });
  const earlyFight = early.encounters.find((item) => item.type === 'fighter');
  const earlyEnemy = enemyForEncounter(early, earlyFight);
  assert.ok(earlyEnemy.maxHealth > early.stats.health);
  assert.ok(earlyEnemy.power >= 13);

  const late = { ...early, age: 20, encounters: encountersForAge(20) };
  const normal = enemyForEncounter(late, late.encounters.find((item) => item.type === 'fighter'));
  const boss = enemyForEncounter(late, late.encounters.find((item) => item.type === 'specialFight'));
  assert.ok(boss.maxHealth > normal.maxHealth * 1.7);
  assert.ok(boss.power > normal.power * 1.45);
  assert.equal(boss.special, true);
});

test('enemy guard survives into the player turn while player block expires each turn', () => {
  let state = createDragonBallRun({ seed: 46 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.player.block = 20;
  state.activeCombat.intent = { type: 'guard', label: 'Guard and Charge', block: 18, focus: 1 };
  state = endCombatTurn(state);
  assert.equal(state.activeCombat.player.block, 0);
  assert.equal(state.activeCombat.enemy.block, 18);
});

test('special fights gain an enraging block-piercing ultimate', () => {
  const base = createDragonBallRun({ seed: 47 });
  const state = { ...base, age: 7, encounters: encountersForAge(7) };
  const encounter = state.encounters.find((item) => item.type === 'specialFight');
  const started = startDragonBallCombat(state, encounter.id);
  started.activeCombat.turn = 5;
  const firstUltimate = enemyIntent(started.activeCombat);
  started.activeCombat.turn = 10;
  const laterUltimate = enemyIntent(started.activeCombat);
  assert.equal(firstUltimate.label, 'Limit-Breaking Ultimate');
  assert.equal(firstUltimate.pierce, 0.5);
  assert.ok(laterUltimate.damage > firstUltimate.damage);
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

test('unique cards support multi-hit, block piercing, missing-health damage, and exhaust', () => {
  let state = createDragonBallRun({ seed: 55 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.player.ki = 10;
  state.activeCombat.player.health = Math.floor(state.activeCombat.player.maxHealth / 2);
  state.activeCombat.enemy.health = 500;
  state.activeCombat.enemy.maxHealth = 500;
  state.activeCombat.enemy.block = 0;
  state.activeCombat.hand = [
    'unique-vanishing-assault',
    'unique-guard-breaker',
    'unique-last-stand',
    'unique-galaxy-gambit',
  ];

  const healthBeforeMulti = state.activeCombat.enemy.health;
  state = playCombatCard(state, 0);
  assert.ok(healthBeforeMulti - state.activeCombat.enemy.health >= 2);

  state.activeCombat.enemy.block = 40;
  const blockBeforePierce = state.activeCombat.enemy.block;
  const healthBeforePierce = state.activeCombat.enemy.health;
  state = playCombatCard(state, 0);
  assert.equal(state.activeCombat.enemy.block, blockBeforePierce);
  assert.ok(state.activeCombat.enemy.health < healthBeforePierce);

  state.activeCombat.enemy.block = 0;
  const healthBeforeLastStand = state.activeCombat.enemy.health;
  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.enemy.health < healthBeforeLastStand);

  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.exhaustPile.includes('unique-galaxy-gambit'));
  assert.equal(state.activeCombat.discardPile.includes('unique-galaxy-gambit'), false);
});

test('unique support cards restore Spirit, retain Block, fully heal, and raise Ki capacity', () => {
  let state = createDragonBallRun({ seed: 56 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.player.ki = 10;
  state.activeCombat.player.spirit = 0;
  state.activeCombat.player.health = 1;
  state.activeCombat.hand = [
    'unique-spirit-conversion',
    'unique-perfect-barrier',
    'unique-senzu-bean',
    'unique-limit-breaker',
  ];
  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.player.spirit > 0);
  state = playCombatCard(state, 0);
  assert.ok(state.activeCombat.player.retainBlock > 0);
  state = playCombatCard(state, 0);
  assert.equal(state.activeCombat.player.health, state.activeCombat.player.maxHealth);
  state.activeCombat.player.ki = 3;
  const oldMaxKi = state.activeCombat.player.maxKi;
  state = playCombatCard(state, 0);
  assert.equal(state.activeCombat.player.maxKi, oldMaxKi + 1);
});

test('Perfect Barrier carries only unused Block into the next turn', () => {
  let state = createDragonBallRun({ seed: 57 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  state.activeCombat.hand = ['unique-perfect-barrier'];
  state.activeCombat.player.ki = 2;
  state = playCombatCard(state, 0);
  state.activeCombat.intent = { type: 'attack', label: 'Light Test Strike', damage: 5 };
  state = endCombatTurn(state);
  assert.equal(state.activeCombat.player.block, 9);
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

test('legacy active combats safely default newly added temporary fields', () => {
  let state = createDragonBallRun({ seed: 66 });
  const encounter = state.encounters.find((item) => item.type === 'fighter');
  state = startDragonBallCombat(state, encounter.id);
  delete state.activeCombat.player.retainBlock;
  delete state.activeCombat.player.formBoost;
  state.activeCombat.intent = { type: 'guard', label: 'Wait', block: 0 };
  state = endCombatTurn(state);
  assert.equal(Number.isFinite(state.activeCombat.player.block), true);
  assert.equal(state.activeCombat.player.block, 0);
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

test('legacy saves gain an emergency Zeni reserve and invalid balances are clamped', () => {
  const legacy = normalizeDragonBallState({ name: 'Legacy', origin: 'saiyan', age: 10 });
  const invalid = normalizeDragonBallState({ name: 'Invalid', origin: 'saiyan', zeni: -500 });
  assert.equal(legacy.zeni, 80);
  assert.equal(invalid.zeni, 0);
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
  assert.match(appSource, /renderRecovery/);
  assert.match(appSource, /renderTower/);
  assert.match(appSource, /Infinite Tower/);
  assert.match(appSource, /setTowerLoadout/);
  assert.match(appSource, /tower-fight/);
  assert.match(appSource, /Recovery Center/);
  assert.match(appSource, /buyRecoveryService/);
  assert.match(appSource, /combatRewardFor/);
  assert.match(appSource, /Zeni/);
  assert.match(originalSource, /href="\.\/dragon-ball\.html"/);
  assert.doesNotMatch(appSource, /sim\.mjs/);
  assert.match(appSource, /assets\/dragon-ball\/generated/);
  assert.match(appSource, /origin-\$\{originId\}\.jpg/);
  assert.match(appSource, /const SAIYAN_FORM_ART/);
  assert.match(appSource, /form-saiyan-ssj1\.jpg/);
  assert.match(appSource, /form-saiyan-ssj2\.jpg/);
  assert.match(appSource, /form-saiyan-ssj3\.jpg/);
  assert.match(appSource, /characterArt\(state\.origin, combat\.player\.activeForm\)/);
  assert.match(appSource, /card-strike\.jpg/);
  assert.match(appSource, /card-ki\.jpg/);
  assert.match(css, /--orange:\s*#f47b20/);
  assert.match(css, /ui-hero\.jpg/);
  assert.match(css, /ui-arena\.jpg/);
  assert.match(css, /transformed-pulse/);
  assert.match(css, /\.recovery-grid/);
  assert.match(css, /\.tower-screen/);
  assert.match(css, /\.tower-card-grid/);
  assert.match(css, /@media \(max-width:\s*520px\)/);
  assert.match(CARDS['form-saiyan-3'].name, /SSJ1/);
  assert.match(CARDS['form-saiyan-5'].name, /SSJ2/);
  assert.match(CARDS['form-saiyan-6'].name, /SSJ3/);
  assert.ok(COMBAT_CARD_IDS.length >= 100);
});
