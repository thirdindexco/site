import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "embedded — third index";
const pageDescription =
  "Fractional software and design engineering for teams that need a senior frontend developer, design engineer, interface judgment, and production momentum.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/embedded" },
  openGraph: {
    type: "website",
    url: "/embedded",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "third index — embedded",
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

const START_URL = "https://cal.com/thirdindex/embedded";
const EMAIL = "info@thirdindex.co";

const ownership: string[] = [
  "interaction, motion, and product polish",
  "design system maintenance and evolution",
  "brand sites and high-craft surfaces",
  "handoff, component patterns, and review",
  "hiring support when it moves in-house",
];

const tiers: [string, string][] = [
  ["2 days/week", "from $10,000/month"],
  ["3 days/week", "from $14,000/month"],
  ["custom", "let's talk"],
];

const faqs: FaqItem[] = [
  {
    q: "can you do less than 2 days/week?",
    a: "not as embedded. lighter work is usually an audit or sprint.",
  },
  {
    q: "do you work with multiple embedded clients?",
    a: "usually 1–2 at a time, maximum. embedded needs real presence.",
  },
  {
    q: "can it convert to full-time?",
    a: "sometimes. if that becomes the right conversation, we have it.",
  },
  {
    q: "what stacks do you work in?",
    a: "your stack first. fastest in typescript, next.js, vercel, tailwind, motion, gsap, webgl, sanity, stripe, and headless shopify.",
  },
];

function StartConversationButton() {
  return (
    <a
      href={START_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap bg-accent px-4 py-2.5 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover"
    >
      start a conversation
      <ArrowRight
        aria-hidden
        className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
      />
    </a>
  );
}

export default function EmbeddedPage() {
  return (
    <PageChrome>
        <section className={`pt-12 md:pt-24 lg:pt-32 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              stay close
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              senior software and design engineering, embedded.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              2–3 days a week for teams that need senior frontend architecture,
              interface judgment, and production momentum.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              $10–14k/month · 3-month minimum · remote, in your tools
            </p>
            <div className="pt-6 md:pt-8">
              <StartConversationButton />
            </div>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 lg:pt-32 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what embedded looks like
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              for teams with real product velocity and a visible gap between
              design intent and shipped interface: rough interactions, drifting
              systems, inconsistent polish, product and marketing out of sync.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              embedded means 2–3 days a week in your tools: repo, slack,
              standups, reviews. hands on the work, close to the team, clean
              exit at agreed milestones.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              what i typically own
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <ul className="border-y border-[color:var(--panel-border)]">
              {ownership.map((item, i) => (
                <li
                  key={item}
                  className={`py-3 font-sans text-sm leading-relaxed ${
                    i > 0
                      ? "border-t border-[color:var(--panel-border)]"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              how it works
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <p className="font-sans text-sm leading-relaxed text-pretty md:text-base">
              30-min intro call → 60-min scoping call → 2-week paid trial
              sprint → embedded engagement begins.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty text-foreground/70 md:text-base">
              the trial sprint confirms fit before a 3-month contract.
            </p>
          </div>
        </section>

        <section className={`pt-20 md:pt-28 ${GRID}`}>
          <div className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              pricing
            </div>
          </div>
          <div className="col-span-12 pt-6 md:col-span-9 md:col-start-4 md:pt-0">
            <dl className="border-y border-[color:var(--panel-border)]">
              {tiers.map(([tier, price], i) => (
                <div
                  key={tier}
                  className={`grid grid-cols-12 gap-4 py-4 ${
                    i > 0
                      ? "border-t border-[color:var(--panel-border)]"
                      : ""
                  }`}
                >
                  <dt className="col-span-6 self-baseline font-sans text-sm font-medium leading-tight md:col-span-4">
                    {tier}
                  </dt>
                  <dd className="col-span-6 self-baseline text-right font-mono text-3xs font-medium uppercase tracking-tight opacity-80 md:col-span-8">
                    {price}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="pt-4 font-sans text-sm leading-relaxed text-foreground/70">
              month-to-month after the 3-month minimum. invoiced monthly in
              advance.
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
              bring software and design engineering closer.
            </p>
            <div className="flex flex-col items-start gap-4 pt-8 md:pt-10">
              <StartConversationButton />
              <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                or{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
                >
                  email directly
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <RelatedEngagements currentSlug="embedded" />
    </PageChrome>
  );
}
