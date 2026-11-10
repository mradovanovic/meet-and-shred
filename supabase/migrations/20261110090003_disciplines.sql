-- Disciplines : table extensible (jamais un enum). Ajouter une discipline = insérer une ligne.
-- Voir docs/DATA-MODEL.md et openspec/changes/rider-profile.

create table public.disciplines (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  label            jsonb not null,            -- { fr, en, es }
  icon             text,
  category         text not null,             -- moto | velo | eau | snow | urban
  equipment_schema jsonb not null default '[]'::jsonb
);

alter table public.disciplines enable row level security;

-- Référentiel public (lecture pour tous). Écriture réservée (super_admin / service_role) — ajoutée avec user_roles.
create policy "disciplines_select_all"
  on public.disciplines for select
  using (true);

-- Disciplines qu'un rider pratique (N:N), plafonné à 5.
create table public.rider_disciplines (
  rider_id      uuid not null references public.profiles (id) on delete cascade,
  discipline_id uuid not null references public.disciplines (id) on delete cascade,
  level         text,
  primary key (rider_id, discipline_id)
);

alter table public.rider_disciplines enable row level security;

create policy "rider_disciplines_select"
  on public.rider_disciplines for select
  to authenticated
  using (true);

create policy "rider_disciplines_insert_self"
  on public.rider_disciplines for insert
  to authenticated
  with check (auth.uid() = rider_id);

create policy "rider_disciplines_delete_self"
  on public.rider_disciplines for delete
  to authenticated
  using (auth.uid() = rider_id);

-- Plafond de 5 disciplines par rider, vérifié côté serveur.
create or replace function public.enforce_rider_discipline_limit()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.rider_disciplines where rider_id = new.rider_id) >= 5 then
    raise exception 'Un rider ne peut pas avoir plus de 5 disciplines';
  end if;
  return new;
end;
$$;

create trigger rider_discipline_limit
  before insert on public.rider_disciplines
  for each row execute function public.enforce_rider_discipline_limit();

-- Seed des disciplines de base (labels FR/EN/ES).
insert into public.disciplines (slug, label, category) values
  ('mx',          '{"fr":"Motocross","en":"Motocross","es":"Motocross"}',           'moto'),
  ('dh',          '{"fr":"Descente VTT","en":"Downhill MTB","es":"Descenso"}',       'velo'),
  ('enduro_moto', '{"fr":"Enduro moto","en":"Enduro moto","es":"Enduro moto"}',      'moto'),
  ('enduro_vtt',  '{"fr":"Enduro VTT","en":"Enduro MTB","es":"Enduro MTB"}',         'velo'),
  ('supermoto',   '{"fr":"Supermotard","en":"Supermoto","es":"Supermoto"}',          'moto'),
  ('piste',       '{"fr":"Moto piste","en":"Track","es":"Circuito"}',                'moto'),
  ('kite',        '{"fr":"Kite","en":"Kite","es":"Kite"}',                           'eau'),
  ('wake',        '{"fr":"Wakeboard","en":"Wakeboard","es":"Wakeboard"}',            'eau'),
  ('skate',       '{"fr":"Skateboard","en":"Skateboard","es":"Skate"}',             'urban'),
  ('ski',         '{"fr":"Ski","en":"Ski","es":"Esquí"}',                            'snow'),
  ('snow',        '{"fr":"Snowboard","en":"Snowboard","es":"Snowboard"}',            'snow'),
  ('dirt',        '{"fr":"DirtJump","en":"DirtJump","es":"DirtJump"}',               'velo')
on conflict (slug) do nothing;
