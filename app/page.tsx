import Link from "next/link";
import { Fragment } from "react";
import { AnimRoot } from "./_components/AnimRoot";
import { InquiryCTA } from "./_components/InquiryCTA";
import { Logo } from "./_components/Logo";
import { MoreWorkList, type Project } from "./_components/MoreWorkList";
import { ThemeShortcuts } from "./_components/ThemeShortcuts";
import { ThemeSwatch } from "./_components/ThemeSwatch";
import { WeatherTime } from "./_components/WeatherTime";
import data from "../public/data.json";

const projects = data.projects as Project[];
// Featured (latest) project occupies the top slot; the rest populate the
// expandable work list so nothing repeats.
const [featured, ...moreWork] = projects;

// Hero copy, split into words so each can animate individually while the
// paragraph still wraps naturally.
const HERO_TEXT =
  "design and engineering for digital products — interfaces, applications, and the systems behind them. one principal, end-to-end, with full-stack depth. fintech, commerce, media, and emerging tech. built for clients and original products.";
const heroWords = HERO_TEXT.split(/\s+/);
// Italicized phrases in the hero. Matched against the split word list by index
// so each span can still animate independently.
const italicWordIndices = new Set([4, 5, 7, 8, 11]);

// Shared grid spec — inner grid is centered inside the canvas with an outer
// margin. Everything that "snaps to the grid" uses this.
const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-4 w-full";

export default function HomePage() {
  return (
    <AnimRoot className="relative mx-auto flex min-h-screen max-w-canvas flex-col px-6 md:px-8 xl:px-0">
      <ThemeShortcuts />
      {/* Header: logo · swatch · weather */}
      <header className={`pt-5 md:pt-10 lg:pt-16 items-center ${GRID}`}>
        {/* Logo — col 1, 176×34 fills col-span-2 exactly */}
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="col-span-6 md:col-span-2 md:col-start-1 block"
        >
          <Logo className="h-7 w-auto md:h-[34px] md:w-[176px]" />
        </Link>

        <ThemeSwatch className="hidden md:col-span-2 md:col-start-6 md:flex" />

        {/* Weather — col 11 on desktop, time on top · weather on bottom, right-aligned */}
        <div
          data-anim="weather"
          className="col-span-6 md:col-span-2 md:col-start-11 flex flex-col gap-px items-end text-right font-mono font-light text-2xs uppercase tracking-wide"
        >
          <WeatherTime />
        </div>
      </header>

      {/* Mobile-only swatch row — sits below the header, left-aligned to the
          logo, above the hero. */}
      <ThemeSwatch className="md:hidden flex mt-4" />

      <main className="flex-1">
        {/* Lede — left-aligned, full grid width */}
        <section className={`pt-8 md:pt-24 lg:pt-28 ${GRID}`}>
          <p className="col-span-12 font-ld font-light text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight lg:text-pretty">
            {heroWords.map((word, i) => (
              <Fragment key={i}>
                <span
                  data-anim="hero-word"
                  className={`inline-block ${italicWordIndices.has(i) ? "italic" : ""}`}
                >
                  {word}
                </span>
                {i < heroWords.length - 1 && " "}
              </Fragment>
            ))}
          </p>
        </section>

        {/* Body — latest+work at col 1 · inquiries at col 8 */}
        <section className={`pt-8 md:pt-14 lg:pt-16 ${GRID}`}>
          {/* Latest + work — cols 1-4 on desktop */}
          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-1"
          >
            <div className="font-mono font-medium text-3xs uppercase tracking-tight">
              latest
            </div>
            <p className="font-ld font-light text-base leading-tight tracking-tight pt-9">
              working on{" "}
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
              >
                {featured.title.toLowerCase()}
              </a>{" "}
              — {featured.description}
            </p>
            <MoreWorkList projects={moreWork} />
          </div>

          {/* Inquiries — cols 8-11 */}
          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-8 pt-8 md:pt-0"
          >
            <div className="font-mono font-medium text-3xs uppercase tracking-tight">
              inquiries
            </div>
            <p className="font-ld font-light text-base leading-tight tracking-tight pt-9">
              open to new projects, rough ideas, or a conversation. MVPs,
              prototypes, and production systems — designed and built together.
              project work, retainers, or fractional engagements.
            </p>
            <InquiryCTA />
          </div>
        </section>
      </main>

      {/* Footer — tagline at col 1 · copyright at col 11 right-aligned (stacked on mobile) */}
      <footer className={`pt-12 md:pt-24 lg:pt-28 pb-5 ${GRID} gap-0`}>
        <p
          data-anim="footer"
          className="col-span-12 lg:col-span-7 lg:col-start-1 font-mono font-light text-2xs uppercase tracking-wide opacity-50"
        >
          an independent studio by{" "}
          <a
            href="https://ciccarel.li"
            target="_blank"
            rel="noopener noreferrer"
          >
            michael ciccarelli
          </a>
        </p>
        <p
          data-anim="footer"
          className="col-span-12 lg:col-span-2 lg:col-start-11 pt-2 lg:pt-0 font-mono font-light text-2xs uppercase tracking-wide opacity-50 lg:text-right"
        >
          © 2026 third index llc
        </p>
      </footer>
    </AnimRoot>
  );
}
