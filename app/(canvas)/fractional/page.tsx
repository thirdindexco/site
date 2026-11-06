import type { Metadata } from "next";
import Link from "next/link";
import { DocSection, Document, Questions, Rows } from "../../_components/Document";
import { CONTACT, LINK } from "../../_lib/canvas";

const pageTitle = "Embedded Engineering — THIRD INDEX";
const pageDescription =
  "Fractional frontend engineering embedded with your product team: senior frontend architecture, interface judgment, and production momentum, from $10k a month.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/fractional" },
  openGraph: {
    type: "website",
    url: "/fractional",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Embedded engineering by THIRD INDEX",
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

const ownership = [
  "Interaction, motion, and product polish",
  "Design system maintenance and evolution",
  "Brand sites and high-craft surfaces",
  "Handoff, component patterns, and review",
  "Hiring support when it moves in-house",
];

const steps: [string, string][] = [
  ["Intro call", "30 minutes."],
  ["Scoping call", "60 minutes."],
  ["Trial sprint", "Two weeks, paid. Confirms fit before a three-month contract."],
  ["Engagement", "Begins on the agreed cadence."],
];

const tiers: [string, string][] = [
  ["Two days a week", "From $10,000 a month"],
  ["Three days a week", "From $14,000 a month"],
  ["Custom", "Let's talk"],
];

const questions = [
  {
    q: "Can you do less than two days a week?",
    a: "Not at this tier. Lighter work is usually a project, priced by the week.",
  },
  {
    q: "Do you work with multiple embedded clients?",
    a: "Usually one or two at a time, maximum. Embedded needs real presence.",
  },
  {
    q: "Can it convert to full-time?",
    a: "Sometimes. If that becomes the right conversation, we have it.",
  },
  {
    q: "What stacks do you work in?",
    a: "Your stack first. Fastest in TypeScript, Next.js, Vercel, Tailwind, Motion, GSAP, WebGL, Sanity, Stripe, and headless Shopify.",
  },
];

// Embedded: senior design engineering by the month, as a document on the
// sheet. The route keeps its old name.
export default function EmbeddedPage() {
  return (
    <Document
      lead="Senior design engineering, embedded."
      support="Part of your team and your sprint cycles, for teams that need senior frontend architecture, interface judgment, and production momentum."
    >
      <DocSection id="terms" label="Terms">
        <p>From $10k a month · embedded in your team · three-month minimum · remote</p>
        <p className="flex gap-6 pt-[13px]">
          <a href={START_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
            Start a conversation
          </a>
          <Link href="/inquire" className={LINK}>
            Inquire
          </Link>
        </p>
      </DocSection>

      <DocSection id="shape" label="What embedded looks like">
        <p className="max-w-[60ch] text-pretty">
          For teams with real product velocity and a visible gap between design
          intent and shipped interface: rough interactions, drifting systems,
          inconsistent polish, product and marketing out of sync.
        </p>
        <p className="max-w-[60ch] pt-[13px] text-pretty">
          Embedded means working in your tools and on your cadence: repo, Slack,
          standups, reviews. Hands on the work, close to the team, clean exit
          at agreed milestones.
        </p>
      </DocSection>

      <DocSection id="own" label="What I typically own">
        <ul>
          {ownership.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </DocSection>

      <DocSection id="how" label="How it works">
        <Rows items={steps} />
      </DocSection>

      <DocSection id="pricing" label="Pricing">
        <Rows items={tiers} />
        <p className="max-w-[60ch] pt-[13px] opacity-50">
          Month to month after the three-month minimum. Invoiced monthly in
          advance.
        </p>
      </DocSection>

      <DocSection id="questions" label="Questions">
        <Questions items={questions} />
      </DocSection>

      <DocSection id="start" label="Start">
        <p>Bring software and design engineering closer.</p>
        <p className="flex flex-wrap gap-6 pt-[13px]">
          <a href={START_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
            Start a conversation
          </a>
          <a href={`mailto:${CONTACT.email}`} className={LINK}>
            Email directly
          </a>
          <Link href="/project" className={`${LINK} opacity-50 hover:opacity-100`}>
            Or a project, by the week
          </Link>
        </p>
      </DocSection>
    </Document>
  );
}
