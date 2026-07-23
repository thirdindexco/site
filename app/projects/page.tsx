import type { Metadata } from "next";
import { PageChrome } from "../_components/PageChrome";
import { ProjectIndex } from "../_components/ProjectIndex";
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
    </PageChrome>
  );
}
