import { CreateCollectionValues, useCreateCollectionForm } from "@/hooks/form/useCreateCollectionForm";
import { useCreateCollection } from "@/hooks/mutation/useCreateCollection";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider } from "react-hook-form";
import { CollectionFormBaseProps, FormActions } from "../types";
import { ControlInput } from "@/components/control/ControlInput";
import { CreateCollectionResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";

type CreateCollectionFormProps = CollectionFormBaseProps & {
  onSuccess?: (response: CreateCollectionResponse) => void;
}

export const CreateCollectionForm = forwardRef<FormActions, CreateCollectionFormProps>(({
  onError,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
}, ref) => {
  const createCollection = useCreateCollection();
  const formMethods = useCreateCollectionForm();
  
  const {
    control,
    formState,
    handleSubmit,
    reset,
    setError,
  } = formMethods;

  useImperativeHandle(ref, () => ({
    reset: () => {
      reset();
    },

    submit: async () => {
      return handleSubmit(onSubmit)();
    }
  }), [handleSubmit, reset]);

  useEffect(() => {
    onDirtyChange?.(formState.isDirty);
    onSubmittingChange?.(formState.isSubmitting);
  }, [formState.isDirty, formState.isSubmitting])  

  const onSubmit = async (values: CreateCollectionValues) => {
    try {
      const response = await createCollection.mutateAsync(values);
      reset();
      onSuccess?.(response);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.type === 'validation_error') {
          setError('name', { message: error.data['name'] as string || error.message })
        } else {
          toast.error('Something went wrong', {
            duration: 10000,
            icon: <CircleAlert className="size-4 text-red-500" />
          });
        }
        onError?.(error);
      } else {
        console.error(error);
      }
    }
  }  

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlInput
          control={control}
          name="name"
          label="Name"
        />
      </form>
    </FormProvider>
  )
});