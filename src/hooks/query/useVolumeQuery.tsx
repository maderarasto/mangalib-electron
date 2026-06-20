import { getVolume } from "@/api/services/volumes";
import { ApiError } from "@/lib/errors";
import { useQuery } from "@tanstack/react-query";

type UseVolumesQueryArgs = {
  id?: string;
  enabled?: boolean;
}

export const useVolumeQuery = ({ id, enabled } : UseVolumesQueryArgs) => {
	return useQuery({
    queryKey: ['volume', id],
    queryFn: async () => {
      const {data, error} = await getVolume({ id: id as string });

      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      return data;
    },
    enabled
  });
};
