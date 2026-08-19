## ADDED Requirements

### Requirement: Fiche publique d'un magasin
Le système SHALL exposer une fiche publique pour chaque magasin validé, contenant : nom, description, photos, adresse/coordonnées GPS, discipline(s) couvertes, marques vendues, horaires d'ouverture, statut ouvert/fermé calculé en temps réel.

#### Scenario: Consultation d'une fiche magasin
- **WHEN** un rider consulte la fiche d'un magasin validé
- **THEN** le système retourne toutes les données publiques du magasin, avec le statut ouvert/fermé calculé selon les horaires du jour

---

### Requirement: Magasin multi-disciplines
Le système SHALL permettre d'associer un magasin à une ou plusieurs disciplines.

#### Scenario: Magasin de sports multiples
- **WHEN** un gestionnaire associe son magasin aux disciplines Vélo, Ski et Skateboard
- **THEN** les trois disciplines apparaissent sur la fiche du magasin et il est trouvable dans les filtres de chacune

---

### Requirement: Marques vendues en liste ouverte
Le système SHALL permettre d'associer un magasin à une ou plusieurs marques. La liste des marques disponibles SHALL être extensible sans modification de code : ajouter une marque revient à insérer une ligne, jamais à modifier une liste figée dans le code.

#### Scenario: Ajout d'une nouvelle marque
- **WHEN** un gestionnaire cherche une marque absente de la liste existante lors de l'édition de sa fiche
- **THEN** le système lui permet de créer cette marque, qui devient immédiatement disponible pour tous les magasins

#### Scenario: Affichage des marques sur la fiche
- **WHEN** un rider consulte la fiche d'un magasin
- **THEN** la liste des marques vendues est affichée

---

### Requirement: Horaires d'ouverture et statut temps réel
Le système SHALL permettre au gestionnaire de définir des horaires d'ouverture par jour de la semaine, avec plusieurs créneaux possibles par jour. Le système SHALL calculer et afficher le statut "ouvert" ou "fermé" en temps réel à partir de ces horaires.

#### Scenario: Magasin actuellement ouvert
- **WHEN** un rider consulte la fiche d'un magasin pendant un créneau d'ouverture défini pour le jour courant
- **THEN** le statut affiché est "Ouvert"

#### Scenario: Magasin fermé un jour sans créneau
- **WHEN** un magasin n'a aucun créneau défini pour le jour courant (ex : fermé le dimanche)
- **THEN** le statut affiché est "Fermé" et les prochains horaires d'ouverture sont indiqués

#### Scenario: Coupure méridienne
- **WHEN** un magasin a deux créneaux distincts dans la même journée (ex : 9h-12h et 14h-19h)
- **THEN** le statut passe automatiquement à "Fermé" entre 12h et 14h puis repasse à "Ouvert" à 14h

---

### Requirement: Fermeture exceptionnelle temporaire
Le système SHALL permettre au gestionnaire de déclarer une période de fermeture exceptionnelle (vacances, rupture de stock, travaux...) avec une date de début, une date de fin et un motif optionnel. Tant qu'une fermeture exceptionnelle est active, le statut affiché SHALL être "Fermé exceptionnellement", même sur un créneau habituellement ouvert.

#### Scenario: Fermeture pour congés
- **WHEN** un gestionnaire déclare une fermeture exceptionnelle du 1er au 15 août
- **THEN** la fiche du magasin affiche "Fermé exceptionnellement" pendant toute cette période, même sur les créneaux habituellement ouverts

#### Scenario: Fin de la fermeture exceptionnelle
- **WHEN** la date de fin d'une fermeture exceptionnelle est dépassée
- **THEN** le statut du magasin repasse automatiquement au calcul normal basé sur les horaires réguliers

---

### Requirement: Affichage des magasins sur la carte principale
Le système SHALL afficher les magasins validés sur la carte principale avec un marqueur visuellement distinct de celui des spots et des events. Les magasins SHALL être filtrables indépendamment des spots et des events.

#### Scenario: Marqueur magasin sur la carte
- **WHEN** un rider consulte la carte principale
- **THEN** les magasins validés autour de lui apparaissent avec un marqueur distinct des spots et des events (voir map-core)

#### Scenario: Filtre carte magasins uniquement
- **WHEN** un rider active le filtre "Magasins" et désactive les autres
- **THEN** seuls les marqueurs magasins restent affichés sur la carte

---

### Requirement: Soumission d'une fiche magasin par un commerçant
Le système SHALL permettre à un utilisateur ayant le rôle gestionnaire (réutilisation du rôle attribué aux gestionnaires de spot) de soumettre une fiche magasin. La fiche SHALL rester non publiée tant qu'elle n'a pas été validée manuellement par le super admin.

#### Scenario: Soumission par un commerçant
- **WHEN** un utilisateur avec le rôle gestionnaire soumet une nouvelle fiche magasin
- **THEN** la fiche est créée avec un statut "en attente de validation" et n'apparaît ni sur la carte ni dans les recherches

#### Scenario: Validation par le super admin
- **WHEN** le super admin valide une fiche magasin en attente
- **THEN** la fiche devient publique, visible sur la carte et dans les recherches

---

### Requirement: Création directe par le super admin avec transfert
Le système SHALL permettre au super admin de créer directement une fiche magasin déjà publiée, puis d'en transférer la gestion à un compte utilisateur existant.

#### Scenario: Création puis transfert
- **WHEN** le super admin crée une fiche magasin et la transfère à un utilisateur
- **THEN** cet utilisateur devient gestionnaire du magasin (avec le rôle gestionnaire s'il ne l'avait pas déjà) et peut l'éditer

---

### Requirement: Création d'events par un magasin
Le système SHALL permettre au gestionnaire d'un magasin validé de créer un event lié à ce magasin (ex : apéro, inauguration, rassemblement, voyage), en réutilisant le système d'events existant (voir events-core, type `shop_event`).

#### Scenario: Création d'un apéro par un magasin
- **WHEN** le gestionnaire d'un magasin crée un event de type `shop_event` avec le titre "Apéro d'inauguration"
- **THEN** l'event est créé, lié au magasin, et apparaît dans le feed d'events comme tout autre event de la zone

#### Scenario: Event magasin visible dans le feed
- **WHEN** un rider dont les disciplines correspondent consulte le feed d'events
- **THEN** les events créés par des magasins apparaissent au même titre que les autres events, avec le nom du magasin comme organisateur
