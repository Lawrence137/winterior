import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { getCategory } from "@/data/categories";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/gallery/BeforeAfter";
import CTA from "@/components/home/CTA";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return { title: p ? `${p.title} | Winterior Design` : "Project", description: p?.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const category = getCategory(project.category);
  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={category?.name ?? "Project"} title={project.title}>
        <p>{project.summary}</p>
        <p className="mt-4 text-xs tracking-widest text-brass uppercase">
          {project.location} · {project.year}
        </p>
      </PageHeader>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <Reveal key={i} delay={(i % 2) * 0.1} className={i === 0 ? "sm:col-span-2" : ""}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={i === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className="h-auto w-full"
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </div>

          {project.beforeAfter && (
            <Reveal className="pt-10">
              <p className="mb-6 text-xs tracking-[0.4em] text-brass uppercase">The transformation</p>
              <BeforeAfter {...project.beforeAfter} alt={project.title} />
              <p className="mt-3 text-sm text-ink/50">Drag across the image to compare.</p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.4em] text-brass uppercase">More projects</p>
          <div className="font-display mt-6 flex flex-wrap gap-x-10 gap-y-3 text-3xl">
            {related.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="transition hover:text-brass">
                {p.title} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}