"use client";

import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useState } from "react";

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const openModal = (modalConfig: typeof config) => {
    setConfig(modalConfig);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setConfig(null);
  };

  const handleConfirm = async () => {
    if (!config) return;

    try {
      await config.onConfirm();
      closeModal();
    } catch (error) {
      console.log("Erreur lors de la confirmation : ", error);
    }
  };

  const ConfirmModalComponent = config ? (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={closeModal}
      onConfirm={handleConfirm}
      title={config.title}
      description={config.description}
    />
  ) : null;

  return {
    openModal,
    closeModal,
    ConfirmModalComponent,
  };
};
