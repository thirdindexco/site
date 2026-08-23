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

          const root = rootRef.current;

          const inView = (el: Element) => {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight && rect.bottom > 0;
          };

          // The landing page is one long document, so most [data-anim]
          // targets start well below the fold. Reveal those immediately:
          // staggering thirty elements the visitor can't see only delays
          // the ones they can.
          const offscreen = Array.from(
            root?.querySelectorAll("[data-anim]") ?? [],
          ).filter((el) => !inView(el));
          if (offscreen.length) {
            gsap.set(offscreen, { autoAlpha: 1, visibility: "visible" });
          }

          const pick = (sel: string) => {
            const nodes = Array.from(root?.querySelectorAll(sel) ?? []).filter(
              inView,
            );
            return nodes.length ? nodes : null;
          };

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            delay: 0.02,
          });

          // Start and end states are both stated outright rather than
          // inferred by from(): the elements begin hidden via CSS, and
          // under StrictMode's double-mounted effect a from() tween can
          // capture the first run's leftover opacity:0 as its *end* value
          // and strand the page invisible.
          const reveal = (
            targets: Element[],
            from: gsap.TweenVars,
            to: gsap.TweenVars,
            position?: string,
          ) => {
            tl.set(targets, { autoAlpha: 0, ...from }, position);
            tl.to(targets, { autoAlpha: 1, ...to }, position);
          };

          // Order of the cascade: the mark, then the hero statement word by
          // word, then everything else in view.
          const logo = pick("[data-anim='logo']");
          if (logo) {
            reveal(logo, { y: -2 }, { y: 0, duration: 0.24 });
          }

          // Hero: if the headline is split into .hero-word spans, cascade
          // word-by-word with a blur settle; otherwise reveal as one block.
          const heroWords = pick("[data-anim='hero'] .hero-word");
          const hero = pick("[data-anim='hero']");
          if (heroWords) {
            // The h1 itself is unhidden at time 0 — it's only a container
            // for the word spans, which carry the cascade.
            if (hero) tl.set(hero, { autoAlpha: 1 }, 0);
            reveal(
              heroWords,
              { y: 14, filter: "blur(8px)" },
              {
                y: 0,
                filter: "blur(0px)",
                duration: 0.5,
                stagger: 0.024,
                ease: "power3.out",
                // Drop the inline filter/transform once done — a lingering
                // blur(0px) keeps the span rasterized in its own layer,
                // which blocks subpixel antialiasing on the final text.
                clearProps: "filter,transform",
              },
              "-=0.1",
            );
          } else if (hero) {
            reveal(hero, { y: 4 }, { y: 0, duration: 0.28 }, "-=0.1");
          }

          const body = pick("[data-anim='body']");
          if (body) {
            reveal(
              body,
              { y: 4 },
              { y: 0, duration: 0.26, stagger: 0.03 },
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
