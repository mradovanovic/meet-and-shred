## Context

Application mobile multi-disciplines (MX, DH, Enduro, Kite, Piste, etc.). L'auth est la porte d'entrée de toute l'expérience. La géolocalisation est bloquante — sans elle, la carte et les events ne fonctionnent pas. Stack non encore choisie, mais l'auth doit être agnostique (JWT standard).

## Goals / Non-Goals

**Goals:**
- Inscription en moins de 3 étapes sur mobile
- Support email/mdp + Google + Apple
- JWT access token (courte durée) + refresh token (longue durée)
- Demande permission géolocalisation dans le flux d'onboarding
- Stockage sécurisé du refresh token côté mobile

**Non-Goals:**
- Authentification 2FA (Phase 3)
- Login par numéro de téléphone / SMS
- Gestion des rôles terrain/shop dans ce flux (géré séparément dans back-office)

## Decisions

**JWT stateless vs sessions serveur**
→ JWT stateless. Adapté mobile, scalable sans état serveur, standard dans les API REST mobiles. Refresh token stocké côté serveur pour permettre la révocation.

**Google + Apple SSO obligatoires dès le MVP**
→ Apple exige son propre SSO si Google est présent sur iOS (règle App Store). Les deux sont requis dès le MVP pour la publication iOS. Google seul suffit pour Android/web.

**Géolocalisation proposée, non-bloquante**
→ Demandée à la fin de l'onboarding avec explication ("Pour voir les terrains et events autour de toi"). Si refusée, le rider accède à l'app avec un champ de recherche par lieu (autocomplete) à la place de la détection automatique — il saisit sa ville ou région manuellement. La solution d'autocomplete (Google Places, autre) sera définie au solutioning. Un nudge dans les paramètres invite à activer la géolocalisation ultérieurement.

**Champs minimaux à l'inscription**
→ Nom, prénom, email, mdp. Pas de date de naissance, pas de téléphone — friction minimale. Le profil complet (discipline, niveau, machine) est renseigné à l'étape suivante (onboarding profil).

## Risks / Trade-offs

- [Apple Sign-In] Revoke token complexe → Gérer le webhook `apple-revoke` pour invalidation côté serveur
- [Géolocalisation refusée] Expérience dégradée → Champ de recherche autocomplete pour saisir la zone manuellement, nudge dans les paramètres
- [Refresh token] Vol de token → Rotation systématique à chaque refresh + stockage dans Keychain (iOS) / Keystore (Android)

## Open Questions

- Durée access token : 15 min ou 1h ? (recommandation : 15 min)
- Durée refresh token : 30 jours ou 90 jours ?
- Faut-il vérifier l'email avant d'accéder à l'app (email verification) au MVP ?
