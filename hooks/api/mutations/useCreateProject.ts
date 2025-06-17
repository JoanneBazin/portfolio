"use client";

import { CreateProjectResponse } from "@/lib/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

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
