import { getSlots } from "@/lib/queries";
import CTAParallax from "./CTAParallax";

export default async function CTA() {
  const slots = await getSlots();
  return <CTAParallax image={slots.cta} />;
}