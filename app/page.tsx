import Link from "next/link";
import { ArrowRight, CalendarCheck, Languages, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoriesSection, ClassesPreview, ConversionBand, FeaturedCourses, SignupPath, WhySection } from "@/components/home-sections";
import { visualAssets } from "@/lib/visual-assets";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-white">
        <div
          className="absolute inset-0 scale-[1.01] bg-cover bg-[center_82%] opacity-95"
          style={{ backgroundImage: `url('${visualAssets.heroPractice.src}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/5" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 h-40 w-60 bg-white/35 blur-md" aria-hidden="true" />
        <div className="section-shell relative z-10 grid gap-8 py-12 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl border border-border bg-white/95 p-5 shadow-sm sm:p-6">
            <p className="official-kicker mb-4">VCA inschrijven zonder gedoe</p>
            <h1 className="official-display font-extrabold">
              Haal uw VCA-certificaat met een duidelijke route.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Kies VCA Basis, VCA VOL, VIL-VCU, heftruck of alleen examen. Wij helpen met de juiste cursus, beschikbare datum, locatie en examenregistratie.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="accent"><Link href="/contact">Schrijf u direct in <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/advies">Doe de keuzehulp</Link></Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href="/kennisbank#ssvv" className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-2 underline-offset-4 hover:underline"><ShieldCheck className="h-4 w-4 text-green-700" /> SSVV-erkende examens</Link>
              <span className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-2"><CalendarCheck className="h-4 w-4 text-primary" /> Data in overleg mogelijk</span>
              <span className="inline-flex items-center gap-2 border border-border bg-secondary px-3 py-2"><Languages className="h-4 w-4 text-accent" /> Arabische begeleiding mogelijk</span>
            </div>
          </div>
          <aside className="border border-[#d8e2ec] bg-white/95 p-5 shadow-sm">
            <p className="official-kicker">Aanmelden</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">Wat wilt u regelen?</h2>
            <div className="mt-5 grid gap-0 border-y border-border bg-white">
              {[
                ["Ik wil mij inschrijven", "/contact"],
                ["Ik weet niet welke VCA ik nodig heb", "/advies"],
                ["Ik zoek een beschikbare datum", "/klassen"],
                ["Ik wil meerdere medewerkers aanmelden", "/contact"]
              ].map(([title, href]) => (
                <Link key={title} href={href} className="flex items-center justify-between border-b border-border px-3 py-3 font-semibold text-primary underline-offset-4 last:border-b-0 hover:underline">
                  {title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm leading-6 text-muted-foreground"><Phone className="h-4 w-4 text-accent" /> Bel of WhatsApp planning: <strong className="text-foreground"><bdi dir="ltr">+31 6 87258236</bdi></strong></p>
            <p className="mt-3 border-l-4 border-accent bg-white p-3 text-sm font-semibold text-primary" dir="rtl">الدعم باللغة العربية ممكن عند التسجيل والتخطيط.</p>
          </aside>
        </div>
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

