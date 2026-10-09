import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://vcaveiligvakkundig.nl"),
  title: {
    default: "VCA cursus inschrijven | VCA Basis, VOL, VIL-VCU & heftruck",
    template: "%s | VCA Veilig & Vakkundig B.V."
  },
  description:
    "Schrijf u in voor VCA Basis, VCA VOL, VIL-VCU, heftruck opleiding of SSVV-examen. Duidelijke planning, examenregistratie en begeleiding in Nederlands en Arabisch.",
  openGraph: {
    title: "VCA cursus inschrijven | VCA Veilig & Vakkundig B.V.",
    description: "Professionele VCA-cursussen, heftrucktraining en SSVV-erkende examens met duidelijke begeleiding.",
    type: "website",
    locale: "nl_NL"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
