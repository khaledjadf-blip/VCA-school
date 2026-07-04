import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, FileCheck2, Languages, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryFlipCard } from "@/components/course-card";
import { categories, classes, courses } from "@/lib/data";

export function SignupPath() {
  const steps = [
    {
      title: "1. Kies uw cursus",
      text: "VCA Basis, VCA VOL, VIL-VCU, heftruck of alleen examen. Twijfelt u? De keuzehulp stuurt u naar de juiste route.",
      icon: ClipboardCheck,
      help: "Wat is VCA?",
      href: "/kennisbank#wat-is-vca"
    },
    {
      title: "2. Plan datum en locatie",
      text: "Kies een beschikbare klas, geef meerdere voorkeursdagen door of vraag om groepsplanning voor uw bedrijf.",
      icon: CalendarDays,
      help: "Wat betekent SSVV?",
      href: "/kennisbank#ssvv"
    },
    {
      title: "3. Cursus, examen, registratie",
      text: "U krijgt duidelijke voorbereiding, erkend examen en na slagen correcte registratie of certificaat.",
      icon: FileCheck2,
      help: "Hoe werkt diploma-controle?",
      href: "/kennisbank#cdr"
    }
  ];

  return (
    <section className="border-b border-border bg-secondary">
      <div className="section-shell py-5">
        <div className="grid border border-border bg-white md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <article className="p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center border border-accent/30 bg-accent/10 text-accent">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-bold text-primary">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                <Link href={step.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
                  {step.help}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center border-y border-border bg-secondary px-5 py-3 md:border-x md:border-y-0">
                  <ArrowRight className="h-5 w-5 text-accent" aria-hidden="true" />
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
      <div className="mb-8 border-b border-border pb-6">
        <p className="official-kicker">Kies uw route</p>
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Welke certificering heeft u nodig?</h2>
          <p className="mt-4 text-muted-foreground">
            De meeste bezoekers zoeken snel zekerheid: ben ik uitvoerend, leidinggevend, uitzenden of praktijkchauffeur? Hieronder staat de snelste ingang.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => <CategoryFlipCard key={category.title} {...category} />)}
      </div>
    </section>
  );
}

export function FeaturedCourses() {
  return (
    <section className="border-y border-border bg-secondary py-16">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="official-kicker">Meest gekozen</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Snel inschrijven voor de juiste cursus.</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/cursussen">Alle cursussen <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-0 border-y border-border bg-white">
          {courses.slice(0, 3).map((course) => (
            <article key={course.slug} className="grid gap-4 border-b border-border p-5 last:border-b-0 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex gap-4">
                <course.icon className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-primary">{course.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{course.summary}</p>
                  <p className="mt-3 text-sm font-semibold">{course.duration} · <span className="text-primary">{course.price}</span></p>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/contact?course=${encodeURIComponent(course.title)}`}>Inschrijven</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClassesPreview() {
  return (
    <section className="section-shell py-16">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="official-kicker">Planning</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Kies een datum of geef meerdere voorkeursdagen door.</h2>
          <p className="mt-4 text-muted-foreground">
            Plan snel een kandidaat of complete ploeg in. Als een klas vol is, kunt u alsnog een voorkeursdag aanvragen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="accent"><Link href="/klassen">Bekijk klassen</Link></Button>
            <Button asChild variant="outline"><Link href="/contact"><Phone className="h-4 w-4" /> Bel planning</Link></Button>
          </div>
        </div>
        <div className="grid gap-0 border-y border-border bg-white">
          {classes.slice(0, 3).map((item) => (
            <div key={`${item.course}-${item.day}`} className="flex flex-col gap-3 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold">{item.course} — {item.day} {item.time}</p>
                <p className="text-sm text-muted-foreground">{item.teacher} · {item.location}</p>
              </div>
              <span className="inline-flex items-center gap-2 border border-accent/20 bg-accent/10 px-3 py-2 text-sm font-bold text-primary">
                <span className={item.spots > 0 ? "h-2.5 w-2.5 rounded-full bg-green-600" : "h-2.5 w-2.5 rounded-full bg-red-600"} />
                {item.spots > 0 ? `${item.spots} plekken vrij` : "vol"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConversionBand() {
  return (
    <section className="border-t border-border bg-secondary py-14 text-foreground">
      <div className="section-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Klaar om uw cursusdatum vast te leggen?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Stuur uw aanmelding. Wij controleren cursuskeuze, datum, locatie en eventuele Arabische begeleiding.
          </p>
        </div>
        <Button asChild variant="accent" size="lg">
          <Link href="/contact">Inschrijving starten <ArrowRight className="h-4 w-4" /></Link>
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
        <div className="border border-border bg-white p-6">
          <p className="official-kicker">Trainingsomgeving</p>
          <h2 className="mt-2 text-2xl font-bold text-primary">Geen kortingsschool, maar een duidelijke certificeringsroute.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Kandidaten krijgen uitleg, voorbereiding en examenbegeleiding zonder commerciële ruis. De nadruk ligt op slagen, veiligheid, planning en correcte registratie.</p>
          <p className="mt-4 flex gap-2 border-l-4 border-accent bg-secondary p-3 text-sm font-semibold text-primary"><Languages className="mt-0.5 h-4 w-4 shrink-0" /> Arabische ondersteuning kan helpen bij uitleg over aanmelding, planning en voorbereiding.</p>
          <Link href="/over-ons" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
            Lees het verhaal achter de school
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div>
          <p className="official-kicker">Waarom wij</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Een opleider die rust, duidelijkheid en resultaat brengt.</h2>
          <div className="mt-6 grid gap-0 border-y border-border bg-white">
            {items.map((item) => (
              <div key={item} className="flex gap-3 border-b border-border p-4 last:border-b-0">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
