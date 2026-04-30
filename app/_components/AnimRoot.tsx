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
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduceMotion } = ctx.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          if (!isDesktop) return;

          // Reduced motion: reveal everything immediately, skip the timeline.
          if (reduceMotion) {
            gsap.set("[data-anim]", { autoAlpha: 1, visibility: "visible" });
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            delay: 0.04,
          });

          // Header cascades left → right (logo · swatches · weather), then
          // hero, body, footer follow the page's vertical reading flow.
          tl.from("[data-anim='logo']", {
            autoAlpha: 0,
            y: -5,
            duration: 0.42,
          })
            .from(
              "[data-anim='swatch']",
              {
                autoAlpha: 0,
                filter: "blur(4px)",
                duration: 0.38,
                stagger: 0.035,
                ease: "power2.out",
                force3D: true,
              },
              "-=0.24",
            )
            .from(
              "[data-anim='weather']",
              { autoAlpha: 0, y: -5, duration: 0.38 },
              "-=0.3",
            )
            .from(
              "[data-anim='hero-word']",
              {
                autoAlpha: 0,
                y: 6,
                duration: 0.34,
                stagger: 0.007,
                ease: "power2.out",
              },
              "-=0.16",
            )
            .from(
              "[data-anim='body']",
              { autoAlpha: 0, y: 8, duration: 0.48, stagger: 0.045 },
              "-=0.18",
            )
            .from(
              "[data-anim='footer']",
              { autoAlpha: 0, y: 4, duration: 0.38, stagger: 0.035 },
              "-=0.18",
            );
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
