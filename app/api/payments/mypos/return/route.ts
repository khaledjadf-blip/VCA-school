import { NextResponse } from "next/server";
import { cancelIfUnpaid, syncPayment } from "@/lib/booking-payments";
import { localizePath } from "@/lib/localized-path";

// myPOS stuurt de klant terug (soms met een POST). Wij sturen door naar de
// bedankpagina; bij afbreken wordt de plek direct vrijgegeven.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function handle(request: Request) {
  const url = new URL(request.url);
  // myPOS stuurt het ordernummer ook mee in het formulier (OrderID); handig als de link zonder ?b= terugkomt.
  const form = request.method === "POST" ? await request.formData().catch(() => null) : null;
  const orderId = String(form?.get("OrderID") ?? url.searchParams.get("OrderID") ?? "");
  const bookingId = UUID.test(url.searchParams.get("b") ?? "") ? (url.searchParams.get("b") as string) : orderId;
  console.info("myPOS-terugkeer", { method: request.method, result: url.searchParams.get("r"), hasBookingParam: url.searchParams.has("b"), formFields: form ? Array.from(form.keys()) : [], bookingId });
  const lang = url.searchParams.get("lang") === "ar" ? "ar" : "nl";
  if (!UUID.test(bookingId)) return NextResponse.redirect(new URL(localizePath("/inschrijven", lang), url), 303);

  if (url.searchParams.get("r") === "afgebroken") {
    try {
      await cancelIfUnpaid(bookingId);
    } catch (error) {
      console.error("Afgebroken betaling verwerken mislukt", error);
    }
  } else {
    // Klant komt terug na betalen: meteen bij myPOS navragen, ook als de melding (nog) niet binnen is.
    try {
      await syncPayment(bookingId);
    } catch (error) {
      console.error("Betaalstatus na terugkeer controleren mislukt", error);
    }
  }
  return NextResponse.redirect(new URL(`${localizePath("/boeken/bedankt", lang)}?b=${bookingId}`, url), 303);
}

export const GET = handle;
export const POST = handle;
