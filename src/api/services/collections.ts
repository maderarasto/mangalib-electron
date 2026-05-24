import { ApiResponse, client } from "../client";
import { CreateCollectionArgs, CreateCollectionResponse } from "../types";

export const createCollection = async (args: CreateCollectionArgs): Promise<ApiResponse<CreateCollectionResponse>> => {
  return client.post('/collections', args);
};