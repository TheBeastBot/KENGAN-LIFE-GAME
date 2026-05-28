import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CLAN_RARITIES,
  CLANS,
  BASIC_FIGHT_MOVE_IDS,
  buySystemItem,
  ENEMY_FIGHT_MOVES,
  FIGHT_TACTICS,
  FIGHT_MOVES,
  HUNTER_MONSTERS,
  HUNTER_MONSTER_MOVES,
  HUNTER_MOVES,
  MENTORS,
  MONEY_ACTIONS,
  OPPONENTS,
  SPECIAL_FIGHT_IDS,
  SPECIAL_TRAINING_ACTIONS,
  STAT_CAP,
  SOCIAL_ACTIONS,
  SOCIAL_TRASH_TALK_STYLES,
  TRAINING_ACTIONS,
  coachFighter,
  createNewLife,
  endLife,
  findMentor,
  getAvailableFights,
  getAdaptedOpponent,
  getLockedFights,
  getOpponentStats,
  getOpponentArchetype,
  getTrainingAllowance,
  getAutoTrainingStatus,
  getCoachedFightOptions,
  getPlayerArchetype,
  getSpecialTrainingStatus,
  getSpecialFights,
  getExperienceBoost,
  getHunterEffectiveStats,
  maxLifeEnergy,
  maxLifeHealth,
  getStatCap,
  getUnlockedFightMoves,
  getUnlockedHunterMoves,
  joinTournament,
  redeemClanPassword,
  redeemHunterPassword,
  rerollClan,
  recover,
  recoverCoachedFighter,
  recruitCoachedFighter,
  releaseCoachedFighter,
  runHunterDailyQuest,
  advanceHunterDailyQuest,
  claimHunterDailyQuest,
  dismissRetreatedHunterQuest,
  resolveEventChoice,
  advanceHunterDungeon,
  dismissHunterDungeonResult,
  generateHunterGateOffers,
  retreatHunterDungeon,
  selectHunterGate,
  spendMoneyAction,
  spendHunterStatPoint,
  extractShadow,
  startFight,
  startHunterDungeonEncounter,
  startHunterQuestFight,
  retreatHunterQuestFight,
  startRivalFight,
  startTournamentFight,
  specialTrain,
  runAutoRoutine,
  scheduleCoachedFight,
  toggleAutoRecovery,
  toggleAutoTraining,
  toggleFavoriteTraining,
  trashTalkOpponent,
  takeFightTurn,
  train,
  simulateFight,
  useSocialAction,
  visitHunterAssociation,
  ageUp,
} from '../src/sim.mjs';

test('new life starts with chosen gender, random conditions, and 10 clan rerolls', () => {
  const life = createNewLife({ gender: 'Female', seed: 42 });

  assert.equal(life.identity.gender, 'Female');
  assert.equal(life.resources.clanRerolls, 10);
  assert.ok(life.clan.name);
  assert.ok(life.background.familyWealth);
  assert.ok(life.stats.strength > 0);
  assert.equal(life.mentor.id, 'tiredCoach');
});

test('new life uses the chosen first name and current clan as last name', () => {
  const life = createNewLife({ gender: 'Male', firstName: 'Kazuo', seed: 42 });

  assert.equal(life.identity.firstName, 'Kazuo');
  assert.equal(life.identity.lastName, life.clan.name);
  assert.equal(life.identity.name, `Kazuo ${life.clan.name}`);
});

test('favorite trainings are persisted separately from training progress and can be toggled off', () => {
  const life = createNewLife({ seed: 42 });
  const initialStats = { ...life.stats };

  const favorited = toggleFavoriteTraining(life, 'heavyBag');
  const unfavorited = toggleFavoriteTraining(favorited, 'heavyBag');

  assert.deepEqual(life.favoriteTrainingIds, []);
  assert.deepEqual(favorited.favoriteTrainingIds, ['heavyBag']);
  assert.deepEqual(unfavorited.favoriteTrainingIds, []);
  assert.deepEqual(favorited.stats, initialStats);
  assert.equal(favorited.resources.energy, life.resources.energy);
});

test('new life starts with locked hunter world state', () => {
  const life = createNewLife({ gender: 'Male', seed: 142 });

  assert.equal(life.hunterWorld.unlocked, false);
  assert.equal(life.hunterWorld.playerAwakened, false);
  assert.equal(life.hunterWorld.rank, 'E');
  assert.equal(life.hunterWorld.level, 1);
  assert.equal(life.hunterWorld.statPoints, 0);
  assert.deepEqual(life.hunterWorld.stats, { strength: 0, agility: 0, vitality: 0, sense: 0, intelligence: 0 });
  assert.deepEqual(life.hunterWorld.shadowArmy, []);
});

test('high danger adult age up can trigger the system awakening event', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 88 }),
    identity: { ...createNewLife({ gender: 'Female', seed: 88 }).identity, age: 18, month: 0 },
    resources: { ...createNewLife({ gender: 'Female', seed: 88 }).resources, health: 12, reputation: 220 },
    record: { wins: 14, losses: 0, kos: 8 },
    defeatedSpecialFights: ['ohmoTokitoo'],
    world: {
      ...createNewLife({ gender: 'Female', seed: 88 }).world,
      hiddenWorld: true,
      heat: 95,
    },
  };

  const next = ageUp(life);

  assert.equal(next.pendingEvent?.id, 'system-awakening');
  assert.equal(next.pendingEvent.choices[0].id, 'enter-the-gate');
});

test('accepting the system awakening unlocks player hunter state', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 89 }),
    pendingEvent: {
      id: 'system-awakening',
      choices: [
        {
          id: 'enter-the-gate',
          label: 'Enter the Gate',
          result: 'The System recognizes you as the Player.',
          effects: { hunterWorld: { unlock: true, firstGate: 'eGate' }, world: { heat: 8 } },
        },
      ],
    },
  };

  const next = resolveEventChoice(life, 'enter-the-gate');

  assert.equal(next.hunterWorld.unlocked, true);
  assert.equal(next.hunterWorld.playerAwakened, true);
  assert.equal(next.hunterWorld.rank, 'E');
  assert.equal(next.hunterWorld.level, 1);
  assert.equal(next.hunterWorld.gateOffers.length, 3);
  assert.deepEqual(next.hunterWorld.gateOffers.map((offer) => offer.rank), ['E', 'E', 'E']);
  assert.ok(next.world.rumors[0].includes('Gates'));
});

test('running from the system awakening delays the hunter event without unlocking it', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 90 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 90 }).identity, age: 19, month: 3 },
    pendingEvent: {
      id: 'system-awakening',
      choices: [
        {
          id: 'run-from-it',
          label: 'Run From It',
          result: 'You escape before the blue window can finish loading.',
          effects: { resources: { mood: -4, reputation: -2 }, hunterWorld: { delayMonths: 6 } },
        },
      ],
    },
  };

  const next = resolveEventChoice(life, 'run-from-it');

  assert.equal(next.hunterWorld.unlocked, false);
  assert.ok(next.hunterWorld.rejectedUntilMonth > 0);
  assert.equal(next.pendingEvent, null);
});

test('SOLO21 password triggers hunter awakening only past age 18', () => {
  const youth = createNewLife({ gender: 'Male', seed: 901 });
  const rejected = redeemHunterPassword(youth, 'SOLO21');

  assert.equal(rejected.pendingEvent, null);
  assert.ok(rejected.log[0].text.includes('past age 18'));

  const adult = {
    ...createNewLife({ gender: 'Male', seed: 902 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 902 }).identity, age: 18, month: 0 },
  };
  const accepted = redeemHunterPassword(adult, ' solo21 ');

  assert.equal(accepted.pendingEvent?.id, 'system-awakening');
  assert.equal(accepted.pendingEvent.choices[0].id, 'enter-the-gate');
  assert.equal(accepted.hunterWorld.unlocked, false);
});

test('wrong hunter password does not trigger hunter awakening', () => {
  const adult = {
    ...createNewLife({ gender: 'Female', seed: 903 }),
    identity: { ...createNewLife({ gender: 'Female', seed: 903 }).identity, age: 21, month: 2 },
  };

  const next = redeemHunterPassword(adult, 'WRONG');

  assert.equal(next.pendingEvent, null);
  assert.ok(next.log[0].text.includes('Hunter password rejected'));
});

test('hunter daily quest start creates an active quest without instant rewards', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 91 }),
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 91 }).hunterWorld, unlocked: true, playerAwakened: true },
  };

  const next = runHunterDailyQuest(life);

  assert.ok(next.hunterWorld.dailyQuest);
  assert.equal(next.hunterWorld.dailyQuest.completed, false);
  assert.equal(next.hunterWorld.xp, life.hunterWorld.xp);
  assert.equal(next.hunterWorld.dailyQuestsCompleted, 0);
  assert.equal(next.resources.energy, life.resources.energy);
});

test('hunter daily quest choice stages change state and advance objectives', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 911 }),
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 911 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  const stage = life.hunterWorld.dailyQuest.stages[0];
  const choice = stage.choices[0];

  const next = advanceHunterDailyQuest(life, choice.id);

  assert.equal(next.hunterWorld.dailyQuest.stageIndex, 1);
  assert.equal(next.hunterWorld.dailyQuest.stageResults.length, 1);
  assert.notDeepEqual(next.resources, life.resources);
});

test('hunter quest combat stage starts a quest-sourced monster fight', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 912 }),
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 912 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);

  const next = startHunterQuestFight(life);

  assert.equal(next.activeFight.source, 'hunterQuest');
  assert.equal(next.activeFight.questId, next.hunterWorld.dailyQuest.id);
  assert.equal(next.hunterWorld.dailyQuest.monsterFightId, next.activeFight.opponentId);
});

test('hunter quest fights expose System moves instead of normal fighter moves', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 9121 }),
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 9121 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);

  const hunterMoves = getUnlockedHunterMoves(life);

  assert.deepEqual(hunterMoves.map((move) => move.id), Object.keys(HUNTER_MOVES));
  assert.deepEqual(getUnlockedFightMoves(life, 'pressure'), []);
});

test('hunter quest System moves reset for every monster exchange', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 9123 }),
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 9123 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);

  const first = takeFightTurn(life, 'slash');
  const slash = getUnlockedHunterMoves(first).find((move) => move.id === 'slash');
  const second = takeFightTurn(first, 'slash');

  assert.equal(slash.disabledReason, '');
  assert.equal(second.activeFight.round, first.activeFight.round + 1);
});

test('hunter quest Conserve works at zero mana, restores mana, raises guard, and deals no outgoing damage', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 9124 }),
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 9124 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  life.activeFight.meters.playerStamina = 0;
  life.activeFight.meters.guard = 35;
  const monsterHealth = life.activeFight.meters.opponentHealth;

  const next = takeFightTurn(life, 'conserve');
  const exchange = next.activeFight.exchanges[0];

  assert.equal(exchange.moveId, 'conserve');
  assert.equal(exchange.playerDamage, 0);
  assert.equal(next.activeFight.meters.opponentHealth, monsterHealth);
  assert.equal(next.activeFight.meters.playerStamina, 18);
  assert.equal(next.activeFight.meters.guard, 49);
  assert.ok(exchange.enemyDamage >= 0);
});

test('Conserve remains lethal if a System monster breaks through the guard', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 9125 }),
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 9125 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  life.activeFight.meters.playerHealth = 1;

  const next = takeFightTurn(life, 'conserve');

  assert.equal(next.ended, true);
  assert.equal(next.hunterWorld.dailyQuest.outcome, 'fatal');
});

test('normal fights still expose normal moves and no Hunter moves', () => {
  const life = startFight(createNewLife({ gender: 'Male', seed: 9122 }), 'alleyScrapper');

  assert.ok(getUnlockedFightMoves(life, 'pressure').length > 0);
  assert.deepEqual(getUnlockedHunterMoves(life), []);
});

test('winning a hunter quest monster fight advances quest progress without normal record rewards', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 913 }),
    stats: {
      ...createNewLife({ gender: 'Male', seed: 913 }).stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 913 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  life.activeFight.meters.opponentHealth = 1;

  const next = takeFightTurn(life, 'pressure');

  assert.equal(next.activeFight.finished, true);
  assert.equal(next.activeFight.result.won, true);
  assert.equal(next.record.wins, life.record.wins);
  assert.equal(next.resources.clanRerolls, life.resources.clanRerolls);
  assert.equal(next.hunterWorld.dailyQuest.stageIndex, 2);
});

test('hunter quest monster fights do not end by exchange count', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 9141 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 9141 }).resources, energy: 5 },
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 9141 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  life.activeFight.round = life.activeFight.maxRounds;
  life.activeFight.meters.playerHealth = 35;
  life.activeFight.meters.opponentHealth = life.activeFight.meters.maxOpponentHealth;

  const next = takeFightTurn(life, 'manaGuard');

  assert.equal(next.activeFight.finished, false);
  assert.equal(next.activeFight.round, life.activeFight.round + 1);
  assert.equal(next.hunterWorld.dailyQuest.completed, false);
  assert.equal(next.hunterWorld.dailyQuest.failed, false);
  assert.equal(next.hunterWorld.dailyQuest.outcome, null);
  assert.equal(next.record.losses, life.record.losses);
  assert.notEqual(next.ended, true);
});

test('lethal hunter quest monster damage permanently ends the life without claimable rewards', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 914 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 914 }).resources, energy: 5 },
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 914 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  life.activeFight.meters.playerHealth = 1;
  const beforeXp = life.hunterWorld.xp;

  const next = takeFightTurn(life, 'slash');
  const claimAttempt = claimHunterDailyQuest(next);

  assert.equal(next.ended, true);
  assert.equal(next.activeFight, null);
  assert.equal(next.resources.health, 0);
  assert.equal(next.hunterWorld.dailyQuest.outcome, 'fatal');
  assert.equal(next.hunterWorld.xp, beforeXp);
  assert.equal(next.hunterWorld.dailyQuestsCompleted, life.hunterWorld.dailyQuestsCompleted);
  assert.equal(next.legacySummary.eyebrow, 'System Fatality');
  assert.equal(next.legacySummary.title, 'Killed in a System Gate');
  assert.ok(next.legacySummary.lines.some((line) => line.includes('Daily Quest:')));
  assert.equal(claimAttempt.hunterWorld.xp, beforeXp);
});

test('retreating from a hunter monster encounter is safe, costly, and grants no reward', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 9142 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 9142 }).resources, mood: 60, reputation: 20 },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 9142 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  const beforeExchanges = life.activeFight.exchanges.length;
  const beforeXp = life.hunterWorld.xp;

  const next = retreatHunterQuestFight(life);
  const claimAttempt = claimHunterDailyQuest(next);
  const dismissed = dismissRetreatedHunterQuest(next);

  assert.equal(next.activeFight, null);
  assert.notEqual(next.ended, true);
  assert.equal(next.hunterWorld.dailyQuest.outcome, 'retreated');
  assert.equal(next.hunterWorld.dailyQuest.stageResults.at(-1).label.startsWith('Retreated from'), true);
  assert.equal(beforeExchanges, 0);
  assert.equal(next.hunterWorld.systemFatigue, life.hunterWorld.systemFatigue + 10);
  assert.equal(next.resources.mood, life.resources.mood - 8);
  assert.equal(next.resources.reputation, life.resources.reputation - 3);
  assert.equal(next.hunterWorld.xp, beforeXp);
  assert.equal(claimAttempt.hunterWorld.xp, beforeXp);
  assert.equal(dismissed.hunterWorld.dailyQuest, null);
});

test('claiming completed hunter daily quest grants xp, fatigue, completion count, and clears quest', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 915 }),
    stats: {
      ...createNewLife({ gender: 'Male', seed: 915 }).stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 915 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = runHunterDailyQuest(life);
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[0].choices[0].id);
  life = startHunterQuestFight(life);
  life.activeFight.meters.opponentHealth = 1;
  life = takeFightTurn(life, 'pressure');
  life = { ...life, activeFight: null };
  life = advanceHunterDailyQuest(life, life.hunterWorld.dailyQuest.stages[2].choices[0].id);

  const next = claimHunterDailyQuest(life);

  assert.ok(next.hunterWorld.xp > life.hunterWorld.xp);
  assert.ok(next.hunterWorld.systemFatigue > life.hunterWorld.systemFatigue);
  assert.equal(next.hunterWorld.dailyQuestsCompleted, 1);
  assert.equal(next.hunterWorld.dailyQuest, null);
});

test('normal fights still use normal fight source and record progression', () => {
  const life = createNewLife({ gender: 'Male', seed: 916 });
  const next = startFight(life, 'alleyScrapper');

  assert.equal(next.activeFight.source, 'fight');
  assert.equal(next.activeFight.questId, null);
});

test('normal fighter stoppages remain nonfatal when combat health reaches zero', () => {
  let life = startFight(createNewLife({ gender: 'Male', seed: 9161 }), 'alleyScrapper');
  life.activeFight.meters.playerHealth = 0;

  const next = takeFightTurn(life, 'pressure');

  assert.equal(next.activeFight.finished, true);
  assert.notEqual(next.ended, true);
});

test('Gate Board generates three E-rank offers and preserves an existing board', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 92 }),
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 92 }).hunterWorld, unlocked: true, playerAwakened: true },
  };

  life = generateHunterGateOffers(life);
  const reroll = generateHunterGateOffers(life);

  assert.equal(life.hunterWorld.gateOffers.length, 3);
  assert.deepEqual(life.hunterWorld.gateOffers.map((offer) => offer.rank), ['E', 'E', 'E']);
  assert.equal(new Set(life.hunterWorld.gateOffers.map((offer) => offer.templateId)).size, 3);
  assert.deepEqual(reroll.hunterWorld.gateOffers, life.hunterWorld.gateOffers);
});

test('Gate Board includes an optional danger-rank offer after the Hunter level threshold', () => {
  const initial = createNewLife({ gender: 'Female', seed: 920 });
  const life = generateHunterGateOffers({
    ...initial,
    hunterWorld: { ...initial.hunterWorld, unlocked: true, playerAwakened: true, rank: 'C', level: 15 },
  });

  assert.deepEqual(life.hunterWorld.gateOffers.map((offer) => offer.rank), ['D', 'C', 'B']);
  assert.equal(life.hunterWorld.gateOffers.at(-1).danger, true);
});

test('selecting a Gate creates a multi-room dungeon with a final boss System fight', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 921 }),
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 921 }).hunterWorld, unlocked: true, playerAwakened: true },
  };

  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);

  assert.equal(life.hunterWorld.activeDungeon.encounters.length, 2);
  assert.equal(life.hunterWorld.activeDungeon.encounters.at(-1).isBoss, true);
  assert.equal(life.activeFight.source, 'hunterDungeon');
  assert.equal(life.activeFight.dungeonId, life.hunterWorld.activeDungeon.id);
  assert.deepEqual(getUnlockedHunterMoves(life).map((move) => move.id), Object.keys(HUNTER_MOVES));
  assert.deepEqual(getUnlockedFightMoves(life, 'pressure'), []);
});

test('Arch Lich dungeon exchanges use spell attacks instead of human fighting moves', () => {
  const initial = createNewLife({ gender: 'Male', seed: 9211 });
  let life = {
    ...initial,
    hunterWorld: {
      ...initial.hunterWorld,
      unlocked: true,
      playerAwakened: true,
      activeDungeon: {
        id: 'dungeon-lich-test',
        name: 'Black Mana Vault',
        rank: 'A',
        encounters: [{ monsterId: 'archLichBoss', isBoss: true }],
        encounterIndex: 0,
        carriedHealth: null,
        carriedStamina: null,
        startedMonth: 0,
        rewardsEarned: [],
        completed: false,
        retreated: false,
        failed: false,
        bossDefeated: false,
        outcome: null,
        awaitingAdvance: false,
      },
    },
  };
  life = startHunterDungeonEncounter(life);

  const next = takeFightTurn(life, 'manaGuard');
  const exchange = next.activeFight.exchanges[0];
  const lichSpells = ['Death Array', 'Soul Spear', 'Phylactery Curse'];
  const humanMoves = Object.values(ENEMY_FIGHT_MOVES).map((move) => move.label);

  assert.ok(lichSpells.includes(exchange.opponentMoveLabel));
  assert.ok(!humanMoves.includes(exchange.opponentMoveLabel));
});

test('every System monster exposes a dedicated non-human attack kit', () => {
  const humanMoves = new Set(Object.values(ENEMY_FIGHT_MOVES).map((move) => move.label));

  for (const [monsterId, monster] of Object.entries(HUNTER_MONSTERS)) {
    assert.ok(monster.moveIds?.length >= 2, `${monsterId} should have its own System attacks`);
    for (const moveId of monster.moveIds) {
      assert.ok(HUNTER_MONSTER_MOVES[moveId], `${monsterId} should resolve ${moveId}`);
      assert.ok(!humanMoves.has(HUNTER_MONSTER_MOVES[moveId].label), `${monsterId} should not resolve a human fight move`);
    }
  }
});

test('System monster combat scales dungeon danger above the authored base opponents', () => {
  const eRoom = getOpponentStats(HUNTER_MONSTERS.gateCrawler);
  const aBoss = getOpponentStats(HUNTER_MONSTERS.archLichBoss);
  const redBoss = getOpponentStats(HUNTER_MONSTERS.redDemonKnight);
  const normalBoss = getOpponentStats(HUNTER_MONSTERS.demonKnightBoss);

  assert.ok(eRoom.strength >= 90);
  assert.ok(aBoss.strength >= 900);
  assert.ok(redBoss.strength > normalBoss.strength);
});

test('dungeon room rewards pay immediately and health and mana carry into the boss encounter', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 922 }),
    stats: {
      ...createNewLife({ gender: 'Male', seed: 922 }).stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 922 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  const beforeMoney = life.resources.money;
  life.activeFight.meters.playerHealth = 46;
  life.activeFight.meters.playerStamina = 37;
  life.activeFight.meters.opponentHealth = 1;

  life = takeFightTurn(life, 'slash');
  const carriedHealth = life.hunterWorld.activeDungeon.carriedHealth;
  const carriedMana = life.hunterWorld.activeDungeon.carriedStamina;
  assert.equal(life.resources.money, beforeMoney + 250);
  assert.ok(life.hunterWorld.xp >= 35);

  life = advanceHunterDungeon(life);
  assert.equal(life.activeFight.isBoss, true);
  assert.equal(life.activeFight.meters.playerHealth, carriedHealth);
  assert.equal(life.activeFight.meters.playerStamina, carriedMana);
});

test('System Conserve mana recovered in a dungeon carries into the following room', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 9221 }),
    stats: {
      ...createNewLife({ gender: 'Male', seed: 9221 }).stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 9221 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  life.activeFight.meters.playerStamina = 0;

  life = takeFightTurn(life, 'conserve');
  assert.equal(life.activeFight.meters.playerStamina, 18);
  life.activeFight.meters.opponentHealth = 1;
  life = takeFightTurn(life, 'slash');
  const carriedMana = life.hunterWorld.activeDungeon.carriedStamina;
  life = advanceHunterDungeon(life);

  assert.equal(life.activeFight.meters.playerStamina, carriedMana);
  assert.ok(carriedMana > 0);
});

