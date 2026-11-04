import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function AboutSection() {
  return (
    <section id="about" className="section-space" aria-labelledby="about-title">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <div className="relative aspect-[4/5] bg-sand/40 sm:aspect-[5/4]">
            <LazyVideo
              src="/videos/about/about.mp4"
              poster="/videos/about/poster.webp"
              alt="لقطة من أعمال ORIGINAL"
              width={1400}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-sm font-medium text-ink/80">عن ORIGINAL</p>
            <h2
              id="about-title"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.35]"
            >
              التفاصيل تصنع الفرق
            </h2>
            <p className="mt-5 text-lg leading-9 text-ink/80">
              في ORIGINAL، نرى أن التصميم يتجاوز شكل المكان. إنه تجربة تبدأ بفهم احتياجاتك وتنتهي بمساحة متكاملة تجمع بين الراحة والجمال والاهتمام بكل تفصيلة.
            </p>
            <p className="mt-6 border-s border-sand ps-4 text-base leading-8 text-ink">
              الضوء، والخامة، ونسبة الفراغ: هذه هي اللغة التي نبني بها المكان.
            </p>
            <Button href="/#philosophy" variant="secondary" className="mt-8">
              تعرّف على رؤيتنا
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
