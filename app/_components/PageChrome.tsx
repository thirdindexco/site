"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type MouseEvent, type ReactNode } from "react";
import { AnimRoot } from "./AnimRoot";
import { ContactPanel } from "./ContactPanel";
import { GridDebugger } from "./GridDebugger";
import { InquiryDrawerMount } from "./InquiryDrawerMount";
import { InspectOverlay } from "./InspectOverlay";
import { SettingsPanel } from "./SettingsPanel";
import { SiteFooter } from "./SiteFooter";
import { ThemeShortcuts } from "./ThemeShortcuts";

const NAV_LINKS = [
  { href: "/information", label: "information" },
  { href: "/projects", label: "projects" },
];

// Site nav on the header's 12-col grid — links at the 1/3 line, contact at
// the 2/3 line. display:contents so both clusters are grid items. The
// current page's link renders at full opacity. Contact opens the overlay
// panel rather than navigating.
function HeaderNav({
  contactOpen,
  onContactToggle,
}: {
  contactOpen: boolean;
  onContactToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="contents">
      <div className="col-span-3 col-start-5 row-start-1 hidden items-center whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight md:flex">
        {NAV_LINKS.map((link, i) => (
          <span key={link.href} className="flex items-center whitespace-nowrap">
            {i > 0 && <span className="opacity-60">,&nbsp;</span>}
            <Link
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`transition-opacity hover:opacity-100 ${
                pathname === link.href ? "opacity-100" : "opacity-60"
              }`}
            >
              {link.label}
            </Link>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onContactToggle}
        aria-expanded={contactOpen}
        className="col-span-2 col-start-9 row-start-1 hidden cursor-pointer text-left font-mono text-3xs font-medium uppercase tracking-tight opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)] md:block"
      >
        contact
      </button>
    </nav>
  );
}

// Shared chrome for every page. Owns the site nav plus the settings and
// contact overlay panels + grid debugger state so each page gets them
// without re-implementing anything. AnimRoot wraps so each page's data-anim
// choreography continues to fire from inside. `footer` lets the homepage
// opt out — its hero pins copyright/contact to the fold line instead.
export function PageChrome({
  children,
  footer = true,
}: {
  children: ReactNode;
  footer?: boolean;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);
  const [inspect, setInspect] = useState(false);

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
    <AnimRoot className="relative flex min-h-screen flex-col px-4 md:px-5">
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

      <header
        onClickCapture={dismissPanelsFromPage}
        className="relative grid w-full grid-cols-12 items-center gap-6 pt-4 md:pt-5"
      >
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="col-span-6 col-start-1 row-start-1 whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3"
        >
          third index
        </Link>

        <HeaderNav contactOpen={contactOpen} onContactToggle={toggleContact} />

        <button
          type="button"
          onClick={toggleSettings}
          aria-expanded={settingsOpen}
          className="col-span-2 col-start-11 row-start-1 cursor-pointer justify-self-end whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
        >
          settings
        </button>
      </header>

      <main onClickCapture={dismissPanelsFromPage} className="flex-1">
        {children}
      </main>

      {footer && <SiteFooter onClickCapture={dismissPanelsFromPage} />}
    </AnimRoot>
  );
}
