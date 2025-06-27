import { Project } from "./projects";
import { Skill } from "./skills";
import { UseMutationResult } from "@tanstack/react-query";

export interface SubmitProps {
  formData: FormData;
  onReset: () => void;
}

export interface UploadImageProps {
  url: string;
  alt: string;
}

export interface FetchDataResponse {
  skills: Skill[];
  projects: Project[];
  about: string;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

type UseEditAboutReturn = UseMutationResult<string, Error, string>;
