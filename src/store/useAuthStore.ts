import {Models} from "appwrite";
import {create} from "zustand";
import {devtools} from "zustand/middleware";

interface AuthState {
  user: Models.User|null;

  setUser: (user: Models.User|null) => void;
  reset: () => void;
}

const initialState = {
  user: null,
} as AuthState;

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      ...initialState,

      setUser: (user: Models.User|null) => {
        set({ user});
      },

      reset: () => {
        set({ user: null });
      }
    })
  )
);