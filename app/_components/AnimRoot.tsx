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

          const root = rootRef.current;
          const pick = (sel: string) => {
            const nodes = root?.querySelectorAll(sel);
            return nodes && nodes.length ? nodes : null;
          };

          // Above-the-fold only: logo + swatches together, then hero,
          // then the about/inquiries pair. Below-the-fold elements
          // (project list, engagement cards, footer) reveal without
          // animation — there's no audience for a cascade that runs
          // offscreen.
          const logoSwatch = pick("[data-anim='logo'], [data-anim='swatch']");
          if (logoSwatch) {
            tl.from(logoSwatch, {
              autoAlpha: 0,
              y: -2,
              duration: 0.24,
              stagger: 0.015,
            });
          }
          // Hero: if the headline is split into .hero-word spans, cascade
          // word-by-word with a blur settle; otherwise reveal as one block.
          const heroWords = pick("[data-anim='hero'] .hero-word");
          const hero = pick("[data-anim='hero']");
          if (heroWords) {
            if (hero) tl.set(hero, { autoAlpha: 1 });
            tl.from(
              heroWords,
              {
                autoAlpha: 0,
                y: 14,
                filter: "blur(8px)",
                duration: 0.5,
                stagger: 0.03,
                ease: "power3.out",
                // Drop the inline filter/transform once done — a lingering
                // blur(0px) keeps the span rasterized in its own layer,
                // which blocks subpixel antialiasing on the final text.
                clearProps: "filter,transform",
              },
              "-=0.1",
            );
          } else if (hero) {
            tl.from(
              hero,
              { autoAlpha: 0, y: 4, duration: 0.28 },
              "-=0.1",
            );
          }
          const body = pick("[data-anim='body']");
          if (body) {
            tl.from(
              body,
              { autoAlpha: 0, y: 4, duration: 0.26, stagger: 0.04 },
              "-=0.16",
            );
          }
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
