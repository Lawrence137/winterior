import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { categoryMedia } from "@/lib/db/schema";
import { getCategory } from "@/data/categories";
import Uploader from "@/components/admin/Uploader";
import { addCategoryMedia, deleteCategoryMedia, makeCategoryCover } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ManageCategory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = await db
    .select()
    .from(categoryMedia)
    .where(eq(categoryMedia.category, slug))
    .orderBy(asc(categoryMedia.sortOrder), asc(categoryMedia.id));
  const coverId = items.find((m) => m.type === "image")?.id;

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <Link href="/admin" className="text-sm hover:text-brass">← Dashboard</Link>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">{category.name}</h1>
          <p className="text-sm text-ink/60">
            The cover appears on the homepage card and at the top of the collection page. All items appear in the gallery.
          </p>
        </div>
        <Link href={`/collections/${slug}`} target="_blank" className="text-sm hover:text-brass">
          View live page ↗
        </Link>
      </header>

      <Uploader
        folder={`categories/${slug}`}
        onUploaded={addCategoryMedia.bind(null, slug)}
        label="Drop photos or videos here, or click to choose"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <div key={m.id} className="space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              {m.type === "video" ? (
                <video src={m.url} controls preload="metadata" className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt="" className="h-full w-full object-cover" />
              )}
              {m.id === coverId && (
                <span className="absolute top-2 left-2 bg-brass px-2 py-1 text-[10px] tracking-widest text-white uppercase">
                  Cover
                </span>
              )}
            </div>
            <div className="flex gap-4 text-xs tracking-widest uppercase">
              {m.type === "image" && m.id !== coverId && (
                <form action={makeCategoryCover}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="category" value={slug} />
                  <button className="hover:text-brass">Make cover</button>
                </form>
              )}
              <form action={deleteCategoryMedia}>
                <input type="hidden" name="id" value={m.id} />
                <button className="text-red-600 hover:underline">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-ink/60">
            No media yet. The site is showing the placeholder image until you upload one.
          </p>
        )}
      </div>
    </main>
  );
}