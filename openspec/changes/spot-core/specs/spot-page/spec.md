## ADDED Requirements

### Requirement: Page publique d'un spot
Le système SHALL exposer une page publique pour chaque spot contenant : nom, catégorie (privé/public), description, photos, coordonnées GPS, discipline(s) couverte(s), compteur de followers, note moyenne et nombre d'avis (voir reviews-core). Un spot **privé** SHALL en plus afficher : statut en temps réel, tarifs adhérent/non-adhérent, capacité maximale, places restantes, lien de paiement. Un spot **public** ne SHALL pas afficher ces champs de gestion commerciale — sa page met en avant les sessions à venir (voir sessions-core). Les labels de statut SHALL être affichés dans la langue du rider (voir i18n-core).

#### Scenario: Consultation d'une page spot privé
- **WHEN** un rider consulte `GET /spots/:id` pour un spot privé
- **THEN** le système retourne toutes les données publiques du spot avec le statut, les tarifs, la capacité et les labels dans la langue du rider

#### Scenario: Consultation d'une page spot public
- **WHEN** un rider consulte `GET /spots/:id` pour un spot public (ex : une vague)
- **THEN** le système retourne les données publiques du spot (nom, description, photos, disciplines, GPS) sans statut ni tarifs, avec la liste des sessions à venir sur ce spot

#### Scenario: Spot avec statut non visible sur la carte
- **WHEN** un spot privé a un statut dont `visible_on_map: false` (ex : destroyed, off_season)
- **THEN** le spot n'apparaît plus dans les résultats de recherche ni sur la carte, mais sa page reste accessible via URL directe

---

### Requirement: Création d'un spot selon sa catégorie
Le système SHALL exiger le rôle gestionnaire pour soumettre un spot **privé** (géré, payant), qui SHALL rester non publié tant que le super admin ne l'a pas validé. Le système SHALL permettre à tout rider connecté de créer un spot **public** (libre, gratuit), sans rôle particulier et **sans validation** : le spot SHALL être visible sur la carte dès sa création. Un spot public a pour seuls champs obligatoires un nom et une position.

#### Scenario: Soumission d'un spot privé
- **WHEN** un utilisateur sans rôle gestionnaire tente de soumettre un spot de catégorie privée
- **THEN** le système retourne une erreur 403

#### Scenario: Validation d'un spot privé
- **WHEN** le super admin valide un spot privé en attente
- **THEN** le spot devient visible sur la carte et dans les recherches

#### Scenario: Création immédiate d'un spot libre
- **WHEN** un rider connecté, sans rôle particulier, ajoute un lieu gratuit (ex : une vague) avec un nom et une position
- **THEN** le spot est créé et visible immédiatement sur la carte, sans que le rider devienne gestionnaire

---

### Requirement: Garde-fous à la création d'un spot libre
Le système SHALL protéger la carte contre les doublons et les abus sans retarder la création : proposer les spots existants proches avant de créer, limiter le nombre de créations par rider, et permettre le masquage a posteriori.

#### Scenario: Doublon probable
- **WHEN** un rider saisit un nom ou une position à moins de 200 m d'un spot existant
- **THEN** le système propose "Il existe déjà un spot à 200 m : [nom], c'est le même ?" avant de créer

#### Scenario: Limite de créations
- **WHEN** un compte récent dépasse le nombre de créations de spots autorisé sur 24 heures
- **THEN** le système refuse la création suivante et indique de réessayer plus tard

#### Scenario: Masquage a posteriori
- **WHEN** un spot libre est signalé et que le super admin le juge inapproprié (voir moderation-core)
- **THEN** le spot est masqué de la carte sans être supprimé

#### Scenario: Modification d'un spot libre
- **WHEN** un rider autre que le créateur veut corriger un spot libre
- **THEN** il le signale (voir moderation-core) ; seuls le créateur et le super admin peuvent le modifier

---

