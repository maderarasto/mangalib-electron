import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../shadcn/dialog";
import { Button } from "../../shadcn/button";
import { FieldSet } from "@/components/shadcn/field";
import { CreateCollectionForm } from "./forms/CreateCollectionForm";
import { CreateCollectionResponse, UpdateCollectionResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { FormActions } from "./types";
import { Spinner } from "@/components/shadcn/spinner";
import { toast } from "sonner";
import { CircleCheck } from "lucide-react";
import { ConfirmDialog, ConfirmDialogActions } from "@/components/ui/ConfirmDialog";

type CollectionFormDialogProps = {

}

export interface CollectionFormDialogActions {
  openWith: (collectionId?: string) => void;
  close: () => void;
}

export const CollectionFormDialog = forwardRef<CollectionFormDialogActions, CollectionFormDialogProps>(({
  
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collectionId, setCollectionId] = useState<string|null>(null);

  const createFormRef = useRef<FormActions>(null);
  const confirmDialogRef = useRef<ConfirmDialogActions>(null);

  const reset = () => {
    createFormRef.current?.reset();
    setCollectionId(null);
    setIsOpen(false);
  }

  useImperativeHandle(ref, () => ({
    openWith: (collectionId?: string) => {
      setCollectionId(collectionId ?? null);
      setIsOpen(true);
    },

    close: () => {
      reset();
    }
  }));

  const handleOpenChange = (open: boolean) => {
    if (!open && isDirty) {
      confirmDialogRef.current?.open();
      return;
    }

    if (!open) {
      createFormRef.current?.reset();
    }

    setIsOpen(open);
  }

  const handleSuccess = (response: CreateCollectionResponse | UpdateCollectionResponse) => {
    toast.success(response.message, {
      duration: 10000,
      closeButton: true,
      icon: <CircleCheck className="size-4 text-green-500" />
    });
    reset();
  }

  const title = !collectionId
    ? 'Create collection'
    : 'Edit collection';
  const description = !collectionId
    ? 'Add new collection to your collections.'
    : 'Update your collection.'
  const submitText = !collectionId
    ? 'Create'
    : 'Update';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold leading-4">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
        </DialogHeader>
        <FieldSet  className="mb-4">
          <CreateCollectionForm
            ref={createFormRef}
            onDirtyChange={(dirty) => setIsDirty(dirty)}
            onSubmittingChange={(submitting) => setIsSubmitting(submitting)}
            onSuccess={handleSuccess}
          />
        </FieldSet>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => createFormRef.current?.submit()}>
            {isSubmitting ? (<Spinner color="white" />) : submitText}
          </Button>
        </DialogFooter>
      </DialogContent>
      <ConfirmDialog 
        confirmText="Discard changes"
        description="You have unsaved collection. Do you really want to discard changes?"
        ref={confirmDialogRef} 
        onConfirm={() => reset()} 
      />
    </Dialog>
  )
});