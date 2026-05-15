import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "audit — third index";
const pageDescription =
  "A one-week product and frontend engineering audit spanning interface quality, design systems, implementation, performance, and architecture.";

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
        alt: "third index — audit",
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
  ["severity", "what it costs the product"],
  ["effort", "rough implementation weight"],
  ["fix", "concrete next step"],
  ["examples", "useful references"],
];

const schedule: [string, string][] = [
  [
    "day 1",
    "30-minute kickoff. access, context, sharpest concerns.",
  ],
  [
    "days 2–5",
    "product flows, design system, component architecture, codebase structure, marketing surface.",
  ],
  ["day 6", "findings and recommended next steps delivered."],
  [
    "day 7",
    "walkthrough call. q&a, priorities, next steps.",
  ],
];

const faqs: FaqItem[] = [
  {
    q: "how is this different from a design review or a UX audit?",
    a: "it looks at the full web surface where design meets code: interaction, motion, components, responsiveness, accessibility, performance, and implementation quality. not just screens in isolation.",
  },
  {
    q: "can it cover deeper frontend architecture?",
    a: "yes. the audit can stay close to surface quality, go deeper into component architecture and frontend systems, or balance both depending on what is slowing the product down.",
  },
  {
    q: "we already have designers. why would we need this?",
    a: "designers see intent. engineers see implementation. the audit looks at the shipped gap between them, and the system decisions underneath that gap.",
  },
  {
    q: "what if we just want you to fix the stuff yourself?",
    a: "after the audit, we can scope a sprint around the highest-priority fixes. no obligation.",
  },
  {
    q: "do you sign NDAs?",
    a: "yes.",
  },
  {
    q: "what tech stacks do you work with?",
    a: "mostly stack-agnostic. strongest in react, next.js, typescript, motion, gsap, and webgl. if you're on something unusual, ask.",
  },
  {
    q: "what if we're pre-launch?",
    a: "good time for it. same scope, same price.",
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
      buy the audit
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
              diagnose
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              find what's slowing your product down.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              a one-week review of product and frontend engineering:
              interface quality, design systems, component architecture,
              performance, and implementation risk.
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
                  book a call
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
              for shipped products that work, but feel a half-step off: rough
              interactions, drifting systems, weak states, mismatched marketing
              and product surfaces, or a frontend codebase that is starting to
              slow the team down.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              not a redesign, and not a rewrite plan by default. a diagnosis of
              what deserves attention next.
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
              prioritized findings, each tagged with:
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
              the final artifact depends on what the audit uncovers: a written
              report, a semi-functional prototype in the browser, low- or
              high-fidelity design directions, annotated flows, technical notes,
              or some mix of those.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              depending on the product, the audit can cover interaction states,
              motion, responsive behavior, component consistency, accessibility,
              hierarchy, forms, empty states, error states,
              marketing-to-product cohesion, code organization, component
              boundaries, data flow, and performance bottlenecks.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              delivered with a 60-minute walkthrough so the priorities, tradeoffs,
              and next steps are clear.
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
              included after delivery. implementation can be scoped separately;
              the audit stands alone.
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
              two decades in the browser. work for modern treasury, axoni,
              vice media, condé nast, amazon. long practice at the line
              between interface, systems, and implementation.
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
              start with the audit.
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
                  book a call
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
