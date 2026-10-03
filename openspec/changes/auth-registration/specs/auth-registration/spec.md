## ADDED Requirements

### Requirement: Écran d'accueil avec message de bienvenue
Le système SHALL afficher un écran d'accueil à tout visiteur non connecté, avec un message de bienvenue court et les boutons de connexion : Google, Facebook, TikTok, email (et Apple sur iOS). Le message SHALL être affiché dans la langue de l'appareil parmi FR, EN, ES (français par défaut — voir i18n-core). L'écran SHALL comporter des liens vers les CGU et la politique de confidentialité.

#### Scenario: Premier lancement
- **WHEN** un visiteur ouvre l'app sans session
- **THEN** il voit le message "Bienvenue sur MeetNShred — trouve des spots, rejoins des sessions, rencontre des riders près de chez toi" et les boutons "Continuer avec Google", "Continuer avec Facebook", "Continuer avec TikTok", "Continuer avec un email"

#### Scenario: Bouton Apple sur iOS
- **WHEN** l'app est ouverte sur un iPhone
- **THEN** le bouton "Continuer avec Apple" est affiché en plus des autres (obligatoire sur l'App Store dès qu'un autre service de connexion est proposé)

#### Scenario: Session déjà active
- **WHEN** un rider ouvre l'app avec une session valide (voir auth-session)
- **THEN** l'écran d'accueil est ignoré et la carte s'affiche directement

#### Scenario: Langue du message
- **WHEN** l'appareil est réglé en espagnol
- **THEN** le message de bienvenue et les boutons s'affichent en espagnol

---

### Requirement: Inscription par email
Le système SHALL permettre à un rider de créer un compte avec nom, prénom et email/mot de passe. Le mot de passe SHALL contenir au minimum 8 caractères. Aucune date de naissance n'est demandée : l'âge minimum est confirmé par une case à cocher (voir account-privacy).

#### Scenario: Inscription email réussie
- **WHEN** le rider soumet un formulaire valide (nom, prénom, email unique, mdp ≥ 8 chars) en ayant accepté les conditions (voir account-privacy)
- **THEN** le système crée le compte, retourne un access token JWT et un refresh token, et redirige vers l'étape géolocalisation

#### Scenario: Email déjà utilisé
- **WHEN** le rider tente de s'inscrire avec un email déjà enregistré
- **THEN** le système retourne une erreur 409 avec le message "Un compte existe déjà avec cet email"

#### Scenario: Mot de passe trop court
- **WHEN** le rider soumet un mot de passe de moins de 8 caractères
- **THEN** le système retourne une erreur de validation avant envoi au serveur

---

### Requirement: Inscription via Google
Le système SHALL permettre l'inscription et la connexion via un compte Google (OAuth 2.0).

#### Scenario: Première connexion Google
- **WHEN** le rider s'authentifie via Google pour la première fois
- **THEN** le système crée un compte à partir des données Google (nom, email) une fois les conditions acceptées (voir account-privacy), retourne les tokens JWT et redirige vers l'étape géolocalisation

#### Scenario: Compte Google déjà lié
- **WHEN** le rider s'authentifie via Google avec un compte déjà enregistré
- **THEN** le système connecte le rider et retourne de nouveaux tokens JWT

---

### Requirement: Inscription via Facebook
Le système SHALL permettre l'inscription et la connexion via un compte Facebook.

#### Scenario: Première connexion Facebook
- **WHEN** le rider s'authentifie via Facebook pour la première fois
- **THEN** le système crée un compte à partir des données Facebook (nom, email si fourni) une fois les conditions acceptées, retourne les tokens JWT et redirige vers l'étape géolocalisation

#### Scenario: Compte Facebook déjà lié
- **WHEN** le rider s'authentifie via Facebook avec un compte déjà enregistré
- **THEN** le système connecte le rider et retourne de nouveaux tokens JWT

---

### Requirement: Inscription via TikTok
Le système SHALL permettre l'inscription et la connexion via un compte TikTok.

#### Scenario: Première connexion TikTok
- **WHEN** le rider s'authentifie via TikTok pour la première fois
- **THEN** le système crée un compte à partir des données TikTok (nom affiché) une fois les conditions acceptées et l'email renseigné (voir "Email manquant chez le fournisseur"), retourne les tokens JWT et redirige vers l'étape géolocalisation

#### Scenario: Compte TikTok déjà lié
- **WHEN** le rider s'authentifie via TikTok avec un compte déjà enregistré
- **THEN** le système connecte le rider et retourne de nouveaux tokens JWT

---

### Requirement: Inscription via Apple Sign-In
Le système SHALL permettre l'inscription et la connexion via Apple Sign-In, proposé sur iOS dès qu'un autre service de connexion est présent (règle App Store).

#### Scenario: Première connexion Apple
- **WHEN** le rider s'authentifie via Apple pour la première fois
- **THEN** le système crée un compte (l'email peut être masqué par Apple), retourne les tokens JWT et redirige vers l'étape géolocalisation

#### Scenario: Révocation Apple
- **WHEN** Apple envoie un webhook de révocation de token
- **THEN** le système invalide la session du rider concerné

---

### Requirement: Email manquant chez le fournisseur de connexion
Quand un fournisseur (Facebook, TikTok) ne transmet pas d'email, le système SHALL demander au rider de le saisir et SHALL le confirmer par un lien envoyé à cette adresse avant de finaliser le compte.

#### Scenario: TikTok sans email
- **WHEN** un rider se connecte via TikTok, qui ne fournit pas d'email
- **THEN** le système lui demande son email, envoie un lien de confirmation, et ne finalise le compte qu'après clic sur ce lien

#### Scenario: Email fourni par le fournisseur
- **WHEN** Google ou Facebook transmet un email
- **THEN** aucune saisie ni confirmation supplémentaire n'est demandée

---

### Requirement: Géolocalisation demandée à l'onboarding, non bloquante
Le système SHALL demander la permission de géolocalisation à la fin du flux d'inscription, après un écran qui explique à quoi elle sert : centrer la carte sur le rider, afficher les spots, events et sessions autour de lui et trier par distance. Cette permission SHALL rester facultative : un refus ne SHALL pas bloquer l'accès à l'application.

#### Scenario: Écran d'explication avant la demande
- **WHEN** le rider arrive à l'étape géolocalisation
- **THEN** l'écran explique l'usage de la position, indique qu'elle est facultative, puis propose "Activer la position" ou "Plus tard"

#### Scenario: Permission accordée
- **WHEN** le rider accorde la permission de géolocalisation
- **THEN** le système stocke la position initiale et redirige vers la carte principale, centrée sur cette position

#### Scenario: Permission refusée ou "Plus tard"
- **WHEN** le rider refuse la permission ou choisit "Plus tard"
- **THEN** le système redirige quand même vers la carte principale, avec un champ de recherche par lieu affiché en premier plan à la place du centrage automatique (voir map-core)

#### Scenario: Permission refusée puis accordée plus tard
- **WHEN** le rider active la géolocalisation depuis les paramètres après avoir initialement refusé
- **THEN** le système détecte le changement et recentre automatiquement la carte sur sa position

---

### Requirement: Connexion
Le système SHALL permettre à un rider existant de se connecter via email/mdp, Google, Facebook, TikTok ou Apple.

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
