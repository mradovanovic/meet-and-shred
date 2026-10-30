## 1. Base de données et config

- [ ] 1.1 Créer la table `event_types` (id, slug, label JSONB `{fr,en,es}`, icon, required_role, capacity_required) — extensible par super admin
- [ ] 1.2 Seeder les types de base : spot_event (générique), bbq, ride_day, bike_test (créables par le gestionnaire du spot lié), track_day, competition (organisateur), shop_event (gestionnaire du magasin) — remplace l'ancien type spot_opening
- [ ] 1.2b Ajouter à `events` un prix facultatif (`price_amount`, `price_currency`) et `payment_url` ; sans prix = gratuit
- [ ] 1.3 Créer la table `events` (id, event_type_id, title, description, spot_id nullable, shop_id nullable, lat, lng, address, starts_at, ends_at, status, max_capacity nullable, organizer_id, created_at) — un event a soit spot_id soit shop_id, jamais les deux
- [ ] 1.4 Créer la table `event_disciplines` (event_id, discipline_id) — liaison N:N
- [ ] 1.5 Créer la table `event_inscriptions` (id, event_id, rider_id, created_at) avec contrainte UNIQUE (event_id, rider_id)
- [ ] 1.6 Index géospatial sur `events.(lat, lng)`, index sur `events.starts_at` et `events.status`
- [ ] 1.7 Job d'archivage automatique : passer les events en `archived` 24h après `ends_at`

## 2. API Events — Publique

- [ ] 2.1 `GET /event-types` — liste des types disponibles avec labels localisés
- [ ] 2.2 `GET /events` — feed paginé avec filtres (disciplines[], lat, lng, radius, event_type, date_from)
- [ ] 2.3 `GET /events/:id` — détail avec riders inscrits, places restantes, type localisé
- [ ] 2.4 `POST /events/:id/inscriptions` — inscription (transaction atomique si max_capacity défini) ; retourne un flag `overlap` avec le(s) engagement(s) concerné(s) si chevauchement détecté avec un event ou une session existants du rider
- [ ] 2.4b `GET /riders/me/schedule-check?starts_at=&ends_at=` — vérifie un chevauchement avant confirmation, utilisé par la page de détail avant inscription directe
- [ ] 2.5 `DELETE /events/:id/inscriptions/me` — désinscription
- [ ] 2.6 `GET /events/:id/share` — génération du deep link de partage

## 3. API Events — Création et gestion

- [ ] 3.1 `POST /events` — création avec vérification du rôle selon event_type
- [ ] 3.2 `PUT /events/:id` — édition (organisateur uniquement)
- [ ] 3.3 `PATCH /events/:id/cancel` — annulation + notification push aux inscrits

## 3b. Mobile — Rejoindre depuis la carte (première version)

- [ ] 3b.1 Bouton « Je viens » dans la bottom sheet d'un event (voir map-core)
- [ ] 3b.2 Event gratuit et sans limite : inscription immédiate + snackbar « Annuler » 3 secondes
- [ ] 3b.3 Event payant ou limité : volet « Payer sur place / Payer en ligne » (ouvre `payment_url` dans le navigateur natif), puis inscription avec le mode choisi
- [ ] 3b.4 Chevauchement détecté : message « Chevauche [nom] de 14h à 16h » avec « Rejoindre quand même » / « Annuler »
- [ ] 3b.5 Event complet : bouton désactivé « Complet »

## 4. Mobile — Swipe feed (Phase 2, hors première version)

- [ ] 4.1 Composant carte swipable (solutioning : react-native-deck-swiper ou custom)
- [ ] 4.2 Swipe right → inscription API + animation verte + snackbar "Annuler" 3 secondes ; si `overlap` retourné, le snackbar affiche en plus le nom et l'horaire de l'engagement en conflit
- [ ] 4.3 Annulation post-swipe dans le snackbar → DELETE inscription + carte revient
- [ ] 4.4 Swipe left → animation grise + event suivant
- [ ] 4.5 Toggle swipe ↔ vue liste chronologique
- [ ] 4.6 Filtres : disciplines (pré-sélectionnées depuis profil), distance, toggle "Toutes disciplines"

## 5. Mobile — Pages events

- [ ] 5.1 Page de détail (titre, type localisé, description, date/heure, lieu + mini-carte, disciplines, organisateur, capacité + barre de progression, liste participants)
- [ ] 5.2 Bouton inscription / désinscription sur la page de détail ; en cas de chevauchement détecté, confirmation explicite avant de finaliser
- [ ] 5.3 Bouton partage → panneau de partage natif avec deep link

## 6. Mobile — Création d'event

- [ ] 6.1 Sélection du type d'event (liste depuis API, filtrée selon rôle du rider — aucun type visible pour un rider sans rôle)
- [ ] 6.2 Formulaire : titre, description, disciplines, date/heure, capacité (optionnelle)
- [ ] 6.3 Sélection du spot lié (pour spot_event, bbq, ride_day, bike_test, track_day, competition) ou du magasin lié (pour shop_event)
- [ ] 6.3b Champ prix facultatif (montant, devise) et lien de paiement dans le formulaire de création
- [ ] 6.5 Bouton annulation de l'event depuis la page de gestion
