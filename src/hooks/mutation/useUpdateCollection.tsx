import { updateCollection } from "@/api/services/collections";
import { UpdateCollectionArgs, UpdateCollectionResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCollectionMutationProps = {
  onSuccess?: (data: UpdateCollectionResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateCollection = ({ 
  onSuccess, 
  onError 
}: UpdateCollectionMutationProps = {}) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: UpdateCollectionArgs) => {
      const { data, error } = await updateCollection(args);
      
      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      await client.invalidateQueries({
        queryKey: ['collections'],
      });

      return data;
    },
    mutationKey: ['updateCollection'],
    onSuccess,
    onError,
  });
}