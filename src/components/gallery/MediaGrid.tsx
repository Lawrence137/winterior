"use client";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import type { ProjectImage } from "@/data/projects";
import { toSlide } from "@/lib/slides";

export default function MediaGrid({ items }: { items: ProjectImage[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((m, i) => (
          <button
            key={`${m.src}-${i}`}
            onClick={() => setIndex(i)}
            aria-label={`Open item ${i + 1}`}
            className="group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden bg-walnut"
          >
            {m.type === "video" ? (
              <>
                <video src={m.src} muted playsInline preload="metadata" className="h-auto w-full" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 pl-1 text-ink">▶</span>
                </span>
              </>
            ) : (
              <Image
                src={m.src}
                alt={m.alt}
                width={m.width}
                height={m.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-[1200ms] group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom, Video]}
        slides={items.map(toSlide)}
        carousel={{ finite: true }}
      />
    </>
  );
}