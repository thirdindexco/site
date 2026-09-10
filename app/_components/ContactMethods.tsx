"use client";

import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

const ROW =
  "grid gap-2 border-b border-[color:var(--panel-border)] py-5 md:grid-cols-3 md:gap-6";
const METHOD = "font-sans text-sm font-semibold leading-tight tracking-tight";
const LINK =
  "group/m inline-flex items-center gap-1.5 font-mono text-2xs font-medium tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]";
const NOTE = "pt-1.5 font-sans text-sm leading-relaxed text-pretty text-foreground/65";

function Arrow() {
  return (
    <ArrowRight
      aria-hidden
      className="h-3 w-3 transition-transform duration-200 group-hover/m:translate-x-0.5"
    />
  );
}

// Every way to reach the studio, laid out on the same rows the focus list
// uses. Email leads: the page should read as a person you can message,
// and the address is the door with the least ceremony. The form and the
// calendar follow — a form for a brief, a call for a conversation.
export function ContactMethods() {
  const setInquiryOpen = useSetAtom(inquiryOpenAtom);

  return (
    <ul className="border-t border-[color:var(--panel-border)]">
      <li className={ROW}>
        <h3 className={METHOD}>email</h3>
        <div className="md:col-span-2">
          <a href="mailto:info@thirdindex.co" className={LINK}>
            info@thirdindex.co
            <Arrow />
          </a>
          <p className={NOTE}>the quickest way in. replies within two business days.</p>
        </div>
      </li>

      <li className={ROW}>
        <h3 className={METHOD}>project inquiry</h3>
        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => setInquiryOpen(true)}
            className={`${LINK} cursor-pointer uppercase`}
          >
            open the form
            <Arrow />
          </button>
          <p className={NOTE}>
            a short brief — what you&apos;re building, timeline, budget.
          </p>
        </div>
      </li>

      <li className={ROW}>
        <h3 className={METHOD}>book a call</h3>
        <div className="md:col-span-2">
          <a
            href="https://cal.com/thirdindex/intro"
            target="_blank"
            rel="noopener noreferrer"
            className={`${LINK} uppercase`}
          >
            fifteen-minute intro
            <Arrow />
          </a>
          <p className={NOTE}>no prep needed.</p>
        </div>
      </li>
    </ul>
  );
}
