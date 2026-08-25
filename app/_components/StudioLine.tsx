// The studio's standing description. It lives in the rail on desktop —
// below lg there is no rail, so the landing page renders this same block
// inline instead. One copy, two placements, and no client boundary: it's
// static text either way.
export function StudioLine({ className = "", ...rest }: React.ComponentProps<"p">) {
  return (
    <p
      {...rest}
      className={`font-sans text-xs leading-[1.6] text-balance ${className}`}
    >
      <span className="font-semibold">THIRD INDEX</span> is an independent
      studio led by{" "}
      <a
        href="https://relli.cc"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-foreground/30 underline-offset-[3px] outline-none transition-colors hover:decoration-current focus-visible:decoration-current"
      >
        Michael Ciccarelli
      </a>{" "}
      in the Mojave Desert.
    </p>
  );
}
