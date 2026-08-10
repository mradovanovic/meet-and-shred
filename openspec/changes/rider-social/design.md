## Context

Le suivi entre riders existait déjà en germe dans `notifications-push`, mais uniquement comme mécanisme technique pour cibler des envois. Le produit veut aller plus loin : un vrai fil d'activité (voir ce que font les riders qu'on suit) et une messagerie privée, avancés dès la première version de l'app. `rider-social` devient la source de vérité pour tout ce qui touche à l'interaction sociale entre riders.

## Goals / Non-Goals

**Goals:**
- Suivi libre entre riders, sans acceptation requise — cohérent avec des profils déjà publics (voir rider-profile)
- Fil d'activité listant les actions publiques des riders suivis
- Messagerie privée texte, 1:1, entre riders uniquement
- `rider_follows` devient la table de référence unique, y compris pour `notifications-push`

**Non-Goals:**
- Suivi avec demande à valider (explicitement écarté — suivi libre)
- Messagerie de groupe
- Messagerie avec les gestionnaires de spot/magasin (différent de la "messagerie gestionnaire↔rider" déjà prévue en Phase 3)
- Partage de photos/fichiers dans les messages — texte uniquement au MVP
- Modération automatique des messages

## Decisions

**Suivi libre, sans validation**
→ `rider_follows` (follower_id, followed_id, created_at), contrainte unique sur la paire. Un rider peut suivre n'importe quel profil sans que celui-ci ait à valider. Cette table était déjà consommée par `notifications-push` sans y être possédée — elle est officiellement rapatriée ici.

**Fil d'activité**
→ Table `rider_activities` (id, rider_id, type, reference_id, created_at). Types d'activité au MVP : a rejoint un event, a créé un event, a ajouté un nouveau setup matériel. Le fil affiché à un rider agrège, par ordre chronologique, les activités des comptes qu'il suit.

**Messagerie directe**
→ Conversations 1:1 uniquement (pas de groupe), texte simple. `conversations` (id, participant_1_id, participant_2_id, created_at, contrainte unique sur la paire) et `messages` (id, conversation_id, sender_id, content, sent_at, read_at). Une conversation se crée automatiquement à l'envoi du premier message — cohérent avec le suivi libre, pas de demande d'autorisation préalable pour écrire à quelqu'un.

**Notification de nouveau message**
→ Un nouveau message déclenche une notification push. C'est un 5e type de notification, ajouté à `configs/notification-types.json` (voir notifications-push), cohérent avec le système déjà en place plutôt qu'un mécanisme séparé.

## Risks / Trade-offs

- [Harcèlement / abus] Suivi et messagerie ouverts sans validation → un rider peut être suivi ou contacté par n'importe qui, y compris des inconnus. Aucun blocage ni signalement prévu dans ce change → voir Open Questions, point de sécurité à trancher avant lancement
- [Fil d'activité coûteux à grande échelle] Un rider qui suit beaucoup de monde génère un fil volumineux → pagination nécessaire, pas de risque d'architecture majeur au MVP vu les volumes attendus
- [Contenu non modéré] Messages textuels non modérés au MVP → pas de filtre automatique, signalement manuel à prévoir a minima (voir Open Questions)

## Open Questions

- **Blocage / signalement d'un rider** : le suivi et la messagerie étant ouverts sans validation, faut-il un mécanisme de blocage et de signalement dès le MVP ? Fortement recommandé côté sécurité/confiance des utilisatrices et utilisateurs — à trancher avant l'implémentation, pas juste avant le lancement.
- Le fil d'activité doit-il couvrir d'autres actions que rejoindre/créer un event et ajouter un setup (ex : commencer à suivre un nouveau spot, changer de discipline pratiquée) ?
- Accusé de lecture (`read_at`) affiché au destinataire (comme WhatsApp) ou gardé en interne uniquement (impact vie privée) ?
