import type { Metadata } from "next";
import Link from "next/link";
import {
  FADE,
  LINK,
  STUDIO_LEAD,
  STUDIO_PROOF,
  STUDIO_SUPPORT,
  indexNumber,
} from "../_lib/canvas";
import { projects, workHref } from "../_lib/projects";

const pageTitle = "THIRD INDEX — Technology Studio";
const pageDescription =
  "Independent technology studio in Las Vegas — design, engineering, and frontend consulting for custom web applications, storefronts, and product interfaces. Work for Pentagram, Grey, Amazon, VICE, and Condé Nast.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "THIRD INDEX — technology studio designing and building for the web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/og.jpg"],
  },
};

// Home. On the sheet the shell draws everything: the six numbers and the
// centre line are the page. The narrow page gets the statement and the
// six as a list.
export default function HomePage() {
  return (
    <div className={`${FADE} p-3 md:hidden`}>
      <h1 className="max-w-[40ch] text-pretty">
        {STUDIO_LEAD} {STUDIO_SUPPORT}
      </h1>
      <p className="max-w-[40ch] text-pretty opacity-50">{STUDIO_PROOF}</p>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-6 pt-12">
        {projects.slice(0, 6).map((p, i) => (
          <li key={p.url}>
            <Link href={workHref(p)} className={`${LINK} block`}>
              <span className="tabular-nums opacity-50">{indexNumber(i)}</span>
              <br />
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
