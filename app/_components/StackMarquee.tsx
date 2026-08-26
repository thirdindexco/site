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
      className="flex shrink-0 items-center"
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate || undefined}
    >
      {logo.path ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-6 w-6 fill-current opacity-70"
        >
          <path d={logo.path} />
        </svg>
      ) : (
        // Motion.dev isn't in the icon set yet — a from/to square
        // stands in until an official SVG is dropped on the path field.
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-6 w-6 opacity-70"
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
    </span>
  );
}

// Two copies of the set, CSS-translated one width, so the loop is seamless.
export function StackMarquee() {
  const names = STACK_LOGOS.map((l) => l.label).join(", ");

  return (
    <div data-anim="body">
      <div
        className="stack-marquee"
        aria-label={`Default stack: ${names}`}
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
      <p className="max-w-[52ch] pt-5 font-sans text-sm leading-relaxed text-foreground/65">
        defaults, not a boundary.
      </p>
    </div>
  );
}
