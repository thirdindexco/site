"use client";

import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { cycleTheme, themeAtom, type Theme } from "../_lib/theme-state";

// 8 swatches × 22px = 176px, fills col-span-2 exactly (matches Figma).
// Gradual opacity falloff so the last dot is barely visible.
const swatchAlphas = [0.95, 0.8, 0.7, 0.5, 0.4, 0.3, 0.15, 0.05];

// Bayer 4×4 ordered-dither matrix — turns per-cell alpha into a density of
// opaque pixels so the gradient reads as a real dither pattern, not a flat
// fill. Values centered by +0.5 so threshold maps to [0.5/16, 15.5/16].
const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

// Cell pixel dimensions for the dither canvas. Matches the CSS size so one
// image-pixel equals one CSS-pixel; `image-rendering: pixelated` keeps it
// crisp on retina.
const CELL_PX = 22;

// Brand colors — duplicated from globals.css since we need concrete rgb
// triples for the canvas work. If these change, update here too.
const FG_LIGHT = "#0b0b0b";
const FG_DARK = "#fafafa";
const ACCENT_BLUE = "#0000ff";
const INK = "#0b0b0b";

// Per-theme source colors for the dither canvases. Back face picks a
// contrasting tone so the hover flip always reads as a reveal.
const FRONT_COLOR: Record<Theme, string> = {
  light: FG_LIGHT,
  dark: FG_DARK,
  accent: FG_DARK,
};
const BACK_COLOR: Record<Theme, string> = {
  light: ACCENT_BLUE,
  dark: ACCENT_BLUE,
  accent: INK,
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function ditherDataUrl(alpha: number, hex: string): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = CELL_PX;
  canvas.height = CELL_PX;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(CELL_PX, CELL_PX);
  const [r, g, b] = hexToRgb(hex);
  for (let y = 0; y < CELL_PX; y++) {
    for (let x = 0; x < CELL_PX; x++) {
      const threshold = (BAYER_4[y % 4][x % 4] + 0.5) / 16;
      if (alpha > threshold) {
        const idx = (y * CELL_PX + x) * 4;
        img.data[idx] = r;
        img.data[idx + 1] = g;
        img.data[idx + 2] = b;
        img.data[idx + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

type PatternSet = { front: string[]; back: string[] };

export function ThemeSwatch({ className = "" }: { className?: string }) {
  // Shared across all placements so mobile + desktop instances stay in sync.
  // Hydration + media-query sync live in ThemeShortcuts so multiple swatch
  // placements don't race on DOM writes.
  const [theme] = useAtom(themeAtom);
  const [patterns, setPatterns] = useState<Record<Theme, PatternSet> | null>(
    null,
  );

  // Precompute dither pattern data URLs for every theme once. Back face
  // alpha order is always reversed; the source color varies per theme so
  // the hover reveal stays distinctive against each background.
  useEffect(() => {
    const buildSet = (theme: Theme): PatternSet => ({
      front: swatchAlphas.map((a) => ditherDataUrl(a, FRONT_COLOR[theme])),
      back: swatchAlphas.map((_, i) =>
        ditherDataUrl(
          swatchAlphas[swatchAlphas.length - 1 - i],
          BACK_COLOR[theme],
        ),
      ),
    });
    setPatterns({
      light: buildSet("light"),
      dark: buildSet("dark"),
      accent: buildSet("accent"),
    });
  }, []);

  const active = useMemo(() => patterns?.[theme], [patterns, theme]);

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label="cycle theme"
      aria-keyshortcuts="T"
      className={`group relative cursor-pointer outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)] ${className}`}
      style={{ perspective: "600px" }}
    >
      {swatchAlphas.map((a, i) => {
        const backAlpha = swatchAlphas[swatchAlphas.length - 1 - i];
        const frontUrl = active?.front[i];
        const backUrl = active?.back[i];
        return (
          <span
            key={a}
            aria-hidden
            data-anim="swatch"
            className="relative block h-[22px] w-[22px] [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-[240ms] motion-safe:ease-[cubic-bezier(0.4,0,0.2,1)] motion-safe:group-hover:[transform:rotateY(180deg)]"
            style={{
              transitionDelay: `${i * 12}ms`,
              willChange: "filter, opacity, transform",
            }}
          >
            <span
              className="absolute inset-0 [backface-visibility:hidden] [image-rendering:pixelated]"
              style={
                frontUrl
                  ? {
                      backgroundImage: `url(${frontUrl})`,
                      backgroundSize: `${CELL_PX}px ${CELL_PX}px`,
                    }
                  : {
                      background: `color-mix(in srgb, var(--foreground) ${a * 100}%, transparent)`,
                    }
              }
            />
            <span
              className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] [image-rendering:pixelated]"
              style={
                backUrl
                  ? {
                      backgroundImage: `url(${backUrl})`,
                      backgroundSize: `${CELL_PX}px ${CELL_PX}px`,
                    }
                  : {
                      background: `color-mix(in srgb, var(--accent) ${backAlpha * 100}%, transparent)`,
                    }
              }
            />
          </span>
        );
      })}
      {/* Hover caption — current mode + keyboard shortcut hint. Absolute so
          it doesn't steal space when the swatch isn't being pointed at.
          Stacks below the cells on mobile where horizontal room is scarce;
          slides out to the right on desktop. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-full mt-2 flex items-center gap-1.5 whitespace-nowrap font-mono text-2xs uppercase tracking-wide opacity-0 transition-opacity duration-200 group-hover:opacity-70 md:left-full md:top-1/2 md:ml-3 md:mt-0 md:-translate-y-1/2"
      >
        <span>{theme}</span>
        <kbd className="inline-flex h-[14px] min-w-[14px] items-center justify-center border border-current px-1 pt-px text-[9px] leading-none">
          T
        </kbd>
      </span>
    </button>
  );
}
