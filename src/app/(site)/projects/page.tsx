import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import CTA from "@/components/home/CTA";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = { title: "Projects | Winterior Design" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader eyebrow="Projects" title="Spaces we have built.">
        <p>A selection of kitchens, wardrobes, vanities and media walls, made to measure for homes across Nairobi.</p>
      </PageHeader>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <ProjectGallery projects={projects} />
        </div>
      </section>
      <CTA />
    </>
  );
}