## ADDED Requirements

### Requirement: Couleurs sémantiques réservées
Le système SHALL réserver le vert et le rouge d'état (définis par config) à l'expression d'un état. Shred Red SHALL rester réservé aux actions primaires et à la catégorie Events, et ne SHALL jamais être le seul indicateur d'un état « fermé ».

#### Scenario: Spot fermé
- **WHEN** un spot est fermé
- **THEN** son état est indiqué par l'anneau du marqueur et par un libellé localisé (« Fermé »), jamais par la seule couleur

---

### Requirement: Actions d'édition réservées au propriétaire
Le système SHALL n'afficher les actions d'édition d'un contenu (ajouter une photo, modifier, supprimer) qu'à son propriétaire ou au gestionnaire habilité de cet objet.

#### Scenario: Profil d'un autre rider
- **WHEN** un rider consulte le profil d'un autre rider
- **THEN** aucune action « Ajouter une photo », « Modifier » ou « Supprimer » n'est affichée

#### Scenario: Son propre profil
- **WHEN** un rider consulte son propre profil
- **THEN** les actions d'édition sont disponibles

---

### Requirement: Actions libellées
Le système SHALL accompagner toute action de pied de page d'un libellé texte ; une icône seule SHALL être réservée aux actions de barre d'outils (retour, menu, partage) et porter un label d'accessibilité.

#### Scenario: Bouton message sur un profil
- **WHEN** un rider consulte le profil d'un autre rider
- **THEN** le bouton de messagerie affiche le libellé « Message » à côté de son icône

---

### Requirement: Navigation retour native
Le système SHALL afficher un contrôle retour sur tout écran empilé (chevron iOS, flèche Android) et SHALL accepter le geste retour de la plateforme.

#### Scenario: Retour depuis un profil rider
- **WHEN** un rider a ouvert un profil depuis une conversation et effectue le geste retour
- **THEN** la conversation est réaffichée dans son état précédent
