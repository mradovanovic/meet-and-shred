## 1. Configuration Supabase

- [ ] 1.1 Créer le projet Supabase (région UE / Paris)
- [ ] 1.2 Activer le provider Email (inscription email/mdp)
- [ ] 1.3 Régler l'expiry du JWT access token à 15 min ; vérifier la rotation des refresh tokens
- [ ] 1.4 Désactiver le blocage par confirmation d'email au MVP (confirmation non bloquante)
- [ ] 1.5 Configurer le provider Google (OAuth 2.0 — client id/secret à fournir au `/wizard`, reporté)
- [ ] 1.6 Configurer le provider Apple (Sign-In — clés à fournir au `/wizard`, reporté)
- [ ] 1.7 Versionner la configuration et les migrations dans `supabase/`

## 2. Base de données — profil

- [ ] 2.1 Migration : table `public.profiles` (`id` FK → `auth.users.id`, `first_name`, `last_name`, `created_at`)
- [ ] 2.2 Trigger `on auth.users insert` → créer la ligne `profiles` depuis les métadonnées (`first_name`, `last_name`)
- [ ] 2.3 Politiques RLS : un rider ne peut `select`/`update` que sa propre ligne `profiles`
- [ ] 2.4 Index sur `profiles.id` (clé primaire) — pas de table `users`/`refresh_tokens` maison (gérées par Supabase)

## 3. Mobile — client Supabase & session

- [ ] 3.1 Installer et initialiser `supabase-js` dans l'app Expo
- [ ] 3.2 Adaptateur de stockage sur `expo-secure-store` (Keychain/Keystore), avec découpage si session > ~2 Ko
- [ ] 3.3 Activer l'auto-refresh de l'access token au démarrage et en tâche de fond
- [ ] 3.4 Gérer l'état de session (connecté / déconnecté) et la redirection vers login si refresh invalide

## 4. Mobile — inscription & connexion email/mdp

- [ ] 4.1 Écran formulaire : nom, prénom (pas de date de naissance)
- [ ] 4.2 Écran email + mot de passe avec validation temps réel (mdp ≥ 8 chars)
- [ ] 4.3 Inscription via `supabase.auth.signUp` en passant `first_name`/`last_name` en métadonnées
- [ ] 4.4 Connexion via `supabase.auth.signInWithPassword`
- [ ] 4.5 Erreur email déjà utilisé (409) et identifiants incorrects (401 générique)
- [ ] 4.6 Écran « Mot de passe oublié » → `supabase.auth.resetPasswordForEmail`
- [ ] 4.7 Écran de réinitialisation depuis le lien email → `supabase.auth.updateUser`

## 5. Mobile — SSO Google & Apple

- [ ] 5.1 Flux Google natif Expo → échange de l'`id_token` via `supabase.auth.signInWithIdToken`
- [ ] 5.2 Flux Apple (`expo-apple-authentication`) → échange de l'`id_token` via `supabase.auth.signInWithIdToken`
- [ ] 5.3 Boutons Google / Apple sur l'écran d'accueil et de connexion
- [ ] 5.4 Vérifier que le trigger crée bien le `profiles` au premier SSO (nom depuis le provider, email éventuellement masqué par Apple)

## 6. Mobile — géolocalisation onboarding (non-bloquante)

- [ ] 6.1 Écran pédagogique avant la demande de permission (« Pourquoi on a besoin de ta position »)
- [ ] 6.2 Demande de permission géolocalisation native (iOS + Android)
- [ ] 6.3 Si accordée : stocker la position initiale et rediriger vers la carte
- [ ] 6.4 Si refusée : rediriger vers la carte avec un champ de recherche de lieu (autocomplete) pour saisir la zone — **pas** d'écran bloquant
- [ ] 6.5 Nudge dans les paramètres pour activer la géolocalisation plus tard ; déblocage auto de la détection si activée

## 7. Révocation Apple (à préciser)

- [ ] 7.1 Prévoir le traitement de la révocation de token Apple pour invalider la session côté Supabase (solutioning)
