"use client";

import { AboutForm } from "@/components/forms/AboutForm";
import { useUpdateAbout } from "@/hooks/api/mutations/useAboutMutation";
import { useAbout } from "@/hooks/api/useAbout";
import { useSkills } from "@/hooks/api/useSkills";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { CreateSkill } from "./CreateSkill";
import { SkillCard } from "@/components/ui/SkillCard";

export const EditProfile = () => {
  const { about } = useAbout();
  const { skills } = useSkills();
  const updateAbout = useUpdateAbout();
  const [aboutMessage, setaboutMessage] = useState<string | null>(null);

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
      <h3 className="font-montserrat text-3xl font-bold mb-10 text-center">
        Profil
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <h4 className="font-montserrat text-xl font-medium">A propos</h4>
          <AboutForm
            onSubmit={handleAboutSubmit}
            isLoading={updateAbout.isPending}
            initialData={about}
          />
          {aboutMessage && <p className="my-4 tex-lg">{aboutMessage}</p>}
        </div>

        <div>
          <h4 className="font-montserrat text-xl font-medium">Compétences</h4>
          <Dialog.Root>
            <Dialog.Trigger
              aria-label="Ajouter une compétence"
              className="py-2 px-5 rounded-full bg-gold-light text-background hover:bg-gold-dark font-bold text-2xl my-6"
            >
              +
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className=" fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-4">
                <Dialog.Title className="text-lg font-montserrat font-medium">
                  Ajouter une compétence
                </Dialog.Title>
                <CreateSkill />
                <Dialog.Close
                  className="absolute top-4 right-6"
                  aria-label="Fermer la modale"
                >
                  x
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
