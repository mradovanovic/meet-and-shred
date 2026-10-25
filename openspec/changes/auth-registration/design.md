## Context

Application mobile multi-disciplines (MX, DH, Enduro, Kite, Piste, etc.). L'auth est la porte d'entrée de toute l'expérience. La géolocalisation est demandée mais **non bloquante** — sans elle, la carte fonctionne en mode recherche par lieu (voir map-core).

Le socle technique est fixé (ADR-0001) : **Supabase Auth** fournit comptes, tokens JWT, rotation des refresh tokens, SSO et emails de réinitialisation. L'app mobile est en **Expo (React Native + TypeScript)** et parle à Supabase via `supabase-js`.

## Goals / Non-Goals

**Goals:**
- Inscription en moins de 3 étapes sur mobile
- Écran d'accueil avec message de bienvenue et choix du mode de connexion
- Support email/mdp + Google + Facebook + TikTok + Apple
- Access token JWT court (15 min) + refresh token rotatif (session ~30 j), gérés par Supabase
- Table `profiles` applicative (nom, prénom, consentement, âge confirmé) liée à `auth.users`
- Demande permission géolocalisation dans le flux d'onboarding, non-bloquante
- Stockage sécurisé de la session côté mobile (Keychain / Keystore via `expo-secure-store`)
- Consentement explicite aux CGU/politique de confidentialité, horodaté et versionné
- Suppression de compte et export des données personnelles, accessibles depuis les réglages

**Non-Goals:**
- Serveur d'authentification maison (délégué à Supabase)
- Authentification 2FA (Phase 3)
- Login par numéro de téléphone / SMS
- Gestion des rôles (spot_manager, organisateur) dans ce flux — géré séparément
- Rédaction du contenu juridique des CGU/politique de confidentialité (hors périmètre technique — à produire par ailleurs)
- Délai de conservation légal précis des données après suppression (à trancher avec un conseil juridique, voir Open Questions)

## Decisions

**Supabase Auth plutôt qu'un serveur JWT maison**
→ Supabase émet des access tokens JWT (expiry configuré à 15 min) et gère la rotation automatique des refresh tokens, ainsi que leur révocation. On ne construit ni n'héberge d'endpoints d'auth. Conséquence : les tables `users` et `refresh_tokens` maison sont supprimées ; les comptes vivent dans `auth.users` (géré par Supabase).

