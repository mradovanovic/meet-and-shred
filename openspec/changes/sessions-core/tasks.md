## 1. Base de données

- [ ] 1.1 Créer la table `sessions` (id, creator_id, spot_id, starts_at, note, status [active/cancelled], cancelled_at nullable, created_at)
- [ ] 1.2 Créer la table `session_participants` (session_id, rider_id, joined_at) avec contrainte UNIQUE (session_id, rider_id)
- [ ] 1.3 Index sur `sessions.spot_id` et `sessions.starts_at`

## 2. API

- [ ] 2.1 `POST /sessions` — création (spot_id, starts_at, note) — tout rider connecté
- [ ] 2.2 `GET /sessions/:id` — détail avec participants
- [ ] 2.3 `POST /sessions/:id/join` / `DELETE /sessions/:id/join` — rejoindre/quitter ; retourne un flag `overlap` avec le(s) engagement(s) concerné(s) si chevauchement détecté avec un event ou une autre session du rider
- [ ] 2.4 `GET /spots/:id/sessions` — sessions à venir liées à un spot
- [ ] 2.5 (Phase 2) `GET /sessions` — fil paginé avec filtres (disciplines[] résolues via le spot lié, lat, lng, radius)
- [ ] 2.5b `PATCH /sessions/:id` — modification de l'heure et de la note par le créateur, avec notification aux participants
- [ ] 2.6 `PATCH /sessions/:id/cancel` — annulation (créateur uniquement) + notification push aux participants

## 3. Intégration carte

- [ ] 3.1 Inclure les sessions dans `GET /map/pins`, fenêtre 14 jours, `is_active` calculé comme pour les events (voir map-core)
- [ ] 3.2 Exclure les sessions `cancelled` des résultats carte, fil et recherche

## 4. Mobile

- [ ] 4.1 Écran création de session (choix du spot déjà existant, date/heure, note libre)
- [ ] 4.2 Marqueur session sur la carte, couleur active/à venir
- [ ] 4.3 Page session (spot, créateur, date, participants, bouton rejoindre/quitter, rappel inscription si spot privé)
- [ ] 4.3b Bouton "Annuler la session" visible uniquement pour le créateur ; écran affichant "Session annulée" pour les autres
- [ ] 4.4 Bouton "Créer une session" depuis la page d'un spot (privé ou public)
- [ ] 4.5 Bouton « Rejoindre » dans la bottom sheet d'une session (voir map-core), snackbar « Annuler » 3 secondes, message de chevauchement avec « Rejoindre quand même » / « Annuler » (voir events-core)
- [ ] 4.5b Écran de création : recherche du lieu, et « Ajouter ce lieu » (nom + position) qui crée un spot libre immédiatement (voir spot-core)
- [ ] 4.5c Écran de modification de sa session (heure, note) et prévenir les participants
- [ ] 4.6 (Phase 2, hors première version) Fil de sessions swipable, toggle Events/Sessions (voir navigation-core) et vue liste alternative
- [ ] 4.7 (Phase 2, hors première version) Swipe right avec `overlap` → snackbar signale le conflit en plus du bouton « Annuler »

## 5. Coordination avec les autres changes

- [ ] 5.1 events-core : confirmer le retrait du type `social_ride`, remplacé par ce change
- [ ] 5.2 spot-core : consommer le champ `category` (privé/public) pour l'affichage du rappel d'inscription
- [ ] 5.3 map-core : ajouter les sessions comme 4e type de marqueur, avec filtre dédié
- [ ] 5.4 navigation-core : (Phase 2) intégrer le fil de sessions dans l'écran "Fil" partagé avec events
- [ ] 5.7 notifications-push : ajouter le type « session modifiée » (changement d'horaire)
- [ ] 5.5 notifications-push : ajouter le type "session annulée" (voir notifications-push)
- [ ] 5.6 events-core : la détection de chevauchement croise `session_participants` et `event_inscriptions`, logique partagée entre les deux changes
