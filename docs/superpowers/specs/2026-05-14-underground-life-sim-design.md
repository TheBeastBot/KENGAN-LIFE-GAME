# Underground Life Sim Design

## Concept

Build a mobile-first web life sim inspired by underground martial arts fiction and BitLife-style choice progression. The player chooses gender, then is born into random conditions. Clan bloodlines, training, life events, and fights shape the character from ordinary youth into a hidden-world fighter.

The world is original: corporate fight leagues, underground arenas, clan politics, brutal mentors, and rival arcs. No direct use of existing manga names, organizations, characters, or techniques.

## Core Loop

1. Generate a new life with gender, family background, money, health, temperament, stats, and clan.
2. Spend Clan Rerolls at birth to chase stronger clan rarity.
3. Make life choices from events, training, fights, social ties, and world opportunities.
4. Age up to trigger new events, phase changes, stat drift, and hidden-world escalation.
5. Fight opponents through stat simulation and tactical choices.
6. Unlock stronger leagues, mentors, clans, awakenings, and rival events.

## Starting Rules

The player chooses gender and can use 10 starting Clan Rerolls. Birth conditions remain random. Clan rarity directly affects power ceiling and bonus strength:

- Common
- Uncommon
- Rare
- Epic
- Legendary
- Mythic

Higher rarity clans are stronger and unlock better options, but they attract stronger rivals and more hidden-world pressure.

## UI

The prototype uses DOM UI rather than canvas because this is a text-heavy life sim. It is mobile-first, with large tap targets and bottom navigation:

- Life: event feed, choices, age up, character summary.
- Train: training actions, energy costs, stat gains, injury risk.
- Fight: opponent cards, rewards, danger, tactical fight actions.
- Body: stats, traits, injuries, clan abilities, awakenings.
- Social: family, mentor, rival, sponsor, reputation.
- World: leagues, underground arenas, faction news, hidden-world unlocks.

## Simulation Boundaries

The simulation module owns saveable state, clan rolls, event outcomes, training effects, fight outcomes, and phase changes. The UI module renders state and maps button taps to simulation actions.

## First Prototype Scope

The first playable version includes:

- New life generation with gender selection.
- 10 Clan Rerolls at birth.
- Original clan table with rarities, bonuses, drawbacks, and unique options.
- Main mobile UI with Life, Train, Fight, Body, Social, and World tabs.
- Age up progression.
- Training actions with energy costs and risks.
- Fight cards and simplified combat simulation.
- Event log and consequence feedback.
- Save/load/reset using localStorage.

## Testing

Logic tests cover clan rerolls, rarity strength ordering, training effects, fight rewards, and age-up progression. Manual browser testing covers mobile layout and core interactions.
