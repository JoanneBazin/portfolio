"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Project,
  UseCreateProjectReturn,
  UseDeleteProjectReturn,
  UseUpdateProjectReturn,
} from "@/app/types";

export const useCreateProject = (): UseCreateProjectReturn => {
  const queryClient = useQueryClient();

  return useMutation<Project, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<Project> => {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
