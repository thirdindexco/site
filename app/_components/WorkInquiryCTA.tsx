"use client";

import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

export function WorkInquiryCTA() {
  const setOpen = useSetAtom(inquiryOpenAtom);

  return (
    <section className="pt-16 md:pt-24 lg:pt-32">
      <div className="mx-auto grid w-full max-w-grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <p className="font-mono text-3xs font-medium uppercase tracking-tight">
            get in touch
          </p>
          <p className="max-w-[60ch] pt-8 font-sans text-sm leading-relaxed md:text-base">
            start with a 15-minute intro call — no prep needed. share a brief,
            or write directly to{" "}
            <a
              href="mailto:info@thirdindex.co"
              className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
            >
              info@thirdindex.co
            </a>
            . we reply within two business days.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-8 md:pt-10">
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
              onClick={() => setOpen(true)}
              className="group/inq inline-flex items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100"
            >
              start an inquiry
              <ArrowRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/inq:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
