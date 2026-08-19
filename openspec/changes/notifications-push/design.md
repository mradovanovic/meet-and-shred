## Context

Les notifications push sont le mécanisme de rétention principal de MeetNShred : elles ramènent le rider au bon moment (terrain qui ouvre, places qui partent, event annulé, rider suivi qui organise quelque chose). Le cahier des charges définit 4 types au MVP. Aucune notification n'est envoyée en dehors d'un abonnement explicite du rider (spot suivi, event rejoint, rider suivi) — pas de notifications de masse non ciblées.

Le suivi entre riders (`rider_follows`) est désormais spécifié et possédé par `rider-social` (fil d'activité + suivi + messagerie directe entre riders). `notifications-push` consomme cette relation pour cibler ses envois mais n'en est plus propriétaire. Le suivi d'un spot (`spot_follows`) reste en revanche géré ici : suivre un spot ne sert qu'à être notifié de son statut/ses places, ça n'a pas de dimension "activité sociale".

## Goals / Non-Goals

**Goals:**
- Enregistrement d'un token push par device au login (FCM Android, APNs iOS), un rider peut avoir plusieurs devices actifs
- Suivi d'un spot (abonnement propre à ce change) et consommation du suivi d'un rider (défini dans rider-social) comme base de ciblage
- 7 types de notifications au MVP : ouverture d'un spot suivi, places limitées sur un spot suivi, event rejoint annulé/modifié, rider suivi crée ou annule un event, nouveau message direct reçu (voir rider-social), session annulée (voir sessions-core), rappel 30 minutes avant le début d'un event ou d'une session
- Contenu de la notification localisé dans la langue du rider (voir i18n-core)
- Désactivation automatique des tokens invalides (device désinstallé, token expiré)
- Journalisation des envois pour debug (`notification_logs`)
- Préférences de notification par type, activables/désactivables individuellement — avancé au MVP à la demande du produit, plutôt que reporté en Phase 2 comme prévu initialement

**Non-Goals:**
- Centre de notifications in-app persistant (Phase 2) — au MVP la notification est uniquement système (push natif)
- Notifications email ou SMS
- Suggestions automatiques de riders/spots à suivre (recommandation)
- Préférences par canal (push vs email) — un seul canal existe au MVP (push), la préférence porte uniquement sur le type

## Decisions

**Tokens push multi-device**
→ Table `push_tokens` (rider_id, token, platform, device_id, created_at, last_used_at). Un rider peut être connecté sur plusieurs appareils ; chaque token reçoit l'envoi. Un token qui échoue de façon définitive (`NotRegistered` FCM / `Unregistered` APNs) est désactivé automatiquement, pas juste ignoré silencieusement.

**Abonnements comme base de ciblage — `spot_follows` (ici) et `rider_follows` (rider-social)**
→ `spot_follows` (rider_id, spot_id, created_at) est introduite par ce change : un rider suit un spot pour être notifié de son statut/places. Elle alimente le `followers count` affiché sur `spot-page` (`spot-core`).

`rider_follows` (follower_id, followed_id, created_at) est définie et possédée par `rider-social` — ce change s'y réfère uniquement pour savoir qui notifier quand un rider suivi crée/annule un event.

Pas de table équivalente pour les events : les destinataires d'une notif d'annulation/modification sont directement les lignes de `event_inscriptions` (voir events-core), pas besoin d'abonnement séparé.

**Types de notifications en config, pas en enum**
→ Cohérent avec le principe déjà appliqué aux disciplines et aux types d'events : `configs/notification-types.json` liste les 4 types MVP (slug, label `{ fr, en, es }`, déclencheur). Ajouter un 5e type en Phase 2 (ex. rappel avant une session) n'exige pas de modification de code, seulement une nouvelle entrée de config + le trigger correspondant.

**Contenu localisé**
→ Le template du message vit dans la config par type (`{ fr, en, es }`), les variables (nom du spot, nom du rider) sont interpolées à l'envoi dans la langue enregistrée du destinataire (voir i18n-core).

**Journalisation**
→ `notification_logs` (id, rider_id, type, payload, status [`sent`/`failed`], sent_at) sert au debug et évite les envois dupliqués (ex. deux triggers sur le même événement de statut).

**Préférences par type, activées par défaut**
→ `notification_preferences` (rider_id, notification_type, enabled). Absence de ligne = activé par défaut, pour ne pas exiger une initialisation massive à la création du compte (une ligne n'est créée que quand le rider désactive explicitement un type). Le service d'envoi vérifie la préférence juste avant l'envoi, par rider et par type — un type désactivé n'empêche pas les autres types d'être envoyés au même rider, ni ce type d'être envoyé aux autres destinataires d'un même événement (ex. les autres followers d'un spot).

**Rappel 30 minutes — job planifié, pas un trigger sur écriture**
→ Contrairement aux autres types (déclenchés par une action : changement de statut, annulation, message...), le rappel n'a pas d'événement d'écriture à observer — il dépend uniquement du temps qui passe. Un job planifié tourne à intervalle court (ex. toutes les 5 minutes), sélectionne les events/sessions dont `starts_at` tombe dans les 25 à 35 prochaines minutes (fenêtre de tolérance pour ne rien rater entre deux exécutions), et envoie le rappel à chaque inscrit/participant n'en ayant pas déjà reçu un pour cet événement (flag ou entrée dans `notification_logs` pour éviter les doublons si le job se chevauche).

## Risks / Trade-offs

- [Tokens obsolètes] Devices désinstallés sans déconnexion propre → désactivation automatique sur échec d'envoi FCM/APNs (`NotRegistered`/`Unregistered`), pas de nettoyage périodique nécessaire au MVP
- [Spam de notifications] Un rider très suivi qui crée/annule beaucoup d'events → pas de rate limiting au MVP, à surveiller en Phase 2 si signalé
- [Dépendance à rider-social] Ce change dépend désormais de `rider-social` pour résoudre les destinataires du trigger "rider suivi crée/annule un event" → les deux changes doivent être implémentés dans le bon ordre (rider-social avant, ou en parallèle avec coordination sur le schéma `rider_follows`)
- [Notification dupliquée multi-device] Un rider avec 2 devices reçoit 2 notifications pour le même événement → accepté au MVP (comportement standard push), pas de déduplication cross-device
- [Rappel manqué ou dupliqué] Un job qui tourne toutes les 5 minutes peut, en cas d'incident, sauter une exécution (rappel manqué) ou se chevaucher avec la précédente (rappel dupliqué) → fenêtre de tolérance de 10 minutes pour limiter les rappels manqués, marquage en base pour éviter les doublons

## Open Questions

- Faut-il un endpoint `GET /notifications` (historique in-app) au MVP ou est-ce strictement Phase 2 ? Le proposal actuel n'en parle pas — supposé Phase 2 pour l'instant.
