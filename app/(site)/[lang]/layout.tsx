import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { arabicTranslations, isLanguage, languages, type Language } from "@/lib/translations";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

// Nederlands staat op /..., Arabisch op /ar/... (zie proxy.ts).
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

const nl = {
  title: "VCA cursus inschrijven | VCA Basis, VOL, VIL-VCU & heftruck",
  description:
    "Schrijf u in voor VCA Basis, VCA VOL, VIL-VCU, heftruck opleiding of SSVV-examen. Duidelijke planning, examenregistratie en begeleiding in Nederlands en Arabisch."
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const ar = lang === "ar";
  return {
    metadataBase: new URL("https://vcaveiligvakkundig.nl"),
    title: {
      default: ar ? arabicTranslations["VCA cursus inschrijven"] + " | VCA Basis, VOL, VIL-VCU" : nl.title,
      template: "%s | VCA Veilig & Vakkundig B.V."
    },
    description: ar ? arabicTranslations[nl.description] ?? nl.description : nl.description,
    openGraph: {
      title: "VCA cursus inschrijven | VCA Veilig & Vakkundig B.V.",
      description: "Professionele VCA-cursussen, heftrucktraining en SSVV-erkende examens met duidelijke begeleiding.",
      type: "website",
      siteName: "VCA Veilig & Vakkundig B.V.",
      locale: ar ? "ar" : "nl_NL",
      // Voorbeeldafbeelding bij delen via WhatsApp, Facebook, LinkedIn.
      images: [{ url: "/images/og-share.jpg", width: 1200, height: 630, alt: "VCA Veilig & Vakkundig – VCA-cursus met erkend examen" }]
    },
    twitter: { card: "summary_large_image", images: ["/images/og-share.jpg"] }
  };
}

export default async function SiteLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  const language: Language = lang;

  return (
    <html
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      // Arabisch: pagina pas tonen als de vertaling klaar is (met een veilige terugval na 1,5 s).
      data-translating={language === "ar" ? "" : undefined}
      suppressHydrationWarning
    >
      <body>
        <Providers language={language}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
