"use client";

import { useRef, useState } from "react";
import { formatTechnologies } from "../_lib/format";
import { FULL_BLEED } from "../_lib/layout";
import type { Project } from "../_lib/projects";

// One project's line in the reveal panel. Rendered once per project, all
// stacked in a single grid cell, so the panel is always as tall as its
// tallest entry and its height cannot depend on which one is showing.
function PanelBody({ project }: { project: Project }) {
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
        <p className="font-mono text-2xs font-medium uppercase tracking-tight opacity-50">
          {project.title}
        </p>
        <p className="font-mono text-2xs font-medium uppercase tracking-tight opacity-35">
          {formatTechnologies(project.technologies)}
        </p>
      </div>
      <p className="pt-2 font-sans text-sm leading-relaxed text-pretty">
        {project.description}
      </p>
    </>
  );
}

// One tile. Videos only spin while pointed at — eleven autoplaying loops
// would cost battery for something mostly off-screen.
function Tile({
  project,
  duplicate,
  onHover,
}: {
  project: Project;
  // The second copy exists only so the loop can be seamless. Hidden from
  // assistive tech and skipped by the tab order, or the list reads twice.
  duplicate?: boolean;
  onHover: (project: Project | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.role}. ${project.description}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      onMouseEnter={() => {
        onHover(project);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => videoRef.current?.pause()}
      onFocus={() => onHover(project)}
      className="marquee-tile group/tile block w-[300px] shrink-0 outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] md:w-[400px] lg:w-[480px]"
    >
      <span className="block aspect-[16/10] w-full overflow-hidden bg-[color:var(--secondary)]">
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={project.thumbnail ?? "/landscape.jpg"}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </span>

      <span className="flex items-baseline justify-between gap-4 pt-3 font-mono text-2xs font-medium uppercase tracking-tight">
        <span>{project.title}</span>
        <span className="opacity-50">{project.role}</span>
      </span>
      {/* Below lg the stack rides in the tile: there is no hover, so the
          reveal panel can never fire. On desktop both stack and description
          live in the panel and the tile stays a picture. */}
      <span className="block pt-1 font-mono text-2xs font-medium uppercase tracking-tight opacity-35 lg:hidden">
        {formatTechnologies(project.technologies)}
      </span>

      {/* Touch screens have no hover, so the reveal below the band can never
          fire there. Carry the description inside the tile instead. */}
      <span className="block max-w-[46ch] pt-3 font-sans text-xs leading-[1.6] text-pretty text-foreground/60 lg:hidden">
        {project.description}
      </span>
    </a>
  );
}

// Selected work as a moving band rather than a table: the page is browsed,
// not audited. The track holds two copies of the list and scrolls exactly
// one copy's width, so the loop is seamless; the CSS in globals.css pauses
// it on hover or focus and stands it down entirely for reduced motion.
export function ProjectMarquee({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="scroll-mt-24 pt-20 md:pt-28 lg:scroll-mt-20 lg:pt-36"
    >
      <div>
        <h2
          data-anim="body"
          className="font-mono text-2xs font-medium uppercase tracking-tight opacity-50"
        >
          selected work
        </h2>
      </div>

      <div
        className={`${FULL_BLEED} marquee mt-8 md:mt-10`}
        onMouseLeave={() => setHovered(null)}
      >
        {/* The trailing padding matches the gap on purpose. Without it the
            track is 2n tiles and 2n-1 gaps, so translating one half-width
            lands 12px short of where the second copy begins and the loop
            visibly jumps once a minute. With it, each half is exactly one
            copy plus its gap. */}
        <div className="marquee-track flex w-max gap-5 pr-5 md:gap-6 md:pr-6">
          {[...projects, ...projects].map((project, i) => (
            <Tile
              // Two copies of the same list, so the url alone isn't unique.
              key={`${project.url}-${i}`}
              project={project}
              duplicate={i >= projects.length}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>

      {/* What the hovered project actually was. It has to sit outside the
          marquee — that container clips its overflow so the loop's ends can
          be masked, which would swallow anything revealed beneath a tile.

          Every project renders into the same grid cell and only the hovered
          one is opaque. A reserved min-height doesn't work here: the idle
          floor was 72px and a filled row 86px, so every hover pushed the
          sections below down 14px. Stacking makes the height the tallest
          entry's, at any width, with no magic number to keep in sync.

          aria-hidden because it duplicates what each tile's own label
          already announces. */}
      <div className="hidden lg:block">
        <div
          aria-hidden
          className="mt-8 border-t border-[color:var(--panel-border)] pt-5"
        >
          <div className="grid max-w-[64ch]">
            {projects.map((project) => (
              <div
                key={project.url}
                className={`[grid-area:1/1] transition-[opacity,transform] duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  hovered?.url === project.url
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1.5 opacity-0"
                }`}
              >
                <PanelBody project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
