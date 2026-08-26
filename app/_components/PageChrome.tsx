"use client";

import {
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { PAGE_X, SHELL } from "../_lib/layout";
import { useBodyScrollLock } from "../_lib/useBodyScrollLock";
import { AnimRoot } from "./AnimRoot";
import { ContactPanel } from "./ContactPanel";
import { GridDebugger } from "./GridDebugger";
import { InquiryDrawerMount } from "./InquiryDrawerMount";
import { InspectOverlay } from "./InspectOverlay";
import { SettingsPanel } from "./SettingsPanel";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { ThemeShortcuts } from "./ThemeShortcuts";

// Shared shell for every page: one centered measure with a sticky bar above
// it and the colophon below. Full-bleed rows cancel PAGE_X with BLEED_X
// rather than by living outside the container.
//
// There is no mobile nav drawer. With the section index gone the drawer had
// one link left in it, which isn't worth a fullscreen overlay — so the bar
// is the same at every width.
export function PageChrome({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);
  const [inspect, setInspect] = useState(false);

  useBodyScrollLock(settingsOpen || contactOpen);

  // Page clicks dismiss whichever overlay is open.
  const dismissPanelsFromPage = (event: MouseEvent<HTMLElement>) => {
    if (!settingsOpen && !contactOpen) return;
    event.preventDefault();
    event.stopPropagation();
    setSettingsOpen(false);
    setContactOpen(false);
  };

  // The two overlays share the right edge — opening one closes the other.
  const toggleSettings = () => {
    setContactOpen(false);
    setSettingsOpen((prev) => !prev);
  };
  const toggleContact = () => {
    setSettingsOpen(false);
    setContactOpen((prev) => !prev);
  };

  return (
    <AnimRoot className="relative flex min-h-svh flex-col">
      <ThemeShortcuts />
      <GridDebugger enabled={gridDebug} />
      <InspectOverlay enabled={inspect} />
      <SettingsPanel
        gridDebug={gridDebug}
        setGridDebug={setGridDebug}
        inspect={inspect}
        setInspect={setInspect}
        settingsOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
      <InquiryDrawerMount />

      <SiteHeader onSettings={toggleSettings} settingsOpen={settingsOpen} />

      <main
        onClickCapture={dismissPanelsFromPage}
        className={`${SHELL} ${PAGE_X} flex-1 pb-24 pt-10 lg:pb-32 lg:pt-16`}
      >
        {children}
      </main>

      <SiteFooter onContact={toggleContact} />
    </AnimRoot>
  );
}
