"use client";

import Link from "next/link";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { useAtom } from "jotai";
import { Switch } from "@base-ui-components/react/switch";
import { ArrowUpRight, Settings2, X } from "lucide-react";
import { AnimRoot } from "./_components/AnimRoot";
import { InquiryCTA } from "./_components/InquiryCTA";
import { Logo } from "./_components/Logo";
import { MonogramMark } from "./_components/MonogramMark";
import { ThemeSwatch } from "./_components/ThemeSwatch";
import { ThemeShortcuts } from "./_components/ThemeShortcuts";
import { WorkInquiryCTA } from "./_components/WorkInquiryCTA";
import { setTheme, themeAtom, type Theme } from "./_lib/theme-state";
import data from "../public/data.json";

type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  thumbnail?: string;
  video?: string;
};

const projects = data.projects as Project[];

// Hero copy, split into words so each can animate individually while the
// paragraph still wraps naturally.
const HERO_TEXT =
  "a software design and engineering studio for teams that need sharp product thinking and production-grade execution. from early ideas to production.";
const heroWords = HERO_TEXT.split(/\s+/);
// Italicized phrases in the hero. Matched against the split word list by index
// so each span can still animate independently.
const italicWordIndices = new Set([10, 14]);

// Shared grid spec — inner grid is centered inside the canvas with an outer
// margin. Everything that "snaps to the grid" uses this.
const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-4 w-full";
const themes: Theme[] = ["light", "dark", "accent"];

const WMO_MAP: Record<number, string> = {
  0: "CLEAR",
  1: "MOSTLY CLEAR",
  2: "PARTLY CLOUDY",
  3: "OVERCAST",
  45: "FOG",
  48: "FOG",
  51: "DRIZZLE",
  53: "DRIZZLE",
  55: "DRIZZLE",
  61: "RAIN",
  63: "RAIN",
  65: "HEAVY RAIN",
  71: "SNOW",
  73: "SNOW",
  75: "HEAVY SNOW",
  95: "STORM",
  96: "STORM",
  99: "STORM",
};

function ThemeControls() {
  const [theme] = useAtom(themeAtom);

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      {themes.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => setTheme(mode)}
          aria-pressed={theme === mode}
          className="group inline-flex h-6 items-center gap-1.5 border border-white/20 px-2 font-mono text-3xs uppercase tracking-tight text-zinc-400 transition-colors hover:border-white/45 hover:bg-zinc-800 hover:text-zinc-100 aria-pressed:border-zinc-100 aria-pressed:bg-zinc-100 aria-pressed:text-zinc-950"
        >
          <span
            aria-hidden
            className="h-2.5 w-2.5 border border-current"
            style={{
              background:
                mode === "light"
                  ? "#fafafa"
                  : mode === "dark"
                    ? "#0b0b0b"
                    : "#0000ff",
            }}
          />
          {mode}
        </button>
      ))}
    </div>
  );
}

function FooterWeather() {
  const [timeLine, setTimeLine] = useState("--- · --:-- --");
  const [weatherLine, setWeatherLine] = useState("—");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const day = now
        .toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "America/Los_Angeles",
        })
        .toLowerCase();
      const time = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          timeZone: "America/Los_Angeles",
        })
        .toLowerCase();
      setTimeLine(`${day} · ${time}`);
    };

    const updateWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=36.1699&longitude=-115.1398&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Los_Angeles",
        );
        if (!res.ok) return;
        const weather = await res.json();
        const temp = Math.round(weather.current.temperature_2m);
        const condition =
          WMO_MAP[weather.current.weather_code as number] ?? "CLEAR";
        setWeatherLine(`${temp}°f · ${condition}`);
      } catch {
        setWeatherLine("—");
      }
    };

    updateTime();
    void updateWeather();
    const timeInterval = setInterval(updateTime, 60_000);
    const weatherInterval = setInterval(updateWeather, 600_000);
    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-px font-mono text-2xs font-light uppercase tracking-wide">
      <span suppressHydrationWarning>{timeLine}</span>
      <span suppressHydrationWarning>{weatherLine}</span>
    </div>
  );
}

function GridDebugSwitch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 font-mono text-3xs uppercase tracking-tight text-zinc-400">
      <span>grid</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative inline-flex h-6 w-10 items-center border border-white/20 text-zinc-400 outline-none transition-colors hover:border-white/45 data-[checked]:border-zinc-100 data-[checked]:bg-zinc-100 data-[checked]:text-zinc-950 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-zinc-100"
      >
        <Switch.Thumb className="block h-4 w-4 translate-x-1 bg-current transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-[checked]:translate-x-5" />
      </Switch.Root>
    </label>
  );
}

