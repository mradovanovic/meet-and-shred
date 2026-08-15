## ADDED Requirements

### Requirement: Création d'une session
Le système SHALL permettre à tout rider connecté de créer une session liée à un spot existant (privé ou public), avec une date/heure de début. Aucun rôle particulier ni validation ne SHALL être requis.

#### Scenario: Création sur un spot public
- **WHEN** un rider crée une session sur un spot public (ex : une vague) pour ce soir 18h
- **THEN** la session est créée et immédiatement visible sur la carte et la page du spot

#### Scenario: Création sur un spot privé
- **WHEN** un rider crée une session sur un spot privé (ex : un terrain MX) pour samedi
- **THEN** la session est créée et visible, indépendamment de toute inscription formelle éventuellement requise par le gestionnaire du spot (voir spot-core, spot-inscriptions)

#### Scenario: Tentative de session sans spot
- **WHEN** un rider tente de créer une session sans sélectionner de spot existant
- **THEN** le système refuse la création et invite à choisir un spot, ou à en soumettre un nouveau (voir spot-core)

---

### Requirement: Rejoindre ou quitter une session
Le système SHALL permettre à tout rider connecté de rejoindre ou quitter une session existante, sans limite de participants ni paiement.

#### Scenario: Rejoindre une session
- **WHEN** un rider rejoint une session créée par un autre rider
- **THEN** il apparaît immédiatement dans la liste des participants de la session

#### Scenario: Quitter une session
- **WHEN** un rider quitte une session qu'il avait rejointe
- **THEN** il est retiré de la liste des participants

---

### Requirement: Affichage des sessions sur la carte
Le système SHALL afficher les sessions dont la date de début est comprise entre maintenant et les 2 prochaines semaines comme des marqueurs distincts des spots, events et magasins. Une session en cours SHALL être affichée dans une couleur active, une session à venir dans une couleur atténuée — même logique que les events (voir map-core).

#### Scenario: Session à venir sur la carte
- **WHEN** une session est prévue dans 3 jours
- **THEN** son marqueur apparaît sur la carte en couleur "à venir", positionné sur le spot concerné

#### Scenario: Session en cours
- **WHEN** l'heure actuelle correspond à une session en cours
- **THEN** son marqueur s'affiche en couleur "active"

#### Scenario: Session hors fenêtre
- **WHEN** une session est prévue dans plus de 2 semaines
- **THEN** elle n'apparaît pas encore sur la carte

---

### Requirement: Fil de sessions avec swipe
Le système SHALL présenter les sessions à venir sous forme de cartes swipables, filtrées par les disciplines du rider (celles du spot lié à chaque session) et par distance — même mécanique que le fil d'events (voir events-core). Un swipe à droite SHALL rejoindre immédiatement la session.

#### Scenario: Swipe right — rejoindre
- **WHEN** le rider swipe une carte session vers la droite
- **THEN** il rejoint la session immédiatement, avec un feedback visuel identique à celui du fil d'events

#### Scenario: Swipe left — passer
- **WHEN** le rider swipe une carte session vers la gauche
- **THEN** la session est retirée de son fil sans qu'il la rejoigne

#### Scenario: Vue liste alternative
- **WHEN** le rider bascule le fil de sessions en vue liste
- **THEN** les mêmes sessions filtrées s'affichent chronologiquement avec date, spot et distance

#### Scenario: Fil de sessions vide
- **WHEN** aucune session ne correspond aux disciplines et à la distance du rider
- **THEN** le système affiche "Aucune session dans ta zone — élargis ton rayon ou crée la tienne"

---

### Requirement: Page d'une session
Le système SHALL exposer le détail d'une session : spot lié, créateur, date/heure, liste des participants, bouton rejoindre/quitter. Si le spot lié est privé, la page SHALL rappeler qu'une inscription séparée peut être requise par le gestionnaire.

#### Scenario: Consultation d'une session sur spot public
- **WHEN** un rider consulte une session liée à un spot public
- **THEN** il voit le spot, le créateur, la date, les participants, et peut rejoindre en un geste

#### Scenario: Consultation d'une session sur spot privé
- **WHEN** un rider consulte une session liée à un spot privé qui exige une inscription payante
- **THEN** la page affiche un rappel explicite ("Rejoindre cette session ne réserve pas ta place — pense à t'inscrire sur le spot si nécessaire") en plus du bouton rejoindre
