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

const pageTitle = "THIRD INDEX — Software Engineering Studio";
const pageDescription =
  "Independent software engineering studio in Las Vegas specializing in custom web development — websites, web applications, product interfaces, and digital platforms. Work for Modern Treasury, VICE, Amazon, and Condé Nast.";

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
        alt: "THIRD INDEX — software engineering studio specializing in custom web development",
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

const HERO_LEAD = "An independent engineering studio for the web.";
const HERO_SUPPORT =
  "Building websites, interfaces, and the systems behind them.";

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
      "content models, editing experience, and page-building components.",
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
            className="max-w-[45ch] font-sans text-2xl font-medium leading-[1.1] tracking-tighter md:text-3xl lg:text-4xl"
          >
            {/* From md the masthead line holds its own row so the support
                wraps underneath it at the sentence boundary. Below md the
                lead doesn't fit one line, and forcing the break stranded
                "the web." as an 81px orphan — so there both spans flow as
                one paragraph and the browser balances three lines instead.
                text-pretty can't do this itself: every word is an atomic
                inline-block for the cascade. */}
            <span className="md:block">{heroWords(HERO_LEAD)}</span>{" "}
            <span className="hero-support md:block">
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
              <h3 className="pt-5 font-sans text-sm font-semibold leading-tight tracking-tight">
                {area.title}
              </h3>
              <p className="max-w-[44ch] pt-2 font-sans text-sm leading-relaxed text-pretty text-foreground/65">
                {area.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

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
