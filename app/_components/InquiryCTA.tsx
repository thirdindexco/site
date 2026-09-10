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
        project inquiry
        <ArrowRight
          aria-hidden
          className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
        />
      </button>
      {/* The secondary door is the address itself — lowercase, since it's
          an address rather than a label, and a step up in size so nine-
          pixel lowercase mono doesn't strain. Booking a call moved to the
          footer and the drawer; a calendar is a process, an email is a
          person. */}
      <a
        href="mailto:info@thirdindex.co"
        className="group/mail inline-flex min-h-11 items-center gap-1.5 font-mono text-2xs font-medium tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
      >
        info@thirdindex.co
        <ArrowRight
          aria-hidden
          className="h-3 w-3 transition-transform duration-200 group-hover/mail:translate-x-0.5"
        />
      </a>
    </div>
  );
}
