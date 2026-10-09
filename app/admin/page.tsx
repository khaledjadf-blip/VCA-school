import Link from "next/link";
import { AdminHeader, Notice, courseTitle, fieldClass, sessionStatusLabels } from "@/app/admin/admin-ui";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { getSupabase, isSupabaseConfigured, type CourseSession } from "@/lib/supabase";
import { Bilingual, LocalDateTime } from "@/components/localized";
import { formatEuro } from "@/lib/time";

type Props = { searchParams: Promise<{ fout?: string; ok?: string; toon?: string }> };

function LoginForm({ failed }: { failed: boolean }) {
  return (
    <div className="section-shell max-w-md">
      <form action={loginAction} className="official-card grid gap-4 p-6">
        <div>
          <p className="official-kicker">Beheer</p>
          <h1 className="mt-1 text-2xl font-bold">Inloggen</h1>
        </div>
        {failed ? <p role="alert" className="font-semibold text-red-700">Onjuist wachtwoord.</p> : null}
        <label className="grid gap-1.5 text-sm font-semibold">
          Wachtwoord
          <input type="password" name="password" required autoComplete="current-password" autoFocus className={fieldClass} />
        </label>
        <Button type="submit" variant="accent">Inloggen</Button>
      </form>
    </div>
  );
}

function SetupMissing({ items }: { items: string[] }) {
  return (
    <div className="section-shell max-w-xl">
      <div className="official-card p-6">
        <h1 className="text-2xl font-bold">Beheer is nog niet ingesteld</h1>
        <p className="mt-3 text-muted-foreground">Voeg in Vercel → Settings → Environment Variables toe:</p>
        <ul className="mt-3 list-disc ps-5 font-mono text-sm">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default async function AdminPage({ searchParams }: Props) {
  const { fout, ok, toon } = await searchParams;

  const missing = [
    !isAdminConfigured() && "ADMIN_PASSWORD (minstens 12 tekens)",
    !isSupabaseConfigured() && "SUPABASE_URL en SUPABASE_SERVICE_ROLE_KEY"
  ].filter(Boolean) as string[];
  if (missing.length) return <SetupMissing items={missing} />;

  if (!(await isAdmin())) return <LoginForm failed={fout === "login"} />;

  const showPast = toon === "afgelopen";
  const now = new Date().toISOString();
  const supabase = getSupabase();
  let query = supabase.from("course_sessions").select("*");
  query = showPast
    ? query.lt("starts_at", now).order("starts_at", { ascending: false }).limit(100)
    : query.gte("starts_at", now).order("starts_at", { ascending: true });
  const { data, error } = await query;
  const sessions = (data ?? []) as CourseSession[];

  // Openstaande betalingen per datum (voor het overzicht).
  const pending = new Map<string, number>();
  if (sessions.length) {
    const { data: rows } = await supabase
      .from("bookings")
      .select("session_id")
      .in("session_id", sessions.map((s) => s.id))
      .eq("status", "pending");
    for (const row of rows ?? []) pending.set(row.session_id, (pending.get(row.session_id) ?? 0) + 1);
  }

  return (
    <div className="section-shell">
      <AdminHeader title="Cursusdata" />
      <Notice ok={ok} fout={fout === "login" ? undefined : fout} />

      <div className="mb-6 flex flex-wrap gap-3">
        <Button asChild variant="accent">
          <Link href="/admin/sessies/nieuw">+ Nieuwe datum</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="/admin/export">Alle boekingen downloaden (CSV)</a>
        </Button>
      </div>

      <div className="mb-4 flex gap-4 text-sm font-bold">
        <Link href="/admin" className={showPast ? "text-muted-foreground" : "text-primary underline underline-offset-4"}>Komende data</Link>
        <Link href="/admin?toon=afgelopen" className={showPast ? "text-primary underline underline-offset-4" : "text-muted-foreground"}>Afgelopen data</Link>
      </div>

      {error ? (
        <p role="alert" className="font-semibold text-red-700">De gegevens konden niet worden geladen. Controleer de database-instellingen.</p>
      ) : sessions.length === 0 ? (
        <p className="official-card p-6 text-muted-foreground">Nog geen data. Klik op &quot;+ Nieuwe datum&quot; om te beginnen.</p>
      ) : (
        <div className="official-card overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-secondary text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Datum</th>
                <th className="px-4 py-3">Cursus</th>
                <th className="px-4 py-3">Locatie</th>
                <th className="px-4 py-3">Prijs</th>
                <th className="px-4 py-3">Betaald / plekken</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const waiting = pending.get(s.id) ?? 0;
                return (
                  <tr key={s.id} className="border-b border-border last:border-b-0">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold"><LocalDateTime iso={s.starts_at} /></td>
                    <td className="px-4 py-3">{courseTitle(s.course_slug)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.location}</td>
                    <td className="whitespace-nowrap px-4 py-3">{formatEuro(s.price_cents)}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="font-bold">{s.seats_taken} / {s.seats_total}</span>
                      {waiting ? <span className="ms-2 text-xs text-muted-foreground"><Bilingual nl={`(+${waiting} wacht op betaling)`} ar={`(+${waiting} بانتظار الدفع)`} /></span> : null}
                    </td>
                    <td className="px-4 py-3">{sessionStatusLabels[s.status]}</td>
                    <td className="px-4 py-3 text-end">
                      <Link href={`/admin/sessies/${s.id}`} className="font-bold text-primary underline underline-offset-4">Beheren</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
