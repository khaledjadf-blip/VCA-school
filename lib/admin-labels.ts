import { courses } from "@/lib/data";
import type { Booking, CourseSession } from "@/lib/supabase";

export const DEFAULT_LOCATION = "U-Trechter, Veilinghavenkade 4-8, 3521 AK Utrecht";

export const courseTitle = (slug: string) => courses.find((c) => c.slug === slug)?.title ?? slug;

export const sessionStatusLabels: Record<CourseSession["status"], string> = {
  open: "Open",
  closed: "Gesloten",
  cancelled: "Geannuleerd"
};

export const bookingStatusLabels: Record<Booking["status"], string> = {
  pending: "Wacht op betaling",
  paid: "Betaald",
  failed: "Mislukt",
  canceled: "Geannuleerd",
  expired: "Verlopen",
  refunded: "Terugbetaald"
};

// Moet gelijk zijn aan de 30 minuten in create_booking (supabase/schema.sql).
export const PENDING_HOLD_MS = 30 * 60_000;

/** Een openstaande betaling ouder dan 30 minuten is verlopen (de klant is afgehaakt). */
export function effectiveStatus(b: Pick<Booking, "status" | "created_at">, now = Date.now()): Booking["status"] {
  return b.status === "pending" && now - new Date(b.created_at).getTime() > PENDING_HOLD_MS ? "expired" : b.status;
}

/** Niet afgeronde aanmelding: nooit betaald (verlopen, mislukt of afgebroken bij het betalen). */
export function isUnfinished(b: Pick<Booking, "status" | "paid_at">) {
  return b.status === "expired" || b.status === "failed" || (b.status === "canceled" && !b.paid_at);
}
