-- Phase C: optional idea metadata (domain, stage, type)
alter table public.ideas
  add column if not exists metadata jsonb not null default '{}'::jsonb;

create index if not exists ideas_metadata_idx on public.ideas using gin (metadata);
