import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader, Notice, bookingStatusLabels, courseTitle } from "@/app/admin/admin-ui";
import { bookingAction, deleteSessionAction, updateSessionAction } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/confirm-button";
import { SessionForm } from "@/app/admin/session-form";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabase, type Booking, type CourseSession } from "@/lib/supabase";
import { Bilingual, LocalDateTime } from "@/components/localized";
import { centsToEuroInput, formatEuro, isoToAmsterdam } from "@/lib/time";

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
        title={<>{courseTitle(session.course_slug)} · <LocalDateTime iso={session.starts_at} /></>}
        back={{ href: "/admin", label: "Terug naar overzicht" }}
      />
      <Notice ok={ok} fout={fout} />

      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Boekingen</h2>
            <p className="text-sm text-muted-foreground">
              <Bilingual
                nl={`${paid.length} betaald · ${session.seats_taken} van ${session.seats_total} plekken bezet`}
                ar={`${paid.length} دفعوا · ${session.seats_taken} من ${session.seats_total} مقاعد محجوزة`}
              />
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
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-border bg-secondary text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Naam</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Telefoon</th>
                  <th className="px-4 py-3">Bedrag</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Geboekt op</th>
                  <th className="px-4 py-3"></th>
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
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground"><LocalDateTime iso={b.created_at} /></td>
                    <td className="px-4 py-3">
                      <form action={bookingAction} className="flex flex-wrap justify-end gap-2">
                        <input type="hidden" name="id" value={b.id} />
                        {b.status === "paid" && b.payment_id ? (
                          <ConfirmButton
                            name="mode"
                            value="terugbetalen"
                            variant="outline"
                            size="sm"
                            question={`${b.first_name} ${b.last_name}: annuleren en ${formatEuro(b.amount_cents)} terugbetalen via Mollie?`}
                            questionAr={`${b.first_name} ${b.last_name}: إلغاء الحجز وإرجاع ${formatEuro(b.amount_cents)} عبر Mollie؟`}
                          >
                            Annuleren + terugbetalen
                          </ConfirmButton>
                        ) : null}
                        {b.status === "paid" || b.status === "pending" ? (
                          <ConfirmButton
                            name="mode"
                            value="annuleren"
                            variant="outline"
                            size="sm"
                            question={`${b.first_name} ${b.last_name}: annuleren zonder terugbetaling?`}
                            questionAr={`${b.first_name} ${b.last_name}: إلغاء الحجز بدون إرجاع المبلغ؟`}
                          >
                            Annuleren
                          </ConfirmButton>
                        ) : null}
                        <ConfirmButton
                          name="mode"
                          value="verwijderen"
                          variant="ghost"
                          size="sm"
                          className="text-red-700 hover:bg-red-50"
                          question={`${b.first_name} ${b.last_name}: boeking definitief verwijderen?${b.status === "paid" ? " Er wordt NIETS terugbetaald." : ""}`}
                          questionAr={`${b.first_name} ${b.last_name}: حذف الحجز نهائيا؟${b.status === "paid" ? " لن يتم إرجاع أي مبلغ." : ""}`}
                        >
                          Verwijderen
                        </ConfirmButton>
                      </form>
                    </td>
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

      <section className="official-card border-t-red-600 p-6">
        <h2 className="text-lg font-bold">Datum verwijderen</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Verwijdert de datum en alle niet-betaalde boekingen. Betaalde boekingen moet u eerst annuleren.
        </p>
        <form action={deleteSessionAction} className="mt-4">
          <input type="hidden" name="id" value={session.id} />
          <ConfirmButton
            variant="outline"
            size="sm"
            className="border-red-600 text-red-700 hover:bg-red-50"
            question="Deze datum definitief verwijderen?"
            questionAr="حذف هذا الموعد نهائيا؟"
          >
            Verwijderen
          </ConfirmButton>
        </form>
      </section>
    </div>
  );
}
