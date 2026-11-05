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
// The proof runs on from the support line inside the same block. The person
// and the way of working belong to the studio block further down, so the
// two don't say the same thing twice.
const HERO_PROOF =
  "Two decades working with independent founders and global names including Pentagram, Amazon, VICE, and Condé Nast.";
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
      className={`scroll-mt-20 pt-28 md:pt-40 lg:scroll-mt-14 lg:pt-56 ${FLUID_GRID}`}
    >
      <h2
        data-anim="body"
        className="col-span-12 font-sans text-sm opacity-50 md:col-span-2"
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
      {/* One block at text size, well down the viewport, in the content
          column every section below uses. The statement is in ink, the
          support and the proof run on in the second tone, and availability
          sits as a label directly over the buttons. The hierarchy is
          whitespace, not scale. */}
      <section
        id="studio"
        className={`scroll-mt-20 pt-20 md:pt-36 lg:scroll-mt-14 lg:pt-48 ${FLUID_GRID}`}
      >
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <h1
            data-anim="hero"
            className="max-w-[50ch] font-sans text-sm font-bold leading-tight tracking-tight"
          >
            <span>{heroWords(HERO_LEAD)}</span>{" "}
            <span className="hero-support">
              {heroWords(HERO_SUPPORT)} {heroWords(HERO_PROOF)}
            </span>
          </h1>
          <div data-anim="body" className="pt-10 md:pt-12">
            <p className="font-sans text-sm opacity-50">
              {HERO_AVAILABILITY}
            </p>
            <InquiryCTA className="pt-4" />
          </div>
        </div>
      </section>

      {/* Selected work — full-bleed table, so it sits outside Section's
          label grid and carries its own heading. */}
      <ProjectIndex projects={projects} />

      {/* Focus areas — open columns, no boxes: the mark, a bold title, and
          a line of description, three to a row across the content columns. */}
      <Section id="focus" label="focus">
        <ul
          data-anim="body"
          className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FOCUS_AREAS.map((area) => (
            <li key={area.title} className="group/focus">
              <FocusMark mark={area.mark} />
              <h3 className="pt-4 font-sans text-sm font-bold leading-tight tracking-tight">
                {area.title}
              </h3>
              <p className="max-w-[32ch] pt-1 font-sans text-sm leading-tight text-pretty text-foreground/65">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* The person. A one-person studio at this rate is bought as a person,
          so the page says who, in their own voice, before it says what it
          costs. */}
      <Section id="about" label="studio">
        <div data-anim="body" className="grid gap-5 md:grid-cols-9">
          <img
            src="/portrait.webp"
            alt="Michael Ciccarelli"
            width={960}
            height={1200}
            loading="lazy"
            className="aspect-[4/5] w-full max-w-[200px] object-cover md:col-span-2 md:max-w-none"
          />
          <div className="md:col-span-4 md:col-start-4">
            <h3 className="font-sans text-sm font-bold leading-tight tracking-tight">
              Michael Ciccarelli
            </h3>
            <p className="max-w-[40ch] pt-3 font-sans text-sm leading-tight text-pretty text-foreground/65">
              third index is one person. i scope the project, do the work,
              and walk you through it, with no handoff to a junior team and
              no account manager in between. the background is agencies and
              product teams; the index above is the recent work, for labels,
              studios, and founders.
            </p>
            <p className="max-w-[40ch] pt-3 font-sans text-sm leading-tight text-pretty text-foreground/65">
              based in las vegas, working with teams anywhere.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-5 font-sans text-sm">
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
