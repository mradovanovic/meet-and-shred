## 1. API Carte

- [ ] 1.1 `GET /map/pins` — marqueurs dans un viewport (params: lat, lng, radius, types[], disciplines[]) avec index géospatial
- [ ] 1.2 Retourner pour chaque spot : id, lat, lng, status, status_color, discipline_icon, places_restantes
- [ ] 1.3 Retourner pour chaque event : id, lat, lng, title, starts_at, discipline
- [ ] 1.4 Index géospatial sur `spots.(lat, lng)` et `events.(lat, lng)` (PostGIS ou équivalent)
- [ ] 1.5 `GET /map/search` — recherche spots et events par nom ou lieu (params: q, lat, lng)

## 2. Mobile — Intégration Google Maps

- [ ] 2.1 Installer le SDK Google Maps pour React Native Expo (solutioning : react-native-maps + Google Maps)
- [ ] 2.2 Configurer les clés API Google Maps (iOS + Android)
- [ ] 2.3 Implémenter le style monochrome sombre (JSON de style personnalisé)
- [ ] 2.4 Centrage initial sur la position GPS du rider ou affichage autocomplete si géoloc refusée

## 3. Mobile — Marqueurs et interactions

- [ ] 3.1 Marqueurs spots : cercle coloré selon statut + icône de la discipline principale au centre
- [ ] 3.2 Marqueurs events : losange avec icône event
- [ ] 3.3 Clustering des marqueurs proches avec badge compteur
- [ ] 3.4 Tap sur cluster → zoom automatique pour révéler les marqueurs individuels
- [ ] 3.5 Bottom sheet tap spot (nom, statut localisé, discipline, distance, places restantes, CTA)
- [ ] 3.6 Bottom sheet tap event (titre, date, discipline, distance, CTA)
- [ ] 3.7 Navigation vers fiche spot ou event depuis la bottom sheet

## 4. Mobile — Chargement dynamique

- [ ] 4.1 Listener sur les changements de caméra (région visible)
- [ ] 4.2 Debounce 500ms avant requête API
- [ ] 4.3 Calcul du rayon depuis le zoom level de la caméra
- [ ] 4.4 Message "Rien dans cette zone — essaie d'élargir tes filtres" si résultats vides

## 5. Mobile — Filtres et recherche

- [ ] 5.1 Filtres type : Spots / Events (toggle)
- [ ] 5.2 Filtres discipline : disciplines du rider pré-sélectionnées, toggle "Toutes"
- [ ] 5.3 Persistence des filtres actifs en local storage
- [ ] 5.4 Rechargement des marqueurs à chaque changement de filtre
- [ ] 5.5 Barre de recherche globale (spots et events par nom ou lieu)
- [ ] 5.6 Résultats de recherche en liste → tap centre la carte sur l'élément sélectionné
