## Context

MeetNShred distingue désormais deux niveaux d'organisation autour d'un spot :
- Un **event** (voir events-core) est créé par un rôle habilité (gestionnaire de spot, organisateur, gestionnaire de magasin) — c'est plus formel, parfois payant, parfois à capacité limitée.
- Une **session** (ce change) est créée par n'importe quel rider — c'est une simple annonce "je vais rider [spot] à telle heure, qui vient ?", sans validation ni capacité ni paiement.

Une session peut avoir lieu sur un spot privé (ex : un terrain MX un samedi) ou public (ex : une vague, une session skate place de l'église). Sur un spot privé qui exige une inscription payante, la session ne remplace pas cette inscription — les deux mécanismes coexistent (voir spot-core, spot-inscriptions).

## Goals / Non-Goals

**Goals:**
- N'importe quel rider connecté peut créer une session liée à un spot existant (privé ou public)
- N'importe quel rider peut rejoindre ou quitter une session librement
- Pas de capacité, pas de paiement, pas de validation — mécanisme volontairement léger
- Visible sur la carte dans la fenêtre de 2 semaines, avec la distinction "en cours" / "à venir" déjà utilisée pour les events
- Fil de sessions swipable, sur le même principe que le fil d'events (voir navigation-core pour son intégration dans l'app)
- Le créateur peut annuler sa session explicitement, avec notification aux participants

**Non-Goals:**
- Capacité ou limite de participants sur une session
- Paiement lié à une session
- Notifications automatiques de création de session (voir Open Questions — cohérent avec le système existant mais pas confirmé)
- Créer un spot à la volée depuis une session : la session s'appuie toujours sur un spot déjà existant (privé ou public, déjà validé)

## Decisions

**Session ≠ event**
→ Une session ne passe par aucun rôle ni validation. Contrairement à l'ancien type d'event `social_ride` qu'elle remplace, une session est toujours liée à un spot existant (pas de point de départ libre en lat/lng) — elle a besoin d'un lieu déjà référencé sur MeetNShred.

**Session ≠ inscription formelle d'un spot privé**
→ Sur un spot privé, l'inscription payante gérée par le gestionnaire (capacité, tarifs, paiement — voir spot-inscriptions) reste un mécanisme séparé. Rejoindre une session est purement social : ça n'inclut ni réservation de place, ni paiement. L'écran de session rappelle explicitement cette distinction pour éviter la confusion ("Rejoindre = coordination entre riders ; pense à réserver ta place sur le spot si besoin").

**Pas de capacité ni paiement**
→ Choix volontairement minimaliste : une session sert à coordonner, pas à réserver. Personne n'est refusé.

**Toujours liée à un spot**
→ `sessions.spot_id` non nullable. Un rider ne peut pas créer une session "dans le vide" — s'il veut rider un endroit qui n'existe pas encore sur la carte, il doit d'abord soumettre ce spot (comme spot public, voir spot-core) avant de pouvoir y créer une session.

**Affichage carte**
→ Marqueur distinct des spots, events et magasins, même fenêtre de 2 semaines et même logique active/à venir que les events (voir map-core).

**Fil de sessions, filtré via les disciplines du spot lié**
→ Pas de champ discipline propre à la session : le filtrage par discipline/distance du fil de sessions se base sur les disciplines du spot lié (`spot_disciplines`, voir spot-core), comme la carte le fait déjà pour les marqueurs sessions. Le fil de sessions vit dans le même écran "Fil" que le fil d'events, avec un toggle pour basculer entre les deux (voir navigation-core) — pas un onglet séparé dans la navigation principale.

**Pas de champ "heure de fin" saisi par le créateur**
→ Pour garder la création aussi rapide qu'un event social ride, le rider ne saisit qu'une heure de début (`starts_at`), pas d'heure de fin. Une session est considérée "en cours" entre `starts_at` et `starts_at + 3h` (durée par défaut fixe), "à venir" avant, et sort de la carte après. Ce n'est qu'un calcul d'affichage, pas une contrainte sur la session elle-même — elle reste rejoignable au-delà si sa page est consultée directement.

**Annulation explicite plutôt que disparition silencieuse**
→ Une session a un `status` (`active` / `cancelled`). Le créateur peut l'annuler à tout moment tant qu'elle est encore visible (dans la fenêtre de 2 semaines) ; ses participants sont notifiés (nouveau trigger dans notifications-push). Ça évite qu'un rider arrive sur place pour rien parce que le créateur a changé d'avis sans prévenir — l'ancienne approche ("elle disparaît juste après sa fenêtre") ne couvrait pas ce cas, seulement l'oubli passif.

## Risks / Trade-offs

- [Confusion session / inscription payante] Un rider pourrait croire que rejoindre une session sur un spot privé suffit à réserver sa place → message explicite sur l'écran de session
- [Spam de sessions] Pas de limite de création côté produit → rate limiting basique + signalement communautaire, cohérent avec ce qui existe pour les events
- [Annulation tardive] Un créateur annule au dernier moment → la notification est immédiate, mais rien n'empêche une annulation la minute précédant le début

## Open Questions

- Faut-il notifier les followers d'un rider quand il crée une session, par symétrie avec la notification "rider suivi crée un event" (voir notifications-push) ?
- Faut-il journaliser "a créé une session" / "a rejoint une session" dans le fil d'activité (voir rider-social, activity-feed) ?
- Faut-il une capacité optionnelle en Phase 2 pour les sessions très populaires (ex : rassemblement improvisé qui explose) ?
