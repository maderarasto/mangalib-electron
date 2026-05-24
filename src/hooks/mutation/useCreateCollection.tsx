import { ErrorResponse } from "@/api/client";
import { createCollection } from "@/api/services/collections";
import { CreateCollectionArgs, CreateCollectionResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { useMutation } from "@tanstack/react-query";

type createCollectionMutationProps = {
  onSuccess?: (data: CreateCollectionResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateCollection = ({ onSuccess, onError }: createCollectionMutationProps = {}) => {

  return useMutation({
    mutationFn: async (args: CreateCollectionArgs) => {
      const { data, error } = await createCollection(args);
      
      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      return data;
    },
    mutationKey: ['createCollection'],
    onSuccess,
    onError,
  });
}