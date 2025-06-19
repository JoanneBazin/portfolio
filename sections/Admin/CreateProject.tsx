"use client";

import { ProjectForm } from "@/components/forms/ProjectForm";
import { useCreateProject } from "@/hooks/api/mutations/useProjectMutations";

import { SubmitProps } from "@/lib/types";
import { useState } from "react";

export const CreateProjects = () => {
  const createProject = useCreateProject();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = ({ formData, onReset }: SubmitProps): void => {
    setMessage(null);
    createProject.mutate(formData, {
      onSuccess: (data) => {
        setMessage(`Projet ${data.title} créé ✨`);
        onReset();
      },
      onError: (error) => {
        setMessage(error.message);
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
      {message && <p className="text-lg text-center">{message}</p>}
    </section>
  );
};
