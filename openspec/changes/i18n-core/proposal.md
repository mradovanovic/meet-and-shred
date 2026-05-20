## Why

MeetNShred vise le marché européen dès le lancement. Le multi-langue doit être intégré by design — l'ajouter après coup est coûteux et risqué. Toutes les données statiques (disciplines, statuts, labels) et toutes les strings UI doivent être traduisibles sans modification de code.

## What Changes

- Langues supportées : FR (défaut), EN, ES — extensible sans refonte
- Toutes les données statiques (disciplines, statuts de spot, schémas matériel) stockent leurs labels en objet multilingue
- L'app mobile utilise i18next pour toutes les strings UI
- L'API retourne les labels dans la langue de l'utilisateur
- La langue est un paramètre du profil utilisateur, avec fallback sur Accept-Language header, puis FR par défaut
- Le contenu utilisateur (descriptions, bios, noms de spots) n'est PAS traduit automatiquement au MVP

## Capabilities

### New Capabilities
- `i18n-core`: Gestion des langues — préférence utilisateur, localisation des données statiques, strings UI

### Modified Capabilities
- `rider-profile`: Ajout du champ `language` sur le profil utilisateur (fr / en / es)
- `rider-equipment`: Labels des champs matériel traduits depuis le schéma de la discipline
- `spot-status`: Labels de statuts traduits depuis les fichiers de config

## Impact

- Champ `language` sur la table `users`
- Toutes les configs (disciplines, statuts) passent d'un `label: string` à un `label: { fr, en, es }`
- Fichiers de traduction UI : `locales/fr.json`, `locales/en.json`, `locales/es.json`
- Middleware API : résolution de la langue via profil utilisateur ou Accept-Language
