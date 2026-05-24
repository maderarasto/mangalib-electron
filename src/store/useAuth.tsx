import { AuthUser, Session } from "@supabase/supabase-js";
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

interface AuthState {
  session: Session|null;
  user: AuthUser|null;

  setSession: (session: Session|null) => void;
  reset: () => void;
};

const initialState: Partial<AuthState> = {
  session: null,
  user: null
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      ...initialState,

      setSession: (session: Session|null) => set({ 
        session, 
        user: session?.user ?? null 
      }),

      reset: () => set({ 
        session: null,
        user: null
      }),
    })
  )
);

export const getSession = () => useAuthStore.getState().session;