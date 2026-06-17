import { client } from "../client";
import { GetVolumeArgs, GetVolumeResponse, GetVolumesArgs, GetVolumesResponse } from "../types";

export const getVolumes = async (args: GetVolumesArgs) => {
  return client.get<GetVolumesResponse>('/volumes', args);
};

export const getVolume = async (args: GetVolumeArgs) => {
  return client.get<GetVolumeResponse>(`/volumes/${args.id}`, args);
};
