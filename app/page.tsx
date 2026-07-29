"use client";

import { Fragment, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { ArrowRight } from "lucide-react";
import { PageChrome } from "./_components/PageChrome";
import { inquiryOpenAtom } from "./_lib/inquiry-state";

const HERO_SUPPORT =
  "is a digital studio that designs and builds custom websites, apps, and interfaces for select brands, studios, and product teams worldwide.";

// Words are wrapped individually so AnimRoot can cascade the reveal. The
// space must live OUTSIDE the inline-block span — trailing whitespace at
// the end of an inline-block's line box is trimmed by CSS, which jams the
// words together if the space is inside. The padding/negative-margin pair
// is invisible to layout but grows each span's paint box: while the blur
// filter is animating, the browser rasterizes the span as its own layer,
// and without the extra room, glyph ink that overhangs the box (ligatures,
// tight tracking) is clipped until the filter clears.
function heroWords(text: string) {
  // The last two words share one span, joined by a non-breaking space, so
  // the final line can never wrap to a single orphaned word. (text-pretty
  // can't do this here: the inline-block spans are atomic boxes, outside
  // its rebalancing.)
  const words = text.split(" ");
  const chunks = [...words.slice(0, -2), words.slice(-2).join(" ")];
  return chunks.map((chunk, i) => (
    <Fragment key={i}>
      <span className="hero-word inline-block p-[0.15em] -m-[0.15em]">
        {chunk}
      </span>{" "}
    </Fragment>
  ));
}

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " pst",
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// Single-viewport homepage: the full-bleed hero statement with copyright,
// location/clock, and email pinned to the fold line. Information, projects,
// and contact live on their own routes; PageChrome's footer is suppressed
// since the fold row carries that duty here.
export default function HomePage() {
  const time = useClock();
  const setInquiryOpen = useSetAtom(inquiryOpenAtom);

  return (
    <PageChrome footer={false}>
      <section className="flex min-h-[calc(100svh-44px)] flex-col justify-between pb-4 md:min-h-[calc(100svh-52px)]">
        <div>
          <h1
            data-anim="hero"
            className="w-full pt-10 font-sans text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:pt-14 md:text-3xl md:leading-[1.08] lg:pt-16 lg:text-5xl lg:leading-[1.05]"
          >
            {heroWords("THIRD INDEX")}
            <span className="text-foreground/50">
              {heroWords(HERO_SUPPORT)}
            </span>
          </h1>

          {/* Minimal inquiry link — sits on the 1/3 line, aligned with the
              header nav above and the las vegas block on the fold row below.
              Same mono-caps treatment as both. */}
          <div
            data-anim="body"
            className="grid w-full grid-cols-12 gap-6 pt-10 md:pt-12"
          >
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="col-span-12 inline-flex cursor-pointer items-center justify-self-start whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight opacity-60 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 md:col-span-3 md:col-start-5"
            >
              [&nbsp;start a project inquiry&nbsp;]
            </button>
          </div>
        </div>

        <div className="grid w-full grid-cols-12 items-end gap-6 pt-12">
          <p
            data-anim="body"
            className="col-span-6 font-mono text-3xs font-medium uppercase tracking-tight opacity-60 md:col-span-3"
          >
            ©2026
          </p>
          <div
            data-anim="body"
            className="col-span-6 font-mono text-3xs font-medium uppercase tracking-tight opacity-60 md:col-span-3 md:col-start-5"
          >
            <span className="block">las vegas, nv</span>
            <span className="block pt-0.5 tabular-nums">{time}</span>
          </div>
          {/* data-anim lives on the wrapper — the link's own
              transition-opacity would corrupt GSAP's captured end value
              under StrictMode's double-mounted effect. */}
          <div
            data-anim="body"
            className="col-span-12 md:col-span-3 md:col-start-9"
          >
            <a
              href="mailto:info@thirdindex.co"
              className="group/mail inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
            >
              <ArrowRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/mail:translate-x-0.5"
              />
              info@thirdindex.co
            </a>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
