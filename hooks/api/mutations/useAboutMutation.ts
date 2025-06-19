"use client";

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

type UseEditAboutReturn = UseMutationResult<string, Error, string>;

export const useUpdateAbout = (): UseEditAboutReturn => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: async (about: string): Promise<string> => {
      const response = await fetch("/api/user/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ about }),
      });

      if (!response.ok)
        throw new Error("Erreur dans la mise à jour de la présentation");

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
