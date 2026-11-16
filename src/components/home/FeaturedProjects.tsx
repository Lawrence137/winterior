import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.4em] text-brass uppercase">Recent work</p>
            <h2 className="font-display mt-4 text-4xl font-light md:text-6xl">Featured projects</h2>
          </div>
          <Link href="/projects" className="border-b border-ink pb-1 text-sm tracking-widest uppercase transition hover:border-brass hover:text-brass">
            All projects →
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-walnut">
                  <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <h3 className="font-display mt-5 text-2xl">{p.title}</h3>
                <p className="text-xs tracking-widest text-ink/50 uppercase">{p.location}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}