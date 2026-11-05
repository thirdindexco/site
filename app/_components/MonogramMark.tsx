type Props = {
  className?: string;
  title?: string;
};

// The mark: a T whose crossbar runs over an I set hard against its stem.
// One shape, no counters finer than the stroke, so it holds at 16px.
export function MonogramMark({ className, title }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="112"
      height="93"
      viewBox="0 0 112 93"
      fill="none"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M0 0H112V26H67V93H35V26H0V0ZM73 32H105V93H73V32Z"
        fill="currentColor"
      />
    </svg>
  );
}
