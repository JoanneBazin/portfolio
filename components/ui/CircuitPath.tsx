"use client";

import { CircuitPathProps } from "@/app/types";
import { useMemo } from "react";

export const CircuitPath = ({
  index,
  projects,
  containerSize,
  config,
  projectHeight,
  gap,
  isHovered,
  breakpoint,
}: CircuitPathProps) => {
  const path = useMemo(() => {
    if (!containerSize.width || !containerSize.height) {
      return "";
    }

    const coreX = containerSize.width * config.corePosition.x;
    const coreY = containerSize.height * config.corePosition.y;
    const projectX = containerSize.width * config.projectPosition.x;

    let projectY;
    if (breakpoint === "mobile") {
      const totalProjectsHeight =
        projects.length * projectHeight + (projects.length - 1) * gap;
      const startY = (containerSize.height - totalProjectsHeight) / 2;
      projectY = startY + index * (projectHeight + gap) + projectHeight / 2;

      if (index === 0 && config.firstProjectOffset) {
        projectY += config.firstProjectOffset;
      }
    } else {
      const totalProjectsHeight =
        projects.length * projectHeight + (projects.length - 1) * gap;
      const flexStartY = (containerSize.height - totalProjectsHeight) / 2;
      projectY = flexStartY + index * (gap + projectHeight) + projectHeight / 2;
    }

    const deltaX = projectX - coreX;
    const deltaY = projectY - coreY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    const unitX = deltaX / distance;
    const unitY = deltaY / distance;

    const pathStartX = coreX + unitX * config.coreOffset;
    const pathStartY = coreY + unitY * config.coreOffset;

    const endX = projectX - unitX * config.projectOffset;
    const endY = projectY - unitY * config.projectOffset;

    let path = `M ${pathStartX} ${pathStartY}`;

    if (breakpoint === "mobile") {
      path += ` L ${pathStartX} ${endY}`;
      path += ` L ${endX} ${endY}`;
    } else {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const midX = pathStartX + deltaX * config.pathBend.horizontal;
        path += ` L ${midX} ${pathStartY}`;
        path += ` L ${midX} ${endY}`;
        path += ` L ${endX} ${endY}`;
      } else {
        const midY = pathStartY + deltaY * config.pathBend.vertical;
        path += ` L ${pathStartX} ${midY}`;

        const midX =
          endX -
          (deltaX > 0 ? config.connectionOffset : -config.connectionOffset);
        path += ` L ${midX} ${midY}`;
        path += ` L ${midX} ${endY}`;
        path += ` L ${endX} ${endY}`;
      }
    }

    return path;
  }, [
    index,
    projects.length,
    containerSize,
    config,
    projectHeight,
    gap,
    breakpoint,
  ]);

  return (
    <path
      d={path}
      stroke={isHovered ? "var(--accent)" : "var(--gray)"}
      strokeWidth={isHovered ? "3" : "2"}
      fill="none"
      strokeLinecap="square"
      className="transition-all duration-300"
      style={{
        filter: `drop-shadow(0 0 ${
          isHovered ? "8px" : "2px"
        } rgba(249, 115, 22, 0.6))`,
      }}
    />
  );
};