test('clearing a dungeon boss grants jackpot, Hunter growth, a Gate clear, and shadow eligibility', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 923 }),
    stats: {
      ...createNewLife({ gender: 'Male', seed: 923 }).stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 923 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  life.activeFight.meters.opponentHealth = 1;
  life = takeFightTurn(life, 'slash');
  life = advanceHunterDungeon(life);
  const beforeBossMoney = life.resources.money;
  const beforeStats = Object.values(life.hunterWorld.stats).reduce((sum, value) => sum + value, 0);
  life.activeFight.meters.opponentHealth = 1;

  const cleared = takeFightTurn(life, 'slash');

  assert.equal(cleared.hunterWorld.activeDungeon.bossDefeated, true);
  assert.equal(cleared.hunterWorld.gatesCleared, 1);
  assert.equal(cleared.resources.money, beforeBossMoney + 1000);
  assert.equal(Object.values(cleared.hunterWorld.stats).reduce((sum, value) => sum + value, 0), beforeStats + 1);
  assert.ok(cleared.hunterWorld.lastBossCleared);
  assert.ok(cleared.hunterWorld.xp >= 90);
});

test('hunter xp levels grant five Hunter stat points and spending them does not mutate fighter stats', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 93 }),
    hunterWorld: {
      ...createNewLife({ gender: 'Male', seed: 93 }).hunterWorld,
      unlocked: true,
      playerAwakened: true,
      xp: 110,
      level: 1,
    },
  };

  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  life.activeFight.meters.opponentHealth = 1;
  life = takeFightTurn(life, 'slash');
  const beforeStrength = life.stats.strength;
  const beforeHunterStrength = life.hunterWorld.stats.strength;
  const next = spendHunterStatPoint(life, 'strength');

  assert.ok(life.hunterWorld.level > 1);
  assert.ok(life.hunterWorld.statPoints >= 5);
  assert.equal(next.hunterWorld.statPoints, life.hunterWorld.statPoints - 1);
  assert.equal(next.hunterWorld.stats.strength, beforeHunterStrength + 1);
  assert.equal(next.stats.strength, beforeStrength);
});

test('retreating from a dungeon keeps earned room rewards, applies survival penalties, and creates new offers after dismissal', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 924 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 924 }).resources, mood: 60, reputation: 20 },
    stats: {
      ...createNewLife({ gender: 'Male', seed: 924 }).stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...createNewLife({ gender: 'Male', seed: 924 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  life.activeFight.meters.opponentHealth = 1;
  life = takeFightTurn(life, 'slash');
  life = advanceHunterDungeon(life);
  const moneyAfterRoom = life.resources.money;
  const exchangeCount = life.activeFight.exchanges.length;

  const retreat = retreatHunterDungeon(life);
  const dismissed = dismissHunterDungeonResult(retreat);

  assert.equal(retreat.activeFight, null);
  assert.equal(retreat.resources.money, moneyAfterRoom);
  assert.equal(retreat.hunterWorld.systemFatigue, life.hunterWorld.systemFatigue + 12);
  assert.equal(retreat.resources.mood, life.resources.mood - 10);
  assert.equal(retreat.resources.reputation, life.resources.reputation - 4);
  assert.equal(exchangeCount, 0);
  assert.equal(retreat.hunterWorld.activeDungeon.outcome, 'retreated');
  assert.equal(dismissed.hunterWorld.activeDungeon, null);
  assert.equal(dismissed.hunterWorld.gateOffers.length, 3);
});

test('hunter dungeon fights do not fail by exchange count', () => {
  const initial = createNewLife({ gender: 'Male', seed: 9241 });
  let life = generateHunterGateOffers({
    ...initial,
    resources: { ...initial.resources, mood: 60, reputation: 20 },
    hunterWorld: { ...initial.hunterWorld, unlocked: true, playerAwakened: true },
  });
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  life.activeFight.round = life.activeFight.maxRounds;
  life.activeFight.meters.playerHealth = 30;
  life.activeFight.meters.opponentHealth = life.activeFight.meters.maxOpponentHealth;

  const next = takeFightTurn(life, 'manaGuard');

  assert.equal(next.activeFight.finished, false);
  assert.equal(next.activeFight.round, life.activeFight.round + 1);
  assert.equal(next.hunterWorld.activeDungeon.outcome, null);
  assert.equal(next.hunterWorld.systemFatigue, life.hunterWorld.systemFatigue);
  assert.equal(next.resources.mood, life.resources.mood);
  assert.equal(next.resources.reputation, life.resources.reputation);
  assert.notEqual(next.ended, true);
});

test('lethal dungeon monster damage ends the life with a Gate fatality summary', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 925 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 925 }).resources, energy: 5 },
    hunterWorld: { ...createNewLife({ gender: 'Female', seed: 925 }).hunterWorld, unlocked: true, playerAwakened: true },
  };
  life = generateHunterGateOffers(life);
  life = selectHunterGate(life, life.hunterWorld.gateOffers[0].id);
  life = startHunterDungeonEncounter(life);
  life.activeFight.meters.playerHealth = 1;

  const next = takeFightTurn(life, 'slash');

  assert.equal(next.ended, true);
  assert.equal(next.activeFight, null);
  assert.equal(next.legacySummary.title, 'Killed in a System Gate');
  assert.ok(next.legacySummary.lines.some((line) => line.includes('Gate:')));
  assert.equal(next.hunterWorld.gatesCleared, 0);
});

test('pending Red Gate events create one optional enhanced offer and two normal Gates', () => {
  const initial = createNewLife({ gender: 'Male', seed: 926 });
  let life = {
    ...initial,
    hunterWorld: {
      ...initial.hunterWorld,
      unlocked: true,
      playerAwakened: true,
      rank: 'C',
      level: 15,
      redGatePending: true,
    },
  };

  life = generateHunterGateOffers(life);

  assert.equal(life.hunterWorld.gateOffers.length, 3);
  assert.equal(life.hunterWorld.gateOffers.filter((offer) => offer.isRedGate).length, 1);
  assert.equal(life.hunterWorld.gateOffers.find((offer) => offer.isRedGate).encounters.length, 4);
  assert.equal(life.hunterWorld.redGatePending, false);
});

test('Red Gate room victories apply the enhanced reward multiplier', () => {
  const initial = createNewLife({ gender: 'Male', seed: 927 });
  let life = generateHunterGateOffers({
    ...initial,
    stats: {
      ...initial.stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      control: 450,
    },
    hunterWorld: { ...initial.hunterWorld, unlocked: true, playerAwakened: true, redGatePending: true },
  });
  life = selectHunterGate(life, life.hunterWorld.gateOffers.find((offer) => offer.isRedGate).id);
  life = startHunterDungeonEncounter(life);
  const beforeMoney = life.resources.money;
  life.activeFight.meters.opponentHealth = 1;

  const next = takeFightTurn(life, 'slash');

  assert.equal(next.resources.money, beforeMoney + 438);
  assert.equal(next.hunterWorld.activeDungeon.isRedGate, true);
});

test('one Hunter stat adds ten mapped fighter-stat equivalent power', () => {
  const baseLife = createNewLife({ gender: 'Male', seed: 931 });
  const withHunterStat = (stat) => ({
    ...baseLife,
    hunterWorld: {
      ...baseLife.hunterWorld,
      unlocked: true,
      playerAwakened: true,
      stats: { strength: 0, agility: 0, vitality: 0, sense: 0, intelligence: 0, [stat]: 1 },
    },
  });
  const sum = (stats, keys) => keys.reduce((total, key) => total + (stats[key] ?? 0), 0);
  const statMappings = {
    strength: ['strength'],
    agility: ['speed', 'reflexes', 'flexibility'],
    vitality: ['durability', 'willpower'],
    sense: ['fightIq', 'technique', 'reflexes', 'control'],
    intelligence: ['fightIq', 'control'],
  };

  for (const [hunterStat, mappedStats] of Object.entries(statMappings)) {
    const life = withHunterStat(hunterStat);
    const effective = getHunterEffectiveStats(life);
    assert.equal(sum(effective, mappedStats), sum(baseLife.stats, mappedStats) + 10);
  }
});

test('Hunter overlay is unavailable before awakening and strengthens ordinary fights afterward', () => {
  const base = createNewLife({ gender: 'Male', seed: 932 });
  const storedHunterStats = { strength: 12, agility: 0, vitality: 10, sense: 0, intelligence: 0 };
  const locked = {
    ...base,
    hunterWorld: { ...base.hunterWorld, stats: storedHunterStats },
  };
  const awakened = {
    ...base,
    hunterWorld: { ...base.hunterWorld, unlocked: true, playerAwakened: true, stats: storedHunterStats },
  };

  assert.equal(getHunterEffectiveStats(locked).strength, base.stats.strength);
  const normalFight = startFight(base, 'alleyScrapper');
  const awakenedFight = startFight(awakened, 'alleyScrapper');
  assert.ok(awakenedFight.activeFight.meters.maxPlayerHealth > normalFight.activeFight.meters.maxPlayerHealth);

  const normalExchange = takeFightTurn(normalFight, 'pressure').activeFight.exchanges[0];
  const awakenedExchange = takeFightTurn(awakenedFight, 'pressure').activeFight.exchanges[0];
  assert.ok(awakenedExchange.swing > normalExchange.swing);
  assert.ok(awakenedExchange.enemyDamage < normalExchange.enemyDamage);
});

test('life health and energy caps scale with combat stats and match fight meters', () => {
  const base = createNewLife({ gender: 'Male', seed: 933 });
  const strong = {
    ...base,
    stats: {
      ...base.stats,
      durability: 900,
      willpower: 820,
      control: 760,
    },
  };
  const maxHealth = maxLifeHealth(strong);
  const maxEnergy = maxLifeEnergy(strong);
  const recovered = recover({
    ...strong,
    resources: { ...strong.resources, health: maxHealth - 5, energy: maxEnergy - 5 },
  }, 'restDay');
  const fight = startFight({
    ...recovered,
    resources: { ...recovered.resources, health: maxHealth, energy: maxEnergy },
  }, 'alleyScrapper');

  assert.ok(maxHealth > 100);
  assert.ok(maxEnergy > 100);
  assert.equal(recovered.resources.health, maxHealth);
  assert.equal(recovered.resources.energy, maxEnergy);
  assert.equal(fight.activeFight.meters.maxPlayerHealth, maxHealth);
  assert.equal(fight.activeFight.meters.playerHealth, maxHealth);
  assert.equal(fight.activeFight.meters.maxPlayerStamina, maxEnergy);
  assert.equal(fight.activeFight.meters.playerStamina, maxEnergy);
});

test('high-rank System bosses have dungeon-scale health and dangerous monster damage', () => {
  const initial = createNewLife({ gender: 'Male', seed: 9331 });
  let life = {
    ...initial,
    stats: Object.fromEntries(Object.entries(initial.stats).map(([stat, value]) => [stat, value + 260])),
    resources: { ...initial.resources, energy: 180, health: 220 },
    hunterWorld: {
      ...initial.hunterWorld,
      unlocked: true,
      playerAwakened: true,
      rank: 'A',
      level: 30,
      stats: { strength: 24, agility: 18, vitality: 22, sense: 18, intelligence: 16 },
      activeDungeon: {
        id: 'dungeon-lich-threat-test',
        name: 'Black Mana Vault',
        rank: 'A',
        encounters: [{ monsterId: 'archLichBoss', isBoss: true }],
        encounterIndex: 0,
        carriedHealth: null,
        carriedStamina: null,
        startedMonth: 0,
        rewardsEarned: [],
        completed: false,
        retreated: false,
        failed: false,
        bossDefeated: false,
        outcome: null,
        awaitingAdvance: false,
      },
    },
  };
  life.resources.health = maxLifeHealth(life);
  life.resources.energy = maxLifeEnergy(life);
  life = startHunterDungeonEncounter(life);

  assert.ok(life.activeFight.meters.maxOpponentHealth >= 1200);

  const next = takeFightTurn(life, 'slash');
  const exchange = next.activeFight.exchanges[0];

  assert.ok(exchange.baseEnemyDamage >= 100);
  assert.ok(next.activeFight.meters.opponentHealth > 0);
});

test('hunter association can promote ranks after enough gates and power', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 94 }),
    stats: Object.fromEntries(Object.entries(createNewLife({ gender: 'Male', seed: 94 }).stats).map(([stat, value]) => [stat, value + 160])),
    hunterWorld: {
      ...createNewLife({ gender: 'Male', seed: 94 }).hunterWorld,
      unlocked: true,
      playerAwakened: true,
      level: 8,
      gatesCleared: 6,
    },
  };

  const next = visitHunterAssociation(life);

  assert.equal(next.hunterWorld.rank, 'D');
  assert.ok(next.resources.reputation > life.resources.reputation);
});

test('system shop trades money for hunter recovery supplies', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 941 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 941 }).resources, money: 1000, health: 60, energy: 45 },
    hunterWorld: {
      ...createNewLife({ gender: 'Male', seed: 941 }).hunterWorld,
      unlocked: true,
      playerAwakened: true,
    },
  };

  const next = buySystemItem(life);

  assert.equal(next.resources.money, 600);
  assert.ok(next.resources.health > life.resources.health);
  assert.ok(next.resources.energy > life.resources.energy);
  assert.deepEqual(next.hunterWorld.inventory, ['recoveryPotion']);
});

test('shadow extraction requires boss gate clearance and adds a shadow ally', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 95 }),
    hunterWorld: {
      ...createNewLife({ gender: 'Female', seed: 95 }).hunterWorld,
      unlocked: true,
      playerAwakened: true,
      level: 12,
      lastBossCleared: 'steel-knight',
    },
  };

  const next = extractShadow(life);

  assert.equal(next.hunterWorld.shadowArmy.length, 1);
  assert.equal(next.hunterWorld.lastBossCleared, null);
  assert.ok(next.stats.control > life.stats.control);
});

test('blank custom first name falls back to a generated first name', () => {
  const life = createNewLife({ gender: 'Male', firstName: '   ', seed: 42 });

  assert.ok(life.identity.firstName);
  assert.equal(life.identity.lastName, life.clan.name);
  assert.equal(life.identity.name, `${life.identity.firstName} ${life.clan.name}`);
});

test('clan reroll spends one reroll and changes only clan result', () => {
  const life = createNewLife({ gender: 'Male', seed: 7 });
  const originalBackground = structuredClone(life.background);
  const originalMoney = life.resources.money;

  const next = rerollClan(life);

  assert.equal(next.resources.clanRerolls, 9);
  assert.deepEqual(next.background, originalBackground);
  assert.equal(next.resources.money, originalMoney);
});

test('clan reroll changes the character last name to the new clan', () => {
  const life = createNewLife({ gender: 'Male', firstName: 'Ohma', seed: 7 });

  const next = rerollClan(life);

  assert.equal(next.identity.firstName, 'Ohma');
  assert.equal(next.identity.lastName, next.clan.name);
  assert.equal(next.identity.name, `Ohma ${next.clan.name}`);
});

test('clan reroll preserves current health, energy, injuries, and active fight meters', () => {
  const damaged = {
    ...startFight(createNewLife({ gender: 'Male', seed: 707 }), 'localBrawler'),
    resources: {
      ...createNewLife({ gender: 'Male', seed: 707 }).resources,
      health: 37,
      energy: 22,
      mood: 19,
      clanRerolls: 4,
    },
    injuries: ['deep fight damage'],
  };
  damaged.activeFight.meters.playerHealth = 41;
  damaged.activeFight.meters.playerStamina = 18;

  const next = rerollClan(damaged);

  assert.equal(next.resources.health, 37);
  assert.equal(next.resources.energy, 22);
  assert.equal(next.resources.mood, 19);
  assert.deepEqual(next.injuries, ['deep fight damage']);
  assert.equal(next.activeFight.meters.playerHealth, 41);
  assert.equal(next.activeFight.meters.playerStamina, 18);
});

test('clan rerolls do not stack previous clan stat bonuses', () => {
  let life = createNewLife({ gender: 'Female', seed: 88 });
  const baseTotal = Object.values(life.baseStats).reduce((sum, value) => sum + value, 0);

  for (let count = 0; count < 5; count += 1) {
    life = rerollClan(life);
  }

  const currentTotal = Object.values(life.stats).reduce((sum, value) => sum + value, 0);

  assert.ok(currentTotal < baseTotal + 120);
});

test('clan reroll preserves trained stat growth while swapping clan bonuses', () => {
  const life = createNewLife({ gender: 'Male', seed: 409 });
  const trained = {
    ...life,
    resources: { ...life.resources, clanRerolls: 5 },
    stats: {
      ...life.stats,
      strength: life.stats.strength + 45,
      technique: life.stats.technique + 31,
      fightIq: life.stats.fightIq + 18,
    },
  };

  const oldBonusStrength = life.clan.bonuses.strength
    ? life.clan.bonuses.strength * CLAN_RARITIES.find((rarity) => rarity.name === life.clan.rarity).powerMultiplier
    : 0;
  const oldBonusTechnique = life.clan.bonuses.technique
    ? life.clan.bonuses.technique * CLAN_RARITIES.find((rarity) => rarity.name === life.clan.rarity).powerMultiplier
    : 0;
  const oldBonusFightIq = life.clan.bonuses.fightIq
    ? life.clan.bonuses.fightIq * CLAN_RARITIES.find((rarity) => rarity.name === life.clan.rarity).powerMultiplier
    : 0;

  const next = rerollClan(trained);
  const newRarity = CLAN_RARITIES.find((rarity) => rarity.name === next.clan.rarity).powerMultiplier;
  const newBonusStrength = (next.clan.bonuses.strength ?? 0) * newRarity;
  const newBonusTechnique = (next.clan.bonuses.technique ?? 0) * newRarity;
  const newBonusFightIq = (next.clan.bonuses.fightIq ?? 0) * newRarity;

  assert.equal(next.stats.strength, Math.round(trained.stats.strength - oldBonusStrength + newBonusStrength));
  assert.equal(next.stats.technique, Math.round(trained.stats.technique - oldBonusTechnique + newBonusTechnique));
  assert.equal(next.stats.fightIq, Math.round(trained.stats.fightIq - oldBonusFightIq + newBonusFightIq));
});

test('correct clan password forces the secret Ashura clan without spending rerolls or resetting resources', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 130 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 130 }).resources, health: 47, energy: 33, clanRerolls: 4 },
  };

  const next = redeemClanPassword(life, 'BUCKY21');

  assert.equal(next.clan.name, 'Ashura');
  assert.equal(next.clan.rarity, 'Secret');
  assert.equal(next.identity.lastName, 'Ashura');
  assert.equal(next.identity.name, `${next.identity.firstName} Ashura`);
  assert.equal(next.resources.health, 47);
  assert.equal(next.resources.energy, 33);
  assert.equal(next.resources.clanRerolls, 4);
  assert.ok(next.log[0].text.includes('accepted'));
});

test('wrong clan password does not change clan or resources', () => {
  const life = createNewLife({ gender: 'Female', seed: 131 });

  const next = redeemClanPassword(life, 'WRONG');

  assert.equal(next.clan.name, life.clan.name);
  assert.deepEqual(next.resources, life.resources);
  assert.ok(next.log[0].text.includes('rejected'));
});

test('secret clan has a natural 0.1 percent rarity weight', () => {
  const total = CLAN_RARITIES.reduce((sum, rarity) => sum + rarity.weight, 0);
  const secret = CLAN_RARITIES.find((rarity) => rarity.name === 'Secret');

  assert.ok(secret);
  assert.equal(secret.weight / total, 0.001);
});

test('devil gene clan is the natural secret clan roll and has pity after 1500 rerolls', () => {
  const devilClan = CLANS.find((clan) => clan.name === 'Mishime');
  assert.ok(devilClan);
  assert.equal(devilClan.rarity, 'Secret');

  let naturalSecret = null;
  for (let seed = 1; seed < 5000 && !naturalSecret; seed += 1) {
    const life = createNewLife({ gender: 'Male', seed });
    if (life.clan.rarity === 'Secret') naturalSecret = life.clan;
  }

  assert.ok(naturalSecret);
  assert.equal(naturalSecret.name, 'Mishime');

  const base = createNewLife({ gender: 'Male', firstName: 'Jinn', seed: 42 });
  const pitied = rerollClan({
    ...base,
    resources: { ...base.resources, clanRerolls: 1 },
    clanRerollPity: 1499,
  });

  assert.equal(pitied.clan.name, 'Mishime');
  assert.equal(pitied.clanRerollPity, 0);
  assert.equal(pitied.identity.name, 'Jinn Mishime');
});

test('Mishime lives initialize awakening state while other clans do not', () => {
  const mishime = CLANS.find((clan) => clan.name === 'Mishime');
  const normal = createNewLife({ gender: 'Female', seed: 42 });
  const life = {
    ...normal,
    clan: mishime,
  };
  const rerolled = rerollClan({
    ...normal,
    resources: { ...normal.resources, clanRerolls: 1 },
    clanRerollPity: 1499,
  });

  assert.equal(normal.clanAwakening, null);
  assert.deepEqual(rerolled.clanAwakening, {
    stage: 0,
    control: 50,
    corruption: 0,
    lastAwakeningMonth: null,
  });
  assert.deepEqual(startFight(life, 'localBrawler').clanAwakening, {
    stage: 0,
    control: 50,
    corruption: 0,
    lastAwakeningMonth: null,
  });
});

test('Mishime awakening events progress by player choice', () => {
  const mishime = CLANS.find((clan) => clan.name === 'Mishime');
  let life = {
    ...createNewLife({ gender: 'Male', seed: 66 }),
    clan: mishime,
    identity: { ...createNewLife({ gender: 'Male', seed: 66 }).identity, age: 14 },
    eventFlags: { coachNotice: true },
  };

  life = ageUp(life);
  assert.equal(life.pendingEvent.id, 'mishime-first-surge');
  life = resolveEventChoice(life, 'restrain-devil-gene');
  assert.equal(life.clanAwakening.stage, 1);
  assert.ok(life.clanAwakening.control > 50);
  assert.ok(life.world.heat <= 10);

  life = {
    ...life,
    pendingEvent: null,
    identity: { ...life.identity, age: 18 },
    record: { wins: 5, losses: 0, kos: 3 },
    resources: { ...life.resources, reputation: 80 },
    world: { ...life.world, hiddenWorld: true, heat: 35 },
  };
  life = ageUp(life);
  assert.equal(life.pendingEvent.id, 'mishime-pressure-deepens');
  life = resolveEventChoice(life, 'use-devil-pressure');
  assert.equal(life.clanAwakening.stage, 2);
  assert.ok(life.clanAwakening.corruption >= 18);
  assert.ok(life.world.heat >= 43);

  life = {
    ...life,
    pendingEvent: null,
    defeatedSpecialFights: ['jinnKazame'],
    record: { wins: 12, losses: 0, kos: 8 },
    clanAwakening: { ...life.clanAwakening, control: 70 },
  };
  life = ageUp(life);
  assert.equal(life.pendingEvent.id, 'mishime-full-awakening');
  life = resolveEventChoice(life, 'master-devil-form');
  assert.equal(life.clanAwakening.stage, 3);
  assert.ok(life.clanAwakening.control >= 75);
  assert.ok(life.clanAwakening.corruption >= 20);
});

