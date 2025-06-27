import { ProjectForm } from "@/components/forms/ProjectForm";
import { Loader } from "@/components/ui/Loader";
import { AdminProjectCard } from "@/components/ui/AdminProjectCard";
import {
  useDeleteProject,
  useUpdateProject,
} from "@/hooks/api/mutations/useProjectMutations";

import { useProjects } from "@/hooks/api/useProjects";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { Project, SubmitProps } from "@/app/types";
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
      {message && <p className="text-lg text-center mb-4">{message}</p>}

      {isPending ? (
        <Loader />
      ) : error ? (
        <p className="text-center font-sm text-red-900">{error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <AdminProjectCard
                project={project}
                onEdit={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      )}

      <Dialog.Root
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-h-[80vh] overflow-y-auto bg-background border border-accent-50 rounded-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title>
              <div className="mb-4 px-6 flex flex-wrap gap-2 justify-around items-start">
                <p className="text-lg sm:text-2xl font-bold font-montserrat ">
                  Modifier le projet
                </p>
                <button
                  onClick={confirmDeleteProject}
                  className="bg-red text-xs sm:text-base rounded-lg py-2  px-4 sm:mr-8 hover:bg-gray"
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
            <Dialog.Close
              className="absolute top-1 right-4 text-2xl text-accent hover:text-foreground"
              aria-label="Fermer la modale"
            >
              x
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
