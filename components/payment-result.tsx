"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Result = { status: string; sessionId?: string; courseSlug?: string | null };

const MAX_CHECKS = 40; // ± 2 minuten

export function PaymentResult({ bookingId }: { bookingId: string }) {
  const [result, setResult] = useState<Result | null>(null);
  const [checks, setChecks] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let count = 0;

    async function check() {
      count += 1;
      try {
        const res = await fetch(`/api/bookings/${bookingId}/status`, { cache: "no-store" });
        const body: Result = await res.json();
        if (cancelled) return;
        setResult(body);
        setChecks(count);
        if (body.status === "pending" && count < MAX_CHECKS) timer = setTimeout(check, 3000);
      } catch {
        if (!cancelled && count < MAX_CHECKS) timer = setTimeout(check, 3000);
      }
    }
    check();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [bookingId]);

  const status = result?.status;

  if (!result || (status === "pending" && checks < MAX_CHECKS)) {
    return (
      <div role="status" className="official-card p-6">
        <h1 className="text-2xl font-bold">Uw betaling wordt gecontroleerd</h1>
        <p className="mt-3 text-muted-foreground">Een moment geduld, sluit deze pagina niet.</p>
      </div>
    );
  }

  if (status === "paid") {
    return (
      <div role="status" className="official-card p-6">
        <p className="official-kicker">Gelukt</p>
        <h1 className="mt-2 text-3xl font-bold">Uw plek is gereserveerd</h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Bedankt voor uw betaling. U ontvangt binnen enkele minuten een bevestiging per e-mail. Kijk ook in uw spam-map.
        </p>
        <Button asChild variant="outline" className="mt-5">
          <Link href="/">Terug naar home</Link>
        </Button>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div role="status" className="official-card p-6">
        <h1 className="text-2xl font-bold">Uw betaling is nog niet bevestigd</h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Zodra de betaling binnen is, ontvangt u een bevestiging per e-mail. Geen e-mail ontvangen? Bel of WhatsApp ons: <bdi dir="ltr">+31 6 16717342</bdi>.
        </p>
      </div>
    );
  }

  return (
    <div role="alert" className="official-card p-6">
      <h1 className="text-2xl font-bold">De betaling is niet gelukt</h1>
      <p className="mt-3 leading-7 text-muted-foreground">Er is niets afgeschreven. U kunt het opnieuw proberen.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {result.sessionId ? (
          <Button asChild variant="accent">
            <Link href={`/boeken/${result.sessionId}`}>Opnieuw proberen</Link>
          </Button>
        ) : null}
        {result.courseSlug ? (
          <Button asChild variant="outline">
            <Link href={`/cursussen/${result.courseSlug}`}>Andere datum kiezen</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
