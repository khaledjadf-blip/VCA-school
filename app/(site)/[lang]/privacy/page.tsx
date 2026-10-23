import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Hoe VCA Veilig & Vakkundig B.V. omgaat met uw persoonsgegevens bij inschrijving, examen en betaling."
};

// Elke zin is een apart tekstblok, zodat de Arabische vertaling per zin werkt.
const sections: { title: string; lines: string[]; list?: string[] }[] = [
  {
    title: "Wie zijn wij?",
    lines: [
      "VCA Veilig & Vakkundig B.V. is verantwoordelijk voor de verwerking van uw persoonsgegevens via deze website.",
      "Heeft u een vraag over uw gegevens? Neem dan contact met ons op via de gegevens onderaan deze pagina."
    ]
  },
  {
    title: "Welke gegevens verwerken wij?",
    lines: ["Wanneer u zich inschrijft of contact opneemt, verwerken wij de gegevens die u zelf invult:"],
    list: [
      "Voornaam en achternaam",
      "E-mailadres en telefoonnummer",
      "Geboortedatum en geboorteplaats",
      "Bedrijfsnaam en opmerkingen (als u die invult)",
      "Gekozen cursus, datum en betaalstatus"
    ]
  },
  {
    title: "Waarom verwerken wij deze gegevens?",
    lines: [
      "Wij gebruiken uw gegevens om uw inschrijving te verwerken, u in te plannen voor de cursus en het examen, en met u te communiceren.",
      "Uw naam, geboortedatum en geboorteplaats zijn nodig om uw examen aan te melden en uw diploma te laten registreren in het Centraal Diploma Register (CDR).",
      "Wij verwerken uw gegevens omdat dit nodig is voor de uitvoering van de overeenkomst met u en om te voldoen aan wettelijke verplichtingen, zoals de fiscale bewaarplicht."
    ]
  },
  {
    title: "Met wie delen wij uw gegevens?",
    lines: [
      "Wij verkopen uw gegevens nooit. Wij delen alleen wat nodig is met partijen die ons helpen de dienst uit te voeren:"
    ],
    list: [
      "De examenorganisatie en het Centraal Diploma Register, voor uw examen en diploma",
      "Onze betaalprovider, voor het verwerken van uw betaling",
      "Onze hosting- en e-maildiensten, voor het opslaan van uw inschrijving en het versturen van bevestigingen"
    ]
  },
  {
    title: "Hoe lang bewaren wij uw gegevens?",
    lines: [
      "Wij bewaren uw inschrijfgegevens zolang dat nodig is voor de cursus, het examen en eventuele vragen daarna.",
      "Gegevens over betalingen en facturen bewaren wij 7 jaar, omdat de wet dat verplicht."
    ]
  },
  {
    title: "Beveiliging",
    lines: [
      "Uw gegevens worden versleuteld verstuurd en opgeslagen in een beveiligde database binnen de Europese Unie.",
      "Alleen medewerkers die uw inschrijving verwerken, hebben toegang."
    ]
  },
  {
    title: "Cookies",
    lines: [
      "Deze website gebruikt geen tracking- of advertentiecookies.",
      "Wij onthouden alleen uw taalkeuze in uw browser, zodat de website in de juiste taal opent."
    ]
  },
  {
    title: "Uw rechten",
    lines: [
      "U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen, en om bezwaar te maken tegen het gebruik ervan.",
      "Stuur hiervoor een e-mail naar info@vcaveiligvakkundig.nl. Wij reageren binnen 4 weken.",
      "Bent u niet tevreden over hoe wij met uw gegevens omgaan? Dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell">
          <p className="official-kicker">Privacy</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Privacyverklaring</h1>
        </div>
      </section>
      <section className="section-shell grid max-w-3xl gap-6 py-12">
        {sections.map((section) => (
          <div key={section.title} className="official-card p-6">
            <h2 className="text-xl font-bold">{section.title}</h2>
            {section.lines.map((line) => (
              <p key={line} className="mt-3 leading-7 text-muted-foreground">{line}</p>
            ))}
            {section.list ? (
              <ul className="mt-3 list-disc space-y-1 ps-5 text-muted-foreground">
                {section.list.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </div>
        ))}
        <div className="official-card p-6 text-sm text-muted-foreground">
          <p className="font-bold text-foreground"><bdi dir="ltr">{company.name}</bdi></p>
          <p className="mt-2"><span>KvK</span> <span dir="ltr" data-no-translate>{company.kvk}</span> · <span>Btw-nummer</span> <span dir="ltr" data-no-translate>{company.btw}</span></p>
          <p className="mt-1"><a href={`mailto:${company.email}`} className="underline" data-no-translate>{company.email}</a> · <a href={`tel:${company.phoneE164}`}><bdi dir="ltr">{company.phone}</bdi></a></p>
        </div>
      </section>
    </>
  );
}
