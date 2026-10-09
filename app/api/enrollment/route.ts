import { NextResponse } from "next/server";
import { rowsToHtml, sendEmail } from "@/lib/send-email";

const typeLabels: Record<string, string> = {
  course: "Cursus met examen",
  exam: "Alleen examenregistratie",
  company: "Bedrijfsgroep / incompany"
};

export async function POST(request: Request) {
  try {
    const p = await request.json();
    await sendEmail({
      subject: `Nieuwe inschrijving: ${p.course ?? "cursus"} – ${p.name ?? "onbekend"}`,
      replyTo: p.email,
      html: rowsToHtml("Nieuwe inschrijving via website", [
        ["Naam", p.name],
        ["E-mail", p.email],
        ["Telefoon", p.phone],
        ["Cursus", p.course],
        ["Type aanmelding", typeLabels[p.type] ?? p.type],
        ["Aantal kandidaten", p.candidates],
        ["Voorkeursdatum", p.preferredDate],
        ["Beschikbare dagen", p.availableDays],
        ["Taalondersteuning", p.languageSupport],
        ["Extra informatie", p.notes]
      ])
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inschrijving versturen mislukt", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
