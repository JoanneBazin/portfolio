import { CircuitNetworkProps } from "@/app/types";
import { CircuitPath } from "./CircuitPath";

export const CircuitNetwork = ({
  projects,
  containerSize,
  hoveredProject,
  config,
  projectHeight,
  gap,
  breakpoint,
}: CircuitNetworkProps) => {
  if (containerSize.width === 0 || containerSize.height === 0) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      width={containerSize.width}
      height={containerSize.height}
      viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {projects.map((project, index) => (
        <CircuitPath
          key={project.id}
          index={index}
          projects={projects}
          containerSize={containerSize}
          config={config}
          projectHeight={projectHeight}
          gap={gap}
          isHovered={hoveredProject === project.id}
          breakpoint={breakpoint}
        />
      ))}
    </svg>
  );
};
