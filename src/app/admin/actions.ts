"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects, media, siteMedia } from "@/lib/db/schema";
import { COOKIE, createToken, verifyToken, safeEqual } from "@/lib/auth";
import { deleteObject } from "@/lib/cloudinary";

export type Uploaded = { url: string; key: string; type: "image" | "video"; width: number; height: number };

async function requireAdmin() {
  if (!(await verifyToken((await cookies()).get(COOKIE)?.value))) redirect("/admin/login");
}
const refresh = () => revalidatePath("/", "layout");
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function login(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !safeEqual(pw, expected)) redirect("/admin/login?error=1");

  (await cookies()).set(COOKIE, await createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect("/admin/login");
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  let slug = slugify(title) || "project";
  const [taken] = await db.select({ id: projects.id }).from(projects).where(eq(projects.slug, slug));
  if (taken) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;

  const [row] = await db
    .insert(projects)
    .values({
      slug,
      title,
      category: String(formData.get("category")),
      location: String(formData.get("location") ?? ""),
      year: Number(formData.get("year")) || new Date().getFullYear(),
      summary: String(formData.get("summary") ?? ""),
    })
    .returning({ id: projects.id });

  refresh();
  redirect(`/admin/projects/${row.id}`);
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const files = await db.select({ key: media.key }).from(media).where(eq(media.projectId, id));
  await Promise.allSettled(files.map((f) => deleteObject(f.key)));
  await db.delete(projects).where(eq(projects.id, id));
  refresh();
  redirect("/admin");
}

export async function addProjectMedia(projectId: number, m: Uploaded) {
  await requireAdmin();
  const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(media).where(eq(media.projectId, projectId));
  await db.insert(media).values({ projectId, ...m, sortOrder: n });
  refresh();
}

export async function deleteMedia(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const [row] = await db.select().from(media).where(eq(media.id, id));
  if (!row) return;
  try {
    await deleteObject(row.key);
  } catch (e) {
    console.error("Cloudinary delete failed", e);
  }
  await db.delete(media).where(eq(media.id, id));
  refresh();
}

export async function makeCover(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const projectId = Number(formData.get("projectId"));
  const [{ min }] = await db
    .select({ min: sql<number>`coalesce(min(${media.sortOrder}), 0)::int` })
    .from(media)
    .where(eq(media.projectId, projectId));
  await db.update(media).set({ sortOrder: min - 1 }).where(eq(media.id, id));
  refresh();
}

export async function setSlot(slot: string, m: Uploaded) {
  await requireAdmin();
  const [old] = await db.select().from(siteMedia).where(eq(siteMedia.slot, slot));
  await db
    .insert(siteMedia)
    .values({ slot, url: m.url, key: m.key })
    .onConflictDoUpdate({ target: siteMedia.slot, set: { url: m.url, key: m.key, updatedAt: new Date() } });
  if (old) {
    try {
      await deleteObject(old.key);
    } catch (e) {
      console.error(e);
    }
  }
  refresh();
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  if (!Number.isInteger(id) || !title) return;

  await db
    .update(projects)
    .set({
      title,
      summary: String(formData.get("summary") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      year: Number(formData.get("year")) || null,
      category: String(formData.get("category")),
    })
    .where(eq(projects.id, id));

  refresh();
  redirect(`/admin/projects/${id}?saved=1`);
}