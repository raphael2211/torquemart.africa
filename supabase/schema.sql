-- =============================================================
-- Torque Mart — Waitlist schema
-- Run this once in your Supabase project's SQL editor
-- (Project → SQL Editor → New query → paste → Run)
-- =============================================================

create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text,                 -- reserved for future use (e.g. "buyer" / "vendor")
  created_at timestamptz not null default now()
);

-- Row Level Security: locked down by default, opened up deliberately below.
alter table public.waitlist enable row level security;

-- Anyone (including signed-out visitors) can add themselves to the waitlist.
create policy "Public can join waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);

-- Note: there is intentionally no public SELECT policy on this table,
-- so email addresses can never be read back through the API.
-- The landing page's live counter instead calls the count-only function
-- below, which never exposes individual rows.

create or replace function public.waitlist_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.waitlist;
$$;

grant execute on function public.waitlist_count() to anon;