"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

// Drawer bundle (base-ui Dialog + form logic + services data) stays out of
// the initial payload — only loads when the CTA is clicked.
const InquiryDrawer = dynamic(
  () => import("./InquiryDrawer").then((m) => m.InquiryDrawer),
  { ssr: false },
);

export function InquiryCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-start gap-3 pt-8">
        <div className="flex flex-col lg:flex-row lg:items-center items-start gap-3 lg:gap-5">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group/cta self-start inline-flex items-center gap-1.5 bg-accent px-3 py-2 font-mono font-medium text-3xs uppercase tracking-tight text-white transition-colors duration-200 hover:bg-accent-hover whitespace-nowrap cursor-pointer outline-none"
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
            className="font-mono font-medium text-3xs uppercase tracking-tight text-foreground opacity-60 transition-opacity hover:opacity-100 whitespace-nowrap outline-none"
          >
            book a call
          </a>
        </div>
        <a
          href="mailto:info@thirdindex.co"
          className="font-mono font-light text-3xs uppercase tracking-tight opacity-60 transition-opacity hover:opacity-100 whitespace-nowrap"
        >
          or email info@thirdindex.co
        </a>
      </div>
      <InquiryDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
