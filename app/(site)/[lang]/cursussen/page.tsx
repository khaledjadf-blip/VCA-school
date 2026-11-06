import type { Metadata } from "next";
import Link from "@/components/localized-link";
import { CategoryFlipCard } from "@/components/course-card";
import { CourseImage } from "@/components/course-image";
import { CoursePrice } from "@/components/course-price";
import { Button } from "@/components/ui/button";
import { categories, courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cursussen",
  description: "Bekijk VCA Basis, VCA VOL, VIL-VCU, heftruck, orderpicker, reachtruck, telehandler, hoogwerker, BHV en SSVV-examens."
};

export default function CoursesPage() {
  return (
    <>
      <section className="border-b border-border bg-card py-16">
        <div className="section-shell">
          <p className="official-kicker">Cursusoverzicht</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Erkende opleidingen voor veilig en vakbekwaam werken.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">Kies de cursusroute die past bij functie, ervaring en planning.</p>
        </div>
      </section>
      <section className="section-shell py-14">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {categories.map((category) => (
            <div key={category.title} className="min-w-[82%] snap-start sm:min-w-[62%] lg:min-w-[31%]">
              <CategoryFlipCard {...category} />
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell pb-16">
        <div className="grid gap-4">
          {courses.map((course) => (
            <article key={course.slug} id={course.slug} className="official-card grid scroll-mt-28 gap-5 p-5 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_1fr_auto] lg:items-center">
              <CourseImage image={course.image} className="aspect-[4/3] w-full" />
              <div>
                <p className="official-kicker">{course.category}</p>
                <h2 className="mt-1 text-2xl font-bold">{course.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{course.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.highlights.map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-lg border border-accent/15 bg-accent/[0.07] px-3 py-2 text-sm font-semibold text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 md:col-start-2 lg:col-start-auto lg:w-48">
                <p className="text-lg font-bold text-accent"><CoursePrice priceExVat={course.priceExVat} priceFrom={course.priceFrom} /></p>
                <Button asChild variant="outline"><Link href={`/cursussen/${course.slug}`}>Details</Link></Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
