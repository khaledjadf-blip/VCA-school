import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-shell max-w-2xl py-20">
      <div className="official-card p-6">
        <p className="official-kicker">404</p>
        <h1 className="mt-2 text-3xl font-bold">Pagina niet gevonden</h1>
        <p className="mt-3 text-muted-foreground">Deze pagina bestaat niet (meer).</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild variant="accent"><Link href="/inschrijven">Bekijk cursusdata</Link></Button>
          <Button asChild variant="outline"><Link href="/">Naar de homepage</Link></Button>
        </div>
      </div>
    </section>
  );
}
