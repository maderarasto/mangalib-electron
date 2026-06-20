export type BaseArgs = Record<string, unknown>;

// #region Arguments
export type CreateCollectionArgs = {
  name: string;
};

export type UpdateCollectionArgs = {
  id: string;
  name?: string;
}

export type DeleteCollectionArgs = {
  id: string;
}

export type GetVolumesArgs = {
  collectionId?: string;
}

export type GetVolumeArgs = {
  id: string;
}

export type DeleteVolumeArgs = {
  id: string;
}
// #endregion

// #region Common
export type Collection = {
  id: string;
  name: string;
  created_at: string | null;
  updated_at: string | null;
};

export type VolumeState = (
  | 'released'
  | 'owned'
  | 'reading'
  | 'completed'
  | 'lost'
);

export type Volume = {
  id: string;
  collection_id: string;
  collection: Pick<Collection, 'id' | 'name'>;
  title: string;
  summary?: string;
  state: VolumeState;
  created_by: string;
  created_at: string | null;
  updated_at: string | null;
}
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

export type DeleteCollectionResponse = {
  success: boolean;
  message: string;
}

export type GetVolumesResponse = {
  volumes: Volume[];
};

export type GetVolumeResponse = Volume;

export type DeleteVolumeResponse = {
  success: boolean;
  message: string;
}
// #endregion