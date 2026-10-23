import type { Metadata } from "next";
import { ContactForm, EnrollmentForm } from "@/components/contact-forms";
import { visualAssets } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "Inschrijven voor VCA cursus of examen",
  description: "Schrijf u in voor VCA Basis, VCA VOL, VIL-VCU, heftruck opleiding of SSVV-examen. Kies ook uw voorkeursdatum of beschikbare dagen."
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course } = await searchParams;
  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell">
          <p className="official-kicker">Contact & inschrijven</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Plan uw cursus of examen.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Eerst geeft u door welke cursus u nodig heeft en welke dagen passen. Daarna controleren wij datum, locatie, examen en eventuele taalondersteuning.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex border border-border bg-secondary px-4 py-3 font-bold"><bdi dir="ltr">+31 6 16717342</bdi></span>
            <span className="inline-flex border border-border bg-secondary px-4 py-3 font-bold">SSVV-erkende examens</span>
          </div>
        </div>
      </section>
      <section className="section-shell grid max-w-5xl gap-10 py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_260px] lg:items-start">
          <div>
            <p className="official-kicker">Stap 1</p>
            <h2 className="mt-2 text-3xl font-bold text-primary">Schrijf uzelf of uw team in.</h2>
            <p className="mt-3 text-muted-foreground">
              Kies een cursus, geef het aantal kandidaten door en selecteer een vaste datum of meerdere dagen waarop u beschikbaar bent.
            </p>
            <EnrollmentForm defaultCourse={course} />
          </div>
          <figure className="max-w-[260px] border border-border bg-white p-2 lg:justify-self-end">
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url('${visualAssets.planningTable.src}')` }}
              role="img"
              aria-label={visualAssets.planningTable.alt}
            />
          </figure>
        </div>
        <div className="border-t border-border pt-10">
          <p className="official-kicker">Andere vraag</p>
          <h2 className="mt-2 text-3xl font-bold text-primary">Vraag, klacht of twijfel over de juiste cursus?</h2>
          <p className="mt-3 text-muted-foreground">
            Gebruik dit formulier voor vragen, klachten, bedrijfsplanning of als u eerst advies wilt voordat u inschrijft.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
