"use client";

import { ProjectModalProps } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { Tag } from "./Tag";
import Slideshow from "./SlideShow";
import { ChevronRight, Code, Globe } from "lucide-react";

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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vh] overflow-y-auto bg-background border border-accent-50 rounded-lg p-6 sm:p-8 lg:p-12"
            style={{ zIndex: 9999 }}
          >
            <div className="relative w-full">
              <Dialog.Close
                className="absolute right-[-25px] top-[-25px] rounded-full px-2 text-accent hover:text-foreground transition-colors text-xl sm:text-2xl"
                aria-label="Fermer la modale"
              >
                x
              </Dialog.Close>
            </div>
            <Dialog.Title className="relative text-lg sm:text-2xl font-medium font-montserrat mb-4 lg:mb-8">
              {project.title}
            </Dialog.Title>
            <Dialog.Description className="text-sm sm:text-base lg:text-lg mb-4">
              {project.description}
            </Dialog.Description>

            <div className="flex flex-col h-full">
              <Slideshow images={project.images} />

              <div className="space-y-3 my-6 sm:my-8">
                <ul className="space-y-1 sm:space-y-2">
                  {project.objectives.map((el, index) => (
                    <li
                      key={index}
                      className="text-xs sm:text-base lg:text-lg flex items-center leading-tight"
                    >
                      <ChevronRight
                        className="flex-shrink-0"
                        color="var(--foreground)"
                        size={20}
                      />
                      <span className="ml-2">{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.skills.map((skill, index) => (
                  <Tag key={index} item={skill} />
                ))}
              </div>

              <div className="flex gap-6 mt-4 sm:mt-6">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 sm:px-4 py-2 rounded-xl bg-accent hover:bg-gold"
                    aria-label="Aller voir le code sur Github"
                  >
                    <Code color="var(--background)" size={20} />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-accent hover:bg-gold"
                    aria-label="Aller voir le code sur Github"
                  >
                    <Globe color="var(--background)" size={24} />
                  </a>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
