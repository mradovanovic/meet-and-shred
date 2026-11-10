-- Messagerie directe 1:1 (rider-social, DM texte). Voir docs/DATA-MODEL.md.
create table public.direct_messages (
  id           uuid primary key default gen_random_uuid(),
  sender_id    uuid not null references public.profiles (id) on delete cascade,
  recipient_id uuid not null references public.profiles (id) on delete cascade,
  body         text not null,
  created_at   timestamptz not null default now(),
  read_at      timestamptz
);
create index direct_messages_pair_idx on public.direct_messages (sender_id, recipient_id, created_at);
create index direct_messages_recipient_idx on public.direct_messages (recipient_id, created_at);

alter table public.direct_messages enable row level security;

-- Lecture : seulement les messages où je suis émetteur ou destinataire.
create policy "dm_select_mine" on public.direct_messages for select to authenticated
  using (sender_id = auth.uid() or recipient_id = auth.uid());
-- Envoi : uniquement en mon nom.
create policy "dm_insert_self" on public.direct_messages for insert to authenticated
  with check (sender_id = auth.uid());
-- Mise à jour (marquer lu) : par le destinataire.
create policy "dm_update_recipient" on public.direct_messages for update to authenticated
  using (recipient_id = auth.uid()) with check (recipient_id = auth.uid());
