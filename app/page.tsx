"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, SplitText } from "./_lib/gsap";

const toneAlphas = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let subtagSplit: SplitText | null = null;
        let ledeSplit: SplitText | null = null;

        gsap.set(".reveal-swatch", { scaleX: 0 });
        gsap.set(".reveal-block", { y: 10 });

        const tl = gsap.timeline({
          defaults: { ease: "premium" },
          paused: true,
        });

        tl.to(
          ".reveal-swatch",
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.35,
            stagger: { each: 0.035, from: "center" },
          },
          0,
        )
          .fromTo(
            ".swatch-sheen",
            { xPercent: -100, autoAlpha: 0 },
            {
              xPercent: 160,
              autoAlpha: 1,
              duration: 0.55,
              ease: "power2.inOut",
            },
            0.25,
          )
          .to(
            ".swatch-sheen",
            { autoAlpha: 0, duration: 0.18, ease: "power2.out" },
            0.68,
          )
          .addLabel("subtagIn", 0.2)
          .addLabel("ledeIn", 0.42)
          .to(
            ".reveal-block",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: { each: 0.05, ease: "power2.in" },
            },
            0.75,
          );

        document.fonts.ready.then(() => {
          subtagSplit = new SplitText(".reveal-subtag", {
            type: "lines",
            mask: "lines",
            linesClass: "subtag-line",
          });
          ledeSplit = new SplitText(".reveal-lede", {
            type: "lines",
            mask: "lines",
            linesClass: "lede-line",
          });

          gsap.set(".reveal-subtag, .reveal-lede", { autoAlpha: 1 });
          gsap.set([...subtagSplit.lines, ...ledeSplit.lines], {
            yPercent: 110,
          });

          tl.to(
            subtagSplit.lines,
            {
              yPercent: 0,
              duration: 0.45,
              stagger: { each: 0.04, ease: "power2.in" },
            },
            "subtagIn",
          );

          tl.to(
            ledeSplit.lines,
            {
              yPercent: 0,
              duration: 0.55,
              stagger: { each: 0.04, ease: "power2.in" },
            },
            "ledeIn",
          );

          tl.play();
        });

        return () => {
          subtagSplit?.revert();
          ledeSplit?.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal, .reveal-swatch", {
          opacity: 1,
          clearProps: "transform,filter",
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* Swatch + sub-tagline */}
      <section className="flex items-center gap-[20px] md:gap-5 pt-4 md:pt-8 pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-0">
        <div className="swatch-strip flex h-[22px] md:h-[27.125px] shrink-0 overflow-hidden">
          {toneAlphas.map((a) => (
            <div
              key={a}
              style={{ background: `rgba(11,11,11,${a})` }}
              className="reveal-swatch h-full w-[21.375px] md:w-[27.125px]"
            />
          ))}
          <div className="swatch-sheen" aria-hidden />
        </div>
        <p className="reveal reveal-subtag font-mono font-light text-[9px] md:text-[11px] leading-[1.2] md:leading-[1.16] tracking-[-0.02em] md:tracking-[-0.01em] uppercase max-w-[137px] md:max-w-[171px] text-balance">
          a small studio in the mojave desert
        </p>
      </section>

      {/* Lede */}
      <section className="pt-20 md:pt-16 pb-16 md:pb-20 pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-0">
        <p className="reveal reveal-lede font-ld font-light text-[16px] md:text-[24px] leading-[1.25] tracking-[-0.01em] md:tracking-[-0.02em] text-pretty max-w-[1164px]">
          design and engineering for digital products — interfaces, apps,
          websites, design systems. built for clients and for the studio&rsquo;s
          own products. one principal, one or two engagements at a time.
          creative agencies, venture-backed startups, fintech and web3,
          e-commerce, headless publishing, media. teams that know what they want
          and need someone who can build it.
        </p>
      </section>

      {/* Currently + contact */}
      <section className="grid grid-cols-12 gap-y-8 md:gap-y-0 pb-8 md:pb-10">
        <div className="reveal reveal-block col-span-12 col-start-1 px-5 md:col-span-4 md:col-start-2 md:row-start-1 md:px-0 md:pl-[17px]">
          <div className="max-w-[336px]">
            <div className="flex items-center justify-between pb-5 md:pb-6">
              <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink">
                currently
              </div>
              <Link
                href="/work"
                className="md:hidden font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent whitespace-nowrap"
              >
                selected work →
              </Link>
            </div>
            <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty md:pb-5">
              working on{" "}
              <a
                href="https://bankroll.fyi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-solid underline-offset-[3px] transition-colors duration-200 hover:text-accent"
              >
                bankroll.fyi
              </a>{" "}
              — bankroll management for poker players and sports bettors. log
              sessions in natural language, track variance and roi across games,
              and see where your money actually comes from.
            </p>
            <Link
              href="/work"
              className="hidden md:inline-block font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent whitespace-nowrap"
            >
              selected work →
            </Link>
          </div>
        </div>
        <div className="reveal reveal-block col-span-12 col-start-1 px-5 md:col-span-4 md:col-start-6 md:row-start-1 md:px-0 md:pl-[12px]">
          <div className="max-w-[336px]">
            <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink pb-5 md:pb-6">
              get in touch
            </div>
            <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty pb-5">
              open to new projects, rough ideas, or a conversation. interfaces,
              marketing sites, design systems. full builds or focused
              engagements, from a few weeks to a few months.
            </p>
            <div className="flex flex-col gap-[6px]">
              <a
                href="mailto:info@thirdindex.co"
                className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent whitespace-nowrap"
              >
                info@thirdindex.co
              </a>
              <a
                href="https://cal.com/thirdindex/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-accent transition-colors duration-200 hover:text-ink whitespace-nowrap"
              >
                book a call →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
