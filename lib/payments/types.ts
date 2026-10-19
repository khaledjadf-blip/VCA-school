// Algemene betaal-interface: Mollie en myPOS werken achter dezelfde functies,
// zodat de rest van de site niet hoeft te weten welke aanbieder actief is.

export type PaymentStatus = "open" | "pending" | "authorized" | "paid" | "failed" | "canceled" | "expired";

export type CreatePaymentInput = {
  bookingId: string;
  amountCents: number;
  description: string;
  /** Terugkeeradres na betalen. */
  redirectUrl: string;
  /** Terugkeeradres als de klant de betaling afbreekt. */
  cancelUrl: string;
  webhookUrl: string | null;
};

export type ProviderPayment = {
  id: string;
  status: PaymentStatus;
  amountCents: number;
  bookingId: string | null;
  checkoutUrl: string | null;
  /**
   * Sommige aanbieders (myPOS) starten de betaling met een formulier (POST)
   * in plaats van een link. De browser verstuurt deze velden naar checkoutUrl.
   */
  checkoutFields?: Record<string, string>;
};

export interface PaymentProvider {
  readonly name: string;
  /**
   * true: een betaling geldt pas als betaald na de ondertekende melding van de
   * aanbieder (myPOS draait de betaling terug als die melding niet lukt).
   */
  readonly confirmsByNotifyOnly: boolean;
  createPayment(input: CreatePaymentInput): Promise<ProviderPayment>;
  /** Haalt de echte status altijd opnieuw op bij de aanbieder (nooit vertrouwen op de webhook-inhoud). */
  getPayment(id: string): Promise<ProviderPayment>;
  /** Volledige terugbetaling van een betaalde betaling. */
  refundPayment(id: string, amountCents: number, description: string): Promise<void>;
}
