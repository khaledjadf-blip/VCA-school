import { NextResponse } from "next/server";
import { syncPayment } from "@/lib/booking-payments";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Gebruikt door de bedankpagina. Controleert de betaling ook zelf bij Mollie,
// voor het geval de webhook (nog) niet is aangekomen.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id) || !isSupabaseConfigured()) return NextResponse.json({ status: "unknown" }, { status: 404 });

  const { data: booking } = await getSupabase()
    .from("bookings")
    .select("status, payment_id, session_id, course_sessions(course_slug)")
    .eq("id", id)
    .maybeSingle();
  if (!booking) return NextResponse.json({ status: "unknown" }, { status: 404 });

  let status: string = booking.status;
  if (status === "pending" && booking.payment_id) {
    try {
      status = (await syncPayment(booking.payment_id)) ?? status;
    } catch (error) {
      console.error("Betaalstatus controleren mislukt", error);
    }
  }

  const session = booking.course_sessions as unknown as { course_slug: string } | null;
  return NextResponse.json(
    { status, sessionId: booking.session_id, courseSlug: session?.course_slug ?? null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
