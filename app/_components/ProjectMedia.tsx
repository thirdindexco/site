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
      className="block aspect-[4/3] w-full overflow-hidden"
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
          className="h-full w-full object-contain"
        />
      ) : (
        <img
          src={project.thumbnail ?? "/landscape.jpg"}
          alt=""
          className="h-full w-full object-contain"
        />
      )}
    </span>
  );
}
