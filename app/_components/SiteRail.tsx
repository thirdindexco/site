"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { Calendar, Mail, MessageSquare, Moon, Settings2, Sun } from "lucide-react";
import { cycleTheme, themeAtom } from "../_lib/theme-state";
import { FooterWeather } from "./FooterWeather";
import { MonogramMark } from "./MonogramMark";
import { StudioLine } from "./StudioLine";

// The landing page is one document; these are its stops. Ordered as the page
// reads, and shared with the mobile menu so both navigations stay in sync.
export const RAIL_SECTIONS = [
  { id: "studio", label: "studio" },
  { id: "work", label: "selected work" },
  { id: "focus", label: "focus" },
  { id: "engagements", label: "engagements" },
  { id: "stack", label: "stack" },
  { id: "inquiry", label: "inquiries" },
] as const;

// Distance from the top of the viewport at which a section becomes current.
// Clears the mobile bar and sits just above where content starts on desktop.
const SPY_LINE = 160;

// Secondary furniture — sans rather than the mono caps used for labels in
// the main column, one step down from the studio line above it, and stacked
// tight so the whole cluster reads as one block instead of six lines.
// 11px sits between the config's 2xs (10px) and Tailwind's xs (12px): 10px
// sans is a strain to read and 12px matches the studio line it sits under.
const LINK =
  "inline-flex w-fit items-center font-sans text-[11px] leading-[1.5] opacity-55 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]";

// Icon controls. The box is a 44px touch target where a finger has to hit
// it and tightens to 24px on desktop. The row's negative margin is exactly
// the box's inset around the 14px glyph — (44-14)/2 and (24-14)/2 — so the
// first icon's ink lines up with the text above it rather than its padding.
const ICON =
  "inline-flex h-11 w-11 cursor-pointer items-center justify-center opacity-55 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:-outline-offset-[13px] focus-visible:outline-[color:var(--accent)] lg:h-5 lg:w-5 lg:focus-visible:-outline-offset-[2px]";
const ICON_GLYPH = "h-3 w-3";
const ICON_ROW = "flex items-center -ml-4 lg:gap-0.5 lg:-ml-1";

// Marks a section current once its top rises past a line near the top of
// the viewport, and keeps it current until the next one does. A plain
// "is intersecting" test flickers whenever two sections share the screen,
// and a line measured as a fraction of viewport height puts short sections
// behind it before the reader has reached them.
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    let frame = 0;
    const read = () => {
      frame = 0;

      // The last sections sit inside the final screenful, so on a tall
      // viewport their tops never reach the line and the index would stick
      // on whatever was current a third of the page ago. Bottoming out the
      // document means you're looking at the last one.
      const doc = document.documentElement;
      if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
        setActive(RAIL_SECTIONS[RAIL_SECTIONS.length - 1].id);
        return;
      }

      const line = SPY_LINE;
      let current: string | null = null;
      for (const section of RAIL_SECTIONS) {
        const node = document.getElementById(section.id);
        if (node && node.getBoundingClientRect().top <= line) {
          current = section.id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return active;
}

type RailProps = {
  // "fixed" pins the rail to the left edge on desktop; "flow" is the same
  // link furniture restacked at the foot of the page for narrow screens,
  // where a fixed rail has nowhere to live.
  variant?: "fixed" | "flow";
  onContact: () => void;
  onSettings: () => void;
  contactOpen?: boolean;
  settingsOpen?: boolean;
};

function SectionNav({ active }: { active: string | null }) {
  return (
    <nav aria-label="sections" className="flex flex-col gap-0.5">
      {RAIL_SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={`/#${section.id}`}
          aria-current={active === section.id ? "true" : undefined}
          className={`${LINK} ${active === section.id ? "opacity-100" : ""}`}
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
}

// Every icon carries a title so the label is available on hover as well as
// to assistive tech — the glyphs alone don't say what they open.
function IconControl({
  label,
  children,
  ...rest
}: {
  label: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" aria-label={label} title={label} className={ICON} {...rest}>
      {children}
    </button>
  );
}

function GlobalLinks({
  onContact,
  onSettings,
  contactOpen,
  settingsOpen,
}: Omit<RailProps, "variant">) {
  const theme = useAtomValue(themeAtom);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className={ICON_ROW}>
      <IconControl
        label="contact"
        onClick={onContact}
        aria-expanded={contactOpen}
      >
        <MessageSquare aria-hidden className={ICON_GLYPH} strokeWidth={1.5} />
      </IconControl>

      <a
        href="https://cal.com/thirdindex/intro"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="book a call"
        title="book a call"
        className={ICON}
      >
        <Calendar aria-hidden className={ICON_GLYPH} strokeWidth={1.5} />
      </a>

      <a
        href="mailto:info@thirdindex.co"
        aria-label="email info@thirdindex.co"
        title="info@thirdindex.co"
        className={ICON}
      >
        <Mail aria-hidden className={ICON_GLYPH} strokeWidth={1.5} />
      </a>

      {/* Shows the mode it switches *to*, so the glyph reads as the action
          rather than as a status light. */}
      <IconControl
        label={`switch to ${nextTheme} mode`}
        onClick={cycleTheme}
        aria-keyshortcuts="T"
      >
        {theme === "dark" ? (
          <Sun aria-hidden className={ICON_GLYPH} strokeWidth={1.5} />
        ) : (
          <Moon aria-hidden className={ICON_GLYPH} strokeWidth={1.5} />
        )}
      </IconControl>

      <IconControl
        label="settings"
        onClick={onSettings}
        aria-expanded={settingsOpen}
      >
        <Settings2 aria-hidden className={ICON_GLYPH} strokeWidth={1.5} />
      </IconControl>
    </div>
  );
}

export function SiteRail({
  variant = "fixed",
  onContact,
  onSettings,
  contactOpen,
  settingsOpen,
}: RailProps) {
  const pathname = usePathname();
  const active = useActiveSection(variant === "fixed" && pathname === "/");

  const links = (
    <GlobalLinks
      onContact={onContact}
      onSettings={onSettings}
      contactOpen={contactOpen}
      settingsOpen={settingsOpen}
    />
  );
  const colophon = (
    <div className="flex flex-col gap-2 font-sans text-[11px] leading-[1.5] opacity-40">
      <FooterWeather />
      <p>© 2026 third index llc</p>
    </div>
  );

  if (variant === "flow") {
    return (
      <div className="border-t border-[color:var(--panel-border)] pb-12 pt-10 lg:hidden">
        <SectionNav active={active} />
        <div className="flex flex-col gap-6 pt-8">
          {links}
          {colophon}
        </div>
      </div>
    );
  }

  return (
    <aside
      aria-label="site"
      className="fixed inset-y-0 left-0 z-30 hidden w-80 flex-col justify-between overflow-y-auto px-12 py-12 lg:flex"
    >
      <div>
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="inline-block outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)]"
        >
          <MonogramMark className="h-7 w-auto" />
        </Link>

        <StudioLine data-anim="body" className="max-w-[27ch] pt-10" />
      </div>

      {/* Bottom cluster — section index, then the icon controls, then the
          colophon. Everything below the fold of the rail's own scroll. */}
      <div data-anim="body" className="flex flex-col gap-6 pt-16">
        <SectionNav active={active} />
        {links}
        {colophon}
      </div>
    </aside>
  );
}
