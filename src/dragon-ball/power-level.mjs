import { CARDS } from './data.mjs';

export const POWER_LEVEL_TIERS = [
  { id: 'spark', label: 'Spark', threshold: 0, effectLevel: 0, description: 'A growing fighter with the first signs of pressure.' },
  { id: 'rising', label: 'Rising Warrior', threshold: 50, effectLevel: 1, description: 'Aura shimmer begins to gather around the fighter.' },
  { id: 'elite', label: 'Elite Threat', threshold: 150, effectLevel: 2, description: 'The card archive is becoming visibly dangerous.' },
  { id: 'ascended', label: 'Ascended Force', threshold: 350, effectLevel: 3, description: 'Energy pressure starts bleeding into the whole UI.' },
  { id: 'mythic', label: 'Mythic Power', threshold: 750, effectLevel: 4, description: 'Rare and tower cards make the fighter feel championship-ready.' },
  { id: 'limit-break', label: 'Limit Break', threshold: 1500, effectLevel: 5, description: 'The collection radiates endgame-level power.' },
];

export function cardPowerRating(card) {
  if (!card || card.type === 'injury' || card.type === 'stat') return 0;
  if (card.towerOnly) return 100;
  return Math.max(1, Math.floor(Number(card.powerRating) || 1));
}

export function powerLevelTier(total = 0) {
  const safeTotal = Math.max(0, Math.floor(Number(total) || 0));
  return POWER_LEVEL_TIERS.reduce((best, tier) => (safeTotal >= tier.threshold ? tier : best), POWER_LEVEL_TIERS[0]);
}

export function calculatePowerLevel(state) {
  const collectionEntries = Object.entries(state?.collection ?? {});
  const normalCardTotal = collectionEntries.reduce((sum, [id, count]) => {
    const card = CARDS[id];
    if (!card || card.towerOnly) return sum;
    return sum + cardPowerRating(card) * Math.max(0, Math.floor(Number(count) || 0));
  }, 0);
  const towerCardTotal = Object.entries(state?.tower?.cards ?? {}).reduce((sum, [id, rank]) => {
    const card = CARDS[id];
    if (!card?.towerOnly) return sum;
    return sum + cardPowerRating(card) * Math.max(1, Math.floor(Number(rank) || 1));
  }, 0);
  const total = normalCardTotal + towerCardTotal;
  return {
    total,
    normalCardTotal,
    towerCardTotal,
    ownedCardCount: collectionEntries.reduce((sum, [, count]) => sum + Math.max(0, Math.floor(Number(count) || 0)), 0),
    towerCardCount: Object.keys(state?.tower?.cards ?? {}).length,
    tier: powerLevelTier(total),
  };
}
