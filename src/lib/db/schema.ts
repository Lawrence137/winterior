import { pgTable, serial, text, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const mediaType = pgEnum("media_type", ["image", "video"]);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // kitchen-cabinets, closets-wardrobes, bathroom-vanities, tv-units
  name: text("name").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary"),
  location: text("location"),
  categoryId: integer("category_id").references(() => categories.id),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }),
  type: mediaType("type").notNull().default("image"),
  url: text("url").notNull(),        // R2 public URL
  posterUrl: text("poster_url"),     // for videos
  width: integer("width"),
  height: integer("height"),
  blurDataUrl: text("blur_data_url"),
  alt: text("alt"),
  sortOrder: integer("sort_order").default(0),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});