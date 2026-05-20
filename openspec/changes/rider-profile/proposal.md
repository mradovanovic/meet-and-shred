## Why

Après l'inscription, le rider doit construire son identité sur MeetNShred. Un profil riche permet aux autres riders de savoir qui rejoint leur session (discipline, niveau, machine). C'est aussi la base du système de follow et de la communauté.

## What Changes

- Écran de complétion de profil post-inscription (onboarding profil)
- Upload de photos de profil (jusqu'à 5), affichage avec parallax
- Sélection des disciplines pratiquées (liste ouverte, multi-sélection)
- Niveau de riding
- Fiches matériel par discipline : champs structurés et terminologie adaptée à chaque sport (machine pour un motard, board pour un snowboarder, etc.)
- Plusieurs setups possibles par discipline (ex : 2 motos MX)
- Fiches matériel publiques et visibles sur le profil
- Bio courte et localisation principale
- Consultation du profil d'un autre rider

## Capabilities

### New Capabilities
- `rider-profile`: Création, édition et consultation du profil rider — disciplines, niveau, bio, photos avec parallax
- `rider-equipment`: Fiches matériel par discipline — champs structurés selon la discipline, plusieurs setups par discipline, public sur le profil
- `media-upload`: Upload et stockage de photos (profil rider) avec limite de 5 photos

### Modified Capabilities
<!-- aucune -->

## Impact

- Table `rider_profiles` liée à `users`
- Table `rider_equipment` (JSONB pour les valeurs, schéma défini dans `disciplines`)
- Stockage des photos sur un service cloud (S3/R2)
- API CRUD profil + equipment
- Liste ouverte des disciplines en base avec schéma de champs matériel par discipline
