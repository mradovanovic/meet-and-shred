## ADDED Requirements

### Requirement: Complétion du profil post-inscription
Le système SHALL présenter un écran d'onboarding profil après la première inscription. La sélection d'au moins une discipline et d'un niveau SHALL être obligatoire pour accéder à l'app.

#### Scenario: Onboarding profil complété
- **WHEN** le rider sélectionne au moins une discipline et un niveau puis valide
- **THEN** le système sauvegarde le profil et redirige vers la carte principale

#### Scenario: Onboarding profil ignoré
- **WHEN** le rider tente de passer l'onboarding profil sans sélectionner de discipline
- **THEN** le système affiche un message d'erreur et empêche la navigation

---

### Requirement: Sélection des disciplines, limitée à 5
Le système SHALL permettre au rider de sélectionner entre une et cinq disciplines parmi une liste dynamique groupée par catégorie (Moto, Vélo, Eau, Snow, Urban). La liste des disciplines disponibles SHALL être extensible sans modification de code ; la limite de 5 disciplines par rider s'applique quel que soit le nombre de disciplines existantes.

#### Scenario: Sélection multi-discipline
- **WHEN** le rider sélectionne MX et Enduro
- **THEN** les deux disciplines sont associées à son profil

#### Scenario: Ajout d'une nouvelle discipline en base
- **WHEN** un admin ajoute une discipline "Kite" en base
- **THEN** elle apparaît automatiquement dans la liste de sélection sans mise à jour de l'app

#### Scenario: Tentative de sélection d'une 6e discipline
- **WHEN** un rider a déjà 5 disciplines sélectionnées et tente d'en cocher une 6e
- **THEN** le système refuse la sélection et invite à en retirer une avant d'en ajouter une nouvelle

---

### Requirement: Mise à jour des disciplines pratiquées
Le système SHALL permettre au rider de modifier ses disciplines à tout moment (ajout, retrait), dans la limite de 5. Le contenu affiché au rider (carte, feed d'events) SHALL immédiatement refléter ses nouvelles disciplines.

#### Scenario: Remplacement d'une discipline
- **WHEN** un rider retire "Ski" et ajoute "Kite" à ses disciplines
- **THEN** son profil est mis à jour, et les spots/events Ski ne sont plus mis en avant par défaut sur sa carte et son feed, remplacés par ceux de Kite (voir map-core, events-core)

---

### Requirement: Niveau de riding
Le système SHALL permettre au rider de déclarer son niveau parmi : Débutant, Amateur, Confirmé, Expert.

#### Scenario: Sélection du niveau
- **WHEN** le rider sélectionne "Confirmé"
- **THEN** le niveau est sauvegardé sur son profil et visible sur sa fiche publique

---

### Requirement: Setup / machine
Le système SHALL permettre au rider de renseigner sa machine principale (marque, modèle, année) de façon optionnelle.

#### Scenario: Ajout d'une machine
- **WHEN** le rider renseigne "Yamaha YZ250F 2023"
- **THEN** ces informations apparaissent sur son profil public

---

### Requirement: Bio et localisation principale
Le système SHALL permettre au rider de renseigner une bio (max 280 caractères) et une ville/région de résidence principale, tous deux optionnels.

#### Scenario: Bio trop longue
- **WHEN** le rider saisit plus de 280 caractères dans sa bio
- **THEN** le champ est tronqué à 280 caractères avec un compteur visible

---

### Requirement: Consultation du profil public
Le système SHALL permettre à tout rider connecté de consulter le profil public d'un autre rider (photos, disciplines, niveau, machine, bio, followers count).

#### Scenario: Consultation d'un profil
- **WHEN** un rider consulte le profil d'un autre rider via `GET /riders/:id`
- **THEN** le système retourne les données publiques du profil (sans email ni données privées)

---

### Requirement: Édition du profil
Le système SHALL permettre à un rider d'éditer son profil à tout moment depuis les paramètres.

#### Scenario: Mise à jour du profil
- **WHEN** le rider modifie sa bio et sauvegarde
- **THEN** les changements sont immédiatement visibles sur son profil public
