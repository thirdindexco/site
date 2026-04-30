import { formatTechnologies } from "../_lib/format";
import type { Project } from "../_lib/projects";

export function ProjectHoverTooltip({
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
        <p>{formatTechnologies(project.technologies)}</p>
      </div>
    </div>
  );
}
