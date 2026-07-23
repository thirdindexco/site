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
import { AnimRoot } from "./AnimRoot";
import { ContactPanel } from "./ContactPanel";
import { GridDebugger } from "./GridDebugger";
import { InquiryDrawerMount } from "./InquiryDrawerMount";
import { InspectOverlay } from "./InspectOverlay";
import { SettingsPanel } from "./SettingsPanel";
import { SiteFooter } from "./SiteFooter";
import { ThemeShortcuts } from "./ThemeShortcuts";
import { useBodyScrollLock } from "../_lib/useBodyScrollLock";

const NAV_LINKS = [
  { href: "/information", label: "information" },
  { href: "/projects", label: "projects" },
];

const MOBILE_NAV_LINKS = [{ href: "/", label: "home" }, ...NAV_LINKS];

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

      <aside
        id="mobile-navigation"
        inert={!mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
        aria-label="mobile navigation"
        className={`fixed inset-0 z-40 flex flex-col bg-[color:var(--background)] px-4 pb-6 pt-20 text-foreground transition-[opacity,visibility] duration-200 motion-reduce:transition-none md:hidden ${
          mobileMenuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="primary" className="flex flex-col">
          {MOBILE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="border-t border-[color:var(--panel-border)] py-4 font-sans text-2xl font-semibold leading-none tracking-tight outline-none transition-opacity last:border-b hover:opacity-60 focus-visible:text-[color:var(--accent)]"
            >
              {link.label}
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

      <header
        onClickCapture={dismissPanelsFromPage}
        className="relative z-50 grid w-full grid-cols-12 items-center gap-6 pt-4 md:z-auto md:pt-5"
      >
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="third index — home"
          data-anim="logo"
          className="col-span-6 col-start-1 row-start-1 whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3"
        >
          third index
        </Link>

        <HeaderNav contactOpen={contactOpen} onContactToggle={toggleContact} />

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "close navigation" : "open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          className="col-span-2 col-start-11 row-start-1 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center justify-self-end outline-none focus-visible:text-[color:var(--accent)] md:hidden"
        >
          {mobileMenuOpen ? (
            <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>

        <button
          type="button"
          onClick={toggleSettings}
          aria-expanded={settingsOpen}
          className="col-span-2 col-start-11 row-start-1 hidden cursor-pointer justify-self-end whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)] md:block"
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
