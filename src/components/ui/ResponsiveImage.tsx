import { cn } from "@/lib/utils";

/**
 * Local srcset for the static export. Next's image optimizer is off, so the
 * browser chooses between the 800px file and the full file.
 */
export function ResponsiveImage({
  src,
  alt,
  sizes,
  width = 1600,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  const small = src.replace(/\.webp$/, "-sm.webp");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={small}
      srcSet={`${small} 800w, ${src} ${width}w`}
      sizes={sizes}
      alt={alt}
      decoding="async"
      draggable={false}
      {...(priority
        ? { loading: "eager" as const, fetchPriority: "high" as const }
        : { loading: "lazy" as const })}
      className={cn("absolute inset-0 h-full w-full max-w-none object-cover", className)}
    />
  );
}
