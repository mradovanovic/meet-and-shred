## Context

MeetNShred est multi-disciplines — un "spot" peut être un terrain MX, un bike park, un spot kite sur une plage, un cable park wake, une station ski ou un skatepark. Le statut du spot est l'info la plus critique : est-ce rideable maintenant ? L'app ne gère pas les paiements directement au MVP.

## Goals / Non-Goals

**Goals:**
- Statut modifiable en 2 taps depuis le back-office mobile
- Statuts spécifiques par discipline (configs), labels multilingues FR/EN/ES
- Un spot peut couvrir plusieurs disciplines
- Affichage temps réel du statut et des places restantes
- Fermeture automatique des inscriptions quand capacité atteinte
- Lien de paiement externe configurable (simple URL)
- Un spot peut être géré par plusieurs gestionnaires (owner + admins)

**Non-Goals:**
- Paiement natif intégré (Phase 3)
- Calendrier d'ouvertures récurrentes (Phase 2)
- Messagerie gestionnaire ↔ rider (Phase 3)
- Validation automatique des spots au MVP (validation manuelle par super admin)

## Decisions

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

Un spot multi-disciplines affiche le statut de sa discipline principale (première discipline listée).

**Rôle pour créer un spot**
→ Un utilisateur a besoin d'un rôle `spot_manager` (nom provisoire, TBD) pour créer un spot. Ce rôle est attribué manuellement par le super admin. Un rider lambda peut soumettre une demande de création (modération).

**Capacité et inscriptions**
→ Capacité configurable. Quand `current_count >= max_capacity`, les inscriptions se ferment automatiquement. Pas de liste d'attente au MVP.

**Lien paiement = simple URL**
→ Le gestionnaire renseigne une URL (FFM, HelloAsso, PayPal...). L'app ouvre ce lien dans le navigateur.

## Risks / Trade-offs

- [Spot multi-disciplines] Statut affiché = statut de la discipline principale → Documenter clairement pour les gestionnaires
- [Race condition inscriptions] Deux riders sur la dernière place → Transaction atomique (SELECT FOR UPDATE)
- [Config statuts manquante] Nouvelle discipline sans config → Fallback sur statuts génériques (open / closed)
- [Spot sans gestionnaire] Spots orphelins → Super admin peut réaffecter

## Open Questions

- Nom définitif du rôle gestionnaire de spot (`spot_manager` ? `spot_owner` ? `venue_manager` ?)
