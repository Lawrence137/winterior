import { createHash } from "crypto";

const cloud = process.env.CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;

// Cloudinary signature: sorted "k=v" pairs joined with "&", secret appended, SHA-1
function sign(params: Record<string, string | number>) {
  const str = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  return createHash("sha1").update(str + process.env.CLOUDINARY_API_SECRET!).digest("hex");
}

export function signUpload(folder: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  return {
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloud}/auto/upload`,
    fields: { api_key: apiKey, timestamp: String(timestamp), folder, signature: sign({ folder, timestamp }) },
  };
}

// key is stored as "<resource_type>:<public_id>", e.g. "image:winterior/projects/karen/abc123"
export async function deleteObject(key: string) {
  const [type, ...rest] = key.split(":");
  const publicId = rest.join(":");
  const timestamp = Math.floor(Date.now() / 1000);
  const body = new URLSearchParams({
    public_id: publicId,
    timestamp: String(timestamp),
    api_key: apiKey,
    signature: sign({ public_id: publicId, timestamp }),
  });
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/${type}/destroy`, { method: "POST", body });
  if (!res.ok) throw new Error(`Cloudinary delete failed (${res.status})`);
}