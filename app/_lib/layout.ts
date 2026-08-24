// Centered measure. Everything in the document lines up inside this, so the
// page reads as one column rather than as content hung off a left edge.
export const SHELL = "mx-auto w-full max-w-[1140px]";

// Gutters for that measure.
export const PAGE_X = "px-5 md:px-8 lg:px-10";

// Escape hatch to the full viewport width from inside the centered shell —
// for the work marquee, which wants every pixel. Safe because html/body
// already clip overflow-x, so the 100vw box can't open a scrollbar.
export const FULL_BLEED = "relative left-1/2 w-screen -translate-x-1/2";

// Boxed grid — used by the engagement subroutes, which read as documents.
export const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-6 w-full";

// Twelve columns across the shell's measure.
export const FLUID_GRID = "grid w-full grid-cols-12 gap-6";
