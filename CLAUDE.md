# MeetNShred — Guide pour Claude

## Vision

MeetNShred est une plateforme communautaire **multi-disciplines de ride**. L'objectif : connecter les riders entre eux, en temps réel, autour des spots et des events.

L'écran central est une **carte Google Maps** qui affiche ce qui se passe autour du rider : spots rideable, events en cours, sessions à venir. Le **swipe sur les events** est la fonctionnalité différenciante — rejoindre une session en un geste, sans friction.

Les disciplines couvertes (liste ouverte, non exhaustive) : MX, DH, Enduro moto/VTT, Supermoto, Freeride, FMX, Moto piste/circuit, Kite, Wakeboard (boat et cable), Skateboard, Ski/Snow, DirtJump.

**Principe fondamental** : Les disciplines ne sont jamais un enum hardcodé. Elles sont une table dédiée extensible. Toute architecture qui hardcode MX/DH est une erreur.

Langue de travail du projet : **français**. Specs, commits, discussions — tout est en français.

---

## Stack technique

| Couche | Choix |
|---|---|
| Mobile | React Native Expo (iOS + Android) |
| Auth | JWT stateless + refresh token, email, Google OAuth 2.0, Facebook, TikTok, Apple Sign-In |
| API | REST (stack backend non finalisée — voir open questions dans les designs) |
| Base de données | PostgreSQL (JSONB utilisé pour les schémas matériel et configs) |
| Stockage photos | S3 ou Cloudflare R2 (URLs en base, fichiers en object storage) |
| Cartes | Google Maps API |
| Push notifications | FCM (Android) + APNs (iOS) |
| i18n | i18next (mobile), langues : FR (défaut), EN, ES |

---

## Architecture — principes clés

**Disciplines**
- Table `disciplines` avec `equipment_schema JSONB` — jamais un enum
- Un spot peut couvrir N disciplines (`spot_disciplines`)
- Un rider peut pratiquer N disciplines (`rider_disciplines`)
- Ajouter une discipline = insérer une ligne, pas modifier le code

**Statuts de spot**
- Définis dans des fichiers de config JSON : `configs/spot-statuses/{discipline-slug}.json`
- Chaque statut : `slug`, `color`, `label { fr, en, es }`, `visible_on_map`
- Pas en base. Pas de migration pour ajouter un statut.
- Fallback sur statuts génériques (open/closed) si config absente pour une discipline

**i18n**
- Toutes les données statiques (disciplines, statuts, types d'events) stockent leurs labels en objet multilingue `{ fr, en, es }`
- Le contenu utilisateur (bios, descriptions, noms de spots) n'est PAS traduit automatiquement au MVP

**Rôles utilisateurs**
- `rider` — compte standard
- `spot_manager` (nom TBD) — peut créer et gérer des spots (attribué par super admin)
- `organisateur` — peut créer des sessions organisées sur les events
- `super_admin` — validation manuelle des spots, attribution des rôles

**Photos**
- Profil rider : max 5, la première est la photo principale
- Setup matériel : max 3 par fiche, la première est la cover
- Limite : 5 MB par photo, compression côté serveur avant stockage

---

## Workflow de développement — OpenSpec

Ce projet utilise **OpenSpec** pour la spec-driven development. Toute nouvelle fonctionnalité passe par ce workflow :

```
/opsx:propose  →  /opsx:apply  →  /opsx:archive
```

- `/opsx:propose` — décrit ce qu'on veut construire, génère proposal + design + tasks
- `/opsx:apply` — implémente les tasks d'un change existant
- `/opsx:explore` — mode exploration/réflexion avant de proposer
- `/opsx:archive` — finalise un change implémenté

Les changes sont dans `openspec/changes/<nom>/`. Chaque change contient :
- `proposal.md` — le pourquoi et le quoi
- `design.md` — les décisions d'architecture
- `tasks.md` — les étapes d'implémentation
- `specs/<capability>/spec.md` — les specs détaillées par capability

**Ne pas implémenter directement sans passer par un change OpenSpec.**

---

## Changes en cours (MVP)

| Change | Statut | Description |
|---|---|---|
| `auth-registration` | Specs complètes | Écran d'accueil + message de bienvenue, connexion email/Google/Facebook/TikTok (+ Apple sur iOS), JWT, géolocalisation onboarding (non bloquante, expliquée), RGPD (consentement, âge 16 ans, suppression, export) |
| `rider-profile` | Specs complètes | Profil, disciplines, fiches matériel JSONB, upload photos |
| `spot-core` | Specs complètes | Entité spot multi-disciplines, privé (établissement) ou public (gratuit), statuts en config, inscriptions, paiement externe |
| `events-core` | Specs complètes | Events (spot_opening, track_day, competition, shop_event — tous réservés à un rôle), swipe, feed filtré |
| `sessions-core` | Specs complètes | Sessions de ride créées librement par un rider, liées à un spot privé ou public, rejoignables par d'autres riders, fil swipable |
| `navigation-core` | Specs complètes | Barre de navigation (Carte/Fil/Créer/Messages/Profil), fil combiné events+sessions, hub de création par rôle |
| `map-core` | Specs complètes | Carte Google Maps principale, marqueurs spots/events/sessions/magasins, filtres |
| `i18n-core` | Specs complètes | FR/EN/ES, préférence utilisateur, middleware langue |
| `notifications-push` | Specs complètes | FCM + APNs, tokens push, 7 types de notifications (dont rappel 30 min), suivi spot, préférences par type |
| `backoffice-spot` | Non démarré | Interface gestionnaire de spot |
| `rider-social` | Specs complètes | Suivi libre entre riders, fil d'activité, messagerie directe (DM texte 1:1) |
| `shop-core` | Specs complètes | Fiche magasin (vélo, moto, kite...), marques, horaires, events magasin, carte, stats, partage |
| `reviews-core` | Specs complètes | Avis (note + commentaire) sur spots, magasins, events, avec preuve de participation pour spot/event |
| `moderation-core` | Specs complètes | Signalement de spot/magasin/event/avis, file de modération super admin |

---

## Phases produit

- **MVP** : Tout ce qui est dans les changes ci-dessus (le fil d'activité, initialement prévu en Phase 2, est avancé au MVP via `rider-social`)
- **Phase 2** : Calendrier d'ouvertures récurrentes
- **Phase 3** : Paiement natif intégré, 2FA, messagerie gestionnaire↔rider

---

## Documentation source

- `documentation/MeetNShred 2026-Cahier-des-charges.docx` — cahier des charges initial (format Word, non lisible directement par Claude)
- `documentation/Old version/` — anciens fichiers de la V1 (contexte historique uniquement)
- `openspec/changes/*/design.md` — source de vérité pour les décisions d'architecture par change
