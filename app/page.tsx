import type { Metadata } from "next";
import { Fragment } from "react";
import { ContactMethods } from "./_components/ContactMethods";
import { InquiryCTA } from "./_components/InquiryCTA";
import { PageChrome } from "./_components/PageChrome";
import { ProjectIndex } from "./_components/ProjectIndex";
import { EngagementList } from "./_components/EngagementList";
import { FocusMark, type FocusMarkKey } from "./_components/FocusMark";
import { FLUID_GRID } from "./_lib/layout";
import { projects } from "./_lib/projects";

const pageTitle = "THIRD INDEX — Technology Studio";
const pageDescription =
  "Independent technology studio in Las Vegas — design, engineering, and frontend consulting for custom web applications, storefronts, and product interfaces. Work for Pentagram, Grey, Amazon, VICE, and Condé Nast.";

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
        alt: "THIRD INDEX — technology studio designing and building for the web",
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

const HERO_LEAD = "A technology studio for product teams and brands.";
const HERO_SUPPORT =
  "We design and build applications, storefronts, and product interfaces.";
// The proof, read before anyone scrolls: names only. The person and the
// way of working belong to the studio block further down, so the two
// don't say the same thing twice.
const HERO_PROOF =
  "Two decades of design and engineering for Pentagram, Grey, Amazon, VICE, and Condé Nast, and for the founders and labels in the index below.";
// Availability is a lead lever for a one-person practice. Keep it true.
const HERO_AVAILABILITY = "available · new projects from december 2026";

const FOCUS_AREAS: {
  mark: FocusMarkKey;
  title: string;
  description: string;
}[] = [
  {
    mark: "interfaces",
    title: "product interfaces",
    description:
      "application ui — architecture, states, accessibility, interaction.",
  },
  {
    mark: "systems",
    title: "design systems",
    description:
      "tokens, primitives, and documentation, in figma and in code.",
  },
  {
    mark: "websites",
    title: "websites & rebuilds",
    description:
      "marketing, editorial, and commerce — new or rebuilt, with architecture and navigation reworked rather than restyled.",
  },
  {
    mark: "cms",
    title: "cms systemization",
    description:
      "content modeling and platform choice, editing experience, and page-building components.",
  },
  {
    mark: "creative",
    title: "creative development",
    description: "webgl, canvas, scroll choreography, and motion.",
  },
  {
    mark: "architecture",
    title: "frontend architecture",
    description:
      "audits, app structure, rendering strategy, performance, and migration plans.",
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
          <p
            data-anim="hero"
            className="pb-5 font-mono text-3xs font-medium uppercase tracking-tight opacity-60 md:pb-6"
          >
            {HERO_AVAILABILITY}
          </p>
          <h1
            data-anim="hero"
            className="font-sans text-3xl font-bold leading-[0.95] tracking-[-0.04em] md:text-4xl xl:text-5xl"
          >
            {/* Lead and support flow as one paragraph at every width: at
                display size each sentence on its own row ran to four lines,
                and the tone change already marks the boundary. text-pretty
                can't balance this itself: every word is an atomic
                inline-block for the cascade. */}
            <span>{heroWords(HERO_LEAD)}</span>{" "}
            <span className="hero-support">{heroWords(HERO_SUPPORT)}</span>
          </h1>
        </div>

        <div data-anim="body" className="col-span-12">
          <p className="max-w-[70ch] pt-6 font-sans text-sm leading-relaxed text-pretty text-foreground/65 md:pt-8 md:text-base">
            {HERO_PROOF}
          </p>
          <InquiryCTA />
        </div>
      </section>

      {/* Selected work — full-bleed table, so it sits outside Section's
          label grid and carries its own heading. */}
      <ProjectIndex projects={projects} />

      {/* Focus areas — no label; the marks and titles say what it is.
          Full twelve columns, a tiled grid rather than rows, so it doesn't
          read as the same index as the engagements below. The 1px gap over
          the border colour draws the hairlines. */}
      <section
        id="focus"
        className={`scroll-mt-20 pt-20 md:pt-28 lg:scroll-mt-14 lg:pt-36 ${FLUID_GRID}`}
      >
        <ul
          data-anim="body"
          className="col-span-12 grid gap-px border border-[color:var(--panel-border)] bg-[color:var(--panel-border)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {FOCUS_AREAS.map((area) => (
            <li key={area.title} className="group/focus bg-background p-5">
              <FocusMark mark={area.mark} />
              <h3 className="pt-5 font-sans text-sm font-bold leading-tight tracking-tight">
                {area.title}
              </h3>
              <p className="max-w-[44ch] pt-2 font-sans text-sm leading-relaxed text-pretty text-foreground/65">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* The person. A one-person studio at this rate is bought as a person,
          so the page says who, in their own voice, before it says what it
          costs. */}
      <Section id="about" label="studio">
        <div
          data-anim="body"
          className="grid gap-6 border-t border-[color:var(--panel-border)] pt-5 md:grid-cols-3"
        >
          <img
            src="/portrait.webp"
            alt="Michael Ciccarelli"
            width={960}
            height={1200}
            loading="lazy"
            className="aspect-[4/5] w-full max-w-[240px] object-cover md:max-w-none"
          />
          <div className="md:col-span-2">
            <h3 className="font-sans text-sm font-bold leading-tight tracking-tight">
              Michael Ciccarelli
            </h3>
            <p className="max-w-[56ch] pt-3 font-sans text-sm leading-relaxed text-pretty text-foreground/65">
              third index is one person. i scope the project, do the work,
              and walk you through it, with no handoff to a junior team and
              no account manager in between. the background is agencies and
              product teams; the index above is the recent work, for labels,
              studios, and founders.
            </p>
            <p className="max-w-[56ch] pt-3 font-sans text-sm leading-relaxed text-pretty text-foreground/65">
              based in las vegas, working with teams anywhere.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 font-mono text-2xs font-medium tracking-tight">
              <a
                href="mailto:mc@thirdindex.co"
                className="opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
              >
                mc@thirdindex.co
              </a>
              <a
                href="https://relli.cc"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
              >
                relli.cc
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Engagement shapes — terms only; each row opens its own page. */}
      <Section id="engagements" label="engagements">
        <EngagementList />
      </Section>

      {/* Contact — every way in, as an index rather than a pitch. The
          availability line that used to open this is the hero eyebrow now.
          The id stays "inquiry" so nothing that ever linked here breaks. */}
      <Section id="inquiry" label="contact">
        <div data-anim="body">
          <ContactMethods />
        </div>
      </Section>
    </PageChrome>
  );
}