### Requirement: Revendication d'un spot libre par son propriétaire
Le système SHALL permettre au vrai gestionnaire d'un lieu de revendiquer un spot libre existant. Après vérification par le super admin, le spot SHALL passer en spot géré, avec un gestionnaire, des tarifs et un statut.

#### Scenario: Demande de revendication
- **WHEN** un utilisateur ayant le rôle gestionnaire demande à revendiquer un spot libre
- **THEN** la demande passe en file de validation du super admin

#### Scenario: Revendication acceptée
- **WHEN** le super admin accepte la revendication
- **THEN** le spot devient un spot géré (pin plein), son nouveau gestionnaire peut renseigner tarifs et statut, et les sessions déjà créées sur ce spot sont conservées

---

### Requirement: Prix ou gratuité affiché
Le système SHALL afficher sur la bottom sheet et la fiche de tout spot soit "Gratuit", soit le tarif dans la devise du lieu (ex : "dès 15 €"). Un spot géré sans tarif renseigné est affiché "Gratuit".

#### Scenario: Spot payant
- **WHEN** un rider consulte un spot avec un tarif de 15 €
- **THEN** la fiche affiche "dès 15 €" et la carte porte la pièce "$" sur son pin (voir map-core)

#### Scenario: Spot géré gratuit
- **WHEN** un rider consulte un skatepark municipal géré mais sans tarif
- **THEN** la fiche affiche "Gratuit" et le pin est plein sans pièce

---

### Requirement: Spot multi-disciplines
Le système SHALL permettre d'associer un spot à une ou plusieurs disciplines. Le statut affiché SHALL correspondre à la discipline principale du spot (première discipline listée).

#### Scenario: Bike park multi-disciplines
- **WHEN** un gestionnaire associe un spot aux disciplines DH, Enduro VTT et Dirt Jump
- **THEN** les trois disciplines apparaissent sur la page du spot et le statut utilisé est celui défini dans la config de la discipline principale (DH)

---

### Requirement: Photos du spot
Le système SHALL permettre au gestionnaire d'uploader des photos pour son spot. La première photo SHALL être la photo de couverture.

#### Scenario: Upload photo spot
- **WHEN** le gestionnaire uploade une photo (JPEG/PNG, ≤ 10 MB)
- **THEN** la photo est stockée et apparaît sur la page du spot

---

### Requirement: Localisation — adresse et coordonnées GPS
Chaque spot SHALL avoir une adresse lisible ET des coordonnées GPS (latitude, longitude). À la création, le gestionnaire SHALL pouvoir saisir l'adresse via autocomplete (qui déduit les coordonnées) ET ajuster le pin sur la carte (qui génère l'adresse par reverse geocoding). Les deux modes sont disponibles car de nombreux spots n'ont pas d'adresse postale précise (plage, forêt, champ).

#### Scenario: Création via adresse autocomplete
- **WHEN** le gestionnaire saisit une adresse via le champ autocomplete
- **THEN** le système place automatiquement le pin GPS sur la carte à l'adresse trouvée

#### Scenario: Ajustement du pin sur la carte
- **WHEN** le gestionnaire déplace le pin sur la carte après l'autocomplete
- **THEN** le système effectue un reverse geocoding et met à jour l'adresse affichée

#### Scenario: Spot sans adresse postale (nature)
- **WHEN** le gestionnaire place un pin sur une zone sans adresse (forêt, plage)
- **THEN** le système enregistre les coordonnées GPS et affiche la commune/région la plus proche comme adresse indicative

#### Scenario: Calcul de distance
- **WHEN** un rider à 45 km d'un spot consulte la liste des spots
- **THEN** le système affiche "45 km" sous le nom du spot

---

### Requirement: Partage d'un spot
Le système SHALL permettre à un rider de partager la page d'un spot (privé ou public) via un deep link ouvrant le panneau de partage natif, sur le même principe que le partage d'event (voir events-core).

#### Scenario: Partage d'une page spot
- **WHEN** un rider tape "Partager" sur la page d'un spot
- **THEN** le panneau de partage natif s'ouvre avec le deep link de la page
