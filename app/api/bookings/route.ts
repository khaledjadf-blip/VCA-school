import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const bookingSchema = z.object({
  sessionId: z.string().uuid(),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(8).max(30),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthPlace: z.string().trim().min(2).max(100),
  company: z.string().trim().max(150).optional(),
  notes: z.string().trim().max(1000).optional(),
  // Onzichtbaar veld: echte bezoekers laten dit leeg, spam-bots niet.
  website: z.string().max(0).optional()
});

function age(birthDate: string) {
  const born = new Date(`${birthDate}T00:00:00Z`);
  if (Number.isNaN(born.getTime())) return -1;
  const now = new Date();
  let years = now.getUTCFullYear() - born.getUTCFullYear();
  const beforeBirthday =
    now.getUTCMonth() < born.getUTCMonth() ||
    (now.getUTCMonth() === born.getUTCMonth() && now.getUTCDate() < born.getUTCDate());
  if (beforeBirthday) years -= 1;
  return years;
}

const errorMessages: Record<string, { status: number; error: string }> = {
  SESSION_FULL: { status: 409, error: "full" },
  SESSION_CLOSED: { status: 409, error: "closed" },
  SESSION_NOT_FOUND: { status: 404, error: "not_found" }
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });

  const parsed = bookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const input = parsed.data;

  const years = age(input.birthDate);
  if (years < 16 || years > 100) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });

  const { data, error } = await getSupabase().rpc("create_booking", {
    p_session_id: input.sessionId,
    p_first_name: input.firstName,
    p_last_name: input.lastName,
    p_email: input.email.toLowerCase(),
    p_phone: input.phone,
    p_birth_date: input.birthDate,
    p_birth_place: input.birthPlace,
    p_company: input.company || null,
    p_notes: input.notes || null
  });

  if (error) {
    const known = Object.keys(errorMessages).find((code) => error.message?.includes(code));
    if (known) return NextResponse.json({ ok: false, error: errorMessages[known].error }, { status: errorMessages[known].status });
    console.error("Boeking aanmaken mislukt", error);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }

  // Fase 5: hier wordt de Mollie-betaling aangemaakt en krijgt de klant een checkoutUrl.
  return NextResponse.json({ ok: true, bookingId: (data as { id: string }).id });
}
