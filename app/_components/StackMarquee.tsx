import { STACK_LOGOS } from "../_lib/stack-logos";

function Logo({
  logo,
  duplicate,
}: {
  logo: (typeof STACK_LOGOS)[number];
  duplicate?: boolean;
}) {
  return (
    <span
      className="group relative flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate || undefined}
    >
      {logo.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-6 w-6 fill-current opacity-70 transition-opacity duration-200 group-hover:opacity-100"
        >
          <path d={logo.path} />
        </svg>
      ) : (
        // Motion.dev isn't in the icon set yet — a from/to square
        // stands in until an official SVG is dropped on the path field.
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-6 w-6 opacity-70 transition-opacity duration-200 group-hover:opacity-100"
        >
          <rect
            x="2"
            y="7"
            width="8"
            height="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.45"
          />
          <rect x="14" y="7" width="8" height="8" fill="currentColor" />
        </svg>
      )}
      {/* Lives below the mark, inside the marquee's bottom padding, so
          overflow:hidden doesn't clip it. Duplicates stay unnamed for AT;
          the strip's aria-label already lists the set once. */}
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap bg-foreground px-1.5 py-0.5 font-mono text-3xs font-medium uppercase tracking-tight text-background opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {logo.label}
      </span>
    </span>
  );
}

// Two copies of the set, CSS-translated one width, so the loop is seamless.
export function StackMarquee() {
  const names = STACK_LOGOS.map((l) => l.label).join(", ");

  return (
    <div
      data-anim="body"
      className="stack-marquee"
      aria-label={`Technology stack: ${names}`}
    >
      <div className="stack-marquee-track flex w-max items-center gap-5 pr-5">
        {[...STACK_LOGOS, ...STACK_LOGOS].map((logo, i) => (
          <Logo
            key={`${logo.id}-${i}`}
            logo={logo}
            duplicate={i >= STACK_LOGOS.length}
          />
        ))}
      </div>
    </div>
  );
}
