import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section id="services" className="section-space border-t border-ink/10" aria-labelledby="services-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="الخدمات"
            title="حلول متكاملة لمساحتك"
            text="من التصور الأول إلى تفاصيل التنفيذ، نمنح كل مساحة اهتمامًا يتناسب مع رؤيتها واحتياجاتها."
          />
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/80">
            الخدمات المعروضة أمثلة قابلة للتعديل، وتُراجع حسب ما تقدمه الشركة فعلًا.
          </p>
        </Reveal>
        <ul className="mt-12 grid gap-px bg-ink/10 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.number} className="bg-ivory">
              <Reveal delay={index * 90} className="h-full">
                <article className="group flex h-full flex-col justify-between p-7 transition-colors duration-300 hover:bg-paper sm:p-8">
                  <div>
                    <p className="font-display text-xl text-ink/80">{service.number}</p>
                    <h3 className="mt-6 font-display text-2xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-base leading-8 text-ink/80">{service.description}</p>
                  </div>
                  <ArrowLeft
                    aria-hidden
                    className="mt-8 size-5 text-taupe transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
