const habits = [
  {
    title: "Household, family, kinship",
    text: "Keep household, family, and kinship distinct.",
  },
  {
    title: "Named sources",
    text: "Prefer named sources and reference periods over national stories.",
  },
  {
    title: "Label demonstration",
    text: "Label demonstration material so a visitor can tell a teaching chart from an official estimate.",
  },
];

const interests = [
  "Family structure and household composition",
  "Marriage and fertility",
  "Gender and women’s employment",
  "Intergenerational relationships",
  "Child wellbeing",
  "Measurement and survey methods",
];

export function HomeIntro() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-24">
          <h2 className="text-center font-serif text-3xl text-forest-deep md:text-4xl">
            Personal introduction
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-forest" />
          <p className="mt-10 text-[17px] leading-relaxed text-ink-soft">
            Prateek Singh is a PhD Research Scholar at the Indian Institute of Technology
            (IIT) Mandi, working in the field of Family Demography. His research explores
            changing family structures, household composition, marriage, and living
            arrangements, with a particular interest in understanding how family dynamics
            shape women&apos;s health and well-being in India.
          </p>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
            He holds an M.Sc. in Biostatistics and Demography from the International
            Institute for Population Sciences (IIPS), Mumbai, and a B.Sc. in Physics,
            Mathematics, and Statistics from Udai Pratap Autonomous College, Varanasi.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-[#f8f8f8]">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <h2 className="text-center font-serif text-3xl text-forest-deep">How the work is organised</h2>
          <div className="mx-auto mt-4 h-px w-16 bg-forest" />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {habits.map((item) => (
              <article key={item.title}>
                <h3 className="font-serif text-xl text-forest-deep">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
          <h2 className="text-center font-serif text-3xl text-forest-deep">Research interests</h2>
          <div className="mx-auto mt-4 h-px w-16 bg-forest" />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-4 sm:grid-cols-2">
            {interests.map((item) => (
              <li key={item} className="border-b border-line py-3 text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
