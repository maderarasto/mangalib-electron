import { UpdateCollectionResponse } from "@/api/types";
import { CollectionFormBaseProps, FormActions } from "../types";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormProvider } from "react-hook-form";
import { ControlInput } from "@/components/control/ControlInput";
import { useUpdateCollection } from "@/hooks/mutation/useUpdateCollection";
import { UpdateCollectionValues, useUpdateCollectionForm } from "@/hooks/form/useUpdateCollectionForm";
import { ApiError } from "@/lib/errors";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import { useCollectionsStore } from "@/store/useCollections";

type EditCollectionFormProps = CollectionFormBaseProps & {
  collectionId: string;
  onSuccess?: (response: UpdateCollectionResponse) => void;
}

export const EditCollectionForm = forwardRef<FormActions, EditCollectionFormProps>(({
  collectionId,
  onError,
  onDirtyChange,
  onSubmittingChange,
  onSuccess,
}, ref) => {
  const collections = useCollectionsStore((state) => state.collections);
  const updateCollection = useUpdateCollection();
  const formMethods = useUpdateCollectionForm();

  const {
    control,
    formState,
    handleSubmit,
    reset,
    setError,
  } = formMethods;

  useEffect(() => {
    const foundCollection = collections.find((collection) => {
      return collection.id === collectionId;
    });

    reset({
      name: foundCollection?.name
    });
  }, [collectionId])

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
  }, [formState.isDirty, formState.isSubmitting]);

  const onSubmit = async (values: UpdateCollectionValues) => {
    try {
      const response = await updateCollection.mutateAsync({
        ...values,
        id: collectionId
      });

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
  );
});