import { deleteVolume } from "@/api/services/volumes";
import { DeleteVolumeArgs, DeleteVolumeResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteVolumeMutationProps = {
  onSuccess?: (data: DeleteVolumeResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteVolume = ({ 
  onSuccess, 
  onError 
}: DeleteVolumeMutationProps = {}) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: DeleteVolumeArgs) => {
      const { data, error } = await deleteVolume(args);
      
      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      await client.invalidateQueries({
        queryKey: ['volumes'],
      });

      return data;
    },
    mutationKey: ['deleteVolume'],
    onSuccess,
    onError,
  });
}