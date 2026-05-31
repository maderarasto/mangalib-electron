import { deleteCollection, updateCollection } from "@/api/services/collections";
import { DeleteCollectionArgs, DeleteCollectionResponse, UpdateCollectionArgs, UpdateCollectionResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteCollectionMutationProps = {
  onSuccess?: (data: DeleteCollectionResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteCollection = ({ 
  onSuccess, 
  onError 
}: DeleteCollectionMutationProps = {}) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: DeleteCollectionArgs) => {
      const { data, error } = await deleteCollection(args);
      console.log(error);
      
      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      await client.invalidateQueries({
        queryKey: ['collections'],
      });

      return data;
    },
    mutationKey: ['deleteCollection'],
    onSuccess,
    onError,
  });
}