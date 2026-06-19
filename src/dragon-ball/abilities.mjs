import { createRng, hashSeed } from './random.mjs';
import { fail, ok } from './action-result.mjs';

export const ABILITY_MAX_RANK = 5;
export const ABILITY_MAX_EQUIPPED = 3;
export const ABILITY_RARITY_ODDS = {
  common: 0.55,
  rare: 0.25,
  epic: 0.14,
  legendary: 0.05,
  mythic: 0.01,
};
export const ABILITY_RARITIES = Object.keys(ABILITY_RARITY_ODDS);

const ability = (id, name, rarity, description, effect) => ({ id, name, rarity, description, effect });

export const ABILITY_LIST = [
  ability('ki-surge', 'Ki Surge', 'common', 'Gain Ki.', { kind: 'ki', ki: 1 }),
  ability('guard-pulse', 'Guard Pulse', 'common', 'Gain Block.', { kind: 'block', block: 18 }),
  ability('battle-focus', 'Battle Focus', 'common', 'Gain Focus and draw.', { kind: 'focusDraw', focus: 1, draw: 1 }),
  ability('second-breath', 'Second Breath', 'common', 'Heal a small amount.', { kind: 'healPercent', healPercent: 0.16 }),
  ability('clean-aura', 'Clean Aura', 'common', 'Clear Weak and Burn.', { kind: 'cleanse' }),
  ability('double-impact', 'Double Impact', 'rare', 'Your next damaging card deals double damage.', { kind: 'nextDamage', multiplier: 2 }),
  ability('reflective-guard', 'Reflective Guard', 'rare', 'Reflect part of the next attack damage.', { kind: 'reflect', ratio: 0.45 }),
  ability('null-step', 'Null Step', 'rare', 'Reduce the next incoming attack heavily.', { kind: 'reduceNext', ratio: 0.7 }),
  ability('pressure-break', 'Pressure Break', 'rare', 'Apply Weak and burn enemy Block.', { kind: 'pressureBreak', weak: 1, blockBurn: 0.5 }),
  ability('emergency-draw', 'Emergency Draw', 'rare', 'Draw cards and gain Ki.', { kind: 'drawKi', draw: 2, ki: 1 }),
  ability('dragon-counter', 'Dragon Counter', 'epic', 'Reflect all damage from the next enemy attack.', { kind: 'reflect', ratio: 1 }),
  ability('limit-burst', 'Limit Burst', 'epic', 'All card damage is doubled this turn.', { kind: 'damageTurns', multiplier: 2, turns: 1 }),
  ability('perfect-guard', 'Perfect Guard', 'epic', 'Nullify the next enemy attack.', { kind: 'nullifyNext' }),
  ability('time-skip', 'Time Skip', 'epic', 'Enemy skips its next intent after your turn.', { kind: 'skipEnemy' }),
  ability('spirit-overflow', 'Spirit Overflow', 'epic', 'Fully refill Ki and gain max Ki for the battle.', { kind: 'overflow', maxKi: 1 }),
  ability('absolute-reversal', 'Absolute Reversal', 'legendary', 'Reflect all damage taken next enemy turn and apply Weak.', { kind: 'absoluteReversal', ratio: 1, weak: 2 }),
  ability('godspeed-flurry', 'Godspeed Flurry', 'legendary', 'Next attack hits twice after normal resolution.', { kind: 'extraHit', hits: 1 }),
  ability('immortal-moment', 'Immortal Moment', 'legendary', 'Cannot drop below 1 Health until next turn.', { kind: 'immortal' }),
  ability('final-awakening', 'Final Awakening', 'legendary', 'Double damage for 2 turns and gain Focus.', { kind: 'damageTurnsFocus', multiplier: 2, turns: 2, focus: 3 }),
  ability('erase-fate', 'Erase Fate', 'mythic', 'Nullify all damage and statuses from the next enemy turn, then deal that prevented damage back.', { kind: 'eraseFate' }),
];

export const ABILITY_CATALOG = Object.fromEntries(ABILITY_LIST.map((item) => [item.id, item]));

