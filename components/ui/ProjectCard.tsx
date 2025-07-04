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
      data-testid="project-item"
      style={{
        order: project.order,
      }}
    >
      <div className="hidden sm:block sm:w-1/6 lg:w-1/5 h-[2px] bg-accent-50"></div>

      <div
        className={`relative bg-background w-full sm:w-5/6 lg:w-2/3 p-3 sm:p-6 rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-50)] transition-all duration-250 z-20 ${
          isHovered ? "scale-110 shadow-lg z-100" : ""
        }`}
        style={{
          boxShadow: isHovered ? "0 0 20px var(--accent-50)" : undefined,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
        aria-label="Ouvrir la modale du projet"
        role="button"
        tabIndex={0}
      >
        <div
          className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-accent-50 rounded-full left-[-5px] sm:left-0 top-1/2 transform -translate-y-1/2 z-40"
          style={{
            boxShadow: "0 0 8px rgba(251, 191, 36, 0.8)",
          }}
        />
        <h4 className="text-sm sm:text-base font-medium mb-1 leading-tight">
          {project.title}
        </h4>
        <div className="text-xs sm:text-sm text-accent leading-tight">
          {project.skills.join(", ")}
        </div>
      </div>
    </div>
  );
};
