import { cache } from "react";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, media, siteMedia, categoryMedia, insights as insightRows } from "@/lib/db/schema";
import { projects as staticProjects, type Project, type ProjectImage } from "@/data/projects";
import { insights as staticInsights, type Insight } from "@/data/insights";
import { SLOTS } from "@/data/slots";
import { categories, getCategory } from "@/data/categories";

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

// All media for one category. Falls back to the static image until you upload some.
export const getCategoryMedia = cache(async (slug: string): Promise<ProjectImage[]> => {
  const category = getCategory(slug);
  const fallback: ProjectImage[] = category
    ? [{ src: category.image, width: 1000, height: 1250, alt: category.name }]
    : [];
  try {
    const rows = await db
      .select()
      .from(categoryMedia)
      .where(eq(categoryMedia.category, slug))
      .orderBy(asc(categoryMedia.sortOrder), asc(categoryMedia.id));
    if (!rows.length) return fallback;
    return rows.map((m) => ({
      src: m.url,
      width: m.width ?? 1600,
      height: m.height ?? 1067,
      alt: m.alt ?? category?.name ?? "Winterior",
      type: m.type,
      poster: m.posterUrl,
    }));
  } catch (e) {
    console.error("getCategoryMedia failed, using fallback", e);
    return fallback;
  }
});

// Cover image and item count per category, for the homepage cards
export const getCategoryCovers = cache(async () => {
  const out: Record<string, { image: string; count: number }> = Object.fromEntries(
    categories.map((c) => [c.slug, { image: c.image, count: 0 }])
  );
  try {
    const rows = await db.select().from(categoryMedia).orderBy(asc(categoryMedia.sortOrder), asc(categoryMedia.id));
    for (const c of categories) {
      const mine = rows.filter((r) => r.category === c.slug);
      const cover = mine.find((r) => r.type === "image");
      if (cover) out[c.slug].image = cover.url;
      out[c.slug].count = mine.length;
    }
  } catch (e) {
    console.error("getCategoryCovers failed, using fallback", e);
  }
  return out;
});

export const getInsights = cache(async (): Promise<Insight[]> => {
  try {
    const allRows = await db.select().from(insightRows).orderBy(desc(insightRows.publishedAt), desc(insightRows.id));
    const deletedSlugs = new Set(allRows.filter((r) => r.deleted).map((r) => r.slug));
    const rows = allRows.filter((r) => !r.deleted);
    const dbMap = new Map(rows.map((r) => [r.slug, r]));
    const merged = staticInsights
      .filter((item) => !dbMap.has(item.slug) && !deletedSlugs.has(item.slug))
      .map((item) => ({ ...item }))
      .concat(
        rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category,
      publishedAt: r.publishedAt,
      readTime: r.readTime,
      image: r.image,
      imageAlt: r.imageAlt,
      sections: r.sections,
        }))
      );
    if (!merged.length) return staticInsights;
    return merged.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (e) {
    console.error("getInsights failed, using static data", e);
    return staticInsights;
  }
});

export async function getInsightBySlug(slug: string) {
  return (await getInsights()).find((insight) => insight.slug === slug);
}