import Link from "next/link";
import { ArrowRight, BookOpen, Forklift, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const icons = {
  book: BookOpen,
  forklift: Forklift,
  shield: ShieldCheck
};

export function CategoryFlipCard({
  title,
  description,
  detail,
  href,
  icon
}: {
  title: string;
  description: string;
  detail: string;
  href: string;
  icon: keyof typeof icons;
}) {
  const Icon = icons[icon];

  return (
    <article className="route-card border border-[#d8e2ec] bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="route-card-code">Route</span>
      </div>
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
      <p className="mt-5 border-l-2 border-accent bg-accent/10 p-3 text-sm font-semibold text-primary">{detail}</p>
      <Button asChild className="mt-6" variant="outline">
        <Link href={href}>
          Bekijk optie <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}
