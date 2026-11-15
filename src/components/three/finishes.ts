export type Finish = { name: string; color: string; roughness: number };
export type Handle = { name: string; color: string; metalness: number; roughness: number };

export const FINISHES: Finish[] = [
  { name: "Matte White", color: "#ece9e4", roughness: 0.7 },
  { name: "Natural Oak", color: "#b98e5f", roughness: 0.55 },
  { name: "Walnut", color: "#5a3e2b", roughness: 0.5 },
  { name: "Charcoal", color: "#2b2b2d", roughness: 0.6 },
  { name: "Sage", color: "#8a9a82", roughness: 0.65 },
];

export const HANDLES: Handle[] = [
  { name: "Brass", color: "#b08d57", metalness: 1, roughness: 0.3 },
  { name: "Black", color: "#111111", metalness: 0.6, roughness: 0.4 },
  { name: "Chrome", color: "#d8d8d8", metalness: 1, roughness: 0.15 },
];