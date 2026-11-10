-- Rôles élevés (rider est implicite pour tout profil). Attribués par le super_admin.
create table public.user_roles (
  user_id uuid not null references public.profiles (id) on delete cascade,
  role    text not null check (role in ('spot_manager', 'organisateur', 'super_admin')),
  primary key (user_id, role)
);

alter table public.user_roles enable row level security;

-- Lecture : soi-même uniquement. Écriture : service_role / super_admin (aucune policy client → deny).
create policy "user_roles_select_self"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

-- Helper : l'utilisateur courant détient-il ce rôle ?
-- SECURITY DEFINER pour lire user_roles indépendamment de la RLS.
create or replace function public.has_role(target_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = target_role
  );
$$;
