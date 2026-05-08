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
            defaults: { ease: "power2.out" },
            delay: 0.02,
          });

          // Header cascades left → right (logo · swatches), then hero, body,
          // footer follow the page's vertical reading flow.
          tl.from("[data-anim='logo']", {
            autoAlpha: 0,
            y: -3,
            duration: 0.28,
          })
            .from(
              "[data-anim='swatch']",
              {
                autoAlpha: 0,
                filter: "blur(2px)",
                duration: 0.24,
                stagger: 0.02,
                force3D: true,
              },
              "-=0.18",
            )
            .from(
              "[data-anim='hero']",
              {
                autoAlpha: 0,
                y: 6,
                duration: 0.32,
                stagger: 0.05,
              },
              "-=0.12",
            )
            .from(
              "[data-anim='body']",
              { autoAlpha: 0, y: 5, duration: 0.3, stagger: 0.03 },
              "-=0.2",
            )
            .from(
              "[data-anim='footer']",
              { autoAlpha: 0, y: 3, duration: 0.26, stagger: 0.02 },
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
