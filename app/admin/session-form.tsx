import { fieldClass } from "@/app/admin/admin-ui";
import { DEFAULT_LOCATION } from "@/lib/admin-labels";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";

export type SessionFormValues = {
  id?: string;
  course_slug: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  language: string;
  price: string;
  seats_total: string;
  status: string;
  notes: string;
};

export const emptySessionForm: SessionFormValues = {
  course_slug: "",
  date: "",
  start_time: "08:30",
  end_time: "16:30",
  location: DEFAULT_LOCATION,
  language: "Nederlands",
  price: "",
  seats_total: "12",
  status: "open",
  notes: ""
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="grid content-start gap-1.5 text-sm font-semibold">
      {label}
      {children}
      {hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function SessionForm({
  action,
  values,
  submitLabel
}: {
  action: (formData: FormData) => Promise<void>;
  values: SessionFormValues;
  submitLabel: string;
}) {
  return (
    // key: bij navigatie tussen pagina's moeten de velden echt opnieuw gevuld worden.
    <form key={JSON.stringify(values)} action={action} className="official-card grid gap-5 p-6">
      {values.id ? <input type="hidden" name="id" value={values.id} /> : null}

      <Field label="Cursus">
        <select name="course_slug" required defaultValue={values.course_slug} className={fieldClass}>
          <option value="" disabled>Kies een cursus</option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>{c.title}</option>
          ))}
        </select>
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Datum">
          <input type="date" name="date" required defaultValue={values.date} className={fieldClass} />
        </Field>
        <Field label="Begintijd">
          <input type="time" name="start_time" required defaultValue={values.start_time} className={fieldClass} />
        </Field>
        <Field label="Eindtijd" hint="Mag leeg blijven.">
          <input type="time" name="end_time" defaultValue={values.end_time} className={fieldClass} />
        </Field>
      </div>

      <Field label="Locatie">
        <input type="text" name="location" required defaultValue={values.location} className={fieldClass} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Prijs (EUR)" hint="Bijvoorbeeld 219 of 219,50">
          <input type="text" inputMode="decimal" name="price" required defaultValue={values.price} className={fieldClass} />
        </Field>
        <Field label="Aantal plekken">
          <input type="number" name="seats_total" min={1} max={500} required defaultValue={values.seats_total} className={fieldClass} />
        </Field>
        <Field label="Lestaal">
          <input type="text" name="language" defaultValue={values.language} className={fieldClass} />
        </Field>
      </div>

      <Field label="Status" hint="Gesloten = zichtbaar als 'Vol'. Geannuleerd = niet zichtbaar op de website.">
        <select name="status" defaultValue={values.status} className={fieldClass}>
          <option value="open">Open</option>
          <option value="closed">Gesloten</option>
          <option value="cancelled">Geannuleerd</option>
        </select>
      </Field>

      <Field label="Interne notitie" hint="Alleen zichtbaar voor beheer.">
        <textarea name="notes" rows={3} defaultValue={values.notes} className={`${fieldClass} h-auto`} />
      </Field>

      <div>
        <Button type="submit" variant="accent">{submitLabel}</Button>
      </div>
    </form>
  );
}
