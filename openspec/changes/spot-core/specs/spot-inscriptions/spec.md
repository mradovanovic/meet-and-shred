## ADDED Requirements

### Requirement: Inscription à une session spot
Le système SHALL permettre à un rider connecté de s'inscrire à un spot ouvert si des places sont disponibles.

#### Scenario: Inscription réussie
- **WHEN** un rider s'inscrit à un spot avec des places disponibles
- **THEN** le système enregistre l'inscription, décrémente le compteur de places et retourne une confirmation

#### Scenario: Spot complet
- **WHEN** un rider tente de s'inscrire à un spot dont la capacité est atteinte
- **THEN** le système retourne une erreur 409 et le bouton d'inscription est désactivé

#### Scenario: Race condition — dernière place
- **WHEN** deux riders s'inscrivent simultanément sur la dernière place disponible
- **THEN** un seul est accepté via transaction atomique, l'autre reçoit l'erreur "Spot complet"

#### Scenario: Rider déjà inscrit
- **WHEN** un rider tente de s'inscrire à un spot où il est déjà inscrit
- **THEN** le système retourne une erreur 409 "Déjà inscrit"

---

### Requirement: Affichage des places restantes en temps réel
Le système SHALL afficher le nombre de places restantes sur la page du spot et sur la carte.

#### Scenario: Mise à jour du compteur
- **WHEN** un rider s'inscrit ou se désinscrit
- **THEN** le compteur de places restantes est mis à jour immédiatement

#### Scenario: Alerte places limitées
- **WHEN** il reste moins de 20% des places disponibles sur un spot suivi
- **THEN** une notification push est envoyée aux followers du spot (voir notifications-push)

---

### Requirement: Désinscription
Le système SHALL permettre à un rider de se désinscrire d'un spot.

#### Scenario: Désinscription réussie
- **WHEN** un rider se désinscrit avant le début de la session
- **THEN** son inscription est supprimée et une place est libérée

---

### Requirement: Tarifs adhérent / non-adhérent
Le système SHALL afficher les tarifs adhérent et non-adhérent sur la page du spot avant que le rider s'inscrive.

#### Scenario: Affichage des tarifs
- **WHEN** un rider consulte la page d'un spot
- **THEN** les deux tarifs sont visibles avant tout engagement

---

### Requirement: Lien de paiement externe
Le système SHALL permettre au gestionnaire de configurer une URL de paiement externe. Ce lien SHALL s'ouvrir dans le navigateur natif au moment de l'inscription.

#### Scenario: Paiement en ligne via lien externe
- **WHEN** le rider choisit l'option "Payer en ligne"
- **THEN** l'app ouvre l'URL de paiement externe dans le navigateur natif

#### Scenario: Paiement cash sur place
- **WHEN** le rider choisit l'option "Payer sur place"
- **THEN** l'inscription est enregistrée sans redirection de paiement
