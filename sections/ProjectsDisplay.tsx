"use client";
import { useProjects } from "@/hooks/api/useProjects";
import { Project } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export const ProjectsDisplay = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects } = useProjects();

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

  const generateCircuitPath = (index: number) => {
    if (!containerSize.width || !containerSize.height) {
      return "";
    }

    const coreX = containerSize.width * 0.2;
    const coreY = containerSize.height * 0.5;

    const projectX = containerSize.width * 0.75;

    const totalProjectsHeight =
      projects.length * 80 + (projects.length - 1) * 85;
    const flexStartY = (containerSize.height - totalProjectsHeight) / 2;
    const projectY = flexStartY + index * (85 + 80) + 40;

    const deltaX = projectX - coreX;
    const deltaY = projectY - coreY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const offsetDistance = 25;
    const unitX = deltaX / distance;
    const unitY = deltaY / distance;

    const pathStartX = coreX + unitX * offsetDistance;
    const pathStartY = coreY + unitY * offsetDistance;

    const endOffsetDistance = 25;
    const endX = projectX - unitX * endOffsetDistance;
    const endY = projectY - unitY * endOffsetDistance;

    let path = `M ${pathStartX} ${pathStartY}`;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      const midX = pathStartX + deltaX * 0.3;
      path += ` L ${midX} ${pathStartY}`;
      path += ` L ${midX} ${endY}`;
      path += ` L ${endX} ${endY}`;
    } else {
      const midY = pathStartY + deltaY * 0.4;
      path += ` L ${pathStartX} ${midY}`;

      const midX = endX - (deltaX > 0 ? 30 : -30);
      path += ` L ${midX} ${midY}`;
      path += ` L ${midX} ${endY}`;
      path += ` L ${endX} ${endY}`;
    }

    return path;
  };

  return (
    <section
      id="projects"
      className="min-h-screen w-screen p-10 lg:pr-40 snap-start"
    >
      <div ref={containerRef} className="relative w-full h-screen flex">
        {/* Lignes connexion */}
        {containerSize.width > 0 && containerSize.height > 0 && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            width={containerSize.width}
            height={containerSize.height}
            viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {projects.map((project, index) => {
              const path = generateCircuitPath(index);
              return (
                <path
                  key={project.id}
                  d={path}
                  stroke={hoveredProject === project.id ? "#fbbf24" : "#f97316"}
                  strokeWidth={hoveredProject === project.id ? "3" : "2"}
                  fill="none"
                  strokeLinecap="square"
                  className="transition-all duration-300"
                  style={{
                    filter: `drop-shadow(0 0 ${
                      hoveredProject === project.id ? "8px" : "4px"
                    } rgba(249, 115, 22, 0.6))`,
                  }}
                />
              );
            })}
          </svg>
        )}

        {/* Noeud central */}
        <div className="w-1/5 lg:w-2/5 flex items-center justify-center relative z-30">
          <div
            className="w-10 h-10 bg-background rounded-full flex items-center justify-center font-bold text-lg border-4 border-accent shadow-lg"
            style={{
              boxShadow: "0 0 30px rgba(249, 115, 22, 0.7",
            }}
          >
            <i className="fa-solid fa-code text-xs"></i>
          </div>
        </div>

        {/* Noeuds projets */}
        <div className="w-4/5 lg:w-3/5 flex flex-col justify-center gap-20 px-8 relative z-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative bg-background rounded-xl cursor-pointer border border-transparent transition-all duration-250 z-20 ${
                hoveredProject === project.id
                  ? "border-accent scale-110 shadow-lg"
                  : ""
              }`}
              style={{
                height: "80px",
                boxShadow:
                  hoveredProject === project.id
                    ? "0 0 20px rgba(251, 191, 36, 0.6)"
                    : "",
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center p-4">
                <div
                  className="absolute w-3 h-3 bg-accent rounded-full -left-2 top-1/2 transform -translate-y-1/2 z-40"
                  style={{
                    boxShadow: "0 0 8px rgba(251, 191, 36, 0.8",
                  }}
                />

                <div className="flex-1">
                  <div className="text-lg font-bold mb-1 leading-tight">
                    {project.title}
                  </div>
                  <div className="text-sm text-accent leading-tight">
                    {project.skills.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
