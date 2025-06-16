"use client";

import { useQuery } from "@tanstack/react-query";

const useFetchData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    },
  });
};

export default useFetchData;
