"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { useLanguage } from "@/components/language-provider";
import { localizePath, stripLanguage } from "@/lib/localized-path";

// Vervangt next/link op de website: interne links blijven in de gekozen taal (/ar/...).
const Link = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>(function LocalizedLink({ href, ...props }, ref) {
  const { language } = useLanguage();
  const target = typeof href === "string" ? localizePath(href, language) : href;
  return <NextLink ref={ref} href={target} {...props} />;
});

export default Link;

/** Huidig pad zonder taalvoorvoegsel (voor het markeren van het actieve menu-item). */
export function useSitePath() {
  return stripLanguage(usePathname() ?? "/");
}
