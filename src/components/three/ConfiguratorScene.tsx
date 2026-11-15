"use client";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import type { Finish, Handle } from "./finishes";

const W = 2.4, H = 2.2, D = 0.6, T = 0.04, P = 0.1;
type V3 = [number, number, number];
type Mat = { color: string; roughness?: number; metalness?: number };

function Panel({ position, size, mat }: { position: V3; size: V3; mat: Mat }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={mat.color} roughness={mat.roughness ?? 0.6} metalness={mat.metalness ?? 0} />
    </mesh>
  );
}

function Door({ side, open, mat, handle }: { side: "left" | "right"; open: boolean; mat: Mat; handle: Mat }) {
  const group = useRef<THREE.Group>(null);
  const dw = (W - 2 * T) / 2;
  const dh = H - P - 0.03;
  const dir = side === "left" ? 1 : -1;
  const hingeX = -dir * (W / 2 - T);

  useFrame((_, dt) => {
    if (!group.current) return;
    const target = open ? -dir * Math.PI * 0.6 : 0;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target, 4, dt);
  });

  return (
    <group ref={group} position={[hingeX, P + dh / 2 + 0.01, D / 2 + 0.02]}>
      <Panel position={[dir * (dw / 2), 0, 0]} size={[dw - 0.01, dh, 0.03]} mat={mat} />
      <Panel position={[dir * (dw - 0.08), 0, 0.03]} size={[0.02, 0.5, 0.02]} mat={handle} />
    </group>
  );
}

function Wardrobe({ finish, handle, open }: { finish: Finish; handle: Handle; open: boolean }) {
  const body: Mat = { color: finish.color, roughness: finish.roughness };
  const inside: Mat = { color: "#e8e2d8", roughness: 0.8 };
  const dark: Mat = { color: "#161616", roughness: 0.8 };
  const innerH = H - P - 2 * T;
  const midY = P + (H - P) / 2;

  return (
    <group>
      <Panel position={[0, P / 2, -0.02]} size={[W - 0.06, P, D - 0.06]} mat={dark} />
      <Panel position={[-(W / 2 - T / 2), midY, 0]} size={[T, H - P, D]} mat={body} />
      <Panel position={[W / 2 - T / 2, midY, 0]} size={[T, H - P, D]} mat={body} />
      <Panel position={[0, H - T / 2, 0]} size={[W, T, D]} mat={body} />
      <Panel position={[0, P + T / 2, 0]} size={[W - 2 * T, T, D]} mat={inside} />
      <Panel position={[0, midY, -D / 2 + T / 2]} size={[W - 2 * T, innerH, T]} mat={inside} />
      <Panel position={[0, midY, 0]} size={[T, innerH, D - 0.05]} mat={inside} />

      {[0.55, 0.95, 1.35, 1.75].map((y) => (
        <Panel key={y} position={[-W / 4, y, 0]} size={[W / 2 - 2 * T, 0.025, D - 0.06]} mat={inside} />
      ))}

      <mesh position={[W / 4, 1.85, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, W / 2 - 0.1, 16]} />
        <meshStandardMaterial color={handle.color} metalness={handle.metalness} roughness={handle.roughness} />
      </mesh>

      <Door side="left" open={open} mat={body} handle={handle} />
      <Door side="right" open={open} mat={body} handle={handle} />
    </group>
  );
}

export default function ConfiguratorScene({ finish, handle, open }: { finish: Finish; handle: Handle; open: boolean }) {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [3.4, 1.9, 4.2], fov: 32 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <Wardrobe finish={finish} handle={handle} open={open} />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
      </Suspense>
      <OrbitControls
        target={[0, 1.1, 0]}
        enablePan={false}
        minDistance={3}
        maxDistance={7}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}