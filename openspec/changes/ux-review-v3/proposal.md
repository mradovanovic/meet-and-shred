## Why

La revue mobile-first du prototype v2 par les associés (oct. 2026) a fait ressortir des manques de lisibilité et de cohérence : catégories de la carte indistinctes, couleurs d'état confondues avec la couleur de marque, droits d'édition visibles sur le profil des autres, fil d'activité non cliquable, vocabulaire « setup » peu parlant. Ce change fige les décisions prises pour que le développement Expo parte d'une spec à jour, alignée sur le prototype `Meet and Shred v2 (standalone).html` et la planche `Meet and Shred - Tous les ecrans.html`.

## What Changes

- Identité visuelle par catégorie sur la carte : 4 couleurs + 4 lettres script (hommage aux pins de la charte 2015), l'état (ouvert/fermé/en cours/à venir) porté par l'anneau du marqueur, jamais par sa couleur de fond.
- Filtres de type de la carte : les 4 catégories (Spots, Events, Sessions, Shops) toujours visibles sans défilement.
- Contrôles de carte natifs : pas de boutons +/−, bouton « recentrer ».
- Profil d'un autre rider : actions « Suivre / Abonné » et « Message » libellées ; Partager, Signaler, Bloquer dans un menu ⋯ ; aucune action d'édition hors de son propre profil.
- Matériel : « Ton matos » (FR) / « Your Toys » (EN) / « Tu material » (ES) ; fiche matos consultable en lecture seule.
- Fil d'activité : chaque entrée ouvre l'objet concerné (event, session, matos, profil).
- Sélection du niveau : état sélectionné explicite.
- Création de session : aperçu du marqueur et pastille participants.
- Onboarding géoloc : « Ça ride autour de toi ».

## Capabilities

### New Capabilities
- `ux-guidelines` : règles transverses d'UI natives iOS/Android (couleurs sémantiques, droits d'affichage, libellés d'actions, retour natif).

### Modified Capabilities
- `map-core` · `rider-equipment` · `rider-profile` · `activity-feed` · `rider-follow` · `rider-safety` · `sessions-core` · `auth-registration`

## Impact

- **App mobile** : composant `CategoryMarker` (marker custom react-native-maps), tokens couleurs catégories, menu d'actions natif (ActionSheetIOS / Material bottom sheet), route `gear/:riderId/:gearId`.
- **i18n** : nouvelles clés (`gear.section`, `follow.following`, `onboarding.geo.title`…).
- **API** : `GET /riders/:id/equipment/:gearId` (lecture publique) ; les entrées d'activité exposent `ref { type, id }`.
- **Données** : aucune migration — « setup » → « matos » est un libellé, le modèle reste `equipment`.
