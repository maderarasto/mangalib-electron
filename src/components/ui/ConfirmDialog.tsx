import { forwardRef, MouseEvent, MouseEventHandler, useEffect, useImperativeHandle, useRef, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../shadcn/alert-dialog";
import { Spinner } from "../shadcn/spinner";

type ConfirmDialogProps = {
  cancelText?: string;
  closeAfterConfirm?: boolean;
  confirmText?: string;
  description?: string;
  loading?: boolean;
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
  closeAfterConfirm = true,
  confirmText = 'Confirm',
  description = 'This action can\'t be undone and it\'s permament.',
  loading = false,
  onCancel,
  onConfirm,
  open,
  title = 'Are you sure?'
}, ref) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [isLoading, setIsLoading] = useState(loading ?? false);
  const [shouldClose, setShouldClose] = useState(false);
  const prevLoading = useRef(false);

  useEffect(() => {
    setIsLoading((prevIsLoading) => {
      prevLoading.current = prevIsLoading;
      return loading;
    });
  }, [loading])

  useEffect(() => {
    if (!isLoading && prevLoading.current && shouldClose) {
      setIsOpen(false);
      setShouldClose(false);
      prevLoading.current = false;
    }
  }, [isLoading, shouldClose]);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }));

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  }

  const handleConfirmClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    onConfirm?.();
    console.log(isLoading);
    if (!closeAfterConfirm) {
      setShouldClose(true);
    } else {
      setIsOpen(false);
    }
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
          <AlertDialogAction onClick={handleConfirmClick}>
            {isLoading ? <Spinner color="white" /> : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
});