"use client";

import { PAGE_X, SHELL } from "../_lib/layout";
import { FooterWeather } from "./FooterWeather";
import { StudioLine } from "./StudioLine";

const LINK =
  "inline-flex w-fit items-center font-sans text-[11px] leading-[1.5] opacity-55 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]";

// The colophon, plus the contact panel's only remaining door — the header is
// down to a mark and settings, so this is where reaching us lives. The
// page's own inquiry CTAs still carry the primary path.
export function SiteFooter({ onContact }: { onContact: () => void }) {
  // Smooth by default, instant for anyone who asked for less motion — a
  // full-page glide is exactly the kind of movement that setting is about.
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="border-t border-[color:var(--panel-border)]">
      <div
        className={`${SHELL} ${PAGE_X} flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:gap-16`}
      >
        <StudioLine className="max-w-[46ch]" />

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onContact}
              className={`${LINK} cursor-pointer`}
            >
              contact
            </button>
            <a href="/llms.txt" className={LINK}>
              llms.txt
            </a>
            <button
              type="button"
              onClick={toTop}
              className={`${LINK} cursor-pointer`}
            >
              top
            </button>
          </div>
          {/* Day, time, weather and the copyright run as one line from md
              up; they only stack where the column is too narrow for it. */}
          <div className="flex flex-col gap-2 font-sans text-[11px] leading-[1.5] opacity-40 md:flex-row md:items-baseline md:gap-0">
            <FooterWeather />
            <span aria-hidden className="hidden px-1.5 opacity-60 md:inline">
              ·
            </span>
            <p>© 2026 third index llc</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