function SettingsPanel({
  gridDebug,
  setGridDebug,
  settingsOpen,
}: {
  gridDebug: boolean;
  setGridDebug: (checked: boolean) => void;
  settingsOpen: boolean;
}) {
  return (
    <div
      inert={!settingsOpen}
      aria-hidden={!settingsOpen}
      className={`relative left-1/2 grid w-screen -translate-x-1/2 overflow-hidden bg-[color:var(--settings-surface)] px-4 text-zinc-400 transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none md:px-6 ${
        settingsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0">
        <div className={`${GRID} items-center py-3 md:py-3.5`}>
          <div className="col-span-12 flex flex-wrap items-center justify-end gap-3 md:col-span-6 md:col-start-7">
            <GridDebugSwitch
              checked={gridDebug}
              onCheckedChange={setGridDebug}
            />
            <ThemeControls />
          </div>
        </div>
      </div>
    </div>
  );
}

function GridDebugger({
  enabled,
  settingsOpen,
}: {
  enabled: boolean;
  settingsOpen: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [measurements, setMeasurements] = useState({
    viewport: 0,
    container: 0,
    column: 0,
    columns: 4,
    gutter: 16,
  });

  useEffect(() => {
    if (!enabled) return;

    const measure = () => {
      const container = gridRef.current?.getBoundingClientRect().width ?? 0;
      const gutter = 16;
      const columns = window.innerWidth >= 768 ? 12 : 4;
      const column =
        container > 0 ? (container - gutter * (columns - 1)) / columns : 0;
      setMeasurements({
        viewport: window.innerWidth,
        container,
        column,
        columns,
        gutter,
      });
    };

    measure();
    const observer =
      typeof ResizeObserver !== "undefined" && gridRef.current
        ? new ResizeObserver(measure)
        : null;
    if (gridRef.current) observer?.observe(gridRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, settingsOpen]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-0 z-50 overflow-hidden xl:px-0 ${
        settingsOpen
          ? "left-[12px] right-[12px] top-[48px] px-4 md:left-[18px] md:right-[18px] md:top-[52px] md:px-6"
          : "inset-0 px-6 md:px-8"
      }`}
    >
      <div
        ref={gridRef}
        className="relative mx-auto grid h-full max-w-grid grid-cols-4 gap-4 md:grid-cols-12"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-pink-500/70" />
        <div className="absolute inset-y-0 right-0 w-px bg-pink-500/70" />
        <div className="absolute right-0 top-2 z-10 flex gap-2 bg-pink-500 px-1.5 py-1 font-mono text-[9px] uppercase leading-none text-white">
          <span>vp {Math.round(measurements.viewport)}px</span>
          <span>ct {Math.round(measurements.container)}px</span>
          <span>cols {measurements.columns}</span>
          <span>col {Math.round(measurements.column)}px</span>
          <span>gut {measurements.gutter}px</span>
        </div>
        {Array.from({ length: measurements.columns }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-pink-500/10 outline outline-1 -outline-offset-1 outline-pink-500/35"
          />
        ))}
      </div>
    </div>
  );
}

function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<{
    project: Project;
    index: number;
    x: number;
    y: number;
  } | null>(null);

  const updateTooltipPosition = (
    event: PointerEvent<HTMLAnchorElement>,
    project: Project,
    index: number,
  ) => {
    if (event.pointerType !== "mouse") return;
    setHoveredProject({
      project,
      index,
      x: event.clientX,
      y: event.clientY,
    });
  };

  return (
    <section className="pt-12 md:pt-24 lg:pt-32">
      <div className={GRID}>
        <div
          data-anim="body"
          className="col-span-12 font-mono font-medium text-3xs uppercase tracking-tight md:col-span-10 md:col-start-2"
        >
          work
        </div>
      </div>
      <div className="mt-5 flex flex-col">
        {projects.map((project, index) => (
          <article
            key={project.url}
            data-anim="body"
            className="min-h-[80vh] py-6 md:py-8 lg:py-10"
          >
            <div className={`${GRID} min-h-[calc(80vh-5rem)] content-center`}>
              <div className="col-span-12">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`visit ${project.title}`}
                  onPointerEnter={(event) =>
                    updateTooltipPosition(event, project, index)
                  }
                  onPointerMove={(event) =>
                    updateTooltipPosition(event, project, index)
                  }
                  onPointerLeave={() => setHoveredProject(null)}
                  className="group block border border-[color:var(--panel-border)] py-6 outline-none transition-colors hover:border-[color:color-mix(in_srgb,var(--foreground)_22%,transparent)] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] md:py-10 lg:py-14"
                >
                  <ProjectMedia project={project} />
                </a>

                <div className="pt-5 md:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-ld text-4xl font-light uppercase leading-[0.9] tracking-tight">
                      {project.title}
                    </h2>
                    <span className="shrink-0 font-mono text-3xs uppercase tracking-tight opacity-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="pt-4 font-ld text-base font-light leading-tight tracking-tight">
                    {project.description}
                  </p>
                  <p className="pt-4 font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
                    {project.role}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/visit mt-4 inline-flex items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
                  >
                    visit
                    <ArrowUpRight
                      aria-hidden
                      className="h-3 w-3 transition-transform duration-200 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {hoveredProject ? (
        <ProjectHoverTooltip
          project={hoveredProject.project}
          index={hoveredProject.index}
          x={hoveredProject.x}
          y={hoveredProject.y}
        />
      ) : null}
    </section>
  );
}

