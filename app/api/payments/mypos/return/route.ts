import { NextResponse } from "next/server";
import { cancelIfUnpaid } from "@/lib/booking-payments";

// myPOS stuurt de klant terug (soms met een POST). Wij sturen door naar de
// bedankpagina; bij afbreken wordt de plek direct vrijgegeven.
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function handle(request: Request) {
  const url = new URL(request.url);
  const bookingId = url.searchParams.get("b") ?? "";
  if (!UUID.test(bookingId)) return NextResponse.redirect(new URL("/inschrijven", url), 303);

  if (url.searchParams.get("r") === "afgebroken") {
    try {
      await cancelIfUnpaid(bookingId);
    } catch (error) {
      console.error("Afgebroken betaling verwerken mislukt", error);
    }
  }
  return NextResponse.redirect(new URL(`/boeken/bedankt?b=${bookingId}`, url), 303);
}

export const GET = handle;
export const POST = handle;
