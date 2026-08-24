"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_X, SHELL } from "../_lib/layout";

// The site's gap-6 gutter in px.
const GUTTER = 24;
const COLUMNS = 12;

// Overlay of the grid every page lays content on. It composes the same
// SHELL and PAGE_X constants <main> does, in the same order, rather than
// restating the classes — the two had drifted apart, with the overlay
// padding the viewport and then capping the width while main caps first
// and pads inside, which put the columns 40px out on each side at 1440.
export function GridDebugger({ enabled }: { enabled: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [measurements, setMeasurements] = useState({
    viewport: 0,
    container: 0,
    column: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const measure = () => {
      const container = gridRef.current?.getBoundingClientRect().width ?? 0;
      const column =
        container > 0 ? (container - GUTTER * (COLUMNS - 1)) / COLUMNS : 0;

      setMeasurements({
        viewport: window.innerWidth,
        container,
        column,
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
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      <div className={`${SHELL} ${PAGE_X} h-full`}>
        <div
          ref={gridRef}
          className="relative grid h-full w-full grid-cols-12 gap-6"
        >
          <div className="absolute inset-y-0 left-0 w-px bg-pink-500/70" />
          <div className="absolute inset-y-0 right-0 w-px bg-pink-500/70" />
          <div className="absolute bottom-2 right-0 z-10 flex gap-2 bg-pink-500 px-1.5 py-1 font-mono text-[9px] uppercase leading-none text-white">
            <span>vp {Math.round(measurements.viewport)}px</span>
            <span>ct {Math.round(measurements.container)}px</span>
            <span>cols {COLUMNS}</span>
            <span>col {Math.round(measurements.column)}px</span>
            <span>gut {GUTTER}px</span>
          </div>
          {Array.from({ length: COLUMNS }).map((_, i) => (
            <div
              key={i}
              className="h-full bg-pink-500/10 outline outline-1 -outline-offset-1 outline-pink-500/35"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
