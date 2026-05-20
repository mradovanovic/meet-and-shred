## Context

Le profil rider est le cœur de l'identité communautaire. MeetNShred est multi-disciplines (MX, DH, Enduro, Supermoto, Freeride, FMX, Moto piste/circuit, Kite, Wakeboard, SK8, SKI, DirtJump, etc.) — la liste de disciplines DOIT être une donnée extensible, jamais un enum hardcodé.

## Goals / Non-Goals

**Goals:**
- Profil complétable en moins de 2 minutes après inscription
- Disciplines en liste dynamique (ajout sans migration de schéma)
- Multi-sélection de disciplines par rider
- Upload jusqu'à 5 photos (la première est la photo de profil principale)
- Profil consultable par n'importe quel rider connecté

**Non-Goals:**
- Feed d'activité sur le profil (Phase 3)
- Système de vérification de niveau (auto-déclaratif uniquement)
- Intégration réseaux sociaux sur le profil au MVP

## Decisions

**Disciplines en table dédiée, pas en enum**
→ `disciplines` table avec (id, slug, label, icon, category, equipment_schema JSONB). Un rider peut avoir N disciplines via `rider_disciplines`. Permet d'ajouter n'importe quelle nouvelle discipline sans migration de schéma.

**Schéma matériel par discipline via JSONB**
→ Chaque discipline définit son `equipment_schema` : liste de champs (slug, label, type, required). Exemples :
- MX / Enduro / Piste : `[{slug: "brand", label: "Marque"}, {slug: "model", label: "Modèle"}, {slug: "year", label: "Année"}, {slug: "displacement", label: "Cylindrée"}]`
- Kite : `[{slug: "kite_brand", label: "Marque kite"}, {slug: "kite_size", label: "Taille (m²)"}, {slug: "board_brand", label: "Marque board"}, {slug: "board_model", label: "Modèle board"}]`
- Wakeboard / Wakeski : `[{slug: "brand", label: "Marque"}, {slug: "model", label: "Modèle"}, {slug: "size", label: "Taille"}]`
- Snowboard / Ski : `[{slug: "brand", label: "Marque"}, {slug: "model", label: "Modèle"}, {slug: "size", label: "Taille (cm)"}]`

Les valeurs sont stockées dans `rider_equipment.fields` (JSONB). La terminologie (label) vient du schéma de la discipline.

**Plusieurs setups par discipline**
→ Un rider peut avoir N équipements pour une même discipline (ex : 2 motos MX, 3 kites de tailles différentes). Chaque setup a un nom libre ("Ma YZ de piste", "Mon kite 12m"). L'ordre d'affichage est configurable.

**Profil visuel avec parallax**
→ Les photos de profil s'affichent en carrousel avec effet parallax au scroll. Chaque fiche matériel est une card visuelle avec les champs structurés de la discipline. Le profil public est la vitrine du rider.

**Photos stockées sur objet storage (R2/S3), pas en base**
→ La base stocke uniquement les URLs. Deux types de photos :
- Photos de profil rider : max 5, la première est la photo principale, ordre modifiable
- Photos de setup matériel : max 3 par fiche matériel, la première est la photo de couverture de la card

**Profil en deux temps : obligatoire vs optionnel**
→ Après inscription : disciplines + niveau obligatoires. Bio, matériel, localisation principale : optionnels, renseignables plus tard.

## Risks / Trade-offs

- [Schéma matériel] Nouvelle discipline ajoutée sans schéma défini → Fallback sur un champ texte libre "Description du setup" si `equipment_schema` est vide
- [Upload photos] Taille des fichiers → Limiter à 5 MB par photo, compression côté serveur avant stockage
- [Disciplines] Liste trop longue en UI → Grouper par catégorie (Moto, Vélo, Eau, Snow, Urban)
- [Profil incomplet] Rider qui saute l'onboarding → Autoriser mais afficher un nudge "Complète ton profil"

## Open Questions

- Les fiches matériel peuvent-elles avoir leurs propres photos ? (ex : photo de sa moto)
