import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  captureElementScroll,
  createDropdownStateController,
  restoreElementScroll,
} from '../src/ui-state.mjs';

function memoryStorage(initial = {}) {
  const values = { ...initial };
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : null;
    },
    setItem(key, value) {
      values[key] = String(value);
    },
  };
}

test('dropdown state uses defaults when storage is empty', () => {
  const controller = createDropdownStateController({
    storage: memoryStorage(),
    storageKey: 'test-dropdowns',
    defaults: { training: true, history: false },
  });

  assert.equal(controller.isOpen('training'), true);
  assert.equal(controller.isOpen('history'), false);
  assert.equal(controller.isOpen('unknown'), false);
});

test('dropdown toggles are persisted and override defaults', () => {
  const storage = memoryStorage();
  const controller = createDropdownStateController({
    storage,
    storageKey: 'test-dropdowns',
    defaults: { training: true, history: false },
  });

  assert.equal(controller.toggle('training'), false);
  assert.equal(controller.toggle('history'), true);

  const reloaded = createDropdownStateController({
    storage,
    storageKey: 'test-dropdowns',
    defaults: { training: true, history: false },
  });

  assert.equal(reloaded.isOpen('training'), false);
  assert.equal(reloaded.isOpen('history'), true);
});

test('dropdown state can be set explicitly without double-toggle drift', () => {
  const storage = memoryStorage();
  const controller = createDropdownStateController({
    storage,
    storageKey: 'test-dropdowns',
    defaults: { special: false },
  });

  assert.equal(controller.setOpen('special', true), true);
  assert.equal(controller.setOpen('special', true), true);
  assert.equal(controller.isOpen('special'), true);
  assert.equal(controller.setOpen('special', false), false);
  assert.equal(controller.isOpen('special'), false);
});

test('popup scroll snapshots restore the matching rerendered surface without smooth scrolling', () => {
  const previous = { scrollTop: 284, dataset: { scrollKey: 'hunter-dungeon' } };
  const next = { scrollTop: 0 };
  const root = {
    querySelector(selector) {
      assert.equal(selector, '[data-scroll-key="hunter-dungeon"]');
      return next;
    },
  };

  const snapshot = captureElementScroll(previous);
  const restored = restoreElementScroll(root, snapshot);

  assert.equal(restored, true);
  assert.equal(next.scrollTop, 284);
});

test('normal fight move popup clears in half a second', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /const MOVE_ICON_BURST_DURATION_MS = 500;/);
  assert.match(cssSource, /\.move-icon-burst\s*{[\s\S]*animation:\s*move-icon-burst 0\.5s ease both;/);
});

test('Hunter combat UI separates Basic and Special move dropdowns and level rewards', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /Basic Moves/);
  assert.match(appSource, /Special Moves/);
  assert.match(appSource, /Basic Move/);
  assert.match(appSource, /Special Move/);
  assert.match(appSource, /'hunter-basic-moves': true/);
  assert.match(appSource, /'hunter-special-moves': false/);
  assert.match(appSource, /data-dropdown-id="hunter-basic-moves"/);
  assert.match(appSource, /data-dropdown-id="hunter-special-moves"/);
  assert.match(appSource, /hunter-level-reward-/);
});

test('Sorcerer UI exposes innate technique panels and technique-specific move groups', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /\['sorcerer', 'Sorcerer'\]/);
  assert.match(appSource, /renderSorcererTechniquePanel/);
  assert.match(appSource, /Innate Technique/);
  assert.match(appSource, /Universal Basic Moves/);
  assert.match(appSource, /Innate Special Moves/);
  assert.match(appSource, /data-dropdown-id="sorcerer-basic-moves"/);
  assert.match(appSource, /data-dropdown-id="sorcerer-special-moves"/);
  assert.match(appSource, /sorcerer-missions-generate/);
  assert.match(appSource, /sorcerer-mission-fight/);
});

test('Monarch ending UI can replace portals with curses', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /Replace With Curses/);
  assert.match(appSource, /system-ending-curseWorld/);
  assert.match(appSource, /Hunter powers are sealed/);
});

