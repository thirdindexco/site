import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { InquiryCTA } from "../_components/InquiryCTA";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "Frontend Audit — THIRD INDEX";
const pageDescription =
  "A one-week frontend audit and consulting engagement — a senior read on architecture, performance, accessibility, and design system health, with a written, ranked plan your team can act on.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/frontend-audit" },
  openGraph: {
    type: "website",
    url: "/frontend-audit",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Frontend audit by THIRD INDEX",
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
    "architecture",
    "app structure, rendering strategy, data flow, and where the codebase is fighting the product.",
  ],
  [
    "performance",
    "core web vitals, bundle weight, and what's actually slow — measured, not guessed.",
  ],
  [
    "accessibility",
    "a pass against wcag 2.2 aa on the flows that matter, with the fixes named.",
  ],
  [
    "system health",
    "components, tokens, and how far figma and code have drifted apart.",
  ],
  [
    "the plan",
    "a written report and a ranked roadmap — what to fix, in what order, and roughly what each costs.",
  ],
];

const schedule: [string, string][] = [
  [
    "kickoff",
    "45-minute call. the product, the team, and the question you most need answered.",
  ],
  [
    "review",
    "repo and production access. i read the code, profile the app, and walk the key flows.",
  ],
  [
    "end",
    "written report, ranked roadmap, and a walkthrough call with your team.",
  ],
];

const faqs: FaqItem[] = [
  {
    q: "what do you need from us?",
    a: "read access to the repo, a production or staging url, and an hour of someone's time who knows where the bodies are buried.",
  },
  {
    q: "does it turn into a build?",
    a: "often, but it doesn't have to. the plan is written so your own team can run it.",
  },
  {
    q: "can you audit a site we don't own the code for?",
    a: "partly. performance and accessibility can be reviewed from the outside; architecture needs the repo.",
  },
  {
    q: "what stacks?",
    a: "anything react-shaped first — next.js, remix, vite, headless commerce, sanity and other headless cms. ask if yours is different.",
  },
  {
    q: "do you sign ndas?",
    a: "yes.",
  },
];

export default function AuditPage() {
  return (
    <PageChrome>
        <section className={`pt-2 md:pt-6 lg:pt-4 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              diagnose
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              a senior read on your frontend, before you commit to the work.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              one week inside your codebase and product — architecture,
              performance, accessibility, and system health — ending in a
              written, ranked plan your team can act on.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              $5k · 1 week · remote
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
              for product teams whose frontend has slowed down — releases
              feel risky, the design system has drifted, performance keeps
              slipping — and who want an outside answer to what to fix first.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              also for founders and leads weighing a rebuild, a migration, or a
              hire, who want a second opinion before spending the quarter.
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
              not a build, and not a deck. no code changes ship during the
              audit — the output is judgment, written down. when the plan
              calls for hands, that&apos;s a frontend build, a design system,
              or fractional.
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
              $5,000 for one week. fixed and agreed before work starts.
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
              treasury, vice, amazon, condé nast. the audit comes from
              someone who ships this kind of code, not someone who only
              reviews it.
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
              know what to fix first.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <RelatedEngagements currentSlug="audit" />
    </PageChrome>
  );
}
