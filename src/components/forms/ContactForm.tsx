"use client";
import { useState } from "react";
import { categories } from "@/data/categories";

const WHATSAPP_NUMBER = "254728846560"; // TODO: replace with the real number, digits only

const field = "w-full border-b border-ink/30 bg-transparent py-3 outline-none transition focus:border-brass";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [
      "Hello Winterior, I'd like a quote.",
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Interested in: ${d.get("interest")}`,
      `Details: ${d.get("message")}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <input name="name" required placeholder="Your name" className={field} />
      <input name="phone" required type="tel" placeholder="Phone number" className={field} />
      <select name="interest" defaultValue={categories[0].name} className={field}>
        {categories.map((c) => (
          <option key={c.slug}>{c.name}</option>
        ))}
      </select>
      <textarea name="message" rows={4} placeholder="Tell us about your space" className={field} />
      <button className="bg-ink px-10 py-4 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
        Send via WhatsApp
      </button>
      {sent && <p className="text-sm text-walnut">Opening WhatsApp. Thank you, we will be in touch.</p>}
    </form>
  );
}