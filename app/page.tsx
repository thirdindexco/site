"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type MouseEvent } from "react";
import { Settings2, X } from "lucide-react";
import { AnimRoot } from "./_components/AnimRoot";
import { GridDebugger } from "./_components/GridDebugger";
import { InquiryCTA } from "./_components/InquiryCTA";
import { MonogramMark } from "./_components/MonogramMark";
import { ProjectShowcase } from "./_components/ProjectShowcase";
import { SettingsPanel } from "./_components/SettingsPanel";
import { SiteFooter } from "./_components/SiteFooter";
import { ThemeShortcuts } from "./_components/ThemeShortcuts";
import { WorkInquiryCTA } from "./_components/WorkInquiryCTA";
import { GRID } from "./_lib/layout";
import { projects } from "./_lib/projects";
import { useBodyScrollLock } from "./_lib/useBodyScrollLock";

// Drawer bundle stays out of the initial payload — only loads on the client.
// Single instance for the whole page; CTAs flip the inquiryOpenAtom.
const InquiryDrawer = dynamic(
  () => import("./_components/InquiryDrawer").then((m) => m.InquiryDrawer),
  { ssr: false },
);

const HERO_HEADLINE = "third index is a design engineering studio.";
const HERO_SUBHEAD =
  "interfaces, prototypes, and production frontends for product teams.";

export default function HomePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);

  useBodyScrollLock(settingsOpen);

  const dismissSettingsFromPage = (event: MouseEvent<HTMLElement>) => {
    if (!settingsOpen) return;
    event.preventDefault();
    event.stopPropagation();
    setSettingsOpen(false);
  };

  const toggleSettings = () => {
    setSettingsOpen((prev) => !prev);
  };

  return (
    <AnimRoot
      className={`relative flex min-h-screen flex-col [--settings-surface:#09090b] border-[color:var(--settings-surface)] transition-[border-width,padding] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${
        settingsOpen
          ? "border-l-[12px] border-r-[12px] px-4 md:border-l-[18px] md:border-r-[18px] md:px-6"
          : "border-0 px-6 md:px-8 xl:px-0"
      }`}
    >
      <ThemeShortcuts />
      <GridDebugger enabled={gridDebug} settingsOpen={settingsOpen} />
      <SettingsPanel
        gridDebug={gridDebug}
        setGridDebug={setGridDebug}
        settingsOpen={settingsOpen}
      />

      <header
        onClickCapture={dismissSettingsFromPage}
        className={`relative items-center pt-5 md:pt-10 lg:pt-16 ${GRID}`}
      >
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="col-span-1 col-start-1 md:col-start-2 row-start-1 justify-self-start"
        >
          <MonogramMark className="h-7 w-auto md:h-9" />
        </Link>

        <button
          type="button"
          onClick={toggleSettings}
          aria-label={settingsOpen ? "close settings" : "open settings"}
          aria-expanded={settingsOpen}
          className="col-span-1 col-start-12 md:col-start-11 row-start-1 inline-flex h-8 w-8 items-center justify-center justify-self-end text-foreground opacity-75 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-foreground"
        >
          {settingsOpen ? (
            <X aria-hidden className="h-4 w-4" />
          ) : (
            <Settings2 aria-hidden className="h-4 w-4" />
          )}
        </button>
      </header>

      <main onClickCapture={dismissSettingsFromPage} className="flex-1">
        <section className={`pt-12 md:pt-24 lg:pt-32 ${GRID}`}>
          <p
            data-anim="hero"
            className="col-span-12 md:col-span-10 md:col-start-2 font-sans text-2xl font-semibold tracking-tight leading-tight text-pretty md:text-3xl"
          >
            {HERO_HEADLINE}
          </p>
          <p
            data-anim="hero"
            className="col-span-12 md:col-span-10 md:col-start-2 pt-2 font-sans text-sm leading-relaxed text-foreground/60 md:text-base"
          >
            {HERO_SUBHEAD}
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
              </a>{" "}
              — two decades shipping software for the web across fintech, media,
              and e-commerce. client work alongside original products.
              principal-led, collaborators as needed.
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
              sites, and zero-to-one builds. project-based, retainer, or
              embedded engagements.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <ProjectShowcase projects={projects.slice(0, 10)} />
        <WorkInquiryCTA />
      </main>

      <SiteFooter onClickCapture={dismissSettingsFromPage} />
      <InquiryDrawer />
    </AnimRoot>
  );
}