test('Mishime awakening scales combat and stage 3 devil form has a cost', () => {
  const mishime = CLANS.find((clan) => clan.name === 'Mishime');
  const base = {
    ...createNewLife({ gender: 'Male', seed: 528 }),
    clan: mishime,
    stats: {
      ...createNewLife({ gender: 'Male', seed: 528 }).stats,
      strength: 220,
      speed: 190,
      aggression: 210,
      willpower: 200,
      reflexes: 180,
      technique: 150,
    },
    resources: { ...createNewLife({ gender: 'Male', seed: 528 }).resources, health: 45, energy: 100 },
    world: { ...createNewLife({ gender: 'Male', seed: 528 }).world, heat: 10 },
  };
  const stage0 = takeFightTurn(startFight({ ...base, clanAwakening: { stage: 0, control: 50, corruption: 0, lastAwakeningMonth: null } }, 'localBrawler'), 'pressure').activeFight.exchanges[0];
  const stage1 = takeFightTurn(startFight({ ...base, clanAwakening: { stage: 1, control: 60, corruption: 8, lastAwakeningMonth: null } }, 'localBrawler'), 'pressure').activeFight.exchanges[0];
  const stage2 = takeFightTurn(startFight({ ...base, clanAwakening: { stage: 2, control: 55, corruption: 25, lastAwakeningMonth: null } }, 'localBrawler'), 'special').activeFight.exchanges[0];
  const stage3 = takeFightTurn(startFight({ ...base, clanAwakening: { stage: 3, control: 70, corruption: 30, lastAwakeningMonth: null } }, 'localBrawler'), 'special');
  const stage3Exchange = stage3.activeFight.exchanges[0];

  assert.ok(stage1.playerDamage > stage0.playerDamage);
  assert.ok(stage1.text.includes('Devil Gene Pressure'));
  assert.ok(stage2.playerDamage > stage1.playerDamage);
  assert.ok(stage2.text.includes('Stage 2'));
  assert.equal(stage3Exchange.specialBoosts.label, 'Devil Form');
  assert.ok(stage3Exchange.specialBoosts.strength > stage2.specialBoosts.strength);
  assert.ok(stage3.clanAwakening.corruption > 30);
  assert.ok(stage3.world.heat > 10);
});

test('rarity tiers are ordered by stronger power multiplier', () => {
  const multipliers = CLAN_RARITIES.map((rarity) => rarity.powerMultiplier);

  for (let index = 1; index < multipliers.length; index += 1) {
    assert.ok(multipliers[index] > multipliers[index - 1]);
  }
});

test('training consumes energy and improves matching stats', () => {
  const life = createNewLife({ gender: 'Nonbinary', seed: 11 });
  const beforeEnergy = life.resources.energy;
  const beforeStrength = life.stats.strength;

  const next = train(life, 'heavyBag');

  assert.ok(next.resources.energy < beforeEnergy);
  assert.ok(next.stats.strength > beforeStrength);
  assert.ok(next.log[0].text.includes('Heavy Bag'));
});

test('normal training allows twenty completed sessions and blocks the twenty-first without cost', () => {
  let life = createNewLife({ gender: 'Nonbinary', seed: 111 });

  for (let session = 0; session < 20; session += 1) {
    life = train({ ...life, resources: { ...life.resources, energy: 100 } }, 'heavyBag');
  }
  const beforeBlocked = {
    energy: 100,
    strength: life.stats.strength,
  };
  const blocked = train({ ...life, resources: { ...life.resources, energy: beforeBlocked.energy } }, 'heavyBag');

  assert.equal(life.trainingSessionsUsed, 20);
  assert.equal(blocked.trainingSessionsUsed, 20);
  assert.equal(blocked.stats.strength, beforeBlocked.strength);
  assert.equal(blocked.resources.energy, beforeBlocked.energy);
  assert.ok(blocked.log[0].text.includes('Age Up'));
});

test('Hunter Vitality adds one normal training session allowance per point', () => {
  const base = createNewLife({ gender: 'Female', seed: 1111 });
  let life = {
    ...base,
    hunterWorld: {
      ...base.hunterWorld,
      unlocked: true,
      playerAwakened: true,
      stats: { ...base.hunterWorld.stats, vitality: 5 },
    },
  };

  assert.equal(getTrainingAllowance(life).limit, 25);

  for (let session = 0; session < 25; session += 1) {
    life = train({ ...life, resources: { ...life.resources, energy: 1000 } }, 'ironBody');
  }
  const beforeBlocked = {
    energy: 1000,
    durability: life.stats.durability,
  };
  const blocked = train({ ...life, resources: { ...life.resources, energy: beforeBlocked.energy } }, 'ironBody');

  assert.equal(life.trainingSessionsUsed, 25);
  assert.equal(blocked.trainingSessionsUsed, 25);
  assert.equal(blocked.stats.durability, beforeBlocked.durability);
  assert.equal(blocked.resources.energy, beforeBlocked.energy);
});

test('manual and automatic training share one twenty-session allowance', () => {
  const base = createNewLife({ gender: 'Male', seed: 3061 });
  let life = {
    ...base,
    trainingSessionsUsed: 19,
    resources: { ...base.resources, energy: 100 },
    mentor: MENTORS.find((mentor) => mentor.id === 'tiredCoach'),
  };
  life = train(life, 'heavyBag');
  const beforeAuto = { strength: life.stats.strength, energy: life.resources.energy };
  const next = toggleAutoTraining(life, 'heavyBag');

  assert.equal(next.trainingSessionsUsed, 20);
  assert.equal(next.stats.strength, beforeAuto.strength);
  assert.equal(next.resources.energy, beforeAuto.energy);
  assert.ok(next.log.some((item) => item.text.includes('Age Up')));
});

test('turning auto training on immediately runs that training when energy is available', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 306 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 306 }).resources, energy: 100 },
    mentor: MENTORS.find((mentor) => mentor.id === 'tiredCoach'),
  };
  const beforeStrength = life.stats.strength;

  const next = toggleAutoTraining(life, 'heavyBag');

  assert.equal(next.autoTraining.heavyBag, true);
  assert.ok(next.stats.strength > beforeStrength);
  assert.ok(next.resources.energy < 100);
  assert.equal(next.trainingPopup, null);
  assert.ok(next.log.some((item) => item.text.includes('ran immediately')));
});

test('auto training runs enabled training during age up without popup events', () => {
  let life = createNewLife({ gender: 'Male', seed: 304 });
  life = {
    ...life,
    resources: { ...life.resources, energy: 100 },
    mentor: MENTORS.find((mentor) => mentor.id === 'apexConditioner'),
    autoTraining: { heavyBag: true, sparTrainingPartner: true },
  };
  const beforeStrength = life.stats.strength;

  const next = ageUp(life);

  assert.ok(next.stats.strength > beforeStrength);
  assert.ok(next.resources.energy < 100);
  assert.equal(next.trainingPopup, null);
  assert.ok(!next.pendingEvent || next.pendingEvent.id !== 'training-injury');
  assert.ok(next.log.some((item) => item.text.includes('Auto training')));
});

test('age up resets training allowance before enabled auto training consumes the new interval', () => {
  const base = createNewLife({ gender: 'Male', seed: 3041 });
  const life = {
    ...base,
    trainingSessionsUsed: 20,
    resources: { ...base.resources, energy: 100 },
    mentor: MENTORS.find((mentor) => mentor.id === 'tiredCoach'),
    autoTraining: { heavyBag: true },
  };

  const next = ageUp(life);

  assert.equal(next.trainingSessionsUsed, 1);
});

test('auto routine quietly runs enabled training outside manual clicks', () => {
  let life = createNewLife({ gender: 'Male', seed: 307 });
  life = {
    ...life,
    resources: { ...life.resources, energy: 100 },
    mentor: MENTORS.find((mentor) => mentor.id === 'dockVeteran'),
    autoTraining: { roadwork: true },
  };
  const beforeSpeed = life.stats.speed;

  const next = runAutoRoutine(life);

  assert.ok(next.stats.speed > beforeSpeed);
  assert.ok(next.resources.energy < 100);
  assert.equal(next.trainingPopup, null);
  assert.ok(next.log.some((item) => item.text.includes('Auto training')));
});

test('auto training is locked without a mentor or when the mentor lacks that method', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 309 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 309 }).resources, energy: 100 },
    mentor: null,
  };
  const noMentor = toggleAutoTraining(life, 'heavyBag');
  const analyst = toggleAutoTraining({ ...life, mentor: MENTORS.find((mentor) => mentor.id === 'mirrorAnalyst') }, 'heavyBag');

  assert.equal(getAutoTrainingStatus(life, 'heavyBag').locked, true);
  assert.equal(noMentor.autoTraining?.heavyBag, undefined);
  assert.equal(analyst.autoTraining?.heavyBag, undefined);
  assert.ok(analyst.log[0].text.includes('does not supervise'));
});

test('auto routine can keep training across repeated quiet passes until energy runs low', () => {
  let life = createNewLife({ gender: 'Male', seed: 308 });
  life = {
    ...life,
    resources: { ...life.resources, energy: 45 },
    mentor: MENTORS.find((mentor) => mentor.id === 'tiredCoach'),
    autoTraining: { heavyBag: true },
  };
  const beforeStrength = life.stats.strength;

  life = runAutoRoutine(life);
  life = runAutoRoutine(life);
  life = runAutoRoutine(life);
  const stopped = runAutoRoutine(life);

  assert.ok(life.stats.strength > beforeStrength);
  assert.equal(life.resources.energy, 0);
  assert.equal(stopped, life);
  assert.equal(life.trainingPopup, null);
});

test('auto routine still trains while a fight is open', () => {
  let life = createNewLife({ gender: 'Male', seed: 310 });
  life = {
    ...life,
    resources: { ...life.resources, energy: 100 },
    mentor: MENTORS.find((mentor) => mentor.id === 'tiredCoach'),
    autoTraining: { heavyBag: true },
  };
  life = startFight(life, 'localBrawler');
  const beforeStrength = life.stats.strength;

  const next = runAutoRoutine(life);

  assert.ok(next.activeFight);
  assert.ok(next.stats.strength > beforeStrength);
  assert.ok(next.resources.energy < 100);
});

test('auto recovery runs enabled recovery when resources are low without popup events', () => {
  let life = createNewLife({ gender: 'Female', seed: 305 });
  life = {
    ...life,
    resources: { ...life.resources, money: 1000, health: 35, energy: 20 },
    mentor: MENTORS.find((mentor) => mentor.id === 'dockVeteran'),
    autoRecovery: { restDay: true },
  };
  const beforeHealth = life.resources.health;
  const beforeEnergy = life.resources.energy;

  const next = ageUp(life);

  assert.ok(next.resources.health > beforeHealth);
  assert.ok(next.resources.energy > beforeEnergy);
  assert.equal(next.trainingPopup, null);
  assert.ok(!next.pendingEvent);
  assert.ok(next.log.some((item) => item.text.includes('Auto recovery')));
});

test('auto recovery remains paused throughout every live fight source', () => {
  const initial = createNewLife({ gender: 'Female', seed: 3051 });
  const configured = {
    ...initial,
    resources: { ...initial.resources, money: 1000, health: 35, energy: 20 },
    mentor: MENTORS.find((mentor) => mentor.id === 'dockVeteran'),
    autoRecovery: { restDay: true },
  };
  const normalFight = startFight(configured, 'alleyScrapper');
  const questFight = {
    ...normalFight,
    activeFight: { ...normalFight.activeFight, source: 'hunterQuest', questId: 'test-quest' },
  };
  const dungeonFight = {
    ...normalFight,
    activeFight: { ...normalFight.activeFight, source: 'hunterDungeon', dungeonId: 'test-dungeon' },
  };

  for (const life of [normalFight, questFight, dungeonFight]) {
    const next = runAutoRoutine(life);
    assert.equal(next.resources.health, life.resources.health);
    assert.equal(next.resources.energy, life.resources.energy);
    assert.equal(next.resources.money, life.resources.money);
  }
});

test('enabling auto recovery during a live fight queues it without immediately healing', () => {
  const initial = createNewLife({ gender: 'Female', seed: 3052 });
  const life = startFight({
    ...initial,
    resources: { ...initial.resources, money: 1000, health: 35, energy: 20 },
    mentor: MENTORS.find((mentor) => mentor.id === 'dockVeteran'),
  }, 'alleyScrapper');

  const next = toggleAutoRecovery(life, 'restDay');

  assert.equal(next.autoRecovery.restDay, true);
  assert.equal(next.resources.health, life.resources.health);
  assert.equal(next.resources.money, life.resources.money);
  assert.ok(next.log[0].text.includes('paused while a fight is live'));
});

test('spar training partner is first and trains every stat with a popup', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 186 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 186 }).resources, energy: 100 },
  };
  const firstTrainingId = Object.keys(TRAINING_ACTIONS)[0];
  const next = train(life, 'sparTrainingPartner');

  assert.equal(firstTrainingId, 'sparTrainingPartner');
  for (const stat of Object.keys(life.stats)) {
    assert.ok(next.stats[stat] > life.stats[stat], `${stat} should increase`);
  }
  assert.ok(next.trainingPopup);
  assert.equal(next.trainingPopup.actionId, 'sparTrainingPartner');
  assert.ok(next.trainingPopup.effects.some((effect) => effect.includes('all stats')));
});

test('repeated spar training partner sessions rotate popup flavor', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 187 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 187 }).resources, energy: 100 },
  };

  life = train(life, 'sparTrainingPartner');
  const firstBody = life.trainingPopup.body;
  life = {
    ...life,
    trainingPopup: null,
    resources: { ...life.resources, energy: 100 },
  };
  life = train(life, 'sparTrainingPartner');

  assert.notEqual(life.trainingPopup.body, firstBody);
  assert.equal(life.trainingSessionCount, 2);
});

test('every core stat has at least one direct training action', () => {
  const trainedStats = new Set(Object.values(TRAINING_ACTIONS).flatMap((action) => Object.keys(action.gains)));
  const coreStats = ['strength', 'speed', 'durability', 'technique', 'fightIq', 'willpower', 'reflexes', 'flexibility', 'aggression', 'control'];

  for (const stat of coreStats) {
    assert.ok(trainedStats.has(stat), `${stat} should have direct training`);
  }
});

test('neglected stats can be trained directly', () => {
  const life = createNewLife({ gender: 'Male', seed: 12 });

  const mobility = train(life, 'mobilityFlow');
  const aggression = train(life, 'killerInstinct');
  const control = train(life, 'breathAndGuard');

  assert.ok(mobility.stats.flexibility > life.stats.flexibility);
  assert.ok(aggression.stats.aggression > life.stats.aggression);
  assert.ok(control.stats.control > life.stats.control);
});

test('stats can grow beyond the old 150 cap up to the expanded stat cap', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 81 }),
    stats: {
      ...createNewLife({ gender: 'Male', seed: 81 }).stats,
      strength: STAT_CAP - 1,
    },
  };

  const next = train(life, 'heavyBag');

  assert.equal(STAT_CAP, 500);
  assert.ok(next.stats.strength > 150);
  assert.ok(next.stats.strength <= STAT_CAP);
});

test('stat caps scale strongly with age and clan strength', () => {
  const young = createNewLife({ gender: 'Male', seed: 113 });
  const adult = {
    ...young,
    identity: { ...young.identity, age: 20, month: 0 },
  };
  const mythicClan = CLANS.find((clan) => clan.name === 'Hanmo');
  const mythicAdult = {
    ...adult,
    clan: mythicClan,
  };

  assert.equal(STAT_CAP, 500);
  assert.ok(getStatCap(young, 'strength') < 250);
  assert.ok(getStatCap(adult, 'strength') >= 500);
  assert.ok(getStatCap(mythicAdult, 'strength') >= 1400);
  assert.ok(getStatCap(mythicAdult, 'strength') > getStatCap(mythicAdult, 'fightIq'));
});

test('experience boost raises stat caps from fight mileage with wins worth more', () => {
  const base = {
    ...createNewLife({ gender: 'Male', seed: 115 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 115 }).identity, age: 22, month: 0 },
    record: { wins: 0, losses: 0, kos: 0 },
  };
  const batteredVeteran = {
    ...base,
    record: { wins: 0, losses: 40, kos: 0 },
  };
  const winningVeteran = {
    ...base,
    record: { wins: 40, losses: 0, kos: 18 },
  };
  const maxedVeteran = {
    ...base,
    record: { wins: 160, losses: 30, kos: 70 },
  };

  assert.equal(getExperienceBoost(base), 0);
  assert.ok(getExperienceBoost(batteredVeteran) > 0);
  assert.ok(getExperienceBoost(winningVeteran) > getExperienceBoost(batteredVeteran));
  assert.equal(getExperienceBoost(maxedVeteran), 400);
  assert.equal(getStatCap(winningVeteran, 'strength') - getStatCap(base, 'strength'), getExperienceBoost(winningVeteran));
});

test('training cannot push a young fighter past their current age cap', () => {
  const life = createNewLife({ gender: 'Female', seed: 114 });
  const cap = getStatCap(life, 'strength');
  const capped = {
    ...life,
    resources: { ...life.resources, energy: 100 },
    stats: { ...life.stats, strength: cap - 1 },
  };

  const next = train(capped, 'heavyBag');

  assert.equal(next.stats.strength, cap);
});

test('special trainings unlock through milestones and raise stat caps without raising stats', () => {
  const base = createNewLife({ gender: 'Male', seed: 247 });
  const locked = getSpecialTrainingStatus(base, 'undergroundLimitDrills');
  assert.ok(locked.lockReason);

  const fighter = {
    ...base,
    identity: { ...base.identity, age: 21, month: 2 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 10, losses: 0, kos: 4 },
    resources: { ...base.resources, energy: 100, money: 4000 },
  };
  const beforeCap = getStatCap(fighter, 'strength');
  const beforeStrength = fighter.stats.strength;
  const next = specialTrain(fighter, 'undergroundLimitDrills');

  assert.ok(next.specialTrainingCaps.strength > 0);
  assert.ok(getStatCap(next, 'strength') > beforeCap);
  assert.equal(next.stats.strength, beforeStrength);
  assert.equal(next.trainingSessionsUsed, fighter.trainingSessionsUsed);
  assert.equal(next.resources.energy, fighter.resources.energy - SPECIAL_TRAINING_ACTIONS.undergroundLimitDrills.cost.energy);
  assert.ok(next.log[0].text.includes('cap increased'));
});

test('special trainings can only be completed once per month', () => {
  const base = createNewLife({ gender: 'Female', seed: 248 });
  let life = {
    ...base,
    identity: { ...base.identity, age: 23, month: 5 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 12, losses: 1, kos: 5 },
    resources: { ...base.resources, energy: 100, money: 5000 },
  };

  life = specialTrain(life, 'undergroundLimitDrills');
  const blocked = specialTrain({ ...life, resources: { ...life.resources, energy: 100, money: 5000 } }, 'undergroundLimitDrills');

  assert.deepEqual(blocked.specialTrainingCaps, life.specialTrainingCaps);
  assert.ok(blocked.log[0].text.includes('once per month'));
});

test('defeating special fighters unlocks special cap training and makes rematches stronger', () => {
  const base = createNewLife({ gender: 'Male', seed: 249 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 24, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 10, losses: 0, kos: 5 },
    resources: { ...base.resources, energy: 100, health: 100, reputation: 999, money: 10000 },
    stats: Object.fromEntries(Object.keys(base.stats).map((stat) => [stat, 1800])),
  };
  const first = simulateFight(fighter, 'ohmoTokitoo', 'pressure');

  assert.ok(first.specialFightAdaptations.ohmoTokitoo > 0);
  assert.ok(getSpecialTrainingStatus(first, 'monsterFilmStudy').unlocked);

  const rematch = startFight({
    ...first,
    activeFight: null,
    fightCooldowns: { ...first.fightCooldowns, ohmoTokitoo: 0 },
    resources: { ...first.resources, energy: 100, health: 100 },
  }, 'ohmoTokitoo');
  const fresh = startFight({
    ...fighter,
    fightCooldowns: { ohmoTokitoo: 0 },
  }, 'ohmoTokitoo');

  assert.ok(rematch.activeFight.meters.maxOpponentHealth > fresh.activeFight.meters.maxOpponentHealth);
  assert.ok(rematch.activeFight.breakdown.some((line) => line.includes('Adaptation')));
});

test('special fighter rematches scale faster and earn growth titles', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 625 }),
    specialFightAdaptations: { yujiriHanmae: 4 },
  };
  const adapted = getAdaptedOpponent(life, 'yujiriHanmae');
  const base = OPPONENTS.yujiriHanmae;

  assert.ok(adapted.power >= base.power * 1.6);
  assert.ok(adapted.growthTitle);
  assert.ok(adapted.threat.includes(adapted.growthTitle));

  const fight = startFight({
    ...life,
    identity: { ...life.identity, age: 25 },
    world: { ...life.world, hiddenWorld: true },
    record: { wins: 20, losses: 0, kos: 12 },
    resources: { ...life.resources, reputation: 999, energy: 100, health: 100 },
  }, 'yujiriHanmae');

  assert.ok(fight.activeFight.breakdown.some((line) => line.includes(adapted.growthTitle)));
});

test('finding a mentor can succeed and stores mentor details', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 82 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 82 }).resources, reputation: 80, money: 40000 },
    record: { wins: 4, losses: 0, kos: 2 },
  };

  const next = findMentor(life);

  assert.ok(next.mentor);
  assert.ok(next.mentor.name);
  assert.ok(next.mentor.rarity);
  assert.ok(next.mentor.autoTrainingIds);
  assert.ok(next.mentor.focus.length > 0);
  assert.ok(next.resources.money <= life.resources.money - 10000);
  assert.ok(next.log[0].text.includes('Mentor found'));
});

test('finding a mentor can fail and clearly logs the failure', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 83 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 83 }).resources, reputation: 0, money: 0, mood: 20 },
    record: { wins: 0, losses: 3, kos: 0 },
    mentor: null,
  };

  const next = findMentor(life);

  assert.equal(next.mentor, null);
  assert.ok(next.log[0].text.includes('Mentor search failed'));
});

test('recovery restores resources and can reduce injuries', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 41 }),
    resources: {
      ...createNewLife({ gender: 'Female', seed: 41 }).resources,
      health: 42,
      energy: 18,
      mood: 40,
      money: 500,
    },
    injuries: ['fight damage'],
    eventFlags: { injuryCrossroads: true },
  };

  const next = recover(life, 'clinic');

  assert.ok(next.resources.health > life.resources.health);
  assert.ok(next.resources.energy >= life.resources.energy);
  assert.ok(next.resources.money < life.resources.money);
  assert.ok(next.injuries.length < life.injuries.length);
  assert.ok(next.log[0].text.includes('clinic'));
});

test('recovery blocks actions the player cannot afford', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 43 }),
    resources: {
      ...createNewLife({ gender: 'Male', seed: 43 }).resources,
      money: 5,
      health: 20,
    },
  };

  const next = recover(life, 'clinic');

  assert.equal(next.resources.health, life.resources.health);
  assert.ok(next.log[0].text.includes('cannot afford'));
});

test('new lives start with money save fields', () => {
  const life = createNewLife({ gender: 'Female', seed: 104 });

  assert.deepEqual(life.ownedAssets, []);
  assert.deepEqual(life.nextFightPrep, {});
});

test('new lives start with social media progression fields', () => {
  const life = createNewLife({ gender: 'Female', seed: 180 });

  assert.equal(life.social.followers, 0);
  assert.equal(life.social.platform, 'Underground Feed');
  assert.equal(life.social.calledOutTarget, null);
  assert.ok(SOCIAL_ACTIONS.trainingClip);
  assert.ok(SOCIAL_TRASH_TALK_STYLES.respectful);
});

