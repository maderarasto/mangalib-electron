import { ApiResponse, client } from "../client";
import { CreateCollectionArgs, CreateCollectionResponse, GetCollectionsResponse, UpdateCollectionArgs, UpdateCollectionResponse } from "../types";

export const getCollections = async () => {
  return client.get<GetCollectionsResponse>('/collections');
};

export const createCollection = async (args: CreateCollectionArgs) => {
  return client.post<CreateCollectionResponse>('/collections', args);
};

export const updateCollection = async ({ id, ...args}: UpdateCollectionArgs) => {
  return client.put<UpdateCollectionResponse>(`/collections/${id}`, args);
}