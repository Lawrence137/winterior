import Reveal from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Consultation", text: "We visit, measure and listen to how you live and what you need." },
  { n: "02", title: "Design & 3D", text: "You see your space rendered in 3D, with materials and finishes, before anything is built." },
  { n: "03", title: "Fabrication", text: "Every piece is made to measure in our workshop with strict quality checks." },
  { n: "04", title: "Installation", text: "Our team fits everything cleanly and hands over a finished space." },
];

export default function Process() {
  return (
    <section className="bg-ink px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-[0.4em] text-brass uppercase">How we work</p>
          <h2 className="font-display mt-4 max-w-2xl text-4xl font-light md:text-6xl">From first sketch to final handle.</h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="bg-ink p-8">
              <span className="font-display text-5xl text-brass">{s.n}</span>
              <h3 className="font-display mt-6 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-white/60">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}