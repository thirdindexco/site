import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "design engineering audit — third index";
const pageDescription =
  "A one-week deep review of your product's interaction, implementation, and frontend system. $3,500. A prioritized list of what's slowing the product down, what to fix first, and exactly how to fix it.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/audit" },
  openGraph: {
    type: "website",
    url: "/audit",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "third index — design engineering audit",
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

// Stripe payment link for the productized $3,500 audit. Self-serve checkout
// is the primary path; the cal intro below is for hesitant buyers.
const BUY_URL = "https://book.stripe.com/fZubJ18kB0SaaZpfOA9fW02";
const INTRO_URL = "https://cal.com/thirdindex/audit";

const deliverables: [string, string][] = [
  ["severity", "what it's actually costing you"],
  ["effort", "rough implementation time"],
  [
    "fix",
    "concrete recommendation, often with code or component-level detail",
  ],
  ["examples", "references to products doing it well"],
];

const schedule: [string, string][] = [
  [
    "day 1",
    "kickoff call (30 min). you share access, context, and what's bothering you most.",
  ],
  [
    "days 2–5",
    "i go deep. product, marketing site, key user flows, design system, component library if you have one.",
  ],
  ["day 6", "written report delivered."],
  [
    "day 7",
    "walkthrough call. q&a, prioritization, next steps if you want them.",
  ],
];

const faqs: FaqItem[] = [
  {
    q: "how is this different from a design review or a UX audit?",
    a: "most design reviews focus on visual design or user flows in isolation. this looks at the entire surface where design meets code — the interaction layer, the motion layer, the component layer, the polish layer. it's written by someone who'll be in your codebase if you hire them to implement.",
  },
  {
    q: "we already have designers. why would we need this?",
    a: "your designers see what they designed. your engineers see what they built. an outside design engineer sees what your users see — and notices the gap between intent and shipped reality. that gap is usually where the polish lives.",
  },
  {
    q: "what if we just want you to fix the stuff yourself?",
    a: "after the audit, we can scope a 2–4 week sprint to implement the highest-priority fixes. typical sprint pricing is $8–15k depending on scope. but you're not committed to anything past the audit.",
  },
  {
    q: "do you sign NDAs?",
    a: "yes.",
  },
  {
    q: "what tech stacks do you work with?",
    a: "react, next.js, typescript, framer motion, gsap, three.js / webgl. comfortable with most modern frontend stacks. ai-fluent across the day-to-day — claude code, codex, cursor, and agents in the loop where they earn it. if you're on something exotic, ask.",
  },
  {
    q: "what if we're pre-launch?",
    a: "even better. an audit before launch catches things that are expensive to fix after. same scope, same price.",
  },
];

function BuyButton({
  variant = "primary",
}: {
  variant?: "primary" | "compact";
}) {
  const base =
    "group/cta inline-flex items-center gap-1.5 bg-accent font-mono font-medium uppercase tracking-tight text-white outline-none whitespace-nowrap transition-colors duration-200 hover:bg-accent-hover";
  const sizing =
    variant === "primary" ? "px-4 py-2.5 text-3xs" : "px-3 py-2 text-3xs";
  return (
    <a
      href={BUY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sizing}`}
    >
      buy now
      <ArrowRight
        aria-hidden
        className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
      />
    </a>
  );
}

export default function AuditPage() {
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
              design engineering audit
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              a one-week deep review of your product's interaction,
              implementation, and frontend system. you get a prioritized list
              of what's slowing the product down, what to fix first, and
              exactly how to fix it.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              $3,500 · one week · remote
            </p>
            <div className="pt-6 md:pt-8">
              <BuyButton />
              <p className="pt-4 font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                questions first?{" "}
                <a
                  href={INTRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
                >
                  book a 15-min intro call
                </a>
                .
              </p>
            </div>
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
              your product works. it ships. customers use it. but something
              feels off — the polish isn't there, the interactions feel rough,
              the marketing site doesn't match the product, the design system
              is drifting, or your team can't articulate why the whole thing
              looks a half-step behind the competition.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              you don't need a redesign. you need someone to tell you,
              specifically, what's wrong and what to do about it.
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
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              a written report covering a thorough set of prioritized
              findings across your product experience, each one tagged with:
            </p>
            <dl className="mt-8 border-y border-[color:var(--panel-border)]">
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
              issues span the surface where design meets engineering:
              interaction states, motion, responsive behavior, component
              consistency, accessibility, performance perception, copy and
              microcopy, information hierarchy, form design, empty and error
              states, marketing-to-product cohesion.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              delivered as a structured doc you can hand directly to your team.
              plus a 60-minute walkthrough call to discuss priorities and
              answer questions.
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
              {schedule.map(([day, desc], i) => (
                <div
                  key={day}
                  className={`grid grid-cols-12 gap-4 py-4 ${
                    i > 0
                      ? "border-t border-[color:var(--panel-border)]"
                      : ""
                  }`}
                >
                  <dt className="col-span-12 self-baseline font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3">
                    {day}
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
              $3,500, paid up front. one round of clarifying questions
              included after delivery. if you want help implementing the fixes,
              we can talk about a follow-up sprint or retainer — but there's no
              obligation, and the audit stands alone.
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
              twenty years shipping software for the web. design engineering
              work for modern treasury, axoni, vice media, condé nast, amazon.
              i sit between design and engineering and have for a long time. i
              notice things your team has stopped seeing because they're too
              close to it.
            </p>
            <Link
              href="/#selected-work"
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
              ready to see what your product is hiding from you?
            </p>
            <div className="flex flex-col items-start gap-4 pt-8 md:pt-10">
              <BuyButton />
              <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                questions first?{" "}
                <a
                  href={INTRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
                >
                  book a 15-min intro call
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <RelatedEngagements currentSlug="audit" />
    </PageChrome>
  );
}
