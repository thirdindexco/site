"use client";

import Link from "next/link";
import { useState } from "react";
import { FADE, LINK, LINK_MUTED } from "../_lib/canvas";
import { formatTechnologies } from "../_lib/format";
import { workHref, type Project } from "../_lib/projects";

const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

// The stills, led by the loop when the project has one. Clicking steps.
function useSlides(project: Project) {
  const slides = project.video
    ? [project.video, ...(project.images ?? [])]
    : project.images?.length
      ? project.images
      : [project.thumbnail ?? "/landscape.jpg"];
  const [i, setI] = useState(0);
  const next = () => setI((k) => (k + 1) % slides.length);
  return { slides, i, next };
}

// One slide filling its cell. Stills cover the cell from the top. Videos
// are assumed 16:9 and turned on their side, sized from the cell with
// container units so the turned frame covers it. None of this needs to be
// legible: the media is there to tag the project visually; the way to see
// the work is the link to the live site.
function Slide({
  project,
  src,
  i,
  count,
}: {
  project: Project;
  src: string;
  i: number;
  count: number;
}) {
  return isVideo(src) ? (
    <video
      key={src}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute left-1/2 top-1/2 h-[100cqw] w-[100cqh] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-90 object-cover"
    />
  ) : (
    <img
      key={src}
      src={src}
      alt={`${project.title}, ${i + 1} of ${count}`}
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}

// Where each slide sits on the two-by-two field: the whole right half, or
// one of its cells, by turn. The left half stays for the line and the
// particulars.
const CELLS = [
  "col-start-2 row-start-1 row-span-2",
  "col-start-2 row-start-1",
  "col-start-2 row-start-2",
];

// A project, open. On the sheet: its media on the right of a two-by-two
// field, its particulars under the name below the line. On the narrow
// page: the media, then the particulars, then the way on.
export function WorkView({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project;
  next: Project;
}) {
  const { slides, i, next: step } = useSlides(project);
  const src = slides[i];
  const cursor = slides.length > 1 ? "cursor-e-resize" : "cursor-default";
  const label = slides.length > 1 ? "Next image" : project.title;

  return (
    <>
      <div className={`${FADE} fixed inset-2 hidden md:block`}>
        {/* The field: two columns, two rows, the centre line between the
            rows. The shell paints a band of background along the line and
            the bottom line while a project is open, so they read over the
            media. */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-x-5">
          <button
            type="button"
            onClick={step}
            aria-label={label}
            className={`relative overflow-hidden outline-none [container-type:size] ${CELLS[i % CELLS.length]} ${cursor}`}
          >
            <Slide project={project} src={src} i={i} count={slides.length} />
          </button>
        </div>

        <div className="absolute inset-x-0 top-[calc(50%+20px)] grid grid-cols-12 gap-x-5">
          <div className="col-span-3">
            <h1 className="sr-only">{project.title}</h1>
            <p className="text-pretty">{project.description}</p>
            <p className="pt-[13px] opacity-50">
              {project.role}
              <br />
              {formatTechnologies(project.technologies)}
            </p>
            <p className="flex gap-6 pt-[13px]">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Visit site
              </a>
              {slides.length > 1 ? (
                <span className="tabular-nums opacity-50">
                  {i + 1} / {slides.length}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      <div className={`${FADE} p-3 md:hidden`}>
        <button
          type="button"
          onClick={step}
          aria-label={label}
          className={`relative aspect-[4/5] w-full overflow-hidden outline-none [container-type:size] ${cursor}`}
        >
          <Slide project={project} src={src} i={i} count={slides.length} />
        </button>
        <p className="pt-4">{project.title}</p>
        <p className="pt-[13px] text-pretty">{project.description}</p>
        <p className="pt-[13px] opacity-50">
          {project.role}
          <br />
          {formatTechnologies(project.technologies)}
        </p>
        <div className="flex gap-6 pt-[13px]">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            Visit site
          </a>
          <Link href={workHref(prev)} className={LINK_MUTED}>
            Previous
          </Link>
          <Link href={workHref(next)} className={LINK_MUTED}>
            Next
          </Link>
        </div>
      </div>
    </>
  );
}
