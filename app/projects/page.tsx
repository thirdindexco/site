import type { Metadata } from "next";
import { InquiryCTA } from "../_components/InquiryCTA";
import { PageChrome } from "../_components/PageChrome";
import { ProjectIndex } from "../_components/ProjectIndex";
import { FLUID_GRID } from "../_lib/layout";
import { projects } from "../_lib/projects";

const pageTitle = "Selected Design Engineering Work — THIRD INDEX";
const pageDescription =
  "Selected product interfaces, design systems, websites, and web platforms built for Modern Treasury, VICE, Amazon, and other ambitious teams.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "Selected design engineering work by THIRD INDEX",
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

export default function ProjectsPage() {
  return (
    <PageChrome>
      <ProjectIndex projects={projects} />

      {/* Closing inquiry — same primary CTA block as the information page. */}
      <section className={`pt-16 md:pt-24 lg:pt-32 ${FLUID_GRID}`}>
        <div
          data-anim="body"
          className="col-span-12 font-mono text-3xs font-medium uppercase tracking-tight md:col-span-3 md:col-start-1"
        >
          inquiries
        </div>
        <div
          data-anim="body"
          className="col-span-12 pt-4 md:col-span-7 md:col-start-5 md:pt-0"
        >
          <h2 className="max-w-[44ch] font-sans text-lg font-medium leading-tight tracking-tight md:text-xl">
            have a project in mind? taking on project-based and fractional
            engagements — one-week audits, fixed-scope sprints, and embedded
            work.
          </h2>
          <InquiryCTA />
        </div>
      </section>
    </PageChrome>
  );
}
