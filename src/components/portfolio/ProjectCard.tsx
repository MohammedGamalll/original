"use client";

import Link from "next/link";
import type { Project } from "@/types/project";
import { Reveal } from "@/components/motion/Reveal";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { cn } from "@/lib/utils";
import { saveReturnPosition } from "@/lib/scroll-return";

const aspects = {
  featured: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8]",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
} as const;

export function ProjectCard({
  project,
  variant = "landscape",
  index = 0,
  className,
}: {
  project: Project;
  variant?: keyof typeof aspects;
  index?: number;
  className?: string;
}) {
  return (
    <article className={className}>
      <Link
        href={`/projects/${project.slug}/`}
        onClick={() => saveReturnPosition()}
        className="group block"
      >
        <Reveal>
          <div className={cn("relative overflow-hidden bg-sand/40", aspects[variant])}>
            <ResponsiveImage
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              sizes={
                variant === "featured"
                  ? "(min-width: 1024px) 76rem, 100vw"
                  : "(min-width: 1024px) 40rem, 100vw"
              }
              className="card-zoom object-center"
            />
          </div>
        </Reveal>
        <div className="flex items-end justify-between gap-4 px-1 py-4 sm:px-0">
          <div>
            <p className="flex flex-wrap items-center gap-3 text-sm text-ink/80">
              <span className="font-display text-base text-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{project.category}</span>
              {project.year ? <span>{project.year}</span> : null}
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold leading-snug transition-transform duration-300 group-hover:-translate-x-1 sm:text-3xl">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}
