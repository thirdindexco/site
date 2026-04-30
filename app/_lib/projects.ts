import data from "../../public/data.json";

export type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  thumbnail?: string;
  video?: string;
};

export type Service = {
  title: string;
  description: string;
  timeline?: string;
};

export const projects = data.projects as Project[];
export const services = data.services as Service[];
