## Context

MeetNShred met en relation des riders avec des lieux et des commerces qu'ils ne connaissent pas forcément. Sans signal de confiance, un rider n'a aucun moyen de distinguer un spot bien entretenu d'un spot à l'abandon, ou un magasin sérieux d'un autre. Un système d'avis basique répond à ce manque sans complexité excessive.

## Goals / Non-Goals

**Goals:**
- Avis (note 1-5 + commentaire facultatif) sur un spot, un magasin, ou un event
- Preuve de participation exigée pour un spot ou un event — pas d'avis sur un lieu jamais visité
- Note moyenne et nombre d'avis visibles sur chaque fiche
- Un rider peut modifier ou supprimer son propre avis
- Signalement d'un avis inapproprié (voir moderation-core)

**Non-Goals:**
- Réponse du gestionnaire à un avis (Phase 2 potentielle)
- Avis avec photos (Phase 2 potentielle)
- Modération automatique du contenu des avis (repose sur le signalement manuel)
- Système de "vérifié" / badge de confiance au-delà de la preuve de participation
- Check-in géolocalisé pour prouver une visite en magasin (voir Open Questions)

## Decisions

**Un avis cible une seule entité, jamais deux**
→ Table `reviews` avec `spot_id`, `shop_id`, `event_id` tous nullables, contrainte garantissant qu'exactement un des trois est renseigné. Cohérent avec le même principe déjà utilisé sur `events` (`spot_id`/`shop_id`).

**Preuve de participation pour spot et event, pas pour magasin**
→ Pour un spot : le rider doit avoir une inscription formelle (spot privé, voir spot-inscriptions) OU avoir participé à une session sur ce spot (voir sessions-core) — les deux prouvent une visite. Pour un event : le rider doit avoir une inscription à cet event, ET l'event doit être terminé (`ends_at` dépassé). Pour un magasin : aucune preuve n'est exigée, faute de mécanisme de "check-in" en boutique au MVP — n'importe quel rider connecté peut publier un avis. C'est une asymétrie assumée, pas un oubli (voir Risks).

**Un avis par rider et par cible, modifiable**
→ Contrainte unique (rider_id, spot_id/shop_id/event_id). Un rider qui veut changer d'avis modifie le sien plutôt que d'en cumuler plusieurs.

**Note moyenne calculée à la volée, pas stockée**
→ Évite les problèmes de synchronisation ; recalculée à chaque lecture de la fiche (avec mise en cache si besoin de performance, hors scope produit).

## Risks / Trade-offs

- [Avis magasin non vérifiés] Sans preuve de visite, un magasin pourrait recevoir de faux avis (positifs de complaisance ou négatifs de concurrents) → le signalement (voir moderation-core) reste le seul garde-fou au MVP
- [Avis vindicatifs] Un rider mécontent d'un gestionnaire pourrait laisser un avis non constructif → pas de modération préventive, traitement a posteriori via signalement
- [Avis sur un event annulé] Un event annulé avant d'avoir eu lieu ne devrait pas être notable → seuls les events dont `ends_at` est dépassé ET qui ne sont pas `cancelled` sont notables

## Open Questions

- Faut-il, à terme, un mécanisme de check-in en magasin (ex : QR code en caisse) pour aligner la fiabilité des avis magasin sur celle des spots/events ?
- Faut-il permettre au gestionnaire de répondre publiquement à un avis (Phase 2) ?
- Faut-il un délai minimum après la participation avant de pouvoir laisser un avis (éviter les avis à chaud), ou est-ce contre-productif ?
