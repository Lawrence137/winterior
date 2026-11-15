import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: "100%", label: "Made to measure" },
  { value: "4", label: "Specialist collections" },
  { value: "3D", label: "Previews before build" },
  { value: "10 yr", label: "Workmanship guarantee" },
];

export default function Stats() {
  return (
    <section className="border-b border-ink/10 px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <p className="font-display text-5xl text-walnut md:text-6xl">{s.value}</p>
            <p className="mt-2 text-xs tracking-[0.25em] text-ink/60 uppercase">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}