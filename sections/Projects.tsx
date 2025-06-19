"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { useProjects } from "@/hooks/api/useProjects";

export const Projects = () => {
  const { projects, isPending, error } = useProjects();

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
      className="min-h-screen m-10 sm:m-15 lg:m-20 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20"
    >
      {projects &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </section>
  );
};