**Profil applicatif séparé des comptes**
→ Une table `public.profiles` (`id` = FK vers `auth.users.id`, `first_name`, `last_name`, `terms_accepted_at`, `terms_version`, confirmation d'âge, `created_at`) porte les données applicatives. Un trigger `on auth.users insert` crée la ligne `profiles` à partir des métadonnées passées à l'inscription. RLS : un rider ne peut lire/modifier que son propre profil.

**Durées de session**
→ Access token JWT : 15 min (config `JWT expiry` du projet). Refresh token : rotatif à chaque usage ; la session expire après ~30 j (inactivity timeout / time-box côté Supabase).

**Confirmation email non bloquante au MVP**
→ La confirmation d'email n'empêche pas l'accès à l'app au MVP (réglage « Confirm email » désactivé, ou email envoyé sans blocage). À durcir en Phase ultérieure si besoin.

**Google, Facebook, TikTok, email — et Apple en plus sur iOS**
→ Le produit veut proposer Google, Facebook, TikTok et email. Apple n'était pas dans la demande mais reste nécessaire : l'App Store impose Apple Sign-In dès qu'une app iOS propose un autre service de connexion tiers. Il est donc affiché sur iOS en plus des quatre autres.
→ Mécanique Supabase : Google, Facebook et Apple sont des providers **natifs** Supabase (côté Expo, flux natifs renvoyant un `id_token` échangé via `supabase.auth.signInWithIdToken`). **TikTok n'a pas de provider natif Supabase** : il faut le brancher comme **provider OIDC custom** (TikTok Login Kit) — surcoût d'intégration à prévoir.

**Un écran d'accueil unique, sans distinction inscription / connexion**
→ Les boutons Google, Facebook, TikTok, Apple font à la fois inscription et connexion (compte créé au premier passage, retrouvé ensuite). L'email passe par un formulaire dédié. Le message de bienvenue est volontairement court : une phrase, pas de carrousel, pour tenir l'objectif « moins de 3 étapes ».

**Email manquant chez Facebook / TikTok**
→ TikTok ne fournit pas d'email par défaut, Facebook peut ne pas en fournir. On le demande au rider et on le confirme par un lien avant de finaliser le compte : l'email sert à la récupération de compte et à l'envoi de l'export de données (voir account-privacy) — l'envoyer à une adresse non confirmée serait un risque de fuite.

**Géolocalisation proposée, non-bloquante**
→ Avant la demande système, un écran d'explication dit à quoi sert la position (centrer la carte, afficher ce qui est autour, trier par distance), que c'est facultatif, et qu'elle n'est jamais visible des autres riders. Deux choix : « Activer la position » ou « Plus tard ». Si refusée, le rider accède quand même à l'app via un **champ de recherche de lieu (autocomplete)** où il saisit sa ville/région. Un consentement libre ne peut pas être conditionné à l'accès à l'app — d'où le refus non bloquant. Un nudge dans les paramètres invite à l'activer plus tard.

**Champs minimaux à l'inscription**
→ Nom, prénom, email, mdp. **Pas de date de naissance**, pas de téléphone — friction minimale et minimisation des données RGPD. L'âge est confirmé par une simple case « J'ai 16 ans ou plus » pour tous les modes d'inscription, y compris les connexions tierces qui ne transmettent aucune date de naissance. Le profil complet (discipline, niveau, machine) est renseigné à l'étape suivante (onboarding profil).

**Âge minimum : 16 ans, déclaratif**
→ 16 ans est le seuil par défaut du RGPD pour consentir seul au traitement de ses données ; 16 évite d'avoir à gérer une règle par pays tout en restant valable partout. Aucune vérification d'identité au MVP — la case est déclarative. À valider avec un conseil juridique.

**Consentement RGPD à l'inscription**
→ Case à cocher non pré-cochée "J'accepte les CGU et la politique de confidentialité" (liens vers les documents), obligatoire pour créer un compte. `profiles.terms_accepted_at` et `profiles.terms_version` horodatent l'acceptation. Si les CGU changent de version, le rider doit re-consentir à sa prochaine connexion.

**Stockage de session côté mobile**
→ `supabase-js` configuré avec un adaptateur de stockage sur `expo-secure-store` (Keychain iOS / Keystore Android), jamais en AsyncStorage non chiffré. Note : SecureStore limite chaque valeur à ~2 Ko ; prévoir un adaptateur qui découpe la session si nécessaire. Auto-refresh de l'access token assuré par le SDK.

**Suppression de compte avec anonymisation en cascade**
→ Accessible depuis les réglages, avec confirmation explicite. Les données identifiantes (nom, email, mot de passe, photos, bio) sont supprimées immédiatement. Ce qui implique d'autres riders est conservé mais réattribué à un compte anonymisé "Utilisateur supprimé" : messages, avis (voir reviews-core). Un spot/magasin dont le gestionnaire supprime son compte devient orphelin, réaffectable par le super admin (même logique que spot-core).

**Export des données — fichier téléchargeable, pas temps réel**
→ Le rider déclenche une demande depuis les réglages ; le système compile un fichier (profil, disciplines, matériel, spots/events créés, messages) et envoie un lien de téléchargement par email. Traitement asynchrone — cohérent avec l'obligation de répondre "dans un délai raisonnable".

## Risks / Trade-offs

- [Apple Sign-In] Révocation de token → honorer la révocation Apple (webhook / tâche) pour invalider la session côté Supabase ; à préciser au solutioning.
- [Facebook / TikTok] Chaque fournisseur exige de déclarer l'app et de passer une validation (Meta app review, TikTok Login Kit) avant ouverture au public → à lancer tôt, délai hors de notre contrôle ; en attendant, Google + Apple + email suffisent à ouvrir.
- [TikTok sur Supabase] Pas de provider natif → provider OIDC custom à configurer et maintenir ; surcoût d'intégration.
- [Dépendance à un tiers] Un fournisseur qui ferme ou change ses règles coupe l'accès de ses utilisateurs → l'email reste toujours disponible ; un rider connecté via un tiers peut ajouter un mot de passe plus tard (voir Open Questions).
- [Géolocalisation refusée] Expérience dégradée → champ de recherche autocomplete pour saisir la zone, nudge dans les paramètres.
- [Session volée] → rotation automatique des refresh tokens (Supabase) + stockage `expo-secure-store`.
- [Limite SecureStore ~2 Ko] → adaptateur de stockage découpant la session Supabase, sinon échec silencieux de persistance.
- [Suppression irréversible] Un rider supprime son compte par erreur → confirmation explicite obligatoire, pas de récupération au MVP.
- [Anonymisation incomplète] Du contenu personnel pourrait fuiter dans des champs texte libres → hors contrôle automatique, à couvrir par la politique de confidentialité.
- [Lock-in Supabase Auth] → atténué : la donnée de profil est du Postgres standard ; une sortie imposerait de re-plateformer l'auth (problème de grande échelle).

## Open Questions

- ~~Durée access token : 15 min ou 1h ?~~ → **Résolu : 15 min** (ADR-0001)
- ~~Durée refresh token : 30 jours ou 90 jours ?~~ → **Résolu : ~30 jours** (inactivity timeout Supabase)
- ~~Faut-il vérifier l'email avant d'accéder à l'app au MVP ?~~ → **Résolu : non bloquant**
- ~~Collecte de la date de naissance ?~~ → **Résolu : non** (case déclarative « 16 ans ou plus »)
- ~~Géolocalisation bloquante si refusée ?~~ → **Résolu : non-bloquante** (recherche manuelle de lieu en secours)
- Délai de conservation légal exact des données après suppression (facturation, litiges) — à valider avec un conseil juridique.
- Faut-il un délai de grâce avant suppression définitive (ex : 30 jours) ou une suppression immédiate ?
- Un rider inscrit via TikTok/Facebook peut-il rattacher plus tard un autre mode de connexion au même compte ?
- Un même email utilisé avec Google puis Facebook crée-t-il deux comptes ou un seul ? Proposition : un seul, rattaché par email confirmé — à valider.
