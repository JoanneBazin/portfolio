"use client";

import { SubmitProps } from "@/lib/types";
import { SkillForm } from "@/components/forms/SkillForm";
import { useCreateSkill } from "@/hooks/api/mutations/useSkillMutation";
import { useState } from "react";

export const CreateSkill = () => {
  const createSkill = useCreateSkill();
  const [skillMessage, setSkillMessage] = useState<string | null>(null);

  const handleSkillSubmit = ({ formData, onReset }: SubmitProps): void => {
    setSkillMessage(null);
    createSkill.mutate(formData, {
      onSuccess: () => {
        setSkillMessage("Compétence ajoutée !");
        onReset();
      },
      onError: (error) => {
        setSkillMessage(error.message);
      },
    });
  };

  return (
    <div>
      <SkillForm
        onSubmit={handleSkillSubmit}
        isLoading={createSkill.isPending}
      />
      {skillMessage && (
        <p className="my-4 text-lg text-center">{skillMessage}</p>
      )}
    </div>
  );
};
