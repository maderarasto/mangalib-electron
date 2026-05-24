export type BaseArgs = Record<string, unknown>;

// #region Arguments
export type CreateCollectionArgs = {
  name: string;
};
// #endregion

// #region Responses
export type CreateCollectionResponse = {
  success: boolean;
  message: string;
};
// #endregion