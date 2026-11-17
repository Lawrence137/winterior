import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getSlots } from "@/lib/queries";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default async function CategoryGrid() {
  const slots = await getSlots();
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-[0.4em] text-brass uppercase">What we make</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-light md:text-6xl">
            Four disciplines. One standard of craft.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.12}>
              <TiltCard>
                <Link href={`/collections/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-walnut">
                  <Image
                    src={slots[`category-${c.slug}`]}
                    alt={c.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <h3 className="font-display text-3xl md:text-4xl">{c.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{c.blurb}</p>
                    <span className="mt-4 inline-block text-xs tracking-widest text-brass uppercase transition-transform group-hover:translate-x-2">
                      Explore →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}