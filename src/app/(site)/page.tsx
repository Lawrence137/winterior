import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import CategoryGrid from "@/components/home/CategoryGrid";
import Craft from "@/components/home/Craft";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";
import FeaturedProjects from "@/components/home/FeaturedProjects";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <CategoryGrid />
      <FeaturedProjects />
      <Craft />
      <Process />
      <CTA />
    </>
  );
}