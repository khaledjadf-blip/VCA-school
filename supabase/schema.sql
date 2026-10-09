-- VCA Veilig & Vakkundig — database voor cursusdata en boekingen.
-- Eenmalig uitvoeren in Supabase → SQL Editor → New query → Run.
-- Het script kan veilig opnieuw worden uitgevoerd.
--
-- Beveiliging: RLS staat aan en er zijn GEEN policies. Daardoor kan alleen
-- de server (met SUPABASE_SERVICE_ROLE_KEY) lezen en schrijven; de publieke
-- anon-key kan niets.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Cursusdata (één rij per lesdag/groep)
-- ---------------------------------------------------------------------------
create table if not exists public.course_sessions (
  id           uuid primary key default gen_random_uuid(),
  course_slug  text not null check (course_slug in (
                 'vca-basis', 'vca-vol', 'vil-vcu',
                 'heftruck-opleiding', 'hoogwerker-opleiding', 'bhv-opleiding')),
  starts_at    timestamptz not null,
  ends_at      timestamptz,
  location     text not null default 'U-Trechter, Veilinghavenkade 4-8, 3521 AK Utrecht',
  language     text not null default 'Nederlands',
  price_cents  integer not null check (price_cents >= 0),
  seats_total  integer not null check (seats_total > 0),
  seats_taken  integer not null default 0 check (seats_taken >= 0),
  status       text not null default 'open' check (status in ('open', 'closed', 'cancelled')),
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);

create index if not exists course_sessions_course_starts_idx
  on public.course_sessions (course_slug, starts_at);

-- ---------------------------------------------------------------------------
-- Boekingen (één rij per deelnemer)
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id                  uuid primary key default gen_random_uuid(),
  session_id          uuid not null references public.course_sessions (id) on delete restrict,
  first_name          text not null,
  last_name           text not null,
  email               text not null,
  phone               text not null,
  birth_date          date,
  birth_place         text,
  company             text,
  notes               text,
  amount_cents        integer not null check (amount_cents >= 0),
  status              text not null default 'pending'
                        check (status in ('pending', 'paid', 'failed', 'canceled', 'expired', 'refunded')),
  payment_provider    text,
  payment_id          text unique,
  seat_counted        boolean not null default false,
  paid_at             timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists bookings_session_idx on public.bookings (session_id);
create index if not exists bookings_status_idx on public.bookings (status);

-- ---------------------------------------------------------------------------
-- updated_at automatisch bijwerken
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists course_sessions_touch on public.course_sessions;
create trigger course_sessions_touch before update on public.course_sessions
  for each row execute function public.touch_updated_at();

drop trigger if exists bookings_touch on public.bookings;
create trigger bookings_touch before update on public.bookings
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Boeking aanmaken met plaatscontrole (atomair).
-- Een openstaande betaling houdt een plek 30 minuten vast.
-- ---------------------------------------------------------------------------
create or replace function public.create_booking(
  p_session_id  uuid,
  p_first_name  text,
  p_last_name   text,
  p_email       text,
  p_phone       text,
  p_birth_date  date default null,
  p_birth_place text default null,
  p_company     text default null,
  p_notes       text default null
)
returns public.bookings
language plpgsql
set search_path = ''
as $$
declare
  v_session public.course_sessions;
  v_held    integer;
  v_booking public.bookings;
begin
  -- Rij vergrendelen zodat twee gelijktijdige boekingen elkaar niet inhalen.
  select * into v_session from public.course_sessions
   where id = p_session_id for update;

  if not found then
    raise exception 'SESSION_NOT_FOUND';
  end if;
  if v_session.status <> 'open' or v_session.starts_at <= now() then
    raise exception 'SESSION_CLOSED';
  end if;

  select count(*) into v_held from public.bookings
   where session_id = p_session_id
     and status = 'pending'
     and created_at > now() - interval '30 minutes';

  if v_session.seats_taken + v_held >= v_session.seats_total then
    raise exception 'SESSION_FULL';
  end if;

  insert into public.bookings (
    session_id, first_name, last_name, email, phone,
    birth_date, birth_place, company, notes, amount_cents
  ) values (
    p_session_id, p_first_name, p_last_name, p_email, p_phone,
    p_birth_date, p_birth_place, p_company, p_notes, v_session.price_cents
  )
  returning * into v_booking;

  return v_booking;
end;
$$;

-- ---------------------------------------------------------------------------
-- Betaling bevestigen (idempotent): telt de plek maar één keer.
-- Geeft true terug als de boeking NU voor het eerst betaald is
-- (dan pas e-mails versturen).
-- ---------------------------------------------------------------------------
create or replace function public.mark_booking_paid(p_booking_id uuid)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_booking public.bookings;
begin
  select * into v_booking from public.bookings
   where id = p_booking_id for update;

  if not found then
    raise exception 'BOOKING_NOT_FOUND';
  end if;
  if v_booking.seat_counted then
    return false;
  end if;

  update public.course_sessions
     set seats_taken = seats_taken + 1
   where id = v_booking.session_id;

  update public.bookings
     set status = 'paid', seat_counted = true, paid_at = now()
   where id = p_booking_id;

  return true;
end;
$$;

-- ---------------------------------------------------------------------------
-- Toegang: alleen de server (service_role).
-- ---------------------------------------------------------------------------
alter table public.course_sessions enable row level security;
alter table public.bookings        enable row level security;

revoke all on public.course_sessions, public.bookings from anon, authenticated;
revoke execute on function public.create_booking(uuid, text, text, text, text, date, text, text, text) from public, anon, authenticated;
revoke execute on function public.mark_booking_paid(uuid) from public, anon, authenticated;
grant  execute on function public.create_booking(uuid, text, text, text, text, date, text, text, text) to service_role;
grant  execute on function public.mark_booking_paid(uuid) to service_role;
