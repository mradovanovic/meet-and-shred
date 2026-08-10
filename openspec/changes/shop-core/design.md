## Context

MeetNShred couvre déjà les lieux de ride (spots) et les rassemblements (events). Les riders ont aussi besoin des commerces liés à leur pratique : magasin de vélo, de moto, de kite, etc. Un magasin n'est pas un lieu de ride — pas de statut "rideable" — mais il partage beaucoup avec un spot : une fiche publique, une position sur la carte, des photos, un gestionnaire. Ce qui compte pour un magasin, ce ne sont pas les conditions de ride mais les horaires d'ouverture et les marques vendues.

## Goals / Non-Goals

**Goals:**
- Fiche magasin à part entière (pas une variante de la fiche spot)
- Un magasin peut couvrir plusieurs disciplines (comme les spots)
- Marques vendues en liste ouverte et extensible — jamais hardcodée
- Horaires d'ouverture par jour, statut ouvert/fermé calculé automatiquement
- Affichage sur la carte principale, comme les spots et events, avec un marqueur distinct
- Le magasin peut créer des events (apéro, inauguration, voyage, rassemblement...) en réutilisant le système d'events existant
- Gestion réutilise le rôle `spot_manager` — pas de nouveau rôle à créer
- Deux parcours de création : super admin crée puis transfère, ou commerçant soumet et attend validation

**Non-Goals:**
- Modèle payant / sponsoring / mise en avant payante (sujet séparé, à spécifier plus tard)
- Vente en ligne ou e-commerce dans l'app
- Avis et notation des magasins (éventuellement Phase 2+)
- Stock produit en temps réel

## Decisions

**Fiche à part entière, pas une variante de spot**
→ Table `shops` distincte de `spots`. Mêmes briques (page publique, photos, position GPS, multi-disciplines) mais la donnée "temps réel" d'un magasin, c'est ouvert/fermé selon les horaires — pas un statut configurable par discipline comme pour les spots.

**Marques vendues**
→ Table `brands` en liste ouverte, même principe que `disciplines` : jamais un enum, ajouter une marque = insérer une ligne. Liaison N:N via `shop_brands`. Une marque peut avoir un nom et un logo.

**Horaires d'ouverture**
→ `shop_opening_hours` (shop_id, day_of_week, opens_at, closes_at) — plusieurs créneaux possibles par jour (ex : fermeture le midi). Le statut "ouvert maintenant" affiché au rider est calculé à la volée depuis ces horaires, pas stocké.

**Events créés par un magasin**
→ Réutilise le type `shop_event` déjà prévu dans le design d'`events-core` (créateur = gestionnaire du magasin, capacité optionnelle). Un apéro, une inauguration, un rassemblement ou un voyage sont simplement des events de ce type avec un titre libre — pas besoin de sous-types techniques distincts au MVP.

**Gestion et rôle**
→ Réutilise le rôle `spot_manager` : même population de gestionnaires que pour les spots, pas de rôle "commerçant" séparé. Deux parcours de création possibles :
1. Le super admin crée directement la fiche magasin, puis en transfère la gestion à un compte utilisateur existant (qui obtient alors le rôle `spot_manager` s'il ne l'a pas déjà)
2. Un utilisateur avec le rôle `spot_manager` soumet lui-même sa fiche magasin, validée manuellement par le super admin avant publication (même logique que la soumission de spot)

**Affichage carte**
→ Le magasin apparaît sur la carte principale comme un nouveau type de marqueur, visuellement distinct des spots et des events, filtrable indépendamment (voir map-core).

## Risks / Trade-offs

- [Confusion spot vs magasin] Un rider pourrait confondre un magasin avec un lieu rideable → icône de marqueur clairement différente sur la carte, libellé explicite sur la fiche
- [Marques dupliquées] Deux gestionnaires créent "Shimano" et "shimano" séparément → pas de dédoublonnage automatique au MVP, nettoyage manuel possible par le super admin
- [Monétisation différée] Le modèle payant n'est pas traité ici → toute fiche magasin validée est gratuite au MVP, aucune distinction "partenaire" vs magasin normal dans les données pour l'instant

## Open Questions

- Faut-il un statut "temporairement fermé" (vacances, rupture de stock) en plus des horaires réguliers récurrents ?
- Le nom définitif du rôle `spot_manager` reste TBD (voir spot-core) — s'il est renommé, il faudra le répercuter ici puisqu'il est réutilisé pour les magasins.
- Comment le futur modèle de sponsoring/partenariat (hors scope ici) viendra-t-il s'articuler avec la fiche magasin ? À traiter dans un change dédié le moment venu.
