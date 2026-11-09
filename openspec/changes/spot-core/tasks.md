## 1. Base de données

- [ ] 1.1 Créer la table `spots` (id, name, category [private/public], description, lat, lng, address, city, country, primary_discipline_id, current_status nullable, max_capacity nullable, price_member nullable, price_non_member nullable, payment_url nullable, payment_method nullable, owner_id nullable, created_by, hidden_at nullable, status [pending/published], created_at) — les champs de gestion commerciale et de statut sont nullables et ignorés pour les spots publics ; un spot public est créé directement en `published`
- [ ] 1.2 Créer la table `spot_disciplines` (spot_id, discipline_id, is_primary) — liaison N:N
- [ ] 1.3 Créer la table `spot_photos` (id, spot_id, url, position)
- [ ] 1.4 Créer la table `spot_inscriptions` (id, spot_id, rider_id, payment_mode, created_at) avec contrainte UNIQUE (spot_id, rider_id)
- [ ] 1.5 Créer la table `spot_managers` (spot_id, user_id, role) — multi-gestionnaires
- [ ] 1.6 Index géospatial sur `spots.(lat, lng)` et index sur `spots.current_status`
- [ ] 1.7 Créer la table `spot_views` (spot_id, day, count) — compteur de vues agrégé par jour

## 2. Configs statuts par discipline

- [ ] 2.1 Créer le dossier `configs/spot-statuses/`
- [ ] 2.2 Créer les fichiers de config pour chaque discipline initiale (mx, dh, enduro, supermoto, fmx, moto-piste, kite, wakeboard, wakeski, snowboard, ski, skateboard, dirtjump) avec labels `{ fr, en, es }`
- [ ] 2.3 Créer le fichier `configs/spot-statuses/_default.json` avec statuts génériques (open, closed) en fallback
- [ ] 2.4 Utilitaire `getSpotStatuses(disciplineSlug, lang)` — charge la config + résout la langue

## 3. API Spots — Publique

- [ ] 3.1 `GET /spots` — liste paginée avec filtres (discipline, status, lat, lng, radius)
- [ ] 3.2 `GET /spots/:id` — détail d'un spot avec statut localisé, places restantes, disciplines ; incrémente `spot_views` du jour à chaque consultation
- [ ] 3.3 `GET /spots/nearby` — spots dans un rayon GPS
- [ ] 3.4 `GET /spots/:id/share` — génération du deep link de partage (même principe que events-core)

## 4. API Spots — Inscriptions

- [ ] 4.1 `POST /spots/:id/inscriptions` — inscription avec transaction atomique (SELECT FOR UPDATE)
- [ ] 4.2 `DELETE /spots/:id/inscriptions/me` — désinscription
- [ ] 4.3 `GET /spots/:id/inscriptions` — liste des riders inscrits (gestionnaire uniquement)

## 5. API Spots — Gestionnaire et soumission

- [ ] 5.1 `PATCH /spots/:id/status` — mise à jour du statut (gestionnaire uniquement, spots privés uniquement, statut dans la liste de la config discipline)
- [ ] 5.2 `PUT /spots/:id` — édition des infos du spot (gestionnaire pour un spot privé, soumissionnaire ou super admin pour un spot public)
- [ ] 5.3 `POST /spots` — création d'un spot : rôle spot_manager requis et statut initial "pending" si `category=private` ; aucun rôle requis et statut "published" immédiat si `category=public` (nom + position seulement)
- [ ] 5.3b `GET /spots/similar?lat=&lng=&name=` — spots existants à moins de 200 m, appelé avant toute création de spot libre (anti-doublon)
- [ ] 5.3c Limite de créations de spots libres par rider sur 24 h (plus stricte pour un compte récent)
- [ ] 5.3d `POST /spots/:id/claim` — revendication d'un spot libre par un gestionnaire ; validation super admin ; passage en `category=private` avec conservation des sessions
- [ ] 5.7 Intégration geocoding/reverse geocoding — solutioning à définir (Google Places, Mapbox, autre)
- [ ] 5.4 `POST /spots/:id/photos` — upload photos
- [ ] 5.5 `DELETE /spots/:id/photos/:photoId` — suppression photo
- [ ] 5.6 `GET /spots/:id/status-options` — liste des statuts disponibles pour ce spot (spots privés uniquement, selon discipline principale + langue)
- [ ] 5.8 `GET /spots/pending` — liste des spots privés en attente de validation et des demandes de revendication (super admin)
- [ ] 5.9 `POST /spots/:id/validate` — validation et publication (super admin)
- [ ] 5.10 `GET /spots/:id/stats` — vues des 30 derniers jours, total inscriptions, nombre de followers (gestionnaire uniquement)

## 6. Mobile — Page publique

- [ ] 6.1 Page spot privé (badge statut coloré + label localisé, disciplines, description, photos, tarifs, places restantes, bouton inscription)
- [ ] 6.1b Page spot public (disciplines, description, photos, liste des sessions à venir, bouton "Créer une session")
- [ ] 6.2 Bouton inscription avec choix paiement (cash / en ligne) — spots privés
- [ ] 6.3 Compteur de places restantes avec alerte si <20% disponibles — spots privés
- [ ] 6.4 Ouverture du lien paiement dans le navigateur natif — spots privés
- [ ] 6.6 Écran « Ajouter un lieu » : deux champs (nom, position sur la carte), suggestion des spots proches avant création ; un spot payant géré passe par un formulaire distinct réservé aux gestionnaires
- [ ] 6.8 Affichage « Gratuit » ou prix dans la devise du lieu sur la bottom sheet et la fiche
- [ ] 6.7 Bouton "Partager" sur la page spot (privé et public)

## 7. Mobile — Back-office spot (gestionnaire de spot privé)

- [ ] 7.1 Écran sélection rapide du statut (options chargées dynamiquement depuis la config de la discipline, avec couleurs et labels localisés)
- [ ] 7.2 Écran édition du spot (tarifs, capacité, lien paiement, disciplines)
- [ ] 7.3 Liste des riders inscrits à la session en cours
- [ ] 7.4 Écran super admin : validation des spots privés en attente et des demandes de revendication
- [ ] 7.5 Onglet statistiques dans le back-office (vues 30 jours, inscriptions cumulées, followers)
