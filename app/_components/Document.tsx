import type { ReactNode } from "react";
import { FADE } from "../_lib/canvas";

// A document on the sheet: the statement in the top half, where the home
// has nothing, and the sections under the centre line on the twelve-column
// grid, a label in the first two columns and the content from the fourth.
// The sections scroll up behind the line; the shell gives it a band of
// background on these routes. On the narrow page everything stacks.
export function Document({
  lead,
  support,
  children,
}: {
  lead: ReactNode;
  support?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className={`${FADE} p-3 md:relative md:min-h-svh md:p-2`}>
      {/* The statement, one paragraph, top left. */}
      <header className="max-w-[48ch] text-pretty md:absolute md:left-2 md:top-2">
        <h1 className="inline">{lead}</h1>
        {support ? <span className="opacity-50"> {support}</span> : null}
      </header>
      {/* The sections start a way under the line, so the first one shows
          the document continues and the page asks to be scrolled. */}
      <div className="flex flex-col gap-y-[52px] pt-12 md:pb-[52px] md:pt-[calc(50svh+60px)]">
        {children}
      </div>
    </article>
  );
}

export function DocSection({
  id,
  label,
  children,
  className = "",
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className="md:grid md:grid-cols-12 md:gap-x-5" aria-labelledby={id}>
      <h2 id={id} className="pb-[13px] opacity-50 md:col-span-2 md:pb-0">
        {label}
      </h2>
      <div className={`md:col-span-9 md:col-start-4 ${className}`}>{children}</div>
    </section>
  );
}

// Question and answer rows, plain: the question in the first columns of
// the content, the answer beside it.
export function Questions({ items }: { items: { q: string; a: string }[] }) {
  return (
    <dl className="flex flex-col gap-y-[13px]">
      {items.map((item) => (
        <div key={item.q} className="md:grid md:grid-cols-9 md:gap-x-5">
          <dt className="md:col-span-3">{item.q}</dt>
          <dd className="text-pretty opacity-50 md:col-span-5">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

// Term rows: a short head in the first columns, the rest beside it.
export function Rows({ items }: { items: [string, ReactNode][] }) {
  return (
    <dl className="flex flex-col gap-y-[13px]">
      {items.map(([head, body]) => (
        <div key={head} className="md:grid md:grid-cols-9 md:gap-x-5">
          <dt className="md:col-span-2">{head}</dt>
          <dd className="text-pretty md:col-span-6">{body}</dd>
        </div>
      ))}
    </dl>
  );
}
