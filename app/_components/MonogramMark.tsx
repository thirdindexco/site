type Props = {
  className?: string;
  title?: string;
};

export function MonogramMark({ className, title }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="100"
      viewBox="0 0 140 100"
      fill="none"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M0 100V0H20.3463V3.28129H9.34734V96.7163H20.3463V100H0Z"
        fill="currentColor"
      />
      <path
        d="M140 0V100H119.654V96.7163H130.653V3.28129H119.654V0H140Z"
        fill="currentColor"
      />
    </svg>
  );
}
