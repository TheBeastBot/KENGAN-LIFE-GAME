import { CARDS, LEGENDARY_SAIYAN_LINEAGE, ORIGINS } from './data.mjs';
import { enemyForEncounter } from './campaign.mjs';
import { createRng, hashSeed, shuffle } from './random.mjs';
import { recordCombatDefeat, recordCombatVictory, validateDeck } from './state.mjs';
import {
  generateTowerEncounter, recordTowerDefeat, recordTowerVictory, towerCardAtRank,
} from './tower.mjs';
import {
  ABILITY_CATALOG, abilityRank, scaledAbilityEffect,
} from './abilities.mjs';
import { fail, ok } from './action-result.mjs';

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
  const comboTempo = combat.turn >= 4 ? combat.enemy.comboTempo ?? 0 : 0;
  const rampPower = Math.floor(Math.max(0, combat.turn - 1) / 2) * (combat.enemy.powerRamp ?? 0);
  const effectivePower = combat.enemy.power + rampPower;
  const pressure = 1 + rage + combat.enemy.phase * 0.04 + towerPressure + comboTempo;
  const pierce = combat.enemy.blockPierceBonus ?? 0;
  const labelPrefix = combat.enemy.transformationName ? `${combat.enemy.transformationName}: ` : '';
  const patterns = [
    { type: 'attack', label: `${labelPrefix}${pierce ? 'Armor Breaker Rush' : 'Rush Attack'}`, damage: Math.round(effectivePower * pressure), pierce },
    { type: 'guard', label: 'Guard and Charge', block: 11 + Math.round(combat.enemy.defense * 1.2), focus: 1 },
    { type: 'attack', label: `${labelPrefix}Heavy Ki Blast`, damage: Math.round(effectivePower * 1.42 * pressure), burn: combat.enemy.burningAura ? 2 : 1, pierce },
    { type: 'attack', label: `${labelPrefix}Feinting Combo`, damage: Math.round(effectivePower * 0.9 * pressure), weak: 1, pierce },
  ];
  if (combat.enemy.special) {
    patterns.push({
      type: 'attack',
      label: combat.enemy.ultimatePlus ? `${labelPrefix}Limit-Breaking Ultimate+` : 'Limit-Breaking Ultimate',
      damage: Math.round(effectivePower * (combat.enemy.ultimatePlus ? 2.1 : 1.72) * pressure),
      burn: combat.enemy.ultimatePlus ? 2 : 1,
      weak: combat.enemy.ultimatePlus ? 2 : 1,
      pierce: Math.min(0.9, 0.5 + (combat.enemy.ultimatePlus ? 0.25 : 0) + pierce),
    });
  }
  return patterns[(combat.turn - 1 + combat.enemy.phase) % patterns.length];
}

export function attackIsDodged(combat) {
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  const dodgeChance = form?.effect.dodgeChance ?? 0;
  if (dodgeChance <= 0) return false;
  const roll = createRng(hashSeed(combat.seed, combat.turn, combat.encounter.id, 'dodge'))();
  return roll < dodgeChance;
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
  const originKi = ORIGINS[state.origin].id === 'android' ||
    state.saiyanLineage === LEGENDARY_SAIYAN_LINEAGE ? 4 : 3;
  const maxKi = originKi + Math.min(2, Math.floor(state.stats.ki / 20));
  const enemy = { ...enemyForEncounter(state, encounter), block: 0, weak: 0, burn: 0 };
  enemy.block = enemy.startingBlock ?? 0;
  const startingKi = Math.max(1, maxKi - (enemy.kiPressure ?? 0));
  const combat = {
    seed,
    encounter,
    turn: 1,
    shuffleCount: 0,
    player: {
      health: state.currentHealth,
      maxHealth: state.stats.health,
      block: 0,
      ki: startingKi,
      maxKi,
      focus: 0,
      spirit: state.stats.spirit,
      retainBlock: 0,
      weak: 0,
      burn: 0,
      activeForm: null,
      formBoost: 0,
    },
    enemy,
    drawPile: shuffle([
      ...state.deck,
      ...state.injuries,
      ...state.tower.loadout,
    ], seed),
    discardPile: [],
    exhaustPile: [],
    hand: [],
    cooldownsTriggered: {},
    usedAbilityIds: [],
    abilityEffects: {
      nextDamageMultiplier: 1,
      damageBoostMultiplier: 1,
      damageBoostTurns: 0,
      nextExtraHits: 0,
      reflectNext: 0,
      reduceNext: 0,
      nullifyNext: false,
      preventAndReflectNext: false,
      skipNextEnemyTurn: false,
      immortalNext: false,
      weakOnReflect: 0,
    },
    log: [
      enemy.transformationName
        ? `${enemy.baseName ?? encounter.name} enters ${enemy.transformationName}.`
        : `${encounter.name} steps into the arena.`,
      ...(enemy.traits?.length ? [`Traits: ${enemy.traits.map((trait) => trait.name).join(', ')}.`] : []),
    ],
    intent: null,
  };
  drawCards(combat, (state.origin === 'earthling' ? 6 : 5) + Math.min(1, Math.floor(state.stats.speed / 30)));
  combat.intent = enemyIntent(combat);
  return { ...state, activeCombat: combat };
}

