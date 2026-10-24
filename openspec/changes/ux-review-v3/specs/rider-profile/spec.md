## MODIFIED Requirements

### Requirement: Niveau de riding
Le système SHALL permettre au rider de déclarer son niveau parmi : Débutant, Amateur, Confirmé, Expert. Le niveau sélectionné SHALL être signalé visuellement (fond teinté, graisse renforcée, jauge de niveau) et exposé aux lecteurs d'écran comme sélectionné.

#### Scenario: Sélection du niveau
- **WHEN** le rider sélectionne "Confirmé"
- **THEN** la ligne "Confirmé" apparaît sélectionnée, le niveau est sauvegardé et visible sur sa fiche publique

---

### Requirement: Consultation du profil public
Le système SHALL permettre à tout rider connecté de consulter le profil public d'un autre rider (photos, disciplines, niveau, matos, bio, followers count). Ce profil SHALL proposer les actions « Suivre » et « Message », et un menu « ⋯ » contenant « Partager le profil », « Signaler » et « Bloquer ». Aucune action d'édition ne SHALL y être affichée (voir ux-guidelines).

#### Scenario: Consultation d'un profil
- **WHEN** un rider consulte le profil d'un autre rider via `GET /riders/:id`
- **THEN** le système retourne les données publiques du profil (sans email ni données privées)

#### Scenario: Menu secondaire
- **WHEN** un rider ouvre le menu « ⋯ » sur le profil d'un autre rider
- **THEN** il voit « Partager le profil », « Signaler » et « Bloquer », ce dernier en style destructif
