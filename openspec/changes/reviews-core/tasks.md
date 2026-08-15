## 1. Base de données

- [ ] 1.1 Créer la table `reviews` (id, rider_id, spot_id nullable, shop_id nullable, event_id nullable, rating [1-5], comment nullable, created_at, updated_at)
- [ ] 1.2 Contrainte : exactement un de spot_id/shop_id/event_id est renseigné
- [ ] 1.3 Contrainte UNIQUE (rider_id, spot_id), (rider_id, shop_id), (rider_id, event_id)
- [ ] 1.4 Index sur `reviews.spot_id`, `reviews.shop_id`, `reviews.event_id`

## 2. API

- [ ] 2.1 `POST /spots/:id/reviews` — vérifie inscription ou participation à une session avant publication
- [ ] 2.2 `POST /shops/:id/reviews` — aucune vérification de participation
- [ ] 2.3 `POST /events/:id/reviews` — vérifie inscription + event terminé + non annulé
- [ ] 2.4 `PUT /reviews/:id` — édition (auteur uniquement)
- [ ] 2.5 `DELETE /reviews/:id` — suppression (auteur uniquement)
- [ ] 2.6 `GET /spots/:id/reviews`, `GET /shops/:id/reviews`, `GET /events/:id/reviews` — liste paginée + note moyenne calculée

## 3. Intégration fiches

- [ ] 3.1 spot-core : afficher note moyenne + nombre d'avis sur la fiche spot
- [ ] 3.2 shop-core : afficher note moyenne + nombre d'avis sur la fiche magasin
- [ ] 3.3 events-core : afficher note moyenne + nombre d'avis sur la fiche event

## 4. Mobile

- [ ] 4.1 Composant note par étoiles + commentaire (formulaire de publication)
- [ ] 4.2 Section avis sur la fiche spot/magasin/event (liste paginée, note moyenne en en-tête)
- [ ] 4.3 Bouton "Laisser un avis" affiché uniquement si la condition de participation est remplie (spot/event) ou toujours (magasin)
- [ ] 4.4 Écran d'édition/suppression de son propre avis
- [ ] 4.5 Bouton "Signaler" sur chaque avis (voir moderation-core)
