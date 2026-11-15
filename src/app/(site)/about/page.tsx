import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";

const values = [
  { title: "Made to measure", text: "No off-the-shelf compromises. Every piece is built for your exact space." },
  { title: "Honest materials", text: "We specify quality boards, hardware and finishes, and tell you exactly what goes into your project." },
  { title: "Design you can see", text: "3D visuals before fabrication, so there are no surprises on installation day." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Interiors built with intent.">
        <p>Winterior Design creates kitchens, wardrobes, bathroom vanities and TV units for homes that deserve more than standard.</p>
      </PageHeader>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <h3 className="font-display text-3xl">{v.title}</h3>
              <p className="mt-4 text-ink/70">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}