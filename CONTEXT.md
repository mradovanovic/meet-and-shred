# CONTEXT — Glossaire de domaine MeetNShred

Vocabulaire canonique du projet. Glossaire uniquement — aucune décision d'implémentation ici (celles-ci vont dans `docs/adr/`).

## Termes

- **Rider** — Utilisateur standard de la plateforme (compte de base). Pratique une ou plusieurs disciplines.
- **Discipline** — Pratique de ride (MX, DH, Enduro, Kite, Wakeboard, Skate, Ski/Snow…). Liste **ouverte et extensible**, jamais un enum figé : ajouter une discipline = ajouter une ligne de données, pas modifier le code.
- **Spot** — Lieu rideable, couvrant une ou plusieurs disciplines. Possède un **statut** (ouvert/fermé…) défini par configuration, pas en base.
- **Spot_manager** — Rôle attribué manuellement par un super_admin, autorisant la création et la gestion de spots. Nommé « manager » et non « owner » : il **gère** un spot sans en être forcément le propriétaire. Un rider peut soumettre une demande de création de spot (modération).
- **Event** — Évènement rattaché à un ou plusieurs spots, affiché sur la carte et dans le feed. Objet du **swipe** (rejoindre une session d'un geste).
- **Session** — Rassemblement de riders sur un event (à venir ou en cours). Peut être organisée par un organisateur.
- **Organisateur** — Rôle autorisant la création de sessions organisées sur les events.
- **Super_admin** — Valide manuellement les spots et attribue les rôles (spot_manager, organisateur).
- **Feed** — Flux d'events filtré par discipline du rider et par distance autour de sa position.
- **Carte** — Écran central (Google Maps) affichant spots rideables, events et sessions autour du rider.
