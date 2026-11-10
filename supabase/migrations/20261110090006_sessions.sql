-- Sessions : sorties libres créées par un rider, liées à un spot existant.
-- Pas de capacité, pas de paiement, pas de validation. Voir sessions-core.

create table public.sessions (
  id         uuid primary key default gen_random_uuid(),
  spot_id    uuid not null references public.spots (id) on delete cascade,
  creator_id uuid references public.profiles (id) on delete set null,
  starts_at  timestamptz not null,       -- "en cours" = [starts_at, starts_at + 3h]
  note       text,
  status     text not null default 'active' check (status in ('active', 'cancelled')),
  created_at timestamptz not null default now()
);
create index sessions_starts_at_idx on public.sessions (starts_at);

create table public.session_participants (
  session_id uuid not null references public.sessions (id) on delete cascade,
  rider_id   uuid not null references public.profiles (id) on delete cascade,
  joined_at  timestamptz not null default now(),
  primary key (session_id, rider_id)
);

alter table public.sessions enable row level security;
alter table public.session_participants enable row level security;

-- sessions : lecture ouverte ; création par tout rider ; gestion par le créateur.
create policy "sessions_select" on public.sessions for select to authenticated using (true);
create policy "sessions_insert" on public.sessions for insert to authenticated with check (creator_id = auth.uid());
create policy "sessions_update" on public.sessions for update to authenticated
  using (creator_id = auth.uid()) with check (creator_id = auth.uid());
create policy "sessions_delete" on public.sessions for delete to authenticated using (creator_id = auth.uid());

-- participants : rejoindre / quitter = soi-même.
create policy "session_part_select" on public.session_participants for select to authenticated using (true);
create policy "session_part_insert_self" on public.session_participants for insert to authenticated with check (rider_id = auth.uid());
create policy "session_part_delete_self" on public.session_participants for delete to authenticated using (rider_id = auth.uid());
