import { NextResponse } from "next/server";
import { signUpload } from "@/lib/cloudinary";

// Free-plan limits: about 10 MB per image, 100 MB per video. Raise these if you upgrade.
const MAX_MB: Record<string, number> = {
  "image/jpeg": 10, "image/png": 10, "image/webp": 10, "image/avif": 10,
  "video/mp4": 100, "video/webm": 100, "video/quicktime": 100,
};

export async function POST(req: Request) {
  const { contentType, size, folder } = await req.json();

  const limit = MAX_MB[contentType];
  if (!limit) return NextResponse.json({ error: "Unsupported file type. Use JPG, PNG, WebP, MP4 or WebM." }, { status: 415 });
  if (size > limit * 1024 * 1024) return NextResponse.json({ error: `File too large (max ${limit} MB).` }, { status: 413 });

  const dir = String(folder ?? "").replace(/[^a-z0-9/-]/gi, "") || "misc";
  return NextResponse.json(signUpload(`winterior/${dir}`));
}