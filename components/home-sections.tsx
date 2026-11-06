import { Check } from "lucide-react";
import Link from "@/components/localized-link";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { CategoryFlipCard } from "@/components/course-card";
import { CourseImage } from "@/components/course-image";
import { CoursePrice } from "@/components/course-price";
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
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {categories.map((category) => (
          <div key={category.title} className="min-w-[82%] snap-start sm:min-w-[62%] lg:min-w-[31%]">
            <CategoryFlipCard {...category} />
          </div>
        ))}
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
            <p className="official-kicker">Onze cursussen</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Snel inschrijven voor de juiste cursus.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/cursussen">Alle cursussen</Link>
          </Button>
        </div>
        <div className="course-lanes grid gap-0 border-y border-border bg-white">
          {courses.map((course) => (
            <article key={course.slug} className="grid gap-4 border-b border-border p-5 last:border-b-0 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <CourseImage image={course.image} className="hidden aspect-[4/3] w-36 shrink-0 sm:block" />
                <div>
                  <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{course.summary}</p>
                  <p className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                    <span className="route-chip">{course.duration}</span>
                    <span className="route-chip route-chip-accent"><CoursePrice priceExVat={course.priceExVat} priceFrom={course.priceFrom} /></span>
                  </p>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/cursussen/${course.slug}#komende-data`}>Inschrijven</Link>
              </Button>
            </article>
          ))}
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
          <Link href="/inschrijven">Inschrijving starten</Link>
        </Button>
      </div>
    </section>
  );
}

export function WhySection() {
  const items = [
    ["Erkende examens en correcte CDR-registratie", "Na slagen wordt uw diploma geregistreerd, zodat een werkgever het direct kan controleren."],
    ["Docenten met praktijkervaring", "Uitleg met voorbeelden uit bouw, techniek, industrie en logistiek."],
    ["Klasplanning en incompany opties", "Kies een open datum of vraag een training voor uw team op locatie aan."],
    ["Begeleiding in Nederlands en Arabisch mogelijk", "Hulp bij aanmelding, planning en voorbereiding in uw eigen taal."]
  ];
  return (
    <section className="section-shell py-16">
      <div className="grid overflow-hidden border border-border bg-white lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <figure className="relative min-h-[18rem] bg-secondary">
          <img
            src={visualAssets.whyPhoto.src}
            alt={visualAssets.whyPhoto.alt}
            className="absolute inset-0 h-full w-full object-cover object-[50%_10%]"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(10,32,58,0.88),rgba(10,32,58,0))] p-5 pt-16 text-white">
            <p className="text-lg font-bold">Geen kortingsschool, maar een duidelijke certificeringsroute.</p>
          </figcaption>
        </figure>
        <div className="p-6 lg:p-10">
          <p className="official-kicker">Waarom wij</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary">Een opleider die rust, duidelijkheid en resultaat brengt.</h2>
          <ul className="mt-6 grid gap-5">
            {items.map(([title, text]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-accent/10 text-accent">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-bold text-primary">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/over-ons" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
            Lees het verhaal achter de school
          </Link>
        </div>
      </div>
    </section>
  );
}
