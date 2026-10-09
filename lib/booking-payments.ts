// Betaalstatus verwerken: boeking bevestigen, plek tellen en e-mails versturen.
import "server-only";
import { revalidatePath } from "next/cache";
import { courseTitle } from "@/lib/admin-labels";
import { getPaymentProvider } from "@/lib/payments";
import { rowsToHtml, sendEmail } from "@/lib/send-email";
import { getSupabase, type Booking, type CourseSession } from "@/lib/supabase";
import { TIME_ZONE, formatEuro } from "@/lib/time";

export type BookingWithSession = Booking & { course_sessions: CourseSession };

const failedStatuses = new Set(["failed", "canceled", "expired"]);

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function dateText(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE
  }).format(new Date(iso));
}

function timeText(session: CourseSession) {
  const t = (iso: string) =>
    new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE }).format(new Date(iso));
  return session.ends_at ? `${t(session.starts_at)} – ${t(session.ends_at)}` : t(session.starts_at);
}

function customerEmailHtml(b: BookingWithSession) {
  const s = b.course_sessions;
  const course = escapeHtml(courseTitle(s.course_slug));
  const location = escapeHtml(s.location);
  const name = escapeHtml(b.first_name);
  const row = (label: string, value: string, rtl = false) =>
    `<tr><td style="padding:${rtl ? "4px 0 4px 12px" : "4px 12px 4px 0"};font-weight:bold;vertical-align:top">${label}</td><td style="padding:4px 0">${value}</td></tr>`;

  return `<div style="font-family:Arial,sans-serif;color:#0b2b44;max-width:560px">
  <h2 style="color:#154273">Uw boeking is bevestigd</h2>
  <p>Beste ${name},</p>
  <p>Bedankt voor uw betaling. Uw plek is gereserveerd.</p>
  <table style="border-collapse:collapse;margin:12px 0">
    ${row("Cursus", course)}
    ${row("Datum", escapeHtml(dateText(s.starts_at, "nl-NL")))}
    ${row("Tijd", escapeHtml(timeText(s)))}
    ${row("Locatie", location)}
    ${row("Betaald", escapeHtml(formatEuro(b.amount_cents)))}
  </table>
  <p>Neem op de cursusdag een geldig identiteitsbewijs mee (paspoort, ID-kaart of rijbewijs). Kom graag 15 minuten voor aanvang.</p>
  <p>Annuleren is kosteloos tot 7 dagen voor de cursusdatum: stuur dan een e-mail naar info@vcaveiligvakkundig.nl. Daarna is terugbetaling niet mogelijk. Zie onze <a href="https://vcaveiligvakkundig.nl/voorwaarden">voorwaarden</a>.</p>
  <p>Vragen? Antwoord op deze e-mail of bel/WhatsApp <a href="tel:+31616717342">+31 6 16717342</a>.</p>
  <p>Met vriendelijke groet,<br>VCA Veilig &amp; Vakkundig B.V.</p>
  <hr style="border:none;border-top:1px solid #d8e2ec;margin:24px 0">
  <div dir="rtl" style="text-align:right">
    <h2 style="color:#154273">تم تأكيد حجزك</h2>
    <p>مرحبا ${name}،</p>
    <p>شكرا لك على الدفع. تم حجز مقعدك.</p>
    <table style="border-collapse:collapse;margin:12px 0">
      ${row("الدورة", course, true)}
      ${row("التاريخ", escapeHtml(dateText(s.starts_at, "ar-u-nu-latn")), true)}
      ${row("الوقت", `<span dir="ltr">${escapeHtml(timeText(s))}</span>`, true)}
      ${row("المكان", `<span dir="ltr">${location}</span>`, true)}
    </table>
    <p>أحضر معك يوم الدورة إثبات هوية ساري المفعول (جواز سفر أو بطاقة هوية أو رخصة قيادة). يرجى الحضور قبل 15 دقيقة من البداية.</p>
    <p>الإلغاء مجاني حتى 7 أيام قبل موعد الدورة: أرسل إيميل إلى <span dir="ltr">info@vcaveiligvakkundig.nl</span>. بعد ذلك لا يمكن إرجاع المبلغ.</p>
    <p>لأي سؤال: رد على هذا الإيميل أو اتصل / واتساب <span dir="ltr">+31 6 16717342</span>.</p>
  </div>
</div>`;
}

async function sendConfirmationEmails(b: BookingWithSession) {
  const s = b.course_sessions;
  const course = courseTitle(s.course_slug);
  const when = `${dateText(s.starts_at, "nl-NL")} ${timeText(s)}`;

  const results = await Promise.allSettled([
    sendEmail({
      subject: `Betaalde boeking: ${course} – ${b.first_name} ${b.last_name}`,
      replyTo: b.email,
      html: rowsToHtml("Nieuwe betaalde boeking", [
        ["Cursus", course],
        ["Datum", when],
        ["Locatie", s.location],
        ["Naam", `${b.first_name} ${b.last_name}`],
        ["E-mail", b.email],
        ["Telefoon", b.phone],
        ["Geboortedatum", b.birth_date],
        ["Geboorteplaats", b.birth_place],
        ["Bedrijf", b.company],
        ["Opmerking", b.notes],
        ["Bedrag", formatEuro(b.amount_cents)],
        ["Betaal-ID", b.payment_id],
        ["Plekken bezet", `${s.seats_taken} / ${s.seats_total}`]
      ])
    }),
    sendEmail({
      to: b.email,
      fromName: "VCA Veilig & Vakkundig",
      replyTo: process.env.CONTACT_TO_EMAIL,
      subject: `Bevestiging: ${course} op ${dateText(s.starts_at, "nl-NL")}`,
      html: customerEmailHtml(b)
    })
  ]);
  for (const r of results) if (r.status === "rejected") console.error("Bevestigingsmail versturen mislukt", r.reason);
}

