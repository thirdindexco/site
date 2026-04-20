"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "../_lib/gsap";

export function SiteLogo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".reveal-logo", {
          yPercent: 100,
          filter: "blur(6px)",
          autoAlpha: 1,
        });
        gsap.to(".reveal-logo", {
          yPercent: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "premium",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal-logo", {
          opacity: 1,
          clearProps: "transform,filter",
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="overflow-hidden pt-8 md:pt-24 pl-5 md:pl-[calc(8.33%+18px)]"
    >
      <Link href="/" aria-label="third index — home" className="inline-block">
        <Image
          src="/logo.svg"
          alt="third index"
          width={750}
          height={142}
          priority
          className="reveal-logo h-[46px] md:h-[63px] w-auto"
        />
      </Link>
    </section>
  );
}
