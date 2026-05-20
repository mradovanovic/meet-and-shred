## ADDED Requirements

### Requirement: Tokens JWT access + refresh
Le système SHALL émettre un access token JWT (15 minutes) et un refresh token opaque (30 jours) à chaque authentification réussie. Le refresh token SHALL être stocké en base pour permettre la révocation.

#### Scenario: Access token expiré
- **WHEN** le client envoie une requête avec un access token expiré
- **THEN** le système retourne une erreur 401 avec le code `TOKEN_EXPIRED`

#### Scenario: Refresh réussi
- **WHEN** le client envoie un refresh token valide à `POST /auth/refresh`
- **THEN** le système retourne un nouvel access token et un nouveau refresh token (rotation), et invalide l'ancien refresh token

#### Scenario: Refresh token invalide ou révoqué
- **WHEN** le client envoie un refresh token inconnu ou révoqué
- **THEN** le système retourne une erreur 401 et le client SHALL supprimer les tokens locaux et rediriger vers la connexion

---

### Requirement: Stockage sécurisé côté mobile
Le système mobile SHALL stocker le refresh token dans le Keychain (iOS) ou Keystore (Android), jamais en AsyncStorage non chiffré.

#### Scenario: Stockage Keychain iOS
- **WHEN** l'app reçoit un refresh token
- **THEN** le token est stocké avec `kSecAttrAccessibleWhenUnlockedThisDeviceOnly`

---

### Requirement: Déconnexion
Le système SHALL permettre au rider de se déconnecter, ce qui SHALL invalider le refresh token côté serveur.

#### Scenario: Déconnexion réussie
- **WHEN** le rider se déconnecte via `POST /auth/logout`
- **THEN** le refresh token est révoqué en base, les tokens locaux sont supprimés et le rider est redirigé vers l'écran de connexion

---

### Requirement: Persistance de session
Le système SHALL maintenir la session active entre les ouvertures de l'app si le refresh token est valide.

#### Scenario: Réouverture de l'app avec session valide
- **WHEN** le rider ouvre l'app avec un refresh token valide stocké
- **THEN** l'app renouvelle silencieusement l'access token et accède directement à la carte sans repasser par le login
