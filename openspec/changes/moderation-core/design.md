## Context

MeetNShred laisse riders et gestionnaires publier beaucoup de contenu librement : fiches spot/magasin, events, et désormais des avis (`reviews-core`). Le seul mécanisme de signalement existant (`rider-social`) couvre les comptes riders, pas le contenu. Ce change comble ce trou avec un mécanisme volontairement similaire, pour rester cohérent avec ce qui existe déjà.

## Goals / Non-Goals

**Goals:**
- Signaler un spot, un magasin, un event, ou un avis, avec un motif
- File de modération consultable par le super admin
- Actions de traitement : masquer, supprimer, avertir l'auteur, classer sans suite
- Empêcher les signalements en double d'un même rider sur la même cible

**Non-Goals:**
- Modération automatique / détection de contenu inapproprié par IA
- Suspension de compte automatique après un nombre de signalements (voir Open Questions)
- Notification systématique de l'auteur du contenu signalé (voir Open Questions)
- Fusionner ce mécanisme avec le signalement rider-à-rider de rider-social — les deux restent séparés (cibles de nature différente)

## Decisions

**Colonnes typées nullables, pas un type générique**
→ `content_reports` (spot_id, shop_id, event_id, review_id — tous nullables, exactement un renseigné), le même principe déjà appliqué à `events` (spot_id/shop_id) et `reviews` (spot_id/shop_id/event_id). Reste cohérent avec l'idiome du projet plutôt que d'introduire un type polymorphe générique.

**Distinct du signalement rider-à-rider**
→ `rider-social` (capability `rider-safety`) reste responsable du signalement d'un profil ou d'un message — cas différent car il implique un blocage bidirectionnel entre comptes. `moderation-core` couvre uniquement le contenu (spot, magasin, event, avis), jamais un compte rider directement.

**Actions de modération**
→ Masquer (retire de la carte/recherche/fil sans supprimer, réversible — action par défaut recommandée) ; Supprimer (définitif, réservé aux avis et events, pas aux spots/magasins pour garder une trace/historique — un spot problématique est masqué, pas supprimé) ; Avertir l'auteur (notification, sans toucher au contenu) ; Classer sans suite (signalement non fondé).

**Un signalement actif à la fois par rider et par cible**
→ Évite le spam de signalements répétés sur la même cible par la même personne. Un nouveau signalement du même rider sur la même cible n'est possible qu'une fois le précédent traité.

## Risks / Trade-offs

- [Signalements abusifs] Un concurrent ou un rider mécontent spam de signalements → pas de rate limiting automatique au MVP, le super admin arbitre au cas par cas ; la contrainte "un signalement actif à la fois" limite déjà le spam d'un même rider
- [Contenu supprimé à tort] Suppression définitive d'un avis ou event légitime sur signalement abusif → privilégier le masquage réversible par défaut, réserver la suppression aux cas manifestes
- [File de modération qui déborde] Beaucoup de signalements pour peu de super admins → hors scope produit au MVP (une seule file, pas de priorisation automatique)

## Open Questions

- Faut-il un seuil de signalements qui masque automatiquement un contenu en attendant la revue du super admin, plutôt que d'attendre son intervention manuelle ?
- Faut-il notifier l'auteur du contenu signalé quand une action de modération est prise à son encontre ?
- Faut-il distinguer les motifs de signalement par une liste fermée (ex : "Infos fausses", "Contenu offensant", "Spam") ou laisser un champ libre ?
