# Architecture — Meet & Shred

Socle figé par [ADR-0001](../docs/adr/0001-socle-technique-expo-supabase.md) : **Expo** (fronts) + **Supabase** (backend tout-en-un). Pas de serveur maison ; la sécurité vit dans la base via **RLS**.

```mermaid
flowchart LR
    subgraph FRONTS["Fronts"]
        APP["App mobile Expo<br/>(iOS + Android, TS)"]
        BO["Back-office gestionnaire<br/>(web, plus tard)"]
    end

    subgraph SUPA["Backend — Supabase (projet unique, UE/Paris)"]
        AUTH["Auth<br/>email · Google · Facebook · Apple<br/>+ TikTok (OIDC custom)"]
        PGREST["PostgREST<br/>(API auto sur les tables)"]
        EF["Edge Functions (TS)<br/>feed, swipe, RGPD, push"]
        DB[("PostgreSQL + PostGIS<br/>RLS par ligne")]
        STO["Storage<br/>(photos)"]
        RT["Realtime<br/>(events / sessions)"]
    end

    subgraph EXT["Services externes"]
        MAPS["Google Maps API"]
        OAUTH["Google / Apple /<br/>Facebook / TikTok"]
        PUSH["FCM / APNs"]
        PAY["Liens paiement<br/>(FFM, HelloAsso...)"]
    end

    APP -->|supabase-js| AUTH
    APP -->|CRUD via RLS| PGREST
    APP -->|logique métier| EF
    APP -->|abonnements| RT
    APP -->|upload / URLs| STO
    APP -->|rendu carte| MAPS
    APP -.->|ouvre dans navigateur| PAY

    BO -->|supabase-js| PGREST

    PGREST --> DB
    EF --> DB
    RT --- DB
    AUTH <-->|OAuth| OAUTH
    EF -->|notifs| PUSH
    PUSH --> APP
```

## Principes

- **La base EST le backend.** L'app parle à Supabase via `supabase-js` ; PostgREST génère l'API sur les tables ; **RLS** (règles par ligne dans Postgres) remplace un middleware serveur.
- **Logique métier** (feed discipline/distance, swipe, RGPD, orchestration push) → **Edge Functions** (serverless TypeScript, type Lambda).
- **Pas de serveur maison** entre l'app et la base au MVP.
- **Externes** : Google Maps (cartes), providers OAuth, FCM/APNs (push), liens de paiement ouverts dans le navigateur.

## Évolutivité

Montée en charge par paliers incrémentaux : scaling vertical → read replicas → CDN → extraction d'un service dédié (Lambda/Cloud Run) pour une brique chaude. Les Edge Functions sont déjà du serverless. Porte de sortie : la base est du **Postgres standard** (migration par dump/restore). Voir ADR-0001.
