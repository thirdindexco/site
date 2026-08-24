"use client";

import { useEffect, useRef, useState } from "react";

// The site's gap-6 gutter in px.
const GUTTER = 24;
const COLUMNS = 12;

export function GridDebugger({ enabled }: { enabled: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);
  // Engagement subroutes lay their content on the boxed grid (mx-auto
  // max-w-grid), which is narrower than the shell's own measure. Mirror
  // whichever the current page uses so the overlay lines up with content.
  const [boxed, setBoxed] = useState(false);
  const [measurements, setMeasurements] = useState({
    viewport: 0,
    container: 0,
    column: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    setBoxed(!!document.querySelector("main .max-w-grid"));

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
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden px-5 md:px-8 lg:px-10"
    >
      <div
        ref={gridRef}
        className={`relative mx-auto grid h-full w-full grid-cols-12 gap-6 ${
          boxed ? "max-w-grid" : "max-w-[1140px]"
        }`}
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
  );
}
