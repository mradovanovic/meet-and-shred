## 1. Configuration Supabase

- [ ] 1.1 Créer le projet Supabase (région UE / Paris)
- [ ] 1.2 Activer le provider Email (inscription email/mdp)
- [ ] 1.3 Régler l'expiry du JWT access token à 15 min ; vérifier la rotation des refresh tokens ; session ~30 j
- [ ] 1.4 Désactiver le blocage par confirmation d'email au MVP (confirmation non bloquante)
- [ ] 1.5 Configurer les providers natifs Google, Facebook, Apple (client ids/secrets à fournir au `/wizard`, reporté)
- [ ] 1.6 Configurer TikTok comme provider **OIDC custom** (Login Kit — pas de provider natif Supabase)
- [ ] 1.7 Lancer tôt les validations d'app Meta (Facebook) et TikTok (délai hors de notre contrôle)
- [ ] 1.8 Versionner la configuration et les migrations dans `supabase/`

## 2. Base de données — profil & consentement

- [ ] 2.1 Migration : table `public.profiles` (`id` FK → `auth.users.id`, `first_name`, `last_name`, `terms_accepted_at`, `terms_version`, `age_confirmed_at`, `created_at`)
- [ ] 2.2 Trigger `on auth.users insert` → créer la ligne `profiles` depuis les métadonnées (`first_name`, `last_name`)
- [ ] 2.3 Politiques RLS : un rider ne peut `select`/`update` que sa propre ligne `profiles`
- [ ] 2.4 Pas de tables `users`/`refresh_tokens` maison — comptes et tokens gérés par Supabase (`auth.users`)

## 3. Mobile — client Supabase & session

- [ ] 3.1 Installer et initialiser `supabase-js` dans l'app Expo
- [ ] 3.2 Adaptateur de stockage sur `expo-secure-store` (Keychain/Keystore), avec découpage si session > ~2 Ko
- [ ] 3.3 Activer l'auto-refresh de l'access token au démarrage et en tâche de fond
- [ ] 3.4 Gérer l'état de session (connecté / déconnecté) et la redirection vers login si refresh invalide

## 4. Mobile — écran d'accueil & inscription/connexion email

- [ ] 4.0 Écran d'accueil : message de bienvenue (FR/EN/ES selon l'appareil), boutons Google / Facebook / TikTok / email (+ Apple sur iOS), liens CGU et politique de confidentialité, ignoré si session valide
- [ ] 4.1 Écran formulaire : nom, prénom (pas de date de naissance)
- [ ] 4.2 Écran email + mot de passe avec validation temps réel (mdp ≥ 8 chars), cases « J'accepte les CGU et la politique de confidentialité » et « J'ai 16 ans ou plus »
- [ ] 4.3 Inscription via `supabase.auth.signUp` en passant `first_name`/`last_name` en métadonnées
- [ ] 4.4 Connexion via `supabase.auth.signInWithPassword`
- [ ] 4.5 Erreur email déjà utilisé (409) et identifiants incorrects (401 générique)
- [ ] 4.6 Écran « Mot de passe oublié » → `supabase.auth.resetPasswordForEmail`
- [ ] 4.7 Écran de réinitialisation depuis le lien email → `supabase.auth.updateUser`

## 5. Mobile — SSO Google, Apple, Facebook, TikTok

- [ ] 5.1 Flux Google natif Expo → échange de l'`id_token` via `supabase.auth.signInWithIdToken`
- [ ] 5.2 Flux Apple (`expo-apple-authentication`) → échange de l'`id_token` via `supabase.auth.signInWithIdToken`
- [ ] 5.3 Flux Facebook (provider Supabase) sur l'écran d'accueil et de connexion
- [ ] 5.4 Flux TikTok (provider OIDC custom / Login Kit) sur l'écran d'accueil et de connexion
- [ ] 5.5 Écran de consentement après connexion tierce (nouveau compte uniquement) : cases CGU + « 16 ans ou plus » ; sans acceptation, écarter les données du fournisseur
- [ ] 5.6 Cas email absent (TikTok, Facebook sans email) : saisie de l'email puis lien de confirmation avant finalisation du compte
- [ ] 5.7 Vérifier que le trigger crée bien le `profiles` au premier SSO (nom depuis le provider, email éventuellement masqué par Apple)
- [ ] 5.8 Rattachement par email confirmé si un compte existe déjà avec le même email chez un autre fournisseur (à valider, voir Open Questions)

## 6. Mobile — géolocalisation onboarding (non-bloquante)

- [ ] 6.1 Écran pédagogique avant la demande (à quoi sert la position, facultative, jamais visible des autres riders) avec « Activer la position » / « Plus tard »
- [ ] 6.2 Demande de permission géolocalisation native (iOS + Android), « pendant l'utilisation de l'app » uniquement
- [ ] 6.3 Si accordée : stocker la position initiale et rediriger vers la carte centrée dessus
- [ ] 6.4 Si refus ou « Plus tard » : accès à la carte avec champ de recherche par lieu (voir map-core), **jamais** d'écran bloquant
- [ ] 6.5 Détection du changement de permission dans les réglages et recentrage automatique de la carte

## 7. Révocation Apple (à préciser)

- [ ] 7.1 Prévoir le traitement de la révocation de token Apple pour invalider la session côté Supabase (solutioning)

## 8. RGPD — Consentement, suppression, export

- [ ] 8.1 Cases consentement CGU/politique de confidentialité et âge ≥ 16 ans à l'inscription (email et connexions tierces), non pré-cochées, bloquantes ; horodatage dans `profiles.terms_accepted_at` et `age_confirmed_at`
- [ ] 8.2 Écran de re-consentement si `terms_version` du compte est inférieure à la version courante, affiché avant tout autre écran
- [ ] 8.3 Edge Function de suppression de compte : anonymise les champs identifiants, révoque les sessions, réattribue messages/avis à un compte "Utilisateur supprimé", passe les spots/magasins gérés en orphelins
- [ ] 8.4 Écran de suppression de compte avec confirmation explicite (ex : retaper "SUPPRIMER")
- [ ] 8.5 Edge Function d'export : compilation asynchrone des données personnelles, envoi du lien de téléchargement par email
- [ ] 8.6 Écran "Exporter mes données" dans les réglages, avec confirmation de la demande
- [ ] 8.7 Rédaction et hébergement des CGU et de la politique de confidentialité (contenu juridique, hors périmètre technique)
