## Why

Un rider qui découvre un spot, un magasin ou un event via la carte n'a aucun moyen de savoir si d'autres riders l'ont trouvé fiable. Dans une communauté où on rejoint des inconnus et où le paiement passe par un lien externe, la confiance est déterminante — un système d'avis, même simple, comble un vrai manque.

## What Changes

- Un rider peut publier un avis (note de 1 à 5 + commentaire facultatif) sur un spot, un magasin, ou un event
- Sur un spot ou un event, l'avis exige une preuve de participation (inscription ou session rejointe) — pas d'avis sans y être allé
- Sur un magasin, l'avis reste ouvert à tout rider connecté, faute de mécanisme de "check-in" au MVP (limite assumée, voir design.md)
- Note moyenne et nombre d'avis affichés sur la fiche du spot, du magasin, de l'event
- Un rider peut modifier ou supprimer son propre avis
- Un avis peut être signalé (voir moderation-core)

## Capabilities

### New Capabilities
- `reviews-core`: Publication, consultation, modification, suppression d'avis sur un spot, un magasin ou un event ; note moyenne agrégée

### Modified Capabilities
- `spot-core`, `shop-core`, `events-core`: la fiche affiche désormais une note moyenne et un nombre d'avis

## Impact

- Table `reviews` (rider_id, spot_id nullable, shop_id nullable, event_id nullable, rating, comment, created_at) — un avis cible exactement une des trois entités, jamais plusieurs
- Dépend de `spot-core` (inscriptions), `sessions-core` (participation) et `events-core` (inscriptions) pour vérifier la preuve de participation
- Dépend de `moderation-core` pour le signalement d'un avis
- Asymétrie assumée entre spots/events (preuve de participation exigée) et magasins (ouvert à tous) — voir design.md, Open Questions
