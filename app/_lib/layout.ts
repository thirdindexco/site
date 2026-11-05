// The measure is the viewport. Twelve columns run edge to edge behind a
// small gutter, and the type stays small, so the page reads as a sheet
// laid out in columns rather than a centered article.
export const SHELL = "mx-auto w-full";

// Gutters for that measure.
export const PAGE_X = "px-4 md:px-5 lg:px-6";

// Cancels PAGE_X, then re-applies it as padding: backgrounds run to the
// viewport edge while the content inside stays on the same left margin as
// everything above it. Used by the selected-work rows.
export const BLEED_X =
  "-mx-4 w-[calc(100%+2rem)] px-4 md:-mx-5 md:w-[calc(100%+2.5rem)] md:px-5 lg:-mx-6 lg:w-[calc(100%+3rem)] lg:px-6";

// The same twelve columns on the engagement subroutes.
export const GRID = "grid grid-cols-12 gap-5 w-full";

// Twelve columns across the shell's measure.
export const FLUID_GRID = "grid w-full grid-cols-12 gap-5";
