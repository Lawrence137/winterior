"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type ShowcaseItem = { slug: string; name: string; blurb: string; image: string; count: number };

export default function CategoryShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop: expanding panels */}
      <div className="hidden h-[640px] gap-3 md:flex">
        {items.map((c, i) => {
          const on = active === i;
          return (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                "group relative min-w-0 overflow-hidden bg-walnut transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                on ? "flex-[4]" : "flex-1"
              )}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className={cn("object-cover transition-transform duration-[1400ms]", on ? "scale-100" : "scale-110")}
              />
              <div
                className={cn(
                  "absolute inset-0 transition-colors duration-700",
                  on ? "bg-gradient-to-t from-ink/85 via-ink/10 to-ink/20" : "bg-ink/50"
                )}
              />

              <span className="font-display absolute top-6 left-6 text-lg text-white/80">0{i + 1}</span>

              {/* Collapsed label */}
              <span
                className={cn(
                  "font-display absolute bottom-8 left-1/2 -translate-x-1/2 rotate-180 text-2xl whitespace-nowrap text-white transition-opacity duration-500 [writing-mode:vertical-rl]",
                  on ? "opacity-0" : "opacity-100"
                )}
              >
                {c.name}
              </span>

              {/* Expanded content */}
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 min-w-[380px] p-10 text-white transition-all duration-700",
                  on ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-4 opacity-0"
                )}
              >
                <h3 className="font-display text-5xl">{c.name}</h3>
                <p className="mt-3 max-w-sm text-white/75">{c.blurb}</p>
                <div className="mt-6 flex items-center gap-6 text-xs tracking-widest uppercase">
                  <span className="text-brass">Explore collection →</span>
                  {c.count > 1 && <span className="text-white/60">{c.count} photos &amp; videos</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: stacked cards */}
      <div className="grid gap-4 md:hidden">
        {items.map((c, i) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-walnut">
            <Image src={c.image} alt={c.name} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <span className="font-display absolute top-4 left-4 text-white/80">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="font-display text-3xl">{c.name}</h3>
              <p className="mt-1 text-sm text-white/70">{c.blurb}</p>
              <span className="mt-3 inline-block text-xs tracking-widest text-brass uppercase">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}