import { permanentRedirect } from "next/navigation";

// De oude demo-planning is vervangen door echte cursusdata op /inschrijven.
export default function ClassesPage() {
  permanentRedirect("/inschrijven");
}
