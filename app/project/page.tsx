import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "Project — THIRD INDEX";
const pageDescription =
  "Senior design and engineering by the week — frontend audits, prototypes, frontend builds, and design systems. One to three weeks, fixed scope, fixed price.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/project" },
  openGraph: {
    type: "website",
    url: "/project",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Project work by THIRD INDEX",
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

// What a week-priced project usually turns out to be. Not separate offers —
// one rate, one shape — just the common answers to "what would we do?".
const archetypes: { title: string; length: string; description: string }[] = [
  {
    title: "frontend audit",
    length: "1 week",
    description:
      "a senior read on an existing frontend — architecture, performance, accessibility, system health — ending in a written, ranked plan. no code ships; the output is judgment, written down.",
  },
  {
    title: "prototype",
    length: "1–2 weeks",
    description:
      "a loose idea turned into a clickable, deployed prototype — real interface, core flows, and a url you can put in front of users and investors.",
  },
  {
    title: "frontend build",
    length: "1–3 weeks",
    description:
      "finished designs built properly — a single surface, a brand site, a product area, or a new feature end-to-end, motion and interaction included.",
  },
  {
    title: "design system",
    length: "2 weeks",
    description:
      "your designs turned into a coded, documented component library — tokens, components, a playground, and one real flow built on it.",
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
    q: "do we need designs first?",
    a: "depends on the work. prototypes and product builds include interface design; a design system starts from yours; an audit needs only the repo.",
  },
  {
    q: "what if scope changes mid-project?",
    a: "small changes are absorbed. larger changes get a written adjustment before work continues.",
  },
  {
    q: "do you work with our existing designers / engineers?",
    a: "yes. most projects happen in your repo, alongside your team. collaborators can join when needed.",
  },
  {
    q: "what tech stacks?",
    a: "fastest in typescript on next.js and vercel. react, motion, gsap, webgl, sanity, stripe, and headless shopify when needed. if you're on something unusual, ask.",
  },
  {
    q: "who owns the work?",
    a: "you do. code, deploys, and documents transfer at the end.",
  },
  {
    q: "what about ongoing work after?",
    a: "not included by default. for ongoing work, embedded is the better shape.",
  },
  {
    q: "do you sign ndas?",
    a: "yes.",
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
      start a project
      <ArrowRight
        aria-hidden
        className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
      />
    </a>
  );
}

export default function ProjectPage() {
  return (
    <PageChrome>
        <section className={`pt-2 md:pt-6 lg:pt-4 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              project
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              scoped work, priced by the week.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              one to three weeks of senior design and engineering, scoped to
              the problem — an audit, a prototype, a build, or a design
              system. fixed scope, fixed price, agreed before anything starts.
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
              what a project looks like
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              most projects are one of these — same rate, different length:
            </p>
            <ul className="mt-8">
              {archetypes.map((a) => (
                <li
                  key={a.title}
                  className="-mx-3 px-3 py-5 transition-colors duration-200 hover:bg-foreground/[0.04]"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-sans text-base font-medium leading-tight md:text-lg">
                      {a.title}
                    </h2>
                    <span className="shrink-0 font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
                      {a.length}
                    </span>
                  </div>
                  <p className="pt-2 font-sans text-sm leading-relaxed text-foreground/70">
                    {a.description}
                  </p>
                </li>
              ))}
            </ul>
            <p className="pt-8 font-sans text-sm leading-relaxed text-pretty md:text-base">
              every project includes scope confirmation, daily async
              progress, the deliverables in your hands, a walkthrough, and
              one revision pass.
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
              $5k a week, whatever the work — most projects land between one
              and three. scope and price are agreed and fixed before anything
              starts.
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
              why me
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              two decades designing and building for the web. work for modern
              treasury, vice, amazon, condé nast. the same person scopes the
              project, does the work, and walks you through it.
            </p>
            <Link
              href="/#work"
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

        <RelatedEngagements currentSlug="project" />
    </PageChrome>
  );
}
