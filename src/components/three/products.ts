type V3 = [number, number, number];

export type ProductKey = "wardrobe" | "kitchen" | "vanity" | "tv";

export type ProductDef = {
  key: ProductKey;
  label: string;
  depth: number;
  width: { min: number; max: number; step: number; def: number };
  bodyLabel: string;
  accentLabel: string;
  topLabel: string | null; // null = no stone top for this product
  wallGap: number;
  camera: V3;
  target: V3;
  dist: [number, number];
  defaults: { body: string; accent: string; top: string; handle: string };
};

export const PRODUCTS: Record<ProductKey, ProductDef> = {
  wardrobe: {
    key: "wardrobe", label: "Wardrobe", depth: 0.6,
    width: { min: 1.2, max: 3.6, step: 0.1, def: 2.4 },
    bodyLabel: "Doors & frame", accentLabel: "Interior", topLabel: null, wallGap: 0.005,
    camera: [3.6, 1.8, 4.8], target: [0, 1.1, 0], dist: [3, 9],
    defaults: { body: "Natural Oak", accent: "Matte White", top: "Carrara White", handle: "Brass" },
  },
  kitchen: {
    key: "kitchen", label: "Kitchen", depth: 0.6,
    width: { min: 2.4, max: 4.2, step: 0.1, def: 3.0 },
    bodyLabel: "Base cabinets", accentLabel: "Wall cabinets", topLabel: "Worktop", wallGap: 0.005,
    camera: [3.4, 1.9, 5.6], target: [0, 1.2, 0], dist: [3.5, 10],
    defaults: { body: "Sage", accent: "Matte White", top: "Carrara White", handle: "Brass" },
  },
  vanity: {
    key: "vanity", label: "Bathroom Vanity", depth: 0.48,
    width: { min: 0.7, max: 1.8, step: 0.1, def: 1.0 },
    bodyLabel: "Cabinet", accentLabel: "Drawer fronts", topLabel: "Vanity top", wallGap: 0.005,
    camera: [1.8, 1.4, 2.9], target: [0, 1.0, 0], dist: [1.8, 6],
    defaults: { body: "Charcoal", accent: "Natural Oak", top: "Carrara White", handle: "Brass" },
  },
  tv: {
    key: "tv", label: "TV Unit", depth: 0.4,
    width: { min: 1.6, max: 3.2, step: 0.1, def: 2.2 },
    bodyLabel: "Unit", accentLabel: "Feature wall", topLabel: null, wallGap: 0.045,
    camera: [2.6, 1.3, 4.4], target: [0, 1.1, 0], dist: [2.5, 8],
    defaults: { body: "Walnut", accent: "Charcoal", top: "Carrara White", handle: "Black" },
  },
};

export const PRODUCT_LIST = Object.values(PRODUCTS);