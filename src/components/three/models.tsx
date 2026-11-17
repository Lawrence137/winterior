"use client";
import { useMemo } from "react";
import * as THREE from "three";
import { Box, DARK, Door, Drawer, GLOW, INSIDE, STEEL, Tap, type ModelProps } from "./parts";

/* ------------------------------ Wardrobe ------------------------------ */
export function Wardrobe({ width: W, depth: D, open, c }: ModelProps) {
  const H = 2.3, T = 0.03, PL = 0.08;
  const n = W > 2.4 ? 4 : 2;
  const dw = (W - 2 * T) / n;
  const midY = PL + (H - PL) / 2;
  const innerH = H - PL - 2 * T;
  const halfW = W / 2 - 1.5 * T;
  const cx = -W / 4 + T / 4;

  return (
    <group>
      <Box p={[0, PL / 2, -0.02]} s={[W - 0.06, PL, D - 0.08]} m={DARK} />
      <Box p={[-(W / 2 - T / 2), midY, 0]} s={[T, H - PL, D]} m={c.body} />
      <Box p={[W / 2 - T / 2, midY, 0]} s={[T, H - PL, D]} m={c.body} />
      <Box p={[0, H - T / 2, 0]} s={[W, T, D]} m={c.body} />
      <Box p={[0, PL + T / 2, -0.01]} s={[W - 2 * T, T, D - 0.02]} m={c.accent} />
      <Box p={[0, midY, -D / 2 + 0.01]} s={[W - 2 * T, innerH, 0.02]} m={c.accent} />
      <Box p={[0, midY, -0.02]} s={[T, innerH, D - 0.06]} m={c.accent} />

      {[0.5, 0.9, 1.3, 1.7].map((y) => (
        <Box key={y} p={[cx, y, -0.02]} s={[halfW, 0.02, D - 0.06]} m={c.accent} />
      ))}

      <mesh position={[-cx, 1.85, -0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, halfW, 16]} />
        <meshStandardMaterial color={c.handle.color} metalness={c.handle.metalness ?? 1} roughness={c.handle.roughness ?? 0.3} />
      </mesh>

      <Box p={[0, H - T - 0.01, 0.12]} s={[W - 2 * T - 0.04, 0.01, 0.02]} m={GLOW} shadow={false} />

      {Array.from({ length: n }, (_, i) => {
        const dir = i < n / 2 ? 1 : -1;
        const hingeX = -W / 2 + T + (dir === 1 ? i : i + 1) * dw;
        return (
          <Door key={i} hingeX={hingeX} y={midY} z={D / 2} w={dw - 0.004} h={H - PL - 0.01}
            dir={dir} open={open} m={c.body} handle={c.handle} />
        );
      })}
    </group>
  );
}

