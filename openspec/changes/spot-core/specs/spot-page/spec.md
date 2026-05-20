## ADDED Requirements

### Requirement: Page publique d'un spot
Le système SHALL exposer une page publique pour chaque spot contenant : nom, description, photos, coordonnées GPS, discipline(s) couverte(s), statut en temps réel, tarifs adhérent/non-adhérent, capacité maximale, places restantes, lien de paiement, compteur de followers. Les labels de statut SHALL être affichés dans la langue du rider (voir i18n-core).

#### Scenario: Consultation d'une page spot
- **WHEN** un rider consulte `GET /spots/:id`
- **THEN** le système retourne toutes les données publiques du spot avec le statut et les labels dans la langue du rider

#### Scenario: Spot avec statut non visible sur la carte
- **WHEN** un spot a un statut dont `visible_on_map: false` (ex : destroyed, off_season)
- **THEN** le spot n'apparaît plus dans les résultats de recherche ni sur la carte, mais sa page reste accessible via URL directe

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
