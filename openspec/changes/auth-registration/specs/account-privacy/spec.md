## ADDED Requirements

### Requirement: Consentement aux CGU et à la politique de confidentialité
Le système SHALL exiger l'acceptation explicite des CGU et de la politique de confidentialité avant la création d'un compte, quel que soit le mode d'inscription (email, Google, Facebook, TikTok, Apple). Cette acceptation SHALL être horodatée et versionnée.

#### Scenario: Inscription sans consentement
- **WHEN** un rider tente de créer un compte sans cocher la case de consentement
- **THEN** le système refuse la création du compte

#### Scenario: Consentement après connexion via un service tiers
- **WHEN** un nouveau rider s'authentifie via Google, Facebook, TikTok ou Apple
- **THEN** un écran de consentement (CGU, politique de confidentialité, âge minimum) s'affiche avant toute création de compte ; s'il refuse, aucun compte n'est créé et les données reçues du fournisseur sont écartées

#### Scenario: Consentement horodaté
- **WHEN** un rider coche la case et crée son compte
- **THEN** le système enregistre la date et la version des CGU acceptées

#### Scenario: Mise à jour des CGU
- **WHEN** les CGU sont mises à jour vers une nouvelle version après l'inscription d'un rider
- **THEN** le système demande un nouveau consentement à sa prochaine connexion, avant de le laisser continuer

---

### Requirement: Âge minimum de 16 ans
Le système SHALL exiger, pour toute création de compte quel que soit le mode d'inscription, la confirmation par une case à cocher non pré-cochée « J'ai 16 ans ou plus ». Sans cette confirmation, le compte ne SHALL pas être créé.

#### Scenario: Âge non confirmé
- **WHEN** un visiteur tente de créer un compte sans cocher la confirmation d'âge
- **THEN** le système refuse la création du compte

#### Scenario: Âge confirmé
- **WHEN** un visiteur coche la confirmation d'âge et crée son compte
- **THEN** le système enregistre la date de cette confirmation

---

### Requirement: Information claire sur l'usage de la position
Le système SHALL informer le rider, avant toute demande de permission de géolocalisation, de la finalité de la collecte (carte centrée, distances, contenus autour de lui), de son caractère facultatif et de la possibilité de la retirer à tout moment. La position GPS du rider ne SHALL jamais être visible des autres riders et ne SHALL être utilisée que lorsque l'app est au premier plan.

#### Scenario: Retrait de la permission
- **WHEN** le rider désactive la géolocalisation dans les réglages de son téléphone
- **THEN** l'app continue de fonctionner en mode recherche par lieu et n'utilise plus sa position

#### Scenario: App en arrière-plan
- **WHEN** l'app passe en arrière-plan
- **THEN** aucune position n'est collectée

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
