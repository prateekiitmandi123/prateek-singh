import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Academic biography of Prateek Singh, PhD research scholar in family demography at IIT Mandi.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Biography"
        lede="PhD research scholar at IIT Mandi, working in family demography."
      />
      <div className="mx-auto max-w-3xl px-4 py-14 md:px-8">
        <article className="prose-article">
          <p>
            Prateek Singh is a PhD Research Scholar at the Indian Institute of Technology
            (IIT) Mandi, working in the field of <strong>Family Demography</strong>. His
            research explores changing family structures, household composition, marriage, and
            living arrangements, with a particular interest in understanding how family
            dynamics shape women&apos;s health and well-being in India.
          </p>
          <p>
            He holds an{" "}
            <strong>
              M.Sc. in Biostatistics and Demography from the International Institute for
              Population Sciences (IIPS), Mumbai
            </strong>
            , and a{" "}
            <strong>
              B.Sc. in Physics, Mathematics, and Statistics from Udai Pratap Autonomous
              College, Varanasi
            </strong>
            . His interdisciplinary background combines statistical methods, demographic
            analysis, and social research to examine population and family-related issues.
          </p>
          <p>
            His approach to research is guided by three principles: distinguishing between
            households, families, and kinship; grounding interpretations in clearly identified
            data sources and reference periods; and presenting findings transparently, with a
            clear distinction between illustrative material and official estimates.
          </p>

          <h2>Education</h2>
          <p>
            <strong>Ph.D. Research Scholar</strong>
            <br />
            Indian Institute of Technology (IIT) Mandi
            <br />
            Research area: Family Demography
          </p>
          <p>
            <strong>M.Sc. in Biostatistics and Demography</strong>
            <br />
            International Institute for Population Sciences (IIPS), Mumbai
          </p>
          <p>
            <strong>B.Sc. in Physics, Mathematics, and Statistics</strong>
            <br />
            Udai Pratap Autonomous College, Varanasi
          </p>

          <h2>How I Work</h2>
          <p>
            Family demography involves the quantitative study of family structures, household
            composition, marriage, fertility, living arrangements, and the care and work
            embedded within these relationships. My training in biostatistics provides a
            foundation for analysing population data, interpreting rates, accounting for
            uncertainty, and understanding complex survey data. My interest in social research
            complements this quantitative perspective by placing statistical findings within
            their broader social context.
          </p>
          <p>
            I believe that understanding families requires more than classifying households
            into categories. Behind every household roster are relationships, experiences, and
            life transitions that shape people&apos;s opportunities, responsibilities, and
            well-being. My research seeks to bring these dimensions together to develop a
            deeper understanding of family change and its implications for society.
          </p>
          <p>
            Collaboration, article submissions, and academic enquiries go through the{" "}
            <Link href="/contact">contact form</Link> or {site.email}. A downloadable CV
            outline is on the <Link href="/cv">CV page</Link>.
          </p>
        </article>
      </div>
    </>
  );
}
