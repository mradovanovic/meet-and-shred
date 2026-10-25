## Context

Application mobile multi-disciplines (MX, DH, Enduro, Kite, Piste, etc.). L'auth est la porte d'entrée de toute l'expérience. La géolocalisation enrichit la carte et les events mais n'est **pas bloquante** : sans elle, le rider saisit sa zone manuellement.

Le socle technique est fixé (ADR-0001) : **Supabase Auth** fournit comptes, tokens JWT, rotation des refresh tokens, SSO Google/Apple et emails de réinitialisation. L'app mobile est en **Expo (React Native + TypeScript)** et parle à Supabase via `supabase-js`.

## Goals / Non-Goals

**Goals:**
- Inscription en moins de 3 étapes sur mobile
- Support email/mdp + Google + Apple via Supabase Auth
- Access token JWT court (15 min) + refresh token rotatif (session ~30 j)
- Table `profiles` applicative (nom, prénom) liée à `auth.users`
- Demande permission géolocalisation dans le flux d'onboarding, non-bloquante
- Stockage sécurisé de la session côté mobile (Keychain / Keystore via `expo-secure-store`)

**Non-Goals:**
- Serveur d'authentification maison (délégué à Supabase)
- Authentification 2FA (Phase 3)
- Login par numéro de téléphone / SMS
- Gestion des rôles (spot_manager, organisateur) dans ce flux — géré séparément

## Decisions

**Supabase Auth plutôt qu'un serveur JWT maison**
→ Supabase émet des access tokens JWT (expiry configuré à 15 min) et gère la rotation automatique des refresh tokens, ainsi que leur révocation. On ne construit ni n'héberge d'endpoints d'auth. Conséquence : les tables `users` et `refresh_tokens` maison sont supprimées ; les comptes vivent dans `auth.users` (géré par Supabase).

**Profil applicatif séparé des comptes**
→ Une table `public.profiles` (`id` = FK vers `auth.users.id`, `first_name`, `last_name`, `created_at`) porte les données applicatives. Un trigger `on auth.users insert` crée la ligne `profiles` à partir des métadonnées passées à l'inscription (`first_name`, `last_name`). RLS : un rider ne peut lire/modifier que son propre profil.

**Durées de session**
→ Access token JWT : 15 min (config `JWT expiry` du projet). Refresh token : rotatif à chaque usage ; la session expire après ~30 j (inactivity timeout / time-box côté Supabase).

**Confirmation email non bloquante au MVP**
→ La confirmation d'email n'empêche pas l'accès à l'app au MVP (réglage « Confirm email » désactivé, ou email envoyé sans blocage). À durcir en Phase ultérieure si besoin.

**Google + Apple SSO obligatoires dès le MVP**
→ Apple exige son propre SSO si Google est présent sur iOS (règle App Store). Configurés comme providers Supabase ; côté Expo, flux natifs (`expo-apple-authentication`, Google) qui renvoient un `id_token` échangé via `supabase.auth.signInWithIdToken`.

**Géolocalisation proposée, non-bloquante**
→ Demandée à la fin de l'onboarding avec explication (« Pour voir les terrains et events autour de toi »). Si refusée, le rider accède quand même à l'app via un **champ de recherche de lieu (autocomplete)** où il saisit sa ville/région. La solution d'autocomplete (Google Places ou autre) sera définie au solutioning. Un nudge dans les paramètres invite à activer la géolocalisation plus tard.

**Champs minimaux à l'inscription**
→ Nom, prénom, email, mdp. **Pas de date de naissance**, pas de téléphone — friction minimale. Le profil complet (discipline, niveau, machine) est renseigné à l'étape suivante (onboarding profil).

**Stockage de session côté mobile**
→ `supabase-js` configuré avec un adaptateur de stockage sur `expo-secure-store` (Keychain iOS / Keystore Android), jamais en AsyncStorage non chiffré. Note : SecureStore limite chaque valeur à ~2 Ko ; prévoir un adaptateur qui découpe la session si nécessaire. Auto-refresh de l'access token assuré par le SDK.

## Risks / Trade-offs

- [Apple Sign-In] Révocation de token → honorer la révocation Apple (webhook / tâche) pour invalider la session côté Supabase ; à préciser au solutioning.
- [Géolocalisation refusée] Expérience dégradée → champ de recherche autocomplete pour saisir la zone, nudge dans les paramètres.
- [Session volée] → rotation automatique des refresh tokens (Supabase) + stockage `expo-secure-store`.
- [Limite SecureStore ~2 Ko] → adaptateur de stockage découpant la session Supabase, sinon échec silencieux de persistance.
- [Lock-in Supabase Auth] → atténué : la donnée de profil est du Postgres standard ; une sortie imposerait de re-plateformer l'auth (problème de grande échelle).

## Open Questions

- ~~Durée access token : 15 min ou 1h ?~~ → **Résolu : 15 min** (voir ADR-0001)
- ~~Durée refresh token : 30 jours ou 90 jours ?~~ → **Résolu : ~30 jours** (inactivity timeout Supabase)
- ~~Faut-il vérifier l'email avant d'accéder à l'app au MVP ?~~ → **Résolu : non bloquant**
- ~~Collecte de la date de naissance à l'inscription ?~~ → **Résolu : non**
- ~~Géolocalisation bloquante si refusée ?~~ → **Résolu : non-bloquante** (recherche manuelle de lieu en secours)
