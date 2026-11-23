import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CTA from "@/components/home/CTA";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { getInsights } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Insights | Winterior Design",
  description:
    "Practical ideas and inspiration for kitchens, wardrobes, bathroom vanities and thoughtful interiors.",
};

export default async function InsightsPage() {
  const insights = await getInsights();
  const [featured, ...articles] = insights;

  return (
    <>
      <PageHeader eyebrow="Insights" title="Ideas for living well.">
        <p>
          Practical advice and considered inspiration for creating spaces that look beautiful
          and work for everyday life.
        </p>
      </PageHeader>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid overflow-hidden bg-white md:grid-cols-2"
            >
              <div className="relative aspect-[4/3] bg-walnut md:aspect-auto md:min-h-[420px]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12 lg:p-16">
                <p className="text-xs tracking-[0.3em] text-red uppercase">{featured.category}</p>
                <h2 className="font-display mt-5 text-4xl leading-tight font-light sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-lg leading-relaxed text-ink/65">{featured.excerpt}</p>
                <p className="mt-8 text-xs tracking-widest text-ink/45 uppercase">
                  {featured.publishedAt} <span aria-hidden="true">·</span> {featured.readTime}
                </p>
                <span className="mt-8 inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase">
                  Read the article
                  <span
                    aria-hidden="true"
                    className="text-red transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mb-8 mt-16 flex items-end justify-between border-b border-ink/15 pb-5">
            <div>
              <p className="text-xs tracking-[0.3em] text-red uppercase">The journal</p>
              <h2 className="font-display mt-3 text-3xl font-light sm:text-4xl">
                More ideas to explore
              </h2>
            </div>
            <span className="hidden text-xs tracking-widest text-ink/45 uppercase sm:block">
              {articles.length} articles
            </span>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.08}>
                <article>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-walnut">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                      />
                    </div>
                    <p className="mt-5 text-[10px] tracking-[0.25em] text-red uppercase">
                      {article.category}
                    </p>
                    <h3 className="font-display mt-3 text-3xl leading-tight font-light transition-colors group-hover:text-red">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/65">{article.excerpt}</p>
                    <p className="mt-5 text-[10px] tracking-widest text-ink/45 uppercase">
                      {article.publishedAt} <span aria-hidden="true">·</span> {article.readTime}
                    </p>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
