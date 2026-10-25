# Supabase — backend Meet & Shred

Backend tout-en-un (voir [ADR-0001](../docs/adr/0001-socle-technique-expo-supabase.md)). Tout est versionné ici et appliqué via la CLI Supabase.

## Structure (à remplir au fil de l'eau)

```
supabase/
├── config.toml          # config du projet (CLI Supabase)
├── migrations/          # migrations SQL (schéma, RLS, PostGIS)
│   └── *.sql
└── functions/           # Edge Functions (Deno/TypeScript)
    └── <nom>/index.ts
```

## Conventions

- **Migrations** : une migration = un changement de schéma ou une politique RLS. Nommées par horodatage (généré par `supabase migration new <nom>`).
- **RLS** : chaque table exposée aux clients DOIT avoir des politiques RLS explicites (deny par défaut). La sécurité vit ici, pas dans l'app.
- **Edge Functions** : logique métier qui ne tient pas en une requête PostgREST (feed discipline/distance, suppression/export RGPD, orchestration push).
- **Région** : UE / Paris.

## Premier périmètre (change `auth-registration`)

- Migration `profiles` (FK `auth.users.id`, `first_name`, `last_name`, consentement, âge confirmé) + trigger de création + RLS.
- Config des providers Auth (email, Google, Facebook, Apple ; TikTok en OIDC custom).

> Le projet Supabase réel (URL + clés) est une étape humaine — à créer via `/wizard` avant de brancher l'app.
