"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Hero({ image = "/images/hero.jpg" }: { image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden bg-ink">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image src={image} alt="Luxury custom kitchen by Winterior Design" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />

      {/* Future: <HeroScene /> goes here as an absolutely positioned layer */}

      <motion.div style={{ y: textY, opacity }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-7xl text-white">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 text-xs tracking-[0.4em] text-brass uppercase"
          >
            Bespoke Interior Joinery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display max-w-4xl text-5xl leading-[1.05] font-light md:text-8xl"
          >
            Spaces designed to be <em className="text-brass">lived in</em>.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/projects" className="bg-brass px-8 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-ink">
              View Projects
            </Link>
            <Link href="/contact" className="border border-white/60 px-8 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-ink">
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}