"use client";

import { useProjects } from "@/hooks/api/useProjects";
import { useEffect, useRef, useState } from "react";
import { Project } from "@/lib/types";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useProjectsLayout } from "@/hooks/useProjectsLayout";
import { CircuitNetwork } from "@/components/ui/CircuitNetwork";
import { CoreNode } from "@/components/ui/CoreNode";
import { ProjectsList } from "@/components/ui/ProjectsList";

export const Projects = () => {
  const { projects, isPending, error } = useProjects();
  const breakpoint = useBreakpoint();
  const layout = useProjectsLayout(breakpoint);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleProjectHover = (projectId: string | null) => {
    setHoveredProject(projectId);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  if (isPending) {
    return (
      <section
        id="projects"
        className="min-h-screen m-10 sm:m-15 lg:m-20 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20"
      >
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-dark-gray h-48 rounded-lg mb-4"></div>
              <div className="bg-dark-gray h-4 rounded mb-2"></div>
              <div className="bg-dark-gray h-4 rounded w-3/4"></div>
            </div>
          ))}
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="min-h-screen m-10 sm:m-15 lg:m-20">
        <p className="text-center my-20 text-lg text-medium text-red-900"></p>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-screen w-full snap-start pt-10 pb-28 sm:pb-0 px-8 sm:pt-24 lg:pt-28"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col sm:flex-row"
      >
        <CircuitNetwork
          projects={projects}
          containerSize={containerSize}
          hoveredProject={hoveredProject}
          config={layout.circuitConfig}
          projectHeight={layout.projectHeight}
          gap={layout.gap}
          breakpoint={breakpoint}
        />

        <CoreNode breakpoint={breakpoint} />

        <ProjectsList
          projects={projects}
          hoveredProject={hoveredProject}
          breakpoint={breakpoint}
          projectHeight={layout.projectHeight}
          gap={layout.gap}
          onProjectHover={handleProjectHover}
          onProjectClick={handleProjectClick}
        />
      </div>
    </section>
  );
};
