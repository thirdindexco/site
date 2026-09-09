// The studio's standing description, rendered in the footer. Kept as its
// own component so the copy has one home; no client boundary, since it's
// static text.
export function StudioLine({ className = "", ...rest }: React.ComponentProps<"p">) {
  return (
    <p
      {...rest}
      className={`font-sans text-xs leading-[1.6] text-balance ${className}`}
    >
      <span className="font-semibold">THIRD INDEX</span> is an independent
      practice led by{" "}
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
