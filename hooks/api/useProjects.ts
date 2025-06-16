"use client";

import useFetchData from "./useFetchData";

export const useProjects = () => {
  const { data, ...rest } = useFetchData();
  return {
    projects: data?.projects || [],
    ...rest,
  };
};
