## 1. Base de données

- [ ] 1.1 Créer la table `shops` (id, name, description, lat, lng, address, city, country, owner_id, status [pending/published], created_at)
- [ ] 1.2 Créer la table `shop_disciplines` (shop_id, discipline_id, is_primary) — liaison N:N
- [ ] 1.3 Créer la table `shop_photos` (id, shop_id, url, position)
- [ ] 1.4 Créer la table `brands` (id, name, logo_url) — liste ouverte
- [ ] 1.5 Créer la table `shop_brands` (shop_id, brand_id) — liaison N:N
- [ ] 1.6 Créer la table `shop_opening_hours` (id, shop_id, day_of_week, opens_at, closes_at)
- [ ] 1.7 Index géospatial sur `shops.(lat, lng)`

## 2. API magasins — Publique

- [ ] 2.1 `GET /shops` — liste paginée avec filtres (discipline, marque, lat, lng, radius)
- [ ] 2.2 `GET /shops/:id` — détail d'un magasin avec statut ouvert/fermé calculé, horaires, marques
- [ ] 2.3 `GET /shops/nearby` — magasins dans un rayon GPS

## 3. API magasins — Gestionnaire

- [ ] 3.1 `POST /shops` — soumission d'une fiche magasin (rôle gestionnaire requis), statut initial "pending"
- [ ] 3.2 `PUT /shops/:id` — édition des infos du magasin
- [ ] 3.3 `POST /shops/:id/photos` — upload photos
- [ ] 3.4 `DELETE /shops/:id/photos/:photoId` — suppression photo
- [ ] 3.5 `PUT /shops/:id/opening-hours` — édition des horaires d'ouverture

## 4. API marques

- [ ] 4.1 `GET /brands` — liste des marques existantes (autocomplete)
- [ ] 4.2 `POST /brands` — création d'une nouvelle marque si absente de la liste

## 5. API validation et transfert (super admin)

- [ ] 5.1 `GET /shops/pending` — liste des fiches en attente de validation
- [ ] 5.2 `POST /shops/:id/validate` — validation et publication
- [ ] 5.3 `POST /shops/:id/transfer` — transfert de la gestion à un autre utilisateur

## 6. Intégration events

- [ ] 6.1 Vérifier/adapter la création d'event de type `shop_event` pour qu'elle soit ouverte au gestionnaire du magasin lié (voir events-core)

## 7. Intégration carte

- [ ] 7.1 Ajouter les magasins comme nouveau type de marqueur sur la carte principale (voir map-core)
- [ ] 7.2 Filtre carte dédié "Magasins"

## 8. Mobile

- [ ] 8.1 Fiche magasin publique (horaires, marques, disciplines, photos, statut ouvert/fermé, bouton "Créer un event")
- [ ] 8.2 Écran gestionnaire : édition fiche, horaires, marques, photos
- [ ] 8.3 Écran de soumission d'une nouvelle fiche magasin (commerçant)
- [ ] 8.4 Écran super admin : validation des fiches en attente, transfert de gestion
