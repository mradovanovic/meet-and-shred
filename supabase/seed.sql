-- Données de démo pour visualiser la carte (spots publics + discipline principale).
-- Idempotent (ne réinsère pas un spot du même nom). Données jetables de dev.

do $$
declare
  demo jsonb := '[
    {"name":"Dune du Pyla — kite",            "lng":-1.2102, "lat":44.5890, "disc":"kite"},
    {"name":"Fontainebleau — Enduro VTT",     "lng": 2.6600, "lat":48.4100, "disc":"enduro_vtt"},
    {"name":"Skatepark Lyon Gerland",         "lng": 4.8200, "lat":45.7250, "disc":"skate"},
    {"name":"Terrain MX du Loiret",           "lng": 2.0400, "lat":47.9000, "disc":"mx"},
    {"name":"Les 2 Alpes — snow",             "lng": 6.1240, "lat":45.0100, "disc":"snow"},
    {"name":"Cable Park Wake — Toulouse",     "lng": 1.4440, "lat":43.6045, "disc":"wake"}
  ]'::jsonb;
  r jsonb;
  new_id uuid;
begin
  for r in select * from jsonb_array_elements(demo) loop
    if not exists (select 1 from public.spots where name = r->>'name') then
      insert into public.spots (category, name, location)
      values (
        'public',
        r->>'name',
        ST_SetSRID(ST_MakePoint((r->>'lng')::float8, (r->>'lat')::float8), 4326)::geography
      )
      returning id into new_id;

      insert into public.spot_disciplines (spot_id, discipline_id, is_primary)
      select new_id, d.id, true
      from public.disciplines d
      where d.slug = r->>'disc';
    end if;
  end loop;
end $$;
