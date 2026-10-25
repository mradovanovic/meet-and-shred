## Context

MeetNShred est multi-disciplines — un "spot" peut être un terrain MX, un bike park, un spot kite sur une plage, un cable park wake, une station ski ou un skatepark. Le statut du spot est l'info la plus critique : est-ce rideable maintenant ? L'app ne gère pas les paiements directement au MVP.

Tous les spots ne se ressemblent pas : un terrain MX associatif ou une station de ski sont des **établissements** — quelqu'un les gère, encaisse un tarif, pilote un statut. Une vague ou un sentier d'enduro en pleine nature n'a ni gestionnaire ni tarif — c'est un **spot public**, gratuit, où l'activité se lit via les sessions que les riders y organisent (voir sessions-core) plutôt que via un statut piloté. Cette distinction — spot privé / spot public — structure une bonne partie de ce document.

## Goals / Non-Goals

**Goals:**
- Un spot est privé (établissement, gestionnaire, tarifs, statut piloté) ou public (gratuit, sans gestionnaire, sans statut piloté)
- Statut modifiable en 2 taps depuis le back-office mobile — spots privés uniquement
- Statuts spécifiques par discipline (configs), labels multilingues FR/EN/ES — spots privés uniquement
- Un spot peut couvrir plusieurs disciplines, qu'il soit privé ou public
- Affichage temps réel du statut et des places restantes (privé) ou des sessions à venir (public)
- Fermeture automatique des inscriptions quand capacité atteinte — spots privés uniquement
- Lien de paiement externe configurable (simple URL) — spots privés uniquement
- Un spot privé peut être géré par plusieurs gestionnaires (owner + admins)
- Un spot public peut être soumis par n'importe quel rider, sans passer par le rôle gestionnaire

**Non-Goals:**
- Paiement natif intégré (Phase 3)
- Calendrier d'ouvertures récurrentes (Phase 2)
- Messagerie gestionnaire ↔ rider (Phase 3)
- Validation automatique des spots au MVP (validation manuelle par super admin)

## Decisions

**Spot privé vs spot public**
→ `spots.category` : `private` ou `public`. Un spot privé est un établissement (terrain associatif, station, skatepark commercial...) : il a un gestionnaire, des tarifs, une capacité, un lien de paiement, un statut piloté (voir spot-status). Un spot public est un lieu gratuit sans structure derrière (une vague, un sentier d'enduro, une place publique) : pas de gestionnaire, pas de tarif, pas de capacité, pas de statut piloté — son activité se lit via les sessions que les riders y créent (voir sessions-core). Les deux catégories partagent la même fiche (nom, description, photos, GPS, disciplines), seuls les champs liés à la gestion commerciale et au statut diffèrent.

**Statuts par discipline dans des fichiers de config**
→ Chaque discipline a son propre fichier `configs/spot-statuses/{discipline-slug}.json` définissant la liste des statuts disponibles. Chaque statut a un slug, une couleur de badge, un comportement carte, et un label multilingue `{ fr, en, es }`. Exemples :

```json
// mx.json
[
  { "slug": "open", "color": "green", "label": { "fr": "Ouvert", "en": "Open", "es": "Abierto" }, "visible_on_map": true },
  { "slug": "maintained", "color": "blue", "label": { "fr": "Refait", "en": "Maintained", "es": "Renovado" }, "visible_on_map": true },
  { "slug": "degraded", "color": "orange", "label": { "fr": "Dégradé", "en": "Degraded", "es": "Degradado" }, "visible_on_map": true },
  { "slug": "closed", "color": "red", "label": { "fr": "Fermé", "en": "Closed", "es": "Cerrado" }, "visible_on_map": true },
  { "slug": "destroyed", "color": "black", "label": { "fr": "Détruit", "en": "Destroyed", "es": "Destruido" }, "visible_on_map": false }
]

// ski.json
[
  { "slug": "open", "color": "green", "label": { "fr": "Ouvert", "en": "Open", "es": "Abierto" }, "visible_on_map": true },
  { "slug": "snowy", "color": "blue", "label": { "fr": "Bien enneigé", "en": "Well snowed", "es": "Bien nevado" }, "visible_on_map": true },
  { "slug": "low_snow", "color": "orange", "label": { "fr": "Peu enneigé", "en": "Low snow", "es": "Poca nieve" }, "visible_on_map": true },
  { "slug": "closed", "color": "red", "label": { "fr": "Fermé", "en": "Closed", "es": "Cerrado" }, "visible_on_map": true },
  { "slug": "off_season", "color": "grey", "label": { "fr": "Hors saison", "en": "Off season", "es": "Fuera de temporada" }, "visible_on_map": false }
]
```

Un spot multi-disciplines affiche le statut de sa discipline principale (première discipline listée). Cette section — statuts, config par discipline — ne s'applique qu'aux spots privés ; un spot public n'a pas de statut piloté par un gestionnaire (voir Decisions ci-dessus et Open Questions pour une évolution possible).

**Rôle pour créer un spot privé, soumission libre pour un spot public**
→ Créer un spot **privé** exige le rôle `spot_manager`, attribué manuellement par le super admin — cohérent avec le fait qu'il faudra ensuite le gérer (tarifs, statut, capacité). Créer un spot **public** ne requiert aucun rôle particulier : n'importe quel rider connecté peut soumettre un lieu gratuit (une vague, un spot d'enduro) ; comme il n'y a rien à gérer après coup (pas de tarif, pas de statut), le soumissionnaire ne devient pas "gestionnaire" du spot. Dans les deux cas, la fiche reste non publiée tant que le super admin ne l'a pas validée manuellement — même parcours de modération pour éviter les doublons et le spam, seule la condition de rôle en amont diffère.

**Capacité et inscriptions**
→ Capacité configurable. Quand `current_count >= max_capacity`, les inscriptions se ferment automatiquement. Pas de liste d'attente au MVP.

**Lien paiement = simple URL**
→ Le gestionnaire renseigne une URL (FFM, HelloAsso, PayPal...). L'app ouvre ce lien dans le navigateur.

**Statistiques minimales pour le gestionnaire**
→ Compteur de vues (incrémenté à chaque consultation de la fiche, agrégé par jour pour permettre le calcul sur 30 jours) et total d'inscriptions déjà disponible via `spot_inscriptions`. Rien de plus sophistiqué au MVP (pas de graphique détaillé, pas d'export) — l'objectif est de donner un signal basique d'activité, pas un tableau de bord complet.

## Risks / Trade-offs

- [Spot multi-disciplines] Statut affiché = statut de la discipline principale → Documenter clairement pour les gestionnaires
- [Race condition inscriptions] Deux riders sur la dernière place → Transaction atomique (SELECT FOR UPDATE)
- [Config statuts manquante] Nouvelle discipline sans config → Fallback sur statuts génériques (open / closed)
- [Spot sans gestionnaire] Spots privés orphelins → Super admin peut réaffecter
- [Spot public sans surveillance] Personne ne maintient la fiche à jour (adresse, disciplines) → repose sur le signalement communautaire et l'édition par le super admin ; pas de gestionnaire attitré par design

## Open Questions

- ~~Nom définitif du rôle gestionnaire de spot~~ → **Résolu : `spot_manager`** (il gère sans être forcément propriétaire du lieu ; voir CONTEXT.md)
- Faut-il un statut léger pour les spots publics en Phase 2 (ex : "conditions actuelles" déclaré par la communauté), ou les sessions à venir suffisent-elles comme signal d'activité au MVP ?
