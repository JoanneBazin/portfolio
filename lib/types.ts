export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  tech: string[];
  objectives: string[];
  githubUrl?: string;
  liveUrl?: string;
  size: "small" | "medium" | "large";
  order: number;
}

export interface LinkItem {
  id: string;
  label: string;
}
