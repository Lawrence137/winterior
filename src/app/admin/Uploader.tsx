"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Uploaded } from "@/app/admin/actions";

type Item = { id: string; name: string; progress: number; done?: boolean; error?: string };
type CloudinaryResult = { secure_url: string; public_id: string; resource_type: string; width?: number; height?: number };
type CloudinaryResponse = Partial<CloudinaryResult> & { error?: { message?: string } };

function measure(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const fallback = { width: 1600, height: 1067 };
    const finish = (v: { width: number; height: number }) => {
      URL.revokeObjectURL(url);
      resolve(v);
    };
    if (file.type.startsWith("video/")) {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => finish({ width: v.videoWidth, height: v.videoHeight });
      v.onerror = () => finish(fallback);
      v.src = url;
    } else {
      const img = new Image();
      img.onload = () => finish({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => finish(fallback);
      img.src = url;
    }
  });
}

function send(url: string, fields: Record<string, string>, file: File, onProgress: (p: number) => void) {
  return new Promise<CloudinaryResult>((resolve, reject) => {
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.append(k, v));
    form.append("file", file); // must be appended last

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let data: CloudinaryResponse = {};
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        /* ignore */
      }
      if (xhr.status < 300) resolve(data as CloudinaryResult);
      else reject(new Error(data.error?.message ?? `Upload rejected (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("Network error while uploading."));
    xhr.send(form);
  });
}

export default function Uploader({
  folder,
  onUploaded,
  multiple = true,
  imagesOnly = false,
  label = "Drop files here or click to choose",
}: {
  folder: string;
  onUploaded: (m: Uploaded) => Promise<void>;
  multiple?: boolean;
  imagesOnly?: boolean;
  label?: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [over, setOver] = useState(false);

  const update = (id: string, patch: Partial<Item>) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  async function handle(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      const id = crypto.randomUUID();
      setItems((l) => [...l, { id, name: file.name, progress: 0 }]);
      try {
        const dims = await measure(file);
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contentType: file.type, size: file.size, folder }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");

        const out = await send(data.uploadUrl, data.fields, file, (p) => update(id, { progress: p }));
        await onUploaded({
          url: out.secure_url,
          key: `${out.resource_type}:${out.public_id}`,
          type: out.resource_type === "video" ? "video" : "image",
          width: out.width ?? dims.width,
          height: out.height ?? dims.height,
        });
        update(id, { progress: 100, done: true });
      } catch (e) {
        update(id, { error: e instanceof Error ? e.message : "Upload failed" });
      }
    }
    router.refresh();
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files);
        }}
        className={`block cursor-pointer border border-dashed p-8 text-center text-sm transition ${
          over ? "border-brass bg-brass/10" : "border-ink/30 hover:border-brass"
        }`}
      >
        {label}
        <input
          type="file"
          hidden
          multiple={multiple}
          accept={
            imagesOnly
              ? "image/jpeg,image/png,image/webp,image/avif"
              : "image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
          }
          onChange={(e) => {
            handle(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {items.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs">
          {items.map((i) => (
            <li key={i.id} className={i.error ? "text-red-600" : "text-ink/70"}>
              {i.name} · {i.error ?? (i.done ? "Done" : `${i.progress}%`)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}