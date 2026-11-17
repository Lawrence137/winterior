import { categories } from "@/data/categories";
import { getCategoryCovers } from "@/lib/queries";
import Reveal from "@/components/ui/Reveal";
import CategoryShowcase from "./CategoryShowcase";

export default async function CategoryGrid() {
  const covers = await getCategoryCovers();
  const items = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    blurb: c.blurb,
    image: covers[c.slug].image,
    count: covers[c.slug].count,
  }));

  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-[0.4em] text-brass uppercase">What we make</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-light md:text-6xl">
            Four disciplines. One standard of craft.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <CategoryShowcase items={items} />
        </Reveal>
      </div>
    </section>
  );
}