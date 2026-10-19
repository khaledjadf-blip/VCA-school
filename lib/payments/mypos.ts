// myPOS Checkout (kaarten, iDEAL, ...) via de IPC API, zonder extra npm-pakket.
// Nodig in Vercel → Settings → Environment Variables:
//   MYPOS_CONFIG_PACK = de "Configuration pack" uit myPOS (Online → winkel → Integration)
//   MYPOS_TEST_MODE   = true alleen voor de myPOS-testomgeving (sandbox-configuratie)
//
// Ondertekening volgens de officiële myPOS SDK: alle waarden in volgorde, met "-"
// gescheiden, base64, daarna RSA-SHA256 met de privésleutel uit het configuratiepakket.
import "server-only";
import { createSign, createVerify } from "node:crypto";
import type { CreatePaymentInput, PaymentProvider, PaymentStatus, ProviderPayment } from "@/lib/payments/types";

const PRODUCTION_URL = "https://www.mypos.com/vmp/checkout/";
const SANDBOX_URL = "https://www.mypos.com/vmp/checkout-test/";
const IPC_VERSION = "1.4";
const SOURCE = "vca-website";

type MyPosConfig = { sid: string; wallet: string; privateKey: string; publicCert: string; keyIndex: string };

export function parseConfigPack(pack: string): MyPosConfig {
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(Buffer.from(pack.trim(), "base64").toString("utf8"));
  } catch {
    throw new Error("MYPOS_CONFIG_PACK is geen geldig configuratiepakket.");
  }
  const config = {
    sid: String(data.sid ?? ""),
    wallet: String(data.cn ?? ""),
    privateKey: String(data.pk ?? ""),
    publicCert: String(data.pc ?? ""),
    keyIndex: String(data.idx ?? "")
  };
  if (!config.sid || !config.wallet || !config.privateKey || !config.publicCert || !config.keyIndex) {
    throw new Error("MYPOS_CONFIG_PACK mist gegevens (sid, cn, pk, pc of idx).");
  }
  return config;
}

function signData(values: string[]) {
  return Buffer.from(values.join("-")).toString("base64");
}

export function signFields(fields: [string, string][], privateKey: string) {
  const signer = createSign("SHA256");
  signer.update(signData(fields.map(([, v]) => v)));
  return signer.sign(privateKey, "base64");
}

export function verifyValues(values: string[], signature: string, publicCert: string) {
  try {
    const verifier = createVerify("SHA256");
    verifier.update(signData(values));
    return verifier.verify(publicCert, signature, "base64");
  } catch {
    return false;
  }
}

/** Controleert een melding van myPOS (velden in ontvangen volgorde, Signature eruit). */
export function verifyNotification(form: FormData, publicCert: string) {
  const values: string[] = [];
  const fields: Record<string, string> = {};
  let signature = "";
  form.forEach((value, key) => {
    const text = String(value);
    if (key === "Signature") signature = text;
    else {
      values.push(text);
      fields[key] = text;
    }
  });
  return { valid: Boolean(signature) && verifyValues(values, signature, publicCert), fields };
}

const euro = (cents: number) => (cents / 100).toFixed(2);
const toCents = (value: unknown) => Math.round(Number(value ?? 0) * 100);

// PaymentStatus van IPCGetPaymentStatus: 1 = gelukt, 2 = in behandeling, 3 = mislukt, 4 = teruggedraaid.
const statusMap: Record<string, PaymentStatus> = { "1": "paid", "2": "pending", "3": "failed", "4": "canceled" };

export class MyPosProvider implements PaymentProvider {
  readonly name = "mypos";
  readonly confirmsByNotifyOnly = true;
  private readonly config: MyPosConfig;
  readonly url: string;

  constructor(configPack: string, testMode: boolean) {
    this.config = parseConfigPack(configPack);
    this.url = testMode ? SANDBOX_URL : PRODUCTION_URL;
  }

  get publicCert() {
    return this.config.publicCert;
  }

