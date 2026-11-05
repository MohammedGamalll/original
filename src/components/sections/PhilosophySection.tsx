import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="bg-ink text-ivory"
      aria-labelledby="philosophy-title"
    >
      <Container className="section-space grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="text-sm text-sand">الرؤية</p>
          <h2
            id="philosophy-title"
            className="mt-5 font-display text-[clamp(2.1rem,4.4vw,4rem)] font-semibold leading-[1.4]"
          >
            المساحة ليست مجرد مكان، بل إحساس تعيشه كل يوم.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-9 text-ivory/80">
            نهتم بعلاقة الضوء والخامة والحركة داخل المكان، حتى يبقى التصميم
            هادئًا وقابلًا للعيش.
          </p>
        </Reveal>
        <ParallaxFrame className="lg:col-span-6">
          <div className="relative aspect-[5/5] bg-sand/20">
            <LazyVideo
              src="/videos/vision/vision.mp4"
              poster="/videos/vision/poster.webp"
              alt="ستائر طويلة وطاولة بجانب السرير بفازة وقمح مجفف"
              width={478}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </ParallaxFrame>
      </Container>
    </section>
  );
}
