"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/types/project";
import { cn, formatArabicNumber } from "@/lib/utils";

const SWIPE_DISTANCE = 56;
const SWIPE_VELOCITY = 0.55;

export function ProjectCarousel({ images }: { images: ProjectImage[] }) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const gesture = useRef({
    id: -1,
    x: 0,
    y: 0,
    time: 0,
    axis: null as "x" | "y" | null,
  });
  const indexRef = useRef(index);
  const total = images.length;
  const current = images[index];

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function go(nextIndex: number) {
    if (total === 0) return;
    const normalized = (nextIndex + total) % total;
    const jump = Math.abs(normalized - indexRef.current) > 1;
    indexRef.current = normalized;
    draggingRef.current = false;
    setDragging(false);
    if (jump) {
      setAnimate(false);
      setDrag(0);
      setIndex(normalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
      return;
    }
    setAnimate(true);
    requestAnimationFrame(() => {
      setDrag(0);
      setIndex(normalized);
    });
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
      axis: null,
    };
    draggingRef.current = true;
    setDragging(true);
    setAnimate(false);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current || event.pointerId !== gesture.current.id) return;
    const deltaX = event.clientX - gesture.current.x;
    const deltaY = event.clientY - gesture.current.y;
    if (!gesture.current.axis) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
      gesture.current.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
      if (gesture.current.axis === "y") {
        draggingRef.current = false;
        setDragging(false);
        setDrag(0);
        return;
      }
      try {
        stageRef.current?.setPointerCapture(event.pointerId);
      } catch {
        // Synthetic or already-released pointers cannot be captured.
      }
    }
    if (gesture.current.axis !== "x") return;
    setDrag(deltaX);
  }

  function finishPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerId !== gesture.current.id) return;
    const deltaX = event.clientX - gesture.current.x;
    const deltaY = event.clientY - gesture.current.y;
    const elapsed = Math.max(performance.now() - gesture.current.time, 1);
    const velocity = deltaX / elapsed;
    const horizontal = gesture.current.axis === "x";
    gesture.current.id = -1;
    gesture.current.axis = null;
    draggingRef.current = false;
    if (stageRef.current?.hasPointerCapture(event.pointerId)) {
      try {
        stageRef.current.releasePointerCapture(event.pointerId);
      } catch {
        // The pointer may already have been released.
      }
    }
    if (
      horizontal &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      (Math.abs(deltaX) > SWIPE_DISTANCE || Math.abs(velocity) > SWIPE_VELOCITY)
    ) {
      go(indexRef.current + (deltaX < 0 ? 1 : -1));
      return;
    }
    setDragging(false);
    setAnimate(true);
    requestAnimationFrame(() => setDrag(0));
  }

  if (!current) return null;

  const shift = (-index * 100) / total;

  return (
    <div
      className="grid gap-4"
      role="region"
      aria-roledescription="carousel"
      aria-label="صور المشروع"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(index + 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(index - 1);
        }
      }}
    >
      <div
        ref={stageRef}
        className={cn(
          "relative aspect-[16/10] touch-pan-y overflow-hidden bg-sand/50 select-none",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
      >
        <div
          dir="ltr"
          className="absolute inset-y-0 left-0 flex"
          style={{
            width: `${total * 100}%`,
            transform: `translate3d(calc(${shift}% + ${drag}px), 0, 0)`,
            transition:
              animate && !dragging && !reduceMotion
                ? "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
          }}
        >
          {images.map((image, imageIndex) => (
            <div
              key={image.src}
              className="relative h-full"
              style={{ width: `${100 / total}%` }}
              aria-hidden={imageIndex !== index}
            >
              <Image
                src={image.src}
                alt={imageIndex === index ? image.alt : ""}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 76rem, 100vw"
                {...(imageIndex === 0
                  ? { priority: true as const }
                  : { loading: "eager" as const })}
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/80" aria-live="polite">
          {formatArabicNumber(index + 1)} / {formatArabicNumber(total)}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-taupe"
            onClick={() => go(index - 1)}
          >
            <ArrowRight aria-hidden className="size-4" />
            السابق
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-ink/15 px-4 py-2 text-sm transition-colors hover:border-taupe"
            onClick={() => go(index + 1)}
          >
            التالي
            <ArrowLeft aria-hidden className="size-4" />
          </button>
        </div>
      </div>

      <ul className="flex gap-3 overflow-x-auto pb-1">
        {images.map((image, imageIndex) => (
          <li key={image.thumb} className="shrink-0">
            <button
              type="button"
              className={cn(
                "relative block h-20 w-28 overflow-hidden",
                imageIndex === index ? "outline outline-1 outline-offset-2 outline-ink" : "opacity-70",
              )}
              aria-label={`عرض الصورة ${formatArabicNumber(imageIndex + 1)}`}
              aria-current={imageIndex === index ? "true" : undefined}
              onClick={() => go(imageIndex)}
            >
              <Image src={image.thumb} alt="" fill sizes="112px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
