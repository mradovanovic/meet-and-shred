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
Le système SHALL restreindre la création de tout event selon son type : un `track_day` ou `competition` SHALL nécessiter un rôle organisateur, un `spot_opening` SHALL nécessiter d'être gestionnaire du spot lié, un `shop_event` SHALL nécessiter d'être gestionnaire du magasin lié. Aucun type d'event ne SHALL être créable par un rider sans rôle particulier (voir sessions-core pour les sorties spontanées entre riders).

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

### Requirement: Capacité optionnelle par event
Le système SHALL permettre au créateur de définir une capacité maximale de participants. Si définie, les inscriptions SHALL se fermer automatiquement quand la capacité est atteinte via transaction atomique.

#### Scenario: Event avec capacité atteinte
- **WHEN** un track day de 30 places est complet et un rider tente de s'inscrire
- **THEN** le système retourne une erreur 409 et le bouton d'inscription est désactivé

#### Scenario: Event sans limite de capacité
- **WHEN** un `shop_event` (ex : apéro de magasin) est créé sans limite de participants
- **THEN** n'importe quel rider peut s'inscrire sans restriction

---

### Requirement: Feed d'events avec swipe
Le système SHALL présenter les events à venir sous forme de cartes swipables filtrées par disciplines du rider et distance. Un swipe à droite SHALL inscrire immédiatement le rider — sans popup de confirmation. Un snackbar "Annuler" SHALL être visible 3 secondes après le swipe.

#### Scenario: Swipe right — inscription directe
- **WHEN** le rider swipe une carte event vers la droite
- **THEN** le système enregistre l'inscription, affiche une animation verte et un snackbar "Annuler" pendant 3 secondes

#### Scenario: Annulation immédiate post-swipe
- **WHEN** le rider tape "Annuler" dans les 3 secondes suivant un swipe right
- **THEN** l'inscription est annulée et la carte revient dans le feed

#### Scenario: Swipe left — passer
- **WHEN** le rider swipe une carte event vers la gauche
- **THEN** l'event est retiré de son feed sans inscription

#### Scenario: Feed vide
- **WHEN** aucun event ne correspond aux disciplines et à la distance du rider
- **THEN** le système affiche "Rien dans ta zone — élargis ton rayon ou explore la carte"

---

### Requirement: Vue liste alternative
Le système SHALL proposer une vue liste en complément du swipe, affichant les events de façon chronologique.

#### Scenario: Toggle swipe / liste
- **WHEN** le rider bascule sur la vue liste
- **THEN** les mêmes events filtrés s'affichent en liste chronologique avec date, lieu et discipline

---

### Requirement: Filtrage du feed par discipline et distance
Le système SHALL filtrer le feed d'events par les disciplines du rider (pré-sélectionnées) et par un rayon de distance configurable.

#### Scenario: Rider MX + Kite
- **WHEN** le rider dont les disciplines sont MX et Kite consulte le feed
- **THEN** seuls les events couvrant MX ou Kite apparaissent par défaut

#### Scenario: Toggle toutes disciplines
- **WHEN** le rider active "Toutes les disciplines"
- **THEN** tous les events de la zone s'affichent quelle que soit la discipline

---

### Requirement: Détail d'un event
Le système SHALL exposer une page de détail pour chaque event avec : titre, type localisé, description, date/heure, lieu (adresse + mini-carte), discipline(s), organisateur, capacité (si définie), places restantes, liste des riders inscrits, bouton inscription/désinscription, bouton partage.

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
- **THEN** le statut passe à `cancelled`, l'event disparaît des feeds et une notification est envoyée à tous les inscrits
