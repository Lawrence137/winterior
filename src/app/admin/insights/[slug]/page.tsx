import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { insights } from "@/lib/db/schema";
import { getInsightBySlug } from "@/lib/queries";
import { deleteInsight, updateInsight } from "../../actions";

export const dynamic = "force-dynamic";

const input = "w-full border-b border-ink/30 bg-transparent py-2 outline-none focus:border-brass";

export default async function ManageInsight({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const { saved } = await searchParams;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  const [row] = await db.select().from(insights).where(eq(insights.slug, slug));

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <Link href="/admin" className="text-sm hover:text-brass">← Dashboard</Link>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">{insight.title}</h1>
          <p className="mt-2 text-sm text-ink/60">{insight.category}</p>
        </div>
        <Link href={`/insights/${slug}`} target="_blank" className="text-sm hover:text-brass">
          View live page ↗
        </Link>
      </header>

      <form action={updateInsight} className="grid gap-6 sm:grid-cols-2">
        <input type="hidden" name="id" value={row?.id ?? ""} />
        <input type="hidden" name="slug" value={slug} />
        <p className="text-xs tracking-[0.3em] text-brass uppercase sm:col-span-2">Post details</p>
        <input name="title" required defaultValue={insight.title} placeholder="Title" className={input} />
        <input name="category" required defaultValue={insight.category} placeholder="Category" className={input} />
        <input name="publishedAt" type="date" defaultValue={insight.publishedAt} className={input} />
        <input name="readTime" defaultValue={insight.readTime} placeholder="Read time" className={input} />
        <input name="image" defaultValue={insight.image} placeholder="Image URL" className={input} />
        <input name="imageAlt" defaultValue={insight.imageAlt} placeholder="Image description" className={input} />
        <textarea
          name="excerpt"
          rows={3}
          required
          defaultValue={insight.excerpt}
          placeholder="Short excerpt"
          className={`${input} sm:col-span-2`}
        />
        <textarea
          name="sections"
          rows={16}
          required
          defaultValue={JSON.stringify(insight.sections, null, 2)}
          aria-label="Article sections JSON"
          className={`${input} font-mono text-sm sm:col-span-2`}
        />
        <div className="flex items-center gap-4 sm:col-span-2">
          <button className="bg-ink px-8 py-3 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
            Save changes
          </button>
          {saved && <span className="text-sm text-walnut">Saved.</span>}
        </div>
      </form>

      <form action={deleteInsight} className="border-t border-ink/10 pt-8">
        <input type="hidden" name="id" value={row?.id ?? ""} />
        <input type="hidden" name="slug" value={slug} />
        <button className="text-xs tracking-widest text-red-600 uppercase hover:underline">
          Delete this insight post
        </button>
      </form>
    </main>
  );
}
