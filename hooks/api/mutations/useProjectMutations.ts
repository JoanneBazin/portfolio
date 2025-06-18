"use client";

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Project } from "@/lib/types";

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

export const useCreateProject = (): UseCreateProjectReturn => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<Project> => {
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

export const useUpdateProject = (): UseUpdateProjectReturn => {
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

export const useDeleteProject = (): UseDeleteProjectReturn => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (id: string): Promise<{ message: string }> => {
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
