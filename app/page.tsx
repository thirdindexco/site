"use client";

import Link from "next/link";
import { Fragment, useEffect, useState, type MouseEvent } from "react";
import { Settings2, X } from "lucide-react";
import { AnimRoot } from "./_components/AnimRoot";
import { GridDebugger } from "./_components/GridDebugger";
import { InquiryCTA } from "./_components/InquiryCTA";
import { Logo } from "./_components/Logo";
import { ProjectShowcase } from "./_components/ProjectShowcase";
import { SettingsPanel } from "./_components/SettingsPanel";
import { SiteFooter } from "./_components/SiteFooter";
import { ThemeShortcuts } from "./_components/ThemeShortcuts";
import { WorkInquiryCTA } from "./_components/WorkInquiryCTA";
import { GRID } from "./_lib/layout";
import { projects } from "./_lib/projects";

const HERO_TEXT =
  "a design and engineering studio building digital products with care — interfaces, websites, and the systems behind them.";
const heroWords = HERO_TEXT.split(/\s+/);
const italicHeroWords = new Set([
  "digital",
  "products",
  "interfaces",
  "systems",
]);

export default function HomePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);

  useEffect(() => {
    if (!settingsOpen) return;

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [settingsOpen]);

  const dismissSettingsFromPage = (event: MouseEvent<HTMLElement>) => {
    if (!settingsOpen) return;
    event.preventDefault();
    event.stopPropagation();
    setSettingsOpen(false);
  };

  const toggleSettings = () => {
    if (settingsOpen) {
      setSettingsOpen(false);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setSettingsOpen(true);
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
          className="col-span-8 col-start-3 flex justify-center md:col-span-4 md:col-start-5"
        >
          <Logo className="h-7 w-auto md:h-[34px] md:w-[176px]" />
        </Link>

        <button
          type="button"
          onClick={toggleSettings}
          aria-label={settingsOpen ? "close settings" : "open settings"}
          aria-expanded={settingsOpen}
          className="col-span-1 col-start-12 row-start-1 inline-flex h-8 w-8 items-center justify-center justify-self-end text-foreground opacity-75 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-foreground"
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
          <p className="col-span-12 font-ld text-xl font-light leading-[1.24] tracking-tight md:col-span-10 md:col-start-2 md:text-3xl md:leading-[1.22] md:text-pretty lg:text-4xl lg:leading-[1.18]">
            {heroWords.map((word, i) => (
              <Fragment key={i}>
                <span
                  data-anim="hero-word"
                  className={`inline-block ${
                    italicHeroWords.has(
                      word
                        .toLowerCase()
                        .replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ""),
                    )
                      ? "italic"
                      : ""
                  }`}
                >
                  {word}
                </span>
                {i < heroWords.length - 1 && " "}
              </Fragment>
            ))}
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
            <p className="pt-8 font-ld text-base font-light leading-tight tracking-tight">
              studio led by{" "}
              <a
                href="https://ciccarel.li"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
              >
                michael ciccarelli
              </a>
              . 20+ years building for the web across fintech, commerce, and
              media. one principal, end-to-end, with trusted collaborators when
              needed.
            </p>
          </div>

          <div
            data-anim="body"
            className="col-span-12 pt-12 md:col-span-4 md:col-start-8 md:pt-0"
          >
            <div className="font-mono text-3xs font-medium uppercase tracking-tight">
              inquiries
            </div>
            <p className="pt-8 font-ld text-base font-light leading-tight tracking-tight">
              open to new projects. mvps, prototypes, and production systems —
              designed and built together. project work, retainers, or
              fractional engagements.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <ProjectShowcase projects={projects.slice(0, 10)} />
        <WorkInquiryCTA />
      </main>

      <SiteFooter onClickCapture={dismissSettingsFromPage} />
    </AnimRoot>
  );
}
