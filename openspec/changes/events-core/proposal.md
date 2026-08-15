## Why

Les events sont le mécanisme de connexion entre riders. Sans events, MeetNShred n'est qu'un annuaire de spots. Le swipe sur les events est la fonctionnalité différenciante qui crée l'engagement quotidien — un rider découvre ce qui se passe autour de lui et rejoint en un geste.

## What Changes

- Types d'events extensibles via config (comme les disciplines) — pas un enum hardcodé
- Types de base : ouverture spot, roulage/track day, compétition, event shop — tous réservés à un rôle (gestionnaire de spot, organisateur, ou gestionnaire de magasin)
- Les sorties spontanées entre riders (ex : ce qui s'appelait "social ride") ne sont plus un type d'event : elles deviennent des **sessions**, un concept séparé porté par `sessions-core`, créables par n'importe quel rider sans rôle particulier
- Mécanisme de swipe — action directe sans confirmation, feedback visuel uniquement
- Capacité optionnelle par event (obligatoire pour roulage circuit, libre pour un event magasin)
- Feed filtré par disciplines du rider et distance
- Page de détail avec liste des participants
- Partage via deep link
- Annulation par l'organisateur avec notification automatique aux inscrits
- Avertissement (pas un blocage) si l'inscription chevauche dans le temps un autre event ou une session déjà pris par le rider

## Capabilities

### New Capabilities
- `events-core`: Création, consultation, inscription et swipe sur les events — types extensibles via config, filtrage par discipline et distance, capacité optionnelle

### Modified Capabilities
<!-- aucune -->

## Impact

- Tables `events`, `event_types` (config), `event_inscriptions`
- Lié à `spots` (ouvertures, track days, compétitions) et à `shops` (event shop) — voir Decisions dans design.md pour le lien manquant `shop_id`
- Dépend de `i18n-core` pour les labels de types d'events
- Notifications push sur annulation / modification (voir notifications-push)
- Géolocalisation pour le feed filtré par distance (voir map-core)
- Les sorties spontanées entre riders sont désormais couvertes par `sessions-core`, pas par ce change
- Dépend de `sessions-core` (`session_participants`) pour la détection de chevauchement horaire
