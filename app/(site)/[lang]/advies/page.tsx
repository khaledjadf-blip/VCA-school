import type { Metadata } from "next";
import { CourseQuiz } from "@/components/course-quiz";

export const metadata: Metadata = {
  title: "Welke cursus past bij mij?",
  description: "Doe de keuzehulp voor VCA Basis, VCA VOL, VIL-VCU, heftruck opleiding of alleen examen en krijg direct uitleg per route."
};

export default function AdvicePage() {
  return (
    <section className="section-shell py-16">
      <div className="max-w-3xl border-l-4 border-primary pl-5 sm:pl-8">
        <p className="official-kicker">Keuzehulp</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Welke cursus past bij mij?</h1>
        <p className="mt-5 text-muted-foreground">
          Beantwoord vier korte vragen. Daarna ziet u welke cursus het beste past, waarom die route logisch is en wanneer de andere VCA-routes beter zijn.
        </p>
      </div>
      <CourseQuiz />
    </section>
  );
}
