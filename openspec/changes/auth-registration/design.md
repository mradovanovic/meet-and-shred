## Context

Application mobile multi-disciplines (MX, DH, Enduro, Kite, Piste, etc.). L'auth est la porte d'entrée de toute l'expérience. La géolocalisation est demandée mais non bloquante — sans elle, la carte fonctionne en mode recherche par lieu (voir map-core). Stack non encore choisie, mais l'auth doit être agnostique (JWT standard).

## Goals / Non-Goals

**Goals:**
- Inscription en moins de 3 étapes sur mobile
- Support email/mdp + Google + Apple
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

**Google + Apple SSO obligatoires dès le MVP**
→ Apple exige son propre SSO si Google est présent sur iOS (règle App Store). Les deux sont requis dès le MVP pour la publication iOS. Google seul suffit pour Android/web.

**Géolocalisation proposée, non-bloquante**
→ Demandée à la fin de l'onboarding avec explication ("Pour voir les terrains et events autour de toi"). Si refusée, le rider accède à l'app avec un champ de recherche par lieu (autocomplete) à la place de la détection automatique — il saisit sa ville ou région manuellement. La solution d'autocomplete (Google Places, autre) sera définie au solutioning. Un nudge dans les paramètres invite à activer la géolocalisation ultérieurement.

**Champs minimaux à l'inscription**
→ Nom, prénom, email, mdp. Pas de date de naissance, pas de téléphone — friction minimale. Le profil complet (discipline, niveau, machine) est renseigné à l'étape suivante (onboarding profil).

**Consentement RGPD à l'inscription**
→ Case à cocher non pré-cochée "J'accepte les CGU et la politique de confidentialité" (liens vers les documents), obligatoire pour créer un compte. `users.terms_accepted_at` et `users.terms_version` horodatent l'acceptation. Si les CGU changent de version, le rider doit re-consentir à sa prochaine connexion, avant de continuer.

**Suppression de compte avec anonymisation en cascade**
→ Accessible depuis les réglages, avec confirmation explicite (pas de suppression accidentelle en un tap). Les données identifiantes (nom, email, mot de passe, photos, bio) sont supprimées immédiatement. Ce qui implique d'autres riders est conservé mais réattribué à un compte anonymisé générique "Utilisateur supprimé" : messages déjà envoyés, avis publiés (voir reviews-core). Un spot ou magasin dont le gestionnaire supprime son compte devient orphelin, réaffectable par le super admin — même logique que les spots orphelins déjà prévue dans spot-core.

**Export des données — fichier téléchargeable, pas temps réel**
→ Le rider déclenche une demande depuis les réglages ; le système compile un fichier (profil, disciplines, matériel, spots/events créés, messages envoyés) et envoie un lien de téléchargement par email. Traitement asynchrone plutôt qu'instantané — cohérent avec l'obligation légale de répondre "dans un délai raisonnable", pas nécessairement en direct.

## Risks / Trade-offs

- [Apple Sign-In] Revoke token complexe → Gérer le webhook `apple-revoke` pour invalidation côté serveur
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
