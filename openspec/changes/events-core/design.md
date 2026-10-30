## Context

Les events sont au cœur de l'engagement communautaire. Le swipe crée un flux de découverte naturel. MeetNShred couvre des disciplines très différentes — un roulage circuit organisé par un organisme (cf. calendrier-piste.fr) n'a rien à voir avec un social ride improvisé. Les types d'events doivent être aussi flexibles que les disciplines.

## Goals / Non-Goals

**Goals:**
- Types d'events extensibles via config (pas un enum) — super admin peut en ajouter
- Swipe card — action directe, feedback visuel uniquement, pas de confirmation popup
- Vue liste alternative au swipe
- Feed filtré par disciplines du rider + distance
- Capacité optionnelle par event
- Tous les types d'event nécessitent un rôle (gestionnaire de spot, organisateur, ou gestionnaire de magasin) — plus de type créable librement par un simple rider (voir sessions-core pour les sorties spontanées)
- Partage via deep link
- Annulation avec notification automatique

**Non-Goals:**
- Paiement intégré pour les events payants (Phase 3)
- Système de notation / review des events (Phase 3)
- Events récurrents / calendrier (Phase 2)
- Import depuis des calendriers externes comme calendrier-piste.fr (Phase 2)

## Decisions

**Types d'events en config, pas en enum**
→ Table `event_types` ou fichier de config avec les types disponibles. Chaque type a : slug, label multilingue `{ fr, en, es }`, icône, qui peut créer (organisateur / gestionnaire), capacité obligatoire ou optionnelle. Types de base — tous réservés à un rôle, plus aucun créable librement par un simple rider :

| Slug | Label FR | Créateur | Capacité |
|------|----------|----------|----------|
| `spot_event` (+ `bbq`, `ride_day`, `bike_test`) | Event du spot (BBQ, ride day, test vélo…) | Gestionnaire du spot lié | Optionnelle |
| `track_day` | Roulage / Track day | Organisateur | Obligatoire |
| `competition` | Compétition | Organisateur | Obligatoire |
| `shop_event` | Event shop | Gestionnaire du magasin lié | Optionnelle |

L'ancien type `social_ride` (créable par tout rider) est retiré : les sorties spontanées entre riders sont désormais des **sessions**, un concept séparé et plus léger porté par `sessions-core` (pas de rôle requis, pas de capacité, pas de paiement).

**Swipe = action directe**
→ Swipe right = inscription immédiate + animation verte. Pas de popup de confirmation — ça tuerait l'UX. L'annulation reste possible depuis la page de détail ou "Mes events".

**Capacité optionnelle**
→ Le créateur choisit si son event a une limite de participants. Si oui : même logique atomique que les spots (SELECT FOR UPDATE). Si non : inscriptions illimitées.

**Event lié à un spot ou à un magasin**
→ `spot_id` nullable. Un event du spot (`spot_event`, `bbq`, `ride_day`, `bike_test`), un `track_day` ou une `competition` est lié à un spot. Un `shop_event` est lié à un magasin — ce qui exige un second champ `shop_id` nullable sur `events` (absent de la conception initiale, ajouté ici : un event a soit un `spot_id`, soit un `shop_id`, jamais les deux). Sans `social_ride`, il n'y a plus de type avec un point de départ totalement libre — tout event est désormais rattaché à un lieu géré (spot ou magasin).

**Disciplines sur les events**
→ Un event peut couvrir plusieurs disciplines. Liaison N:N avec `disciplines`.

**Chevauchement horaire — avertissement, pas blocage**
→ Un rider ne peut pas physiquement être à deux endroits en même temps, mais un blocage strict risque de générer des faux positifs (ex : deux sessions avec une fenêtre active de 3h qui se recoupent de 10 minutes sans réel conflit). Le système avertit plutôt que d'empêcher : après un swipe, le chevauchement s'ajoute au snackbar "Annuler" déjà existant (même fenêtre de 3 secondes, cohérent avec le principe "swipe = action directe, pas de popup") ; depuis la page de détail (hors swipe), une confirmation explicite s'affiche avant de finaliser. La vérification croise `event_inscriptions` et `session_participants` (voir sessions-core) sur les plages `starts_at`/`ends_at`.

**Première version : tout se rejoint depuis la carte, le swipe arrive en Phase 2 (décision du 2026-10-30)**
→ Dans la première version, il n'y a pas de fil : le rider tape un repère, lit la bottom sheet et appuie sur « Je viens ». Le swipe, le fil et la vue liste restent spécifiés mais marqués Phase 2, sans être supprimés. Le bouton garde ce que le swipe apportait (un tap, annulation sur 3 secondes) et règle un défaut du swipe : sur un event payant ou limité, rejoindre ne vaut pas payer, donc on passe par « Payer sur place / en ligne » avant d'inscrire.

**Types d'events du gestionnaire de spot : BBQ, ride day, test vélo**
→ `spot_opening` (« Ouverture de spot ») est remplacé par un type générique `spot_event` plus `bbq`, `ride_day` et `bike_test`, tous créables par le gestionnaire du spot lié. Ils entrent dans la config extensible des types déjà prévue, donc ajouter un autre type reste une ligne de config. Un gros event sponsorisé (type Red Bull) est un `spot_event` sans capacité imposée.

**Prix d'un event**
→ Prix et devise facultatifs, plus un lien de paiement externe. Sans prix, l'event est gratuit. Le prix alimente la pièce « $ » de la carte et le flux « Payer sur place / en ligne ».

## Risks / Trade-offs

- [Swipe involontaire] Rider swipe accidentellement → Bouton "Annuler" visible 3 secondes post-inscription (snackbar)
- [Events obsolètes] Events passés → Archivage automatique 24h après `ends_at`
- [Roulages payants] Track days avec tarif → Lien paiement externe comme les spots au MVP, natif en Phase 3
- [Retrait de social_ride] Les sessions déjà créées comme `social_ride` avant ce changement (s'il y en avait en prod) devraient être migrées vers `sessions-core` — sans objet au MVP puisque rien n'est encore implémenté
- [Faux positif de chevauchement] Deux engagements proches mais pas réellement incompatibles (ex : deux spots voisins) génèrent quand même un avertissement → assumé, le rider reste juge, l'avertissement n'est jamais bloquant
