"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { FINISHES, HANDLES } from "./finishes";
import { cn } from "@/lib/utils";

const ConfiguratorScene = dynamic(() => import("./ConfiguratorScene"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm tracking-widest text-white/50 uppercase">Loading 3D…</div>,
});

export default function Configurator() {
  const [finish, setFinish] = useState(FINISHES[1]);
  const [handle, setHandle] = useState(HANDLES[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_340px]">
      <div className="h-[60vh] min-h-[420px] bg-gradient-to-b from-neutral-800 to-ink lg:h-[75vh]">
        <ConfiguratorScene finish={finish} handle={handle} open={open} />
      </div>

      <aside className="space-y-10">
        <div>
          <p className="text-xs tracking-[0.3em] text-brass uppercase">Finish · {finish.name}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {FINISHES.map((f) => (
              <button
                key={f.name}
                aria-label={f.name}
                onClick={() => setFinish(f)}
                style={{ background: f.color }}
                className={cn("h-12 w-12 rounded-full border-2 transition", finish.name === f.name ? "border-brass scale-110" : "border-ink/20")}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.3em] text-brass uppercase">Handles · {handle.name}</p>
          <div className="mt-4 flex gap-3">
            {HANDLES.map((h) => (
              <button
                key={h.name}
                onClick={() => setHandle(h)}
                className={cn("border px-4 py-2 text-sm transition", handle.name === h.name ? "border-brass bg-brass text-white" : "border-ink/20")}
              >
                {h.name}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="w-full border border-ink px-6 py-3 text-sm tracking-widest uppercase transition hover:bg-ink hover:text-white">
          {open ? "Close doors" : "Open doors"}
        </button>

        <p className="text-sm text-ink/60">Drag to rotate, scroll to zoom. Finishes shown are indicative; real samples are available on request.</p>
      </aside>
    </div>
  );
}