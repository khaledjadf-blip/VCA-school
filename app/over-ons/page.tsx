import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { visualAssets } from "@/lib/visual-assets";

export const metadata: Metadata = {
  title: "Over VCA Veilig & Vakkundig",
  description: "Lees het verhaal, de werkwijze en de start vanuit Utrecht van VCA Veilig & Vakkundig B.V."
};

const principles = [
  {
    title: "Rustige uitleg",
    text: "Kandidaten krijgen geen haastige verkooppraat, maar duidelijke uitleg over veilig werken, examenverwachting en voorbereiding."
  },
  {
    title: "Kleine klassen",
    text: "De planning is gericht op overzichtelijke groepen, zodat vragen echt behandeld worden en kandidaten niet verdwijnen in een grote zaal."
  },
  {
    title: "Controleerbare stappen",
    text: "Van cursuskeuze tot examen en registratie: elke stap moet logisch, schriftelijk en navolgbaar zijn voor kandidaat en werkgever."
  },
  {
    title: "Taal en begeleiding",
    text: "Waar nodig helpen we kandidaten extra bij planning, uitleg en voorbereiding, ook met Arabische ondersteuning rondom de aanmelding."
  }
];

const roomPlan = [
  ["Lesruimte", "2 tot 3 rustige klassikale opstellingen met tafels, scherm en examenvoorbereiding."],
  ["Kandidaten", "Individuele kandidaten, kleine groepen en bedrijven die meerdere medewerkers willen aanmelden."],
  ["Utrecht", "De eerste vaste lesbasis wordt vanuit Utrecht ingericht, met ruimte voor planning op afspraak."],
  ["Examenroute", "Voor VCA werken we met erkende examen- en registratiestappen, zodat diploma's later controleerbaar blijven."]
];

const timeline = [
  {
    title: "Start vanuit duidelijke behoefte",
    text: "Veel kandidaten zoeken niet naar de goedkoopste cursus, maar naar zekerheid: welke VCA heb ik nodig, wanneer kan ik terecht en wat gebeurt er na het examen?"
  },
  {
    title: "Utrecht als eerste vaste basis",
    text: "De eerste leslocatie wordt praktisch ingericht: tafels, rustige uitleg, overzichtelijke klassen en een planning die past bij werkende mensen."
  },
  {
    title: "Eerst kwaliteit, daarna groei",
    text: "De school groeit liever vanuit goede begeleiding en nette processen dan vanuit drukke beloftes. Dat past beter bij veiligheidsonderwijs."
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="official-kicker">Over de school</p>
            <h1 className="mt-2 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Een nieuwe VCA-school die vanaf dag één professioneel wil werken.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              VCA Veilig & Vakkundig B.V. wordt opgebouwd voor kandidaten en bedrijven die geen rommelige cursus willen, maar een duidelijke route naar opleiding, examen en registratie.
            </p>
          </div>
          <aside className="official-card p-5">
            <p className="official-kicker">Eerste basis</p>
            <h2 className="mt-2 text-2xl font-bold text-primary">Utrecht</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              De eerste vaste lesomgeving wordt ingericht met rustige klasopstelling, voldoende tafels en ruimte voor 2 tot 3 lesmomenten per planning.
            </p>
            <Button asChild className="mt-5 w-full" variant="accent">
              <Link href="/contact">Plan een cursus</Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-6">
          <div>
            <p className="official-kicker">Het verhaal</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary">Waarom deze school bestaat.</h2>
          </div>
          <div className="grid max-w-4xl gap-5 text-lg leading-8 text-muted-foreground">
            <p>
              In VCA-opleidingen gaat het vaak te snel over prijzen, datums en slagen. Maar voor een kandidaat is de echte vraag meestal simpeler: welke cursus heb ik nodig, kan ik dit halen, en wordt mijn diploma straks goed verwerkt?
            </p>
            <p>
              VCA Veilig & Vakkundig B.V. is daarom opgezet als een rustige, officiële opleidingsroute. Niet als kortingsschool, maar als plek waar kandidaten stap voor stap begrijpen wat zij moeten leren, hoe het examen werkt en wat een werkgever later kan controleren.
            </p>
            <p>
              De eerste focus ligt op Utrecht: een herkenbare lesbasis, kleine groepen, nette tafels, duidelijke instructie en planning die praktisch blijft. Vanuit die basis kan de school groeien zonder de kwaliteit van begeleiding te verliezen.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-16">
        <div className="section-shell">
          <div className="mb-8 border-b border-border pb-6">
            <p className="official-kicker">Werkwijze</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary">Wat kandidaten mogen verwachten.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {principles.map((item) => (
              <article key={item.title} className="official-card p-5">
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr_240px] lg:items-start">
          <div>
            <p className="official-kicker">Lesomgeving</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary">Praktisch ingericht, niet overdreven.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              De klasruimte moet vooral werken: goed zicht, nette tafels, rustige uitleg, herkenbare voorbeelden en een duidelijk moment waarop kandidaten kunnen vragen wat zij nog niet begrijpen.
            </p>
          </div>
          <div className="grid gap-0 border-y border-border bg-white">
            {roomPlan.map(([label, value]) => (
              <div key={label} className="grid gap-2 border-b border-border p-4 last:border-b-0 sm:grid-cols-[160px_1fr]">
                <p className="font-bold text-primary">{label}</p>
                <p className="text-sm leading-6 text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
          <figure className="max-w-[260px] border border-border bg-white p-2 lg:justify-self-end">
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url('${visualAssets.classroomTable.src}')` }}
              role="img"
              aria-label={visualAssets.classroomTable.alt}
            />
          </figure>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-16">
        <div className="section-shell">
          <p className="official-kicker">Opbouw</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary">Hoe de school groeit.</h2>
          <div className="mt-8 grid gap-0 border-y border-border bg-white">
            {timeline.map((item) => (
              <article key={item.title} className="border-b border-border p-5 last:border-b-0">
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="official-card grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="official-kicker">Vertrouwen begint met duidelijkheid</p>
            <h2 className="mt-2 text-3xl font-bold text-primary">Wilt u weten welke cursus past?</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Doe de keuzehulp of stuur een aanmelding. Wij controleren cursus, datum en examenroute voordat de planning definitief wordt.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild variant="accent"><Link href="/advies">Doe de keuzehulp</Link></Button>
            <Button asChild variant="outline"><Link href="/inschrijven">Inschrijven</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
