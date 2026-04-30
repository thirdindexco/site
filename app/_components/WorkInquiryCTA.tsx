"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import data from "../../public/data.json";

type Service = {
  title: string;
  timeline?: string;
};

const services = data.services as Service[];

const InquiryDrawer = dynamic(
  () => import("./InquiryDrawer").then((m) => m.InquiryDrawer),
  { ssr: false },
);

export function WorkInquiryCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="pt-10 md:pt-16 lg:pt-20">
        <div className="mx-auto grid w-full max-w-grid grid-cols-12 gap-4 border-t border-[color:var(--panel-border)] pt-8 md:pt-10">
          <div className="col-span-12 md:col-span-4 md:col-start-2">
            <p className="font-mono font-medium text-3xs uppercase tracking-tight">
              working together
            </p>
            <p className="pt-6 font-ld text-xl font-light leading-tight tracking-tight md:text-2xl">
              need a design engineer who can own a project start to finish?
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-7">
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

          <div className="col-span-12 pt-8 md:col-span-4 md:col-start-8 md:pt-0">
            <p className="font-mono font-medium text-3xs uppercase tracking-tight">
              typical engagements
            </p>
            <ul className="grid gap-3 pt-6 font-ld text-base font-light leading-tight tracking-tight">
              {services.map((service) => (
                <li
                  key={service.title}
                  className="flex items-baseline justify-between gap-5 border-b border-[color:var(--panel-border)] pb-3"
                >
                  <span>{service.title}</span>
                  {service.timeline ? (
                    <span className="shrink-0 font-mono text-3xs uppercase tracking-tight opacity-55">
                      {service.timeline}
                    </span>
                  ) : null}
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
