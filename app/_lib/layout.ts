// Centered measure. Everything in the document lines up inside this, so the
// page reads as one column rather than as content hung off a left edge.
export const SHELL = "mx-auto w-full max-w-[1140px]";

// Gutters for that measure.
export const PAGE_X = "px-5 md:px-8 lg:px-10";

// Cancels PAGE_X, then re-applies it as padding: backgrounds run to the
// shell's edge while the content inside stays on the same left margin as
// everything above it. Used by the selected-work rows.
export const BLEED_X =
  "-mx-5 w-[calc(100%+2.5rem)] px-5 md:-mx-8 md:w-[calc(100%+4rem)] md:px-8 lg:-mx-10 lg:w-[calc(100%+5rem)] lg:px-10";

// Boxed grid — used by the engagement subroutes, which read as documents.
export const GRID = "mx-auto max-w-grid grid grid-cols-12 gap-6 w-full";

// Twelve columns across the shell's measure.
export const FLUID_GRID = "grid w-full grid-cols-12 gap-6";
