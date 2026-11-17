import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getCategory } from "@/data/categories";
import { getCategoryMedia } from "@/lib/queries";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import MediaGrid from "@/components/gallery/MediaGrid";
import CTA from "@/components/home/CTA";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  return { title: c ? `${c.name} | Winterior Design` : "Collection", description: c?.description };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const media = await getCategoryMedia(slug);
  const cover = media.find((m) => m.type !== "video") ?? {
    src: category.image, width: 1000, height: 1250, alt: category.name,
  };

  return (
    <>
      <PageHeader eyebrow="Collection" title={category.name}>
        <p>{category.description}</p>
      </PageHeader>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-walnut">
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="self-center">
            <p className="text-xs tracking-[0.4em] text-brass uppercase">What you get</p>
            <ul className="mt-8 divide-y divide-ink/10">
              {category.features.map((f) => (
                <li key={f} className="font-display py-5 text-2xl">{f}</li>
              ))}
            </ul>
            <Link href="/contact" className="mt-10 inline-block bg-ink px-8 py-4 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
              Enquire about {category.name}
            </Link>
          </Reveal>
        </div>
      </section>

      {media.length > 1 && (
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="mb-8 text-xs tracking-[0.4em] text-brass uppercase">Gallery</p>
            </Reveal>
            <MediaGrid items={media} />
          </div>
        </section>
      )}

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-[0.4em] text-brass uppercase">More collections</p>
          <div className="font-display mt-6 flex flex-wrap gap-x-10 gap-y-3 text-3xl">
            {categories.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="transition hover:text-brass">{c.name} →</Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}