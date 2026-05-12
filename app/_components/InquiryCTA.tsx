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
        className="group/cta inline-flex items-center gap-1.5 bg-accent px-3 py-2 font-mono font-medium text-3xs uppercase tracking-tight text-white transition-colors duration-200 hover:bg-accent-hover whitespace-nowrap cursor-pointer outline-none"
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
        className="group/call inline-flex items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100"
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
