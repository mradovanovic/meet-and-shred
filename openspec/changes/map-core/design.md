## Context

La carte est l'écran le plus chargé en données. Elle agrège terrains, events, sessions et magasins. La performance est critique — un rider en mobilité avec une connexion 4G variable ne doit pas attendre plus de 2 secondes pour voir les marqueurs.

Les quatre types de marqueurs n'ont pas la même logique de présence sur la carte : un spot a un statut temps réel (déjà géré par spot-core, spots privés uniquement), un event ou une session n'apparaît que s'il tombe dans les 2 prochaines semaines (au-delà, ça encombrerait la carte sans être actionnable) avec la même distinction active/à venir, un magasin est toujours affiché puisqu'il n'a pas de date — seule sa couleur change selon qu'il est ouvert ou fermé.

## Goals / Non-Goals

**Goals:**
- Google Maps SDK avec thème personnalisé monochrome sombre
- Chargement des marqueurs dans le viewport visible uniquement (pas tout charger)
- Mise à jour automatique quand le rider se déplace (debounce 500ms)
- Filtres persistants entre sessions
- Tap sur marqueur → bottom sheet avec aperçu (nom, statut, distance, places)
- Events et sessions limités à une fenêtre de 2 semaines, avec distinction visuelle "en cours" (couleur active) vs "à venir" (couleur atténuée)
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

**Fenêtre de 2 semaines pour les events et les sessions, avec distinction actif/à venir**
→ `GET /map/pins` ne retourne que les events et sessions dont `starts_at` est entre maintenant et J+14. Un event est "en cours" entre `starts_at` et `ends_at` ; une session (qui n'a pas de champ `ends_at` saisi, voir sessions-core) est "en cours" entre `starts_at` et `starts_at + 3h` (durée par défaut). Sinon l'élément est "à venir" (couleur atténuée). Un élément terminé sort du résultat. Ce filtrage est propre à la carte — le feed d'events (events-core) a sa propre logique d'affichage, pas nécessairement limitée à 14 jours ; les sessions n'ont pas de feed swipable au MVP, seulement la carte et la page du spot.

**Magasins toujours affichés, colorés par statut**
→ Contrairement aux spots (statut manuel du gestionnaire) et aux events (fenêtre de date), un magasin est présent sur la carte en permanence dès lors qu'il est validé. Seule sa couleur change, calculée à la volée depuis ses horaires d'ouverture et une éventuelle fermeture exceptionnelle (voir shop-core). L'icône du marqueur reflète son type de commerce.

**Repères : une grammaire en trois règles (décision du 2026-10-30)**
→ La forme de pin (celle de la V1) et sa **couleur** disent la catégorie : spot cyan, event vert, session violet, magasin bleu foncé. Le **dessin blanc** dit ce que c'est : planche de skate pour tout spot, poing pour un event, deux silhouettes pour une session, boutique/verre/couverts pour un magasin. Le **remplissage** dit géré (plein) ou libre (creux). Un **badge** dit ouvert, fermé ou bientôt (signe en plus de la couleur, pour le daltonisme), le **pâle** dit « plus tard », et la **pièce « $ »** dit payant. Le « $ » est volontairement un signe unique pour toutes les devises : le montant réel s'affiche dans la devise du lieu.

**Ce que ça remplace dans le design system**
→ Le prototype v3 (`design/DESIGN-SYSTEM.md`) définit un repère cercle pour les spots, coloré par statut, avec l'icône de la discipline, et un losange rouge pour les events. Les repères ci-dessus le remplacent. Les couleurs de statut du design system restent utilisées pour les badges, et le rouge de marque n'est plus utilisé sur la carte. Deux conséquences : le sport d'un spot n'est plus visible sur son pin (il l'est dans la bottom sheet et par les filtres), et la couleur des pins de catégorie devra être ajoutée aux tokens.

**Pictogrammes provisoires**
→ Les dessins de la planche de référence sont des ébauches : le poing en particulier est à remplacer par celui dessiné par Romu (V1, `MY EVENTS/poing-titre-noir.png`).

**Tri en zone dense, sans boîte noire**
→ Au-delà de 50 repères, on affiche d'abord ce qui est en cours ou le plus proche dans le temps, puis le plus proche en distance, puis ce où vont des riders suivis. Pas de popularité, pour ne pas écraser les petits spots. Le même tri pourra servir de base au fil de la Phase 2.

**Première version : la carte est le seul écran de découverte**
→ Pas de fil. La carte porte le bouton « Je viens » / « Rejoindre » dans sa bottom sheet (voir events-core, sessions-core). Une carte vide devient un appel à créer : ajouter un lieu et lancer la première session.

## Risks / Trade-offs

- [Coût Google Maps] Facturation à l'usage → Mettre en place un quota par utilisateur côté serveur, utiliser le SDK mobile (moins cher que l'API web)
- [GPS en arrière-plan] Consommation batterie → Géolocalisation active uniquement quand l'app est au premier plan
- [Zones sans terrain] Carte vide décourageante → Afficher un message "Pas de terrain dans cette zone" avec suggestion d'élargir le rayon

## Open Questions

- Rayon par défaut à l'ouverture de la carte : 50 km ou 100 km ?
- Afficher la position temps réel du rider sur la carte (point bleu) ?
