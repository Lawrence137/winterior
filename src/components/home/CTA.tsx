import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
    <section className="bg-walnut px-6 py-28 text-center text-white">
      <Reveal>
        <h2 className="font-display mx-auto max-w-3xl text-4xl font-light md:text-6xl">
          Ready to see your space <em className="text-brass">transformed</em>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-white/70">Tell us about your project and we will come back with ideas and a quote.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="bg-brass px-8 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-ink">
            Request a Quote
          </Link>
          <Link href="/configurator" className="border border-white/60 px-8 py-4 text-sm tracking-widest uppercase transition hover:bg-white hover:text-ink">
            Try the Configurator
          </Link>
        </div>
      </Reveal>
    </section>
  );
}