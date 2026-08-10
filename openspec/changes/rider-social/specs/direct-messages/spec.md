## ADDED Requirements

### Requirement: Envoi d'un message direct
Le système SHALL permettre à un rider connecté d'envoyer un message texte privé à un autre rider, sans validation préalable du destinataire.

#### Scenario: Premier message à un rider
- **WHEN** un rider envoie un premier message à un rider qu'il n'a jamais contacté
- **THEN** une nouvelle conversation est créée et le message y est ajouté

#### Scenario: Message dans une conversation existante
- **WHEN** un rider envoie un message dans une conversation déjà existante avec un autre rider
- **THEN** le message est ajouté à cette conversation existante

---

### Requirement: Liste des conversations
Le système SHALL permettre à un rider de consulter la liste de ses conversations, triée de la plus récente à la plus ancienne.

#### Scenario: Consultation de la liste des conversations
- **WHEN** un rider ouvre son écran de messagerie
- **THEN** il voit ses conversations triées par dernier message, avec un aperçu du dernier message et l'heure d'envoi

---

### Requirement: Messagerie limitée aux riders
Le système SHALL restreindre la messagerie directe aux échanges entre comptes riders. Un gestionnaire de spot ou de magasin n'est pas contactable via ce canal en tant que gestionnaire (la messagerie gestionnaire↔rider est hors scope, voir Phase 3).

#### Scenario: Pas de canal dédié gestionnaire
- **WHEN** un rider consulte la fiche d'un spot ou d'un magasin
- **THEN** aucun bouton de message direct vers le gestionnaire n'est proposé au MVP
