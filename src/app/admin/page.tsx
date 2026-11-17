import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { categories } from "@/data/categories";
import { SLOTS } from "@/data/slots";
import { getSlots } from "@/lib/queries";
import Uploader from "@/components/admin/Uploader";
import { createProject, logout, setSlot } from "./actions";

export const dynamic = "force-dynamic";

const input = "w-full border-b border-ink/30 bg-transparent py-2 outline-none focus:border-brass";

export default async function AdminPage() {
  const [slots, list] = await Promise.all([getSlots(), db.select().from(projects).orderBy(desc(projects.createdAt))]);

  return (
    <main className="mx-auto max-w-6xl space-y-20 px-6 py-12">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-4xl">Dashboard</h1>
        <div className="flex gap-6 text-sm">
          <Link href="/" target="_blank" className="hover:text-brass">View site ↗</Link>
          <form action={logout}>
            <button className="hover:text-brass">Sign out</button>
          </form>
        </div>
      </header>

      <section>
        <h2 className="font-display text-3xl">Projects</h2>
        <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {list.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/projects/${p.id}`} className="flex justify-between py-4 transition hover:text-brass">
                <span>{p.title}</span>
                <span className="text-sm text-ink/50">{p.location} · Manage →</span>
              </Link>
            </li>
          ))}
          {list.length === 0 && (
            <li className="py-4 text-sm text-ink/60">
              No projects yet. The public site is showing placeholder data until you add one.
            </li>
          )}
        </ul>

        <form action={createProject} className="mt-10 grid gap-6 sm:grid-cols-2">
          <p className="text-xs tracking-[0.3em] text-brass uppercase sm:col-span-2">New project</p>
          <input name="title" required placeholder="Title" className={input} />
          <select name="category" className={input}>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <input name="location" placeholder="Location (e.g. Karen, Nairobi)" className={input} />
          <input name="year" type="number" placeholder={String(new Date().getFullYear())} className={input} />
          <textarea name="summary" rows={2} placeholder="Short summary" className={`${input} sm:col-span-2`} />
          <button className="w-fit bg-ink px-8 py-3 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
            Create and add media
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-3xl">Categories</h2>
        <p className="mt-2 text-sm text-ink/60">Add or remove photos and videos for each collection.</p>
      <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
          {categories.map((c) => (
         <li key={c.slug}>
         <Link href={`/admin/categories/${c.slug}`} className="flex justify-between py-4 transition hover:text-brass">
          <span>{c.name}</span>
          <span className="text-sm text-ink/50">Manage media →</span>
        </Link>
        </li>
          ))}
      </ul>
     </section>

      <section>
        <h2 className="font-display text-3xl">Site images</h2>
        <p className="mt-2 text-sm text-ink/60">
          Replace the main images used around the site. Uploading a new one replaces the old.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SLOTS.map((s) => (
            <div key={s.key} className="space-y-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-walnut">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slots[s.key]} alt={s.label} className="h-full w-full object-cover" />
              </div>
              <p className="font-display text-xl">{s.label}</p>
              <p className="text-xs text-ink/50">{s.hint}</p>
              <Uploader
                folder="site"
                multiple={false}
                imagesOnly
                label="Replace image"
                onUploaded={setSlot.bind(null, s.key)}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}