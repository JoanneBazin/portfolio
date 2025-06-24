import { ProjectNodeProps } from "@/lib/types";

export const ProjectNode = ({
  project,
  isHovered,
  projectHeight,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ProjectNodeProps) => {
  return (
    <div
      className={`relative bg-background w-4/5 lg:w-full rounded-xl cursor-pointer border border-transparent transition-all duration-250 z-20 ${
        isHovered ? "border-accent scale-110 shadow-lg" : ""
      }`}
      style={{
        height: `${projectHeight}px`,
        boxShadow: isHovered ? "0 0 20px rgba(251, 191, 36, 0.6)" : "",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label="Ouvrir la modale du projet"
    >
      <div className="flex items-center p-4">
        <div
          className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full -left-2 top-1/2 transform -translate-y-1/2 z-40"
          style={{
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)",
          }}
        />

        <div className="flex-1">
          <div className="text-base sm:text-lg font-medium mb-1 leading-tight">
            {project.title}
          </div>
          <div className="text-xs sm:text-sm text-accent leading-tight">
            {project.skills.join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};
