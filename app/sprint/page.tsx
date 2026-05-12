import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "design engineering sprint — third index";
const pageDescription =
  "Two to three weeks to ship the work that's been stuck on your roadmap. Fixed scope, fixed price, in production by the end. From $8,000.";

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
        alt: "third index — design engineering sprint",
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
    title: "marketing site rebuild",
    description:
      "landing page or full marketing site, design-engineered with motion and interaction craft.",
  },
  {
    title: "product experience polish",
    description:
      "implementation of the highest-priority issues from an audit, or a focused redesign of one product area.",
  },
  {
    title: "design system or component library buildout",
    description:
      "initial system, documented patterns, react component library handed off to your team.",
  },
  {
    title: "new product build",
    description: "new product area or feature, designed and built end-to-end.",
  },
];

const schedule: [string, string][] = [
  [
    "week 0",
    "30-min scoping call. we agree on scope, deliverables, timeline, and price. half deposit invoiced.",
  ],
  [
    "weeks 1–3",
    "work happens. daily async updates, mid-sprint check-in call, code in your repo from day one.",
  ],
  ["end of sprint", "walkthrough call, final deliverables, final invoice."],
  [
    "after",
    "sprint stands alone. if it works and you want continuity, we can talk about embedded.",
  ],
];

const faqs: FaqItem[] = [
  {
    q: "what if scope changes mid-sprint?",
    a: "small changes are absorbed. larger scope changes get a brief written addendum with adjusted price and timeline before we proceed. no surprises.",
  },
  {
    q: "do you work with our existing designers / engineers?",
    a: "yes — most sprints do. i typically work alongside your team, in your repo, in your slack. for sprints that need a designer i can bring one in.",
  },
  {
    q: "what tech stacks?",
    a: "typescript end-to-end on next.js and vercel. react, framer motion, gsap, three.js / webgl for the high-craft surfaces. postgres, sanity, stripe, and headless shopify in the stack when the job calls for it. ai-fluent across the day-to-day — claude code, codex, cursor, and agents in the loop where they earn it. comfortable with most modern frontend stacks — if you're on something exotic, ask.",
  },
  {
    q: "what about ongoing maintenance after?",
    a: "not included by default. for ongoing work, embedded is the better shape.",
  },
];

function StartSprintButton() {
  return (
    <a
      href={START_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap bg-accent px-4 py-2.5 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover"
    >
      start a sprint
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
        <section className={`pt-12 md:pt-24 lg:pt-32 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              productized service
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              design engineering sprint
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              two to three weeks to ship the work that's been stuck on your
              roadmap. fixed scope, fixed price, in production by the end.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              from $8,000 · 2–3 weeks · remote
            </p>
            <div className="pt-6 md:pt-8">
              <StartSprintButton />
            </div>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 lg:pt-32 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what a sprint looks like
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              a sprint is for teams who know what needs to ship and need a
              senior pair of hands to ship it. typical sprints:
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
              every sprint includes scope confirmation up front, daily async
              progress, shipped code in your repo, and a walkthrough at the
              end. one round of revisions included.
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
              why a sprint instead of hourly?
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              hourly billing punishes speed and rewards padding. fixed-price
              sprints align our incentives: i'm motivated to ship efficiently
              and well, and you know exactly what you're paying before we
              start.
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
              ready to ship the work that's been stuck?
            </p>
            <div className="flex flex-col items-start gap-4 pt-8 md:pt-10">
              <StartSprintButton />
              <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                or{" "}
                <a
                  href={SCOPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
                >
                  book a 15-min scoping call
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
