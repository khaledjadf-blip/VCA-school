import type { Metadata } from "next";
import Link from "@/components/localized-link";
import { notFound } from "next/navigation";
import { EnrollmentForm } from "@/components/contact-forms";
import { UpcomingSessions } from "@/components/upcoming-sessions";
import { CourseImage } from "@/components/course-image";
import { CoursePrice } from "@/components/course-price";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";
import { getUpcomingSessions } from "@/lib/sessions";

type Props = { params: Promise<{ slug: string }> };

// Komende data en vrije plekken elke minuut opnieuw ophalen.
export const revalidate = 60;

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  return {
    title: course?.title ?? "Cursus",
    description: course?.summary
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();
  const sessions = await getUpcomingSessions(course.slug);

  return (
    <>
      <section className="border-b border-border bg-card py-12 lg:py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-center">
          <div>
            <p className="official-kicker">{course.category}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{course.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{course.summary}</p>
            <div className="official-card mt-6 flex flex-wrap items-center justify-between gap-4 p-5 sm:max-w-md">
              <div>
                <p className="text-sm text-muted-foreground">Investering</p>
                <p className="text-3xl font-bold text-accent"><CoursePrice priceExVat={course.priceExVat} priceFrom={course.priceFrom} /></p>
                <p className="mt-1 text-xs text-muted-foreground">De btw (21%) wordt bij het betalen opgeteld.</p>
              </div>
              <Button asChild variant="accent">
                <Link href="#komende-data">Schrijf in</Link>
              </Button>
            </div>
          </div>
          <CourseImage image={course.image} className="aspect-[4/3] w-full" priority />
        </div>
      </section>
      <section className="section-shell grid gap-8 py-16 lg:grid-cols-[1fr_420px]">
        <div>
          <UpcomingSessions sessions={sessions} />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="official-card p-4"><p className="font-bold">Leervorm</p><p className="mt-2 text-sm text-muted-foreground">{course.format}</p></div>
            <div className="official-card p-4 md:mt-6"><p className="font-bold">Duur</p><p className="mt-2 text-sm text-muted-foreground">{course.duration}</p></div>
            <div className="official-card p-4"><p className="font-bold">Docent</p><p className="mt-2 text-sm text-muted-foreground">Praktijkexpert</p></div>
          </div>
          <div className="official-card mt-8 p-6">
            <h2 className="text-2xl font-bold">Voor wie is deze opleiding?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{course.audience}</p>
            <h2 className="mt-8 text-2xl font-bold">Wat kunt u verwachten?</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{course.teacher}</p>
            <div className="mt-6 grid gap-3">
              {course.highlights.map((item) => (
                <span key={item} className="font-semibold">{item}</span>
              ))}
            </div>
          </div>
          <div className="official-card mt-8 p-6">
            <div>
              <p className="official-kicker">Na slagen</p>
              <h2 className="mt-2 text-2xl font-bold">Uitslag, diploma en registratie</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Na het examen wordt de uitslag verwerkt volgens de gekozen examenroute. Bij VCA-examens hoort correcte diploma- en registratieverwerking, zodat een kandidaat of werkgever later kan controleren dat het diploma geldig is.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Uitslag controleren", "Diploma verwerken", "Werkgever kan diploma checken"].map((item) => (
                  <span key={item} className="rounded-lg border border-accent/15 bg-accent/[0.07] px-3 py-2 text-sm font-semibold text-primary">{item}</span>
                ))}
              </div>
              <Button asChild className="mt-5" variant="outline">
                <Link href="/kennisbank#cdr">Lees over diploma, geldigheid en CDR</Link>
              </Button>
            </div>
          </div>
          <section className="mt-8">
            <p className="official-kicker">Veelgestelde vragen</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Praktische vragen over {course.title}</h2>
            <div className="mt-5 grid gap-0 border-y border-border bg-white">
              {course.faqs.map((faq) => (
                <article key={faq.question} className="border-b border-border p-5 last:border-b-0">
                  <h3 className="text-lg font-bold text-primary">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
        <EnrollmentForm defaultCourse={course.title} />
      </section>
    </>
  );
}
