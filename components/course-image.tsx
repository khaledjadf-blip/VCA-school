import type { CourseImageInfo } from "@/lib/visual-assets";
import { cn } from "@/lib/utils";

/** Cursusfoto; foto's met een open licentie tonen de maker en licentie eronder. */
export function CourseImage({ image, className, priority = false }: { image: CourseImageInfo; className?: string; priority?: boolean }) {
  return (
    <figure className={cn("relative overflow-hidden border border-border bg-secondary", className)}>
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {image.credit ? (
        <figcaption className="absolute bottom-0 right-0 bg-black/55 px-2 py-0.5 text-[10px] text-white" dir="ltr" data-no-translate>
          <a href={image.credit.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            Foto: {image.credit.author} · {image.credit.license}
          </a>
        </figcaption>
      ) : null}
    </figure>
  );
}
