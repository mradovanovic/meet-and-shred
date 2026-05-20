## ADDED Requirements

### Requirement: Upload de photos de profil
Le système SHALL permettre au rider d'uploader jusqu'à 5 photos sur son profil. La première photo uploadée SHALL être la photo de profil principale.

#### Scenario: Upload réussi
- **WHEN** le rider uploade une photo valide (JPEG/PNG, ≤ 5 MB)
- **THEN** le système stocke la photo sur le cloud storage, retourne l'URL publique et l'ajoute à la galerie du profil

#### Scenario: Limite de 5 photos atteinte
- **WHEN** le rider tente d'uploader une 6ème photo
- **THEN** le système retourne une erreur 400 "Limite de 5 photos atteinte"

#### Scenario: Fichier trop lourd
- **WHEN** le rider uploade un fichier supérieur à 5 MB
- **THEN** le système rejette le fichier avec une erreur de validation avant envoi

#### Scenario: Format non supporté
- **WHEN** le rider uploade un fichier qui n'est pas JPEG ou PNG
- **THEN** le système retourne une erreur 400 "Format non supporté"

---

### Requirement: Suppression de photo
Le système SHALL permettre au rider de supprimer une de ses photos de profil.

#### Scenario: Suppression d'une photo non principale
- **WHEN** le rider supprime une photo qui n'est pas la principale
- **THEN** la photo est supprimée du storage et retirée de la galerie

#### Scenario: Suppression de la photo principale
- **WHEN** le rider supprime sa photo principale
- **THEN** la photo suivante dans l'ordre devient la nouvelle photo principale

---

### Requirement: Réorganisation des photos
Le système SHALL permettre au rider de changer l'ordre de ses photos, déterminant ainsi quelle photo est sa photo principale.

#### Scenario: Changement de photo principale
- **WHEN** le rider déplace une photo en première position
- **THEN** cette photo devient sa photo de profil principale visible sur la carte et dans les events
