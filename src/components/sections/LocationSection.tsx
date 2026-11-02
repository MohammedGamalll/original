import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site-config";

export function LocationSection() {
  return (
    <section id="location" className="section-space border-t border-ink/10" aria-labelledby="location-title">
      <Container className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="location-title" eyebrow="الزيارة" title="يسعدنا زيارتكم" />
          <p className="mt-5 text-lg leading-9 text-ink/80">{siteConfig.address}</p>
          <a
            href={siteConfig.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex border border-ink/20 px-5 py-3 text-sm transition-colors hover:border-taupe hover:text-taupe"
          >
            افتح الموقع على الخريطة
          </a>
        </div>
        <div className="lg:col-span-8">
          <iframe
            title="خريطة ORIGINAL في مدينة نصر"
            src={siteConfig.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full rounded-md border-0"
          />
        </div>
      </Container>
    </section>
  );
}
