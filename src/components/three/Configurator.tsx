"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FINISHES, HANDLES, TOPS, WALLS, type Finish } from "./finishes";
import { PRODUCTS, PRODUCT_LIST, type ProductKey } from "./products";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { cn } from "@/lib/utils";

const ConfiguratorScene = dynamic(() => import("./ConfiguratorScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center text-sm tracking-widest text-white/50 uppercase">Loading 3D…</div>
  ),
});

const pick = <T extends { name: string }>(list: T[], name: string) => list.find((i) => i.name === name) ?? list[0];
const custom = (hex: string): Finish => ({ name: `Custom ${hex}`, color: hex, roughness: 0.55, group: "Custom" });
const label = (n: string) => (n.startsWith("Custom") ? n : n);

function Swatches<T extends { name: string; color: string }>({
  title, list, value, onChange, onCustom,
}: {
  title: string; list: T[]; value: T; onChange: (v: T) => void; onCustom?: (hex: string) => void;
}) {
  return (
    <div>
      <p className="text-xs tracking-[0.3em] text-brass uppercase">
        {title} · {value.name.startsWith("Custom") ? "Custom" : value.name}
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {list.map((i) => (
          <button
            key={i.name}
            type="button"
            title={i.name}
            aria-label={i.name}
            onClick={() => onChange(i)}
            style={{ background: i.color }}
            className={cn(
              "h-9 w-9 rounded-full border-2 transition",
              value.name === i.name ? "scale-110 border-brass" : "border-ink/20 hover:border-ink/50"
            )}
          />
        ))}
        {onCustom && (
          <label
            title="Pick any colour"
            className={cn(
              "relative h-9 w-9 cursor-pointer rounded-full border-2 transition",
              value.name.startsWith("Custom") ? "scale-110 border-brass" : "border-ink/20 hover:border-ink/50"
            )}
            style={{ background: "conic-gradient(#f43f5e, #f59e0b, #84cc16, #06b6d4, #6366f1, #d946ef, #f43f5e)" }}
          >
            <input
              type="color"
              value={value.color}
              onChange={(e) => onCustom(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Custom colour"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default function Configurator() {
  const [product, setProduct] = useState<ProductKey>("wardrobe");
  const d0 = PRODUCTS.wardrobe;
  const [width, setWidth] = useState(d0.width.def);
  const [body, setBody] = useState<Finish>(pick(FINISHES, d0.defaults.body));
  const [accent, setAccent] = useState<Finish>(pick(FINISHES, d0.defaults.accent));
  const [top, setTop] = useState(pick(TOPS, d0.defaults.top));
  const [handle, setHandle] = useState(pick(HANDLES, d0.defaults.handle));
  const [wall, setWall] = useState(WALLS[0]);
  const [open, setOpen] = useState(false);

  const def = PRODUCTS[product];

  function choose(k: ProductKey) {
    const d = PRODUCTS[k];
    setProduct(k);
    setWidth(d.width.def);
    setBody(pick(FINISHES, d.defaults.body));
    setAccent(pick(FINISHES, d.defaults.accent));
    setTop(pick(TOPS, d.defaults.top));
    setHandle(pick(HANDLES, d.defaults.handle));
    setOpen(false);
  }

  const cfg = {
    body: { color: body.color, roughness: body.roughness },
    accent: { color: accent.color, roughness: accent.roughness },
    top: { color: top.color, roughness: top.roughness },
    handle: { color: handle.color, metalness: handle.metalness, roughness: handle.roughness },
  };

  const message = [
    `Hello Winterior, I'd like a quote for this ${def.label.toLowerCase()} design:`,
    `Width: ${width.toFixed(1)} m`,
    `${def.bodyLabel}: ${label(body.name)}`,
    `${def.accentLabel}: ${label(accent.name)}`,
    def.topLabel ? `${def.topLabel}: ${top.name}` : null,
    `Handles: ${handle.name}`,
    `Wall: ${wall.name}`,
  ].filter(Boolean).join("\n");

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap gap-3">
        {PRODUCT_LIST.map((p) => (
          <button
            key={p.key}
            onClick={() => choose(p.key)}
            className={cn(
              "border px-5 py-2 text-xs tracking-widest uppercase transition",
              product === p.key ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-brass hover:text-brass"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="h-[60vh] min-h-[420px] bg-gradient-to-b from-neutral-800 to-ink lg:h-[75vh]">
          <ConfiguratorScene product={product} width={width} open={open} cfg={cfg} wallColor={wall.color} />
        </div>

        <aside className="space-y-8 lg:max-h-[75vh] lg:overflow-y-auto lg:pr-2">
          <div>
            <p className="text-xs tracking-[0.3em] text-brass uppercase">Width · {width.toFixed(1)} m</p>
            <input
              type="range"
              min={def.width.min}
              max={def.width.max}
              step={def.width.step}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-3 w-full accent-brass"
              aria-label="Width"
            />
          </div>

          <Swatches title={def.bodyLabel} list={FINISHES} value={body} onChange={setBody} onCustom={(h) => setBody(custom(h))} />
          <Swatches title={def.accentLabel} list={FINISHES} value={accent} onChange={setAccent} onCustom={(h) => setAccent(custom(h))} />
          {def.topLabel && <Swatches title={def.topLabel} list={TOPS} value={top} onChange={setTop} />}
          <Swatches title="Handles" list={HANDLES} value={handle} onChange={setHandle} />
          <Swatches title="Wall" list={WALLS} value={wall} onChange={setWall} />

          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full border border-ink px-6 py-3 text-sm tracking-widest uppercase transition hover:bg-ink hover:text-white"
          >
            {open ? "Close doors & drawers" : "Open doors & drawers"}
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-brass px-6 py-4 text-center text-sm tracking-widest text-white uppercase transition hover:bg-ink"
          >
            Send this design to us
          </a>

          <p className="text-sm text-ink/60">
            Drag to rotate, scroll to zoom. Finishes are indicative; real samples are available on request.
          </p>
        </aside>
      </div>
    </div>
  );
}