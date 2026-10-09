"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endAdminSession, requireAdmin, startAdminSession } from "@/lib/admin-auth";
import { explainDbError } from "@/lib/admin-db-errors";
import { courses } from "@/lib/data";
import { getSupabase } from "@/lib/supabase";
import { amsterdamToIso, euroToCents } from "@/lib/time";

const courseSlugs = new Set(courses.map((c) => c.slug));
const statuses = new Set(["open", "closed", "cancelled"]);

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    // Kleine vertraging maakt raden van het wachtwoord trager.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redirect("/admin?fout=login");
  }
  await startAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await endAdminSession();
  redirect("/admin");
}

type SessionInput = {
  course_slug: string;
  starts_at: string;
  ends_at: string | null;
  location: string;
  language: string;
  price_cents: number;
  seats_total: number;
  status: string;
  notes: string | null;
};

function readSessionForm(formData: FormData): SessionInput | string {
  const text = (name: string) => String(formData.get(name) ?? "").trim();

  const course_slug = text("course_slug");
  if (!courseSlugs.has(course_slug)) return "Kies een cursus.";

  const date = text("date");
  const starts_at = amsterdamToIso(date, text("start_time"));
  if (!starts_at) return "Vul een geldige datum en begintijd in.";

  let ends_at: string | null = null;
  if (text("end_time")) {
    ends_at = amsterdamToIso(date, text("end_time"));
    if (!ends_at || ends_at <= starts_at) return "De eindtijd moet na de begintijd liggen.";
  }

  const location = text("location");
  if (location.length < 3) return "Vul een locatie in.";

  const price_cents = euroToCents(text("price"));
  if (price_cents === null) return "Vul een geldige prijs in, bijvoorbeeld 219 of 219,50.";

  const seats_total = Number(text("seats_total"));
  if (!Number.isInteger(seats_total) || seats_total < 1 || seats_total > 500) return "Vul een geldig aantal plekken in (1 tot 500).";

  const status = text("status") || "open";
  if (!statuses.has(status)) return "Ongeldige status.";

  return {
    course_slug,
    starts_at,
    ends_at,
    location,
    language: text("language") || "Nederlands",
    price_cents,
    seats_total,
    status,
    notes: text("notes") || null
  };
}

function refreshPublicPages(slug: string) {
  revalidatePath(`/cursussen/${slug}`);
}

function back(path: string, message: string): never {
  redirect(`${path}${path.includes("?") ? "&" : "?"}fout=${encodeURIComponent(message)}`);
}

export async function createSessionAction(formData: FormData) {
  await requireAdmin();
  const input = readSessionForm(formData);
  if (typeof input === "string") back("/admin/sessies/nieuw", input);

  const { data, error, status } = await getSupabase().from("course_sessions").insert(input).select("id").single();
  if (error || !data) {
    console.error("Datum opslaan mislukt", error);
    back("/admin/sessies/nieuw", explainDbError(error, "Opslaan", status));
  }
  refreshPublicPages(input.course_slug);
  redirect(`/admin/sessies/${data.id}?ok=aangemaakt`);
}

export async function updateSessionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const path = `/admin/sessies/${id}`;
  const input = readSessionForm(formData);
  if (typeof input === "string") back(path, input);

  const supabase = getSupabase();
  const { data: current } = await supabase.from("course_sessions").select("course_slug, seats_taken").eq("id", id).single();
  if (!current) back("/admin", "Deze datum bestaat niet meer.");
  if (input.seats_total < current.seats_taken) {
    back(path, `Er zijn al ${current.seats_taken} plekken betaald. Het totaal kan niet lager zijn.`);
  }

  const { error } = await supabase.from("course_sessions").update(input).eq("id", id);
  if (error) {
    console.error("Datum bijwerken mislukt", error);
    back(path, explainDbError(error));
  }
  refreshPublicPages(current.course_slug);
  refreshPublicPages(input.course_slug);
  redirect(`${path}?ok=opgeslagen`);
}

export async function deleteSessionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = getSupabase();

  const { count } = await supabase.from("bookings").select("id", { count: "exact", head: true }).eq("session_id", id);
  if (count) back(`/admin/sessies/${id}`, "Deze datum heeft boekingen en kan niet verwijderd worden. Zet de status op 'Geannuleerd'.");

  const { data: current } = await supabase.from("course_sessions").select("course_slug").eq("id", id).single();
  const { error } = await supabase.from("course_sessions").delete().eq("id", id);
  if (error) {
    console.error("Datum verwijderen mislukt", error);
    back(`/admin/sessies/${id}`, explainDbError(error, "Verwijderen"));
  }
  if (current) refreshPublicPages(current.course_slug);
  redirect("/admin?ok=verwijderd");
}
