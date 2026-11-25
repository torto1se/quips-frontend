'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal/Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  isLoading?: boolean;
  className?: string;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Удалить',
  isLoading = false,
  className,
}: ConfirmModalProps) {
  const handleClose = () => {
    if (!isLoading) onClose();
  };

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      description={description}
      footer={
        <>
          <Button
            variant="flat"
            onClick={handleClose}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            variant="flat"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </>
      }
    />
  );
}
