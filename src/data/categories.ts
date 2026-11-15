export type Category = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  description: string;
  features: string[];
};

export const categories: Category[] = [
  {
    slug: "kitchen-cabinets",
    name: "Kitchen Cabinets",
    blurb: "Crafted around the way you cook.",
    image: "/images/kitchen.jpg",
    description:
      "Fully custom kitchens, from compact apartment layouts to large family spaces. Every cabinet is measured on site and built to fit, with finishes and hardware chosen to last.",
    features: ["Soft-close hinges and drawers", "Moisture-resistant carcasses", "Stone and quartz worktop coordination", "Integrated appliance housings"],
  },
  {
    slug: "closets-wardrobes",
    name: "Closets & Wardrobes",
    blurb: "Storage that feels like a boutique.",
    image: "/images/wardrobe.jpg",
    description:
      "Walk-in closets and fitted wardrobes planned around your clothes, shoes and accessories, with lighting and internal fittings that make getting dressed a pleasure.",
    features: ["Hinged and sliding door options", "LED-lit interiors", "Pull-out rails, shoe racks and jewellery drawers", "Floor-to-ceiling fitted designs"],
  },
  {
    slug: "bathroom-vanities",
    name: "Bathroom Vanities",
    blurb: "Spa-level detail, every morning.",
    image: "/images/vanity.jpg",
    description:
      "Vanities built to handle humidity without losing their good looks, with practical storage and clean lines that make smaller bathrooms feel larger.",
    features: ["Water-resistant materials and edge sealing", "Floating and floor-standing styles", "Backlit mirror integration", "Custom basin cut-outs"],
  },
  {
    slug: "tv-units",
    name: "TV Units",
    blurb: "The centrepiece your living room needs.",
    image: "/images/tv-unit.jpg",
    description:
      "Media walls and TV units that hide cables, house your equipment and anchor the room, from minimal floating consoles to full feature walls.",
    features: ["Concealed cable management", "Fluted and slatted panel options", "Ambient LED backlighting", "Display niches and closed storage"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);