## ADDED Requirements

### Requirement: Barre de navigation principale
Le système SHALL présenter une barre de navigation principale avec 5 destinations : Carte, Fil, Créer, Messages, Profil, accessible depuis n'importe quel écran de premier niveau.

#### Scenario: Accès depuis n'importe quel écran
- **WHEN** un rider se trouve sur l'un des 5 écrans de premier niveau
- **THEN** la barre de navigation reste visible et permet de rejoindre les 4 autres destinations en un tap

#### Scenario: Carte comme écran d'accueil
- **WHEN** un rider ouvre l'app après connexion
- **THEN** l'écran Carte est affiché par défaut (voir map-core)

---

### Requirement: Fil combiné events et sessions
Le système SHALL permettre au rider de basculer entre le fil d'events et le fil de sessions depuis un même écran "Fil", via un toggle visible en permanence.

#### Scenario: Fil par défaut
- **WHEN** un rider ouvre l'écran Fil pour la première fois
- **THEN** le fil d'events s'affiche par défaut

#### Scenario: Bascule vers le fil de sessions
- **WHEN** un rider tape sur "Sessions" dans le toggle du Fil
- **THEN** le fil affiche les sessions swipables filtrées par ses disciplines et sa distance (voir sessions-core), remplaçant le fil d'events à l'écran

#### Scenario: Position du toggle mémorisée
- **WHEN** un rider a laissé le Fil sur "Sessions" puis rouvre l'app plus tard
- **THEN** le Fil s'ouvre à nouveau sur "Sessions"

---

### Requirement: Bouton Créer contextuel au rôle
Le système SHALL proposer, au tap sur "Créer", une liste d'actions de création limitée à ce que le rôle du rider autorise.

#### Scenario: Rider simple
- **WHEN** un rider sans rôle particulier tape sur "Créer"
- **THEN** seule l'option "Créer une session" est disponible, ainsi que "Soumettre un nouveau spot public" (voir spot-core)

#### Scenario: Rider avec le rôle organisateur
- **WHEN** un rider avec le rôle organisateur tape sur "Créer"
- **THEN** il voit en plus "Créer un event" (track day, compétition)

#### Scenario: Gestionnaire de spot
- **WHEN** un gestionnaire de spot tape sur "Créer"
- **THEN** il voit en plus "Créer une ouverture" pour chacun de ses spots et "Soumettre un nouveau spot"

#### Scenario: Gestionnaire de magasin
- **WHEN** un gestionnaire de magasin tape sur "Créer"
- **THEN** il voit en plus "Créer un event magasin" pour chacun de ses magasins

---

### Requirement: Accès à la gestion depuis le profil
Le système SHALL afficher une section "Gestion" dans l'écran Profil, visible uniquement pour les riders ayant un rôle gestionnaire, organisateur, ou super admin. Cette section ne SHALL pas apparaître pour un rider sans rôle particulier.

#### Scenario: Rider simple
- **WHEN** un rider sans rôle particulier consulte son profil
- **THEN** aucune section "Gestion" n'apparaît

#### Scenario: Gestionnaire
- **WHEN** un gestionnaire de spot ou de magasin consulte son profil
- **THEN** une section "Gestion" liste ses spots/magasins gérés, chacun menant à son back-office (voir spot-core, shop-core)

#### Scenario: Super admin
- **WHEN** un super admin consulte son profil
- **THEN** la section "Gestion" inclut en plus la file de validation des spots/magasins en attente et la file de signalements (voir rider-social)
