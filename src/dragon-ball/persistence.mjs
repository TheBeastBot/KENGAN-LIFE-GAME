import { DRAGON_BALL_SAVE_KEY } from './data.mjs';
import { normalizeDragonBallState } from './state.mjs';

export function loadDragonBallGame(storage = globalThis.localStorage) {
  try {
    return normalizeDragonBallState(JSON.parse(storage?.getItem(DRAGON_BALL_SAVE_KEY) ?? 'null'));
  } catch {
    return null;
  }
}

export function saveDragonBallGame(state, storage = globalThis.localStorage) {
  if (state) storage?.setItem(DRAGON_BALL_SAVE_KEY, JSON.stringify(state));
}

export function clearDragonBallGame(storage = globalThis.localStorage) {
  storage?.removeItem(DRAGON_BALL_SAVE_KEY);
}
