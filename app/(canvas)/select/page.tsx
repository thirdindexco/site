import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FADE, indexNumber } from "../../_lib/canvas";
import { formatTechnologies } from "../../_lib/format";
import { projects, workHref } from "../../_lib/projects";

const pageTitle = "Selected work — THIRD INDEX";
const pageDescription =
  "The index: product, platform, website, commerce, and editorial work by THIRD INDEX for Pentagram, Amazon, VICE, Condé Nast, Modern Treasury, Legend, and independent founders.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/select" },
  openGraph: {
    type: "website",
    url: "/select",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 600, alt: pageTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.jpg"],
  },
};

// Select: the whole index, top left. With a year on every project the
// years step across the columns as a timeline, one column per year;
// without, the role and the stack sit in fixed columns. The narrow page
// lists number, title and year.
export default function SelectPage() {
  const years = projects.map((p) => p.year).filter((y): y is number => !!y);
  const timeline = years.length === projects.length;
  const minYear = timeline ? Math.min(...years) : 0;

  return (
    <div className={`${FADE} p-3 md:p-2`}>
      <h1 className="sr-only">Selected work</h1>
      <div className="[&:hover>a:not(:hover)]:text-muted-foreground">
        {projects.map((p, i) => (
          <Link
            key={p.url}
            href={workHref(p)}
            style={
              timeline
                ? ({
                    "--col": Math.min(12, 4 + ((p.year as number) - minYear)),
                  } as CSSProperties)
                : undefined
            }
            className="grid w-full grid-cols-[3rem_1fr_auto] gap-x-5 py-[3px] outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent md:grid-cols-12"
          >
            <span className="tabular-nums md:col-span-1">{indexNumber(i)}</span>
            <span className="md:col-span-2">{p.title}</span>
            {timeline ? (
              <span className="tabular-nums md:col-span-1 md:[grid-column-start:var(--col)]">
                {p.year}
              </span>
            ) : (
              <>
                <span className="hidden text-muted-foreground md:col-span-2 md:col-start-5 md:block">
                  {p.role}
                </span>
                <span className="hidden text-muted-foreground md:col-span-3 md:col-start-8 md:block">
                  {formatTechnologies(p.technologies)}
                </span>
              </>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
