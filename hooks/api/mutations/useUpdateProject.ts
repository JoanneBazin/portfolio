"use client";

import { Project } from "@/lib/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

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
