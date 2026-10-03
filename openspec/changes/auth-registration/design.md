## Context

Application mobile multi-disciplines (MX, DH, Enduro, Kite, Piste, etc.). L'auth est la porte d'entrée de toute l'expérience. La géolocalisation est demandée mais non bloquante — sans elle, la carte fonctionne en mode recherche par lieu (voir map-core). Stack non encore choisie, mais l'auth doit être agnostique (JWT standard).

## Goals / Non-Goals

**Goals:**
- Inscription en moins de 3 étapes sur mobile
- Écran d'accueil avec message de bienvenue et choix du mode de connexion
- Support email/mdp + Google + Facebook + TikTok + Apple
- JWT access token (courte durée) + refresh token (longue durée)
- Demande permission géolocalisation dans le flux d'onboarding, non bloquante
- Stockage sécurisé du refresh token côté mobile
- Consentement explicite aux CGU/politique de confidentialité, horodaté et versionné
- Suppression de compte et export des données personnelles, accessibles depuis les réglages

**Non-Goals:**
- Authentification 2FA (Phase 3)
- Login par numéro de téléphone / SMS
- Gestion des rôles terrain/shop dans ce flux (géré séparément dans back-office)
- Rédaction du contenu juridique des CGU/politique de confidentialité (hors périmètre technique — à produire par ailleurs)
- Délai de conservation légal précis des données après suppression (à trancher avec un conseil juridique, voir Open Questions)

## Decisions

**JWT stateless vs sessions serveur**
→ JWT stateless. Adapté mobile, scalable sans état serveur, standard dans les API REST mobiles. Refresh token stocké côté serveur pour permettre la révocation.

**Google, Facebook, TikTok, email — et Apple en plus sur iOS**
→ Le produit veut proposer Google, Facebook, TikTok et email. Apple n'était pas dans la demande mais reste nécessaire : l'App Store impose Apple Sign-In dès qu'une app iOS propose un autre service de connexion tiers. Il est donc affiché sur iOS en plus des quatre autres. Sans lui, la publication iOS serait refusée.

**Un écran d'accueil unique, sans distinction inscription / connexion**
→ Les boutons Google, Facebook, TikTok, Apple font à la fois inscription et connexion (compte créé au premier passage, retrouvé ensuite). L'email passe par un formulaire dédié (inscription ou connexion). Le message de bienvenue est volontairement court : une phrase, pas de carrousel de présentation, pour tenir l'objectif « moins de 3 étapes ».

**Email manquant chez Facebook / TikTok**
→ TikTok ne fournit pas d'email par défaut, Facebook peut ne pas en fournir (compte créé avec un numéro). On le demande au rider et on le confirme par un lien avant de finaliser le compte : l'email sert à la récupération de compte et à l'envoi de l'export de données (voir account-privacy) — l'envoyer à une adresse non confirmée serait un risque de fuite.

**Géolocalisation proposée, non-bloquante**
→ Demandée à la fin de l'onboarding avec explication ("Pour voir les terrains et events autour de toi"). Si refusée, le rider accède à l'app avec un champ de recherche par lieu (autocomplete) à la place de la détection automatique — il saisit sa ville ou région manuellement. La solution d'autocomplete (Google Places, autre) sera définie au solutioning. Un nudge dans les paramètres invite à activer la géolocalisation ultérieurement.

**Champs minimaux à l'inscription**
→ Nom, prénom, email, mdp. Pas de date de naissance, pas de téléphone — friction minimale (la spec et les tasks demandaient encore une date de naissance : retirée ici pour être cohérent, et par minimisation des données RGPD). L'âge est confirmé par une simple case à cocher « J'ai 16 ans ou plus » pour tous les modes d'inscription, y compris les connexions tierces qui ne transmettent aucune date de naissance. Le profil complet (discipline, niveau, machine) est renseigné à l'étape suivante (onboarding profil).

**Âge minimum : 16 ans, déclaratif**
→ 16 ans est le seuil par défaut du RGPD pour consentir seul au traitement de ses données ; les États peuvent l'abaisser (15 en France, 14 en Espagne), mais 16 évite d'avoir à gérer une règle par pays tout en restant valable partout. Aucune vérification d'identité au MVP — la case est déclarative. À valider avec un conseil juridique.

