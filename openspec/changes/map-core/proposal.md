## Why

La carte est l'écran central de MeetNShred. C'est le premier écran que voit un rider après login — elle doit afficher instantanément tout ce qui se passe autour de lui. Sans carte fonctionnelle, le reste de l'app n'a pas de sens.

## What Changes

- Carte Google Maps en thème monochrome sombre centrée sur la position du rider
- Affichage des terrains avec badges de statut colorés
- Affichage des events en cours et à venir
- Filtres par type (terrains, events) et par distance
- Tap sur un marqueur → aperçu rapide → navigation vers la fiche complète

## Capabilities

### New Capabilities
- `map-core`: Carte principale Google Maps avec marqueurs terrains/events, filtres, géolocalisation temps réel du rider

### Modified Capabilities
<!-- aucune -->

## Impact

- Intégration Google Maps API (clé API requise)
- Endpoint géospatial pour récupérer les entités dans un rayon
- Performance critique — requêtes spatiales optimisées