test('Hunter System Status overrides generic option-card desktop grid', async () => {
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(cssSource, /\.system-status-panel\.option-card\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
  assert.match(cssSource, /\.system-status-panel \.system-chip-row,[\s\S]*\.system-status-panel \.system-objective-line\s*{[\s\S]*grid-column:\s*1 \/ -1;/);
});

test('Hunter activity and quest cards override generic option-card grids', async () => {
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(cssSource, /\.hunter-activity\.option-card\s*{[\s\S]*grid-template-areas:\s*"icon body action";/);
  assert.match(cssSource, /\.hunter-quest-card\.option-card,[\s\S]*\.system-popup \.hunter-quest-card\.option-card\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
  assert.match(cssSource, /\.quest-choice-grid\s*{[\s\S]*grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(160px,\s*1fr\)\);/);
});

test('Zombie activity cards use their own responsive action layout', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /option-card zombie-window zombie-activity-card/);
  assert.match(appSource, /activity-actions zombie-card-action/);
  assert.doesNotMatch(appSource, /option-card zombie-window hunter-activity/);
  assert.match(cssSource, /\.zombie-activity-card\.option-card\s*{[\s\S]*grid-template-areas:\s*"icon body action";/);
  assert.match(cssSource, /@media \(max-width:\s*560px\)\s*{[\s\S]*\.zombie-activity-card\.option-card\s*{[\s\S]*"action action";/);
  assert.match(cssSource, /\.zombie-card-action button\s*{[\s\S]*min-width:\s*88px;/);
});

test('Zombie mode navigation hides fighter-life tabs and exposes dedicated activities', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const zombieRenderer = appSource.match(/function renderZombie\(\) \{([\s\S]*?)\nfunction renderZombieActivitiesTab\(\)/)?.[1] ?? '';

  assert.match(appSource, /\['zombie-activities', 'Zombie Activities'\]/);
  assert.match(appSource, /\['zombie-items', 'Zombie Items'\]/);
  assert.match(appSource, /const ZOMBIE_NAV_SECTION_IDS = new Set\(\['life', 'zombie', 'zombie-activities', 'zombie-items'\]\);/);
  assert.match(appSource, /state\.activeWorld === 'zombie'[\s\S]*ZOMBIE_NAV_SECTION_IDS\.has\(id\)/);
  assert.match(appSource, /if \(!available\.has\(activeTab\)\) activeTab = 'life';/);
  assert.match(appSource, /activeTab === 'zombie-activities'[\s\S]*renderZombieActivitiesTab\(\)/);
  assert.match(appSource, /function renderZombieActivitiesTab\(\)/);
  assert.doesNotMatch(zombieRenderer, /id: 'zombie-activities'/);
});

test('Zombie combat UI exposes party and infected rosters', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function renderZombieCombat\(\)/);
  assert.match(appSource, /Survivor Party/);
  assert.match(appSource, /Infected Line/);
  assert.match(appSource, /class="zombie-combatant-card/);
  assert.match(appSource, /class="zombie-enemy-card/);
  assert.match(appSource, /\['unarmed', 'Unarmed'/);
  assert.match(appSource, /\['melee', 'Melee'/);
  assert.match(appSource, /\['range', 'Range'/);
  assert.doesNotMatch(appSource, /\['shove', 'Shove'/);
  assert.doesNotMatch(appSource, /\['suppress', 'Suppress'/);
  assert.match(cssSource, /\.zombie-combat-grid\s*{[\s\S]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\);/);
  assert.match(cssSource, /@media \(max-width:\s*560px\)\s*{[\s\S]*\.zombie-combat-grid\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\);/);
});

test('Zombie items UI groups resources and equippable weapon types', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function renderZombieItems\(\)/);
  assert.match(appSource, /title: 'Consumables'/);
  assert.match(appSource, /title: 'Medicines'/);
  assert.match(appSource, /title: 'Melee Weapons'/);
  assert.match(appSource, /title: 'Range Weapons'/);
  assert.match(appSource, /zombie-item-use-/);
  assert.match(appSource, /zombie-item-equip-/);
  assert.match(cssSource, /\.zombie-item-card\.option-card\s*{/);
  assert.match(cssSource, /\.zombie-weapon-move-grid\s*{[\s\S]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);/);
});

test('Zombie scavenging uses the choice popup UI with outcome previews', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /event\.id\.startsWith\('zombie-scavenge-'\) \? 'Scavenging Event' : 'Triggered Event'/);
  assert.match(appSource, /effects\.zombieScavenge\?\.leaveEmpty/);
  assert.match(appSource, /effects\.zombieScavenge\?\.itemId/);
  assert.match(appSource, /Opens a scavenging event\. Your choice decides the loot/);
});

test('Hunter System guidance exposes next actions and pending badges', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function hunterGuidanceCue/);
  assert.match(appSource, /system-guidance-strip/);
  assert.match(appSource, /Claim System Level Reward/);
  assert.doesNotMatch(appSource, /Resolve ARISE/);
  assert.doesNotMatch(appSource, /pendingArisePrompt/);
  assert.match(appSource, /hunterPendingBadges/);
  assert.match(appSource, /pending-state-badges/);
  assert.match(cssSource, /\.system-guidance-strip\s*{/);
  assert.match(cssSource, /\.pending-state-badges\s*{/);
});

test('Hunter stat panel exposes bulk stat point allocation controls', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /hunterStatSpendAmount/);
  assert.match(appSource, /hunter-stat-amount-/);
  assert.match(appSource, /hunter-stat-bulk-/);
  assert.match(appSource, /spendHunterStatPoints/);
  assert.match(appSource, /hunter-stat-amount-grid/);
});

test('Hunter tab exposes a persistent System Skills section', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function renderHunterSkillsPanel/);
  assert.match(appSource, /id: 'hunter-skills'/);
  assert.match(appSource, /title: 'System Skills'/);
  assert.match(appSource, /'hunter-skills': true/);
  assert.match(appSource, /Skills Owned/);
  assert.match(appSource, /Combat Moves/);
  assert.match(appSource, /Passive Perks/);
  assert.match(appSource, /Secret Powers/);
  assert.match(appSource, /ownedSkillCount = unlockedCount \+ ownedPerks\.length \+ secretSkills\.length/);
  assert.match(appSource, /Combat Skills/);
  assert.match(appSource, /System Passives/);
  assert.match(appSource, /Secret List/);
  assert.match(appSource, /hunterSkillRequirementText/);
  assert.match(appSource, /skill-status-badge/);
  assert.match(cssSource, /\.hunter-skill-grid\s*{/);
  assert.match(cssSource, /\.hunter-skill-card\.unlocked\s*{/);
  assert.match(cssSource, /\.hunter-skill-card\.locked\s*{/);
  assert.match(cssSource, /\.skill-status-badge\.ready\s*{/);
});

test('Life panel exposes World Reset controls without revealing the debug code', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /RESET THE WORLD/);
  assert.match(appSource, /data-action="world-reset"/);
  assert.match(appSource, /world-reset-password-input/);
  assert.match(appSource, /data-action="redeem-world-reset-password"/);
  assert.match(appSource, /redeemWorldResetPassword/);
  assert.doesNotMatch(appSource, /WORLDRESET21/);
});

test('Hunter inventory groups item types and shows armor rarity equipment state', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /Consumables/);
  assert.match(appSource, /Weapons/);
  assert.match(appSource, /Armor/);
  assert.match(appSource, /Materials/);
  assert.match(appSource, /Special/);
  assert.match(appSource, /item-section-\$\{group\.type\}/);
  assert.match(appSource, /item-rarity-badge/);
  assert.match(appSource, /equippedArmor/);
  assert.match(appSource, /Potions, Weapons & Armor/);
  assert.match(cssSource, /\.hunter-item-section\s*{/);
  assert.match(cssSource, /\.hunter-item-section-header\s*{/);
  assert.match(cssSource, /\.item-rarity-badge\s*{/);
  assert.match(cssSource, /\.hunter-item-card\.armor\s*{/);
});

test('Hunter full-screen flow has no ARISE popup priority', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const match = appSource.match(/function renderHunterFullScreenFlow\(\) \{[\s\S]*?\n\}/);

  assert.ok(match, 'renderHunterFullScreenFlow should exist');
  const body = match[0];
  assert.match(appSource, /function hunterMandatoryPopupKind/);
  assert.match(appSource, /function hasActiveHunterDungeonReport/);
  assert.doesNotMatch(appSource, /function renderArisePopup/);
  assert.doesNotMatch(body, /state\.activeFight\?\.source === 'hunterDungeon' \|\| state\.hunterWorld\?\.activeDungeon\?\.completed/);
  assert.doesNotMatch(body, /renderArisePopup/);
  assert.ok(body.indexOf("state.activeFight?.source === 'hunterQuest'") < body.indexOf('renderHunterLevelRewardPopup()'));
  assert.ok(body.indexOf("state.activeFight?.source === 'hunterDungeon' && !state.activeFight.finished") < body.indexOf('renderHunterLevelRewardPopup()'));
  assert.ok(body.indexOf('renderHunterLevelRewardPopup()') < body.indexOf('hasActiveHunterDungeonReport()'));
});

test('Hunter dungeon dismiss only gates pending level rewards', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /Continue to Level Reward/);
  assert.doesNotMatch(appSource, /Continue to ARISE/);
  assert.match(appSource, /const dismissedDungeonState = dismissHunterDungeonResult\(state\);/);
  assert.match(appSource, /dismissedDungeonState\.hunterWorld\?\.pendingLevelRewards\?\.length/);
  assert.doesNotMatch(appSource, /dismissedDungeonState\.hunterWorld\?\.arisePrompt/);
  assert.doesNotMatch(appSource, /dismissedDungeonState\.hunterWorld\?\.pendingArisePrompt/);
  assert.match(appSource, /hunterDungeonPopupOpen = !hasPendingHunterPopupAfterDungeon;/);
  assert.match(appSource, /clearHunterPopupFlags\(\);/);
});

test('Hunter dungeon close dismisses completed boss reports instead of trapping the overlay', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const match = appSource.match(/if \(action === 'hunter-dungeon-close'\) \{[\s\S]*?\n  \}/);

  assert.ok(match, 'hunter-dungeon-close handler should exist');
  const body = match[0];
  assert.match(body, /state\.hunterWorld\?\.activeDungeon\?\.completed/);
  assert.match(body, /dismissHunterDungeonResult\(state\)/);
  assert.match(body, /hunterDungeonPopupOpen = !hasPendingHunterPopupAfterDungeon;/);
  assert.ok(body.indexOf('dismissHunterDungeonResult(state)') < body.indexOf('setState(dismissedDungeonState);'));
});

test('Hunter reward actions clear stale popup layers without ARISE actions', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /function clearHunterPopupFlags/);
  assert.match(appSource, /function applyHunterPopupHandoff/);
  assert.match(appSource, /function clearMoveIconBurstState/);
  assert.match(appSource, /clearMoveIconBurstState\(\);/);
  assert.match(appSource, /const levelRewardState = claimHunterLevelReward\(state, action\.replace\('hunter-level-reward-', ''\)\);/);
  assert.match(appSource, /if \(hasMandatoryHunterPopup\(levelRewardState\.hunterWorld\)\) applyHunterPopupHandoff\(levelRewardState\);/);
  assert.doesNotMatch(appSource, /hunter-arise-attempt/);
  assert.doesNotMatch(appSource, /hunter-arise-dismiss/);
  assert.doesNotMatch(appSource, /attemptAriseShadow/);
  assert.doesNotMatch(appSource, /dismissArisePrompt/);
});

test('move icon burst dismissal preserves action target clicks', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const match = appSource.match(/document\.addEventListener\('pointerdown', \(event\) => \{[\s\S]*?\n\}, \{ capture: true \}\);/);

  assert.ok(match, 'pointerdown capture handler should exist');
  const body = match[0];
  assert.match(body, /const action = event\.target\?\..*closest\?\.\('\[data-action\]'\);/);
  assert.match(body, /if \(action\) \{\s*clearMoveIconBurstState\(\);\s*return;\s*\}/);
  assert.ok(body.indexOf('clearMoveIconBurstState();') < body.indexOf('dismissMoveIconBurst();'));
  assert.ok(body.indexOf('dismissMoveIconBurst();') < body.indexOf('event.stopPropagation();'));
  assert.ok(body.indexOf('dismissMoveIconBurst();') < body.indexOf('event.preventDefault();'));
  assert.doesNotMatch(appSource, /hunter-arise-attempt/);
  assert.doesNotMatch(appSource, /attemptAriseShadow/);
});

test('fight turn actions advance state before showing move burst', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const match = appSource.match(/if \(action\.startsWith\('fight-turn-'\)\) \{[\s\S]*?\n  \}/);

  assert.ok(match, 'fight-turn action handler should exist');
  const body = match[0];
  assert.match(body, /const nextFightState = takeFightTurn\(state, moveId\);/);
  assert.ok(body.indexOf('const nextFightState = takeFightTurn(state, moveId);') < body.indexOf('triggerMoveIconBurst('));
  assert.ok(body.indexOf('triggerMoveIconBurst(') < body.indexOf('setState(nextFightState);'));
  assert.match(body, /nextFightState\.activeFight\?\.exchanges\?\.\[0\]\?\.tacticLabel/);
});

