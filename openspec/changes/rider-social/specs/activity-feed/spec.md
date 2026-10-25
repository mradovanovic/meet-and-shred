## ADDED Requirements

### Requirement: Fil d'activité des riders suivis
Le système SHALL présenter à chaque rider un fil chronologique des activités publiques des riders qu'il suit : event rejoint, event créé, nouveau setup matériel ajouté.

#### Scenario: Activité d'un rider suivi
- **WHEN** un rider suivi rejoint un event
- **THEN** cette activité apparaît dans le fil d'activité de ses followers

#### Scenario: Fil vide
- **WHEN** un rider ne suit encore personne
- **THEN** le fil d'activité l'invite à découvrir des riders à suivre plutôt que d'afficher un écran vide

---

### Requirement: Journalisation des activités publiques
Le système SHALL journaliser chaque activité publique d'un rider — rejoindre un event, créer un event, ajouter un setup matériel — avec un horodatage, pour alimenter le fil de ses followers.

#### Scenario: Journalisation d'une inscription à un event
- **WHEN** un rider rejoint un event par swipe (voir events-core)
- **THEN** une entrée d'activité "a rejoint [event]" est créée

#### Scenario: Journalisation d'un nouveau setup matériel
- **WHEN** un rider ajoute un nouveau setup matériel à son profil (voir rider-equipment)
- **THEN** une entrée d'activité "a ajouté un setup [discipline]" est créée
