"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { useAtomValue } from "jotai";
import {
  FADE,
  LINE_TOP,
  LINK,
  LINK_MUTED,
  STUDIO_LEAD,
  indexNumber,
} from "../_lib/canvas";
import { workHref, type Project } from "../_lib/projects";
import { cycleTheme, themeAtom } from "../_lib/theme-state";
import { CanvasClock } from "./CanvasClock";

// The sheet the home routes share. A fixed layer, an eight-pixel margin
// all round: the centre line with the name, the navigation and the
// studio's clock; the six selected works as index numbers; llms.txt and
// the theme toggle along the bottom. The routes draw their content on the
// same sheet underneath it, so the line never moves between views and
// every view has a URL of its own. The engagement pages and the inquiry
// are documents on the same sheet.
//
// Desktop (md and up) is the fixed sheet. Below that the same furniture
// runs as a bar at the top and a footer, and the pages flow between them.

type View =
  | "home"
  | "work"
  | "select"
  | "studio"
  | "inquire"
  | "project"
  | "fractional";

// The documents scroll under the line; the other views fit the sheet.
const DOCUMENTS: View[] = ["studio", "inquire", "project", "fractional"];

function viewOf(pathname: string): View {
  if (pathname.startsWith("/work/")) return "work";
  const top = pathname.split("/")[1];
  if (
    top === "select" ||
    top === "studio" ||
    top === "inquire" ||
    top === "project" ||
    top === "fractional"
  )
    return top;
  return "home";
}

