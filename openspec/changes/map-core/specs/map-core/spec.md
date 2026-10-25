## ADDED Requirements

### Requirement: Carte centrale Google Maps thème sombre
Le système SHALL afficher une carte Google Maps avec un style monochrome sombre centrée sur la position GPS du rider à l'ouverture de l'app.

#### Scenario: Ouverture avec géolocalisation active
- **WHEN** le rider ouvre l'app avec la géolocalisation active
- **THEN** la carte s'affiche centrée sur sa position avec les marqueurs dans un rayon de 50 km, filtrés sur ses disciplines

#### Scenario: Géolocalisation refusée
- **WHEN** le rider a refusé la géolocalisation
- **THEN** la carte s'affiche avec un champ de recherche autocomplete en premier plan pour saisir sa zone manuellement

#### Scenario: Géolocalisation indisponible temporairement
- **WHEN** la géolocalisation est active mais momentanément indisponible
- **THEN** la carte s'affiche sur la dernière position connue avec un indicateur "Position approximative"

---

### Requirement: Marqueurs spots
Le système SHALL afficher chaque spot comme un marqueur circulaire coloré selon son statut, avec l'icône de sa discipline principale au centre. Les spots avec `visible_on_map: false` ne SHALL pas apparaître.

#### Scenario: Tap sur un marqueur spot
- **WHEN** le rider tape sur un marqueur spot
- **THEN** une bottom sheet s'affiche avec : nom, badge statut localisé, discipline principale, distance, places restantes, bouton "Voir le spot"

---

### Requirement: Marqueurs events
Le système SHALL afficher les events dont la date de début est comprise entre maintenant et les 2 prochaines semaines (14 jours) comme des marqueurs en forme de losange, distincts des spots et des magasins. Un event en cours (entre son heure de début et de fin) SHALL être affiché dans une couleur active distincte d'un event à venir mais pas encore commencé, affiché dans une couleur atténuée.

#### Scenario: Event en cours
- **WHEN** un event a commencé et n'est pas encore terminé
- **THEN** son marqueur s'affiche dans la couleur "actif"

#### Scenario: Event à venir dans la fenêtre des 2 semaines
- **WHEN** un event commence dans 5 jours
- **THEN** son marqueur s'affiche dans la couleur "à venir" (atténuée), le distinguant visuellement des events en cours

#### Scenario: Event hors fenêtre
- **WHEN** un event commence dans plus de 2 semaines
- **THEN** il n'apparaît pas encore sur la carte, même s'il reste visible dans le feed d'events (voir events-core)

#### Scenario: Event terminé
- **WHEN** l'heure de fin d'un event est dépassée
- **THEN** son marqueur disparaît de la carte

#### Scenario: Tap sur un marqueur event
- **WHEN** le rider tape sur un marqueur event
- **THEN** une bottom sheet s'affiche avec : titre, date, statut (en cours / à venir), discipline, distance, bouton "Voir l'event"

---

### Requirement: Marqueurs sessions
Le système SHALL afficher les sessions dont la date de début est comprise entre maintenant et les 2 prochaines semaines (14 jours) comme des marqueurs distincts des spots, events et magasins (voir sessions-core). Une session en cours SHALL être affichée dans une couleur active ; une session à venir mais pas encore commencée SHALL être affichée dans une couleur atténuée — même logique que pour les events.

#### Scenario: Session à venir
- **WHEN** une session commence dans 3 jours
- **THEN** son marqueur s'affiche dans la couleur "à venir", positionné sur le spot concerné

#### Scenario: Session en cours
- **WHEN** l'heure actuelle est comprise dans la plage d'une session
- **THEN** son marqueur s'affiche dans la couleur "active"

#### Scenario: Session hors fenêtre
- **WHEN** une session commence dans plus de 2 semaines
- **THEN** elle n'apparaît pas encore sur la carte

#### Scenario: Tap sur un marqueur session
- **WHEN** le rider tape sur un marqueur session
- **THEN** une bottom sheet s'affiche avec : spot lié, créateur, date, nombre de participants, bouton "Rejoindre"

---

