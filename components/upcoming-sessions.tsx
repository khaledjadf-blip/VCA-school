"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import type { PublicSession } from "@/lib/sessions";

const TIME_ZONE = "Europe/Amsterdam";

// Datums en aantallen zijn dynamisch en staan dus niet in het vertaalwoordenboek;
// daarom formatteert dit onderdeel zelf in de gekozen taal.
function formatDate(iso: string, isArabic: boolean) {
  const text = new Intl.DateTimeFormat(isArabic ? "ar-u-nu-latn" : "nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE
  }).format(new Date(iso));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE }).format(new Date(iso));
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
}

function seatsLabel(seatsLeft: number, isArabic: boolean) {
  if (isArabic) return seatsLeft === 1 ? "مقعد واحد متاح" : `${seatsLeft} مقاعد متاحة`;
  return seatsLeft === 1 ? "Nog 1 plek vrij" : `Nog ${seatsLeft} plekken vrij`;
}

export function UpcomingSessions({
  sessions,
  kicker = "Planning",
  title = "Komende data",
  titleHref
}: {
  sessions: PublicSession[];
  kicker?: string;
  title?: string;
  titleHref?: string;
}) {
  const { isArabic } = useLanguage();

  return (
    <div id={titleHref ? undefined : "komende-data"} className="official-card mb-8 scroll-mt-28 p-6">
      <p className="official-kicker">{kicker}</p>
      <h2 className="mt-2 text-2xl font-bold">
        {titleHref ? <Link href={titleHref} className="hover:underline">{title}</Link> : title}
      </h2>

      {sessions.length === 0 ? (
        <p className="mt-3 leading-7 text-muted-foreground">
          Er zijn op dit moment geen data gepland. Neem contact op of vul het formulier in, dan plannen we samen een datum.
        </p>
      ) : (
        <ul className="mt-5 grid gap-0 border-y border-border">
          {sessions.map((session) => {
            const full = session.status === "closed" || session.seatsLeft === 0;
            const time = session.endsAt
              ? `${formatTime(session.startsAt)} – ${formatTime(session.endsAt)}`
              : formatTime(session.startsAt);
            return (
              <li key={session.id} className="grid gap-3 border-b border-border py-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="grid gap-1.5">
                  <p className="flex items-center gap-2 font-bold text-primary">
                    <CalendarDays className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {formatDate(session.startsAt, isArabic)}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" aria-hidden />
                    <span dir="ltr">{time}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    <span dir="ltr">{session.location}</span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
                  <span className="text-lg font-bold text-accent" dir="ltr">{formatPrice(session.priceCents)}</span>
                  {full ? (
                    <span className="border border-border bg-secondary px-2 py-1 text-xs font-bold uppercase text-muted-foreground">Vol</span>
                  ) : (
                    <>
                      <span className={`px-2 py-1 text-xs font-bold ${session.seatsLeft <= 3 ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
                        {seatsLabel(session.seatsLeft, isArabic)}
                      </span>
                      <Button asChild variant="accent" size="sm" className="sm:mt-1">
                        <Link href={`/boeken/${session.id}`}>Boek deze datum</Link>
                      </Button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function SessionSummary({ session, courseTitle }: { session: PublicSession; courseTitle: string }) {
  const { isArabic } = useLanguage();
  const time = session.endsAt
    ? `${formatTime(session.startsAt)} – ${formatTime(session.endsAt)}`
    : formatTime(session.startsAt);
  const full = session.status === "closed" || session.seatsLeft === 0;

  return (
    <aside className="official-card order-first grid gap-3 p-6 lg:order-none">
      <p className="official-kicker">Uw keuze</p>
      <h2 className="text-xl font-bold">{courseTitle}</h2>
      <p className="flex items-center gap-2 font-bold text-primary">
        <CalendarDays className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        {formatDate(session.startsAt, isArabic)}
      </p>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4 shrink-0" aria-hidden />
        <span dir="ltr">{time}</span>
      </p>
      <p className="flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span dir="ltr">{session.location}</span>
      </p>
      <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">Prijs</span>
        <span className="text-2xl font-bold text-accent" dir="ltr">{formatPrice(session.priceCents)}</span>
      </div>
      {full ? null : <p className="text-sm font-semibold text-primary">{seatsLabel(session.seatsLeft, isArabic)}</p>}
    </aside>
  );
}