/** E-mail aan de klant (met kopie aan het bedrijf) na annuleren door beheer. */
export async function sendCancellationEmails(b: BookingWithSession, refunded: boolean) {
  const s = b.course_sessions;
  const course = escapeHtml(courseTitle(s.course_slug));
  const name = escapeHtml(b.first_name);
  const amount = escapeHtml(formatEuro(b.amount_cents));
  const dateNl = escapeHtml(dateText(s.starts_at, "nl-NL"));
  const dateAr = escapeHtml(dateText(s.starts_at, "ar-u-nu-latn"));
  const time = escapeHtml(timeText(s));

  const html = `<div style="font-family:Arial,sans-serif;color:#0b2b44;max-width:560px">
  <h2 style="color:#154273">Uw boeking is geannuleerd</h2>
  <p>Beste ${name},</p>
  <p>Uw boeking voor <strong>${course}</strong> op ${dateNl} (${time}) is geannuleerd.</p>
  ${refunded
    ? `<p>Wij hebben ${amount} terugbetaald. Het bedrag staat binnen enkele werkdagen weer op uw rekening.</p>`
    : `<p>Volgens onze <a href="https://vcaveiligvakkundig.nl/voorwaarden">voorwaarden</a> is bij annuleren binnen 7 dagen voor de cursusdatum geen terugbetaling mogelijk.</p>`}
  <p>Wilt u een nieuwe datum boeken? Kijk op <a href="https://vcaveiligvakkundig.nl/inschrijven">vcaveiligvakkundig.nl/inschrijven</a>. Vragen? Antwoord op deze e-mail of bel/WhatsApp <a href="tel:+31616717342">+31 6 16717342</a>.</p>
  <p>Met vriendelijke groet,<br>VCA Veilig &amp; Vakkundig B.V.</p>
  <hr style="border:none;border-top:1px solid #d8e2ec;margin:24px 0">
  <div dir="rtl" style="text-align:right">
    <h2 style="color:#154273">تم إلغاء حجزك</h2>
    <p>مرحبا ${name}،</p>
    <p>تم إلغاء حجزك لدورة <strong>${course}</strong> بتاريخ ${dateAr} (<span dir="ltr">${time}</span>).</p>
    ${refunded
      ? `<p>أرجعنا لك مبلغ <span dir="ltr">${amount}</span>. سيصل إلى حسابك خلال أيام عمل قليلة.</p>`
      : `<p>حسب الشروط، الإلغاء خلال الأيام السبعة الأخيرة قبل الدورة لا يشمل إرجاع المبلغ.</p>`}
    <p>لحجز موعد جديد: <span dir="ltr">vcaveiligvakkundig.nl/inschrijven</span>. لأي سؤال: رد على هذا الإيميل أو اتصل / واتساب <span dir="ltr">+31 6 16717342</span>.</p>
  </div>
</div>`;

  const subject = `Geannuleerd: ${courseTitle(s.course_slug)} op ${dateText(s.starts_at, "nl-NL")}`;
  const results = await Promise.allSettled([
    sendEmail({ to: b.email, fromName: "VCA Veilig & Vakkundig", replyTo: process.env.CONTACT_TO_EMAIL, subject, html }),
    sendEmail({ subject: `Kopie – ${subject} – ${b.first_name} ${b.last_name}`, replyTo: b.email, html })
  ]);
  const failed = results.filter((r) => r.status === "rejected");
  for (const r of failed) console.error("Annuleringsmail versturen mislukt", (r as PromiseRejectedResult).reason);
  // De klant-e-mail is de belangrijkste.
  return results[0].status === "fulfilled";
}

/**
 * Haalt de actuele status bij de betaalaanbieder op en werkt de boeking bij.
 * Veilig om vaak aan te roepen (webhook én terugkeerpagina): een plek en de
 * e-mails worden maar één keer verwerkt.
 */
export async function syncPayment(paymentId: string): Promise<Booking["status"] | null> {
  const provider = getPaymentProvider();
  if (!provider) return null;

  const payment = await provider.getPayment(paymentId);
  const supabase = getSupabase();
  const { data } = await supabase
    .from("bookings")
    .select("*, course_sessions(*)")
    .eq("payment_id", payment.id)
    .maybeSingle();
  const booking = data as BookingWithSession | null;
  if (!booking || booking.id !== payment.bookingId) return null;

  // Door beheer geannuleerd of terugbetaald: Mollie meldt na een terugbetaling
  // nog steeds "paid", dus niet opnieuw bevestigen.
  if (booking.status === "canceled" || booking.status === "refunded") return booking.status;

  if (payment.status === "paid") {
    if (payment.amountCents !== booking.amount_cents) {
      console.error("Betaald bedrag wijkt af van boeking", { bookingId: booking.id, paymentId: payment.id });
      return booking.status;
    }
    const { data: firstTime, error } = await supabase.rpc("mark_booking_paid", { p_booking_id: booking.id });
    if (error) throw error;
    if (firstTime) {
      const { data: fresh } = await supabase.from("bookings").select("*, course_sessions(*)").eq("id", booking.id).single();
      await sendConfirmationEmails((fresh ?? booking) as BookingWithSession);
      revalidatePath(`/cursussen/${booking.course_sessions.course_slug}`);
    }
    return "paid";
  }

  if (failedStatuses.has(payment.status) && booking.status === "pending") {
    const status = payment.status as Booking["status"];
    await supabase.from("bookings").update({ status }).eq("id", booking.id).eq("status", "pending");
    revalidatePath(`/cursussen/${booking.course_sessions.course_slug}`);
    return status;
  }

  return booking.status;
}
