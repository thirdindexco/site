type Props = {
  className?: string;
  title?: string;
};

// The mark: an editorial T and I, drawn with the serif's bracketed feet and
// a flared crossbar, the I tucked under the T's right arm. Fill follows
// currentColor so it takes the page's ink in either theme.
export function MonogramMark({ className, title }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="640"
      height="620"
      viewBox="0 0 640 620"
      fill="currentColor"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d="M38 24C96 30 155 30 218 30H422C485 30 544 30 602 24L625 180H616C594 102 555 42 456 42H370V504C370 561 391 578 438 581V590H180V581C227 578 248 561 248 504V42H184C85 42 46 102 24 180H15Z" />
      <path d="M382 170H584V179C540 182 525 198 525 244V511C525 559 539 578 584 581V590H382V581C427 578 441 559 441 511V244C441 198 426 182 382 179Z" />
    </svg>
  );
}
