## ADDED Requirements

### Requirement: Fiches matériel par discipline
Le système SHALL permettre à un rider d'ajouter une ou plusieurs fiches matériel pour chaque discipline pratiquée. Les champs de chaque fiche SHALL être définis par le schéma de la discipline concernée, avec la terminologie appropriée (ex : "Machine" pour un motard, "Board" pour un snowboarder).

#### Scenario: Ajout d'un setup MX
- **WHEN** le rider ajoute un setup pour la discipline MX
- **THEN** le formulaire affiche les champs : Marque, Modèle, Année, Cylindrée — avec le label "Machine" comme titre de la fiche

#### Scenario: Ajout d'un setup Kite
- **WHEN** le rider ajoute un setup pour la discipline Kite
- **THEN** le formulaire affiche les champs : Marque kite, Taille (m²), Marque board, Modèle board — avec le label "Kite & Board" comme titre de la fiche

#### Scenario: Discipline sans schéma défini
- **WHEN** le rider ajoute un setup pour une discipline dont le schéma n'est pas encore configuré
- **THEN** le système affiche un champ texte libre "Description de ton setup"

---

### Requirement: Plusieurs setups par discipline
Le système SHALL permettre au rider d'ajouter plusieurs setups pour une même discipline, chacun avec un nom personnalisé.

#### Scenario: Deux motos MX
- **WHEN** le rider ajoute un second setup MX
- **THEN** les deux setups apparaissent sur son profil sous la discipline MX, chacun avec son nom et ses données

#### Scenario: Nom du setup
- **WHEN** le rider nomme son setup "Ma YZ de piste"
- **THEN** ce nom est affiché comme titre de la fiche matériel sur son profil public

---

### Requirement: Setups publics sur le profil
Toutes les fiches matériel d'un rider SHALL être visibles publiquement sur son profil par tout rider connecté.

#### Scenario: Consultation des setups d'un rider
- **WHEN** un rider consulte le profil d'un autre rider
- **THEN** toutes ses fiches matériel sont affichées, groupées par discipline, sous forme de cards visuelles

---

### Requirement: Photos d'une fiche matériel
Le système SHALL permettre au rider d'ajouter jusqu'à 3 photos par fiche matériel. La première photo SHALL être utilisée comme photo de couverture de la card sur le profil.

#### Scenario: Upload photo setup
- **WHEN** le rider uploade une photo sur une fiche matériel (JPEG/PNG, ≤ 5 MB)
- **THEN** la photo est stockée et apparaît sur la card du setup

#### Scenario: Limite de 3 photos atteinte
- **WHEN** le rider tente d'uploader une 4ème photo sur un setup
- **THEN** le système retourne une erreur "Limite de 3 photos par setup atteinte"

#### Scenario: Photo de couverture
- **WHEN** le rider réorganise les photos de son setup
- **THEN** la première photo devient la photo de couverture affichée sur la card profil

---

### Requirement: Édition et suppression d'un setup
Le système SHALL permettre au rider d'éditer ou supprimer n'importe lequel de ses setups à tout moment.

#### Scenario: Suppression d'un setup
- **WHEN** le rider supprime un setup
- **THEN** la fiche et ses photos sont supprimées immédiatement de son profil public
