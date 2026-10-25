## ADDED Requirements

### Requirement: Publier un avis sur un spot après y avoir participé
Le système SHALL permettre à un rider de publier un avis (note de 1 à 5, commentaire facultatif) sur un spot, à condition d'avoir une inscription formelle sur ce spot (spot privé) ou d'avoir participé à une session qui s'y est déroulée (spot privé ou public).

#### Scenario: Avis après inscription à un spot privé
- **WHEN** un rider qui s'est inscrit à un spot privé publie un avis sur ce spot
- **THEN** l'avis est enregistré et visible sur la fiche du spot

#### Scenario: Avis après participation à une session
- **WHEN** un rider qui a rejoint une session sur un spot public publie un avis sur ce spot
- **THEN** l'avis est enregistré et visible sur la fiche du spot

#### Scenario: Tentative d'avis sans participation
- **WHEN** un rider qui n'a ni inscription ni session sur un spot tente d'y publier un avis
- **THEN** le système refuse la publication

---

### Requirement: Publier un avis sur un event terminé après y avoir participé
Le système SHALL permettre à un rider de publier un avis sur un event auquel il était inscrit, uniquement une fois l'event terminé et non annulé.

#### Scenario: Avis après un event terminé
- **WHEN** un rider inscrit à un event dont l'heure de fin est dépassée publie un avis
- **THEN** l'avis est enregistré et visible sur la fiche de l'event

#### Scenario: Tentative d'avis avant la fin de l'event
- **WHEN** un rider inscrit tente de publier un avis avant la fin de l'event
- **THEN** le système refuse la publication

#### Scenario: Tentative d'avis sur un event annulé
- **WHEN** un rider tente de publier un avis sur un event annulé
- **THEN** le système refuse la publication

---

### Requirement: Publier un avis sur un magasin, ouvert à tout rider
Le système SHALL permettre à tout rider connecté de publier un avis sur un magasin, sans exigence de preuve de visite.

#### Scenario: Avis sur un magasin
- **WHEN** un rider connecté publie un avis sur un magasin, qu'il l'ait visité ou non
- **THEN** l'avis est enregistré et visible sur la fiche du magasin

---

### Requirement: Un seul avis par rider et par cible, modifiable
Le système SHALL limiter chaque rider à un seul avis par spot, par magasin ou par event. Le système SHALL permettre au rider de modifier ou supprimer son propre avis.

#### Scenario: Tentative de second avis
- **WHEN** un rider ayant déjà publié un avis sur un spot tente d'en publier un second sur le même spot
- **THEN** le système refuse et propose de modifier l'avis existant

#### Scenario: Modification de son avis
- **WHEN** un rider modifie la note ou le commentaire de son avis existant
- **THEN** l'avis est mis à jour et la note moyenne recalculée

#### Scenario: Suppression de son avis
- **WHEN** un rider supprime son propre avis
- **THEN** l'avis disparaît et la note moyenne est recalculée

---

### Requirement: Note moyenne et nombre d'avis affichés
Le système SHALL afficher, sur la fiche d'un spot, d'un magasin ou d'un event, la note moyenne et le nombre total d'avis.

#### Scenario: Fiche avec avis
- **WHEN** un rider consulte une fiche ayant reçu des avis
- **THEN** la note moyenne (sur 5) et le nombre d'avis sont affichés en évidence

#### Scenario: Fiche sans avis
- **WHEN** un rider consulte une fiche n'ayant reçu aucun avis
- **THEN** le système affiche "Pas encore d'avis" plutôt qu'une note à zéro trompeuse
