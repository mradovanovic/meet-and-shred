## ADDED Requirements

### Requirement: Création d'une session
Le système SHALL permettre à tout rider connecté de créer une session liée à un spot existant (payant ou gratuit), avec une date/heure de début. Aucun rôle particulier ni validation ne SHALL être requis. Si le lieu n'existe pas encore, le rider SHALL pouvoir l'ajouter à la volée depuis l'écran de création (voir spot-core, spot libre créé immédiatement).

#### Scenario: Création sur un spot gratuit
- **WHEN** un rider crée une session sur un spot gratuit (ex : une vague) pour ce soir 18h
- **THEN** la session est créée et immédiatement visible sur la carte et la page du spot

#### Scenario: Création sur un spot payant
- **WHEN** un rider crée une session sur un spot payant (ex : une station de ski) pour samedi
- **THEN** la session est créée et visible, indépendamment de toute inscription formelle éventuellement requise par le gestionnaire du spot (voir spot-core, spot-inscriptions)

#### Scenario: Lieu introuvable
- **WHEN** un rider cherche un lieu qui n'existe pas dans la liste et tape "Ajouter ce lieu"
- **THEN** le système lui demande un nom et une position, crée le spot libre immédiatement et poursuit la création de la session sur ce lieu

---

### Requirement: Rejoindre ou quitter une session
Le système SHALL permettre à tout rider connecté de rejoindre ou quitter une session existante, sans limite de participants ni paiement. Depuis la carte, le rider SHALL pouvoir rejoindre en un tap via le bouton "Rejoindre" de la bottom sheet, avec un snackbar "Annuler" pendant 3 secondes.

#### Scenario: Rejoindre une session depuis la carte
- **WHEN** un rider tape "Rejoindre" sur la bottom sheet d'une session créée par un autre rider
- **THEN** il apparaît immédiatement dans la liste des participants et un snackbar "Annuler" s'affiche pendant 3 secondes

#### Scenario: Quitter une session
- **WHEN** un rider quitte une session qu'il avait rejointe
- **THEN** il est retiré de la liste des participants

---

### Requirement: Modification d'une session par son créateur
Le système SHALL permettre au créateur d'une session de modifier son heure de début et sa note tant qu'elle est visible. Les participants SHALL être prévenus d'un changement d'horaire (voir notifications-push).

#### Scenario: Changement d'horaire
- **WHEN** le créateur décale sa session de 18h à 19h
- **THEN** la session est mise à jour et chaque participant est prévenu du nouvel horaire

#### Scenario: Modification par un autre rider
- **WHEN** un participant qui n'est pas le créateur tente de modifier la session
- **THEN** le système retourne une erreur 403

---

### Requirement: Avertissement en cas de chevauchement horaire
Avant de finaliser une participation à une session, le système SHALL vérifier si sa plage (`starts_at` à `starts_at + 3h`) chevauche un autre event ou une autre session auxquels le rider est déjà inscrit/participant (voir events-core). En cas de chevauchement, le système SHALL avertir le rider avant de considérer la participation comme définitive, sans la bloquer.

#### Scenario: Chevauchement détecté depuis la carte
- **WHEN** un rider tape "Rejoindre" sur une session qui chevauche un event ou une autre session déjà rejoints
- **THEN** le système affiche "Chevauche [nom] de 14h à 16h" avec les choix "Rejoindre quand même" et "Annuler" avant de finaliser

#### Scenario: Pas de chevauchement
- **WHEN** la plage horaire d'une session ne recoupe aucun autre engagement du rider
- **THEN** aucun avertissement n'est affiché

---

### Requirement: Affichage des sessions sur la carte
Le système SHALL afficher les sessions dont la date de début est comprise entre maintenant et les 2 prochaines semaines comme des repères distincts des spots, events et magasins. Une session en cours SHALL être affichée en couleur vive, une session à venir en couleur plus pâle — même logique que les events (voir map-core).

#### Scenario: Session à venir sur la carte
- **WHEN** une session est prévue dans 3 jours
- **THEN** son repère apparaît sur la carte en pâle, positionné sur le spot concerné

#### Scenario: Session en cours
- **WHEN** l'heure actuelle correspond à une session en cours
- **THEN** son repère s'affiche en couleur vive

#### Scenario: Session hors fenêtre
- **WHEN** une session est prévue dans plus de 2 semaines
- **THEN** elle n'apparaît pas encore sur la carte

---

### Requirement: Page d'une session
Le système SHALL exposer le détail d'une session : spot lié, créateur, date/heure, liste des participants, bouton rejoindre/quitter. Si le spot lié est payant, la page SHALL rappeler qu'une entrée ou une inscription séparée peut être requise.

#### Scenario: Consultation d'une session sur spot gratuit
- **WHEN** un rider consulte une session liée à un spot gratuit
- **THEN** il voit le spot, le créateur, la date, les participants, et peut rejoindre en un tap

#### Scenario: Consultation d'une session sur spot payant
- **WHEN** un rider consulte une session liée à un spot payant
- **THEN** la page affiche la pièce "$" et un rappel explicite ("Rejoindre cette session ne réserve pas ta place — pense à t'inscrire sur le spot si nécessaire") en plus du bouton rejoindre

---

### Requirement: Annulation d'une session par son créateur
Le système SHALL permettre au créateur d'une session de l'annuler à tout moment tant qu'elle est encore visible (dans la fenêtre de 2 semaines). Une fois annulée, la session SHALL disparaître immédiatement de la carte. Les participants SHALL recevoir une notification (voir notifications-push).

#### Scenario: Annulation par le créateur
- **WHEN** le créateur d'une session l'annule depuis sa page
- **THEN** la session passe au statut "annulée", disparaît de la carte, et sa page affiche "Session annulée" plutôt que le bouton rejoindre

#### Scenario: Notification aux participants
- **WHEN** une session avec des participants est annulée par son créateur
- **THEN** chaque participant reçoit une notification push l'informant de l'annulation

#### Scenario: Tentative d'annulation par un rider autre que le créateur
- **WHEN** un participant qui n'est pas le créateur tente d'annuler la session
- **THEN** le système retourne une erreur 403

---

### Requirement: Fil de sessions avec swipe (Phase 2, hors première version)
À partir de la Phase 2, le système SHALL présenter les sessions à venir sous forme de cartes swipables, filtrées par les disciplines du rider (celles du spot lié) et par distance — même mécanique que le fil d'events (voir events-core). Un swipe à droite SHALL rejoindre la session selon les mêmes règles que le bouton "Rejoindre".

#### Scenario: Swipe right — rejoindre
- **WHEN** le rider swipe une carte session vers la droite
- **THEN** il rejoint la session, avec le même snackbar "Annuler" de 3 secondes

#### Scenario: Swipe left — passer
- **WHEN** le rider swipe une carte session vers la gauche
- **THEN** la session est retirée de son fil sans qu'il la rejoigne

#### Scenario: Chevauchement après un swipe
- **WHEN** un rider swipe pour rejoindre une session qui chevauche un autre engagement
- **THEN** le snackbar signale le chevauchement en plus du bouton "Annuler"

#### Scenario: Vue liste alternative
- **WHEN** le rider bascule le fil de sessions en vue liste
- **THEN** les mêmes sessions filtrées s'affichent chronologiquement avec date, spot et distance

#### Scenario: Fil de sessions vide
- **WHEN** aucune session ne correspond aux disciplines et à la distance du rider
- **THEN** le système affiche "Aucune session dans ta zone — élargis ton rayon ou crée la tienne"
