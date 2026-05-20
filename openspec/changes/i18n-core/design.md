## Context

App mobile multi-disciplines ciblant l'Europe (FR, EN, ES en v1). Le multi-langue est transversal — il touche l'UI, les données statiques (configs) et les réponses API. Le contenu utilisateur reste dans sa langue de saisie au MVP.

## Goals / Non-Goals

**Goals:**
- FR, EN, ES dès le v1 — extensible à d'autres langues (DE, NL, IT...) sans refonte
- Données statiques (disciplines, statuts spots, labels champs matériel) localisées
- UI app traduite via i18next
- Préférence langue sur le profil utilisateur, fallback Accept-Language, fallback FR
- Strings manquantes en langue demandée → fallback FR automatique

**Non-Goals:**
- Traduction automatique du contenu utilisateur (bios, descriptions, noms de spots)
- Détection automatique de la langue au premier lancement (on demande à l'inscription)
- RTL (pas de langue RTL dans le scope européen)

## Decisions

**Structure des labels multilingues dans les configs**
→ Objet avec clé ISO 639-1 :
```json
{
  "label": { "fr": "Ouvert", "en": "Open", "es": "Abierto" },
  "description": { "fr": "Le spot est praticable", "en": "The spot is rideable", "es": "El spot está disponible" }
}
```
Toutes les configs (disciplines, statuts, schémas matériel) suivent ce format.

**i18next pour l'UI mobile**
→ Bibliothèque standard React Native / Expo. Fichiers de traduction dans `locales/{fr,en,es}.json`. Namespace par domaine (auth, profil, spots, events...).

**Langue stockée sur le profil utilisateur**
→ Champ `language` (enum : `fr | en | es`, défaut `fr`) sur la table `users`. Sélectionnable à l'inscription et modifiable dans les paramètres.

**API : résolution de la langue**
→ Middleware qui lit dans l'ordre : 1) `user.language` si authentifié, 2) header `Accept-Language`, 3) fallback `fr`. Les labels des données statiques sont retournés dans la langue résolue.

**Extensibilité**
→ Ajouter une langue = ajouter la clé dans les configs + un fichier `locales/{code}.json`. Aucune migration de schéma requise.

## Risks / Trade-offs

- [Traductions manquantes] Config mal renseignée pour une nouvelle langue → Fallback automatique sur FR, loggé côté serveur
- [Contenu utilisateur non traduit] Un rider ES lisant un spot créé en FR → Acceptable au MVP, traduction communautaire envisageable en Phase 3
