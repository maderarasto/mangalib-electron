import { getVolumes } from "@/api/services/volumes";
import { GetVolumesArgs } from "@/api/types";
import { ApiError } from "@/lib/errors";
import { useQuery } from "@tanstack/react-query";

export const useVolumesQuery = ({ collectionId } : GetVolumesArgs = {}) => {
	return useQuery({
    queryKey: ['volumes', collectionId],
    queryFn: async () => {
      const {data, error} = await getVolumes({ collectionId });

      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      return data;
    },
  });
};
