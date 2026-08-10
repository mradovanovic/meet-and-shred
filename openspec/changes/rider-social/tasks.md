## 1. Base de données

- [ ] 1.1 Créer la table `rider_follows` (follower_id, followed_id, created_at) avec contrainte UNIQUE (follower_id, followed_id)
- [ ] 1.2 Créer la table `rider_activities` (id, rider_id, type, reference_id, created_at)
- [ ] 1.3 Créer la table `conversations` (id, participant_1_id, participant_2_id, created_at) avec contrainte UNIQUE sur la paire
- [ ] 1.4 Créer la table `messages` (id, conversation_id, sender_id, content, sent_at, read_at)
- [ ] 1.5 Index sur `rider_follows.followed_id`, `rider_activities.rider_id`, `messages.conversation_id`

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

## 5. Mobile

- [ ] 5.1 Bouton "Suivre" / "Ne plus suivre" sur le profil rider
- [ ] 5.2 Écran "Abonnements" (following / followers)
- [ ] 5.3 Fil d'activité (nouvel onglet ou section dédiée)
- [ ] 5.4 Écran liste des conversations
- [ ] 5.5 Écran de conversation (envoi/réception de messages en temps réel)

## 6. Coordination avec les autres changes

- [ ] 6.1 notifications-push : brancher le trigger "rider suivi crée un event" sur `rider_follows` (voir notifications-push)
- [ ] 6.2 notifications-push : ajouter le type "nouveau message" déclenché à l'envoi d'un message
- [ ] 6.3 Trancher et implémenter le blocage/signalement d'un rider avant l'ouverture au public (voir design.md, Open Questions)
