import { ProjectLandingProps } from "@/types";

export const ProjectCard = ({
  project,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: ProjectLandingProps) => {
  return (
    <div
      className="w-full flex items-center"
      style={{
        order: project.order,
      }}
    >
      <div className="sm:w-1/6 lg:w-1/5 h-[2px] bg-accent-50"></div>

      <div
        className={`relative bg-background sm:w-5/6 lg:w-2/3 p-3 sm:p-6 rounded-xl cursor-pointer border border-transparent transition-all duration-250 z-20 ${
          isHovered ? "border-accent scale-110 shadow-lg z-100" : ""
        }`}
        style={{
          boxShadow: isHovered ? "0 0 20px var(--accent-50)" : "",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        aria-label="Ouvrir la modale du projet"
      >
        <div
          className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-accent-50 rounded-full left-0 top-1/2 transform -translate-y-1/2 z-40"
          style={{
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)",
          }}
        />
        <div className="text-base sm:text-lg font-medium mb-1 leading-tight">
          {project.title}
        </div>
        <div className="text-xs sm:text-sm text-accent leading-tight">
          {project.skills.join(", ")}
        </div>
      </div>
    </div>
  );
};
