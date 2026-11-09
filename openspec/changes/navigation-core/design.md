## Context

Le produit a été spécifié écran par écran, capability par capability, sans jamais fixer la charpente qui les relie. Résultat : on sait ce qu'affiche la page d'un spot ou le fil d'events, mais pas comment un rider y arrive ni ce qu'il voit d'abord. Ce change comble ce trou.

## Goals / Non-Goals

**Goals:**
- Une seule barre de navigation principale, peu d'onglets (5, norme mobile courante)
- La carte reste l'écran d'accueil, cohérent avec la vision produit ("écran central = carte")
- Un point d'entrée unique pour créer (session, event, spot, magasin), qui s'adapte au rôle du rider plutôt que d'afficher des options non pertinentes
- Un accès "Gestion" qui n'encombre pas la navigation des riders simples (la majorité des utilisateurs)

**Non-Goals:**
- Navigation web/desktop — l'app est mobile-only au MVP
- Personnalisation de la barre de navigation par l'utilisateur
- Centre de notifications in-app (déjà hors scope au MVP, voir notifications-push)

## Decisions

**5 destinations : Carte / Fil / Créer / Messages / Profil**
→ Carte : écran d'accueil, cohérent avec la vision produit. Fil : découverte swipable (events + sessions). Créer : bouton central qui ouvre un menu contextuel plutôt qu'un écran figé. Messages : conversations privées (voir rider-social). Profil : identité, abonnements, fil d'activité, réglages, et gestion si le rôle le permet.

**Fil combiné events + sessions, pas deux onglets séparés**
→ Un toggle en haut de l'écran "Fil" bascule entre "Events" et "Sessions", chacun avec son propre swipe et sa vue liste (voir events-core, sessions-core). Les deux partagent la même mécanique (cartes filtrées par discipline/distance, swipe pour rejoindre) — les regrouper évite de multiplier les onglets pour un contenu de nature proche. Position du toggle mémorisée d'une ouverture de l'app à l'autre.

**Bouton Créer contextuel au rôle**
→ Au tap, le menu ne propose que ce que le rôle du rider autorise :
- Tout rider : "Créer une session"
- Rôle organisateur : + "Créer un event" (track day, compétition)
- Gestionnaire d'un spot : + "Créer un event du spot" (BBQ, ride day, test vélo, autre) pour ce spot, "Soumettre un spot payant"
- Gestionnaire d'un magasin : + "Créer un event magasin"
- Tout rider peut aussi "Ajouter un lieu gratuit" (voir spot-core, créé immédiatement) — seul le spot payant géré exige le rôle gestionnaire

**Gestion dans le Profil, pas un onglet dédié**
→ Un onglet "Gestion" serait vide pour la majorité des riders. La section vit dans le Profil, visible seulement si le rider a un rôle gestionnaire, organisateur, ou super admin : liste de ses spots/magasins gérés, accès au back-office de chacun, et pour le super admin, la file de validation des spots/magasins et la file de signalements (voir rider-social).

**Première version : 4 destinations, sans « Fil » (décision du 2026-10-30)**
→ Carte, Créer, Messages, Profil. Tout ce qui se voit et se rejoint passe par la carte. L'écran « Fil » (events et sessions en cartes swipables, avec toggle) reste spécifié ci-dessus mais arrive en Phase 2. Moins d'écrans à construire et à tester, et une seule façon de rejoindre une sortie à apprendre.

## Risks / Trade-offs

- [Bouton Créer surchargé] Un rider cumulant plusieurs rôles (gestionnaire de spot et de magasin, par exemple) pourrait voir un menu long → grouper les options par catégorie (Session / Event / Gestion) dans le menu
- [Fil combiné peu visible] Un rider pourrait ne pas remarquer le toggle Events/Sessions → le rendre visuellement proéminent en haut de l'écran, pas caché dans un sous-menu

## Open Questions

- Le bouton "Créer" doit-il être un onglet à part entière dans la barre (comme Instagram) ou une bulle flottante par-dessus (FAB) ? Question purement ergonomique, à trancher en maquette.
- Faut-il une pastille de notification sur l'onglet "Messages" pour les messages non lus ? Cohérent avec l'existant (accusé de lecture déjà prévu dans rider-social) mais pas explicitement demandé — à confirmer.
