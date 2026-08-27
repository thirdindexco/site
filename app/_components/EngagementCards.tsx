import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGAGEMENTS } from "../_lib/engagements";
import { EngagementMark } from "./EngagementMark";

export function EngagementCards() {
  return (
    <ul
      data-anim="body"
      className="col-span-12 grid grid-cols-12 gap-6"
    >
      {ENGAGEMENTS.map((engagement) => (
          <li key={engagement.slug} className="col-span-12 md:col-span-6">
          <Link
            href={engagement.href}
            className="group/tier flex h-full flex-col border border-[color:var(--panel-border)] p-5 outline-none transition-colors duration-200 hover:border-[color:color-mix(in_srgb,var(--foreground)_28%,transparent)] focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[6px] focus-visible:outline-[color:var(--accent)]"
            data-engagement-card
          >
            <EngagementMark slug={engagement.slug} />
            <h3 className="pt-5 font-sans text-sm font-semibold leading-tight tracking-tight">
              {engagement.title}
            </h3>
            <p className="pt-1.5 font-mono text-2xs font-medium uppercase tracking-tight opacity-50">
              {engagement.meta}
            </p>
            <p className="max-w-[44ch] flex-1 pt-3 font-sans text-sm leading-relaxed text-pretty text-foreground/65">
              {engagement.description}
            </p>
            <span className="inline-flex items-center gap-1.5 pt-4 font-mono text-2xs font-medium uppercase tracking-tight opacity-50 transition-opacity duration-200 group-hover/tier:opacity-100 group-focus-visible/tier:opacity-100">
              learn more
              <ArrowRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/tier:translate-x-0.5 group-focus-visible/tier:translate-x-0.5"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
