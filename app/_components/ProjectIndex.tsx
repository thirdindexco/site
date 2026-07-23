"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { formatTechnologies } from "../_lib/format";
import { FLUID_GRID } from "../_lib/layout";
import type { Project } from "../_lib/projects";

gsap.registerPlugin(ScrollTrigger);

// Cursor-following media width (px). Height follows the asset's ratio.
const FOLLOWER_W = 340;

// Tactical project index: full-bleed table rows (index / title / role /
// stack) with a background-fill hover state, a cursor-following thumbnail
// that supports stills and video loops, and a collapsible detail row.
export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rafRef = useRef(0);

  // Cursor position within the section (target) and the smoothed position
  // the follower is actually drawn at.
  const targetPos = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });
  const entered = useRef(false);

  const animatePosition = useCallback(() => {
    smoothPos.current.x += (targetPos.current.x - smoothPos.current.x) * 0.12;
    smoothPos.current.y += (targetPos.current.y - smoothPos.current.y) * 0.12;

    if (followerRef.current) {
      followerRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
    }

    rafRef.current = requestAnimationFrame(animatePosition);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animatePosition);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animatePosition]);

  // Track the cursor within the section. On first entry the smoothed
  // position snaps to the cursor so the follower doesn't fly in from 0,0.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetPos.current.x = e.clientX - rect.left;
      targetPos.current.y = e.clientY - rect.top;
      if (!entered.current) {
        entered.current = true;
        smoothPos.current.x = targetPos.current.x;
        smoothPos.current.y = targetPos.current.y;
      }
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Video loops only spin while their row is hovered.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === hoverIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [hoverIndex]);

  // Scroll-in reveal for the rows. Initial hidden state is applied here (not
  // inline) so reduced-motion and no-JS render the list as-is.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = el.querySelectorAll(".project-row");
    gsap.set(items, { y: 10, autoAlpha: 0 });

    const tween = gsap.to(items, {
      y: 0,
      autoAlpha: 1,
      duration: 0.4,
      stagger: 0.04,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="relative pt-12 md:pt-20 lg:pt-24"
    >
      {/* Desktop cursor-following media — floats above the rows, centered
          slightly up-right of the cursor. Stills and video loops. */}
      <div
        ref={followerRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
        style={{ willChange: "transform" }}
      >
        {projects.map((project, i) => (
          <div
            key={project.url}
            className={`absolute left-4 bottom-4 transition-opacity duration-300 ${
              hoverIndex === i ? "opacity-100" : "opacity-0"
            }`}
            style={{ width: FOLLOWER_W }}
          >
            {project.video ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full"
              />
            ) : (
              <img
                src={project.thumbnail ?? "/landscape.jpg"}
                alt=""
                className="w-full"
              />
            )}
          </div>
        ))}
      </div>

      <div className={FLUID_GRID}>
        <div className="col-span-12 font-mono text-3xs font-medium uppercase tracking-tight">
          selected work
        </div>
      </div>

      <div ref={listRef} className="mt-6 md:mt-8">
        {projects.map((project, index) => {
          const isOpen = openIndex === index;
          const isHovered = hoverIndex === index;
          return (
            <div key={project.url} className="project-row">
              {/* Row — bleeds through the page padding so the hover fill
                  runs edge to edge. */}
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`relative z-10 -mx-4 grid min-h-11 w-[calc(100%+2rem)] cursor-pointer grid-cols-12 items-center gap-6 px-4 py-3 text-left outline-none transition-colors duration-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:-outline-offset-[1.5px] focus-visible:outline-[color:var(--accent)] md:-mx-5 md:min-h-0 md:w-[calc(100%+2.5rem)] md:items-baseline md:px-5 md:py-[3px] ${
                  isHovered || isOpen
                    ? "bg-foreground text-background"
                    : ""
                }`}
              >
                <span className="col-span-2 font-mono text-2xs font-medium tabular-nums tracking-tight opacity-50 md:col-span-1">
                  {String(index + 1).padStart(3, "0")}
                </span>
                <span className="col-span-10 font-mono text-2xs font-medium uppercase leading-tight tracking-tight md:col-span-3 md:col-start-5">
                  {project.title}
                </span>
                <span className="hidden font-mono text-2xs font-medium uppercase tracking-tight opacity-50 md:col-span-2 md:col-start-8 md:block">
                  {project.role}
                </span>
                <span className="hidden text-right font-mono text-2xs font-medium uppercase tracking-tight opacity-50 md:col-span-3 md:col-start-10 md:block">
                  {formatTechnologies(project.technologies)}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={`${FLUID_GRID} pb-8 pt-4 md:pb-10`}>
                      {/* Mobile — no follower, media renders inline */}
                      <div className="col-span-12 md:hidden">
                        {project.video ? (
                          <video
                            src={project.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full"
                          />
                        ) : (
                          <img
                            src={project.thumbnail ?? "/landscape.jpg"}
                            alt={project.title}
                            className="w-full"
                          />
                        )}
                      </div>

                      <p className="col-span-12 pt-4 font-sans text-sm leading-relaxed text-pretty md:col-span-4 md:col-start-5 md:max-w-[52ch] md:pt-0">
                        {project.description}
                      </p>

                      <div className="col-span-12 flex flex-col gap-1 pt-2 font-mono text-3xs font-medium uppercase tracking-tight opacity-60 md:hidden">
                        <span>{project.role}</span>
                        <span>{formatTechnologies(project.technologies)}</span>
                      </div>

                      <div className="col-span-12 pt-3 md:col-span-3 md:col-start-10 md:pt-0">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/visit inline-flex items-center gap-1.5 font-mono text-3xs font-medium uppercase tracking-tight opacity-70 outline-none transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
                        >
                          visit
                          <ArrowRight
                            aria-hidden
                            className="h-3 w-3 transition-transform duration-200 group-hover/visit:translate-x-0.5"
                          />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
