import { CARDS, ORIGINS } from './data.mjs';
import { enemyForEncounter } from './campaign.mjs';
import { hashSeed, shuffle } from './random.mjs';
import { recordCombatDefeat, recordCombatVictory, validateDeck } from './state.mjs';
import {
  generateTowerEncounter, recordTowerDefeat, recordTowerVictory, towerCardAtRank,
} from './tower.mjs';

const clone = (value) => structuredClone(value);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function drawCards(combat, count) {
  for (let index = 0; index < count; index += 1) {
    if (!combat.drawPile.length) {
      if (!combat.discardPile.length) break;
      combat.shuffleCount += 1;
      combat.drawPile = shuffle(combat.discardPile, hashSeed(combat.seed, combat.turn, combat.shuffleCount));
      combat.discardPile = [];
    }
    combat.hand.push(combat.drawPile.shift());
  }
}

export function enemyIntent(combat) {
  const rage = Math.min(combat.enemy.special ? 0.55 : 0.38, Math.max(0, combat.turn - 1) * (combat.enemy.special ? 0.055 : 0.035));
  const towerPressure = Math.min(1.5, (combat.encounter.towerFloor ?? 0) * 0.008);
  const pressure = 1 + rage + combat.enemy.phase * 0.04 + towerPressure;
  const patterns = [
    { type: 'attack', label: 'Rush Attack', damage: Math.round(combat.enemy.power * pressure) },
    { type: 'guard', label: 'Guard and Charge', block: 11 + Math.round(combat.enemy.defense * 1.2), focus: 1 },
    { type: 'attack', label: 'Heavy Ki Blast', damage: Math.round(combat.enemy.power * 1.42 * pressure), burn: 1 },
    { type: 'attack', label: 'Feinting Combo', damage: Math.round(combat.enemy.power * 0.9 * pressure), weak: 1 },
  ];
  if (combat.enemy.special) {
    patterns.push({
      type: 'attack',
      label: 'Limit-Breaking Ultimate',
      damage: Math.round(combat.enemy.power * 1.72 * pressure),
      burn: 1,
      weak: 1,
      pierce: 0.5,
    });
  }
  return patterns[(combat.turn - 1 + combat.enemy.phase) % patterns.length];
}

export function startDragonBallCombat(state, encounterId) {
  const towerEncounter = state.tower?.active ? generateTowerEncounter(state) : null;
  const encounter = state.encounters.find((item) => item.id === encounterId) ??
    (towerEncounter?.id === encounterId ? towerEncounter : null);
  if (!encounter || !['fighter', 'specialFight'].includes(encounter.type)) return state;
  if (state.tower?.active && encounter.source !== 'tower') return state;
  const validation = validateDeck(state);
  if (!validation.valid) return state;
  const seed = hashSeed(state.seed, encounter.id, state.history.length);
  const originKi = ORIGINS[state.origin].id === 'android' ? 4 : 3;
  const maxKi = originKi + Math.min(2, Math.floor(state.stats.ki / 20));
  const combat = {
    seed,
    encounter,
    turn: 1,
    shuffleCount: 0,
    player: {
      health: state.currentHealth,
      maxHealth: state.stats.health,
      block: 0,
      ki: maxKi,
      maxKi,
      focus: 0,
      spirit: state.stats.spirit,
      retainBlock: 0,
      weak: 0,
      burn: 0,
      activeForm: null,
      formBoost: 0,
    },
    enemy: { ...enemyForEncounter(state, encounter), block: 0, weak: 0, burn: 0 },
    drawPile: shuffle([
      ...state.deck,
      ...state.injuries,
      ...(encounter.source === 'tower' ? state.tower.loadout : []),
    ], seed),
    discardPile: [],
    exhaustPile: [],
    hand: [],
    cooldownsTriggered: {},
    log: [`${encounter.name} steps into the arena.`],
    intent: null,
  };
  drawCards(combat, (state.origin === 'earthling' ? 6 : 5) + Math.min(1, Math.floor(state.stats.speed / 30)));
  combat.intent = enemyIntent(combat);
  return { ...state, activeCombat: combat };
}

function scaledDamage(state, combat, base) {
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  const multiplier = (form?.effect.powerMultiplier ?? 1) * (form ? 1 + (combat.player.formBoost ?? 0) : 1);
  const raw = base + state.stats.power * 0.55 + combat.player.focus * 2;
  const weakMultiplier = combat.player.weak > 0 ? 0.75 : 1;
  return Math.max(1, Math.round(raw * multiplier * weakMultiplier - combat.enemy.defense * 0.45));
}

function dealToEnemy(combat, amount, ignoreBlock = false) {
  if (ignoreBlock) {
    combat.enemy.health = Math.max(0, combat.enemy.health - amount);
    return amount;
  }
  const blocked = Math.min(combat.enemy.block, amount);
  combat.enemy.block -= blocked;
  const dealt = Math.max(0, amount - blocked);
  combat.enemy.health = Math.max(0, combat.enemy.health - dealt);
  return dealt;
}

