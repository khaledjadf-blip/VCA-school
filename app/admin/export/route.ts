import { NextResponse } from "next/server";
import { bookingStatusLabels, courseTitle } from "@/lib/admin-labels";
import { isAdmin } from "@/lib/admin-auth";
import { getSupabase, type Booking, type CourseSession } from "@/lib/supabase";
import { formatDateTimeNl } from "@/lib/time";

export const dynamic = "force-dynamic";

// Puntkomma + BOM zodat Nederlandse Excel de kolommen en accenten goed toont.
function csvCell(value: unknown) {
  let text = String(value ?? "");
  // Voorkom dat Excel invoer als formule uitvoert.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET(request: Request) {
  if (!(await isAdmin())) return NextResponse.redirect(new URL("/admin", request.url));

  const sessionId = new URL(request.url).searchParams.get("sessie");
  const supabase = getSupabase();

  let query = supabase
    .from("bookings")
    .select("*, course_sessions(*)")
    .order("created_at", { ascending: true });
  if (sessionId) query = query.eq("session_id", sessionId);
  const { data, error } = await query;
  if (error) {
    console.error("Export mislukt", error);
    return new NextResponse("Export mislukt", { status: 500 });
  }

  const header = [
    "Cursus", "Cursusdatum", "Locatie", "Voornaam", "Achternaam", "E-mail", "Telefoon",
    "Geboortedatum", "Geboorteplaats", "Bedrijf", "Bedrag (EUR)", "Status", "Betaald op", "Geboekt op", "Opmerking"
  ];
  const rows = (data ?? []).map((row) => {
    const b = row as Booking & { course_sessions: CourseSession | null };
    const s = b.course_sessions;
    return [
      s ? courseTitle(s.course_slug) : "",
      s ? formatDateTimeNl(s.starts_at) : "",
      s?.location ?? "",
      b.first_name,
      b.last_name,
      b.email,
      b.phone,
      b.birth_date ?? "",
      b.birth_place ?? "",
      b.company ?? "",
      (b.amount_cents / 100).toFixed(2).replace(".", ","),
      bookingStatusLabels[b.status] ?? b.status,
      b.paid_at ? formatDateTimeNl(b.paid_at) : "",
      formatDateTimeNl(b.created_at),
      b.notes ?? ""
    ];
  });

  const csv = "﻿" + [header, ...rows].map((r) => r.map(csvCell).join(";")).join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="boekingen-${stamp}.csv"`,
      "Cache-Control": "no-store"
    }
  });
}
