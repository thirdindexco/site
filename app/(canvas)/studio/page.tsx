import type { Metadata } from "next";
import Link from "next/link";
import { InquireLink } from "../../_components/InquireLink";
import {
  CLIENTS,
  COMMON_PROJECTS,
  CONTACT,
  ENGAGEMENT_SHAPES,
  FADE,
  FOCUS_AREAS,
  LINK,
  STUDIO_AVAILABILITY,
  STUDIO_BASE,
  STUDIO_LEAD,
  STUDIO_PERSON,
  STUDIO_PROOF,
  STUDIO_SUPPORT,
  TECHNOLOGY,
} from "../../_lib/canvas";

const pageTitle = "Studio — THIRD INDEX";
const pageDescription =
  "Independent technology studio in Las Vegas led by Michael Ciccarelli: product interfaces, design systems, websites and rebuilds, CMS systemization, creative development, and frontend architecture. Project work from $5k a week; embedded frontend engineering from $10k a month.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/studio" },
  openGraph: {
    type: "website",
    url: "/studio",
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

// The studio, as a document on the twelve-column grid: a label in the
// first two columns, the content from the fourth. The statement sits in
// the top half of the sheet where the home has nothing; the sections
// start under the centre line and scroll up behind it.
const SECTION = "md:grid md:grid-cols-12 md:gap-x-5";
const LABEL = "pb-[13px] opacity-50 md:col-span-2 md:pb-0";
const CONTENT = "md:col-span-9 md:col-start-4";
const A =
  "outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent";

export default function StudioPage() {
  return (
    <article className={`${FADE} p-3 md:relative md:min-h-svh md:p-2`}>
      <header className="max-w-[48ch] text-pretty md:absolute md:left-2 md:top-2">
        <h1>
          {STUDIO_LEAD} {STUDIO_SUPPORT}
        </h1>
        <p className="opacity-50">{STUDIO_PROOF}</p>
      </header>

      <div className="flex flex-col gap-y-[52px] pt-12 md:pb-[52px] md:pt-[calc(50svh+12px)]">
        <section className={SECTION} aria-labelledby="studio">
          <h2 id="studio" className={LABEL}>
            Studio
          </h2>
          <div className={`${CONTENT} md:grid md:grid-cols-9 md:gap-x-5`}>
            <img
              src="/portrait.webp"
              alt="Michael Ciccarelli"
              width={960}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-[96px] object-cover md:col-span-1"
            />
            <div className="max-w-[48ch] pt-[13px] md:col-span-5 md:col-start-2 md:pt-0">
              <p>Michael Ciccarelli</p>
              <p className="pt-[13px] text-pretty">{STUDIO_PERSON}</p>
              <p className="pt-[13px]">{STUDIO_BASE}</p>
              <p className="flex gap-6 pt-[13px] opacity-50">
                <a href={`mailto:${CONTACT.email}`} className={A}>
                  {CONTACT.email}
                </a>
                <a
                  href={CONTACT.elsewhere}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={A}
                >
                  relli.cc
                </a>
                <a href="/llms.txt" className={A}>
                  llms.txt
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className={SECTION} aria-labelledby="focus">
          <h2 id="focus" className={LABEL}>
            Focus
          </h2>
          <ul
            className={`${CONTENT} grid grid-cols-2 gap-x-5 gap-y-[26px] md:grid-cols-3`}
          >
            {FOCUS_AREAS.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p className="text-pretty opacity-50">{f.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={SECTION} aria-labelledby="engagements">
          <h2 id="engagements" className={LABEL}>
            Engagements
          </h2>
          <div className={`${CONTENT} flex flex-col gap-y-[26px]`}>
            <ul className="flex flex-col gap-y-[13px]">
              {ENGAGEMENT_SHAPES.map((e) => (
                <li key={e.href} className="md:grid md:grid-cols-9 md:gap-x-5">
                  <h3 className="md:col-span-2">
                    <Link href={e.href} className={LINK}>
                      {e.title}
                    </Link>
                  </h3>
                  <p className="text-pretty md:col-span-5">
                    {e.terms}{" "}
                    <span className="opacity-50">{e.description}</span>
                  </p>
                </li>
              ))}
            </ul>
            <div>
              <p className="opacity-50">Common projects</p>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-[13px] pt-[13px] md:grid-cols-4">
                {COMMON_PROJECTS.map((c) => (
                  <li key={c.title}>
                    <h4>
                      {c.title}
                      <span className="opacity-50"> {c.length}</span>
                    </h4>
                    <p className="text-pretty opacity-50">{c.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={SECTION} aria-labelledby="clients">
          <h2 id="clients" className={LABEL}>
            Clients
          </h2>
          <ul
            className={`${CONTENT} grid grid-cols-2 gap-x-5 md:grid-cols-3`}
          >
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className={SECTION} aria-labelledby="technology">
          <h2 id="technology" className={LABEL}>
            Technology
          </h2>
          <div className={CONTENT}>
            <ul className="grid grid-cols-2 gap-x-5 md:grid-cols-3">
              {TECHNOLOGY.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="pt-[13px] opacity-50">
              The stack is chosen to fit each engagement.
            </p>
          </div>
        </section>

        <section className={SECTION} aria-labelledby="contact">
          <h2 id="contact" className={LABEL}>
            Contact
          </h2>
          <div className={CONTENT}>
            <p className="flex flex-col items-start">
              <a href={`mailto:${CONTACT.email}`} className={A}>
                {CONTACT.email}
              </a>
              <InquireLink className={LINK}>Project inquiry</InquireLink>
              <a
                href={CONTACT.call}
                target="_blank"
                rel="noopener noreferrer"
                className={A}
              >
                Book a call
              </a>
            </p>
            <p className="pt-[13px] opacity-50">{STUDIO_AVAILABILITY}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
