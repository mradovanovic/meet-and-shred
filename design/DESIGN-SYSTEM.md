# Design system — Meet & Shred

Référence visuelle dérivée du **prototype Claude Design v3** (« Meet & Shred — Tous les écrans »). Source de vérité pour le look & feel et les flux. Les fichiers sources décodés sont dans [`mockups/`](mockups/) :
- [`mockups/tokens.css`](mockups/tokens.css) — tokens exacts (`:root`), **à porter en React Native**.
- [`mockups/meet-and-shred.prototype-v3.app.js`](mockups/meet-and-shred.prototype-v3.app.js) — code transpilé des composants + écrans (React web, lisible par module).

> ⚠️ C'est du **web React** ; l'app cible est **React Native**. On en dérive des tokens + specs d'écran, on ne porte pas le code ligne à ligne.

## Identité

Thème **sombre** (canvas « carbon » qui épouse la carte sombre). Héritage visuel « 2015 » : **liseret rouge** en bas des photos héro, monogramme **script « m »**, titres en pairage **Roboto Light (300) + Black (900)** (« Trouve les spots ouverts **et roule avec ta crew** »).

## Couleurs (tokens clés)

**Marque / surfaces**
| Rôle | Token | Valeur |
|---|---|---|
| Accent / CTA (Shred Red) | `--accent` = `--red-500` | `#E31B23` |
| Accent 2 (focus, turquoise) | `--accent-2` = `--lagoon-500` | `#00C8C8` |
| Fond app | `--bg` = `--carbon-950` | `#090B0C` |
| Carte / surface | `--surface` / `--surface-card` | `#0F1314` / `#1A2023` |
| Texte | `--text` / `--text-muted` | `#F3F7F6` / `#859399` |

**Phases d'event** (aplats colorés) : `--phase-live` bleu `#0B6FE0` · `--phase-next` jaune `#FFE400` · `--phase-mine` vert `#00C232` · `--phase-past` ardoise `#36495A`.

**Statuts de spot** (config-driven, aligné sur la spec green/blue/orange/red/grey) : open `#2FCB8B` · info `#3D9BFF` · warn `#FF9F1C` · closed `#FF4D4D` · off `#6E7B82`.

**Accents de catégorie de discipline** (chips de filtre) : moto `#FF7A45` · vélo `#8BD43A` · eau `#2FB8FF` · snow `#9FB4FF` · urbain `#E36AF5`.

## Typographie

- **Polices** : Roboto (display + sans), Roboto Mono (chiffres), **Kaushan Script** (titres « sticker » / logo brush).
- **Graisses** : 300 / 400 / 500 / 700 / 900.
- **Échelle** : display 44 · h1 34 · h2 26 · h3 21 · title 18 · body 16 · sm 14 · xs 12.
- **Rôles composites** : `--text-display`, `--text-h1/2/3`, `--text-title`, `--text-body`, `--text-meta`, `--text-mono`, `--text-sticker` (voir `tokens.css`).

## Rayons

xs 6 · sm 10 · md 14 · lg 18 (cards) · xl 24 (hero / bottom sheets) · **2xl 28 (cartes de swipe)** · pill 999.

## Composants (inventaire)

**Core** : Avatar, Badge, BottomSheet, Button (primary/secondary/ghost, tailles), Card + CardMedia, **DisciplineChip**, IconButton, Input (label + icône), **Marker** (carte), ProgressBar, SegmentedControl, **StatusPill**, Toggle.
**Brand** : Headline (light+bold), **Liseret** (bande rouge + monogramme), PhaseHeader (bannière de phase).

## Écrans (inventaire → mapping OpenSpec)

| Écran | Contenu | Change |
|---|---|---|
| **WelcomeScreen** | Intro (héro + logo + liseret + gestes shaka/peace/fist + tagline) → boutons **Apple / Google / email** ; mode email : « Crée ton compte rider », Email + Mot de passe (« 8 caractères minimum »), « C'est parti » | `auth-registration` |
| **MapScreen** | Carte sombre, marqueurs spots/events, filtres | `map-core` |
| **EventsScreen** | Feed d'events par phases (live/next/mine/past), swipe | `events-core` |
| **SpotScreen** | Page spot (statut, disciplines, infos) | `spot-core` |
| **ProfileScreen** | Profil rider, disciplines, matériel | `rider-profile` |
| **app / chrome** | Conteneur + navigation (barre d'onglets) | (transversal) |

## Observations à réconcilier avec les specs

- **WelcomeScreen (mode email)** ne collecte que **email + mot de passe** — nom/prénom ne sont pas sur cet écran. Dans la spec `auth-registration`, le nom/prénom sont demandés à l'inscription ; soit on les déplace dans l'onboarding profil (après le compte), soit on les ajoute ici. **À trancher quand on implémentera l'auth.**
- Les statuts de spot et le vocabulaire « config-driven » du prototype collent déjà à l'architecture (statuts en config JSON). ✅
- Le prototype confirme : **SSO Apple/Google présents**, **pas de date de naissance**. ✅
