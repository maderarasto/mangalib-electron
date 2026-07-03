import { updateVolume } from "@/api/services/volumes";
import { UpdateVolumeArgs, UpdateVolumeResponse } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateVolumeMutationProps = {
  onSuccess?: (data: UpdateVolumeResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateVolumeMutation = ({ 
  onSuccess, 
  onError 
}: UpdateVolumeMutationProps = {}) => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (args: UpdateVolumeArgs) => {
      const { data, error } = await updateVolume(args);
      
      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      await Promise.all([
        client.invalidateQueries({ queryKey: [ 'volumes' ]}),
        client.invalidateQueries({ queryKey: [ 'volume' ]})
      ]);

      return data;
    },
    mutationKey: ['updateVolume'],
    onSuccess,
    onError,
  });
}