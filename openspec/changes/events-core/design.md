## Context

Les events sont au cœur de l'engagement communautaire. Le swipe crée un flux de découverte naturel. MeetNShred couvre des disciplines très différentes — un roulage circuit organisé par un organisme (cf. calendrier-piste.fr) n'a rien à voir avec un social ride improvisé. Les types d'events doivent être aussi flexibles que les disciplines.

## Goals / Non-Goals

**Goals:**
- Types d'events extensibles via config (pas un enum) — super admin peut en ajouter
- Swipe card — action directe, feedback visuel uniquement, pas de confirmation popup
- Vue liste alternative au swipe
- Feed filtré par disciplines du rider + distance
- Capacité optionnelle par event
- Social ride créable par tout rider dès le MVP
- Sessions organisées (roulage, track day, compét) nécessitent un rôle organisateur
- Partage via deep link
- Annulation avec notification automatique

**Non-Goals:**
- Paiement intégré pour les events payants (Phase 3)
- Système de notation / review des events (Phase 3)
- Events récurrents / calendrier (Phase 2)
- Import depuis des calendriers externes comme calendrier-piste.fr (Phase 2)

## Decisions

**Types d'events en config, pas en enum**
→ Table `event_types` ou fichier de config avec les types disponibles. Chaque type a : slug, label multilingue `{ fr, en, es }`, icône, qui peut créer (rider / organisateur / gestionnaire), capacité obligatoire ou optionnelle. Types de base :

| Slug | Label FR | Créateur | Capacité |
|------|----------|----------|----------|
| `spot_opening` | Ouverture spot | Gestionnaire spot | Optionnelle |
| `track_day` | Roulage / Track day | Organisateur | Obligatoire |
| `social_ride` | Social ride | Tout rider | Optionnelle |
| `competition` | Compétition | Organisateur | Obligatoire |
| `shop_event` | Event shop | Gestionnaire shop | Optionnelle |

**Swipe = action directe**
→ Swipe right = inscription immédiate + animation verte. Pas de popup de confirmation — ça tuerait l'UX. L'annulation reste possible depuis la page de détail ou "Mes events".

**Capacité optionnelle**
→ Le créateur choisit si son event a une limite de participants. Si oui : même logique atomique que les spots (SELECT FOR UPDATE). Si non : inscriptions illimitées.

**Event lié ou non à un spot**
→ `spot_id` nullable. Un `spot_opening` ou `track_day` est toujours lié à un spot. Un `social_ride` peut avoir un point de départ libre (lat/lng + adresse libre).

**Disciplines sur les events**
→ Un event peut couvrir plusieurs disciplines. Liaison N:N avec `disciplines`.

## Risks / Trade-offs

- [Swipe involontaire] Rider swipe accidentellement → Bouton "Annuler" visible 3 secondes post-inscription (snackbar)
- [Events obsolètes] Events passés → Archivage automatique 24h après `ends_at`
- [Spam social rides] Riders qui créent des faux events → Rate limiting + signalement communautaire
- [Roulages payants] Track days avec tarif → Lien paiement externe comme les spots au MVP, natif en Phase 3
