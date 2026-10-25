## ADDED Requirements

### Requirement: Signaler un spot, un magasin, un event ou un avis
Le système SHALL permettre à tout rider connecté de signaler un spot, un magasin, un event, ou un avis, avec un motif. Le signalement SHALL être enregistré avec le statut "en attente" et devenir consultable par le super admin.

#### Scenario: Signalement d'un spot
- **WHEN** un rider signale un spot en précisant un motif (ex : "Informations fausses")
- **THEN** le signalement est enregistré avec le statut "en attente"

#### Scenario: Signalement d'un avis
- **WHEN** un rider signale un avis publié sur un spot, un magasin ou un event
- **THEN** le signalement est enregistré, référencé à cet avis

#### Scenario: Signalement d'un event ou d'un magasin
- **WHEN** un rider signale un event ou un magasin
- **THEN** le signalement est enregistré de la même façon

---

### Requirement: Un seul signalement actif par rider et par cible
Le système ne SHALL pas permettre à un rider de signaler une même cible une seconde fois tant que son premier signalement n'a pas été traité.

#### Scenario: Signalement déjà en attente
- **WHEN** un rider tente de signaler à nouveau une cible qu'il a déjà signalée et dont le signalement est toujours "en attente"
- **THEN** le système refuse et indique qu'un signalement est déjà en cours de traitement

---

### Requirement: Traitement d'un signalement par le super admin
Le système SHALL permettre au super admin de consulter la file de signalements en attente et de marquer chacun comme traité, avec une action optionnelle : masquer le contenu, le supprimer (avis ou event uniquement), avertir l'auteur, ou classer sans suite.

#### Scenario: Consultation de la file
- **WHEN** le super admin ouvre la file de modération
- **THEN** il voit tous les signalements en attente, avec le type de cible, le motif et un lien vers le contenu concerné

#### Scenario: Masquer un contenu signalé
- **WHEN** le super admin traite un signalement en choisissant "Masquer"
- **THEN** le contenu disparaît de la carte, des recherches et des fils, sans être supprimé, et le signalement passe au statut "traité"

#### Scenario: Supprimer un avis signalé
- **WHEN** le super admin traite un signalement d'avis en choisissant "Supprimer"
- **THEN** l'avis est supprimé définitivement et le signalement passe au statut "traité"

#### Scenario: Classer sans suite
- **WHEN** le super admin juge un signalement non fondé
- **THEN** il le marque "traité" sans action sur le contenu signalé
