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

export interface UploadImageProps {
  url: string;
  alt: string;
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
  images: File[];
  skills: { value: string }[];
  objectives: { value: string }[];
  githubUrl?: string;
  liveUrl?: string;
  size: "small" | "medium" | "large";
  order: number;
}

export interface ParsedProjectFormData {
  title: string;
  description: string;
  images: UploadImageProps[];
  skills: string[];
  objectives: string[];
  githubUrl?: string;
  liveUrl?: string;
  size: string;
  order: number;
}

export interface ImagePreview {
  file: File;
  url: string;
  name: string;
}

export interface SkillFormData {
  name: string;
  logo: string;
  category: string;
}

export interface LinkItem {
  id: string;
  label: string;
}

export interface CreateProjectResponse {
  project: Project;
  message?: string;
}

export interface SubmitProps {
  formData: FormData;
  onReset: () => void;
}

export interface ProjectFormProps {
  onSubmit: (arg: SubmitProps) => void;
  isLoading?: boolean;
  initialData?: Partial<ProjectFormData>;
  mode?: "create" | "edit";
}

export interface SelectOptions {
  value: string;
  label: string;
}
