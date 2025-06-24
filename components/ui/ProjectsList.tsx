import { ProjectListProps } from "@/lib/types";
import { ProjectNode } from "./ProjectNode";

export const ProjectsList = ({
  projects,
  hoveredProject,
  breakpoint,
  projectHeight,
  gap,
  onProjectHover,
  onProjectClick,
}: ProjectListProps) => {
  const getContainerClass = () => {
    if (breakpoint === "mobile") return "w-full";
    if (breakpoint === "tablet") return "w-4/5";
    return "w-full lg:w-3/5";
  };
  return (
    <div
      className={`${getContainerClass()} flex flex-col justify-center items-end lg:items-start relative z-20`}
      style={{ gap: `${gap}px` }}
    >
      {projects.map((project) => (
        <ProjectNode
          key={project.id}
          project={project}
          isHovered={hoveredProject === project.id}
          projectHeight={projectHeight}
          onMouseEnter={() => onProjectHover(project.id)}
          onMouseLeave={() => onProjectHover(null)}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
};
