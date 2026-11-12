"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/collections/kitchen-cabinets", label: "Collections" },
  { href: "/projects", label: "Projects" },
  { href: "/configurator", label: "Configurator" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-ink/80 py-3 backdrop-blur-md" : "bg-transparent py-6"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 text-white">
        <Link href="/" className="font-display text-2xl tracking-[0.2em] uppercase">
          Winterior
        </Link>

        <ul className="hidden items-center gap-10 text-sm tracking-widest uppercase md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-brass">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              className="border border-white/60 px-5 py-2 transition hover:border-brass hover:bg-brass"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-sm tracking-widest uppercase"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden px-6 text-white md:hidden"
          >
            {[...links, { href: "/contact", label: "Get a Quote" }].map((l) => (
              <li key={l.href} className="border-t border-white/10 py-4">
                <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-2xl">
                  {l.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}