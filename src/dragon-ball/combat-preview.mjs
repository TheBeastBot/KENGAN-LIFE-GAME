import { CARDS, ORIGINS } from './data.mjs';
import { enemyIntent } from './combat.mjs';
import { towerCardAtRank } from './tower.mjs';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function cardForState(state, id) {
  return CARDS[id]?.towerOnly ? towerCardAtRank(id, state.tower?.cards?.[id]) : CARDS[id];
}

function scaledDamage(state, combat, base) {
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  const multiplier = (form?.effect.powerMultiplier ?? 1) * (form ? 1 + (combat.player.formBoost ?? 0) : 1);
  const raw = base + state.stats.power * 0.55 + combat.player.focus * 2;
  const weakMultiplier = combat.player.weak > 0 ? 0.75 : 1;
  return Math.max(1, Math.round(raw * multiplier * weakMultiplier - combat.enemy.defense * 0.45));
}

function lateEnemyPressure(state, encounter) {
  const lateAge = clamp((state.age - 20) / 80, 0, 1);
  const eternalCycle = state.age >= 100 ? Math.max(0, state.ageCycle ?? 0) : 0;
  const towerDepth = clamp(((encounter.towerFloor ?? 0) - 10) / 90, 0, 1);
  return {
    defensePenetration: clamp(Math.max(
      lateAge * 0.65 + eternalCycle * 0.03,
      towerDepth * 0.8
    ), 0, 0.9),
    minimumDamageRatio: clamp(Math.max(
      lateAge * 0.3 + eternalCycle * 0.03,
      towerDepth * 0.45
    ), 0, 0.75),
  };
}

function projectedEnemyAttack(state, combat, intent = combat.intent ?? enemyIntent(combat)) {
  if (intent.type === 'guard') {
    return {
      raw: 0,
      damage: 0,
      blocked: 0,
      healthAfter: combat.player.health,
    };
  }
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  const defenseMultiplier = (form?.effect.defenseMultiplier ?? 1) * (form ? 1 + (combat.player.formBoost ?? 0) : 1);
  const weakMultiplier = combat.enemy.weak > 0 ? 0.75 : 1;
  const speedMitigation = Math.min(0.2, state.stats.speed * 0.003);
  const pressure = lateEnemyPressure(state, combat.encounter);
  const incomingDamage = intent.damage * weakMultiplier * (1 - speedMitigation);
  const defenseReduction = state.stats.defense * 0.3 * defenseMultiplier * (1 - pressure.defensePenetration);
  const raw = Math.max(1, Math.round(Math.max(
    incomingDamage - defenseReduction,
    incomingDamage * pressure.minimumDamageRatio
  )));
  const effectiveBlock = Math.round(combat.player.block * (1 - (intent.pierce ?? 0)));
  const blocked = Math.min(effectiveBlock, raw);
  const damage = raw - blocked;
  let healthAfter = Math.max(0, combat.player.health - damage);
  if ((combat.player.burn ?? 0) > 0) healthAfter = Math.max(0, healthAfter - combat.player.burn * 2);
  if (state.origin === 'namekian' && healthAfter > 0) healthAfter = Math.min(combat.player.maxHealth, healthAfter + 3);
  return { raw, damage, blocked, healthAfter };
}

export function previewCardPlay(state, handIndex) {
  const combat = state.activeCombat;
  const id = combat?.hand?.[handIndex] ?? '';
  const item = cardForState(state, id);
  const base = {
    playable: false,
    reason: combat ? 'Card is unavailable.' : 'Finish the current combat first.',
    cardId: id,
    cardName: item?.name ?? '',
    kiCost: item?.cost ?? 0,
    currentKi: combat?.player?.ki ?? 0,
    damage: 0,
    blockGain: 0,
    healGain: 0,
    drawCount: 0,
    focusGain: 0,
    kiGain: 0,
    spiritGain: 0,
    appliesWeak: 0,
    clearsWeak: false,
    clearsBurn: false,
    exhausts: false,
    transformsTo: '',
    cooldownAges: item?.cooldownAges ?? 0,
  };
  if (!combat || !item) return base;
  if (item.type === 'injury') return { ...base, reason: 'Injury cards cannot be played.' };
  if (item.cost > combat.player.ki) return { ...base, reason: 'Not enough Ki.' };
  const missingHealth = combat.player.maxHealth - combat.player.health;
  const focusDamage = combat.player.focus * (item.effect.damagePerFocus ?? 0);
  const baseDamage = (item.effect.damage ?? 0) + Math.round(missingHealth * (item.effect.missingHealthDamage ?? 0)) + focusDamage;
  let damage = 0;
  let enemyBlock = combat.enemy.block;
  for (let hit = 0; hit < (item.effect.hits ?? 1); hit += 1) {
    const amount = item.effect.damage ? scaledDamage(state, { ...combat, enemy: { ...combat.enemy, block: enemyBlock } }, baseDamage) : 0;
    if (item.effect.ignoreBlock) {
      damage += amount;
    } else {
      const blocked = Math.min(enemyBlock, amount);
      enemyBlock -= blocked;
      damage += Math.max(0, amount - blocked);
    }
  }
  return {
    ...base,
    playable: true,
    reason: '',
    damage,
    blockGain: item.effect.block ? item.effect.block + Math.round(state.stats.defense * 0.35) : 0,
    healGain: item.effect.healPercent
      ? Math.ceil(combat.player.maxHealth * item.effect.healPercent)
      : item.effect.heal ? item.effect.heal + Math.round(state.stats.spirit * 0.25) : 0,
    drawCount: item.effect.draw ?? 0,
    focusGain: item.effect.focus ?? 0,
    kiGain: (item.effect.ki ?? 0) + (item.effect.maxKi ?? 0),
    spiritGain: item.effect.spirit ?? 0,
    appliesWeak: item.effect.weak ?? 0,
    clearsWeak: item.effect.clear === 'weak' || Boolean(item.effect.clearAll),
    clearsBurn: item.effect.clear === 'burn' || Boolean(item.effect.clearAll),
    exhausts: Boolean(item.effect.exhaust),
    transformsTo: item.type === 'form' ? item.name : '',
    cooldownAges: item.cooldownAges ?? 0,
  };
}

