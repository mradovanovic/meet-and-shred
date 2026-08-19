## Context

Les notifications push sont le mécanisme de rétention principal de MeetNShred : elles ramènent le rider au bon moment (terrain qui ouvre, places qui partent, event annulé, rider suivi qui organise quelque chose). Le cahier des charges définit 4 types au MVP. Aucune notification n'est envoyée en dehors d'un abonnement explicite du rider (spot suivi, event rejoint, rider suivi) — pas de notifications de masse non ciblées.

Point important découvert en analysant les changes existants : `spot-core` (statut, inscriptions) et `rider-profile` (profil public) référencent déjà un "follow" / "followers count" sans jamais le spécifier. `notifications-push` est le premier change qui a besoin de ce mécanisme pour résoudre ses destinataires — il en devient donc le propriétaire de fait au MVP (voir Open Questions).

## Goals / Non-Goals

**Goals:**
- Enregistrement d'un token push par device au login (FCM Android, APNs iOS), un rider peut avoir plusieurs devices actifs
- Suivi d'un spot et suivi d'un rider (abonnements) comme base de ciblage
- 4 types de notifications au MVP : ouverture d'un spot suivi, places limitées sur un spot suivi, event rejoint annulé/modifié, rider suivi crée ou annule un event
- Contenu de la notification localisé dans la langue du rider (voir i18n-core)
- Désactivation automatique des tokens invalides (device désinstallé, token expiré)
- Journalisation des envois pour debug (`notification_logs`)

**Non-Goals:**
- Préférences fines de notification par type, activables/désactivables individuellement (Phase 2)
- Centre de notifications in-app persistant (Phase 2) — au MVP la notification est uniquement système (push natif)
- Notifications email ou SMS
- Suggestions automatiques de riders/spots à suivre (recommandation)

## Decisions

**Tokens push multi-device**
→ Table `push_tokens` (rider_id, token, platform, device_id, created_at, last_used_at). Un rider peut être connecté sur plusieurs appareils ; chaque token reçoit l'envoi. Un token qui échoue de façon définitive (`NotRegistered` FCM / `Unregistered` APNs) est désactivé automatiquement, pas juste ignoré silencieusement.

**Abonnements comme base de ciblage — `spot_follows` et `rider_follows`**
→ Deux tables légères introduites par ce change :
- `spot_follows` (rider_id, spot_id, created_at) — un rider suit un spot pour être notifié de son statut/places
- `rider_follows` (follower_id, followed_id, created_at) — un rider suit un autre rider pour être notifié de ses créations d'event

Ces deux tables alimentent le `followers count` déjà affiché dans `rider-profile` et `spot-page` (`spot-core`). Pas de table équivalente pour les events : les destinataires d'une notif d'annulation/modification sont directement les lignes de `event_inscriptions` (voir events-core), pas besoin d'abonnement séparé.

**Types de notifications en config, pas en enum**
→ Cohérent avec le principe déjà appliqué aux disciplines et aux types d'events : `configs/notification-types.json` liste les 4 types MVP (slug, label `{ fr, en, es }`, déclencheur). Ajouter un 5e type en Phase 2 (ex. rappel avant une session) n'exige pas de modification de code, seulement une nouvelle entrée de config + le trigger correspondant.

**Contenu localisé**
→ Le template du message vit dans la config par type (`{ fr, en, es }`), les variables (nom du spot, nom du rider) sont interpolées à l'envoi dans la langue enregistrée du destinataire (voir i18n-core).

**Journalisation**
→ `notification_logs` (id, rider_id, type, payload, status [`sent`/`failed`], sent_at) sert au debug et évite les envois dupliqués (ex. deux triggers sur le même événement de statut).

## Risks / Trade-offs

- [Tokens obsolètes] Devices désinstallés sans déconnexion propre → désactivation automatique sur échec d'envoi FCM/APNs (`NotRegistered`/`Unregistered`), pas de nettoyage périodique nécessaire au MVP
- [Spam de notifications] Un rider très suivi qui crée/annule beaucoup d'events → pas de rate limiting au MVP, à surveiller en Phase 2 si signalé
- [Ownership du follow] `spot_follows`/`rider_follows` créées ici alors que le concept est utilisé ailleurs → voir Open Questions
- [Notification dupliquée multi-device] Un rider avec 2 devices reçoit 2 notifications pour le même événement → accepté au MVP (comportement standard push), pas de déduplication cross-device

## Open Questions

- `spot_follows` et `rider_follows` sont introduites par ce change car c'est le premier besoin concret, mais conceptuellement elles appartiennent aussi à `spot-core` (bouton "suivre" sur la page spot) et `rider-profile` (bouton "suivre" sur le profil, `followers count`). Faut-il les documenter aussi dans ces deux changes en `MODIFIED Requirements`, ou notifications-push reste-t-il la source de vérité unique pour le schéma des deux tables ? À trancher avant l'implémentation.
- Faut-il un endpoint `GET /notifications` (historique in-app) au MVP ou est-ce strictement Phase 2 ? Le proposal actuel n'en parle pas — supposé Phase 2 pour l'instant.
