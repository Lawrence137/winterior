import { pgTable, serial, text, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const mediaType = pgEnum("media_type", ["image", "video"]);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary"),
  location: text("location"),
  year: integer("year"),
  category: text("category").notNull(), // slug from data/categories.ts
  featured: boolean("featured").default(false),
  beforeUrl: text("before_url"),
  afterUrl: text("after_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  type: mediaType("type").notNull().default("image"),
  url: text("url").notNull(),
  key: text("key").notNull(), // Cloudinary "<resource_type>:<public_id>", used for deletion
  posterUrl: text("poster_url"),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// One row per replaceable image on the site (hero, category cards, etc.)
export const siteMedia = pgTable("site_media", {
  slot: text("slot").primaryKey(),
  url: text("url").notNull(),
  key: text("key").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  interest: text("interest"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoryMedia = pgTable("category_media", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // slug from data/categories.ts
  type: mediaType("type").notNull().default("image"),
  url: text("url").notNull(),
  key: text("key").notNull(), // Cloudinary "<resource_type>:<public_id>"
  posterUrl: text("poster_url"),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});