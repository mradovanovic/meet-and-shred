## Why

Le profil et les events créent une identité et des occasions de se croiser, mais pas encore d'interaction directe entre riders. Le suivi (follow) existait déjà en embryon dans `notifications-push`, uniquement pour cibler des notifications. Ce change en fait un vrai axe produit : voir ce que font les riders qu'on suit, et pouvoir leur écrire en privé — avancé dès la première version de l'app, plutôt qu'en Phase 2 comme prévu initialement pour le fil d'activité.

## What Changes

- Suivi libre entre riders — comme un compte public, sans validation de la part du rider suivi
- Fil d'activité : voir les actions publiques des riders qu'on suit (event rejoint, event créé, nouveau setup matériel ajouté)
- Messagerie directe (texte, 1:1) entre riders uniquement — pas avec les gestionnaires de spot/magasin
- `rider_follows` devient la table de référence, reprise depuis `notifications-push` qui la consommait déjà pour ses triggers
- Blocage et signalement d'un rider — nécessaire vu que le suivi et la messagerie sont ouverts sans validation

## Capabilities

### New Capabilities
- `rider-follow`: Suivre/ne plus suivre un rider, libre et sans validation, compteur de followers, liste des abonnements
- `activity-feed`: Fil chronologique des activités publiques des riders suivis
- `direct-messages`: Conversations privées texte, 1:1, entre riders
- `rider-safety`: Blocage bidirectionnel entre riders, signalement d'un profil ou d'un message, file de modération pour le super admin

### Modified Capabilities
- `notifications-push`: ne possède plus `rider_follows`, la consomme depuis `rider-social` ; gagne un 5e type de notification (nouveau message)

## Impact

- Table `rider_follows` (déplacée depuis `notifications-push`, qui la consommait déjà sans la posséder)
- Tables `rider_activities`, `conversations`, `messages`, `rider_blocks`, `rider_reports`
- Dépend de `rider-profile` (profil public, followers count déjà référencé mais jamais spécifié)
- Dépend d'`events-core` (activités "rejoint un event" / "a créé un event") et de `rider-equipment` (activité "a ajouté un setup")
- Ajoute un trigger de notification push pour les nouveaux messages (voir notifications-push)
- Le blocage coupe le suivi, la messagerie et la visibilité du profil/des activités dans les deux sens
- Nouvel écran super admin : file de signalements à traiter
