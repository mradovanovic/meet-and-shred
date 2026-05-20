## ADDED Requirements

### Requirement: Langues supportées
Le système SHALL supporter FR, EN et ES comme langues de l'interface. FR SHALL être la langue par défaut. L'architecture SHALL permettre l'ajout de nouvelles langues sans modification de code ou de schéma de base de données.

#### Scenario: Ajout d'une nouvelle langue
- **WHEN** un développeur ajoute les clés DE dans les fichiers de config et `locales/de.json`
- **THEN** la langue allemande est disponible sans migration ni redéploiement de la base

---

### Requirement: Préférence de langue utilisateur
Le système SHALL permettre au rider de choisir sa langue à l'inscription et de la modifier dans ses paramètres. La langue SHALL être stockée sur son profil.

#### Scenario: Sélection de la langue à l'inscription
- **WHEN** le rider choisit ES lors de l'inscription
- **THEN** l'app s'affiche en espagnol et l'API retourne les labels en ES

#### Scenario: Changement de langue dans les paramètres
- **WHEN** le rider change sa langue de EN à FR dans les paramètres
- **THEN** l'app bascule immédiatement en français sans rechargement

---

### Requirement: Fallback de langue
Le système SHALL résoudre la langue dans l'ordre suivant : préférence utilisateur → header Accept-Language → FR par défaut. Si un label n'existe pas dans la langue demandée, le système SHALL retourner le label FR.

#### Scenario: Label manquant en ES
- **WHEN** un nouveau statut n'a pas encore de traduction ES
- **THEN** le système retourne le label FR pour ce statut uniquement

---

### Requirement: Labels multilingues dans les données statiques
Toutes les données statiques (disciplines, statuts de spot, labels de champs matériel) SHALL stocker leurs textes affichables sous forme d'objet multilingue `{ fr, en, es }`.

#### Scenario: API retourne label localisé
- **WHEN** un rider EN interroge `GET /disciplines`
- **THEN** chaque discipline retourne son `label` en anglais

---

### Requirement: Contenu utilisateur non traduit
Le contenu généré par les utilisateurs (noms de spots, descriptions, bios, titres d'events) SHALL être stocké et affiché dans la langue de saisie originale sans traduction automatique.

#### Scenario: Spot créé en français consulté par un rider EN
- **WHEN** un rider EN consulte un spot dont la description a été saisie en FR
- **THEN** la description s'affiche en FR telle quelle, sans traduction