export function previewEnemyTurn(state) {
  const combat = state.activeCombat;
  if (!combat) {
    return {
      intentLabel: '',
      intentType: 'guard',
      rawIncomingDamage: 0,
      projectedDamage: 0,
      projectedBlocked: 0,
      projectedHealthAfter: state.currentHealth ?? 0,
      blockPiercePercent: 0,
      appliesWeak: 0,
      appliesBurn: 0,
      dodgeChance: 0,
      guardBlockGain: 0,
    };
  }
  const intent = combat.intent ?? enemyIntent(combat);
  const projection = projectedEnemyAttack(state, combat, intent);
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  return {
    intentLabel: intent.label,
    intentType: intent.type,
    rawIncomingDamage: intent.damage ?? 0,
    projectedDamage: projection.damage,
    projectedBlocked: projection.blocked,
    projectedHealthAfter: projection.healthAfter,
    blockPiercePercent: Math.round((intent.pierce ?? 0) * 100),
    appliesWeak: intent.weak ?? 0,
    appliesBurn: intent.burn ?? 0,
    dodgeChance: form?.effect.dodgeChance ?? 0,
    guardBlockGain: intent.type === 'guard' ? intent.block ?? 0 : 0,
  };
}

function chip(id, label, value, description) {
  return { id, label, value, description };
}

export function statusSummary(combat) {
  const player = [];
  const enemy = [];
  const form = combat?.player?.activeForm ? CARDS[combat.player.activeForm] : null;
  if (combat?.player?.block) player.push(chip('block', 'Block', combat.player.block, 'Reduces incoming attack damage before Health is lost.'));
  if (combat?.player?.focus) player.push(chip('focus', 'Focus', combat.player.focus, 'Adds damage to your attacks and fuels combo cards.'));
  if (combat?.player?.weak) player.push(chip('weak', 'Weak', combat.player.weak, 'Your outgoing damage is reduced until it expires.'));
  if (combat?.player?.burn) player.push(chip('burn', 'Burn', combat.player.burn, 'Takes damage at end of the enemy turn, then ticks down.'));
  if (combat?.player?.retainBlock) player.push(chip('retain-block', 'Retain Block', `${Math.round(combat.player.retainBlock * 100)}%`, 'Keeps part of unused Block next turn.'));
  if (form) player.push(chip('active-form', 'Active Form', form.name, 'Current transformation replaces any previous form for this battle.'));
  if (form?.effect.dodgeChance) player.push(chip('dodge', 'Dodge', `${Math.round(form.effect.dodgeChance * 100)}%`, 'Chance to avoid enemy attacks before damage is applied.'));
  if (form?.effect.drain) player.push(chip('ki-drain', 'Ki Drain', form.effect.drain, 'Reduces refreshed Ki at the start of each turn.'));

  if (combat?.enemy?.block) enemy.push(chip('block', 'Block', combat.enemy.block, 'Absorbs your attack damage before enemy Health is lost.'));
  if (combat?.enemy?.weak) enemy.push(chip('weak', 'Weak', combat.enemy.weak, 'Enemy outgoing damage is reduced until it expires.'));
  if (combat?.enemy?.burn) enemy.push(chip('burn', 'Burn', combat.enemy.burn, 'Burn pressure is active on this enemy.'));
  if (combat?.enemy?.regenPerTurn) enemy.push(chip('regeneration', 'Regeneration', combat.enemy.regenPerTurn, 'Heals after the enemy acts each turn.'));
  if (combat?.enemy?.guardRegen) enemy.push(chip('guard-regen', 'Guard Regen', combat.enemy.guardRegen, 'Heals when the enemy chooses a guard intent.'));
  if (combat?.enemy?.blockPierceBonus) enemy.push(chip('block-pierce', 'Block Pierce', `${Math.round(combat.enemy.blockPierceBonus * 100)}%`, 'A portion of your Block is ignored by enemy attacks.'));
  if (combat?.enemy?.kiPressure) enemy.push(chip('ki-pressure', 'Ki Pressure', combat.enemy.kiPressure, 'Reduces your starting Ki in this fight.'));
  if (combat?.enemy?.powerRamp) enemy.push(chip('power-ramp', 'Power Ramp', combat.enemy.powerRamp, 'Enemy Power rises as the fight drags on.'));
  return { player, enemy };
}

export const __previewInternals = { projectedEnemyAttack };
