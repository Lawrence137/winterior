import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ink px-6 pt-40 pb-20 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-xs tracking-[0.4em] text-brass uppercase">{eyebrow}</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] font-light md:text-7xl">{title}</h1>
          {children && <div className="mt-6 max-w-2xl text-white/70">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}