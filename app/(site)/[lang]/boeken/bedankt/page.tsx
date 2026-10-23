import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentResult } from "@/components/payment-result";

export const metadata: Metadata = {
  title: "Betaling",
  robots: { index: false, follow: false }
};

type Props = { searchParams: Promise<{ b?: string }> };

export default async function PaymentReturnPage({ searchParams }: Props) {
  const { b } = await searchParams;
  if (!b || !/^[0-9a-f-]{36}$/i.test(b)) notFound();

  return (
    <section className="section-shell max-w-2xl py-16">
      <PaymentResult bookingId={b} />
    </section>
  );
}
