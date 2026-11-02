"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ProjectEntrance({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from("[data-project-line]", {
            y: 28,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
          })
          .from(
            "[data-project-media]",
            { y: 40, opacity: 0, duration: 0.95, ease: "power2.out" },
            0.18,
          )
          .from(
            "[data-project-detail]",
            { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 },
            0.42,
          );
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
