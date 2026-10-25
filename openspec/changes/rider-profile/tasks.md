## 1. Base de données

- [ ] 1.1 Créer la table `disciplines` (id, slug, label, icon, category, equipment_schema JSONB, display_order)
- [ ] 1.2 Créer la table `rider_profiles` (user_id, level, bio, location_label, updated_at)
- [ ] 1.3 Créer la table `rider_disciplines` (rider_id, discipline_id) — liaison N:N
- [ ] 1.4 Créer la table `rider_equipment` (id, rider_id, discipline_id, name, fields JSONB, display_order, created_at)
- [ ] 1.5b Créer la table `rider_equipment_photos` (id, equipment_id, url, position) — max 3 par setup
- [ ] 1.5 Créer la table `rider_photos` (id, rider_id, url, position, created_at)
- [ ] 1.6 Seeder les disciplines initiales avec leur `equipment_schema` :
  - MX, Enduro, Supermoto, FMX, Moto piste → `{brand, model, year, displacement}`
  - DH, Dirt Jump → `{brand, model, frame_size}`
  - Kite → `{kite_brand, kite_size, board_brand, board_model}`
  - Wakeboard, Wakeski → `{brand, model, size}`
  - Snowboard, Ski → `{brand, model, size_cm}`
  - Skateboard → `{deck_brand, deck_size, trucks, wheels}`

## 2. API Profil

- [ ] 2.1 `GET /riders/:id` — profil public (photos, disciplines, level, bio, equipment groupé par discipline)
- [ ] 2.2 `PUT /riders/me` — mise à jour du profil (bio, level, localisation)
- [ ] 2.3 `PUT /riders/me/disciplines` — mise à jour des disciplines sélectionnées, rejet si plus de 5 (validation côté serveur, pas seulement côté UI)
- [ ] 2.4 `GET /disciplines` — liste complète avec schémas matériel, groupée par catégorie

## 3. API Matériel

- [ ] 3.1 `POST /riders/me/equipment` — ajout d'un setup (discipline_id, name, fields JSONB)
- [ ] 3.2 `PUT /riders/me/equipment/:id` — édition d'un setup
- [ ] 3.3 `DELETE /riders/me/equipment/:id` — suppression d'un setup
- [ ] 3.4 `PUT /riders/me/equipment/order` — réorganisation des setups

## 4. API Photos profil

- [ ] 4.1 `POST /riders/me/photos` — upload photo profil (max 5 MB, JPEG/PNG)
- [ ] 4.2 `DELETE /riders/me/photos/:id` — suppression
- [ ] 4.3 `PUT /riders/me/photos/order` — réorganisation
- [ ] 4.4 Compression auto côté serveur avant stockage cloud (max 1200px, qualité 85%)
- [ ] 4.5 Intégration stockage cloud (R2 ou S3) — solutioning à définir

## 4b. API Photos matériel

- [ ] 4b.1 `POST /riders/me/equipment/:id/photos` — upload photo setup (max 3 par setup, 5 MB, JPEG/PNG)
- [ ] 4b.2 `DELETE /riders/me/equipment/:id/photos/:photoId` — suppression
- [ ] 4b.3 `PUT /riders/me/equipment/:id/photos/order` — réorganisation (1ère = couverture)

## 5. Mobile — Onboarding profil

- [ ] 5.1 Écran sélection disciplines (grille avec icônes par catégorie, multi-sélection, limite de 5 avec compteur visible et cases désactivées une fois le plafond atteint)
- [ ] 5.2 Écran sélection niveau (Débutant / Amateur / Confirmé / Expert)
- [ ] 5.3 Écran ajout matériel : formulaire dynamique généré depuis `equipment_schema` de la discipline
- [ ] 5.4 Écran bio + localisation principale (skippable)

## 6. Mobile — Profil public

- [ ] 6.1 Carrousel photos avec effet parallax au scroll
- [ ] 6.2 Section disciplines avec niveau
- [ ] 6.3 Cards matériel groupées par discipline (nom du setup + champs structurés)
- [ ] 6.4 Bio et localisation principale
- [ ] 6.5 Bouton "Ajouter un setup" par discipline sur son propre profil
- [ ] 6.6 Carrousel photos (max 3) sur chaque card matériel

## 7. Mobile — Gestion du profil

- [ ] 7.1 Écran édition profil (bio, niveau, localisation)
- [ ] 7.1b Écran édition disciplines (même limite de 5, ajout/retrait, rafraîchissement du contenu carte/feed après sauvegarde)
- [ ] 7.2 Formulaire ajout/édition setup avec champs dynamiques selon la discipline
- [ ] 7.3 Galerie photos avec upload, suppression et drag-and-drop
