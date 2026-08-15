## 1. Base de données

- [ ] 1.1 Créer la table `sessions` (id, creator_id, spot_id, starts_at, note, created_at)
- [ ] 1.2 Créer la table `session_participants` (session_id, rider_id, joined_at) avec contrainte UNIQUE (session_id, rider_id)
- [ ] 1.3 Index sur `sessions.spot_id` et `sessions.starts_at`

## 2. API

- [ ] 2.1 `POST /sessions` — création (spot_id, starts_at, note) — tout rider connecté
- [ ] 2.2 `GET /sessions/:id` — détail avec participants
- [ ] 2.3 `POST /sessions/:id/join` / `DELETE /sessions/:id/join` — rejoindre/quitter
- [ ] 2.4 `GET /spots/:id/sessions` — sessions à venir liées à un spot
- [ ] 2.5 `GET /sessions` — fil paginé avec filtres (disciplines[] résolues via le spot lié, lat, lng, radius)

## 3. Intégration carte

- [ ] 3.1 Inclure les sessions dans `GET /map/pins`, fenêtre 14 jours, `is_active` calculé comme pour les events (voir map-core)

## 4. Mobile

- [ ] 4.1 Écran création de session (choix du spot déjà existant, date/heure, note libre)
- [ ] 4.2 Marqueur session sur la carte, couleur active/à venir
- [ ] 4.3 Page session (spot, créateur, date, participants, bouton rejoindre/quitter, rappel inscription si spot privé)
- [ ] 4.4 Bouton "Créer une session" depuis la page d'un spot (privé ou public)
- [ ] 4.5 Fil de sessions swipable (composant partagé avec le fil d'events), toggle Events/Sessions (voir navigation-core)
- [ ] 4.6 Vue liste alternative du fil de sessions

## 5. Coordination avec les autres changes

- [ ] 5.1 events-core : confirmer le retrait du type `social_ride`, remplacé par ce change
- [ ] 5.2 spot-core : consommer le champ `category` (privé/public) pour l'affichage du rappel d'inscription
- [ ] 5.3 map-core : ajouter les sessions comme 4e type de marqueur, avec filtre dédié
- [ ] 5.4 navigation-core : intégrer le fil de sessions dans l'écran "Fil" partagé avec events