  private baseFields(method: string): [string, string][] {
    return [
      ["IPCmethod", method],
      ["IPCVersion", IPC_VERSION],
      ["IPCLanguage", "EN"],
      ["SID", this.config.sid],
      ["WalletNumber", this.config.wallet],
      ["KeyIndex", this.config.keyIndex],
      ["Source", SOURCE]
    ];
  }

  /** Server-naar-server aanroep; het antwoord is door myPOS ondertekend en wordt gecontroleerd. */
  private async call(fields: [string, string][]) {
    const signed: [string, string][] = [...fields, ["OutputFormat", "JSON"]];
    signed.push(["Signature", signFields(signed, this.config.privateKey)]);
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(signed).toString(),
      cache: "no-store"
    });
    const text = await res.text();
    let json: Record<string, unknown>;
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`myPOS fout ${res.status}: ${text.slice(0, 200)}`);
    }
    const signature = String(json.Signature ?? "");
    const values = Object.entries(json)
      .filter(([key, value]) => key !== "Signature" && (value === null || typeof value !== "object"))
      .map(([, value]) => String(value ?? ""));
    if (signature && !verifyValues(values, signature, this.config.publicCert)) {
      throw new Error("myPOS antwoord heeft een ongeldige handtekening.");
    }
    return json;
  }

  async createPayment(input: CreatePaymentInput): Promise<ProviderPayment> {
    // Alleen gewone tekens in omschrijvingen: myPOS ondertekent de exacte tekst.
    const article = input.description.normalize("NFKD").replace(/[^\x20-\x7E]/g, "").replace(/\s+/g, " ").trim().slice(0, 100) || "Cursus";
    const amount = euro(input.amountCents);
    const fields: [string, string][] = [
      ...this.baseFields("IPCPurchase"),
      ["Currency", "EUR"],
      ["Amount", amount],
      ["OrderID", input.bookingId],
      ["URL_OK", input.redirectUrl],
      ["URL_Cancel", input.cancelUrl],
      ["URL_Notify", input.webhookUrl ?? input.redirectUrl],
      ["Note", article],
      ["CartItems", "1"],
      ["Article_1", article],
      ["Quantity_1", "1"],
      ["Price_1", amount],
      ["Amount_1", amount],
      ["Currency_1", "EUR"],
      ["CardTokenRequest", "0"],
      ["PaymentParametersRequired", "3"],
      ["PaymentMethod", "3"]
    ];
    fields.push(["Signature", signFields(fields, this.config.privateKey)]);

    return {
      id: input.bookingId,
      status: "open",
      amountCents: input.amountCents,
      bookingId: input.bookingId,
      checkoutUrl: this.url,
      checkoutFields: Object.fromEntries(fields)
    };
  }

  async getPayment(id: string): Promise<ProviderPayment & { trnref: string | null }> {
    const json = await this.call([...this.baseFields("IPCGetPaymentStatus"), ["OrderID", id]]);
    const found = String(json.Status ?? "") === "0" && json.OrderID !== undefined;
    return {
      id,
      // Onbekende order = klant heeft (nog) niet betaald.
      status: found ? statusMap[String(json.PaymentStatus)] ?? "open" : "open",
      amountCents: toCents(json.Amount),
      bookingId: id,
      checkoutUrl: null,
      trnref: json.IPC_Trnref !== undefined ? String(json.IPC_Trnref) : null
    };
  }

  async refundPayment(id: string, amountCents: number) {
    const payment = await this.getPayment(id);
    if (payment.status !== "paid" || !payment.trnref) throw new Error("myPOS: deze betaling is niet (meer) betaald.");
    const json = await this.call([
      ...this.baseFields("IPCRefund"),
      ["IPC_Trnref", payment.trnref],
      ["OrderID", `${id.slice(0, 8)}-R${Date.now()}`],
      ["Amount", euro(amountCents)],
      ["Currency", "EUR"]
    ]);
    if (String(json.Status ?? "") !== "0") {
      throw new Error(`myPOS terugbetaling geweigerd: ${String(json.StatusMsg ?? json.Status ?? "onbekend")}`);
    }
  }
}
