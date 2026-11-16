import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import CTA from "@/components/home/CTA";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects | Winterior Design" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Spaces we have built.">
        <p>A selection of kitchens, wardrobes, vanities and media walls, made to measure for homes across Kenya.</p>
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