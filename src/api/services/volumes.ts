import { client } from "../client";
import { GetVolumesArgs, GetVolumesResponse } from "../types";

export const getVolumes = async (args: GetVolumesArgs) => {
  return client.get<GetVolumesResponse>('/volumes', args);
};
