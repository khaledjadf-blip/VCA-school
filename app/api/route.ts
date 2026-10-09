import { NextResponse } from "next/server";
import { rowsToHtml, sendEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const p = await request.json();
    await sendEmail({
      subject: `Nieuwe vraag via website – ${p.name ?? "onbekend"}`,
      replyTo: p.email,
      html: rowsToHtml("Nieuwe vraag via contactformulier", [
        ["Naam", p.name],
        ["E-mail", p.email],
        ["Telefoon", p.phone],
        ["Bericht", p.message]
      ])
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact versturen mislukt", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
