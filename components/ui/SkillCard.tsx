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
    <div className="relative w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 bg-zinc-800/10 backdrop-blur-md border border-yellow-500/20 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.1)]">
      <Image
        src={skill.logo}
        fill
        sizes="(max-width: 640px) 32px, (max-width: 1024px) 48px, 64px"
        alt={skill.name}
        className="object-contain p-2 sm:p-4"
      />
      <button
        type="button"
        onClick={() => confirmDeleteSkill(skill)}
        className="absolute top-2 right-2 bg-red font-bold rounded-full w-4 h-4 flex items-center justify-center text-sm hover:bg-gray"
      >
        X
      </button>
      {ConfirmModalComponent}
    </div>
  );
};
