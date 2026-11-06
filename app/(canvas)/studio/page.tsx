import type { Metadata } from "next";
import Link from "next/link";
import { DocSection, Document } from "../../_components/Document";
import {
  CLIENTS,
  COMMON_PROJECTS,
  CONTACT,
  ENGAGEMENT_SHAPES,
  FOCUS_AREAS,
  LINK,
  STUDIO_AVAILABILITY,
  STUDIO_LEAD,
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

// The studio, as a document on the sheet (see _components/Document.tsx).
const A = LINK;

export default function StudioPage() {
  return (
    <Document lead={`${STUDIO_LEAD} ${STUDIO_SUPPORT}`} support={STUDIO_PROOF}>
        <DocSection id="focus" label="Focus">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-[26px] md:grid-cols-3">
            {FOCUS_AREAS.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p className="text-pretty opacity-50">{f.description}</p>
              </li>
            ))}
          </ul>
        </DocSection>

        <DocSection id="engagements" label="Engagements">
          <div className="flex flex-col gap-y-[26px]">
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
        </DocSection>

        <DocSection id="clients" label="Clients">
          <ul className="grid grid-cols-2 gap-x-5 md:grid-cols-3">
            {CLIENTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </DocSection>

        <DocSection id="technology" label="Technology">
          <div>
            <ul className="grid grid-cols-2 gap-x-5 md:grid-cols-3">
              {TECHNOLOGY.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="pt-[13px] opacity-50">
              The stack is chosen to fit each engagement.
            </p>
          </div>
        </DocSection>

        <DocSection id="contact" label="Contact">
          <div>
            <p className="flex flex-col items-start">
              <a href={`mailto:${CONTACT.email}`} className={A}>
                {CONTACT.email}
              </a>
              <Link href="/inquire" className={LINK}>
                Project inquiry
              </Link>
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
        </DocSection>
    </Document>
  );
}
