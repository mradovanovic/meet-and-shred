## Context

La carte est l'écran le plus chargé en données. Elle agrège terrains, events et magasins. La performance est critique — un rider en mobilité avec une connexion 4G variable ne doit pas attendre plus de 2 secondes pour voir les marqueurs.

Les trois types de marqueurs n'ont pas la même logique de présence sur la carte : un spot a un statut temps réel (déjà géré par spot-core), un event n'apparaît que s'il tombe dans les 2 prochaines semaines (au-delà, il encombrerait la carte sans être actionnable), un magasin est toujours affiché puisqu'il n'a pas de date — seule sa couleur change selon qu'il est ouvert ou fermé.

## Goals / Non-Goals

**Goals:**
- Google Maps SDK avec thème personnalisé monochrome sombre
- Chargement des marqueurs dans le viewport visible uniquement (pas tout charger)
- Mise à jour automatique quand le rider se déplace (debounce 500ms)
- Filtres persistants entre sessions
- Tap sur marqueur → bottom sheet avec aperçu (nom, statut, distance, places)
- Events limités à une fenêtre de 2 semaines, avec distinction visuelle "en cours" (couleur active) vs "à venir" (couleur atténuée)
- Magasins toujours affichés (pas de fenêtre temporelle), colorés ouvert/fermé, icône selon leur type de commerce (voir shop-core)

**Non-Goals:**
- Clustering de marqueurs au MVP (si trop de terrains proches — Phase 2)
- Navigation GPS intégrée (ouverture de l'app maps native)
- Mode hors ligne

## Decisions

**Google Maps vs MapLibre/Mapbox**
→ Google Maps. Cahier des charges l'impose explicitement. Meilleure couverture en France/Europe pour les terrains MX ruraux.

**Thème monochrome sombre**
→ JSON de style Google Maps personnalisé. Palette sombre qui met en valeur les badges colorés des terrains. Cohérent avec l'identité visuelle MeetNShred.

**Chargement par viewport**
→ `GET /map/pins?lat=&lng=&radius=&types=` retourne tous les marqueurs dans le rayon visible. Radius calculé depuis le zoom level. Debounce 500ms sur le déplacement de caméra.

**Clustering différé**
→ Pas de clustering au MVP. Si plus de 50 marqueurs dans le viewport → afficher les 50 plus proches uniquement.

**Fenêtre de 2 semaines pour les events, avec distinction actif/à venir**
→ `GET /map/pins` ne retourne que les events dont `starts_at` est entre maintenant et J+14. Un event dont l'heure actuelle est comprise entre `starts_at` et `ends_at` est "en cours" (couleur active) ; sinon il est "à venir" (couleur atténuée). Un event terminé (`ends_at` dépassé) sort du résultat. Ce filtrage est propre à la carte — le feed d'events (events-core) a sa propre logique d'affichage, pas nécessairement limitée à 14 jours.

**Magasins toujours affichés, colorés par statut**
→ Contrairement aux spots (statut manuel du gestionnaire) et aux events (fenêtre de date), un magasin est présent sur la carte en permanence dès lors qu'il est validé. Seule sa couleur change, calculée à la volée depuis ses horaires d'ouverture et une éventuelle fermeture exceptionnelle (voir shop-core). L'icône du marqueur reflète son type de commerce.

## Risks / Trade-offs

- [Coût Google Maps] Facturation à l'usage → Mettre en place un quota par utilisateur côté serveur, utiliser le SDK mobile (moins cher que l'API web)
- [GPS en arrière-plan] Consommation batterie → Géolocalisation active uniquement quand l'app est au premier plan
- [Zones sans terrain] Carte vide décourageante → Afficher un message "Pas de terrain dans cette zone" avec suggestion d'élargir le rayon

## Open Questions

- Rayon par défaut à l'ouverture de la carte : 50 km ou 100 km ?
- Afficher la position temps réel du rider sur la carte (point bleu) ?