**Géolocalisation : un écran d'explication, jamais un mur**
→ Avant la demande système, un écran dit à quoi sert la position (centrer la carte, afficher ce qui est autour, trier par distance), que c'est facultatif, et qu'elle n'est jamais visible des autres riders. Deux choix : « Activer la position » ou « Plus tard ». Utilisée uniquement quand l'app est au premier plan. Un consentement libre ne peut pas être conditionné à l'accès à l'app — d'où le refus non bloquant.

**Consentement RGPD à l'inscription**
→ Case à cocher non pré-cochée "J'accepte les CGU et la politique de confidentialité" (liens vers les documents), obligatoire pour créer un compte. `users.terms_accepted_at` et `users.terms_version` horodatent l'acceptation. Si les CGU changent de version, le rider doit re-consentir à sa prochaine connexion, avant de continuer.

**Suppression de compte avec anonymisation en cascade**
→ Accessible depuis les réglages, avec confirmation explicite (pas de suppression accidentelle en un tap). Les données identifiantes (nom, email, mot de passe, photos, bio) sont supprimées immédiatement. Ce qui implique d'autres riders est conservé mais réattribué à un compte anonymisé générique "Utilisateur supprimé" : messages déjà envoyés, avis publiés (voir reviews-core). Un spot ou magasin dont le gestionnaire supprime son compte devient orphelin, réaffectable par le super admin — même logique que les spots orphelins déjà prévue dans spot-core.

**Export des données — fichier téléchargeable, pas temps réel**
→ Le rider déclenche une demande depuis les réglages ; le système compile un fichier (profil, disciplines, matériel, spots/events créés, messages envoyés) et envoie un lien de téléchargement par email. Traitement asynchrone plutôt qu'instantané — cohérent avec l'obligation légale de répondre "dans un délai raisonnable", pas nécessairement en direct.

## Risks / Trade-offs

- [Apple Sign-In] Revoke token complexe → Gérer le webhook `apple-revoke` pour invalidation côté serveur
- [Facebook et TikTok] Chaque fournisseur exige de déclarer l'app et de passer une validation (Meta app review, TikTok Login Kit) avant l'ouverture au public → à lancer tôt, le délai est hors de notre contrôle ; en attendant, Google, Apple et email suffisent à ouvrir
- [Dépendance à un tiers] Un fournisseur qui ferme ou change ses règles coupe l'accès de ses utilisateurs → l'email reste toujours disponible, et un rider connecté via un tiers peut ajouter un mot de passe plus tard (voir Open Questions)
- [Géolocalisation refusée] Expérience dégradée → Champ de recherche autocomplete pour saisir la zone manuellement, nudge dans les paramètres
- [Refresh token] Vol de token → Rotation systématique à chaque refresh + stockage dans Keychain (iOS) / Keystore (Android)
- [Suppression irréversible] Un rider supprime son compte par erreur → confirmation explicite obligatoire (retaper un mot ou double confirmation), pas de récupération après coup au MVP
- [Anonymisation incomplète] Du contenu personnel pourrait fuiter dans des champs texte libres (ex : nom cité dans une bio ou une note de session) → hors du contrôle automatique du système, à couvrir par la politique de confidentialité

## Open Questions

- Durée access token : 15 min ou 1h ? (recommandation : 15 min)
- Durée refresh token : 30 jours ou 90 jours ?
- Faut-il vérifier l'email avant d'accéder à l'app (email verification) au MVP ?
- Délai de conservation légal exact des données après suppression de compte (facturation, litiges) — à valider avec un conseil juridique, ce document ne s'y substitue pas
- Faut-il un délai de grâce avant suppression définitive (ex : 30 jours pour annuler) ou une suppression immédiate ?
- Un rider inscrit via TikTok/Facebook peut-il rattacher plus tard un autre mode de connexion (email, Google) au même compte ? Hors périmètre ici, mais utile si un fournisseur disparaît.
- Un même email utilisé avec Google puis Facebook crée-t-il deux comptes ou un seul ? Proposition : un seul, rattaché par email confirmé — à valider.