export function normalizeAbilityProgress(input) {
  const owned = {};
  for (const [id, rank] of Object.entries(input?.owned ?? {})) {
    if (ABILITY_CATALOG[id]) owned[id] = Math.max(1, Math.min(ABILITY_MAX_RANK, Math.floor(Number(rank) || 1)));
  }
  const equipped = Array.isArray(input?.equipped)
    ? [...new Set(input.equipped.filter((id) => owned[id]))].slice(0, ABILITY_MAX_EQUIPPED)
    : [];
  const lastPull = input?.lastPull?.id && ABILITY_CATALOG[input.lastPull.id] ? input.lastPull : null;
  return {
    owned,
    equipped,
    pullCount: Math.max(0, Math.floor(Number(input?.pullCount) || 0)),
    lastPull,
  };
}

export function abilityRank(state, abilityId) {
  return Math.max(0, Math.floor(Number(state?.abilities?.owned?.[abilityId]) || 0));
}

export function abilityRankText(abilityId, rank = 1) {
  const item = ABILITY_CATALOG[abilityId];
  if (!item) return '';
  const effect = scaledAbilityEffect(item, rank);
  if (effect.kind === 'ki') return `Gain ${effect.ki} Ki.`;
  if (effect.kind === 'block') return `Gain ${effect.block} Block.`;
  if (effect.kind === 'focusDraw') return `Gain ${effect.focus} Focus and draw ${effect.draw}.`;
  if (effect.kind === 'healPercent') return `Heal ${Math.round(effect.healPercent * 100)}% Health.`;
  if (effect.kind === 'drawKi') return `Draw ${effect.draw} and gain ${effect.ki} Ki.`;
  if (effect.kind === 'pressureBreak') return `Apply ${effect.weak} Weak and burn ${Math.round(effect.blockBurn * 100)}% enemy Block.`;
  if (effect.kind === 'reflect' || effect.kind === 'absoluteReversal') return `Reflect ${Math.round(effect.ratio * 100)}% of next attack damage.`;
  if (effect.kind === 'reduceNext') return `Reduce next attack damage by ${Math.round(effect.ratio * 100)}%.`;
  if (effect.kind === 'damageTurns' || effect.kind === 'damageTurnsFocus') return `${effect.multiplier}x card damage for ${effect.turns} turn${effect.turns > 1 ? 's' : ''}.`;
  if (effect.kind === 'nextDamage') return `${effect.multiplier}x damage on your next damaging card.`;
  if (effect.kind === 'extraHit') return `Your next attack repeats ${effect.hits} extra time.`;
  if (effect.kind === 'overflow') return `Gain ${effect.maxKi} max Ki and refill Ki.`;
  if (effect.kind === 'eraseFate') return 'Nullify the next enemy turn and reflect prevented damage.';
  if (effect.kind === 'immortal') return 'Cannot drop below 1 Health until next turn.';
  if (effect.kind === 'skipEnemy') return 'The enemy skips its next action.';
  if (effect.kind === 'cleanse') return 'Clear Weak and Burn.';
  return item.description;
}

export function scaledAbilityEffect(itemOrId, rank = 1) {
  const item = typeof itemOrId === 'string' ? ABILITY_CATALOG[itemOrId] : itemOrId;
  const safeRank = Math.max(1, Math.min(ABILITY_MAX_RANK, Math.floor(Number(rank) || 1)));
  const bonus = safeRank - 1;
  const effect = { ...(item?.effect ?? {}) };
  if (effect.ki) effect.ki += bonus;
  if (effect.block) effect.block += bonus * 8;
  if (effect.focus) effect.focus += Math.floor(bonus / 2);
  if (effect.draw) effect.draw += Math.floor(bonus / 2);
  if (effect.healPercent) effect.healPercent = Math.min(0.8, effect.healPercent + bonus * 0.05);
  if (effect.weak) effect.weak += Math.floor(bonus / 2);
  if (effect.blockBurn) effect.blockBurn = Math.min(1, effect.blockBurn + bonus * 0.1);
  if (effect.ratio) effect.ratio = Math.min(1.5, effect.ratio + bonus * 0.1);
  if (effect.multiplier) effect.multiplier = Number((effect.multiplier + bonus * 0.15).toFixed(2));
  if (effect.turns && safeRank >= 5) effect.turns += 1;
  if (effect.hits && safeRank >= 4) effect.hits += 1;
  if (effect.maxKi && safeRank >= 4) effect.maxKi += 1;
  return effect;
}

