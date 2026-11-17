export const COOKIE = "winterior_admin";
const enc = new TextEncoder();

async function hmac(data: string) {
  const key = await crypto.subtle.importKey("raw", enc.encode(process.env.ADMIN_SECRET!), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export async function createToken(days = 7) {
  const exp = Date.now() + days * 86_400_000;
  return `${exp}.${await hmac(String(exp))}`;
}

export async function verifyToken(token?: string) {
  if (!token || !process.env.ADMIN_SECRET) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(exp));
}