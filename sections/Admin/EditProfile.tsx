"use client";

import { AboutForm } from "@/components/forms/AboutForm";
import { useUpdateAbout } from "@/hooks/api/mutations/useAboutMutation";
import { useAbout } from "@/hooks/api/useAbout";
import { useSkills } from "@/hooks/api/useSkills";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { CreateSkill } from "./CreateSkill";
import { EditableSkillCard } from "@/components/forms/EditableSkillCard";

export const EditProfile = () => {
  const { about } = useAbout();
  const { skills } = useSkills();
  const updateAbout = useUpdateAbout();
  const [aboutMessage, setaboutMessage] = useState<string | null>(null);
  const categories = ["frontend", "backend", "database", "tools", "design"];

  const handleAboutSubmit = (about: string): void => {
    updateAbout.mutate(about, {
      onSuccess: () => {
        setaboutMessage("Mise à jour réussie");
      },
      onError: (error) => {
        setaboutMessage("Erreur lors de la mise à jour");
        console.log(error.message);
      },
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-16 items-center w-full">
        <div className="w-full lg:w-3/5">
          <div className="flex gap-12 items-center mb-6">
            <h3 className="font-montserrat text-xl font-medium">Compétences</h3>
            <Dialog.Root>
              <Dialog.Trigger
                aria-label="Ajouter une compétence"
                className="px-2 sm:py-2 sm:px-4 rounded-full bg-accent text-background hover:bg-gold font-bold text-2xl my-6"
              >
                +
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className=" fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 max-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background border border-accent-50 p-6">
                  <Dialog.Title className="text-lg font-montserrat font-medium">
                    Ajouter une compétence
                  </Dialog.Title>
                  <CreateSkill />
                  <Dialog.Close
                    className="absolute top-4 right-6 text-accent hover:foreground"
                    aria-label="Fermer la modale"
                  >
                    x
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          <div className="flex flex-col gap-4">
            {skills.length > 0 &&
              categories.map((category, index) => (
                <div key={index} className="flex items-center gap-4">
                  <p className="min-w-[70px]">{category}</p>
                  <div className="flex flex-wrap gap-3">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <EditableSkillCard key={skill.id} skill={skill} />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-3/5">
          <h3 className="font-montserrat text-xl font-medium mb-6">A propos</h3>
          <AboutForm
            onSubmit={handleAboutSubmit}
            isLoading={updateAbout.isPending}
            initialData={about}
          />
          {aboutMessage && <p className="my-4 text-lg">{aboutMessage}</p>}
        </div>
      </div>
    </section>
  );
};