function ProjectHoverTooltip({
  project,
  index,
  x,
  y,
}: {
  project: Project;
  index: number;
  x: number;
  y: number;
}) {
  const tooltipOffset = 8;
  const left =
    typeof window === "undefined"
      ? x
      : Math.max(16, Math.min(x + tooltipOffset, window.innerWidth - 296));
  const hasRoomAbove = y > 190;
  const top = hasRoomAbove ? y - tooltipOffset : y + tooltipOffset;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[60] hidden max-w-[280px] border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 shadow-[0_8px_24px_rgba(0,0,0,0.24)] md:block"
      style={{
        left,
        top,
        transform: hasRoomAbove ? "translateY(-100%)" : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-3xs font-medium uppercase tracking-tight">
          {project.title}
        </p>
        <span className="shrink-0 font-mono text-3xs uppercase tracking-tight text-zinc-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="pt-2 font-ld text-sm font-light leading-tight tracking-tight text-zinc-200">
        {project.description}
      </p>
      <div className="flex flex-col gap-1 pt-3 font-mono text-3xs tracking-tight text-zinc-500">
        <p className="font-medium uppercase">{project.role}</p>
        <p>
          {project.technologies
            .split(",")
            .map((t) => t.trim())
            .join(" / ")}
        </p>
      </div>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(error);
    });
  };

  useEffect(() => {
    if (!project.video) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          playVideo();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [project.video]);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    playVideo();
  }, [shouldLoadVideo]);

  return (
    <span
      ref={containerRef}
      className="grid min-h-[48vh] grid-cols-4 items-center gap-4 px-6 md:min-h-[62vh] md:grid-cols-12 md:px-8 xl:px-0"
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={shouldLoadVideo ? project.video : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={playVideo}
          aria-hidden="true"
          className="col-span-4 h-auto max-h-[58vh] w-full object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-100 md:col-span-10 md:col-start-2 md:max-h-[66vh]"
        />
      ) : (
        <img
          src={project.thumbnail ?? "/landscape.jpg"}
          alt=""
          className="col-span-4 h-auto max-h-[58vh] w-full object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-100 md:col-span-10 md:col-start-2 md:max-h-[66vh]"
        />
      )}
    </span>
  );
}

