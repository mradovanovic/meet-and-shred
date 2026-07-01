# Format des specs OpenSpec — référence MeetNShred

Cette page fige le **contrat de format** des fichiers de spec. Elle sert de
référence quand on travaille **sans le CLI OpenSpec** (donc sans
`openspec validate` pour vérifier automatiquement). Respecte-la à la lettre pour
que les specs restent cohérentes entre contributeurs.

> Avec le CLI, `openspec validate <change>` vérifie tout ça pour toi. Sans le
> CLI, c'est à toi de tenir le format.

---

## 1. Où vivent les specs

```
openspec/changes/<change>/
├── proposal.md                     # POURQUOI + QUOI (voir §5)
├── design.md                       # décisions d'archi, open questions
├── tasks.md                        # étapes d'implémentation (cases à cocher)
└── specs/
    └── <capability>/
        └── spec.md                 # LE contrat de comportement (voir §2)
```

- Une `<capability>` = un domaine de comportement (ex. `spot-status`,
  `spot-page`, `spot-inscriptions`). Un change peut en contenir plusieurs.
- `openspec/specs/` (racine, hors `changes/`) ne se remplit **jamais à la
  main** : il n'est peuplé qu'au moment de l'archivage d'un change implémenté.

---

## 2. Format d'un `spec.md` (le plus strict)

Un `spec.md` est un **delta** : il décrit ce que le change AJOUTE, MODIFIE ou
SUPPRIME par rapport à l'existant. Sections autorisées :

```markdown
## ADDED Requirements
## MODIFIED Requirements
## REMOVED Requirements
```

### Règles NON négociables

1. Chaque section commence par `## ADDED Requirements` (ou `MODIFIED` / `REMOVED`).
2. Chaque exigence : `### Requirement: <nom court et parlant>`.
3. Le corps de l'exigence **contient le mot `SHALL`** (comportement attendu,
   formulé côté système).
4. Chaque exigence a **au moins un** `#### Scenario:`.
5. Chaque scénario utilise des bullets `- **WHEN**` … / `- **THEN**` …
   (on peut ajouter `- **AND**` si besoin).
6. On sépare les exigences par une ligne `---` pour la lisibilité (optionnel
   mais utilisé partout dans le repo).

### Modèle à copier

```markdown
## ADDED Requirements

### Requirement: Statuts de spot définis par discipline dans des fichiers de config
Le système SHALL charger les statuts d'un spot depuis `configs/spot-statuses/{discipline-slug}.json`.
Chaque statut SHALL avoir un slug, une couleur, un flag `visible_on_map` et un label `{ fr, en, es }`.

#### Scenario: Statuts MX chargés depuis la config
- **WHEN** un rider consulte un spot de discipline principale MX
- **THEN** les statuts affichés sont ceux de `configs/spot-statuses/mx.json`, dans sa langue

#### Scenario: Discipline sans config de statuts
- **WHEN** une discipline n'a pas encore de fichier de config statuts
- **THEN** le système utilise les statuts génériques `open` (vert) et `closed` (rouge)

---

### Requirement: Mise à jour du statut par le gestionnaire
Le système SHALL permettre au gestionnaire de changer le statut de son spot en 2 interactions max.

#### Scenario: Changement de statut rapide
- **WHEN** le gestionnaire sélectionne un nouveau statut
- **THEN** le statut est mis à jour et visible par tous les riders en temps réel
```

### ADDED / MODIFIED / REMOVED — quand utiliser quoi

| Section | Usage |
|---|---|
| `## ADDED Requirements` | Nouvelle exigence introduite par ce change. |
| `## MODIFIED Requirements` | Exigence existante dont le comportement change. **Recopie l'exigence entière** (header + SHALL + scénarios) dans sa version nouvelle, pas juste le diff. |
| `## REMOVED Requirements` | Exigence supprimée. On garde le `### Requirement: <nom>` et on explique en une ligne pourquoi elle disparaît. |

Au MVP (specs neuves, pas encore implémentées), tout est en `## ADDED Requirements`.

---

## 3. Style d'écriture des exigences

- **Côté système, pas côté UI** : « Le système SHALL … », pas « L'utilisateur clique sur … ».
- **Testable** : un scénario WHEN/THEN doit pouvoir se traduire en test.
- **Une exigence = un comportement** : si tu utilises « et » pour lier deux
  comportements distincts, coupe en deux exigences.
- **Français**, comme tout le projet.
- Renvoie vers un autre change entre parenthèses quand pertinent
  (ex. « … envoie une notification push (voir notifications-push) »).

---

## 4. Respecter les invariants projet dans les specs

Toute spec doit être compatible avec les invariants de `CLAUDE.md` /
`openspec/config.yaml` :

- Disciplines = table extensible, **jamais un enum hardcodé**.
- Statuts de spot = fichiers config JSON, jamais en base.
- Labels des données statiques = objet `{ fr, en, es }`.
- Photos : profil max 5, setup max 3, 5 Mo/photo.
- Rôles : `rider`, `spot_manager`, `organisateur`, `super_admin`.

Une spec qui viole un invariant est à corriger, même si elle est bien formée.

---

## 5. Format des autres artefacts (rappel court)

- **proposal.md** — sections `## Why`, `## What Changes`, `## Capabilities`
  (New / Modified), `## Impact`. Concis (1-2 pages), centré sur le POURQUOI.
- **design.md** — décisions d'architecture, alternatives écartées, et une
  section « Open Questions » pour ce qui reste à trancher.
- **tasks.md** — liste d'étapes d'implémentation sous forme de cases à cocher
  `- [ ] …`, groupées par thème.

Pour ces trois-là le format est plus souple que pour `spec.md` : copie la
structure d'un change existant (ex. `openspec/changes/spot-core/`) comme modèle.
