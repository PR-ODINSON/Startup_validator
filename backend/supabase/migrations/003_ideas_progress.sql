-- Live pipeline progress for ideas in processing
alter table public.ideas
  add column if not exists progress jsonb not null default '{"completed": [], "current": null}'::jsonb;
