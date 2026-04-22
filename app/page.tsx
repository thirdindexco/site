"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { InquiryDrawer } from "./_components/InquiryDrawer";
import { Logo } from "./_components/Logo";
import { WeatherTime } from "./_components/WeatherTime";
import data from "../public/data.json";

type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  image: string;
};

const projects = data.projects as Project[];
// Featured (latest) project occupies the top slot; the rest populate the
// expandable work list so nothing repeats.
const [featured, ...moreWork] = projects;
// 8 swatches × 22px = 176px, fills col-span-2 exactly (matches Figma).
// Gradual opacity falloff so the last dot is barely visible.
const swatchAlphas = [1, 0.82, 0.66, 0.5, 0.36, 0.24, 0.14, 0.06];

// Hero copy, split into words so each can animate individually while the
// paragraph still wraps naturally.
const HERO_TEXT =
  "design and engineering for digital products — interfaces, apps, websites, design systems. built for clients and for the studio’s own products. one principal, one or two engagements at a time. creative agencies, venture-backed startups, fintech and web3, e-commerce, headless publishing, media. teams that know what they want and need someone who can build it.";
const heroWords = HERO_TEXT.split(/\s+/);

// shared grid spec — inner grid is centered inside the canvas with an outer margin.
// Everything that "snaps to the grid" (content + overlay) uses this.
const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-4 w-full";

const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const detailVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
  },
  closed: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.15 },
  },
};

function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li variants={itemVariants} className="w-full">
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col"
      >
        <Collapsible.Trigger
          data-state={open ? "open" : "closed"}
          className="group/title outline-none cursor-pointer text-left"
        >
          <span className="font-ld font-light text-3xl md:text-4xl uppercase leading-none tracking-tight opacity-60 group-hover/title:opacity-100 group-data-[state=open]/title:opacity-100 transition-opacity duration-300">
            {project.title}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Panel keepMounted className="collapsible-panel w-full">
          <motion.div
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={detailVariants}
            className="flex flex-col gap-4 pt-4 pb-8"
          >
            <p className="font-ld font-light text-sm leading-snug tracking-tight">
              {project.description}
            </p>
            <div className="flex flex-col gap-0.5">
              <p className="font-mono font-medium text-3xs uppercase tracking-tight opacity-70">
                {project.role}
              </p>
              <p className="font-mono font-light text-3xs tracking-tight opacity-70">
                {project.technologies
                  .split(",")
                  .map((t) => t.trim())
                  .join(" · ")}
              </p>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/visit self-start inline-flex items-center gap-1.5 border-b-2 border-accent px-2 py-1 font-mono font-medium text-3xs uppercase tracking-tight text-foreground transition-colors duration-200 hover:bg-accent hover:text-white hover:border-accent whitespace-nowrap outline-none"
            >
              visit {project.title.toLowerCase()}
              <ArrowUpRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5"
              />
            </a>
          </motion.div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </motion.li>
  );
}

