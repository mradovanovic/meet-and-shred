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
| Auth | JWT stateless + refresh token, Google OAuth 2.0, Apple Sign-In |
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
| `auth-registration` | Specs complètes | Inscription email/mdp + Google + Apple SSO, JWT, géolocalisation onboarding |
| `rider-profile` | Specs complètes | Profil, disciplines, fiches matériel JSONB, upload photos |
| `spot-core` | Specs complètes | Entité spot multi-disciplines, statuts en config, inscriptions, paiement externe |
| `events-core` | Specs complètes | Events, swipe, feed filtré par discipline et distance |
| `map-core` | Specs complètes | Carte Google Maps principale, marqueurs, filtres |
| `i18n-core` | Specs complètes | FR/EN/ES, préférence utilisateur, middleware langue |
| `notifications-push` | Specs complètes | FCM + APNs, tokens push, 4 types de notifications, suivi spot/rider |
| `backoffice-spot` | Non démarré | Interface gestionnaire de spot |
| `shop-core` | Specs complètes | Fiche magasin (vélo, moto, kite...), marques, horaires, events magasin, carte |

---

## Phases produit

- **MVP** : Tout ce qui est dans les changes ci-dessus
- **Phase 2** : Calendrier d'ouvertures récurrentes, préférences notifications, feed activité profil
- **Phase 3** : Paiement natif intégré, 2FA, messagerie gestionnaire↔rider

---

## Documentation source

- `documentation/MeetNShred 2026-Cahier-des-charges.docx` — cahier des charges initial (format Word, non lisible directement par Claude)
- `documentation/Old version/` — anciens fichiers de la V1 (contexte historique uniquement)
- `openspec/changes/*/design.md` — source de vérité pour les décisions d'architecture par change