test('global interaction polish covers core interactive UI and reduced motion', async () => {
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(cssSource, /--tap-scale:\s*0\.985/);
  assert.match(cssSource, /input\[type="password"\]/);
  assert.match(cssSource, /\.collapsible-summary/);
  assert.match(cssSource, /\.event-choice-grid button/);
  assert.match(cssSource, /\.gate-offer/);
  assert.match(cssSource, /\.domain-node/);
  assert.match(cssSource, /@keyframes system-scan-sheen/);
  assert.match(cssSource, /prefers-reduced-motion:\s*reduce/);
  assert.match(cssSource, /animation:\s*none !important/);
  assert.match(cssSource, /transition:\s*none !important/);
});

test('main navigation uses menu with four favorite section slots', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /NAV_FAVORITES_STORAGE_KEY/);
  assert.match(appSource, /favorites\.length >= 4/);
  assert.match(appSource, /<button class="small-btn menu-btn" data-action="nav-menu-open">Menu<\/button>/);
  assert.match(appSource, /<button class="danger wide" data-action="reset">Reset Life<\/button>/);
  assert.match(appSource, /<button class="tab-btn menu-tab-btn" data-action="nav-menu-open"><span>Menu<\/span><\/button>/);
  assert.match(cssSource, /\.nav-menu-row\s*{[\s\S]*grid-template-columns:\s*minmax\(0,\s*1fr\) 48px;/);
});

