## ADDED Requirements

### Requirement: Consentement aux CGU et à la politique de confidentialité
Le système SHALL exiger l'acceptation explicite des CGU et de la politique de confidentialité avant la création d'un compte, quel que soit le mode d'inscription (email, Google, Apple). Cette acceptation SHALL être horodatée et versionnée.

#### Scenario: Inscription sans consentement
- **WHEN** un rider tente de créer un compte sans cocher la case de consentement
- **THEN** le système refuse la création du compte

#### Scenario: Consentement horodaté
- **WHEN** un rider coche la case et crée son compte
- **THEN** le système enregistre la date et la version des CGU acceptées

#### Scenario: Mise à jour des CGU
- **WHEN** les CGU sont mises à jour vers une nouvelle version après l'inscription d'un rider
- **THEN** le système demande un nouveau consentement à sa prochaine connexion, avant de le laisser continuer

---

### Requirement: Suppression de compte
Le système SHALL permettre à un rider de supprimer son compte depuis les réglages, après une confirmation explicite. Les données personnelles identifiantes (nom, email, mot de passe, photos, bio) SHALL être supprimées immédiatement. Les contenus impliquant d'autres riders SHALL être conservés, réattribués à un compte anonymisé.

#### Scenario: Suppression confirmée
- **WHEN** un rider confirme la suppression de son compte
- **THEN** ses données identifiantes sont supprimées et son compte devient inaccessible immédiatement

#### Scenario: Messages conservés côté destinataire
- **WHEN** un rider supprime son compte après avoir envoyé des messages
- **THEN** ses messages restent visibles pour leurs destinataires, affichés comme envoyés par "Utilisateur supprimé" (voir rider-social)

#### Scenario: Avis conservés anonymisés
- **WHEN** un rider supprime son compte après avoir publié un avis sur un spot ou un magasin
- **THEN** l'avis reste visible mais son auteur s'affiche comme "Utilisateur supprimé" (voir reviews-core)

#### Scenario: Spot ou magasin orphelin
- **WHEN** un gestionnaire de spot ou de magasin supprime son compte
- **THEN** le spot ou le magasin concerné passe en statut orphelin, réaffectable par le super admin (voir spot-core, shop-core)

---

### Requirement: Export des données personnelles
Le système SHALL permettre à un rider de demander un export de ses données personnelles depuis les réglages.

#### Scenario: Demande d'export
- **WHEN** un rider demande l'export de ses données
- **THEN** le système compile un fichier contenant son profil, ses disciplines, son matériel, les spots/events qu'il a créés, et ses messages envoyés, puis envoie un lien de téléchargement par email

#### Scenario: Confirmation de la demande
- **WHEN** un rider déclenche une demande d'export
- **THEN** le système affiche une confirmation immédiate indiquant qu'il recevra le fichier par email sous peu, sans bloquer l'app en attendant
