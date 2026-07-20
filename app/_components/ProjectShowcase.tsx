"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatTechnologies } from "../_lib/format";
import { GRID } from "../_lib/layout";
import type { Project } from "../_lib/projects";
import { ProjectHoverTooltip } from "./ProjectHoverTooltip";
import { ProjectMedia } from "./ProjectMedia";

// Auto-advance cadence. Long enough to read each tile; pauses on hover/focus.
const AUTO_ADVANCE_MS = 3500;

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<{
    project: Project;
    index: number;
    x: number;
    y: number;
  } | null>(null);

  // Carousel state — index tracks the leftmost snapped tile, derived from
  // scroll position. `paused` halts auto-advance while the user hovers /
  // focuses. `autoActive` flips off the first time the user uses prev/next,
  // so manual nav isn't fighting the interval.
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoActive, setAutoActive] = useState(true);

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

  // Compute one tile's stride (width + gap) so prev/next moves exactly one
  // snap point. Reads layout live to stay correct across breakpoints.
  const getStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return 0;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return first.offsetWidth + gap;
  }, []);

  const scrollByStep = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const step = getStep();
      if (!step) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let target = track.scrollLeft + step * dir;
      // Wrap: past the end loops to start, before the start loops to end.
      if (target > maxScroll - 1) target = 0;
      else if (target < 0) target = maxScroll;
      track.scrollTo({ left: target, behavior: "smooth" });
    },
    [getStep],
  );

  // Auto-advance interval — paused on hover / focus, and disabled for the
  // rest of the session once the user takes manual control.
  useEffect(() => {
    if (paused || !autoActive) return;
    const id = window.setInterval(() => scrollByStep(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [autoActive, paused, scrollByStep]);

  const handleNav = useCallback(
    (dir: 1 | -1) => {
      setAutoActive(false);
      scrollByStep(dir);
    },
    [scrollByStep],
  );

  // Derive the active tile from scroll position. rAF-throttled so smooth
  // scroll frames don't thrash React state.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const step = getStep();
        if (!step) return;
        const idx = Math.round(track.scrollLeft / step);
        setActiveIndex(Math.max(0, Math.min(projects.length - 1, idx)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [getStep, projects.length]);

  return (
    <section id="selected-work" className="scroll-mt-12 pt-12 md:pt-24 lg:pt-32">
      <div className={GRID}>
        <div className="col-span-12 font-mono font-medium text-3xs uppercase tracking-tight md:col-span-10 md:col-start-2">
          selected work
        </div>
      </div>

      <div className="mt-6 md:mt-10 lg:mt-14">
        <div className={GRID}>
          <div className="col-span-12">
            <div
              ref={trackRef}
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="flex w-full gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {projects.map((project, index) => (
                <a
                  key={project.url}
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
                  className="group block w-full shrink-0 snap-start outline-none transition-colors focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] md:w-[calc((100%-1.5rem)/2)] md:border md:border-[color:var(--panel-border)] md:p-5 md:hover:border-[color:color-mix(in_srgb,var(--foreground)_22%,transparent)] lg:w-[calc((100%-3rem)/3)] lg:p-6"
                >
                  <ProjectMedia project={project} />
                  <div className="mt-5 md:hidden">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-sans text-base font-semibold leading-tight tracking-tight">
                        {project.title}
                      </p>
                      <span className="shrink-0 font-mono text-3xs uppercase tracking-tight opacity-50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="pt-3 font-sans text-sm leading-relaxed text-pretty">
                      {project.description}
                    </p>
                    <div className="flex flex-col gap-1 pt-4 font-mono text-3xs uppercase tracking-tight opacity-60">
                      <p className="font-medium">{project.role}</p>
                      <p>{formatTechnologies(project.technologies)}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 font-mono text-3xs font-medium uppercase tracking-tight lg:mt-8">
              <CarouselNav
                label="previous project"
                onClick={() => handleNav(-1)}
              >
                <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
              </CarouselNav>
              <span aria-live="polite" className="tabular-nums opacity-60">
                {String(activeIndex + 1).padStart(2, "0")}
                <span aria-hidden className="px-1.5 opacity-40">
                  /
                </span>
                {String(projects.length).padStart(2, "0")}
              </span>
              <CarouselNav
                label="next project"
                onClick={() => handleNav(1)}
              >
                <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </CarouselNav>
            </div>
          </div>
        </div>
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

function CarouselNav({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] md:h-7 md:w-7"
    >
      {children}
    </button>
  );
}
