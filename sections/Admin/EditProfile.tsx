"use client";

import { AboutForm } from "@/components/forms/AboutForm";
import { useUpdateAbout } from "@/hooks/api/mutations/useAboutMutation";
import { useAbout } from "@/hooks/api/useAbout";
import { useState } from "react";

export const EditProfile = () => {
  const { about } = useAbout();
  const updateAbout = useUpdateAbout();
  const [aboutMessage, setaboutMessage] = useState<string | null>(null);

  const handleSubmit = (about: string): void => {
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
            onSubmit={handleSubmit}
            isLoading={updateAbout.isPending}
            initialData={about}
          />
          {aboutMessage && <p className="my-4 italic">{aboutMessage}</p>}
        </div>

        <div>
          <h4 className="font-montserrat text-xl font-medium">Compétences</h4>
        </div>
      </div>
    </section>
  );
};
