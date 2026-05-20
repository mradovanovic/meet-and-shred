## Why

Les spots sont l'entité centrale de MeetNShred. Un rider a besoin de savoir en temps réel si un spot est rideable autour de lui — qu'il soit motard, VTTiste, kiteur ou wakeboarder. Les gestionnaires ont besoin de mettre à jour le statut de leur spot en quelques secondes depuis leur téléphone.

## What Changes

- Entité "Spot" — terme générique couvrant tous les types de lieux de ride (terrain MX, bike park, spot kite, cable park, station ski, skatepark...)
- Un spot peut couvrir plusieurs disciplines (ex : bike park DH + Enduro VTT + Dirt Jump)
- Statuts spécifiques par discipline, définis dans des fichiers de config (pas en base), labels multilingues FR/EN/ES
- Création de spot réservée aux utilisateurs avec un rôle spécifique (gestionnaire validé — nom du rôle TBD)
- Page publique du spot avec infos, photos, disciplines couvertes, statut temps réel, capacité, tarifs
- Inscriptions à une session avec gestion de capacité et lien paiement externe

## Capabilities

### New Capabilities
- `spot-page`: Page publique d'un spot — nom, description, photos, GPS, disciplines, statut temps réel, tarifs, capacité
- `spot-status`: Statuts configurables par discipline via fichiers de config, labels multilingues (i18n-core), mise à jour en temps réel
- `spot-inscriptions`: Inscription rider à une session, gestion capacité atomique, fermeture automatique, lien paiement externe

### Modified Capabilities
<!-- aucune -->

## Impact

- Tables `spots`, `spot_disciplines`, `spot_photos`, `spot_inscriptions`
- Fichiers de config `configs/spot-statuses/{discipline-slug}.json`
- Rôle utilisateur requis pour créer un spot (TBD)
- Dépend de `i18n-core` pour la localisation des statuts et labels
- Notifications push sur ouverture (voir notifications-push)
- Index géospatial pour tri par proximité (voir map-core)
