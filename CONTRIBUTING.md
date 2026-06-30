# Contribuer aux specs MeetNShred

Bienvenue 👋 Ce dépôt est en phase **spec-driven** : on écrit et on affine les
specs **avant** toute ligne de code applicatif. On utilise **OpenSpec**. Cette
page te dit comment t'installer et bosser sans casser la structure.

Langue de travail : **français** (specs, proposals, designs, tasks, commits).

---

## 1. Prérequis

```bash
# Node.js 18+ puis OpenSpec en global
npm install -g @fission-ai/openspec
openspec --version    # doit afficher 1.3.x
```

Claude Code installé, ouvert **à la racine du dépôt** (les commandes `/opsx:*`
et le contexte projet ne se chargent que depuis la racine).

```bash
git clone https://github.com/mradovanovic/meet-and-shred
cd meet-and-shred
```

> Les zips d'archives V1 (>100 Mo) sont gitignorés : tu ne les auras pas, c'est
> normal. Tout le reste de `documentation/` est là.

---

## 2. Les fichiers à lire EN PREMIER

| Fichier | Ce que c'est |
|---|---|
| `CLAUDE.md` (racine) | Vision produit, stack, invariants d'archi, rôles. **Lecture obligatoire.** |
| `openspec/config.yaml` | Le « chapeau » : contexte projet injecté automatiquement par OpenSpec dans chaque artefact. C'est ce que ton Claude reçoit en contexte. |
| `openspec/changes/<nom>/design.md` | Source de vérité des décisions d'archi, **par change**. |

Pour voir l'état d'avancement à tout moment :

```bash
openspec list            # liste les changes + avancement des tasks
openspec validate --all  # vérifie que tous les changes sont structurellement valides
```

---

## 3. Comment bosser (le workflow)

Tout passe par les commandes Claude Code `/opsx:*`. **Ne crée jamais un change
à la main** — laisse l'outil scaffolder.

```
/opsx:explore   →  réfléchir / clarifier un besoin avant de proposer
/opsx:propose   →  créer un nouveau change (génère proposal + design + tasks)
/opsx:apply     →  implémenter les tasks d'un change (phase code, pas encore)
/opsx:archive   →  finaliser un change implémenté
```

### Cas A — tu enrichis un change existant
Les 6 changes du MVP ont déjà proposal + design + specs + tasks. Pour en
améliorer un (ex. `spot-core`) :
1. Lis `openspec/changes/spot-core/` en entier (proposal → design → specs → tasks).
2. Édite les `.md` directement (les specs delta sont dans `specs/<capability>/spec.md`).
3. Relance `openspec validate spot-core` après tes modifs.

### Cas B — tu crées un nouveau change
Utilise `/opsx:propose` et décris ce que tu veux construire. L'outil pose des
questions et génère les artefacts. Exemples de changes incomplets à reprendre :
- `notifications-push` — proposal seul, il manque design + tasks.
- `backoffice-spot` — vide, tout est à faire.

---

## 4. Les invariants à NE JAMAIS casser

Ces règles viennent de `CLAUDE.md` et `openspec/config.yaml`. Toute spec qui les
viole est à corriger :

- **Disciplines** = table extensible, **jamais un enum hardcodé**. Ajouter une
  discipline = insérer une ligne, pas modifier le code.
- **Statuts de spot** = fichiers de config JSON `configs/spot-statuses/<discipline>.json`,
  jamais en base, jamais de migration pour ajouter un statut.
- **i18n** = labels des données statiques en objet `{ fr, en, es }`. Le contenu
  utilisateur (bios, descriptions) n'est PAS traduit au MVP.
- **Photos** = profil max 5, setup max 3, 5 Mo/photo, compression serveur.
- **Rôles** = `rider`, `spot_manager`, `organisateur`, `super_admin`.

Le contexte projet est injecté automatiquement : ton Claude *connaît déjà* ces
règles via `openspec/config.yaml`. Mais vérifie-les en relecture.

---

## 5. Convention de commits & collaboration git

- On bosse directement les specs sur des **branches** dédiées, puis PR vers `main` :
  ```bash
  git checkout -b spec/<nom-du-change>
  # ... édite les specs ...
  git commit -m "spec(<change>): <ce que tu as affiné>"
  git push -u origin spec/<nom-du-change>
  ```
- Messages de commit en **français**, préfixe `spec(<change>):` pour l'enrichissement
  de specs, `feat:` / `fix:` plus tard pour le code.
- **Avant de pousser** : `openspec validate --all` doit passer (hors changes
  volontairement incomplets).
- Pull `main` régulièrement — deux Claude peuvent toucher les mêmes specs.

---

## 6. Ce qu'il NE faut PAS faire

- ❌ Implémenter du code applicatif sans passer par un change OpenSpec.
- ❌ Hardcoder une discipline (MX/DH) où que ce soit.
- ❌ Modifier `openspec/specs/` à la main — ce dossier se remplit **uniquement**
  via `/opsx:archive` une fois un change implémenté.
- ❌ Commiter de gros binaires (>100 Mo bloqués par GitHub ; les zips sont
  gitignorés).

Des questions sur un choix d'archi ? La réponse est dans le `design.md` du change
concerné, ou à défaut on l'ajoute en « open question » dedans.
