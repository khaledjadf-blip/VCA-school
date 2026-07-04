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
    <article className="border border-[#d8e2ec] bg-white p-5">
      <Icon className="mb-4 h-6 w-6 text-accent" aria-hidden="true" />
      <h3 className="text-xl font-bold">{title}</h3>
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
