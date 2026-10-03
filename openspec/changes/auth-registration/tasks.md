## 1. Base de données

- [ ] 1.1 Créer la table `users` (id, first_name, last_name, email nullable jusqu'à confirmation, email_confirmed_at nullable, password_hash nullable, auth_provider [email/google/facebook/tiktok/apple], provider_id, geolocation_granted, terms_accepted_at, terms_version, age_confirmed_at, deleted_at nullable, created_at) — plus de date de naissance
- [ ] 1.2 Créer la table `refresh_tokens` (id, user_id, token_hash, expires_at, revoked_at)
- [ ] 1.3 Ajouter les index sur `users.email` et `refresh_tokens.token_hash`

## 2. API Auth — Email/Mdp

- [ ] 2.1 `POST /auth/register` — inscription email/mdp avec validation (nom, prénom, email unique, mdp ≥ 8 chars, consentement CGU et âge ≥ 16 ans cochés)
- [ ] 2.2 `POST /auth/login` — connexion email/mdp, retourne access token + refresh token
- [ ] 2.3 `POST /auth/refresh` — rotation du refresh token, retourne nouvel access token + refresh token
- [ ] 2.4 `POST /auth/logout` — révocation du refresh token en base
- [ ] 2.5 `POST /auth/forgot-password` — envoi email de réinitialisation (réponse identique email existant ou non)
- [ ] 2.6 `POST /auth/reset-password` — validation du token de reset et mise à jour du mot de passe

## 3. API Auth — SSO

- [ ] 3.1 Intégration Google OAuth 2.0 — `POST /auth/google`
- [ ] 3.2 Intégration Apple Sign-In — `POST /auth/apple`
- [ ] 3.3 Webhook Apple revoke — `POST /auth/apple/revoke`
- [ ] 3.4 Logique upsert : créer le compte si premier SSO, connecter si existant ; pour un nouveau compte, ne créer qu'après consentement CGU + âge (écran dédié), sinon écarter les données du fournisseur
- [ ] 3.5 Intégration Facebook Login — `POST /auth/facebook` (déclarer l'app et lancer la validation Meta tôt)
- [ ] 3.6 Intégration TikTok Login Kit — `POST /auth/tiktok` (déclarer l'app et lancer la validation TikTok tôt)
- [ ] 3.7 Cas email absent (TikTok, Facebook sans email) : saisie de l'email puis lien de confirmation avant finalisation du compte
- [ ] 3.8 Rattachement par email confirmé si un compte existe déjà avec le même email chez un autre fournisseur (à valider, voir Open Questions)

## 4. Middleware JWT

- [ ] 4.1 Middleware de validation du JWT sur toutes les routes protégées
- [ ] 4.2 Retourner `TOKEN_EXPIRED` (401) quand l'access token est expiré
- [ ] 4.3 Retourner `UNAUTHORIZED` (401) pour token invalide ou manquant

## 5. Mobile — Écrans d'inscription

- [ ] 5.0 Écran d'accueil : message de bienvenue (FR/EN/ES selon l'appareil), boutons Google / Facebook / TikTok / email (+ Apple sur iOS), liens CGU et politique de confidentialité, ignoré si session valide
- [ ] 5.1 Écran 1 : formulaire nom, prénom
- [ ] 5.2 Écran 2 : email + mot de passe avec validation en temps réel, cases « J'accepte les CGU et la politique de confidentialité » et « J'ai 16 ans ou plus »
- [ ] 5.3 Écran de consentement après connexion tierce (nouveau compte uniquement) : mêmes deux cases
- [ ] 5.4 Écran de connexion (email/mdp + Google + Facebook + TikTok + Apple)
- [ ] 5.5 Écran "Mot de passe oublié"
- [ ] 5.6 Écran de réinitialisation de mot de passe (depuis lien email)

## 6. Mobile — Géolocalisation onboarding

- [ ] 6.1 Écran pédagogique avant demande de permission (à quoi sert la position, facultative, jamais visible des autres riders) avec « Activer la position » / « Plus tard »
- [ ] 6.2 Demande de permission géolocalisation native (iOS + Android), « pendant l'utilisation de l'app » uniquement
- [ ] 6.3 Si refus ou « Plus tard » : accès à la carte avec champ de recherche par lieu (voir map-core), jamais d'écran bloquant — tâche corrigée, elle prévoyait auparavant un écran bloquant contraire à la spec
- [ ] 6.4 Détection du changement de permission dans les réglages et recentrage automatique de la carte

## 7. Mobile — Gestion des tokens

- [ ] 7.1 Stockage du refresh token dans Keychain (iOS) / Keystore (Android)
- [ ] 7.2 Renouvellement silencieux de l'access token au démarrage de l'app
- [ ] 7.3 Intercepteur HTTP : auto-refresh si 401 `TOKEN_EXPIRED`, logout si refresh invalide

## 8. RGPD — Consentement, suppression, export

- [ ] 8.1 Cases à cocher consentement CGU/politique de confidentialité et âge ≥ 16 ans sur l'écran d'inscription (email et connexions tierces), non pré-cochées, bloquantes ; horodatage dans `terms_accepted_at` et `age_confirmed_at`
- [ ] 8.2 Écran de re-consentement si `terms_version` du compte est inférieure à la version courante, affiché avant tout autre écran
- [ ] 8.3 `DELETE /users/me` — suppression de compte : anonymise les champs identifiants, révoque les refresh tokens, réattribue messages/avis à un compte "Utilisateur supprimé", passe les spots/magasins gérés en orphelins
- [ ] 8.4 Écran de suppression de compte avec confirmation explicite (ex : retaper "SUPPRIMER")
- [ ] 8.5 `POST /users/me/export` — déclenche la compilation asynchrone d'un export des données personnelles, envoi du lien par email
- [ ] 8.6 Écran "Exporter mes données" dans les réglages, avec confirmation de la demande
- [ ] 8.7 Rédaction et hébergement des CGU et de la politique de confidentialité (contenu juridique, hors périmètre technique)
