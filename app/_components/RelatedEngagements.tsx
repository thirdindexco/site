import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGAGEMENTS, type EngagementSlug } from "../_lib/engagements";
import { GRID } from "../_lib/layout";

// Two cards mirror the homepage about/inquiries rhythm: cols 1-4 + 9-12.
const COL_STARTS = ["md:col-start-1", "md:col-start-9"];

export function RelatedEngagements({
  currentSlug,
}: {
  currentSlug: EngagementSlug;
}) {
  const others = ENGAGEMENTS.filter((e) => e.slug !== currentSlug);

  return (
    <section className={`pt-20 md:pt-28 lg:pt-32 ${GRID}`}>
      <div className="col-span-12">
        <div className="font-mono text-3xs font-medium uppercase tracking-tight">
          other engagement shapes
        </div>
      </div>

      {others.map((engagement, i) => (
        <article
          key={engagement.slug}
          className={`col-span-12 md:col-span-4 ${COL_STARTS[i]} ${
            i === 0 ? "pt-10 md:pt-12" : "pt-8 md:pt-12"
          }`}
        >
          <div className="flex h-full flex-col border-t border-[color:var(--panel-border)] pt-5">
            <h3 className="font-sans text-xl font-semibold leading-tight tracking-tight">
              {engagement.title}
            </h3>
            <p className="pt-2 font-mono text-3xs font-medium uppercase tracking-tight opacity-70">
              {engagement.meta}
            </p>
            <p className="pt-6 font-sans text-sm leading-relaxed text-pretty">
              {engagement.description}
            </p>
            <Link
              href={engagement.href}
              className="group/learn mt-6 inline-flex items-center gap-1.5 self-start font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity hover:opacity-100"
            >
              learn more
              <ArrowRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/learn:translate-x-0.5"
              />
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
