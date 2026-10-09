import type { Metadata } from "next";
import Link from "next/link";
import { UpcomingSessions } from "@/components/upcoming-sessions";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";
import { getAllUpcomingSessions } from "@/lib/sessions";

export const metadata: Metadata = {
  title: "Inschrijven – komende cursusdata",
  description: "Bekijk alle komende data voor VCA Basis, VCA VOL, VIL-VCU, heftruck, hoogwerker en BHV en boek direct online."
};

// Vrije plekken elke minuut opnieuw ophalen.
export const revalidate = 60;

export default async function EnrollPage() {
  const sessions = await getAllUpcomingSessions();
  const groups = courses
    .map((course) => ({ course, sessions: sessions.filter((s) => s.courseSlug === course.slug) }))
    .filter((group) => group.sessions.length > 0);

  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell">
          <p className="official-kicker">Inschrijven</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Kies uw cursusdatum</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Hieronder ziet u alle cursussen met open data. Kies een datum en boek direct online.
          </p>
        </div>
      </section>

      <section className="section-shell max-w-5xl py-12">
        {groups.length === 0 ? (
          <div className="official-card p-6">
            <h2 className="text-2xl font-bold">Er zijn op dit moment geen data gepland</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Laat uw voorkeur achter, dan plannen we samen een datum.</p>
          </div>
        ) : (
          groups.map(({ course, sessions: list }) => (
            <UpcomingSessions
              key={course.slug}
              sessions={list}
              kicker={course.category}
              title={course.title}
              titleHref={`/cursussen/${course.slug}`}
            />
          ))
        )}

        <div className="official-card grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Geen passende datum of met een groep?</h2>
            <p className="mt-2 text-muted-foreground">Vraag een andere datum, alleen examen of een incompany training aan.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/contact">Aanvraag versturen</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
