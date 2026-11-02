import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectEntrance } from "@/components/motion/ProjectEntrance";
import { ProjectBackButton } from "@/components/portfolio/ProjectBackButton";
import { ProjectCarousel } from "@/components/portfolio/ProjectCarousel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNextProject, getProject, projects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "العمل" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ORIGINAL`,
      description: project.summary,
      locale: "ar_AR",
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = getNextProject(project.slug);

  return (
    <ProjectEntrance>
      <article className="section-space">
        <Container>
          <div data-project-line>
            <ProjectBackButton />
          </div>
          <p data-project-line className="mt-8 text-sm text-ink/80">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          <h1
            data-project-line
            className="mt-3 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[1.3]"
          >
            {project.title}
          </h1>
          <p data-project-line className="mt-5 max-w-2xl text-lg leading-9 text-ink/80">
            {project.summary}
          </p>
          <p data-project-line className="mt-3 max-w-2xl text-sm leading-7 text-ink/80">
            {siteConfig.placeholderNotice}
          </p>

          <div data-project-media className="mt-10">
            <ProjectCarousel images={project.gallery} />
          </div>

          <div
            data-project-detail
            className="mt-16 grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-12"
          >
          <div className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold">عن هذا النموذج</h2>
            <p className="mt-4 text-lg leading-9 text-ink/80">{project.description}</p>
          </div>
          <dl className="grid gap-6 lg:col-span-5">
            <div className="border-t border-ink/10 pt-4">
              <dt className="text-sm text-ink/80">التصنيف</dt>
              <dd className="mt-1 font-display text-2xl">{project.category}</dd>
            </div>
            <div className="border-t border-ink/10 pt-4">
              <dt className="text-sm text-ink/80">نطاق العمل</dt>
              <dd className="mt-1 text-lg leading-8">{project.scope}</dd>
            </div>
            <div className="border-t border-ink/10 pt-4">
              <dt className="text-sm text-ink/80">الخامات</dt>
              <dd className="mt-1 text-lg leading-8">{project.materials}</dd>
            </div>
          </dl>
        </div>

        <div data-project-detail className="mt-14 flex flex-wrap gap-3">
          <Button href={siteConfig.startProjectUrl} target="_blank" rel="noopener noreferrer">
            ابدأ مشروعك
          </Button>
          {nextProject ? (
            <Button href={`/projects/${nextProject.slug}/`} variant="secondary">
              المشروع التالي: {nextProject.title}
            </Button>
          ) : null}
        </div>
        </Container>
      </article>
    </ProjectEntrance>
  );
}