export function playCombatCard(state, handIndex) {
  if (!state.activeCombat) return state;
  const next = clone(state);
  const combat = next.activeCombat;
  const id = combat.hand[handIndex];
  const item = CARDS[id]?.towerOnly ? towerCardAtRank(id, next.tower?.cards?.[id]) : CARDS[id];
  if (!item || item.type === 'injury' || item.cost > combat.player.ki) return state;
  combat.player.ki -= item.cost;
  combat.hand.splice(handIndex, 1);
  (item.effect.exhaust ? combat.exhaustPile : combat.discardPile).push(id);
  let message = item.name;
  if (item.effect.damage) {
    const missingHealth = combat.player.maxHealth - combat.player.health;
    const focusDamage = combat.player.focus * (item.effect.damagePerFocus ?? 0);
    const baseDamage = item.effect.damage + Math.round(missingHealth * (item.effect.missingHealthDamage ?? 0)) + focusDamage;
    let totalDealt = 0;
    for (let hit = 0; hit < (item.effect.hits ?? 1); hit += 1) {
      totalDealt += dealToEnemy(combat, scaledDamage(next, combat, baseDamage), item.effect.ignoreBlock);
    }
    if (item.effect.consumeFocus) combat.player.focus = 0;
    message += ` dealt ${totalDealt}`;
  }
  if (item.effect.block) combat.player.block += item.effect.block + Math.round(next.stats.defense * 0.35);
  if (item.effect.heal) combat.player.health = Math.min(combat.player.maxHealth, combat.player.health + item.effect.heal + Math.round(next.stats.spirit * 0.25));
  if (item.effect.healPercent) combat.player.health = Math.min(combat.player.maxHealth, combat.player.health + Math.ceil(combat.player.maxHealth * item.effect.healPercent));
  if (item.effect.draw) drawCards(combat, item.effect.draw);
  if (item.effect.maxKi) {
    combat.player.maxKi += item.effect.maxKi;
    combat.player.ki += item.effect.maxKi;
  }
  if (item.effect.ki) combat.player.ki = Math.min(combat.player.maxKi + 2, combat.player.ki + item.effect.ki);
  if (item.effect.spirit) combat.player.spirit = Math.min(next.stats.spirit + 5, combat.player.spirit + item.effect.spirit);
  if (item.effect.focus) combat.player.focus += item.effect.focus;
  if (item.effect.formSupport) combat.player.formBoost += item.effect.formSupport;
  if (item.effect.weak) combat.enemy.weak += item.effect.weak;
  if (item.effect.clear) combat.player[item.effect.clear] = 0;
  if (item.effect.clearAll) {
    combat.player.weak = 0;
    combat.player.burn = 0;
  }
  if (item.effect.retainBlock) combat.player.retainBlock = Math.max(combat.player.retainBlock, item.effect.retainBlock);
  if (item.type === 'form') {
    combat.player.activeForm = item.id;
    message += ' transformed';
  }
  if (item.cooldownAges) combat.cooldownsTriggered[item.id] = item.cooldownAges;
  combat.log.unshift(`${message}.`);
  if (combat.enemy.health <= 0) {
    next.currentHealth = combat.player.health;
    return combat.encounter.source === 'tower'
      ? recordTowerVictory(next, combat.encounter, combat.cooldownsTriggered)
      : recordCombatVictory(next, combat.encounter, combat.cooldownsTriggered);
  }
  return next;
}

export function endCombatTurn(state) {
  if (!state.activeCombat) return state;
  const next = clone(state);
  const combat = next.activeCombat;
  const intent = combat.intent;
  combat.discardPile.push(...combat.hand);
  combat.hand = [];
  combat.enemy.block = 0;
  if (intent.type === 'guard') {
    combat.enemy.block += intent.block;
    combat.enemy.phase += intent.focus ?? 0;
    combat.log.unshift(`${combat.enemy.name} gains ${intent.block} Block.`);
  } else {
    const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
    const defenseMultiplier = (form?.effect.defenseMultiplier ?? 1) * (form ? 1 + (combat.player.formBoost ?? 0) : 1);
    const weakMultiplier = combat.enemy.weak > 0 ? 0.75 : 1;
    const speedMitigation = Math.min(0.2, state.stats.speed * 0.003);
    const raw = Math.max(1, Math.round(
      intent.damage * weakMultiplier * (1 - speedMitigation) - state.stats.defense * 0.3 * defenseMultiplier
    ));
    const effectiveBlock = Math.round(combat.player.block * (1 - (intent.pierce ?? 0)));
    const blocked = Math.min(effectiveBlock, raw);
    const damage = raw - blocked;
    combat.player.block = Math.max(0, combat.player.block - blocked);
    combat.player.health = Math.max(0, combat.player.health - damage);
    if (intent.weak) combat.player.weak += intent.weak;
    if (intent.burn) combat.player.burn += intent.burn;
    if (state.origin === 'saiyan' && damage > 0) combat.player.focus += 1;
    combat.log.unshift(`${combat.enemy.name} uses ${intent.label} for ${damage} damage.`);
  }
  if (combat.player.burn > 0) {
    combat.player.health = Math.max(0, combat.player.health - combat.player.burn * 2);
    combat.player.burn = Math.max(0, combat.player.burn - 1);
  }
  if (state.origin === 'namekian') combat.player.health = Math.min(combat.player.maxHealth, combat.player.health + 3);
  combat.player.block = Math.round(combat.player.block * (combat.player.retainBlock ?? 0));
  combat.player.retainBlock = 0;
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  if (form?.effect.drain) {
    combat.player.spirit = Math.max(0, combat.player.spirit - form.effect.drain);
    if (combat.player.spirit === 0) combat.player.activeForm = null;
  }
  if (combat.player.health <= 0) {
    return combat.encounter.source === 'tower'
      ? recordTowerDefeat(next, combat.encounter)
      : recordCombatDefeat(next, combat.encounter);
  }
  combat.enemy.weak = Math.max(0, combat.enemy.weak - 1);
  combat.player.weak = Math.max(0, combat.player.weak - 1);
  combat.turn += 1;
  combat.player.ki = combat.player.maxKi;
  drawCards(combat, 5);
  combat.intent = enemyIntent(combat);
  next.currentHealth = clamp(combat.player.health, 0, next.stats.health);
  return next;
}
