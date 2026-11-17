"use client";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

export type V3 = [number, number, number];
export type Mat = { color: string; roughness?: number; metalness?: number; emissive?: string; emissiveIntensity?: number };
export type Cfg = { body: Mat; accent: Mat; top: Mat; handle: Mat };
export type ModelProps = { width: number; depth: number; open: boolean; c: Cfg };

export const INSIDE: Mat = { color: "#e6e0d6", roughness: 0.85 };
export const DARK: Mat = { color: "#141414", roughness: 0.8 };
export const STEEL: Mat = { color: "#b8bbc0", metalness: 0.9, roughness: 0.3 };
export const GLOW: Mat = { color: "#fff3d6", emissive: "#ffd9a0", emissiveIntensity: 2 };

/** Rounded box: the soft edge catches light and is what stops it looking like cardboard */
export function Box({ p, s, m, shadow = true }: { p: V3; s: V3; m: Mat; shadow?: boolean }) {
  const r = Math.min(0.006, Math.min(...s) / 2.2);
  return (
    <RoundedBox args={s} radius={r} smoothness={3} position={p} castShadow={shadow} receiveShadow>
      <meshStandardMaterial
        color={m.color}
        roughness={m.roughness ?? 0.6}
        metalness={m.metalness ?? 0}
        emissive={m.emissive ?? "#000000"}
        emissiveIntensity={m.emissiveIntensity ?? 0}
      />
    </RoundedBox>
  );
}

/** Bar handle with two standoffs. p is the point on the door face. */
export function Handle({ p, len, vertical = true, m }: { p: V3; len: number; vertical?: boolean; m: Mat }) {
  const a = len / 2 - 0.03;
  const mat = <meshStandardMaterial color={m.color} metalness={m.metalness ?? 1} roughness={m.roughness ?? 0.3} />;
  return (
    <group position={p}>
      <mesh position={[0, 0, 0.028]} rotation={[0, 0, vertical ? 0 : Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, len, 16]} />
        {mat}
      </mesh>
      {[-a, a].map((e) => (
        <mesh key={e} position={vertical ? [0, e, 0.014] : [e, 0, 0.014]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.028, 12]} />
          {mat}
        </mesh>
      ))}
    </group>
  );
}

export function Tap({ p, h = 0.25, reach = 0.14, m }: { p: V3; h?: number; reach?: number; m: Mat }) {
  const mat = <meshStandardMaterial color={m.color} metalness={m.metalness ?? 1} roughness={m.roughness ?? 0.3} />;
  return (
    <group position={p}>
      <mesh position={[0, h / 2, 0]} castShadow>
        <cylinderGeometry args={[0.013, 0.013, h, 16]} />
        {mat}
      </mesh>
      <mesh position={[0, h, reach / 2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, reach, 16]} />
        {mat}
      </mesh>
    </group>
  );
}

/** Door hinged on one vertical edge. dir = +1 extends right of the hinge, -1 extends left. */
export function Door({
  hingeX, y, z, w, h, dir, open, m, handle, grip = "edge",
}: {
  hingeX: number; y: number; z: number; w: number; h: number; dir: 1 | -1;
  open: boolean; m: Mat; handle: Mat; grip?: "edge" | "top" | "bottom";
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    const target = open ? -dir * Math.PI * 0.55 : 0;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, target, 5, dt);
  });

  const T = 0.02;
  const edge = grip === "edge";
  const hp: V3 = edge ? [dir * (w - 0.05), 0, T] : [(dir * w) / 2, grip === "top" ? h / 2 - 0.06 : -(h / 2 - 0.06), T];
  const hl = edge ? Math.min(0.4, h * 0.35) : Math.min(0.3, w * 0.5);

  return (
    <group ref={g} position={[hingeX, y, z]}>
      <Box p={[(dir * w) / 2, 0, T / 2]} s={[w, h, T]} m={m} />
      <Handle p={hp} len={hl} vertical={edge} m={handle} />
    </group>
  );
}

/** Drawer whose front slides out, revealing a small tray. z is the carcass front plane. */
export function Drawer({
  x, y, z, w, h, tray = 0.4, travel = 0.3, open, m, handle,
}: {
  x: number; y: number; z: number; w: number; h: number; tray?: number; travel?: number;
  open: boolean; m: Mat; handle: Mat;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.position.z = THREE.MathUtils.damp(g.current.position.z, open ? travel : 0, 5, dt);
  });

  const T = 0.02;
  const th = h * 0.7;
  const sideY = -h / 2 + 0.02 + th / 2;

  return (
    <group position={[x, y, z]}>
      <group ref={g}>
        <Box p={[0, 0, T / 2]} s={[w, h, T]} m={m} />
        <Handle p={[0, h / 2 - 0.045, T]} len={Math.min(0.3, w * 0.5)} vertical={false} m={handle} />
        <Box p={[0, -h / 2 + 0.02, -tray / 2]} s={[w - 0.04, 0.012, tray]} m={INSIDE} />
        <Box p={[-(w / 2 - 0.03), sideY, -tray / 2]} s={[0.012, th, tray]} m={INSIDE} />
        <Box p={[w / 2 - 0.03, sideY, -tray / 2]} s={[0.012, th, tray]} m={INSIDE} />
        <Box p={[0, sideY, -tray]} s={[w - 0.04, th, 0.012]} m={INSIDE} />
      </group>
    </group>
  );
}