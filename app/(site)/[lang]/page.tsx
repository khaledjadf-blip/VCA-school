import Link from "@/components/localized-link";
import { Button } from "@/components/ui/button";
import { CategoriesSection, ConversionBand, FeaturedCourses, WhySection } from "@/components/home-sections";
import { visualAssets } from "@/lib/visual-assets";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-[#0e2a4a]">
        <img
          src={visualAssets.heroPractice.src}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_60%]"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,32,58,0.94)_0%,rgba(10,32,58,0.82)_45%,rgba(10,32,58,0.35)_100%)]" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-6 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-10 lg:py-24">
          <div className="max-w-3xl text-white">
            <p className="official-kicker mb-3 text-[#ff9a5c] sm:mb-4">VCA inschrijven zonder omweg</p>
            <h1 className="official-display font-extrabold text-white">
              Uw kortste route naar VCA-certificering.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8">
              Kies VCA Basis, VCA VOL, VIL-VCU, heftruck of alleen examen. Wij helpen met de juiste cursus, beschikbare datum, locatie en examenregistratie.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              <Button asChild size="lg" variant="accent"><Link href="/inschrijven">Schrijf u direct in</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/70 bg-transparent text-white hover:bg-white hover:text-primary"><Link href="/advies">Doe de keuzehulp</Link></Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold sm:mt-8 sm:gap-3">
              <Link href="/kennisbank#ssvv" className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-white backdrop-blur-sm underline-offset-4 hover:underline">SSVV-erkende examens</Link>
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-white backdrop-blur-sm">Data in overleg mogelijk</span>
              <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-white backdrop-blur-sm">Arabische begeleiding mogelijk</span>
            </div>
          </div>
          <aside className="route-board border border-white/20 bg-white p-4 shadow-2xl sm:p-5">
            <div className="border-b border-border pb-4">
              <p className="official-kicker">Route control</p>
              <h2 className="mt-2 text-2xl font-bold text-primary">Wat wilt u regelen?</h2>
            </div>
            <div className="mt-5 grid gap-0 border-y border-border bg-white">
              {[
                ["Ik wil mij inschrijven", "/contact"],
                ["Ik weet niet welke VCA ik nodig heb", "/advies"],
                ["Ik wil meerdere medewerkers aanmelden", "/contact"]
              ].map(([title, href]) => (
                <Link key={title} href={href} className="route-board-link block border-b border-border px-3 py-3 font-semibold text-primary underline-offset-4 last:border-b-0 hover:underline">
                  {title}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Bel of WhatsApp planning: <strong className="text-foreground"><bdi dir="ltr">+31 6 16717342</bdi></strong></p>
            <p className="mt-3 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">Rotterdam · Utrecht · Amsterdam · Incompany</p>
            <p className="mt-3 rounded-lg bg-secondary p-3 text-sm font-semibold text-primary" dir="rtl">الدعم باللغة العربية ممكن عند التسجيل والتخطيط.</p>
          </aside>
        </div>
      </section>
      <CategoriesSection />
      <FeaturedCourses />
      <WhySection />
      <ConversionBand />
    </>
  );
}

