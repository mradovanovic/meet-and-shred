## 1. Base de données

- [ ] 1.1 Créer la table `spots` (id, name, description, lat, lng, address, city, country, primary_discipline_id, current_status, max_capacity, price_member, price_non_member, payment_url, payment_method, owner_id, created_at)
- [ ] 1.2 Créer la table `spot_disciplines` (spot_id, discipline_id, is_primary) — liaison N:N
- [ ] 1.3 Créer la table `spot_photos` (id, spot_id, url, position)
- [ ] 1.4 Créer la table `spot_inscriptions` (id, spot_id, rider_id, payment_mode, created_at) avec contrainte UNIQUE (spot_id, rider_id)
- [ ] 1.5 Créer la table `spot_managers` (spot_id, user_id, role) — multi-gestionnaires
- [ ] 1.6 Index géospatial sur `spots.(lat, lng)` et index sur `spots.current_status`

## 2. Configs statuts par discipline

- [ ] 2.1 Créer le dossier `configs/spot-statuses/`
- [ ] 2.2 Créer les fichiers de config pour chaque discipline initiale (mx, dh, enduro, supermoto, fmx, moto-piste, kite, wakeboard, wakeski, snowboard, ski, skateboard, dirtjump) avec labels `{ fr, en, es }`
- [ ] 2.3 Créer le fichier `configs/spot-statuses/_default.json` avec statuts génériques (open, closed) en fallback
- [ ] 2.4 Utilitaire `getSpotStatuses(disciplineSlug, lang)` — charge la config + résout la langue

## 3. API Spots — Publique

- [ ] 3.1 `GET /spots` — liste paginée avec filtres (discipline, status, lat, lng, radius)
- [ ] 3.2 `GET /spots/:id` — détail d'un spot avec statut localisé, places restantes, disciplines
- [ ] 3.3 `GET /spots/nearby` — spots dans un rayon GPS

## 4. API Spots — Inscriptions

- [ ] 4.1 `POST /spots/:id/inscriptions` — inscription avec transaction atomique (SELECT FOR UPDATE)
- [ ] 4.2 `DELETE /spots/:id/inscriptions/me` — désinscription
- [ ] 4.3 `GET /spots/:id/inscriptions` — liste des riders inscrits (gestionnaire uniquement)

## 5. API Spots — Gestionnaire

- [ ] 5.1 `PATCH /spots/:id/status` — mise à jour du statut (gestionnaire uniquement, statut dans la liste de la config discipline)
- [ ] 5.2 `PUT /spots/:id` — édition des infos du spot
- [ ] 5.3 `POST /spots` — création d'un spot (rôle spot_manager requis)
- [ ] 5.7 Intégration geocoding/reverse geocoding — solutioning à définir (Google Places, Mapbox, autre)
- [ ] 5.4 `POST /spots/:id/photos` — upload photos
- [ ] 5.5 `DELETE /spots/:id/photos/:photoId` — suppression photo
- [ ] 5.6 `GET /spots/:id/status-options` — liste des statuts disponibles pour ce spot (selon discipline principale + langue)

## 6. Mobile — Page publique

- [ ] 6.1 Page spot (badge statut coloré + label localisé, disciplines, description, photos, tarifs, places restantes, bouton inscription)
- [ ] 6.2 Bouton inscription avec choix paiement (cash / en ligne)
- [ ] 6.3 Compteur de places restantes avec alerte si <20% disponibles
- [ ] 6.4 Ouverture du lien paiement dans le navigateur natif

## 7. Mobile — Back-office spot (gestionnaire)

- [ ] 7.1 Écran sélection rapide du statut (options chargées dynamiquement depuis la config de la discipline, avec couleurs et labels localisés)
- [ ] 7.2 Écran édition du spot (tarifs, capacité, lien paiement, disciplines)
- [ ] 7.3 Liste des riders inscrits à la session en cours
