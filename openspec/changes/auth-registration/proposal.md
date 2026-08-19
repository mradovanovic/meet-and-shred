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
- Consentement explicite aux CGU et à la politique de confidentialité à l'inscription
- Suppression de compte (droit à l'oubli) et export des données personnelles (droit d'accès/portabilité) — obligations RGPD pour une app visant le marché européen dès le lancement

## Capabilities

### New Capabilities
- `auth-registration`: Inscription rider avec email/mdp ou SSO Google/Apple, collecte nom + prénom + email, demande géolocalisation optionnelle
- `auth-session`: Gestion des sessions JWT, refresh token, logout, persistance locale
- `account-privacy`: Consentement CGU/politique de confidentialité, suppression de compte, export des données personnelles

### Modified Capabilities
<!-- aucune — premier setup -->

## Impact

- Nouvelle table `users` en base de données, avec `terms_accepted_at` et `terms_version`
- Intégration Google OAuth 2.0 et Apple Sign-In (obligatoire iOS App Store)
- Middleware d'authentification JWT sur toutes les routes protégées
- Permission géolocalisation optionnelle — deux modes d'expérience (avec / sans position), non bloquante (voir Decisions dans design.md pour la correction d'une incohérence antérieure)
- Documents CGU et politique de confidentialité à rédiger et héberger (hors périmètre technique de ce change)
- Anonymisation en cascade à la suppression de compte : messages, avis, spots/magasins gérés (voir account-privacy)
