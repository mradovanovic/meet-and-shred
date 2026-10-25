## 1. API Carte

- [ ] 1.1 `GET /map/pins` — marqueurs dans un viewport (params: lat, lng, radius, types[], disciplines[]) avec index géospatial
- [ ] 1.2 Retourner pour chaque spot : id, lat, lng, status, status_color, discipline_icon, places_restantes
- [ ] 1.3 Retourner pour chaque event : id, lat, lng, title, starts_at, ends_at, discipline, is_active (calculé : maintenant entre starts_at et ends_at) — filtrer aux events dont starts_at est dans les 14 prochains jours et ends_at n'est pas dépassé
- [ ] 1.4 Retourner pour chaque session : id, spot_id, lat, lng (hérités du spot), starts_at, is_active (calculé : maintenant entre starts_at et starts_at + 3h) — filtrer aux sessions dont starts_at est dans les 14 prochains jours (voir sessions-core)
- [ ] 1.5 Retourner pour chaque magasin : id, lat, lng, name, shop_type, is_open (calculé depuis horaires + fermetures exceptionnelles) — sans filtre de date, toujours inclus
- [ ] 1.6 Index géospatial sur `spots.(lat, lng)`, `events.(lat, lng)` et `shops.(lat, lng)` (PostGIS ou équivalent) ; les sessions héritent des coordonnées de leur spot
- [ ] 1.7 `GET /map/search` — recherche spots, events, sessions et magasins par nom ou lieu (params: q, lat, lng)

## 2. Mobile — Intégration Google Maps

- [ ] 2.1 Installer le SDK Google Maps pour React Native Expo (solutioning : react-native-maps + Google Maps)
- [ ] 2.2 Configurer les clés API Google Maps (iOS + Android)
- [ ] 2.3 Implémenter le style monochrome sombre (JSON de style personnalisé)
- [ ] 2.4 Centrage initial sur la position GPS du rider ou affichage autocomplete si géoloc refusée

## 3. Mobile — Marqueurs et interactions

- [ ] 3.1 Marqueurs spots : cercle coloré selon statut + icône de la discipline principale au centre
- [ ] 3.2 Marqueurs events : losange, couleur active (en cours) ou atténuée (à venir) selon `is_active`
- [ ] 3.3 Marqueurs sessions : forme distincte des events, couleur active/atténuée selon `is_active` (même logique que les events)
- [ ] 3.4 Marqueurs magasins : forme distincte des spots/events/sessions, couleur ouverte/fermée selon `is_open`, icône selon le type de commerce
- [ ] 3.5 Clustering des marqueurs proches avec badge compteur
- [ ] 3.6 Tap sur cluster → zoom automatique pour révéler les marqueurs individuels
- [ ] 3.7 Bottom sheet tap spot (nom, statut localisé si privé, discipline, distance, places restantes, CTA)
- [ ] 3.8 Bottom sheet tap event (titre, date, statut en cours/à venir, discipline, distance, CTA)
- [ ] 3.9 Bottom sheet tap session (spot lié, créateur, date, nombre de participants, CTA "Rejoindre")
- [ ] 3.10 Bottom sheet tap magasin (nom, type de commerce, statut ouvert/fermé, distance, CTA)
- [ ] 3.11 Navigation vers fiche spot, event, session ou magasin depuis la bottom sheet

## 4. Mobile — Chargement dynamique

- [ ] 4.1 Listener sur les changements de caméra (région visible)
- [ ] 4.2 Debounce 500ms avant requête API
- [ ] 4.3 Calcul du rayon depuis le zoom level de la caméra
- [ ] 4.4 Message "Rien dans cette zone — essaie d'élargir tes filtres" si résultats vides

## 5. Mobile — Filtres et recherche

- [ ] 5.1 Filtres type : Spots / Events / Sessions / Magasins (toggle)
- [ ] 5.2 Filtres discipline : disciplines du rider pré-sélectionnées, toggle "Toutes" — les magasins sans discipline (bar, restaurant) restent visibles indépendamment de ce filtre tant que "Magasins" est actif
- [ ] 5.3 Sous-filtre type de commerce quand "Magasins" est actif (magasin de sport, bar, restaurant...)
- [ ] 5.4 Persistence des filtres actifs en local storage
- [ ] 5.5 Rechargement des marqueurs à chaque changement de filtre
- [ ] 5.6 Barre de recherche globale (spots, events, sessions et magasins par nom ou lieu)
- [ ] 5.7 Résultats de recherche en liste → tap centre la carte sur l'élément sélectionné
