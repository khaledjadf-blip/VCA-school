// Nederlandse pagina's staan op /..., Arabische op /ar/... (zie proxy.ts).
import type { Language } from "@/lib/translations";

const UNLOCALIZED = /^\/(api|admin|images|_next)(\/|$)/;

/** "/ar/cursussen" → "/cursussen", "/ar" → "/". */
export function stripLanguage(path: string) {
  if (path === "/ar") return "/";
  return path.startsWith("/ar/") ? path.slice(3) : path;
}

/** Interne link naar de juiste taalversie. Externe links, ankers en /api of /admin blijven gelijk. */
export function localizePath(href: string, language: Language) {
  if (!href.startsWith("/") || href.startsWith("//") || UNLOCALIZED.test(href)) return href;
  const path = stripLanguage(href);
  if (language === "nl") return path;
  return path === "/" ? "/ar" : path.startsWith("/?") || path.startsWith("/#") ? `/ar${path.slice(1)}` : `/ar${path}`;
}