test('social posts grow followers and tie into reputation, money, heat, and sponsors', () => {
  const base = createNewLife({ gender: 'Male', seed: 181 });
  const life = {
    ...base,
    resources: { ...base.resources, reputation: 40, mood: 60 },
    stats: { ...base.stats, strength: 200, speed: 180, technique: 160 },
  };

  const afterClip = useSocialAction(life, 'trainingClip');
  assert.ok(afterClip.social.followers > life.social.followers);
  assert.ok(afterClip.resources.reputation > life.resources.reputation);
  assert.equal(afterClip.social.lastPost.actionId, 'trainingClip');
  assert.equal(afterClip.social.lastPost.title, 'Training Clip Posted');
  assert.ok(afterClip.social.lastPost.effects.some((effect) => effect.includes('followers')));

  const sponsor = useSocialAction({
    ...afterClip,
    relationships: { ...afterClip.relationships, sponsor: 20 },
    social: { ...afterClip.social, followers: 15000 },
  }, 'sponsorPost');
  assert.ok(sponsor.resources.money > afterClip.resources.money);
  assert.ok(sponsor.relationships.sponsor > afterClip.relationships.sponsor);
});

test('followers pay one money each on age up', () => {
  const base = createNewLife({ gender: 'Female', seed: 183 });
  const life = {
    ...base,
    identity: { ...base.identity, age: 12, month: 0 },
    social: { ...base.social, followers: 1234 },
  };

  const next = ageUp(life);

  assert.equal(next.resources.money, life.resources.money + 20 + 1234);
  assert.ok(next.log.some((entry) => entry.text.includes('Social income')));
});

test('each social media post action has twelve popup flavor variations', () => {
  const base = {
    ...createNewLife({ gender: 'Male', seed: 184 }),
    injuries: ['sprained wrist'],
    record: { wins: 2, losses: 0, kos: 1 },
    resources: { ...createNewLife({ gender: 'Male', seed: 184 }).resources, reputation: 40 },
    social: { ...createNewLife({ gender: 'Male', seed: 184 }).social, followers: 10000 },
  };

  for (const actionId of Object.keys(SOCIAL_ACTIONS)) {
    const bodies = new Set();
    for (let seed = 1; seed <= 80; seed += 1) {
      const next = useSocialAction({ ...base, rngSeed: seed }, actionId);
      bodies.add(next.social.lastPost?.body);
    }
    assert.equal(bodies.size, 12, `${actionId} should have 12 popup variations`);
  }
});

test('repeating the same social post advances popup flavor', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 185 }),
    social: { ...createNewLife({ gender: 'Female', seed: 185 }).social, followers: 12000 },
  };

  life = useSocialAction(life, 'trainingClip');
  const firstBody = life.social.lastPost.body;
  life = { ...life, social: { ...life.social, lastPost: null } };
  life = useSocialAction(life, 'trainingClip');

  assert.notEqual(life.social.lastPost.body, firstBody);
  assert.equal(life.social.postCount, 2);
});

test('trash talk can target a specific opponent and primes a boosted grudge fight', () => {
  const base = createNewLife({ gender: 'Male', seed: 182 });
  const life = {
    ...base,
    identity: { ...base.identity, age: 20, month: 0 },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, reputation: 150, mood: 70 },
    social: { ...base.social, followers: 20000 },
    world: { ...base.world, hiddenWorld: true },
  };

  const called = trashTalkOpponent(life, 'yujiriHanmae', 'disrespectful');
  assert.equal(called.social.calledOutTarget.opponentId, 'yujiriHanmae');
  assert.equal(called.social.calledOutTarget.style, 'disrespectful');
  assert.ok(called.social.followers > life.social.followers);
  assert.ok(called.world.heat > life.world.heat);

  const fight = startFight(called, 'yujiriHanmae');
  assert.equal(fight.activeFight.callout.opponentId, 'yujiriHanmae');
  assert.ok(fight.activeFight.callout.rewardMultiplier > 1);
  assert.ok(fight.activeFight.meters.momentum < 0);
});

test('called out fights pay followers on win and punish failed trash talk on loss', () => {
  const baseLife = createNewLife({ gender: 'Male', seed: 183 });
  const base = {
    ...baseLife,
    resources: { ...baseLife.resources, reputation: 200, energy: 100, health: 100 },
    social: { ...baseLife.social, followers: 30000 },
    stats: {
      ...baseLife.stats,
      strength: 600,
      speed: 500,
      durability: 500,
      technique: 500,
      fightIq: 500,
      aggression: 500,
    },
  };
  const called = trashTalkOpponent(base, 'localBrawler', 'respectful');
  const won = simulateFight(called, 'localBrawler', 'pressure');
  assert.equal(won.social.calledOutTarget, null);
  assert.ok(won.social.followers > called.social.followers);
  assert.ok(won.activeFight.result.rewards.some((reward) => reward.includes('Callout payoff')));

  const weak = {
    ...called,
    resources: { ...called.resources, energy: 100, health: 20 },
    stats: {
      ...called.stats,
      strength: 1,
      speed: 1,
      durability: 1,
      technique: 1,
      fightIq: 1,
      willpower: 1,
      reflexes: 1,
      control: 1,
    },
  };
  const lost = simulateFight(weak, 'localBrawler', 'conserve');
  assert.equal(lost.social.calledOutTarget, null);
  assert.ok(lost.social.followers < called.social.followers);
  assert.ok(lost.resources.mood < weak.resources.mood);
});

test('money action catalog covers fight prep, lifestyle, and black market lanes', () => {
  const groups = new Set(Object.values(MONEY_ACTIONS).map((action) => action.group));

  assert.ok(groups.has('Fight Prep'));
  assert.ok(groups.has('Lifestyle'));
  assert.ok(groups.has('Black Market'));
  assert.ok(Object.keys(MONEY_ACTIONS).length >= 12);
});

test('money actions reduce money and apply lifestyle effects', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 105 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 105 }).resources, money: 1000, health: 60, energy: 30, mood: 40 },
  };

  const next = spendMoneyAction(life, 'cleanMealPlan');

  assert.equal(next.resources.money, 400);
  assert.ok(next.resources.health > life.resources.health);
  assert.ok(next.resources.energy > life.resources.energy);
  assert.ok(next.resources.mood > life.resources.mood);
  assert.ok(next.log[0].text.includes('Clean Meal Plan'));
});

test('money actions block unaffordable, locked, duplicate, and repeated prep purchases clearly', () => {
  const broke = {
    ...createNewLife({ gender: 'Female', seed: 106 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 106 }).resources, money: 10 },
  };
  const lowRep = {
    ...createNewLife({ gender: 'Female', seed: 107 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 107 }).resources, money: 2000, reputation: 0 },
  };
  const withHomeGym = {
    ...createNewLife({ gender: 'Female', seed: 108 }),
    ownedAssets: ['homeGym'],
    resources: { ...createNewLife({ gender: 'Female', seed: 108 }).resources, money: 4000 },
  };
  const prepared = {
    ...createNewLife({ gender: 'Female', seed: 109 }),
    nextFightPrep: { trainingCamp: true },
    resources: { ...createNewLife({ gender: 'Female', seed: 109 }).resources, money: 4000 },
  };

  assert.ok(spendMoneyAction(broke, 'trainingCamp').log[0].text.includes('cannot afford'));
  assert.ok(spendMoneyAction(lowRep, 'scoutTape').log[0].text.includes('locked'));
  assert.ok(spendMoneyAction(withHomeGym, 'homeGym').log[0].text.includes('already own'));
  assert.ok(spendMoneyAction(prepared, 'trainingCamp').log[0].text.includes('already prepared'));
});

test('home gym is a one-time asset that improves future training', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 110 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 110 }).resources, money: 4000, energy: 100 },
  };

  const withGym = spendMoneyAction(life, 'homeGym');
  const trainedWithGym = train(withGym, 'heavyBag');
  const trainedPlain = train(life, 'heavyBag');

  assert.ok(withGym.ownedAssets.includes('homeGym'));
  assert.ok(trainedWithGym.stats.strength > trainedPlain.stats.strength);
  assert.equal(spendMoneyAction(withGym, 'homeGym').resources.money, withGym.resources.money);
});

test('fight prep applies on the next fight and is consumed', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 111 }),
    resources: { ...createNewLife({ gender: 'Female', seed: 111 }).resources, money: 5000, reputation: 20, energy: 50 },
  };
  const prepped = spendMoneyAction(spendMoneyAction(life, 'trainingCamp'), 'scoutTape');

  const next = startFight(prepped, 'localBrawler');

  assert.equal(next.nextFightPrep.trainingCamp, undefined);
  assert.equal(next.nextFightPrep.scoutTape, undefined);
  assert.ok(next.activeFight.meters.playerStamina > 50);
  assert.ok(next.activeFight.meters.momentum >= 13);
  assert.ok(next.activeFight.meters.injuryRisk < 5);
  assert.ok(next.activeFight.breakdown.some((line) => line.includes('Scout tape')));
});

test('black market money actions raise heat and can queue money events', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 112 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 112 }).resources, money: 5000, reputation: 30 },
    world: { ...createNewLife({ gender: 'Male', seed: 112 }).world, hiddenWorld: true, heat: 5 },
    eventFlags: { debtCollectorNotice: true },
  };

  const next = spendMoneyAction(life, 'illegalBoutTip');

  assert.ok(next.world.hiddenWorld);
  assert.ok(next.world.heat > life.world.heat);
  assert.ok(next.resources.reputation > life.resources.reputation);
  assert.ok(next.pendingEvent);
  assert.equal(next.pendingEvent.id, 'sponsor-suspicion');
});

test('fight victory grants money, reputation, and fight record win', () => {
  const life = createNewLife({ gender: 'Male', seed: 21 });
  const tuned = {
    ...life,
    stats: {
      ...life.stats,
      strength: 180,
      speed: 180,
      durability: 180,
      technique: 180,
      fightIq: 180,
      willpower: 180,
      reflexes: 180,
      flexibility: 160,
      aggression: 190,
      control: 160,
    },
  };

  const next = simulateFight(tuned, 'localBrawler', 'pressure');

  assert.equal(next.record.wins, 1);
  assert.ok(next.resources.money > life.resources.money);
  assert.ok(next.resources.reputation > life.resources.reputation);
});

test('completed fights train stats tied to the most used fight options', () => {
  const base = createNewLife({ gender: 'Male', seed: 240 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100, reputation: 20 },
    stats: {
      ...base.stats,
      strength: 120,
      aggression: 120,
      speed: 120,
      technique: 80,
      fightIq: 80,
      reflexes: 80,
      durability: 80,
      control: 80,
    },
  };

  const next = simulateFight(fighter, 'localBrawler', 'pressure');

  assert.ok(next.stats.strength > fighter.stats.strength);
  assert.ok(next.stats.aggression > fighter.stats.aggression);
  assert.ok(next.stats.speed > fighter.stats.speed);
});

test('new lives start with technique tracks and an unformed archetype', () => {
  const life = createNewLife({ gender: 'Male', seed: 243 });

  assert.deepEqual(life.techniques, { striking: 0, grappling: 0, defense: 0 });
  assert.equal(getPlayerArchetype(life), 'Unformed');
});

test('pressure and counter exchanges build striking technique and striker archetype', () => {
  const base = createNewLife({ gender: 'Male', seed: 244 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    techniques: { striking: 0, grappling: 0, defense: 0 },
    resources: { ...base.resources, energy: 100, reputation: 20 },
    stats: {
      ...base.stats,
      strength: 150,
      aggression: 150,
      speed: 130,
      durability: 110,
      technique: 120,
      fightIq: 120,
      reflexes: 120,
      control: 90,
    },
  };

  const next = simulateFight(fighter, 'localBrawler', 'pressure');

  assert.ok(next.techniques.striking > fighter.techniques.striking);
  assert.equal(getPlayerArchetype(next), 'Striker');
});

test('grapple exchanges build grappling technique and grappler archetype', () => {
  const base = createNewLife({ gender: 'Female', seed: 245 });
  const fighter = {
    ...base,
    techniques: { striking: 0, grappling: 0, defense: 0 },
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 130,
      aggression: 80,
      speed: 100,
      durability: 180,
      technique: 170,
      fightIq: 120,
      reflexes: 100,
      flexibility: 160,
      control: 150,
    },
  };

  const next = simulateFight(fighter, 'backyardGrappler', 'grapple');

  assert.ok(next.techniques.grappling > fighter.techniques.grappling);
  assert.equal(getPlayerArchetype(next), 'Grappler');
});

test('defend exchanges build defense technique and defensive archetype', () => {
  const base = createNewLife({ gender: 'Male', seed: 246 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    techniques: { striking: 0, grappling: 0, defense: 0 },
    resources: { ...base.resources, energy: 100, reputation: 20 },
    stats: {
      ...base.stats,
      strength: 110,
      aggression: 70,
      speed: 110,
      durability: 170,
      technique: 120,
      fightIq: 160,
      reflexes: 130,
      flexibility: 130,
      control: 190,
      willpower: 180,
    },
  };

  const next = simulateFight(fighter, 'warehouseChamp', 'defend');

  assert.ok(next.techniques.defense > fighter.techniques.defense);
  assert.equal(getPlayerArchetype(next), 'Defensive Specialist');
});

test('opponents expose combat archetypes from their style and stat profile', () => {
  assert.equal(getOpponentArchetype(OPPONENTS.juniorKarateka), 'Striker');
  assert.equal(getOpponentArchetype(OPPONENTS.schoolWrestler), 'Grappler');
  assert.equal(getOpponentArchetype(OPPONENTS.gokiShibukawae), 'Defensive Specialist');
});

test('longer fights grant larger fight-option stat growth', () => {
  const base = createNewLife({ gender: 'Female', seed: 241 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 150,
      aggression: 150,
      speed: 120,
      durability: 120,
      technique: 120,
      fightIq: 120,
      reflexes: 120,
      control: 120,
    },
  };
  const shortFight = startFight(fighter, 'localBrawler');
  shortFight.activeFight.round = shortFight.activeFight.maxRounds;
  shortFight.activeFight.meters.opponentHealth = 8;

  const longFight = startFight(fighter, 'localBrawler');
  longFight.activeFight.round = longFight.activeFight.maxRounds;
  longFight.activeFight.meters.opponentHealth = 500;
  longFight.activeFight.exchanges = Array.from({ length: 14 }, () => ({ tactic: 'pressure' }));

  const shortResult = takeFightTurn(shortFight, 'pressure');
  const longResult = takeFightTurn(longFight, 'pressure');

  assert.ok(longResult.stats.strength - fighter.stats.strength > shortResult.stats.strength - fighter.stats.strength);
});

test('winning local fights grants clan rerolls', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 101 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 101 }).resources, clanRerolls: 0 },
    stats: {
      ...createNewLife({ gender: 'Male', seed: 101 }).stats,
      strength: 180,
      speed: 180,
      durability: 180,
      technique: 180,
      fightIq: 180,
      willpower: 180,
    },
  };

  const next = simulateFight(life, 'alleyScrapper', 'pressure');

  assert.equal(next.record.wins, 1);
  assert.ok(next.resources.clanRerolls >= 1);
  assert.ok(next.activeFight.result.rewards.some((reward) => reward.includes('Clan Reroll')));
});

test('winning association tournament fights grants many clan rerolls', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 102 }),
    identity: { ...createNewLife({ gender: 'Female', seed: 102 }).identity, age: 22, month: 0 },
    association: 'Obsidian Ring Association',
    world: { ...createNewLife({ gender: 'Female', seed: 102 }).world, hiddenWorld: true, league: 'Obsidian Ring Association' },
    resources: { ...createNewLife({ gender: 'Female', seed: 102 }).resources, reputation: 300, clanRerolls: 0 },
    record: { wins: 20, losses: 0, kos: 10 },
    stats: {
      ...createNewLife({ gender: 'Female', seed: 102 }).stats,
      strength: 1000,
      speed: 1000,
      durability: 1000,
      technique: 1000,
      fightIq: 1000,
      willpower: 1000,
      reflexes: 1000,
      flexibility: 1000,
      aggression: 1000,
      control: 1000,
    },
  };

  const next = simulateFight(life, 'fangOfObsidian', 'special');

  assert.equal(next.record.wins, 21);
  assert.ok(next.resources.clanRerolls >= 8);
});

test('ending a life creates a legacy summary and marks life ended', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 103 }),
    record: { wins: 7, losses: 2, kos: 3 },
    resources: { ...createNewLife({ gender: 'Male', seed: 103 }).resources, reputation: 120, money: 9000 },
  };

  const next = endLife(life);

  assert.equal(next.ended, true);
  assert.ok(next.legacySummary.title);
  assert.ok(next.legacySummary.lines.some((line) => line.includes('7-2')));
});

test('every clan has visible benefits for the clan reference', () => {
  assert.ok(CLANS.length >= 10);
  assert.ok(CLANS.every((clan) => Object.keys(clan.bonuses).length > 0));
  assert.ok(CLANS.every((clan) => clan.traits.length > 0 && clan.drawbacks.length > 0 && clan.options.length > 0));
  assert.ok(CLANS.every((clan) => clan.passive?.name && clan.passive?.effect));
  assert.ok(CLANS.every((clan) => clan.special?.name && clan.special?.effect));
});

test('clans use short clan names without generic suffixes', () => {
  const oldNames = [
    'Harbor Worker Blood',
    'Open Road Kin',
    'Iron Vein Clan',
    'Mirror Fist Lineage',
    'First Monster Descendant',
    'Kurebayashi Family',
    'Hanegami Bloodline',
    'Amahisa House',
    'Tokunaga Dynasty',
    'Kuri Clan',
    'Nikoo Style Line',
    'Hanmo Bloodline',
    'Orochiya Bloodline',
    'Mishime Devil Bloodline',
    'THE ASHURA',
  ];
  const closeVariantNames = ['Kuri', 'Nikoo', 'Hanmo', 'Orochiya', 'Ashura', 'Mishime'];
  const names = CLANS.map((clan) => clan.name);

  assert.ok(names.every((name) => !/\b(House|Line|Family|Clan|Bloodline|Dynasty)\b/.test(name)));
  assert.ok(closeVariantNames.every((name) => names.includes(name)));
  assert.ok(oldNames.every((name) => !names.includes(name)));
});

test('clan rarities match counterpart strength and significance', () => {
  const rarityByClan = Object.fromEntries(CLANS.map((clan) => [clan.name, clan.rarity]));

  assert.equal(rarityByClan['Nikoo'], 'Mythic');
  assert.equal(rarityByClan['Hanmo'], 'Mythic');
  assert.equal(rarityByClan['Bakiya'], 'Mythic');
  assert.equal(rarityByClan['Orochiya'], 'Mythic');
  assert.equal(rarityByClan['Ashura'], 'Secret');
  assert.equal(rarityByClan['Mishime'], 'Secret');
  assert.equal(rarityByClan['Kuri'], 'Legendary');
  assert.equal(rarityByClan['Agitoo'], 'Legendary');
  assert.equal(rarityByClan['Shibukawae'], 'Epic');
  assert.equal(rarityByClan['Doppoe'], 'Epic');
  assert.equal(rarityByClan['Reihitoo'], 'Epic');
  assert.equal(rarityByClan['Ryukoo'], 'Rare');
});

test('new lives have several local fights available immediately', () => {
  const life = createNewLife({ gender: 'Male', seed: 71 });
  const fights = getAvailableFights(life);

  assert.ok(fights.length >= 5);
  assert.ok(fights.every((fight) => fight.opponent.tier === 'Local'));
});

test('hidden-world progress unlocks underground and corporate fights', () => {
  const life = {
    ...createNewLife({ gender: 'Female', seed: 72 }),
    identity: { ...createNewLife({ gender: 'Female', seed: 72 }).identity, age: 22 },
    resources: { ...createNewLife({ gender: 'Female', seed: 72 }).resources, reputation: 80 },
    world: { ...createNewLife({ gender: 'Female', seed: 72 }).world, hiddenWorld: true, league: 'Basement Circuit' },
    record: { wins: 5, losses: 1, kos: 2 },
  };
  const tiers = getAvailableFights(life).map((fight) => fight.opponent.tier);

  assert.ok(tiers.includes('Underground'));
  assert.ok(tiers.includes('Corporate'));
});

test('locked fights explain their missing requirements', () => {
  const life = createNewLife({ gender: 'Male', seed: 73 });
  const locked = getLockedFights(life);

  assert.ok(locked.length >= 5);
  assert.ok(locked.some((fight) => fight.reasons.some((reason) => reason.includes('reputation'))));
});

test('finished fights put that opponent on a month-based cooldown', () => {
  const base = createNewLife({ gender: 'Male', seed: 535 });
  const life = {
    ...base,
    identity: { ...base.identity, age: 20, month: 0 },
    resources: { ...base.resources, health: 100, energy: 100 },
    stats: Object.fromEntries(Object.keys(base.stats).map((stat) => [stat, 500])),
  };

  const next = simulateFight(life, 'localBrawler', 'pressure');
  const locked = getLockedFights(next).find((fight) => fight.id === 'localBrawler');

  assert.ok(next.fightCooldowns.localBrawler > 20 * 12);
  assert.ok(!getAvailableFights(next).some((fight) => fight.id === 'localBrawler'));
  assert.ok(locked.reasons.some((reason) => reason.includes('available in')));
});

test('fight cooldowns expire after enough life months pass', () => {
  const base = createNewLife({ gender: 'Female', seed: 536 });
  let life = {
    ...base,
    identity: { ...base.identity, age: 20, month: 0 },
    resources: { ...base.resources, health: 100, energy: 100 },
    stats: Object.fromEntries(Object.keys(base.stats).map((stat) => [stat, 500])),
  };

  life = simulateFight(life, 'localBrawler', 'pressure');
  assert.ok(!getAvailableFights(life).some((fight) => fight.id === 'localBrawler'));

  for (let month = 0; month < 18 && !getAvailableFights(life).some((fight) => fight.id === 'localBrawler'); month += 1) {
    life = ageUp({ ...life, activeFight: null, pendingEvent: null });
  }

  assert.ok(getAvailableFights(life).some((fight) => fight.id === 'localBrawler'));
});

test('stronger enemies take longer before a rematch opens', () => {
  const base = createNewLife({ gender: 'Male', seed: 537 });
  const life = {
    ...base,
    identity: { ...base.identity, age: 22, month: 0 },
    resources: { ...base.resources, health: 100, energy: 100, reputation: 600, money: 5000 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    stats: Object.fromEntries(Object.keys(base.stats).map((stat) => [stat, 1600])),
  };

  const local = simulateFight(life, 'localBrawler', 'pressure');
  const special = simulateFight({ ...life, activeFight: null }, 'yujiriHanmae', 'pressure');
  const currentMonth = life.identity.age * 12 + life.identity.month;
  const localCooldown = local.fightCooldowns.localBrawler - currentMonth;
  const specialCooldown = special.fightCooldowns.yujiriHanmae - currentMonth;

  assert.ok(specialCooldown > localCooldown);
  assert.ok(specialCooldown <= 8);
});

test('special fight roster has a larger rotating boss pool', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 548 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 548 }).identity, age: 24, month: 0 },
    resources: { ...createNewLife({ gender: 'Male', seed: 548 }).resources, reputation: 600 },
    record: { wins: 20, losses: 0, kos: 10 },
    world: { ...createNewLife({ gender: 'Male', seed: 548 }).world, hiddenWorld: true },
  };
  const fights = getSpecialFights(life);

  assert.ok(SPECIAL_FIGHT_IDS.length >= 12);
  assert.ok(fights.length >= 10);
  assert.ok(fights.some((fight) => fight.opponent.name.includes('Kuroki')));
  assert.ok(fights.some((fight) => fight.opponent.name.includes('Jakku')));
  assert.ok(fights.some((fight) => fight.opponent.name.includes('Kazuro')));
  assert.ok(fights.some((fight) => fight.opponent.name.includes('Kingg')));
});

