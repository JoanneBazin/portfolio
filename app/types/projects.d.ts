import { UploadImageProps } from "./common";

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

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}
