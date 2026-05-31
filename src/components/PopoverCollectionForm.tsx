import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover"
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { CreateCollectionValues, useCreateCollectionForm } from "@/hooks/form/useCreateCollectionForm"
import { FormProvider } from "react-hook-form"
import { CircleAlert, CircleCheck, LibrarySquare } from "lucide-react"
import { ConfirmDialog, ConfirmDialogActions, } from "./ui/ConfirmDialog"
import { InlineControlInput } from "./control/InlineControlInput"
import { useCreateCollection } from "@/hooks/mutation/useCreateCollection"
import { ApiError } from "@/lib/errors"
import { toast } from "sonner"

type PopoverCollectionFormProps = {
  trigger?: React.ReactNode
}

export interface PopoverCollectionFormActions {
  open: VoidFunction
  close: VoidFunction
}

export const PopoverCollectionForm = forwardRef<PopoverCollectionFormActions, PopoverCollectionFormProps>(({
  trigger
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const confirmDialogRef = useRef<ConfirmDialogActions>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => reset(),
  }));

  const formMethods = useCreateCollectionForm();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    setError
  } = formMethods;

  const createCollection = useCreateCollection();

  const handleOpenChange = (open: boolean) => {
    if (!open && isDirty) {
      confirmDialogRef.current?.open();
      return;
    }

    if (!open) {
      reset();
    }

    setIsOpen(open);
  }

  const handleConfirmDialog = () => {
    reset();
  }

  const reset = () => {
    formMethods.reset();
    setIsOpen(false);
  }

  const onSubmit = async ({name}: CreateCollectionValues) => {
    try {
      const data = await createCollection.mutateAsync({ name });
      toast.success(data.message, {
        duration: 10000,
        closeButton: true,
        icon: <CircleCheck className="size-4 text-green-500" />
      });
      reset();
      
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.type === 'validation_error') {
          setError('name', {
            message: error.data['name'] as string || error.message,
          });
        } else {
          toast.error('Something went wrong', {
            duration: 10000,
            icon: <CircleAlert className="size-4 text-red-500" />
          });
        }
      } else {
        console.error(error);
      }
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} modal> 
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side="bottom" className="ml-6 p-3 space-y-4">
        <div>
          <p className="font-bold text-sm">Create collection</p>
          <p className="text-sm text-muted-foreground">Create a new collection to your collections.</p>
        </div>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InlineControlInput
              control={control}
              name="name"
              leftAddon={<LibrarySquare />}
              placeholder="Collection name"
              showError
              isLoading={isSubmitting}
            />
          </form>
        </FormProvider>
      </PopoverContent>
      <ConfirmDialog 
        confirmText="Discard changes"
        description="You have unsaved collection. Do you really want to discard changes?"
        ref={confirmDialogRef} 
        onConfirm={handleConfirmDialog} 
      />
    </Popover>
  )
});