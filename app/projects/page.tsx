import type { Metadata } from "next";
import { PageChrome } from "../_components/PageChrome";
import { ProjectIndex } from "../_components/ProjectIndex";
import { projects } from "../_lib/projects";

const pageTitle = "projects — third index";
const pageDescription =
  "selected work — product interfaces, design systems, and web platforms for modern treasury, vice, amazon, and more.";

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
        alt: "third index — projects",
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
