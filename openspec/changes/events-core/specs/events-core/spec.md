## ADDED Requirements

### Requirement: Types d'events extensibles via config
Le système SHALL charger les types d'events disponibles depuis une config (table ou fichier), avec pour chaque type : slug, label multilingue `{ fr, en, es }`, icône, rôle requis pour créer, et si la capacité est obligatoire ou optionnelle. Le super admin SHALL pouvoir ajouter un type sans modification de code.

#### Scenario: Nouveau type ajouté par le super admin
- **WHEN** le super admin ajoute le type "Camp d'entraînement" en config
- **THEN** ce type est immédiatement disponible à la création d'event sans déploiement

#### Scenario: Labels localisés
- **WHEN** un rider EN consulte un event de type `track_day`
- **THEN** le type s'affiche "Track day" en anglais

---

### Requirement: Création d'event selon le rôle
Le système SHALL restreindre la création de tout event selon son type : un `track_day` ou `competition` SHALL nécessiter un rôle organisateur ; un event du spot (`spot_event`, `bbq`, `ride_day`, `bike_test`) SHALL nécessiter d'être gestionnaire du spot lié ; un `shop_event` SHALL nécessiter d'être gestionnaire du magasin lié. Aucun type d'event ne SHALL être créable par un rider sans rôle particulier (voir sessions-core pour les sorties spontanées entre riders).

#### Scenario: Gestionnaire de spot crée un BBQ
- **WHEN** le gestionnaire d'un spot géré crée un event de type `bbq` pour son spot
- **THEN** l'event est créé, lié à ce spot, et apparaît sur la carte

#### Scenario: Rider tente de créer un track day sans rôle
- **WHEN** un rider sans rôle organisateur tente de créer un `track_day`
- **THEN** le système retourne une erreur 403

#### Scenario: Gestionnaire de magasin crée un shop_event
- **WHEN** le gestionnaire d'un magasin validé crée un event de type `shop_event`
- **THEN** l'event est créé et lié à ce magasin (voir shop-core)

#### Scenario: Rider tente de créer un shop_event sans être gestionnaire du magasin
- **WHEN** un rider sans lien de gestion avec le magasin visé tente de créer un `shop_event` pour ce magasin
- **THEN** le système retourne une erreur 403

---

### Requirement: Prix d'un event
Le système SHALL permettre au créateur d'un event de renseigner un prix (montant et devise) et un lien de paiement externe, tous deux facultatifs. Un event sans prix est considéré gratuit. Un event avec prix SHALL porter la pièce "$" sur la carte (voir map-core).

#### Scenario: Event gratuit
- **WHEN** un gestionnaire crée un BBQ sans renseigner de prix
- **THEN** l'event est gratuit, sans pièce "$", et se rejoint sans étape de paiement

#### Scenario: Event payant
- **WHEN** un organisateur crée un track day à 120 € avec un lien de paiement
- **THEN** l'event porte la pièce "$" sur la carte et son prix s'affiche dans la fiche, dans la devise saisie

---

### Requirement: Capacité optionnelle par event
Le système SHALL permettre au créateur de définir une capacité maximale de participants. Si définie, les inscriptions SHALL se fermer automatiquement quand la capacité est atteinte via transaction atomique.

#### Scenario: Event avec capacité atteinte
- **WHEN** un track day de 30 places est complet et un rider tente de s'inscrire
- **THEN** le système retourne une erreur 409 et le bouton d'inscription est désactivé

#### Scenario: Event sans limite de capacité
- **WHEN** un `shop_event` (ex : apéro de magasin) est créé sans limite de participants
- **THEN** n'importe quel rider peut s'inscrire sans restriction

---

### Requirement: Rejoindre un event depuis la carte
Le système SHALL permettre au rider de rejoindre un event depuis la bottom sheet affichée au tap sur son repère, avec un bouton "Je viens". Pour un event gratuit et sans limite de places, le système SHALL inscrire immédiatement le rider, sans confirmation, et afficher un snackbar "Annuler" pendant 3 secondes. Pour un event payant ou à places limitées, le système SHALL d'abord proposer "Payer sur place" ou "Payer en ligne" (ouvre le lien de paiement externe).

#### Scenario: Event gratuit — un tap
- **WHEN** le rider tape "Je viens" sur un event gratuit sans limite de places
- **THEN** le système enregistre l'inscription et affiche un snackbar "Annuler" pendant 3 secondes

#### Scenario: Annulation immédiate
- **WHEN** le rider tape "Annuler" dans les 3 secondes suivant son inscription
- **THEN** l'inscription est annulée

#### Scenario: Event payant
- **WHEN** le rider tape "Je viens" sur un event payant
- **THEN** le système propose "Payer sur place" ou "Payer en ligne", puis enregistre l'inscription avec le mode choisi ; "Payer en ligne" ouvre le lien de paiement dans le navigateur natif

