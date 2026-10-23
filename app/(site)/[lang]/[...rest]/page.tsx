import { notFound } from "next/navigation";

// Onbekende pagina's krijgen de eigen 404-pagina (in de juiste taal).
export default function CatchAll() {
  notFound();
}
