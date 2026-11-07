import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkView } from "../../../_components/WorkView";
import { findProject, projectSlug, projects } from "../../../_lib/projects";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const hit = findProject((await params).slug);
  if (!hit) return {};
  const { project } = hit;
  const title = `${project.title} — THIRD INDEX`;
  const description = `${project.role}. ${project.description}`;
  const path = `/work/${projectSlug(project)}`;
  const image = project.thumbnail ?? "/og.jpg";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      images: [{ url: image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// One project, open on the sheet. The shell marks its number and offers
// the ones either side; this draws the media and the particulars.
export default async function WorkPage({ params }: { params: Params }) {
  const hit = findProject((await params).slug);
  if (!hit) notFound();
  const { project, index } = hit;
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <WorkView project={project} prev={prev} next={next} />;
}
