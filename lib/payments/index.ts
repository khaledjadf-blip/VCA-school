import "server-only";
import { MollieProvider } from "@/lib/payments/mollie";
import { MyPosProvider } from "@/lib/payments/mypos";
import type { PaymentProvider } from "@/lib/payments/types";

/**
 * Actieve betaalaanbieder: myPOS als MYPOS_CONFIG_PACK is ingesteld, anders Mollie.
 * Met PAYMENT_PROVIDER=mollie of =mypos kan dit expliciet gekozen worden.
 */
export function getPaymentProvider(): PaymentProvider | null {
  const choice = process.env.PAYMENT_PROVIDER?.trim().toLowerCase();
  const myposPack = process.env.MYPOS_CONFIG_PACK;
  const mollieKey = process.env.MOLLIE_API_KEY;

  if (myposPack && choice !== "mollie") return new MyPosProvider(myposPack, process.env.MYPOS_TEST_MODE === "true");
  if (mollieKey && choice !== "mypos") return new MollieProvider(mollieKey);
  return null;
}

/** Aanbieder bij een bestaande boeking (een oude Mollie-boeking blijft via Mollie lopen). */
export function getProviderByName(name: string | null): PaymentProvider | null {
  if (name === "mypos" && process.env.MYPOS_CONFIG_PACK) {
    return new MyPosProvider(process.env.MYPOS_CONFIG_PACK, process.env.MYPOS_TEST_MODE === "true");
  }
  if (name === "mollie" && process.env.MOLLIE_API_KEY) return new MollieProvider(process.env.MOLLIE_API_KEY);
  return null;
}

/** Basis-URL van de site voor terugkeer- en webhook-links. */
export function siteUrl(request: Request) {
  return (process.env.SITE_URL ?? new URL(request.url).origin).replace(/\/$/, "");
}

/**
 * Webhook-URL voor de betaalaanbieder. Mollie kan geen localhost bereiken.
 * Op Vercel-previews met "Deployment Protection" is een bypass-sleutel nodig
 * (Vercel → Settings → Deployment Protection → Protection Bypass for Automation).
 */
export function webhookUrl(base: string, path: string) {
  if (/\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(base)) return null;
  const url = new URL(path, base);
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (bypass && process.env.VERCEL_ENV === "preview") url.searchParams.set("x-vercel-protection-bypass", bypass);
  return url.toString();
}
