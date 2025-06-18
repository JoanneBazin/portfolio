"use client";

import { CreateProjectResponse } from "@/lib/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Project } from "@/lib/types";

type UseCreateProjectReturn = UseMutationResult<
  CreateProjectResponse,
  Error,
  FormData
>;

export const useCreateProject = (): UseCreateProjectReturn => {
  const queryClient = useQueryClient();

  return useMutation<CreateProjectResponse, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<CreateProjectResponse> => {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur dans la création de projet");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdateProject = (): UseMutationResult<
  Project,
  Error,
  { id: string; formData: FormData }
> => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, { id: string; formData: FormData }>({
    mutationFn: async ({ id, formData }): Promise<Project> => {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Erreur dans la création de projet");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDeleteProject = (): UseMutationResult<void, Error, string> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur dans la suppression du projet");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
