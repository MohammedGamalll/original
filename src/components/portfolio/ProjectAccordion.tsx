"use client";

import { ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";
import {
  enterVideoFullscreen,
  setVideoAudible,
  watchVideoFullscreen,
} from "@/lib/video-fullscreen";
import { cn, formatArabicNumber } from "@/lib/utils";
import type { Project, ProjectSlide } from "@/types/project";

const BATCH = 4;
const MIN_SWIPE_DISTANCE = 50; // الحد الأدنى لمسافة السحب باللمس للتنقل

function projectChatUrl(title: string) {
  const text = `السلام عليكم، حابب أسأل عن عمل: ${title}`;
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

function ActiveVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [audible, setAudible] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.src = src;
    setVideoAudible(video, false);
    void video.play().catch(() => {});

    const stopWatch = watchVideoFullscreen(video, (fullscreen) => {
      video.classList.toggle("object-cover", !fullscreen);
      video.classList.toggle("object-contain", fullscreen);
      video.classList.toggle("bg-black", fullscreen);
      setVideoAudible(video, fullscreen);
      setAudible(fullscreen);
    });

    return () => {
      stopWatch();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  function expand(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const video = ref.current;
    if (!video) return;
    enterVideoFullscreen(video, setAudible);
  }

  return (
    <>
      <video
        ref={ref}
        muted={!audible}
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
  const [slideIndex, setSlideIndex] = useState(0);

  // مراجع لحساب حركة السحب باللمس
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // تجميع كافة عناصر المعرض (صور أو فيديوهات)، وإن لم توجد نستخدم صورة الغلاف
  const slides: ProjectSlide[] =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [
          {
            kind: "image",
            src: project.cover.src,
            thumb: project.cover.thumb,
            alt: project.cover.alt,
            width: project.cover.width,
            height: project.cover.height,
          },
        ];

  // إعادة ضبط السلايدر للشريحة الأولى عند إغلاق الكارت
  useEffect(() => {
    if (!active) {
      setSlideIndex(0);
    }
  }, [active]);

  const currentSlide = slides[slideIndex] || slides[0];

  function nextSlide(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    setSlideIndex((prev) => (prev + 1) % slides.length);
  }

  function prevSlide(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

  // أحداث السحب باللمس (Touch Gestures)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > MIN_SWIPE_DISTANCE) {
      // سحب لليسار -> الشريحة التالية
      nextSlide();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      // سحب لليمين -> الشريحة السابقة
      prevSlide();
    }
  };

  return (
    <article
      className={cn(
        "relative min-w-0 cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out select-none",
        active
          ? "h-[420px] flex-[4] md:h-auto md:brightness-100"
          : "h-14 flex-[1] brightness-90 hover:brightness-100 md:h-auto",
      )}
      onClick={onOpen}
      onTouchStart={active && slides.length > 1 ? handleTouchStart : undefined}
      onTouchMove={active && slides.length > 1 ? handleTouchMove : undefined}
      onTouchEnd={active && slides.length > 1 ? handleTouchEnd : undefined}
    >
      {/* 1. عرض الشريحة الحالية (فيديو أو صورة) */}
      {active ? (
        currentSlide.kind === "video" ? (
          <ActiveVideo key={currentSlide.src} src={currentSlide.src} />
        ) : (
          <ResponsiveImage
            key={currentSlide.src}
            src={currentSlide.src}
            alt={project.title}
            width={currentSlide.width}
            sizes="(min-width: 768px) 70vw, 100vw"
            className="pointer-events-none object-cover transition-opacity duration-300"
          />
        )
      ) : (
        <ResponsiveImage
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          sizes="(min-width: 768px) 70vw, 100vw"
          className="pointer-events-none object-cover"
        />
      )}

      {/* 2. تعتيم الكارت المغلق */}
      {!active && (
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 transition-opacity" />
      )}

      {/* 3. عناصر التحكم بالمعرض (تظهر فقط عند فتح الكارت وأكثريّة العناصر > 1) */}
      {active && slides.length > 1 && (
        <>
          {/* مؤشر النقاط السفلي (Dots) */}
          <div className="absolute bottom-3 start-1/2 translate-x-1/2 z-30 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`الانتقال للشريحة ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSlideIndex(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  slideIndex === i ? "w-4 bg-[#D8C4B6]" : "w-1.5 bg-white/50",
                )}
              />
            ))}
          </div>

          {/* سهم التنقل السابق (اليمين في الواجهة العربية) */}
          <button
            type="button"
            aria-label="الشريحة السابقة"
            onClick={prevSlide}
            className="absolute start-3 top-1/2 z-30 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-ivory backdrop-blur-md transition-all active:scale-95 hover:bg-black/80"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* سهم التنقل التالي (اليسار في الواجهة العربية) */}
          <button
            type="button"
            aria-label="الشريحة التالية"
            onClick={nextSlide}
            className="absolute end-3 top-1/2 z-30 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-ivory backdrop-blur-md transition-all active:scale-95 hover:bg-black/80"
          >
            <ChevronLeft className="size-5" />
          </button>
        </>
      )}

      {/* 4. تفاصيل الكارت المغلق */}
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

      {/* 5. تفاصيل الكارت المفتوح */}
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
        <p className="mt-1 mb-4 line-clamp-2 max-w-xl text-xs leading-5 text-ivory/85 drop-shadow-sm md:text-sm md:leading-6">
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
            className="bg-[#D8C4B6] px-4 py-2 text-sm text-ink transition-colors hover:bg-[#cbb5a5]"
            onClick={() => go(batch - 1)}
          >
            السابق
          </button>
          <p className="text-sm text-ink/80">
            {formatArabicNumber(batch + 1)} / {formatArabicNumber(pageCount)}
          </p>
          <button
            type="button"
            className="bg-[#D8C4B6] px-4 py-2 text-sm text-ink transition-colors hover:bg-[#cbb5a5]"
            onClick={() => go(batch + 1)}
          >
            التالي
          </button>
        </div>
      ) : null}
    </div>
  );
}
