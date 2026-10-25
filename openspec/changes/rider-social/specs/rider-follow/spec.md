## ADDED Requirements

### Requirement: Suivi libre d'un rider
Le système SHALL permettre à un rider connecté de suivre ou ne plus suivre un autre rider sans validation de la part du rider suivi. Le nombre de followers SHALL être affiché sur le profil public de chaque rider (voir rider-profile).

#### Scenario: Suivre un rider
- **WHEN** un rider tape "Suivre" sur le profil d'un autre rider
- **THEN** le suivi est actif immédiatement, sans action requise de la part du rider suivi, et le compteur de followers est incrémenté

#### Scenario: Ne plus suivre un rider
- **WHEN** un rider tape "Ne plus suivre" sur un rider qu'il suit
- **THEN** le suivi est retiré immédiatement et le compteur de followers est décrémenté

---

### Requirement: Consultation des abonnements
Le système SHALL permettre à un rider de consulter la liste des riders qu'il suit et la liste de ses followers.

#### Scenario: Consultation de ses abonnements
- **WHEN** un rider ouvre l'écran "Abonnements" de son profil
- **THEN** il voit la liste des riders qu'il suit et la liste de ceux qui le suivent
