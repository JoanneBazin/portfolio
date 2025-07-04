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
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85vw] sm:w-[75vw] lg:w-[60vw] max-h-[85vh] overflow-y-auto bg-background border border-accent-50 rounded-lg p-6 sm:p-8 overflow-x-hidden flex flex-col items-center"
            style={{ zIndex: 9999 }}
            data-testid="project-modal"
          >
            <div className="relative w-full">
              <Dialog.Close
                className="absolute right-[-20px] top-[-20px] rounded-full px-2 text-accent hover:text-foreground transition-colors text-xl sm:text-2xl border-none"
                aria-label="Fermer la modale"
              >
                x
              </Dialog.Close>
            </div>
            <Dialog.Title className="relative text-base sm:text-lg font-medium font-montserrat mb-4 lg:mb-8">
              {project.title}
            </Dialog.Title>
            <Dialog.Description className="text-sm sm:text-base mb-4 sm:mb-6">
              {project.description}
            </Dialog.Description>

            <div className="flex flex-col h-full">
              <Slideshow images={project.images} />

              <div className="space-y-3 mt-2 mb-6 sm:my-8">
                <ul className="space-y-1 sm:space-y-2">
                  {project.objectives.map((el, index) => (
                    <li
                      key={index}
                      className="text-xs sm:text-base flex items-center leading-tight"
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
                    data-testid="project-github-link"
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
                    data-testid="project-live-link"
                    className="px-4 py-2 rounded-lg bg-accent hover:bg-gold"
                    aria-label="Aller voir le code sur Github"
                  >
                    <Globe color="var(--background)" size={20} />
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
