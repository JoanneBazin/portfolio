"use client";

import { FetchDataResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useFetchData = () => {
  return useQuery<FetchDataResponse>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }

      return response.json();
    },
  });
};

export default useFetchData;