/* ------------------------------- Kitchen ------------------------------ */
export function Kitchen({ width: W, depth: D, open, c }: ModelProps) {
  const PL = 0.1, BH = 0.76, TOP = PL + BH, WT = 0.04;
  const m = Math.max(4, Math.round(W / 0.6));
  const mw = W / m;
  const mid = Math.floor(m / 2);
  const Dc = D - 0.02, cz = -0.01, front = D / 2 - 0.02;
  const bx = (k: number) => -W / 2 + (k + 0.5) * mw;
  const midY = PL + BH / 2;
  const surface = TOP + WT;

  const Du = 0.34, UH = 0.7, UY = 1.8;
  const uz = -D / 2 + Du / 2;
  const ufront = -D / 2 + Du;
  const uppers = Array.from({ length: m }, (_, k) => k).filter((k) => k !== mid);
  const hood = Math.max(0.6, mw);
  const hh = (BH - 0.04) / 3;

  return (
    <group>
      {/* base carcass */}
      <Box p={[0, PL / 2, -0.02]} s={[W - 0.02, PL, D - 0.06]} m={DARK} />
      <Box p={[0, PL + 0.01, cz]} s={[W, 0.02, Dc]} m={INSIDE} />
      <Box p={[0, TOP - 0.01, cz]} s={[W, 0.02, Dc]} m={c.body} />
      <Box p={[0, midY, -D / 2 + 0.01]} s={[W, BH, 0.02]} m={INSIDE} />
      {Array.from({ length: m + 1 }, (_, k) => {
        const end = k === 0 || k === m;
        const x = -W / 2 + k * mw + (k === 0 ? 0.01 : k === m ? -0.01 : 0);
        return <Box key={k} p={[x, midY, cz]} s={[0.02, BH, Dc]} m={end ? c.body : INSIDE} />;
      })}

      {/* base fronts */}
      {Array.from({ length: m }, (_, k) => {
        if (k === mid) {
          return (
            <group key={k}>
              {[0, 1, 2].map((j) => (
                <Drawer key={j} x={bx(k)} y={PL + 0.02 + (j + 0.5) * hh} z={front} w={mw - 0.006} h={hh - 0.006}
                  tray={D - 0.1} open={open} m={c.body} handle={c.handle} />
              ))}
            </group>
          );
        }
        const di = k < mid ? k : k - 1;
        const dir = di % 2 === 0 ? 1 : -1;
        return (
          <group key={k}>
            <Box p={[bx(k), PL + 0.4, cz]} s={[mw - 0.03, 0.02, Dc - 0.04]} m={INSIDE} />
            <Door hingeX={dir === 1 ? bx(k) - mw / 2 + 0.003 : bx(k) + mw / 2 - 0.003} y={midY} z={front}
              w={mw - 0.006} h={BH - 0.02} dir={dir} open={open} m={c.body} handle={c.handle} grip="top" />
          </group>
        );
      })}

      {/* worktop, backsplash */}
      <Box p={[0, TOP + WT / 2, 0.01]} s={[W + 0.02, WT, D + 0.03]} m={c.top} />
      <Box p={[0, surface + 0.275, -D / 2 + 0.005]} s={[W, 0.55, 0.01]} m={{ ...c.top, roughness: 0.3 }} shadow={false} />

      {/* hob */}
      <Box p={[bx(mid), surface + 0.003, 0]} s={[0.58, 0.006, 0.5]} m={{ color: "#0c0c0e", roughness: 0.12, metalness: 0.5 }} shadow={false} />
      {[[-0.14, -0.12], [0.14, -0.12], [-0.14, 0.12], [0.14, 0.12]].map(([dx, dz], i) => (
        <mesh key={i} position={[bx(mid) + dx, surface + 0.008, dz]}>
          <cylinderGeometry args={[0.07, 0.07, 0.004, 32]} />
          <meshStandardMaterial color="#3a3a3d" metalness={0.8} roughness={0.35} />
        </mesh>
      ))}

      {/* sink and tap */}
      <Box p={[bx(1), surface + 0.002, 0.02]} s={[0.46, 0.004, 0.38]} m={STEEL} shadow={false} />
      <Box p={[bx(1), surface + 0.004, 0.02]} s={[0.4, 0.004, 0.32]} m={{ color: "#8f9296", metalness: 0.9, roughness: 0.4 }} shadow={false} />
      <Tap p={[bx(1), surface, -D / 2 + 0.1]} h={0.27} reach={0.16} m={c.handle} />

      {/* wall cabinets */}
      {uppers.map((k) => {
        const x = bx(k);
        const di = k < mid ? k : k - 1;
        const dir = di % 2 === 0 ? 1 : -1;
        return (
          <group key={k}>
            <Box p={[x, UY - UH / 2 + 0.01, uz]} s={[mw, 0.02, Du]} m={c.accent} />
            <Box p={[x, UY + UH / 2 - 0.01, uz]} s={[mw, 0.02, Du]} m={c.accent} />
            <Box p={[x - mw / 2 + 0.01, UY, uz]} s={[0.02, UH, Du]} m={c.accent} />
            <Box p={[x + mw / 2 - 0.01, UY, uz]} s={[0.02, UH, Du]} m={c.accent} />
            <Box p={[x, UY, -D / 2 + 0.01]} s={[mw - 0.04, UH - 0.04, 0.02]} m={INSIDE} />
            <Box p={[x, UY, uz]} s={[mw - 0.04, 0.02, Du - 0.04]} m={INSIDE} />
            <Door hingeX={dir === 1 ? x - mw / 2 + 0.003 : x + mw / 2 - 0.003} y={UY} z={ufront}
              w={mw - 0.006} h={UH - 0.01} dir={dir} open={open} m={c.accent} handle={c.handle} grip="bottom" />
          </group>
        );
      })}

      {/* extractor hood */}
      <Box p={[bx(mid), 1.5, -D / 2 + 0.22]} s={[hood, 0.08, 0.45]} m={STEEL} />
      <Box p={[bx(mid), 1.97, -D / 2 + 0.11]} s={[0.3, 0.86, 0.22]} m={STEEL} />
    </group>
  );
}

