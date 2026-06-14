import { getCollections } from "@/api/services/collections";
import { ApiError } from "@/lib/errors";
import { useQuery } from "@tanstack/react-query"

export const useCollectionsQuery = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: async () => {
      const {data, error} = await getCollections();

      if (error) {
        throw new ApiError(error.type, error.message, error.data);
      }

      return data;
    },
  });
}