import { NextResponse } from "next/server";
import { syncPayment } from "@/lib/booking-payments";

// Mollie stuurt alleen een betaal-id (id=tr_xxx). De echte status halen we
// zelf op bij Mollie, zodat een nep-melding niets kan bevestigen.
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const id = String(form?.get("id") ?? "");
  if (!id) return new NextResponse("Bad request", { status: 400 });

  try {
    await syncPayment(id);
  } catch (error) {
    // Onbekend of ongeldig id: niets te doen, niet opnieuw laten proberen.
    if (error instanceof Error && /Mollie fout 404|Ongeldig/.test(error.message)) return new NextResponse("OK", { status: 200 });
    console.error("Webhook verwerken mislukt", error);
    // Mollie probeert het later opnieuw.
    return new NextResponse("Error", { status: 500 });
  }
  return new NextResponse("OK", { status: 200 });
}
