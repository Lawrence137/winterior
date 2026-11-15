import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow="Projects" title="Our work, coming soon." />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="max-w-xl text-ink/70">We are putting the finishing touches on our project gallery. In the meantime, explore our collections.</p>
          <Link href="/collections/kitchen-cabinets" className="mt-8 inline-block bg-ink px-8 py-4 text-sm tracking-widest text-white uppercase transition hover:bg-brass">
            View collections
          </Link>
        </div>
      </section>
    </>
  );
}