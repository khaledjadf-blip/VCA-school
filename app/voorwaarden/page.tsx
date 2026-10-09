import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voorwaarden en annuleren",
  description: "Voorwaarden voor inschrijving, betaling en annuleren bij VCA Veilig & Vakkundig B.V."
};

// Elke zin is een apart tekstblok, zodat de Arabische vertaling per zin werkt.
const sections: { title: string; lines: string[] }[] = [
  {
    title: "Inschrijving",
    lines: [
      "Uw inschrijving is definitief zodra wij uw betaling hebben ontvangen.",
      "U ontvangt daarna een bevestiging per e-mail met de cursus, datum, tijd en locatie."
    ]
  },
  {
    title: "Betaling",
    lines: ["U betaalt vooraf online via iDEAL of creditcard. De betaling wordt veilig verwerkt door Mollie."]
  },
  {
    title: "Annuleren door u",
    lines: [
      "Tot 7 dagen vóór de cursusdatum kunt u kosteloos annuleren. U krijgt dan het volledige bedrag terug.",
      "Annuleert u binnen 7 dagen vóór de cursusdatum, of komt u niet opdagen, dan is terugbetaling niet mogelijk.",
      "Annuleren doet u per e-mail aan info@vcaveiligvakkundig.nl. Vermeld uw naam en de cursusdatum."
    ]
  },
  {
    title: "Wijziging of annulering door ons",
    lines: [
      "Bij te weinig deelnemers of overmacht kunnen wij een cursusdatum verplaatsen of annuleren.",
      "U kiest dan kosteloos een andere datum of u krijgt het volledige bedrag terug."
    ]
  },
  {
    title: "Op de cursusdag",
    lines: [
      "Neem een geldig identiteitsbewijs mee (paspoort, ID-kaart of rijbewijs). Zonder geldig identiteitsbewijs kunt u niet aan het examen deelnemen.",
      "Kom graag 15 minuten voor aanvang."
    ]
  },
  {
    title: "Uw gegevens",
    lines: [
      "Wij gebruiken uw gegevens alleen voor uw inschrijving, het examen en de registratie van uw diploma.",
      "Wij verkopen of delen uw gegevens niet voor reclame."
    ]
  }
];

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell">
          <p className="official-kicker">Voorwaarden</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Voorwaarden en annuleren</h1>
        </div>
      </section>
      <section className="section-shell grid max-w-3xl gap-6 py-12">
        {sections.map((section) => (
          <div key={section.title} className="official-card p-6">
            <h2 className="text-xl font-bold">{section.title}</h2>
            {section.lines.map((line) => (
              <p key={line} className="mt-3 leading-7 text-muted-foreground">{line}</p>
            ))}
          </div>
        ))}
        <p className="text-sm text-muted-foreground">
          Vragen? Mail <a href="mailto:info@vcaveiligvakkundig.nl" className="underline">info@vcaveiligvakkundig.nl</a> of bel/WhatsApp <bdi dir="ltr">+31 6 16717342</bdi>.
        </p>
      </section>
    </>
  );
}
