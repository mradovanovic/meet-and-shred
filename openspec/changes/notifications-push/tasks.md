## 1. Base de données

- [ ] 1.1 Créer la table `push_tokens` (id, rider_id, token, platform [ios/android], device_id, created_at, last_used_at, active)
- [ ] 1.2 Créer la table `notification_logs` (id, rider_id, type, payload, status [sent/failed], sent_at)
- [ ] 1.3 Créer la table `spot_follows` (rider_id, spot_id, created_at) avec contrainte UNIQUE (rider_id, spot_id)
- [ ] 1.4 Créer la table `rider_follows` (follower_id, followed_id, created_at) avec contrainte UNIQUE (follower_id, followed_id)
- [ ] 1.5 Index sur `push_tokens.rider_id`, `spot_follows.spot_id`, `rider_follows.followed_id`

## 2. Config types de notifications

- [ ] 2.1 Créer le fichier `configs/notification-types.json` avec les 4 types MVP (slug, label `{ fr, en, es }`, template)
- [ ] 2.2 Utilitaire `getNotificationType(slug, lang)` — charge la config + résout la langue + interpole les variables

## 3. API — Tokens push

- [ ] 3.1 `POST /push-tokens` — enregistrement/renouvellement d'un token au login
- [ ] 3.2 `DELETE /push-tokens/:id` — désactivation manuelle (logout)

## 4. API — Suivi (follow)

- [ ] 4.1 `POST /spots/:id/follow` / `DELETE /spots/:id/follow`
- [ ] 4.2 `POST /riders/:id/follow` / `DELETE /riders/:id/follow`
- [ ] 4.3 `GET /riders/me/follows` — spots et riders suivis (pour l'écran de gestion des abonnements)

## 5. Intégration FCM / APNs

- [ ] 5.1 Setup credentials FCM (Firebase) et APNs (certificat/clé)
- [ ] 5.2 Service d'envoi unifié (abstraction FCM/APNs) avec gestion des erreurs définitives → désactivation token
- [ ] 5.3 Écriture systématique dans `notification_logs` à chaque tentative d'envoi

## 6. Triggers

- [ ] 6.1 Trigger depuis spot-core : changement de statut `closed → open` → notif followers du spot
- [ ] 6.2 Trigger depuis spot-core : places restantes < 20% → notif followers du spot (une fois par session)
- [ ] 6.3 Trigger depuis events-core : annulation d'event → notif inscrits
- [ ] 6.4 Trigger depuis events-core : modification date/heure/lieu → notif inscrits
- [ ] 6.5 Trigger : création d'event par un rider suivi → notif followers du rider
- [ ] 6.6 Trigger : annulation d'un event créé par un rider suivi → notif followers du rider

## 7. Mobile

- [ ] 7.1 Demande de permission notifications à l'onboarding
- [ ] 7.2 Enregistrement du token au login et à chaque renouvellement OS
- [ ] 7.3 Bouton "Suivre" / "Ne plus suivre" sur la page spot et le profil rider
- [ ] 7.4 Gestion du tap sur une notification reçue → deep link vers le spot/event/rider concerné
