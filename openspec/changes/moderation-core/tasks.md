## 1. Base de données

- [ ] 1.1 Créer la table `content_reports` (id, reporter_id, spot_id nullable, shop_id nullable, event_id nullable, review_id nullable, reason, status [pending/reviewed], action_taken nullable [hidden/deleted/warned/dismissed], created_at, reviewed_by, reviewed_at)
- [ ] 1.2 Contrainte : exactement un de spot_id/shop_id/event_id/review_id est renseigné
- [ ] 1.3 Contrainte : un seul signalement `pending` par (reporter_id, cible)
- [ ] 1.4 Ajouter un champ `hidden_at` nullable sur `spots`, `shops`, `events` pour le masquage réversible

## 2. API

- [ ] 2.1 `POST /spots/:id/reports`, `POST /shops/:id/reports`, `POST /events/:id/reports`, `POST /reviews/:id/reports` — création d'un signalement
- [ ] 2.2 `GET /admin/content-reports` — file de signalements en attente (super admin)
- [ ] 2.3 `PATCH /admin/content-reports/:id` — traitement (action : hide/delete/warn/dismiss)
- [ ] 2.4 Exclure les spots/shops/events avec `hidden_at` renseigné des résultats de recherche, de la carte et des fils

## 3. Mobile

- [ ] 3.1 Bouton "Signaler" sur la fiche spot, la fiche magasin, la fiche event, et sur chaque avis
- [ ] 3.2 Écran de sélection du motif de signalement
- [ ] 3.3 Écran super admin : file de modération de contenu, avec lien vers chaque cible et actions de traitement
