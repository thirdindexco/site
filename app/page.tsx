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

const HERO_HEADLINE = "third index";
const HERO_SUPPORT = "is an independent design engineering studio.";

export default function HomePage() {
  return (
    <>
      <PageChrome>
        <section className={`pt-12 md:pt-24 lg:pt-32 ${GRID}`}>
          <p
            data-anim="hero"
            className="col-span-12 md:col-start-2 md:col-span-10 max-w-[60ch] font-sans text-2xl font-semibold tracking-tighter leading-tight text-pretty md:text-4xl"
          >
            {HERO_HEADLINE}{" "}
            <span className="font-light text-foreground/50">
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
              studio practice of{" "}
              <a
                href="https://ciccarel.li"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
              >
                michael ciccarelli
              </a>
              . two decades building interfaces, systems, and motion for the
              web. client work alongside self-initiated products.
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
              open to new projects. product work, brand & marketing sites,
              commerce stacks, editorial builds. principal-led, collaborators as
              needed.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <ProjectShowcase projects={projects.slice(0, 10)} />

        <section className={`pt-16 md:pt-24 lg:pt-32 ${GRID}`}>
          <div className="relative col-span-12 overflow-hidden border-y border-[color:var(--panel-border)] py-8 md:py-10 lg:py-12">
            <div aria-hidden className="dither-field absolute inset-0" />
            <div className="relative z-10">
              <div>
                <div className="font-mono text-3xs font-medium uppercase tracking-tight">
                  ways to work together
                </div>
                <p className="max-w-[32ch] pt-8 font-sans text-sm leading-relaxed text-foreground/65 md:text-base">
                  diagnose. build. stay close.
                </p>
              </div>

              <div className="grid gap-4 pt-12 md:grid-cols-3 md:gap-5 lg:gap-6 lg:pt-16">
                {ENGAGEMENTS.map((engagement) => (
                  <Link
                    key={engagement.slug}
                    href={engagement.href}
                    className="group/card flex min-h-64 flex-col border border-[color:var(--panel-border)] bg-[color:var(--background)] p-5 outline-none transition-colors duration-200 hover:border-[color:color-mix(in_srgb,var(--foreground)_20%,transparent)] focus-visible:border-[color:color-mix(in_srgb,var(--foreground)_20%,transparent)] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] md:min-h-72 lg:p-6"
                  >
                    <h3 className="font-sans text-xl font-semibold leading-tight tracking-tight">
                      {engagement.title}
                    </h3>
                    <p className="pt-2 font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                      {engagement.meta}
                    </p>
                    <p className="pt-6 font-sans text-xs leading-relaxed text-pretty">
                      {engagement.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 self-start pt-8 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
                      learn more
                      <ArrowRight
                        aria-hidden
                        className="h-3 w-3 transition-transform duration-200 group-hover/card:translate-x-0.5 group-focus-visible/card:translate-x-0.5"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WorkInquiryCTA />
      </PageChrome>
      <InquiryDrawer />
    </>
  );
}
