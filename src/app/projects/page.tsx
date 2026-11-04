import type { Metadata } from "next";
import { ProjectAccordion } from "@/components/portfolio/ProjectAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "أعمالنا",
  description: "أعمال تشطيبات وتصميم داخلي نفذتها ORIGINAL.",
  openGraph: {
    title: "أعمالنا — ORIGINAL",
    description: "أعمال تشطيبات وتصميم داخلي نفذتها ORIGINAL.",
    locale: "ar_AR",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <section className="section-space" aria-labelledby="archive-title">
      <Container>
        <SectionHeading
          id="archive-title"
          eyebrow="المعرض"
          title="أعمال تحكي عنّا"
          text="الفيديو يشتغل في العمل المفتوح، وباقي الأعمال تبقى بصورة الغلاف."
        />
        <div className="mt-12">
          <ProjectAccordion />
        </div>
      </Container>
    </section>
  );
}
