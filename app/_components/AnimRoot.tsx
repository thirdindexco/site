"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO_HOLD_S, INTRO_MOBILE_MS, leaveIntro } from "../_lib/intro";

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
      // matchMedia only invokes the callback when at least one condition
      // matches, so the narrow range is listed too — otherwise a phone with
      // motion enabled would never reach the hand-off timer below.
      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isNarrow: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduceMotion } = ctx.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };
          // Below the desktop breakpoint there is no cascade: the hero fades
          // up by CSS on the colour field, and the hand-off to the page runs
          // on a timer.
          if (!isDesktop) {
            const t = window.setTimeout(leaveIntro, INTRO_MOBILE_MS);
            return () => window.clearTimeout(t);
          }

          // Reduced motion: reveal everything immediately, skip the timeline.
          if (reduceMotion) {
            gsap.set("[data-anim]", { autoAlpha: 1, visibility: "visible" });
            leaveIntro();
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
          //
          // Each target fades up to its own resting opacity, read from its
          // Tailwind opacity-NN class, and the inline value is cleared at
          // the end so the class governs again. Tweening everything to 1
          // left labels styled at 50–60% sitting at full ink on desktop
          // while mobile, which skips the timeline, showed them as styled.
          const restingOpacity = (el: Element) => {
            const cls =
              typeof el.className === "string"
                ? el.className
                : (el.getAttribute("class") ?? "");
            const m = /\bopacity-(\d+)\b/.exec(cls);
            return m ? Number(m[1]) / 100 : 1;
          };
          const reveal = (
            targets: Element[],
            from: gsap.TweenVars,
            to: gsap.TweenVars,
            position?: string,
          ) => {
            const clear = [
              "opacity",
              ...(typeof to.clearProps === "string"
                ? to.clearProps.split(",")
                : []),
            ].join(",");
            tl.set(targets, { autoAlpha: 0, ...from }, position);
            tl.to(
              targets,
              {
                ...to,
                autoAlpha: (_i: number, el: Element) => restingOpacity(el),
                clearProps: clear,
              },
              position,
            );
          };

          // Order: the hero writes itself in on the colour field; a short
          // hold; the field becomes the page (leaveIntro); then the mark and
          // everything else in view fade in around the hero.
          // Hero: if the headline is split into .hero-word spans, cascade
          // word-by-word with a blur settle; otherwise reveal as one block.
          const heroWords = pick("[data-anim='hero'] .hero-word");
          const hero = pick("[data-anim='hero']");
          if (heroWords) {
            const wordStart = { y: 14, filter: "blur(8px)" };
            // The words take their hidden start state now, synchronously,
            // before anything unhides their container. Setting it on the
            // timeline instead left a gap: the h1 was unhidden at time 0
            // but the words weren't hidden until their own tween's
            // position, so the whole headline painted for a few frames,
            // vanished, and only then cascaded in.
            gsap.set(heroWords, { autoAlpha: 0, ...wordStart });

            // Hero elements split two ways: containers of word spans are
            // only unhidden (the words carry the cascade); anything else
            // marked hero — the availability eyebrow — reveals as a block
            // alongside the first words.
            const containers = (hero ?? []).filter((el) =>
              el.querySelector(".hero-word"),
            );
            const blocks = (hero ?? []).filter(
              (el) => !el.querySelector(".hero-word"),
            );
            if (containers.length) tl.set(containers, { autoAlpha: 1 }, 0);
            if (blocks.length) {
              reveal(blocks, { y: 4 }, { y: 0, duration: 0.28 }, "-=0.1");
            }
            reveal(
              heroWords,
              wordStart,
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
              blocks.length ? "<" : undefined,
            );
          } else if (hero) {
            reveal(hero, { y: 4 }, { y: 0, duration: 0.28 });
          }

          // The field becomes the page. On a client-side navigation there is
          // no data-intro, so this is a no-op and the rest follows at once.
          const hasIntro = document.documentElement.hasAttribute("data-intro");
          tl.call(leaveIntro, [], hasIntro ? `+=${INTRO_HOLD_S}` : undefined);

          // After the switch: the mark and the settings icon, the hero's own
          // body (availability + CTA) in the same breath, then the remaining
          // in-view body elements, timed to land with the CSS fade of the
          // rows below (INTRO_REST_DELAY_S after the switch).
          const logo = pick("[data-anim='logo']");
          const body = pick("[data-anim='body']") ?? [];
          const heroBody = body.filter((el) => el.closest("#studio"));
          const restBody = body.filter((el) => !el.closest("#studio"));
          if (logo) {
            reveal(
              logo,
              { y: -2 },
              { y: 0, duration: 0.24 },
              hasIntro ? "+=0.15" : undefined,
            );
          }
          if (heroBody.length) {
            reveal(
              heroBody,
              { y: 4 },
              { y: 0, duration: 0.26, stagger: 0.03 },
              logo ? "<0.08" : undefined,
            );
          }
          if (restBody.length) {
            reveal(
              restBody,
              { y: 4 },
              { y: 0, duration: 0.26, stagger: 0.03 },
              hasIntro ? "-=0.1" : "-=0.16",
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
