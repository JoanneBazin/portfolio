"use client";

import { useProjects } from "@/hooks/api/useProjects";
import { useState } from "react";
import { Project } from "@/app/types";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { Loader } from "@/components/ui/Loader";
import { VerticalLine } from "@/components/ui/VerticalLine";
import { ProjectCard } from "@/components/ui/ProjectCard";

export const Projects = () => {
  const { projects, isPending, error } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen h-screen w-full snap-start px-8 sm:px-20 pt-10 lg:pt-0 pb-28 sm:pb-0 lg:pr-44"
    >
      <VerticalLine />
      {error ? (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <p className="text-red text-lg text-center">{error.message}</p>
        </div>
      ) : (
        <>
          <div className="w-full h-full flex flex-col justify-center gap-2 sm:gap-4">
            {isPending && <Loader />}
            <>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isHovered={hoveredProject === project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </>
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
