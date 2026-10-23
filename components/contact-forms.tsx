"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Req, RequiredNote } from "@/components/ui/required";
import { Textarea } from "@/components/ui/textarea";
import { courses } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Vul uw naam in."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  phone: z.string().min(8, "Vul een telefoonnummer in."),
  message: z.string().min(10, "Vertel kort waar we mee kunnen helpen.")
});

const enrollSchema = z.object({
  name: z.string().min(2, "Vul uw naam in."),
  email: z.string().email("Vul een geldig e-mailadres in."),
  phone: z.string().min(8, "Vul een telefoonnummer in."),
  course: z.string().min(1, "Kies een cursus."),
  type: z.string().min(1, "Kies een aanmeldingstype."),
  candidates: z.coerce.number().min(1).max(250),
  preferredDate: z.string().optional(),
  availableDays: z.array(z.string()).min(1, "Kies minstens een dag of 'in overleg'."),
  languageSupport: z.string().optional(),
  notes: z.string().optional()
});

type ContactValues = z.infer<typeof contactSchema>;
type EnrollValues = z.infer<typeof enrollSchema>;

function FieldError({ children }: { children?: string }) {
  return children ? <p className="mt-1 text-sm text-destructive">{children}</p> : null;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const form = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  async function submit(values: ContactValues) {
    setFailed(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
      form.reset();
    } catch {
      setFailed(true);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="official-card mt-5 grid gap-4 p-6">
      <h2 className="text-2xl font-bold">Stel uw vraag</h2>
      <RequiredNote />
      <label className="text-sm font-semibold">Naam<Req /><Input {...form.register("name")} className="mt-1" autoComplete="name" /></label>
      <FieldError>{form.formState.errors.name?.message}</FieldError>
      <label className="text-sm font-semibold">E-mail<Req /><Input {...form.register("email")} className="mt-1" autoComplete="email" /></label>
      <FieldError>{form.formState.errors.email?.message}</FieldError>
      <label className="text-sm font-semibold">Telefoon<Req /><Input {...form.register("phone")} className="mt-1" autoComplete="tel" /></label>
      <FieldError>{form.formState.errors.phone?.message}</FieldError>
      <label className="text-sm font-semibold">Bericht<Req /><Textarea {...form.register("message")} className="mt-1" /></label>
      <FieldError>{form.formState.errors.message?.message}</FieldError>
      {failed && <p className="border-l-4 border-destructive bg-secondary p-3 text-sm font-semibold">Versturen is niet gelukt. Probeer het opnieuw of bel/WhatsApp ons: <bdi dir="ltr">+31 6 16717342</bdi>.</p>}
      {sent && <p className="border-l-4 border-accent bg-secondary p-3 text-sm font-semibold">Dank u. We nemen snel contact op.</p>}
      <Button type="submit" variant="accent" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Bezig met versturen..." : "Verstuur bericht"}</Button>
    </form>
  );
}

export function EnrollmentForm({ defaultCourse }: { defaultCourse?: string }) {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const form = useForm<EnrollValues>({
    resolver: zodResolver(enrollSchema),
    defaultValues: { candidates: 1, course: defaultCourse ?? "", type: "", preferredDate: "", availableDays: [], languageSupport: "Geen voorkeur", notes: "" }
  });

  async function submit(values: EnrollValues) {
    setFailed(false);
    try {
      const res = await fetch("/api/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
    } catch {
      setFailed(true);
      return;
    }
    form.reset({ candidates: 1, course: defaultCourse ?? "", type: "", preferredDate: "", availableDays: [], languageSupport: "Geen voorkeur", notes: "" });
  }

  const availableDayOptions = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "In overleg"];

  return (
    <form onSubmit={form.handleSubmit(submit)} className="official-card mt-5 grid gap-5 p-6">
      <h2 className="text-2xl font-bold">Inschrijven of examen plannen</h2>
      <RequiredNote />
      <label className="text-sm font-semibold">Naam<Req /><Input {...form.register("name")} className="mt-1" autoComplete="name" /></label>
      <FieldError>{form.formState.errors.name?.message}</FieldError>
      <label className="text-sm font-semibold">E-mail<Req /><Input {...form.register("email")} className="mt-1" autoComplete="email" /></label>
      <FieldError>{form.formState.errors.email?.message}</FieldError>
      <label className="text-sm font-semibold">Telefoon<Req /><Input {...form.register("phone")} className="mt-1" autoComplete="tel" /></label>
      <FieldError>{form.formState.errors.phone?.message}</FieldError>
      <label className="text-sm font-semibold">
        Cursus<Req />
        <Select defaultValue={defaultCourse} onValueChange={(value) => form.setValue("course", value, { shouldValidate: true })}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Kies een cursus" /></SelectTrigger>
          <SelectContent>{courses.map((course) => <SelectItem key={course.slug} value={course.title}>{course.title}</SelectItem>)}</SelectContent>
        </Select>
      </label>
      <FieldError>{form.formState.errors.course?.message}</FieldError>
      <label className="text-sm font-semibold">
        Type aanmelding<Req />
        <Select onValueChange={(value) => form.setValue("type", value, { shouldValidate: true })}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Kies type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="course">Cursus met examen</SelectItem>
            <SelectItem value="exam">Alleen examenregistratie</SelectItem>
            <SelectItem value="company">Bedrijfsgroep / incompany</SelectItem>
          </SelectContent>
        </Select>
      </label>
      <FieldError>{form.formState.errors.type?.message}</FieldError>
      <label className="text-sm font-semibold">Aantal kandidaten<Req /><Input type="number" min={1} {...form.register("candidates")} className="mt-1" /></label>
      <FieldError>{form.formState.errors.candidates?.message}</FieldError>
      <div>
        <label className="text-sm font-semibold">Voorkeursdatum</label>
        <Input type="date" {...form.register("preferredDate")} className="mt-1" />
        <p className="mt-1 text-xs text-muted-foreground">Heeft u nog geen vaste datum? Kies hieronder meerdere beschikbare dagen.</p>
      </div>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold">Beschikbare dagen<Req /></legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {availableDayOptions.map((day) => (
            <label key={day} className="flex items-center gap-2 border border-border bg-white px-3 py-3 text-sm font-semibold">
              <input type="checkbox" value={day} {...form.register("availableDays")} className="h-4 w-4 accent-accent" />
              {day}
            </label>
          ))}
        </div>
        <FieldError>{form.formState.errors.availableDays?.message}</FieldError>
      </fieldset>
      <label className="text-sm font-semibold">
        Taalondersteuning
        <Select defaultValue="Geen voorkeur" onValueChange={(value) => form.setValue("languageSupport", value, { shouldValidate: true })}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Kies taalondersteuning" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Geen voorkeur">Geen voorkeur</SelectItem>
            <SelectItem value="Nederlands">Nederlands</SelectItem>
            <SelectItem value="Arabisch">Arabische begeleiding gewenst</SelectItem>
            <SelectItem value="Twijfel">Ik twijfel, bel mij hierover</SelectItem>
          </SelectContent>
        </Select>
      </label>
      <label className="text-sm font-semibold">Extra informatie<Textarea {...form.register("notes")} className="mt-1" placeholder="Bijvoorbeeld locatie, groep, spoed, klacht of vraag over examen." /></label>
      {failed && <p className="border-l-4 border-destructive bg-secondary p-3 text-sm font-semibold">Versturen is niet gelukt. Probeer het opnieuw of bel/WhatsApp ons: <bdi dir="ltr">+31 6 16717342</bdi>.</p>}
      {sent && <p className="border-l-4 border-accent bg-secondary p-3 text-sm font-semibold">Inschrijving ontvangen. Wij nemen zo snel mogelijk contact met u op.</p>}
      <Button type="submit" variant="accent" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Bezig met versturen..." : "Aanmelding versturen"}</Button>
    </form>
  );
}
