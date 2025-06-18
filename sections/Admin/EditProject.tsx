import { ProjectForm } from "@/components/forms/ProjectForm";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useUpdateProject } from "@/hooks/api/mutations/useUpdateProject";
import { useProjects } from "@/hooks/api/useProjects";
import { Project, SubmitProps } from "@/lib/types";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export const EditProject = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const updateProject = useUpdateProject();

  const handleSubmit = ({ formData, onReset }: SubmitProps): void => {
    const id = selectedProject?.id;
    if (!id) return;

    updateProject.mutate(
      { id, formData },
      {
        onSuccess: (data) => {
          console.log("Projet mis à jour ! : ", data);
          onReset();
        },
        onError: (error) => {
          console.log("Erreur lors de la mise à jour : ", error);
        },
      }
    );
  };

  return (
    <section className="pl-20">
      <h3 className="font-montserrat text-3xl font-bold mb-10 text-center">
        Projets
      </h3>

      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <button key={project.id} onClick={() => setSelectedProject(project)}>
            <ProjectCard project={project} />
          </button>
        ))}
      </div>

      <Dialog.Root
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-h-[80vh] overflow-y-auto bg-background rounded-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-2xl text-center font-bold font-montserrat mb-4">
              Modifier le projet
            </Dialog.Title>

            {selectedProject && (
              <ProjectForm
                onSubmit={handleSubmit}
                isLoading={updateProject.isPending}
                // initialData={selectedProject}
                // mode="edit"
              />
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