/* ------------------------------- Vanity ------------------------------- */
export function Vanity({ width: W, depth: D, open, c }: ModelProps) {
  const T = 0.02, HC = 0.5, YC = 0.3 + HC / 2, topY = 0.3 + HC;
  const cols = W > 1.1 ? 2 : 1;
  const dwid = (W - (cols + 1) * T) / cols;
  const Dc = D - 0.02, cz = -0.01, front = D / 2 - 0.02;
  const hh = (HC - 2 * T) / 2;
  const colX = (i: number) => -W / 2 + T + dwid / 2 + i * (dwid + T);
  const Wm = W * 0.9;

  const profile = useMemo(
    () =>
      [[0.001, 0], [0.1, 0], [0.15, 0.04], [0.19, 0.12], [0.185, 0.125], [0.18, 0.12], [0.14, 0.05], [0.001, 0.025]]
        .map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  return (
    <group>
      {/* floating carcass */}
      <Box p={[-(W / 2 - T / 2), YC, cz]} s={[T, HC, Dc]} m={c.body} />
      <Box p={[W / 2 - T / 2, YC, cz]} s={[T, HC, Dc]} m={c.body} />
      <Box p={[0, 0.3 + T / 2, cz]} s={[W, T, Dc]} m={c.body} />
      <Box p={[0, topY - T / 2, cz]} s={[W, T, Dc]} m={c.body} />
      <Box p={[0, YC, -D / 2 + 0.01]} s={[W - 2 * T, HC - 2 * T, 0.02]} m={INSIDE} />
      {cols === 2 && <Box p={[0, YC, cz]} s={[T, HC - 2 * T, Dc - 0.02]} m={c.body} />}

      {Array.from({ length: cols }, (_, i) =>
        [0, 1].map((j) => (
          <Drawer key={`${i}-${j}`} x={colX(i)} y={0.3 + T + (j + 0.5) * hh} z={front} w={dwid - 0.006} h={hh - 0.006}
            tray={D - 0.1} travel={0.26} open={open} m={c.accent} handle={c.handle} />
        ))
      )}

      {/* stone top, basins, taps */}
      <Box p={[0, topY + 0.015, 0.012]} s={[W + 0.02, 0.03, D + 0.03]} m={c.top} />
      {Array.from({ length: cols }, (_, i) => (
        <group key={i}>
          <mesh position={[colX(i), topY + 0.03, 0.04]} castShadow>
            <latheGeometry args={[profile, 48]} />
            <meshStandardMaterial color="#f4f2ee" roughness={0.15} side={THREE.DoubleSide} />
          </mesh>
          <Tap p={[colX(i), topY + 0.03, -D / 2 + 0.07]} h={0.27} reach={0.15} m={c.handle} />
        </group>
      ))}

      {/* backlit mirror */}
      <Box p={[0, 1.55, -D / 2 + 0.012]} s={[Wm + 0.04, 0.84, 0.012]}
        m={{ color: "#fff1d6", emissive: "#ffd9a0", emissiveIntensity: 1.6 }} shadow={false} />
      <Box p={[0, 1.55, -D / 2 + 0.024]} s={[Wm, 0.8, 0.012]} m={{ color: "#c9d1d6", metalness: 1, roughness: 0.05 }} shadow={false} />
    </group>
  );
}

/* ------------------------------- TV unit ------------------------------ */
export function TvUnit({ width: W, depth: D, open, c }: ModelProps) {
  const T = 0.02, HC = 0.4, Y0 = 0.2, YC = Y0 + HC / 2;
  let m = Math.max(3, Math.round(W / 0.6));
  if (m % 2 === 0) m += 1; // odd count keeps the door / drawer pattern symmetric
  const mw = W / m;
  const Dc = D - 0.02, cz = -0.01, front = D / 2 - 0.02;
  const bx = (k: number) => -W / 2 + (k + 0.5) * mw;

  const PW = W + 0.4;
  const slats = Math.floor(PW / 0.085);
  const tw = Math.min(1.4, W * 0.55);
  const th = tw * 0.5625;
  const shelves = tw / 2 + 0.63 <= PW / 2 - 0.05;
  const sx = tw / 2 + 0.38;

  return (
    <group>
      {/* console */}
      <Box p={[0, Y0 + T / 2, cz]} s={[W, T, Dc]} m={c.body} />
      <Box p={[0, Y0 + HC - T / 2, cz]} s={[W, T, Dc]} m={c.body} />
      <Box p={[0, YC, -D / 2 + 0.01]} s={[W, HC, 0.02]} m={INSIDE} />
      {Array.from({ length: m + 1 }, (_, k) => {
        const end = k === 0 || k === m;
        const x = -W / 2 + k * mw + (k === 0 ? 0.01 : k === m ? -0.01 : 0);
        return <Box key={k} p={[x, YC, cz]} s={[T, HC, Dc]} m={end ? c.body : INSIDE} />;
      })}
      <Box p={[0, Y0 + HC + 0.01, 0]} s={[W + 0.02, 0.02, D + 0.01]} m={c.body} />

      {Array.from({ length: m }, (_, k) =>
        k % 2 === 1 ? (
          <Drawer key={k} x={bx(k)} y={YC} z={front} w={mw - 0.006} h={HC - 0.02} tray={D - 0.1}
            open={open} m={c.body} handle={c.handle} />
        ) : (
          <Door key={k} hingeX={(k / 2) % 2 === 0 ? bx(k) - mw / 2 + 0.003 : bx(k) + mw / 2 - 0.003} y={YC} z={front}
            w={mw - 0.006} h={HC - 0.02} dir={(k / 2) % 2 === 0 ? 1 : -1} open={open} m={c.body} handle={c.handle} />
        )
      )}

      <Box p={[0, Y0 - 0.006, 0]} s={[W - 0.1, 0.008, D - 0.14]} m={GLOW} shadow={false} />

      {/* slatted feature wall */}
      <Box p={[0, 1.25, -D / 2 - 0.035]} s={[PW, 2.3, 0.01]} m={DARK} shadow={false} />
      {Array.from({ length: slats }, (_, i) => (
        <mesh key={i} position={[-PW / 2 + 0.0425 + i * 0.085, 1.25, -D / 2 - 0.015]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 2.3, 0.03]} />
          <meshStandardMaterial color={c.accent.color} roughness={c.accent.roughness ?? 0.6} />
        </mesh>
      ))}

      {/* TV */}
      <Box p={[0, 0.72 + th / 2, -D / 2 - 0.01]} s={[tw, th, 0.04]} m={{ color: "#08080a", roughness: 0.12, metalness: 0.7 }} />

      {shelves &&
        [-1, 1].map((side) =>
          [1.3, 1.7].map((y) => (
            <Box key={`${side}-${y}`} p={[side * sx, y, -D / 2 + 0.08]} s={[0.5, 0.03, 0.22]} m={c.body} />
          ))
        )}
      {shelves && (
        <>
          <mesh position={[sx, 1.3 + 0.015 + 0.07, -D / 2 + 0.08]} castShadow>
            <sphereGeometry args={[0.07, 32, 32]} />
            <meshStandardMaterial color={c.handle.color} metalness={c.handle.metalness ?? 1} roughness={c.handle.roughness ?? 0.3} />
          </mesh>
          <mesh position={[-sx, 1.3 + 0.015 + 0.1, -D / 2 + 0.08]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 0.2, 24]} />
            <meshStandardMaterial color="#e9e4da" roughness={0.35} />
          </mesh>
        </>
      )}
    </group>
  );
}