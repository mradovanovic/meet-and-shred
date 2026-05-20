## ADDED Requirements

### Requirement: Statuts de spot définis par discipline dans des fichiers de config
Le système SHALL charger les statuts disponibles pour un spot depuis un fichier de config `configs/spot-statuses/{discipline-slug}.json`. Chaque statut SHALL avoir un slug, une couleur de badge, un flag `visible_on_map` et un label multilingue `{ fr, en, es }`. Un spot affiche les statuts de sa discipline principale.

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
