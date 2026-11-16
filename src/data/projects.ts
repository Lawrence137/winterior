export type ProjectImage = { src: string; width: number; height: number; alt: string };

export type Project = {
  slug: string;
  title: string;
  category: string; // matches a slug in categories.ts
  location: string;
  year: number;
  summary: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  beforeAfter?: { before: string; after: string };
};

// Placeholder images reuse the files in /public/images. Replace with real photos
// (and real width/height) when you have them.
const hero = (alt: string): ProjectImage => ({ src: "/images/hero.jpg", width: 1920, height: 1080, alt });
const kitchen = (alt: string): ProjectImage => ({ src: "/images/kitchen.jpg", width: 1000, height: 1250, alt });
const wardrobe = (alt: string): ProjectImage => ({ src: "/images/wardrobe.jpg", width: 1000, height: 1250, alt });
const vanity = (alt: string): ProjectImage => ({ src: "/images/vanity.jpg", width: 1000, height: 1250, alt });
const tv = (alt: string): ProjectImage => ({ src: "/images/tv-unit.jpg", width: 1000, height: 1250, alt });

export const projects: Project[] = [
  {
    slug: "karen-family-kitchen",
    title: "Karen Family Kitchen",
    category: "kitchen-cabinets",
    location: "Karen, Nairobi",
    year: 2025,
    summary: "A warm oak and matte white kitchen with a full-height pantry wall and a quartz island.",
    cover: kitchen("Oak and white kitchen"),
    gallery: [hero("Kitchen wide view"), kitchen("Island detail"), kitchen("Pantry wall")],
    beforeAfter: { before: "/images/vanity.jpg", after: "/images/kitchen.jpg" },
  },
  {
    slug: "kilimani-walk-in-closet",
    title: "Kilimani Walk-in Closet",
    category: "closets-wardrobes",
    location: "Kilimani, Nairobi",
    year: 2025,
    summary: "Floor-to-ceiling wardrobes with LED-lit interiors, shoe wall and a jewellery island.",
    cover: wardrobe("Walk-in closet"),
    gallery: [wardrobe("Closet overview"), hero("Closet lighting"), wardrobe("Shoe wall")],
  },
  {
    slug: "lavington-master-vanity",
    title: "Lavington Master Vanity",
    category: "bathroom-vanities",
    location: "Lavington, Nairobi",
    year: 2024,
    summary: "A floating walnut vanity with a backlit mirror and stone top.",
    cover: vanity("Floating walnut vanity"),
    gallery: [vanity("Vanity front"), hero("Bathroom wide")],
  },
  {
    slug: "westlands-media-wall",
    title: "Westlands Media Wall",
    category: "tv-units",
    location: "Westlands, Nairobi",
    year: 2025,
    summary: "A fluted feature wall with concealed cabling, ambient lighting and closed storage.",
    cover: tv("Fluted media wall"),
    gallery: [tv("Media wall"), hero("Living room view")],
  },
  {
    slug: "runda-open-plan-kitchen",
    title: "Runda Open-Plan Kitchen",
    category: "kitchen-cabinets",
    location: "Runda, Nairobi",
    year: 2024,
    summary: "A large open-plan kitchen with integrated appliances and a breakfast bar.",
    cover: hero("Open-plan kitchen"),
    gallery: [hero("Open-plan kitchen"), kitchen("Cabinet detail")],
  },
  {
    slug: "kileleshwa-sliding-wardrobes",
    title: "Kileleshwa Sliding Wardrobes",
    category: "closets-wardrobes",
    location: "Kileleshwa, Nairobi",
    year: 2024,
    summary: "Space-saving sliding wardrobes with mirrored panels for a compact bedroom.",
    cover: wardrobe("Sliding wardrobe"),
    gallery: [wardrobe("Sliding wardrobe"), hero("Bedroom view")],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);