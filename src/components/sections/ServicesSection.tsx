import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="section-space !pt-0 border-t border-ink/10"
      aria-labelledby="services-title"
    >
      <Container>
        <div className="mb-8 md:mb-14">
          <div className="relative aspect-[1024/374] overflow-hidden rounded-2xl border border-black/5 shadow-sm">
            <ResponsiveImage
              src="/images/original-banner.webp"
              alt="أوريجينال للتصميم والتنفيذ والتشطيب - Complete Interior Solutions"
              width={1024}
              sizes="(min-width: 76rem) 1152px, 100vw"
            />
          </div>
        </div>
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="الخدمات"
            title="حلول متكاملة لمساحتك"
            text="من التصور الأول إلى تفاصيل التنفيذ، نمنح كل مساحة اهتمامًا يتناسب مع رؤيتها واحتياجاتها."
          />
        </Reveal>
        <div className="mt-16 lg:mt-24">
          {services.map((service, index) => (
            <Reveal key={service.number}>
              <article
                className={`mb-16 flex flex-col items-center gap-8 last:mb-0 md:flex-row lg:mb-24 lg:gap-16 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden md:w-1/2">
                  <ResponsiveImage
                    src={service.image}
                    alt={service.imageAlt}
                    width={1400}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex w-full flex-col justify-center py-2 text-start md:w-1/2 md:px-6 md:py-8 lg:px-10">
                  <p className="font-display text-xl text-ink/80">
                    {service.number}
                  </p>
                  <h3 className="mt-5 font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-lg leading-9 text-ink/80">
                    {service.description}
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-8 inline-flex items-center gap-2 self-start text-sm font-medium text-taupe transition-colors duration-300 hover:text-ink"
                  >
                    اقرأ المزيد
                    <ArrowLeft aria-hidden className="size-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
