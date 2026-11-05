import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ENGAGEMENTS, type EngagementSlug } from "../_lib/engagements";
import { GRID } from "../_lib/layout";

// The other engagement shape(s), on the page's columns: label in the first
// two, the cards from the fourth, four columns each.
export function RelatedEngagements({
  currentSlug,
}: {
  currentSlug: EngagementSlug;
}) {
  const others = ENGAGEMENTS.filter((e) => e.slug !== currentSlug);

  return (
    <section className={`pt-28 md:pt-40 lg:pt-56 ${GRID}`}>
      <div className="col-span-12 md:col-span-2">
        <div className="font-sans text-sm opacity-50">
          other engagement shapes
        </div>
      </div>

      {others.map((engagement, i) => (
        <article
          key={engagement.slug}
          className={`col-span-12 pt-5 md:col-span-4 md:pt-0 ${
            i === 0 ? "md:col-start-4" : ""
          }`}
        >
          <div className="flex h-full flex-col">
            <h3 className="font-sans text-sm font-bold leading-tight tracking-tight">
              {engagement.title}
            </h3>
            <p className="pt-1 font-sans text-sm opacity-50">
              {engagement.meta}
            </p>
            <p className="max-w-[40ch] pt-4 font-sans text-sm leading-tight text-pretty text-foreground/65">
              {engagement.description}
            </p>
            <Link
              href={engagement.href}
              className="group/learn mt-5 inline-flex items-center gap-1.5 self-start font-sans text-sm opacity-70 outline-none transition-opacity hover:opacity-100"
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
