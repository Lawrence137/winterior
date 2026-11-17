export type Finish = { name: string; color: string; roughness: number; group: "Wood" | "Solid" | "Custom" };
export type Top = { name: string; color: string; roughness: number };
export type Handle = { name: string; color: string; metalness: number; roughness: number };
export type Wall = { name: string; color: string };

export const FINISHES: Finish[] = [
  { name: "Natural Oak", color: "#b98e5f", roughness: 0.55, group: "Wood" },
  { name: "Light Ash", color: "#d8c3a0", roughness: 0.6, group: "Wood" },
  { name: "Teak", color: "#8a4b2e", roughness: 0.5, group: "Wood" },
  { name: "Walnut", color: "#5a3e2b", roughness: 0.5, group: "Wood" },
  { name: "Ebony", color: "#2a211c", roughness: 0.5, group: "Wood" },
  { name: "Matte White", color: "#ece9e4", roughness: 0.7, group: "Solid" },
  { name: "Cream", color: "#e3d7bf", roughness: 0.7, group: "Solid" },
  { name: "Warm Grey", color: "#9a958d", roughness: 0.65, group: "Solid" },
  { name: "Charcoal", color: "#2b2b2d", roughness: 0.6, group: "Solid" },
  { name: "Matte Black", color: "#141414", roughness: 0.55, group: "Solid" },
  { name: "Navy", color: "#1f3350", roughness: 0.6, group: "Solid" },
  { name: "Forest Green", color: "#2f4a3a", roughness: 0.6, group: "Solid" },
  { name: "Sage", color: "#8a9a82", roughness: 0.65, group: "Solid" },
  { name: "Terracotta", color: "#b3593d", roughness: 0.65, group: "Solid" },
  { name: "Dusty Rose", color: "#c9a39a", roughness: 0.65, group: "Solid" },
];

export const TOPS: Top[] = [
  { name: "Carrara White", color: "#ece9e6", roughness: 0.25 },
  { name: "Black Granite", color: "#1b1b1d", roughness: 0.2 },
  { name: "Grey Quartz", color: "#8d8e90", roughness: 0.3 },
  { name: "Travertine", color: "#cdbb9c", roughness: 0.5 },
  { name: "Butcher Block", color: "#b98e5f", roughness: 0.6 },
];

export const HANDLES: Handle[] = [
  { name: "Brass", color: "#b08d57", metalness: 1, roughness: 0.3 },
  { name: "Black", color: "#111111", metalness: 0.6, roughness: 0.4 },
  { name: "Chrome", color: "#d8d8d8", metalness: 1, roughness: 0.15 },
  { name: "Copper", color: "#b87333", metalness: 1, roughness: 0.3 },
];

export const WALLS: Wall[] = [
  { name: "Warm White", color: "#e9e4da" },
  { name: "Soft Grey", color: "#c9c9c6" },
  { name: "Sage", color: "#a9b5a0" },
  { name: "Charcoal", color: "#3a3a3c" },
];