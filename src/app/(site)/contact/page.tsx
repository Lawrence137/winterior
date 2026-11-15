import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's plan your space." />
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-20 md:grid-cols-2">
          <ContactForm />
          <div className="space-y-6 text-ink/70">
            <p className="font-display text-3xl text-ink">Visit or call</p>
            <p>Nairobi, Kenya</p>
            <p>hello@winterior.design</p>
            <p>Mon to Sat, 8am to 6pm</p>
          </div>
        </div>
      </section>
    </>
  );
}