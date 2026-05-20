## 1. Base de données

- [ ] 1.1 Créer la table `users` (id, first_name, last_name, dob, email, password_hash, auth_provider, provider_id, geolocation_granted, created_at)
- [ ] 1.2 Créer la table `refresh_tokens` (id, user_id, token_hash, expires_at, revoked_at)
- [ ] 1.3 Ajouter les index sur `users.email` et `refresh_tokens.token_hash`

## 2. API Auth — Email/Mdp

- [ ] 2.1 `POST /auth/register` — inscription email/mdp avec validation (nom, prénom, DOB, email unique, mdp ≥ 8 chars)
- [ ] 2.2 `POST /auth/login` — connexion email/mdp, retourne access token + refresh token
- [ ] 2.3 `POST /auth/refresh` — rotation du refresh token, retourne nouvel access token + refresh token
- [ ] 2.4 `POST /auth/logout` — révocation du refresh token en base
- [ ] 2.5 `POST /auth/forgot-password` — envoi email de réinitialisation (réponse identique email existant ou non)
- [ ] 2.6 `POST /auth/reset-password` — validation du token de reset et mise à jour du mot de passe

## 3. API Auth — SSO

- [ ] 3.1 Intégration Google OAuth 2.0 — `POST /auth/google`
- [ ] 3.2 Intégration Apple Sign-In — `POST /auth/apple`
- [ ] 3.3 Webhook Apple revoke — `POST /auth/apple/revoke`
- [ ] 3.4 Logique upsert : créer le compte si premier SSO, connecter si existant

## 4. Middleware JWT

- [ ] 4.1 Middleware de validation du JWT sur toutes les routes protégées
- [ ] 4.2 Retourner `TOKEN_EXPIRED` (401) quand l'access token est expiré
- [ ] 4.3 Retourner `UNAUTHORIZED` (401) pour token invalide ou manquant

## 5. Mobile — Écrans d'inscription

- [ ] 5.1 Écran 1 : formulaire nom, prénom, date de naissance
- [ ] 5.2 Écran 2 : email + mot de passe avec validation en temps réel
- [ ] 5.3 Boutons Google SSO et Apple Sign-In sur l'écran d'accueil
- [ ] 5.4 Écran de connexion (email/mdp + Google + Apple)
- [ ] 5.5 Écran "Mot de passe oublié"
- [ ] 5.6 Écran de réinitialisation de mot de passe (depuis lien email)

## 6. Mobile — Géolocalisation onboarding

- [ ] 6.1 Écran pédagogique avant demande de permission ("Pourquoi on a besoin de ta position")
- [ ] 6.2 Demande de permission géolocalisation native (iOS + Android)
- [ ] 6.3 Écran bloquant si permission refusée avec bouton "Ouvrir les paramètres"
- [ ] 6.4 Détection du changement de permission et déblocage automatique

## 7. Mobile — Gestion des tokens

- [ ] 7.1 Stockage du refresh token dans Keychain (iOS) / Keystore (Android)
- [ ] 7.2 Renouvellement silencieux de l'access token au démarrage de l'app
- [ ] 7.3 Intercepteur HTTP : auto-refresh si 401 `TOKEN_EXPIRED`, logout si refresh invalide
