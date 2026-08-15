## 1. Base de données

- [ ] 1.1 Créer la table `push_tokens` (id, rider_id, token, platform [ios/android], device_id, created_at, last_used_at, active)
- [ ] 1.2 Créer la table `notification_logs` (id, rider_id, type, payload, status [sent/failed], sent_at)
- [ ] 1.3 Créer la table `spot_follows` (rider_id, spot_id, created_at) avec contrainte UNIQUE (rider_id, spot_id)
- [ ] 1.4 Index sur `push_tokens.rider_id` et `spot_follows.spot_id`
- [ ] 1.5 `rider_follows` est créée par rider-social — vérifier qu'elle existe avant d'activer le trigger 6.5/6.6
- [ ] 1.6 Créer la table `notification_preferences` (rider_id, notification_type, enabled) avec contrainte UNIQUE (rider_id, notification_type) — absence de ligne = activé par défaut

## 2. Config types de notifications

- [ ] 2.1 Créer le fichier `configs/notification-types.json` avec les 6 types MVP (slug, label `{ fr, en, es }`, template)
- [ ] 2.2 Utilitaire `getNotificationType(slug, lang)` — charge la config + résout la langue + interpole les variables

## 3. API — Tokens push et préférences

- [ ] 3.1 `POST /push-tokens` — enregistrement/renouvellement d'un token au login
- [ ] 3.2 `DELETE /push-tokens/:id` — désactivation manuelle (logout)
- [ ] 3.3 `GET /riders/me/notification-preferences` — état activé/désactivé de chaque type
- [ ] 3.4 `PUT /riders/me/notification-preferences/:type` — activer/désactiver un type

## 4. API — Suivi de spot (follow)

- [ ] 4.1 `POST /spots/:id/follow` / `DELETE /spots/:id/follow`
- [ ] 4.2 `GET /riders/me/follows/spots` — spots suivis (pour l'écran de gestion des abonnements)
- [ ] 4.3 Le suivi entre riders (`POST /riders/:id/follow`) est géré par rider-social, pas ici

## 5. Intégration FCM / APNs

- [ ] 5.1 Setup credentials FCM (Firebase) et APNs (certificat/clé)
- [ ] 5.2 Service d'envoi unifié (abstraction FCM/APNs) avec gestion des erreurs définitives → désactivation token ; vérifie `notification_preferences` avant chaque envoi
- [ ] 5.3 Écriture systématique dans `notification_logs` à chaque tentative d'envoi

## 6. Triggers

- [ ] 6.1 Trigger depuis spot-core : changement de statut `closed → open` → notif followers du spot
- [ ] 6.2 Trigger depuis spot-core : places restantes < 20% → notif followers du spot (une fois par session)
- [ ] 6.3 Trigger depuis events-core : annulation d'event → notif inscrits
- [ ] 6.4 Trigger depuis events-core : modification date/heure/lieu → notif inscrits
- [ ] 6.5 Trigger : création d'event par un rider suivi → notif followers du rider
- [ ] 6.6 Trigger : annulation d'un event créé par un rider suivi → notif followers du rider
- [ ] 6.7 Trigger depuis rider-social : envoi d'un message direct → notif au destinataire
- [ ] 6.8 Trigger depuis sessions-core : annulation d'une session → notif aux participants

## 7. Mobile

- [ ] 7.1 Demande de permission notifications à l'onboarding
- [ ] 7.2 Enregistrement du token au login et à chaque renouvellement OS
- [ ] 7.3 Bouton "Suivre" / "Ne plus suivre" sur la page spot (le bouton sur le profil rider est géré par rider-social)
- [ ] 7.4 Gestion du tap sur une notification reçue → deep link vers le spot/event/session/rider concerné
- [ ] 7.5 Écran "Préférences de notification" dans les réglages : un toggle par type, état initial tout activé
