"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function CTAParallax({ image }: { image: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-white">
      {/* Image is 30% taller than the section so it can drift without showing gaps */}
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[15%]">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/80" />
      <div className="pointer-events-none absolute inset-5 border border-white/20 md:inset-10" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-36 pb-12 text-center md:pt-52">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] text-brass uppercase"
        >
          Start your project
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 text-5xl leading-[1.05] font-light md:text-8xl"
        >
          Ready to see your space <em className="text-brass">transformed</em>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-8 max-w-xl text-white/75"
        >
          Tell us about your project and we will come back with ideas, a 3D preview and a quote.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link href="/contact" className="bg-brass px-8 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-ink">
            Request a Quote
          </Link>
          <Link href="/configurator" className="border border-white/60 px-8 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-ink">
            Try the Configurator
          </Link>
        </motion.div>

        <div className="mt-24 grid gap-8 border-t border-white/20 pt-8 text-sm md:mt-32 md:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.3em] text-brass uppercase">Visit</p>
            <p className="mt-2 text-white/80">Nairobi, Kenya</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-brass uppercase">Message</p>
            <p className="mt-2 text-white/80">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="transition hover:text-brass">
                WhatsApp
              </a>
              {" · "}
              <a href="mailto:hello@winterior.design" className="transition hover:text-brass">hello@winterior.design</a>
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-brass uppercase">Hours</p>
            <p className="mt-2 text-white/80">Mon to Sat, 8am to 6pm</p>
          </div>
        </div>
      </div>
    </section>
  );
}