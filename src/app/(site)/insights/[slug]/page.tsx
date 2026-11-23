import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CTA from "@/components/home/CTA";
import { getInsightBySlug, getInsights } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return { title: "Article not found | Winterior Design" };

  return {
    title: `${insight.title} | Winterior Design`,
    description: insight.excerpt,
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  const insights = await getInsights();
  const related = insights.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="bg-ink px-6 pt-36 pb-12 text-white sm:pt-40">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/insights"
              className="text-xs tracking-[0.2em] text-silver transition-colors hover:text-white"
            >
              ← All insights
            </Link>
            <p className="mt-10 text-xs tracking-[0.3em] text-red uppercase">
              {insight.category}
            </p>
            <h1 className="font-display mt-4 text-4xl leading-[1.05] font-light sm:text-6xl">
              {insight.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              {insight.excerpt}
            </p>
            <p className="mt-8 text-[10px] tracking-[0.2em] text-silver/70 uppercase">
              {insight.publishedAt} <span aria-hidden="true">·</span> {insight.readTime}
            </p>
          </div>
        </header>

        <div className="relative mx-auto aspect-[16/9] max-h-[620px] w-full max-w-7xl bg-walnut">
          <Image
            src={insight.image}
            alt={insight.imageAlt}
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {insight.sections.map((section) => (
              <section key={section.heading} className="mb-12 last:mb-0">
                <h2 className="font-display text-3xl font-light sm:text-4xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-base leading-8 text-ink/75">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <Link
              href="/contact"
              className="mt-12 inline-flex min-h-12 items-center gap-4 bg-ink px-6 text-xs tracking-[0.18em] text-white uppercase transition-colors hover:bg-red"
            >
              Plan your space with us
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.3em] text-red uppercase">Keep exploring</p>
          <h2 className="font-display mt-3 text-3xl font-light sm:text-4xl">
            More from the journal
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="group border-t border-ink/15 pt-5"
              >
                <p className="text-[10px] tracking-[0.25em] text-red uppercase">{item.category}</p>
                <h3 className="font-display mt-3 text-2xl leading-tight font-light transition-colors group-hover:text-red sm:text-3xl">
                  {item.title}
                </h3>
                <span className="mt-4 inline-block text-xs tracking-widest uppercase">
                  Read article <span className="text-red" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
