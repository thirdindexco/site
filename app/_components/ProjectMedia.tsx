"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "../_lib/projects";

export function ProjectMedia({ project }: { project: Project }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      console.error(error);
    });
  };

  useEffect(() => {
    if (!project.video) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          playVideo();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [project.video]);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    playVideo();
  }, [shouldLoadVideo]);

  return (
    <span
      ref={containerRef}
      className="grid min-h-[48vh] grid-cols-4 items-center gap-4 px-6 md:min-h-[62vh] md:grid-cols-12 md:px-8 xl:px-0"
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={shouldLoadVideo ? project.video : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={playVideo}
          aria-hidden="true"
          className="col-span-4 h-auto max-h-[58vh] w-full object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-100 md:col-span-10 md:col-start-2 md:max-h-[66vh]"
        />
      ) : (
        <img
          src={project.thumbnail ?? "/landscape.jpg"}
          alt=""
          className="col-span-4 h-auto max-h-[58vh] w-full object-contain opacity-95 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-100 md:col-span-10 md:col-start-2 md:max-h-[66vh]"
        />
      )}
    </span>
  );
}
