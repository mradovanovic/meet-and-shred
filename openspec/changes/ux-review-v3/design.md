## Contexte

Retours associés sur le prototype v2 + relecture de la charte 2015 (`documentation/Old version/PRODUCTION SITE POUR BETA/`). Référence visuelle : section « Retours v3 » et bloc « Une couleur, une lettre par catégorie » de la planche `Meet and Shred - Tous les ecrans.html`.

## Décisions

### 1. Couleur = catégorie, anneau = état
Les pins 2015 associaient une lettre script à une catégorie (`e` events, `r` riders, `s` shops/spots). Repris sur les 4 catégories actuelles :

| Catégorie | Token | Alias DS | Lettre |
|---|---|---|---|
| Spots | `--cat-spot` | `--lagoon-500` (#00C8C8) | s |
| Events | `--cat-event` | `--accent` Shred Red (#E31B23) | e |
| Sessions | `--cat-session` | `--grape-500` | r |
| Shops | `--cat-shop` | `--phase-next` (jaune) | m |

- Le vert/rouge d'état ne colore **jamais** le fond d'un marqueur : il est porté par un anneau (≥ 2 pt). Règle la collision rouge CTA / rouge fermé relevée en revue.
- État jamais transmis par la seule couleur (WCAG 1.4.1) : la bottom sheet affiche toujours un libellé.
- « À venir » = pin atténué (60 %) ; « en cours » = pin plein + anneau pulsé (seule boucle autorisée).
- Lettres : vectorisation à produire depuis le logo script (PNG 25 px de 2015 inexploitables). Kaushan Script en attendant.

**Écarté** : bleu/orange/violet/jaune proposé en revue — l'orange est un statut de spot (config) et le bleu est `--phase-live`.

### 2. Contrôles de carte
Apple Plans et Google Maps mobile n'affichent plus de +/− : pincement, double tap, double tap + glisser. On garde « recentrer » et les filtres. VoiceOver/TalkBack exposent déjà les actions de zoom de la carte native.

### 3. Profil d'un autre rider
- Footer : `Suivre` (primaire, user-plus) → `Abonné` (secondaire, check) ; `Message` (secondaire, libellé + icône).
- Header : retour natif (chevron iOS / flèche Android + geste) et menu ⋯ (iOS `ellipsis` ; Android `more-vert`) → Partager le profil, Signaler, Bloquer (destructif, en dernier).
- Droits : une action d'édition n'est rendue que si `viewer.id === owner.id` ou gestionnaire habilité.

### 4. Vocabulaire
`Suivre / Abonné` · `Follow / Following` · `Seguir / Siguiendo`. Section matériel « Ton matos » / « Your Toys » / « Tu material » ; le titre de fiche reste celui de la discipline (« Machine », « Kite & Board », « Vélo »).

### 5. Fil d'activité
Entrée = avatar (→ profil) + phrase + carte d'aperçu (→ fiche). Aperçu : marqueur catégorie pour events/sessions, photo de couverture pour le matos.

## Dépendances d'archivage
Les deltas `MODIFIED` de ce change (map-core, rider-equipment, rider-profile, activity-feed, rider-follow) portent sur des capabilities qui n'existent pas encore dans `openspec/specs/`. `ux-review-v3` SHALL donc être archivé **après** `map-core`, `rider-profile` et `rider-social`, sinon `openspec archive` refusera ces deltas.

## Open Questions
- Lettre Shops : « m » (magasin) ou « s » partagé avec les spots comme en 2015 ?
- Jaune Shops = `--phase-next` : conflit possible avec « prochain event » dans Mes events.
- Qui produit le vectoriel des lettres script ?
- « Followed » (demandé en revue) écarté au profit de l'i18n — à confirmer.
