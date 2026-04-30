export function formatTechnologies(technologies: string) {
  return technologies
    .split(",")
    .map((technology) => technology.trim())
    .join(" / ");
}