export function CanvasShell({
  projects,
  children,
}: {
  projects: Project[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const view = viewOf(pathname);
  const openIndex =
    view === "work" ? projects.findIndex((p) => workHref(p) === pathname) : -1;
  const open = openIndex >= 0 ? projects[openIndex] : null;
  const prev = open
    ? projects[(openIndex - 1 + projects.length) % projects.length]
    : null;
  const next = open ? projects[(openIndex + 1) % projects.length] : null;
  const featured = projects.slice(0, 6);
  // The line and the bottom line get a band of background wherever
  // something passes behind them: the documents, and the media of an open
  // project.
  const band = DOCUMENTS.includes(view) || view === "work";

  const pctRef = useRef<HTMLSpanElement>(null);
  useIntro(pctRef);

  // Escape backs out to the sheet; the arrows step through the work while
  // a project is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      )
        return;
      if (e.key === "Escape" && view !== "home") router.push("/");
      else if (next && e.key === "ArrowRight") router.push(workHref(next));
      else if (prev && e.key === "ArrowLeft") router.push(workHref(prev));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, prev, next, router]);

  const atHome = view === "home" || view === "work";

  return (
    <div className="flex min-h-svh flex-col text-sm md:block">
      {/* ------------------------------------------------------------ */}
      {/* Desktop: the fixed sheet.                                     */}
      {/* ------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-2 z-10 hidden md:block [&_a,&_button]:pointer-events-auto">
        {/* The selected work, numbered, on a three-by-two grid, each with
            its still beside it on hover. Only on the home sheet: an open
            project's media takes the right half. */}
        {view === "home" &&
          featured.map((p, i) => (
            <Numeral key={p.url} project={p} i={i} active={openIndex === i} />
          ))}

        {/* Previous and next, on the left edge, level with the rows. */}
        {open && prev && next ? (
          <>
            <Link
              href={workHref(prev)}
              aria-label={`Previous: ${prev.title}`}
              style={{ top: "18%" }}
              className={`${LINK_MUTED} ${FADE} absolute left-0 tabular-nums`}
            >
              {indexNumber((openIndex - 1 + projects.length) % projects.length)}
            </Link>
            <Link
              href={workHref(next)}
              aria-label={`Next: ${next.title}`}
              style={{ top: "81%" }}
              className={`${LINK_MUTED} ${FADE} absolute left-0 tabular-nums`}
            >
              {indexNumber((openIndex + 1) % projects.length)}
            </Link>
          </>
        ) : null}

        {/* The centre line. In the open views the links move out to the
            sides and "Close" takes the centre. On the studio the line
            carries a band of background, so the document passes behind. */}
        <div
          className={`absolute inset-x-0 top-[calc(50%-20px)] h-10 pt-[13px] ${
            band ? "bg-background" : ""
          }`}
        >
          <div className="relative grid grid-cols-12 items-start gap-x-5">
            <div className="col-span-2 flex items-start gap-6 whitespace-nowrap">
              <Link href="/" className={LINK}>
                Third Index
              </Link>
              {atHome || view === "select" ? null : (
                <Link href="/select" className={LINK}>
                  Select
                </Link>
              )}
              {atHome || view === "studio" ? null : (
                <Link href="/studio" className={LINK}>
                  Studio
                </Link>
              )}
            </div>

            <div className="canvas-ready absolute left-1/2 top-0 flex -translate-x-1/2 gap-6 whitespace-nowrap">
              {atHome ? (
                <>
                  <Link href="/select" className={LINK}>
                    {open ? open.title : "Select"}
                  </Link>
                  <Link href="/studio" className={LINK}>
                    Studio
                  </Link>
                  <Link href="/inquire" className={LINK}>
                    Inquire
                  </Link>
                </>
              ) : (
                <Link href="/" className={LINK}>
                  Close
                </Link>
              )}
            </div>

            <div className="canvas-ready col-span-4 col-start-9 flex items-start justify-end gap-6 whitespace-nowrap">
              {atHome || view === "inquire" ? null : (
                <Link href="/inquire" className={LINK}>
                  Inquire
                </Link>
              )}
              <CanvasClock />
            </div>
          </div>
        </div>

        {/* The load line: the studio in one sentence where the links will
            be, and a count to 100 where the clock will be. */}
        <div
          aria-hidden
          className={`canvas-loader absolute inset-x-0 ${LINE_TOP} flex items-start justify-end`}
        >
          <p className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap">
            {STUDIO_LEAD}
          </p>
          <span ref={pctRef} className="tabular-nums text-accent">
            0%
          </span>
        </div>

        {/* The bottom line: llms.txt on the left, the theme toggle on the
            right. */}
        <div
          className={`canvas-ready absolute inset-x-0 bottom-0 flex items-end justify-between whitespace-nowrap ${
            band ? "bg-background pt-[13px]" : ""
          }`}
        >
          <a href="/llms.txt" className={LINK_MUTED}>
            llms.txt
          </a>
          <ThemeToggle />
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Narrow: a bar, the page, a footer.                            */}
      {/* ------------------------------------------------------------ */}
      <div className="sticky top-0 z-10 flex items-start justify-between gap-6 bg-background p-3 md:hidden">
        <Link href="/" className={LINK}>
          Third Index
        </Link>
        <nav className="flex gap-6">
          {atHome ? (
            <>
              <Link href="/select" className={LINK}>
                Select
              </Link>
              <Link href="/studio" className={LINK}>
                Studio
              </Link>
              <Link href="/inquire" className={LINK}>
                Inquire
              </Link>
            </>
          ) : (
            <>
              <Link href="/" className={LINK}>
                Close
              </Link>
              {view === "inquire" ? null : (
                <Link href="/inquire" className={LINK}>
                  Inquire
                </Link>
              )}
            </>
          )}
        </nav>
      </div>

      <main className="flex-1 md:flex-none">{children}</main>

      <div className="flex items-end justify-between gap-6 p-3 md:hidden">
        <a href="/llms.txt" className={LINK_MUTED}>
          llms.txt
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------

// One of the six: its index number at its grid position, the still and
// the title beside it while hovered, orange while its project is open.
function Numeral({
  project,
  i,
  active,
}: {
  project: Project;
  i: number;
  active: boolean;
}) {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return (
    <Link
      href={workHref(project)}
      aria-label={`${indexNumber(i)} — ${project.title}`}
      aria-current={active ? "page" : undefined}
      style={
        {
          left: `${25 * (col + 1)}%`,
          top: row === 0 ? "18%" : "81%",
          "--i": i,
        } as CSSProperties
      }
      className={`canvas-ready canvas-numeral group/n absolute tabular-nums outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent ${
        active ? "text-accent" : ""
      }`}
    >
      {indexNumber(i)}
      <span
        aria-hidden
        className="pointer-events-none absolute left-[calc(100%+12px)] top-0 block w-[120px] whitespace-nowrap text-foreground opacity-0 transition-opacity duration-300 group-hover/n:opacity-100 group-focus-visible/n:opacity-100"
      >
        <img
          src={project.thumbnail ?? "/landscape.jpg"}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top"
        />
        <span className="block pt-[3px]">{project.title}</span>
      </span>
    </Link>
  );
}

// Names the mode a click switches to, as a button should: "Light" while
// the page is dark.
function ThemeToggle() {
  const theme = useAtomValue(themeAtom);
  const next = theme === "dark" ? "Light" : "Dark";
  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Switch to ${next.toLowerCase()} (T)`}
      className={LINK_MUTED}
    >
      {next}
    </button>
  );
}

// The load sequence. html[data-intro] is set by the head script before
// first paint; this counts the line's percentage to 100 (after the fonts
// are in, so the serif never swaps mid-count), then hands the sheet over:
// data-intro-out arms the fades, data-intro comes off on the next frame.
// The shell persists across the home routes, so it runs once per load.
function useIntro(pctRef: RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute("data-intro")) return;
    let raf = 0;
    let cancelled = false;
    const DURATION_MS = 1300;

    const leave = () => {
      html.setAttribute("data-intro-out", "");
      requestAnimationFrame(() => {
        html.removeAttribute("data-intro");
        window.setTimeout(() => html.removeAttribute("data-intro-out"), 1500);
      });
    };
    const run = () => {
      if (cancelled) return;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        const v = Math.round((1 - Math.pow(1 - t, 3)) * 100);
        if (pctRef.current) pctRef.current.textContent = `${v}%`;
        if (t < 1) {
          raf = requestAnimationFrame(tick);
          return;
        }
        leave();
      };
      raf = requestAnimationFrame(tick);
    };
    Promise.race([
      document.fonts.ready,
      new Promise((r) => window.setTimeout(r, 1200)),
    ]).then(run);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [pctRef]);
}