function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div className={`h-full ${GRID}`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="relative h-full bg-accent/[0.04] border-x border-accent/20"
          >
            <span className="absolute left-1.5 top-2 font-mono text-3xs uppercase tracking-wide text-accent/60">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  // Initial value is always "dark" to match SSR output; the real theme
  // (from the pre-hydration script in layout.tsx) is read in an effect below.
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [workOpen, setWorkOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Desktop-only intro choreography. Anchored on the swatches — they reveal
  // from blur, swipe L→R. Then logo + weather radiate outward, then the
  // hero, body, and footer cascade in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.from("[data-anim='swatch']", {
          autoAlpha: 0,
          filter: "blur(6px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power2.out",
          force3D: true,
        })
          .from(
            ["[data-anim='logo']", "[data-anim='weather']"],
            { autoAlpha: 0, y: -8, duration: 0.9 },
            "-=0.4",
          )
          .from(
            "[data-anim='hero-word']",
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.55,
              stagger: 0.015,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .from(
            "[data-anim='body']",
            { autoAlpha: 0, y: 14, duration: 0.95, stagger: 0.12 },
            "-=0.5",
          )
          .from(
            "[data-anim='footer']",
            { autoAlpha: 0, y: 6, duration: 0.8, stagger: 0.08 },
            "-=0.4",
          );
      });
    },
    { scope: rootRef },
  );

  // Hydrate theme state from the attribute set by the pre-hydration script,
  // then follow system changes until the user picks a theme explicitly.
  useEffect(() => {
    const html = document.documentElement;
    const attr = html.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setTheme(attr);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return; // user override wins
      setTheme(e.matches ? "dark" : "light");
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Apply theme to <html> and persist user-selected preference.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setThemePref = (t: "dark" | "light") => {
    try {
      localStorage.setItem("theme", t);
    } catch {}
    setTheme(t);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      )
        return;
      if (e.key.toLowerCase() === "g") setShowGrid((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      ref={rootRef}
      className="relative mx-auto flex min-h-screen max-w-canvas flex-col px-6 md:px-8 xl:px-0"
    >
      {showGrid && <GridOverlay />}

      {/* Header: logo · swatch · weather */}
      <header className={`pt-5 items-center ${GRID}`}>
        {/* Logo — col 1, 176×34 fills col-span-2 exactly */}
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="col-span-6 md:col-span-2 md:col-start-1 block"
        >
          <Logo className="h-7 w-auto md:h-[34px] md:w-[176px]" />
        </Link>

        {/* Theme swatch — col 6, 8 × 22px fills col-span-2 exactly */}
        <button
          type="button"
          onClick={() => setThemePref(isDark ? "light" : "dark")}
          aria-label="toggle theme"
          className="group/theme relative hidden md:col-span-2 md:col-start-6 md:flex cursor-pointer"
        >
          {swatchAlphas.map((a) => (
            <span
              key={a}
              aria-hidden
              data-anim="swatch"
              style={{
                background: `color-mix(in srgb, var(--foreground) ${a * 100}%, transparent)`,
                willChange: "filter, opacity",
              }}
              className="block h-[22px] w-[22px]"
            />
          ))}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-full mt-2 font-mono font-light text-3xs uppercase tracking-tight opacity-0 group-hover/theme:opacity-60 group-focus-visible/theme:opacity-60 transition-opacity duration-200 whitespace-nowrap"
          >
            toggle light / dark
          </span>
        </button>

        {/* Weather + email — col 11 on desktop, right-aligned on mobile */}
        <div
          data-anim="weather"
          className="col-span-6 md:col-span-2 md:col-start-11 flex flex-col items-end md:items-start text-right md:text-left font-mono font-light text-3xs uppercase tracking-wide"
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
        {/* Lede — left-aligned, full grid width, 24px on desktop */}
        <section className={`pt-16 md:pt-24 lg:pt-28 ${GRID}`}>
          <p className="col-span-12 font-ld font-light text-lg md:text-xl lg:text-2xl leading-snug tracking-tight">
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
        <section className={`pt-16 md:pt-24 lg:pt-28 ${GRID}`}>
          {/* Latest + work — cols 1-4 on desktop */}
          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-1"
          >
            <Collapsible.Root
              open={workOpen}
              onOpenChange={setWorkOpen}
              className="flex flex-col w-full"
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
              <Collapsible.Trigger className="group mt-5 inline-flex items-center gap-1.5 font-mono font-medium text-3xs uppercase tracking-tight transition-colors hover:text-accent outline-none cursor-pointer self-start">
                <span className="group-data-[panel-open]:hidden">
                  view more projects
                </span>
                <span className="hidden group-data-[panel-open]:inline">
                  hide projects
                </span>
                <Plus
                  aria-hidden
                  className="h-3 w-3 group-data-[panel-open]:hidden"
                />
                <Minus
                  aria-hidden
                  className="h-3 w-3 hidden group-data-[panel-open]:inline"
                />
              </Collapsible.Trigger>

              <Collapsible.Panel
                keepMounted
                className="collapsible-panel w-full"
              >
                <motion.ol
                  initial="closed"
                  animate={workOpen ? "open" : "closed"}
                  variants={listVariants}
                  className="flex flex-col pt-9"
                >
                  {moreWork.map((p) => (
                    <ProjectRow key={p.url} project={p} />
                  ))}
                </motion.ol>
              </Collapsible.Panel>
            </Collapsible.Root>
          </div>

          {/* Inquiries — cols 8-11 (Figma spec: x=824 = col 8 start) */}
          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-8 pt-12 md:pt-0"
          >
            <div className="font-mono font-medium text-3xs uppercase tracking-tight">
              inquiries
            </div>
            <p className="font-ld font-light text-base leading-tight tracking-tight pt-9">
              interfaces, marketing sites, design systems. full builds or
              focused engagements, from a few weeks to a few months. open to
              rough ideas.
            </p>
            <div className="flex flex-col items-start gap-3 pt-8">
              <div className="flex flex-col lg:flex-row lg:items-center items-start gap-3 lg:gap-5">
                <button
                  type="button"
                  onClick={() => setInquiryOpen(true)}
                  className="group/cta self-start inline-flex items-center gap-1.5 border-b-2 border-accent px-2 py-1 font-mono font-medium text-3xs uppercase tracking-tight text-foreground transition-colors duration-200 hover:bg-accent hover:text-white hover:border-accent whitespace-nowrap cursor-pointer outline-none"
                >
                  start an inquiry
                  <ArrowRight
                    aria-hidden
                    className="h-3 w-3 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                  />
                </button>
                <a
                  href="https://cal.com/thirdindex/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-3xs uppercase tracking-tight text-foreground opacity-60 transition-opacity hover:opacity-100 whitespace-nowrap outline-none"
                >
                  book a call
                </a>
              </div>
              <a
                href="mailto:info@thirdindex.co"
                className="font-mono font-light text-3xs uppercase tracking-tight opacity-60 transition-opacity hover:opacity-100 whitespace-nowrap"
              >
                or email info@thirdindex.co
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — copyright at col 1 · tagline at col 8 (stacked on mobile) */}
      <footer className={`pt-16 md:pt-24 lg:pt-28 pb-5 ${GRID}`}>
        <p
          data-anim="footer"
          className="col-span-12 md:col-span-4 md:col-start-1 font-mono font-light text-3xs uppercase tracking-wide opacity-80"
        >
          © 2026 third index llc
        </p>
        <p
          data-anim="footer"
          className="col-span-12 md:col-span-5 md:col-start-8 pt-2 md:pt-0 font-mono font-light text-3xs uppercase tracking-wide opacity-80"
        >
          a small studio based in the mojave desert
        </p>
      </footer>

      <InquiryDrawer open={inquiryOpen} onOpenChange={setInquiryOpen} />
    </div>
  );
}
