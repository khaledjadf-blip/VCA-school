import Link from "next/link";
import { ArrowRight, CalendarCheck, Languages, MapPinned, Phone, Route, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesSection, ClassesPreview, ConversionBand, FeaturedCourses, SignupPath, WhySection } from "@/components/home-sections";
import { visualAssets } from "@/lib/visual-assets";

export default function HomePage() {
  return (
    <>
      <section className="traffic-hero relative overflow-hidden border-b border-border bg-white">
        <div
          className="absolute inset-0 scale-[1.01] bg-cover bg-[center_82%] opacity-95"
          style={{ backgroundImage: `url('${visualAssets.heroPractice.src}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.88)_48%,rgba(255,255,255,0.38)_100%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-5 py-7 sm:py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8 lg:py-16">
          <div className="traffic-command-panel max-w-3xl border border-border bg-white/95 p-4 shadow-sm sm:p-6 lg:p-7">
            <p className="official-kicker mb-3 sm:mb-4">VCA inschrijven zonder omweg</p>
            <h1 className="official-display font-extrabold">
              Uw kortste route naar VCA-certificering.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
              Kies VCA Basis, VCA VOL, VIL-VCU, heftruck of alleen examen. Wij helpen met de juiste cursus, beschikbare datum, locatie en examenregistratie.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              <Button asChild size="lg" variant="accent"><Link href="/contact">Schrijf u direct in <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/advies">Doe de keuzehulp</Link></Button>
            </div>
            <div className="hero-trust mt-5 flex flex-wrap gap-2 text-sm font-semibold sm:mt-6 sm:gap-3">
              <Link href="/kennisbank#ssvv" className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-2 underline-offset-4 hover:underline"><ShieldCheck className="h-4 w-4 text-green-700" /> SSVV-erkende examens</Link>
              <span className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-2"><CalendarCheck className="h-4 w-4 text-primary" /> Data in overleg mogelijk</span>
              <span className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-2"><Languages className="h-4 w-4 text-accent" /> Arabische begeleiding mogelijk</span>
            </div>
          </div>
          <aside className="route-board border border-[#d8e2ec] bg-white/95 p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <p className="official-kicker">Route control</p>
                <h2 className="mt-2 text-2xl font-bold text-primary">Wat wilt u regelen?</h2>
              </div>
              <span className="traffic-signal" aria-hidden="true"><span /><span /><span /></span>
            </div>
            <div className="mt-5 grid gap-0 border-y border-border bg-white">
              {[
                ["Ik wil mij inschrijven", "/contact"],
                ["Ik weet niet welke VCA ik nodig heb", "/advies"],
                ["Ik zoek een beschikbare datum", "/klassen"],
                ["Ik wil meerdere medewerkers aanmelden", "/contact"]
              ].map(([title, href]) => (
                <Link key={title} href={href} className="route-board-link flex items-center justify-between border-b border-border px-3 py-3 font-semibold text-primary underline-offset-4 last:border-b-0 hover:underline">
                  <span className="flex items-center gap-3"><Route className="h-4 w-4 text-accent" /> {title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm leading-6 text-muted-foreground"><Phone className="h-4 w-4 text-accent" /> Bel of WhatsApp planning: <strong className="text-foreground"><bdi dir="ltr">+31 6 87258236</bdi></strong></p>
            <p className="mt-3 flex items-center gap-2 bg-primary px-3 py-2 text-sm font-bold text-primary-foreground"><MapPinned className="h-4 w-4 text-accent" /> Rotterdam · Utrecht · Amsterdam · Incompany</p>
            <p className="mt-3 border-l-4 border-accent bg-white p-3 text-sm font-semibold text-primary" dir="rtl">الدعم باللغة العربية ممكن عند التسجيل والتخطيط.</p>
          </aside>
        </div>
        <div className="traffic-road-divider" aria-hidden="true" />
      </section>
      <SignupPath />
      <CategoriesSection />
      <FeaturedCourses />
      <ClassesPreview />
      <WhySection />
      <ConversionBand />
    </>
  );
}

