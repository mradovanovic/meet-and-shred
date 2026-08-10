## ADDED Requirements

### Requirement: Enregistrement du token push
Le système SHALL enregistrer un token push (FCM pour Android, APNs pour iOS) pour chaque device au moment du login. Un rider SHALL pouvoir avoir plusieurs tokens actifs simultanément (multi-device).

#### Scenario: Enregistrement au login Android
- **WHEN** un rider se connecte depuis un device Android avec les notifications autorisées
- **THEN** le système enregistre le token FCM associé à ce device et à ce rider

#### Scenario: Renouvellement de token
- **WHEN** le système d'exploitation renouvelle le token push d'un device déjà enregistré
- **THEN** le système met à jour le token existant sans dupliquer l'entrée

#### Scenario: Désactivation d'un token invalide
- **WHEN** un envoi échoue avec une erreur définitive (`NotRegistered` FCM ou `Unregistered` APNs)
- **THEN** le système désactive ce token et ne tente plus d'envoi dessus

---

### Requirement: Suivi d'un spot
Le système SHALL permettre à un rider connecté de suivre ou ne plus suivre un spot. Le nombre de followers SHALL être exposé sur la page publique du spot (voir spot-core).

#### Scenario: Suivre un spot
- **WHEN** un rider tape "Suivre" sur la page d'un spot
- **THEN** le système enregistre l'abonnement et incrémente le compteur de followers du spot

#### Scenario: Ne plus suivre un spot
- **WHEN** un rider tape "Ne plus suivre" sur un spot déjà suivi
- **THEN** le système supprime l'abonnement et décrémente le compteur de followers

---

### Requirement: Notification à l'ouverture d'un spot suivi
Le système SHALL envoyer une notification push à tous les followers d'un spot quand celui-ci passe d'un statut fermé à un statut ouvert (`open`). Le contenu SHALL être localisé dans la langue de chaque destinataire (voir i18n-core).

#### Scenario: Spot suivi qui ouvre
- **WHEN** un gestionnaire change le statut d'un spot de `closed` à `open`
- **THEN** tous les followers de ce spot reçoivent une notification push dans leur langue

#### Scenario: Changement de statut hors ouverture
- **WHEN** un spot passe de `open` à `degraded` ou de `degraded` à `closed`
- **THEN** aucune notification n'est envoyée aux followers (seule l'ouverture déclenche une notification)

---

### Requirement: Notification places limitées sur un spot suivi
Le système SHALL envoyer une notification push aux followers d'un spot quand il reste moins de 20% des places disponibles.

#### Scenario: Places limitées
- **WHEN** le nombre de places restantes sur un spot suivi passe sous 20% de la capacité maximale
- **THEN** tous les followers de ce spot reçoivent une notification push

#### Scenario: Notification envoyée une seule fois par session
- **WHEN** le seuil de 20% a déjà déclenché une notification pour la session en cours
- **THEN** le système n'envoie pas de notification supplémentaire pour cette même session tant que le seuil n'est pas repassé au-dessus puis en dessous

---

### Requirement: Notification d'annulation ou modification d'un event rejoint
Le système SHALL envoyer une notification push à tous les riders inscrits quand un event qu'ils ont rejoint est annulé ou quand sa date/heure/lieu est modifiée.

#### Scenario: Event annulé
- **WHEN** l'organisateur annule un event
- **THEN** tous les riders inscrits reçoivent une notification push (voir events-core)

#### Scenario: Event modifié
- **WHEN** l'organisateur modifie la date, l'heure ou le lieu d'un event
- **THEN** tous les riders inscrits reçoivent une notification push signalant le changement

---

### Requirement: Notification lors d'une création ou annulation d'event par un rider suivi
Le système SHALL envoyer une notification push aux followers d'un rider quand celui-ci crée un event ou annule un event qu'il avait créé. La relation de suivi entre riders SHALL être celle définie dans rider-social (voir rider-social, capability rider-follow).

#### Scenario: Rider suivi crée un event
- **WHEN** un rider suivi crée un nouvel event
- **THEN** tous ses followers reçoivent une notification push les invitant à consulter l'event

#### Scenario: Rider suivi annule un event qu'il a créé
- **WHEN** un rider suivi annule un event qu'il avait créé
- **THEN** tous ses followers reçoivent une notification push

---

### Requirement: Notification de nouveau message direct
Le système SHALL envoyer une notification push au destinataire d'un message direct quand celui-ci est envoyé (voir rider-social, capability direct-messages).

#### Scenario: Nouveau message reçu
- **WHEN** un rider envoie un message direct à un autre rider
- **THEN** le destinataire reçoit une notification push avec un aperçu du message, dans sa langue

---

### Requirement: Types de notifications extensibles via config
Le système SHALL charger les types de notifications disponibles depuis une config (`configs/notification-types.json`), avec pour chaque type : slug, label multilingue `{ fr, en, es }`, template de message. Le super admin SHALL pouvoir ajouter un type sans modification de code.

#### Scenario: Chargement des 4 types MVP
- **WHEN** le système résout le type de notification à envoyer pour une ouverture de spot
- **THEN** il utilise le slug, le label et le template définis dans `configs/notification-types.json`

---

### Requirement: Journalisation des envois
Le système SHALL journaliser chaque tentative d'envoi de notification (destinataire, type, statut, date) dans `notification_logs`.

#### Scenario: Envoi réussi journalisé
- **WHEN** une notification est envoyée avec succès à un rider
- **THEN** une entrée `sent` est créée dans `notification_logs`

#### Scenario: Envoi échoué journalisé
- **WHEN** l'envoi d'une notification échoue
- **THEN** une entrée `failed` est créée dans `notification_logs` avec la raison de l'échec
