## MODIFIED Requirements

### Requirement: Setups publics sur le profil
Toutes les fiches matériel d'un rider SHALL être visibles publiquement par tout rider connecté, dans une section intitulée « Ton matos » sur son propre profil et « Son matos » sur celui d'un autre (EN « Your Toys » / « Their Toys », ES « Tu material » / « Su material »). Le terme « setup » ne SHALL pas apparaître dans l'interface.

#### Scenario: Consultation du matos d'un rider
- **WHEN** un rider consulte le profil d'un autre rider
- **THEN** ses fiches matériel sont affichées dans « Son matos », groupées par discipline, sous forme de cards visuelles

## ADDED Requirements

### Requirement: Fiche matos consultable
Le système SHALL ouvrir le détail d'une fiche matériel au tap sur sa card : photos, discipline, champs du schéma de la discipline, description, propriétaire. Pour un rider autre que le propriétaire, la fiche SHALL être en lecture seule et proposer de contacter le propriétaire.

#### Scenario: Fiche d'un autre rider
- **WHEN** un rider ouvre la fiche matos d'un autre rider
- **THEN** il voit photos et caractéristiques, un bouton « Demander à [prénom] » qui ouvre la messagerie, et aucune action de modification

#### Scenario: Sa propre fiche
- **WHEN** un rider ouvre une de ses fiches matos
- **THEN** un bouton « Modifier ce matos » est disponible
