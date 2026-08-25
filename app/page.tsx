import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { InquiryCTA } from "./_components/InquiryCTA";
import { PageChrome } from "./_components/PageChrome";
import { ProjectMarquee } from "./_components/ProjectMarquee";
import { ENGAGEMENTS } from "./_lib/engagements";
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

const HERO_LEAD = "Frontend development for ambitious design.";
const HERO_SUPPORT =
  "Interfaces, systems, and motion\u2014with the full-stack depth to carry ideas through production.";

const FOCUS_AREAS: { title: string; description: string }[] = [
  {
    title: "product interfaces",
    description:
      "application ui built to design quality — component architecture, states, accessibility, and the interaction detail that makes it feel finished.",
  },
  {
    title: "design systems",
    description:
      "tokens, primitives, and documentation that keep shipped product consistent with design intent — in figma and in code.",
  },
  {
    title: "websites & rebuilds",
    description:
      "marketing, editorial, and commerce surfaces — built new or rebuilt, with architecture and navigation reworked rather than restyled. fast and findable because they're built that way.",
  },
  {
    title: "cms systemization",
    description:
      "content models, editing experience, and page-building components wired up so your team can ship pages without calling us.",
  },
  {
    title: "creative development",
    description:
      "webgl, canvas, scroll choreography, and motion moments that earn their place instead of decorating the page.",
  },
  {
    title: "frontend architecture",
    description:
      "app structure, rendering strategy, performance budgets, and migration paths for codebases that need a senior pass.",
  },
];

const STACK: { group: string; items: string }[] = [
  { group: "frontend", items: "typescript · react · next.js · tailwind" },
  { group: "motion", items: "gsap · motion · three.js / webgl" },
  { group: "backend & data", items: "node.js · postgresql · supabase" },
  {
    group: "commerce & content",
    items: "shopify (headless) · sanity · stripe",
  },
  { group: "tooling", items: "figma · claude code · cursor · vercel" },
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
        <div className="col-span-12 md:col-span-10">
          <h1
            data-anim="hero"
            className="max-w-[38ch] font-sans text-xl font-medium leading-[1.25] tracking-tight md:text-2xl lg:text-3xl"
          >
            {/* The masthead line holds its own row. Left inline it fits
                the measure with ~3px to spare, which is just enough for
                "Twenty" to ride up and strand it from "years" — and
                text-pretty can't rebalance it, since every word here is an
                atomic inline-block for the cascade. */}
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

      {/* Selected work — a full-bleed moving band, so it sits outside
          Section's label grid and carries its own heading. */}
      <ProjectMarquee projects={projects} />

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

      {/* Engagement shapes — the only links that leave this page. */}
      <Section id="engagements" label="engagements">
        <div data-anim="body">
          <p className="max-w-[56ch] font-sans text-sm font-medium leading-relaxed text-pretty">
            senior frontend development for teams whose builds need to match
            the ambition of their designs.
          </p>
          <p className="max-w-[56ch] pt-3 font-sans text-sm leading-relaxed text-pretty text-foreground/65">
            backed by full-stack capability, product judgment, motion, systems
            thinking, and the design sense to close gaps without supervision.
          </p>
        </div>

        <ul
          data-anim="body"
          className="mt-6 border-t border-[color:var(--panel-border)]"
        >
          {ENGAGEMENTS.map((engagement) => (
            <li
              key={engagement.slug}
              className="border-b border-[color:var(--panel-border)]"
            >
              <Link
                href={engagement.href}
                className="group/tier block py-5 outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)]"
              >
                <div className="grid gap-2 md:grid-cols-3 md:gap-6">
                  <div>
                    <h3 className="font-sans text-sm font-semibold leading-tight tracking-tight">
                      {engagement.title}
                    </h3>
                    <p className="pt-1.5 font-mono text-2xs font-medium uppercase tracking-tight opacity-50">
                      {engagement.meta}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="max-w-[52ch] font-sans text-sm leading-relaxed text-pretty text-foreground/65">
                      {engagement.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 pt-3 font-mono text-2xs font-medium uppercase tracking-tight opacity-50 transition-opacity duration-200 group-hover/tier:opacity-100 group-focus-visible/tier:opacity-100">
                      learn more
                      <ArrowRight
                        aria-hidden
                        className="h-3 w-3 transition-transform duration-200 group-hover/tier:translate-x-0.5 group-focus-visible/tier:translate-x-0.5"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Stack */}
      <Section id="stack" label="stack">
        <dl
          data-anim="body"
          className="border-t border-[color:var(--panel-border)]"
        >
          {STACK.map((row) => (
            <div
              key={row.group}
              className="grid gap-1 border-b border-[color:var(--panel-border)] py-3.5 md:grid-cols-3 md:gap-6"
            >
              <dt className="font-mono text-2xs font-medium uppercase tracking-tight opacity-50">
                {row.group}
              </dt>
              <dd className="font-sans text-sm leading-relaxed md:col-span-2">
                {row.items}
              </dd>
            </div>
          ))}
        </dl>
        <p
          data-anim="body"
          className="max-w-[52ch] pt-5 font-sans text-sm leading-relaxed text-foreground/65"
        >
          stack is flexible — these are the defaults, not the boundary. if
          you&apos;re on something unusual, ask.
        </p>
      </Section>

      {/* Way in */}
      <Section id="inquiry" label="inquiries">
        <div data-anim="body">
          <p className="max-w-[44ch] font-sans text-sm font-medium leading-[1.6] tracking-tight text-pretty md:text-base md:leading-[1.5]">
            have a project in mind? taking on project-based and fractional
            engagements — single build weeks, fixed-scope sprints, and
            embedded work.
          </p>
          <InquiryCTA />
        </div>
      </Section>
    </PageChrome>
  );
}