test('tekken-inspired special fighters follow the existing special fight format', () => {
  const ids = ['jinnKazame', 'kazuroMishime', 'heihaMishime', 'kinggJaguar', 'paulPheonixx', 'yoshiMitsuo'];

  for (const id of ids) {
    const opponent = OPPONENTS[id];
    assert.ok(SPECIAL_FIGHT_IDS.includes(id));
    assert.ok(opponent);
    assert.equal(opponent.tier, 'Special Fight');
    assert.ok(opponent.power >= 900);
    assert.ok(opponent.skillReward);
    assert.ok(opponent.requirements.hiddenWorld);
    assert.ok(opponent.strengths.length >= 3);
    assert.ok(opponent.weakness);
  }
});

test('startFight refuses opponents who are still recovering for a rematch', () => {
  const base = createNewLife({ gender: 'Male', seed: 538 });
  const life = {
    ...base,
    fightCooldowns: { localBrawler: base.identity.age * 12 + base.identity.month + 4 },
  };

  const next = startFight(life, 'localBrawler');

  assert.equal(next.activeFight, null);
  assert.ok(next.log[0].text.includes('available in 4 months'));
});

test('opponents derive full stat profiles from tier, style, and temperament', () => {
  const local = getOpponentStats(OPPONENTS.localBrawler);
  const boss = getOpponentStats(OPPONENTS.yujiriHanmae);
  const redirection = getOpponentStats(OPPONENTS.ohmoTokitoo);

  assert.ok(local.strength >= 80);
  assert.ok(local.aggression > local.control);
  assert.ok(boss.strength >= 1500);
  assert.ok(boss.durability >= 1300);
  assert.ok(boss.aggression > boss.fightIq);
  assert.ok(redirection.technique > redirection.strength);
  assert.ok(redirection.fightIq > redirection.aggression);
});

test('starting a fight creates a pre-fight breakdown and combat meters', () => {
  const life = createNewLife({ gender: 'Male', seed: 51 });

  const next = startFight(life, 'localBrawler');

  assert.equal(next.activeFight.opponentId, 'localBrawler');
  assert.equal(next.activeFight.round, 1);
  assert.equal(next.activeFight.maxRounds, 25);
  assert.equal(next.activeFight.exchangesPerRound, 5);
  assert.ok(next.activeFight.meters.playerHealth > 0);
  assert.ok(next.activeFight.meters.playerStamina > 0);
  assert.ok(next.activeFight.breakdown.length >= 3);
  assert.ok(next.activeFight.breakdown.some((line) => line.includes('Best angle')));
  assert.ok(next.activeFight.breakdown.some((line) => line.includes('Specific weak move: Check Hook')));
});

test('durability increases fight health for both fighters', () => {
  const base = createNewLife({ gender: 'Female', seed: 545 });
  const fragile = startFight({
    ...base,
    stats: { ...base.stats, durability: 10, willpower: 20 },
  }, 'localBrawler');
  const durable = startFight({
    ...base,
    stats: { ...base.stats, durability: 500, willpower: 300 },
    resources: {
      ...base.resources,
      health: maxLifeHealth({ ...base, stats: { ...base.stats, durability: 500, willpower: 300 } }),
      energy: maxLifeEnergy({ ...base, stats: { ...base.stats, durability: 500, willpower: 300 } }),
    },
  }, 'localBrawler');
  const monster = startFight({
    ...base,
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, reputation: 300 },
    identity: { ...base.identity, age: 18, month: 0 },
  }, 'yujiriHanmae');

  assert.ok(durable.activeFight.meters.maxPlayerHealth > fragile.activeFight.meters.maxPlayerHealth);
  assert.equal(durable.activeFight.meters.playerHealth, durable.activeFight.meters.maxPlayerHealth);
  assert.ok(monster.activeFight.meters.maxOpponentHealth > fragile.activeFight.meters.maxOpponentHealth);
  assert.equal(monster.activeFight.meters.opponentHealth, monster.activeFight.meters.maxOpponentHealth);
});

test('using the specific weak move from the matchup read gives a combat bonus', () => {
  const base = createNewLife({ gender: 'Male', seed: 151 });
  const life = startFight({
    ...base,
    unlockedSkills: ['checkHook'],
    stats: {
      ...base.stats,
      speed: 160,
      reflexes: 170,
      technique: 150,
      fightIq: 150,
    },
  }, 'localBrawler');

  const next = takeFightTurn(life, 'checkHook');

  assert.equal(next.activeFight.exchanges[0].moveId, 'checkHook');
  assert.equal(next.activeFight.exchanges[0].weakMoveHit, true);
  assert.ok(next.activeFight.exchanges[0].text.includes('exact weakness'));
});

test('specific weak moves pierce boss defense and deal meaningful damage', () => {
  const base = createNewLife({ gender: 'Male', seed: 152 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 24 },
    world: { ...base.world, hiddenWorld: true },
    resources: { ...base.resources, reputation: 250, energy: 100 },
    record: { wins: 12, losses: 0, kos: 8 },
    unlockedSkills: ['parryFrame', 'jab'],
    stats: {
      ...base.stats,
      strength: 720,
      speed: 760,
      durability: 650,
      technique: 760,
      fightIq: 780,
      willpower: 700,
      reflexes: 760,
      flexibility: 620,
      aggression: 680,
      control: 740,
    },
  };

  const weak = takeFightTurn(startFight(fighter, 'yujiriHanmae'), 'parryFrame').activeFight.exchanges[0];
  const normal = takeFightTurn(startFight(fighter, 'yujiriHanmae'), 'jab').activeFight.exchanges[0];

  assert.equal(weak.weakMoveHit, true);
  assert.equal(normal.weakMoveHit, false);
  assert.ok(weak.playerDamage >= normal.playerDamage + 8);
  assert.ok(weak.playerDamage >= 12);
});

test('higher fight iq improves exchange control and damage', () => {
  const base = createNewLife({ gender: 'Male', seed: 153 });
  const shared = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 130,
      speed: 130,
      durability: 120,
      technique: 140,
      willpower: 110,
      reflexes: 135,
      flexibility: 95,
      aggression: 100,
      control: 100,
    },
  };
  const lowIq = {
    ...shared,
    stats: { ...shared.stats, fightIq: 20 },
  };
  const highIq = {
    ...shared,
    stats: { ...shared.stats, fightIq: 260 },
  };

  const low = takeFightTurn(startFight(lowIq, 'schoolWrestler'), 'counter').activeFight.exchanges[0];
  const high = takeFightTurn(startFight(highIq, 'schoolWrestler'), 'counter').activeFight.exchanges[0];

  assert.ok(high.swing > low.swing);
  assert.ok(high.playerDamage > low.playerDamage);
});

test('higher technique can trigger critical strikes for bonus damage', () => {
  const base = createNewLife({ gender: 'Female', seed: 1 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 180,
      speed: 180,
      durability: 150,
      technique: 420,
      fightIq: 180,
      willpower: 150,
      reflexes: 160,
      flexibility: 130,
      aggression: 110,
      control: 150,
    },
  };

  const exchange = takeFightTurn(startFight(fighter, 'localBrawler'), 'counter').activeFight.exchanges[0];

  assert.equal(exchange.critical, true);
  assert.ok(exchange.criticalChance > 0.2);
  assert.ok(exchange.playerDamage >= exchange.basePlayerDamage + 6);
  assert.ok(exchange.text.includes('Critical strike'));
  assert.equal(exchange.reactionQuality, 'critical');
  assert.ok(exchange.text.includes('Critical reaction:'));
});

test('enemy fight iq improves their exchange control and damage', () => {
  OPPONENTS.testLowRead = {
    name: 'Test Low Read',
    style: 'Pocket Brawling',
    threat: 'Test',
    tier: 'Local',
    power: 220,
    temperament: 'reckless pressure',
    strengths: ['wide entries'],
    weakness: 'overcommitment can be checked',
    reward: 0,
    rep: 0,
    risk: 10,
  };
  OPPONENTS.testHighRead = {
    name: 'Test High Read',
    style: 'Redirection Hybrid',
    threat: 'Test',
    tier: 'Local',
    power: 220,
    temperament: 'patient counter-striker',
    strengths: ['read traps'],
    weakness: 'body debt if forced into attrition',
    reward: 0,
    rep: 0,
    risk: 10,
  };
  const base = createNewLife({ gender: 'Male', seed: 154 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 120,
      speed: 120,
      durability: 110,
      technique: 110,
      fightIq: 60,
      willpower: 100,
      reflexes: 100,
      flexibility: 80,
      aggression: 100,
      control: 80,
    },
  };

  const low = takeFightTurn(startFight(fighter, 'testLowRead'), 'pressure').activeFight.exchanges[0];
  const high = takeFightTurn(startFight(fighter, 'testHighRead'), 'pressure').activeFight.exchanges[0];

  assert.ok(high.enemyFightIqReadBonus > low.enemyFightIqReadBonus);
  assert.ok(high.swing < low.swing);
  assert.ok(high.enemyDamage >= low.enemyDamage);
});

test('enemy technique can trigger critical strikes', () => {
  OPPONENTS.testTechnician = {
    name: 'Test Technician',
    style: 'Redirection Karate Hybrid',
    threat: 'Test',
    tier: 'Local',
    power: 520,
    temperament: 'patient counter-striker',
    strengths: ['precision timing'],
    weakness: 'body debt if forced into attrition',
    reward: 0,
    rep: 0,
    risk: 10,
  };
  const base = createNewLife({ gender: 'Female', seed: 155 });
  const fighter = {
    ...base,
    rngSeed: 1,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 90,
      speed: 10,
      durability: 120,
      technique: 70,
      fightIq: 70,
      willpower: 110,
      reflexes: 10,
      flexibility: 40,
      aggression: 90,
      control: 60,
    },
  };

  const exchange = takeFightTurn(startFight(fighter, 'testTechnician'), 'pressure').activeFight.exchanges[0];

  assert.equal(exchange.enemyCritical, true);
  assert.ok(exchange.enemyCriticalChance > 0.25);
  assert.ok(exchange.enemyDamage >= exchange.baseEnemyDamage + 4);
  assert.ok(exchange.text.includes('Opponent critical'));
});

test('taking fight turns adds narrated exchanges and updates meters', () => {
  const life = startFight(createNewLife({ gender: 'Female', seed: 52 }), 'localBrawler');
  const next = takeFightTurn(life, 'counter');

  assert.equal(next.activeFight.round, 2);
  assert.equal(next.activeFight.exchanges.length, 1);
  assert.equal(next.activeFight.exchanges[0].tactic, 'counter');
  assert.equal(next.activeFight.exchanges[0].tacticLabel, 'Counter');
  assert.ok(next.activeFight.exchanges[0].text.length > 40);
  assert.notEqual(next.activeFight.meters.momentum, life.activeFight.meters.momentum);
});

test('fight exchanges do not use the removed block mechanic', () => {
  const base = createNewLife({ gender: 'Male', seed: 540 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 160,
      speed: 110,
      durability: 120,
      technique: 90,
      fightIq: 80,
      willpower: 100,
      reflexes: 70,
      flexibility: 60,
      aggression: 160,
      control: 60,
    },
  };

  const next = takeFightTurn(startFight(fighter, 'schoolWrestler'), 'pressure');
  const exchange = next.activeFight.exchanges[0];

  assert.equal(exchange.blocked, undefined);
  assert.equal(exchange.opponentBlocked, undefined);
  assert.ok(!exchange.text.includes('Block:'));
  assert.ok(!exchange.text.includes('Enemy block:'));
});

test('decision wins use health percentage without momentum override', () => {
  const life = startFight(createNewLife({ gender: 'Male', seed: 549 }), 'localBrawler');
  life.activeFight.round = life.activeFight.maxRounds;
  life.activeFight.meters.playerHealth = 90;
  life.activeFight.meters.maxPlayerHealth = 100;
  life.activeFight.meters.opponentHealth = 95;
  life.activeFight.meters.maxOpponentHealth = 100;
  life.activeFight.meters.momentum = 50;

  const next = takeFightTurn(life, 'conserve');

  assert.equal(next.activeFight.finished, true);
  assert.equal(next.activeFight.result.won, false);
});

test('special boss dodge chance stays beatable without block mitigation', () => {
  const base = createNewLife({ gender: 'Male', seed: 550 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, reputation: 300, energy: 100 },
    stats: {
      ...base.stats,
      strength: 900,
      speed: 900,
      durability: 900,
      technique: 900,
      fightIq: 900,
      willpower: 900,
      reflexes: 900,
      flexibility: 900,
      aggression: 900,
      control: 900,
    },
  };

  const next = takeFightTurn(startFight(fighter, 'gokiShibukawae'), 'pressure');

  assert.ok(next.activeFight.exchanges[0].opponentDodgeChance < 0.6);
  assert.equal(next.activeFight.exchanges[0].opponentBlockReduction, undefined);
});

test('fight moves go on cooldown and cannot be repeated immediately', () => {
  const base = createNewLife({ gender: 'Male', seed: 542 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 170,
      speed: 160,
      durability: 160,
      technique: 160,
      fightIq: 150,
      willpower: 150,
      reflexes: 150,
      flexibility: 120,
      aggression: 170,
      control: 120,
    },
  };

  const first = takeFightTurn(startFight(fighter, 'localBrawler'), 'pressure');
  const blocked = takeFightTurn(first, 'pressure');
  const pressureMove = getUnlockedFightMoves(first, 'pressure').find((move) => move.id === 'pressure');

  assert.equal(blocked.activeFight.round, first.activeFight.round);
  assert.ok(blocked.log[0].text.includes('cooling down'));
  assert.ok(pressureMove.disabledReason.includes('cooldown'));
});

test('using a different move advances the fight while another move cools down', () => {
  const base = createNewLife({ gender: 'Female', seed: 543 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 170,
      speed: 170,
      durability: 160,
      technique: 170,
      fightIq: 170,
      willpower: 150,
      reflexes: 170,
      flexibility: 140,
      aggression: 150,
      control: 140,
    },
  };

  const first = takeFightTurn(startFight(fighter, 'localBrawler'), 'pressure');
  const second = takeFightTurn(first, 'counter');

  assert.equal(second.activeFight.exchanges[0].tactic, 'counter');
  assert.ok(second.activeFight.round > first.activeFight.round || second.activeFight.finished);
});

test('optimal next move read stays locked below 1500 Fight IQ', () => {
  const base = createNewLife({ gender: 'Male', seed: 546 });
  const fighter = {
    ...base,
    unlockedSkills: ['jab', 'bodyShot', 'slipCross', 'collarTie', 'measuredBreathing', 'parryFrame'],
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 240,
      speed: 240,
      durability: 180,
      technique: 240,
      fightIq: 1499,
      willpower: 180,
      reflexes: 240,
      flexibility: 180,
      aggression: 220,
      control: 200,
    },
  };

  const next = takeFightTurn(startFight(fighter, 'localBrawler'), 'jab');

  assert.equal(next.activeFight.optimalMove, null);
  assert.equal(next.activeFight.exchanges[0].nextOptimalMove, null);
  assert.ok(!next.activeFight.exchanges[0].text.includes('Optimal next move:'));
});

test('each exchange creates an optimal next move read at 1500 Fight IQ and boosts the matching move', () => {
  const base = createNewLife({ gender: 'Male', seed: 546 });
  const fighter = {
    ...base,
    unlockedSkills: ['jab', 'bodyShot', 'slipCross', 'collarTie', 'measuredBreathing', 'parryFrame'],
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 240,
      speed: 240,
      durability: 180,
      technique: 240,
      fightIq: 1500,
      willpower: 180,
      reflexes: 240,
      flexibility: 180,
      aggression: 220,
      control: 200,
    },
  };

  const first = takeFightTurn(startFight(fighter, 'localBrawler'), 'jab');
  const optimalMove = first.activeFight.optimalMove;

  assert.ok(optimalMove?.id);
  assert.ok(first.activeFight.exchanges[0].nextOptimalMove);
  assert.ok(first.activeFight.exchanges[0].text.includes('Optimal next move:'));

  const boosted = takeFightTurn(first, optimalMove.id);
  const boostedExchange = boosted.activeFight.exchanges[0];

  assert.equal(boostedExchange.optimalMoveHit, true);
  assert.ok(boostedExchange.optimalBoost);
  assert.ok(boostedExchange.text.includes('Optimal boost:'));
  assert.ok(boostedExchange.playerDamage >= boostedExchange.basePlayerDamage || boostedExchange.enemyDamage <= boostedExchange.baseEnemyDamage);
});

test('special moves spend limited charges and cannot be spammed forever', () => {
  const base = createNewLife({ gender: 'Male', seed: 544 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 170,
      speed: 160,
      durability: 160,
      technique: 160,
      fightIq: 150,
      willpower: 150,
      reflexes: 150,
      flexibility: 120,
      aggression: 170,
      control: 120,
    },
  };

  const first = takeFightTurn(startFight(fighter, 'localBrawler'), 'special');
  const blocked = takeFightTurn(first, 'special');
  const specialMove = getUnlockedFightMoves(first, 'special').find((move) => move.id === 'special');

  assert.equal(first.activeFight.specialCharges, 0);
  assert.equal(blocked.activeFight.round, first.activeFight.round);
  assert.ok(blocked.log[0].text.includes('No special charges'));
  assert.ok(specialMove.disabledReason.includes('No special charges'));
});

test('fight tactics have flavorful tactical descriptions', () => {
  for (const tactic of Object.values(FIGHT_TACTICS)) {
    assert.ok(tactic.hint.length >= 55);
  }
});

test('high player stats no longer one-shot matched opponents by raw scaling alone', () => {
  const base = createNewLife({ gender: 'Male', seed: 539 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: Object.fromEntries(Object.keys(base.stats).map((stat) => [stat, 500])),
  };

  const next = takeFightTurn(startFight(fighter, 'localBrawler'), 'pressure');

  assert.equal(next.activeFight.finished, false);
  assert.ok(next.activeFight.exchanges[0].playerDamage < 60);
  assert.ok(next.activeFight.meters.opponentHealth > 40);
});

test('fight categories expose unlocked move menus', () => {
  const life = createNewLife({ gender: 'Female', seed: 116 });
  const pressureMoves = getUnlockedFightMoves(life, 'pressure');
  const specialMoves = getUnlockedFightMoves(life, 'special');

  assert.ok(Object.keys(FIGHT_MOVES).length >= 32);
  assert.ok(BASIC_FIGHT_MOVE_IDS.length >= 20);
  assert.ok(pressureMoves.some((move) => move.id === 'pressure'));
  assert.ok(specialMoves.some((move) => move.id === 'special'));
  assert.ok(!pressureMoves.some((move) => move.id === 'jab'));
  assert.ok(!pressureMoves.some((move) => move.id === 'demonPressure'));
});

test('basic fight moves carry multiple flavor lines and finish lines', () => {
  for (const id of BASIC_FIGHT_MOVE_IDS) {
    const move = FIGHT_MOVES[id];
    assert.ok(move.text.length >= 3, `${id} needs exchange flavor variety`);
    assert.ok(move.finish.length >= 2, `${id} needs finisher flavor variety`);
  }
});

test('basic move menu descriptions use each move unique effect text', () => {
  const base = createNewLife({ gender: 'Male', seed: 118 });
  const life = {
    ...base,
    unlockedSkills: ['jab', 'blitzStep', 'collarTie', 'tempoFeint'],
  };

  const pressureMoves = getUnlockedFightMoves(life, 'pressure');
  const grappleMoves = getUnlockedFightMoves(life, 'grapple');
  const conserveMoves = getUnlockedFightMoves(life, 'conserve');

  assert.equal(pressureMoves.find((move) => move.id === 'jab').skillEffect, FIGHT_MOVES.jab.hint);
  assert.equal(pressureMoves.find((move) => move.id === 'blitzStep').skillEffect, FIGHT_MOVES.blitzStep.hint);
  assert.equal(grappleMoves.find((move) => move.id === 'collarTie').skillEffect, FIGHT_MOVES.collarTie.hint);
  assert.equal(conserveMoves.find((move) => move.id === 'tempoFeint').skillEffect, FIGHT_MOVES.tempoFeint.hint);
  assert.ok(!pressureMoves.find((move) => move.id === 'jab').skillEffect.includes('Basic move learned'));
});

test('all unlocked move menu descriptions are readable and not stat shorthand', () => {
  const base = createNewLife({ gender: 'Male', seed: 119 });
  const life = {
    ...base,
    unlockedSkills: Object.keys(FIGHT_MOVES),
  };

  for (const category of ['pressure', 'counter', 'grapple', 'defend', 'conserve', 'special']) {
    for (const move of getUnlockedFightMoves(life, category)) {
      const description = move.skillEffect ?? move.hint;
      assert.ok(description.length >= 45, `${move.id} needs a fuller menu description`);
      assert.ok(!description.startsWith('+'), `${move.id} should not use stat shorthand as its menu description`);
    }
  }
});

test('normal fight wins can teach basic moves from the tactics used', () => {
  const base = createNewLife({ gender: 'Male', seed: 1 });
  const life = {
    ...base,
    record: { wins: 20, losses: 0, kos: 0 },
    stats: {
      ...base.stats,
      strength: 320,
      speed: 260,
      durability: 250,
      technique: 240,
      fightIq: 230,
      willpower: 230,
      reflexes: 220,
      flexibility: 200,
      aggression: 280,
      control: 220,
    },
  };
  life.resources = { ...base.resources, health: maxLifeHealth(life), energy: maxLifeEnergy(life), reputation: 600 };

  const next = simulateFight(life, 'localBrawler', 'pressure');
  const learnedBasic = next.unlockedSkills.filter((id) => BASIC_FIGHT_MOVE_IDS.includes(id));
  const pressureMoves = getUnlockedFightMoves(next, 'pressure');
  const usedCategories = new Set(next.activeFight.exchanges.map((exchange) => exchange.tactic));

  assert.equal(next.record.wins, 21);
  assert.ok(learnedBasic.some((id) => usedCategories.has(FIGHT_MOVES[id].category)));
  assert.ok(pressureMoves.length >= 1);
  assert.ok(next.activeFight.result.rewards.some((reward) => reward.startsWith('Basic move learned:')));
});

test('enemy reactions change based on the player tactic', () => {
  const base = createNewLife({ gender: 'Male', seed: 522 });
  const strong = {
    ...base,
    stats: {
      ...base.stats,
      strength: 120,
      speed: 110,
      aggression: 110,
      technique: 100,
      fightIq: 100,
      willpower: 90,
      control: 90,
      reflexes: 100,
      durability: 90,
    },
  };

  const pressure = takeFightTurn(startFight(strong, 'localBrawler'), 'pressure').activeFight.exchanges[0].text;
  const grapple = takeFightTurn(startFight(strong, 'localBrawler'), 'grapple').activeFight.exchanges[0].text;

  assert.ok(pressure.includes('Reaction:'));
  assert.ok(grapple.includes('Reaction:'));
  assert.notEqual(pressure, grapple);
});

test('enemy exchanges use exact named moves inside broad fight options', () => {
  const base = createNewLife({ gender: 'Male', seed: 702 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
  };

  const next = takeFightTurn(startFight(fighter, 'localBrawler'), 'pressure');
  const exchange = next.activeFight.exchanges[0];

  assert.ok(exchange.opponentMoveId);
  assert.ok(exchange.opponentMoveLabel);
  assert.equal(ENEMY_FIGHT_MOVES[exchange.opponentMoveId].category, exchange.opponentTactic);
  assert.ok(exchange.text.includes(`answers with ${exchange.opponentMoveLabel}`));
  assert.notEqual(exchange.opponentMoveLabel, exchange.opponentTacticLabel);
});

test('combat injury flavor can come from the exact enemy move that landed', () => {
  const base = createNewLife({ gender: 'Male', seed: 703 });
  const fighter = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      speed: 10,
      durability: 1,
      willpower: 1,
      control: 1,
      flexibility: 1,
    },
  };
  const life = startFight(fighter, 'localBrawler');
  life.activeFight.meters.playerHealth = 18;
  life.activeFight.meters.guard = 0;
  life.activeFight.meters.injuryRisk = 75;

  const next = takeFightTurn(life, 'conserve');
  const exchange = next.activeFight.exchanges[0];
  const enemyMove = ENEMY_FIGHT_MOVES[exchange.opponentMoveId];

  assert.ok(exchange.combatInjury);
  assert.equal(exchange.combatInjury.name, enemyMove.injury.name);
  assert.ok(exchange.text.includes(enemyMove.label));
  assert.ok(exchange.text.includes(enemyMove.injury.text));
});

