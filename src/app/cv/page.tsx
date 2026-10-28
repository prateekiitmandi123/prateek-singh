import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Curriculum vitae",
  description: "CV outline for Prateek Singh, PhD research scholar in family demography at IIT Mandi.",
};

export default function CVPage() {
  return (
    <>
      <PageHero
        kicker="CV"
        title="Curriculum vitae"
        lede="Print this page for a one-page outline."
      />
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <div className="rounded-2xl border border-line bg-paper p-8 print:border-0">
          <header className="border-b border-line pb-6">
            <h2 className="font-serif text-4xl text-forest-deep">Prateek Singh</h2>
            <p className="mt-2 text-ink-soft">
              Research scholar · Family demography · Biostatistics
            </p>
            <p className="text-sm text-muted">
              Indian Institute of Technology Mandi · prateekiitmandi@gmail.com
            </p>
          </header>
          <section className="mt-8">
            <h3 className="text-xs tracking-[0.18em] text-gold uppercase">Affiliation</h3>
            <p className="mt-2">PhD Research Scholar, Indian Institute of Technology (IIT) Mandi. Research area: Family Demography.</p>
          </section>
          <section className="mt-8">
            <h3 className="text-xs tracking-[0.18em] text-gold uppercase">Research interests</h3>
            <p className="mt-2">
              Family structure; household composition; marriage and fertility; gender and
              women’s employment; intergenerational relationships; child wellbeing; survey
              measurement.
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xs tracking-[0.18em] text-gold uppercase">Education</h3>
            <p className="mt-2">
              Ph.D. Research Scholar, Indian Institute of Technology (IIT) Mandi.
              <br />
              M.Sc. in Biostatistics and Demography, International Institute for Population Sciences (IIPS), Mumbai.
              <br />
              B.Sc. in Physics, Mathematics, and Statistics, Udai Pratap Autonomous College, Varanasi.
            </p>
          </section>
          <section className="mt-8">
            <h3 className="text-xs tracking-[0.18em] text-gold uppercase">Publications</h3>
            <p className="mt-2 text-muted">None listed.</p>
          </section>
          <section className="mt-8">
            <h3 className="text-xs tracking-[0.18em] text-gold uppercase">Selected writing on this site</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Articles will be listed here after they are written and published. The
              Articles section on this site is ready and currently empty.
            </p>
          </section>
        </div>
        <p className="mt-6 text-sm text-muted">Use your browser’s print dialog to save a PDF.</p>
      </article>
    </>
  );
}
