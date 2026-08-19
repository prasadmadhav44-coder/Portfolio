-- ─────────────────────────────────────────────────────────────────────────
-- Portfolio contact form — Supabase schema
--
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New
-- query → paste → Run) for the project you'll point SUPABASE_URL /
-- SUPABASE_SERVICE_ROLE_KEY at. Safe to re-run: every statement is
-- idempotent (IF NOT EXISTS / OR REPLACE).
-- ─────────────────────────────────────────────────────────────────────────

create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  subject      text not null,
  message      text not null,
  ip_address   text,
  -- 'pending' while the API route is attempting delivery, then flipped
  -- to 'sent' or 'failed' once the Resend call resolves.
  status       text not null default 'pending'
               check (status in ('pending', 'sent', 'failed')),

  constraint contact_submissions_name_len   check (char_length(name) <= 100),
  constraint contact_submissions_email_len  check (char_length(email) <= 100),
  constraint contact_submissions_subject_len check (char_length(subject) <= 150),
  constraint contact_submissions_message_len check (char_length(message) <= 2000)
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Row Level Security: locked down completely. The API route talks to
-- Supabase using the SERVICE ROLE key, which bypasses RLS entirely, so
-- no policy needs to (or should) grant access to the anon/public role.
-- This table is never queried from the browser.
alter table public.contact_submissions enable row level security;

-- (Intentionally no policies — service_role bypasses RLS; anon/authenticated
-- get zero access by default with RLS enabled and no matching policy.)
