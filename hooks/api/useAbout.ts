"use client";

import useFetchData from "./useFetchData";

export const useAbout = () => {
  const { data, ...rest } = useFetchData();
  return {
    about: data?.about || "",
    ...rest,
  };
};
