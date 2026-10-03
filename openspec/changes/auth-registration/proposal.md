## Why

Les riders doivent pouvoir rejoindre MeetNShred rapidement. L'inscription est la première impression — trop de friction ici = perte d'utilisateur. La géolocalisation enrichit l'expérience mais ne doit pas bloquer l'accès.

## What Changes

- Écran d'accueil avec message de bienvenue et choix du mode de connexion
- Création du flux d'inscription (email/mot de passe, Google, Facebook, TikTok, et Apple sur iOS)
- Collecte des données minimales : nom, prénom, email (plus de date de naissance : l'âge minimum de 16 ans est confirmé par une case à cocher)
- Demande de permission géolocalisation à l'onboarding, précédée d'un écran qui explique son usage — non-bloquante (expérience dégradée si refus)
- Création du flux de connexion (email/mdp, Google, Facebook, TikTok, Apple)
- Gestion des sessions (JWT, refresh token)
- Écran de récupération de mot de passe
- Stack mobile : React Native Expo (iOS + Android)
- Consentement explicite aux CGU et à la politique de confidentialité à l'inscription
- Suppression de compte (droit à l'oubli) et export des données personnelles (droit d'accès/portabilité) — obligations RGPD pour une app visant le marché européen dès le lancement

## Capabilities

### New Capabilities
- `auth-registration`: Écran d'accueil, inscription rider avec email/mdp ou Google/Facebook/TikTok/Apple, collecte nom + prénom + email, demande géolocalisation optionnelle
- `auth-session`: Gestion des sessions JWT, refresh token, logout, persistance locale
- `account-privacy`: Consentement CGU/politique de confidentialité, âge minimum 16 ans, information sur la position, suppression de compte, export des données personnelles

### Modified Capabilities
<!-- aucune — premier setup -->

## Impact

- Nouvelle table `users` en base de données, avec `terms_accepted_at` et `terms_version`
- Intégration Google OAuth 2.0, Facebook Login, TikTok Login Kit et Apple Sign-In (obligatoire iOS App Store dès qu'un autre service tiers est proposé)
- Facebook et TikTok exigent une validation de l'app par le fournisseur avant ouverture au public : démarche à lancer tôt, délai hors de notre contrôle
- Middleware d'authentification JWT sur toutes les routes protégées
- Permission géolocalisation optionnelle — deux modes d'expérience (avec / sans position), non bloquante (voir Decisions dans design.md pour la correction d'une incohérence antérieure)
- Documents CGU et politique de confidentialité à rédiger et héberger (hors périmètre technique de ce change)
- Anonymisation en cascade à la suppression de compte : messages, avis, spots/magasins gérés (voir account-privacy)
