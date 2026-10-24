## 1. Tokens & composants
- [ ] 1.1 Ajouter `--cat-spot`, `--cat-event`, `--cat-session`, `--cat-shop` au design system et au thème RN
- [ ] 1.2 Composant `CategoryMarker` (goutte + lettre + anneau d'état) : à venir / en cours / ouvert / fermé
- [ ] 1.3 Vectoriser les 4 lettres script (SVG → react-native-svg)
- [ ] 1.4 Composant `ActionMenu` natif (ActionSheetIOS / Material bottom sheet)

## 2. Carte
- [ ] 2.1 Remplacer les marqueurs par `CategoryMarker`
- [ ] 2.2 Barre de 4 filtres de type toujours visibles, avec compteur
- [ ] 2.3 Aucun bouton +/− ; bouton « recentrer »
- [ ] 2.4 Bottom sheets : libellé d'état systématique

## 3. Profil & social
- [ ] 3.1 Footer profil autre rider : Suivre/Abonné + Message libellés
- [ ] 3.2 Menu ⋯ : Partager, Signaler, Bloquer (avec confirmation)
- [ ] 3.3 Garde `canEdit(viewer, owner)` sur toutes les actions d'édition
- [ ] 3.4 Section « Son matos » + route fiche matos lecture seule
- [ ] 3.5 Fil d'activité : `ref { type, id }` côté API, entrées cliquables

## 4. Onboarding & création
- [ ] 4.1 Niveau : état sélectionné (fond teinté + `accessibilityState.selected`)
- [ ] 4.2 Écran géoloc : « Ça ride autour de toi »
- [ ] 4.3 Création de session : aperçu marqueur + pastille participants

## 5. i18n
- [ ] 5.1 Clés FR/EN/ES pour tous les nouveaux libellés
- [ ] 5.2 Supprimer « setup » des libellés UI
