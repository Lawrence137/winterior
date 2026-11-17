import PageHeader from "@/components/ui/PageHeader";
import Configurator from "@/components/three/Configurator";

export default function ConfiguratorPage() {
  return (
    <>
      <PageHeader eyebrow="Configurator" title="Design your space in 3D." />
      <section className="px-6 py-16">
        <Configurator />
      </section>
    </>
  );
}