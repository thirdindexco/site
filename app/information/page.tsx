import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InquiryCTA } from "../_components/InquiryCTA";
import { PageChrome } from "../_components/PageChrome";
import { ENGAGEMENTS } from "../_lib/engagements";
import { FLUID_GRID } from "../_lib/layout";

const pageTitle = "Design Engineering Studio — THIRD INDEX";
const pageDescription =
  "Explore THIRD INDEX services for custom web apps, product interfaces, design systems, creative development, and senior frontend architecture.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/information" },
  openGraph: {
    type: "website",
    url: "/information",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "THIRD INDEX design engineering services",
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

const FOCUS_AREAS: { title: string; description: string }[] = [
  {
    title: "product interfaces",
    description:
      "application ui built to design quality — component architecture, states, accessibility, and the interaction detail that makes it feel finished.",
  },
  {
    title: "design systems",
    description:
      "tokens, primitives, and documentation that keep shipped product consistent with design intent — in figma and in code.",
  },
  {
    title: "websites & campaigns",
    description:
      "marketing, editorial, and commerce surfaces with the craft turned up — fast, accessible, and easy to author against.",
  },
  {
    title: "creative development",
    description:
      "webgl, canvas, scroll choreography, and motion moments that earn their place instead of decorating the page.",
  },
  {
    title: "frontend architecture",
    description:
      "app structure, rendering strategy, performance budgets, and migration paths for codebases that need a senior pass.",
  },
];

const STACK: { group: string; items: string }[] = [
  { group: "frontend", items: "typescript · react · next.js · tailwind" },
  { group: "motion", items: "gsap · motion · three.js / webgl" },
  { group: "backend & data", items: "node.js · postgresql · supabase" },
  {
    group: "commerce & content",
    items: "shopify (headless) · sanity · stripe",
  },
  { group: "tooling", items: "figma · claude code · cursor · vercel" },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      data-anim="body"
      className="col-span-12 font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3 md:col-start-1"
    >
      {children}
    </div>
  );
}

export default function InformationPage() {
  return (
    <PageChrome>
        {/* Inquiries */}
        <section className={`pt-12 md:pt-20 lg:pt-24 ${FLUID_GRID}`}>
          <SectionLabel>inquiries</SectionLabel>
          <div
            data-anim="body"
            className="col-span-12 pt-4 md:col-span-6 md:col-start-5 md:pt-0"
          >
            <h1 className="max-w-[40ch] font-sans text-lg font-medium leading-tight tracking-tight md:text-xl">
              open to new work — full projects, fractional engagements, and
              partnerships. principal-led, collaborators as needed.
            </h1>
            <InquiryCTA />
          </div>
        </section>

        {/* Focus areas */}
        <section className={`pt-16 md:pt-24 lg:pt-32 ${FLUID_GRID}`}>
          <SectionLabel>focus areas</SectionLabel>
          <ul
            data-anim="body"
            className="col-span-12 border-y border-[color:var(--panel-border)] pt-0 md:col-span-8 md:col-start-5"
          >
            {FOCUS_AREAS.map((area, i) => (
              <li
                key={area.title}
                className={`grid gap-6 py-5 md:grid-cols-8 md:py-6 ${
                  i > 0 ? "border-t border-[color:var(--panel-border)]" : ""
                }`}
              >
                <h3 className="font-sans text-base font-semibold leading-tight tracking-tight md:col-span-3">
                  {area.title}
                </h3>
                <p className="-mt-4 font-sans text-sm leading-relaxed text-pretty text-foreground/70 md:col-span-5 md:col-start-4 md:mt-0">
                  {area.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section className={`pt-16 md:pt-24 lg:pt-32 ${FLUID_GRID}`}>
          <SectionLabel>stack</SectionLabel>
          <div
            data-anim="body"
            className="col-span-12 md:col-span-8 md:col-start-5"
          >
            <dl className="border-y border-[color:var(--panel-border)]">
              {STACK.map((row, i) => (
                <div
                  key={row.group}
                  className={`grid gap-6 py-4 md:grid-cols-8 ${
                    i > 0 ? "border-t border-[color:var(--panel-border)]" : ""
                  }`}
                >
                  <dt className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60 md:col-span-3">
                    {row.group}
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed md:col-span-5 md:col-start-4">
                    {row.items}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="max-w-[52ch] pt-6 font-sans text-sm leading-relaxed text-foreground/70">
              stack is flexible — these are the defaults, not the boundary. if
              you&apos;re on something unusual, ask.
            </p>
          </div>
        </section>

        {/* Selected clients */}
        <section className={`pt-16 md:pt-24 lg:pt-32 ${FLUID_GRID}`}>
          <SectionLabel>selected clients</SectionLabel>
          <p
            data-anim="body"
            className="col-span-12 font-sans text-sm leading-relaxed md:col-span-8 md:col-start-5"
          >
            modern treasury · vice · amazon · condé nast · pentagram
          </p>
        </section>

        {/* Engagement tiers as text rows */}
        <section className={`pt-16 md:pt-24 lg:pt-32 ${FLUID_GRID}`}>
          <div data-anim="body" className="col-span-12 md:col-span-3 md:col-start-1">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              ways to work together
            </div>
            <p className="pt-3 font-sans text-sm leading-relaxed text-foreground/65">
              diagnose. build. stay close.
            </p>
          </div>

          <ul
            data-anim="body"
            className="col-span-12 border-y border-[color:var(--panel-border)] pt-0 md:col-span-8 md:col-start-5"
          >
            {ENGAGEMENTS.map((engagement, i) => (
              <li
                key={engagement.slug}
                className={
                  i > 0 ? "border-t border-[color:var(--panel-border)]" : ""
                }
              >
                <Link
                  href={engagement.href}
                  className="group/tier block py-6 outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] md:py-7"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-sans text-xl font-semibold leading-tight tracking-tight">
                      {engagement.title}
                    </h3>
                    <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                      {engagement.meta}
                    </p>
                  </div>
                  <p className="max-w-[52ch] pt-3 font-sans text-sm leading-relaxed text-pretty text-foreground/70">
                    {engagement.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 pt-5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 transition-opacity duration-200 group-hover/tier:opacity-100 group-focus-visible/tier:opacity-100">
                    learn more
                    <ArrowRight
                      aria-hidden
                      className="h-3 w-3 transition-transform duration-200 group-hover/tier:translate-x-0.5 group-focus-visible/tier:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
    </PageChrome>
  );
}
