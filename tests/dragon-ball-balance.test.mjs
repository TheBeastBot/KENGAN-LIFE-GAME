import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';

import { ORIGINS } from '../src/dragon-ball/data.mjs';
import {
  greedyPolicy, simulateCombat, simulateOriginBand, summarizeSimulation,
} from '../src/dragon-ball/balance-sim.mjs';
import { createDragonBallRun } from '../src/dragon-ball/state.mjs';
import { startDragonBallCombat } from '../src/dragon-ball/combat.mjs';

const seeds = Array.from({ length: 50 }, (_, index) => index + 1);

function assertBand(resultsByOrigin, { min = 0, max = 1 }) {
  const summaries = Object.fromEntries(Object.entries(resultsByOrigin).map(([origin, results]) => [origin, summarizeSimulation(results)]));
  for (const [origin, summary] of Object.entries(summaries)) {
    assert.ok(summary.winRate >= min, `${origin} win rate ${summary.winRate} below ${min}`);
    assert.ok(summary.winRate <= max, `${origin} win rate ${summary.winRate} above ${max}`);
  }
  const turns = Object.values(summaries).map((summary) => Math.max(0.1, summary.averageTurns));
  assert.ok(Math.max(...turns) <= Math.min(...turns) * 2.75, `turn spread too wide: ${JSON.stringify(summaries)}`);
  return summaries;
}

test('balance simulation policy can play a deterministic combat result', () => {
  const state = createDragonBallRun({ origin: 'saiyan', seed: 5, lineageOverride: 'standard' });
  const combatState = startDragonBallCombat(state, 'age-6-fighter');
  const result = simulateCombat({ state: combatState, encounterId: 'age-6-fighter', policy: greedyPolicy });
  assert.equal(result.origin, 'saiyan');
  assert.equal(result.age, 6);
  assert.equal(result.encounterId, 'age-6-fighter');
  assert.ok(result.turns > 0 && result.turns <= 40);
});

test('campaign balance bands stay challenging but fair across origins', () => {
  const started = performance.now();
  const origins = Object.keys(ORIGINS);
  const age6 = Object.fromEntries(origins.map((origin) => [origin, simulateOriginBand({ origin, age: 6, encounterType: 'fighter', seeds })]));
  assertBand(age6, { min: 0.9 });

  const age7Special = Object.fromEntries(origins.map((origin) => [origin, simulateOriginBand({ origin, age: 7, encounterType: 'specialFight', seeds })]));
  assertBand(age7Special, { min: 0.75 });

  const age10 = Object.fromEntries(origins.map((origin) => [origin, simulateOriginBand({ origin, age: 10, encounterType: 'fighter', seeds })]));
  assertBand(age10, { min: 0.65, max: 1 });

  const age10Special = Object.fromEntries(origins.map((origin) => [origin, simulateOriginBand({ origin, age: 10, encounterType: 'specialFight', seeds })]));
  assertBand(age10Special, { min: 0.45, max: 0.95 });
  assert.ok(performance.now() - started < 2000, 'balance simulation exceeded 2 seconds');
});

test('tower balance bands scale from opening floors to first boss', () => {
  const floor1 = simulateOriginBand({ origin: 'saiyan', age: 8, encounterType: 'tower', seeds, towerFloor: 1 });
  const floor5 = simulateOriginBand({ origin: 'saiyan', age: 10, encounterType: 'tower', seeds, towerFloor: 5 });
  assert.ok(summarizeSimulation(floor1).winRate >= 0.75);
  const floor5Summary = summarizeSimulation(floor5);
  assert.ok(floor5Summary.winRate >= 0.35, `floor 5 win rate ${floor5Summary.winRate} below target`);
  assert.ok(floor5Summary.winRate <= 0.9, `floor 5 win rate ${floor5Summary.winRate} above target`);
});
