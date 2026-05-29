export type BaseArgs = Record<string, unknown>;

// #region Arguments
export type CreateCollectionArgs = {
  name: string;
};

export type UpdateCollectionArgs = {
  id: string;
  name?: string;
}
// #endregion

// #region Common
export type Collection = {
  id: string;
  name: string;
  created_at: string | null;
  updated_at: string | null;
};
// #endregion

// #region Responses
export type GetCollectionsResponse = {
  collections: Collection[];
};

export type CreateCollectionResponse = {
  success: boolean;
  message: string;
};

export type UpdateCollectionResponse = {
  success: boolean;
  message: string;
}
// #endregion