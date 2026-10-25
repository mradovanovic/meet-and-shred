## ADDED Requirements

### Requirement: Tokens JWT access + refresh (Supabase)
Le système SHALL s'appuyer sur Supabase Auth pour émettre un access token JWT (expiry 15 minutes) et un refresh token rotatif à chaque authentification réussie. Le refresh token SHALL tourner à chaque usage et la session SHALL expirer après ~30 jours (inactivity timeout). La révocation SHALL être assurée par Supabase.

#### Scenario: Access token expiré
- **WHEN** une requête est envoyée avec un access token expiré
- **THEN** le SDK renouvelle silencieusement l'access token via le refresh token ; en cas d'appel serveur sans renouvellement, le système retourne une erreur 401 `TOKEN_EXPIRED`

#### Scenario: Refresh réussi
- **WHEN** le client renouvelle la session avec un refresh token valide
- **THEN** Supabase retourne un nouvel access token et un nouveau refresh token (rotation) et invalide l'ancien

#### Scenario: Refresh token invalide ou révoqué
- **WHEN** le refresh token est inconnu ou révoqué
- **THEN** la session échoue, le client SHALL supprimer la session locale et rediriger vers la connexion

---

### Requirement: Stockage sécurisé côté mobile
Le système mobile SHALL stocker la session Supabase via `expo-secure-store` (Keychain iOS / Keystore Android), jamais en AsyncStorage non chiffré. L'adaptateur de stockage SHALL gérer les sessions dépassant la limite de taille de SecureStore.

#### Scenario: Stockage sécurisé iOS
- **WHEN** l'app reçoit une session Supabase
- **THEN** la session est persistée via l'adaptateur `expo-secure-store` (accessible uniquement appareil déverrouillé), découpée si elle dépasse la limite de SecureStore

---

### Requirement: Déconnexion
Le système SHALL permettre au rider de se déconnecter via `supabase.auth.signOut`, ce qui SHALL invalider le refresh token côté Supabase.

#### Scenario: Déconnexion réussie
- **WHEN** le rider se déconnecte
- **THEN** le refresh token est révoqué côté Supabase, la session locale est supprimée et le rider est redirigé vers l'écran de connexion

---

### Requirement: Persistance de session
Le système SHALL maintenir la session active entre les ouvertures de l'app si le refresh token est valide, via l'auto-refresh de `supabase-js`.

#### Scenario: Réouverture de l'app avec session valide
- **WHEN** le rider ouvre l'app avec une session valide stockée
- **THEN** le SDK renouvelle silencieusement l'access token et l'app accède directement à la carte sans repasser par le login
