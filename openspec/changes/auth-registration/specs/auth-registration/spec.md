## ADDED Requirements

### Requirement: Inscription par email
Le système SHALL permettre à un rider de créer un compte avec nom, prénom et email/mot de passe via Supabase Auth. Le mot de passe SHALL contenir au minimum 8 caractères. Le nom et le prénom SHALL être transmis en métadonnées à l'inscription et matérialisés dans la table `profiles`.

#### Scenario: Inscription email réussie
- **WHEN** le rider soumet un formulaire valide (nom, prénom, email unique, mdp ≥ 8 chars)
- **THEN** le système crée le compte via Supabase, crée la ligne `profiles` associée, ouvre une session (access token JWT + refresh token) et redirige vers l'étape géolocalisation

#### Scenario: Email déjà utilisé
- **WHEN** le rider tente de s'inscrire avec un email déjà enregistré
- **THEN** le système retourne une erreur 409 avec le message "Un compte existe déjà avec cet email"

#### Scenario: Mot de passe trop court
- **WHEN** le rider soumet un mot de passe de moins de 8 caractères
- **THEN** le système retourne une erreur de validation avant envoi au serveur

---

### Requirement: Inscription via Google SSO
Le système SHALL permettre l'inscription et la connexion via un compte Google (OAuth 2.0), configuré comme provider Supabase.

#### Scenario: Première connexion Google
- **WHEN** le rider s'authentifie via Google pour la première fois
- **THEN** le système crée un compte à partir des données Google (nom, email), crée la ligne `profiles`, ouvre une session et redirige vers l'étape géolocalisation

#### Scenario: Compte Google déjà lié
- **WHEN** le rider s'authentifie via Google avec un compte déjà enregistré
- **THEN** le système connecte le rider et ouvre une nouvelle session

---

### Requirement: Inscription via Apple Sign-In
Le système SHALL permettre l'inscription et la connexion via Apple Sign-In (obligatoire pour App Store iOS si Google SSO est présent), configuré comme provider Supabase.

#### Scenario: Première connexion Apple
- **WHEN** le rider s'authentifie via Apple pour la première fois
- **THEN** le système crée un compte (l'email peut être masqué par Apple), crée la ligne `profiles`, ouvre une session et redirige vers l'étape géolocalisation

#### Scenario: Révocation Apple
- **WHEN** Apple révoque le token du rider
- **THEN** le système invalide la session du rider concerné côté Supabase

---

### Requirement: Géolocalisation proposée à l'onboarding (non-bloquante)
Le système SHALL demander la permission de géolocalisation à la fin du flux d'inscription. Le refus de cette permission SHALL NOT bloquer l'accès à l'application : le rider saisit alors sa zone via un champ de recherche de lieu.

#### Scenario: Permission accordée
- **WHEN** le rider accorde la permission de géolocalisation
- **THEN** le système stocke la position initiale et redirige vers la carte principale

#### Scenario: Permission refusée
- **WHEN** le rider refuse la permission de géolocalisation
- **THEN** le système redirige vers la carte principale avec un champ de recherche de lieu (autocomplete) permettant de saisir sa ville/région, et affiche un nudge pour activer la géolocalisation plus tard

#### Scenario: Géolocalisation activée ultérieurement
- **WHEN** le rider active la géolocalisation depuis les paramètres
- **THEN** le système détecte le changement et utilise la position détectée à la place de la saisie manuelle

---

### Requirement: Connexion
Le système SHALL permettre à un rider existant de se connecter via email/mdp, Google ou Apple.

#### Scenario: Connexion email réussie
- **WHEN** le rider soumet un email et mot de passe valides
- **THEN** le système ouvre une session (access token + refresh token)

#### Scenario: Identifiants incorrects
- **WHEN** le rider soumet un email ou mot de passe incorrect
- **THEN** le système retourne une erreur 401 générique sans préciser lequel est incorrect

---

### Requirement: Récupération de mot de passe
Le système SHALL permettre à un rider de réinitialiser son mot de passe via son email (emails Supabase Auth).

#### Scenario: Email de réinitialisation envoyé
- **WHEN** le rider soumet son email sur l'écran "Mot de passe oublié"
- **THEN** le système déclenche l'envoi d'un email de réinitialisation, avec une réponse identique que l'email existe ou non (pour éviter l'énumération)

#### Scenario: Lien expiré
- **WHEN** le rider clique sur un lien de réinitialisation expiré
- **THEN** le système affiche un message d'erreur et propose de demander un nouveau lien
