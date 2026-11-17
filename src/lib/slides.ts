import type { Slide } from "yet-another-react-lightbox";
import type { ProjectImage } from "@/data/projects";

function videoType(src: string) {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase();
  if (ext === "webm") return "video/webm";
  if (ext === "mov") return "video/quicktime";
  return "video/mp4";
}

export function toSlide(m: ProjectImage): Slide {
  if (m.type === "video") {
    return {
      type: "video",
      width: m.width,
      height: m.height,
      poster: m.poster ?? undefined,
      sources: [{ src: m.src, type: videoType(m.src) }],
    };
  }
  return { src: m.src, alt: m.alt, width: m.width, height: m.height };
}