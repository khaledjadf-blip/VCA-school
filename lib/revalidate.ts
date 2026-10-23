import "server-only";
import { revalidatePath } from "next/cache";
import { languages } from "@/lib/translations";

/** Cursuspagina en overzicht opnieuw opbouwen, in beide talen (intern /nl/... en /ar/...). */
export function refreshCoursePages(slug: string) {
  for (const lang of languages) {
    revalidatePath(`/${lang}/cursussen/${slug}`);
    revalidatePath(`/${lang}/inschrijven`);
  }
}
