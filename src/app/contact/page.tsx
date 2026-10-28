import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/home/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Research collaboration, article submissions, and academic enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Write with a question, a collaboration, or a draft."
        lede="Use the form for research collaboration, article submissions, and academic enquiries. Fields are validated. A simple timing check reduces casual spam."
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1fr_0.8fr] md:px-8">
        <ContactForm />
        <aside className="rounded-2xl border border-line bg-cream p-6">
          <h2 className="font-serif text-2xl text-forest-deep">Direct</h2>
          <p className="mt-3 text-sm text-ink-soft">
            {site.email}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            Guest authors should say so in the topic field and include a short abstract.
            Do not send unpublished microdata or credentials through this form.
          </p>
        </aside>
      </div>
    </>
  );
}
