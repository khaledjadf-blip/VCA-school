import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-primary text-primary-foreground">
      <div className="section-shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-4 text-base font-bold text-white"><bdi dir="ltr">VCA Veilig & Vakkundig B.V.</bdi></div>
          <p className="max-w-md text-sm text-primary-foreground/78">
            Professionele VCA- en heftruckopleidingen met SSVV-erkende examens, heldere begeleiding en praktische planning.
          </p>
        </div>
        <div className="grid gap-3 text-sm">
          <Link href="/cursussen">Cursussen</Link>
          <Link href="/advies">Welke cursus past bij mij?</Link>
          <Link href="/kennisbank">Kennisbank VCA</Link>
          <Link href="/contact">Contact & inschrijven</Link>
          <Link href="/voorwaarden">Voorwaarden en annuleren</Link>
        </div>
        <div className="grid gap-3 text-sm text-primary-foreground/84">
          <span><bdi dir="ltr">+31 6 16717342</bdi></span>
          <span>info@vcaveiligvakkundig.nl</span>
          <span>Examenlocatie of incompany</span>
        </div>
      </div>
    </footer>
  );
}
