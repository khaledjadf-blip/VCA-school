// Algemene betaal-interface, zodat een andere aanbieder (bijv. myPOS) later
// kan worden toegevoegd zonder de rest van de site te wijzigen.

export type PaymentStatus = "open" | "pending" | "authorized" | "paid" | "failed" | "canceled" | "expired";

export type CreatePaymentInput = {
  bookingId: string;
  amountCents: number;
  description: string;
  redirectUrl: string;
  webhookUrl: string | null;
};

export type ProviderPayment = {
  id: string;
  status: PaymentStatus;
  amountCents: number;
  bookingId: string | null;
  checkoutUrl: string | null;
};

export interface PaymentProvider {
  readonly name: string;
  createPayment(input: CreatePaymentInput): Promise<ProviderPayment>;
  /** Haalt de echte status altijd opnieuw op bij de aanbieder (nooit vertrouwen op de webhook-inhoud). */
  getPayment(id: string): Promise<ProviderPayment>;
}
