import type { Metadata } from "next";
import Link from "next/link";
import { DocSection, Document, Questions, Rows } from "../../_components/Document";
import { COMMON_PROJECTS, CONTACT, LINK } from "../../_lib/canvas";

const pageTitle = "Project — THIRD INDEX";
const pageDescription =
  "Senior design and engineering by the week: storefronts, editorial sites, fintech and payments interfaces, dapp interfaces, AI workflow dashboards, and product features. One to three weeks, fixed scope, fixed price, from $5k a week.";

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
      { url: "/og.jpg", width: 1200, height: 600, alt: "Project work by THIRD INDEX" },
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

const schedule: [string, string][] = [
  ["Week 0", "A 30-minute scoping call: scope, timeline, price, deposit."],
  [
    "Weeks 1–3",
    "Daily async updates. Code in your repo from day one. One week or three, same cadence.",
  ],
  ["End", "Walkthrough, final deliverables, final invoice."],
  ["After", "Done, extended by another week, or continued as embedded work."],
];

const questions = [
  {
    q: "Do we need designs first?",
    a: "Depends on the work. Most projects include interface design; if you have designs or a design system, the build starts from them.",
  },
  {
    q: "What if scope changes mid-project?",
    a: "Small changes are absorbed. Larger changes get a written adjustment before work continues.",
  },
  {
    q: "Do you work with our existing designers and engineers?",
    a: "Yes. Most projects happen in your repo, alongside your team. Collaborators can join when needed.",
  },
  {
    q: "What tech stacks?",
    a: "Fastest in TypeScript on Next.js and Vercel. React, Motion, GSAP, WebGL, Sanity, Stripe, and headless Shopify when needed. If you are on something unusual, ask.",
  },
  {
    q: "Who owns the work?",
    a: "You do. Code, deploys, and documents transfer at the end.",
  },
  {
    q: "What about ongoing work after?",
    a: "Not included by default. For ongoing work, embedded is the better shape.",
  },
  { q: "Do you sign NDAs?", a: "Yes." },
];

// Project: scoped work priced by the week, as a document on the sheet.
export default function ProjectPage() {
  return (
    <Document
      lead="Scoped work, priced by the week."
      support="One to three weeks of senior design and engineering, scoped to the problem: a storefront, an editorial site, a payments flow, a dapp interface, or a product feature. Fixed scope, fixed price, agreed before anything starts."
    >
      <DocSection id="terms" label="Terms">
        <p>From $5k a week · one to three weeks · remote</p>
        <p className="flex gap-6 pt-[13px]">
          <a href={START_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
            Start a project
          </a>
          <Link href="/inquire" className={LINK}>
            Inquire
          </Link>
        </p>
      </DocSection>

      <DocSection id="shape" label="What a project looks like">
        <p className="max-w-[60ch] text-pretty">
          Most projects are one of these, same rate, different length.
        </p>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-[26px] pt-[26px] md:grid-cols-3">
          {COMMON_PROJECTS.map((c) => (
            <li key={c.title}>
              <h3>
                {c.title}
                <span className="text-muted-foreground"> {c.length}</span>
              </h3>
              <p className="text-pretty text-muted-foreground">{c.description}</p>
            </li>
          ))}
        </ul>
        <p className="max-w-[60ch] pt-[26px] text-pretty">
          Every project includes scope confirmation, daily async progress, the
          deliverables in your hands, a walkthrough, and one revision pass.
        </p>
      </DocSection>

      <DocSection id="how" label="How it works">
        <Rows items={schedule} />
      </DocSection>

      <DocSection id="cost" label="What it costs">
        <p className="max-w-[60ch] text-pretty">
          $5k a week, whatever the work. Most projects land between one and
          three. Scope and price are agreed and fixed before anything starts.
        </p>
        <p className="max-w-[60ch] pt-[13px] text-pretty text-muted-foreground">
          Why by the week instead of hourly: fixed scope, fixed fee, shipped
          code. Less clock-watching, more momentum, and a single week is a
          cheap way to try it before committing to more.
        </p>
      </DocSection>

      <DocSection id="who" label="Who does the work">
        <p className="max-w-[60ch] text-pretty">
          Two decades designing and building for the web, for Pentagram, Grey,
          Amazon, VICE, and Condé Nast. The same person scopes the project,
          does the work, and walks you through it.
        </p>
        <p className="pt-[13px]">
          <Link href="/select" className={LINK}>
            See selected work
          </Link>
        </p>
      </DocSection>

      <DocSection id="questions" label="Questions">
        <Questions items={questions} />
      </DocSection>

      <DocSection id="start" label="Start">
        <p>Start with a week.</p>
        <p className="flex flex-wrap gap-6 pt-[13px]">
          <a href={START_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
            Start a project
          </a>
          <a href={CONTACT.call} target="_blank" rel="noopener noreferrer" className={LINK}>
            Book a call
          </a>
          <Link href="/fractional" className={`${LINK} text-muted-foreground`}>
            Or embedded, by the month
          </Link>
        </p>
      </DocSection>
    </Document>
  );
}
