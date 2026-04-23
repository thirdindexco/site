"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Thin client wrapper that owns the GSAP timeline + ref scope for the
// desktop intro choreography. Animated targets are addressed by data-anim
// attributes, so the children themselves can be server components.
export function AnimRoot({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-anim='swatch']", {
          autoAlpha: 0,
          filter: "blur(6px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power2.out",
          force3D: true,
        })
          .from(
            ["[data-anim='logo']", "[data-anim='weather']"],
            { autoAlpha: 0, y: -8, duration: 0.9 },
            "-=0.4",
          )
          .from(
            "[data-anim='hero-word']",
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.55,
              stagger: 0.015,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .from(
            "[data-anim='body']",
            { autoAlpha: 0, y: 14, duration: 0.95, stagger: 0.12 },
            "-=0.5",
          )
          .from(
            "[data-anim='footer']",
            { autoAlpha: 0, y: 6, duration: 0.8, stagger: 0.08 },
            "-=0.4",
          );
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