test('enemy reactions change for exact basic moves inside the same category', () => {
  const base = createNewLife({ gender: 'Male', seed: 531 });
  const fighter = {
    ...base,
    unlockedSkills: ['jab', 'bodyShot'],
    stats: {
      ...base.stats,
      strength: 180,
      speed: 170,
      aggression: 160,
      technique: 150,
      fightIq: 120,
      reflexes: 120,
    },
  };

  const jabText = takeFightTurn(startFight(fighter, 'localBrawler'), 'jab').activeFight.exchanges[0].text;
  const bodyText = takeFightTurn(startFight(fighter, 'localBrawler'), 'bodyShot').activeFight.exchanges[0].text;

  assert.notEqual(jabText, bodyText);
  assert.ok(jabText.includes('lead hand') || jabText.includes('straight shot'));
  assert.ok(bodyText.includes('ribs') || bodyText.includes('body shot'));
});

test('enemy reaction leads with the exact fight move that was used', () => {
  const base = createNewLife({ gender: 'Male', seed: 544 });
  const fighter = {
    ...base,
    unlockedSkills: ['jab', 'bodyShot', 'lowKickChop', 'singleLegEntry', 'shoulderRoll', 'measuredBreathing'],
    stats: {
      ...base.stats,
      strength: 220,
      speed: 220,
      durability: 220,
      technique: 220,
      fightIq: 220,
      willpower: 220,
      reflexes: 220,
      flexibility: 220,
      aggression: 220,
      control: 220,
    },
  };
  const cases = [
    ['jab', /lead hand|jab|straight touch/i],
    ['bodyShot', /body shot|ribs|elbow/i],
    ['lowKickChop', /low kick|lead leg|shin|stance/i],
    ['singleLegEntry', /single-leg|one leg|leg is already captured/i],
    ['shoulderRoll', /shoulder|roll|counter hand/i],
    ['measuredBreathing', /breathing|lungs|tempo/i],
  ];

  for (const [moveId, expected] of cases) {
    const text = takeFightTurn(startFight(fighter, 'localBrawler'), moveId).activeFight.exchanges[0].text;
    const reactionLead = text.split('Reaction: ')[1].split('.')[0];
    assert.match(reactionLead, expected, `${moveId} reaction should start with exact-move flavor`);
  }
});

test('weak move reactions call out when the matchup read is hit', () => {
  const base = createNewLife({ gender: 'Female', seed: 532 });
  const fighter = {
    ...base,
    unlockedSkills: ['checkHook'],
    stats: {
      ...base.stats,
      speed: 190,
      reflexes: 190,
      technique: 170,
      fightIq: 160,
    },
  };

  const text = takeFightTurn(startFight(fighter, 'localBrawler'), 'checkHook').activeFight.exchanges[0].text;

  assert.ok(text.includes('exact weakness'));
  assert.ok(text.includes('matchup read') || text.includes('pre-fight read'));
});

test('finisher reactions use different text when a move ends the fight', () => {
  const base = createNewLife({ gender: 'Male', seed: 533 });
  const fighter = {
    ...base,
    unlockedSkills: ['jab'],
    stats: {
      ...base.stats,
      strength: 240,
      speed: 220,
      aggression: 220,
      technique: 210,
    },
  };
  const life = startFight(fighter, 'alleyScrapper');
  life.activeFight.meters.opponentHealth = 3;

  const next = takeFightTurn(life, 'jab');
  const text = next.activeFight.exchanges[0].text;

  assert.equal(next.activeFight.finished, true);
  assert.ok(text.includes('Finisher reaction:'));
  assert.ok(text.includes('cannot rebuild') || text.includes('last answer'));
});

test('enemy reactions reflect glancing and clean damage results', () => {
  const base = createNewLife({ gender: 'Male', seed: 545 });
  const weak = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 1,
      speed: 1,
      aggression: 1,
      technique: 1,
      fightIq: 1,
      reflexes: 1,
    },
  };
  const strongBase = createNewLife({ gender: 'Male', seed: 546 });
  const strong = {
    ...strongBase,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...strongBase.stats,
      strength: 420,
      speed: 360,
      aggression: 380,
      technique: 80,
      fightIq: 80,
      reflexes: 260,
      durability: 260,
      willpower: 260,
      control: 220,
    },
  };

  const weakExchange = takeFightTurn(startFight(weak, 'localBrawler'), 'pressure').activeFight.exchanges[0];
  const strongFight = startFight(strong, 'localBrawler');
  strongFight.activeFight.meters.opponentHealth = strongFight.activeFight.meters.maxOpponentHealth + 200;
  strongFight.activeFight.meters.maxOpponentHealth += 200;
  const cleanExchange = takeFightTurn(strongFight, 'pressure').activeFight.exchanges[0];

  assert.equal(weakExchange.reactionQuality, 'glancing');
  assert.ok(weakExchange.text.includes('Glancing reaction:'));
  assert.equal(cleanExchange.reactionQuality, 'clean');
  assert.ok(cleanExchange.text.includes('Clean reaction:'));
});

test('special boss reactions account for exact moves instead of only broad tactics', () => {
  const base = createNewLife({ gender: 'Male', seed: 534 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, reputation: 300, energy: 100 },
    unlockedSkills: ['jab', 'bodyShot'],
    stats: {
      ...base.stats,
      strength: 460,
      speed: 460,
      durability: 460,
      technique: 460,
      fightIq: 460,
      willpower: 460,
      reflexes: 460,
      flexibility: 460,
      aggression: 460,
      control: 460,
    },
  };

  const jabText = takeFightTurn(startFight(fighter, 'yujiriHanmae'), 'jab').activeFight.exchanges[0].text;
  const bodyText = takeFightTurn(startFight(fighter, 'yujiriHanmae'), 'bodyShot').activeFight.exchanges[0].text;

  assert.notEqual(jabText, bodyText);
  assert.ok(jabText.includes('Yujiri'));
  assert.ok(jabText.includes('lead hand') || jabText.includes('straight shot'));
  assert.ok(bodyText.includes('Yujiri'));
  assert.ok(bodyText.includes('ribs') || bodyText.includes('body shot'));
});

test('every exchange log clearly lists damage dealt and damage taken', () => {
  const base = createNewLife({ gender: 'Male', seed: 545 });
  const fighter = {
    ...base,
    unlockedSkills: ['jab', 'bodyShot', 'shoulderRoll'],
    stats: {
      ...base.stats,
      strength: 220,
      speed: 220,
      durability: 120,
      technique: 220,
      fightIq: 220,
      willpower: 120,
      reflexes: 220,
      aggression: 220,
      control: 120,
    },
  };
  const normal = takeFightTurn(startFight(fighter, 'localBrawler'), 'bodyShot').activeFight.exchanges[0];
  const dodgeLife = startFight({ ...fighter, stats: { ...fighter.stats, speed: 900, reflexes: 900 } }, 'localBrawler');
  const dodged = takeFightTurn(dodgeLife, 'jab').activeFight.exchanges[0];
  const finisherLife = startFight(fighter, 'alleyScrapper');
  finisherLife.activeFight.meters.opponentHealth = 2;
  const finisher = takeFightTurn(finisherLife, 'jab').activeFight.exchanges[0];

  for (const exchange of [normal, dodged, finisher]) {
    assert.match(exchange.text, /Damage: You dealt \d+\. You took \d+\./);
    assert.ok(exchange.text.includes(`You dealt ${exchange.playerDamage}.`));
    assert.ok(exchange.text.includes(`You took ${exchange.enemyDamage}.`));
    assert.ok(exchange.text.includes('Your reaction:'));
  }
});

test('player reactions mirror enemy attack results in the exchange log', () => {
  const base = createNewLife({ gender: 'Male', seed: 931 });
  const sturdy = {
    ...base,
    stats: {
      ...base.stats,
      strength: 160,
      speed: 15,
      durability: 300,
      technique: 120,
      fightIq: 80,
      willpower: 260,
      reflexes: 40,
      flexibility: 40,
      aggression: 120,
      control: 180,
    },
    resources: { ...base.resources, energy: 100, health: 100 },
  };
  const fast = {
    ...sturdy,
    stats: { ...sturdy.stats, speed: 300, reflexes: 220, flexibility: 170 },
  };
  const hit = takeFightTurn(startFight(sturdy, 'localBrawler'), 'pressure').activeFight.exchanges[0].text;
  const dodgeText = takeFightTurn(startFight(fast, 'localBrawler'), 'pressure').activeFight.exchanges[0].text;

  assert.ok(hit.includes('Your reaction:'));
  assert.ok(dodgeText.includes('Your reaction:'));
  assert.notEqual(hit.split('Your reaction: ')[1].split(' Reaction:')[0], dodgeText.split('Your reaction: ')[1].split(' Reaction:')[0]);
});

test('low durability takes meaningful damage even when offense is strong', () => {
  const base = createNewLife({ gender: 'Male', seed: 520 });
  const glassCannon = {
    ...base,
    stats: {
      ...base.stats,
      strength: 190,
      speed: 60,
      aggression: 185,
      technique: 70,
      fightIq: 55,
      willpower: 30,
      control: 24,
      reflexes: 35,
      flexibility: 20,
      durability: 8,
    },
  };
  const ironBody = {
    ...glassCannon,
    stats: {
      ...glassCannon.stats,
      durability: 220,
      willpower: 120,
      control: 95,
    },
  };
  glassCannon.resources = { ...glassCannon.resources, health: maxLifeHealth(glassCannon), energy: maxLifeEnergy(glassCannon) };
  ironBody.resources = { ...ironBody.resources, health: maxLifeHealth(ironBody), energy: maxLifeEnergy(ironBody) };

  const glassAfter = takeFightTurn(startFight(glassCannon, 'localBrawler'), 'pressure');
  const ironAfter = takeFightTurn(startFight(ironBody, 'localBrawler'), 'pressure');
  const glassDamage = glassAfter.activeFight.meters.maxPlayerHealth - glassAfter.activeFight.meters.playerHealth;
  const ironDamage = ironAfter.activeFight.meters.maxPlayerHealth - ironAfter.activeFight.meters.playerHealth;

  assert.ok(glassDamage >= 8);
  assert.ok(ironDamage < glassDamage);
});

test('enemy attacks can cause specific combat injuries with exchange text', () => {
  const base = createNewLife({ gender: 'Male', seed: 548 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, energy: 100, health: 100, reputation: 120 },
    stats: {
      ...base.stats,
      strength: 25,
      speed: 20,
      durability: 1,
      technique: 20,
      fightIq: 20,
      willpower: 1,
      reflexes: 15,
      flexibility: 1,
      aggression: 25,
      control: 1,
    },
  };
  const life = startFight(fighter, 'yujiriHanmae');
  life.activeFight.meters.playerHealth = 20;
  life.activeFight.meters.guard = 0;

  const next = takeFightTurn(life, 'pressure');
  const exchange = next.activeFight.exchanges[0];

  assert.ok(exchange.combatInjury);
  assert.ok(next.injuries.some((injury) => (injury.name ?? injury) === exchange.combatInjury.name));
  assert.ok(['Mild', 'Moderate', 'Severe'].includes(exchange.combatInjury.tier));
  assert.ok(exchange.text.includes('Injury:'));
  assert.ok(exchange.text.includes(exchange.combatInjury.name));
});

test('combat injury severity changes fight debuffs on the next exchange', () => {
  const base = createNewLife({ gender: 'Male', seed: 550 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, energy: 100, health: 100, reputation: 120 },
    stats: {
      ...base.stats,
      strength: 40,
      speed: 30,
      durability: 1,
      technique: 40,
      fightIq: 30,
      willpower: 1,
      reflexes: 25,
      flexibility: 1,
      aggression: 40,
      control: 1,
    },
  };
  let life = startFight(fighter, 'localBrawler');
  life.activeFight.meters.playerHealth = 65;
  life.activeFight.meters.guard = 0;
  life.activeFight.meters.injuryRisk = 90;

  life = takeFightTurn(life, 'pressure');
  const injury = life.activeFight.exchanges[0].combatInjury;
  assert.equal(injury.tier, 'Severe');

  life = takeFightTurn(life, 'counter');
  const followUp = life.activeFight.exchanges[0];
  assert.ok(followUp.injuryEffects.includes(injury.name));
  assert.ok(followUp.text.includes('Injury effect:'));
});

test('severe injuries create a medical fight suspension', () => {
  const base = createNewLife({ gender: 'Male', seed: 551 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, energy: 100, health: 100, reputation: 120 },
    stats: {
      ...base.stats,
      strength: 10,
      speed: 10,
      durability: 1,
      technique: 10,
      fightIq: 10,
      willpower: 1,
      reflexes: 10,
      flexibility: 1,
      aggression: 10,
      control: 1,
    },
  };
  let life = startFight(fighter, 'yujiriHanmae');
  life.activeFight.meters.playerHealth = 10;
  life.activeFight.meters.guard = 0;
  life.activeFight.meters.injuryRisk = 95;
  life = takeFightTurn(life, 'pressure');
  while (life.activeFight && !life.activeFight.finished) {
    life = takeFightTurn(life, 'counter');
  }

  assert.ok(life.medicalSuspensionUntil > life.identity.age * 12 + life.identity.month);
  const blocked = startFight({ ...life, activeFight: null }, 'localBrawler');
  assert.equal(blocked.activeFight, null);
  assert.ok(blocked.log[0].text.includes('Medical suspension'));
});

test('active combat injuries weaken attacks and increase damage taken', () => {
  const base = createNewLife({ gender: 'Male', seed: 549 });
  const healthy = {
    ...base,
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 220,
      speed: 220,
      durability: 160,
      technique: 180,
      fightIq: 180,
      willpower: 150,
      reflexes: 190,
      flexibility: 140,
      aggression: 220,
      control: 130,
    },
  };
  const injured = {
    ...healthy,
    injuries: ['twisted knee'],
  };

  const healthyExchange = takeFightTurn(startFight(healthy, 'localBrawler'), 'pressure').activeFight.exchanges[0];
  const injuredExchange = takeFightTurn(startFight(injured, 'localBrawler'), 'pressure').activeFight.exchanges[0];

  assert.ok(injuredExchange.playerDamage < healthyExchange.playerDamage);
  assert.ok(injuredExchange.enemyDamage > healthyExchange.enemyDamage);
  assert.ok(injuredExchange.injuryEffects.includes('twisted knee'));
  assert.ok(injuredExchange.text.includes('Injury effect:'));
});

test('flexibility improves grappling damage and injury safety', () => {
  const base = createNewLife({ gender: 'Female', seed: 523 });
  const lowFlex = {
    ...base,
    stats: {
      ...base.stats,
      strength: 80,
      speed: 80,
      durability: 90,
      technique: 90,
      fightIq: 70,
      willpower: 70,
      reflexes: 70,
      flexibility: 5,
      aggression: 65,
      control: 70,
    },
  };
  const highFlex = { ...lowFlex, stats: { ...lowFlex.stats, flexibility: 220 } };

  const lowAfter = takeFightTurn(startFight(lowFlex, 'localBrawler'), 'grapple');
  const highAfter = takeFightTurn(startFight(highFlex, 'localBrawler'), 'grapple');

  assert.ok(highAfter.activeFight.exchanges[0].playerDamage > lowAfter.activeFight.exchanges[0].playerDamage);
  assert.ok(highAfter.activeFight.meters.injuryRisk <= lowAfter.activeFight.meters.injuryRisk);
});

test('control and willpower make defending meaningfully safer', () => {
  const base = createNewLife({ gender: 'Male', seed: 524 });
  const panicked = {
    ...base,
    stats: {
      ...base.stats,
      strength: 70,
      speed: 70,
      durability: 70,
      technique: 70,
      fightIq: 60,
      willpower: 10,
      reflexes: 60,
      flexibility: 40,
      aggression: 40,
      control: 8,
    },
  };
  const composed = {
    ...panicked,
    stats: { ...panicked.stats, control: 220, willpower: 200, fightIq: 140 },
  };

  const panickedAfter = takeFightTurn(startFight(panicked, 'localBrawler'), 'defend');
  const composedAfter = takeFightTurn(startFight(composed, 'localBrawler'), 'defend');

  assert.ok(composedAfter.activeFight.exchanges[0].enemyDamage < panickedAfter.activeFight.exchanges[0].enemyDamage);
  assert.ok(composedAfter.activeFight.meters.guard > panickedAfter.activeFight.meters.guard);
});

test('fight iq and reflexes make counters hit harder', () => {
  const base = createNewLife({ gender: 'Nonbinary', seed: 525 });
  const slowRead = {
    ...base,
    stats: {
      ...base.stats,
      strength: 60,
      speed: 70,
      durability: 70,
      technique: 80,
      fightIq: 8,
      willpower: 60,
      reflexes: 8,
      flexibility: 50,
      aggression: 40,
      control: 50,
    },
  };
  const sharpRead = {
    ...slowRead,
    stats: { ...slowRead.stats, fightIq: 220, reflexes: 220 },
  };

  const slowAfter = takeFightTurn(startFight(slowRead, 'localBrawler'), 'counter');
  const sharpAfter = takeFightTurn(startFight(sharpRead, 'localBrawler'), 'counter');

  assert.ok(sharpAfter.activeFight.exchanges[0].playerDamage > slowAfter.activeFight.exchanges[0].playerDamage);
  assert.ok(sharpAfter.activeFight.meters.momentum > slowAfter.activeFight.meters.momentum);
});

test('high speed can dodge return damage during pressure', () => {
  const base = createNewLife({ gender: 'Female', seed: 526 });
  const slow = {
    ...base,
    stats: {
      ...base.stats,
      strength: 110,
      speed: 5,
      durability: 45,
      technique: 75,
      fightIq: 55,
      willpower: 50,
      reflexes: 25,
      flexibility: 20,
      aggression: 110,
      control: 40,
    },
  };
  const fast = {
    ...slow,
    stats: {
      ...slow.stats,
      speed: 260,
      reflexes: 160,
      flexibility: 140,
    },
  };

  const slowAfter = takeFightTurn(startFight(slow, 'localBrawler'), 'pressure');
  const fastAfter = takeFightTurn(startFight(fast, 'localBrawler'), 'pressure');

  assert.equal(fastAfter.activeFight.exchanges[0].dodged, true);
  assert.equal(fastAfter.activeFight.exchanges[0].enemyDamage, 0);
  assert.ok(slowAfter.activeFight.exchanges[0].enemyDamage > fastAfter.activeFight.exchanges[0].enemyDamage);
  assert.ok(fastAfter.activeFight.exchanges[0].text.includes('Dodge:'));
  assert.ok(fastAfter.activeFight.exchanges[0].text.indexOf('Enemy attack:') < fastAfter.activeFight.exchanges[0].text.indexOf('Dodge:'));
  assert.ok(fastAfter.activeFight.exchanges[0].text.indexOf('Dodge:') < fastAfter.activeFight.exchanges[0].text.indexOf('Your reaction:'));
  assert.ok(fastAfter.activeFight.exchanges[0].text.indexOf('Your reaction:') < fastAfter.activeFight.exchanges[0].text.indexOf('Reaction:'));
  assert.ok(fastAfter.activeFight.exchanges[0].text.includes('empty space'));
});

test('fast enemies can dodge the player attack outright', () => {
  const base = createNewLife({ gender: 'Male', seed: 542 });
  const slowPuncher = {
    ...base,
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 3 },
    resources: { ...base.resources, reputation: 60, energy: 100 },
    stats: {
      ...base.stats,
      strength: 140,
      speed: 5,
      durability: 120,
      technique: 60,
      fightIq: 20,
      willpower: 90,
      reflexes: 5,
      flexibility: 10,
      aggression: 150,
      control: 20,
    },
  };

  const next = takeFightTurn(startFight(slowPuncher, 'ghostStepAcolyte'), 'pressure');

  assert.equal(next.activeFight.exchanges[0].opponentDodged, true);
  assert.equal(next.activeFight.exchanges[0].playerDamage, 0);
  assert.ok(next.activeFight.exchanges[0].text.includes('Enemy dodge:'));
});

test('slow enemies rarely dodge clean technical entries', () => {
  const base = createNewLife({ gender: 'Female', seed: 541 });
  const sharpCounter = {
    ...base,
    unlockedSkills: ['slipCross'],
    resources: { ...base.resources, energy: 100 },
    stats: {
      ...base.stats,
      strength: 90,
      speed: 220,
      durability: 110,
      technique: 220,
      fightIq: 210,
      willpower: 120,
      reflexes: 230,
      flexibility: 160,
      aggression: 90,
      control: 160,
    },
  };

  const next = takeFightTurn(startFight(sharpCounter, 'alleyScrapper'), 'slipCross');

  assert.equal(next.activeFight.exchanges[0].opponentDodged, false);
  assert.ok(next.activeFight.exchanges[0].playerDamage > 0);
});

test('low speed is less likely to dodge incoming pressure', () => {
  const base = createNewLife({ gender: 'Male', seed: 527 });
  const slow = {
    ...base,
    stats: {
      ...base.stats,
      strength: 110,
      speed: 2,
      durability: 60,
      technique: 70,
      fightIq: 50,
      willpower: 50,
      reflexes: 10,
      flexibility: 10,
      aggression: 120,
      control: 30,
    },
  };

  const next = takeFightTurn(startFight(slow, 'localBrawler'), 'pressure');

  assert.equal(next.activeFight.exchanges[0].dodged, false);
  assert.ok(next.activeFight.exchanges[0].enemyDamage > 0);
});

