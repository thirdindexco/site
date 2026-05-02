"use client";

import { Collapsible } from "@base-ui-components/react/collapsible";
import { ArrowUpRight } from "lucide-react";
import { formatTechnologies } from "../_lib/format";
import type { Project } from "../_lib/projects";

export function MobileProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto mt-6 grid w-full max-w-grid grid-cols-4 gap-4 md:hidden">
      <ol className="col-span-4 divide-y divide-[color:var(--panel-border)] border-t border-[color:var(--panel-border)]">
        {projects.map((project, index) => (
          <li key={project.url}>
            <Collapsible.Root className="group/project">
              <Collapsible.Trigger className="flex w-full cursor-pointer items-baseline justify-between gap-4 py-4 text-left outline-none">
                <span className="font-ld text-3xl font-light uppercase leading-[0.9] tracking-tight">
                  {project.title}
                </span>
                <span className="shrink-0 font-mono text-3xs uppercase tracking-tight opacity-50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Collapsible.Trigger>
              <Collapsible.Panel className="collapsible-panel">
                <div className="pb-6">
                  <p className="font-ld text-base font-light leading-tight tracking-tight">
                    {project.description}
                  </p>
                  <div className="pt-4 font-mono text-3xs uppercase tracking-tight opacity-70">
                    <p className="font-medium">{project.role}</p>
                    <p className="pt-1 font-light">
                      {formatTechnologies(project.technologies)}
                    </p>
                  </div>
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
              </Collapsible.Panel>
            </Collapsible.Root>
          </li>
        ))}
      </ol>
    </div>
  );
}
