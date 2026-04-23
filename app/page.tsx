import Link from "next/link";
import { Fragment } from "react";
import { AnimRoot } from "./_components/AnimRoot";
import { InquiryCTA } from "./_components/InquiryCTA";
import { Logo } from "./_components/Logo";
import { MoreWorkList, type Project } from "./_components/MoreWorkList";
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
  "design and engineering for digital products — interfaces, apps, websites, design systems. built for clients and for the studio's own products. creative agencies, venture-backed startups, fintech and web3, e-commerce, headless publishing, media. teams that know what they want and need someone who can build it.";
const heroWords = HERO_TEXT.split(/\s+/);

// Shared grid spec — inner grid is centered inside the canvas with an outer
// margin. Everything that "snaps to the grid" uses this.
const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-4 w-full";

export default function HomePage() {
  return (
    <AnimRoot className="relative mx-auto flex min-h-screen max-w-canvas flex-col px-6 md:px-8 xl:px-0">
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

        <ThemeSwatch />

        {/* Weather + email — col 11 on desktop, right-aligned on mobile */}
        <div
          data-anim="weather"
          className="col-span-6 md:col-span-2 md:col-start-11 flex flex-col gap-px items-end md:items-start text-right md:text-left font-mono font-light text-2xs uppercase tracking-wide"
        >
          <span>
            <WeatherTime />
          </span>
          <a
            href="mailto:info@thirdindex.co"
            className="transition-colors hover:text-accent"
          >
            e: info@thirdindex.co
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Lede — left-aligned, full grid width */}
        <section className={`pt-16 md:pt-24 lg:pt-28 ${GRID}`}>
          <p className="col-span-12 font-ld font-light text-lg md:text-xl lg:text-3xl leading-tight tracking-tighter">
            {heroWords.map((word, i) => (
              <Fragment key={i}>
                <span data-anim="hero-word" className="inline-block">
                  {word}
                </span>
                {i < heroWords.length - 1 && " "}
              </Fragment>
            ))}
          </p>
        </section>

        {/* Body — latest+work at col 1 · inquiries at col 8 */}
        <section className={`pt-10 md:pt-14 lg:pt-16 ${GRID}`}>
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
            className="col-span-12 md:col-span-4 md:col-start-8 pt-12 md:pt-0"
          >
            <div className="font-mono font-medium text-3xs uppercase tracking-tight">
              inquiries
            </div>
            <p className="font-ld font-light text-base leading-tight tracking-tight pt-9">
              one principal, one or two engagements at a time. interfaces,
              marketing sites, design systems. full builds or focused
              engagements, from a few weeks to a few months.
            </p>
            <InquiryCTA />
          </div>
        </section>
      </main>

      {/* Footer — copyright at col 1 · tagline at col 8 (stacked on mobile) */}
      <footer className={`pt-16 md:pt-24 lg:pt-28 pb-5 ${GRID}`}>
        <p
          data-anim="footer"
          className="col-span-12 md:col-span-4 md:col-start-1 font-mono font-light text-2xs uppercase tracking-wide opacity-80"
        >
          © 2026 third index llc
        </p>
        <p
          data-anim="footer"
          className="col-span-12 md:col-span-5 md:col-start-8 pt-2 md:pt-0 font-mono font-light text-2xs uppercase tracking-wide opacity-80"
        >
          a small studio in the mojave desert
        </p>
      </footer>
    </AnimRoot>
  );
}
