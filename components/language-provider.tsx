"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
      if (!parent || parent.closest("script, style, noscript, textarea, input")) return NodeFilter.FILTER_REJECT;
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("nl");

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("site-language", nextLanguage);
  };

  useEffect(() => {
    const stored = window.localStorage.getItem("site-language");
    if (stored === "ar" || stored === "nl") setLanguageState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "ar" ? "ar" : "nl";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    translateDom(language);

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
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
