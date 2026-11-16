"use client";
import { useState } from "react";
import Image from "next/image";

export default function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-ink select-none">
      <Image src={after} alt={`${alt}, after`} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${alt}, before`} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
      </div>

      <span className="absolute top-4 left-4 bg-ink/70 px-3 py-1 text-[11px] tracking-widest text-white uppercase">Before</span>
      <span className="absolute top-4 right-4 bg-brass px-3 py-1 text-[11px] tracking-widest text-white uppercase">After</span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg">
          ↔
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}