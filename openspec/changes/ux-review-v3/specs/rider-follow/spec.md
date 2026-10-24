## MODIFIED Requirements

### Requirement: Suivi libre d'un rider
Le système SHALL permettre à un rider connecté de suivre ou ne plus suivre un autre rider sans validation du rider suivi. Le bouton SHALL afficher « Suivre » (primaire) tant que le rider n'est pas suivi, puis « Abonné » (secondaire, icône ✓) — EN « Follow » / « Following », ES « Seguir » / « Siguiendo ». Le nombre de followers SHALL être affiché sur le profil public (voir rider-profile).

#### Scenario: Suivre un rider
- **WHEN** un rider tape "Suivre" sur le profil d'un autre rider
- **THEN** le suivi est actif immédiatement, le bouton passe à "Abonné" et le compteur de followers est incrémenté

#### Scenario: Ne plus suivre un rider
- **WHEN** un rider tape "Abonné" puis confirme "Ne plus suivre"
- **THEN** le suivi est retiré, le bouton repasse à "Suivre" et le compteur est décrémenté
