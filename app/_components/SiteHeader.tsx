"use client";

import { useRef } from "react";
import Link from "next/link";
import { WeatherTime } from "./WeatherTime";
import { gsap, useGSAP } from "../_lib/gsap";

export function SiteHeader({
  backLink = false,
}: {
  backLink?: boolean;
}) {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { y: -4, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: "premium",
            delay: 0.2,
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, {
          opacity: 1,
          clearProps: "transform",
        });
      });
    },
    { scope: headerRef },
  );

  return (
    <header
      ref={headerRef}
      className="reveal reveal-header flex items-center pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-[calc(8.33%+18px)] pt-5 font-mono font-light text-[9px] uppercase tracking-[-0.01em]"
    >
      <WeatherTime />
      {backLink && (
        <Link
          href="/"
          className="ml-auto text-ink transition-colors duration-200 hover:text-accent"
        >
          ← back to index
        </Link>
      )}
    </header>
  );
}
