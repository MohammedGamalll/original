"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { cn } from "@/lib/utils";

function releaseVideo(video: HTMLVideoElement | null) {
  if (!video?.getAttribute("src")) return;
  video.pause();
  video.removeAttribute("src");
  video.load();
}

export function LazyVideo({
  src,
  poster,
  alt,
  width,
  sizes,
  priority = false,
  active = true,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  width: number;
  sizes: string;
  priority?: boolean;
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (active) return;
    setStarted(false);
    releaseVideo(ref.current);
  }, [active]);

  function start(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    const video = ref.current;
    if (!video) return;
    if (!video.getAttribute("src")) video.src = src;
    setStarted(true);
    void video.play();
  }

  return (
    <>
      <ResponsiveImage
        src={poster}
        alt={started ? "" : alt}
        width={width}
        sizes={sizes}
        priority={priority}
        className="pointer-events-none"
      />
      <video
        ref={ref}
        controls={started}
        playsInline
        preload="none"
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          started ? "z-10" : "pointer-events-none opacity-0",
          className,
        )}
        onPointerDown={(event) => event.stopPropagation()}
      />
      {started ? null : (
        <button
          type="button"
          aria-label="تشغيل الفيديو"
          className="absolute top-1/2 left-1/2 z-10 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/90 text-ink shadow-sm"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={start}
        >
          <Play aria-hidden className="size-6 translate-x-0.5" />
        </button>
      )}
    </>
  );
}
