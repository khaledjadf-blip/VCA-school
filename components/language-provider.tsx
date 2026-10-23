"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { localizePath } from "@/lib/localized-path";
import { arabicTranslations, type Language } from "@/lib/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isArabic: boolean;
  t: (value: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const reverseArabicTranslations = Object.fromEntries(Object.entries(arabicTranslations).map(([nl, ar]) => [ar, nl]));

function translateText(value: string, language: Language) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return value;

  if (language === "ar") {
    if (arabicTranslations[normalized]) return value.replace(normalized, arabicTranslations[normalized]);
    return value;
  }

  if (reverseArabicTranslations[normalized]) return value.replace(normalized, reverseArabicTranslations[normalized]);
  return value;
}

function translateDom(language: Language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, noscript, textarea, input, [data-no-translate]")) return NodeFilter.FILTER_REJECT;
      if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  nodes.forEach((node) => {
    if (node.textContent) node.textContent = translateText(node.textContent, language);
  });

  // Ook invulhints, schermlezer-labels en afbeeldingsteksten vertalen.
  document.querySelectorAll<HTMLElement>("[placeholder], [aria-label], img[alt], [title]").forEach((element) => {
    for (const attribute of TRANSLATED_ATTRIBUTES) {
      const value = element.getAttribute(attribute);
      if (!value) continue;
      const next = translateText(value, language);
      if (next !== value) element.setAttribute(attribute, next);
    }
  });

  // Paginatitel: "Onderdeel | VCA Veilig & Vakkundig B.V." per deel vertalen.
  const title = document.title.split(" | ").map((part) => translateText(part, language)).join(" | ");
  if (title !== document.title) document.title = title;
}

const TRANSLATED_ATTRIBUTES = ["placeholder", "aria-label", "alt", "title"] as const;

/**
 * urlLanguage: op de website bepaalt de URL de taal (/ar/... = Arabisch) en
 * wisselt de knop van pagina. Zonder (beheer) onthoudt de browser de keuze.
 */
export function LanguageProvider({ children, urlLanguage }: { children: React.ReactNode; urlLanguage?: Language }) {
  const [storedLanguage, setStoredLanguage] = useState<Language>("nl");
  const language = urlLanguage ?? storedLanguage;

  const setLanguage = (nextLanguage: Language) => {
    try {
      window.localStorage.setItem("site-language", nextLanguage);
    } catch {
      // Opslag niet beschikbaar (privévenster): taal geldt dan alleen voor deze pagina.
    }
    if (urlLanguage) {
      if (nextLanguage !== urlLanguage) {
        const { pathname, search, hash } = window.location;
        window.location.assign(localizePath(pathname, nextLanguage) + search + hash);
      }
      return;
    }
    setStoredLanguage(nextLanguage);
  };

  useEffect(() => {
    if (urlLanguage) return;
    try {
      const stored = window.localStorage.getItem("site-language");
      if (stored === "ar" || stored === "nl") setStoredLanguage(stored);
    } catch {
      // Geen opslag beschikbaar.
    }
  }, [urlLanguage]);

  useEffect(() => {
    document.documentElement.lang = language === "ar" ? "ar" : "nl";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    translateDom(language);
    document.documentElement.removeAttribute("data-translating");

    const observer = new MutationObserver(() => translateDom(language));
    observer.observe(document.body, { childList: true, subtree: true });
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === "ar" ? "nl" : "ar"),
    isArabic: language === "ar",
    t: (text) => (language === "ar" ? arabicTranslations[text] ?? text : text)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [language, urlLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
