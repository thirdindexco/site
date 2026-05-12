"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { InquiryCTA } from "./_components/InquiryCTA";
import { PageChrome } from "./_components/PageChrome";
import { ProjectShowcase } from "./_components/ProjectShowcase";
import { WorkInquiryCTA } from "./_components/WorkInquiryCTA";
import { ENGAGEMENTS } from "./_lib/engagements";
import { GRID } from "./_lib/layout";
import { projects } from "./_lib/projects";

// Drawer bundle stays out of the initial payload — only loads on the client.
// Single instance for the whole page; CTAs flip the inquiryOpenAtom.
const InquiryDrawer = dynamic(
  () => import("./_components/InquiryDrawer").then((m) => m.InquiryDrawer),
  { ssr: false },
);

const HERO_HEADLINE = "third index is a design engineering studio.";
const HERO_SUPPORT =
  "building the surface and the system underneath — product interfaces, frontend craft, and focused user experiences.";

// Hardcoded so Tailwind 4's JIT picks up the strings; index matches the
// order of ENGAGEMENTS.
const ENGAGEMENT_COL_STARTS = [
  "lg:col-start-1",
  "lg:col-start-5",
  "lg:col-start-9",
];

export default function HomePage() {
  return (
    <>
      <PageChrome>
        <section className={`pt-12 md:pt-24 lg:pt-32 ${GRID}`}>
          <p
            data-anim="hero"
            className="col-span-12 md:col-start-2 md:col-span-10 max-w-[60ch] font-sans text-2xl font-semibold tracking-tighter leading-tight text-pretty md:text-3xl"
          >
            {HERO_HEADLINE}{" "}
            <span className="font-normal text-foreground/60">
              {HERO_SUPPORT}
            </span>
          </p>
        </section>

        <section className={`pt-12 md:pt-20 lg:pt-24 ${GRID}`}>
          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-2"
          >
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              about
            </div>
            <p className="pt-8 font-sans text-sm leading-relaxed text-pretty">
              principal-led studio practice by{" "}
              <a
                href="https://ciccarel.li"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
              >
                michael ciccarelli
              </a>{" "}
              — frontend engineering, interaction design, and product systems
              across fintech, media, web3, and commerce.
            </p>
          </div>

          <div
            data-anim="body"
            className="col-span-12 pt-12 md:col-span-4 md:col-start-8 md:pt-0"
          >
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              inquiries
            </div>
            <p className="pt-8 font-sans text-sm leading-relaxed text-pretty">
              open to new work. product interfaces, design systems, marketing
              sites, and new product builds. project-based, retainer, or
              embedded engagements.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <ProjectShowcase projects={projects.slice(0, 10)} />

        <section className={`pt-16 md:pt-24 lg:pt-32 ${GRID}`}>
          <div data-anim="body" className="col-span-12">
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              ways to work together
            </div>
            <p className="max-w-[50ch] pt-8 font-sans text-sm leading-relaxed text-foreground/65 md:text-base">
              structured ways to diagnose, build, or stay close to the product.
            </p>
          </div>

          {ENGAGEMENTS.map((engagement, i) => (
            <article
              key={engagement.slug}
              data-anim="body"
              className={`col-span-12 lg:col-span-4 lg:pt-16 ${
                ENGAGEMENT_COL_STARTS[i]
              } ${i === 0 ? "pt-12" : "pt-8 lg:pt-16"}`}
            >
              <div className="flex h-full flex-col border-t border-[color:var(--panel-border)] pt-5">
                <h3 className="font-sans text-xl font-semibold leading-tight tracking-tight">
                  {engagement.title}
                </h3>
                <p className="pt-2 font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                  {engagement.meta}
                </p>
                <p className="pt-6 font-sans text-sm leading-relaxed text-pretty">
                  {engagement.description}
                </p>
                <Link
                  href={engagement.href}
                  className="group/learn mt-6 inline-flex items-center gap-1.5 self-start font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity hover:opacity-100"
                >
                  learn more
                  <ArrowRight
                    aria-hidden
                    className="h-3 w-3 transition-transform duration-200 group-hover/learn:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <WorkInquiryCTA />
      </PageChrome>
      <InquiryDrawer />
    </>
  );
}
