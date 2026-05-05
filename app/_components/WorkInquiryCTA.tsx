"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { ArrowRight } from "lucide-react";
import { services } from "../_lib/projects";

const InquiryDrawer = dynamic(
  () => import("./InquiryDrawer").then((m) => m.InquiryDrawer),
  { ssr: false },
);

export function WorkInquiryCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="pt-16 md:pt-24 lg:pt-32">
        <div className="mx-auto grid w-full max-w-grid grid-cols-12 gap-4 border-t border-[color:var(--panel-border)] pt-8 md:pt-8">
          <div className="col-span-12 md:col-span-4 md:col-start-2">
            <p className="font-mono font-medium text-3xs uppercase tracking-tight">
              working together
            </p>
            <p className="pt-8 font-ld text-lg font-light leading-tight tracking-tight md:text-xl">
              mvps, prototypes, platforms, production systems, and internal
              tools — scoped to your team, stack, and timeline.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-8">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group/cta inline-flex items-center gap-1.5 bg-accent px-3 py-2 font-mono text-3xs font-medium uppercase tracking-tight text-white outline-none transition-colors duration-200 hover:bg-accent-hover"
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
                className="group/call inline-flex items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-65 outline-none transition-opacity hover:opacity-100"
              >
                book a call
                <ArrowRight
                  aria-hidden
                  className="h-3 w-3 transition-transform duration-200 group-hover/call:translate-x-0.5"
                />
              </a>
            </div>
          </div>

          <div className="col-span-12 pt-12 md:col-span-4 md:col-start-8 md:pt-0">
            <p className="font-mono font-medium text-3xs uppercase tracking-tight">
              typical engagements
            </p>
            <ul className="grid pt-8">
              {services.map((service) => (
                <li
                  key={service.title}
                  className="border-b border-[color:var(--panel-border)]"
                >
                  <Collapsible.Root>
                    <Collapsible.Trigger className="group/service flex w-full cursor-pointer items-baseline justify-between gap-5 py-3 text-left opacity-80 outline-none transition-opacity duration-200 hover:opacity-100 data-[panel-open]:opacity-100">
                      <span className="font-ld text-base font-light leading-tight tracking-tight">
                        {service.title}
                      </span>
                      {service.timeline ? (
                        <span className="shrink-0 font-mono text-3xs uppercase tracking-tight opacity-70">
                          {service.timeline}
                        </span>
                      ) : null}
                    </Collapsible.Trigger>
                    <Collapsible.Panel className="collapsible-panel">
                      <p className="pb-4 pr-1 font-ld text-sm font-light leading-snug tracking-tight opacity-75">
                        {service.description}
                      </p>
                    </Collapsible.Panel>
                  </Collapsible.Root>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <InquiryDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
