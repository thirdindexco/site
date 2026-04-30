type Props = {
  className?: string;
  title?: string;
};

export function MonogramMark({ className, title }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="275"
      height="275"
      viewBox="0 0 275 275"
      fill="none"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect width="275" height="275" fill="var(--background)" />
      <path
        d="M67 188V88H87.3463V91.2813H76.3473V184.716H87.3463V188H67Z"
        fill="currentColor"
      />
      <path
        d="M207 88V188H186.654V184.716H197.653V91.2813H186.654V88H207Z"
        fill="currentColor"
      />
    </svg>
  );
}
