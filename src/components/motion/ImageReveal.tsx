"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { shouldSkipIntro } from "@/lib/scroll-return";
import { cn } from "@/lib/utils";

export function ImageReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || shouldSkipIntro()) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.05,
          delay,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-mask className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
