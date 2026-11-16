"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { categories } from "@/data/categories";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(-1);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  const tabs = [{ slug: "all", name: "All" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {tabs.map((t) => (
          <button
            key={t.slug}
            onClick={() => setFilter(t.slug)}
            className={cn(
              "border px-5 py-2 text-xs tracking-widest uppercase transition",
              filter === t.slug ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-brass hover:text-brass"
            )}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {visible.map((p, i) => (
          <figure key={p.slug} className="group relative mb-6 break-inside-avoid overflow-hidden bg-walnut">
            <button onClick={() => setIndex(i)} className="block w-full cursor-zoom-in" aria-label={`Enlarge ${p.title}`}>
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                width={p.cover.width}
                height={p.cover.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </button>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="font-display text-2xl">{p.title}</p>
              <p className="text-xs tracking-widest text-white/70 uppercase">{p.location}</p>
            </figcaption>
            <Link
              href={`/projects/${p.slug}`}
              className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[11px] tracking-widest text-ink uppercase opacity-0 transition hover:bg-brass hover:text-white group-hover:opacity-100 focus:opacity-100"
            >
              View project
            </Link>
          </figure>
        ))}
      </div>

      {visible.length === 0 && <p className="mt-12 text-ink/60">No projects in this category yet.</p>}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom]}
        slides={visible.map((p) => ({ src: p.cover.src, alt: p.title, width: p.cover.width, height: p.cover.height }))}
      />
    </>
  );
}