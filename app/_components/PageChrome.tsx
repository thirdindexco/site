"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { Settings2, X } from "lucide-react";
import { AnimRoot } from "./AnimRoot";
import { GridDebugger } from "./GridDebugger";
import { InspectOverlay } from "./InspectOverlay";
import { MonogramMark } from "./MonogramMark";
import { SettingsPanel } from "./SettingsPanel";
import { SiteFooter } from "./SiteFooter";
import { ThemeShortcuts } from "./ThemeShortcuts";
import { GRID } from "../_lib/layout";
import { useBodyScrollLock } from "../_lib/useBodyScrollLock";

// Shared chrome for the homepage and /audit, /sprint, /embedded. Owns the
// settings drawer + grid debugger state so any page using it gets the gear
// icon and panel without re-implementing them. AnimRoot wraps so each page's
// data-anim choreography continues to fire from inside.
export function PageChrome({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);
  const [inspect, setInspect] = useState(false);

  useBodyScrollLock(settingsOpen);

  const dismissSettingsFromPage = (event: MouseEvent<HTMLElement>) => {
    if (!settingsOpen) return;
    event.preventDefault();
    event.stopPropagation();
    setSettingsOpen(false);
  };

  const toggleSettings = () => {
    // Panel renders inline above the header. If the user has scrolled past
    // it, opening would slide the panel in offscreen — and useBodyScrollLock
    // would then pin the body at the current scroll, leaving the panel
    // clipped. Scroll synchronously (not smooth) so scrollY is 0 before the
    // lock effect runs.
    if (
      !settingsOpen &&
      typeof window !== "undefined" &&
      window.scrollY > 0
    ) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
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
      <InspectOverlay enabled={inspect} />
      <SettingsPanel
        gridDebug={gridDebug}
        setGridDebug={setGridDebug}
        inspect={inspect}
        setInspect={setInspect}
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
          className="col-span-1 col-start-1 row-start-1 justify-self-start"
        >
          <MonogramMark className="h-6 w-auto md:h-8" />
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
        {children}
      </main>

      <SiteFooter onClickCapture={dismissSettingsFromPage} />
    </AnimRoot>
  );
}
