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
      className="max-h-full max-w-full object-contain object-left-bottom"
    />
  ) : (
    <img
      key={src}
      src={src}
      alt={`${project.title}, ${i + 1} of ${count}`}
      className="max-h-full max-w-full object-contain object-left-bottom"
    />
  );
}

// A project, open. On the sheet: its media in the right columns above the
// centre line, its particulars under the name below it. On the narrow
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
        <div className="absolute inset-x-0 bottom-[calc(50%+20px)] top-[calc(18%+32px)] grid grid-cols-12 gap-5">
          <button
            type="button"
            onClick={step}
            aria-label={label}
            className={`col-span-4 col-start-7 flex h-full items-end justify-start outline-none ${cursor}`}
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
          className={`w-full outline-none ${cursor}`}
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
