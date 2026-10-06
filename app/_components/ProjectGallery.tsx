"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { playClickThrottled } from "../_lib/click-sound";

// Stepped stills for the expanded project row, led by the video loop when
// the project has one. Every slide sits in the same grid cell and
// crossfades, so the frame holds its height between slides. A leading video
// sets the frame to its 16:9, and the stills cover it from the top, where
// the screens carry their content. Clicking the frame
// advances; arrow keys step while the gallery has focus.
export function ProjectGallery({
  images,
  video,
  title,
}: {
  images: string[];
  video?: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slides = video ? [video, ...images] : images;
  const count = slides.length;

  // The loop only runs while it's the slide on show.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (index === 0) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [index]);

  const step = (delta: number) => {
    setIndex((i) => (i + delta + count) % count);
    playClickThrottled(70, 0, 0.6);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
      }}
      className="outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
    >
      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next screenshot"
        tabIndex={-1}
        className={`grid w-full cursor-e-resize ${
          video ? "aspect-video grid-rows-1 overflow-hidden" : ""
        }`}
      >
        {slides.map((src, i) => {
          const className = `col-start-1 row-start-1 h-full w-full object-cover object-top transition-opacity duration-300 motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`;
          return video && i === 0 ? (
            <video
              key={src}
              ref={videoRef}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
              className={className}
            />
          ) : (
            <img
              key={src}
              src={src}
              alt={i === index ? `${title}, ${i + 1} of ${count}` : ""}
              aria-hidden={i !== index}
              className={className}
            />
          );
        })}
      </button>

      <div className="flex items-center justify-between pt-3 font-mono text-3xs font-medium uppercase tabular-nums tracking-tight">
        <span aria-live="polite" className="opacity-50">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous screenshot"
            className="-m-1 p-1 opacity-50 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
          >
            <ArrowLeft aria-hidden className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next screenshot"
            className="-m-1 p-1 opacity-50 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
          >
            <ArrowRight aria-hidden className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
