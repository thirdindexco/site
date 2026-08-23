import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { InquiryCTA } from "../_components/InquiryCTA";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "Design System Sprint — THIRD INDEX";
const pageDescription =
  "A two-week design engineering sprint that turns your designs into a coded, documented component system — tokens, reusable components, and a browsable playground.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/systems" },
  openGraph: {
    type: "website",
    url: "/systems",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Design system sprint by THIRD INDEX",
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

const deliverables: [string, string][] = [
  [
    "tokens",
    "color, type, spacing, and motion extracted from your files and coded — wired to figma variables where the file supports it.",
  ],
  [
    "components",
    "a reusable library in your stack, rebuilt faithful to the design: variants, states, accessibility.",
  ],
  [
    "playground",
    "a storybook-style environment where every component and state is browsable in the browser.",
  ],
  [
    "docs",
    "live usage documentation next to the components — props, variants, do and don't — not a dead pdf.",
  ],
  [
    "proof",
    "one real flow assembled from the new system, pixel-faithful to your design.",
  ],
];

const schedule: [string, string][] = [
  [
    "kickoff",
    "30-minute call. design files, repo access, the flow that matters most.",
  ],
  [
    "week 1",
    "audit of the design files and shipped components. tokens coded, foundations and first components in the playground.",
  ],
  [
    "week 2",
    "component library completed, documentation written, proof flow assembled on the new system.",
  ],
  ["end", "walkthrough and handoff. the system lives in your repo."],
];

const faqs: FaqItem[] = [
  {
    q: "do you design anything?",
    a: "no — that's the point. you keep design authority; i translate it into a system. where a file leaves a state undefined, i'll flag it and propose options, but the decisions stay with your team.",
  },
  {
    q: "we're a studio — can this be white-label?",
    a: "yes. white-label or credited, either works. ndas are fine.",
  },
  {
    q: "our frontend was mostly ai-generated. is that a fit?",
    a: "very. ai-assisted codebases ship fast and drift fast — duplicated patterns, one-off components, missing states. the sprint replaces that drift with a system.",
  },
  {
    q: "what if our design files are messy?",
    a: "common, and survivable. week 1 includes flagging gaps and inconsistencies in the file itself — your team resolves them or i propose defaults, and the system encodes the decision.",
  },
  {
    q: "what stack?",
    a: "react, typescript, and tailwind by default, with storybook or ladle for the playground. tokens can sync to figma variables. if you're on something else, ask.",
  },
  {
    q: "can you keep going after the two weeks?",
    a: "yes. more flows and surfaces can be scoped as a sprint, and ongoing evolution as fractional work.",
  },
];

export default function SystemsPage() {
  return (
    <PageChrome>
        <section className={`pt-2 md:pt-6 lg:pt-4 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              systematize
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              your designs, turned into a working system.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              a two-week design engineering sprint: your components, rebuilt
              as a coded, documented, reusable library — faithful to the
              design and ready for production.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              from $10k · two weeks · remote
            </p>
            <InquiryCTA />
          </div>
        </section>

        <section className={`pt-20 md:pt-28 lg:pt-32 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              who this is for
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              for designers, studios, and design-led teams whose files are
              ahead of their codebase: a mature design language with no
              engineering system behind it, shipped components drifting from
              the file, or an ai-assisted frontend that multiplied
              inconsistencies faster than anyone could standardize them.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              this is a technical partnership. the design stays yours — i
              build the system that makes it real.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what you get
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <dl className="border-y border-[color:var(--panel-border)]">
              {deliverables.map(([term, def], i) => (
                <div
                  key={term}
                  className={`grid grid-cols-12 gap-4 py-3 ${
                    i > 0
                      ? "border-t border-[color:var(--panel-border)]"
                      : ""
                  }`}
                >
                  <dt className="col-span-4 self-baseline font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3">
                    {term}
                  </dt>
                  <dd className="col-span-8 font-sans text-sm leading-relaxed md:col-span-9">
                    {def}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="pt-8 font-sans text-sm leading-relaxed text-pretty md:text-base">
              delivered in your repo with a handoff walkthrough, so your team
              — or your client&apos;s team — can build with it the day after.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what this isn&apos;t
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              no speculative rebrand. no redesigning your product. no abstract
              component library disconnected from what&apos;s shipped. if it
              isn&apos;t designed yet, this isn&apos;t the package — that&apos;s
              a prototype or a sprint.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              how it works
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <dl className="border-y border-[color:var(--panel-border)]">
              {schedule.map(([phase, desc], i) => (
                <div
                  key={phase}
                  className={`grid grid-cols-12 gap-4 py-4 ${
                    i > 0
                      ? "border-t border-[color:var(--panel-border)]"
                      : ""
                  }`}
                >
                  <dt className="col-span-12 self-baseline font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3">
                    {phase}
                  </dt>
                  <dd className="col-span-12 font-sans text-sm leading-relaxed md:col-span-9">
                    {desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what it costs
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              from $10,000, fixed, paid up front. two weeks, one project at a
              time. continuation — more flows, more components, ongoing
              evolution — can be scoped as a sprint or fractional work.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              why me
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              two decades building for the web at the line between design and
              engineering. work for modern treasury, vice, amazon, condé
              nast, pentagram. i&apos;ve spent a career on the technical side
              of a designer&apos;s file.
            </p>
            <Link
              href="/projects"
              className="group/work mt-6 inline-flex items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity hover:opacity-100"
            >
              see selected work
              <ArrowRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/work:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              faq
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <Faq items={faqs} />
          </div>
        </section>

        <section className={`pt-20 md:pt-28 lg:pt-32 ${GRID}`}>
          <div className="col-span-12">
            <p className="font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              start with the system.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <RelatedEngagements currentSlug="systems" />
    </PageChrome>
  );
}
