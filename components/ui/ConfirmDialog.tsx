"use client";

import { ConfirmDialogProps } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
}) => (
  <Dialog.Root open={isOpen} onOpenChange={onClose}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 max-w-lg bg-background">
        <Dialog.Title className="text-lg text-red mb-2">{title}</Dialog.Title>
        <Dialog.Description>{description} ?</Dialog.Description>
        <div className="flex justify-end gap-4 pt-6">
          <Dialog.Close
            className="px-4 py-2 text-sm rounded-lg bg-background border border-accent hover:bg-gray"
            disabled={isLoading}
          >
            Annuler
          </Dialog.Close>

          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 text-sm rounded-lg bg-red hover:bg-gray"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
