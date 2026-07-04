import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { classes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Live klassen",
  description: "Bekijk actuele VCA en heftruck klassen met beschikbaarheid, docent en locatie."
};

export default function ClassesPage() {
  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell">
          <p className="official-kicker">Planning</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Live klassen en beschikbare plaatsen.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">Indicatieve MVP-planning met status, docent en locatie.</p>
        </div>
      </section>
      <section className="section-shell py-16">
        <div className="grid gap-4">
          {classes.map((item) => (
            <article key={`${item.course}-${item.day}-${item.time}`} className="official-card grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={item.spots > 0 ? "h-3 w-3 rounded-full bg-green-600" : "h-3 w-3 rounded-full bg-red-600"} aria-hidden="true" />
                  <h2 className="text-xl font-bold">{item.course} — {item.day} {item.time}</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><UserRound className="h-4 w-4" /> {item.teacher}</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {item.location}</span>
                  <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {item.day}</span>
                </div>
              </div>
              <div className="grid gap-3 md:w-44">
                <p className="border border-border bg-secondary px-3 py-2 text-center text-sm font-bold">{item.spots > 0 ? `${item.spots} plekken vrij` : "vol"}</p>
                <Button asChild disabled={item.spots === 0} variant={item.spots > 0 ? "accent" : "outline"}>
                  <Link href="/contact">Aanmelden</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
