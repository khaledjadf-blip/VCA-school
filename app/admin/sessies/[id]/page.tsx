import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader, Notice, bookingStatusLabels, courseTitle } from "@/app/admin/admin-ui";
import { deleteSessionAction, updateSessionAction } from "@/app/admin/actions";
import { SessionForm } from "@/app/admin/session-form";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabase, type Booking, type CourseSession } from "@/lib/supabase";
import { centsToEuroInput, formatDateTimeNl, formatEuro, isoToAmsterdam } from "@/lib/time";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fout?: string; ok?: string }>;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function SessionDetailPage({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const { fout, ok } = await searchParams;
  if (!UUID.test(id)) notFound();

  const supabase = getSupabase();
  const { data } = await supabase.from("course_sessions").select("*").eq("id", id).single();
  if (!data) notFound();
  const session = data as CourseSession;

  const { data: bookingRows } = await supabase
    .from("bookings")
    .select("*")
    .eq("session_id", id)
    .order("created_at", { ascending: true });
  const bookings = (bookingRows ?? []) as Booking[];
  const paid = bookings.filter((b) => b.status === "paid");

  const start = isoToAmsterdam(session.starts_at);
  const values = {
    id: session.id,
    course_slug: session.course_slug,
    date: start.date,
    start_time: start.time,
    end_time: session.ends_at ? isoToAmsterdam(session.ends_at).time : "",
    location: session.location,
    language: session.language,
    price: centsToEuroInput(session.price_cents),
    seats_total: String(session.seats_total),
    status: session.status,
    notes: session.notes ?? ""
  };

  return (
    <div className="section-shell max-w-5xl">
      <AdminHeader
        title={`${courseTitle(session.course_slug)} · ${formatDateTimeNl(session.starts_at)}`}
        back={{ href: "/admin", label: "Terug naar overzicht" }}
      />
      <Notice ok={ok} fout={fout} />

      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Boekingen</h2>
            <p className="text-sm text-muted-foreground">
              {paid.length} betaald · {session.seats_taken} van {session.seats_total} plekken bezet
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <a href={`/admin/export?sessie=${session.id}`}>Download deze lijst (CSV)</a>
          </Button>
        </div>

        {bookings.length === 0 ? (
          <p className="official-card p-6 text-muted-foreground">Nog geen boekingen voor deze datum.</p>
        ) : (
          <div className="official-card overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border bg-secondary text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Naam</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Telefoon</th>
                  <th className="px-4 py-3">Bedrag</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Geboekt op</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3 font-semibold">{b.first_name} {b.last_name}</td>
                    <td className="px-4 py-3"><a href={`mailto:${b.email}`} className="underline underline-offset-4">{b.email}</a></td>
                    <td className="whitespace-nowrap px-4 py-3"><a href={`tel:${b.phone}`} dir="ltr">{b.phone}</a></td>
                    <td className="whitespace-nowrap px-4 py-3">{formatEuro(b.amount_cents)}</td>
                    <td className="px-4 py-3">
                      <span className={b.status === "paid" ? "font-bold text-green-700" : "text-muted-foreground"}>
                        {bookingStatusLabels[b.status]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDateTimeNl(b.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold">Gegevens wijzigen</h2>
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/sessies/nieuw?van=${session.id}`}>Kopie maken (week later)</Link>
          </Button>
        </div>
        <SessionForm action={updateSessionAction} values={values} submitLabel="Wijzigingen opslaan" />
      </section>

      {bookings.length === 0 ? (
        <section className="official-card border-t-red-600 p-6">
          <h2 className="text-lg font-bold">Datum verwijderen</h2>
          <p className="mt-1 text-sm text-muted-foreground">Kan alleen zolang er nog geen boekingen zijn.</p>
          <form action={deleteSessionAction} className="mt-4">
            <input type="hidden" name="id" value={session.id} />
            <Button type="submit" variant="outline" size="sm" className="border-red-600 text-red-700 hover:bg-red-50">
              Verwijderen
            </Button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
