## MODIFIED Requirements

### Requirement: Marqueurs spots
Le système SHALL afficher chaque spot comme un marqueur de catégorie « Spots » (couleur `--cat-spot`, lettre script « s »). Son statut SHALL être exprimé par l'anneau du marqueur (couleur du statut issue de la config) et non par sa couleur de fond. Les spots avec `visible_on_map: false` ne SHALL pas apparaître.

#### Scenario: Spot ouvert
- **WHEN** un spot a un statut ouvert
- **THEN** son marqueur garde la couleur catégorie Spots avec un anneau de la couleur du statut

#### Scenario: Tap sur un marqueur spot
- **WHEN** le rider tape sur un marqueur spot
- **THEN** une bottom sheet s'affiche avec : nom, badge statut localisé, discipline principale, distance, places restantes, bouton "Voir le spot"

---

### Requirement: Marqueurs events
Le système SHALL afficher les events dont la date de début est comprise entre maintenant et les 14 prochains jours comme des marqueurs de catégorie « Events » (couleur `--cat-event`, lettre script « e »), distincts des spots, sessions et magasins. Un event en cours SHALL être affiché plein avec un anneau animé ; un event à venir SHALL être affiché atténué.

#### Scenario: Event en cours
- **WHEN** un event a commencé et n'est pas encore terminé
- **THEN** son marqueur s'affiche plein, avec un anneau "en cours"

#### Scenario: Event à venir dans la fenêtre des 2 semaines
- **WHEN** un event commence dans 5 jours
- **THEN** son marqueur s'affiche atténué

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
Le système SHALL afficher les sessions dont la date de début est comprise entre maintenant et les 14 prochains jours comme des marqueurs de catégorie « Sessions » (couleur `--cat-session`, lettre script « r »), distincts des spots, events et magasins (voir sessions-core). Une session en cours SHALL être affichée pleine avec un anneau animé ; une session à venir SHALL être affichée atténuée.

#### Scenario: Session à venir
- **WHEN** une session commence dans 3 jours
- **THEN** son marqueur s'affiche atténué, positionné sur le spot concerné

#### Scenario: Session en cours
- **WHEN** l'heure actuelle est comprise dans la plage d'une session
- **THEN** son marqueur s'affiche plein avec un anneau "en cours"

#### Scenario: Session hors fenêtre
- **WHEN** une session commence dans plus de 2 semaines
- **THEN** elle n'apparaît pas encore sur la carte

#### Scenario: Tap sur un marqueur session
- **WHEN** le rider tape sur un marqueur session
- **THEN** une bottom sheet s'affiche avec : spot lié, créateur, date, nombre de participants, bouton "Rejoindre"

---

### Requirement: Marqueurs magasins
Le système SHALL afficher chaque magasin validé comme un marqueur de catégorie « Shops » (couleur `--cat-shop`, lettre script « m »), distinct des spots et des events (voir shop-core). Son statut ouvert/fermé SHALL être porté par l'anneau du marqueur et par un libellé dans la bottom sheet. Les magasins SHALL toujours être affichés, sans filtre de fenêtre temporelle.

#### Scenario: Magasin ouvert actuellement
- **WHEN** un magasin est dans un créneau d'ouverture au moment de la consultation
- **THEN** son marqueur s'affiche avec un anneau "ouvert"

#### Scenario: Magasin fermé
- **WHEN** un magasin est hors horaires ou en fermeture exceptionnelle
- **THEN** son marqueur s'affiche avec un anneau "fermé" et sa bottom sheet affiche "Fermé"

#### Scenario: Tap sur un marqueur magasin
- **WHEN** le rider tape sur un marqueur magasin
- **THEN** une bottom sheet s'affiche avec : nom, type de commerce, statut ouvert/fermé, distance, bouton "Voir le magasin"

---

### Requirement: Filtres discipline et type
La carte SHALL s'ouvrir pré-filtrée sur les disciplines du rider. Le rider SHALL pouvoir modifier les filtres par type (Spots, Events, Sessions, Shops) et par discipline (ses disciplines par défaut, toggle "Toutes"). Les 4 filtres de type SHALL être visibles simultanément sans défilement, chacun avec la couleur de sa catégorie et le nombre d'éléments dans la zone. Les magasins sans discipline (bar, restaurant) SHALL rester visibles quel que soit le filtre discipline, tant que "Shops" est activé. Les filtres SHALL persister entre les sessions de l'utilisateur.

#### Scenario: Ouverture pré-filtrée
- **WHEN** un rider pratiquant MX et Kite ouvre la carte
- **THEN** seuls les spots et events MX et Kite sont affichés par défaut, ainsi que tous les magasins

#### Scenario: Filtres de type visibles
- **WHEN** le rider ouvre la carte sur un écran de 360 pt de large
- **THEN** les 4 filtres Spots, Events, Sessions et Shops sont visibles sans défilement horizontal

#### Scenario: Toggle toutes disciplines
- **WHEN** le rider active "Toutes les disciplines"
- **THEN** tous les spots et events de la zone sont affichés quelle que soit leur discipline

#### Scenario: Filtres persistants
- **WHEN** le rider modifie ses filtres puis ferme l'app
- **THEN** les mêmes filtres sont actifs à la prochaine ouverture

## ADDED Requirements

### Requirement: Contrôles de carte natifs
Le système SHALL permettre le zoom par pincement, double tap et double tap + glisser, sans afficher de boutons +/−. Le système SHALL afficher un bouton « recentrer sur ma position » lorsque la géolocalisation est autorisée.

#### Scenario: Recentrer
- **WHEN** le rider a déplacé la carte puis tape sur « recentrer »
- **THEN** la carte revient sur sa position au niveau de zoom par défaut

#### Scenario: Zoom d'une main
- **WHEN** le rider effectue un double tap suivi d'un glissement vertical
- **THEN** la carte zoome ou dézoome en continu
