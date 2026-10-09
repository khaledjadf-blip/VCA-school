import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking-form";
import { SessionSummary } from "@/components/upcoming-sessions";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";
import { getPublicSession } from "@/lib/sessions";

type Props = { params: Promise<{ id: string }> };

// Vrije plekken moeten altijd actueel zijn.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cursusdatum boeken",
  robots: { index: false, follow: true }
};

export default async function BookingPage({ params }: Props) {
  const { id } = await params;
  const session = await getPublicSession(id);
  if (!session) notFound();
  const course = courses.find((c) => c.slug === session.courseSlug);
  if (!course) notFound();

  const bookable = session.status === "open" && session.seatsLeft > 0 && new Date(session.startsAt) > new Date();

  return (
    <>
      <section className="border-b border-border bg-card py-12">
        <div className="section-shell">
          <p className="official-kicker">Boeken</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{course.title}</h1>
          <Link href={`/cursussen/${course.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            Andere datum kiezen
          </Link>
        </div>
      </section>
      <section className="section-shell grid gap-8 py-12 lg:grid-cols-[1fr_380px] lg:items-start">
        {bookable ? (
          <BookingForm sessionId={session.id} />
        ) : (
          <div className="official-card p-6">
            <h2 className="text-2xl font-bold">Deze datum is vol</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Kies een andere datum of neem contact met ons op.</p>
            <Button asChild variant="accent" className="mt-5">
              <Link href={`/cursussen/${course.slug}`}>Bekijk andere data</Link>
            </Button>
          </div>
        )}
        <SessionSummary session={session} courseTitle={course.title} />
      </section>
    </>
  );
}
