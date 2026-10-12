-- Phase B: ideas + reports (see backend/supabase_schema_documentation.md)
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  title text not null,
  description text,
  file_url text,
  notion_link text,
  status text not null default 'processing',
  submitted_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas (id) on delete cascade,
  tam numeric,
  sam numeric,
  som numeric,
  scorecard jsonb not null,
  roadmap text,
  gtm_strategy text,
  pitch_deck_url text,
  created_at timestamptz not null default now(),
  constraint reports_idea_id_key unique (idea_id)
);

create index if not exists ideas_status_idx on public.ideas (status);
create index if not exists reports_idea_id_idx on public.reports (idea_id);

alter table public.ideas enable row level security;
alter table public.reports enable row level security;

create policy "Service role full access on ideas"
  on public.ideas
  for all
  to service_role
  using (true)
  with check (true);

create policy "Service role full access on reports"
  on public.reports
  for all
  to service_role
  using (true)
  with check (true);
