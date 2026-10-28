import Image from "next/image";
import { site } from "@/data/site";

export function HomeHero() {
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#5d6b5a]">
      <Image
        src="/hero-portrait.jpg"
        alt="Prateek Singh standing in a misty mountain forest, IIT Mandi"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_20%]"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-12 text-center md:pb-16">
        <h1 className="mx-auto max-w-4xl text-lg tracking-[0.18em] text-white uppercase md:text-2xl lg:text-3xl">
          I am {site.name}, research scholar at IIT Mandi
        </h1>
        <p className="mt-3 text-[11px] tracking-[0.28em] text-white/85 uppercase md:text-sm">
          {site.tagline}
        </p>
      </div>
    </section>
  );
}
