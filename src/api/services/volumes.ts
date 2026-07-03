import { client } from "../client";
import { DeleteVolumeArgs, DeleteVolumeResponse, GetVolumeArgs, GetVolumeResponse, GetVolumesArgs, GetVolumesResponse, UpdateVolumeArgs, UpdateVolumeResponse } from "../types";

export const getVolumes = async (args: GetVolumesArgs) => {
  return client.get<GetVolumesResponse>('/volumes', args);
};

export const getVolume = async (args: GetVolumeArgs) => {
  return client.get<GetVolumeResponse>(`/volumes/${args.id}`, args);
};

export const updateVolume = async ({ id, ...args }: UpdateVolumeArgs) => {
  return client.post<UpdateVolumeResponse>(`/volumes/${id}/edit`, args);
}

export const deleteVolume = async (args: DeleteVolumeArgs) => {
  return client.delete<DeleteVolumeResponse>(`/volumes/${args.id}`);
}