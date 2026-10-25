## Why

Beaucoup de sorties sont spontanées et informelles — un rider veut simplement dire "je vais rider [ce spot] à telle heure" et laisser d'autres riders le rejoindre. C'est vrai sur un spot payant (un terrain MX un samedi) comme sur un spot gratuit (une vague, une place pour skater). Ce besoin n'est pas un "event" au sens organisé du terme (voir events-core, réservé aux gestionnaires et organisateurs) : c'est plus léger, ouvert à tout rider, sans validation ni capacité ni paiement.

## What Changes

- Nouvelle entité **Session** : un rider connecté crée une session liée à un spot existant (privé ou public), avec une date/heure
- N'importe quel autre rider peut la rejoindre ou la quitter librement — pas de capacité, pas de paiement
- Une session est distincte de l'inscription formelle d'un spot privé (voir spot-core, spot-inscriptions) : rejoindre une session ne réserve pas de place payante, c'est une coordination sociale
- Visible sur la carte dans la même fenêtre de 2 semaines que les events, avec la même distinction "en cours" (couleur active) / "à venir" (couleur atténuée)
- Fil de sessions swipable, sur le même principe que le fil d'events — intégré dans le même écran "Fil" avec un toggle (voir navigation-core)
- Le créateur peut annuler explicitement sa session, avec notification aux participants
- Avertissement (pas un blocage) si la session chevauche dans le temps un autre event ou une autre session déjà pris par le rider
- Remplace l'ancien type d'event `social_ride`, retiré d'events-core (voir events-core)

## Capabilities

### New Capabilities
- `sessions-core`: Création, consultation, participation à une session liée à un spot — sans rôle requis, sans capacité, affichage carte

### Modified Capabilities
- `map-core`: ajout des marqueurs sessions
- `events-core`: retrait du type `social_ride`, devenu une session

## Impact

- Tables `sessions`, `session_participants`
- Dépend de `spot-core` (spot_id, catégorie privé/public du spot lié)
- Dépend de `map-core` (affichage, fenêtre de 2 semaines, distinction actif/à venir)
- Dépend d'`events-core` (`event_inscriptions`) pour la détection de chevauchement horaire, partagée entre les deux changes
- N'introduit ni rôle, ni validation, ni paiement, ni capacité — volontairement minimaliste
