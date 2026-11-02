"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      className="text-sm text-ivory/80 transition-colors hover:text-sand"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      العودة للأعلى
    </button>
  );
}
