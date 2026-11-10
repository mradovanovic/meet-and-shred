-- Profil applicatif, 1-1 avec auth.users (géré par Supabase Auth).
-- Voir docs/DATA-MODEL.md et openspec/changes/auth-registration.

create table public.profiles (
  id                uuid primary key references auth.users (id) on delete cascade,
  first_name        text,
  last_name         text,
  bio               text,
  main_location     geography(Point, 4326),
  terms_accepted_at timestamptz,
  terms_version     text,
  age_confirmed_at  timestamptz,
  created_at        timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Lecture : tout rider connecté. Écriture : soi-même uniquement.
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

create policy "profiles_update_self"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
-- Pas de policy INSERT côté client : la ligne est créée par le trigger ci-dessous.

-- Crée automatiquement le profil à l'inscription, depuis les métadonnées éventuelles.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, terms_accepted_at, terms_version, age_confirmed_at)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    case when (new.raw_user_meta_data ->> 'terms_accepted') = 'true' then now() end,
    new.raw_user_meta_data ->> 'terms_version',
    case when (new.raw_user_meta_data ->> 'age_confirmed') = 'true' then now() end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
