import data from "../../public/data.json";

export type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  thumbnail?: string;
  // Stills for the expanded row, stepped through as a gallery. The
  // thumbnail stays the hover follower.
  images?: string[];
  video?: string;
  // Year the work shipped. When every project carries one, the index on
  // the home canvas lays the years out as a timeline, a column per year.
  year?: number;
};

export const projects = data.projects as Project[];

// Each project has a URL of its own under /work, named from its title:
// "halloran.app" is /work/halloran-app.
export const projectSlug = (project: Project) =>
  project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const workHref = (project: Project) => `/work/${projectSlug(project)}`;

export function findProject(slug: string) {
  const index = projects.findIndex((p) => projectSlug(p) === slug);
  return index === -1 ? null : { project: projects[index], index };
}
