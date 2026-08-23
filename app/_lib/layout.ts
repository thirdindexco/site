// Boxed grid — centered, capped. Used by the engagement subroutes, which
// read as documents rather than as index surfaces.
export const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-6 w-full";

// Full-bleed variant — runs to the edge of the main column (minus the page
// gutters). Used by the landing page's index sections.
export const FLUID_GRID = "grid w-full grid-cols-12 gap-6";

// Main-column gutters. The left rail lives outside these — the shell offsets
// main by the rail width at lg — so the gutters stay symmetric at every
// breakpoint and a single mirrored negative margin buys a full-bleed row.
export const PAGE_X = "px-5 md:px-8 lg:px-12";

// Cancels PAGE_X, then re-applies it as padding: backgrounds run edge to
// edge while the content inside stays on the same left margin as everything
// above it.
export const BLEED_X =
  "-mx-5 w-[calc(100%+2.5rem)] px-5 md:-mx-8 md:w-[calc(100%+4rem)] md:px-8 lg:-mx-12 lg:w-[calc(100%+6rem)] lg:px-12";
