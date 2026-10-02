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
};

export const projects = data.projects as Project[];
