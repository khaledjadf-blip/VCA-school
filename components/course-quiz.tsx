"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

const steps = [
  { key: "situation", question: "Welke situatie past het beste bij u?", options: ["Ik voer werk uit", "Ik geef leiding of ben zzp'er", "Ik plaats uitzendkrachten", "Ik wil heftruck rijden"] },
  { key: "goal", question: "Wat wilt u precies regelen?", options: ["VCA cursus met examen", "Alleen VCA examen", "Heftruck certificaat", "Advies voor bedrijf of groep"] },
  { key: "format", question: "Welke leervorm past het best?", options: ["Klassikale lesdag", "Online voorbereiding", "Praktijktraining", "Incompany voor team"] },
  { key: "experience", question: "Hoeveel ervaring heeft u met dit onderwerp?", options: ["Eerste keer", "Al wat ervaring", "Herhaling of verlenging"] }
] as const;

const courseInfo = {
  "VCA Basis": {
    slug: "vca-basis",
    intro: "VCA Basis past meestal bij uitvoerende medewerkers die veilig moeten werken op locaties met risico's, zoals bouw, techniek, industrie, schoonmaak op werklocaties of logistiek.",
    why: "U krijgt de basiskennis over veilig werken, risico's herkennen, persoonlijke beschermingsmiddelen, noodsituaties en regels op de werkplek.",
    situations: ["U werkt uitvoerend en stuurt geen team aan.", "Een opdrachtgever vraagt om een VCA-certificaat.", "U wilt voor het eerst VCA halen of uw certificaat vernieuwen."]
  },
  "VCA VOL": {
    slug: "vca-vol",
    intro: "VCA VOL is bedoeld voor leidinggevenden, voormannen, projectleiders, supervisors en vaak ook zzp'ers die verantwoordelijkheid dragen op de werkvloer.",
    why: "Naast veilig werken leert u ook kijken naar instructie, toezicht, werkvergunningen, communicatie en verantwoordelijkheid richting medewerkers.",
    situations: ["U stuurt mensen aan of controleert werkzaamheden.", "U bent zzp'er en opdrachtgevers vragen om VOL.", "U moet veiligheidskeuzes kunnen uitleggen en bewaken."]
  },
  "VIL-VCU": {
    slug: "vil-vcu",
    intro: "VIL-VCU is de logische route voor intercedenten, planners en accountmanagers in de uitzendbranche die personeel plaatsen bij risicovolle werkzaamheden.",
    why: "De opleiding richt zich op het juist informeren, selecteren en begeleiden van uitzendkrachten volgens VCU-afspraken.",
    situations: ["U werkt bij een uitzendbureau.", "U plaatst kandidaten in bouw, techniek, industrie of logistiek.", "U moet risico's en certificaten goed kunnen controleren."]
  },
  "Heftruck Opleiding": {
    slug: "heftruck-opleiding",
    intro: "Heftruck opleiding is geen VCA-vervanger, maar een praktijkgerichte training voor veilig intern transport.",
    why: "U oefent met veilig rijden, laden, lossen, stabiliteit, omgeving controleren en verantwoord werken met de heftruck.",
    situations: ["U gaat heftruck rijden of doet dit al.", "Uw werkgever wil aantoonbare instructie en toetsing.", "U heeft een herhaling of praktijkcertificaat nodig."]
  },
  "Examens & Registratie": {
    slug: "examens-registratie",
    intro: "Alleen examen is handig wanneer u zelfstandig heeft geleerd of wanneer een bedrijf kandidaten direct wil laten toetsen.",
    why: "Wij regelen het SSVV-erkende examen, identificatie, uitslag en registratie. U volgt dan geen volledige cursusdag.",
    situations: ["U bent al voorbereid en wilt alleen examen doen.", "Een certificaat is verlopen en u wilt snel toetsen.", "Een bedrijf wil meerdere kandidaten centraal laten examineren."]
  }
} as const;

const otherRoutes = [
  ["VCA Basis", "Voor uitvoerende medewerkers zonder leidinggevende verantwoordelijkheid."],
  ["VCA VOL", "Voor leidinggevenden, supervisors, projectleiders en vaak zzp'ers."],
  ["VIL-VCU", "Voor intercedenten en uitzendorganisaties die kandidaten plaatsen."],
  ["Heftruck Opleiding", "Voor mensen die veilig met een heftruck moeten werken."],
  ["Examens & Registratie", "Voor kandidaten die alleen een erkend examen willen plannen."]
] as const;

export function CourseQuiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = Object.keys(answers).length === steps.length;
  const current = steps[index];

  const result = useMemo<keyof typeof courseInfo>(() => {
    if (answers.goal === "Alleen VCA examen") return "Examens & Registratie";
    if (answers.situation === "Ik wil heftruck rijden" || answers.goal === "Heftruck certificaat" || answers.format === "Praktijktraining") return "Heftruck Opleiding";
    if (answers.situation === "Ik geef leiding of ben zzp'er") return "VCA VOL";
    if (answers.situation === "Ik plaats uitzendkrachten") return "VIL-VCU";
    return "VCA Basis";
  }, [answers]);

  const info = courseInfo[result];
  const progress = done ? 100 : ((index + 1) / steps.length) * 100;

  return (
    <div className="official-card mx-auto mt-10 max-w-4xl p-6">
      {!done ? (
        <>
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-accent">Stap {index + 1} van {steps.length}</p>
            <div className="h-2 flex-1 bg-secondary">
              <div className="h-2 bg-accent" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold">{current.question}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                className="min-h-24 border border-border bg-white p-4 text-left font-semibold hover:border-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:bg-background"
                onClick={() => {
                  setAnswers({ ...answers, [current.key]: option });
                  setIndex(Math.min(index + 1, steps.length - 1));
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>
          <p className="official-kicker">Uw advies</p>
          <h2 className="mt-2 text-3xl font-bold text-primary">{result}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{info.intro}</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="border-y border-border bg-white py-2">
              <h3 className="py-3 text-xl font-bold">Waarom deze cursus?</h3>
              <p className="pb-4 leading-7 text-muted-foreground">{info.why}</p>
              <div className="grid gap-0 border-t border-border">
                {info.situations.map((item) => (
                  <p key={item} className="border-b border-border py-3 font-semibold">{item}</p>
                ))}
              </div>
            </div>
            <aside className="border border-border bg-secondary p-5">
              <h3 className="text-xl font-bold text-primary">Andere routes kort uitgelegd</h3>
              <div className="mt-4 grid gap-0 border-y border-border bg-white">
                {otherRoutes.map(([name, text]) => (
                  <div key={name} className="border-b border-border p-3 last:border-b-0">
                    <p className="font-bold">{name}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent">
              <Link href={`/contact?course=${encodeURIComponent(result)}`}>Direct inschrijven</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/cursussen/${info.slug}`}>Bekijk cursusdetails</Link>
            </Button>
            <Button variant="outline" onClick={() => { setAnswers({}); setIndex(0); }}>Opnieuw starten</Button>
          </div>
        </div>
      )}
    </div>
  );
}
