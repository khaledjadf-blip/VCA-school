// Supabase-verbinding — ALLEEN op de server gebruiken (nooit in de browser).
// Nodig in Vercel → Settings → Environment Variables:
//   SUPABASE_URL               = https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  = geheime service_role key (Project Settings → API)
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type CourseSession = {
  id: string;
  course_slug: string;
  starts_at: string;
  ends_at: string | null;
  location: string;
  language: string;
  price_cents: number;
  seats_total: number;
  seats_taken: number;
  status: "open" | "closed" | "cancelled";
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  session_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string | null;
  birth_place: string | null;
  company: string | null;
  notes: string | null;
  amount_cents: number;
  status: "pending" | "paid" | "failed" | "canceled" | "expired" | "refunded";
  payment_provider: string | null;
  payment_id: string | null;
  seat_counted: boolean;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// Accepteer ook een URL die (per ongeluk) eindigt op /rest/v1 of een slash.
function projectUrl(raw: string) {
  return raw.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/i, "").replace(/\/+$/, "");
}

export function getSupabase(): SupabaseClient {
  const rawUrl = process.env.SUPABASE_URL;
  const url = rawUrl ? projectUrl(rawUrl) : undefined;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Database-instellingen ontbreken (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }
  if (!client) {
    client = createClient(url, key.trim(), { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return client;
}
