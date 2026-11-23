"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/collections/kitchen-cabinets", label: "Collections" },
  { href: "/projects", label: "Projects" },
  { href: "/configurator", label: "Configurator" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  const overlayVariants = {
    open: { transition: { when: "beforeChildren" as const } },
    closed: { transition: { when: "afterChildren" as const } },
  };
  const backdropVariants = {
    open: {
      opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.28, ease: "easeOut" as const },
    },
    closed: {
      opacity: 0,
      transition: { duration: reduceMotion ? 0 : 0.28, ease: "easeOut" as const },
    },
  };
  const panelVariants = {
    open: {
      x: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 280, damping: 30, mass: 0.85 },
    },
    closed: {
      x: reduceMotion ? 0 : "100%",
      transition: reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 320, damping: 34, mass: 0.85 },
    },
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "bg-ink/80 py-3 backdrop-blur-md" : "bg-transparent py-6"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 text-white">
        <Link href="/" className="relative block h-12 w-[144px]" aria-label="Winterior Design home">
          <Image
            src="/logo-transparent.png"
            alt=""
            fill
            priority
            sizes="144px"
            className="object-contain object-left"
          />
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
          type="button"
          className="group flex min-h-11 items-center gap-3 text-xs tracking-[0.18em] uppercase transition-colors hover:text-red md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span className={cn("h-px w-full bg-current transition-transform", open && "translate-y-[4px] rotate-45")} />
            <span className={cn("h-px w-full bg-current transition-transform", open && "-translate-y-[3px] -rotate-45")} />
          </span>
        </button>
      </nav>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-transparent p-0 text-white backdrop:bg-transparent md:hidden"
        onCancel={(event) => {
          event.preventDefault();
          setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <AnimatePresence
          onExitComplete={() => {
            if (!open) dialogRef.current?.close();
          }}
        >
          {open && (
            <motion.div
              key="mobile-navigation-overlay"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              className="absolute inset-0"
            >
              <motion.div
                variants={backdropVariants}
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className="absolute inset-0 bg-black/65"
              />
              <motion.div
                variants={panelVariants}
                className="relative ml-auto flex h-full w-full max-w-[480px] flex-col border-l border-white/10 bg-ink px-7 pt-6 pb-8 shadow-2xl sm:px-10"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <Link
                    href="/"
                    aria-label="Winterior Design home"
                    onClick={() => setOpen(false)}
                    className="relative block h-11 w-36"
                  >
                    <Image
                      src="/logo-transparent.png"
                      alt=""
                      fill
                      sizes="144px"
                      className="object-contain object-left"
                    />
                  </Link>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setOpen(false)}
                    aria-label="Close navigation menu"
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 text-xl text-silver transition hover:border-red hover:bg-red hover:text-white focus-visible:outline-white"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <div className="mt-10">
                  <p className="text-[10px] tracking-[0.34em] text-silver uppercase">
                    Discover Winterior
                  </p>
                  <nav aria-label="Mobile">
                    <ul className="mt-5">
                      {links.map((link, index) => {
                        const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.32,
                              delay: reduceMotion ? 0 : 0.12 + index * 0.055,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="border-b border-white/10"
                          >
                            <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              aria-current={current ? "page" : undefined}
                              className={cn(
                                "group flex items-center gap-5 py-4 transition-colors hover:text-red",
                                current && "text-red"
                              )}
                            >
                              <span className="w-6 text-xs tracking-widest text-silver/60">
                                0{index + 1}
                              </span>
                              <span className="font-display flex-1 text-[2rem] leading-none sm:text-4xl">
                                {link.label}
                              </span>
                              <span
                                aria-hidden="true"
                                className="text-lg text-silver/60 transition-transform group-hover:translate-x-1 group-hover:text-red"
                              >
                                →
                              </span>
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                <motion.div
                  initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.32,
                    delay: reduceMotion ? 0 : 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-auto pt-8"
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between bg-red px-5 text-xs tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-ink"
                  >
                    <span>Get a Quote</span>
                    <span aria-hidden="true" className="text-lg">
                      ↗
                    </span>
                  </Link>
                  <p className="mt-5 text-[10px] tracking-[0.2em] text-silver/60 uppercase">
                    Bespoke interiors · Nairobi, Kenya
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </header>
  );
}