"use client";
import { Suspense, useEffect, useRef } from "react";
import type { ComponentRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import type { Cfg } from "./parts";
import { Kitchen, TvUnit, Vanity, Wardrobe } from "./models";
import { PRODUCTS, type ProductKey } from "./products";

type V3 = [number, number, number];

/** Re-frames the camera whenever the product changes */
function Controls({ pos, target, min, max }: { pos: V3; target: V3; min: number; max: number }) {
  const camera = useThree((s) => s.camera);
  const ref = useRef<ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    camera.position.set(...pos);
    ref.current?.target.set(...target);
    ref.current?.update();
  }, [camera, pos, target]);

  return (
    <OrbitControls
      ref={ref}
      enablePan={false}
      minDistance={min}
      maxDistance={max}
      minPolarAngle={Math.PI / 3.5}
      maxPolarAngle={Math.PI / 2.05}
      minAzimuthAngle={-Math.PI / 2.6}
      maxAzimuthAngle={Math.PI / 2.6}
    />
  );
}

export default function ConfiguratorScene({
  product, width, open, cfg, wallColor,
}: {
  product: ProductKey; width: number; open: boolean; cfg: Cfg; wallColor: string;
}) {
  const def = PRODUCTS[product];
  const props = { width, depth: def.depth, open, c: cfg };

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: def.camera, fov: 32 }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.5}
        shadow-camera-far={16}
      />

      {product === "wardrobe" && <Wardrobe {...props} />}
      {product === "kitchen" && <Kitchen {...props} />}
      {product === "vanity" && <Vanity {...props} />}
      {product === "tv" && <TvUnit {...props} />}

      {/* wall and floor */}
      <mesh position={[0, 3, -def.depth / 2 - def.wallGap]} receiveShadow>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.5]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#c9c2b6" roughness={0.8} />
      </mesh>
      <ContactShadows position={[0, 0.002, 0]} opacity={0.35} scale={10} blur={2.5} far={2} />

      <Suspense fallback={null}>
        <Environment preset="apartment" />
      </Suspense>

      <Controls pos={def.camera} target={def.target} min={def.dist[0]} max={def.dist[1]} />
    </Canvas>
  );
}