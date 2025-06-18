"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { useProjects } from "@/hooks/api/useProjects";

export const Projects = () => {
  const { projects } = useProjects();

  return (
    <section
      id="projects"
      className="min-h-screen m-10 sm:m-15 lg:m-20 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20"
    >
      {projects
        ? projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        : null}
    </section>
  );
};
