import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Faq, type FaqItem } from "../_components/Faq";
import { InquiryCTA } from "../_components/InquiryCTA";
import { PageChrome } from "../_components/PageChrome";
import { RelatedEngagements } from "../_components/RelatedEngagements";
import { GRID } from "../_lib/layout";

const pageTitle = "Prototype Sprint — THIRD INDEX";
const pageDescription =
  "A one-to-two-week sprint that turns a loose idea into a clickable, deployed prototype — real interface, core flows, and a shareable URL for users and investors.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/prototype" },
  openGraph: {
    type: "website",
    url: "/prototype",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Prototype sprint by THIRD INDEX",
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
    "prototype",
    "a clickable prototype of the core flows — a real interface in the browser, not wireframes.",
  ],
  [
    "deployed",
    "live on a private or public url you can share the day it ships.",
  ],
  [
    "design",
    "interface design included — a sketch, notes, or a conversation is enough to start. existing designs welcome but not required.",
  ],
  [
    "data",
    "realistic stubbed data and states, so demos feel like the product.",
  ],
  [
    "handoff",
    "the code, the deploy, and a written note on what it would take to make it production-real.",
  ],
];

const schedule: [string, string][] = [
  [
    "kickoff",
    "30-minute call. the idea, the audience, the one thing the prototype must prove.",
  ],
  [
    "build",
    "daily async progress. flows take shape in the browser within the first few days.",
  ],
  [
    "end",
    "walkthrough, deployed url, code handoff, and a scope sketch for the production build.",
  ],
];

const faqs: FaqItem[] = [
  {
    q: "do i need designs first?",
    a: "no. the prototype sprint includes interface design — a sketch or a conversation is enough to start.",
  },
  {
    q: "can it become the real product?",
    a: "parts often carry — flows, interface decisions, some components. but the honest answer is that the production build is its own project, and the prototype is what tells you it's worth funding.",
  },
  {
    q: "can users log in? does it store data?",
    a: "usually stubbed. real accounts and persistence are production concerns; the prototype fakes them convincingly where the demo needs it.",
  },
  {
    q: "who owns it?",
    a: "you do. the code and the deploy transfer at the end.",
  },
  {
    q: "what stack?",
    a: "typescript, react, next.js, vercel. fast to build, easy to hand off.",
  },
  {
    q: "do you sign ndas?",
    a: "yes.",
  },
];

export default function PrototypePage() {
  return (
    <PageChrome>
        <section className={`pt-2 md:pt-6 lg:pt-4 ${GRID}`}>
          <div
            data-anim="hero"
            className="col-span-12"
          >
            <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
              validate
            </p>
            <h1 className="pt-3 font-sans text-2xl font-semibold leading-tight tracking-tight text-pretty md:text-3xl">
              a working prototype, before you fund the build.
            </h1>
            <p className="max-w-[60ch] pt-4 font-sans text-sm leading-relaxed text-foreground/65 md:pt-5 md:text-base">
              one to two weeks from loose idea to clickable prototype in the
              browser — real interface, core flows, deployed to a url you can
              put in front of users and investors.
            </p>
            <p className="pt-6 font-mono text-3xs font-medium uppercase tracking-tight md:pt-8">
              $6–10k · 1–2 weeks · remote
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
              for founders and teams with an idea that needs to be seen to be
              believed: pre-product, pre-funding, or pre-buy-in. you bring the
              idea and the domain knowledge; i bring the design and
              engineering.
            </p>
            <p className="pt-4 font-sans text-sm leading-relaxed text-pretty md:text-base">
              also for product teams that want to test a direction without
              committing a quarter to it.
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
              not production code — and priced accordingly. the prototype
              optimizes for speed of learning: some of it can carry into the
              real build, but plan for the production version to be built
              properly. when the idea is validated, that&apos;s a sprint.
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
              $6,000 for one focused week, $10,000 for two. fixed and agreed
              before work starts.
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
              treasury, vice, amazon, condé nast. a prototype only convinces
              if it feels real — that&apos;s the part i&apos;ve spent a career
              on.
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
              put the idea in front of people.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <RelatedEngagements currentSlug="prototype" />
    </PageChrome>
  );
}
