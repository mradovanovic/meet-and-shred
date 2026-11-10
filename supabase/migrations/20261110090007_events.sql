-- Events : réservés à un rôle (gestionnaire de spot, organisateur, gestionnaire de magasin).
-- Voir events-core. Les sorties libres sont des sessions (voir sessions-core).

create table public.event_types (
  slug              text primary key,
  label             jsonb not null,              -- { fr, en, es }
  icon              text,
  creator_role      text not null,               -- spot_manager | organisateur | shop_manager
  capacity_required boolean not null default false
);

alter table public.event_types enable row level security;
create policy "event_types_select" on public.event_types for select using (true);

insert into public.event_types (slug, label, creator_role, capacity_required) values
  ('spot_event',  '{"fr":"Event du spot","en":"Spot event","es":"Evento del spot"}', 'spot_manager',  false),
  ('bbq',         '{"fr":"BBQ","en":"BBQ","es":"BBQ"}',                               'spot_manager',  false),
  ('ride_day',    '{"fr":"Ride day","en":"Ride day","es":"Ride day"}',                'spot_manager',  false),
  ('bike_test',   '{"fr":"Test vélo","en":"Bike test","es":"Prueba de bici"}',        'spot_manager',  false),
  ('track_day',   '{"fr":"Roulage / Track day","en":"Track day","es":"Track day"}',   'organisateur',  true),
  ('competition', '{"fr":"Compétition","en":"Competition","es":"Competición"}',        'organisateur',  true),
  ('shop_event',  '{"fr":"Event shop","en":"Shop event","es":"Evento tienda"}',        'shop_manager',  false)
on conflict (slug) do nothing;

create table public.events (
  id            uuid primary key default gen_random_uuid(),
  type_slug     text not null references public.event_types (slug),
  spot_id       uuid references public.spots (id) on delete cascade,
  shop_id       uuid,                              -- FK vers shops (shop-core) ajoutée plus tard
  creator_id    uuid references public.profiles (id) on delete set null,
  title         text not null,
  description   text,
  starts_at     timestamptz not null,
  ends_at       timestamptz,
  max_capacity  int,
  current_count int not null default 0,
  price         numeric,
  currency      text,
  payment_url   text,
  status        text not null default 'active' check (status in ('active', 'cancelled')),
  created_at    timestamptz not null default now(),
  constraint events_spot_xor_shop check ((spot_id is not null) <> (shop_id is not null))
);
create index events_starts_at_idx on public.events (starts_at);

create table public.event_disciplines (
  event_id      uuid not null references public.events (id) on delete cascade,
  discipline_id uuid not null references public.disciplines (id) on delete cascade,
  primary key (event_id, discipline_id)
);

create table public.event_inscriptions (
  event_id  uuid not null references public.events (id) on delete cascade,
  rider_id  uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (event_id, rider_id)
);

alter table public.events enable row level security;
alter table public.event_disciplines enable row level security;
alter table public.event_inscriptions enable row level security;

-- events : lecture ouverte ; création réservée au rôle requis par le type ; gestion par le créateur.
create policy "events_select" on public.events for select to authenticated using (true);
create policy "events_insert" on public.events for insert to authenticated
  with check (
    creator_id = auth.uid()
    and exists (
      select 1 from public.event_types t
      where t.slug = type_slug and public.has_role(t.creator_role)
    )
  );
create policy "events_update" on public.events for update to authenticated
  using (creator_id = auth.uid() or public.has_role('super_admin'))
  with check (creator_id = auth.uid() or public.has_role('super_admin'));
create policy "events_delete" on public.events for delete to authenticated
  using (creator_id = auth.uid() or public.has_role('super_admin'));

-- disciplines de l'event : lecture ouverte ; écriture par le créateur de l'event.
create policy "event_disc_select" on public.event_disciplines for select to authenticated using (true);
create policy "event_disc_write" on public.event_disciplines for all to authenticated
  using (exists (select 1 from public.events e where e.id = event_id and e.creator_id = auth.uid()))
  with check (exists (select 1 from public.events e where e.id = event_id and e.creator_id = auth.uid()));

-- inscriptions : s'inscrire / se désinscrire = soi-même.
create policy "event_insc_select" on public.event_inscriptions for select to authenticated using (true);
create policy "event_insc_insert_self" on public.event_inscriptions for insert to authenticated with check (rider_id = auth.uid());
create policy "event_insc_delete_self" on public.event_inscriptions for delete to authenticated using (rider_id = auth.uid());
