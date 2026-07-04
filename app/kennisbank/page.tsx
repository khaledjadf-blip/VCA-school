import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kennisbank VCA, SSVV en CDR",
  description: "Lees wat VCA is, wat SSVV betekent, hoe het Centraal Diploma Register werkt en welke cursus past bij Basis, VOL of VIL-VCU."
};

const articles = [
  {
    id: "wat-is-vca",
    title: "Wat is VCA?",
    body: [
      "VCA staat voor Veiligheid, Gezondheid en Milieu Checklist Aannemers. In de praktijk gebruiken opdrachtgevers VCA om te controleren of medewerkers voldoende kennis hebben van veilig werken op risicovolle werkplekken.",
      "Er zijn verschillende routes. VCA Basis is vooral voor uitvoerende medewerkers. VCA VOL is bedoeld voor leidinggevenden, supervisors, projectleiders en vaak zelfstandigen. VIL-VCU is gericht op intercedenten en uitzendorganisaties."
    ],
    bullets: ["Basis: uitvoerend werk", "VOL: leidinggeven of zelfstandige verantwoordelijkheid", "VIL-VCU: uitzenden en kandidaten plaatsen"]
  },
  {
    id: "ssvv",
    title: "Wat is SSVV?",
    body: [
      "SSVV is de organisatie achter het VCA-stelsel. Voor kandidaten is vooral belangrijk dat een examen volgens de juiste route wordt afgenomen en dat diploma's controleerbaar zijn.",
      "Een opleider kan helpen met voorbereiding, planning en begeleiding. Het examen en de registratie moeten zorgvuldig worden verwerkt, zodat het diploma later aantoonbaar is voor kandidaat en werkgever."
    ],
    bullets: ["Erkend examenproces", "Heldere exameneisen", "Controleerbare diploma's"]
  },
  {
    id: "cdr",
    title: "Diploma, geldigheid en CDR",
    body: [
      "Na slagen wordt het diploma verwerkt en kan registratie plaatsvinden in het Centraal Diploma Register. Daarmee kan later worden gecontroleerd of iemand over een geldig VCA-diploma beschikt.",
      "Voor werkgevers is dit belangrijk bij toegang tot projecten, veiligheidsaudits en het aantonen dat medewerkers voldoende zijn voorbereid."
    ],
    bullets: ["Uitslag na examen", "Diploma verwerken", "Werkgever kan geldigheid controleren"]
  }
];

const vcaTypes = [
  {
    title: "VCA Basis",
    href: "/cursussen/vca-basis",
    forWho: "Voor uitvoerende medewerkers die veilig moeten werken op locaties met risico's.",
    whenNeeded: "U heeft VCA Basis meestal nodig wanneer u zelf werkzaamheden uitvoert in bouw, techniek, industrie, logistiek of op projectlocaties waar opdrachtgevers om VCA vragen.",
    examples: ["Monteur of operator", "Bouw- of productiemedewerker", "Starter die voor het eerst VCA nodig heeft"]
  },
  {
    title: "VCA VOL",
    href: "/cursussen/vca-vol",
    forWho: "Voor leidinggevenden, voormannen, supervisors, projectleiders en vaak ook zzp'ers.",
    whenNeeded: "U kiest VCA VOL wanneer u verantwoordelijkheid draagt voor werkzaamheden, mensen aanstuurt, toezicht houdt of als zelfstandige moet aantonen dat u veiligheid kunt organiseren.",
    examples: ["Voorman of ploegleider", "Projectleider of supervisor", "Zzp'er met eigen verantwoordelijkheid op locatie"]
  },
  {
    title: "VIL-VCU",
    href: "/cursussen/vil-vcu",
    forWho: "Voor intercedenten, planners en accountmanagers binnen uitzendorganisaties.",
    whenNeeded: "VIL-VCU is nodig wanneer u kandidaten plaatst bij opdrachtgevers waar veilig werken, juiste informatie en controle op certificaten belangrijk zijn.",
    examples: ["Intercedent", "Planner bij uitzendbureau", "Accountmanager die kandidaten plaatst"]
  }
] as const;

