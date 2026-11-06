"use client";

import { useState } from "react";
import { BookingForm } from "@/components/booking-form";
import { SessionSummary } from "@/components/upcoming-sessions";
import { certificateOptions, offersCertificateChoice, type CertificateChoice } from "@/lib/certificate";
import type { PublicSession } from "@/lib/sessions";

/** Boekformulier en prijsoverzicht samen, zodat het totaal meeverandert met de certificaatkeuze. */
export function BookingArea({ session, courseTitle }: { session: PublicSession; courseTitle: string }) {
  const [certificate, setCertificate] = useState<CertificateChoice>("digital");
  return (
    <>
      <BookingForm
        sessionId={session.id}
        certificate={certificate}
        onCertificateChange={offersCertificateChoice(session.courseSlug) ? setCertificate : undefined}
      />
      <SessionSummary session={session} courseTitle={courseTitle} extraCents={certificateOptions[certificate].priceCents} />
    </>
  );
}
