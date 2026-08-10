## Why

Sans notifications, le rider doit ouvrir l'app pour savoir si un terrain a ouvert. Les notifications push sont le mécanisme de rétention principal — elles ramènent le rider au bon moment (terrain qui ouvre, places qui partent, event annulé, nouveau message reçu).

## What Changes

- Enregistrement du token push au login (FCM pour Android, APNs pour iOS)
- 4 types de notifications définies dans le cahier des charges, plus un 5e type ajouté avec rider-social (nouveau message direct)
- Notification lors de l'ouverture d'un terrain suivi
- Notification quand il reste peu de places sur un terrain suivi
- Notification d'annulation ou modification d'un event rejoint
- Notification quand un rider suivi crée ou annule un event
- Notification quand un rider reçoit un nouveau message direct (voir rider-social)

## Capabilities

### New Capabilities
- `notifications-push`: Enregistrement des tokens push, envoi ciblé selon les abonnements (terrains suivis, events rejoints, riders suivis)

### Modified Capabilities
<!-- aucune -->

## Impact

- Tables `push_tokens`, `notification_logs`, `spot_follows`
- Fichier de config `configs/notification-types.json` (types extensibles, comme les disciplines et les types d'events)
- Intégration FCM (Firebase Cloud Messaging) + APNs
- Triggers depuis spot-core (ouverture, places limitées) et events-core (annulation, modification, création par un rider suivi)
- Introduit le suivi d'un spot (`spot_follows`), référencé mais jamais spécifié dans spot-core (`followers count`)
- Dépend de rider-social pour le suivi entre riders (`rider_follows`) utilisé par le trigger "rider suivi crée/annule un event", et pour le trigger "nouveau message"
- Préférence de notification par rider (Phase 2)
