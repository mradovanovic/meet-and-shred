## Why

Les riders doivent pouvoir rejoindre MeetNShred rapidement. L'inscription est la première impression — trop de friction ici = perte d'utilisateur. La géolocalisation enrichit l'expérience mais ne doit pas bloquer l'accès.

## What Changes

- Création du flux d'inscription (email/mot de passe, Google SSO, Apple SSO)
- Collecte des données minimales : nom, prénom, email
- Demande de permission géolocalisation à l'onboarding — non-bloquante (expérience dégradée si refus)
- Création du flux de connexion (email/mdp, Google, Apple)
- Gestion des sessions (JWT, refresh token)
- Écran de récupération de mot de passe
- Stack mobile : React Native Expo (iOS + Android)

## Capabilities

### New Capabilities
- `auth-registration`: Inscription rider avec email/mdp ou SSO Google/Apple, collecte nom + prénom + email, demande géolocalisation optionnelle
- `auth-session`: Gestion des sessions JWT, refresh token, logout, persistance locale

### Modified Capabilities
<!-- aucune — premier setup -->

## Impact

- Nouvelle table `users` en base de données
- Intégration Google OAuth 2.0 et Apple Sign-In (obligatoire iOS App Store)
- Middleware d'authentification JWT sur toutes les routes protégées
- Permission géolocalisation optionnelle — deux modes d'expérience (avec / sans position)
