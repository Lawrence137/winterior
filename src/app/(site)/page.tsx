import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <Process />
      <CTA />
    </>
  );
}