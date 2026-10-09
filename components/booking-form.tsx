"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const bookingSchema = z.object({
  firstName: z.string().trim().min(1, "Vul uw voornaam in."),
  lastName: z.string().trim().min(1, "Vul uw achternaam in."),
  email: z.string().trim().email("Vul een geldig e-mailadres in."),
  phone: z.string().trim().min(8, "Vul een telefoonnummer in."),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Vul uw geboortedatum in."),
  birthPlace: z.string().trim().min(2, "Vul uw geboorteplaats in."),
  company: z.string().optional(),
  notes: z.string().optional(),
  website: z.string().optional()
});

type BookingValues = z.infer<typeof bookingSchema>;

const serverErrors: Record<string, string> = {
  full: "Deze datum is helaas net vol geraakt. Kies een andere datum.",
  closed: "Voor deze datum kan niet meer geboekt worden. Kies een andere datum.",
  not_found: "Deze datum bestaat niet meer. Kies een andere datum.",
  invalid: "Controleer uw gegevens. Let op: u moet minstens 16 jaar zijn."
};
const genericError = "Boeken is niet gelukt. Probeer het opnieuw of bel/WhatsApp ons:";

function FieldError({ children }: { children?: string }) {
  return children ? <p className="mt-1 text-sm text-destructive">{children}</p> : null;
}

export function BookingForm({ sessionId }: { sessionId: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) });
  const errors = form.formState.errors;

  async function submit(values: BookingValues) {
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, sessionId })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        setError(body.error ?? "server");
        return;
      }
      if (body.checkoutUrl) {
        window.location.href = body.checkoutUrl;
        return;
      }
      setDone(true);
    } catch {
      setError("server");
    }
  }

  if (done) {
    return (
      <div role="status" className="official-card p-6">
        <h2 className="text-2xl font-bold">Uw boeking is ontvangen</h2>
        <p className="mt-3 leading-7 text-muted-foreground">Bedankt! We hebben uw gegevens ontvangen en nemen snel contact met u op.</p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="official-card grid gap-4 p-6" noValidate>
      <h2 className="text-2xl font-bold">Uw gegevens</h2>
      <p className="text-sm text-muted-foreground">Vul uw naam in zoals op uw identiteitsbewijs. Deze gegevens zijn nodig voor de registratie van uw diploma.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold">Voornaam<Input {...form.register("firstName")} className="mt-1" autoComplete="given-name" /></label>
          <FieldError>{errors.firstName?.message}</FieldError>
        </div>
        <div>
          <label className="text-sm font-semibold">Achternaam<Input {...form.register("lastName")} className="mt-1" autoComplete="family-name" /></label>
          <FieldError>{errors.lastName?.message}</FieldError>
        </div>
        <div>
          <label className="text-sm font-semibold">Geboortedatum<Input type="date" {...form.register("birthDate")} className="mt-1" autoComplete="bday" /></label>
          <FieldError>{errors.birthDate?.message}</FieldError>
        </div>
        <div>
          <label className="text-sm font-semibold">Geboorteplaats<Input {...form.register("birthPlace")} className="mt-1" /></label>
          <FieldError>{errors.birthPlace?.message}</FieldError>
        </div>
        <div>
          <label className="text-sm font-semibold">E-mail<Input type="email" {...form.register("email")} className="mt-1" autoComplete="email" /></label>
          <FieldError>{errors.email?.message}</FieldError>
        </div>
        <div>
          <label className="text-sm font-semibold">Telefoon<Input type="tel" {...form.register("phone")} className="mt-1" autoComplete="tel" /></label>
          <FieldError>{errors.phone?.message}</FieldError>
        </div>
      </div>

      <label className="text-sm font-semibold">Bedrijf (optioneel)<Input {...form.register("company")} className="mt-1" autoComplete="organization" /></label>
      <label className="text-sm font-semibold">Opmerking (optioneel)<Textarea {...form.register("notes")} className="mt-1" rows={3} /></label>

      {/* Spam-val: verborgen voor bezoekers. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" {...form.register("website")} /></label>
      </div>

      {error ? (
        <p role="alert" className="border-l-4 border-destructive bg-secondary p-3 text-sm font-semibold">
          {serverErrors[error] ?? <>{genericError} <bdi dir="ltr">+31 6 16717342</bdi></>}
        </p>
      ) : null}

      <Button type="submit" variant="accent" size="lg" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Bezig..." : "Plek reserveren"}
      </Button>
    </form>
  );
}
