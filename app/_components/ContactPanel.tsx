"use client";

import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

// Contact drawer — same overlay treatment as SettingsPanel: slides in over
// the page from the right, covering the last third of the viewport on
// desktop. The "contact" label lands where the nav's contact trigger sits,
// "close" takes the spot of the settings link.
export function ContactPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const setInquiryOpen = useSetAtom(inquiryOpenAtom);

  return (
    <aside
      inert={!open}
      aria-hidden={!open}
      aria-label="contact"
      className={`fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-[color:var(--panel-border)] bg-[color:var(--background)] px-4 pb-6 pt-4 text-foreground transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none sm:w-80 md:w-[calc(100vw/3+11px)] md:px-5 md:pt-5 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-3xs font-medium uppercase tracking-tight">
        <span>contact</span>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
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
          className="group/call inline-flex items-center gap-1.5 whitespace-nowrap bg-accent px-4 py-2.5 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover"
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
          className="group/inq inline-flex cursor-pointer items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
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
  );
}
