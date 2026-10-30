# CONTEXT — Glossaire de domaine MeetNShred

Vocabulaire canonique du projet. Glossaire uniquement — aucune décision d'implémentation ici (celles-ci vont dans `docs/adr/`).

## Termes

- **Rider** — Utilisateur standard de la plateforme (compte de base). Pratique une ou plusieurs disciplines.
- **Discipline** — Pratique de ride (MX, DH, Enduro, Kite, Wakeboard, Skate, Ski/Snow…). Liste **ouverte et extensible**, jamais un enum figé : ajouter une discipline = ajouter une ligne de données, pas modifier le code.
- **Spot** — Lieu rideable, couvrant une ou plusieurs disciplines. Soit **géré** (établissement avec un gestionnaire, souvent payant : terrain, station, skatepark ; possède un **statut** ouvert/fermé… défini par configuration, pas en base), soit **libre** (gratuit, sans gestionnaire : une vague, un sentier ; créé immédiatement par n'importe quel rider). Le rider voit « Gratuit » ou un prix, jamais « privé » / « public ».
- **Spot_manager** — Rôle attribué manuellement par un super_admin, autorisant la création et la gestion de spots. Nommé « manager » et non « owner » : il **gère** un spot sans en être forcément le propriétaire. Un rider peut soumettre une demande de création de spot (modération).
- **Event** — Évènement organisé par un rôle (gestionnaire de spot : BBQ, ride day, test vélo… ; organisateur : track day, compétition ; gestionnaire de magasin : apéro, inauguration…), rattaché à un spot ou un magasin, affiché sur la carte. Se rejoint d'un tap depuis la carte (le swipe, en Phase 2, fera de même depuis le fil).
- **Session** — Sortie spontanée créée par **n'importe quel rider** sur un spot existant (« j'y vais, qui vient ? »), sans rôle, sans capacité, sans paiement. Se rejoint d'un tap. À ne pas confondre avec un event ni avec l'inscription payante d'un spot géré.
- **Organisateur** — Rôle autorisant la création de track days et de compétitions.
- **Super_admin** — Valide manuellement les spots et attribue les rôles (spot_manager, organisateur).
- **Feed** (Phase 2) — Fil swipable d'events et de sessions, filtré par discipline du rider et par distance. Hors première version.
- **Carte** — Écran central et seul écran de découverte de la première version (Google Maps) : spots, events, sessions et magasins autour du rider, avec la bottom sheet qui permet de rejoindre.
- **Repère** — Pin de la carte : couleur = catégorie, dessin = nature, plein/creux = géré/libre, badge = état, pièce « $ » = payant.
