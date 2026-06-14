import { Collection } from "@/api/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CollectionsState {
  collections: Collection[];
  activeCollection: Collection|null;
  activeCollectionId: string|null;

  setCollections: (collections: Collection[]) => void;
  setActiveCollectionId: (id: string|null) => void;
  reset: () => void;
};

type StateData = Pick<CollectionsState, 'collections' | 'activeCollection' | 'activeCollectionId'>;
const initialState: Pick<CollectionsState, keyof StateData> = {
  collections: [],
  activeCollection: null,
  activeCollectionId: null,
};

export const useCollectionsStore = create<CollectionsState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setCollections: (collections: Collection[]) => set({ collections }),

      setActiveCollectionId: (id: string|null) => {
        const activeCollection = get().collections.find((collection) => {
          return collection.id === id;
        });
        
        set({ 
          activeCollectionId: id,
          activeCollection,
         });
      },

      reset: () => set({ 
        collections: [],
        activeCollection: null,
        activeCollectionId: null,
       }),
    })
  )
);  