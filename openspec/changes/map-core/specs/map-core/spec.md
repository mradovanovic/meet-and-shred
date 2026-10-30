## ADDED Requirements

### Requirement: Carte centrale Google Maps thème sombre
Le système SHALL afficher une carte Google Maps avec un style monochrome sombre centrée sur la position GPS du rider à l'ouverture de l'app. La carte est l'écran où tout se voit et se rejoint dans la première version.

#### Scenario: Ouverture avec géolocalisation active
- **WHEN** le rider ouvre l'app avec la géolocalisation active
- **THEN** la carte s'affiche centrée sur sa position avec les repères de la zone, filtrés sur ses disciplines

#### Scenario: Géolocalisation refusée
- **WHEN** le rider a refusé la géolocalisation
- **THEN** la carte s'affiche avec un champ de recherche autocomplete en premier plan pour saisir sa zone manuellement

#### Scenario: Géolocalisation indisponible temporairement
- **WHEN** la géolocalisation est active mais momentanément indisponible
- **THEN** la carte s'affiche sur la dernière position connue avec un indicateur "Position approximative"

---

### Requirement: Forme et couleur des repères
Le système SHALL afficher chaque élément de la carte comme un pin en goutte. La couleur du pin dit la catégorie : cyan pour un spot, vert pour un event, violet pour une session, bleu foncé pour un magasin. Le dessin blanc au centre dit ce que c'est : une planche de skate pour tout spot (quel que soit son sport), un poing pour un event, deux silhouettes pour une session, une boutique pour un magasin (un verre pour un bar, des couverts pour un restaurant).

#### Scenario: Spot de n'importe quel sport
- **WHEN** la carte affiche un spot de kite, un spot de moto et un spot de ski
- **THEN** les trois portent le même dessin de planche de skate ; le sport se lit dans la bottom sheet et se filtre avec les filtres

#### Scenario: Types de magasin
- **WHEN** la carte affiche une boutique, un bar et un restaurant
- **THEN** le pin porte respectivement une boutique, un verre et des couverts

---

### Requirement: Spot géré et spot libre
Le système SHALL distinguer un spot géré (payant, avec gestionnaire) d'un spot libre (gratuit, sans gestionnaire) par le remplissage du pin : plein pour un spot géré, creux (contour coloré seulement) pour un spot libre.

#### Scenario: Spot géré
- **WHEN** la carte affiche un spot qui a un gestionnaire
- **THEN** son pin est plein, avec un badge d'état

#### Scenario: Spot libre
- **WHEN** la carte affiche un spot libre
- **THEN** son pin est creux, sans badge d'état, avec un petit chiffre indiquant le nombre de sessions prévues quand il y en a

---

### Requirement: Badge d'état
Le système SHALL afficher sur un spot géré ou un magasin un petit badge d'état : coche pour ouvert, croix pour fermé, horloge pour bientôt ouvert. Les couleurs SHALL reprendre les couleurs de statut du design system (ouvert, fermé, hors saison). Le badge SHALL toujours porter un signe en plus de la couleur, pour rester lisible par un rider daltonien. Un état "bientôt" ou "à venir" SHALL rendre le pin plus pâle.

#### Scenario: Spot ouvert
- **WHEN** un spot géré a un statut ouvert
- **THEN** son pin porte le badge coche

#### Scenario: Spot fermé
- **WHEN** un spot géré a un statut fermé
- **THEN** son pin porte le badge croix

#### Scenario: Bientôt ouvert
- **WHEN** un spot géré ou un magasin ouvre prochainement
- **THEN** son pin est plus pâle et porte le badge horloge

#### Scenario: Statut hors saison ou détruit
- **WHEN** un spot a un statut hors saison ou détruit
- **THEN** son badge est gris, jamais rouge, pour ne pas le confondre avec un spot fermé aujourd'hui

---

### Requirement: Pièce "$" pour ce qui est payant
Le système SHALL afficher une petite pièce dorée portant "$" sur le pin de tout spot payant, de tout event payant et de toute session située sur un spot payant. La pièce SHALL se placer à l'opposé du badge d'état. Le montant réel SHALL toujours s'afficher dans la devise du lieu dans la bottom sheet et la fiche.

