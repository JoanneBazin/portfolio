"use client";

import { ProjectForm } from "@/components/forms/ProjectForm";
import { useCreateProject } from "@/hooks/api/mutations/useCreateProject";

export const EditProjects = () => {
  const createProject = useCreateProject();

  const handleSubmit = (formData: FormData): void => {
    createProject.mutate(formData, {
      onSuccess: (data) => {
        console.log("Projet créé ! : ", data);
      },
      onError: (error) => {
        console.log("Erreur lors de la création : ", error);
      },
    });
  };

  return (
    <div>
      <h3 className="font-montserrat text-3xl font-bold mb-10 text-center">
        Créer un projet
      </h3>
      <ProjectForm onSubmit={handleSubmit} />
    </div>
  );
};
