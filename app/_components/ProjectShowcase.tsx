"use client";

import { useState, type PointerEvent } from "react";
import { GRID } from "../_lib/layout";
import type { Project } from "../_lib/projects";
import { MobileProjectList } from "./MobileProjectList";
import { ProjectHoverTooltip } from "./ProjectHoverTooltip";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectShowcase({ projects }: { projects: Project[] }) {
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

      <MobileProjectList projects={projects} />

      <div className="mt-5 hidden flex-col md:flex">
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
