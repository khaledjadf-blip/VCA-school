"use client";

// Teksten met wisselende getallen of datums staan niet in het vertaalwoordenboek.
// Deze onderdelen tonen ze direct in de gekozen taal.
import { useLanguage } from "@/components/language-provider";
import { TIME_ZONE } from "@/lib/time";

export function LocalDateTime({ iso }: { iso: string }) {
  const { isArabic } = useLanguage();
  const text = new Intl.DateTimeFormat(isArabic ? "ar-u-nu-latn" : "nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE
  }).format(new Date(iso));
  return <>{text}</>;
}

export function Bilingual({ nl, ar }: { nl: string; ar: string }) {
  const { isArabic } = useLanguage();
  return <>{isArabic ? ar : nl}</>;
}