test('clan passives create visible combat effects', () => {
  const base = createNewLife({ gender: 'Female', seed: 521 });
  const reihitoo = CLANS.find((clan) => clan.name === 'Reihitoo');
  const clanless = {
    name: 'No Passive Clan',
    rarity: 'Common',
    bonuses: {},
    traits: ['No combat passive'],
    drawbacks: ['None'],
    options: ['None'],
    passive: { name: 'None', effect: 'No passive effect.' },
  };
  const stats = {
    ...base.stats,
    strength: 45,
    speed: 95,
    aggression: 45,
    technique: 65,
    fightIq: 55,
    willpower: 45,
    control: 55,
    reflexes: 95,
    durability: 45,
  };
  const passiveLife = { ...base, clan: reihitoo, stats };
  const plainLife = { ...base, clan: clanless, stats };

  const passiveAfter = takeFightTurn(startFight(passiveLife, 'localBrawler'), 'counter');
  const plainAfter = takeFightTurn(startFight(plainLife, 'localBrawler'), 'counter');

  assert.ok(passiveAfter.activeFight.exchanges[0].playerDamage > plainAfter.activeFight.exchanges[0].playerDamage);
  assert.ok(passiveAfter.activeFight.exchanges[0].text.includes(reihitoo.passive.name));
});

test('special tactic text uses the clan special label', () => {
  const base = createNewLife({ gender: 'Male', seed: 54 });
  const clan = CLANS.find((item) => item.name === 'Kuri');
  const life = startFight({ ...base, clan }, 'alleyScrapper');
  const next = takeFightTurn(life, 'special');

  assert.equal(next.activeFight.exchanges[0].tacticLabel, clan.special.name);
  assert.ok(next.activeFight.exchanges[0].text.includes(clan.special.name));
  assert.ok(!next.activeFight.exchanges[0].text.includes('Clan Special'));
});

test('clan specials use unique exchange narration instead of generic special templates', () => {
  const base = createNewLife({ gender: 'Male', seed: 543 });
  const genericPhrases = ['clan burst', 'higher-ceiling attack', 'flashes through the exchange'];
  const lines = new Set();

  for (const clan of CLANS) {
    const life = startFight({
      ...base,
      clan,
      stats: {
        ...base.stats,
        strength: 800,
        speed: 800,
        durability: 800,
        technique: 800,
        fightIq: 800,
        willpower: 800,
        reflexes: 800,
        flexibility: 800,
        aggression: 800,
        control: 800,
      },
      resources: { ...base.resources, energy: 100 },
    }, 'localBrawler');

    const next = takeFightTurn(life, 'special');
    const text = next.activeFight.exchanges[0].text;

    assert.ok(text.includes(clan.special.name), `${clan.name} should name its special`);
    assert.ok(genericPhrases.every((phrase) => !text.includes(phrase)), `${clan.name} used generic special text`);
    lines.add(text);
  }

  assert.ok(lines.size >= CLANS.length - 1);
});

test('unlocked combat skills can be used as fight moves', () => {
  const base = createNewLife({ gender: 'Male', seed: 117 });
  const life = startFight({
    ...base,
    unlockedSkills: ['demonPressure'],
    stats: { ...base.stats, strength: 180, aggression: 180, speed: 120 },
  }, 'localBrawler');

  const next = takeFightTurn(life, 'demonPressure');

  assert.equal(next.activeFight.exchanges[0].tactic, 'pressure');
  assert.equal(next.activeFight.exchanges[0].moveId, 'demonPressure');
  assert.ok(next.activeFight.exchanges[0].tacticLabel.includes('Demon'));
});

test('Bakiya Demon Back special uses over-limit combat stats without permanently raising capped stats', () => {
  const base = createNewLife({ gender: 'Male', seed: 528 });
  const clan = CLANS.find((item) => item.name === 'Bakiya');
  const life = startFight({
    ...base,
    clan,
    stats: {
      ...base.stats,
      strength: STAT_CAP,
      aggression: STAT_CAP,
      willpower: STAT_CAP,
      technique: 120,
    },
  }, 'localBrawler');

  const next = takeFightTurn(life, 'special');

  assert.equal(next.activeFight.exchanges[0].tacticLabel, 'Demon Back');
  assert.ok(next.activeFight.exchanges[0].specialBoosts.strength > STAT_CAP);
  assert.equal(next.stats.strength, STAT_CAP);
  assert.ok(next.activeFight.exchanges[0].text.includes('Demon Back'));
});

test('Kuri Release Limiter special applies a temporary form boost', () => {
  const base = createNewLife({ gender: 'Male', seed: 529 });
  const clan = CLANS.find((item) => item.name === 'Kuri');
  const life = startFight({
    ...base,
    clan,
    stats: {
      ...base.stats,
      strength: 220,
      speed: 210,
      aggression: 205,
      reflexes: 190,
    },
    resources: { ...base.resources, energy: 100 },
  }, 'localBrawler');

  const next = takeFightTurn(life, 'special');

  assert.equal(next.activeFight.exchanges[0].tacticLabel, 'Release Limiter');
  assert.ok(next.activeFight.exchanges[0].specialBoosts.strength > STAT_CAP);
  assert.ok(next.activeFight.exchanges[0].text.includes('Release Limiter form boost'));
  assert.equal(next.stats.strength, 220);
});

test('special fight opponents use boss-specific reaction flavor', () => {
  const base = createNewLife({ gender: 'Male', seed: 530 });
  const life = startFight({
    ...base,
    identity: { ...base.identity, age: 18, month: 0 },
    world: { ...base.world, hiddenWorld: true },
    record: { ...base.record, wins: 10 },
    resources: { ...base.resources, reputation: 300, energy: 100 },
    stats: {
      ...base.stats,
      strength: 450,
      speed: 450,
      durability: 450,
      technique: 450,
      fightIq: 450,
      willpower: 450,
      reflexes: 450,
      flexibility: 450,
      aggression: 450,
      control: 450,
    },
  }, 'yujiriHanmae');

  const next = takeFightTurn(life, 'pressure');

  assert.ok(next.activeFight.exchanges[0].text.includes('Yujiri'));
  assert.ok(
    next.activeFight.exchanges[0].text.includes('predator') ||
    next.activeFight.exchanges[0].text.includes('worth acknowledging') ||
    next.activeFight.exchanges[0].text.includes('weaker rooms'),
  );
});

test('finishing an opponent uses distinct finisher narration', () => {
  let life = createNewLife({ gender: 'Male', seed: 55 });
  life = {
    ...life,
    stats: {
      ...life.stats,
      strength: 150,
      speed: 150,
      durability: 150,
      technique: 150,
      fightIq: 150,
      willpower: 150,
      reflexes: 150,
      aggression: 150,
    },
  };

  const started = startFight(life, 'alleyScrapper');
  started.activeFight.meters.opponentHealth = 10;
  const next = takeFightTurn(started, 'pressure');

  assert.equal(next.activeFight.finished, true);
  assert.ok(next.activeFight.exchanges[0].text.includes('Finish:'));
});

test('fight turns eventually finish with a post-fight report and rewards', () => {
  let life = createNewLife({ gender: 'Male', seed: 53 });
  life = {
    ...life,
    stats: {
      ...life.stats,
      strength: 180,
      speed: 180,
      durability: 180,
      technique: 180,
      fightIq: 180,
      willpower: 180,
      reflexes: 180,
      flexibility: 160,
      aggression: 190,
      control: 160,
    },
  };
  life = simulateFight(life, 'localBrawler', 'pressure');

  assert.equal(life.activeFight.finished, true);
  assert.equal(life.activeFight.result.won, true);
  assert.ok(life.activeFight.result.summary.includes('won'));
  assert.ok(life.activeFight.result.reasons.length >= 2);
  assert.equal(life.record.wins, 1);
  assert.ok(life.resources.money > 0);
});

test('fight report reasons summarize the actual exchange history', () => {
  let life = createNewLife({ gender: 'Male', seed: 547 });
  life = {
    ...life,
    unlockedSkills: ['jab', 'bodyShot', 'slipCross'],
    stats: {
      ...life.stats,
      strength: 260,
      speed: 260,
      durability: 220,
      technique: 260,
      fightIq: 1600,
      willpower: 220,
      reflexes: 260,
      flexibility: 200,
      aggression: 260,
      control: 220,
    },
  };

  life = simulateFight(life, 'localBrawler', 'bodyShot');
  const reasons = life.activeFight.result.reasons.join(' ');

  assert.equal(life.activeFight.finished, true);
  assert.ok(reasons.includes('Across'));
  assert.ok(/damage/i.test(reasons));
  assert.ok(/Body Shot|Pressure|Counter|Grapple|Defend|Conserve|Special|Jab|Slip Cross/.test(reasons));
  assert.ok(!reasons.includes('You built enough momentum'));
  assert.ok(!reasons.includes('Your stamina held together'));
});

test('age up advances age, restores energy, and unlocks later phases', () => {
  let life = createNewLife({ gender: 'Female', seed: 31 });

  for (let count = 0; count < 6; count += 1) {
    life = ageUp(life);
  }

  assert.equal(life.identity.age, 18);
  assert.equal(life.phase, 'Local Fighter');
  assert.equal(life.resources.energy, 100);
});

test('age up can introduce a rival with a separate feed', () => {
  const life = createNewLife({ gender: 'Male', seed: 300 });
  const next = ageUp(life);

  assert.ok(next.rival);
  assert.ok(next.rival.name);
  assert.ok(next.rival.feed.length >= 1);
  assert.ok(next.rival.feed[0].text.includes('Rival met'));
});

test('rival trains and fights through the shared enemy list on age up', () => {
  let life = ageUp(createNewLife({ gender: 'Female', seed: 301 }));
  const beforePower = life.rival.power;
  life = ageUp(life);

  assert.ok(life.rival.power > beforePower);
  assert.ok(life.rival.feed.some((item) => item.text.includes('trained')));
  assert.ok(life.rival.feed.some((item) => item.text.includes('fought')));
  assert.ok(Object.keys(OPPONENTS).includes(life.rival.lastOpponentId));
});

test('rival trains whenever the player manually trains', () => {
  const life = {
    ...ageUp(createNewLife({ gender: 'Male', seed: 311 })),
    resources: { ...ageUp(createNewLife({ gender: 'Male', seed: 311 })).resources, energy: 100 },
  };
  const beforePower = life.rival.power;

  const next = train(life, 'heavyBag');

  assert.ok(next.rival.power > beforePower);
  assert.ok(next.rival.feed[0].text.includes('mirrored your Heavy Bag'));
});

test('rival stats keep growing without player stat caps', () => {
  const life = {
    ...ageUp(createNewLife({ gender: 'Male', seed: 313 })),
    resources: { ...ageUp(createNewLife({ gender: 'Male', seed: 313 })).resources, energy: 100 },
  };
  life.rival.focus = 'striking';
  life.rival.stats = Object.fromEntries(Object.keys(life.rival.stats).map((stat) => [stat, 6000]));
  life.rival.power = 6000;

  const next = train(life, 'heavyBag');

  assert.ok(next.rival.stats.strength > 6000);
  assert.ok(next.rival.stats.speed > 6000);
  assert.ok(next.rival.power > 6000);
});

test('rival trains whenever auto training processes', () => {
  let life = ageUp(createNewLife({ gender: 'Male', seed: 312 }));
  life = {
    ...life,
    resources: { ...life.resources, energy: 100 },
    autoTraining: { heavyBag: true },
  };
  const beforePower = life.rival.power;

  const next = runAutoRoutine(life);

  assert.ok(next.rival.power > beforePower);
  assert.ok(next.rival.feed[0].text.includes('mirrored your Heavy Bag'));
  assert.equal(next.rival.feed[0].type, 'auto-train');
});

test('player can start a fight with the current rival', () => {
  const life = ageUp(createNewLife({ gender: 'Male', seed: 302 }));
  const next = startRivalFight(life);

  assert.equal(next.activeFight.opponentId, 'rival');
  assert.ok(next.activeFight.breakdown.some((line) => line.includes('Rival read')));
});

test('rival gains a strong adaptation boost when the player beats them', () => {
  const base = ageUp(createNewLife({ gender: 'Male', seed: 303 }));
  const fighter = {
    ...base,
    stats: Object.fromEntries(Object.keys(base.stats).map((stat) => [stat, 900])),
    resources: { ...base.resources, health: 100, energy: 100 },
  };
  const beforeStats = { ...fighter.rival.stats };
  const beforePower = fighter.rival.power;
  let next = startRivalFight(fighter);
  next.activeFight.meters.opponentHealth = 1;
  next = takeFightTurn(next, 'pressure');

  assert.equal(next.activeFight.result.won, true);
  assert.ok(next.rival.power >= beforePower + 45);
  assert.ok(Object.entries(next.rival.stats).some(([stat, value]) => value >= beforeStats[stat] + 25));
  assert.ok(next.rival.feed[0].text.includes('adaptation'));
});

test('coach stable can recruit a managed fighter with stats and feed', () => {
  const base = createNewLife({ gender: 'Female', seed: 410 });
  const life = {
    ...base,
    resources: { ...base.resources, money: 6000, reputation: 90 },
  };

  const next = recruitCoachedFighter(life);

  assert.equal(next.coach.fighters.length, 1);
  assert.ok(next.coach.fighters[0].name);
  assert.ok(next.coach.fighters[0].power > 0);
  assert.ok(next.resources.money < life.resources.money);
  assert.ok(next.coach.feed[0].text.includes('Recruit signed'));
});

test('coach sessions improve managed fighter stats without spending player energy', () => {
  const base = createNewLife({ gender: 'Male', seed: 411 });
  let life = {
    ...base,
    resources: { ...base.resources, money: 8000, energy: 100, reputation: 100 },
  };
  life = recruitCoachedFighter(life);
  const fighter = life.coach.fighters[0];
  const beforePower = fighter.power;
  const beforeMoney = life.resources.money;

  const next = coachFighter(life, fighter.id, 'striking');

  assert.ok(next.coach.fighters[0].power > beforePower);
  assert.ok(next.resources.money < beforeMoney);
  assert.equal(next.resources.energy, life.resources.energy);
  assert.ok(next.coach.fighters[0].feed[0].text.includes('coaching'));
});

test('coached fighters can recover and clear injuries when condition is high', () => {
  const base = createNewLife({ gender: 'Male', seed: 412 });
  let life = {
    ...base,
    resources: { ...base.resources, money: 8000, reputation: 100 },
  };
  life = recruitCoachedFighter(life);
  life.coach.fighters[0].condition = 55;
  life.coach.fighters[0].injuries = [{ name: 'camp strain', tier: 'Mild', monthsOut: 1 }];

  const next = recoverCoachedFighter(life, life.coach.fighters[0].id);

  assert.ok(next.coach.fighters[0].condition > 55);
  assert.equal(next.coach.fighters[0].injuries.length, 0);
  assert.ok(next.resources.money < life.resources.money);
});

test('coached fighters can be let go from the stable', () => {
  const base = createNewLife({ gender: 'Male', seed: 414 });
  let life = {
    ...base,
    resources: { ...base.resources, money: 9000, reputation: 100 },
  };
  life = recruitCoachedFighter(life);
  const fighterName = life.coach.fighters[0].name;

  const next = releaseCoachedFighter(life, life.coach.fighters[0].id);

  assert.equal(next.coach.fighters.length, 0);
  assert.ok(next.coach.feed[0].text.includes(fighterName));
  assert.ok(next.coach.feed[0].text.includes('let go'));
});

test('coached fighters can be booked against suitable opponents for money', () => {
  const base = createNewLife({ gender: 'Male', seed: 413 });
  let life = {
    ...base,
    resources: { ...base.resources, money: 9000, reputation: 100 },
  };
  life = recruitCoachedFighter(life);
  const fighterId = life.coach.fighters[0].id;
  const options = getCoachedFightOptions(life, fighterId);
  const beforeMoney = life.resources.money;

  const next = scheduleCoachedFight(life, fighterId, options[0].id);

  assert.ok(options.length > 0);
  assert.ok(next.resources.money > beforeMoney);
  assert.equal(next.coach.fighters[0].record.wins + next.coach.fighters[0].record.losses, 1);
  assert.ok(next.coach.feed[0].text.includes('Stable payout'));
});

test('age up after age 20 advances one month instead of one year', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 67 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 67 }).identity, age: 20, month: 0 },
    resources: { ...createNewLife({ gender: 'Male', seed: 67 }).resources, reputation: 0 },
    record: { wins: 0, losses: 0, kos: 0 },
    eventFlags: { coachNotice: true, bloodlineSpotter: true, familyIntervention: true },
  };

  life = ageUp(life);

  assert.equal(life.identity.age, 20);
  assert.equal(life.identity.month, 1);

  for (let count = 0; count < 11; count += 1) {
    life = { ...life, pendingEvent: null };
    life = ageUp(life);
  }

  assert.equal(life.identity.age, 21);
  assert.equal(life.identity.month, 0);
});

test('adult age ups no longer trigger random fighter challenge events', () => {
  let life = {
    ...createNewLife({ gender: 'Female', seed: 68 }),
    rngSeed: 8,
    identity: { ...createNewLife({ gender: 'Female', seed: 68 }).identity, age: 20, month: 3 },
    resources: { ...createNewLife({ gender: 'Female', seed: 68 }).resources, reputation: 55 },
    record: { wins: 4, losses: 0, kos: 2 },
    eventFlags: {
      coachNotice: true,
      bloodlineSpotter: true,
      familyIntervention: true,
      basementInvite: true,
      rivalCallout: true,
    },
  };

  life = ageUp(life);

  assert.equal(life.identity.age, 20);
  assert.equal(life.identity.month, 4);
  assert.notEqual(life.pendingEvent?.id, 'fighter-challenge');
});

test('special fights list homage bosses with insane stats', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 70 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 70 }).identity, age: 20 },
    resources: { ...createNewLife({ gender: 'Male', seed: 70 }).resources, reputation: 120 },
    record: { wins: 8, losses: 0, kos: 4 },
    world: { ...createNewLife({ gender: 'Male', seed: 70 }).world, hiddenWorld: true },
  };
  const fights = getSpecialFights(life);

  assert.ok(SPECIAL_FIGHT_IDS.length >= 4);
  assert.ok(fights.length >= 2);
  assert.ok(fights.every((fight) => fight.opponent.tier === 'Special Fight'));
  assert.ok(fights.every((fight) => fight.opponent.power >= 900));
  assert.ok(fights.some((fight) => fight.opponent.name.includes('Yujiri')));
});

test('winning special fights grants money, many rerolls, and unlocks skills', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 118 }),
    identity: { ...createNewLife({ gender: 'Male', seed: 118 }).identity, age: 22 },
    resources: { ...createNewLife({ gender: 'Male', seed: 118 }).resources, reputation: 500, money: 1000, clanRerolls: 0, health: 100, energy: 100 },
    record: { wins: 20, losses: 0, kos: 12 },
    world: { ...createNewLife({ gender: 'Male', seed: 118 }).world, hiddenWorld: true },
    stats: {
      ...createNewLife({ gender: 'Male', seed: 118 }).stats,
      strength: 5000,
      speed: 5000,
      durability: 5000,
      technique: 5000,
      fightIq: 5000,
      willpower: 5000,
      reflexes: 5000,
      flexibility: 5000,
      aggression: 5000,
      control: 5000,
    },
  };

  const next = simulateFight(life, 'yujiriHanmae', 'pressure');

  assert.equal(next.record.wins, 21);
  assert.ok(next.resources.money >= life.resources.money + 250000);
  assert.ok(next.resources.clanRerolls >= 20);
  assert.ok(next.unlockedSkills.includes('demonPressure'));
  assert.ok(next.activeFight.result.rewards.some((reward) => reward.includes('Skill unlocked')));
});

test('joining a tournament creates a special fighter bracket', () => {
  const life = createNewLife({ gender: 'Male', seed: 260 });

  const next = joinTournament(life);

  assert.ok(next.tournament);
  assert.equal(next.tournament.entrants.length, 8);
  assert.equal(next.tournament.roundIndex, 0);
  assert.ok(next.tournament.entrants.every((id) => SPECIAL_FIGHT_IDS.includes(id)));
});

test('tournament fights start the current bracket opponent and advance with big rewards on win', () => {
  const base = createNewLife({ gender: 'Female', seed: 261 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 30 },
    world: { ...base.world, hiddenWorld: true },
    resources: { ...base.resources, reputation: 500, energy: 100, money: 1000, clanRerolls: 0 },
    record: { wins: 30, losses: 0, kos: 20 },
    stats: {
      ...base.stats,
      strength: 3000,
      speed: 3000,
      durability: 3000,
      technique: 3000,
      fightIq: 3000,
      willpower: 3000,
      reflexes: 3000,
      flexibility: 3000,
      aggression: 3000,
      control: 3000,
    },
  };
  const joined = joinTournament(fighter);
  const started = startTournamentFight(joined);
  const firstOpponent = joined.tournament.entrants[0];

  assert.equal(started.activeFight.opponentId, firstOpponent);
  assert.equal(started.activeFight.tournament.roundIndex, 0);

  let next = started;
  let safety = 0;
  const tactics = ['pressure', 'counter', 'grapple', 'defend', 'conserve', 'special'];
  while (next.activeFight && !next.activeFight.finished && safety < 30) {
    next = takeFightTurn(next, tactics[safety % tactics.length]);
    safety += 1;
  }

  assert.equal(next.tournament.roundIndex, 1);
  assert.equal(next.tournament.wins, 1);
  assert.ok(next.resources.money > fighter.resources.money + OPPONENTS[firstOpponent].reward);
  assert.ok(next.resources.clanRerolls > 0);
  assert.ok(next.activeFight.result.rewards.some((reward) => reward.includes('Tournament bonus')));
});

function tournamentChampionReady(seed = 270) {
  const base = createNewLife({ gender: 'Male', seed });
  return {
    ...base,
    identity: { ...base.identity, age: 30 },
    world: { ...base.world, hiddenWorld: true },
    resources: { ...base.resources, reputation: 800, energy: 100, health: 100, money: 100000, clanRerolls: 0 },
    record: { wins: 60, losses: 0, kos: 45 },
    stats: {
      ...base.stats,
      strength: 5000,
      speed: 5000,
      durability: 5000,
      technique: 5000,
      fightIq: 5000,
      willpower: 5000,
      reflexes: 5000,
      flexibility: 5000,
      aggression: 5000,
      control: 5000,
    },
  };
}

function winCurrentTournament(life) {
  let next = life.activeFight?.finished ? { ...life, activeFight: null } : life;
  next = joinTournament(next);
  while (next.tournament && !next.tournament.complete) {
    next = startTournamentFight(next);
    next.activeFight.meters.opponentHealth = 0;
    next = takeFightTurn(next, 'pressure');
    if (next.activeFight?.finished && !next.tournament.complete) next = { ...next, activeFight: null };
  }
  return next;
}

test('winning a whole tournament reveals the next clan password character', () => {
  const life = tournamentChampionReady(270);

  const next = winCurrentTournament(life);

  assert.equal(next.clanPasswordProgress, 1);
  assert.equal(next.clanPasswordHint, 'B _ _ _ _ _ _');
  assert.ok(next.activeFight.result.rewards.some((reward) => reward.includes('Secret password clue: B')));
});

test('seven tournament championships reveal the full Ashura password and extra titles pay a bonus', () => {
  let life = tournamentChampionReady(271);

  for (let count = 0; count < 7; count += 1) {
    life = winCurrentTournament(life);
  }

  assert.equal(life.clanPasswordProgress, 7);
  assert.equal(life.clanPasswordHint, 'B U C K Y 2 1');
  assert.ok(life.activeFight.result.rewards.some((reward) => reward.includes('Full clan password recovered: BUCKY21')));

  const beforeMoney = life.resources.money;
  const beforeRerolls = life.resources.clanRerolls;
  const after = winCurrentTournament(life);

  assert.equal(after.clanPasswordProgress, 7);
  assert.ok(after.resources.money >= beforeMoney + 100000);
  assert.ok(after.resources.clanRerolls >= beforeRerolls + 12);
  assert.ok(after.activeFight.result.rewards.some((reward) => reward.includes('Secret password already recovered')));
});

