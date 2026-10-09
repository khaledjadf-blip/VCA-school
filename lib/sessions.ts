// Komende cursusdata ophalen voor de publieke website (alleen server).
import "server-only";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

// Moet gelijk zijn aan de 30 minuten in create_booking (supabase/schema.sql).
const PENDING_HOLD_MINUTES = 30;

export type PublicSession = {
  id: string;
  courseSlug: string;
  startsAt: string;
  endsAt: string | null;
  location: string;
  language: string;
  priceCents: number;
  seatsLeft: number;
  status: "open" | "closed";
};

type SessionRow = {
  id: string;
  course_slug: string;
  starts_at: string;
  ends_at: string | null;
  location: string;
  language: string;
  price_cents: number;
  seats_total: number;
  seats_taken: number;
  status: "open" | "closed";
};

const PUBLIC_COLUMNS = "id, course_slug, starts_at, ends_at, location, language, price_cents, seats_total, seats_taken, status";

// Vrije plekken = totaal − betaald − openstaande betalingen (laatste 30 min).
async function withSeatsLeft(sessions: SessionRow[]): Promise<PublicSession[]> {
  if (!sessions.length) return [];
  const holdSince = new Date(Date.now() - PENDING_HOLD_MINUTES * 60_000).toISOString();
  const { data: pending, error } = await getSupabase()
    .from("bookings")
    .select("session_id")
    .in("session_id", sessions.map((s) => s.id))
    .eq("status", "pending")
    .gt("created_at", holdSince);
  if (error) throw error;

  const held = new Map<string, number>();
  for (const row of pending ?? []) held.set(row.session_id, (held.get(row.session_id) ?? 0) + 1);

  return sessions.map((s) => ({
    id: s.id,
    courseSlug: s.course_slug,
    startsAt: s.starts_at,
    endsAt: s.ends_at,
    location: s.location,
    language: s.language,
    priceCents: s.price_cents,
    seatsLeft: Math.max(0, s.seats_total - s.seats_taken - (held.get(s.id) ?? 0)),
    status: s.status
  }));
}

export async function getUpcomingSessions(courseSlug: string): Promise<PublicSession[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { data, error } = await getSupabase()
      .from("course_sessions")
      .select(PUBLIC_COLUMNS)
      .eq("course_slug", courseSlug)
      .in("status", ["open", "closed"])
      .gt("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(12);
    if (error) throw error;
    return await withSeatsLeft((data ?? []) as SessionRow[]);
  } catch (error) {
    console.error("Cursusdata ophalen mislukt", error);
    return [];
  }
}

/** Alle komende data (alle cursussen) voor de inschrijfpagina. */
export async function getAllUpcomingSessions(): Promise<PublicSession[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { data, error } = await getSupabase()
      .from("course_sessions")
      .select(PUBLIC_COLUMNS)
      .in("status", ["open", "closed"])
      .gt("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(100);
    if (error) throw error;
    return await withSeatsLeft((data ?? []) as SessionRow[]);
  } catch (error) {
    console.error("Cursusdata ophalen mislukt", error);
    return [];
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Eén datum voor de boekingspagina; null als hij niet (meer) bestaat of geannuleerd is. */
export async function getPublicSession(id: string): Promise<PublicSession | null> {
  if (!UUID.test(id) || !isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getSupabase()
      .from("course_sessions")
      .select(PUBLIC_COLUMNS)
      .eq("id", id)
      .in("status", ["open", "closed"])
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const [session] = await withSeatsLeft([data as SessionRow]);
    return session;
  } catch (error) {
    console.error("Cursusdatum ophalen mislukt", error);
    return null;
  }
}
