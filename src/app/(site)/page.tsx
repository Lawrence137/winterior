import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Craft from "@/components/home/Craft";
import Process from "@/components/home/Process";
import CTA from "@/components/home/CTA";
import { getSlots } from "@/lib/queries";

export default async function HomePage() {
  const slots = await getSlots();
  return (
    <>
      <Hero image={slots.hero} />
      <Stats />
      <CategoryGrid />
      <FeaturedProjects />
      <Craft />
      <Process />
      <CTA />
    </>
  );
}