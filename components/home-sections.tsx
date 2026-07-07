import Link from "next/link";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { CategoryFlipCard } from "@/components/course-card";
import { categories, courses } from "@/lib/data";
import { visualAssets } from "@/lib/visual-assets";

export function SignupPath() {
  const steps = [
    {
      title: "Kies uw cursus",
      text: "VCA Basis, VCA VOL, VIL-VCU, heftruck of alleen examen. Twijfelt u? De keuzehulp stuurt u naar de juiste route.",
      help: "Wat is VCA?",
      href: "/kennisbank#wat-is-vca"
    },
    {
      title: "Plan datum en locatie",
      text: "Kies een beschikbare klas, geef meerdere voorkeursdagen door of vraag om groepsplanning voor uw bedrijf.",
      help: "Wat betekent SSVV?",
      href: "/kennisbank#ssvv"
    },
    {
      title: "Cursus, examen, registratie",
      text: "U krijgt duidelijke voorbereiding, erkend examen en na slagen correcte registratie of certificaat.",
      help: "Hoe werkt diploma-controle?",
      href: "/kennisbank#cdr"
    }
  ];

  return (
    <section className="border-b border-border bg-secondary">
      <div className="section-shell py-5">
        <div className="traffic-route-strip grid border border-border bg-white md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <article className="route-step p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <h2 className="text-lg font-bold text-primary">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                <Link href={step.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
                  {step.help}
                </Link>
              </article>
              {index < steps.length - 1 && (
                <div className="route-arrow flex items-center justify-center border-y border-border bg-secondary px-5 py-3 md:border-x md:border-y-0">
                  <span className="font-bold text-accent" aria-hidden="true">→</span>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section className="section-shell py-16">
      <div className="traffic-section-heading mb-8 border-b border-border pb-6">
        <p className="official-kicker">Kies uw route</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welke certificering heeft u nodig?</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          De meeste bezoekers zoeken snel zekerheid: ben ik uitvoerend, leidinggevend, uitzenden of praktijkchauffeur? Hieronder staat de snelste ingang.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => <CategoryFlipCard key={category.title} {...category} />)}
      </div>
    </section>
  );
}

export function FeaturedCourses() {
  return (
    <section className="traffic-course-section border-y border-border bg-secondary py-16">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="official-kicker">Meest gekozen</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Snel inschrijven voor de juiste cursus.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/cursussen">Alle cursussen</Link>
          </Button>
        </div>
        <div className="course-lanes grid gap-0 border-y border-border bg-white">
          {courses.slice(0, 3).map((course) => (
            <article key={course.slug} className="grid gap-4 border-b border-border p-5 last:border-b-0 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <div>
                  <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{course.summary}</p>
                  <p className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                    <span className="route-chip">{course.duration}</span>
                    <span className="route-chip route-chip-accent">{course.price}</span>
                  </p>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/contact?course=${encodeURIComponent(course.title)}`}>Inschrijven</Link>
              </Button>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-0 overflow-hidden border border-border bg-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6">
            <p className="official-kicker">Praktijkbeeld</p>
            <h3 className="mt-2 text-2xl font-bold text-primary">Cursus, certificaat en praktijk in een helder beeld.</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Deze combinatie werkt goed voor bezoekers die snel willen zien dat het om echte training, echte certificering en een rustige leeromgeving gaat.
            </p>
          </div>
          <div
            className="min-h-[16rem] bg-cover bg-center"
            style={{ backgroundImage: `url('${visualAssets.forkliftCertificate.src}')` }}
            role="img"
            aria-label={visualAssets.forkliftCertificate.alt}
          />
        </div>
      </div>
    </section>
  );
}

export function ConversionBand() {
  return (
    <section className="conversion-road border-t border-border bg-secondary py-14 text-foreground">
      <div className="section-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Klaar om uw cursusdatum vast te leggen?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Stuur uw aanmelding. Wij controleren cursuskeuze, datum, locatie en eventuele Arabische begeleiding.
          </p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/contact">Inschrijving starten</Link>
        </Button>
      </div>
    </section>
  );
}

export function WhySection() {
  const items = ["Erkende examens en correcte CDR-registratie", "Docenten met praktijkervaring", "Klasplanning en incompany opties", "Begeleiding in Nederlands en Arabisch mogelijk"];
  return (
    <section className="section-shell py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="safety-panel border border-border bg-white p-6">
          <p className="official-kicker">Trainingsomgeving</p>
          <h2 className="mt-2 text-2xl font-bold text-primary">Geen kortingsschool, maar een duidelijke certificeringsroute.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Kandidaten krijgen uitleg, voorbereiding en examenbegeleiding zonder commerciële ruis. De nadruk ligt op slagen, veiligheid, planning en correcte registratie.</p>
          <p className="mt-4 border-l-4 border-accent bg-secondary p-3 text-sm font-semibold text-primary">Arabische ondersteuning kan helpen bij uitleg over aanmelding, planning en voorbereiding.</p>
          <div className="mt-5 overflow-hidden border border-border bg-white">
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url('${visualAssets.hoistCertificate.src}')` }}
              role="img"
              aria-label={visualAssets.hoistCertificate.alt}
            />
          </div>
          <Link href="/over-ons" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
            Lees het verhaal achter de school
          </Link>
        </div>
        <div>
          <p className="official-kicker">Waarom wij</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Een opleider die rust, duidelijkheid en resultaat brengt.</h2>
          <div className="proof-lanes mt-6 grid gap-0 border-y border-border bg-white">
            {items.map((item) => (
              <div key={item} className="border-b border-border p-4 last:border-b-0">
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
