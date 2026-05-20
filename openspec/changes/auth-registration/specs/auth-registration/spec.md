## ADDED Requirements

### Requirement: Inscription par email
Le système SHALL permettre à un rider de créer un compte avec nom, prénom, date de naissance et email/mot de passe. Le mot de passe SHALL contenir au minimum 8 caractères.

#### Scenario: Inscription email réussie
- **WHEN** le rider soumet un formulaire valide (nom, prénom, DOB, email unique, mdp ≥ 8 chars)
- **THEN** le système crée le compte, retourne un access token JWT et un refresh token, et redirige vers l'étape géolocalisation

#### Scenario: Email déjà utilisé
- **WHEN** le rider tente de s'inscrire avec un email déjà enregistré
- **THEN** le système retourne une erreur 409 avec le message "Un compte existe déjà avec cet email"

#### Scenario: Mot de passe trop court
- **WHEN** le rider soumet un mot de passe de moins de 8 caractères
- **THEN** le système retourne une erreur de validation avant envoi au serveur

---

### Requirement: Inscription via Google SSO
Le système SHALL permettre l'inscription et la connexion via un compte Google (OAuth 2.0).

#### Scenario: Première connexion Google
- **WHEN** le rider s'authentifie via Google pour la première fois
- **THEN** le système crée un compte à partir des données Google (nom, email), retourne les tokens JWT et redirige vers l'étape géolocalisation

#### Scenario: Compte Google déjà lié
- **WHEN** le rider s'authentifie via Google avec un compte déjà enregistré
- **THEN** le système connecte le rider et retourne de nouveaux tokens JWT

---

### Requirement: Inscription via Apple Sign-In
Le système SHALL permettre l'inscription et la connexion via Apple Sign-In (obligatoire pour App Store iOS si Google SSO est présent).

#### Scenario: Première connexion Apple
- **WHEN** le rider s'authentifie via Apple pour la première fois
- **THEN** le système crée un compte (l'email peut être masqué par Apple), retourne les tokens JWT et redirige vers l'étape géolocalisation

#### Scenario: Révocation Apple
- **WHEN** Apple envoie un webhook de révocation de token
- **THEN** le système invalide la session du rider concerné

---

### Requirement: Géolocalisation obligatoire à l'onboarding
Le système SHALL demander la permission de géolocalisation à la fin du flux d'inscription. Sans cette permission, l'accès à l'application SHALL être bloqué.

#### Scenario: Permission accordée
- **WHEN** le rider accorde la permission de géolocalisation
- **THEN** le système stocke la position initiale et redirige vers la carte principale

#### Scenario: Permission refusée
- **WHEN** le rider refuse la permission de géolocalisation
- **THEN** le système affiche un écran bloquant expliquant que la géolocalisation est nécessaire, avec un bouton "Ouvrir les paramètres"

#### Scenario: Permission refusée puis accordée
- **WHEN** le rider ouvre les paramètres et active la géolocalisation
- **THEN** le système détecte le changement et débloque l'accès à la carte

---

### Requirement: Connexion
Le système SHALL permettre à un rider existant de se connecter via email/mdp, Google ou Apple.

#### Scenario: Connexion email réussie
- **WHEN** le rider soumet un email et mot de passe valides
- **THEN** le système retourne un access token et un refresh token

#### Scenario: Identifiants incorrects
- **WHEN** le rider soumet un email ou mot de passe incorrect
- **THEN** le système retourne une erreur 401 générique sans préciser lequel est incorrect

---

### Requirement: Récupération de mot de passe
Le système SHALL permettre à un rider de réinitialiser son mot de passe via son email.

#### Scenario: Email de réinitialisation envoyé
- **WHEN** le rider soumet son email sur l'écran "Mot de passe oublié"
- **THEN** le système envoie un email avec un lien de réinitialisation valable 1 heure, même si l'email n'existe pas (réponse identique pour éviter l'énumération)

#### Scenario: Lien expiré
- **WHEN** le rider clique sur un lien de réinitialisation expiré
- **THEN** le système affiche un message d'erreur et propose de demander un nouveau lien
