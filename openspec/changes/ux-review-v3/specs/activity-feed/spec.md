## MODIFIED Requirements

### Requirement: Fil d'activité des riders suivis
Le système SHALL présenter à chaque rider un fil chronologique des activités publiques des riders qu'il suit : event rejoint, event créé, session créée ou rejointe, matos ajouté. Chaque entrée SHALL référencer l'objet concerné (`ref { type, id }`) et SHALL ouvrir sa fiche au tap ; l'avatar SHALL ouvrir le profil de l'auteur.

#### Scenario: Activité d'un rider suivi
- **WHEN** un rider suivi rejoint un event
- **THEN** cette activité apparaît dans le fil de ses followers avec un aperçu de l'event

#### Scenario: Ouverture d'une entrée
- **WHEN** un rider tape sur l'aperçu d'une entrée « a ajouté du matos »
- **THEN** la fiche matos correspondante s'ouvre

#### Scenario: Ouverture du profil de l'auteur
- **WHEN** un rider tape sur l'avatar d'une entrée
- **THEN** le profil de l'auteur s'ouvre

#### Scenario: Fil vide
- **WHEN** un rider ne suit encore personne
- **THEN** le fil d'activité l'invite à découvrir des riders à suivre plutôt que d'afficher un écran vide

---

### Requirement: Journalisation des activités publiques
Le système SHALL journaliser chaque activité publique d'un rider — rejoindre ou créer un event, créer ou rejoindre une session, ajouter du matos — avec un horodatage et la référence de l'objet.

#### Scenario: Journalisation d'une inscription à un event
- **WHEN** un rider rejoint un event par swipe (voir events-core)
- **THEN** une entrée "a rejoint [event]" est créée avec `ref { type: "event", id }`

#### Scenario: Journalisation d'un nouveau matos
- **WHEN** un rider ajoute une fiche matériel (voir rider-equipment)
- **THEN** une entrée "a ajouté du matos" est créée avec `ref { type: "gear", id }`
