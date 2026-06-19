export const COMBAT_PREFS_KEY = 'dragon-ball-combat-prefs-v1';
export const COMBAT_SOUND_SOURCES = {
  impact: './assets/dragon-ball/audio/impact.ogg',
  ki: './assets/dragon-ball/audio/ki.ogg',
  heal: './assets/dragon-ball/audio/heal.ogg',
  guard: './assets/dragon-ball/audio/guard.ogg',
  charge: './assets/dragon-ball/audio/charge.ogg',
  transform: './assets/dragon-ball/audio/transform.ogg',
  dodge: './assets/dragon-ball/audio/dodge.ogg',
  warning: './assets/dragon-ball/audio/warning.ogg',
  victory: './assets/dragon-ball/audio/victory.ogg',
  defeat: './assets/dragon-ball/audio/defeat.ogg',
  ui: './assets/dragon-ball/audio/ui.ogg',
  toggle: './assets/dragon-ball/audio/toggle.ogg',
};

const MOTION_MODES = new Set(['full', 'reduced', 'off']);
const KI_WORDS = /\b(beam|wave|blast|cannon|sphere|ray|flash|bomb|grenade|shot|bullet|photon|galick|masenko|kame|spirit|ki)\b/i;

const stage = (kind, options = {}) => ({ kind, duration: 220, sound: null, ...options });
const combatOf = (state) => state?.activeCombat ?? null;

export function loadCombatPreferences(storage = globalThis.localStorage, reducedMotion = false) {
  const fallback = { motion: reducedMotion ? 'reduced' : 'full', sound: false };
  try {
    const saved = JSON.parse(storage?.getItem(COMBAT_PREFS_KEY) ?? 'null');
    if (!saved || !MOTION_MODES.has(saved.motion) || typeof saved.sound !== 'boolean') return fallback;
    return { motion: saved.motion, sound: saved.sound };
  } catch {
    return fallback;
  }
}

export function saveCombatPreferences(preferences, storage = globalThis.localStorage) {
  const normalized = {
    motion: MOTION_MODES.has(preferences?.motion) ? preferences.motion : 'full',
    sound: Boolean(preferences?.sound),
  };
  storage?.setItem(COMBAT_PREFS_KEY, JSON.stringify(normalized));
  return normalized;
}

function combatOutcome(previous, next) {
  if (next?.activeCombat) return null;
  if (next?.pendingDraft) return 'victory';
  const oldInjuries = previous?.injuries?.length ?? 0;
  return (next?.injuries?.length ?? 0) > oldInjuries ? 'defeat' : null;
}

