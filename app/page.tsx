"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Clock } from "./_components/Clock";

gsap.registerPlugin(useGSAP, SplitText);

const toneAlphas = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

export default function HomePage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let subtagSplit: SplitText | null = null;
        let ledeSplit: SplitText | null = null;

        gsap.set(".reveal-header", { y: -4 });
        gsap.set(".reveal-logo", { y: 20 });
        gsap.set(".reveal-swatch", { scaleX: 0 });
        gsap.set(".reveal-block", { y: 10 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          paused: true,
        });

        tl.to(".reveal-header", { autoAlpha: 1, y: 0, duration: 0.4 })
          .to(
            ".reveal-logo",
            { autoAlpha: 1, y: 0, duration: 0.75, ease: "power4.out" },
            "-=0.2"
          )
          .to(
            ".reveal-swatch",
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 0.4,
              stagger: 0.04,
            },
            "-=0.5"
          )
          .add("subtagIn", "-=0.25")
          .add("ledeIn", "subtagIn+=0.35")
          .to(
            ".reveal-block",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.06,
            },
            "ledeIn+=0.6"
          );

        document.fonts.ready.then(() => {
          subtagSplit = new SplitText(".reveal-subtag", {
            type: "lines",
            linesClass: "subtag-line",
          });
          ledeSplit = new SplitText(".reveal-lede", {
            type: "lines",
            linesClass: "lede-line",
          });

          gsap.set(".reveal-subtag", { autoAlpha: 1 });
          gsap.set(subtagSplit.lines, { autoAlpha: 0, y: 8 });
          gsap.set(".reveal-lede", { autoAlpha: 1 });
          gsap.set(ledeSplit.lines, { autoAlpha: 0, y: 14 });

          tl.to(
            subtagSplit.lines,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
            },
            "subtagIn"
          );

          tl.to(
            ledeSplit.lines,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.06,
            },
            "ledeIn"
          );

          tl.play();
        });

        return () => {
          subtagSplit?.revert();
          ledeSplit?.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".reveal, .reveal-swatch",
          { opacity: 1, clearProps: "transform" }
        );
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="mx-auto max-w-[1440px] px-5">
      {/* Top bar */}
      <header className="reveal reveal-header flex items-center pt-[13px] font-mono font-light text-[9px] uppercase tracking-[-0.01em]">
        <Clock />
        <span className="pl-2">· open for work</span>
      </header>

      {/* Logo */}
      <section className="pt-[80px] md:pt-[120px] overflow-hidden">
        <Image
          src="/logo.svg"
          alt="third index"
          width={750}
          height={142}
          priority
          className="reveal reveal-logo h-[64px] md:h-[96px] w-auto"
        />
      </section>

      {/* Swatch + sub-tagline */}
      <section className="flex items-start gap-4 md:gap-6 pt-8 md:pt-10">
        <div className="flex h-[36px] md:h-[40px] shrink-0">
          {toneAlphas.map((a) => (
            <div
              key={a}
              style={{ background: `rgba(11,11,11,${a})` }}
              className="reveal-swatch h-full w-[36px] md:w-[40px]"
            />
          ))}
        </div>
        <p className="reveal reveal-subtag font-mono text-[14px] md:text-[16px] leading-[1.16] tracking-[-0.02em] uppercase max-w-[260px] text-balance pt-[2px]">
          a small software studio based in las vegas, nevada
        </p>
      </section>

      {/* Lede */}
      <section className="pt-10 md:pt-14 pb-10 md:pb-14">
        <p className="reveal reveal-lede font-ld font-light text-[20px] md:text-[24px] leading-[1.25] tracking-[-0.02em] text-pretty max-w-[1280px]">
          design and engineering for digital products — interfaces, apps,
          websites, design systems. built for clients and increasingly for the
          studio itself. one principal, one or two engagements at a time.
          creative agencies, venture-backed startups, fintech and web3,
          e-commerce, headless publishing, media. teams that know what they
          want and need someone who can build it.
        </p>
      </section>

      {/* Currently + contact */}
      <section className="grid grid-cols-12 gap-6 py-8 md:py-10">
        <div className="reveal reveal-block col-span-12 md:col-span-4 max-w-[360px]">
          <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink pb-5">
            currently
          </div>
          <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty">
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
        </div>
        <div className="reveal reveal-block col-span-12 md:col-span-5 md:col-start-6 max-w-[360px]">
          <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink pb-5">
            get in touch
          </div>
          <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty pb-5">
            open to new projects, rough ideas, or a conversation. interfaces,
            marketing sites, design systems. full builds or focused engagements.
          </p>
          <div className="flex flex-col gap-1 font-ld font-light text-[15px] md:text-[16px] leading-[1.5]">
            <a
              href="https://cal.com/thirdindex/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent"
            >
              book a call →
            </a>
            <a
              href="mailto:info@thirdindex.co"
              className="text-ink transition-colors duration-200 hover:text-accent"
            >
              info@thirdindex.co
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
