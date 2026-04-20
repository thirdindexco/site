"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, SplitText } from "../_lib/gsap";
import data from "../../public/data.json";

type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  image: string;
};

const projects = data.projects as Project[];

export default function WorkPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let headlineSplit: SplitText | null = null;

        gsap.set(".reveal-eyebrow", { y: 8 });
        gsap.set(".reveal-meta", { y: 6 });
        gsap.set(".reveal-row", { y: 10 });
        gsap.set(".reveal-back", { y: 6 });
        gsap.set(".reveal-colophon", { y: 6 });

        const tl = gsap.timeline({
          defaults: { ease: "premium" },
          paused: true,
        });

        tl.to(
          ".reveal-eyebrow",
          { autoAlpha: 1, y: 0, duration: 0.35 },
          0,
        )
          .addLabel("headlineIn", 0.1)
          .to(
            ".reveal-meta",
            { autoAlpha: 1, y: 0, duration: 0.3 },
            0.45,
          )
          .to(
            ".reveal-row",
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: { each: 0.06, ease: "power2.in" },
            },
            0.55,
          )
          .to(
            ".reveal-back",
            { autoAlpha: 1, y: 0, duration: 0.35 },
            0.9,
          )
          .to(
            ".reveal-colophon",
            { autoAlpha: 1, y: 0, duration: 0.35 },
            1.0,
          );

        document.fonts.ready.then(() => {
          headlineSplit = new SplitText(".reveal-headline", {
            type: "lines",
            mask: "lines",
            linesClass: "headline-line",
          });

          gsap.set(".reveal-headline", { autoAlpha: 1 });
          gsap.set(headlineSplit.lines, { yPercent: 110 });

          tl.to(
            headlineSplit.lines,
            {
              yPercent: 0,
              duration: 0.55,
              stagger: { each: 0.05, ease: "power2.in" },
            },
            "headlineIn",
          );

          tl.play();
        });

        return () => {
          headlineSplit?.revert();
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".reveal", { opacity: 1, clearProps: "transform" });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* Masthead */}
      <section className="pt-16 md:pt-20 pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-0">
        <div className="reveal reveal-eyebrow font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink pb-5">
          selected work.
        </div>
        <h1 className="reveal reveal-headline font-ld font-light text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-pretty max-w-[1164px]">
          a decade of interfaces, platforms, and brands. client work and studio
          products.
        </h1>
      </section>

      {/* Meta row */}
      <section className="reveal reveal-meta flex items-end justify-between pt-10 md:pt-14 pb-6 md:pb-8 pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-[calc(8.33%+18px)] font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink">
        <span>{projects.length.toString().padStart(2, "0")} projects</span>
        <span>2016 — {new Date().getFullYear()}</span>
      </section>

      {/* List */}
      <ol className="border-t border-black/10 ml-5 md:ml-[calc(8.33%+18px)] mr-5 md:mr-[calc(8.33%+18px)]">
        {projects.map((p, i) => (
          <li
            key={p.url}
            className="reveal reveal-row border-b border-black/10"
          >
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-12 gap-6 py-8 md:py-10 items-start"
            >
              <span className="col-span-12 md:col-span-1 font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="col-span-12 md:col-span-5 max-w-[520px]">
                <h2 className="font-ld font-light text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] text-pretty transition-colors duration-200 group-hover:text-accent">
                  {p.title}
                </h2>
                <div className="pt-3 font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-muted">
                  {p.role}
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 max-w-[520px] space-y-4">
                <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty">
                  {p.description}
                </p>
                <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-muted">
                  {p.technologies
                    .split(",")
                    .map((t) => t.trim())
                    .join(" · ")}
                </div>
              </div>

              <span
                aria-hidden
                className="col-span-12 md:col-span-1 md:justify-self-end font-mono text-[14px] text-ink transition-all duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ol>

      {/* Get in touch CTA */}
      <section className="reveal reveal-back pt-16 md:pt-24 pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-[calc(8.33%+18px)] flex flex-col md:flex-row md:items-end md:justify-between gap-y-8">
        <div>
          <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink pb-5 md:pb-6">
            get in touch
          </div>
          <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty max-w-[336px] pb-5">
            seen something you like, or have a project in mind? start a
            conversation — short note, rough brief, or a call.
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
        <Link
          href="/"
          className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent whitespace-nowrap"
        >
          ← back to index
        </Link>
      </section>

      {/* Colophon */}
      <section className="reveal reveal-colophon pt-16 md:pt-24 pb-12 md:pb-16 pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-[calc(8.33%+18px)]">
        <p className="font-ld font-light text-[14px] md:text-[15px] leading-[1.6] tracking-[-0.01em] text-muted max-w-[520px] text-pretty">
          <span className="font-mono font-medium text-[10px] uppercase tracking-[-0.01em] text-ink pr-[6px]">
            third index
          </span>
          a studio practice by{" "}
          <a href="https://ciccarel.li">michael ciccarelli</a>. las vegas,
          nevada, est. 2025.
        </p>
      </section>
    </div>
  );
}
