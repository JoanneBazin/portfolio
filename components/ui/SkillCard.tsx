"use client";

import Image from "next/image";
import { Skill } from "@/lib/types";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useDeleteSkill } from "@/hooks/api/mutations/useSkillMutation";

export const SkillCard = ({ skill }: { skill: Skill }) => {
  const { openModal, ConfirmModalComponent } = useConfirmModal();
  const deleteSkill = useDeleteSkill();

  const handleDeleteSkill = (): void => {
    deleteSkill.mutate(skill.id, {
      onSuccess: () => {
        console.log("Compétence supprimée !");
      },
      onError: (error) => {
        console.log("Erreur lors de la suppression : ", error);
      },
    });
  };

  const confirmDeleteSkill = (skill: Skill) => {
    openModal({
      title: "Supprimer une compétence",
      description: `Etes-vous sûre de vouloir supprimer ${skill.name} ?`,
      onConfirm: handleDeleteSkill,
    });
  };
  return (
    <div className="relative">
      <Image src={skill.logo} width={50} height={40} alt={skill.name} />
      <button
        type="button"
        onClick={() => confirmDeleteSkill(skill)}
        className="absolute top-0 right-1 bg-red-900 rounded-full w-4 h-4 flex items-center justify-center text-sm hover:bg-red-800"
      >
        X
      </button>
      {ConfirmModalComponent}
    </div>
  );
};
