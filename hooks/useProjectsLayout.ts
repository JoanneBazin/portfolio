"use client";

import { ProjectsLayoutConfig } from "@/app/types";
import { useMemo } from "react";

export const useProjectsLayout = (
  breakpoint: "mobile" | "tablet" | "desktop"
): ProjectsLayoutConfig => {
  return useMemo(() => {
    const configs = {
      mobile: {
        gap: 40,
        projectHeight: 60,
        circuitConfig: {
          corePosition: { x: 0.008, y: 0.02 },
          projectPosition: { x: 0.5 },
          coreOffset: 25,
          projectOffset: -20,
          pathBend: { horizontal: 0.5, vertical: 0.3 },
          connectionOffset: 20,
          firstProjectOffset: 8,
        },
      },
      tablet: {
        gap: 75,
        projectHeight: 75,
        circuitConfig: {
          corePosition: { x: 0.09, y: 0.5 },
          projectPosition: { x: 0.8 },
          coreOffset: 30,
          projectOffset: 2,
          pathBend: { horizontal: 0.25, vertical: 0.25 },
          connectionOffset: 28,
        },
      },
      desktop: {
        gap: 85,
        projectHeight: 80,
        circuitConfig: {
          corePosition: { x: 0.18, y: 0.5 },
          projectPosition: { x: 0.75 },
          coreOffset: 40,
          projectOffset: 2,
          pathBend: { horizontal: 0.25, vertical: 0.4 },
          connectionOffset: 30,
        },
      },
    };

    return configs[breakpoint];
  }, [breakpoint]);
};
