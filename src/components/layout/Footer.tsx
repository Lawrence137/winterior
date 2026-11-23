import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-20 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
        <div>
          <Link href="/" className="relative block h-16 w-[192px]" aria-label="Winterior Design home">
            <Image
              src="/logo-transparent.png"
              alt=""
              fill
              sizes="192px"
              className="object-contain object-left"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm">Bespoke kitchens, wardrobes, vanities and TV units, designed and built with care.</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li><Link href="/projects" className="hover:text-brass">Projects</Link></li>
          <li><Link href="/configurator" className="hover:text-brass">Configurator</Link></li>
          <li><Link href="/about" className="hover:text-brass">About</Link></li>
          <li><Link href="/contact" className="hover:text-brass">Contact</Link></li>
        </ul>
        <p className="text-sm">Nairobi, Kenya<br />hello@winterior.design</p>
      </div>
      <p className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-6 text-xs">
        © {new Date().getFullYear()} Winterior Design. All rights reserved.
      </p>
    </footer>
  );
}