const articleLinks = [
  { href: "#wat-is-vca", label: "Wat is VCA?" },
  { href: "#vca-types", label: "Welke VCA?" },
  { href: "#ssvv", label: "SSVV en erkende examens" },
  { href: "#cdr", label: "Diploma en CDR" },
  { href: "#advies-aanvragen", label: "Advies aanvragen" }
];

export default function KnowledgePage() {
  return (
    <>
      <section className="border-b border-border bg-card py-12">
        <div className="section-shell grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <p className="official-kicker">Kennisbank</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">VCA, SSVV en diploma-controle duidelijk uitgelegd.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Voor kandidaten en bedrijven die willen begrijpen welke cursus nodig is, wat een erkend examen betekent en wat er na slagen gebeurt.
            </p>
          </div>
          <div className="official-card p-5">
            <h2 className="text-xl font-bold text-primary">Twijfelt u over de juiste route?</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Doe de keuzehulp of schrijf u in. Wij controleren de cursuskeuze voordat de planning definitief wordt.</p>
            <Button asChild className="mt-5 w-full" variant="accent">
              <Link href="/advies">Doe de keuzehulp <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <nav className="mb-8 grid gap-0 border-y border-border bg-white sm:grid-cols-2 lg:grid-cols-5" aria-label="Onderwerpen in de kennisbank">
          {articleLinks.map((item) => (
            <Link key={item.href} href={item.href} className="border-b border-border p-4 font-semibold text-primary underline-offset-4 hover:bg-secondary hover:underline sm:border-r lg:border-b-0 last:border-r-0">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="grid gap-8">
          {articles.map((article) => (
            <div key={article.id} className="grid gap-8">
              <article id={article.id} className="official-card scroll-mt-36 grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{article.title}</h2>
                </div>
                <div>
                  <div className="grid gap-4">
                    {article.body.map((paragraph) => (
                      <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {article.bullets.map((bullet) => (
                      <span key={bullet} className="border border-border bg-secondary px-3 py-2 text-sm font-semibold text-primary">{bullet}</span>
                    ))}
                  </div>
                </div>
              </article>
              {article.id === "wat-is-vca" && (
                <section id="vca-types" className="official-card scroll-mt-36 p-6">
                  <div className="max-w-3xl">
                    <p className="official-kicker">Cursuskeuze</p>
                    <h2 className="mt-2 text-2xl font-bold text-primary">Welke VCA heeft u nodig?</h2>
                    <p className="mt-4 leading-7 text-muted-foreground">
                      De juiste VCA-route hangt vooral af van uw verantwoordelijkheid. Werkt u zelf uitvoerend, stuurt u mensen aan, of plaatst u kandidaten namens een uitzendorganisatie?
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {vcaTypes.map((type) => (
                      <article key={type.title} className="border border-border bg-white p-5">
                        <h3 className="text-xl font-bold text-primary">{type.title}</h3>
                        <p className="mt-3 text-sm font-bold leading-6 text-foreground">{type.forWho}</p>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{type.whenNeeded}</p>
                        <div className="mt-4 grid gap-2 border-y border-border py-3">
                          {type.examples.map((example) => (
                            <p key={example} className="text-sm font-semibold text-primary">{example}</p>
                          ))}
                        </div>
                        <Link href={type.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
                          Bekijk {type.title} <ArrowRight className="h-4 w-4" />
                        </Link>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="advies-aanvragen" className="scroll-mt-36 border-y border-border bg-secondary py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="official-kicker">Volgende stap</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary">Twijfelt u nog over cursus, examen of planning?</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Stuur ons uw situatie door. Wij controleren welke route logisch is, welke datum past en of cursus, examen of groepsplanning beter aansluit.
            </p>
          </div>
          <div className="official-card bg-white p-5">
            <h3 className="text-xl font-bold text-primary">Laat de keuze controleren.</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Handig voor kandidaten, zzp'ers en bedrijven die meerdere medewerkers willen aanmelden.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent">
                <Link href="/contact">Contact opnemen <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/advies">Doe de keuzehulp</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
