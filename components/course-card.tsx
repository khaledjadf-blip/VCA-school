import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CategoryFlipCard({
  title,
  description,
  detail,
  href
}: {
  title: string;
  description: string;
  detail: string;
  href: string;
  icon: string;
}) {
  return (
    <article className="route-card border border-[#d8e2ec] bg-white p-5">
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <p className="mt-5 border-l-2 border-accent bg-accent/10 p-3 text-sm font-semibold text-primary">{detail}</p>
      <Button asChild className="mt-6" variant="outline">
        <Link href={href}>Bekijk optie</Link>
      </Button>
    </article>
  );
}
