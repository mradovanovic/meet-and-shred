## Why

Les riders doivent pouvoir rejoindre MeetNShred rapidement. L'inscription est la première impression — trop de friction ici = perte d'utilisateur. La géolocalisation enrichit l'expérience mais ne doit pas bloquer l'accès.

L'authentification s'appuie sur **Supabase Auth** (voir ADR-0001) : comptes, tokens JWT, rotation des refresh tokens, SSO et emails de réinitialisation sont fournis par la plateforme. Le travail porte donc sur la **configuration** de Supabase, une table de **profil** applicative, et le **câblage côté mobile** (SDK `supabase-js` + Expo), pas sur la construction d'un serveur d'auth maison.

## What Changes

- Écran d'accueil avec message de bienvenue et choix du mode de connexion
- Flux d'inscription via Supabase Auth : email/mot de passe, Google, Facebook, TikTok, et Apple sur iOS
- Collecte des données minimales : **nom, prénom, email** (pas de date de naissance ; l'âge minimum de 16 ans est confirmé par une case à cocher)
- Table applicative `profiles` (nom, prénom, consentement, âge confirmé) liée à `auth.users`, remplie à l'inscription
- Flux de connexion (email/mdp, Google, Facebook, TikTok, Apple) via le SDK
- Sessions gérées par Supabase (access token JWT 15 min + refresh token rotatif), persistées de façon sécurisée côté mobile
- Écran de récupération de mot de passe (email Supabase)
- Demande de permission géolocalisation à l'onboarding, précédée d'un écran qui explique son usage — **non-bloquante** (recherche manuelle de lieu en secours si refus)
- Stack mobile : React Native Expo (iOS + Android)
- Consentement explicite aux CGU et à la politique de confidentialité à l'inscription (horodaté, versionné)
- Suppression de compte (droit à l'oubli) et export des données personnelles (droit d'accès/portabilité) — obligations RGPD pour une app visant le marché européen dès le lancement

## Capabilities

### New Capabilities
- `auth-registration`: Écran d'accueil, inscription rider avec email/mdp ou Google/Facebook/TikTok/Apple (Supabase Auth), collecte nom + prénom + email, demande géolocalisation optionnelle
- `auth-session`: Gestion des sessions Supabase (JWT access + refresh rotatif), logout, persistance locale sécurisée
- `account-privacy`: Consentement CGU/politique de confidentialité, âge minimum 16 ans, information sur la position, suppression de compte, export des données personnelles

### Modified Capabilities
<!-- aucune — premier setup -->

## Impact

- Projet Supabase configuré (région UE/Paris) : providers email + Google + Facebook + TikTok + Apple, expiry JWT 15 min, confirmation email non bloquante au MVP
- Table `profiles` dans le schéma `public` (dont `terms_accepted_at`, `terms_version`, confirmation d'âge) + trigger de création à l'inscription + politiques RLS (chaque rider ne lit/écrit que son profil)
- La table des comptes (`auth.users`) et les refresh tokens sont **gérés par Supabase** — pas de tables maison
- Intégration des providers Supabase : Google OAuth 2.0, Facebook Login et Apple Sign-In sont natifs ; **TikTok n'a pas de provider natif Supabase → provider OIDC custom à configurer** (Login Kit). Apple obligatoire sur iOS dès qu'un autre service tiers est proposé
- Facebook et TikTok exigent une validation de l'app par le fournisseur avant ouverture au public : démarche à lancer tôt, délai hors de notre contrôle ; en attendant, Google + Apple + email suffisent à ouvrir
- Accès aux données protégé par **RLS** côté base (plus de middleware JWT maison à écrire pour les routes de données)
- Permission géolocalisation optionnelle — deux modes d'expérience (position détectée / lieu saisi manuellement), non bloquante
- Documents CGU et politique de confidentialité à rédiger et héberger (hors périmètre technique de ce change)
- Anonymisation en cascade à la suppression de compte : messages, avis, spots/magasins gérés (voir account-privacy)
