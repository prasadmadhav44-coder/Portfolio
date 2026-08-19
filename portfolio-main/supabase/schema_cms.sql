-- ─────────────────────────────────────────────────────────────────────────
-- Portfolio CMS schema — Projects, About, Tech Stack, Experience,
-- Education, Certifications.
--
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New
-- query → paste → Run), on the SAME project already used for the contact
-- form (supabase/schema.sql). Safe to re-run: every statement is
-- idempotent.
--
-- ACCESS MODEL
-- ────────────
-- • Public (anon) role → SELECT only, on every table below. The portfolio
--   is public, so the site itself reads through the anon key.
-- • Only a signed-in ("authenticated") user may INSERT / UPDATE / DELETE.
--   This project has no public sign-up screen anywhere in the code — the
--   only way to become authenticated is to be handed credentials directly
--   in Supabase → Authentication → Users → Add user. Do NOT enable email
--   sign-ups for this project; it's designed for exactly one admin.
-- ─────────────────────────────────────────────────────────────────────────

create extension if not exists pgcrypto;

-- ---------- about (singleton row, id = 1) ----------
create table if not exists public.about_content (
  id          int primary key default 1,
  headline    text not null default '',
  paragraphs  jsonb not null default '[]'::jsonb,   -- string[]
  facts       jsonb not null default '[]'::jsonb,   -- [{ label, value }]
  updated_at  timestamptz not null default now(),
  constraint about_content_singleton check (id = 1)
);

-- ---------- tech stack ----------
create table if not exists public.tech_categories (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.tech_items (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid not null references public.tech_categories(id) on delete cascade,
  name         text not null,
  brand_slug   text,   -- Simple Icons slug (e.g. "python"); blank = generic icon
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists tech_items_category_idx on public.tech_items(category_id);

-- ---------- projects ----------
create table if not exists public.projects (
  id                 text primary key,   -- slug, e.g. "ecommerce-store"
  title              text not null,
  live_url           text,
  github_url         text,
  status             text not null default 'In Progress',
  short_description  text not null default '',
  full_description   text not null default '',
  tags               jsonb not null default '[]'::jsonb,
  features           jsonb not null default '[]'::jsonb,
  challenges         jsonb not null default '[]'::jsonb,
  solutions          jsonb not null default '[]'::jsonb,
  featured           boolean not null default false,
  sort_order         int not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ---------- experience ----------
create table if not exists public.experience (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  company      text not null,
  period       text not null default '',
  location     text not null default '',
  type         text not null default '',
  description  jsonb not null default '[]'::jsonb,  -- string[]
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- ---------- education ----------
create table if not exists public.education (
  id           uuid primary key default gen_random_uuid(),
  degree       text not null,
  institution  text not null,
  period       text not null default '',
  detail       text not null default '',
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- ---------- certifications ----------
create table if not exists public.certifications (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  issuer      text not null,
  cert_date   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security — public read, authenticated write, applied
-- identically across every CMS table.
-- ─────────────────────────────────────────────────────────────────────────
do $$
declare
  t text;
begin
  for t in select unnest(array[
    'about_content', 'tech_categories', 'tech_items',
    'projects', 'experience', 'education', 'certifications'
  ]) loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public_read_%1$s" on public.%1$I;', t);
    execute format(
      'create policy "public_read_%1$s" on public.%1$I for select using (true);', t
    );

    execute format('drop policy if exists "auth_write_%1$s" on public.%1$I;', t);
    execute format(
      'create policy "auth_write_%1$s" on public.%1$I for all ' ||
      'using (auth.role() = ''authenticated'') ' ||
      'with check (auth.role() = ''authenticated'');', t
    );
  end loop;
end $$;

-- Seed the singleton About row so the admin panel always has a row to
-- update rather than needing to handle a missing-row create path.
insert into public.about_content (id) values (1)
  on conflict (id) do nothing;