test('age up queues criteria-based events that can be resolved by choice', () => {
  let life = createNewLife({ gender: 'Female', seed: 61 });

  for (let count = 0; count < 2; count += 1) {
    life = ageUp(life);
  }

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'coach-notice');

  const next = resolveEventChoice(life, life.pendingEvent.choices[0].id);

  assert.equal(next.pendingEvent, null);
  assert.ok(next.relationships.mentor > life.relationships.mentor);
  assert.ok(next.log[0].text.includes('accepted'));
});

test('training can queue a criteria-based overtraining event', () => {
  let life = createNewLife({ gender: 'Male', seed: 62 });
  life = train(life, 'ironBody');
  life = train(life, 'ironBody');
  life = train(life, 'ironBody');

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'overtraining-warning');
});

test('training injury queues an injury popup event and shows the injury in body data', () => {
  let life = {
    ...createNewLife({ gender: 'Male', seed: 115 }),
    resources: { ...createNewLife({ gender: 'Male', seed: 115 }).resources, health: 70, energy: 100 },
    stats: {
      ...createNewLife({ gender: 'Male', seed: 115 }).stats,
      control: 0,
      durability: 20,
    },
    world: { ...createNewLife({ gender: 'Male', seed: 115 }).world, heat: 80 },
    eventFlags: { overtrainingWarning: true },
  };

  life = train(life, 'ironBody');

  assert.ok(life.injuries.some((injury) => (injury.name ?? injury) === 'training bruises'));
  assert.ok(life.injuries.some((injury) => injury.tier === 'Mild' || injury.tier === 'Moderate'));
  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'training-injury');
  assert.ok(life.pendingEvent.body.includes('training bruises'));
});

test('mythic clans can trigger a bloodline attention event on age up', () => {
  let life = createNewLife({ gender: 'Female', seed: 63 });
  const mythicClan = CLANS.find((clan) => clan.rarity === 'Mythic');
  life = {
    ...life,
    clan: mythicClan,
    identity: { ...life.identity, age: 17 },
    eventFlags: { coachNotice: true },
  };

  life = ageUp(life);

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'bloodline-spotter');
});

test('fight streaks can trigger a rival callout event', () => {
  let life = createNewLife({ gender: 'Male', seed: 64 });
  life = {
    ...life,
    stats: {
      ...life.stats,
      strength: 180,
      speed: 160,
      durability: 140,
      technique: 140,
      fightIq: 140,
      willpower: 120,
      reflexes: 120,
      aggression: 150,
      control: 100,
    },
    resources: { ...life.resources, reputation: 35, energy: 100, health: 100 },
    record: { wins: 2, losses: 0, kos: 2 },
    eventFlags: { basementInvite: true },
  };

  life = simulateFight(life, 'alleyScrapper', 'pressure');

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'rival-callout');
});

test('recovering while injured can trigger an injury crossroads event', () => {
  let life = createNewLife({ gender: 'Nonbinary', seed: 65 });
  life = {
    ...life,
    injuries: ['deep fight damage'],
    resources: { ...life.resources, money: 900, health: 58 },
    eventFlags: { clinicScout: true },
  };

  life = recover(life, 'clinic');

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'injury-crossroads');
});

test('high heat on age up can trigger a family intervention event', () => {
  let life = createNewLife({ gender: 'Male', seed: 66 });
  life = {
    ...life,
    identity: { ...life.identity, age: 18 },
    resources: { ...life.resources, health: 48 },
    relationships: { ...life.relationships, family: 70 },
    world: { ...life.world, heat: 38 },
    eventFlags: { coachNotice: true, bloodlineSpotter: true },
  };

  life = ageUp(life);

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'family-intervention');
});

test('enough wins queues an underground association invite event', () => {
  let life = createNewLife({ gender: 'Male', seed: 91 });
  life = {
    ...life,
    world: { ...life.world, hiddenWorld: true },
    resources: { ...life.resources, reputation: 85 },
    record: { wins: 5, losses: 0, kos: 3 },
  };

  life = ageUp(life);

  assert.ok(life.pendingEvent);
  assert.equal(life.pendingEvent.id, 'association-invite');
});

test('accepting association invite unlocks tournament association state', () => {
  let life = createNewLife({ gender: 'Female', seed: 92 });
  life = {
    ...life,
    pendingEvent: {
      id: 'association-invite',
      choices: [
        {
          id: 'sign-contract',
          label: 'Sign',
          result: 'Signed.',
          effects: { association: 'Obsidian Ring Association', world: { league: 'Obsidian Ring Association', heat: 18 }, resources: { reputation: 20 } },
        },
      ],
    },
  };

  const next = resolveEventChoice(life, 'sign-contract');

  assert.equal(next.association, 'Obsidian Ring Association');
  assert.equal(next.world.league, 'Obsidian Ring Association');
});

test('association members unlock true monster tournament fights with insane stats', () => {
  const life = {
    ...createNewLife({ gender: 'Male', seed: 93 }),
    association: 'Obsidian Ring Association',
    world: { ...createNewLife({ gender: 'Male', seed: 93 }).world, hiddenWorld: true, league: 'Obsidian Ring Association' },
    resources: { ...createNewLife({ gender: 'Male', seed: 93 }).resources, reputation: 180 },
    record: { wins: 10, losses: 0, kos: 6 },
    identity: { ...createNewLife({ gender: 'Male', seed: 93 }).identity, age: 22 },
  };

  const tournamentFights = getAvailableFights(life).filter((fight) => fight.opponent.tier === 'Association Tournament');

  assert.ok(tournamentFights.length >= 3);
  assert.ok(tournamentFights.every((fight) => fight.opponent.power >= 520));
});

test('standing grapple menu is takedowns and successful takedowns create ground state', () => {
  const base = createNewLife({ gender: 'Male', seed: 12001 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 900,
      speed: 850,
      durability: 700,
      technique: 950,
      fightIq: 700,
      willpower: 650,
      reflexes: 650,
      flexibility: 900,
      aggression: 450,
      control: 850,
    },
    techniques: { striking: 0, grappling: 900, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 100 },
  };
  const fight = startFight(fighter, 'localBrawler');
  const standingMoves = getUnlockedFightMoves(fight, 'grapple');

  assert.ok(standingMoves.length > 0);
  assert.ok(standingMoves.every((move) => move.groundRole === 'takedown'));

  const next = takeFightTurn(fight, 'singleLegEntry');

  assert.equal(next.activeFight.grappling.phase, 'ground');
  assert.equal(next.activeFight.grappling.top, 'player');
  assert.match(next.activeFight.grappling.lastTransition, /Takedown:/);
});

test('grounded fight locks standing tactics and shows submissions plus ground-and-pound from top', () => {
  const fighter = {
    ...createNewLife({ gender: 'Male', seed: 12002 }),
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
  };
  const life = startFight(fighter, 'localBrawler');
  life.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'mount',
    lastTransition: 'Takedown: test control.',
  };

  const pressureMoves = getUnlockedFightMoves(life, 'pressure');
  const grappleMoves = getUnlockedFightMoves(life, 'grapple');

  assert.ok(pressureMoves.every((move) => move.disabledReason.includes('Grounded')));
  assert.ok(grappleMoves.length > 0);
  assert.ok(grappleMoves.some((move) => move.groundRole === 'submission'));
  assert.ok(grappleMoves.some((move) => move.groundRole === 'groundPound'));
  assert.ok(grappleMoves.every((move) => ['submission', 'groundPound'].includes(move.groundRole)));
});

test('bottom position shows reversals and get-ups, which can flip or stand the fight', () => {
  const base = createNewLife({ gender: 'Male', seed: 12003 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 850,
      speed: 900,
      durability: 700,
      technique: 950,
      fightIq: 750,
      willpower: 650,
      reflexes: 800,
      flexibility: 950,
      aggression: 350,
      control: 900,
    },
    techniques: { striking: 0, grappling: 950, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 100 },
  };
  const bottomLife = startFight(fighter, 'localBrawler');
  bottomLife.activeFight.grappling = {
    phase: 'ground',
    top: 'opponent',
    position: 'sideControl',
    lastTransition: 'Takedown: test bottom.',
  };

  const bottomMoves = getUnlockedFightMoves(bottomLife, 'grapple');
  assert.ok(bottomMoves.some((move) => move.groundRole === 'reversal'));
  assert.ok(bottomMoves.some((move) => move.groundRole === 'getUp'));

  const reversed = takeFightTurn(bottomLife, 'hipSwitch');
  assert.equal(reversed.activeFight.grappling.phase, 'ground');
  assert.equal(reversed.activeFight.grappling.top, 'player');
  assert.match(reversed.activeFight.grappling.lastTransition, /Reversal:/);

  const getUpLife = startFight(fighter, 'localBrawler');
  getUpLife.activeFight.grappling = {
    phase: 'ground',
    top: 'opponent',
    position: 'halfGuard',
    lastTransition: 'Takedown: test bottom.',
  };
  const stoodUp = takeFightTurn(getUpLife, 'technicalStandUp');
  assert.equal(stoodUp.activeFight.grappling.phase, 'standing');
  assert.match(stoodUp.activeFight.grappling.lastTransition, /Get up:/);
});

test('grappling skill improves bottom get-up success', () => {
  const base = createNewLife({ gender: 'Male', seed: 12032 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 20, losses: 0, kos: 10 },
    resources: { ...base.resources, reputation: 500, energy: 100 },
    stats: {
      strength: 100,
      speed: 100,
      durability: 100,
      technique: 100,
      fightIq: 100,
      willpower: 100,
      reflexes: 100,
      flexibility: 100,
      aggression: 100,
      control: 100,
    },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
  };
  const bottomState = {
    phase: 'ground',
    top: 'opponent',
    position: 'mount',
    lastTransition: 'Takedown: test bottom.',
  };
  const lowGrappling = startFight({ ...fighter, techniques: { striking: 0, grappling: 0, defense: 0 } }, 'warehouseChamp');
  lowGrappling.activeFight.grappling = bottomState;
  lowGrappling.activeFight.meters.playerStamina = 60;
  lowGrappling.activeFight.meters.opponentStamina = 90;
  const highGrappling = startFight({ ...fighter, techniques: { striking: 0, grappling: 150, defense: 0 } }, 'warehouseChamp');
  highGrappling.activeFight.grappling = bottomState;
  highGrappling.activeFight.meters.playerStamina = 60;
  highGrappling.activeFight.meters.opponentStamina = 90;

  const denied = takeFightTurn(lowGrappling, 'technicalStandUp');
  const escaped = takeFightTurn(highGrappling, 'technicalStandUp');

  assert.equal(denied.activeFight.grappling.phase, 'ground');
  assert.match(denied.activeFight.grappling.lastTransition, /Get up denied:/);
  assert.equal(escaped.activeFight.grappling.phase, 'standing');
  assert.match(escaped.activeFight.grappling.lastTransition, /Get up:/);
});

test('bottom position unlocks conserve survival moves that reduce ground damage', () => {
  const base = createNewLife({ gender: 'Male', seed: 12031 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    stats: {
      strength: 500,
      speed: 620,
      durability: 760,
      technique: 720,
      fightIq: 680,
      willpower: 820,
      reflexes: 650,
      flexibility: 850,
      aggression: 300,
      control: 860,
    },
    techniques: { striking: 0, grappling: 800, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 100 },
  };
  const bottomLife = startFight(fighter, 'schoolWrestler');
  bottomLife.activeFight.grappling = {
    phase: 'ground',
    top: 'opponent',
    position: 'mount',
    lastTransition: 'Enemy takedown: test bottom.',
  };

  const conserveMoves = getUnlockedFightMoves(bottomLife, 'conserve');
  const pressureMoves = getUnlockedFightMoves(bottomLife, 'pressure');
  assert.ok(conserveMoves.length > 0);
  assert.ok(conserveMoves.every((move) => move.groundRole === 'bottomConserve'));
  assert.ok(pressureMoves.every((move) => move.disabledReason.includes('Grounded')));

  const next = takeFightTurn(bottomLife, 'closedGuardShell');
  const exchange = next.activeFight.exchanges[0];
  assert.equal(exchange.tactic, 'conserve');
  assert.match(exchange.groundTransition, /Bottom survival:/);
  assert.ok(exchange.enemyDamage < exchange.baseEnemyDamage);
});

test('ground-and-pound from top deals damage without leaving dominant position by default', () => {
  const base = createNewLife({ gender: 'Male', seed: 12032 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    stats: {
      strength: 1050,
      speed: 700,
      durability: 850,
      technique: 850,
      fightIq: 800,
      willpower: 700,
      reflexes: 650,
      flexibility: 700,
      aggression: 950,
      control: 950,
    },
    techniques: { striking: 0, grappling: 1000, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 100 },
  };
  const topLife = startFight(fighter, 'localBrawler');
  topLife.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'mount',
    lastTransition: 'Takedown: test top.',
  };

  const next = takeFightTurn(topLife, 'posturedHammerfists');
  const exchange = next.activeFight.exchanges[0];
  assert.equal(exchange.moveId, 'posturedHammerfists');
  assert.match(exchange.groundTransition, /Ground-and-pound:/);
  assert.ok(exchange.playerDamage > 0);
  assert.equal(next.activeFight.grappling.phase, 'ground');
});

test('submissions from stronger positions can finish better than weaker positions', () => {
  const base = createNewLife({ gender: 'Male', seed: 12004 });
  const fighter = {
    ...base,
    stats: {
      strength: 700,
      speed: 650,
      durability: 700,
      technique: 1100,
      fightIq: 800,
      willpower: 700,
      reflexes: 650,
      flexibility: 1100,
      aggression: 400,
      control: 1100,
    },
    techniques: { striking: 0, grappling: 1200, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 100 },
  };
  const halfGuard = startFight(fighter, 'localBrawler');
  halfGuard.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'halfGuard',
    lastTransition: 'Takedown: test top.',
  };
  const backControl = startFight(fighter, 'localBrawler');
  backControl.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'backControl',
    lastTransition: 'Takedown: test top.',
  };

  const weak = takeFightTurn(halfGuard, 'armTriangle');
  const strong = takeFightTurn(backControl, 'rearNakedChoke');

  assert.ok(strong.activeFight.exchanges[0].playerDamage >= weak.activeFight.exchanges[0].playerDamage);
  assert.ok(strong.activeFight.exchanges[0].submissionFinishChance > weak.activeFight.exchanges[0].submissionFinishChance);
});

test('special fighters resist submissions better than normal opponents', () => {
  const base = createNewLife({ gender: 'Male', seed: 12033 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 24 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 12, losses: 0, kos: 8 },
    resources: { ...base.resources, energy: 100, reputation: 300 },
    stats: {
      strength: 700,
      speed: 700,
      durability: 700,
      technique: 900,
      fightIq: 760,
      willpower: 720,
      reflexes: 700,
      flexibility: 900,
      aggression: 450,
      control: 920,
    },
    techniques: { striking: 0, grappling: 900, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
  };
  const normal = startFight(fighter, 'warehouseChamp');
  normal.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'backControl',
    lastTransition: 'Takedown: test top.',
  };
  normal.activeFight.meters.opponentHealth = Math.round(normal.activeFight.meters.maxOpponentHealth * 0.35);
  const special = startFight(fighter, 'gokiShibukawae');
  special.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'backControl',
    lastTransition: 'Takedown: test top.',
  };
  special.activeFight.meters.opponentHealth = Math.round(special.activeFight.meters.maxOpponentHealth * 0.35);

  const normalExchange = takeFightTurn(normal, 'rearNakedChoke').activeFight.exchanges[0];
  const specialExchange = takeFightTurn(special, 'rearNakedChoke').activeFight.exchanges[0];

  assert.ok(specialExchange.submissionFinishChance < normalExchange.submissionFinishChance);
  assert.ok(specialExchange.submissionFinishChance <= 0.55);
});

test('strong grapplers can scramble out even without rolling an escape move', () => {
  const base = createNewLife({ gender: 'Male', seed: 12034 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 10, losses: 0, kos: 5 },
    resources: { ...base.resources, energy: 100, reputation: 120 },
    stats: {
      strength: 360,
      speed: 340,
      durability: 360,
      technique: 360,
      fightIq: 320,
      willpower: 340,
      reflexes: 310,
      flexibility: 340,
      aggression: 240,
      control: 360,
    },
    techniques: { striking: 0, grappling: 360, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
  };
  const life = startFight(fighter, 'gokiShibukawae');
  life.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'mount',
    lastTransition: 'Takedown: test top.',
  };

  const next = takeFightTurn(life, 'armTriangle');
  const transition = next.activeFight.exchanges[0].groundTransition;

  assert.match(transition, /Enemy (reversal|get up|scramble):/);
  assert.notEqual(next.activeFight.grappling.top, 'player');
});

test('ground-and-pound needs a bigger margin to climb against strong grapplers', () => {
  const base = createNewLife({ gender: 'Male', seed: 12035 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    record: { wins: 8, losses: 0, kos: 4 },
    resources: { ...base.resources, energy: 100, reputation: 140 },
    stats: {
      strength: 900,
      speed: 650,
      durability: 760,
      technique: 760,
      fightIq: 680,
      willpower: 680,
      reflexes: 620,
      flexibility: 700,
      aggression: 850,
      control: 780,
    },
    techniques: { striking: 0, grappling: 720, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
  };
  const life = startFight(fighter, 'gokiShibukawae');
  life.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'halfGuard',
    lastTransition: 'Takedown: test top.',
  };

  const next = takeFightTurn(life, 'posturedHammerfists');
  const transition = next.activeFight.exchanges[0].groundTransition;

  assert.doesNotMatch(transition, /lets you climb/);
});

test('enemy grapplers can reverse or stand up when trapped on bottom', () => {
  const base = createNewLife({ gender: 'Male', seed: 12005 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 70,
      speed: 70,
      durability: 80,
      technique: 65,
      fightIq: 60,
      willpower: 80,
      reflexes: 70,
      flexibility: 65,
      aggression: 40,
      control: 65,
    },
    techniques: { striking: 0, grappling: 0, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 45, reputation: 100 },
    record: { wins: 6, losses: 0, kos: 3 },
  };
  const life = startFight(fighter, 'gokiShibukawae');
  life.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'halfGuard',
    lastTransition: 'Takedown: test top.',
  };

  const next = takeFightTurn(life, 'armTriangle');
  const grappling = next.activeFight.grappling;

  assert.ok(
    grappling.phase === 'standing' || grappling.top === 'opponent',
    `expected enemy escape or reversal, got ${JSON.stringify(grappling)}`
  );
  assert.match(next.activeFight.exchanges[0].groundTransition, /Enemy (reversal|get up):/);
});

test('ground escape narration does not describe enemy get-ups as attacks or footwork dodges', () => {
  const base = createNewLife({ gender: 'Male', seed: 12006 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 60,
      speed: 60,
      durability: 75,
      technique: 60,
      fightIq: 60,
      willpower: 80,
      reflexes: 60,
      flexibility: 60,
      aggression: 35,
      control: 60,
    },
    techniques: { striking: 0, grappling: 0, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 35, reputation: 100 },
    record: { wins: 6, losses: 0, kos: 3 },
  };
  const life = startFight(fighter, 'gokiShibukawae');
  life.activeFight.grappling = {
    phase: 'ground',
    top: 'player',
    position: 'halfGuard',
    lastTransition: 'Takedown: test top.',
  };

  const next = takeFightTurn(life, 'armTriangle');
  const text = next.activeFight.exchanges[0].text;

  assert.doesNotMatch(text, /Enemy attack: .*Base-Build Stand/);
  assert.doesNotMatch(text, /footwork makes the attack/);
  assert.match(text, /Enemy (escape|reversal):/);
});

test('grounded bottom narration describes enemy submissions as submission threats', () => {
  const base = createNewLife({ gender: 'Female', seed: 12007 });
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 22 },
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 80,
      speed: 80,
      durability: 90,
      technique: 80,
      fightIq: 80,
      willpower: 90,
      reflexes: 80,
      flexibility: 80,
      aggression: 45,
      control: 80,
    },
    techniques: { striking: 0, grappling: 0, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 55, reputation: 100 },
    record: { wins: 6, losses: 0, kos: 3 },
  };
  const life = startFight(fighter, 'gokiShibukawae');
  life.activeFight.grappling = {
    phase: 'ground',
    top: 'opponent',
    position: 'mount',
    lastTransition: 'Takedown: test bottom.',
  };

  const next = takeFightTurn(life, 'hipSwitch');
  const text = next.activeFight.exchanges[0].text;

  assert.match(text, /Enemy submission threat:/);
  assert.doesNotMatch(text, /Enemy attack: .*Choke/);
});

test('takedown dodge narration describes takedown defense instead of generic enemy dodge', () => {
  const base = createNewLife({ gender: 'Male', seed: 12100 });
  let found = null;
  const fighter = {
    ...base,
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 120,
      speed: 25,
      durability: 110,
      technique: 80,
      fightIq: 50,
      willpower: 90,
      reflexes: 20,
      flexibility: 55,
      aggression: 70,
      control: 75,
    },
    techniques: { striking: 0, grappling: 30, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 80, reputation: 100 },
    record: { wins: 6, losses: 0, kos: 3 },
  };

  for (let seed = 12100; seed < 12350; seed += 1) {
    const attempt = takeFightTurn(startFight({ ...fighter, rngSeed: seed }, 'ghostStepAcolyte'), 'singleLegEntry');
    const exchange = attempt.activeFight.exchanges[0];
    if (exchange.opponentDodged) {
      found = exchange;
      break;
    }
  }

  assert.ok(found, 'expected to find a dodged takedown exchange');
  assert.match(found.text, /Takedown defense:/);
  assert.doesNotMatch(found.text, /Enemy dodge: .*attack miss clean/);
});

test('ground submission critical narration describes a submission instead of a strike', () => {
  const base = createNewLife({ gender: 'Female', seed: 12380 });
  let found = null;
  const fighter = {
    ...base,
    identity: { ...base.identity, age: 24 },
    world: { ...base.world, hiddenWorld: true },
    stats: {
      strength: 260,
      speed: 180,
      durability: 210,
      technique: 900,
      fightIq: 520,
      willpower: 260,
      reflexes: 180,
      flexibility: 500,
      aggression: 120,
      control: 900,
    },
    techniques: { striking: 0, grappling: 500, defense: 0 },
    unlockedSkills: [...Object.keys(FIGHT_MOVES)],
    resources: { ...base.resources, energy: 100, reputation: 100 },
    record: { wins: 12, losses: 0, kos: 8 },
  };

  for (let seed = 12380; seed < 12680; seed += 1) {
    const life = startFight({ ...fighter, rngSeed: seed }, 'gokiShibukawae');
    life.activeFight.grappling = {
      phase: 'ground',
      top: 'player',
      position: 'backControl',
      lastTransition: 'Takedown: test top.',
    };
    const attempt = takeFightTurn(life, 'rearNakedChoke');
    const exchange = attempt.activeFight.exchanges[0];
    if (exchange.critical) {
      found = exchange;
      break;
    }
  }

  assert.ok(found, 'expected to find a critical submission exchange');
  assert.match(found.text, /Critical submission:/);
  assert.doesNotMatch(found.text, /Critical strike:/);
});
