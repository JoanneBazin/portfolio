"use client";

import { FetchDataResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useFetchData = () => {
  return useQuery<FetchDataResponse>({
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
