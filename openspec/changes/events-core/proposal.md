## Why

Les events sont le mécanisme de connexion entre riders. Sans events, MeetNShred n'est qu'un annuaire de spots. Le swipe sur les events est la fonctionnalité différenciante qui crée l'engagement quotidien — un rider découvre ce qui se passe autour de lui et rejoint en un geste.

## What Changes

- Types d'events extensibles via config (comme les disciplines) — pas un enum hardcodé
- Types de base : ouverture spot, session organisée (roulage circuit, track day), social ride, compétition, event shop
- Création : social ride ouvert à tous les riders dès le MVP, sessions organisées nécessitent un rôle organisateur
- Mécanisme de swipe — action directe sans confirmation, feedback visuel uniquement
- Capacité optionnelle par event (obligatoire pour roulage circuit, libre pour social ride)
- Feed filtré par disciplines du rider et distance
- Page de détail avec liste des participants
- Partage via deep link
- Annulation par l'organisateur avec notification automatique aux inscrits

## Capabilities

### New Capabilities
- `events-core`: Création, consultation, inscription et swipe sur les events — types extensibles via config, filtrage par discipline et distance, capacité optionnelle

### Modified Capabilities
<!-- aucune -->

## Impact

- Tables `events`, `event_types` (config), `event_inscriptions`
- Lié à `spots` pour les ouvertures et sessions organisées
- Dépend de `i18n-core` pour les labels de types d'events
- Notifications push sur annulation / modification (voir notifications-push)
- Géolocalisation pour le feed filtré par distance (voir map-core)
