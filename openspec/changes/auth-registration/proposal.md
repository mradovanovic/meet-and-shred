## Why

Les riders doivent pouvoir rejoindre MeetNShred rapidement. L'inscription est la première impression — trop de friction ici = perte d'utilisateur. La géolocalisation enrichit l'expérience mais ne doit pas bloquer l'accès.

L'authentification s'appuie sur **Supabase Auth** (voir ADR-0001) : comptes, tokens JWT, rotation des refresh tokens, SSO Google/Apple et emails de réinitialisation sont fournis par la plateforme. Le travail porte donc sur la **configuration** de Supabase, une table de **profil** applicative, et le **câblage côté mobile** (SDK `supabase-js` + Expo), pas sur la construction d'un serveur d'auth maison.

## What Changes

- Flux d'inscription via Supabase Auth : email/mot de passe, Google SSO, Apple SSO
- Collecte des données minimales : **nom, prénom, email** (pas de date de naissance)
- Table applicative `profiles` (nom, prénom) liée à `auth.users`, remplie à l'inscription
- Flux de connexion (email/mdp, Google, Apple) via le SDK
- Sessions gérées par Supabase (access token JWT 15 min + refresh token rotatif), persistées de façon sécurisée côté mobile
- Écran de récupération de mot de passe (email Supabase)
- Demande de permission géolocalisation à l'onboarding — **non-bloquante** (recherche manuelle de lieu en secours si refus)
- Stack mobile : React Native Expo (iOS + Android)

## Capabilities

### New Capabilities
- `auth-registration`: Inscription rider via email/mdp ou SSO Google/Apple (Supabase Auth), collecte nom + prénom + email, demande géolocalisation optionnelle
- `auth-session`: Gestion des sessions Supabase (JWT access + refresh rotatif), logout, persistance locale sécurisée

### Modified Capabilities
<!-- aucune — premier setup -->

## Impact

- Projet Supabase configuré (région UE/Paris) : providers email + Google + Apple, expiry JWT 15 min, confirmation email non bloquante au MVP
- Table `profiles` dans le schéma `public` + trigger de création à l'inscription + politiques RLS (chaque rider ne lit/écrit que son profil)
- La table des comptes (`auth.users`) et les refresh tokens sont **gérés par Supabase** — pas de tables maison
- Intégration Google OAuth 2.0 et Apple Sign-In (obligatoire iOS App Store) via les providers Supabase + flux natifs Expo
- Accès aux données protégé par **RLS** côté base (plus de middleware JWT maison à écrire pour les routes de données)
- Permission géolocalisation optionnelle — deux modes d'expérience (position détectée / lieu saisi manuellement)
