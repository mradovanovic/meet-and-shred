## Why

Chaque écran de l'app a été spécifié séparément (carte, fil d'events, profil, messages, back-office...) mais la façon dont un rider circule entre eux n'a jamais été formalisée. Sans structure de navigation claire, l'organisation de l'app serait laissée à l'interprétation au moment du développement — avec le risque d'incohérences entre écrans.

## What Changes

- Barre de navigation principale à 5 destinations : Carte, Fil, Créer, Messages, Profil
- Le "Fil" regroupe events et sessions dans un même écran avec un toggle, plutôt que deux onglets séparés
- Le bouton "Créer" ouvre un menu contextuel dont le contenu dépend du rôle du rider (session pour tout le monde, event/spot/magasin selon rôle)
- Une section "Gestion", visible uniquement pour les riders ayant un rôle gestionnaire, organisateur ou super admin, regroupée dans le Profil plutôt qu'un onglet dédié
- Les fiches (spot, magasin, event, session, profil d'un autre rider) restent accessibles par navigation depuis la carte, le fil ou une recherche — jamais dans la barre principale

## Capabilities

### New Capabilities
- `navigation-core`: Structure de navigation principale — barre d'onglets, fil combiné events/sessions, hub de création contextuel au rôle, accès conditionnel à la gestion

### Modified Capabilities
<!-- aucune — organise des écrans déjà spécifiés ailleurs, n'en modifie pas le contenu -->

## Impact

- N'introduit aucune nouvelle donnée en base — purement une organisation d'écrans déjà spécifiés dans map-core, events-core, sessions-core, rider-profile, rider-social, spot-core, shop-core
- Dépend de tous les changes ci-dessus pour les écrans qu'elle assemble
- Le fil d'events (déjà spécifié dans events-core) devient un des deux modes de l'écran "Fil"
