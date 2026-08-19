## 1. Base de données

- [ ] 1.1 Créer la table `rider_follows` (follower_id, followed_id, created_at) avec contrainte UNIQUE (follower_id, followed_id)
- [ ] 1.2 Créer la table `rider_activities` (id, rider_id, type, reference_id, created_at)
- [ ] 1.3 Créer la table `conversations` (id, participant_1_id, participant_2_id, created_at) avec contrainte UNIQUE sur la paire
- [ ] 1.4 Créer la table `messages` (id, conversation_id, sender_id, content, sent_at, read_at)
- [ ] 1.5 Créer la table `rider_blocks` (blocker_id, blocked_id, created_at) avec contrainte UNIQUE (blocker_id, blocked_id)
- [ ] 1.6 Créer la table `rider_reports` (id, reporter_id, reported_id, message_id nullable, reason, status [pending/reviewed], created_at, reviewed_by, reviewed_at)
- [ ] 1.7 Index sur `rider_follows.followed_id`, `rider_activities.rider_id`, `messages.conversation_id`, `rider_blocks.blocked_id`, `rider_reports.status`

## 2. API — Suivi

- [ ] 2.1 `POST /riders/:id/follow` / `DELETE /riders/:id/follow`
- [ ] 2.2 `GET /riders/:id/followers`, `GET /riders/:id/following`

## 3. API — Fil d'activité

- [ ] 3.1 `GET /riders/me/activity-feed` — paginé, agrège les activités des riders suivis par date décroissante
- [ ] 3.2 Écriture d'une entrée `rider_activities` à chaque event rejoint (events-core), event créé (events-core), setup ajouté (rider-equipment)

## 4. API — Messagerie

- [ ] 4.1 `GET /conversations` — liste des conversations du rider connecté
- [ ] 4.2 `POST /conversations/:riderId/messages` — envoi d'un message (crée la conversation si elle n'existe pas)
- [ ] 4.3 `GET /conversations/:id/messages` — historique paginé
- [ ] 4.4 `PATCH /conversations/:id/read` — marquer les messages comme lus
- [ ] 4.5 Vérifier l'absence de blocage actif avant d'autoriser l'envoi d'un message (`rider_blocks`)

## 5. API — Blocage et signalement

- [ ] 5.1 `POST /riders/:id/block` / `DELETE /riders/:id/block` — bloquer/débloquer, supprime le suivi existant dans les deux sens au blocage
- [ ] 5.2 `POST /riders/:id/reports` — signaler un profil (motif)
- [ ] 5.3 `POST /messages/:id/reports` — signaler un message (motif)
- [ ] 5.4 `GET /admin/reports` — file de signalements en attente (super admin)
- [ ] 5.5 `PATCH /admin/reports/:id` — marquer un signalement comme traité, avec action optionnelle (blocage/suspension du compte signalé)
- [ ] 5.6 Filtrer profils, activités et conversations pour exclure les paires bloquées dans toutes les lectures concernées (following, activity-feed, conversations)

## 6. Mobile

- [ ] 6.1 Bouton "Suivre" / "Ne plus suivre" sur le profil rider
- [ ] 6.2 Écran "Abonnements" (following / followers)
- [ ] 6.3 Fil d'activité (nouvel onglet ou section dédiée)
- [ ] 6.4 Écran liste des conversations
- [ ] 6.5 Écran de conversation (envoi/réception de messages en temps réel)
- [ ] 6.6 Bouton "Bloquer" / "Signaler" sur le profil rider et sur un message dans une conversation
- [ ] 6.7 Écran super admin : file de signalements, action de traitement

## 7. Coordination avec les autres changes

- [ ] 7.1 notifications-push : brancher le trigger "rider suivi crée un event" sur `rider_follows` (voir notifications-push)
- [ ] 7.2 notifications-push : ajouter le type "nouveau message" déclenché à l'envoi d'un message
