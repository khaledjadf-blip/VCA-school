import Link from "@/components/localized-link";
import { company } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-primary text-primary-foreground">
      <div className="section-shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-4 text-base font-bold text-white"><bdi dir="ltr">{company.name}</bdi></div>
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
          <Link href="/privacy">Privacyverklaring</Link>
        </div>
        <div className="grid gap-3 text-sm text-primary-foreground/84">
          <a href={`tel:${company.phoneE164}`}><bdi dir="ltr">{company.phone}</bdi></a>
          <a href={`mailto:${company.email}`} data-no-translate>{company.email}</a>
          <span>Examenlocatie of incompany</span>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="section-shell flex flex-wrap gap-x-4 gap-y-1 py-4 text-xs text-primary-foreground/70">
          <span>KvK</span><span dir="ltr" data-no-translate>{company.kvk}</span>
          <span aria-hidden>·</span>
          <span>Btw-nummer</span><span dir="ltr" data-no-translate>{company.btw}</span>
        </p>
      </div>
    </footer>
  );
}
