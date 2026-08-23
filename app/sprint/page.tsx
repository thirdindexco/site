import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "Frontend Build — THIRD INDEX";
const pageDescription =
  "Senior frontend development by the week. A finished design turned into responsive, production-ready code — one week for a single surface, up to three for a full sprint.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/sprint" },
  openGraph: {
    type: "website",
    url: "/sprint",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Frontend build by THIRD INDEX",
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

const START_URL = "https://cal.com/thirdindex/sprint";
const SCOPE_URL = "https://cal.com/thirdindex/sprint";

const archetypes: { title: string; description: string }[] = [
  {
    title: "one week, one surface",
    description:
      "a finished design converted to responsive, production-ready frontend code. the smallest way to find out what working together is like.",
  },
  {
    title: "design execution",
    description:
      "your team's designs, built as designed — motion and interaction included. more surfaces, more weeks.",
  },
  {
    title: "brand site",
    description:
      "landing page, full site, or a rebuild of the one you have — built with motion and interaction craft.",
  },
  {
    title: "product polish",
    description:
      "one focused product area, or the priorities surfaced by a design-system foundation.",
  },
  {
    title: "product build",
    description: "new feature or product surface, designed and built end-to-end.",
  },
];

const schedule: [string, string][] = [
  [
    "week 0",
    "30-minute scoping call. scope, timeline, price, deposit.",
  ],
  [
    "weeks 1–3",
    "daily async updates. code in your repo from day one. one week or three, same cadence.",
  ],
  ["end", "walkthrough, final deliverables, final invoice."],
  [
    "after",
    "done, extended by another week, or continued as embedded work.",
  ],
];

const faqs: FaqItem[] = [
  {
    q: "what if scope changes mid-build?",
    a: "small changes are absorbed. larger changes get a written adjustment before work continues.",
  },
  {
    q: "do you work with our existing designers / engineers?",
    a: "yes. most builds happen in your repo, alongside your team. collaborators can join when needed.",
  },
  {
    q: "what tech stacks?",
    a: "fastest in typescript on next.js and vercel. react, motion, gsap, webgl, sanity, stripe, and headless shopify when needed. if you're on something unusual, ask.",
  },
  {
    q: "what about ongoing maintenance after?",
    a: "not included by default. for ongoing work, fractional is the better shape.",
  },
];

function StartBuildButton() {
  return (
    <a
      href={START_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap bg-accent px-4 py-2.5 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover"
    >
      start a build
      <ArrowRight
        aria-hidden
        className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
      />
    </a>
  );
}

export default function SprintPage() {
  return (
    <PageChrome>
        <section className={`pt-2 md:pt-6 lg:pt-4 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              build
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              ambitious designs, built properly.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              senior frontend development by the week. one week turns a
              finished design into a shipped surface; three is a full sprint.
              fixed scope, fixed price, production code.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              from $5k/week · 1–3 weeks · remote
            </p>
            <div className="pt-6 md:pt-8">
              <StartBuildButton />
            </div>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 lg:pt-32 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what a build looks like
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              for teams with designs ready and nobody free to build them:
            </p>
            <ul className="mt-8">
              {archetypes.map((a) => (
                <li
                  key={a.title}
                  className="-mx-3 px-3 py-5 transition-colors duration-200 hover:bg-foreground/[0.04]"
                >
                  <h2 className="font-sans text-base font-medium leading-tight md:text-lg">
                    {a.title}
                  </h2>
                  <p className="pt-2 font-sans text-sm leading-relaxed text-foreground/70">
                    {a.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="pt-8 font-sans text-sm leading-relaxed text-pretty md:text-base">
              includes scope confirmation, daily async progress, shipped code,
              walkthrough, and one revision pass.
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
              $5k for the first week and the same rate for each week after —
              most work lands between one and three. scope and price are
              agreed and fixed before anything starts.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              why by the week instead of hourly?
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              fixed scope, fixed fee, shipped code. less clock-watching, more
              momentum — and a single week is a cheap way to try it before
              committing to more.
            </p>
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
              start with a week.
            </p>
            <div className="flex flex-col items-start gap-4 pt-8 md:pt-10">
              <StartBuildButton />
              <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                or{" "}
                <a
                  href={SCOPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
                >
                  book a call
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <RelatedEngagements currentSlug="sprint" />
    </PageChrome>
  );
}
