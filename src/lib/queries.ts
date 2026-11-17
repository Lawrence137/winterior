import { cache } from "react";
import { asc, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, media, siteMedia } from "@/lib/db/schema";
import { projects as staticProjects, type Project, type ProjectImage } from "@/data/projects";
import { SLOTS } from "@/data/slots";

const PLACEHOLDER: ProjectImage = { src: "/images/hero.jpg", width: 1920, height: 1080, alt: "Winterior project" };

function toProject(p: typeof projects.$inferSelect, items: (typeof media.$inferSelect)[]): Project {
  const gallery: ProjectImage[] = items.map((m) => ({
    src: m.url,
    width: m.width ?? 1600,
    height: m.height ?? 1067,
    alt: m.alt ?? p.title,
    type: m.type,
    poster: m.posterUrl,
  }));
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    location: p.location ?? "",
    year: p.year ?? new Date().getFullYear(),
    summary: p.summary ?? "",
    cover: gallery.find((g) => g.type !== "video") ?? PLACEHOLDER,
    gallery,
    beforeAfter: p.beforeUrl && p.afterUrl ? { before: p.beforeUrl, after: p.afterUrl } : undefined,
  };
}

// Falls back to the static placeholder projects if the database is empty or unreachable
export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));
    if (!rows.length) return staticProjects;
    const all = await db.select().from(media).orderBy(asc(media.sortOrder), asc(media.id));
    return rows.map((r) => toProject(r, all.filter((m) => m.projectId === r.id)));
  } catch (e) {
    console.error("getProjects failed, using static data", e);
    return staticProjects;
  }
});

export async function getProject(slug: string) {
  return (await getProjects()).find((p) => p.slug === slug);
}

export const getSlots = cache(async (): Promise<Record<string, string>> => {
  const out: Record<string, string> = Object.fromEntries(SLOTS.map((s) => [s.key, s.fallback]));
  try {
    for (const r of await db.select().from(siteMedia)) {
      if (r.slot in out) out[r.slot] = r.url;
    }
  } catch (e) {
    console.error("getSlots failed, using fallbacks", e);
  }
  return out;
});