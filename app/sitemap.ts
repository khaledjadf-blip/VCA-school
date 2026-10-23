import type { MetadataRoute } from "next";
import { company } from "@/lib/company";
import { courses } from "@/lib/data";

// Elke pagina in het Nederlands (/...) en Arabisch (/ar/...), aan elkaar gekoppeld.
const paths = [
  "/",
  "/cursussen",
  ...courses.map((course) => `/cursussen/${course.slug}`),
  "/inschrijven",
  "/advies",
  "/kennisbank",
  "/over-ons",
  "/contact",
  "/voorwaarden",
  "/privacy"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.flatMap((path) => {
    const nl = `${company.url}${path === "/" ? "" : path}`;
    const ar = `${company.url}/ar${path === "/" ? "" : path}`;
    const alternates = { languages: { nl, ar } };
    return [
      { url: nl, lastModified: now, alternates, priority: path === "/" ? 1 : 0.7 },
      { url: ar, lastModified: now, alternates, priority: path === "/" ? 0.9 : 0.6 }
    ];
  });
}
