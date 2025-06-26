"use client";

import { ProjectModalProps } from "@/lib/types";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Tag } from "./Tag";

export const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal container={document.body}>
          <Dialog.Overlay
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
          />
          <Dialog.Content
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl max-h-[80vh] overflow-y-auto bg-background border border-accent-50 rounded-lg p-6"
            style={{ zIndex: 9999 }}
          >
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg sm:text-2xl font-semibold font-montserrat">
                {project.title}
              </Dialog.Title>
              <Dialog.Close
                className="p-2 rounded-full text-accent hover:text-foreground transition-colors text-xl"
                aria-label="Fermer la modale"
              >
                x
              </Dialog.Close>
            </div>

            <div className="space-y-6 my-6">
              <div className="relative h-52 w-full">
                <Image
                  src={project.images[0].url}
                  alt={project.title}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <p className="text-base sm:text-lg">{project.description}</p>
              <ul className="space-y-1 sm:space-y-2">
                {project.objectives.map((el, index) => (
                  <li key={index} className="text-base">
                    {el}
                  </li>
                ))}
              </ul>
            </div>

            <div className="my-2 flex flex-wrap gap-1">
              {project.skills.map((skill, index) => (
                <Tag key={index} item={skill} />
              ))}
            </div>

            <div className="flex gap-6 pt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-base px-3 sm:px-4 py-2 rounded-xl bg-accent text-background hover:bg-gold"
                  aria-label="Aller voir le code sur Github"
                >
                  <i className="fa-solid fa-code"></i>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-accent text-background hover:bg-gold"
                  aria-label="Aller voir le code sur Github"
                >
                  <i className="fa-solid fa-globe"></i>
                </a>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
