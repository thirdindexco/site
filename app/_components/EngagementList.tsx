import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGAGEMENTS } from "../_lib/engagements";

// Terms only — name on the left, length and price beside it. The detail
// lives on each engagement's own page, so a row is just the way in.
export function EngagementList() {
  return (
    <ul
      data-anim="body"
      className="border-t border-[color:var(--panel-border)]"
    >
      {ENGAGEMENTS.map((engagement) => (
        <li key={engagement.slug}>
          <Link
            href={engagement.href}
            className="group/tier grid items-baseline gap-2 border-b border-[color:var(--panel-border)] py-5 outline-none focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] md:grid-cols-3 md:gap-6"
          >
            <h3 className="font-sans text-sm font-semibold leading-tight tracking-tight">
              {engagement.title}
            </h3>
            <p className="flex items-baseline justify-between gap-4 font-sans text-sm leading-relaxed tabular-nums text-foreground/65 transition-colors duration-200 group-hover/tier:text-foreground group-focus-visible/tier:text-foreground md:col-span-2">
              {engagement.meta}
              <ArrowRight
                aria-hidden
                className="h-3 w-3 shrink-0 self-center opacity-40 transition duration-200 group-hover/tier:translate-x-0.5 group-hover/tier:opacity-100 group-focus-visible/tier:translate-x-0.5 group-focus-visible/tier:opacity-100"
              />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
