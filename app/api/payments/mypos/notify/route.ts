import { NextResponse } from "next/server";
import { cancelIfUnpaid, confirmPaidFromNotify } from "@/lib/booking-payments";
import { getProviderByName } from "@/lib/payments";
import { verifyNotification, type MyPosProvider } from "@/lib/payments/mypos";

// myPOS meldt een geslaagde betaling (IPCPurchaseNotify) of een terugdraaiing
// (IPCPurchaseRollback). Het antwoord moet precies "OK" zijn; anders draait
// myPOS de betaling terug. Daarom alleen "OK" als de boeking echt is verwerkt.
const ok = () => new NextResponse("OK", { status: 200, headers: { "Content-Type": "text/plain" } });

export async function POST(request: Request) {
  const provider = getProviderByName("mypos") as MyPosProvider | null;
  const form = await request.formData().catch(() => null);
  if (!provider || !form) return new NextResponse("Bad request", { status: 400 });

  const { valid, fields } = verifyNotification(form, provider.publicCert);
  if (!valid) {
    console.error("myPOS-melding met ongeldige handtekening genegeerd");
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const orderId = fields.OrderID ?? "";
  try {
    if (fields.IPCmethod === "IPCPurchaseNotify") {
      if (fields.Currency !== "EUR") return new NextResponse("Wrong currency", { status: 400 });
      const amountCents = Math.round(Number(fields.Amount) * 100);
      const status = await confirmPaidFromNotify(orderId, amountCents);
      return status === "paid" ? ok() : new NextResponse("Not processed", { status: 400 });
    }
    if (fields.IPCmethod === "IPCPurchaseRollback") {
      await cancelIfUnpaid(orderId);
      return ok();
    }
    return ok();
  } catch (error) {
    console.error("myPOS-melding verwerken mislukt", error);
    return new NextResponse("Error", { status: 500 });
  }
}
