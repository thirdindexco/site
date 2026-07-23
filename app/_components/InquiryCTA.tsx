"use client";

import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

export function InquiryCTA() {
  const setOpen = useSetAtom(inquiryOpenAtom);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/cta inline-flex min-h-11 cursor-pointer items-center gap-1.5 whitespace-nowrap bg-accent px-4 py-2 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--foreground)]"
      >
        start an inquiry
        <ArrowRight
          aria-hidden
          className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
        />
      </button>
      <a
        href="https://cal.com/thirdindex/intro"
        target="_blank"
        rel="noopener noreferrer"
        className="group/call inline-flex min-h-11 items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
      >
        book a call
        <ArrowRight
          aria-hidden
          className="h-3 w-3 transition-transform duration-200 group-hover/call:translate-x-0.5"
        />
      </a>
    </div>
  );
}
