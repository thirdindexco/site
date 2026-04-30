"use client";

import { useEffect, useRef, useState } from "react";

export function GridDebugger({
  enabled,
  settingsOpen,
}: {
  enabled: boolean;
  settingsOpen: boolean;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [measurements, setMeasurements] = useState({
    viewport: 0,
    container: 0,
    column: 0,
    columns: 4,
    gutter: 16,
  });

  useEffect(() => {
    if (!enabled) return;

    const measure = () => {
      const container = gridRef.current?.getBoundingClientRect().width ?? 0;
      const gutter = 16;
      const columns = window.innerWidth >= 768 ? 12 : 4;
      const column =
        container > 0 ? (container - gutter * (columns - 1)) / columns : 0;

      setMeasurements({
        viewport: window.innerWidth,
        container,
        column,
        columns,
        gutter,
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
  }, [enabled, settingsOpen]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-0 z-50 overflow-hidden xl:px-0 ${
        settingsOpen
          ? "left-[12px] right-[12px] top-[48px] px-4 md:left-[18px] md:right-[18px] md:top-[52px] md:px-6"
          : "inset-0 px-6 md:px-8"
      }`}
    >
      <div
        ref={gridRef}
        className="relative mx-auto grid h-full max-w-grid grid-cols-4 gap-4 md:grid-cols-12"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-pink-500/70" />
        <div className="absolute inset-y-0 right-0 w-px bg-pink-500/70" />
        <div className="absolute right-0 top-2 z-10 flex gap-2 bg-pink-500 px-1.5 py-1 font-mono text-[9px] uppercase leading-none text-white">
          <span>vp {Math.round(measurements.viewport)}px</span>
          <span>ct {Math.round(measurements.container)}px</span>
          <span>cols {measurements.columns}</span>
          <span>col {Math.round(measurements.column)}px</span>
          <span>gut {measurements.gutter}px</span>
        </div>
        {Array.from({ length: measurements.columns }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-pink-500/10 outline outline-1 -outline-offset-1 outline-pink-500/35"
          />
        ))}
      </div>
    </div>
  );
}
