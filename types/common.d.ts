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

type UseCreateProjectReturn = UseMutationResult<Project, Error, FormData>;

type UseUpdateProjectReturn = UseMutationResult<
  Project,
  Error,
  { id: string; formData: FormData }
>;

type UseDeleteProjectReturn = UseMutationResult<
  { message: string },
  Error,
  string
>;

type UseCreateSkillReturn = UseMutationResult<Skill, Error, FormData>;

type UseDeleteSkillReturn = UseMutationResult<
  { message: string },
  Error,
  string
>;
