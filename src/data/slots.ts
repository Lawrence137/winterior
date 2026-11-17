import { categories } from "./categories";

export const SLOTS = [
  { key: "hero", label: "Homepage hero", hint: "Landscape, at least 1920×1080", fallback: "/images/hero.jpg" },
  { key: "craft", label: "Homepage craft section", hint: "Portrait 4:5", fallback: "/images/kitchen.webp" },
  ...categories.map((c) => ({
    key: `category-${c.slug}`,
    label: `${c.name} card`,
    hint: "Portrait 4:5",
    fallback: c.image,
  })),
];