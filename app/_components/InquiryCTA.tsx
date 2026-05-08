"use client";

import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

export function InquiryCTA() {
  const setOpen = useSetAtom(inquiryOpenAtom);
  return (
    <div className="pt-8">
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
    </div>
  );
}
