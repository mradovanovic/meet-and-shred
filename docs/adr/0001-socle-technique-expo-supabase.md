---
status: accepted
---

# Socle technique : Expo (mobile) + Supabase (backend tout-en-un)

## Contexte

MeetNShred est construit et maintenu par l'IA pour un propriétaire non-technique, qui se repose entièrement sur l'IA pour l'implémentation et l'exploitation. Le critère de décision dominant n'est donc pas « la techno la plus puissante » mais « ce que l'IA peut construire **et maintenir seule**, avec le minimum de code critique fragile qu'un non-technique ne saurait réparer ». Trafic attendu faible au démarrage, montée en charge progressive possible.

## Décision

- **Mobile** : React Native + **Expo** (TypeScript), builds et dépôt sur les stores via **EAS Build/Submit** (pas de Mac requis — le propriétaire est sur Windows), corrections à chaud via EAS Update.
- **Backend** : **Supabase** comme plateforme managée unique — Postgres (+ PostGIS pour le géospatial), Auth (email/mdp + Google + Apple), Storage (photos), Realtime (temps réel / swipe).
- **Logique métier** (feed discipline/distance, swipe, statuts de spot pilotés par config, schémas matériel JSONB) : **Supabase Edge Functions** (TypeScript) + fonctions Postgres, dans le même projet Supabase.
- **fly.io écarté** : aucun serveur séparé au MVP. Le code source et les migrations vivent sur GitHub.

## Alternatives écartées

- **Backend custom (Node/TS sur fly.io + Postgres managé + R2)** : colle aux specs d'origine (JWT/REST maison) et évite le lock-in, mais oblige l'IA à construire et maintenir l'auth, le stockage et l'ops DB — précisément les surfaces les plus sensibles et les plus risquées pour un propriétaire non-technique. Coût mensuel équivalent à faible trafic (~0–40 €), mais coût total de possession supérieur.
- **« Tout sur fly.io »** (intuition « un seul endroit ») : fly est surtout de la compute ; auth/stockage/realtime resteraient du code maison et son Postgres n'est pas managé. Supabase remplit mieux le « un seul endroit » pour cette app.

## Conséquences

- Services externes incontournables dans **toutes** les options, à provisionner par le propriétaire (non automatisable par l'IA) : Google Cloud (Maps + OAuth), Apple Developer (Sign-In + APNs), Google Play Console. À cadrer ultérieurement (reporté).
- Dépendance (lock-in) à Supabase, atténuée par le fait que le cœur de données est du **Postgres standard** (migration par dump/restore possible).
- Points de pression à surveiller à l'échelle : connexions Realtime concurrentes, index géospatiaux PostGIS, bande passante photos (CDN), puis extraction incrémentale d'un service dédié si une brique devient lourde.
