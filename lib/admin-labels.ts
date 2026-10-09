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
  canceled: "Afgebroken",
  expired: "Verlopen",
  refunded: "Terugbetaald"
};
