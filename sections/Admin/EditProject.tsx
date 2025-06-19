import { ProjectForm } from "@/components/forms/ProjectForm";
import { Loader } from "@/components/ui/Loader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import {
  useDeleteProject,
  useUpdateProject,
} from "@/hooks/api/mutations/useProjectMutations";

import { useProjects } from "@/hooks/api/useProjects";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { Project, SubmitProps } from "@/lib/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export const EditProject = () => {
  const { projects, isPending, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const updateProject = useUpdateProject();
  const { openModal, ConfirmModalComponent } = useConfirmModal();
  const deleteProject = useDeleteProject();
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = ({ formData, onReset }: SubmitProps): void => {
    setMessage(null);
    const id = selectedProject?.id;
    if (!id) return;

    updateProject.mutate(
      { id, formData },
      {
        onSuccess: (data) => {
          setMessage(`Projet ${data.title} modifié ☀️`);
          onReset();
          setSelectedProject(null);
        },
        onError: (error) => {
          setMessage(error.message);
        },
      }
    );
  };

  const handleDeleteProject = (): void => {
    setMessage(null);
    if (!selectedProject) return;
    deleteProject.mutate(selectedProject?.id, {
      onSuccess: () => {
        setMessage(`Projet supprimé !`);
        setSelectedProject(null);
      },
      onError: (error) => {
        setMessage(error.message);
      },
    });
  };

  const confirmDeleteProject = () => {
    if (!selectedProject) return;
    openModal({
      title: "Supprimer un projet",
      description: `Etes-vous sûre de vouloir supprimer ${selectedProject.title} ?`,
      onConfirm: handleDeleteProject,
    });
  };

  return (
    <section>
      <h3 className="font-montserrat text-3xl font-bold mb-10 text-center">
        Projets
      </h3>
      {message && <p className="text-lg text-center mb-4">{message}</p>}

      {isPending ? (
        <Loader />
      ) : error ? (
        <p className="text-center font-sm text-red-900">{error.message}</p>
      ) : (
        <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
            >
              <ProjectCard project={project} />
            </button>
          ))}
        </div>
      )}

      <Dialog.Root
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-h-[80vh] overflow-y-auto bg-background rounded-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title>
              <div className="mb-4 px-6 flex justify-between">
                <p className="text-2xl font-bold font-montserrat ">
                  Modifier le projet
                </p>
                <button
                  onClick={confirmDeleteProject}
                  className="bg-red-950 rounded-lg p-y-2 px-4 hover:bg-red-900"
                >
                  Supprimer le projet
                </button>
                {ConfirmModalComponent}
              </div>
            </Dialog.Title>

            {selectedProject && (
              <ProjectForm
                onSubmit={handleSubmit}
                isLoading={updateProject.isPending}
                initialData={selectedProject}
                mode="edit"
              />
            )}
            <Dialog.Close className="absolute top-2 right-2">x</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