export default function HomePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gridDebug, setGridDebug] = useState(false);

  useEffect(() => {
    if (!settingsOpen) return;

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
    };
  }, [settingsOpen]);

  const dismissSettingsFromPage = (event: MouseEvent<HTMLElement>) => {
    if (!settingsOpen) return;
    event.preventDefault();
    event.stopPropagation();
    setSettingsOpen(false);
  };

  const toggleSettings = () => {
    if (settingsOpen) {
      setSettingsOpen(false);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setSettingsOpen(true);
  };

  return (
    <AnimRoot
      className={`relative mx-auto flex min-h-screen flex-col [--settings-surface:#09090b] border-[color:var(--settings-surface)] transition-[max-width,border-width,padding] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${
        settingsOpen
          ? "max-w-none border-l-[12px] border-r-[12px] px-4 md:border-l-[18px] md:border-r-[18px] md:px-6"
          : "max-w-canvas border-0 px-6 md:px-8 xl:px-0"
      }`}
    >
      <ThemeShortcuts />
      <GridDebugger enabled={gridDebug} settingsOpen={settingsOpen} />
      <SettingsPanel
        gridDebug={gridDebug}
        setGridDebug={setGridDebug}
        settingsOpen={settingsOpen}
      />

      <header
        onClickCapture={dismissSettingsFromPage}
        className={`relative items-center pt-5 md:pt-10 lg:pt-16 ${GRID}`}
      >
        <Link
          href="/"
          aria-label="third index — home"
          data-anim="logo"
          className="col-span-8 col-start-3 flex justify-center md:col-span-4 md:col-start-5"
        >
          <Logo className="h-7 w-auto md:h-[34px] md:w-[176px]" />
        </Link>

        <button
          type="button"
          onClick={toggleSettings}
          aria-label={settingsOpen ? "close settings" : "open settings"}
          aria-expanded={settingsOpen}
          data-anim="weather"
          className="col-span-1 col-start-12 row-start-1 inline-flex h-8 w-8 items-center justify-center justify-self-end outline-none transition-colors hover:text-accent focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)]"
        >
          {settingsOpen ? (
            <X aria-hidden className="h-4 w-4" />
          ) : (
            <Settings2 aria-hidden className="h-4 w-4" />
          )}
        </button>
      </header>

      <main onClickCapture={dismissSettingsFromPage} className="flex-1">
        {/* Lede — left-aligned, full grid width */}
        <section className={`pt-8 md:pt-24 lg:pt-28 ${GRID}`}>
          <p className="col-span-12 md:col-span-10 md:col-start-2 font-ld font-light text-xl md:text-3xl leading-snug tracking-tight md:text-pretty">
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

        {/* Body — about at col 2 · inquiries at col 8 */}
        <section className={`pt-8 md:pt-14 lg:pt-16 ${GRID}`}>
          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-2"
          >
            <div className="font-mono font-medium text-3xs uppercase tracking-tight">
              about
            </div>
            <p className="font-ld font-light text-base leading-tight tracking-tight pt-9">
              studio led by{" "}
              <a
                href="https://ciccarel.li"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-solid underline-offset-2 transition-colors hover:text-accent"
              >
                michael ciccarelli
              </a>{" "}
              — 20+ years building for the web across fintech, commerce, media,
              and emerging tech. one principal, directly involved in every
              engagement, with a small network of trusted collaborators when
              needed.
            </p>
          </div>

          <div
            data-anim="body"
            className="col-span-12 md:col-span-4 md:col-start-8 pt-8 md:pt-0"
          >
            <div className="font-mono font-medium text-3xs uppercase tracking-tight">
              inquiries
            </div>
            <p className="font-ld font-light text-base leading-tight tracking-tight pt-9">
              open to new projects and conversations. from mvp to production
              systems — and the product decisions between them. structured as a
              partnership, not a handoff. available for focused builds, ongoing
              work, or fractional support.
            </p>
            <InquiryCTA />
          </div>
        </section>

        <ProjectShowcase projects={projects} />
        <WorkInquiryCTA />
      </main>

      <footer
        onClickCapture={dismissSettingsFromPage}
        className={`mt-14 pt-16 pb-16 md:mt-24 md:pt-24 md:pb-24 lg:mt-32 lg:pt-32 lg:pb-32 ${GRID}`}
      >
        <div
          data-anim="footer"
          className="col-span-12 border-t border-[color:var(--panel-border)] pt-6 md:pt-8"
        />

        <div
          data-anim="footer"
          className="col-span-12 flex justify-start md:col-span-2 md:col-start-1"
        >
          <ThemeSwatch className="flex" />
        </div>

        <div
          data-anim="footer"
          className="col-span-12 pt-10 font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-3 md:col-start-5 md:pt-0"
        >
          <p>based in the mojave desert</p>
          <p>working worldwide</p>
        </div>

        <div
          data-anim="footer"
          className="col-span-6 pt-10 opacity-60 md:col-span-2 md:col-start-9 md:pt-0"
        >
          <FooterWeather />
        </div>

        <p
          data-anim="footer"
          className="col-span-6 pt-10 text-right font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-2 md:col-start-11 md:pt-0"
        >
          © 2026 third index llc
        </p>

        <div
          data-anim="footer"
          className="col-span-12 flex justify-center pt-20 pb-6 md:col-span-2 md:col-start-6 md:pt-28 md:pb-10"
        >
          <MonogramMark
            title="third index monogram"
            className="h-20 w-20 text-foreground md:h-24 md:w-24"
          />
        </div>
      </footer>
    </AnimRoot>
  );
}
