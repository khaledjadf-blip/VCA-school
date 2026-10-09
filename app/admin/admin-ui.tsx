import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export { DEFAULT_LOCATION, bookingStatusLabels, courseTitle, sessionStatusLabels } from "@/lib/admin-labels";

export function AdminHeader({ title, back }: { title: string; back?: { href: string; label: string } }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="official-kicker">Beheer</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
        {back ? (
          <Link href={back.href} className="mt-2 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            ← {back.label}
          </Link>
        ) : null}
      </div>
      <form action={logoutAction}>
        <Button type="submit" variant="ghost" size="sm">Uitloggen</Button>
      </form>
    </div>
  );
}

const okMessages: Record<string, string> = {
  aangemaakt: "De nieuwe datum is opgeslagen.",
  opgeslagen: "De wijzigingen zijn opgeslagen.",
  verwijderd: "De datum is verwijderd."
};

export function Notice({ ok, fout }: { ok?: string; fout?: string }) {
  if (fout) {
    return <p role="alert" className="mb-6 border-l-4 border-red-600 bg-red-50 px-4 py-3 font-semibold text-red-800">{fout}</p>;
  }
  if (ok && okMessages[ok]) {
    return <p role="status" className="mb-6 border-l-4 border-green-600 bg-green-50 px-4 py-3 font-semibold text-green-800">{okMessages[ok]}</p>;
  }
  return null;
}

export const fieldClass =
  "flex h-11 w-full rounded-sm border border-input bg-white px-3 py-2 text-sm shadow-none";
