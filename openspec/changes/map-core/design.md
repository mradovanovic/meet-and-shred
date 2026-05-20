## Context

La carte est l'écran le plus chargé en données. Elle agrège terrains, events et (Phase 2) magasins. La performance est critique — un rider en mobilité avec une connexion 4G variable ne doit pas attendre plus de 2 secondes pour voir les marqueurs.

## Goals / Non-Goals

**Goals:**
- Google Maps SDK avec thème personnalisé monochrome sombre
- Chargement des marqueurs dans le viewport visible uniquement (pas tout charger)
- Mise à jour automatique quand le rider se déplace (debounce 500ms)
- Filtres persistants entre sessions
- Tap sur marqueur → bottom sheet avec aperçu (nom, statut, distance, places)

**Non-Goals:**
- Clustering de marqueurs au MVP (si trop de terrains proches — Phase 2)
- Navigation GPS intégrée (ouverture de l'app maps native)
- Mode hors ligne
- Magasins sur la carte (Phase 2)

## Decisions

**Google Maps vs MapLibre/Mapbox**
→ Google Maps. Cahier des charges l'impose explicitement. Meilleure couverture en France/Europe pour les terrains MX ruraux.

**Thème monochrome sombre**
→ JSON de style Google Maps personnalisé. Palette sombre qui met en valeur les badges colorés des terrains. Cohérent avec l'identité visuelle MeetNShred.

**Chargement par viewport**
→ `GET /map/pins?lat=&lng=&radius=&types=` retourne tous les marqueurs dans le rayon visible. Radius calculé depuis le zoom level. Debounce 500ms sur le déplacement de caméra.

**Clustering différé**
→ Pas de clustering au MVP. Si plus de 50 marqueurs dans le viewport → afficher les 50 plus proches uniquement.

## Risks / Trade-offs

- [Coût Google Maps] Facturation à l'usage → Mettre en place un quota par utilisateur côté serveur, utiliser le SDK mobile (moins cher que l'API web)
- [GPS en arrière-plan] Consommation batterie → Géolocalisation active uniquement quand l'app est au premier plan
- [Zones sans terrain] Carte vide décourageante → Afficher un message "Pas de terrain dans cette zone" avec suggestion d'élargir le rayon

## Open Questions

- Rayon par défaut à l'ouverture de la carte : 50 km ou 100 km ?
- Afficher la position temps réel du rider sur la carte (point bleu) ?
