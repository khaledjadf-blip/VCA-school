"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/language-provider";
import type { Language } from "@/lib/translations";

export function Providers({ children, language }: { children: React.ReactNode; language?: Language }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
      <LanguageProvider urlLanguage={language}>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
