import { Reveal } from "@/components/motion/Reveal";
import { ProjectAccordion } from "@/components/portfolio/ProjectAccordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        </Reveal>
        <div className="mt-12">
          <ProjectAccordion />
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
