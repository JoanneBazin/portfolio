export interface Project {
  id: string;
  title: string;
  description: string;
  images: ProjectImage[];
  skills: string[];
  objectives: string[];
  githubUrl?: string;
  liveUrl?: string;
  size: "small" | "medium" | "large";
  order: number;
  createdAt: Date;
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  cover: boolean;
  projectId: string;
}

export interface Skill {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  images: (File | ProjectImage)[];
  skills: { value: string }[];
  objectives: { value: string }[];
  githubUrl?: string;
  liveUrl?: string;
  size: "small" | "medium" | "large";
  order: number;
  imagesToDelete?: string[];
}

export interface ProjectInitialData {
  id?: string;
  title?: string;
  description?: string;
  images?: ProjectImage[];
  skills?: string[];
  objectives?: string[];
  githubUrl?: string;
  liveUrl?: string;
  size?: "small" | "medium" | "large";
  order?: number;
}

export interface ImagePreview {
  file?: File;
  url: string;
  name: string;
  isExisting?: boolean;
  id?: string;
  alt?: string;
  cover?: boolean;
}

export interface ProjectFormProps {
  onSubmit: (arg: SubmitProps) => void;
  isLoading?: boolean;
  initialData?: ProjectInitialData;
  mode?: "create" | "edit";
}

export interface SubmitProps {
  formData: FormData;
  onReset: () => void;
}

export interface ParsedProjectFormData {
  id?: string;
  title: string;
  description: string;
  images: UploadImageProps[];
  imagesToDelete?: string[];
  skills: string[];
  objectives: string[];
  githubUrl?: string;
  liveUrl?: string;
  size: string;
  order: number;
}

export interface ParseProjectProps {
  formData: FormData;
  mode: "create" | "edit";
}

export interface UploadImageProps {
  url: string;
  alt: string;
}

export interface ParsedSkillFormData {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "design";
  logo: string;
}

export interface SkillFormData {
  name: string;
  logo: File | string;
  category: string;
}

export interface AboutFormProps {
  onSubmit: (data: string) => void;
  isLoading?: boolean;
  initialData?: string;
  mode?: "create" | "edit";
}

export interface LinkItem {
  id: string;
  label: string;
}

export interface FetchDataResponse {
  skills: Skill[];
  projects: Project[];
  about: string;
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
  projectHeight: number;
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

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}