export function tryStartDragonBallCombat(state, encounterId) {
  if (state.pendingDraft) return fail(state, 'Choose your pending reward first.');
  if (state.activeCombat) return fail(state, 'Finish the current combat first.');
  const towerEncounter = state.tower?.active ? generateTowerEncounter(state) : null;
  const encounter = state.encounters.find((item) => item.id === encounterId) ??
    (towerEncounter?.id === encounterId ? towerEncounter : null);
  if (!encounter || !['fighter', 'specialFight'].includes(encounter.type)) return fail(state, 'Encounter is unavailable.');
  if (state.tower?.active && encounter.source !== 'tower') return fail(state, 'Finish or retire the active Tower climb first.');
  const validation = validateDeck(state);
  if (!validation.valid) return fail(state, validation.reason);
  return ok(startDragonBallCombat(state, encounterId), 'Combat started.');
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

function ensureAbilityCombatFields(combat) {
  combat.usedAbilityIds ??= [];
  combat.abilityEffects ??= {};
  combat.abilityEffects.nextDamageMultiplier ??= 1;
  combat.abilityEffects.damageBoostMultiplier ??= 1;
  combat.abilityEffects.damageBoostTurns ??= 0;
  combat.abilityEffects.nextExtraHits ??= 0;
  combat.abilityEffects.reflectNext ??= 0;
  combat.abilityEffects.reduceNext ??= 0;
  combat.abilityEffects.nullifyNext ??= false;
  combat.abilityEffects.preventAndReflectNext ??= false;
  combat.abilityEffects.skipNextEnemyTurn ??= false;
  combat.abilityEffects.immortalNext ??= false;
  combat.abilityEffects.weakOnReflect ??= 0;
}

function abilityDamageMultiplier(combat) {
  ensureAbilityCombatFields(combat);
  return (combat.abilityEffects.nextDamageMultiplier ?? 1) *
    (combat.abilityEffects.damageBoostTurns > 0 ? combat.abilityEffects.damageBoostMultiplier ?? 1 : 1);
}

export function activateCombatAbility(state, abilityId) {
  if (!state.activeCombat) return state;
  if (!state.abilities?.equipped?.includes(abilityId) || !state.abilities?.owned?.[abilityId]) return state;
  if (!ABILITY_CATALOG[abilityId]) return state;
  if (state.activeCombat.usedAbilityIds?.includes(abilityId)) return state;
  const next = clone(state);
  const combat = next.activeCombat;
  ensureAbilityCombatFields(combat);
  const item = ABILITY_CATALOG[abilityId];
  const effect = scaledAbilityEffect(item, abilityRank(next, abilityId));
  combat.usedAbilityIds.push(abilityId);
  if (effect.kind === 'ki') combat.player.ki = Math.min(combat.player.maxKi + 2, combat.player.ki + effect.ki);
  else if (effect.kind === 'block') combat.player.block += effect.block;
  else if (effect.kind === 'focusDraw') {
    combat.player.focus += effect.focus;
    drawCards(combat, effect.draw);
  } else if (effect.kind === 'healPercent') combat.player.health = Math.min(combat.player.maxHealth, combat.player.health + Math.ceil(combat.player.maxHealth * effect.healPercent));
  else if (effect.kind === 'cleanse') {
    combat.player.weak = 0;
    combat.player.burn = 0;
  } else if (effect.kind === 'drawKi') {
    drawCards(combat, effect.draw);
    combat.player.ki = Math.min(combat.player.maxKi + 2, combat.player.ki + effect.ki);
  } else if (effect.kind === 'pressureBreak') {
    combat.enemy.weak += effect.weak;
    combat.enemy.block = Math.max(0, Math.round(combat.enemy.block * (1 - effect.blockBurn)));
  } else if (effect.kind === 'nextDamage') combat.abilityEffects.nextDamageMultiplier = Math.max(combat.abilityEffects.nextDamageMultiplier, effect.multiplier);
  else if (effect.kind === 'reflect') combat.abilityEffects.reflectNext = Math.max(combat.abilityEffects.reflectNext, effect.ratio);
  else if (effect.kind === 'reduceNext') combat.abilityEffects.reduceNext = Math.max(combat.abilityEffects.reduceNext, effect.ratio);
  else if (effect.kind === 'damageTurns') {
    combat.abilityEffects.damageBoostMultiplier = Math.max(combat.abilityEffects.damageBoostMultiplier, effect.multiplier);
    combat.abilityEffects.damageBoostTurns = Math.max(combat.abilityEffects.damageBoostTurns, effect.turns);
  } else if (effect.kind === 'nullifyNext') combat.abilityEffects.nullifyNext = true;
  else if (effect.kind === 'skipEnemy') combat.abilityEffects.skipNextEnemyTurn = true;
  else if (effect.kind === 'overflow') {
    combat.player.maxKi += effect.maxKi;
    combat.player.ki = combat.player.maxKi + 2;
  } else if (effect.kind === 'absoluteReversal') {
    combat.abilityEffects.reflectNext = Math.max(combat.abilityEffects.reflectNext, effect.ratio);
    combat.abilityEffects.weakOnReflect = Math.max(combat.abilityEffects.weakOnReflect, effect.weak);
  } else if (effect.kind === 'extraHit') combat.abilityEffects.nextExtraHits = Math.max(combat.abilityEffects.nextExtraHits, effect.hits);
  else if (effect.kind === 'immortal') combat.abilityEffects.immortalNext = true;
  else if (effect.kind === 'damageTurnsFocus') {
    combat.abilityEffects.damageBoostMultiplier = Math.max(combat.abilityEffects.damageBoostMultiplier, effect.multiplier);
    combat.abilityEffects.damageBoostTurns = Math.max(combat.abilityEffects.damageBoostTurns, effect.turns);
    combat.player.focus += effect.focus;
  } else if (effect.kind === 'eraseFate') {
    combat.abilityEffects.nullifyNext = true;
    combat.abilityEffects.preventAndReflectNext = true;
  }
  next.currentHealth = clamp(combat.player.health, 0, next.stats.health);
  combat.log.unshift(`${next.name} activates ${item.name}.`);
  return next;
}

export function tryActivateCombatAbility(state, abilityId) {
  if (!state.activeCombat) return fail(state, 'Finish the current combat first.');
  if (!state.abilities?.equipped?.includes(abilityId)) return fail(state, 'Equip that ability before combat.');
  if (!state.abilities?.owned?.[abilityId]) return fail(state, 'Ability is not owned.');
  if (state.activeCombat.usedAbilityIds?.includes(abilityId)) return fail(state, 'Ability was already used this combat.');
  return ok(activateCombatAbility(state, abilityId), `${ABILITY_CATALOG[abilityId]?.name ?? 'Ability'} activated.`);
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
    const abilityMultiplier = abilityDamageMultiplier(combat);
    const hits = (item.effect.hits ?? 1) + (combat.abilityEffects?.nextExtraHits ?? 0);
    for (let hit = 0; hit < hits; hit += 1) {
      totalDealt += dealToEnemy(combat, Math.round(scaledDamage(next, combat, baseDamage) * abilityMultiplier), item.effect.ignoreBlock);
    }
    combat.abilityEffects.nextDamageMultiplier = 1;
    combat.abilityEffects.nextExtraHits = 0;
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

export function tryPlayCombatCard(state, handIndex) {
  if (!state.activeCombat) return fail(state, 'Finish the current combat first.');
  const id = state.activeCombat.hand?.[handIndex];
  const item = CARDS[id]?.towerOnly ? towerCardAtRank(id, state.tower?.cards?.[id]) : CARDS[id];
  if (!item) return fail(state, 'Card is unavailable.');
  if (item.type === 'injury') return fail(state, 'Injury cards cannot be played.');
  if (item.cost > state.activeCombat.player.ki) return fail(state, 'Not enough Ki.');
  return ok(playCombatCard(state, handIndex), `${item.name} played.`);
}

export function endCombatTurn(state) {
  if (!state.activeCombat) return state;
  const next = clone(state);
  const combat = next.activeCombat;
  ensureAbilityCombatFields(combat);
  const intent = combat.intent;
  combat.discardPile.push(...combat.hand);
  combat.hand = [];
  combat.enemy.block = 0;
  if (combat.abilityEffects.skipNextEnemyTurn) {
    combat.abilityEffects.skipNextEnemyTurn = false;
    combat.log.unshift(`${combat.enemy.name}'s action was skipped by Time Skip.`);
  } else if (intent.type === 'guard') {
    combat.enemy.block += intent.block;
    combat.enemy.phase += intent.focus ?? 0;
    combat.log.unshift(`${combat.enemy.name} gains ${intent.block} Block.`);
    if (combat.enemy.guardRegen) {
      const healed = Math.min(combat.enemy.maxHealth, combat.enemy.health + combat.enemy.guardRegen) - combat.enemy.health;
      combat.enemy.health += healed;
      if (healed > 0) combat.log.unshift(`${combat.enemy.name}'s Endless Recovery heals ${healed}.`);
    }
  } else if (attackIsDodged(combat)) {
    const form = CARDS[combat.player.activeForm];
    combat.log.unshift(`${next.name} dodges ${combat.enemy.name}'s ${intent.label} with ${form.name}.`);
  } else {
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
    let damage = raw - blocked;
    let prevented = 0;
    const reduction = combat.abilityEffects.reduceNext ?? 0;
    if (reduction > 0) {
      const reducedDamage = Math.max(0, Math.round(damage * (1 - reduction)));
      prevented += damage - reducedDamage;
      damage = reducedDamage;
      combat.abilityEffects.reduceNext = 0;
    }
    if (combat.abilityEffects.nullifyNext) {
      prevented += damage;
      damage = 0;
      combat.abilityEffects.nullifyNext = false;
    }
    combat.player.block = Math.max(0, combat.player.block - blocked);
    combat.player.health = Math.max(0, combat.player.health - damage);
    const reflected = Math.round((combat.abilityEffects.reflectNext ?? 0) * damage) +
      (combat.abilityEffects.preventAndReflectNext ? prevented : 0);
    if (reflected > 0) {
      combat.enemy.health = Math.max(0, combat.enemy.health - reflected);
      combat.log.unshift(`${next.name}'s ability reflects ${reflected} damage.`);
    }
    if (combat.abilityEffects.weakOnReflect && reflected > 0) combat.enemy.weak += combat.abilityEffects.weakOnReflect;
    combat.abilityEffects.reflectNext = 0;
    combat.abilityEffects.preventAndReflectNext = false;
    combat.abilityEffects.weakOnReflect = 0;
    if (damage > 0 || prevented === 0) {
      if (intent.weak) combat.player.weak += intent.weak;
      if (intent.burn) combat.player.burn += intent.burn;
    }
    if (state.origin === 'saiyan' && damage > 0) {
      combat.player.focus += state.saiyanLineage === LEGENDARY_SAIYAN_LINEAGE ? 2 : 1;
    }
    combat.log.unshift(`${combat.enemy.name} uses ${intent.label} for ${damage} damage.`);
  }
  if (combat.enemy.regenPerTurn && combat.enemy.health > 0) {
    const healed = Math.min(combat.enemy.maxHealth, combat.enemy.health + combat.enemy.regenPerTurn) - combat.enemy.health;
    combat.enemy.health += healed;
    if (healed > 0) combat.log.unshift(`${combat.enemy.name} regenerates ${healed}.`);
  }
  if (combat.player.burn > 0) {
    combat.player.health = Math.max(0, combat.player.health - combat.player.burn * 2);
    combat.player.burn = Math.max(0, combat.player.burn - 1);
  }
  if (combat.player.health <= 0 && combat.abilityEffects.immortalNext) {
    combat.player.health = 1;
    combat.abilityEffects.immortalNext = false;
    combat.log.unshift(`${next.name}'s Immortal Moment refuses defeat.`);
  }
  if (state.origin === 'namekian') combat.player.health = Math.min(combat.player.maxHealth, combat.player.health + 3);
  combat.player.block = Math.round(combat.player.block * (combat.player.retainBlock ?? 0));
  combat.player.retainBlock = 0;
  if (combat.abilityEffects.damageBoostTurns > 0) combat.abilityEffects.damageBoostTurns -= 1;
  const form = combat.player.activeForm ? CARDS[combat.player.activeForm] : null;
  if (combat.player.health <= 0) {
    return combat.encounter.source === 'tower'
      ? recordTowerDefeat(next, combat.encounter)
      : recordCombatDefeat(next, combat.encounter);
  }
  combat.enemy.weak = Math.max(0, combat.enemy.weak - 1);
  combat.player.weak = Math.max(0, combat.player.weak - 1);
  combat.turn += 1;
  combat.player.ki = Math.max(0, combat.player.maxKi - (form?.effect.drain ?? 0));
  drawCards(combat, 5);
  combat.intent = enemyIntent(combat);
  next.currentHealth = clamp(combat.player.health, 0, next.stats.health);
  return next;
}

export function tryEndCombatTurn(state) {
  if (!state.activeCombat) return fail(state, 'Finish the current combat first.');
  return ok(endCombatTurn(state), 'Turn ended.');
}
