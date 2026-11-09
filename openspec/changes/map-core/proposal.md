## Why

La carte est l'écran central de MeetNShred. C'est le premier écran que voit un rider après login — elle doit afficher instantanément tout ce qui se passe autour de lui. Sans carte fonctionnelle, le reste de l'app n'a pas de sens.

## What Changes

- Carte Google Maps en thème monochrome sombre centrée sur la position du rider
- Repères en pin (forme V1) : couleur = catégorie (spot cyan, event vert, session violet, magasin bleu foncé), dessin blanc = ce que c'est (planche de skate pour tout spot, poing, silhouettes, boutique), plein = spot géré / creux = spot libre, badge ✓ ✕ horloge pour l'état, pièce « $ » pour le payant — ces repères remplacent le cercle et le losange du prototype v3
- Events et sessions limités aux 2 prochaines semaines, vifs s'ils sont en cours, plus pâles s'ils sont à venir
- Magasins toujours visibles (pas de fenêtre de temps), avec un badge ouvert/fermé (voir shop-core)
- Première version : la carte est le seul écran de découverte ; la bottom sheet porte le bouton « Je viens » / « Rejoindre »
- Tri lisible en zone dense (en cours ou proche dans le temps, puis distance, puis riders suivis), sans popularité
- Filtres par type (Spots, Events, Sessions, Magasins), par sport et pastille « Gratuit »
- Carte vide : invitation à ajouter un lieu et créer la première session

## Capabilities

### New Capabilities
- `map-core`: Carte principale Google Maps avec marqueurs terrains/events/sessions/magasins, filtres, géolocalisation temps réel du rider

### Modified Capabilities
<!-- aucune -->

## Impact

- Intégration Google Maps API (clé API requise)
- Endpoint géospatial pour récupérer les entités dans un rayon
- Dépend de `shop-core` pour les données magasin (statut ouvert/fermé, type de commerce)
- Dépend de `sessions-core` pour les données session (spot lié, créneau actif/à venir)
- Performance critique — requêtes spatiales optimisées