### Requirement: Marqueurs magasins
Le système SHALL afficher chaque magasin validé comme un marqueur visuellement distinct des spots et des events (voir shop-core), coloré selon son statut ouvert/fermé et portant l'icône de son type de commerce. Contrairement aux events, les magasins SHALL toujours être affichés sur la carte, sans filtre de fenêtre temporelle.

#### Scenario: Magasin ouvert actuellement
- **WHEN** un magasin est dans un créneau d'ouverture au moment de la consultation
- **THEN** son marqueur s'affiche dans la couleur "ouvert"

#### Scenario: Magasin fermé
- **WHEN** un magasin est en dehors de ses horaires d'ouverture ou en fermeture exceptionnelle
- **THEN** son marqueur s'affiche dans la couleur "fermé"

#### Scenario: Tap sur un marqueur magasin
- **WHEN** le rider tape sur un marqueur magasin
- **THEN** une bottom sheet s'affiche avec : nom, type de commerce, statut ouvert/fermé, distance, bouton "Voir le magasin"

---

### Requirement: Clustering des marqueurs
Le système SHALL regrouper les marqueurs proches en un cluster affichant le nombre d'éléments groupés. Un tap sur un cluster SHALL zoomer sur la zone pour révéler les marqueurs individuels.

#### Scenario: Zone dense
- **WHEN** plusieurs spots sont proches au niveau de zoom actuel
- **THEN** ils sont regroupés en un seul cluster avec un badge indiquant le nombre (ex : "12")

#### Scenario: Dézoom sur un cluster
- **WHEN** le rider tape sur un cluster
- **THEN** la carte zoome automatiquement jusqu'au niveau où les marqueurs individuels sont visibles

---

### Requirement: Filtres discipline et type
La carte SHALL s'ouvrir pré-filtrée sur les disciplines du rider. Le rider SHALL pouvoir modifier les filtres par type (Spots, Events, Sessions, Magasins) et par discipline (ses disciplines par défaut, toggle "Toutes"). Les magasins sans discipline associée (ex : bar, restaurant) SHALL rester visibles quel que soit le filtre discipline actif, tant que le type "Magasins" est activé. Les filtres SHALL persister entre les sessions de l'utilisateur (à ne pas confondre avec les sessions de ride affichées sur la carte).

#### Scenario: Ouverture pré-filtrée
- **WHEN** un rider pratiquant MX et Kite ouvre la carte
- **THEN** seuls les spots et events MX et Kite sont affichés par défaut, ainsi que tous les magasins (ceux liés à MX/Kite et ceux sans discipline, comme les bars et restaurants)

#### Scenario: Toggle toutes disciplines
- **WHEN** le rider active "Toutes les disciplines"
- **THEN** tous les spots et events de la zone sont affichés quelle que soit leur discipline

#### Scenario: Filtres persistants
- **WHEN** le rider modifie ses filtres puis ferme l'app
- **THEN** les mêmes filtres sont actifs à la prochaine ouverture

---

### Requirement: Recherche globale sur la carte
Le système SHALL fournir une barre de recherche permettant de trouver un spot ou event par nom ou lieu, distincte du champ de zone du mode sans géoloc.

#### Scenario: Recherche par nom de spot
- **WHEN** le rider tape "Moto Club" dans la barre de recherche
- **THEN** les spots correspondants apparaissent dans une liste de résultats, et un tap centre la carte sur le spot sélectionné

#### Scenario: Recherche par lieu
- **WHEN** le rider tape "Bordeaux" dans la barre de recherche
- **THEN** la carte se recentre sur Bordeaux et charge les marqueurs de la zone

---

### Requirement: Chargement par zone visible
Le système SHALL charger uniquement les marqueurs visibles dans le viewport courant, avec une mise à jour automatique lors du déplacement de la caméra (debounce 500ms).

#### Scenario: Déplacement sur la carte
- **WHEN** le rider fait glisser la carte vers une nouvelle zone
- **THEN** les nouveaux marqueurs de cette zone sont chargés après 500ms

#### Scenario: Zone sans contenu
- **WHEN** aucun spot, event, session ou magasin ne correspond aux filtres actifs dans la zone visible
- **THEN** le système affiche "Rien dans cette zone — essaie d'élargir tes filtres ou de zoomer"