test('render no longer catches broken saves with a recovery screen', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');

  assert.doesNotMatch(appSource, /function renderRecoveryScreen/);
  assert.doesNotMatch(appSource, /renderRecoveryScreen\(error\)/);
  assert.doesNotMatch(appSource, /data-action="clear-broken-save"/);
  assert.doesNotMatch(appSource, /action === 'clear-broken-save'/);
});

test('large popup menus use replacement screens while small popups stay modal cards', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /function syncBodyScrollLock/);
  assert.match(appSource, /document\.body\.classList\.add\('modal-open'\)/);
  assert.doesNotMatch(appSource, /function activeScrollableModalFromEvent/);
  assert.doesNotMatch(appSource, /function clampModalScroll/);
  assert.match(appSource, /function renderFullScreenView/);
  assert.match(appSource, /<main class="screen-view nav-menu-screen"/);
  assert.match(appSource, /<main class="screen-view hunter-screen"/);
  assert.match(appSource, /<main class="screen-view">/);
  assert.match(appSource, /<section class="event-backdrop" role="dialog" aria-modal="true">\s*<article class="event-modal training-modal">/);
  assert.match(cssSource, /body\.modal-open\s*{[\s\S]*overflow:\s*hidden;/);
  assert.match(cssSource, /@media\s*\(max-width:\s*560px\)\s*{[\s\S]*body\.modal-open\s*{[\s\S]*position:\s*fixed;/);
  assert.match(cssSource, /\.event-backdrop\s*{[\s\S]*overflow:\s*hidden;/);
  assert.doesNotMatch(cssSource, /\.screen-view\s*{[\s\S]*position:\s*fixed;/);
  assert.match(cssSource, /\.screen-panel\s*{[\s\S]*min-height:\s*100dvh;/);
});

test('Shadow Domain map renders as a scrollable tactical node board', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /class="shadow-domain-scroll"/);
  assert.match(appSource, /class="shadow-domain-map tactical-board"/);
  assert.match(appSource, /<circle class="domain-node-ring"/);
  assert.match(appSource, /class="domain-route/);
  assert.doesNotMatch(appSource, /<rect x="\$\{domain\.x\}" y="\$\{domain\.y\}" width="\$\{domain\.width\}"/);
  assert.match(cssSource, /\.shadow-domain-scroll\s*{[\s\S]*overflow:\s*auto;/);
  assert.match(cssSource, /\.shadow-domain-map\s*{[\s\S]*width:\s*1120px;/);
  assert.match(cssSource, /\.domain-map-legend\s*{/);
});

test('Shadow Army cards render boss passives and rarity visuals', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /shadow-passive-\$\{tone\}/);
  assert.match(appSource, /shadow-rank-\$\{rank\}/);
  assert.match(appSource, /data-action="shadow-army-select-/);
  assert.match(appSource, /function renderSelectedShadowPassiveInfo/);
  assert.match(appSource, /data-action="shadow-army-clear"/);
  assert.match(appSource, /shadow-passive-name/);
  assert.match(appSource, /shadow-passive-effect/);
  assert.match(appSource, /shadow-rank-badge/);
  assert.match(appSource, /Auto Gate Loadout/);
  assert.match(appSource, /auto-gate-equip-best/);
  assert.match(appSource, /equipBestAutoGateShadows/);
  assert.match(appSource, /auto-gate-shadow-/);
  assert.match(appSource, /auto-gate-selected/);
  assert.match(cssSource, /\.shadow-card\s*{/);
  assert.match(cssSource, /\.shadow-card:hover/);
  assert.match(cssSource, /\.auto-gate-loadout/);
  assert.match(cssSource, /\.shadow-card\.auto-gate-selected/);
  assert.match(cssSource, /\.shadow-passive-detail\s*{/);
  assert.match(cssSource, /\.shadow-rank-e/);
  assert.match(cssSource, /\.shadow-rank-s/);
  assert.match(cssSource, /\.shadow-rank-ss/);
  assert.match(cssSource, /\.shadow-rank-sss/);
  assert.match(cssSource, /\.shadow-rank-calamity/);
  assert.match(cssSource, /--rank-accent/);
  assert.match(cssSource, /\.shadow-passive-calamity/);
  assert.match(cssSource, /\.shadow-passive-world-eater/);
  assert.match(cssSource, /\.shadow-red-gate/);
});

test('Gate cards render Auto Gate action and readiness states', async () => {
  const appSource = await readFile(new URL('../src/app.mjs', import.meta.url), 'utf8');
  const cssSource = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

  assert.match(appSource, /getAutoGateReadiness/);
  assert.match(appSource, /AUTO GATE/);
  assert.match(appSource, /hunter-auto-gate-/);
  assert.match(appSource, /Auto Power/);
  assert.match(appSource, /auto-gate-\$\{classToken\(readiness\.status\)\}/);
  assert.match(cssSource, /\.auto-gate-btn/);
  assert.match(cssSource, /\.auto-gate-ready/);
  assert.match(cssSource, /\.auto-gate-weak/);
  assert.match(cssSource, /\.auto-gate-empty/);
});
