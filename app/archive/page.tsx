import type { Metadata } from "next";
import { Clock } from "../_components/Clock";
import data from "../../public/data.json";

type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
  image: string;
};

const projects = data.projects as Project[];

export const metadata: Metadata = {
  title: "archive — third index",
  description: "selected work from the studio and before.",
};

export default function ArchivePage() {
  return (
    <main className="mx-auto max-w-[1440px] px-5">
      {/* Top bar */}
      <header className="flex items-center pt-[13px] font-mono font-light text-[9px] uppercase tracking-[-0.01em]">
        <Clock />
        <span className="pl-2">· open for work</span>
      </header>

      {/* Masthead */}
      <section className="pt-[80px] md:pt-[120px]">
        <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink pb-5">
          archive / selected works
        </div>
        <h1 className="font-ld font-light text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] text-pretty max-w-[1100px]">
          a decade of interfaces, platforms, and brands — shipped for clients,
          shipped for the studio.
        </h1>
      </section>

      {/* Meta row */}
      <section className="flex items-end justify-between pt-10 md:pt-14 pb-6 md:pb-8 font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink">
        <span>{projects.length.toString().padStart(2, "0")} projects</span>
        <span>2016 — {new Date().getFullYear()}</span>
      </section>

      {/* List */}
      <ol className="border-t border-black/10">
        {projects.map((p, i) => (
          <li key={p.url} className="border-b border-black/10">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-12 gap-6 py-8 md:py-10 items-start"
            >
              <span className="col-span-12 md:col-span-1 font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-ink">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="col-span-12 md:col-span-5 max-w-[520px]">
                <h2 className="font-ld font-light text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.02em] text-pretty transition-colors duration-200 group-hover:text-accent">
                  {p.title}
                </h2>
                <div className="pt-3 font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-muted">
                  {p.role}
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 max-w-[520px] space-y-4">
                <p className="font-ld font-light text-[15px] md:text-[16px] leading-[1.5] tracking-[-0.01em] text-ink text-pretty">
                  {p.description}
                </p>
                <div className="font-mono font-medium text-[9px] uppercase tracking-[-0.01em] text-muted">
                  {p.technologies.split(",").map((t) => t.trim()).join(" · ")}
                </div>
              </div>

              <span
                aria-hidden
                className="col-span-12 md:col-span-1 md:justify-self-end font-mono text-[14px] text-ink transition-all duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ol>

      {/* Back */}
      <section className="py-12 md:py-16">
        <a
          href="/"
          className="font-ld font-light text-[15px] md:text-[16px] text-accent inline-block"
        >
          ← back to index
        </a>
      </section>
    </main>
  );
}
