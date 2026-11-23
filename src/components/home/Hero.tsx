"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero({ image = "/images/hero.jpg" }: { image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink md:h-[100dvh] md:min-h-[700px]"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt="Luxury custom kitchen by Winterior Design"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,.82)_0%,rgba(18,18,18,.48)_42%,rgba(18,18,18,.08)_75%),linear-gradient(0deg,rgba(18,18,18,.68)_0%,transparent_42%,rgba(18,18,18,.28)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/15" />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 sm:pb-10 md:px-10 md:pb-12 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-5 flex items-center gap-4 text-[10px] font-medium tracking-[0.38em] text-silver uppercase md:mb-7 md:text-xs"
          >
            <span className="h-px w-10 bg-silver" />
            Bespoke Interior Joinery
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display max-w-[760px] text-[clamp(3.25rem,7vw,7.5rem)] leading-[0.88] font-light tracking-[-0.035em]"
          >
            Made for life.
            <br />
            <em className="text-silver">Built to last.</em>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 flex flex-wrap items-center gap-3 md:mt-10"
          >
            <Link
              href="/projects"
              className="group flex min-h-14 items-center gap-5 bg-brass px-6 py-4 text-xs font-medium tracking-[0.18em] uppercase transition hover:bg-white hover:text-ink md:px-8"
            >
              View Projects
              <span
                aria-hidden="true"
                className="text-lg transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
            <Link
              href="/configurator"
              className="flex min-h-14 items-center px-5 py-4 text-xs font-medium tracking-[0.18em] uppercase transition hover:text-silver md:px-6"
            >
              Explore in 3D
              <span aria-hidden="true" className="ml-3">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute right-10 bottom-12 hidden w-64 border-l border-white/30 pl-6 text-white lg:block"
          aria-label="Featured design"
        >
          <p className="text-[10px] tracking-[0.28em] text-white/55 uppercase">
            Featured design
          </p>
          <p className="mt-2 font-display text-2xl leading-tight">
            The Signature Kitchen
          </p>
          <p className="mt-3 text-xs text-white/65">
            Warm oak · Natural stone · Bespoke details
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
