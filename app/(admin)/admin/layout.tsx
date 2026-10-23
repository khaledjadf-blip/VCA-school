import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beheer",
  robots: { index: false, follow: false }
};

// Beheerpagina's altijd vers ophalen, nooit cachen.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-secondary/40 py-10">{children}</div>;
}
