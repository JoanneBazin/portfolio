"use client";

import * as Dialog from "@radix-ui/react-dialog";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

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
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 m-w-sm bg-background">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description} ?</Dialog.Description>
        <div className="flex justify-end gap-4 pt-6">
          <Dialog.Close
            className="px-4 py-2 text-sm rounded bg-dark-gray hover:bg-gray-800"
            disabled={isLoading}
          >
            Annuler
          </Dialog.Close>

          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 text-sm rounded bg-red-900 hover:bg-red-950"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
