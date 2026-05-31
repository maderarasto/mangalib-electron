import { ApiResponse, client } from "../client";
import { CreateCollectionArgs, CreateCollectionResponse, DeleteCollectionArgs, DeleteCollectionResponse, GetCollectionsResponse, UpdateCollectionArgs, UpdateCollectionResponse } from "../types";

export const getCollections = async () => {
  return client.get<GetCollectionsResponse>('/collections');
};

export const createCollection = async (args: CreateCollectionArgs) => {
  return client.post<CreateCollectionResponse>('/collections/create', args);
};

export const updateCollection = async ({ id, ...args}: UpdateCollectionArgs) => {
  return client.post<UpdateCollectionResponse>(`/collections/${id}/edit`, args);
}

export const deleteCollection = async ({ id }: DeleteCollectionArgs) => {
  return client.delete<DeleteCollectionResponse>(`/collections/${id}`);
}