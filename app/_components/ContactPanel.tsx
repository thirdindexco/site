"use client";

import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

// Contact drawer — floating card matching the InquiryDrawer treatment:
// inset from the viewport edges with rounded corners, sliding in from the
// right over a dimmed backdrop. The closed transform overshoots by 2rem so
// the card and its shadow fully clear the inset gap.
export function ContactPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const setInquiryOpen = useSetAtom(inquiryOpenAtom);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/15 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        inert={!open}
        aria-hidden={!open}
        aria-label="contact"
        className={`fixed top-2 bottom-2 left-2 right-2 z-50 flex flex-col overflow-hidden rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--background)] px-6 pb-6 pt-5 text-foreground shadow-[-8px_0_24px_-16px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:top-4 md:bottom-4 md:left-auto md:right-4 md:w-[520px] md:px-10 md:pb-8 md:pt-6 ${
          open ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"
        }`}
      >
        <div className="flex items-center justify-between font-mono text-3xs font-medium uppercase tracking-tight">
          <span>contact</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
          >
            close
          </button>
        </div>
  
        <h2 className="pt-10 font-sans text-xl font-semibold leading-tight tracking-tight">
          let&apos;s build something.
        </h2>
  
        <div className="pt-8">
          <p className="font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
            new business
          </p>
          <a
            href="mailto:info@thirdindex.co"
            className="mt-1 inline-block font-sans text-sm underline decoration-transparent underline-offset-2 outline-none transition-colors hover:decoration-current focus-visible:decoration-current"
          >
            info@thirdindex.co
          </a>
        </div>
  
        <p className="max-w-[44ch] pt-6 font-sans text-sm leading-relaxed text-foreground/70">
          start with a 15-minute intro call — no prep needed. share a brief, or
          write directly. i reply within two business days.
        </p>
  
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
          <a
            href="https://cal.com/thirdindex/intro"
            target="_blank"
            rel="noopener noreferrer"
            className="group/call inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap bg-accent px-4 py-2.5 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--foreground)]"
          >
            book a call
            <ArrowRight
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 group-hover/call:translate-x-0.5"
            />
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              setInquiryOpen(true);
            }}
            className="group/inq inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
          >
            start an inquiry
            <ArrowRight
              aria-hidden
              className="h-3 w-3 transition-transform duration-200 group-hover/inq:translate-x-0.5"
            />
          </button>
        </div>

        <div className="mt-auto font-mono text-3xs font-medium uppercase tracking-tight opacity-60">
          <p>based in the mojave desert</p>
          <p>working worldwide</p>
        </div>
      </aside>
    </>
  );
}
