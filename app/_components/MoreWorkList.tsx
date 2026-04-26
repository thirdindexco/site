"use client";

import { useState } from "react";
import { Collapsible } from "@base-ui-components/react/collapsible";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";

export type Project = {
  title: string;
  role: string;
  url: string;
  description: string;
  technologies: string;
};

const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  closed: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
};

const detailVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 },
  },
  closed: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.15 },
  },
};

function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li variants={itemVariants} className="w-full">
      <Collapsible.Root
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col"
      >
        <Collapsible.Trigger
          data-state={open ? "open" : "closed"}
          className="group/title block w-full outline-none cursor-pointer text-left"
        >
          <span className="block font-ld font-light text-2xl md:text-4xl uppercase leading-[0.85] tracking-tight opacity-40 group-hover/title:opacity-100 group-data-[state=open]/title:opacity-100 transition-opacity duration-300">
            {project.title}
          </span>
        </Collapsible.Trigger>
        <Collapsible.Panel keepMounted className="collapsible-panel w-full">
          <motion.div
            initial="closed"
            animate={open ? "open" : "closed"}
            variants={detailVariants}
            className="flex flex-col gap-4 pt-3 pb-5"
          >
            <p className="font-ld font-light text-sm leading-snug tracking-tight">
              {project.description}
            </p>
            <div className="flex flex-col gap-0.5">
              <p className="font-mono font-medium text-3xs uppercase tracking-tight opacity-70">
                {project.role}
              </p>
              <p className="font-mono font-light text-3xs tracking-tight opacity-70">
                {project.technologies
                  .split(",")
                  .map((t) => t.trim())
                  .join(" · ")}
              </p>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/visit self-start inline-flex items-center gap-1.5 font-mono font-medium text-3xs uppercase tracking-tight text-foreground opacity-60 underline decoration-solid underline-offset-2 transition-opacity hover:opacity-100 whitespace-nowrap outline-none"
            >
              visit {project.title.toLowerCase()}
              <ArrowUpRight
                aria-hidden
                className="h-3 w-3 transition-transform duration-200 group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5"
              />
            </a>
          </motion.div>
        </Collapsible.Panel>
      </Collapsible.Root>
    </motion.li>
  );
}

export function MoreWorkList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col w-full"
    >
      <Collapsible.Trigger className="group mt-5 inline-flex items-center gap-1.5 font-mono font-medium text-3xs uppercase tracking-tight transition-colors hover:text-accent outline-none cursor-pointer self-start">
        <span className="group-data-[panel-open]:hidden">previously</span>
        <span className="hidden group-data-[panel-open]:inline">hide</span>
        <Plus
          aria-hidden
          className="h-3 w-3 group-data-[panel-open]:hidden"
        />
        <Minus
          aria-hidden
          className="h-3 w-3 hidden group-data-[panel-open]:inline"
        />
      </Collapsible.Trigger>
      <Collapsible.Panel keepMounted className="collapsible-panel w-full">
        <motion.ol
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={listVariants}
          className="flex flex-col pt-9"
        >
          {projects.map((p) => (
            <ProjectRow key={p.url} project={p} />
          ))}
        </motion.ol>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
