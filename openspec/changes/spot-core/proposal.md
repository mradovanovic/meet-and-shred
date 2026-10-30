## Why

Les spots sont l'entité centrale de MeetNShred. Un rider a besoin de savoir en temps réel si un spot est rideable autour de lui — qu'il soit motard, VTTiste, kiteur ou wakeboarder. Les gestionnaires ont besoin de mettre à jour le statut de leur spot en quelques secondes depuis leur téléphone.

## What Changes

- Entité "Spot" — terme générique couvrant tous les types de lieux de ride (terrain MX, bike park, spot kite, cable park, station ski, skatepark...)
- Un spot est **privé** (établissement associatif ou commercial, avec gestionnaire, tarifs, statut piloté) ou **public** (lieu gratuit sans gestionnaire, ex : une vague, un spot d'enduro en pleine nature)
- Un spot peut couvrir plusieurs disciplines (ex : bike park DH + Enduro VTT + Dirt Jump)
- Statuts spécifiques par discipline, définis dans des fichiers de config (pas en base), labels multilingues FR/EN/ES — s'appliquent aux spots privés uniquement
- Création d'un spot privé réservée aux utilisateurs avec le rôle gestionnaire, validée par le super admin. Un spot public (libre, gratuit) peut être créé par n'importe quel rider **immédiatement, sans validation**, avec des garde-fous (suggestion de doublons à moins de 200 m, limite de créations, masquage a posteriori) ; son vrai gestionnaire peut le revendiquer
- Le rider voit « Gratuit » ou un prix, jamais « privé » / « public »
- Page publique du spot avec infos, photos, disciplines couvertes, statut temps réel (privé) ou activité via les sessions (public), capacité et tarifs (privé uniquement)
- Inscriptions à une session avec gestion de capacité et lien paiement externe (spots privés) — les sorties spontanées, sur spot privé ou public, passent par les sessions (voir sessions-core)

## Capabilities

### New Capabilities
- `spot-page`: Page publique d'un spot — nom, catégorie (privé/public), description, photos, GPS, disciplines, statut temps réel (privé), tarifs, capacité
- `spot-status`: Statuts configurables par discipline via fichiers de config, labels multilingues (i18n-core), mise à jour en temps réel — spots privés uniquement
- `spot-inscriptions`: Inscription rider à une session payante gérée par le gestionnaire, capacité atomique, fermeture automatique, lien paiement externe — spots privés uniquement

### Modified Capabilities
<!-- aucune -->

## Impact

- Tables `spots` (avec `category` : private/public), `spot_disciplines`, `spot_photos`, `spot_inscriptions`
- Fichiers de config `configs/spot-statuses/{discipline-slug}.json` (spots privés uniquement)
- Rôle gestionnaire requis pour créer un spot privé ; un spot public ne requiert ni rôle ni validation
- Dépend de `i18n-core` pour la localisation des statuts et labels
- Notifications push sur ouverture (voir notifications-push) — spots privés uniquement, un spot public n'a pas de statut à faire évoluer
- Index géospatial pour tri par proximité (voir map-core)
- Dépend de `sessions-core` pour les sorties spontanées entre riders, sur spot privé comme public
