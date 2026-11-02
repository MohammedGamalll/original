"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { shouldSkipIntro } from "@/lib/scroll-return";

export function HeroSequence({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (shouldSkipIntro()) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from("[data-hero-image]", {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.1,
            ease: "power2.out",
          })
          .from(
            "[data-hero-line]",
            { yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.12 },
            0.15,
          )
          .from("[data-hero-copy]", { y: 16, opacity: 0, duration: 0.7 }, 0.42)
          .from(
            "[data-hero-actions] > *",
            { y: 12, opacity: 0, duration: 0.5, stagger: 0.08 },
            0.58,
          )
          .from(
            "[data-hero-kicker], [data-hero-note], [data-hero-scroll]",
            { y: 8, opacity: 0, duration: 0.5, stagger: 0.08 },
            0.78,
          );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
