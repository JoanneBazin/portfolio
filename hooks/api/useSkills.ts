"use client";

import useFetchData from "./useFetchData";

export const useSkills = () => {
  const { data, ...rest } = useFetchData();
  return {
    skills: data?.skills || [],
    ...rest,
  };
};
