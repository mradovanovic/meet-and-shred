-- Fonctions RPC exposées via PostgREST. Voir docs/DATA-MODEL.md.

-- Spots autour d'un point, triés par distance, filtrables par disciplines (slugs).
-- SECURITY INVOKER : respecte la RLS (seuls les spots visibles au caller remontent).
create or replace function public.spots_near(
  in_lat         float8,
  in_lng         float8,
  in_radius_m    float8 default 50000,
  in_disciplines text[] default null
)
returns table (
  id                 uuid,
  name               text,
  category           text,
  lng                float8,
  lat                float8,
  distance_m         float8,
  primary_discipline text,
  is_free            boolean
)
language sql
stable
security invoker
set search_path = public, extensions
as $$
  with origin as (
    select ST_SetSRID(ST_MakePoint(in_lng, in_lat), 4326)::geography as g
  )
  select
    s.id,
    s.name,
    s.category,
    ST_X(s.location::geometry) as lng,
    ST_Y(s.location::geometry) as lat,
    ST_Distance(s.location, o.g) as distance_m,
    (
      select d.slug
      from public.spot_disciplines sd
      join public.disciplines d on d.id = sd.discipline_id
      where sd.spot_id = s.id
      order by sd.is_primary desc
      limit 1
    ) as primary_discipline,
    (s.payment_url is null) as is_free
  from public.spots s, origin o
  where ST_DWithin(s.location, o.g, in_radius_m)
    and (
      in_disciplines is null
      or exists (
        select 1
        from public.spot_disciplines sd
        join public.disciplines d on d.id = sd.discipline_id
        where sd.spot_id = s.id and d.slug = any (in_disciplines)
      )
    )
  order by distance_m;
$$;

grant execute on function public.spots_near(float8, float8, float8, text[]) to authenticated, anon;
