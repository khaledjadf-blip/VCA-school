import { permanentRedirect } from "next/navigation";
import { localizePath } from "@/lib/localized-path";
import { isLanguage } from "@/lib/translations";

// De oude demo-planning is vervangen door echte cursusdata op /inschrijven.
export default async function ClassesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  permanentRedirect(localizePath("/inschrijven", isLanguage(lang) ? lang : "nl"));
}
