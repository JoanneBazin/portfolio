"use client";

import { ProjectForm } from "@/components/forms/ProjectForm";
import { useCreateProject } from "@/hooks/api/mutations/useProjectMutations";

import { SubmitProps } from "@/lib/types";

export const CreateProjects = () => {
  const createProject = useCreateProject();

  const handleSubmit = ({ formData, onReset }: SubmitProps): void => {
    createProject.mutate(formData, {
      onSuccess: (data) => {
        console.log("Projet créé ! : ", data);
        onReset();
      },
      onError: (error) => {
        console.log("Erreur lors de la création : ", error);
      },
    });
  };

  return (
    <section>
      <h3 className="font-montserrat text-3xl font-bold mb-10 text-center">
        Créer un projet
      </h3>
      <ProjectForm
        onSubmit={handleSubmit}
        isLoading={createProject.isPending}
      />
    </section>
  );
};
