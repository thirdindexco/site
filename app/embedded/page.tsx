import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "embedded design engineering — third index";
const pageDescription =
  "2–3 days a week as your fractional design engineer. For product teams that need senior frontend + design judgment consistently in the room. $10–14k/month.";

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
        alt: "third index — embedded design engineering",
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
  "the polish layer of your product — interaction, motion, micro-design decisions",
  "design system maintenance and evolution",
  "marketing site and high-craft surfaces",
  "the design-to-engineering pipeline (handoff, component patterns, review)",
  "hiring help when you're ready to bring this in-house",
];

const tiers: [string, string][] = [
  ["2 days/week", "from $10,000/month"],
  ["3 days/week", "from $14,000/month"],
  ["custom", "let's talk"],
];

const faqs: FaqItem[] = [
  {
    q: "can you do less than 2 days/week?",
    a: "not as embedded. if you need lighter-touch ongoing work, an audit or sprint is probably the right shape.",
  },
  {
    q: "do you work with multiple embedded clients?",
    a: "usually 1–2 at a time, maximum. embedded means actual presence and continuity; you're not getting that if i'm spread across five teams.",
  },
  {
    q: "can it convert to full-time?",
    a: "sometimes. embedded is often the path to \"we found the right person and now want them on the team.\" if that's the conversation, we have it.",
  },
  {
    q: "what stacks do you work in?",
    a: "embedded means fitting into your stack, not asking you to change it. by default i'm fastest in typescript on next.js and vercel, with tailwind, framer motion, gsap, and webgl for high-craft surfaces — and postgres, sanity, stripe, and headless shopify when the work goes full-stack. if it's modern frontend, i'm comfortable.",
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
              your fractional design engineer.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              2–3 days a week as your fractional design engineer. for product
              teams that need senior frontend + design judgment consistently
              in the room.
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
              you're shipping fast. you have a product. design and engineering
              both exist, but the handoff between them is where things get
              rough — polish slips, interactions feel inconsistent, the
              marketing site drifts from product, the design system isn't
              being maintained.
              you've considered hiring a senior design engineer full-time but
              you're not ready (or the right person isn't available).
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              embedded is the answer for that gap. i join your team for 2–3
              days a week, in your slack, your repo, your standups, your
              design reviews. i do the work, mentor your team on craft, own
              the design engineering layer of your product. for 3–12 months
              at a time, with a clean exit at any milestone.
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
              the trial sprint exists because embedded is a real commitment
              for both of us. better to confirm fit on a 2-week project before
              signing a 3-month contract.
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
              want senior design engineering in the room?
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
