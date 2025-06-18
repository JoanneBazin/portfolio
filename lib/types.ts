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
  cover?: boolean;
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
  category: string;
  logo: string;
}

export interface SkillFormData {
  name: string;
  logo: File | string;
  category?: string;
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