#### Scenario: Event complet
- **WHEN** le rider ouvre un event dont la capacité est atteinte
- **THEN** le bouton "Je viens" est désactivé et indique "Complet"

---

### Requirement: Avertissement en cas de chevauchement horaire
Avant de finaliser une inscription à un event, le système SHALL vérifier si ses horaires (`starts_at`/`ends_at`) chevauchent un autre event ou une session auxquels le rider est déjà inscrit/participant (voir sessions-core). En cas de chevauchement, le système SHALL avertir le rider avant de considérer l'inscription comme définitive, sans la bloquer.

#### Scenario: Chevauchement détecté depuis la carte
- **WHEN** un rider tape "Je viens" sur un event qui chevauche un autre event ou une session déjà rejoints
- **THEN** le système affiche "Chevauche [nom] de 14h à 16h" avec les choix "Rejoindre quand même" et "Annuler" avant de finaliser

#### Scenario: Pas de chevauchement
- **WHEN** les horaires d'un event ne recoupent aucun autre engagement du rider
- **THEN** aucun avertissement n'est affiché, l'inscription se déroule normalement

---

### Requirement: Détail d'un event
Le système SHALL exposer une page de détail pour chaque event avec : titre, type localisé, description, date/heure, lieu (adresse + mini-carte), discipline(s), organisateur, prix ou "Gratuit", capacité (si définie), places restantes, liste des riders inscrits, bouton inscription/désinscription, bouton partage, note moyenne et nombre d'avis une fois l'event terminé (voir reviews-core).

#### Scenario: Event avec capacité
- **WHEN** un rider consulte un track day avec 5 places restantes sur 30
- **THEN** la page affiche "5 places restantes" avec une barre de progression

---

### Requirement: Partage d'event
Le système SHALL permettre au rider de partager un event via un deep link ouvrant le panneau de partage natif.

#### Scenario: Partage
- **WHEN** le rider tape "Partager"
- **THEN** le panneau de partage natif s'ouvre avec le deep link de l'event

---

### Requirement: Annulation d'un event
Le système SHALL permettre à l'organisateur d'annuler un event. Tous les riders inscrits SHALL recevoir une notification push.

#### Scenario: Annulation
- **WHEN** l'organisateur annule un event
- **THEN** le statut passe à `cancelled`, l'event disparaît de la carte et une notification est envoyée à tous les inscrits

---

### Requirement: Fil d'events avec swipe (Phase 2, hors première version)
À partir de la Phase 2, le système SHALL présenter les events à venir sous forme de cartes swipables filtrées par disciplines du rider et distance. Un swipe à droite SHALL inscrire le rider selon les mêmes règles que le bouton "Je viens" (gratuit : immédiat avec snackbar "Annuler" de 3 secondes ; payant ou limité : étape de paiement d'abord).

#### Scenario: Swipe right — inscription
- **WHEN** le rider swipe une carte event gratuite vers la droite
- **THEN** le système enregistre l'inscription, affiche une animation verte et un snackbar "Annuler" pendant 3 secondes

#### Scenario: Swipe left — passer
- **WHEN** le rider swipe une carte event vers la gauche
- **THEN** l'event est retiré de son fil sans inscription

#### Scenario: Chevauchement après un swipe
- **WHEN** un rider swipe pour rejoindre un event qui chevauche un autre engagement
- **THEN** le snackbar signale le chevauchement ("Chevauche [nom] de 14h à 16h") en plus du bouton "Annuler"

#### Scenario: Fil vide
- **WHEN** aucun event ne correspond aux disciplines et à la distance du rider
- **THEN** le système affiche "Rien dans ta zone — élargis ton rayon ou explore la carte"

---

### Requirement: Vue liste du fil d'events (Phase 2, hors première version)
À partir de la Phase 2, le système SHALL proposer une vue liste en complément du swipe, affichant les events de façon chronologique.

#### Scenario: Toggle swipe / liste
- **WHEN** le rider bascule sur la vue liste
- **THEN** les mêmes events filtrés s'affichent en liste chronologique avec date, lieu et discipline

---

### Requirement: Filtrage du fil par discipline et distance (Phase 2, hors première version)
À partir de la Phase 2, le système SHALL filtrer le fil d'events par les disciplines du rider (pré-sélectionnées) et par un rayon de distance.

#### Scenario: Rider MX + Kite
- **WHEN** le rider dont les disciplines sont MX et Kite consulte le fil
- **THEN** seuls les events couvrant MX ou Kite apparaissent par défaut

#### Scenario: Toggle toutes disciplines
- **WHEN** le rider active "Toutes les disciplines"
- **THEN** tous les events de la zone s'affichent quelle que soit la discipline
