"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import {
  clearReturnPosition,
  clearSkipIntro,
  pathsMatch,
  readReturnPosition,
} from "@/lib/scroll-return";

export function ScrollRestorer() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const saved = readReturnPosition();
    if (!saved || !pathsMatch(saved.path, window.location.pathname)) return;
    window.scrollTo(0, saved.y);
  }, [pathname]);

  useEffect(() => {
    const saved = readReturnPosition();
    const matches = saved ? pathsMatch(saved.path, window.location.pathname) : false;

    function onPopState() {
      const current = readReturnPosition();
      if (!current || !pathsMatch(current.path, window.location.pathname)) return;
      window.scrollTo(0, current.y);
    }

    window.addEventListener("popstate", onPopState);

    if (!saved || !matches) {
      return () => window.removeEventListener("popstate", onPopState);
    }

    let frames = 0;
    let frame = 0;
    const tick = () => {
      window.scrollTo(0, saved.y);
      frames += 1;
      if (frames < 12 && Math.abs(window.scrollY - saved.y) > 2) {
        frame = requestAnimationFrame(tick);
        return;
      }
      clearReturnPosition();
      clearSkipIntro();
      if (document.querySelector("[data-mask]")) {
        void import("@/lib/gsap").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", onPopState);
    };
  }, [pathname]);

  return null;
}
