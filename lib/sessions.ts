// Komende cursusdata ophalen voor de publieke website (alleen server).
import "server-only";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

// Moet gelijk zijn aan de 30 minuten in create_booking (supabase/schema.sql).
const PENDING_HOLD_MINUTES = 30;

export type PublicSession = {
  id: string;
  startsAt: string;
  endsAt: string | null;
  location: string;
  language: string;
  priceCents: number;
  seatsLeft: number;
  status: "open" | "closed";
};

export async function getUpcomingSessions(courseSlug: string): Promise<PublicSession[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = getSupabase();
    const { data: sessions, error } = await supabase
      .from("course_sessions")
      .select("id, starts_at, ends_at, location, language, price_cents, seats_total, seats_taken, status")
      .eq("course_slug", courseSlug)
      .in("status", ["open", "closed"])
      .gt("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(12);
    if (error) throw error;
    if (!sessions?.length) return [];

    // Openstaande betalingen houden tijdelijk een plek vast.
    const holdSince = new Date(Date.now() - PENDING_HOLD_MINUTES * 60_000).toISOString();
    const { data: pending, error: pendingError } = await supabase
      .from("bookings")
      .select("session_id")
      .in("session_id", sessions.map((s) => s.id))
      .eq("status", "pending")
      .gt("created_at", holdSince);
    if (pendingError) throw pendingError;

    const held = new Map<string, number>();
    for (const row of pending ?? []) held.set(row.session_id, (held.get(row.session_id) ?? 0) + 1);

    return sessions.map((s) => ({
      id: s.id,
      startsAt: s.starts_at,
      endsAt: s.ends_at,
      location: s.location,
      language: s.language,
      priceCents: s.price_cents,
      seatsLeft: Math.max(0, s.seats_total - s.seats_taken - (held.get(s.id) ?? 0)),
      status: s.status
    }));
  } catch (error) {
    console.error("Cursusdata ophalen mislukt", error);
    return [];
  }
}
