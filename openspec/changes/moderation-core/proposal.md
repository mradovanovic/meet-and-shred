## Why

`rider-social` a déjà un mécanisme de signalement, mais uniquement entre riders (un profil, un message). Rien n'existe pour signaler un spot avec des informations fausses, un magasin fermé depuis longtemps, un event douteux, ou un avis publié dans `reviews-core`. Sans ce garde-fou, le seul rempart contre du contenu erroné ou malveillant est la relecture manuelle par le super admin — insuffisant à l'échelle.

## What Changes

- Un rider connecté peut signaler un spot, un magasin, un event, ou un avis, avec un motif
- Les signalements alimentent une file de modération consultable par le super admin
- Le super admin traite chaque signalement avec une action optionnelle : masquer le contenu, le supprimer, avertir l'auteur, ou classer sans suite
- Un seul signalement actif par rider et par cible tant qu'il n'est pas traité
- Distinct du signalement rider-à-rider déjà spécifié dans `rider-social` (capability `rider-safety`), qui reste inchangé

## Capabilities

### New Capabilities
- `moderation-core`: Signalement de contenu (spot, magasin, event, avis), file de modération, actions du super admin

### Modified Capabilities
<!-- aucune -->

## Impact

- Table `content_reports` (reporter_id, spot_id/shop_id/event_id/review_id nullables — exactement un renseigné, reason, status, created_at, reviewed_by, reviewed_at, action_taken)
- Dépend de `spot-core`, `shop-core`, `events-core`, `reviews-core` pour les cibles signalables
- Nouvel écran super admin : file de modération de contenu (distincte de la file de signalements riders déjà prévue dans rider-social)
