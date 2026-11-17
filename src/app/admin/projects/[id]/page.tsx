import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, media } from "@/lib/db/schema";
import { categories } from "@/data/categories";
import Uploader from "@/components/admin/Uploader";
import { addProjectMedia, deleteMedia, deleteProject, makeCover, updateProject } from "../../actions";

export const dynamic = "force-dynamic";

const input = "w-full border-b border-ink/30 bg-transparent py-2 outline-none focus:border-brass";

export default async function ManageProject({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const pid = Number(id);
  if (!Number.isInteger(pid)) notFound();

  const [project] = await db.select().from(projects).where(eq(projects.id, pid));
  if (!project) notFound();
  const items = await db.select().from(media).where(eq(media.projectId, pid)).orderBy(asc(media.sortOrder), asc(media.id));

  return (
    <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      <Link href="/admin" className="text-sm hover:text-brass">← Dashboard</Link>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">{project.title}</h1>
          <p className="text-sm text-ink/60">{project.location} · {project.year}</p>
        </div>
        <Link href={`/projects/${project.slug}`} target="_blank" className="text-sm hover:text-brass">
          View live page ↗
        </Link>
      </header>

      <form action={updateProject} className="grid gap-6 sm:grid-cols-2">
        <input type="hidden" name="id" value={pid} />
        <p className="text-xs tracking-[0.3em] text-brass uppercase sm:col-span-2">Project details</p>
        <input name="title" required defaultValue={project.title} placeholder="Title" className={input} />
        <select name="category" defaultValue={project.category} className={input}>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <input name="location" defaultValue={project.location ?? ""} placeholder="Location" className={input} />
        <input name="year" type="number" defaultValue={project.year ?? ""} placeholder="Year" className={input} />
        <textarea
          name="summary"
          rows={4}
          defaultValue={project.summary ?? ""}
          placeholder="Description"
          className={`${input} sm:col-span-2`}
        />
        <div className="flex items-center gap-4 sm:col-span-2">
          <button className="bg-ink px-8 py-3 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
            Save changes
          </button>
          {saved && <span className="text-sm text-walnut">Saved.</span>}
        </div>
      </form>

      <Uploader
        folder={`projects/${project.slug}`}
        onUploaded={addProjectMedia.bind(null, pid)}
        label="Drop photos or videos here, or click to choose"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <div key={m.id} className="space-y-3">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              {m.type === "video" ? (
                <video src={m.url} controls preload="metadata" className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt="" className="h-full w-full object-cover" />
              )}
              {i === 0 && m.type === "image" && (
                <span className="absolute top-2 left-2 bg-brass px-2 py-1 text-[10px] tracking-widest text-white uppercase">
                  Cover
                </span>
              )}
            </div>
            <div className="flex gap-4 text-xs tracking-widest uppercase">
              {m.type === "image" && i !== 0 && (
                <form action={makeCover}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="projectId" value={pid} />
                  <button className="hover:text-brass">Make cover</button>
                </form>
              )}
              <form action={deleteMedia}>
                <input type="hidden" name="id" value={m.id} />
                <button className="text-red-600 hover:underline">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-ink/60">No media yet. Upload some above.</p>}
      </div>

      <form action={deleteProject} className="border-t border-ink/10 pt-8">
        <input type="hidden" name="id" value={pid} />
        <button className="text-xs tracking-widest text-red-600 uppercase hover:underline">
          Delete this project and all its media
        </button>
      </form>
    </main>
  );
}