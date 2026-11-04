"use client";

import { Maximize } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import { cn, formatArabicNumber } from "@/lib/utils";
import type { Project, ProjectVideo } from "@/types/project";

const BATCH = 4;

function videoSource(project: Project) {
  return project.gallery.find(
    (slide): slide is ProjectVideo => slide.kind === "video",
  )?.src;
}

function projectChatUrl(title: string) {
  const text = `السلام عليكم، حابب أسأل عن عمل: ${title}`;
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

function ActiveVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.src = src;
    void video.play().catch(() => {});

    const fit = () => {
      const full = document.fullscreenElement === video;
      video.classList.toggle("object-cover", !full);
      video.classList.toggle("object-contain", full);
      video.classList.toggle("bg-black", full);
    };
    document.addEventListener("fullscreenchange", fit);

    return () => {
      document.removeEventListener("fullscreenchange", fit);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  function expand(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const video = ref.current;
    if (!video) return;
    const webkit = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };
    if (webkit.webkitEnterFullscreen) {
      webkit.webkitEnterFullscreen();
      return;
    }
    void video.requestFullscreen().catch(() => {});
  }

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <button
        type="button"
        aria-label="عرض الفيديو بملء الشاشة"
        className="absolute top-3 z-30 flex size-10 items-center justify-center rounded-full bg-black/60 text-ivory start-3 backdrop-blur-md transition-transform active:scale-95"
        onClick={expand}
      >
        <Maximize aria-hidden className="size-5" />
      </button>
    </>
  );
}

function AccordionPanel({
  project,
  number,
  active,
  onOpen,
}: {
  project: Project;
  number: number;
  active: boolean;
  onOpen: () => void;
}) {
  const src = videoSource(project);

  return (
    <article
      className={cn(
        "relative min-w-0 cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out",
        active
          ? "h-[380px] flex-[4] md:h-auto md:brightness-100"
          : "h-14 flex-[1] brightness-90 hover:brightness-100 md:h-auto",
      )}
      onClick={onOpen}
    >
      <ResponsiveImage
        src={project.cover.src}
        alt={active ? "" : project.cover.alt}
        width={project.cover.width}
        sizes="(min-width: 768px) 70vw, 100vw"
        className="pointer-events-none object-cover"
      />
      {active && src ? <ActiveVideo src={src} /> : null}

      {!active && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 transition-opacity" />
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4 text-ivory transition-opacity duration-300 md:flex-col md:items-center md:justify-between md:py-5",
          active ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="font-display text-base font-medium opacity-80 md:text-2xl">
          {formatArabicNumber(number)}
        </span>
        <span className="font-display text-sm font-medium md:text-lg md:[writing-mode:vertical-rl]">
          {project.title}
        </span>
      </div>

      <div
        aria-hidden={active ? undefined : true}
        inert={active ? undefined : true}
        className={cn(
          "absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-500 md:p-6",
          active ? "opacity-100 delay-150" : "pointer-events-none opacity-0",
        )}
      >
        <h3 className="font-display text-lg font-semibold text-white drop-shadow-sm md:text-2xl">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 max-w-xl text-xs leading-5 text-ivory/85 drop-shadow-sm md:text-sm md:leading-6">
          {project.summary}
        </p>
      </div>
    </article>
  );
}

export function ProjectAccordion() {
  const [batch, setBatch] = useState(0);
  const [active, setActive] = useState(0);
  const pageCount = Math.max(1, Math.ceil(projects.length / BATCH));
  const slice = projects.slice(batch * BATCH, batch * BATCH + BATCH);

  function go(nextBatch: number) {
    setBatch((nextBatch + pageCount) % pageCount);
    setActive(0);
  }

  return (
    <div>
      <div
        className="flex w-full flex-col gap-2 overflow-hidden h-screen md:h-[600px] md:flex-row md:gap-4"
        role="list"
      >
        {slice.map((project, index) => (
          <AccordionPanel
            key={project.slug}
            project={project}
            number={batch * BATCH + index + 1}
            active={index === active}
            onOpen={() => setActive(index)}
          />
        ))}
      </div>
      {pageCount > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            className="bg-[#D8C4B6] px-4 py-2 text-sm text-ink"
            onClick={() => go(batch - 1)}
          >
            السابق
          </button>
          <p className="text-sm text-ink/80">
            {formatArabicNumber(batch + 1)} / {formatArabicNumber(pageCount)}
          </p>
          <button
            type="button"
            className="bg-[#D8C4B6] px-4 py-2 text-sm text-ink"
            onClick={() => go(batch + 1)}
          >
            التالي
          </button>
        </div>
      ) : null}
    </div>
  );
}
