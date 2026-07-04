import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-primary text-primary-foreground">
      <div className="section-shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3 font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/12">
              <ShieldCheck className="h-5 w-5" />
            </span>
            VCA Veilig & Vakkundig B.V.
          </div>
          <p className="max-w-md text-sm text-primary-foreground/78">
            Professionele VCA- en heftruckopleidingen met SSVV-erkende examens, heldere begeleiding en praktische planning.
          </p>
        </div>
        <div className="grid gap-3 text-sm">
          <Link href="/cursussen">Cursussen</Link>
          <Link href="/advies">Welke cursus past bij mij?</Link>
          <Link href="/kennisbank">Kennisbank VCA</Link>
          <Link href="/klassen">Live klassen</Link>
          <Link href="/contact">Contact & inschrijven</Link>
        </div>
        <div className="grid gap-3 text-sm text-primary-foreground/84">
          <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> <bdi dir="ltr">+31 6 87258236</bdi></span>
          <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@vcaveiligenvakkundig.nl</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Examenlocatie of incompany</span>
        </div>
      </div>
    </footer>
  );
}
