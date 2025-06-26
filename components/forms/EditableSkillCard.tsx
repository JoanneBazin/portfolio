import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useDeleteSkill } from "@/hooks/api/mutations/useSkillMutation";
import { Skill } from "@/lib/types";
import { SkillCard } from "../ui/SkillCard";

export const EditableSkillCard = ({ skill }: { skill: Skill }) => {
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
    <div className="relative group">
      <SkillCard skill={skill} />
      <button
        type="button"
        onClick={() => confirmDeleteSkill(skill)}
        className="absolute top-2 right-2 bg-red font-bold rounded-full w-4 h-4 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100"
      >
        X
      </button>
      {ConfirmModalComponent}
    </div>
  );
};
