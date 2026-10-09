import { AdminHeader, Notice } from "@/app/admin/admin-ui";
import { createSessionAction } from "@/app/admin/actions";
import { SessionForm, emptySessionForm, type SessionFormValues } from "@/app/admin/session-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getSupabase, type CourseSession } from "@/lib/supabase";
import { centsToEuroInput, isoToAmsterdam } from "@/lib/time";

type Props = { searchParams: Promise<{ fout?: string; van?: string }> };

// "Kopie maken": zelfde gegevens, één week later.
async function copyFrom(id: string): Promise<SessionFormValues | null> {
  const { data } = await getSupabase().from("course_sessions").select("*").eq("id", id).single();
  if (!data) return null;
  const s = data as CourseSession;
  const week = 7 * 24 * 3600_000;
  const start = isoToAmsterdam(new Date(new Date(s.starts_at).getTime() + week).toISOString());
  return {
    course_slug: s.course_slug,
    date: start.date,
    start_time: isoToAmsterdam(s.starts_at).time,
    end_time: s.ends_at ? isoToAmsterdam(s.ends_at).time : "",
    location: s.location,
    language: s.language,
    price: centsToEuroInput(s.price_cents),
    seats_total: String(s.seats_total),
    status: "open",
    notes: ""
  };
}

export default async function NewSessionPage({ searchParams }: Props) {
  await requireAdmin();
  const { fout, van } = await searchParams;
  const values = (van && (await copyFrom(van))) || emptySessionForm;

  return (
    <div className="section-shell max-w-3xl">
      <AdminHeader title="Nieuwe datum" back={{ href: "/admin", label: "Terug naar overzicht" }} />
      <Notice fout={fout} />
      <SessionForm action={createSessionAction} values={values} submitLabel="Datum opslaan" />
    </div>
  );
}
