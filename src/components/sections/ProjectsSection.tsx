import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

export function ProjectsSection() {
  return (
    <section id="works" className="section-space border-t border-ink/10" aria-labelledby="works-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="works-title"
            eyebrow="المعرض"
            title="أعمال تحكي عنّا"
            text="اكتشف مساحات تتوازن فيها الخامات، وتتكامل فيها التفاصيل، وتتحول فيها الأفكار إلى تجربة ملموسة."
          />
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/80">{siteConfig.placeholderNotice}</p>
        </Reveal>

        <div className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              variant={index % 2 === 0 ? "portrait" : "landscape"}
              className="mb-6 break-inside-avoid"
            />
          ))}
        </div>

        <div className="mt-6">
          <Button href="/projects/" variant="secondary">
            شاهد جميع الأعمال
          </Button>
        </div>
      </Container>
    </section>
  );
}
