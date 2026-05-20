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
Le système SHALL afficher les events à venir (dans les 7 prochains jours) comme des marqueurs en forme de losange, distincts des spots.

#### Scenario: Tap sur un marqueur event
- **WHEN** le rider tape sur un marqueur event
- **THEN** une bottom sheet s'affiche avec : titre, date, discipline, distance, bouton "Voir l'event"

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
La carte SHALL s'ouvrir pré-filtrée sur les disciplines du rider. Le rider SHALL pouvoir modifier les filtres par type (Spots, Events) et par discipline (ses disciplines par défaut, toggle "Toutes"). Les filtres SHALL persister entre les sessions.

#### Scenario: Ouverture pré-filtrée
- **WHEN** un rider pratiquant MX et Kite ouvre la carte
- **THEN** seuls les spots et events MX et Kite sont affichés par défaut

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
- **WHEN** aucun spot ni event ne correspond aux filtres actifs dans la zone visible
- **THEN** le système affiche "Rien dans cette zone — essaie d'élargir tes filtres ou de zoomer"