function cardStages(previous, next, card) {
  if (!card) return [];
  const before = combatOf(previous);
  const after = combatOf(next);
  const result = [stage('card-focus', {
    label: card.name,
    cardId: card.id,
    sound: card.type === 'form' ? 'charge' : null,
    duration: 700,
  })];
  const enemyDamage = Math.max(0, (before?.enemy?.health ?? 0) - (after?.enemy?.health ?? 0));
  const healed = Math.max(0, (after?.player?.health ?? 0) - (before?.player?.health ?? 0));
  const block = Math.max(0, (after?.player?.block ?? 0) - (before?.player?.block ?? 0));
  const ki = Math.max(0, (after?.player?.ki ?? 0) - ((before?.player?.ki ?? 0) - (card.cost ?? 0)));
  const focus = Math.max(0, (after?.player?.focus ?? 0) - (before?.player?.focus ?? 0));

  if (card.type === 'form') {
    result.push(stage('transform', {
      label: card.name,
      formId: card.id,
      sound: 'transform-card',
      duration: 900,
    }));
  } else if (card.effect?.damage) {
    const multiHit = (card.effect.hits ?? 1) > 1;
    const kiAttack = KI_WORDS.test(`${card.name} ${card.text}`);
    result.push(stage(multiHit ? 'multi-hit' : kiAttack ? 'ki-attack' : 'physical-attack', {
      label: card.name,
      value: enemyDamage,
      hits: Math.min(6, card.effect.hits ?? 1),
      target: 'enemy',
      sound: kiAttack ? 'ki' : 'impact',
      duration: multiHit ? 620 : kiAttack ? 560 : 420,
    }));
  } else if (card.type === 'heal') {
    result.push(stage('heal', { label: `+${healed} Health`, value: healed, target: 'player', sound: 'heal', duration: 520 }));
  } else if (card.type === 'counter' || block > 0) {
    result.push(stage('guard', { label: `+${block} Block`, value: block, target: 'player', sound: 'guard', duration: 420 }));
  } else {
    result.push(stage('support', {
      label: [ki ? `+${ki} Ki` : '', focus ? `+${focus} Focus` : '', card.effect?.draw ? `Draw ${card.effect.draw}` : ''].filter(Boolean).join(' / ') || card.name,
      target: 'player',
      sound: 'charge',
      duration: 420,
    }));
  }

  if (card.effect?.weak || card.effect?.clear || card.effect?.clearAll) {
    result.push(stage('status', {
      label: card.effect.weak ? `Weak +${card.effect.weak}` : 'Status Cleansed',
      target: card.effect.weak ? 'enemy' : 'player',
      sound: card.effect.weak ? 'impact' : 'heal',
      duration: 300,
    }));
  }
  if (card.effect?.exhaust) {
    result.push(stage('exhaust', { label: 'EXHAUST', cardId: card.id, duration: 240 }));
  }
  const outcome = combatOutcome(previous, next);
  if (outcome) result.push(stage(outcome, { label: outcome === 'victory' ? 'VICTORY' : 'DEFEAT', sound: outcome, duration: 900 }));
  return result;
}

function enemyStages(previous, next) {
  const before = combatOf(previous);
  const after = combatOf(next);
  if (!before) return [];
  const intent = before.intent ?? {};
  const result = [];
  if (/ultimate/i.test(intent.label ?? '')) {
    result.push(stage('ultimate-warning', { label: intent.label, sound: 'warning', duration: 520 }));
  }
  const latestLog = after?.log?.[0] ?? '';
  if (/dodges/i.test(latestLog)) {
    result.push(stage('dodge', { label: 'DODGE', target: 'player', sound: 'dodge', duration: 620 }));
  } else if (intent.type === 'guard') {
    result.push(stage('enemy-guard', { label: `Enemy +${intent.block ?? 0} Block`, target: 'enemy', sound: 'guard', duration: 440 }));
  } else {
    const damage = Math.max(0, (before.player.health ?? 0) - (after?.player.health ?? next?.currentHealth ?? 0));
    const kiAttack = KI_WORDS.test(intent.label ?? '');
    result.push(stage(kiAttack ? 'enemy-ki' : 'enemy-strike', {
      label: intent.label,
      value: damage,
      target: 'player',
      sound: kiAttack ? 'ki' : 'impact',
      duration: kiAttack ? 620 : 460,
    }));
    if (intent.burn || intent.weak) {
      result.push(stage('status', {
        label: [intent.burn ? `Burn +${intent.burn}` : '', intent.weak ? `Weak +${intent.weak}` : ''].filter(Boolean).join(' / '),
        target: 'player',
        sound: 'impact',
        duration: 300,
      }));
    }
  }
  const outcome = combatOutcome(previous, next);
  if (outcome) result.push(stage(outcome, { label: outcome === 'victory' ? 'VICTORY' : 'DEFEAT', sound: outcome, duration: 900 }));
  else result.push(stage('turn-banner', { label: `TURN ${after?.turn ?? before.turn + 1}`, duration: 280 }));
  return result;
}

