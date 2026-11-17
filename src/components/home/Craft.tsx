import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { getSlots } from "@/lib/queries";

export default async function Craft() {
  const slots = await getSlots();
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-walnut">
            <Image src={slots.craft} alt="Detail of custom cabinetry" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-xs tracking-[0.4em] text-brass uppercase">Our craft</p>
          <h2 className="font-display mt-4 text-4xl leading-tight font-light md:text-6xl">
            Detail you can feel in every hinge and edge.
          </h2>
          <p className="mt-6 max-w-lg text-ink/70">
            We combine careful joinery, quality hardware and precise finishing so your cabinets look right on day one and still work beautifully years later.
          </p>
          <Link href="/about" className="mt-10 inline-block border-b border-ink pb-1 text-sm tracking-widest uppercase transition hover:border-brass hover:text-brass">
            About Winterior →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}