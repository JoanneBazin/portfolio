"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skill, UseCreateSkillReturn, UseDeleteSkillReturn } from "@/types";

export const useCreateSkill = (): UseCreateSkillReturn => {
  const queryClient = useQueryClient();

  return useMutation<Skill, Error, FormData>({
    mutationFn: async (formData: FormData): Promise<Skill> => {
      const response = await fetch("/api/user/admin/skills", {
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

export const useDeleteSkill = (): UseDeleteSkillReturn => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: async (id: string): Promise<{ message: string }> => {
      const response = await fetch(`/api/user/admin/skills/${id}`, {
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