#### Scenario: Spot payant
- **WHEN** la carte affiche un spot avec un tarif
- **THEN** son pin porte la pièce "$"

#### Scenario: Event payant
- **WHEN** la carte affiche un event avec un prix
- **THEN** son pin porte la pièce "$"

#### Scenario: Session sur un spot payant
- **WHEN** la carte affiche une session créée sur un spot payant
- **THEN** son pin porte la pièce "$", la session elle-même restant gratuite

#### Scenario: Gratuit
- **WHEN** la carte affiche un élément gratuit
- **THEN** son pin ne porte aucune pièce

---

### Requirement: Events et sessions : en cours ou à venir
Le système SHALL afficher les events et les sessions dont la date de début est comprise entre maintenant et les 2 prochaines semaines (14 jours). Un élément en cours SHALL avoir un pin en couleur vive, un élément à venir un pin plus pâle. Un élément terminé ou hors fenêtre ne SHALL pas apparaître.

#### Scenario: En cours
- **WHEN** un event ou une session a commencé et n'est pas terminé
- **THEN** son pin est en couleur vive

#### Scenario: À venir
- **WHEN** un event ou une session commence dans 5 jours
- **THEN** son pin est plus pâle

#### Scenario: Hors fenêtre
- **WHEN** un event ou une session commence dans plus de 2 semaines
- **THEN** il n'apparaît pas encore sur la carte

#### Scenario: Terminé
- **WHEN** l'heure de fin est dépassée
- **THEN** le pin disparaît de la carte

---

### Requirement: Magasins toujours affichés
Le système SHALL afficher chaque magasin validé sur la carte, sans fenêtre de temps (voir shop-core). Seul son badge d'état change selon qu'il est ouvert ou fermé.

#### Scenario: Magasin fermé la nuit
- **WHEN** un magasin est fermé au moment de la consultation
- **THEN** son pin reste affiché avec le badge croix

---

### Requirement: Bottom sheet et rejoindre depuis la carte
Le système SHALL ouvrir au tap sur un pin une bottom sheet qui montre l'essentiel : nom, quand (pour un event ou une session), distance, prix ou "Gratuit", places restantes ou nombre de participants, sport(s), et riders suivis qui y vont. Pour un event ou une session, la bottom sheet SHALL porter le bouton "Je viens" ou "Rejoindre" (voir events-core, sessions-core). Un second tap SHALL ouvrir la fiche complète.

#### Scenario: Tap sur un spot
- **WHEN** le rider tape sur un pin de spot
- **THEN** la bottom sheet affiche le nom, l'état, le sport, la distance, le prix ou "Gratuit", les sessions à venir, et un bouton "Créer une session ici"

#### Scenario: Tap sur un event
- **WHEN** le rider tape sur un pin d'event
- **THEN** la bottom sheet affiche le titre, la date, le prix, les places restantes et le bouton "Je viens"

#### Scenario: Tap sur une session
- **WHEN** le rider tape sur un pin de session
- **THEN** la bottom sheet affiche le spot lié, le créateur, la date, le nombre de participants et le bouton "Rejoindre"

#### Scenario: Tap sur un magasin
- **WHEN** le rider tape sur un pin de magasin
- **THEN** la bottom sheet affiche le nom, le type de commerce, l'état ouvert/fermé et la distance

#### Scenario: Riders suivis
- **WHEN** des riders que le rider suit participent à un event ou une session
- **THEN** la bottom sheet l'indique ("2 riders que tu suis y vont")

---

### Requirement: Choix des repères en zone dense
Quand il y a plus de repères que la carte ne peut en montrer, le système SHALL choisir ceux à afficher par un tri lisible en trois temps, appliqué dans l'ordre : d'abord ce qui est en cours ou le plus proche dans le temps, puis le plus proche en distance, puis ce où vont des riders que le rider suit. Le tri ne SHALL pas utiliser la popularité, pour ne pas écraser les petits spots et les petits events. Les repères non affichés SHALL rester accessibles par zoom ou par regroupement.

