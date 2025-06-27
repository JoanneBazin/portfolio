"use client";

import { useProjects } from "@/hooks/api/useProjects";
import { useEffect, useRef, useState } from "react";
import { Project } from "@/app/types";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useProjectsLayout } from "@/hooks/useProjectsLayout";
import { CircuitNetwork } from "@/components/ui/CircuitNetwork";
import { CoreNode } from "@/components/ui/CoreNode";
import { ProjectsList } from "@/components/ui/ProjectsList";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Loader } from "@/components/ui/Loader";
import { VerticalLine } from "@/components/ui/VerticalLine";

export const ProjectsCircuits = () => {
  const { projects, isPending, error } = useProjects();
  const breakpoint = useBreakpoint();
  const layout = useProjectsLayout(breakpoint);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        if (offsetWidth > 0 && offsetHeight > 0) {
          setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
          setIsReady(true);
        }
      }
    };
    setTimeout(updateSize, 100);

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [isPending, projects.length]);

  const handleProjectHover = (projectId: string | null) => {
    setHoveredProject(projectId);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full snap-start px-8 pt-10 sm:pt-28 lg:pt-32 pb-28 sm:pb-0 lg:pr-44"
    >
      <VerticalLine />
      {error ? (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <p className="text-red text-lg text-center">{error.message}</p>
        </div>
      ) : (
        <>
          <div
            ref={containerRef}
            className="relative w-full h-full flex flex-col sm:flex-row"
          >
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            )}

            {!isPending && (
              <>
                {isReady && containerSize.width > 0 && (
                  <CircuitNetwork
                    projects={projects}
                    containerSize={containerSize}
                    hoveredProject={hoveredProject}
                    config={layout.circuitConfig}
                    projectHeight={layout.projectHeight}
                    gap={layout.gap}
                    breakpoint={breakpoint}
                  />
                )}

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
              </>
            )}
          </div>
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </>
      )}
    </section>
  );
};
