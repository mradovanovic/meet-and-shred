## Why

La carte est l'écran central de MeetNShred. C'est le premier écran que voit un rider après login — elle doit afficher instantanément tout ce qui se passe autour de lui. Sans carte fonctionnelle, le reste de l'app n'a pas de sens.

## What Changes

- Carte Google Maps en thème monochrome sombre centrée sur la position du rider
- Affichage des terrains avec badges de statut colorés
- Affichage des events limités aux 2 prochaines semaines, avec une couleur différente pour un event en cours (actif) et un event pas encore commencé (à venir)
- Affichage des magasins, toujours visibles (pas de fenêtre de temps), colorés selon leur statut ouvert/fermé (voir shop-core)
- Filtres par type (Spots, Events, Magasins) et par distance
- Tap sur un marqueur → aperçu rapide → navigation vers la fiche complète

## Capabilities

### New Capabilities
- `map-core`: Carte principale Google Maps avec marqueurs terrains/events/magasins, filtres, géolocalisation temps réel du rider

### Modified Capabilities
<!-- aucune -->

## Impact

- Intégration Google Maps API (clé API requise)
- Endpoint géospatial pour récupérer les entités dans un rayon
- Dépend de `shop-core` pour les données magasin (statut ouvert/fermé, type de commerce)
- Performance critique — requêtes spatiales optimisées
