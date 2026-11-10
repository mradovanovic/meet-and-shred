-- Spots : fiche commune privé (établissement géré) / public (libre, gratuit).
-- Voir docs/DATA-MODEL.md et openspec/changes/spot-core.

create table public.spots (
  id            uuid primary key default gen_random_uuid(),
  category      text not null check (category in ('private', 'public')),
  name          text not null,
  description   text,
  location      geography(Point, 4326) not null,
  created_by    uuid references public.profiles (id) on delete set null,
  is_published  boolean not null default false,
  current_status text,                 -- slug de statut (config), privé only
  max_capacity  int,                   -- privé only
  current_count int not null default 0,
  payment_url   text,                  -- privé only (lien externe)
  created_at    timestamptz not null default now()
);
create index spots_location_gix on public.spots using gist (location);

create table public.spot_disciplines (
  spot_id       uuid not null references public.spots (id) on delete cascade,
  discipline_id uuid not null references public.disciplines (id) on delete cascade,
  is_primary    boolean not null default false,
  primary key (spot_id, discipline_id)
);

create table public.spot_managers (
  spot_id uuid not null references public.spots (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role    text not null default 'admin' check (role in ('owner', 'admin')),
  primary key (spot_id, user_id)
);

create table public.spot_inscriptions (
  id         uuid primary key default gen_random_uuid(),
  spot_id    uuid not null references public.spots (id) on delete cascade,
  rider_id   uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (spot_id, rider_id)
);

-- Un spot public est publié immédiatement ; un spot privé attend la validation super_admin.
create or replace function public.set_spot_published()
returns trigger language plpgsql as $$
begin
  new.is_published := (new.category = 'public');
  return new;
end;
$$;
create trigger spots_set_published
  before insert on public.spots
  for each row execute function public.set_spot_published();

-- ── RLS ──
alter table public.spots enable row level security;
alter table public.spot_disciplines enable row level security;
alter table public.spot_managers enable row level security;
alter table public.spot_inscriptions enable row level security;

-- Aide : l'utilisateur gère-t-il ce spot (créateur, manager, ou super_admin) ?
create or replace function public.can_manage_spot(target_spot uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select
    public.has_role('super_admin')
    or exists (select 1 from public.spots s where s.id = target_spot and s.created_by = auth.uid())
    or exists (select 1 from public.spot_managers m where m.spot_id = target_spot and m.user_id = auth.uid());
$$;

-- spots : lecture si publié, ou si on le gère.
create policy "spots_select" on public.spots for select to authenticated
  using (is_published or public.can_manage_spot(id));
create policy "spots_insert_public" on public.spots for insert to authenticated
  with check (created_by = auth.uid() and category = 'public');
create policy "spots_insert_private" on public.spots for insert to authenticated
  with check (created_by = auth.uid() and category = 'private' and public.has_role('spot_manager'));
create policy "spots_update" on public.spots for update to authenticated
  using (public.can_manage_spot(id)) with check (public.can_manage_spot(id));
create policy "spots_delete" on public.spots for delete to authenticated
  using (created_by = auth.uid() or public.has_role('super_admin'));

-- spot_disciplines : lecture ouverte ; écriture par le gestionnaire du spot.
create policy "spot_disc_select" on public.spot_disciplines for select to authenticated using (true);
create policy "spot_disc_write" on public.spot_disciplines for all to authenticated
  using (public.can_manage_spot(spot_id)) with check (public.can_manage_spot(spot_id));

-- spot_managers : lecture ouverte ; écriture par le créateur/super_admin.
create policy "spot_mgr_select" on public.spot_managers for select to authenticated using (true);
create policy "spot_mgr_write" on public.spot_managers for all to authenticated
  using (
    public.has_role('super_admin')
    or exists (select 1 from public.spots s where s.id = spot_id and s.created_by = auth.uid())
  )
  with check (
    public.has_role('super_admin')
    or exists (select 1 from public.spots s where s.id = spot_id and s.created_by = auth.uid())
  );

-- spot_inscriptions : lecture ouverte ; inscription/désinscription par soi-même.
create policy "spot_insc_select" on public.spot_inscriptions for select to authenticated using (true);
create policy "spot_insc_insert_self" on public.spot_inscriptions for insert to authenticated with check (rider_id = auth.uid());
create policy "spot_insc_delete_self" on public.spot_inscriptions for delete to authenticated using (rider_id = auth.uid());
