import { FLUID_GRID, PAGE_X, SHELL } from "../_lib/layout";
import { INTRO_FADE_S, INTRO_HOLD_S } from "../_lib/intro";

// Full-colour cover shown on every full page load: one line of mono text on
// the signature blue or a flat grey, held for a moment, then faded off the
// page underneath. Rendered by the server and driven entirely by CSS, so it
// paints before hydration and never waits on JavaScript.
//
// It only shows when the head script has set html[data-intro] (which also
// picks the colour). No script, or reduced motion, means no cover — so it
// can't strand anyone on a blank screen. It lives in the root layout, so
// client-side navigation never replays it.
export function IntroCover() {
  return (
    <div
      aria-hidden
      className="intro-cover"
      style={{
        animationDuration: `${INTRO_FADE_S}s`,
        animationDelay: `${INTRO_HOLD_S}s`,
      }}
    >
      <div
        className={`${SHELL} ${PAGE_X} ${FLUID_GRID} font-mono text-2xs font-medium uppercase tracking-tight`}
      >
        <span className="col-span-6 md:col-span-3">third index</span>
        <span className="hidden md:col-span-5 md:col-start-4 md:block">
          technology studio
        </span>
        <span className="col-span-6 text-right md:col-span-3 md:col-start-10">
          mojave desert
        </span>
      </div>
    </div>
  );
}
