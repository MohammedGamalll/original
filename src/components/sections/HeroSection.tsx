import Image from "next/image";
import { HeroSequence } from "@/components/motion/HeroSequence";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

export function HeroSection() {
  return (
    <section className="-mt-[var(--header-height)] w-full" aria-labelledby="hero-title">
      <HeroSequence>
        <div className="relative min-h-dvh w-full">
          <div data-hero-image className="absolute inset-0">
            <Image
              src="/images/hero/hero.webp"
              alt="غرفة معيشة معاصرة بألوان دافئة وإضاءة طبيعية"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-[center_40%]"
            />
          </div>
          <div className="absolute inset-0 bg-black/45" aria-hidden />
          <div className="relative z-10 flex min-h-dvh items-end">
            <Container className="w-full pb-16 pt-[calc(var(--header-height)+4rem)]">
              <p data-hero-kicker className="text-sm font-medium text-ivory/80">
                ORIGINAL — فن التصميم والديكور
              </p>
              <h1
                id="hero-title"
                className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[1.22] text-ivory"
              >
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">
                    نصنع مساحات
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">
                    تشبهك
                  </span>
                </span>
              </h1>
              <p data-hero-copy className="mt-6 max-w-md text-lg leading-9 text-ivory/85">
                نمنح الأفكار شكلًا، والمساحات روحًا، ونعتني بالتفاصيل التي تصنع الفرق.
              </p>
              <div data-hero-actions className="mt-8 flex flex-wrap gap-3">
                <Button href="/#works">اكتشف أعمالنا</Button>
                <Button
                  href={siteConfig.startProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                >
                  ابدأ مشروعك
                </Button>
              </div>
              <a
                data-hero-scroll
                href="#about"
                className="mt-10 inline-block text-sm text-ivory/80 transition-colors hover:text-sand"
              >
                تمرير
              </a>
            </Container>
          </div>
        </div>
      </HeroSequence>
    </section>
  );
}