function rarityForRoll(value) {
  let floor = 0;
  for (const rarity of ABILITY_RARITIES) {
    floor += ABILITY_RARITY_ODDS[rarity];
    if (value < floor) return rarity;
  }
  return 'mythic';
}

function abilityForRoll(state, forcedAbilityId = '') {
  if (forcedAbilityId && ABILITY_CATALOG[forcedAbilityId]) return ABILITY_CATALOG[forcedAbilityId];
  const pullCount = Math.max(0, Math.floor(Number(state?.abilities?.pullCount) || 0));
  const rng = createRng(hashSeed(state?.seed ?? 0, 'ability-pull', pullCount));
  const rarity = rarityForRoll(rng());
  const pool = ABILITY_LIST.filter((item) => item.rarity === rarity);
  return pool[Math.floor(rng() * pool.length) % pool.length];
}

export function pullAbility(state, { forcedAbilityId = '' } = {}) {
  if ((state?.abilityRerolls ?? 0) <= 0) return state;
  const progress = normalizeAbilityProgress(state.abilities);
  const item = abilityForRoll({ ...state, abilities: progress }, forcedAbilityId);
  const currentRank = progress.owned[item.id] ?? 0;
  const maxRankRefund = currentRank >= ABILITY_MAX_RANK;
  const nextRank = maxRankRefund ? ABILITY_MAX_RANK : Math.min(ABILITY_MAX_RANK, currentRank + 1);
  return {
    ...state,
    abilityRerolls: state.abilityRerolls - 1 + (maxRankRefund ? 1 : 0),
    abilities: {
      ...progress,
      owned: { ...progress.owned, [item.id]: nextRank },
      pullCount: progress.pullCount + 1,
      lastPull: {
        id: item.id,
        rarity: item.rarity,
        rank: nextRank,
        duplicate: currentRank > 0,
        maxRankRefund,
      },
    },
    history: [{ type: 'ability', text: `${item.name} ${currentRank ? `rose to Rank ${nextRank}` : 'unlocked'}.` }, ...(state.history ?? [])].slice(0, 100),
  };
}

export function tryPullAbility(state) {
  if ((state?.abilityRerolls ?? 0) <= 0) return fail(state, 'Earn an Ability Reroll first.');
  const next = pullAbility(state);
  return ok(next, `${ABILITY_CATALOG[next.abilities.lastPull.id].name} ${next.abilities.lastPull.duplicate ? 'upgraded' : 'unlocked'}.`);
}

export function validateAbilityLoadout(state, loadout = state?.abilities?.equipped ?? []) {
  if (!Array.isArray(loadout)) return { valid: false, reason: 'Ability loadout data is invalid.' };
  if (loadout.length > ABILITY_MAX_EQUIPPED) return { valid: false, reason: 'Only three abilities may be equipped.' };
  if (new Set(loadout).size !== loadout.length) return { valid: false, reason: 'Abilities cannot be equipped twice.' };
  for (const id of loadout) {
    if (!ABILITY_CATALOG[id] || !state?.abilities?.owned?.[id]) return { valid: false, reason: `${ABILITY_CATALOG[id]?.name ?? 'Ability'} is not owned.` };
  }
  return { valid: true, reason: '' };
}

export function setAbilityLoadout(state, loadout) {
  const validation = validateAbilityLoadout(state, loadout);
  if (!validation.valid) return state;
  return { ...state, abilities: { ...normalizeAbilityProgress(state.abilities), equipped: [...loadout] } };
}

export function trySetAbilityLoadout(state, loadout) {
  const validation = validateAbilityLoadout(state, loadout);
  if (!validation.valid) return fail(state, validation.reason);
  return ok(setAbilityLoadout(state, loadout), 'Ability loadout updated.');
}
