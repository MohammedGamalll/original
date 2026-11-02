import type { Metadata } from "next";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "أعمالنا",
  description: "معرض نماذج بصرية لمساحات داخلية. الصور ليست أعمالًا موثّقة للشركة.",
  openGraph: {
    title: "أعمالنا — ORIGINAL",
    description: "معرض نماذج بصرية لمساحات داخلية. الصور ليست أعمالًا موثّقة للشركة.",
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
          text="مجموعة بصرية منظمة للعرض. كل عمل يفتح صفحة مستقلة بصوره وتفاصيله."
        />
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/80">{siteConfig.placeholderNotice}</p>
        <div className="mt-12 grid items-start gap-x-6 gap-y-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} variant="landscape" />
          ))}
        </div>
      </Container>
    </section>
  );
}
