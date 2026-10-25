# Maquettes — Meet & Shred

Source de vérité pour le **look & feel** et les **flux** de l'app. Référence visuelle, pas le code final (les maquettes sont en web React/HTML ; l'app est en React Native).

## Comment ajouter les maquettes

Dépose ici le code exporté depuis Claude Design :

- soit le fichier HTML téléchargé (ex. `tous-les-ecrans.html`),
- soit les composants React/JSX (un fichier par écran si possible),
- soit, à défaut, des captures écran par écran dans `screenshots/`.

Origine : artifact Claude Design « Meet & Shred — Tous les écrans ».

## Ce qu'on en tire (par Claude)

À partir de ces maquettes, Claude dérivera :

1. **Tokens de design** — couleurs, typographie, espacements, rayons, ombres.
2. **Inventaire des écrans + navigation** — la liste des écrans et comment on circule entre eux.
3. **Spec par écran** — composants, contenus, états, à relier aux changes OpenSpec (`auth-registration`, `rider-profile`, `spot-core`, `events-core`, `map-core`).

> Note : ces références seront intégrées aux `design.md` des changes concernés et/ou à un design system mobile une fois le socle Expo en place.
