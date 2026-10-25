## Why

Au-delà des spots et des events, les riders ont besoin de trouver les commerces liés à leur pratique — magasin de vélo, de moto, de kite, etc. — pour acheter, réparer ou s'équiper. Un annuaire de magasins avec horaires et marques vendues, visible sur la carte comme les spots, renforce l'ancrage local de la communauté. L'écosystème dépasse le commerce d'équipement : bars et restaurants font aussi partie de la vie d'une communauté ride (lieux de rendez-vous après-session), d'où un type de commerce extensible plutôt qu'un magasin figé sur la vente d'équipement. Les magasins peuvent aussi organiser leurs propres événements (apéro, inauguration, rassemblement, voyage) pour engager les riders autour d'eux.

## What Changes

- Entité "Magasin" — fiche à part entière, distincte des spots (un magasin n'est pas un lieu de ride)
- Type de commerce extensible (magasin de sport, bar, restaurant...) — liste ouverte, séparée des disciplines, jamais hardcodée
- Un magasin peut couvrir plusieurs disciplines (ex : vélo + ski), de façon facultative — un bar ou un restaurant n'en a pas forcément
- Marques vendues par magasin — liste ouverte, jamais hardcodée, facultative
- Heures d'ouverture par jour de la semaine, statut ouvert/fermé calculé automatiquement
- Le magasin peut créer des events (apéro, inauguration, voyage, rassemblement...) en réutilisant le système d'events existant (type `shop_event`, déjà prévu dans `events-core`)
- Gestion du magasin réutilise le rôle `spot_manager` — pas de nouveau rôle
- Deux parcours de création : le super admin crée la fiche puis en transfère la gestion à un commerçant, OU le commerçant s'inscrit et soumet sa fiche à validation manuelle
- Affichage sur la carte principale, comme les spots et events
- Modèle payant / sponsoring explicitement **hors scope** de ce change — sujet séparé, à spécifier plus tard

## Capabilities

### New Capabilities
- `shop-core`: Fiche magasin — nom, type de commerce, description, photos, adresse/GPS, disciplines couvertes (facultatif), marques vendues (facultatif), horaires d'ouverture, statut ouvert/fermé, affichage carte, création d'events

### Modified Capabilities
- `map-core`: ajout des magasins comme nouveau type de marqueur sur la carte, toujours affiché (contrairement aux events), coloré ouvert/fermé
- `events-core`: les magasins deviennent créateurs possibles d'events (type `shop_event`)

## Impact

- Tables `shops`, `shop_types`, `shop_disciplines`, `shop_photos`, `shop_opening_hours`
- Table `brands` (liste ouverte de marques, même principe que `disciplines`) et `shop_brands` (liaison)
- Réutilise le rôle `spot_manager` pour la gestion (attribution par le super admin, comme pour les spots)
- Dépend de `i18n-core` (labels des jours de la semaine, labels des types de commerce)
- Dépend de `map-core` (affichage carte) et `events-core` (type `shop_event`)
- Validation manuelle par le super admin avant publication d'une fiche magasin (comme pour les spots)
