"use client";

import { useRef } from "react";
import { formatTechnologies } from "../_lib/format";
import { FULL_BLEED, PAGE_X, SHELL } from "../_lib/layout";
import type { Project } from "../_lib/projects";

// One tile. Videos only spin while pointed at — eleven autoplaying loops
// would cost battery for something mostly off-screen.
function Tile({
  project,
  duplicate,
}: {
  project: Project;
  // The second copy exists only so the loop can be seamless. Hidden from
  // assistive tech and skipped by the tab order, or the list reads twice.
  duplicate?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — ${project.role}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => videoRef.current?.pause()}
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
      <span className="block pt-1 font-mono text-2xs font-medium uppercase tracking-tight opacity-35">
        {formatTechnologies(project.technologies)}
      </span>
    </a>
  );
}

// Selected work as a moving band rather than a table: the page is browsed,
// not audited. The track holds two copies of the list and scrolls exactly
// one copy's width, so the loop is seamless; the CSS in globals.css pauses
// it on hover or focus and stands it down entirely for reduced motion.
export function ProjectMarquee({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      className="scroll-mt-24 pt-20 md:pt-28 lg:scroll-mt-20 lg:pt-36"
    >
      <div className={`${SHELL} ${PAGE_X}`}>
        <h2
          data-anim="body"
          className="font-mono text-2xs font-medium uppercase tracking-tight opacity-50"
        >
          selected work
        </h2>
      </div>

      <div className={`${FULL_BLEED} marquee mt-8 md:mt-10`}>
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
