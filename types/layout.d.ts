import { Project } from "./projects";

export interface LinkItem {
  id: string;
  label: string;
}

export interface CircuitConfig {
  corePosition: { x: number; y: number };
  projectPosition: { x: number };
  coreOffset: number;
  projectOffset: number;
  pathBend: { horizontal: number; vertical: number };
  connectionOffset: number;
  firstProjectOffset?: number;
}

export interface ProjectsLayoutConfig {
  gap: number;
  projectHeight: number;
  circuitConfig: CircuitConfig;
}

export interface CircuitPathProps {
  index: number;
  projects: Project[];
  containerSize: { width: number; height: number };
  config: CircuitConfig;
  projectHeight: number;
  gap: number;
  isHovered: boolean;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export interface CircuitNetworkProps {
  projects: Project[];
  containerSize: { width: number; height: number };
  hoveredProject: string | null;
  config: CircuitConfig;
  projectHeight: number;
  gap: number;
  breakpoint: "mobile" | "tablet" | "desktop";
}

export interface CoreNodeProps {
  breakpoint: "mobile" | "tablet" | "desktop";
}

export interface ProjectNodeProps {
  project: Project;
  isHovered: boolean;
  projectHeight?: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export interface ProjectListProps {
  projects: Project[];
  hoveredProject: string | null;
  breakpoint: "mobile" | "tablet" | "desktop";
  projectHeight: number;
  gap: number;
  onProjectHover: (projectId: string | null) => void;
  onProjectClick: (project: Project) => void;
}

interface VerticalLineProps {
  isEnd?: boolean;
  positionY?: string;
}
