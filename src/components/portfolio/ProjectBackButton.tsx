"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { markSkipIntro, readReturnPosition } from "@/lib/scroll-return";

export function ProjectBackButton() {
  const router = useRouter();

  function goBack() {
    const saved = readReturnPosition();
    if (!saved) {
      router.push("/projects/");
      return;
    }
    markSkipIntro();
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push(saved.path);
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-taupe"
    >
      <ArrowRight aria-hidden className="size-4" />
      العودة
    </button>
  );
}
