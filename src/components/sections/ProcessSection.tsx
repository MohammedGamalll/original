import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function ProcessSection() {
  return (
    <section id="process" className="section-space" aria-labelledby="process-title">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading id="process-title" eyebrow="رحلة العمل" title="من الفكرة إلى التفاصيل" />
            <p className="mt-4 max-w-md text-sm leading-7 text-ink/80">
              خطوات مقترحة لطريقة العمل، وتُراجع على الأسلوب الفعلي للشركة.
            </p>
          </Reveal>
        </div>
        <ol className="border-s border-ink/15 lg:col-span-7">
          {processSteps.map((step, index) => (
            <li key={step.number} className="relative pb-12 ps-8 last:pb-0">
              <span className="absolute top-2 -start-1.5 size-3 border border-ink bg-ivory" aria-hidden />
              <Reveal delay={index * 100}>
                <p className="font-display text-xl text-ink/80">{step.number}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xl text-ink/80">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
