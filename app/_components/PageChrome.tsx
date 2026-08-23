"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { PAGE_X } from "../_lib/layout";
import { useBodyScrollLock } from "../_lib/useBodyScrollLock";
import { AnimRoot } from "./AnimRoot";
import { ContactPanel } from "./ContactPanel";
import { GridDebugger } from "./GridDebugger";
import { InquiryDrawerMount } from "./InquiryDrawerMount";
import { InspectOverlay } from "./InspectOverlay";
import { MonogramMark } from "./MonogramMark";
import { SettingsPanel } from "./SettingsPanel";
import { SiteRail, RAIL_SECTIONS } from "./SiteRail";
import { ThemeShortcuts } from "./ThemeShortcuts";

// Shared shell for every page: a fixed left rail carrying the mark, the
// studio line, and the global links, with the document itself scrolling in
// the column to its right. Below lg the rail has nowhere to live, so it
// collapses into a sticky mark/menu bar at the top and the same link
// furniture restacked at the foot of the page.
export function PageChrome({ children }: { children: ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);
  const [inspect, setInspect] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(mobileMenuOpen || settingsOpen || contactOpen);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

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
    setMobileMenuOpen(false);
    setContactOpen(false);
    setSettingsOpen((prev) => !prev);
  };
  const toggleContact = () => {
    setMobileMenuOpen(false);
    setSettingsOpen(false);
    setContactOpen((prev) => !prev);
  };

  return (
    <AnimRoot className="relative min-h-svh lg:pl-80">
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

      <SiteRail
        onContact={toggleContact}
        onSettings={toggleSettings}
        contactOpen={contactOpen}
        settingsOpen={settingsOpen}
      />

      <aside
        id="mobile-navigation"
        inert={!mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
        aria-label="mobile navigation"
        className={`fixed inset-0 z-40 flex flex-col bg-[color:var(--background)] px-4 pb-6 pt-20 text-foreground transition-[opacity,visibility] duration-200 motion-reduce:transition-none lg:hidden ${
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="primary" className="flex flex-col">
          {RAIL_SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`/#${section.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="border-t border-[color:var(--panel-border)] py-3.5 font-sans text-lg font-medium leading-none tracking-tight outline-none transition-opacity last:border-b hover:opacity-60 focus-visible:text-[color:var(--accent)]"
            >
              {section.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={toggleContact}
            className="min-h-12 border border-[color:var(--panel-border)] px-4 text-left font-mono text-3xs font-medium uppercase tracking-tight outline-none transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
          >
            contact
          </button>
          <button
            type="button"
            onClick={toggleSettings}
            className="min-h-12 border border-[color:var(--panel-border)] px-4 text-left font-mono text-3xs font-medium uppercase tracking-tight outline-none transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
          >
            settings
          </button>
        </div>
      </aside>

      <div className={`flex min-h-svh flex-col ${PAGE_X}`}>
        {/* Mobile bar. Bled through the column gutters so its background
            covers content scrolling underneath it. */}
        <header
          onClickCapture={dismissPanelsFromPage}
          className="sticky top-0 z-30 -mx-5 flex items-center justify-between bg-[color:var(--background)] px-5 py-4 md:-mx-8 md:px-8 lg:hidden"
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="third index — home"
            className="flex items-center gap-2.5 outline-none"
          >
            <MonogramMark className="h-4 w-auto" />
            <span className="font-mono text-3xs font-medium uppercase tracking-tight">
              third index
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "close navigation" : "open navigation"}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            className="-mr-3 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end outline-none focus-visible:text-[color:var(--accent)]"
          >
            {mobileMenuOpen ? (
              <X aria-hidden className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Menu aria-hidden className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </header>

        {/* The lg top padding drops the first line of the page below the
            mark in the rail, so the two columns read as stacked rather than
            as one row starting at the same y. */}
        <main
          onClickCapture={dismissPanelsFromPage}
          className="flex-1 pb-24 pt-6 lg:pb-36 lg:pt-24"
        >
          {children}
        </main>

        <SiteRail
          variant="flow"
          onContact={toggleContact}
          onSettings={toggleSettings}
        />
      </div>
    </AnimRoot>
  );
}
