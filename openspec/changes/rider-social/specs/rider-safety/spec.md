## ADDED Requirements

### Requirement: Blocage d'un rider
Le système SHALL permettre à un rider de bloquer un autre rider. Le blocage SHALL être immédiat et SHALL couper dans les deux sens le suivi, la messagerie directe et la visibilité du profil et des activités entre les deux riders.

#### Scenario: Blocage d'un rider
- **WHEN** un rider bloque un autre rider
- **THEN** tout suivi existant entre les deux (dans un sens comme dans l'autre) est supprimé, et aucun des deux ne peut plus suivre l'autre, lui envoyer de message, ni consulter son profil

#### Scenario: Tentative de message après blocage
- **WHEN** un rider bloqué tente d'envoyer un message au rider qui l'a bloqué
- **THEN** le système refuse l'envoi

#### Scenario: Profil masqué après blocage
- **WHEN** un rider bloqué tente de consulter le profil du rider qui l'a bloqué
- **THEN** le système affiche que le profil n'est pas accessible, sans révéler qu'il s'agit d'un blocage

#### Scenario: Déblocage
- **WHEN** un rider débloque un rider précédemment bloqué
- **THEN** le suivi, la messagerie et la visibilité du profil redeviennent possibles, sans restaurer automatiquement l'ancien suivi

---

### Requirement: Signalement d'un rider ou d'un message
Le système SHALL permettre à un rider de signaler un autre rider ou un message reçu, avec un motif. Chaque signalement SHALL être consultable par le super admin en vue d'une action de modération.

#### Scenario: Signalement d'un profil
- **WHEN** un rider signale le profil d'un autre rider en précisant un motif
- **THEN** le signalement est enregistré avec le statut "en attente" et devient consultable par le super admin

#### Scenario: Signalement d'un message
- **WHEN** un rider signale un message reçu dans une conversation
- **THEN** le signalement est enregistré avec une référence au message concerné

#### Scenario: Traitement d'un signalement
- **WHEN** le super admin consulte un signalement en attente et le marque comme traité
- **THEN** le statut passe à "traité", avec la possibilité de bloquer/suspendre le rider signalé depuis cet écran
