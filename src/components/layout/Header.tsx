"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { navItems, siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const overHero = pathname === "/" && !solid && !open;
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 12;
      setSolid((current) => (current === next ? current : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const items = panel?.querySelectorAll<HTMLElement>("a, button") ?? [];
    items[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>("a, button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid || open
          ? "border-ink/10 bg-ivory"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[var(--content-max)] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/seal.png"
            alt="شعار ORIGINAL"
            width={75}
            height={75}
            priority
            className="size-[75px]"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="التنقل الرئيسي"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors",
                overHero
                  ? "text-ivory hover:text-sand"
                  : "text-ink hover:text-taupe",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button
              href={siteConfig.startProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm"
            >
              ابدأ مشروعك
            </Button>
          </div>
          <button
            ref={buttonRef}
            type="button"
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center border lg:hidden",
              overHero
                ? "border-ivory/40 text-ivory"
                : "border-ink/15 text-ink",
            )}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X aria-hidden className="size-5" />
            ) : (
              <Menu aria-hidden className="size-5" />
            )}
            <span className="sr-only">
              {open ? "إغلاق القائمة" : "فتح القائمة"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          className="border-b border-ink/10 bg-ivory px-5 py-4 lg:hidden"
        >
          <nav aria-label="تنقل الجوال">
            <ul className="grid">
              {navItems.map((item) => (
                <li key={item.href} className="border-b border-ink/10">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-3 text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              href={siteConfig.startProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-4 w-full"
            >
              ابدأ مشروعك
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