export function buildCombatSequence(previous, next, action = {}) {
  if (action.type === 'card') return cardStages(previous, next, action.card);
  if (action.type === 'enemyTurn') return enemyStages(previous, next);
  if (action.type === 'battleStart') {
    return [
      stage('battle-start', { label: 'BATTLE START', sound: 'warning', duration: 640 }),
      stage('card-fan', { label: 'DRAW', duration: 380 }),
    ];
  }
  return [];
}

export function stageDuration(stageItem, motion) {
  if (motion === 'off') return 0;
  if (motion === 'reduced') return Math.min(180, Math.max(80, Math.round(stageItem.duration * 0.24)));
  return stageItem.duration;
}

export function createSequenceController({
  getMotion = () => 'full',
  setTimer = globalThis.setTimeout?.bind(globalThis),
  clearTimer = globalThis.clearTimeout?.bind(globalThis),
  onStage = () => {},
  onCommit = () => {},
  onSound = () => {},
} = {}) {
  let current = null;
  let timer = null;
  let committed = false;

  const clear = () => {
    if (timer != null) clearTimer?.(timer);
    timer = null;
  };
  const commit = () => {
    if (!current || committed) return;
    clear();
    committed = true;
    const next = current.next;
    current = null;
    onStage(null);
    onCommit(next);
  };
  const advance = () => {
    if (!current) return;
    const item = current.stages[current.index];
    if (!item) return commit();
    onStage(item, current.index, current.stages.length);
    if (item.sound) onSound(item.sound);
    timer = setTimer?.(() => {
      if (!current) return;
      current.index += 1;
      advance();
    }, stageDuration(item, getMotion()));
  };

  return {
    get locked() { return Boolean(current); },
    get currentStage() { return current?.stages[current.index] ?? null; },
    start({ previous, next, action }) {
      if (current) return false;
      committed = false;
      const stages = buildCombatSequence(previous, next, action);
      if (getMotion() === 'off' || !stages.length) {
        current = { next, stages: [], index: 0 };
        commit();
        return true;
      }
      current = { next, stages, index: 0 };
      advance();
      return true;
    },
    skip: commit,
    flush: commit,
    cancel() {
      clear();
      current = null;
      committed = false;
      onStage(null);
    },
  };
}

export function createCombatAudio({ contextFactory, audioFactory, soundSources = COMBAT_SOUND_SOURCES } = {}) {
  let context = null;
  const createContext = contextFactory ?? (() => {
    const AudioContext = globalThis.AudioContext ?? globalThis.webkitAudioContext;
    return AudioContext ? new AudioContext() : null;
  });
  const createAudio = audioFactory ?? ((src) => {
    const Audio = globalThis.Audio;
    return Audio ? new Audio(src) : null;
  });

  const tones = {
    impact: [110, 55, 0.11],
    ki: [480, 120, 0.24],
    heal: [420, 760, 0.28],
    guard: [180, 260, 0.16],
    charge: [130, 420, 0.3],
    transform: [90, 680, 0.55],
    'transform-card': [70, 940, 0.72],
    dodge: [900, 260, 0.12],
    warning: [150, 150, 0.24],
    victory: [330, 880, 0.5],
    defeat: [180, 60, 0.5],
  };

  return {
    play(name, enabled) {
      if (!enabled) return;
      const source = soundSources[name];
      if (source) {
        try {
          const sample = createAudio(source);
          if (sample) {
            sample.volume = name === 'ui' || name === 'toggle' ? 0.35 : 0.58;
            sample.currentTime = 0;
            sample.play?.();
            return;
          }
        } catch {
          // Fall through to synthesized backup audio.
        }
      }
      context ??= createContext();
      if (!context) return;
      context.resume?.();
      const [startFrequency, endFrequency, duration] = tones[name] ?? tones.impact;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = name === 'impact' || name === 'defeat' ? 'sawtooth' : 'sine';
      oscillator.frequency.setValueAtTime(startFrequency, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, context.currentTime + duration);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    },
  };
}
