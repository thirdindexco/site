"use client";

import Link from "next/link";
import { Settings2 } from "lucide-react";
import { PAGE_X, SHELL } from "../_lib/layout";
import { MonogramMark } from "./MonogramMark";

// Sticky bar, and deliberately almost nothing: a mark home and the settings
// panel. The section index that used to live here was navigation for a page
// that is one uninterrupted scroll — the sections are short enough that
// jumping between them was never worth the row of links.
export function SiteHeader({
  onSettings,
  settingsOpen,
}: {
  onSettings: () => void;
  settingsOpen: boolean;
}) {
  return (
    <header className="sticky top-0 z-30 bg-[color:var(--background)]/85 backdrop-blur-md">
      <div
        className={`${SHELL} ${PAGE_X} flex items-center justify-between gap-8 py-4`}
      >
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="shrink-0 outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)]"
        >
          <MonogramMark className="h-4 w-auto" />
        </Link>

        <button
          type="button"
          onClick={onSettings}
          aria-expanded={settingsOpen}
          aria-label="settings"
          title="settings"
          className="-mr-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center opacity-55 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:-outline-offset-[13px] focus-visible:outline-[color:var(--accent)] lg:-mr-1 lg:h-5 lg:w-5 lg:focus-visible:-outline-offset-[2px]"
        >
          <Settings2 aria-hidden className="h-3 w-3" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
