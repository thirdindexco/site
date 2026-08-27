import type { Metadata } from "next";
import { Fragment } from "react";
import { InquiryCTA } from "./_components/InquiryCTA";
import { PageChrome } from "./_components/PageChrome";
import { ProjectIndex } from "./_components/ProjectIndex";
import { EngagementCards } from "./_components/EngagementCards";
import { StackMarquee } from "./_components/StackMarquee";
import { FLUID_GRID } from "./_lib/layout";
import { projects } from "./_lib/projects";

const pageTitle = "THIRD INDEX — Design Engineering Studio";
const pageDescription =
  "Design engineering studio in Las Vegas building web apps, product interfaces, design systems, and high-craft websites. Work for Modern Treasury, VICE, Amazon, and Condé Nast.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "THIRD INDEX — design engineering studio for web apps, product interfaces, and design systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.jpg"],
  },
};

const HERO_LEAD = "Interfaces, systems, and motion.";
const HERO_SUPPORT = "A studio for design engineering on the web.";

const FOCUS_AREAS: { title: string; description: string }[] = [
  {
    title: "product interfaces",
    description:
      "application ui — architecture, states, accessibility, interaction.",
  },
  {
    title: "design systems",
    description:
      "tokens, primitives, and documentation, in figma and in code.",
  },
  {
    title: "websites & rebuilds",
    description:
      "marketing, editorial, and commerce — new or rebuilt, with architecture and navigation reworked rather than restyled.",
  },
  {
    title: "cms systemization",
    description:
      "content models, editing experience, and page-building components.",
  },
  {
    title: "creative development",
    description: "webgl, canvas, scroll choreography, and motion.",
  },
  {
    title: "frontend architecture",
    description:
      "app structure, rendering strategy, performance, and migrations.",
  },
];

// Words are wrapped individually so AnimRoot can cascade the reveal. The
// space must live OUTSIDE the inline-block span — trailing whitespace at
// the end of an inline-block's line box is trimmed by CSS, which jams the
// words together if the space is inside. The padding/negative-margin pair
// is invisible to layout but grows each span's paint box: while the blur
// filter is animating, the browser rasterizes the span as its own layer,
// and without the extra room, glyph ink that overhangs the box (ligatures,
// tight tracking) is clipped until the filter clears.
function heroWords(text: string) {
  // The last two words share one span, joined by a non-breaking space, so
  // the final line can never wrap to a single orphaned word. (text-pretty
  // can't do this here: the inline-block spans are atomic boxes, outside
  // its rebalancing.)
  const words = text.split(" ");
  const chunks = [
    ...words.slice(0, -2),
    words.slice(-2).join("\u00a0"),
  ];
  return chunks.map((chunk, i) => (
    <Fragment key={i}>
      <span className="hero-word inline-block p-[0.15em] -m-[0.15em]">
        {chunk}
      </span>{" "}
    </Fragment>
  ));
}

// Index section: a mono label parked in the left columns with the content
// running beside it. Repeated down the page so every stop reads the same.
function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 pt-20 md:pt-28 lg:scroll-mt-14 lg:pt-36 ${FLUID_GRID}`}
    >
      <h2
        data-anim="body"
        className="col-span-12 font-mono text-2xs font-medium uppercase tracking-tight opacity-50 md:col-span-2"
      >
        {label}
      </h2>
      <div className="col-span-12 pt-5 md:col-span-9 md:col-start-4 md:pt-0">
        {children}
      </div>
    </section>
  );
}

// Single landing surface: the studio statement, the work index, what the
// studio does, the engagement shapes, and the way in. The engagement
// subroutes stay as their own documents; everything else lives here.
export default function HomePage() {
  return (
    <PageChrome>
      {/* Studio — a masthead and the way in, nothing else. The footer's
          standing description carries the plain-English gloss, so this
          doesn't explain itself. */}
      <section
        id="studio"
        className={`scroll-mt-20 lg:scroll-mt-14 ${FLUID_GRID}`}
      >
        {/* Full twelve columns: the h1's own max-w is what sets the measure,
            and a 10-column wrapper was narrower than that between roughly
            1024 and 1090, breaking the support line early. */}
        <div className="col-span-12">
          <h1
            data-anim="hero"
            className="max-w-[45ch] font-sans text-xl font-medium leading-[1.25] tracking-tight md:text-2xl lg:text-3xl"
          >
            {/* The masthead line holds its own row so the support can
                wrap underneath it. text-pretty can't rebalance this
                headline: every word is an atomic inline-block for the
                cascade. */}
            <span className="block">{heroWords(HERO_LEAD)}</span>
            <span className="text-foreground/45">
              {heroWords(HERO_SUPPORT)}
            </span>
          </h1>
        </div>

        <div data-anim="body" className="col-span-12">
          <InquiryCTA />
        </div>
      </section>

      {/* Selected work — full-bleed table, so it sits outside Section's
          label grid and carries its own heading. */}
      <ProjectIndex projects={projects} />

      {/* Focus areas */}
      <Section id="focus" label="focus">
        <ul
          data-anim="body"
          className="border-t border-[color:var(--panel-border)]"
        >
          {FOCUS_AREAS.map((area) => (
            <li
              key={area.title}
              className="grid gap-2 border-b border-[color:var(--panel-border)] py-5 md:grid-cols-3 md:gap-6"
            >
              <h3 className="font-sans text-sm font-semibold leading-tight tracking-tight">
                {area.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-pretty text-foreground/65 md:col-span-2">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Engagement shapes — full-bleed on the 12-col measure, so the
          cards sit on the same columns the grid overlay draws. */}
      <section
        id="engagements"
        className={`scroll-mt-20 pt-20 md:pt-28 lg:scroll-mt-14 lg:pt-36 ${FLUID_GRID}`}
      >
        <h2
          data-anim="body"
          className="col-span-12 font-mono text-2xs font-medium uppercase tracking-tight opacity-50"
        >
          engagements
        </h2>
        <EngagementCards />
      </section>

      {/* Stack — same full-width measure as the cards above. */}
      <section
        id="stack"
        className={`scroll-mt-20 pt-20 md:pt-28 lg:scroll-mt-14 lg:pt-36 ${FLUID_GRID}`}
      >
        <h2
          data-anim="body"
          className="col-span-12 font-mono text-2xs font-medium uppercase tracking-tight opacity-50"
        >
          stack
        </h2>
        <div className="col-span-12">
          <StackMarquee />
        </div>
      </section>

      {/* Way in */}
      <Section id="inquiry" label="inquiries">
        <div data-anim="body">
          <p className="max-w-[44ch] font-sans text-sm font-medium leading-[1.6] tracking-tight text-pretty md:text-base md:leading-[1.5]">
            open to new work — project-based or fractional.
          </p>
          <InquiryCTA />
        </div>
      </Section>
    </PageChrome>
  );
}
