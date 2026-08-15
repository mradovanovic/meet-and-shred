## ADDED Requirements

### Requirement: Statuts de spot définis par discipline dans des fichiers de config
Cette exigence et l'exigence suivante s'appliquent uniquement aux spots de catégorie **privée** — un spot public n'a pas de statut piloté (voir la Requirement "Spot public : pas de statut piloté" ci-dessous).

Le système SHALL charger les statuts disponibles pour un spot privé depuis un fichier de config `configs/spot-statuses/{discipline-slug}.json`. Chaque statut SHALL avoir un slug, une couleur de badge, un flag `visible_on_map` et un label multilingue `{ fr, en, es }`. Un spot affiche les statuts de sa discipline principale.

#### Scenario: Statuts MX chargés depuis la config
- **WHEN** un rider consulte un spot de discipline principale MX
- **THEN** les statuts disponibles sont ceux définis dans `configs/spot-statuses/mx.json`, affichés dans sa langue

#### Scenario: Discipline sans config de statuts
- **WHEN** une nouvelle discipline n'a pas encore de fichier de config statuts
- **THEN** le système utilise les statuts génériques : `open` (vert) et `closed` (rouge)

#### Scenario: Spot non visible retiré du feed
- **WHEN** un spot passe à un statut avec `visible_on_map: false`
- **THEN** il disparaît immédiatement du feed de la carte et des résultats de recherche

---

### Requirement: Mise à jour du statut par le gestionnaire
Le système SHALL permettre au gestionnaire de modifier le statut de son spot en 2 interactions maximum depuis le back-office. Les options proposées SHALL correspondre aux statuts définis dans la config de la discipline principale du spot.

#### Scenario: Changement de statut rapide
- **WHEN** le gestionnaire sélectionne un nouveau statut dans le back-office
- **THEN** le statut est mis à jour immédiatement et visible par tous les riders en temps réel

#### Scenario: Notification aux followers lors d'une ouverture
- **WHEN** un spot passe d'un statut fermé à un statut ouvert (`open`)
- **THEN** le système envoie une notification push à tous les riders qui suivent ce spot (voir notifications-push)

---

### Requirement: Spot public — pas de statut piloté
Un spot de catégorie **publique** ne SHALL pas avoir de statut piloté par un gestionnaire (il n'y en a pas). Sa page SHALL mettre en avant les sessions à venir créées par les riders plutôt qu'un badge de statut (voir sessions-core).

#### Scenario: Consultation d'un spot public
- **WHEN** un rider consulte un spot de catégorie publique
- **THEN** aucun badge de statut n'est affiché ; la page liste les sessions à venir sur ce spot

#### Scenario: Pas d'écran de gestion de statut
- **WHEN** le créateur d'un spot public consulte sa fiche
- **THEN** aucune option de changement de statut ne lui est proposée, puisqu'il n'est pas gestionnaire du lieu

---

### Requirement: Statistiques de fréquentation pour le gestionnaire
Le système SHALL afficher au gestionnaire d'un spot privé des statistiques de base sur son back-office : nombre de vues de la fiche sur les 30 derniers jours, nombre d'inscriptions cumulées, nombre de followers.

#### Scenario: Consultation des statistiques
- **WHEN** le gestionnaire d'un spot ouvre l'onglet statistiques de son back-office
- **THEN** il voit le nombre de vues des 30 derniers jours, le total d'inscriptions et le nombre de followers

#### Scenario: Spot sans historique
- **WHEN** un spot vient d'être publié et n'a encore aucune vue ni inscription
- **THEN** les statistiques affichent des compteurs à zéro plutôt qu'un écran vide ou une erreur
