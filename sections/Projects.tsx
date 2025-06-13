"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  images: string[];
  tech: string[];
  objectives: string[];
  size: string;
  order: number;
};

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
    <section id="projects" className="min-h-screen bg-gray-700 m-10">
      {projects
        ? projects.map((project) => <div key={project.id}>{project.title}</div>)
        : null}
    </section>
  );
};