#### Scenario: Zone dense
- **WHEN** plus de 50 éléments se trouvent dans la zone visible
- **THEN** les 50 premiers selon ce tri sont affichés, les autres se révèlent en zoomant

#### Scenario: Event en cours contre event lointain
- **WHEN** un event en cours et un event dans 12 jours se disputent la dernière place affichée
- **THEN** l'event en cours est affiché

---

### Requirement: Clustering des repères
Le système SHALL regrouper les repères proches en un cluster affichant le nombre d'éléments groupés. Un tap sur un cluster SHALL zoomer sur la zone pour révéler les repères individuels.

#### Scenario: Zone dense
- **WHEN** plusieurs repères sont proches au niveau de zoom actuel
- **THEN** ils sont regroupés en un seul cluster avec un badge indiquant le nombre (ex : "12")

#### Scenario: Zoom sur un cluster
- **WHEN** le rider tape sur un cluster
- **THEN** la carte zoome jusqu'au niveau où les repères individuels sont visibles

---

### Requirement: Filtres sport, type et gratuité
La carte SHALL s'ouvrir pré-filtrée sur les disciplines du rider (5 au maximum). Le rider SHALL pouvoir filtrer par type (Spots, Events, Sessions, Magasins) et par discipline (ses disciplines par défaut, toggle "Toutes"), et activer une pastille "Gratuit" pour ne garder que ce qui n'a pas de prix. Les magasins sans discipline (bar, restaurant) SHALL rester visibles quel que soit le filtre discipline. Les filtres SHALL persister d'une ouverture à l'autre. Le prix ne SHALL pas servir de critère de tri.

#### Scenario: Ouverture pré-filtrée
- **WHEN** un rider pratiquant MX et Kite ouvre la carte
- **THEN** seuls les spots, events et sessions MX et Kite sont affichés par défaut, ainsi que tous les magasins

#### Scenario: Pastille Gratuit
- **WHEN** le rider active "Gratuit"
- **THEN** les spots payants, events payants et sessions sur spots payants disparaissent de la carte

#### Scenario: Toggle toutes disciplines
- **WHEN** le rider active "Toutes les disciplines"
- **THEN** tous les éléments de la zone sont affichés quelle que soit leur discipline

#### Scenario: Filtres persistants
- **WHEN** le rider modifie ses filtres puis ferme l'app
- **THEN** les mêmes filtres sont actifs à la prochaine ouverture

---

### Requirement: Carte vide : inviter à créer
Quand la zone visible ne contient aucun élément correspondant aux filtres, le système SHALL le dire clairement et proposer d'agir, plutôt que d'afficher une carte vide.

#### Scenario: Zone sans contenu
- **WHEN** aucun spot, event, session ou magasin ne correspond aux filtres actifs dans la zone visible
- **THEN** le système affiche "Rien ici pour l'instant — élargis tes filtres, ou ajoute un lieu et crée la première session"

---

### Requirement: Recherche globale sur la carte
Le système SHALL fournir une barre de recherche permettant de trouver un spot, un event ou un magasin par nom ou lieu, distincte du champ de zone du mode sans géoloc.

#### Scenario: Recherche par nom de spot
- **WHEN** le rider tape "Moto Club" dans la barre de recherche
- **THEN** les spots correspondants apparaissent dans une liste de résultats, et un tap centre la carte sur le spot sélectionné

#### Scenario: Recherche par lieu
- **WHEN** le rider tape "Bordeaux" dans la barre de recherche
- **THEN** la carte se recentre sur Bordeaux et charge les repères de la zone

---

### Requirement: Chargement par zone visible
Le système SHALL charger uniquement les repères visibles dans le viewport courant, avec une mise à jour automatique lors du déplacement de la caméra (debounce 500 ms).

#### Scenario: Déplacement sur la carte
- **WHEN** le rider fait glisser la carte vers une nouvelle zone
- **THEN** les nouveaux repères de cette zone sont chargés après 500 ms
