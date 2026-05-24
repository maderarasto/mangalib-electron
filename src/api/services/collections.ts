import { ApiResponse, client } from "../client";
import { CreateCollectionArgs, CreateCollectionResponse, GetCollectionsResponse } from "../types";

export const getCollections = async () => {
  return client.get<GetCollectionsResponse>('/collections');
};

export const createCollection = async (args: CreateCollectionArgs) => {
  return client.post<CreateCollectionResponse>('/collections', args);
};