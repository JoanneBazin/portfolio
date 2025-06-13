"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { Project } from "@/lib/types";
import { useEffect, useState } from "react";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/projects/projects.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen m-10 sm:m-15 lg:m-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {projects
        ? projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        : null}
    </section>
  );
};
