import { forwardRef, useImperativeHandle, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../shadcn/alert-dialog";

type ConfirmDialogProps = {
  cancelText?: string;
  confirmText?: string;
  description?: string;
  onCancel?: VoidFunction;
  onConfirm?: VoidFunction;
  open?: boolean;
  title?: string;
}

export interface ConfirmDialogActions {
  open: () => void;
  close: () => void;
}

export const ConfirmDialog = forwardRef<ConfirmDialogActions, ConfirmDialogProps>(({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  description = 'This action can\'t be undone and it\'s permament.',
  onCancel,
  onConfirm,
  open,
  title = 'Are you sure?'
}, ref) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-md">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel?.()}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm?.()}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
});