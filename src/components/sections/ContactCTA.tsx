import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";

export function ContactCTA() {
  return (
    <section className="bg-ink text-ivory" aria-labelledby="cta-title">
      <Container className="section-space">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="cta-title" className="font-display text-[clamp(2rem,4.5vw,3.8rem)] font-semibold leading-[1.4]">
              عندك فكرة؟ خلينا نحولها لمساحة حقيقية.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-9 text-ivory/80">
              احكيلنا عن مشروعك، وابدأ أول خطوة نحو مساحة مصممة خصيصًا لك.
            </p>
            <Button
              href={siteConfig.startProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="inverse"
              className="mt-8"
            >
              ابدأ مشروعك الآن
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
